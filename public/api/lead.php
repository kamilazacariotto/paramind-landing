<?php
/*
 * Recebe o formulário da landing da Paramind e cria o lead no Kommo.
 *
 * Fluxo: POST JSON do navegador -> este arquivo -> Kommo API v4
 *   1. POST /api/v4/leads/complex  (lead + contato + empresa num request só)
 *   2. POST /api/v4/leads/notes    (nota com a mensagem, versão da página e UTMs)
 *
 * O token do Kommo NUNCA vai pro navegador: fica em kommo-config.php, fora da
 * pasta pública (ver kommo-config.example.php e o README).
 */

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

function responder(int $status, array $corpo): void
{
    http_response_code($status);
    echo json_encode($corpo, JSON_UNESCAPED_UNICODE);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    responder(405, ['ok' => false, 'erro' => 'metodo']);
}

/* ---------- configuração ---------- */

// Procura o config subindo a partir de /api: o ideal é deixá-lo fora do
// public_html (dois níveis acima), mas aceita também ao lado deste arquivo.
$config = null;
foreach ([dirname(__DIR__, 2), dirname(__DIR__, 3), dirname(__DIR__), __DIR__] as $pasta) {
    $arquivo = $pasta . '/kommo-config.php';
    if (is_file($arquivo)) {
        $config = require $arquivo;
        break;
    }
}
if (!is_array($config) || empty($config['subdominio']) || empty($config['token'])) {
    error_log('[paramind-lead] kommo-config.php ausente ou incompleto');
    responder(500, ['ok' => false, 'erro' => 'config']);
}

/* ---------- origem ---------- */

// Bloqueia envio vindo de outro site (o navegador sempre manda Origin em POST com fetch).
$origemHeader = $_SERVER['HTTP_ORIGIN'] ?? '';
$permitidas = $config['origens_permitidas'] ?? [];
if ($origemHeader !== '' && $permitidas && !in_array(rtrim($origemHeader, '/'), $permitidas, true)) {
    responder(403, ['ok' => false, 'erro' => 'origem']);
}

/* ---------- limite simples por IP: 5 envios a cada 10 minutos ---------- */

$ip = $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
$arquivoLimite = sys_get_temp_dir() . '/pm-lead-' . md5($ip);
$agora = time();
$envios = array_filter(
    is_file($arquivoLimite) ? (json_decode((string) file_get_contents($arquivoLimite), true) ?: []) : [],
    fn ($t) => $t > $agora - 600
);
if (count($envios) >= 5) {
    responder(429, ['ok' => false, 'erro' => 'limite']);
}

/* ---------- dados ---------- */

$entrada = json_decode((string) file_get_contents('php://input'), true);
if (!is_array($entrada)) {
    responder(400, ['ok' => false, 'erro' => 'json']);
}

$texto = fn (string $chave, int $max = 200) => mb_substr(trim((string) ($entrada[$chave] ?? '')), 0, $max);

// Honeypot preenchido = robô. Responde "ok" pra ele não tentar de novo.
if ($texto('site') !== '') {
    responder(200, ['ok' => true]);
}

$nome = $texto('nome', 120);
$email = $texto('email', 160);
$empresa = $texto('empresa', 160);
$mensagem = $texto('mensagem', 2000);
$versao = preg_replace('/[^a-z0-9-]/', '', $texto('versao', 10));
$headline = preg_replace('/[^a-z0-9-]/', '', $texto('headline', 20));
$digitos = preg_replace('/\D/', '', $texto('telefone', 30));

if ($nome === '' || strlen($digitos) < 10) {
    responder(422, ['ok' => false, 'erro' => 'campos']);
}
if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $email = '';
}
// Kommo e WhatsApp esperam o número completo com DDI.
$telefone = '+' . (strlen($digitos) <= 11 ? '55' . $digitos : $digitos);

// Só as chaves que o tracking.ts captura; o resto é descartado.
$chavesOrigem = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'gclid', 'fbclid'];
$origemBruta = is_array($entrada['origem'] ?? null) ? $entrada['origem'] : [];
$origem = [];
foreach ($chavesOrigem as $chave) {
    if (isset($origemBruta[$chave]) && is_scalar($origemBruta[$chave])) {
        $origem[$chave] = mb_substr((string) $origemBruta[$chave], 0, 200);
    }
}

/* ---------- Kommo ---------- */

function kommo(array $config, string $caminho, array $corpo): array
{
    $ch = curl_init('https://' . $config['subdominio'] . '.kommo.com' . $caminho);
    curl_setopt_array($ch, [
        CURLOPT_POST => true,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 15,
        CURLOPT_HTTPHEADER => [
            'Authorization: Bearer ' . $config['token'],
            'Content-Type: application/json',
        ],
        CURLOPT_POSTFIELDS => json_encode($corpo, JSON_UNESCAPED_UNICODE),
    ]);
    $resposta = curl_exec($ch);
    $status = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $erroCurl = curl_error($ch);
    curl_close($ch);
    return [$status, is_string($resposta) ? json_decode($resposta, true) : null, $erroCurl ?: (string) $resposta];
}

$tags = array_map(fn ($t) => ['name' => $t], array_values(array_filter([
    ...($config['tags'] ?? ['site-paramind']),
    $versao ? "lp-$versao" : null,
    $headline ? "headline-$headline" : null,
    isset($origem['utm_source']) ? 'utm-' . preg_replace('/[^a-z0-9_-]/i', '', $origem['utm_source']) : null,
])));

$camposContato = [['field_code' => 'PHONE', 'values' => [['value' => $telefone, 'enum_code' => 'WORK']]]];
if ($email !== '') {
    $camposContato[] = ['field_code' => 'EMAIL', 'values' => [['value' => $email, 'enum_code' => 'WORK']]];
}

$lead = [
    'name' => 'Site · ' . ($empresa !== '' ? $empresa : $nome),
    '_embedded' => [
        'contacts' => [['first_name' => $nome, 'custom_fields_values' => $camposContato]],
        'tags' => $tags,
    ],
];
if ($empresa !== '') {
    $lead['_embedded']['companies'] = [['name' => $empresa]];
}
foreach (['pipeline_id', 'status_id', 'responsible_user_id'] as $chave) {
    if (!empty($config[$chave])) {
        $lead[$chave] = (int) $config[$chave];
    }
}

[$status, $json, $bruto] = kommo($config, '/api/v4/leads/complex', [$lead]);
$leadId = $json[0]['id'] ?? null;

$linhasNota = array_filter([
    $mensagem !== '' ? "Mensagem: $mensagem" : null,
    $empresa !== '' ? "Empresa: $empresa" : null,
    $email !== '' ? "E-mail: $email" : null,
    "Página: versão $versao · headline $headline",
    $texto('pagina', 500) !== '' ? 'URL: ' . $texto('pagina', 500) : null,
    $texto('referrer', 500) !== '' ? 'Referrer: ' . $texto('referrer', 500) : null,
    ...array_map(fn ($k, $v) => "$k: $v", array_keys($origem), $origem),
]);

if ($status >= 300 || !$leadId) {
    error_log("[paramind-lead] Kommo leads/complex HTTP $status: " . mb_substr($bruto, 0, 1000));

    // Não perde o lead: manda por e-mail se houver endereço de reserva configurado.
    if (!empty($config['email_reserva'])) {
        @mail(
            $config['email_reserva'],
            '=?UTF-8?B?' . base64_encode("Lead do site (Kommo falhou): $nome") . '?=',
            "Nome: $nome\nWhatsApp: $telefone\n" . implode("\n", $linhasNota),
            "Content-Type: text/plain; charset=utf-8"
        );
    }
    responder(502, ['ok' => false, 'erro' => 'kommo']);
}

$envios[] = $agora;
@file_put_contents($arquivoLimite, json_encode(array_values($envios)));

[$statusNota, , $brutoNota] = kommo($config, '/api/v4/leads/notes', [[
    'entity_id' => (int) $leadId,
    'note_type' => 'common',
    'params' => ['text' => implode("\n", $linhasNota)],
]]);
if ($statusNota >= 300) {
    // O lead já existe; a nota é complemento. Registra e segue.
    error_log("[paramind-lead] Kommo notes HTTP $statusNota: " . mb_substr($brutoNota, 0, 500));
}

responder(200, ['ok' => true]);

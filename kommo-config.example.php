<?php
/*
 * Copie como kommo-config.php e preencha. NÃO suba este arquivo preenchido
 * para o Git nem para dentro do public_html, se der: na Hostinger, coloque-o
 * na pasta acima de public_html (o api/lead.php procura lá primeiro).
 *
 * Token: Kommo > Configurações > Integrações > Criar integração (privada) >
 * aba "Chaves e escopos" > "Gerar token de longa duração".
 */
return [
    // https://SUBDOMINIO.kommo.com
    'subdominio' => 'paramind',
    'token' => 'COLE_AQUI_O_TOKEN_DE_LONGA_DURACAO',

    // Opcional: funil e etapa onde o lead entra. Sem isso, cai na primeira
    // etapa do funil principal. IDs em Kommo > Leads > (funil) > URL/configurações.
    'pipeline_id' => null,
    'status_id' => null,
    'responsible_user_id' => null,

    'tags' => ['site-paramind'],

    // Domínios autorizados a enviar o formulário (sem barra no fim).
    // Vazio = aceita qualquer origem.
    'origens_permitidas' => [
        'https://paramind.com.br',
        'https://www.paramind.com.br',
    ],

    // Se o Kommo falhar, o lead chega por e-mail aqui para não se perder.
    'email_reserva' => 'felipe.oliveira@paramind.com.br',
];

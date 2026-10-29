# Landing pages · Paramind

Três landings do Felipe Oliveira (Paramind), saídas dos três protótipos
(`v1-classica`, `v2-terminal`, `v3-editorial`). O texto é o mesmo; só o layout
muda. React + Vite + TypeScript, **mobile first**, e **cada versão tem o próprio
build**, para rodar como teste A/B em URLs diferentes.

| Versão | Layout | Dev | Build |
| --- | --- | --- | --- |
| v1 | clássica (escura, cards) | `npm run dev:v1` (porta 5191) | `npm run build:v1` → `dist/v1/` |
| v2 | terminal (grade, janelas mono) | `npm run dev:v2` (porta 5192) | `npm run build:v2` → `dist/v2/` |
| v3 | editorial (clara, títulos grandes) | `npm run dev:v3` (porta 5193) | `npm run build:v3` → `dist/v3/` |

```bash
npm install
npm run dev          # apresentação: http://localhost:5190
npm run build        # as três versões + a apresentação
npm run typecheck
```

O `base` do Vite é `./`, então cada `dist/<versão>/` funciona na raiz de um
domínio ou numa subpasta. É só subir a pasta.

## Apresentação

`npm run dev` abre a página principal com as três versões. Ao escolher uma,
um menu fixo no topo troca de versão, alterna **Desktop / Celular** (moldura de
telefone de 390px) e troca a **headline** do teste A/B. O estado fica na URL
(`?v=v2&tela=celular&h=prova`), então dá para mandar o link de uma combinação.

Atalhos: `1` `2` `3` trocam a versão, `D` desktop, `C` celular, `Esc` volta ao
início.

Cada versão roda num iframe com a própria página (`apresentacao/v1.html`...),
então o CSS de uma não vaza para a outra. A apresentação **não carrega GTM nem
Clarity** (para não sujar os dados) e tem `noindex`. Para publicar:
`npm run build:apresentacao` → `dist/apresentacao/`.

## Estrutura

```
src/content.ts      todo o texto, links, IDs de GTM/Clarity, headlines do A/B
src/tracking.ts     GTM, Clarity, eventos e captura de UTMs
src/hooks.ts        FAQ, headline e formulário (envio pro Kommo)
src/components.tsx  foto, vídeo, ícones, botão de WhatsApp
src/base.css        tokens e peças comuns
src/v1|v2|v3/       Page.tsx + CSS de cada versão
src/main.tsx        entrada; importa "@versao"
public/             imagens, vídeos e api/lead.php (comum às três)
vite.config.ts      --mode v1|v2|v3 escolhe a versão e a pasta de saída
```

O alias `@versao` aponta para `src/v1`, `src/v2` ou `src/v3` conforme o
`--mode`, então cada build leva só o layout e o CSS da própria versão.

**Mobile first**: o CSS nasce no celular e cresce em 640px e 900px (nenhuma
media query `max-width`). O que muda no celular por decisão: os três vídeos
viram carrossel com scroll-snap (empilhados dariam quatro telas), os rótulos do
formulário da v2 ficam acima do campo, os selos da v3 saem de cima da foto, e o
botão fixo de WhatsApp só aparece abaixo de 760px.

**Teste A/B da headline**: `?h=dor` (padrão), `resultado`, `curiosidade`,
`especificidade` ou `prova`. A versão e a headline vão pro dataLayer
(`lp_versao`, `lp_headline`), viram tags no Clarity e no lead do Kommo.

## Configuração

São três peças: **GTM** (onde ficam as tags de GA4, Meta e Google Ads),
**Clarity** (gravações e mapas de calor) e **Kommo** (CRM que recebe o
formulário). GTM e Clarity são configurados no código; o Kommo, num arquivo
PHP que fica só no servidor.

> Os IDs de GTM e Clarity são os mesmos para as três versões. Para comparar o
> A/B, filtre por `lp_versao` e `lp_headline` (variáveis no GTM, tags no
> Clarity, tags no Kommo) em vez de criar um contêiner/projeto por versão.

### 1. Google Tag Manager (tags)

1. Em [tagmanager.google.com](https://tagmanager.google.com), crie um
   contêiner **Web** (ex.: `paramind-landing`) e copie o ID `GTM-XXXXXXX`.
2. Cole em `TRACKING.gtm` no [src/content.ts](src/content.ts). **Não** cole o
   snippet do GTM no `index.html`: o `src/tracking.ts` já carrega o script.
3. Em **Variáveis > Variáveis definidas pelo usuário**, crie "Variável da
   camada de dados" para `lp_versao`, `lp_headline` e `cta_local`.
4. Em **Acionadores**, crie um "Evento personalizado" para cada evento abaixo,
   com o nome exato:

   | Evento | Quando |
   | --- | --- |
   | `whatsapp_click` | qualquer link `wa.me` (`cta_local`: hero, etapas, final, flutuante) |
   | `generate_lead` | formulário enviado e aceito pelo Kommo |
   | `form_error` | o envio falhou |
   | `video_play` | play num vídeo de resultado |
   | `faq_open` | pergunta do FAQ aberta |
   | `cookie_consent_update` | a pessoa aceitou ou recusou cookies no banner |

5. Crie as tags:
   - **GA4**: "Tag do Google" com o ID `G-...`, acionador *Initialization -
     All Pages*. Depois uma tag "Evento do GA4" para `generate_lead` e outra
     para `whatsapp_click`, mandando `lp_versao`, `lp_headline` e `cta_local`
     como parâmetros. No GA4, marque esses dois como **eventos-chave** e
     registre `lp_versao`/`lp_headline` como dimensões personalizadas.
   - **Pixel da Meta**: modelo "Facebook Pixel" da galeria (ou HTML
     personalizado) com `PageView` em All Pages, `Lead` em `generate_lead` e
     `Contact` em `whatsapp_click`. Em **Configurações avançadas >
     Configurações de consentimento**, marque *Exigir consentimento adicional*
     com `ad_storage`; sem isso o Pixel dispara mesmo quando a pessoa recusa
     os cookies.
   - **Google Ads**: "Rastreamento de conversões do Google Ads" com ID e
     rótulo da conversão, acionada por `generate_lead` (e outra para
     `whatsapp_click`, se quiser). Inclua também a tag "Vinculador de
     conversões" em All Pages.
6. **Consentimento (LGPD)**: o site já envia o Consent Mode v2 com tudo
   negado por padrão e atualiza quando a pessoa aceita. As tags do Google
   respeitam isso sozinhas; as de terceiros precisam do ajuste do Pixel acima.
   Em **Administrador > Configurações do contêiner**, ative a "Visão geral do
   consentimento" para conferir.
7. Teste no **Visualizar** (Tag Assistant) com `npm run dev:v1`: aceite os
   cookies, clique no WhatsApp, envie o formulário e veja os eventos chegando.
   Depois **Enviar > Publicar**.

### 2. Microsoft Clarity

1. Em [clarity.microsoft.com](https://clarity.microsoft.com), crie um projeto
   com o domínio do site e copie o **ID do projeto** (Configurações >
   Visão geral, 10 caracteres).
2. Cole em `TRACKING.clarity` no [src/content.ts](src/content.ts). Não instale
   o Clarity também pelo GTM, senão ele carrega duas vezes.
3. O Clarity só carrega **depois que a pessoa aceita os cookies**. Ao carregar,
   recebe as tags `lp_versao` e `lp_headline`: no painel, use
   **Filtros > Tags personalizadas** para ver gravações e mapas de calor de
   cada versão/headline.
4. (Opcional) Configurações > **Mascaramento**: deixe em "Equilibrado" ou
   "Estrito" para não gravar o que é digitado no formulário.
5. (Opcional) Configurações > Integrações > **Google Analytics**, para ligar
   as sessões do Clarity ao GA4.
6. Os dados aparecem em até ~2 horas após as primeiras visitas.

Enquanto os IDs estiverem com `XXXX`, nenhum script carrega (útil para
desenvolver sem sujar os dados).

### 3. Kommo (CRM)

O navegador manda o formulário para `api/lead.php` (mesma pasta do site), e o
PHP chama a API v4 do Kommo com um **token de longa duração**, que nunca chega
ao navegador:

1. `POST /api/v4/leads/complex`: lead + contato (telefone e e-mail) + empresa,
   com tags `site-paramind`, `lp-v1`, `headline-dor`, `utm-<origem>`.
2. `POST /api/v4/leads/notes`: nota com a mensagem, URL, referrer e UTMs.

Se o Kommo falhar, o lead vai por e-mail para `email_reserva`.
Proteções: honeypot, 5 envios por IP a cada 10 min e lista de domínios
autorizados.

> Os webhooks do Kommo são o caminho contrário: o Kommo avisando outro sistema
> quando algo muda. Para *criar* lead a partir do site, o caminho é a API acima.

Passo a passo:

1. **Token**: no Kommo, Configurações > Integrações > **Criar integração**
   (privada) > aba **Chaves e escopos** > **Gerar token de longa duração**.
   Copie na hora (ele só aparece uma vez).
2. **Config**: copie [kommo-config.example.php](kommo-config.example.php) como
   `kommo-config.php` e preencha:
   - `subdominio`: o que vem antes de `.kommo.com` (ex.: `paramind`);
   - `token`: o token do passo 1;
   - `pipeline_id` / `status_id` (opcional): funil e etapa onde o lead entra.
     Os IDs aparecem na URL ao abrir o funil em Leads, ou via
     `GET /api/v4/leads/pipelines`. Sem eles, o lead cai na primeira etapa do
     funil principal;
   - `responsible_user_id` (opcional): usuário responsável pelo lead;
   - `origens_permitidas`: o domínio de **cada** versão publicada, com
     `https://` e sem barra no fim (ex.: `https://lp1.paramind.com.br`);
   - `email_reserva`: para onde vai o lead se o Kommo estiver fora.
3. **Servidor**: na Hostinger, suba o `kommo-config.php` **uma pasta acima do
   `public_html`** (o `lead.php` procura lá primeiro, inclusive quando o site
   está numa subpasta). Esse arquivo está no `.gitignore` e não entra no
   build. A hospedagem precisa de PHP 8 com `curl` (padrão na Hostinger).
4. **Teste**: envie o formulário no site publicado e confira no Kommo o lead,
   as tags (`lp-v1`, `headline-...`) e a nota com as UTMs. Se der erro, o
   motivo fica no log de erros do PHP com o prefixo `[paramind-lead]`.

No `npm run dev` não tem PHP: um mock (`vite-lead-mock.ts`) responde o envio e
imprime o lead no terminal.

## Build e publicação

Cada versão é um site independente. Pré-requisito: Node 20+ e `npm install`
uma vez.

```bash
npm run build:v1            # → dist/v1/
npm run build:v2            # → dist/v2/
npm run build:v3            # → dist/v3/
npm run build:apresentacao  # → dist/apresentacao/
npm run build               # todas as anteriores
```

Para conferir o build antes de subir: `npm run preview:v1` (ou `v2`, `v3`).
Rode `npm run typecheck` antes, se mexeu no código. Os IDs de GTM/Clarity
entram no build, então gere de novo depois de alterá-los.

O que vai em cada `dist/<versão>/`: `index.html`, `assets/` (JS e CSS só
daquela versão), `img/`, `video/`, `api/lead.php` e as páginas de política e
termos. O `kommo-config.php` **não** vai junto; ele fica no servidor (passo 3
do Kommo).

Publicar na Hostinger:

1. Gere o build da versão.
2. No Gerenciador de Arquivos (ou FTP), envie **o conteúdo** de `dist/v1/`
   (não a pasta em si) para o `public_html` do domínio dessa versão, ou para
   uma subpasta (`public_html/v1/`). O `base` relativo faz funcionar nos dois
   casos.
3. Repita para v2 e v3, cada uma no seu domínio/subdomínio ou subpasta.
4. Confira se o domínio de cada versão está em `origens_permitidas` e faça um
   envio de teste em cada uma.

A apresentação (`dist/apresentacao/`) serve só para mostrar as versões ao
cliente: não leva GTM nem Clarity e tem `noindex`. Pode ir para uma subpasta
qualquer.

## Antes de publicar

- [ ] IDs reais de GTM e Clarity em `TRACKING` e contêiner do GTM publicado
- [ ] `kommo-config.php` na Hostinger e um lead de teste conferido no Kommo
- [ ] Página de política de privacidade em `LINKS.privacidade` (o formulário
      coleta dados pessoais, LGPD)
- [ ] Os vídeos somam ~44 MB; vale comprimir (ex.: 720p H.264) antes de subir

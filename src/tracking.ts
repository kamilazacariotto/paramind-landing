import { HEADLINES, TRACKING, type HeadlineKey } from "./content";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    clarity?: ((...args: unknown[]) => void) & { q?: unknown[] };
  }
}

export type Versao = "v1" | "v2" | "v3";

const configurado = (id: string) => Boolean(id) && !id.includes("XXXX");

/* Headline do teste A/B, lida de ?h=... (padrão: dor). */
export function headlineAtual(): HeadlineKey {
  const h = new URLSearchParams(window.location.search).get("h")?.toLowerCase();
  return h && h in HEADLINES ? (h as HeadlineKey) : "dor";
}

/* Envia um evento pro dataLayer (GTM). Funciona mesmo antes do GTM carregar. */
export function track(evento: string, dados: Record<string, unknown> = {}) {
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event: evento, ...dados });
}

const PARAMS_ORIGEM = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "gclid", "fbclid"];
const CHAVE_ORIGEM = "pm-origem";

/*
 * Guarda UTMs e IDs de clique da primeira página vista na sessão, para irem
 * junto com o lead mesmo se a pessoa navegar e o parâmetro sumir da URL.
 */
function capturarOrigem() {
  const url = new URLSearchParams(window.location.search);
  const achados: Record<string, string> = {};
  for (const p of PARAMS_ORIGEM) {
    const v = url.get(p);
    if (v) achados[p] = v;
  }
  if (Object.keys(achados).length === 0) return;
  try {
    sessionStorage.setItem(CHAVE_ORIGEM, JSON.stringify(achados));
  } catch {
    /* navegação privada sem storage: segue sem guardar */
  }
}

export function origem(): Record<string, string> {
  try {
    return JSON.parse(sessionStorage.getItem(CHAVE_ORIGEM) ?? "{}");
  } catch {
    return {};
  }
}

/* ---------- consentimento de cookies (LGPD) ---------- */

export type Consentimento = "aceito" | "recusado";
const CHAVE_CONSENTIMENTO = "pm-cookies";
export const EVENTO_PREFERENCIAS = "pm:preferencias-cookies";

export function consentimentoSalvo(): Consentimento | null {
  try {
    const v = localStorage.getItem(CHAVE_CONSENTIMENTO);
    return v === "aceito" || v === "recusado" ? v : null;
  } catch {
    return null;
  }
}

// O Consent Mode exige o objeto `arguments`, não um array: por isso function.
function gtag(..._args: unknown[]) {
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(arguments as unknown as Record<string, unknown>);
}

const estado = (aceito: boolean) => {
  const v = aceito ? "granted" : "denied";
  return { ad_storage: v, analytics_storage: v, ad_user_data: v, ad_personalization: v };
};

let clarityCarregado = false;
// Só vira true no iniciarTracking(); a apresentação não chama, então nada carrega lá.
let rastreamentoAtivo = false;

function aplicarConsentimento(valor: Consentimento) {
  const aceito = valor === "aceito";
  gtag("consent", "update", estado(aceito));
  track("cookie_consent_update", { cookie_consent: valor });
  if (aceito && rastreamentoAtivo && configurado(TRACKING.clarity) && !clarityCarregado) {
    clarityCarregado = true;
    carregarClarity(TRACKING.clarity);
    const headline = headlineAtual();
    window.clarity?.("set", "lp_versao", versaoAtual);
    window.clarity?.("set", "lp_headline", headline);
  }
}

/* Chamado pelo banner. Guarda a escolha e libera (ou não) as ferramentas. */
export function definirConsentimento(valor: Consentimento) {
  try {
    localStorage.setItem(CHAVE_CONSENTIMENTO, valor);
  } catch {
    /* sem storage: vale só para esta visita */
  }
  aplicarConsentimento(valor);
}

/* Link "Preferências de cookies" do rodapé: reabre o banner. */
export function abrirPreferenciasCookies() {
  window.dispatchEvent(new Event(EVENTO_PREFERENCIAS));
}

let versaoAtual: Versao = "v1";

function carregarGtm(id: string) {
  track("gtm.js", { "gtm.start": Date.now() });
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtm.js?id=${id}`;
  document.head.appendChild(s);
}

function carregarClarity(id: string) {
  const fila = (...args: unknown[]) => {
    (fila.q = fila.q ?? []).push(args);
  };
  fila.q = [] as unknown[];
  window.clarity = window.clarity ?? fila;
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.clarity.ms/tag/${id}`;
  document.head.appendChild(s);
}

/*
 * Chamado uma vez no main.tsx. Marca a versão e a headline (para comparar o
 * A/B), carrega o GTM com Consent Mode v2 negado por padrão e transforma todo
 * clique em link wa.me num evento "whatsapp_click".
 *
 * Sem aceite: o GTM carrega, mas as tags do Google só mandam sinais sem
 * cookie, e o Clarity não carrega. Tags de terceiros no GTM (Pixel da Meta)
 * precisam exigir o consentimento "ad_storage" nas configurações da tag.
 */
export function iniciarTracking(versao: Versao) {
  versaoAtual = versao;
  rastreamentoAtivo = true;
  capturarOrigem();

  gtag("consent", "default", {
    ...estado(false),
    functionality_storage: "granted",
    security_storage: "granted",
    wait_for_update: 500,
  });
  window.dataLayer?.push({ lp_versao: versao, lp_headline: headlineAtual() });

  const salvo = consentimentoSalvo();
  if (salvo) aplicarConsentimento(salvo);

  if (configurado(TRACKING.gtm)) carregarGtm(TRACKING.gtm);

  document.addEventListener("click", (evento) => {
    const link = (evento.target as Element | null)?.closest?.("a[href]");
    if (!link?.getAttribute("href")?.includes("wa.me")) return;
    track("whatsapp_click", { cta_local: link.getAttribute("data-cta") ?? "sem-rotulo" });
  });
}

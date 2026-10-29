import { useEffect, useRef, useState, type ChangeEventHandler, type ReactNode } from "react";

import { cookies, EMPRESA, IMG, LINKS, rodape } from "./content";
import {
  abrirPreferenciasCookies,
  consentimentoSalvo,
  definirConsentimento,
  EVENTO_PREFERENCIAS,
  track,
} from "./tracking";

/* Foto do Felipe: WebP responsivo com JPEG de reserva. */
export function FotoFelipe({ className, sizes = "(min-width: 900px) 50vw, 100vw", prioridade }: {
  className?: string;
  sizes?: string;
  prioridade?: boolean;
}) {
  return (
    <picture className={className}>
      <source type="image/webp" srcSet={IMG.felipe.webp} sizes={sizes} />
      <img
        src={IMG.felipe.src}
        alt={IMG.felipe.alt}
        width={1080}
        height={1080}
        loading={prioridade ? "eager" : "lazy"}
        fetchPriority={prioridade ? "high" : "auto"}
        decoding="async"
      />
    </picture>
  );
}

/* Botão que abre o WhatsApp. `cta` identifica o botão no evento do GTM. */
export function WhatsLink({ cta, className, children }: { cta: string; className: string; children: ReactNode }) {
  return (
    <a className={className} href={LINKS.whatsapp} target="_blank" rel="noopener" data-cta={cta}>
      {children}
    </a>
  );
}

/*
 * Vídeo de resultado em 9:16. Carrega só os metadados (o primeiro frame vira
 * capa via #t=0.5) e baixa o arquivo quando a pessoa aperta play. Tocar um
 * pausa os outros.
 */
export function VideoResultado({ src, indice, className }: { src: string; indice: number; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [tocando, setTocando] = useState(false);
  const numero = String(indice + 1).padStart(2, "0");

  const play = () => {
    document.querySelectorAll("video").forEach((v) => v !== ref.current && v.pause());
    setTocando(true);
    void ref.current?.play();
    track("video_play", { video: `resultado_${numero}` });
  };

  return (
    <div className={`pm-video ${className ?? ""}`}>
      <video ref={ref} src={`${src}#t=0.5`} preload="metadata" playsInline controls={tocando} />
      {!tocando && (
        <button type="button" className="pm-video__play" onClick={play} aria-label={`Assistir resultado ${indice + 1}`}>
          <span className="pm-video__icone">
            <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 4l14 8-14 8z" fill="currentColor" />
            </svg>
          </span>
          <span className="pm-video__rotulo">
            <span>resultado_{numero}</span>
            <span>▶ play</span>
          </span>
        </button>
      )}
    </div>
  );
}

const ICONES = {
  trafego: (
    <>
      <path d="M3 17l6-6 4 4 8-8" />
      <path d="M15 7h6v6" />
    </>
  ),
  local: (
    <>
      <path d="M12 21s-7-6.2-7-12a7 7 0 0114 0c0 5.8-7 12-7 12z" />
      <circle cx="12" cy="9" r="2.5" />
    </>
  ),
  crm: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 10h18M9 10v10" />
    </>
  ),
  alvo: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1" />
    </>
  ),
  cadeado: (
    <>
      <rect x="4" y="11" width="16" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 018 0v4" />
    </>
  ),
  chave: (
    <>
      <circle cx="8" cy="15" r="4" />
      <path d="M11 12l9-9M17 6l3 3M14 9l2 2" />
    </>
  ),
};

export type NomeIcone = keyof typeof ICONES;

export function Icone({ nome, tamanho = 24 }: { nome: NomeIcone; tamanho?: number }) {
  return (
    <svg
      width={tamanho}
      height={tamanho}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      {ICONES[nome]}
    </svg>
  );
}

/* Campo isca para robôs. Fica fora da tela e fora da ordem de tabulação. */
export function Honeypot(props: { name: string; value: string; onChange: ChangeEventHandler<HTMLInputElement> }) {
  return (
    <input {...props} className="pm-honeypot" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" />
  );
}

/* ---------- redes sociais ---------- */

const REDES = [
  {
    nome: "Instagram",
    href: LINKS.instagram,
    icone: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
      </>
    ),
  },
  {
    nome: "LinkedIn",
    href: LINKS.linkedin,
    icone: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <path d="M8 10.5V17M8 7.2v.1M12 17v-6.5M12 13.2c0-1.6 1-2.7 2.4-2.7 1.5 0 2.1 1 2.1 2.7V17" />
      </>
    ),
  },
  {
    nome: "WhatsApp",
    href: LINKS.whatsapp,
    icone: (
      <>
        <path d="M3.5 20.5l1.3-4A8.5 8.5 0 1 1 8 19.4z" />
        <path d="M9 8.6c.2-.5.5-.6.8-.6h.5c.2 0 .4.1.5.4l.7 1.6c.1.2 0 .5-.1.7l-.5.6c.6 1.2 1.6 2.2 2.8 2.8l.6-.5c.2-.2.5-.2.7-.1l1.6.7c.3.1.4.3.4.5v.5c0 .3-.1.6-.6.8-.6.3-1.5.4-2.6 0-2-.8-3.7-2.5-4.5-4.5-.4-1.1-.3-2 0-2.6z" />
      </>
    ),
  },
];

export function RedesSociais({ className }: { className?: string }) {
  return (
    <ul className={`pm-redes ${className ?? ""}`}>
      {REDES.map((r) => (
        <li key={r.nome}>
          <a
            href={r.href}
            target="_blank"
            rel="noopener"
            aria-label={r.nome}
            title={r.nome}
            data-cta={r.nome === "WhatsApp" ? "rodape" : undefined}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              {r.icone}
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
}

/* ---------- rodapé (igual nas três versões; cores vêm das variáveis --pm-rodape-*) ---------- */

export function Rodape({ className }: { className?: string }) {
  // Ano de quem acessa: a virada de ano acontece sozinha, sem republicar.
  const ano = new Date().getFullYear();
  return (
    <footer className={`pm-rodape ${className ?? ""}`}>
      <div className="pm-wrap pm-rodape__grade">
        <div className="pm-rodape__marca">
          <img src={IMG.logoVerde} alt="Paramind" width={104} height={30} loading="lazy" />
          <span>{rodape.tagline}</span>
        </div>
        <div className="pm-rodape__contato">
          <RedesSociais />
          <a href={LINKS.email}>{rodape.email}</a>
        </div>
      </div>
      <div className="pm-wrap pm-rodape__legal">
        <nav className="pm-rodape__links">
          <a href={LINKS.privacidade}>{rodape.privacidade}</a>
          <a href={LINKS.termos}>{rodape.termos}</a>
          <button type="button" onClick={abrirPreferenciasCookies}>
            {rodape.cookies}
          </button>
        </nav>
        <p>
          © {ano} {EMPRESA.razao} · CNPJ {EMPRESA.cnpj} · {EMPRESA.atividade} · Todos os direitos reservados
        </p>
      </div>
    </footer>
  );
}

/* ---------- banner de cookies ---------- */

export function CookieBanner() {
  const [aberto, setAberto] = useState(() => consentimentoSalvo() === null);

  useEffect(() => {
    const abrir = () => setAberto(true);
    window.addEventListener(EVENTO_PREFERENCIAS, abrir);
    return () => window.removeEventListener(EVENTO_PREFERENCIAS, abrir);
  }, []);

  if (!aberto) return null;

  const escolher = (valor: "aceito" | "recusado") => {
    definirConsentimento(valor);
    setAberto(false);
  };

  return (
    <div className="pm-cookies" role="dialog" aria-live="polite" aria-label="Aviso de cookies">
      <p>
        {cookies.texto} <a href={LINKS.privacidade}>{cookies.saibaMais}</a>
      </p>
      <div className="pm-cookies__acoes">
        <button type="button" className="pm-cookies__recusar" onClick={() => escolher("recusado")}>
          {cookies.recusar}
        </button>
        <button type="button" className="pm-cookies__aceitar" onClick={() => escolher("aceito")}>
          {cookies.aceitar}
        </button>
      </div>
    </div>
  );
}

import { StrictMode, useEffect, useState, type SyntheticEvent } from "react";
import { createRoot } from "react-dom/client";

import { HEADLINES, IMG, type HeadlineKey } from "../content";
import "./apresentacao.css";

/*
 * Página principal da apresentação: apresenta as três versões e, ao escolher
 * uma, mostra um menu fixo para alternar versão, tela (desktop/celular) e
 * headline do teste A/B. O estado fica na URL (?v=v2&tela=celular&h=prova),
 * então dá para mandar o link de uma combinação específica.
 */

const VERSOES = [
  {
    id: "v1",
    nome: "Clássica",
    texto: "Fundo escuro, cards e blocos claros no problema e no FAQ. A mais direta e segura.",
    cores: ["#111216", "#191a20", "#ededed", "#a05cbf", "#00b189"],
  },
  {
    id: "v2",
    nome: "Terminal",
    texto: "Grade de fundo, janelas de terminal e rótulos numerados. Reforça o lado tech e de sistema.",
    cores: ["#111216", "#0b0c0f", "#2a2b33", "#a05cbf", "#00b189"],
  },
  {
    id: "v3",
    nome: "Editorial",
    texto: "Fundo claro, títulos grandes e blocos de cor chapada. A mais marcante visualmente.",
    cores: ["#ededed", "#ffffff", "#111216", "#a05cbf", "#00b189"],
  },
] as const;

type IdVersao = (typeof VERSOES)[number]["id"];
type Tela = "desktop" | "celular";

const NOMES_HEADLINE: Record<HeadlineKey, string> = {
  dor: "Dor",
  resultado: "Resultado",
  curiosidade: "Curiosidade",
  especificidade: "Especificidade",
  prova: "Prova",
};

type Estado = { v: IdVersao | null; tela: Tela; h: HeadlineKey };

function lerUrl(): Estado {
  const p = new URLSearchParams(window.location.search);
  const v = p.get("v");
  const h = p.get("h");
  return {
    v: VERSOES.some((x) => x.id === v) ? (v as IdVersao) : null,
    tela: p.get("tela") === "celular" ? "celular" : "desktop",
    h: h && h in HEADLINES ? (h as HeadlineKey) : "dor",
  };
}

function gravarUrl({ v, tela, h }: Estado) {
  const p = new URLSearchParams();
  if (v) p.set("v", v);
  if (v && tela === "celular") p.set("tela", "celular");
  if (v && h !== "dor") p.set("h", h);
  const q = p.toString();
  window.history.pushState(null, "", q ? `?${q}` : window.location.pathname);
}

function Apresentacao() {
  const [estado, setEstado] = useState<Estado>(lerUrl);
  const mudar = (parcial: Partial<Estado>) => {
    const novo = { ...estado, ...parcial };
    setEstado(novo);
    gravarUrl(novo);
  };

  // Voltar/avançar do navegador acompanha o menu.
  useEffect(() => {
    const voltar = () => setEstado(lerUrl());
    window.addEventListener("popstate", voltar);
    return () => window.removeEventListener("popstate", voltar);
  }, []);

  // Atalhos para apresentar: 1/2/3 trocam a versão, D/C a tela, Esc volta ao início.
  useEffect(() => {
    const tecla = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLSelectElement || e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.target instanceof HTMLElement && e.target.closest("input, textarea")) return;
      const k = e.key.toLowerCase();
      if (k === "1" || k === "2" || k === "3") mudar({ v: `v${k}` as IdVersao });
      else if (k === "d" && estado.v) mudar({ tela: "desktop" });
      else if (k === "c" && estado.v) mudar({ tela: "celular" });
      else if (k === "escape") mudar({ v: null });
    };
    window.addEventListener("keydown", tecla);
    return () => window.removeEventListener("keydown", tecla);
  });

  return estado.v ? <Visualizador estado={estado} mudar={mudar} /> : <Inicio abrir={(v) => mudar({ v })} />;
}

function Inicio({ abrir }: { abrir: (v: IdVersao) => void }) {
  return (
    <div className="ap-inicio">
      <header className="ap-wrap ap-inicio__topo">
        <img src={IMG.logoDark} alt="Paramind" width={119} height={34} />
        <span className="ap-mono">// apresentação</span>
      </header>

      <main className="ap-wrap">
        <div className="ap-inicio__intro">
          <span className="ap-mono ap-roxo">landing page · teste A/B</span>
          <h1>Três caminhos para a landing da Paramind</h1>
          <p>
            O mesmo texto, a mesma oferta e o mesmo formulário em três linguagens visuais. Escolha uma para começar;
            no menu de cima dá para trocar de versão, ver no celular e testar as headlines.
          </p>
        </div>

        <ol className="ap-cards">
          {VERSOES.map((v, i) => (
            <li key={v.id}>
              <button type="button" className="ap-card" onClick={() => abrir(v.id)}>
                <span className="ap-card__amostra" aria-hidden="true">
                  {v.cores.map((c) => (
                    <span key={c} style={{ background: c }} />
                  ))}
                </span>
                <span className="ap-mono ap-roxo">0{i + 1}</span>
                <span className="ap-card__nome">{v.nome}</span>
                <span className="ap-card__texto">{v.texto}</span>
                <span className="ap-card__abrir">Ver versão →</span>
              </button>
            </li>
          ))}
        </ol>

        <p className="ap-mono ap-atalhos">
          atalhos: <kbd>1</kbd> <kbd>2</kbd> <kbd>3</kbd> trocam a versão · <kbd>D</kbd> desktop · <kbd>C</kbd>{" "}
          celular · <kbd>Esc</kbd> volta aqui
        </p>
      </main>
    </div>
  );
}

/* Com o foco dentro do iframe, as teclas não chegam aqui: repassa (menos quem digita no formulário). */
function repassarTeclas(e: SyntheticEvent<HTMLIFrameElement>) {
  e.currentTarget.contentWindow?.addEventListener("keydown", (ev) => {
    const alvo = ev.target as HTMLElement;
    if (alvo.closest("input, textarea, select")) return;
    window.dispatchEvent(new KeyboardEvent("keydown", { key: ev.key }));
  });
}

function Visualizador({ estado, mudar }: { estado: Estado; mudar: (p: Partial<Estado>) => void }) {
  const src = `${estado.v}.html${estado.h !== "dor" ? `?h=${estado.h}` : ""}`;

  return (
    <div className={`ap-visualizador ap-visualizador--${estado.tela}`}>
      <nav className="ap-menu" aria-label="Versões">
        <button type="button" className="ap-menu__inicio" onClick={() => mudar({ v: null })} aria-label="Início">
          <img src={IMG.icone} alt="" width={28} height={31} />
          <span>Início</span>
        </button>

        <div className="ap-segmentos" role="tablist">
          {VERSOES.map((v, i) => (
            <button
              key={v.id}
              type="button"
              role="tab"
              aria-selected={estado.v === v.id}
              onClick={() => mudar({ v: v.id })}
            >
              <span className="ap-mono">0{i + 1}</span> {v.nome}
            </button>
          ))}
        </div>

        <div className="ap-menu__direita">
          <div className="ap-segmentos ap-segmentos--tela">
            {(["desktop", "celular"] as const).map((t) => (
              <button key={t} type="button" aria-pressed={estado.tela === t} onClick={() => mudar({ tela: t })}>
                {t === "desktop" ? "Desktop" : "Celular"}
              </button>
            ))}
          </div>
          <label className="ap-headline">
            <span className="ap-mono">headline</span>
            <select value={estado.h} onChange={(e) => mudar({ h: e.target.value as HeadlineKey })}>
              {(Object.keys(HEADLINES) as HeadlineKey[]).map((k) => (
                <option key={k} value={k}>
                  {NOMES_HEADLINE[k]}
                </option>
              ))}
            </select>
          </label>
        </div>
      </nav>

      <div className="ap-palco">
        <iframe key={src} className="ap-frame" src={src} title={`Paramind ${estado.v}`} onLoad={repassarTeclas} />
      </div>
    </div>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Apresentacao />
  </StrictMode>,
);

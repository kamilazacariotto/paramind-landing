import {
  autoridade,
  ctaFinal,
  etapas,
  faq,
  flutuante,
  formulario,
  garantia,
  hero,
  IMG,
  LINKS,
  paraQuem,
  problema,
  provas,
  solucao,
} from "../content";
import { CookieBanner, FotoFelipe, Honeypot, Icone, Rodape, VideoResultado, WhatsLink } from "../components";
import { useFaq, useHeadline, useLeadForm, type CamposLead } from "../hooks";

const SISTEMA = ["perfil", "site", "google", "crm", "atendimento", "metas por setor"];
const CAMPOS: { nome: Exclude<keyof CamposLead, "site">; tipo?: string; auto?: string; obrigatorio?: boolean }[] = [
  { nome: "nome", auto: "name", obrigatorio: true },
  { nome: "telefone", tipo: "tel", auto: "tel-national", obrigatorio: true },
  { nome: "email", tipo: "email", auto: "email" },
  { nome: "empresa", auto: "organization" },
];

/* v2 · Terminal — grade de fundo, janelas de terminal, rótulos numerados. */
export function PageV2() {
  const h1 = useHeadline();
  const { aberto, alternar } = useFaq();
  const form = useLeadForm("v2");

  return (
    <div className="pm-page v2">
      <header className="v2-topo">
        <div className="pm-wrap v2-topo__linha">
          <img src={IMG.logoDark} alt="Paramind" width={105} height={30} />
          <span className="pm-mono v2-topo__site">
            <span className="v2-ponto" aria-hidden="true" />
            paramind.com.br
          </span>
        </div>
      </header>

      <main>
        <section className="pm-wrap v2-hero">
          <div className="v2-hero__texto">
            <span className="pm-mono v2-selo">{hero.eyebrow}</span>
            <h1 className="v2-h1">
              {h1.a} <span className="pm-destaque">{h1.b}</span>
            </h1>
            <p className="v2-lead">{hero.texto}</p>
            <div className="v2-hero__cta">
              <WhatsLink cta="hero" className="pm-btn v2-btn v2-btn--brilho">
                {hero.cta} <span className="pm-mono">→</span>
              </WhatsLink>
              <div className="v2-hero__felipe">
                <FotoFelipe className="v2-avatar" sizes="44px" />
                <span>{hero.nota}</span>
              </div>
            </div>
          </div>

          <div className="v2-janela">
            <div className="v2-janela__barra">
              <span />
              <span />
              <span />
              <span className="pm-mono">diagnostico.sh</span>
            </div>
            <div className="v2-janela__foto">
              <FotoFelipe className="pm-foto" prioridade />
            </div>
            <div className="pm-mono v2-janela__terminal">
              <div>
                <span className="pm-destaque">$</span> conectar --sistema-inteiro
              </div>
              <ul>
                {SISTEMA.map((s) => (
                  <li key={s}>
                    <span className="v2-verde">✓</span> {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <div className="v2-provas">
          <ul className="pm-wrap pm-mono">
            {provas.map((p) => (
              <li key={p.tag}>
                <span className="pm-destaque">{p.tag}</span> {p.texto}
              </li>
            ))}
          </ul>
        </div>

        <section className="pm-secao v2-claro">
          <div className="pm-wrap v2-duas">
            <div className="v2-pilha">
              <span className="pm-mono v2-rotulo">[02] problema</span>
              <h2 className="v2-h2">{problema.titulo}</h2>
              <p className="v2-intro">{problema.intro}</p>
            </div>
            <div className="v2-chat">
              {problema.frases.map((f) => (
                <div key={f} className="v2-chat__msg">
                  {f}
                </div>
              ))}
              <div className="v2-chat__msg v2-chat__msg--resposta">
                {problema.virada} {problema.viradaDestaque}
              </div>
            </div>
          </div>
        </section>

        <section className="pm-secao">
          <div className="pm-wrap v2-pilha v2-pilha--larga">
            <div className="v2-duas v2-duas--base">
              <div className="v2-pilha">
                <span className="pm-mono v2-rotulo">[03] solução</span>
                <h2 className="v2-h2">
                  {solucao.titulo} {solucao.tituloDestaque}
                </h2>
              </div>
              <p className="v2-corpo">{solucao.texto}</p>
            </div>
            <ul className="v2-modulos">
              {solucao.pilares.map((p, i) => (
                <li key={p.titulo}>
                  <span className="pm-mono pm-destaque">/{String(i + 1).padStart(2, "0")}</span>
                  <h3>{p.titulo}</h3>
                  <p>{p.texto}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="pm-secao v2-borda-topo">
          <div className="pm-wrap v2-pilha v2-pilha--larga">
            <div className="v2-pilha">
              <span className="pm-mono v2-rotulo">[04] como funciona</span>
              <h2 className="v2-h2 v2-h2--limite">{etapas.titulo}</h2>
            </div>
            <ol className="v2-etapas">
              {etapas.passos.map((p, i) => (
                <li key={p.titulo}>
                  <div className="v2-etapas__num">
                    <span className="pm-mono">{String(i + 1).padStart(2, "0")}</span>
                    <span className="v2-etapas__linha" aria-hidden="true" />
                  </div>
                  <h3>{p.titulo}</h3>
                  <p>{p.texto}</p>
                </li>
              ))}
            </ol>
            <div className="v2-cta">
              <WhatsLink cta="etapas" className="pm-btn v2-btn">
                {etapas.cta} <span className="pm-mono">→</span>
              </WhatsLink>
              <span className="pm-mono v2-nota">{etapas.nota}</span>
            </div>
          </div>
        </section>

        <section className="pm-secao v2-faixa">
          <div className="pm-wrap v2-duas v2-duas--topo">
            <div className="v2-pilha">
              <span className="pm-mono v2-rotulo">[05] autoridade</span>
              <h2 className="v2-h2">{autoridade.titulo}</h2>
              <p className="v2-corpo">{autoridade.texto}</p>
              <dl className="v2-numeros">
                {autoridade.numeros.map((n) => (
                  <div key={n.rotulo}>
                    <dt className="pm-mono">{n.valor}</dt>
                    <dd>{n.rotulo}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="v2-pilha v2-pilha--curta">
              <div className="v2-autor__foto">
                <FotoFelipe className="pm-foto" />
              </div>
              <div className="pm-videos v2-videos">
                {autoridade.videos.map((v, i) => (
                  <VideoResultado key={v} src={v} indice={i} />
                ))}
              </div>
              <span className="pm-mono v2-nota">{autoridade.videosRotulo}</span>
            </div>
          </div>
        </section>

        <section className="pm-secao">
          <div className="pm-wrap v2-pilha">
            <span className="pm-mono v2-rotulo">[06] para quem é</span>
            <div className="v2-diff pm-mono">
              <div className="v2-diff__lado">
                <h2>{paraQuem.simTitulo}</h2>
                <ul>
                  {paraQuem.sim.map((t) => (
                    <li key={t} className="v2-diff__mais">
                      <span aria-hidden="true">+</span>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="v2-diff__lado v2-diff__lado--nao">
                <h2>{paraQuem.naoTitulo}</h2>
                <ul>
                  {paraQuem.nao.map((t) => (
                    <li key={t}>
                      <span aria-hidden="true">−</span>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="v2-garantia-secao">
          <div className="pm-wrap">
            <div className="v2-garantia">
              <div className="v2-garantia__titulo">
                <span className="v2-garantia__icone">
                  <Icone nome="chave" tamanho={28} />
                </span>
                <h2 className="v2-h2">{garantia.titulo}</h2>
              </div>
              <p className="v2-corpo">{garantia.texto}</p>
            </div>
          </div>
        </section>

        <section className="pm-secao v2-claro">
          <div className="pm-wrap v2-faq-grade">
            <div className="v2-pilha">
              <span className="pm-mono v2-rotulo">[08] faq</span>
              <h2 className="v2-h2">{faq.titulo}</h2>
            </div>
            <div className="v2-faq">
              {faq.itens.map((f, i) => (
                <div key={f.q} className="v2-faq__item">
                  <button type="button" aria-expanded={aberto === i} onClick={() => alternar(i, f.q)}>
                    <span className="pm-mono" aria-hidden="true">
                      {aberto === i ? "[−]" : "[+]"}
                    </span>
                    <span>{f.q}</span>
                  </button>
                  {aberto === i && <p>{f.a}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="pm-secao" id="contato">
          <div className="pm-wrap v2-form-wrap v2-pilha v2-pilha--media">
            <div className="v2-pilha">
              <span className="pm-mono v2-rotulo">[09] contato</span>
              <h2 className="v2-h2">{formulario.titulo}</h2>
              <p className="v2-corpo">{formulario.texto}</p>
            </div>
            {form.enviado ? (
              <div className="v2-form v2-form--ok pm-mono" role="status">
                <span className="v2-verde">✓ </span>
                {formulario.sucesso}
              </div>
            ) : (
              <form className="v2-form" onSubmit={form.enviar}>
                {CAMPOS.map((c) => (
                  <label key={c.nome} className="v2-form__linha">
                    <span className="pm-mono">{formulario.campos[c.nome].rotulo}</span>
                    <input
                      {...form.campo(c.nome)}
                      type={c.tipo ?? "text"}
                      inputMode={c.tipo === "tel" ? "tel" : undefined}
                      autoComplete={c.auto}
                      required={c.obrigatorio}
                      placeholder={formulario.campos[c.nome].placeholder}
                      aria-invalid={c.nome === "telefone" ? form.erroTelefone : undefined}
                    />
                    {c.nome === "telefone" && form.erroTelefone && (
                      <span className="pm-form-erro v2-form__erro">{formulario.erroTelefone}</span>
                    )}
                  </label>
                ))}
                <label className="v2-form__linha v2-form__linha--topo">
                  <span className="pm-mono">{formulario.campos.mensagem.rotulo}</span>
                  <textarea {...form.campo("mensagem")} rows={3} placeholder={formulario.campos.mensagem.placeholder} />
                </label>
                <Honeypot {...form.campo("site")} />
                <div className="v2-form__rodape">
                  {form.erro && (
                    <span className="pm-form-erro" role="alert">
                      {formulario.erro} <a href={LINKS.whatsapp}>Abrir WhatsApp</a>
                    </span>
                  )}
                  <span className="v2-form__nota">
                    {formulario.privacidade} · <a href={LINKS.privacidade}>Política de privacidade</a>
                  </span>
                  <button type="submit" className="pm-btn v2-btn" disabled={form.enviando}>
                    {form.enviando ? formulario.enviando : formulario.botao}
                  </button>
                </div>
              </form>
            )}
          </div>
        </section>

        <section className="v2-final-secao">
          <div className="pm-wrap">
            <div className="v2-final">
              <div className="v2-final__pattern" style={{ backgroundImage: `url(${IMG.pattern})` }} />
              <h2 className="v2-h2 v2-h2--grande">
                {ctaFinal.titulo} {ctaFinal.tituloDestaque}
              </h2>
              <p>{ctaFinal.texto}</p>
              <WhatsLink cta="final" className="pm-btn v2-btn v2-btn--sombra">
                {ctaFinal.cta} <span className="pm-mono">→</span>
              </WhatsLink>
              <span className="pm-mono v2-final__nota">{ctaFinal.nota}</span>
            </div>
          </div>
        </section>
      </main>

      <Rodape className="v2-rodape" />

      <WhatsLink cta="flutuante" className="pm-flutuante v2-flutuante">
        <span className="v2-flutuante__ponto" aria-hidden="true" />
        {flutuante}
      </WhatsLink>
      <CookieBanner />
    </div>
  );
}

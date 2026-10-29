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
import { CookieBanner, FotoFelipe, Honeypot, Rodape, VideoResultado, WhatsLink } from "../components";
import { useFaq, useHeadline, useLeadForm } from "../hooks";

function Seta() {
  return (
    <span className="v3-seta" aria-hidden="true">
      ↗
    </span>
  );
}

/* v3 · Editorial — fundo claro, títulos grandes, blocos de cor chapada. */
export function PageV3() {
  const h1 = useHeadline();
  const { aberto, alternar } = useFaq();
  const form = useLeadForm("v3");

  return (
    <div className="pm-page v3">
      <header className="pm-wrap v3-topo">
        <img src={IMG.logoLight} alt="Paramind" width={103} height={34} />
        <span className="pm-mono v3-topo__eyebrow">{hero.eyebrow}</span>
      </header>

      <main>
        <section className="pm-wrap v3-hero">
          <h1 className="v3-h1">
            {h1.a} <span className="pm-destaque">{h1.b}</span>
          </h1>
          <div className="v3-duas v3-duas--base">
            <p className="v3-lead">{hero.texto}</p>
            <div className="v3-cta">
              <WhatsLink cta="hero" className="pm-btn v3-btn">
                {hero.cta} <Seta />
              </WhatsLink>
              <span className="v3-nota">{hero.nota}</span>
            </div>
          </div>
          <div className="v3-hero__foto">
            <FotoFelipe className="pm-foto" prioridade sizes="(min-width: 1320px) 1272px, 100vw" />
            <ul className="v3-hero__selos pm-mono">
              {provas.map((p) => (
                <li key={p.texto}>{p.texto}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="pm-secao v3-roxo">
          <img src={IMG.icone} alt="" className="v3-roxo__icone" loading="lazy" />
          <div className="pm-wrap v3-pilha v3-pilha--larga">
            <div className="v3-pilha v3-limite">
              <h2 className="v3-h2 v3-h2--xl">{problema.titulo}</h2>
              <p className="v3-lead v3-lead--claro">{problema.intro}</p>
            </div>
            <ul className="v3-baloes">
              {problema.frases.map((f) => (
                <li key={f}>“{f}”</li>
              ))}
            </ul>
            <p className="v3-virada">
              {problema.virada} {problema.viradaDestaque}
            </p>
          </div>
        </section>

        <section className="pm-secao v3-escuro">
          <div className="pm-wrap v3-pilha v3-pilha--larga">
            <div className="v3-duas v3-duas--base">
              <h2 className="v3-h2">
                {solucao.titulo} <span className="pm-destaque">{solucao.tituloDestaque}</span>
              </h2>
              <p className="v3-corpo v3-corpo--escuro">{solucao.texto}</p>
            </div>
            <ul className="v3-servicos">
              {solucao.pilares.map((p, i) => (
                <li key={p.titulo}>
                  <h3>
                    <span className="pm-mono">{String(i + 1).padStart(2, "0")}</span>
                    {p.titulo}
                  </h3>
                  <p>{p.texto}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="pm-secao">
          <div className="pm-wrap v3-pilha v3-pilha--larga">
            <h2 className="v3-h2 v3-limite">{etapas.titulo}</h2>
            <ol className="v3-etapas">
              {etapas.passos.map((p, i) => (
                <li key={p.titulo}>
                  <span className="pm-mono">{i + 1}</span>
                  <h3>{p.titulo}</h3>
                  <p>{p.texto}</p>
                </li>
              ))}
            </ol>
            <div className="v3-cta v3-cta--linha">
              <WhatsLink cta="etapas" className="pm-btn v3-btn">
                {etapas.cta} <Seta />
              </WhatsLink>
              <span className="v3-nota">{etapas.nota}</span>
            </div>
          </div>
        </section>

        <section className="pm-secao v3-branco">
          <div className="pm-wrap v3-pilha v3-pilha--larga">
            <div className="v3-duas v3-duas--centro">
              <div className="v3-autor__foto">
                <FotoFelipe className="pm-foto" />
              </div>
              <div className="v3-pilha">
                <span className="pm-mono v3-rotulo">{autoridade.eyebrow}</span>
                <h2 className="v3-h2">{autoridade.titulo}</h2>
                <p className="v3-corpo">{autoridade.texto}</p>
                <dl className="v3-numeros">
                  {autoridade.numeros.map((n) => (
                    <div key={n.rotulo}>
                      <dt>{n.valor}</dt>
                      <dd>{n.rotulo}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
            <div className="pm-videos v3-videos">
              {autoridade.videos.map((v, i) => (
                <VideoResultado key={v} src={v} indice={i} />
              ))}
            </div>
          </div>
        </section>

        <section className="pm-secao">
          <div className="pm-wrap v3-para-quem">
            <div className="v3-lista v3-lista--sim">
              <h2>{paraQuem.simTitulo}</h2>
              <ul>
                {paraQuem.sim.map((t) => (
                  <li key={t}>
                    <span aria-hidden="true">✓</span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="v3-lista v3-lista--nao">
              <h2>{paraQuem.naoTitulo}</h2>
              <ul>
                {paraQuem.nao.map((t) => (
                  <li key={t}>
                    <span aria-hidden="true">✕</span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="v3-garantia-secao">
          <div className="pm-wrap">
            <div className="v3-garantia">
              <div className="v3-garantia__pattern" style={{ backgroundImage: `url(${IMG.pattern})` }} />
              <h2 className="v3-h2 v3-h2--xl">{garantia.titulo}</h2>
              <p>{garantia.texto}</p>
            </div>
          </div>
        </section>

        <section className="pm-secao v3-branco">
          <div className="pm-wrap v3-faq-wrap v3-pilha v3-pilha--media">
            <h2 className="v3-h2">{faq.titulo}</h2>
            <div className="v3-faq">
              {faq.itens.map((f, i) => (
                <div key={f.q} className="v3-faq__item">
                  <button type="button" aria-expanded={aberto === i} onClick={() => alternar(i, f.q)}>
                    {f.q}
                    <span aria-hidden="true">{aberto === i ? "−" : "+"}</span>
                  </button>
                  {aberto === i && <p>{f.a}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="pm-secao" id="contato">
          <div className="pm-wrap v3-duas v3-duas--topo">
            <div className="v3-pilha">
              <h2 className="v3-h2">{formulario.titulo}</h2>
              <p className="v3-lead">{formulario.texto}</p>
            </div>
            {form.enviado ? (
              <div className="v3-form v3-form--ok" role="status">
                {formulario.sucesso}
              </div>
            ) : (
              <form className="v3-form" onSubmit={form.enviar}>
                <input
                  {...form.campo("nome")}
                  required
                  autoComplete="name"
                  placeholder={formulario.campos.nome.placeholder}
                  aria-label={formulario.campos.nome.rotulo}
                />
                <input
                  {...form.campo("telefone")}
                  required
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel-national"
                  placeholder={formulario.campos.telefone.placeholder}
                  aria-label={formulario.campos.telefone.rotulo}
                  aria-invalid={form.erroTelefone}
                />
                {form.erroTelefone && <span className="pm-form-erro v3-inteira">{formulario.erroTelefone}</span>}
                <input
                  {...form.campo("email")}
                  type="email"
                  autoComplete="email"
                  placeholder={formulario.campos.email.placeholder}
                  aria-label={formulario.campos.email.rotulo}
                />
                <input
                  {...form.campo("empresa")}
                  autoComplete="organization"
                  placeholder={formulario.campos.empresa.placeholder}
                  aria-label={formulario.campos.empresa.rotulo}
                />
                <textarea
                  {...form.campo("mensagem")}
                  className="v3-inteira"
                  rows={3}
                  placeholder={formulario.campos.mensagem.placeholder}
                  aria-label={formulario.campos.mensagem.rotulo}
                />
                <Honeypot {...form.campo("site")} />
                <button type="submit" className="pm-btn v3-btn v3-inteira" disabled={form.enviando}>
                  {form.enviando ? formulario.enviando : formulario.botao}
                </button>
                {form.erro && (
                  <span className="pm-form-erro v3-inteira" role="alert">
                    {formulario.erro} <a href={LINKS.whatsapp}>Abrir WhatsApp</a>
                  </span>
                )}
                <span className="v3-form__nota v3-inteira">
                  {formulario.privacidade} · <a href={LINKS.privacidade}>Política de privacidade</a>
                </span>
              </form>
            )}
          </div>
        </section>

        <section className="v3-final">
          <div className="pm-wrap v3-pilha v3-pilha--media">
            <h2 className="v3-h1">
              {ctaFinal.titulo} <span className="pm-destaque">{ctaFinal.tituloDestaque}</span>
            </h2>
            <div className="v3-duas v3-duas--centro">
              <p className="v3-lead v3-lead--escuro">{ctaFinal.texto}</p>
              <div className="v3-cta">
                <WhatsLink cta="final" className="pm-btn v3-btn">
                  {ctaFinal.cta} <Seta />
                </WhatsLink>
                <span className="v3-nota v3-nota--escuro">{ctaFinal.nota}</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Rodape className="v3-rodape" />

      <WhatsLink cta="flutuante" className="pm-flutuante v3-flutuante">
        {flutuante}
      </WhatsLink>
      <CookieBanner />
    </div>
  );
}

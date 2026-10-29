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
import { useFaq, useHeadline, useLeadForm } from "../hooks";

/* v1 · Clássica — fundo escuro, cards, blocos claros no problema e no FAQ. */
export function PageV1() {
  const h1 = useHeadline();
  const { aberto, alternar } = useFaq();
  const form = useLeadForm("v1");

  return (
    <div className="pm-page v1">
      <header className="pm-wrap v1-topo">
        <img src={IMG.logoDark} alt="Paramind" width={119} height={34} />
        <span className="pm-mono v1-topo__assinatura">{hero.assinatura}</span>
      </header>

      <main>
        <section className="pm-wrap v1-hero">
          <div className="v1-hero__texto">
            <span className="pm-mono v1-eyebrow">{hero.eyebrow}</span>
            <h1 className="v1-h1">
              {h1.a} <span className="pm-destaque">{h1.b}</span>
            </h1>
            <p className="v1-lead">{hero.texto}</p>
            <div className="v1-cta">
              <WhatsLink cta="hero" className="pm-btn v1-btn">
                {hero.cta} →
              </WhatsLink>
              <span className="v1-nota">{hero.nota}</span>
            </div>
          </div>
          <div className="v1-hero__foto">
            <FotoFelipe className="pm-foto" prioridade />
          </div>
        </section>

        <div className="v1-provas">
          <ul className="pm-wrap pm-mono">
            {provas.map((p) => (
              <li key={p.texto}>
                <span className="pm-destaque">✓</span>
                {p.texto}
              </li>
            ))}
          </ul>
        </div>

        <section className="pm-secao v1-claro">
          <div className="pm-wrap v1-estreito v1-pilha">
            <h2 className="v1-h2">{problema.titulo}</h2>
            <p className="v1-intro">{problema.intro}</p>
            <ul className="v1-baloes">
              {problema.frases.map((f) => (
                <li key={f}>“{f}”</li>
              ))}
            </ul>
            <p className="v1-virada">
              {problema.virada} <span>{problema.viradaDestaque}</span>
            </p>
          </div>
        </section>

        <section className="pm-secao">
          <div className="pm-wrap v1-pilha v1-pilha--larga">
            <div className="v1-cabecalho">
              <h2 className="v1-h2">
                {solucao.titulo} <span className="pm-destaque">{solucao.tituloDestaque}</span>
              </h2>
              <p className="v1-corpo">{solucao.texto}</p>
            </div>
            <ul className="v1-pilares">
              {solucao.pilares.map((p) => (
                <li key={p.titulo} className="v1-card">
                  <span className="v1-card__icone">
                    <Icone nome={p.icone} />
                  </span>
                  <h3>{p.titulo}</h3>
                  <p>{p.texto}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="pm-secao v1-escuro">
          <div className="pm-wrap v1-pilha v1-pilha--larga">
            <h2 className="v1-h2 v1-cabecalho">{etapas.titulo}</h2>
            <ol className="v1-etapas">
              {etapas.passos.map((p, i) => (
                <li key={p.titulo}>
                  <span className="pm-mono">{String(i + 1).padStart(2, "0")}</span>
                  <h3>{p.titulo}</h3>
                  <p>{p.texto}</p>
                </li>
              ))}
            </ol>
            <div className="v1-cta">
              <WhatsLink cta="etapas" className="pm-btn v1-btn">
                {etapas.cta} →
              </WhatsLink>
              <span className="v1-nota">{etapas.nota}</span>
            </div>
          </div>
        </section>

        <section className="pm-secao">
          <div className="pm-wrap v1-pilha v1-pilha--larga">
            <div className="v1-autor">
              <div className="v1-autor__foto">
                <FotoFelipe className="pm-foto" />
              </div>
              <div className="v1-pilha">
                <span className="pm-mono v1-eyebrow">{autoridade.eyebrow}</span>
                <h2 className="v1-h2">{autoridade.titulo}</h2>
                <p className="v1-corpo">{autoridade.texto}</p>
              </div>
            </div>
            <dl className="v1-numeros">
              {autoridade.numeros.map((n) => (
                <div key={n.rotulo}>
                  <dt className="pm-mono">{n.valor}</dt>
                  <dd>{n.rotulo}</dd>
                </div>
              ))}
            </dl>
            <div className="pm-videos v1-videos">
              {autoridade.videos.map((v, i) => (
                <VideoResultado key={v} src={v} indice={i} />
              ))}
            </div>
          </div>
        </section>

        <section className="pm-secao v1-escuro">
          <div className="pm-wrap v1-para-quem">
            <div className="v1-lista v1-lista--sim">
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
            <div className="v1-lista v1-lista--nao">
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

        <section className="pm-secao">
          <div className="pm-wrap">
            <div className="v1-garantia">
              <span className="v1-garantia__icone">
                <Icone nome="cadeado" tamanho={30} />
              </span>
              <h2 className="v1-h2">{garantia.titulo}</h2>
              <p className="v1-corpo">{garantia.texto}</p>
            </div>
          </div>
        </section>

        <section className="pm-secao v1-claro">
          <div className="pm-wrap v1-estreito v1-pilha">
            <h2 className="v1-h2">{faq.titulo}</h2>
            <div className="v1-faq">
              {faq.itens.map((f, i) => (
                <div key={f.q} className="v1-faq__item">
                  <button type="button" aria-expanded={aberto === i} onClick={() => alternar(i, f.q)}>
                    {f.q}
                    <span className="pm-mono" aria-hidden="true">
                      {aberto === i ? "−" : "+"}
                    </span>
                  </button>
                  {aberto === i && <p>{f.a}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="pm-secao" id="contato">
          <div className="pm-wrap v1-form-grade">
            <div className="v1-pilha">
              <h2 className="v1-h2">{formulario.titulo}</h2>
              <p className="v1-corpo">{formulario.texto}</p>
            </div>
            {form.enviado ? (
              <div className="v1-form v1-form--ok" role="status">
                {formulario.sucesso}
              </div>
            ) : (
              <form className="v1-form" onSubmit={form.enviar}>
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
                {form.erroTelefone && <span className="pm-form-erro">{formulario.erroTelefone}</span>}
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
                  rows={3}
                  placeholder={formulario.campos.mensagem.placeholder}
                  aria-label={formulario.campos.mensagem.rotulo}
                />
                <Honeypot {...form.campo("site")} />
                <button type="submit" className="pm-btn v1-btn v1-btn--cheio" disabled={form.enviando}>
                  {form.enviando ? formulario.enviando : formulario.botao}
                </button>
                {form.erro && (
                  <span className="pm-form-erro" role="alert">
                    {formulario.erro} <a href={LINKS.whatsapp}>Abrir WhatsApp</a>
                  </span>
                )}
                <span className="v1-form__nota">
                  {formulario.privacidade} · <a href={LINKS.privacidade}>Política de privacidade</a>
                </span>
              </form>
            )}
          </div>
        </section>

        <section className="pm-secao v1-final">
          <div className="v1-final__pattern" style={{ backgroundImage: `url(${IMG.pattern})` }} />
          <div className="pm-wrap v1-final__conteudo">
            <h2 className="v1-h2 v1-h2--grande">
              {ctaFinal.titulo} <span className="pm-destaque">{ctaFinal.tituloDestaque}</span>
            </h2>
            <p className="v1-corpo">{ctaFinal.texto}</p>
            <WhatsLink cta="final" className="pm-btn v1-btn">
              {ctaFinal.cta} →
            </WhatsLink>
            <span className="v1-nota">{ctaFinal.nota}</span>
          </div>
        </section>
      </main>

      <Rodape className="v1-rodape" />

      <WhatsLink cta="flutuante" className="pm-flutuante">
        {flutuante}
      </WhatsLink>
      <CookieBanner />
    </div>
  );
}

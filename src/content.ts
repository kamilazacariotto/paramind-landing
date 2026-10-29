/*
 * Todo o texto da landing da Paramind. As três versões (v1 clássica, v2
 * terminal, v3 editorial) leem daqui; só o layout muda entre elas.
 */

/* IDs de rastreamento. Enquanto estiverem com "XXXX", o script não carrega. */
export const TRACKING = {
  gtm: "GTM-XXXXXXX",
  clarity: "XXXXXXXXXX",
};

const WA_TEXTO = "Olá, vim pelo site e gostaria de mais informações.";

export const LINKS = {
  whatsapp: `https://wa.me/5517996213949?text=${encodeURIComponent(WA_TEXTO)}`,
  email: "mailto:felipe.oliveira@paramind.com.br",
  instagram: "https://instagram.com/felipeoliveira_mkt",
  linkedin: "https://br.linkedin.com/in/oliveirafelipelima",
  // Páginas estáticas em public/, publicadas junto com cada versão.
  privacidade: "politica-de-privacidade.html",
  termos: "termos-de-servico.html",
  // Endpoint PHP que repassa o formulário ao Kommo (public/api/lead.php).
  lead: "api/lead.php",
};

export const IMG = {
  logoDark: "img/logo-roxo-dark.png",
  logoLight: "img/logo-roxo-light.png",
  logoVerde: "img/logo-verde-dark.png",
  icone: "img/icone-m.png",
  pattern: "img/pattern.png",
  felipe: {
    src: "img/felipe-1080.jpg",
    webp: "img/felipe-640.webp 640w, img/felipe-1080.webp 1080w",
    alt: "Felipe Oliveira, gestor de tráfego da Paramind",
  },
};

/*
 * Teste A/B da headline: escolha pela URL com ?h=resultado (ou dor,
 * curiosidade, especificidade, prova). Sem parâmetro, vale "dor".
 * A segunda parte da frase sai destacada em roxo.
 */
export const HEADLINES = {
  dor: ["Sua empresa não pode viver de indicação.", "Vamos colocar clientes novos chegando toda semana."],
  resultado: ["Mais clientes, mais vendas e", "um faturamento que você consegue prever."],
  curiosidade: ["O motivo do seu anúncio não vender", "quase nunca está no anúncio."],
  especificidade: [
    "Um plano de 3 a 6 meses para sua empresa sair da indicação",
    "e ter clientes chegando pelo Meta, Google, TikTok e LinkedIn.",
  ],
  prova: ["5 anos, +30 empresas e certificação Google, Meta e LinkedIn", "para fazer o seu digital vender."],
} as const;

export type HeadlineKey = keyof typeof HEADLINES;

export const hero = {
  eyebrow: "// tráfego pago + estratégia digital",
  assinatura: "Felipe Oliveira · gestor de tráfego",
  texto:
    "Tráfego pago no Meta, Google, TikTok e LinkedIn, conectado ao seu Google Meu Negócio, ao seu CRM e ao seu atendimento. Um plano de 3 a 6 meses feito para o momento da sua empresa.",
  cta: "Quero um diagnóstico do meu digital",
  nota: "Conversa sem compromisso pelo WhatsApp, direto com o Felipe.",
};

export const provas = [
  { tag: "[cert]", texto: "Certificado Google, Meta e LinkedIn" },
  { tag: "[+30]", texto: "+30 empresas atendidas no Brasil" },
  { tag: "[5y]", texto: "5 anos em tráfego pago" },
];

export const problema = {
  titulo: "Sempre veio muita indicação. Até que parou.",
  intro: "Se você se identifica com pelo menos uma dessas frases, essa página é pra você:",
  frases: [
    "Minha carteira de clientes é pequena, preciso de mais agendamentos.",
    "Preciso vender mais pra conseguir crescer.",
    "Estou sobrecarregado tentando fazer tudo sozinho.",
    "Já anunciei, gastei dinheiro e não vi resultado.",
    "O gestor anterior sumiu e levou tudo junto.",
  ],
  virada: "O problema não é o seu produto. É que o seu faturamento depende de algo que você não controla.",
  viradaDestaque: "E mês sem previsibilidade é mês sem dormir direito.",
};

export const solucao = {
  titulo: "Anúncio sozinho não resolve.",
  tituloDestaque: "O resultado vem do sistema inteiro.",
  texto:
    "A maioria dos gestores olha só para o painel de anúncios. Aqui o olhar vai além: perfil, site, Google, CRM, atendimento e as metas de cada setor da sua empresa. Tudo conversando entre si, para que o clique vire cliente.",
  pilares: [
    {
      icone: "trafego",
      titulo: "Tráfego pago",
      texto: "Campanhas no Meta Ads, Google Ads, TikTok Ads e LinkedIn Ads, no canal certo para o seu público.",
    },
    {
      icone: "local",
      titulo: "Google Meu Negócio",
      texto: "Perfil otimizado para quem procura o que você vende perto de você.",
    },
    {
      icone: "crm",
      titulo: "CRM",
      texto: "Implementação e suporte para nenhum contato se perder no caminho.",
    },
    {
      icone: "alvo",
      titulo: "Estratégia digital",
      texto: "Um plano de crescimento com metas claras, não só campanhas soltas.",
    },
  ],
} as const;

export const etapas = {
  titulo: "Do diagnóstico à previsibilidade, em 3 etapas",
  passos: [
    {
      titulo: "Diagnóstico.",
      texto: "Entendo o momento da sua empresa: porte, perfil de clientes, equipe e o que você já tem no digital.",
    },
    {
      titulo: "Plano de 3 a 6 meses.",
      texto:
        "Um caminho claro para o próximo nível. Pode ser estruturar do zero ou montar uma máquina de vendas omnichannel, com estratégias de recorrência.",
    },
    {
      titulo: "Execução e acompanhamento.",
      texto:
        "Campanhas no ar, ajustes contínuos e você sabendo exatamente o que está acontecendo com o seu investimento.",
    },
  ],
  cta: "Quero começar pelo diagnóstico",
  nota: "Leva menos de 1 minuto pra chamar.",
};

export const autoridade = {
  eyebrow: "// quem é o Felipe",
  titulo: "Quem vai cuidar do seu crescimento",
  texto:
    "Sou Felipe Oliveira, gestor de tráfego há 5 anos, com certificações Google, Meta e LinkedIn. Faço parte do SubidoPRO, a mentoria do Pedro Sobral para gestores de tráfego. Antes disso, foram mais de 10 anos em tecnologia e empreendedorismo, incluindo uma empresa de tecnologia própria. Por isso eu enxergo o seu digital como um sistema, do anúncio à inteligência artificial, e ensino sua equipe a trabalhar junto com ele.",
  numeros: [
    { valor: "5", rotulo: "anos em tráfego pago" },
    { valor: "+10", rotulo: "anos em tecnologia" },
    { valor: "+30", rotulo: "empresas atendidas" },
    { valor: "3", rotulo: "certificações oficiais" },
  ],
  videosRotulo: "// resultados de clientes",
  videos: ["video/resultado-1.mp4", "video/resultado-2.mp4", "video/resultado-3.mp4"],
};

export const paraQuem = {
  simTitulo: "Esse trabalho é para você se...",
  sim: [
    "Sua empresa já tem perfil nas redes e site",
    "Você ainda não anuncia, ou já anunciou e não teve o resultado que esperava",
    "Quer parar de depender de indicação e ter previsibilidade de faturamento",
    "Está disposto a construir junto, não só terceirizar",
  ],
  naoTitulo: "Não é para você se...",
  nao: [
    "Não consegue responder o WhatsApp com agilidade (lead que espera, esfria)",
    "Quer só alguém apertando botão de anúncio, sem se comprometer com as entregas do seu lado",
  ],
};

export const garantia = {
  titulo: "O seu digital é seu. Sempre.",
  texto:
    "Toda estrutura, acesso e serviço feito fica 100% com você. Você recebe documentação completa de tudo que existe no seu digital. Se um dia decidir seguir sozinho, não perde nada e não começa do zero.",
};

export const faq = {
  titulo: "Perguntas frequentes",
  itens: [
    {
      q: "Quanto custa?",
      a: "Cada projeto é personalizado para o seu momento no digital, com planos a partir de R$497.",
    },
    {
      q: "Quanto tempo dura?",
      a: "Pode ser uma consultoria ou serviço avulso, ou um contrato de 6 a 12 meses. Definimos juntos depois do diagnóstico.",
    },
    {
      q: "Preciso investir muito em anúncio?",
      a: "Não. Dá para ter resultado com investimento relativamente baixo. Depende do que você vende e para quem.",
    },
    {
      q: "Tráfego pago funciona para o meu negócio?",
      a: "É isso que o diagnóstico responde. Se o seu caso não for para anúncio agora, você vai saber antes de investir.",
    },
    {
      q: "Já tive experiência ruim com outro gestor. O que muda?",
      a: "Você acompanha o que está sendo feito, todos os acessos ficam no seu nome e o trabalho não para no anúncio: inclui site, Google, CRM e atendimento.",
    },
    {
      q: "E se eu não quiser continuar depois do contrato?",
      a: "Toda estrutura, acessos e serviços são 100% seus, com documentação completa.",
    },
  ],
};

export const formulario = {
  titulo: "Prefere que eu te chame?",
  texto: "Deixe seus dados e eu entro em contato para marcar o diagnóstico.",
  campos: {
    nome: { rotulo: "nome", placeholder: "Como posso te chamar?" },
    telefone: { rotulo: "telefone", placeholder: "(DDD) WhatsApp" },
    email: { rotulo: "e-mail", placeholder: "seu@email.com" },
    empresa: { rotulo: "empresa", placeholder: "Nome da sua empresa" },
    mensagem: { rotulo: "mensagem", placeholder: "O que mais te trava hoje para ter mais clientes?" },
  },
  botao: "Quero que o Felipe me chame",
  enviando: "Enviando...",
  privacidade: "Seus dados ficam só comigo. Nada de spam.",
  sucesso: "Recebi! Vou te chamar no WhatsApp em breve para marcar o seu diagnóstico.",
  erro: "Não consegui enviar agora. Tente de novo ou me chame direto no WhatsApp.",
  erroTelefone: "Confira o WhatsApp com DDD.",
};

export const ctaFinal = {
  titulo: "O próximo cliente da sua empresa",
  tituloDestaque: "não precisa depender de indicação.",
  texto: "Comece pelo diagnóstico. Em uma conversa você já sai sabendo onde está travando o seu crescimento.",
  cta: "Quero meu diagnóstico agora",
  nota: "Resposta no WhatsApp, sem compromisso.",
};

/*
 * Dados da empresa para o rodapé e as páginas legais
 * (public/politica-de-privacidade.html e public/termos-de-servico.html
 * repetem estes dados; se mudar aqui, mude lá também).
 */
export const EMPRESA = {
  razao: "Paramind Inteligência de Negócios",
  cnpj: "51.265.832/0001-70",
  atividade: "Tráfego Pago e Estratégia Digital",
};

export const rodape = {
  tagline: "Estratégias que transformam ideias em resultados.",
  email: "felipe.oliveira@paramind.com.br",
  instagram: "@felipeoliveira_mkt",
  privacidade: "Política de privacidade",
  termos: "Termos de serviço",
  cookies: "Preferências de cookies",
};

export const cookies = {
  texto:
    "Usamos cookies para medir o desempenho da página e dos anúncios. Ferramentas de análise e publicidade só são ativadas se você aceitar.",
  aceitar: "Aceitar",
  recusar: "Só os essenciais",
  saibaMais: "Saiba mais",
};

export const flutuante = "Falar no WhatsApp";

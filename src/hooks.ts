import { useState, type ChangeEvent, type FormEvent } from "react";

import { HEADLINES, LINKS } from "./content";
import { headlineAtual, origem, track } from "./tracking";

export function useHeadline() {
  const [chave] = useState(headlineAtual);
  const [a, b] = HEADLINES[chave];
  return { a, b };
}

/* FAQ: um item aberto por vez, o primeiro começa aberto (como no protótipo). */
export function useFaq() {
  const [aberto, setAberto] = useState(0);
  return {
    aberto,
    alternar: (i: number, pergunta: string) => {
      const abrindo = aberto !== i;
      setAberto(abrindo ? i : -1);
      if (abrindo) track("faq_open", { pergunta });
    },
  };
}

export type CamposLead = {
  nome: string;
  telefone: string;
  email: string;
  empresa: string;
  mensagem: string;
  // Honeypot: escondido de gente, robô preenche. Se vier preenchido, o PHP descarta.
  site: string;
};

const VAZIO: CamposLead = { nome: "", telefone: "", email: "", empresa: "", mensagem: "", site: "" };

/* (17) 99621-3949 enquanto digita. Aceita fixo (10 dígitos) e celular (11). */
export function mascaraTelefone(valor: string) {
  const d = valor.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d ? `(${d}` : "";
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

type Status = "editando" | "enviando" | "enviado" | "erro";

/*
 * Estado e envio do formulário. Cada versão desenha os próprios campos e usa
 * `campo("nome")` etc. para ligar value/onChange.
 */
export function useLeadForm(versao: string) {
  const [dados, setDados] = useState<CamposLead>(VAZIO);
  const [status, setStatus] = useState<Status>("editando");
  const [erroTelefone, setErroTelefone] = useState(false);

  const campo = (nome: keyof CamposLead) => ({
    name: nome,
    value: dados[nome],
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const valor = nome === "telefone" ? mascaraTelefone(e.target.value) : e.target.value;
      setDados((atual) => ({ ...atual, [nome]: valor }));
      if (nome === "telefone") setErroTelefone(false);
    },
  });

  const enviar = async (e: FormEvent) => {
    e.preventDefault();
    if (status === "enviando") return;
    if (dados.telefone.replace(/\D/g, "").length < 10) {
      setErroTelefone(true);
      return;
    }

    setStatus("enviando");
    try {
      const resposta = await fetch(LINKS.lead, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...dados,
          versao,
          headline: headlineAtual(),
          pagina: window.location.href,
          referrer: document.referrer,
          origem: origem(),
        }),
      });
      // Exige {"ok": true}: um servidor sem PHP devolveria o arquivo com 200.
      const corpo = await resposta.json().catch(() => null);
      if (!resposta.ok || corpo?.ok !== true) throw new Error(`HTTP ${resposta.status}`);
      setStatus("enviado");
      track("generate_lead", { form: "diagnostico", lp_versao: versao });
    } catch {
      setStatus("erro");
      track("form_error", { form: "diagnostico", lp_versao: versao });
    }
  };

  return {
    campo,
    enviar,
    erroTelefone,
    enviando: status === "enviando",
    enviado: status === "enviado",
    erro: status === "erro",
  };
}

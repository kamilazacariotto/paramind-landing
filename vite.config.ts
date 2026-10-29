import { fileURLToPath, URL } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

import { leadMock } from "./vite-lead-mock";

const VERSOES = {
  v1: { porta: 5191, tema: "#111216" },
  v2: { porta: 5192, tema: "#111216" },
  v3: { porta: 5193, tema: "#ededed" },
} as const;

type Versao = keyof typeof VERSOES;

const caminho = (p: string) => fileURLToPath(new URL(p, import.meta.url));

/*
 * Apresentação: página principal + menu para alternar entre as três versões.
 * Cada versão é uma página HTML própria (apresentacao/v1.html...), carregada
 * num iframe, então o CSS de uma nunca vaza para a outra. Sai em
 * dist/apresentacao/ e não carrega GTM nem Clarity.
 */
const apresentacao = defineConfig({
  root: caminho("./apresentacao"),
  publicDir: caminho("./public"),
  plugins: [react(), leadMock()],
  base: "./",
  server: { port: 5190, fs: { allow: [caminho(".")] } },
  preview: { port: 5190 },
  build: {
    outDir: caminho("./dist/apresentacao"),
    emptyOutDir: true,
    target: "es2020",
    sourcemap: false,
    rollupOptions: {
      input: {
        index: caminho("./apresentacao/index.html"),
        v1: caminho("./apresentacao/v1.html"),
        v2: caminho("./apresentacao/v2.html"),
        v3: caminho("./apresentacao/v3.html"),
      },
    },
  },
});

/*
 * Produção: um projeto, três builds. `--mode v1|v2|v3` escolhe a versão.
 * Cada uma sai em dist/<versão>, independente das outras.
 */
export default defineConfig(({ mode }) => {
  if (mode === "apresentacao") return apresentacao;
  if (!(mode in VERSOES)) {
    throw new Error(`Use --mode v1, v2, v3 ou apresentacao (recebido: "${mode}")`);
  }
  const versao = mode as Versao;
  const { porta, tema } = VERSOES[versao];

  return {
    plugins: [
      react(),
      leadMock(),
      {
        name: "paramind-tema",
        transformIndexHtml: (html) => html.replace("__THEME_COLOR__", tema),
      },
    ],
    resolve: {
      alias: {
        "@versao": caminho(`./src/${versao}/index.ts`),
      },
    },
    base: "./",
    server: { port: porta },
    preview: { port: porta },
    build: {
      outDir: `dist/${versao}`,
      emptyOutDir: true,
      target: "es2020",
      sourcemap: false,
    },
  };
});

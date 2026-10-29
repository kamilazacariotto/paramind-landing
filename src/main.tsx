import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// "@versao" aponta para src/v1, v2 ou v3 conforme o --mode (ver vite.config.ts),
// então cada build leva só o layout e o CSS da própria versão.
import { Page, versao } from "@versao";

import { iniciarTracking } from "./tracking";

iniciarTracking(versao);

const root = document.getElementById("root");
if (!root) throw new Error("Elemento #root nao encontrado em index.html");

createRoot(root).render(
  <StrictMode>
    <Page />
  </StrictMode>,
);

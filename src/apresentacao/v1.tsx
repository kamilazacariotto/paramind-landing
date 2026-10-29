import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { Page } from "../v1";

// Versão 1 dentro da apresentação: sem iniciarTracking(), então GTM e Clarity não carregam.
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Page />
  </StrictMode>,
);

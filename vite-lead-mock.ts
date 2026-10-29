import type { Plugin } from "vite";

/*
 * Só no `npm run dev`: responde o POST de api/lead.php no lugar do PHP e
 * imprime o lead no terminal. O build não inclui isso; em produção quem
 * responde é o public/api/lead.php na Hostinger.
 */
export function leadMock(): Plugin {
  return {
    name: "paramind-lead-mock",
    apply: "serve",
    configureServer(server) {
      server.middlewares.use("/api/lead.php", (req, res, next) => {
        if (req.method !== "POST") return next();
        let corpo = "";
        req.on("data", (parte) => (corpo += parte));
        req.on("end", () => {
          console.log("\n[lead mock] chegaria no Kommo:\n", corpo, "\n");
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ ok: true, mock: true }));
        });
      });
    },
  };
}

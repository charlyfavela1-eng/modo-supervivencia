// Servidor mínimo: sirve public/ y contesta /api/salud para el health check de Render.
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const RAIZ = join(fileURLToPath(new URL(".", import.meta.url)), "public");
const TIPO = { ".html":"text/html; charset=utf-8", ".css":"text/css", ".js":"text/javascript",
               ".png":"image/png", ".svg":"image/svg+xml", ".json":"application/json" };

createServer(async (req, res) => {
  const url = new URL(req.url, "http://x");
  if (url.pathname === "/api/salud") {
    res.writeHead(200, {"Content-Type":"application/json"});
    return res.end(JSON.stringify({ ok:true, servicio:"modo-supervivencia" }));
  }
  const rel = normalize(url.pathname === "/" ? "/index.html" : url.pathname).replace(/^(\.\.[/\\])+/, "");
  try {
    const cuerpo = await readFile(join(RAIZ, rel));
    res.writeHead(200, {"Content-Type": TIPO[extname(rel)] || "application/octet-stream",
                        "Cache-Control": rel === "/index.html" ? "no-cache" : "public, max-age=3600"});
    res.end(cuerpo);
  } catch {
    res.writeHead(404, {"Content-Type":"text/plain; charset=utf-8"});
    res.end("no está");
  }
}).listen(process.env.PORT || 3000, () => console.log("modo-supervivencia en " + (process.env.PORT || 3000)));

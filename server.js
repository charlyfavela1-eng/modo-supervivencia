// Sirve public/ y le presta a la página el cerebro de Codex cuando lo hay.
//
//   GET  /api/cerebro   ¿hay codex en esta máquina?
//   POST /api/cerebro   {prompt} -> {texto}   (corre `codex exec`)
//   GET  /api/salud     para el health check de Render
//
// En claude.ai el cerebro corre con Claude (capacidad sample) y esto no se usa.
// Aquí, en tu máquina, corre con Codex. Sin ninguno de los dos, la página piensa
// con su propio repertorio: nunca se queda sin cerebro.
import { createServer } from "node:http";
import { spawn } from "node:child_process";
import { readFile, mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const RAIZ = join(fileURLToPath(new URL(".", import.meta.url)), "public");
const TIPO = { ".html":"text/html; charset=utf-8", ".css":"text/css", ".js":"text/javascript",
               ".png":"image/png", ".svg":"image/svg+xml", ".json":"application/json" };
const ESPERA_MS = 180000;      // un turno de codex puede tardar
const TOPE_PROMPT = 32000;

let hayCodex = null;
function detectaCodex() {
  if (hayCodex !== null) return Promise.resolve(hayCodex);
  return new Promise(res => {
    const p = spawn("codex", ["--version"]);
    p.on("error", () => res(hayCodex = false));
    p.on("close", c => res(hayCodex = c === 0));
  });
}

async function cerebroCodex(prompt) {
  const dir = await mkdtemp(join(tmpdir(), "cerebro-"));
  const salida = join(dir, "respuesta.txt");
  try {
    const texto = await new Promise((res, rej) => {
      const p = spawn("codex", ["exec", "--skip-git-repo-check", "--color", "never", "-o", salida, "-"],
                      { stdio: ["pipe", "pipe", "pipe"] });
      let err = "";
      const reloj = setTimeout(() => { p.kill("SIGKILL"); rej(new Error("codex no contestó a tiempo")); }, ESPERA_MS);
      p.stderr.on("data", d => { err += d; });
      p.on("error", e => { clearTimeout(reloj); rej(e); });
      p.on("close", async code => {
        clearTimeout(reloj);
        try { res(await readFile(salida, "utf8")); }
        catch { code === 0 ? res("") : rej(new Error(err.slice(-400) || "codex salió con " + code)); }
      });
      p.stdin.end(prompt);
    });
    return texto;
  } finally { rm(dir, {recursive:true, force:true}).catch(() => {}); }
}

function json(res, code, cuerpo) {
  res.writeHead(code, {"Content-Type":"application/json; charset=utf-8"});
  res.end(JSON.stringify(cuerpo));
}

createServer(async (req, res) => {
  const url = new URL(req.url, "http://x");

  if (url.pathname === "/api/salud") return json(res, 200, {ok:true, servicio:"modo-supervivencia"});

  if (url.pathname === "/api/cerebro") {
    if (req.method === "GET") return json(res, 200, {disponible: await detectaCodex(), motor:"codex"});
    if (req.method === "POST") {
      if (!await detectaCodex()) return json(res, 503, {error:"no hay codex en esta máquina"});
      let cuerpo = "";
      for await (const trozo of req) {
        cuerpo += trozo;
        if (cuerpo.length > TOPE_PROMPT) { req.destroy(); return json(res, 413, {error:"prompt demasiado largo"}); }
      }
      let prompt = "";
      try { prompt = String(JSON.parse(cuerpo || "{}").prompt || ""); } catch { /* abajo */ }
      if (!prompt) return json(res, 400, {error:"falta prompt"});
      try { return json(res, 200, {texto: await cerebroCodex(prompt)}); }
      catch (e) { return json(res, 502, {error: String(e.message || e)}); }
    }
    return json(res, 405, {error:"usa GET o POST"});
  }

  const rel = normalize(url.pathname === "/" ? "/index.html" : url.pathname).replace(/^(\.\.[/\\])+/, "");
  try {
    const cuerpo = await readFile(join(RAIZ, rel));
    res.writeHead(200, {"Content-Type": TIPO[extname(rel)] || "application/octet-stream",
                        "Cache-Control": rel.endsWith("index.html") ? "no-cache" : "public, max-age=3600"});
    res.end(cuerpo);
  } catch {
    res.writeHead(404, {"Content-Type":"text/plain; charset=utf-8"});
    res.end("no está");
  }
}).listen(process.env.PORT || 3000, () => console.log("modo-supervivencia en " + (process.env.PORT || 3000)));

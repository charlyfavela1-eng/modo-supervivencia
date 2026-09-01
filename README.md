# Modo Supervivencia

Simulador tipo Sims de una persona frente a la computadora: química cerebral,
metilfenidato y quetiapina con farmacocinética de verdad, modo supervivencia y
un grafo tipo Obsidian con lo que se sabe del algoritmo **Andromeda** de Meta.

Todo es un solo `public/index.html` sin dependencias. `server.js` sólo lo sirve.

    npm start        # http://localhost:3000

## Cómo se usa

Le dictas **una meta** y él busca cómo: la parte en 4-6 pasos concretos y se
pone a trabajarlos — cada paso mueve el negocio de verdad (clientes, reels,
sistema), no es una lista de adorno. En la pestaña **Mesa** discute el paso
abierto en dos voces: *Claude* (estructura y estrategia) y *Codex*
(implementación y comandos); pensarlo le quita un 20% de camino.

El **timer de bloques** (25/5, 50/10, 90/15) va en tiempo real y está acoplado
al personaje: mientras corre tu bloque él trabaja el paso, y cuando entras al
descanso se levanta de la silla. Es el gemelo de productividad.

## Con qué cerebro corre

Piensa con lo que haya, en este orden, y lo dice en el panel Cerebro:

1. **Claude** — publicado en claude.ai, con la capacidad `sample` del visor.
2. **Codex** — servido desde aquí, si tienes `codex` instalado y con sesión:
   la página llama a `POST /api/cerebro` y el servidor corre
   `codex exec --skip-git-repo-check -o <archivo> -` con el prompt por stdin.
   `GET /api/cerebro` dice si está disponible.
3. **Su propio repertorio** — reglas deterministas. Más corto, nunca falla.

El cerebro no sólo escribe: **revisa lo que propone Codex y decide** —adoptar,
simplificar o posponer— con los números del estado neuronal del momento, no con
las ganas. Si la calma está por debajo de lo que el paso pide, pospone y manda
al personaje a respirar o a caminar.

El panel **Cerebro** muestra el circuito (estriado y tronco empujan la
prefrontal, la amígdala y la red por defecto la apagan), los **niveles que el
paso exige** —foco, ganas y calma, cada uno con su marca de umbral— y los
**consejos del sistema nervioso**, etiquetados para él, para ti o para los dos.

## Acceso a sus GitHub

Los tokens viven en el entorno del **servidor**, nunca en la página:

    GITHUB_TOKEN_CHARLYFAVELA1=…  GITHUB_TOKEN=…  npm start

Con eso la pestaña **Repos** lista todos los repos de todas las cuentas cuyo
token esté puesto, y el que elijas entra en lo que él piensa: el árbol de
archivos y el README van dentro del prompt, y los pasos que proponga tienen que
nombrar archivos que existan de verdad. Endpoints: `GET /api/github`,
`/api/github/repos`, `/api/github/arbol?repo=owner/name`,
`/api/github/archivo?repo=owner/name&ruta=…`.

Publicado en claude.ai no hay proxy ni tokens: ahí trabaja con lo que ya sabe.

## La primera tarea: Nexus

Trae cargada la tarea real —**que Nexus edite video en el navegador, sin el
Codespace**— con el contexto ya medido: qué es Nexus (`public/nexus.html` del
repo `cartera`, servido en cartera-1.onrender.com/nexus), que el segmentador de
MediaPipe ya está ahí pero sólo para imagen, que en su máscara 0 = persona, que
«Unir video» ya es canvas + MediaRecorder, que los subtítulos siguen pasando por
el servidor, que su máquina no tiene WebGL 2, y que WhatsApp no reproduce webm
con alfa. Eso es lo que no tiene que volver a descubrir.

## Qué modela

- **Farmacocinética** (curva de Bateman): metilfenidato 10 mg (pico ~1.7 h) y
  quetiapina (cola de ~7 h, la niebla de la mañana).
- **U invertida** de Yerkes–Dodson: pasarse del pico de catecolaminas BAJA el
  foco en vez de subirlo.
- **Modo supervivencia**: con la amígdala arriba la corteza prefrontal se apaga,
  la energía se drena al doble y el personaje, solo, elige scroll y revisar
  métricas en vez de trabajar.
- **Protocolos** que cambian el modelo: sol al despertar, suspiro fisiológico,
  NSDR, zona 2, timer visible, ritual de cierre, mandar en vez de revisar.
- **Grafo de conocimiento**: los nodos de Andromeda se desbloquean investigando,
  las conexiones con el negocio salen **caminando**, y todos nacen frágiles
  hasta que el personaje duerme.

Fuente primaria de Andromeda: [Engineering at Meta, dic 2024](https://engineering.fb.com/2024/12/02/production-engineering/meta-andromeda-advantage-automation-next-gen-personalized-ads-retrieval-engine/).

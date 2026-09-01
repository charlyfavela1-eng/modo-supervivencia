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

# Modo Supervivencia

Simulador tipo Sims de una persona frente a la computadora: química cerebral,
metilfenidato y quetiapina con farmacocinética de verdad, modo supervivencia y
un grafo tipo Obsidian con lo que se sabe del algoritmo **Andromeda** de Meta.

Todo es un solo `public/index.html` sin dependencias. `server.js` sólo lo sirve.

    npm start        # http://localhost:3000

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

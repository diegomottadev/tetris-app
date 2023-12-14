// src/Pieces.js
// Este archivo Pieces.js exporta un objeto llamado PIECES, que contiene definiciones de varias formas de piezas 
// para un juego de bloques Tetris. Cada forma está representada por una matriz de números, donde 1 indica la
// presencia de un bloque y 0 indica la ausencia de un bloque en esa posición. A continuación, se detallan las formas definidas:

export const PIECES = {
    t: [
      [0, 0, 0],
      [1, 1, 1],
      [0, 1, 0]
    ],
    o: [
      [1, 1],
      [1, 1]
    ],
    l: [
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 1]
    ],
    j: [
      [0, 1, 0],
      [0, 1, 0],
      [1, 1, 0]
    ],
    i: [
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0]
    ],
    s: [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0]
    ],
    z: [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0]
    ]
  };
  
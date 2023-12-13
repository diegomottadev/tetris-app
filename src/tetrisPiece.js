// src/components/TetrisPieces.js

export const PIECES = {
  t: [
    [0, 0, 0],
    [5, 5, 5],
    [0, 5, 0]
  ],
  o: [
    [7, 7],
    [7, 7]
  ],
  l: [
    [0, 4, 0],
    [0, 4, 0],
    [0, 4, 4]
  ],
  j: [
    [0, 1, 0],
    [0, 1, 0],
    [1, 1, 0]
  ],
  i: [
    [0, 2, 0, 0],
    [0, 2, 0, 0],
    [0, 2, 0, 0],
    [0, 2, 0, 0]
  ],
  s: [
    [0, 3, 3],
    [3, 3, 0],
    [0, 0, 0]
  ],
  z: [
    [6, 6, 0],
    [0, 6, 6],
    [0, 0, 0]
  ]
};

export class TetrisPiece {
  constructor(type) {
    this.type = PIECES[type];
    this.rotation = 0;
    this.x = 0;
    this.y = 0;
  }

  rotate() {
    const rotatedPiece = new TetrisPiece();
    rotatedPiece.type = this.rotateMatrix(this.type);
    rotatedPiece.rotation = 0; // Reiniciamos la rotación a 0
    rotatedPiece.x = this.x;
    rotatedPiece.y = this.y;
    return rotatedPiece;
}

rotateMatrix(matrix) {
    // Función para rotar una matriz 90 grados en sentido horario
    const rows = matrix.length;
    const cols = matrix[0].length;
    const rotated = new Array(cols).fill(0).map(() => new Array(rows).fill(0));

    for (let i = 0; i < rows; ++i) {
        for (let j = 0; j < cols; ++j) {
            rotated[j][rows - i - 1] = matrix[i][j];
        }
    }

    return rotated;
}

}


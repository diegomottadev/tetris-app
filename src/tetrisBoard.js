// src/components/TetrisBoard.js
import { TetrisPiece, PIECES } from "./tetrisPiece.js";

export class TetrisBoard {
  constructor() {
    this.width = 10;
    this.height = 20;
    this.grid = this.createEmptyGrid();
    this.fixedGrid = this.createEmptyGrid();
    this.currentPiece = null;
    this.fallInterval = 150; // Set the fall interval in milliseconds
    this.lastFallTime = 0;

    this.player = {
      matrix: [], // Define the player matrix as needed
      pos: { x: 0, y: 0 },
      score: 0,
    };
  }

  createEmptyGrid() {
    return Array.from({ length: this.height }, () => Array(this.width).fill(0));
  }

  draw(context, blockSize) {
    // Establecer el color de fondo del tablero
    context.fillStyle = "white";
    context.fillRect(0, 0, this.width * blockSize, this.height * blockSize);

    // Dibujar las piezas fijas en el tablero
    const color = "#8dbf24";
    const borderColor = "#294110";
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        if (this.fixedGrid[y][x] !== 0) {
          this.drawBlock(context, x, y, blockSize, color, borderColor);
        }
      }
    }

    // Dibujar la pieza actual del juego en su posición actual
    if (this.currentPiece !== null) {
      this.drawPiece(this.currentPiece, context, blockSize);
    }
  }

  drawPiece(piece, context, blockSize) {
    const { x, y, type } = piece;
    if (!type) {
      console.error("Piece type is undefined or null:", piece);
      return;
    }

    const color = "#8dbf24";
    const borderColor = "#294110";

    // Dibujar la pieza actual del juego en su posición actual
    for (let i = 0; i < type.length; i++) {
      if (!type[i] || !Array.isArray(type[i])) {
        console.error("Invalid row structure:", piece);
        return;
      }

      for (let j = 0; j < type[i].length; j++) {
        if (type[i][j]) {
          const drawX = (x + j) * blockSize;
          const drawY = (y + i) * blockSize;

          // Dibujar el bloque de la pieza
          context.fillStyle = color;
          context.fillRect(drawX, drawY, blockSize, blockSize);

          // Dibujar el borde del bloque
          context.strokeStyle = borderColor;
          context.lineWidth = 2;
          context.strokeRect(drawX, drawY, blockSize, blockSize);
        }
      }
    }
  }

  drawBlock(context, x, y, blockSize, fillStyle, strokeStyle) {
    console.log("drawBlock", strokeStyle);
    const drawX = x * blockSize;
    const drawY = y * blockSize;

    context.fillStyle = fillStyle;
    context.fillRect(drawX, drawY, blockSize, blockSize);

    context.strokeStyle = strokeStyle;
    context.lineWidth = 2;
    context.strokeRect(drawX, drawY, blockSize, blockSize);
  }

  placePieceOnBoard(fallingPiece) {
    if (!fallingPiece) {
        return;
    }

    for (let y = 0; y < fallingPiece.type.length; y++) {
        for (let x = 0; x < fallingPiece.type[y].length; x++) {
            if (fallingPiece.type[y][x]) {
                const gridX = fallingPiece.x + x;
                const gridY = fallingPiece.y + y;

                if (gridY >= 0 && gridY < this.height) {
                    // Always fill the cell, even if it's occupied
                    this.fixedGrid[gridY][gridX] = fallingPiece.type[y][x];
                }
            }
        }
    }

    this.currentPiece = null;
}
  update() {
    const currentTime = Date.now();
    const elapsedTime = currentTime - this.lastFallTime;

    if (elapsedTime > this.fallInterval) {
      this.moveDown();
      this.lastFallTime = currentTime;
    }
  }

  moveDown() {
    if (this.isValidMove(0, 1)) {
        this.currentPiece.y++;
    } else {
        // Check if the game is over before placing the piece
        if (!this.isGameOver()) {
            this.placePieceOnBoard(this.currentPiece);
            this.clearLines();
            this.spawnNewPiece();
        } else {
            this.gameOver();
        }
    }
}
  isValidMove(deltaX, deltaY, piece = this.currentPiece) {
    if (!piece) {
      console.error("Piece is undefined or null.");
      return false;
    }

    const newPosX = piece.x + deltaX;
    const newPosY = piece.y + deltaY;

    if (
      newPosX < 0 ||
      newPosX + piece.type[piece.rotation][0].length > this.width ||
      newPosY + piece.type[piece.rotation].length > this.height
    ) {
      return false;
    }

    for (let y = 0; y < piece.type[piece.rotation].length; y++) {
      for (let x = 0; x < piece.type[piece.rotation][y].length; x++) {
        if (
          piece.type[piece.rotation][y][x] &&
          (this.fixedGrid[newPosY + y] &&
            this.fixedGrid[newPosY + y][newPosX + x]) !== 0
        ) {
          return false;
        }
      }
    }

    return true;
  }

  isGameOver() {
    for (let x = 0; x < this.width; x++) {
      if (this.fixedGrid[0][x] !== 0) {
        return true;
      }
    }
    return false;
  }

  clearLines() {
    for (let y = this.height - 1; y >= 0; y--) {
      if (this.isLineComplete(y)) {
        this.removeLine(y);
      }
    }
  }

  isLineComplete(y) {
    for (let x = 0; x < this.width; x++) {
      if (this.fixedGrid[y][x] === 0) {
        return false;
      }
    }
    return true;
  }

  removeLine(lineIndex) {
    this.fixedGrid.splice(lineIndex, 1);
    this.fixedGrid.unshift(new Array(this.width).fill(0));
  }

  spawnNewPiece() {
    this.currentPiece = this.spawnPiece();
    this.lastFallTime = Date.now(); // Reset the last fall time
  }

  spawnPiece(type) {
    const pieceTypes = Object.keys(PIECES);
    const pieceType =
      type || pieceTypes[Math.floor(Math.random() * pieceTypes.length)];
    const piece = new TetrisPiece(pieceType);
    this.currentPiece = piece; // Set the currentPiece property
    return piece;
  }

  moveRight() {
    if (this.isValidMove(1, 0)) {
      this.currentPiece.x++;
    }
  }

  rotatePiece() {
    const rotatedPiece = this.currentPiece.rotate();
    if (this.isValidMove(0, 0, rotatedPiece)) {
      this.currentPiece = rotatedPiece;
    }
  }

  moveLeft() {
    if (this.isValidMove(-1, 0)) {
      this.currentPiece.x--;
    }
  }

  playerReset() {
    const pieces = "ijlostz";
    const randomPiece = pieces[Math.floor(Math.random() * pieces.length)];
    const newPiece = this.spawnPiece(randomPiece);

    if (!newPiece || !newPiece.type) {
      console.error("Invalid player piece:", newPiece);
      return;
    }

    this.player.matrix = newPiece.type; // Asigna la matriz de la nueva pieza

    this.player.pos.y = 0;
    this.player.pos.x =
      Math.floor(this.width / 2) - Math.floor(newPiece.type[0].length / 2);

    if (this.collide()) {
      // Lógica de juego cuando hay colisión
      this.fixedGrid.forEach((row) => row.fill(0));
      this.player.score = 0;
      this.gameRun = false; // Asumiendo que tienes una variable 'gameRun' para controlar el estado del juego
    }
  }

  collide() {
    const { matrix, pos } = this.player;

    for (let y = 0; y < matrix.length; y++) {
      for (let x = 0; x < matrix[y].length; x++) {
        if (
          matrix[y][x] !== 0 &&
          (this.fixedGrid[pos.y + y] && this.grid[pos.y + y][pos.x + x]) !== 0
        ) {
          return true; // Hay una colisión
        }
      }
    }

    return false; // No hay colisión
  }
  gameOver() {
    console.log("Game Over!");
    // Implement game over logic here
  }
}

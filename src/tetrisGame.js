// TetrisGame.js
import { TetrisBoard } from "./tetrisBoard.js";

export class TetrisGame {
  constructor(canvasId) {
    this.board = new TetrisBoard();

    this.canvas = document.getElementById(canvasId);
    this.context = this.canvas.getContext("2d");

    this.setupCanvas();
    this.handleKeyPress();
    this.setupStartButton();
  }

  setupCanvas() {
    this.canvas.width = this.board.width * 20;
    this.canvas.height = this.board.height * 20;
  }

  handleKeyPress() {
    document.addEventListener("keydown", (event) => {
      switch (event.key) {
        case "ArrowUp":
          this.rotatePiece();
          break;
        case "ArrowDown":
          this.moveDown();
          break;
        case "ArrowLeft":
          this.moveLeft();
          break;
        case "ArrowRight":
          this.moveRight();
          break;
      }
    });
  }

  setupStartButton() {
    const startButton = document.getElementById("start_game");
    startButton.onclick = () => {
      this.gameRun = true;
      this.board.playerReset();
      console.log(this.board.player.pos);
      this.gameLoop = setInterval(() => {
        if (this.gameRun) {
          this.board.update();
          this.board.draw(this.context, 20); // Ajusta blockSize según sea necesario
        } else {
          this.board.gameOver();
          clearInterval(this.gameLoop); // Limpia el intervalo cuando el juego termina
        }
      }, 100);
      startButton.disabled = true;
    };
  }


  moveDown() {
    this.board.moveDown();
  }

  moveLeft() {
    if (this.board.isValidMove(-1, 0)) {
      this.board.moveLeft();
    }
  }

  moveRight() {
    if (this.board.isValidMove(1, 0)) {
      this.board.moveRight();
    }
  }

  rotatePiece() {
    this.board.rotatePiece();
  }

}

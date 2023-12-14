// src/InputHandler.js
export class InputHandler {
    constructor(game) {
      this.game = game;
  
      window.addEventListener("keydown", (e) => {
        switch (e.key) {
          case "ArrowLeft":
            this.game.move(-1);
            break;
          case "ArrowRight":
            this.game.move(1);
            break;
          case "ArrowDown":
            this.game.drop();
            break;
          case "ArrowUp":
            this.game.rotate();
            break;
          case " ":
            this.game.paused = true;
            break;
          default:
            break;
        }
      });
  
      window.addEventListener("click", (e) => {
        switch (this.game.ui.buttonClicked(e.offsetX, e.offsetY)) {
          case this.game.ui.START_STOP:
            this.game.paused = !this.game.paused;
            break;
          case this.game.ui.RESET:
            this.game.confirmReset();
            break;
          case this.game.ui.CONFIRM:
            this.game.reset = true;
            break;
          case this.game.ui.CANCEL:
            this.game.reset = false;
            this.game.ui.reset = false;
            this.game.paused = false;
            break;
          default:
            break;
        }
      });
    }
  }
  
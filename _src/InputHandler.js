// src/InputHandler.js

// Define la clase InputHandler
export class InputHandler {
  // Constructor que recibe un objeto 'game'
  constructor(game) {
      // Asigna el objeto 'game' a la propiedad 'game' de la instancia
      this.game = game;

      // Agrega un event listener para el evento de tecla presionada
      window.addEventListener("keydown", (e) => {
          // Switch basado en la tecla presionada
          switch (e.key) {
              case "ArrowLeft":
                  // Mueve la pieza a la izquierda
                  this.game.move(-1);
                  break;
              case "ArrowRight":
                  // Mueve la pieza a la derecha
                  this.game.move(1);
                  break;
              case "ArrowDown":
                  // Hace que la pieza caiga rápidamente
                  this.game.drop();
                  break;
              case "ArrowUp":
                  // Rota la pieza
                  this.game.rotate();
                  break;
              case " ":
                  // Pausa el juego
                  this.game.paused = true;
                  break;
              default:
                  break;
          }
      });

      // Agrega un event listener para el evento de clic del mouse
      window.addEventListener("click", (e) => {
          // Switch basado en el botón clickeado
          switch (this.game.ui.buttonClicked(e.offsetX, e.offsetY)) {
              case this.game.ui.START_STOP:
                  // Inicia o detiene el juego dependiendo del estado actual
                  this.game.paused = !this.game.paused;
                  break;
              case this.game.ui.RESET:
                  // Confirma el reinicio del juego
                  this.game.confirmReset();
                  break;
              case this.game.ui.CONFIRM:
                  // Confirma el reinicio del juego
                  this.game.reset = true;
                  break;
              case this.game.ui.CANCEL:
                  // Cancela el reinicio del juego y restablece las variables de estado
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

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

    
  }
}

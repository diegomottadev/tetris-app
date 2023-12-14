// src/UI.js

// Definición de la clase UI
export class UI {
  // Constructor que recibe un objeto 'game' y un ancho 'width' para la interfaz de usuario
  constructor(game, width) {
      // Asigna el objeto 'game' a la propiedad 'game' de la instancia
      this.game = game;
      
      // Asigna el ancho y la altura de la interfaz de usuario
      this.width = width;
      this.height = game.height;
      
      // Posición inicial para mostrar mensajes en la interfaz
      this.msgX = this.width * 0.1;
      this.msgY = this.game.height * 0.3;
      
      // Mensaje a mostrar en la interfaz
      this.message = "";
      
      // Temporizador para controlar la duración de la información de combo en la interfaz
      this.comboTimer = 0;
  }

  // Método que actualiza la interfaz de usuario, incluyendo la información de combo
  update(deltaTime) {
      // Verifica si hay un combo en el juego
      if (this.game.combo > 1) {
          // Actualiza el mensaje con información sobre el combo
          this.message = "COMBO x " + this.game.combo;

          // Verifica el tiempo transcurrido en el combo, restablece si ha pasado el tiempo límite
          if (this.comboTimer >= 2000) {
              this.game.combo = 0;
              this.comboTimer = 0;
          } else {
              // Incrementa el temporizador si el combo sigue activo
              this.comboTimer += deltaTime;
          }
      } else {
          // Si no hay combo, el mensaje es vacío
          this.message = "";
      }
  }

  // Método que dibuja la puntuación en la interfaz de usuario
  drawScore(context) {
      // Dibuja un fondo negro para la puntuación
      context.fillStyle = "black";
      context.fillRect(
          this.game.width + this.width * 0.1,
          this.width * 0.1,
          this.width * 0.1 * 8,
          this.width * 0.1 * 8
      );
      
      // Configura la fuente y el color del texto
      context.font = "26px sans-serif";
      context.fillStyle = "green";
      
      // Determina la posición 'x' de acuerdo con la longitud de la puntuación
      let x = this.game.width;
      if (this.game.score < 10) x += this.width * 0.6;
      else if (this.game.score < 100) x += this.width * 0.4;
      else x += this.width * 0.11;
      
      // Dibuja la puntuación en la interfaz
      context.fillText(this.game.score, x, this.width * 0.1 * 6.5);
  }

  // Método que muestra el mensaje de "Game Over" en la interfaz
  gameOver(context) {
      // Configura la fuente y el color del texto
      context.font = "42px sans-serif";
      context.fillStyle = "red";
      
      // Dibuja el mensaje "Game Over"
      context.fillText("Game Over", this.msgX, this.msgY);
      
      // Configura la fuente para la puntuación final y la muestra
      context.font = "24px sans-serif";
      context.fillText("Final Score:", this.msgX * 3, this.msgY + 80);
      context.fillText(this.game.score, this.msgX * 10, this.msgY + 160);
  }

  // Método que muestra la confirmación para reiniciar el juego
  confirmReset(context) {
      // Los métodos 'draw' de 'yes' y 'no' deberían estar definidos en otra parte del código
      this.yes.draw(context);
      this.no.draw(context);
  }

  // Método que dibuja la interfaz de usuario en general
  draw(context) {
      // Dibuja la puntuación en la interfaz
      this.drawScore(context);
      
      // Verifica si el juego ha terminado
      if (this.game.gameOver) {
          // Muestra el mensaje de "Game Over"
          this.gameOver(context);

          // Si la opción de reiniciar está activa, establece la propiedad 'reset' en el juego
          if (this.reset) this.game.reset = true;
      } else if (this.reset) {
          // Si la opción de reiniciar está activa, muestra la confirmación para reiniciar
          this.confirmReset(context);
      }
  }
}

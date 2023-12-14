// src/Block.js

// Definición de la clase Block
export class Block {
  // Constructor que recibe un objeto 'game' y las coordenadas 'x' e 'y'
  constructor(game, x, y) {
      // Asigna el objeto 'game' a la propiedad 'game' de la instancia
      this.game = game;
      
      // Asigna el tamaño de bloque del juego a las propiedades 'width' y 'height'
      this.width = game.blockSize;
      this.height = game.blockSize;
      
      // Asigna las coordenadas 'x' e 'y' a las propiedades correspondientes
      this.x = x;
      this.y = y;
      
      // Establece el color del bloque como "blue"
      this.color = "blue";
      
      // Establece la velocidad vertical del bloque (hacia abajo) como la altura del bloque
      this.speedY = this.height;
      
      // Indica si el bloque ha dejado de moverse (se detuvo)
      this.stopped = false;
  }

  // Método que actualiza la posición del bloque en cada cuadro del juego
  update() {
      // Verifica si la parte inferior del bloque no ha alcanzado la altura del juego y no está detenido
      if (this.y + this.height < this.game.height && !this.stopped) {
          // Incrementa la posición 'y' del bloque según su velocidad vertical
          this.y += this.speedY;
      } else {
          // Si el bloque ha alcanzado la parte inferior del juego o está detenido, establece 'stopped' en true
          this.stopped = true;
      }
  }

  // Método que dibuja el bloque en el lienzo (contexto)
  draw(context) {
      // Dibuja un borde negro alrededor del bloque
      context.fillStyle = "black";
      context.fillRect(this.x, this.y, this.width, this.height);
      
      // Dibuja el bloque interior con el color definido
      context.fillStyle = this.color;
      context.fillRect(this.x + 1, this.y + 1, this.width - 2, this.height - 2);
  }
}

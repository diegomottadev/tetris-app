// src/Game.js

// Importa las clases y constantes necesarias
import { InputHandler } from './InputHandler.js';
import { UI } from './UI.js';
import { Shape } from './Shape.js';
import { PIECES } from './Pieces.js';

// Define la clase Game
export class Game {
  // Constructor que recibe el ancho y alto del juego
  constructor(width, height) {
    // Ajusta el ancho del juego
    this.width = width * 0.8;
    // Calcula el tamaño de bloque basado en el ancho
    this.blockSize = this.width * 0.1;
    // Ajusta la altura del juego para ser múltiplo del tamaño de bloque
    this.height = height - (height % this.blockSize);
    
    // Crea una instancia de InputHandler para manejar la entrada del usuario
    this.input = new InputHandler(this);
    
    // Crea una instancia de UI para manejar la interfaz de usuario
    this.ui = new UI(this, width - this.width);
    
    // Calcula el número de columnas en el juego basado en el tamaño del bloque
    this.cols = Math.floor(this.width / this.blockSize);
    
    // Define una serie de formas iniciales para las piezas (shapes)
    this.shapes = [
      [
        { x: 1, y: -3 },
        { x: 1, y: -2 },
        { x: 1, y: -1 },
        { x: 2, y: -1 }
      ],
      // ... otras configuraciones de formas
    ];

    // Asigna las constantes PIECES importadas al objeto Game
    this.PIECES = PIECES;
    
    // Define un conjunto de colores para las piezas
    this.colors = ["#28400d", "#28400d", "#28400d", "#28400d", "#28400d", "#28400d"];
    
    // Crea una nueva pieza que caerá en el juego
    this.fallingBlock = new Shape(
      this,
      Math.round(Math.random() * (this.cols - 2)) * this.blockSize
    );
    
    // Crea una pieza para los bloques que ya han caído y se han detenido
    this.stoppedBlocks = new Shape(this, 0, 0);
    this.stoppedBlocks.empty(); // Vacía la pieza de bloques
    
    // Inicializa variables de tiempo y puntuación
    this.updateTimer = 0;
    this.updateInterval = 1500;
    this.score = 0;
    this.combo = 0;
    this.comboTimer = 0;
    
    // Define banderas para el estado del juego
    this.gameOver = false;
    this.paused = false;
    this.reset = false;
  }

  // Método que actualiza el estado del juego en cada fotograma
  update(deltaTime) {
    // Lógica de actualización del juego
    // ...
    
    // Actualiza la interfaz de usuario
    this.ui.update(deltaTime);
  }

  // Método que dibuja el estado actual del juego en el lienzo
  draw(context) {
    // Dibuja el fondo del juego y las piezas
    context.fillStyle = "#99c727";
    context.fillRect(0, 0, this.width, this.height);
    context.fillStyle = "#8dbf24";
    context.fillRect(1, 1, this.width - 2, this.height);
    this.stoppedBlocks.forEach((block) => block.draw(context));
    this.fallingBlock.draw(context);
    
    // Dibuja la interfaz de usuario
    this.ui.draw(context);
  }

  // Método que verifica si dos rectángulos (bloques) colisionan
  checkCollision(rect1, rect2) {
    return (
      rect1.x + rect1.width > rect2.x &&
      rect1.x < rect2.x + rect2.width &&
      rect1.y + rect1.height > rect2.y &&
      rect1.y < rect2.y + rect2.height
    );
  }

  // Método que mueve la pieza actual horizontalmente
  move(cols) {
    // Mueve la pieza actual
    this.fallingBlock.move(cols);
    
    // Verifica si hay colisiones con piezas ya detenidas
    if (
      this.fallingBlock.x >= 0 &&
      this.fallingBlock.x + this.fallingBlock.width <= this.width
    ) {
      this.fallingBlock.blocks.forEach((faller) => {
        this.stoppedBlocks.forEach((stopped) => {
          // Si hay colisión, revierte el movimiento
          if (this.checkCollision(faller, stopped))
            this.fallingBlock.move(-cols);
        });
      });
    } else this.fallingBlock.move(-cols);
  }

  // Método que hace que la pieza actual caiga rápidamente
  drop() {
    while (!this.fallingBlock.stopped) {
      this.update(this.updateInterval);
    }
    this.update(0);
  }

  // Método que rota la pieza actual
  rotate() {
    this.fallingBlock.rotate();
    if (
      this.fallingBlock.x >= 0 &&
      this.fallingBlock.x + this.fallingBlock.width <= this.width &&
      this.fallingBlock.y + this.fallingBlock.height < this.height
    ) {
      this.fallingBlock.forEach((faller) => {
        this.stoppedBlocks.forEach((stopped) => {
          // Si hay colisión, revierte la rotación
          if (this.checkCollision(faller, stopped))
            this.fallingBlock.rotate(-1);
        });
      });
    } else this.fallingBlock.rotate(-1);
  }

  // Método que confirma el reinicio del juego
  confirmReset() {
    this.paused = true;
    this.ui.reset = true;
  }
}

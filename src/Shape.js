// src/Shape.js

// Importa la clase 'Block' desde el archivo 'Block.js'
import { Block } from './Block.js';

// Define la clase 'Shape' que extiende de 'Block'
export class Shape extends Block {
    // Constructor que recibe un objeto 'game' y una posición 'x'
    constructor(game, x) {
        // Llama al constructor de la clase padre (Block) con las coordenadas 'x' e 'y'
        super(game, x, -game.blockSize);

        // Asigna un color aleatorio al bloque actual de entre los colores definidos en el juego
        this.color = game.colors[Math.floor(Math.random() * game.colors.length)];

        // Inicializa un arreglo vacío para almacenar los bloques que forman la figura
        this.blocks = [];

        // Obtiene todas las formas posibles de piezas del juego y elige una aleatoriamente
        const shapes = Object.values(game.PIECES);
        const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
        
        // Itera sobre la forma aleatoria y crea bloques para cada celda ocupada en la matriz
        randomShape.forEach((row, rowIndex) => {
            row.forEach((value, colIndex) => {
                if (value === 1) {
                    // Crea un nuevo bloque y lo añade a la figura
                    const b = new Block(
                        game,
                        (colIndex + x) * game.blockSize,
                        rowIndex * game.blockSize
                    );
                    b.color = this.color;
                    this.addBlock(b);
                }
            });
        });

        // Establece el pivote de la figura como el tercer bloque (índice 2)
        this.pivot = this.blocks[2];

        // Rota la figura aleatoriamente un número de veces entre 1 y 4
        for (let i = 0; i < Math.floor(Math.random() * 4) + 1; i++) this.rotate();

        // Ajusta la posición de la figura para que no exceda el ancho del juego
        while (this.x + this.width > game.width) this.move(-1);
    }

    // Método que actualiza la posición de la figura en cada cuadro del juego
    update() {
        // Verifica si la figura ha dejado de moverse
        if (this.stopped) this.forEach((block) => (block.stopped = true));
        else if (this.y + this.height < this.game.height) {
            // Mueve cada bloque hacia abajo y actualiza su estado si no ha llegado al final
            this.forEach((block) => {
                if (block.stopped) this.stopped = true;
                else block.update();
            });
            this.y += this.game.blockSize;
        } else this.stopped = true;
    }

    // Método que dibuja la figura en el lienzo (contexto)
    draw(context) {
        // Dibuja cada bloque que forma la figura
        this.forEach((block) => {
            block.draw(context);
        });
    }

    // Método que establece el color de la figura y de todos sus bloques
    setColor(color) {
        this.color = color;
        this.forEach((b) => (b.color = color));
    }

    // Método que mueve la figura horizontalmente en un número de columnas
    move(cols) {
        this.forEach((block) => (block.x += cols * block.width));
        this.x += cols * this.game.blockSize;
    }

    // Método que rota la figura en la dirección especificada
    rotate(dir = 1) {
        if (!this.isSquare()) {
            // Aplica una rotación a cada bloque con respecto al pivote
            this.forEach((block) => {
                const xOffset = block.x - this.pivot.x;
                const yOffset = block.y - this.pivot.y;
                block.x = this.pivot.x + -yOffset * dir;
                block.y = this.pivot.y + xOffset * dir;
            });
            // Ajusta las coordenadas después de la rotación
            this.resetCoords();
        }
    }

    // Método que devuelve la posición mínima en el eje X entre todos los bloques de la figura
    minX() {
        let x = this.game.width;
        this.forEach((block) => {
            if (block.x < x) x = block.x;
        });
        return x;
    }

    // Método que devuelve la posición máxima en el eje X entre todos los bloques de la figura
    maxX() {
        let x = 0;
        this.forEach((block) => {
            if (block.x > x) x = block.x;
        });
        return x;
    }

    // Método que devuelve la posición mínima en el eje Y entre todos los bloques de la figura
    minY() {
        let y = this.game.height;
        this.forEach((block) => {
            if (block.y < y) y = block.y;
        });
        return y;
    }

    // Método que devuelve la posición máxima en el eje Y entre todos los bloques de la figura
    maxY() {
        let y = -250;
        this.forEach((block) => {
            if (block.y > y) y = block.y;
        });
        return y;
    }

    // Método que ajusta las coordenadas de la figura después de cambios en los bloques
    resetCoords() {
        this.x = this.minX();
        this.y = this.minY();
        this.width = this.maxX() - this.x + this.game.blockSize;
        this.height = this.maxY() - this.y + this.game.blockSize;
    }

    // Método que verifica si la figura es un cuadrado
    isSquare() {
        return (
            this.blocks.filter((block) => block.x === this.x).length === 2 &&
            this.blocks.filter((block) => block.y === this.y).length === 2
        );
    }

    // Método que agrega un bloque a la figura
    addBlock(block) {
        this.blocks.push(block);
        this.resetCoords();
    }

    // Método que elimina un bloque de la figura
    removeBlock(block) {
        const newBlocks = [];
        this.forEach((b) => {
            if (b !== block) newBlocks.push(b);
        });
        this.blocks = newBlocks;
        this.resetCoords();
    }

    // Método que establece el color de todos los bloques de la figura
    setColor(color) {
        this.forEach((block) => (block.color = color));
    }

    // Método que itera sobre cada bloque de la figura y aplica una función
    forEach(apply) {
        this.blocks.forEach((block) => apply(block));
    }

    // Método que vacía el arreglo de bloques de la figura
    empty() {
        this.blocks = [];
    }

    // Método que elimina las filas completas formadas por la figura y devuelve la cantidad de filas eliminadas
    clearFullRows() {
        let cleared = 0;
        // Verifica si la figura ocupa toda la fila en la parte izquierda del juego
        if (this.x === 0 && this.width === this.game.width) {
            for (let y = this.y; y <= this.maxY(); y += this.game.blockSize) {
                // Filtra los bloques que pertenecen a la fila actual
                const row = this.blocks.filter((block) => block.y === y);
                // Si la fila está completa, elimina los bloques y ajusta las posiciones
                if (row.length === this.game.cols) {
                    row.forEach((block) => this.removeBlock(block));
                    this.forEach((block) => {
                        if (block.y < y) block.y += this.game.blockSize;
                    });
                    this.resetCoords();
                    cleared++;
                }
            }
        }
        return cleared;
    }
}

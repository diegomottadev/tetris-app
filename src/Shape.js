// src/Shape.js
import { Block } from './Block.js';

export class Shape extends Block {
    constructor(game, x) {
        super(game, x, -game.blockSize);
        this.color = game.colors[Math.floor(Math.random() * game.colors.length)];
        this.blocks = [];
        const shapes = Object.values(game.PIECES);
        const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
        
        randomShape.forEach((row, rowIndex) => {
          row.forEach((value, colIndex) => {
            if (value === 1) {
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
    
        this.pivot = this.blocks[2];
        for (let i = 0; i < Math.floor(Math.random() * 4) + 1; i++) this.rotate();
        while (this.x + this.width > game.width) this.move(-1);
      }

  update() {
    if (this.stopped) this.forEach((block) => (block.stopped = true));
    else if (this.y + this.height < this.game.height) {
      this.forEach((block) => {
        if (block.stopped) this.stopped = true;
        else block.update();
      });
      this.y += this.game.blockSize;
    } else this.stopped = true;
  }

  draw(context) {
    this.forEach((block) => {
      block.draw(context);
    });
  }

  setColor(color) {
    this.color = color;
    this.forEach((b) => (b.color = color));
  }

  move(cols) {
    this.forEach((block) => (block.x += cols * block.width));
    this.x += cols * this.game.blockSize;
  }

  rotate(dir = 1) {
    if (!this.isSquare()) {
      this.forEach((block) => {
        const xOffset = block.x - this.pivot.x;
        const yOffset = block.y - this.pivot.y;
        block.x = this.pivot.x + -yOffset * dir;
        block.y = this.pivot.y + xOffset * dir;
      });
      this.resetCoords();
    }
  }

  minX() {
    let x = this.game.width;
    this.forEach((block) => {
      if (block.x < x) x = block.x;
    });
    return x;
  }

  maxX() {
    let x = 0;
    this.forEach((block) => {
      if (block.x > x) x = block.x;
    });
    return x;
  }

  minY() {
    let y = this.game.height;
    this.forEach((block) => {
      if (block.y < y) y = block.y;
    });
    return y;
  }

  maxY() {
    let y = -250;
    this.forEach((block) => {
      if (block.y > y) y = block.y;
    });
    return y;
  }

  resetCoords() {
    this.x = this.minX();
    this.y = this.minY();
    this.width = this.maxX() - this.x + this.game.blockSize;
    this.height = this.maxY() - this.y + this.game.blockSize;
  }

  isSquare() {
    return (
      this.blocks.filter((block) => block.x === this.x).length === 2 &&
      this.blocks.filter((block) => block.y === this.y).length === 2
    );
  }

  addBlock(block) {
    this.blocks.push(block);
    this.resetCoords();
  }

  removeBlock(block) {
    const newBlocks = [];
    this.forEach((b) => {
      if (b !== block) newBlocks.push(b);
    });
    this.blocks = newBlocks;
    this.resetCoords();
  }

  setColor(color) {
    this.forEach((block) => (block.color = color));
  }

  forEach(apply) {
    this.blocks.forEach((block) => apply(block));
  }

  empty() {
    this.blocks = [];
  }

  clearFullRows() {
    let cleared = 0;
    if (this.x === 0 && this.width === this.game.width) {
      for (let y = this.y; y <= this.maxY(); y += this.game.blockSize) {
        const row = this.blocks.filter((block) => block.y === y);
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

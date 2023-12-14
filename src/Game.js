// src/Game.js
import { InputHandler } from './InputHandler.js';
import { UI } from './UI.js';
import { Shape } from './Shape.js';
import { Block } from './Block.js';
import { PIECES } from './Pieces.js';

export class Game {
  constructor(width, height) {
    this.width = width * 0.8;
    this.blockSize = this.width * 0.1;
    this.height = height - (height % this.blockSize);
    this.input = new InputHandler(this);
    this.ui = new UI(this, width - this.width);
    this.cols = Math.floor(this.width / this.blockSize);
    this.shapes = [
      [
        { x: 1, y: -3 },
        { x: 1, y: -2 },
        { x: 1, y: -1 },
        { x: 2, y: -1 }
      ],
      
      // ... other shape configurations
    ];
    this.PIECES = PIECES;
    this.colors = ["#28400d", "#28400d", "#28400d", "#28400d", "#28400d", "#28400d"];
    this.fallingBlock = new Shape(
      this,
      Math.round(Math.random() * (this.cols - 2)) * this.blockSize
    );
    this.stoppedBlocks = new Shape(this, 0, 0);
    this.stoppedBlocks.empty();
    this.updateTimer = 0;
    this.updateInterval = 1500;
    this.score = 0;
    this.combo = 0;
    this.comboTimer = 0;
    this.gameOver = false;
    this.paused = false;
    this.reset = false;
  }

  update(deltaTime) {
    if (this.reset) {
      this.fallingBlock = new Shape(
        this,
        Math.round(Math.random() * (this.cols - 2)) * this.blockSize
      );
      this.stoppedBlocks.empty();
      this.score = 0;
      this.combo = 0;
      this.gameOver = false;
      this.paused = false;
      this.reset = false;
      this.ui.reset = false;
    } else if (!this.gameOver && !this.paused) {
      if (this.fallingBlock.stopped) {
        this.fallingBlock.setColor("blue");
        this.fallingBlock.forEach((block) =>
          this.stoppedBlocks.addBlock(block)
        );
        this.combo = this.stoppedBlocks.clearFullRows();
        for (let i = 1; i <= this.combo; i++) {
          this.score += i * 10;
        }
        if (this.stoppedBlocks.y <= 0) this.gameOver = true;
        if (!this.gameOver) {
          this.fallingBlock = new Shape(
            this,
            Math.round(Math.random() * (this.cols - 2)) * this.blockSize,
            -this.blockSize
          );
        }
      } else {
        this.stoppedBlocks.forEach((block) => {
          this.fallingBlock.forEach((faller) => {
            faller.y++;
            if (this.checkCollision(block, faller)) {
              this.fallingBlock.stopped = true;
            }
            faller.y--;
          });
        });
        if (this.updateTimer >= this.updateInterval - this.score) {
          this.fallingBlock.update();
          this.updateTimer = 0;
        } else this.updateTimer += deltaTime;
      }
    }
    this.ui.update(deltaTime);
  }

  draw(context) {
    


    
    context.fillStyle = "#99c727";
    context.fillRect(0, 0, this.width, this.height);
    context.fillStyle = "#8dbf24";
    context.fillRect(1, 1, this.width - 2, this.height);
    this.stoppedBlocks.forEach((block) => block.draw(context));
    this.fallingBlock.draw(context);
    this.ui.draw(context);
  }

  checkCollision(rect1, rect2) {
    return (
      rect1.x + rect1.width > rect2.x &&
      rect1.x < rect2.x + rect2.width &&
      rect1.y + rect1.height > rect2.y &&
      rect1.y < rect2.y + rect2.height
    );
  }

  move(cols) {
    this.fallingBlock.move(cols);
    if (
      this.fallingBlock.x >= 0 &&
      this.fallingBlock.x + this.fallingBlock.width <= this.width
    ) {
      this.fallingBlock.blocks.forEach((faller) => {
        this.stoppedBlocks.forEach((stopped) => {
          if (this.checkCollision(faller, stopped))
            this.fallingBlock.move(-cols);
        });
      });
    } else this.fallingBlock.move(-cols);
  }

  drop() {
    while (!this.fallingBlock.stopped) {
      this.update(this.updateInterval);
    }
    this.update(0);
  }

  rotate() {
    this.fallingBlock.rotate();
    if (
      this.fallingBlock.x >= 0 &&
      this.fallingBlock.x + this.fallingBlock.width <= this.width &&
      this.fallingBlock.y + this.fallingBlock.height < this.height
    ) {
      this.fallingBlock.forEach((faller) => {
        this.stoppedBlocks.forEach((stopped) => {
          if (this.checkCollision(faller, stopped))
            this.fallingBlock.rotate(-1);
        });
      });
    } else this.fallingBlock.rotate(-1);
  }

  confirmReset() {
    this.paused = true;
    this.ui.reset = true;
  }
}

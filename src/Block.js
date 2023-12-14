// src/Block.js
export class Block {
    constructor(game, x, y) {
      this.game = game;
      this.width = game.blockSize;
      this.height = game.blockSize;
      this.x = x;
      this.y = y;
      this.color = "blue";
      this.speedY = this.height;
      this.stopped = false;
    }
  
    update() {
      if (this.y + this.height < this.game.height && !this.stopped) {
        this.y += this.speedY;
      } else this.stopped = true;
    }
  
    draw(context) {
      context.fillStyle = "black";
      context.fillRect(this.x, this.y, this.width, this.height);
      context.fillStyle = this.color;
      context.fillRect(this.x + 1, this.y + 1, this.width - 2, this.height - 2);
    }
  }
  
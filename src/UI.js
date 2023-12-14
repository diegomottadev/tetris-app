// src/UI.js
import { Button } from './Button.js';

export class UI {
  constructor(game, width) {
    this.game = game;
    this.width = width;
    this.height = game.height;
    this.msgX = this.width * 0.1;
    this.msgY = this.game.height * 0.3;
    this.message = "";
    this.comboTimer = 0;
  }

  update(deltaTime) {
    if (this.game.combo > 1) {
      this.message = "COMBO x " + this.game.combo;
      if (this.comboTimer >= 2000) {
        this.game.combo = 0;
        this.comboTimer = 0;
      } else this.comboTimer += deltaTime;
    } else this.message = "";
    
  }


  drawScore(context) {
    context.fillStyle = "black";
    context.fillRect(
      this.game.width + this.width * 0.1,
      this.width * 0.1,
      this.width * 0.1 * 8,
      this.width * 0.1 * 8
    );
    
    context.font = "26px sans-serif";
    context.fillStyle = "green";
    let x = this.game.width;
    
    if (this.game.score < 10) x += this.width * 0.6;
    else if (this.game.score < 100) x += this.width * 0.4;
    else x += this.width * 0.11;
    
    context.fillText(this.game.score, x, this.width * 0.1 * 6.5);
  }

  gameOver(context) {
    context.font = "42px sans-serif";
    context.fillStyle = "red";
    context.fillText("Game Over", this.msgX, this.msgY);
    context.font = "24px sans-serif";
    context.fillText("Final Score:", this.msgX * 3, this.msgY + 80);
    context.fillText(this.game.score, this.msgX * 10, this.msgY + 160);
  }

  confirmReset(context) {
    this.yes.draw(context);
    this.no.draw(context);
  }

  draw(context) {
     this.drawScore(context);
    if (this.game.gameOver) {
      this.gameOver(context);
      if (this.reset) this.game.reset = true;
    } else if (this.reset) {
      this.confirmReset(context);
    }
  }
  
}

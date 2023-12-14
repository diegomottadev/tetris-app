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
    this.START_STOP = "START_STOP";
    this.RESET = "RESET";
    this.CONFIRM = "CONFIRM";
    this.CANCEL = "CANCEL";

    this.startStop = new Button(
      !this.game.paused ? "PAUSE" : "PLAY",
      game.width + this.width * 0.1,
      game.height * 0.75,
      this.width * 0.8,
      this.height * 0.1
    );
    
    this.resetButton = new Button(
      "RESET",
      game.width + this.width * 0.1,
      game.height * 0.86,
      this.width * 0.8,
      this.height * 0.1,
      "#B71C1C"
    );
    
    this.reset = false;
    this.yes = new Button(
      "YES",
      this.msgX + this.game.width * 0.2,
      this.msgY + this.game.height * 0.15,
      this.game.width * 0.2,
      this.game.height * 0.1
    );
    
    this.no = new Button(
      "NO!",
      this.msgX + this.game.width * 0.6,
      this.msgY + this.game.height * 0.15,
      this.game.width * 0.2,
      this.game.height * 0.1
    );
    
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
    
    if (this.game.paused) this.startStop.label = "PLAY";
    else this.startStop.label = "PAUSE";
    
    if (this.reset) this.message = "START OVER?";
  }

  drawSidePanel(context) {
    context.fillStyle = "black";
    context.fillRect(this.game.width, 0, this.width, this.game.height);
    context.fillStyle = "gray";
    context.fillRect(
      this.game.width + 1,
      1,
      this.width - 2,
      this.game.height - 2
    );
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

  drawMessage(context) {
    context.fillStyle =
      this.game.combo <= 1
        ? "red"
        : this.game.colors[Math.floor(Math.random() * this.game.colors.length)];
    let fontSize = this.game.height * 0.2;
    const maxWidth = this.game.width * 0.9;
    
    context.font = fontSize + "px sans-serif";
    while (context.measureText(this.message).width > maxWidth) {
      fontSize -= 1;
      context.font = fontSize + "px sans-serif";
    }
    
    context.fillText(this.message, this.msgX, this.msgY);
  }

  drawButtons(context) {
    this.startStop.draw(context);
    this.resetButton.draw(context);
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
    // this.drawSidePanel(context);
     this.drawScore(context);
    // this.drawButtons(context);
    // this.drawMessage(context);
    if (this.game.gameOver) {
      this.gameOver(context);
      if (this.reset) this.game.reset = true;
    } else if (this.reset) {
      this.confirmReset(context);
    }
  }

  buttonClicked(x, y) {
    if (
      x > this.startStop.x &&
      x < this.startStop.x + this.startStop.width &&
      y > this.startStop.y &&
      y < this.startStop.y + this.startStop.height
    )
      return this.START_STOP;
    else if (
      x > this.resetButton.x &&
      x < this.resetButton.x + this.resetButton.width &&
      y > this.resetButton.y &&
      y < this.resetButton.y + this.resetButton.height
    )
      return this.RESET;
    else if (
      x > this.yes.x &&
      x < this.yes.x + this.yes.width &&
      y > this.yes.y &&
      y < this.yes.y + this.yes.height
    )
      return this.CONFIRM;
    else if (
      x > this.no.x &&
      x < this.no.x + this.no.width &&
      y > this.no.y &&
      y < this.no.y + this.no.height
    )
      return this.CANCEL;
  }
}

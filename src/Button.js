// src/Button.js
export class Button {
    constructor(
      label,
      x,
      y,
      width,
      height,
      color = "#607D8B",
      border = 1,
      padding = 5
    ) {
      this.label = label;
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.color = color;
      this.border = border;
      this.padding = padding;
    }
  
    drawLabel(context) {
      context.fillStyle = "black";
      let fontSize = this.height - this.border - this.padding;
      const maxWidth = this.width - (this.border + this.padding) * 2;
      context.font = fontSize + "px sans-serif";
      while (context.measureText(this.label).width > maxWidth) {
        fontSize -= 1;
        context.font = fontSize + "px sans-serif";
      }
      context.fillText(
        this.label,
        this.x + this.border + this.padding,
        this.y + this.height - this.border - this.padding
      );
    }
  
    draw(context) {
      context.fillStyle = "black";
      context.fillRect(this.x, this.y, this.width, this.height);
      context.fillStyle = this.color;
      context.fillRect(
        this.x + this.border,
        this.y + this.border,
        this.width - this.border * 2,
        this.height - this.border * 2
      );
      context.fillStyle = "black";
      this.drawLabel(context);
    }
  }
  
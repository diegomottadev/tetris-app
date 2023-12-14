
import { Game } from './src/Game.js';

window.addEventListener("load", () => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = 300;
  canvas.height = 300;

  const game = new Game(canvas.width, canvas.height);
  let prevTime = 0;

  const animate = (timeStamp = 0) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const deltaTime = timeStamp - prevTime;
    prevTime = timeStamp;
    game.update(deltaTime);
    game.draw(ctx);
    requestAnimationFrame(animate);
  };

  animate();
});

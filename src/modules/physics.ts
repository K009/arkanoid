import Brick from "../classes/Brick.js";

export function brickCollisionDetection(
  bricks: Brick[],
  x: number,
  y: number,
  dy: number
) {
  for (let r = 0; r < bricks.length; r++) {
    const b = bricks[r];
    if (b.status == 1) {
      if (
        x > b.xPosition &&
        x < b.xPosition + b.width &&
        y > b.yPosition &&
        y < b.yPosition + b.height
      ) {
        dy = -dy;
        b.status = 0;
      }
    }
  }

  return dy;
}

export function borderCollisionDetection(
  canvas: HTMLCanvasElement,
  ballRadius: number,
  ballX: number,
  ballY: number,
  playerX: number,
  playerWidth: number,
  playerHeight: number,
  dx: number,
  dy: number
) {
  if (ballX + dx > canvas.width - ballRadius || ballX + dx < ballRadius) {
    dx = -dx;
  }
  if (ballY + dy < ballRadius) {
    dy = -dy;
  } else if (ballY + dy > canvas.height - ballRadius) {
    if (ballX > playerX && ballX < playerX + playerWidth) {
      if ((ballY = ballY - playerHeight)) {
        dy = -dy;
      }
    }
  }

  return [dx, dy];
}

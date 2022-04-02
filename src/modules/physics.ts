import AudioController from "../classes/AudioController.js";
import Brick from "../classes/Brick.js";
import Player from "../classes/Player.js";
import SuperPowers from "../classes/SuperPowers.js";

export function brickCollisionDetection(
  bricks: Brick[],
  ballX: number,
  ballY: number,
  dy: number,
  ctx: CanvasRenderingContext2D,
  superPowers: SuperPowers[]
): [number, SuperPowers[]] {
  for (let r = 0; r < bricks.length; r++) {
    const brick = bricks[r];
    if (brick.status == 1) {
      if (
        ballX + 2 > brick.xPosition &&
        ballX + 2 < brick.xPosition + brick.width &&
        ballY + 2 > brick.yPosition &&
        ballY + 2 < brick.yPosition + brick.height
      ) {
        const play: AudioController = new AudioController();
        play.bounce();
        //TODO: make it random - not every destroyed brick should generate superPower
        superPowers.push(new SuperPowers(brick, ctx));
        dy = -dy;
        brick.status = 0;
      }
    }
  }

  return [dy, superPowers];
}

export function borderCollisionDetection(
  canvas: HTMLCanvasElement,
  ballRadius: number,
  ballX: number,
  ballY: number,
  player: Player,
  dx: number,
  dy: number,
  isOver: number,
  superPowers: SuperPowers[]
): [number, number, number, SuperPowers[]] {
  if (ballX + dx > canvas.width - ballRadius || ballX + dx < ballRadius) {
    dx = -1.05 * dx;
  }
  if (ballY + dy < ballRadius) {
    dy = -dy;
  } else if (ballY + dy > canvas.height - ballRadius) {
    if (ballX > player.xPosition && ballX < player.xPosition + player.width) {
      if ((ballY = ballY - player.height)) {
        const play: AudioController = new AudioController();

        dy = -dy;
        play.bounce();
        //reverse ball x vector if player is moving in the opposite way than the ball
        if (
          (player.direction === "left" && dx > 0) ||
          (player.direction === "right" && dx < 0)
        ) {
          dx = -Math.sign(dx) * 2;
        }
      }
    } else if (ballY > canvas.height + ballRadius + 2) {
      isOver = 1;
    }
  }

  //stop drawing superPowers if they touch the ground
  superPowers.forEach(function (superPower) {
    if (superPower.yPosition > canvas.height + superPower.height + 2) {
      superPower.status = 0;
    }
  });
  return [dx, dy, isOver, superPowers];
}

export function superPowerDetection(
  player: Player,
  superPowers: SuperPowers[],
  canvas: HTMLCanvasElement
) {
  superPowers.forEach(function (superPower) {
    if (superPower.status === 1) {
      if (
        (superPower.xPosition > player.xPosition &&
          superPower.xPosition < player.xPosition + player.width) ||
        (superPower.xPosition + superPower.width > player.xPosition &&
          superPower.xPosition + superPower.width <
            player.xPosition + player.width)
      ) {
        if (
          superPower.yPosition == canvas.height - player.height &&
          superPower.yPosition < canvas.height
        ) {
          console.log("Collision!");
        }
      }
    }
  });
  // if(superPower hits player)
  //   player gets superPower
  //   superPowers gets destroyed
}

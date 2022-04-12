import AudioController from "../classes/AudioController.js";
import Ball from "../classes/Ball.js";
import Brick from "../classes/Brick.js";
import Player from "../classes/Player.js";
import SuperPowers from "../classes/SuperPowers.js";
//RESTORE SOUNDS!!! BUT REMOVE THEM FROM SITE AFTER BEING PLAYED (NOW ITS LAGGING IF THERE ARE TOO MANY OF THEM)
export function brickCollisionDetection(
  bricks: Brick[],
  ballX: number,
  ballY: number,
  dx: number,
  dy: number,
  ctx: CanvasRenderingContext2D,
  superPowers: SuperPowers[],
  ball: Ball
): [number, number, SuperPowers[], Ball] {
  for (let r = 0; r < bricks.length; r++) {
    const brick = bricks[r];
    if (brick.status == 1) {
      // up&&down collision
      if (
        ballX > brick.xPosition &&
        ballX < brick.xPosition + brick.width &&
        ballY > brick.yPosition &&
        ballY < brick.yPosition + brick.height
      ) {
        //const play: AudioController = new AudioController();
        const randomFactor = Math.floor(Math.random() * 10);

        // play.bounce();
        //if (randomFactor % 2 === 0)
        superPowers.push(new SuperPowers(brick, ctx));

        ball.dy = -ball.dy;

        brick.status = 0;
      }
      // left&&right collision
      else if (
        ballX > brick.xPosition - 3 &&
        ballX < brick.xPosition + brick.width + 3 &&
        ballY > brick.yPosition &&
        ballY < brick.yPosition + brick.height
      ) {
        //const play: AudioController = new AudioController();
        const randomFactor = Math.floor(Math.random() * 10);

        // play.bounce();
        //if (randomFactor % 2 === 0)
        superPowers.push(new SuperPowers(brick, ctx));

        ball.dy = ball.dy;
        ball.dx = -ball.dx;
        brick.status = 0;
      }
    }
  }

  return [dx, dy, superPowers, ball];
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
  superPowers: SuperPowers[],
  ball: Ball
): [number, number, number, SuperPowers[], Ball] {
  if (
    ballX + ball.dx > canvas.width - ballRadius ||
    ballX + ball.dx < ballRadius
  ) {
    ball.dx = -ball.dx;
    //to make it harder we can put * 1.05
  }
  if (ballY + ball.dy < ballRadius) {
    ball.dy = -ball.dy;
  } else if (ballY + ball.dy > canvas.height - ballRadius) {
    if (ballX > player.xPosition && ballX < player.xPosition + player.width) {
      if ((ballY = ballY - player.height)) {
        //const play: AudioController = new AudioController();

        ball.dy = -ball.dy;
        // play.bounce();
        //reverse ball x vector if player is moving in the opposite way than the ball
        if (
          (player.direction === "left" && ball.dx > 0) ||
          (player.direction === "right" && ball.dx < 0)
        ) {
          ball.dx = -Math.sign(ball.dx) * 2;
        }
      }
    } else if (ballY > canvas.height + ballRadius + 2) {
      ball.status = 0;
      //isOver = 1;
    }
  }

  //stop drawing superPowers if they touch the ground
  superPowers.forEach(function (superPower) {
    if (superPower.yPosition > canvas.height + superPower.height + 2) {
      superPower.status = 0;
    }
  });
  return [dx, dy, isOver, superPowers, ball];
}

export function superPowerDetection(
  player: Player,
  balls: Ball[],
  superPowers: SuperPowers[],
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D
): Ball[] {
  const classContext = this;
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

          // const playerModes = [player.wideModeOn, player.fastModeOn];
          // superPower.allPossibleTypes.forEach(function (type, i) {
          //    if (superPower.allPossibleTypes.indexOf(superPower.type) === i) {
          //      //console.log(i)
          //     player.modeOn(i);
          //    }
          //   //   console.log("PLAYER MODE:");
          //   //   console.log(player.normalMode);
          //   //   if (player.normalMode) {
          //   //     console.log(playerModes[i]);
          //   //     player.normalMode = false;
          //   //     playerModes[i]();
          //   //     player.modeOn(i);
          //   //   }
          //   // }
          //   // if (superPower.type === type) {
          //   //     playerModes[0]();
          //   // }
          // });
          //IDEA: make an array of all superPower types here and iterate through that
          //above code is a sketch
          if (superPower.type === "widerPlayer") {
            if (player.normalMode) {
              player.normalMode = false;
              player.wideModeOn();
            }
          } else if (superPower.type === "fasterPlayer") {
            if (player.normalMode) {
              player.normalMode = false;
              player.fastModeOn();
            }
          } else if (superPower.type === "moreBalls") {
            let newBall = new Ball(ctx, canvas);

            balls.forEach(function (ball) {
              if (ball.status === 1) {
                newBall.dx = ball.dx;
                newBall.dy = ball.dy;
                newBall.xPosition = ball.xPosition + 10;
                newBall.yPosition = ball.yPosition + 10;
              }
            });
            balls.push(newBall);
          }
        }
      }
    }
  });
  return balls;
}

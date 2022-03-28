import {
  brickCollisionDetection,
  borderCollisionDetection,
} from "../modules/physics.js";
import { getPositions } from "../data/bricksPosition.js";
import Ball from "./Ball.js";
import Brick from "./Brick.js";
import Player from "./Player.js";
import AudioController from "./AudioController.js";

export default class Level {
  public ctx: CanvasRenderingContext2D;
  public index: number; //which level should be rendered
  public dx: number = 2; //x vector of ball movement
  public dy: number = -2; //y vector of ball movement
  public isOver: number = 0; //change it to boolean in the future

  protected color: string;

  constructor(index: number, ctx: CanvasRenderingContext2D) {
    this.index = index;
    this.ctx = ctx;
  }

  //here define objects
  initialDraw(canvas: HTMLCanvasElement) {
    const player: Player = new Player(this.ctx, canvas);
    const ball: Ball = new Ball(this.ctx, canvas);
    const bricks: Brick[] = [];
    const removedBricks: Brick[] = [];
    const classContext = this;
    const probeBrick: Brick = new Brick(this.ctx, canvas, 1, 0, 0);
    const audioPlayer: AudioController = new AudioController();

    if (this.index === 1) {
      const positions = getPositions(canvas, probeBrick);
      positions.forEach(function (brick: { x: number; y: number }, i: number) {
        bricks[i] = new Brick(classContext.ctx, canvas, 1, brick.x, brick.y);
      });
    }

    return { player, ball, bricks, removedBricks, audioPlayer };
  }

  drawScene(
    canvas: HTMLCanvasElement,
    keyLeftPressed: boolean,
    keyRightPressed: boolean,
    player: Player,
    ball: Ball,
    bricks: Brick[],
    removedBricks: Brick[],
    audioPlayer: AudioController
  ) {
    //clearing the scene
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);

    player.draw();
    ball.draw();
    // if all bricks's status is 0 then alert the player
    bricks.forEach(function (brick) {
      if (brick.status === 1) {
        brick.drawBrick();
      } else {
        //check if the brick is not currently in the array
        //make sure that all elements are unique
        if (removedBricks.indexOf(brick) === -1) {
          removedBricks.push(brick);
        }
      }
    });
    if (removedBricks.length === bricks.length || this.isOver === 1) {
      //reset ending game variables
      this.isOver = 0;
      removedBricks = [];

      //alert("Give it another shot.");

      //reset bricks' status and ball & player positions and velocity vectors
      bricks.forEach(function (brick) {
        brick.status = 1;
      });
      ball.xPosition = ball.startPositionX;
      ball.yPosition = ball.startPositionY;

      player.xPosition = player.startPositionX;

      this.dx = 2;
      this.dy = -2;
    }

    //update y vector on bricksCollision
    this.dy = brickCollisionDetection(
      bricks,
      ball.xPosition,
      ball.yPosition,
      this.dy,
      audioPlayer
    );

    //update x and y vectors on bordersCollision
    [this.dx, this.dy, this.isOver] = borderCollisionDetection(
      canvas,
      ball.ballRadius,
      ball.xPosition,
      ball.yPosition,
      player,
      this.dx,
      this.dy,
      this.isOver,
      audioPlayer
    );

    //move the player when keys are pressed
    if (keyRightPressed) {
      player.xPosition += player.velocity;
      player.direction = "right";

      //after 0.5s when player stopped moving change the direction value
      setTimeout(() => {
        player.direction = "none";
      }, 1000);

      if (player.xPosition + player.width > canvas.width) {
        player.xPosition = canvas.width - player.width;
      }
    } else if (keyLeftPressed) {
      player.xPosition -= player.velocity;
      player.direction = "left";

      //after 0.5s when player stopped moving change the direction value
      setTimeout(() => {
        player.direction = "none";
      }, 1000);

      if (player.xPosition < 0) {
        player.xPosition = 0;
      }
    }

    //move the ball with the given vectors each 10ms
    ball.xPosition += this.dx;
    ball.yPosition += this.dy;
  }
}

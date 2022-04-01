import {
  brickCollisionDetection,
  borderCollisionDetection,
} from "../modules/physics.js";
import { getLevelData } from "../data/levelData.js";
import Ball from "./Ball.js";
import Brick from "./Brick.js";
import Player from "./Player.js";
import Supervisor from "./Supervisor.js";

export default class Level {
  public ctx: CanvasRenderingContext2D;
  public canvas: HTMLCanvasElement;
  public dx: number = 2; //x vector of ball movement
  public dy: number = -2; //y vector of ball movement
  public isOver: number = 0; //change it to boolean in the future
  public index: number; //which level

  protected color: string;

  constructor(
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    index: number
  ) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.index = index;
  }

  //here define objects
  initialDraw() {
    const player: Player = new Player(this.ctx, this.canvas);
    const ball: Ball = new Ball(this.ctx, this.canvas);
    const bricks: Brick[] = [];
    const removedBricks: Brick[] = [];
    const classContext = this;
    const probeBrick: Brick = new Brick(this.ctx, this.canvas, 1, 0, 0);

    const levelData = getLevelData(this.canvas, probeBrick, this.index);
    //TODO: fix any
    (levelData.brickAttribs as any).forEach(function (
      brick: { x: number; y: number; color: string },
      i: number
    ) {
      bricks[i] = new Brick(
        classContext.ctx,
        classContext.canvas,
        1,
        brick.x,
        brick.y,
        brick.color
      );
    });

    return { player, ball, bricks, removedBricks };
  }

  resetTheLevel(
    bricks: Brick[],
    removedBricks: Brick[],
    ball: Ball,
    player: Player
  ): [Brick[], Brick[], Ball, Player] {
    const levelConfig = getLevelData(
      this.canvas,
      new Brick(this.ctx, this.canvas, 1, 0, 0),
      this.index
    );

    //Vectors and win condition
    this.dx = levelConfig.dx;
    this.dy = levelConfig.dy;
    this.isOver = 0;

    //Ball & Player positions
    ball.xPosition = ball.startPositionX;
    ball.yPosition = ball.startPositionY;
    player.xPosition = player.startPositionX;

    //Bricks
    removedBricks.length = 0;
    bricks.forEach(function (brick) {
      brick.status = 1;
    });

    return [bricks, removedBricks, ball, player];
  }

  goToNextLevel(
    bricks: Brick[],
    removedBricks: Brick[],
    ball: Ball,
    player: Player
  ): [Brick[], Brick[], Ball, Player] {
    const classContext = this;
    let brickAttribs = [];

    const levelConfig = getLevelData(
      this.canvas,
      new Brick(this.ctx, this.canvas, 1, 0, 0),
      this.index + 1
    );

    //Vectors
    this.dx = levelConfig.dx;
    this.dy = levelConfig.dy;

    //Bricks
    brickAttribs = levelConfig.brickAttribs;
    removedBricks.length = 0;
    bricks.length = 0;

    //TODO: fix any
    (brickAttribs as any).forEach(function (
      brick: { x: number; y: number; color: string },
      i: number
    ) {
      bricks[i] = new Brick(
        classContext.ctx,
        classContext.canvas,
        1,
        brick.x,
        brick.y,
        brick.color
      );
    });

    return [bricks, removedBricks, ball, player];
  }

  drawScene(
    canvas: HTMLCanvasElement,
    keyLeftPressed: boolean,
    keyRightPressed: boolean,
    player: Player,
    ball: Ball,
    bricks: Brick[],
    removedBricks: Brick[],
    superVisor: Supervisor
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

    //player lost
    if (this.isOver === 1) {
      [bricks, removedBricks, ball, player] = this.resetTheLevel(
        bricks,
        removedBricks,
        ball,
        player
      );
    }

    //player won
    if (removedBricks.length === bricks.length) {
      //add if player wins condition with different bricks, vectors, background
      [bricks, removedBricks, ball, player] = this.goToNextLevel(
        bricks,
        removedBricks,
        ball,
        player
      );
    }

    //update y vector on bricksCollision
    this.dy = brickCollisionDetection(
      bricks,
      ball.xPosition,
      ball.yPosition,
      this.dy
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
      this.isOver
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

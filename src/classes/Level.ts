import {
  brickCollisionDetection,
  borderCollisionDetection,
} from "../modules/physics.js";
import { getLevelData } from "../data/bricksPosition.js";
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

    if (this.index === 1) {
      const positions = getPositions(this.canvas, probeBrick);
      positions.forEach(function (brick: { x: number; y: number }, i: number) {
        bricks[i] = new Brick(
          classContext.ctx,
          classContext.canvas,
          1,
          brick.x,
          brick.y
        );
      });
    }

    // if (this.index === 2) {
    //   const positions = getPositions(this.canvas, probeBrick);
    //   positions.forEach(function (brick: { x: number; y: number }, i: number) {
    //     bricks[i] = new Brick(
    //       classContext.ctx,
    //       classContext.canvas,
    //       1,
    //       brick.x + 10,
    //       brick.y + 10
    //     );
    //   });
    // }

    return { player, ball, bricks, removedBricks };
  }

  resetTheLevel(
    bricks: Brick[],
    ball: Ball,
    player: Player
  ): [Brick[], Brick[], Ball, Player] {
    const removedBricks: Brick[] = []; //empty the array
    //think about deleting this line and replacing it with parameter from function or just return empty array

    this.dx = 2; //to default value, which is 2
    this.dy = -2; //to default value, which is -2
    this.isOver = 0; // 0

    ball.xPosition = ball.startPositionX;
    ball.yPosition = ball.startPositionY;
    player.xPosition = player.startPositionX;

    //here we can modify already created bricks, change their position or maybe color
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
    let brickAttribs = [];

    removedBricks.length = 0;
    if (this.index === 1) {
      [
        this.dx,
        this.dy,
        ball.xPosition,
        ball.yPosition,
        player.xPosition,
        player.width,
        player.color,
        brickAttribs
      ] = getLevelData(this.canvas, probeBrick, 2);
    }
    //here add several ifs with or some logic that will handle redrawing the scene with the correct level

    bricks.length = 0;

    brickAttribs.forEach(function (brick: { x: number; y: number, color: string }, i: number) {
      bricks[i] = new Brick(
        classContext.ctx,
        classContext.canvas,
        1,
        brick.x,
        brick.y,
        brick.color
      );
    });


    // this.dx = -3; //to default value, which is 2
    // this.dy = -2; //to default value, which is -2

    // ball.xPosition = ball.startPositionX;
    // ball.yPosition = ball.startPositionY;
    // player.xPosition = player.startPositionX;
    // player.color = "yellow";

    // //the only problem with changing something is with bricks, because we set their position in initialDraw method
    // //i guess we can modify it exactly like the ball position here like:
    // bricks.forEach(function (brick) {
    //   brick.xPosition += 10;
    //   brick.yPosition += 10;
    //   brick.status = 1;
    // });

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

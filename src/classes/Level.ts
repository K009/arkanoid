import {
  brickCollisionDetection,
  borderCollisionDetection,
  superPowerDetection,
} from "../modules/physics.js";
import { getLevelData } from "../data/levelData.js";
import Ball from "./Ball.js";
import Brick from "./Brick.js";
import Player from "./Player.js";
import Supervisor from "./Supervisor.js";
import SuperPowers from "./SuperPowers.js";
import Bar from "./Bar.js";
import { levelConfigInterface } from "../interfaces/dataInterfaces.js";

export default class Level {
  public ctx: CanvasRenderingContext2D;
  public canvas: HTMLCanvasElement;
  public barCtx: CanvasRenderingContext2D;
  public barCanvas: HTMLCanvasElement;
  public dx: number; //x vector of ball movement
  public dy: number; //y vector of ball movement
  public isOver: number = 0; //change it to boolean in the future
  public index: number; //which level
  public score: number;
  public lives: number;

  protected color: string;

  constructor(
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    barCanvas: HTMLCanvasElement,
    barCtx: CanvasRenderingContext2D,
    index: number
  ) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.barCanvas = barCanvas;
    this.barCtx = barCtx;
    this.index = index;
    this.score = 0;
    this.lives = 3;
  }

  //here define objects
  initialDraw() {
    const player: Player = new Player(this.ctx, this.canvas);
    const balls: Ball[] = [];
    const removedBalls: Ball[] = [];
    balls[0] = new Ball(this.ctx, this.canvas);
    const bricks: Brick[] = [];
    const removedBricks: Brick[] = [];
    const classContext = this;
    const probeBrick: Brick = new Brick(this.ctx, this.canvas, 1, 0, 0);
    const superPowers: SuperPowers[] = [];
    const bar: Bar = new Bar(this.barCtx, this.barCanvas);

    const levelData = getLevelData(this.canvas, probeBrick, this.index);

    balls[0].dx = levelData.dx;
    balls[0].dy = levelData.dy;
    player.color = levelData.playerColor;

    //TODO: fix any
    (levelData.brickAttribs as any).forEach(function (
      brick: { x: number; y: number; color: string; isBoss: boolean },
      i: number
    ) {
      bricks[i] = new Brick(
        classContext.ctx,
        classContext.canvas,
        1,
        brick.x,
        brick.y,
        brick.color,
        brick.isBoss
      );
    });

    return {
      player,
      balls,
      bricks,
      removedBricks,
      superPowers,
      removedBalls,
      bar
    };
  }

  resetCommonPart(
    balls: Ball[],
    player: Player,
    removedBalls: Ball[],
    levelIndex: number
  ): [levelConfigInterface, Ball[], Player, Ball[]] {

    const levelConfig = getLevelData(
      this.canvas,
      new Brick(this.ctx, this.canvas, 1, 0, 0),
      levelIndex
    );

    //Balls reseet and initializing new ball
    balls.length = 0;
    removedBalls.length = 0;

    balls[0] = new Ball(this.ctx, this.canvas);
    balls[0].dx = levelConfig.dx;
    balls[0].dy = levelConfig.dy;

    //Player positions
    player.xPosition = player.startPositionX; 

    return [levelConfig, balls, player, removedBalls];
  }

  //TODO: add reseting superPowers here
  resetTheLevel(
    bricks: Brick[],
    removedBricks: Brick[],
    balls: Ball[],
    player: Player,
    removedBalls: Ball[]
  ): [Brick[], Brick[], Ball[], Player, Ball[]] {
    const classContext = this;
    let levelConfig: levelConfigInterface;

    if(this.lives === 1){

      [levelConfig, balls, player, removedBalls] = this.resetCommonPart(balls, player, removedBalls, 1);

      //Bricks and score reset
      bricks.length = 0;
      removedBricks.length = 0;
      this.score = 0;

      //Player color
      player.color = player.randColor();

      //like that we're creating totally new objects of Bricks (so different color for example)
      (levelConfig.brickAttribs as any).forEach(function (
        brick: { x: number; y: number; color: string; isBoss: boolean },
        i: number
      ) {
        bricks[i] = new Brick(
          classContext.ctx,
          classContext.canvas,
          1,
          brick.x,
          brick.y,
          brick.color,
          brick.isBoss
        );
      });

      this.lives = 3;
      this.index = 1;
    } else {
      [levelConfig, balls, player, removedBalls] = this.resetCommonPart(balls, player, removedBalls, this.index);

      this.lives = this.lives -1;
    }

    return [bricks, removedBricks, balls, player, removedBalls];
  }

  //TODO: add reseting superPowers here
  goToNextLevel(
    bricks: Brick[],
    removedBricks: Brick[],
    balls: Ball[],
    player: Player,
    removedBalls: Ball[]
  ): [Brick[], Brick[], Ball[], Player, Ball[]] {
    const classContext = this;
    let levelConfig: levelConfigInterface;

    [levelConfig, balls, player, removedBalls] = this.resetCommonPart(balls, player, removedBalls, this.index + 1);

    //Bricks
    removedBricks.length = 0;
    bricks.length = 0;

    //Player
    player.color = levelConfig.playerColor;

    //Score reset
    this.score = 0;

    //TODO: fix any
    (levelConfig.brickAttribs as any).forEach(function (
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

    this.index += 1;

    return [bricks, removedBricks, balls, player, removedBalls];
  }

  drawScene(
    canvas: HTMLCanvasElement,
    keyLeftPressed: boolean,
    keyRightPressed: boolean,
    player: Player,
    balls: Ball[],
    bricks: Brick[],
    removedBricks: Brick[],
    superVisor: Supervisor,
    superPowers: SuperPowers[],
    removedBalls: Ball[],
    bar: Bar
  ) {
    const classContext = this;

    //clearing the scene
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    bar.draw(this.index, this.score, this.lives);
    player.draw();
    balls.forEach(function (ball) {
      ball.draw();
    });

    superPowers.forEach(function (superPower) {
      if (superPower.status === 1) {
        superPower.draw();
        superPower.yPosition += 2;
      }
    });

    // if all bricks's status is 0 then alert the player
    bricks.forEach(function (brick) {
      if (brick.status === 1) {
        brick.drawBrick(removedBricks.length, bricks.length);
      } else {
        //check if the brick is not currently in the array
        //make sure that all elements are unique
        if (removedBricks.indexOf(brick) === -1) {
          removedBricks.push(brick);
        }
      }
    });

    //player lost
    // console.log("LEGHIT: " + balls.length);
    // console.log("NONLEGIT: " + removedBalls.length);
    if (removedBalls.length === balls.length) {
      [bricks, removedBricks, balls, player, removedBalls] = this.resetTheLevel(
        bricks,
        removedBricks,
        balls,
        player,
        removedBalls
      );
      // player.drawSuperMode();
    }

    // console.log("REMOVED: " + removedBricks.length);
    // console.log("ACTIVE: " + bricks.length);
    //player won
    if (removedBricks.length === bricks.length) {
      //add if player wins condition with different bricks, vectors, background
      [bricks, removedBricks, balls, player, removedBalls] = this.goToNextLevel(
        bricks,
        removedBricks,
        balls,
        player,
        removedBalls
      );
    }

    //update y vector on bricksCollision
    balls.forEach(function (ball) {
      [classContext.dx, classContext.dy, superPowers, ball, classContext.score] =
        brickCollisionDetection(
          bricks,
          ball.xPosition,
          ball.yPosition,
          classContext.dx,
          classContext.dy,
          classContext.ctx,
          superPowers,
          ball,
          classContext.score
        );

      [
        classContext.dx,
        classContext.dy,
        classContext.isOver,
        superPowers,
        ball,
      ] = borderCollisionDetection(
        canvas,
        ball.ballRadius,
        ball.xPosition,
        ball.yPosition,
        player,
        classContext.dx,
        classContext.dy,
        classContext.isOver,
        superPowers,
        ball
      );
    });

    superPowerDetection(player, balls, superPowers, canvas, this.ctx);

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
    balls.forEach(function (ball) {
      if (ball.status === 1) {
        ball.xPosition += ball.dx;
        ball.yPosition += ball.dy;
      } else {
        if (removedBalls.indexOf(ball) === -1) {
          removedBalls.push(ball);
        }
      }
    });
  }
}

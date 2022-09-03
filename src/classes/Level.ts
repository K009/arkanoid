import {
  brickCollisionDetection,
  borderCollisionDetection,
  superPowerDetection,
} from "../modules/physics.js";
import { getLevelData } from "../data/levelData.js";
import Ball from "./Ball.js";
import Brick from "./Brick.js";
import Player from "./Player.js";
import SuperPowers from "./SuperPowers.js";
import Bar from "./Bar.js";
import {
  AllLevelElements,
  BrickInterface,
  LevelConfigInterface,
  LevelElements,
  PlayerController,
} from "../types/utils.types.js";
import Graphic from "./Graphic.js";

// Basically what this class should do?
// For now it:
// Draws the level, redraw it, move the game to the next level
// Calls other functions such as physics ones
// Store score, lives, balls vectors

// Maybe leaving canvas and ctx (of the game!) as a class attributes is a good idea here

export default class Level {
  // public dx: number; //x vector of ball movement
  // public dy: number; //y vector of ball movement
  public isOver: number = 0; //change it to boolean in the future
  public index: number; //which level
  public score: number;
  public lives: number;
  public gameScreen: Graphic;

  protected color: string;

  constructor(index: number) {
    this.index = index;
    this.score = 0;
    this.lives = 3;
  }

  getCanvas() {
    const gameScreen: Graphic = new Graphic();
    const barGraphic: Graphic = new Graphic();
    const gameCanvas: HTMLCanvasElement = <HTMLCanvasElement>(
      document.getElementById("myCanvas")
    );
    const barCanvas: HTMLCanvasElement = <HTMLCanvasElement>(
      document.getElementById("bar")
    );
    const gameCtx: CanvasRenderingContext2D = gameCanvas.getContext("2d");
    const barCtx: CanvasRenderingContext2D = barCanvas.getContext("2d");

    //positions' of all game elements are calculated based on below variables
    gameCanvas.width = window.innerWidth / 1.5;
    gameCanvas.height = gameCanvas.width / 2;

    barCanvas.width = window.innerWidth / 1.5;
    barCanvas.height = barCanvas.width / 10;

    gameScreen.setCanvas(gameCanvas);
    gameScreen.setCtx(gameCtx);

    barGraphic.setCanvas(barCanvas);
    barGraphic.setCtx(barCtx);

    this.gameScreen = gameScreen;
    
    return [gameScreen, barGraphic]
  }

  // here define objects
  // and distribute canvas elements everywhere
  initialDraw() {
    let gameScreen: Graphic = new Graphic();
    let barGraphic: Graphic = new Graphic();

    [gameScreen, barGraphic] = this.getCanvas();

    // Old part
    const player: Player = new Player(
      gameScreen.getCtx(),
      gameScreen.getCanvas()
    );
    const balls: Ball[] = [];
    const removedBalls: Ball[] = [];
    balls[0] = new Ball(gameScreen.getCtx(), gameScreen.getCanvas());

    const bricks: Brick[] = [];
    const removedBricks: Brick[] = [];
    const probeBrick: Brick = new Brick(
      gameScreen.getCtx(),
      gameScreen.getCanvas(),
      1,
      0,
      0
    );

    const bar: Bar = new Bar(barGraphic.getCtx(), barGraphic.getCanvas());
    const superPowers: SuperPowers[] = [];

    const levelData = getLevelData(
      gameScreen.getCanvas(),
      probeBrick,
      this.index
    );

    balls[0].dx = levelData.dx;
    balls[0].dy = levelData.dy;
    player.color = levelData.playerColor;

    levelData.brickAttribs.forEach(function (brick: BrickInterface, i: number) {
      bricks[i] = new Brick(
        gameScreen.getCtx(),
        gameScreen.getCanvas(),
        1,
        brick.x,
        brick.y,
        brick.color,
        brick.isBoss
      );
    });

    let levelElements: LevelElements = {
      player,
      balls,
      bricks,
      removedBricks,
      superPowers,
      removedBalls,
      bar,
    };

    return levelElements;

    // maybe this approach is better
    // this.drawScene(levelElements);
  }

  resetCommonPart(
    balls: Ball[],
    player: Player,
    removedBalls: Ball[],
    levelIndex: number
  ): [LevelConfigInterface, Ball[], Player, Ball[]] {
    const levelConfig = getLevelData(
      this.gameScreen.getCanvas(),
      new Brick(this.gameScreen.getCtx(), this.gameScreen.getCanvas(), 1, 0, 0),
      levelIndex
    );

    // Balls reset and initializing new ball
    balls.length = 0;
    removedBalls.length = 0;

    balls[0] = new Ball(this.gameScreen.getCtx(), this.gameScreen.getCanvas());
    balls[0].dx = levelConfig.dx;
    balls[0].dy = levelConfig.dy;

    // Player positions
    player.xPosition = player.startPositionX;

    return [levelConfig, balls, player, removedBalls];
  }

  //TODO: add reseting superPowers here
  resetTheLevel(levelElements: LevelElements): LevelElements {
    const classContext = this;
    let levelConfig: LevelConfigInterface;

    let { player, balls, removedBalls, bricks, removedBricks }: LevelElements =
      levelElements;

    // move the player back to the first level
    if (this.lives === 1) {
      [levelConfig, balls, player, removedBalls] = this.resetCommonPart(
        balls,
        player,
        removedBalls,
        1
      );

      player.color = player.randColor();
      removedBricks.length = 0;
      bricks.length = 0;

      // like that we're creating totally new objects of Bricks (so different color for example)
      levelConfig.brickAttribs.forEach(function (
        brick: BrickInterface,
        i: number
      ) {
        bricks[i] = new Brick(
          classContext.gameScreen.getCtx(),
          classContext.gameScreen.getCanvas(),
          1,
          brick.x,
          brick.y,
          brick.color,
          brick.isBoss
        );
      });

      this.score = 0;
      this.lives = 3;
      this.index = 1;
    } else {
      // reset the current level
      [levelConfig, balls, player, removedBalls] = this.resetCommonPart(
        balls,
        player,
        removedBalls,
        this.index
      );

      this.lives = this.lives - 1;
    }

    return levelElements;
  }

  //TODO: add reseting superPowers here
  goToNextLevel(levelElements: LevelElements): LevelElements {
    const classContext = this;
    let levelConfig: LevelConfigInterface;

    let { player, balls, removedBalls, bricks, removedBricks }: LevelElements =
      levelElements;

    [levelConfig, balls, player, removedBalls] = this.resetCommonPart(
      balls,
      player,
      removedBalls,
      this.index + 1
    );

    player.color = levelConfig.playerColor;
    removedBricks.length = 0;
    bricks.length = 0;

    levelConfig.brickAttribs.forEach(function (
      brick: { x: number; y: number; color: string },
      i: number
    ) {
      bricks[i] = new Brick(
        classContext.gameScreen.getCtx(),
        classContext.gameScreen.getCanvas(),
        1,
        brick.x,
        brick.y,
        brick.color
      );
    });

    this.index += 1;

    return levelElements;
  }

  drawScene(levelElements: LevelElements, playerController: PlayerController) {
    const classContext = this;

    let {
      player,
      balls,
      removedBalls,
      bricks,
      removedBricks,
      superPowers,
      bar,
    }: LevelElements = levelElements;

    let { keyLeftPressed, keyRightPressed }: PlayerController =
      playerController;
    let score = this.score;
    let ctx = this.gameScreen.getCtx();
    let gameScreen = this.gameScreen;

    let allLevelElements: AllLevelElements = {
      ...levelElements,
      ...playerController,
      gameScreen,
      score,
      ctx,
    };

    // clearing the scene
    this.gameScreen
      .getCtx()
      .clearRect(
        0,
        0,
        this.gameScreen.getCanvas().width,
        this.gameScreen.getCanvas().height
      );

    // draw all the elements
    bar.draw(this.index, this.score, this.lives);
    player.draw();
    balls.forEach(function (ball) {
      ball.draw();
    });

    superPowers.forEach(function (superPower) {
      if (superPower.status === 1) {
        superPower.draw();

        // falling down
        superPower.yPosition += 2;
      }
    });

    // if all bricks's status is 0 then alert the player
    bricks.forEach(function (brick) {
      if (brick.status === 1) {
        brick.drawBrick(removedBricks.length, bricks.length);
      } else {
        // check if the brick is not currently in the array
        // make sure that all elements are unique
        if (removedBricks.indexOf(brick) === -1) {
          removedBricks.push(brick);
        }
      }
    });

    // conditions for controlling the level state
    // player lost
    if (removedBalls.length === balls.length) {
      levelElements = this.resetTheLevel(levelElements);
    }

    // player won
    if (removedBricks.length === bricks.length) {
      if (this.index === 5) {
        bar.draw(6, this.score, this.lives);
      }
      levelElements = this.goToNextLevel(levelElements);
    }

    // check all the collisions
    // update y vector on bricksCollision
    balls.forEach(function (ball) {
      // add each ball to the allLevelElements object
      allLevelElements["ball"] = ball;

      allLevelElements = brickCollisionDetection(allLevelElements);
      allLevelElements = borderCollisionDetection(allLevelElements);

      classContext.score = allLevelElements.score;
    });

    superPowerDetection(allLevelElements);

    // movement of the player
    // move the player when keys are pressed
    if (keyRightPressed) {
      player.xPosition += player.velocity;
      player.direction = "right";

      // after 0.5s when player stopped moving change the direction value
      setTimeout(() => {
        player.direction = "none";
      }, 1000);

      if (player.xPosition + player.width > this.gameScreen.getCanvas().width) {
        player.xPosition = this.gameScreen.getCanvas().width - player.width;
      }
    } else if (keyLeftPressed) {
      player.xPosition -= player.velocity;
      player.direction = "left";

      // after 0.5s when player stopped moving change the direction value
      setTimeout(() => {
        player.direction = "none";
      }, 1000);

      if (player.xPosition < 0) {
        player.xPosition = 0;
      }
    }

    // move the ball with the given vectors each 10ms
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

import Ball from "./Ball.js";
import Brick from "./Brick.js";
import Level from "./Level.js";
import Player from "./Player.js";

export default class Supervisor {
  public ctx: CanvasRenderingContext2D;
  public canvas: HTMLCanvasElement;
  public barCtx: CanvasRenderingContext2D;
  public barCanvas: HTMLCanvasElement;

  constructor(
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    barCanvas: HTMLCanvasElement,
    barCtx: CanvasRenderingContext2D
  ) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.barCanvas = barCanvas;
    this.barCtx = barCtx;
  }

  startGame() {
    //superPowers seems to look wrong on level 4
    const levelOne: Level = new Level(
      this.ctx,
      this.canvas,
      this.barCanvas,
      this.barCtx,
      3
    );
    const {
      player,
      balls,
      bricks,
      removedBricks,
      superPowers,
      removedBalls,
      bar
    } = levelOne.initialDraw();

    //consider moving keyControl to seperate function / file
    let keyLeftPressed: boolean = false;
    let keyRightPressed: boolean = false;

    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);

    function keyDownHandler(e: KeyboardEvent) {
      if (e.key === "Right" || e.key === "ArrowRight") {
        keyRightPressed = true;
      } else if (e.key === "Left" || e.key === "ArrowLeft") {
        keyLeftPressed = true;
      }
    }

    function keyUpHandler(e: KeyboardEvent) {
      if (e.key === "Right" || e.key === "ArrowRight") {
        keyRightPressed = false;
      } else if (e.key === "Left" || e.key === "ArrowLeft") {
        keyLeftPressed = false;
      }
    }

    setInterval(() => {
      levelOne.drawScene(
        this.canvas,
        keyLeftPressed,
        keyRightPressed,
        player,
        balls,
        bricks,
        removedBricks,
        this,
        superPowers,
        removedBalls,
        bar
      );
    }, 10);
  }
}

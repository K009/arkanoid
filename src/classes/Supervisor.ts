import { LevelController, LevelElements } from "../types/utils.types.js";
import Graphic from "./Graphic.js";
import Level from "./Level.js";

export default class Supervisor {
  public gameScreen: Graphic;
  public barGraphic: Graphic;

  constructor(
    gameScreen: Graphic,
    barGraphic: Graphic
  ) {
    this.gameScreen = gameScreen;
    this.barGraphic = barGraphic;
  }

  startGame() {
    //superPowers seems to look wrong on level 4
    const levelOne: Level = new Level(
      this.gameScreen,
      this.barGraphic,
      2
    );
    let levelController: LevelController;
    let levelElements: LevelElements;
    let gameScreen = this.gameScreen;

    levelElements= levelOne.initialDraw();

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
      levelController = {
        gameScreen,
        keyLeftPressed,
        keyRightPressed
      }

      levelOne.drawScene(
        levelElements,
        levelController
      );
    }, 10);
  }
}

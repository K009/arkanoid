import { PlayerController, LevelElements } from "../types/utils.types.js";
import Level from "./Level.js";

export default class Supervisor {
  constructor() { }

  startGame() {
    //superPowers seems to look wrong on level 4
    const levelOne: Level = new Level(2);
    let playerController: PlayerController;
    let levelElements: LevelElements;

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
      playerController = {
        keyLeftPressed,
        keyRightPressed
      }
      levelOne.drawScene(
        levelElements,
        playerController
      );
    }, 10);
  }
}

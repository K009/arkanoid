import Level from "./Level.js";
export default class Supervisor {
    constructor(gameScreen, barGraphic) {
        this.gameScreen = gameScreen;
        this.barGraphic = barGraphic;
    }
    startGame() {
        //superPowers seems to look wrong on level 4
        const levelOne = new Level(this.gameScreen, this.barGraphic, 2);
        let levelController;
        let levelElements;
        let gameScreen = this.gameScreen;
        levelElements = levelOne.initialDraw();
        //consider moving keyControl to seperate function / file
        let keyLeftPressed = false;
        let keyRightPressed = false;
        document.addEventListener("keydown", keyDownHandler, false);
        document.addEventListener("keyup", keyUpHandler, false);
        function keyDownHandler(e) {
            if (e.key === "Right" || e.key === "ArrowRight") {
                keyRightPressed = true;
            }
            else if (e.key === "Left" || e.key === "ArrowLeft") {
                keyLeftPressed = true;
            }
        }
        function keyUpHandler(e) {
            if (e.key === "Right" || e.key === "ArrowRight") {
                keyRightPressed = false;
            }
            else if (e.key === "Left" || e.key === "ArrowLeft") {
                keyLeftPressed = false;
            }
        }
        setInterval(() => {
            levelController = {
                gameScreen,
                keyLeftPressed,
                keyRightPressed
            };
            levelOne.drawScene(levelElements, levelController);
        }, 10);
    }
}

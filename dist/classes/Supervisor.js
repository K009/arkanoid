import Level from "./Level.js";
export default class Supervisor {
    constructor(canvas, ctx, barCanvas, barCtx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.barCanvas = barCanvas;
        this.barCtx = barCtx;
    }
    startGame() {
        //superPowers seems to look wrong on level 4
        const levelOne = new Level(this.ctx, this.canvas, this.barCanvas, this.barCtx, 1);
        let levelController;
        let levelElements;
        let canvas = this.canvas;
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
                canvas,
                keyLeftPressed,
                keyRightPressed
            };
            levelOne.drawScene(levelElements, levelController);
        }, 10);
    }
}

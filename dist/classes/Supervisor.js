import Level from "./Level.js";
export default class Supervisor {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
    }
    startGame() {
        const levelOne = new Level(1, this.ctx);
        const { player, ball, bricks, removedBricks } = levelOne.initialDraw(this.canvas);
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
            levelOne.drawScene(this.canvas, keyLeftPressed, keyRightPressed, player, ball, bricks, removedBricks, this);
        }, 10);
    }
    goToNextLevel() { }
}

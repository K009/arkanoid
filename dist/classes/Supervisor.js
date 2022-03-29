import Level from "./Level.js";
export default class Supervisor {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
    }
    startGame(keyLeftPressed, keyRightPressed) {
        const levelOne = new Level(1, this.ctx);
        const { player, ball, bricks, removedBricks } = levelOne.initialDraw(this.canvas);
        setInterval(() => {
            levelOne.drawScene(this.canvas, keyLeftPressed, keyRightPressed, player, ball, bricks, removedBricks);
        }, 10);
    }
    ;
    resetTheLevel() {
    }
    ;
    goToNextLevel() {
    }
    ;
}

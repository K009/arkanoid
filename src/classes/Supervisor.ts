import Level from "./Level.js";

export default class Supervisor {
    public ctx: CanvasRenderingContext2D;
    public canvas: HTMLCanvasElement;

    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        this.canvas = canvas;
        this.ctx = ctx;
    }
    startGame(keyLeftPressed: boolean, keyRightPressed: boolean) {
        const levelOne: Level = new Level(1, this.ctx);
        const { player, ball, bricks, removedBricks } = levelOne.initialDraw(this.canvas);
        
        setInterval(() => {
          levelOne.drawScene(
            this.canvas,
            keyLeftPressed,
            keyRightPressed,
            player,
            ball,
            bricks,
            removedBricks
          );
        }, 10);
    };

    resetTheLevel() {

    };

    goToNextLevel() {

    };
}
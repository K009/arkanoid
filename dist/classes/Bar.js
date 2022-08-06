export default class Bar {
    constructor(ctx, canvas) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.xPosition = 0;
        this.yPosition = 0;
        this.width = canvas.width;
        this.height = 20;
    }
    draw(levelIndex, score, lives) {
        if (levelIndex !== 6) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.font = "30px Arial";
            this.ctx.fillStyle = "white";
            this.ctx.fillText("Level 1-" + levelIndex + " | Score: " + score + " | Lives: " + lives, this.xPosition, 30);
        }
        else {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.font = "30px Arial";
            this.ctx.fillStyle = "white";
            this.ctx.fillText("Congrats, you finished the game. Your score is: " + score + "!", this.xPosition, 30);
        }
    }
}

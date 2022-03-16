export default class Player {
    constructor(ctx, canvas) {
        this.playerWidth = 70;
        this.playerHeight = 10;
        this.ctx = ctx;
        this.canvas = canvas;
        this.xPosition = (canvas.width - this.playerWidth) / 2;
    }
    draw() {
        this.ctx.beginPath();
        this.ctx.rect(this.xPosition, this.canvas.height - this.playerHeight, this.playerWidth, this.playerHeight);
        this.ctx.fillStyle = "pink";
        this.ctx.fill();
        this.ctx.stroke();
        this.ctx.closePath();
    }
}

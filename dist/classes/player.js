export default class Player {
    constructor(ctx, canvas) {
        this.velocity = 5;
        this.ctx = ctx;
        this.canvas = canvas;
        this.width = canvas.width / 8.5;
        this.height = canvas.width / 60;
        this.xPosition = (canvas.width - this.width) / 2;
        this.startPositionX = this.xPosition;
    }
    draw() {
        this.ctx.beginPath();
        this.ctx.rect(this.xPosition, this.canvas.height - this.height, this.width, this.height);
        this.ctx.fillStyle = "#E53935";
        this.ctx.fill();
        this.ctx.strokeStyle = "black";
        this.ctx.stroke();
        this.ctx.closePath();
    }
}

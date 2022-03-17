export default class Player {
    constructor(ctx, canvas) {
        this.width = 70;
        this.height = 10;
        this.ctx = ctx;
        this.canvas = canvas;
        this.xPosition = (canvas.width - this.width) / 2;
    }
    draw() {
        this.ctx.beginPath();
        this.ctx.rect(this.xPosition, this.canvas.height - this.height, this.width, this.height);
        this.ctx.fillStyle = "pink";
        this.ctx.fill();
        this.ctx.stroke();
        this.ctx.closePath();
    }
}

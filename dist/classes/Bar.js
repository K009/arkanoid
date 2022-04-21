export default class Bar {
    constructor(ctx, canvas) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.xPosition = 0;
        this.yPosition = 0;
        this.width = canvas.width;
        this.height = 20;
    }
    draw() {
        this.ctx.beginPath();
        this.ctx.rect(this.xPosition, this.yPosition, this.width, this.height);
        this.ctx.fillStyle = "black";
        this.ctx.fill();
        this.ctx.closePath();
        this.ctx.font = "30px Comic Sans MS";
        this.ctx.fillStyle = "red";
        this.ctx.fillText('Hello world', this.xPosition, this.yPosition);
    }
    moreBalls() {
        for (let i = 0; i < 2; i++)
            this.draw();
    }
}

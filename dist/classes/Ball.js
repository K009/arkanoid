export default class Ball {
    constructor(ctx, canvas) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.xPosition = canvas.width / 2;
        this.yPosition = canvas.height - 30;
        this.ballRadius = canvas.width / 160;
        this.startPositionX = this.xPosition;
        this.startPositionY = this.yPosition;
    }
    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.xPosition, this.yPosition, this.ballRadius, 0, Math.PI * 2);
        this.ctx.fillStyle = "red";
        this.ctx.fill();
        this.ctx.closePath();
    }
    moreBalls() {
        for (let i = 0; i < 2; i++)
            this.draw();
    }
}

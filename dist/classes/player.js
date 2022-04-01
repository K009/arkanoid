export default class Player {
    constructor(ctx, canvas) {
        this.velocity = 5;
        this.ctx = ctx;
        this.canvas = canvas;
        this.width = canvas.width / 8.5;
        this.height = canvas.width / 60;
        this.color = "#E53935";
        this.xPosition = (canvas.width - this.width) / 2;
        this.startPositionX = this.xPosition;
    }
    draw() {
        this.ctx.beginPath();
        this.ctx.rect(this.xPosition, this.canvas.height - this.height, this.width, this.height);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
        this.ctx.strokeStyle = "black";
        this.ctx.stroke();
        this.ctx.closePath();
    }
    drawSuperMode() {
        const xFactor = Math.floor(Math.random() * 30);
        const yFactor = Math.floor(Math.random() * 10);
        this.ctx.beginPath();
        this.ctx.rect(this.xPosition - xFactor, this.canvas.height - this.height - yFactor, this.width + xFactor * 2, this.height + yFactor * 2);
        this.ctx.fillStyle = this.randColor();
        this.ctx.fill();
        this.ctx.closePath();
    }
    randColor() {
        const colorArray = [
            "#F44336",
            "#FFEBEE",
            "#FFCDD2",
            "#EF9A9A",
            "#E57373",
            "#EF5350",
            "#E53935",
            "#D32F2F",
            "#C62828",
            "#B71C1C",
            "#FF8A80",
            "#FF5252",
            "#FF1744",
        ];
        return colorArray[Math.floor(Math.random() * colorArray.length)];
    }
}

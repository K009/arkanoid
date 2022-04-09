export default class Brick {
    constructor(ctx, canvas, status, xPosition, yPosition, color, isBoss) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.width = canvas.width / 22; //25
        this.height = canvas.width / 60; //5
        this.xPosition = xPosition;
        this.yPosition = yPosition;
        this.status = status;
        this.color = color ? color : this.randColor();
        this.isBoss = isBoss ? isBoss : false;
        this.xFactor = 1;
        this.yFactor = 1;
    }
    //idea
    //set colors that we get from level class (predefined for each level)
    drawBrick() {
        if (!this.isBoss) {
            this.ctx.beginPath();
            this.ctx.fillStyle = this.color;
            this.ctx.rect(this.xPosition, this.yPosition, this.width, this.height);
            this.ctx.fill();
            this.ctx.stroke();
            this.ctx.closePath();
        }
        else {
            if (this.xPosition > this.canvas.width - this.width || this.xPosition < this.width) {
                this.xFactor = -1 * this.xFactor;
            }
            else if (this.yPosition > this.canvas.height - 300 || this.yPosition < 10) {
                this.yFactor = -1 * this.yFactor;
            }
            this.xPosition += this.xFactor;
            //this.yPosition += this.yFactor;
            this.ctx.beginPath();
            this.ctx.fillStyle = this.color;
            this.ctx.rect(this.xPosition, this.yPosition, this.width, this.height);
            this.ctx.fill();
            this.ctx.stroke();
            this.ctx.closePath();
        }
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

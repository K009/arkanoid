export default class SuperPowers {
    constructor(brick, ctx
    //   canvas: HTMLCanvasElement,
    //   status: number,
    //   xPosition: number,
    //   yPosition: number,
    //   color?: string
    ) {
        this.brick = brick;
        this.ctx = ctx;
        this.width = brick.width; //25
        this.height = brick.height; //5
        this.xPosition = brick.xPosition;
        this.yPosition = brick.yPosition;
        this.status = brick.status;
        this.color = this.randColor();
        this.type = this.randType();
        this.superPowersTypes = ["widerPlayer", "higherPlayer"];
    }
    //TODO: add different superPower types (their look and functionality)
    draw() {
        const classContext = this;
        const rays = [3, 4, 5];
        const colors = ["red", "yellow", "orange"];
        let ballRadius = 0;
        let color = "";
        this.superPowersTypes.forEach(function (type, i) {
            if (type === classContext.type) {
                ballRadius = rays[i];
                color = colors[i];
            }
        });
        this.ctx.beginPath();
        //rect
        this.ctx.fillStyle = this.color;
        this.ctx.rect(this.xPosition, this.yPosition, this.width / ballRadius, this.height / ballRadius);
        this.ctx.fill();
        this.ctx.stroke();
        // cirlce
        // this.ctx.arc(this.xPosition, this.yPosition, ballRadius, 0, Math.PI * 2);
        // this.ctx.fillStyle = color;
        // this.ctx.fill();
        this.ctx.closePath();
    }
    randType() {
        const superPowersTypes = ["widerPlayer", "higherPlayer"];
        return superPowersTypes[Math.floor(Math.random() * superPowersTypes.length)];
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

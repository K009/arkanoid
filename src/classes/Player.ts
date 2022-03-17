export default class Player {
    public ctx: CanvasRenderingContext2D;
    public xPosition: number;
    public canvas: HTMLCanvasElement;

    public width: number = 70;
    public height: number = 10;


    constructor(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.xPosition = (canvas.width - this.width) / 2;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.rect(
            this.xPosition,
            this.canvas.height - this.height,
            this.width,
            this.height
        );
        this.ctx.fillStyle = "pink";
        this.ctx.fill();
        this.ctx.stroke();
        this.ctx.closePath();
    }
}
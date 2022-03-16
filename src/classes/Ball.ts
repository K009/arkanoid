export default class Ball {
    public ctx: CanvasRenderingContext2D;
    public canvas: HTMLCanvasElement;

    protected ballRadius: number = 10;
    protected xPosition: number;
    protected yPosition: number;


    constructor(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.xPosition = (canvas.width) / 2;
        this.yPosition = canvas.height - 30;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.arc(
            this.xPosition,
            this.yPosition,
            this.ballRadius,
            0,
            Math.PI*2
        );
        this.ctx.fillStyle = "#0095DD";
        this.ctx.fill();
        this.ctx.closePath();
    }
}
export default class Player {
    public ctx: CanvasRenderingContext2D;
    public xPosition: number;;
    public canvas: HTMLCanvasElement;

    protected playerWidth: number = 70;
    protected playerHeight: number = 10;


    constructor(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.xPosition = (canvas.width - this.playerWidth) / 2;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.rect(
            this.xPosition,
            this.canvas.height - this.playerHeight,
            this.playerWidth,
            this.playerHeight
        );
        this.ctx.fillStyle = "pink";
        this.ctx.fill();
        this.ctx.stroke();
        this.ctx.closePath();
    }
}
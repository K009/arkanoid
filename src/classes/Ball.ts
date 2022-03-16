export default class Ball {
    public ctx: CanvasRenderingContext2D;


    constructor(ctx: CanvasRenderingContext2D, status: number) {

    }

    draw() {
        ctx.beginPath();
        ctx.arc(x, y, ballRadius, 0, Math.PI*2);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }
}
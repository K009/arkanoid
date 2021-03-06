export default class Ball {
  public ctx: CanvasRenderingContext2D;
  public canvas: HTMLCanvasElement;
  public ballRadius: number;
  public xPosition: number;
  public yPosition: number;

  public startPositionX: number;
  public startPositionY: number;

  public dx: number;
  public dy: number;

  public status: number;

  constructor(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.xPosition = canvas.width / 2;
    this.yPosition = canvas.height - 30;
    this.ballRadius = canvas.width / 160;
    this.startPositionX = this.xPosition;
    this.startPositionY = this.yPosition;
    this.status = 1;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(
      this.xPosition,
      this.yPosition,
      this.ballRadius,
      0,
      Math.PI * 2
    );
    this.ctx.fillStyle = "red";
    this.ctx.fill();
    this.ctx.closePath();
  }

  moreBalls() {
    for (let i = 0; i < 2; i++) this.draw();
  }
}

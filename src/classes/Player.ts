export default class Player {
  public ctx: CanvasRenderingContext2D;
  public xPosition: number;
  public canvas: HTMLCanvasElement;

  public velocity: number = 5;
  public width: number; //35
  public height: number; //5
  public direction: string;

  constructor(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.width = canvas.width / 8.5;
    this.height = canvas.width / 60;
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
    this.ctx.fillStyle = "#E53935";
    this.ctx.fill();
    this.ctx.strokeStyle = "black";
    this.ctx.stroke();
    this.ctx.closePath();
  }
}

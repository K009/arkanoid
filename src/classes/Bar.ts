export default class Bar {
  public ctx: CanvasRenderingContext2D;
  public canvas: HTMLCanvasElement;
  public xPosition: number;
  public yPosition: number;
  public width: number;
  public height: number;

  constructor(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.xPosition = 0;
    this.yPosition = 0;
    this.width = canvas.width;
    this.height = 20;
  }

  draw(levelIndex: number, score: number) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.font = "30px Arial";
    this.ctx.fillStyle = "white";
    this.ctx.fillText(
      "Level 1-" + levelIndex + " | Score: " + score,
      this.xPosition,
      30
    );
  }
}

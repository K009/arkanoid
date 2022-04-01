export default class Brick {
  public ctx: CanvasRenderingContext2D;
  public canvas: HTMLCanvasElement;
  public width: number;
  public height: number;
  public xPosition: number;
  public yPosition: number;
  public status: number;

  public color: string;

  constructor(
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    status: number,
    xPosition: number,
    yPosition: number,
    color?: string
  ) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.width = canvas.width / 12; //25
    this.height = canvas.width / 60; //5
    this.xPosition = xPosition;
    this.yPosition = yPosition;
    this.status = status;
    this.color = color ? color : this.randColor();
  }

  //idea
  //set colors that we get from level class (predefined for each level)
  drawBrick() {
    this.ctx.beginPath();
    this.ctx.fillStyle = this.color;
    this.ctx.rect(this.xPosition, this.yPosition, this.width, this.height);
    this.ctx.fill();
    this.ctx.stroke();
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

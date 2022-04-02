import Brick from "./Brick";

export default class SuperPowers {
  public ctx: CanvasRenderingContext2D;
  public canvas: HTMLCanvasElement;
  public width: number;
  public height: number;
  public xPosition: number;
  public yPosition: number;
  public status: number;

  public color: string;
  public brick: Brick;
  constructor(
    brick: Brick,
    ctx: CanvasRenderingContext2D
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
  }

  //TODO: add different superPower types (their look and functionality)
  draw() {
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

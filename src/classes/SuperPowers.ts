import Brick from "./Brick.js";

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
  public type: string;
  public allPossibleTypes: string[];
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
    this.xPosition = brick.xPosition + brick.width / 2;
    this.yPosition = brick.yPosition;
    this.status = brick.status;
    this.color = this.randColor();

    this.type = this.randType();
    this.allPossibleTypes = ["widerPlayer", "fasterPlayer", "moreBalls"];
  }

  //TODO: add different superPower types (their look and functionality)
  draw() {
    const classContext = this;
    const rays: number[] = [1, 2, 3];
    const colors: string[] = ["red", "yellow", "black"];
    let ballRadius: number = 0;
    let color: string = "";

    this.allPossibleTypes.forEach(function (type, i) {
      if (type === classContext.type) {
        ballRadius = rays[i];
        color = colors[i];
      }
    });
    this.ctx.beginPath();
    //rect
    this.ctx.fillStyle = color;
    this.ctx.rect(
      this.xPosition,
      this.yPosition,
      this.width / 2,
      this.height / 2
    );
    this.ctx.fill();
    //funny because it changes stroke color of all drawn rects
    //this.ctx.strokeStyle = 'blue';
    this.ctx.stroke();

    // cirlce
    // this.ctx.arc(this.xPosition, this.yPosition, ballRadius, 0, Math.PI * 2);
    // this.ctx.fillStyle = color;
    // this.ctx.fill();

    this.ctx.closePath();
  }

  randType() {
    const superPowersTypes: string[] = [
      "widerPlayer",
      "fasterPlayer",
      "moreBalls",
    ];

    return superPowersTypes[
      Math.floor(Math.random() * superPowersTypes.length)
    ];
  }

  randColor() {
    const colorArray: string[] = [
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

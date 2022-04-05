export default class Player {
  public ctx: CanvasRenderingContext2D;
  public xPosition: number;
  public canvas: HTMLCanvasElement;

  public basicVelocity: number;
  public basicWidth: number;
  
  public velocity: number = 5;
  public width: number; //35
  public height: number; //5
  public color: string;
  public direction: string;

  public normalMode: boolean;
  public startPositionX: number;

  constructor(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.width = canvas.width / 8.5;
    this.basicWidth = this.width;
    this.height = canvas.width / 60;
    this.color = "#E53935";
    this.xPosition = (canvas.width - this.width) / 2;
    this.startPositionX = this.xPosition;
    this.normalMode = true;

    this.basicVelocity = this.velocity;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.rect(
      this.xPosition,
      this.canvas.height - this.height,
      this.width,
      this.height
    );
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
    this.ctx.strokeStyle = "black";
    this.ctx.stroke();
    this.ctx.closePath();
  }

  wideModeOn() {
    const classContext = this;

    this.width = this.width * 1.5;
    setTimeout(function () {
      classContext.width = classContext.basicWidth;
      classContext.normalMode = true;
    }, 3000);
  }

  fastModeOn () {
    const classContext = this;

    this.velocity = this.velocity * 2;
    setTimeout(function () {
      classContext.velocity = classContext.basicVelocity;
      classContext.normalMode = true;
    }, 3000);
  }

  // modeOn(whichMode: number){
  //   const allModes = [this.wideModeOn, this.fastModeOn];//["widerPlayer", "fasterPlayer"];
  //   const words =[this.width, this.velocity];
  //   words.forEach(function(mode, index){
  //     if(whichMode === index) {
  //       // allModes[index]();
  //       // const classContext = [this.velocity, this.basicVelocity];
  //       console.log(index);
  //       console.log(words)
  //       console.log(words[index])
  //       words[index] = words[index] * 2;
  //           // this.velocity = this.velocity * 2;
  //           // setTimeout(function () {
  //           //   classContext.velocity = classContext.basicVelocity;
  //           //   classContext.normalMode = true;
  //           // }, 3000);
  //     }
  //   })
  // }

  drawSuperMode() {
    const xFactor: number = Math.floor(Math.random() * 30);
    const yFactor: number = Math.floor(Math.random() * 10);

    this.ctx.beginPath();
    this.ctx.rect(
      this.xPosition - xFactor,
      this.canvas.height - this.height - yFactor,
      this.width + xFactor * 2,
      this.height + yFactor * 2
    );
    this.ctx.fillStyle = this.randColor();
    this.ctx.fill();
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

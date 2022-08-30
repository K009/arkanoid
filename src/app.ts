import Graphic from "./classes/Graphic.js";
import Supervisor from "./classes/Supervisor.js";

const gameCanvas: HTMLCanvasElement = <HTMLCanvasElement>(
  document.getElementById("myCanvas")
);
const gameCtx: CanvasRenderingContext2D = gameCanvas.getContext("2d");

const barCanvas: HTMLCanvasElement = <HTMLCanvasElement>(
  document.getElementById("bar")
);
const barCtx: CanvasRenderingContext2D = barCanvas.getContext("2d");

//positions' of all game elements are calculated based on below variables
gameCanvas.width = window.innerWidth / 1.5;
gameCanvas.height = gameCanvas.width / 2;

barCanvas.width = window.innerWidth / 1.5;
barCanvas.height = barCanvas.width / 10;

const gameScreen: Graphic = new Graphic();
const barGraphic: Graphic = new Graphic();

gameScreen.setCanvas(gameCanvas);
gameScreen.setCtx(gameCtx);

barGraphic.setCanvas(barCanvas);
barGraphic.setCtx(barCtx);

const superVisor: Supervisor = new Supervisor(gameScreen, barGraphic);

superVisor.startGame();

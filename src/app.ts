import Level from "./classes/Level.js";
import Supervisor from "./classes/Supervisor.js";

const canvas: HTMLCanvasElement = <HTMLCanvasElement>(
  document.getElementById("myCanvas")
);
const ctx: CanvasRenderingContext2D = canvas.getContext("2d");

const barCanvas: HTMLCanvasElement = <HTMLCanvasElement>(
  document.getElementById("bar")
);
const barCtx: CanvasRenderingContext2D = barCanvas.getContext("2d");

//positions' of all game elements are calculated based on below variables
canvas.width = window.innerWidth / 1.5;
canvas.height = canvas.width / 2;

barCanvas.width = window.innerWidth / 1.5;
barCanvas.height = barCanvas.width / 10;

const superVisor: Supervisor = new Supervisor(canvas, ctx, barCanvas, barCtx);
superVisor.startGame();

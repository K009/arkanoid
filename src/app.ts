import Level from "./classes/Level.js";
import Supervisor from "./classes/Supervisor.js";

const canvas: HTMLCanvasElement = <HTMLCanvasElement>(
  document.getElementById("myCanvas")
);
const ctx: CanvasRenderingContext2D = canvas.getContext("2d");

//positions' of all game elements are calculated based on below variables
canvas.width = window.innerWidth / 1.5;
canvas.height = canvas.width / 2;

const superVisor: Supervisor = new Supervisor(canvas, ctx);
superVisor.startGame();

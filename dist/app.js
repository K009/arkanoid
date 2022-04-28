import Supervisor from "./classes/Supervisor.js";
const canvas = (document.getElementById("myCanvas"));
const ctx = canvas.getContext("2d");
const barCanvas = (document.getElementById("bar"));
const barCtx = barCanvas.getContext("2d");
//positions' of all game elements are calculated based on below variables
canvas.width = window.innerWidth / 1.5;
canvas.height = canvas.width / 2;
barCanvas.width = window.innerWidth / 1.5;
barCanvas.height = barCanvas.width / 10;
const superVisor = new Supervisor(canvas, ctx, barCanvas, barCtx);
superVisor.startGame();

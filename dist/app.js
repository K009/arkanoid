import Graphic from "./classes/Graphic.js";
import Supervisor from "./classes/Supervisor.js";
const gameCanvas = (document.getElementById("myCanvas"));
const gameCtx = gameCanvas.getContext("2d");
const barCanvas = (document.getElementById("bar"));
const barCtx = barCanvas.getContext("2d");
//positions' of all game elements are calculated based on below variables
gameCanvas.width = window.innerWidth / 1.5;
gameCanvas.height = gameCanvas.width / 2;
barCanvas.width = window.innerWidth / 1.5;
barCanvas.height = barCanvas.width / 10;
const gameScreen = new Graphic();
const barGraphic = new Graphic();
gameScreen.setCanvas(gameCanvas);
gameScreen.setCtx(gameCtx);
barGraphic.setCanvas(barCanvas);
barGraphic.setCtx(barCtx);
const superVisor = new Supervisor(gameScreen, barGraphic);
superVisor.startGame();

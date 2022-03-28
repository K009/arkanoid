import Level from "./classes/Level.js";

const canvas: HTMLCanvasElement = <HTMLCanvasElement>(
  document.getElementById("myCanvas")
);
const ctx: CanvasRenderingContext2D = canvas.getContext("2d");

let keyLeftPressed: boolean = false;
let keyRightPressed: boolean = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e: KeyboardEvent) {
  if (e.key === "Right" || e.key === "ArrowRight") {
    keyRightPressed = true;
  } else if (e.key === "Left" || e.key === "ArrowLeft") {
    keyLeftPressed = true;
  }
}

function keyUpHandler(e: KeyboardEvent) {
  if (e.key === "Right" || e.key === "ArrowRight") {
    keyRightPressed = false;
  } else if (e.key === "Left" || e.key === "ArrowLeft") {
    keyLeftPressed = false;
  }
}

//positions' of all game elements are calculated based on below variables
canvas.width = window.innerWidth / 1.5;
canvas.height = canvas.width / 2;

const levelOne: Level = new Level(1, ctx);
const { player, ball, bricks, removedBricks, audioPlayer } = levelOne.initialDraw(canvas);
//const audio: AudioController = new AudioController();
//audio.startMusic();
setInterval(() => {
  levelOne.drawScene(
    canvas,
    keyLeftPressed,
    keyRightPressed,
    player,
    ball,
    bricks,
    removedBricks,
    audioPlayer
  );
}, 10);

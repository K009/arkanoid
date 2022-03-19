import Level from "./classes/Level.js";

const canvas: HTMLCanvasElement = <HTMLCanvasElement>(
  document.getElementById("myCanvas")
);
const ctx: CanvasRenderingContext2D = canvas.getContext("2d");

let keyLeftPressed: boolean = false;
let keyRightPressed: boolean = false;

// FFR - for future refactor
window.addEventListener("keydown", (e: KeyboardEvent) => {
  switch (e.key) {
    case "ArrowLeft":
      keyLeftPressed = true;
      break;
    case "ArrowRight":
      keyRightPressed = true;
      break;
  }
});

window.addEventListener("keyup", (e: KeyboardEvent) => {
  switch (e.key) {
    case "ArrowLeft":
      keyLeftPressed = false;
      break;
    case "ArrowRight":
      keyRightPressed = false;
      break;
  }
});

const levelOne: Level = new Level(1, ctx);

//replace any with a type
const objects: any = levelOne.initialDraw(canvas);

setInterval(
  () =>
    levelOne.drawScene(
      canvas,
      keyLeftPressed,
      keyRightPressed,
      objects[0],
      objects[1],
      objects[2],
      objects[3]
    ),
  10
);

import Level from "./classes/Level.js";
const canvas = (document.getElementById("myCanvas"));
const ctx = canvas.getContext("2d");
let keyLeftPressed = false;
let keyRightPressed = false;
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
function keyDownHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        keyRightPressed = true;
    }
    else if (e.key === "Left" || e.key === "ArrowLeft") {
        keyLeftPressed = true;
    }
}
function keyUpHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        keyRightPressed = false;
    }
    else if (e.key === "Left" || e.key === "ArrowLeft") {
        keyLeftPressed = false;
    }
}
//positions' of all game elements are calculated based on below variables
canvas.width = window.innerWidth / 1.5;
canvas.height = canvas.width / 2;
const levelOne = new Level(1, ctx);
const { player, ball, bricks, removedBricks } = levelOne.initialDraw(canvas);
setInterval(() => {
    levelOne.drawScene(canvas, keyLeftPressed, keyRightPressed, player, ball, bricks, removedBricks);
}, 10);

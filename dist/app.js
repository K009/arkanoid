import Level from "./classes/Level.js";
const canvas = (document.getElementById("myCanvas"));
const ctx = canvas.getContext("2d");
let keyLeftPressed = false;
let keyRightPressed = false;
// FFR - for future refactor
window.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "ArrowLeft":
            keyLeftPressed = true;
            break;
        case "ArrowRight":
            keyRightPressed = true;
            break;
    }
});
window.addEventListener("keyup", (e) => {
    switch (e.key) {
        case "ArrowLeft":
            keyLeftPressed = false;
            break;
        case "ArrowRight":
            keyRightPressed = false;
            break;
    }
});
const levelOne = new Level(1, ctx);
//replace any with a type
const objects = levelOne.initialDraw(canvas);
setInterval(() => levelOne.drawScene(canvas, keyLeftPressed, keyRightPressed, objects[0], objects[1], objects[2], objects[3]), 10);

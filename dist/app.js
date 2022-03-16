import Level from "./classes/Level.js";
import collisionDetection from "./modules/physics.js";
let keyLeftPressed = false;
let keyRightPressed = false;
// FFR - for future refactor
window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowLeft':
            keyLeftPressed = true;
            break;
        case "ArrowRight":
            keyRightPressed = true;
            break;
    }
});
window.addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'ArrowLeft':
            keyLeftPressed = false;
            break;
        case "ArrowRight":
            keyRightPressed = false;
            break;
    }
});
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const ballRadius = 10;
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;
const playerWidth = 70;
const playerHeight = 10;
let playerX = (canvas.width - playerWidth) / 2;
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}
const drawPlayer = () => {
    ctx.beginPath();
    ctx.rect(playerX, canvas.height - playerHeight, playerWidth, playerHeight);
    ctx.fillStyle = "pink";
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
};
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    drawBall();
    collisionDetection(bricks, x, y, dy);
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if (y + dy < ballRadius) {
        dy = -dy;
    }
    else if (y + dy > canvas.height - ballRadius) {
        if (x > playerX && x < playerX + playerWidth) {
            if (y = y - playerHeight) {
                dy = -dy;
            }
        }
    }
    if (keyRightPressed) {
        playerX += 5;
        if (playerX + playerWidth > canvas.width) {
            playerX = canvas.width - playerWidth;
        }
    }
    else if (keyLeftPressed) {
        playerX -= 5;
        if (playerX < 0) {
            playerX = 0;
        }
    }
    x += dx;
    y += dy;
}
const levelOne = new Level(1, ctx);
levelOne.drawScene();
setInterval(draw, 10);
//notes for future development
//create game class or sth like that that will handle core logic of the game
//drawing everyting creating objects and calling methods from objects
//create player class with methods to move
//create brick class: if collision happen brick is being removed
//clean the code, refactor all of that and create classes with basic methods
//that will cover created game logic
//create level class that will handle drawing bricks in 
//predefined positions
//brick class really simple, draw it with passed arguments

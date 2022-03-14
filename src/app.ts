import Brick from "./classes/brick.js";

let keyLeftPressed: boolean = false;
let keyRightPressed: boolean = false;


// FFR - for future refactor
window.addEventListener('keydown', (e: KeyboardEvent) => {
        switch (e.key) {
            case 'ArrowLeft':
                keyLeftPressed = true;
                break;
            case "ArrowRight":
                keyRightPressed = true;
                break;            
        }
});

window.addEventListener('keyup', (e: KeyboardEvent) => {
        switch (e.key) {
            case 'ArrowLeft':
                keyLeftPressed = false;                
                break;
            case "ArrowRight":
                keyRightPressed = false;
                break;            
        }
});


const canvas: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById("myCanvas");
const ctx: CanvasRenderingContext2D = canvas.getContext("2d");
const ballRadius: number = 10;
let x: number = canvas.width / 2;
let y: number = canvas.height - 30;
let dx: number = 2;
let dy: number = -2;

const playerWidth: number = 70;
const playerHeight: number = 10
let playerX: number = (canvas.width - playerWidth) / 2;

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
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
}

// const brick = new Brick(ctx);
const allXCoordinates: Array<number> = [];
const allYCoordinates: Array<number> = [];
const bricks: Brick[] = [];
for (let i = 0; i < 30; i++) {
    bricks[i] = new Brick(ctx, allXCoordinates, allYCoordinates);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    drawBall();
    for (let i = 0; i < 30; i++) {
        bricks[i].drawBrick();
    }
    
    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if(y + dy > canvas.height-ballRadius || y + dy < ballRadius) {
        dy = -dy;
    }
    
    if(keyRightPressed) {
        playerX += 5;
        if(playerX + playerWidth > canvas.width) {
            playerX = canvas.width - playerWidth;
        }
    } else if(keyLeftPressed) {
        playerX -= 5;
        if(playerX < 0 ) {
            playerX = 0;
        }        
    }

    x += dx;
    y += dy;
}

setInterval(draw, 10);

//notes for future development
//create game class or sth like that that will handle core logic of the game
//drawing everyting creating objects and calling methods from objects
//create player class with methods to move
//create brick class: if collision happen brick is being removed
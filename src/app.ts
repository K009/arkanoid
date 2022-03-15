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
for (let i = 0; i < 10; i++) {
    const minX: number = 10;
    const maxX: number = 420;
    const minY: number = 10;
    const maxY: number = 150;        
    //x from 10 to 420
    //y from 10 to 150
    const x: number = Math.floor(Math.random() * (maxX - minX + 1) + minX);
    const y: number = Math.floor(Math.random() * (maxY - minY + 1) + minY);
    bricks[i] = new Brick(ctx, x, y, 1);
}

function collisionDetection(bricks: Brick[]) {
        for (var r = 0; r < 10; r++) {
            var b = bricks[r];
            if (b.status == 1) {
                if (x > b.x && x < b.x + b.width && y > b.y && y < b.y + b.height) {
                    dy = -dy;
                    b.status = 0;
                }
            }
        }
    
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    drawBall();
    for (let i = 0; i < 10; i++) {
        bricks[i].drawBrick();
    }
    collisionDetection(bricks);
    
    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if(y + dy < ballRadius) {
        dy = -dy;
    }
    else if (y + dy > canvas.height - ballRadius) {
        if (x > playerX && x < playerX + playerWidth) {
            if (y = y - playerHeight) {
                dy = -dy;
            }
        }
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


//clean the code, refactor all of that and create classes with basic methods
//that will cover created game logic

//create level class that will handle drawing bricks in 
//predefined positions

//brick class really simple, draw it with passed arguments
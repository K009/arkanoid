let playerContainerElement: HTMLElement = document.querySelector(".player");
let moveUnit: number = 100;
let keyLeftPressed: boolean = false;
let keyRightPressed: boolean = false;

window.addEventListener('load', () => {
    //playerContainerElement.style.position = 'absolute';
    playerContainerElement.style.marginLeft = 'auto';
    playerContainerElement.style.marginRight = 'auto';
    playerContainerElement.style.left = '0';
    playerContainerElement.style.right = '0';
    playerContainerElement.style.top = '0';
});


// FFR - for future refactor
window.addEventListener('keydown', (e) => {
    // let width: number = window.innerWidth;
    // let leftOfPlayer: number = parseInt(playerContainerElement.style.left);
    // let playerWidth: number = 150; // value taken from css file 
    // let playerCenter: number = playerWidth / 2 + leftOfPlayer;

    // if (playerCenter > width / 2) {
    //     playerContainerElement.style.left = parseInt(playerContainerElement.style.left) - moveUnit + "px";
    // } else if (playerCenter < -(width / 2)) {
    //     playerContainerElement.style.left = parseInt(playerContainerElement.style.left) + moveUnit + "px";
    // } else {
        switch (e.key) {
            case 'ArrowLeft':
                playerContainerElement.style.left = parseInt(playerContainerElement.style.left) - moveUnit + "px";
                keyLeftPressed = true;
                break;
            case "ArrowRight":
                playerContainerElement.style.left = parseInt(playerContainerElement.style.left) + moveUnit + "px";
                keyRightPressed = true;
                break;            
        }
   // }
});

window.addEventListener('keyup', (e) => {
    // let width: number = window.innerWidth;
    // let leftOfPlayer: number = parseInt(playerContainerElement.style.left);
    // let playerWidth: number = 150; // value taken from css file 
    // let playerCenter: number = playerWidth / 2 + leftOfPlayer;

    // if (playerCenter > width / 2) {
    //     playerContainerElement.style.left = parseInt(playerContainerElement.style.left) - moveUnit + "px";
    // } else if (playerCenter < -(width / 2)) {
    //     playerContainerElement.style.left = parseInt(playerContainerElement.style.left) + moveUnit + "px";
    // } else {
        switch (e.key) {
            case 'ArrowLeft':
                playerContainerElement.style.left = parseInt(playerContainerElement.style.left) - moveUnit + "px";
                keyLeftPressed = false;                
                break;
            case "ArrowRight":
                playerContainerElement.style.left = parseInt(playerContainerElement.style.left) + moveUnit + "px";
                keyRightPressed = false;
                break;            
        }
   // }
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
    ctx.stroke();
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    drawBall();
    
    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
        
    }
    if(y + dy > canvas.height-ballRadius || y + dy < ballRadius) {
        dy = -dy;
    }
    
    if(keyRightPressed) {
        playerX += 5;
        console.log(playerX + playerWidth);
        console.log(canvas.width);
        if(playerX + playerWidth > canvas.width) {
            playerX = canvas.width - playerWidth;
        }
    } else if(keyLeftPressed) {
        playerX -= 5;
        if(playerX <0) {
            playerX = 0;
        }        
    }

    x += dx;
    y += dy;
}

setInterval(draw, 10);



//notes for future development
//create game class or sth like that that will handle core logic of the game - drawing everyting creating objects and calling methods from objects
//create player class with methods to move
//create brick class: if collision happen brick is being removed
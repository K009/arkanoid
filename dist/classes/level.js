import { borderCollisionDetection } from "../modules/physics.js";
import Ball from "./Ball.js";
import Brick from "./Brick.js";
import Player from "./Player.js";
export default class Level {
    constructor(index, ctx) {
        this.index = index;
        this.ctx = ctx;
    }
    // delete below function
    // getCoreVariables() {
    //     const canvas: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById("myCanvas");
    //     const ctx: CanvasRenderingContext2D = canvas.getContext("2d");
    //     const ballRadius: number = 10;
    //     let x: number = canvas.width / 2;
    //     let y: number = canvas.height - 30;
    //     let dx: number = 2;
    //     let dy: number = -2;
    //     const playerWidth: number = 70;
    //     const playerHeight: number = 10
    //     let playerX: number = (canvas.width - playerWidth) / 2;  
    // }
    drawBricks() {
        //bricks
        // const brick = new Brick(ctx);
        const allXCoordinates = [];
        const allYCoordinates = [];
        const bricks = [];
        for (let i = 0; i < 10; i++) {
            const minX = 10;
            const maxX = 420;
            const minY = 10;
            const maxY = 150;
            //x from 10 to 420
            //y from 10 to 150
            const x = Math.floor(Math.random() * (maxX - minX + 1) + minX);
            const y = Math.floor(Math.random() * (maxY - minY + 1) + minY);
            bricks[i] = new Brick(this.ctx, 1);
            bricks[i].drawBrick(x, y);
        }
        return bricks;
        //player
        //ball
        //background color
    }
    drawScene(ctx, canvas) {
        let keyLeftPressed = false;
        let keyRightPressed = false;
        let dx = 2;
        let dy = -2;
        // FFR - for future refactor
        //not working for now 
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
        //always draw the same 
        const player = new Player(ctx, canvas);
        const ball = new Ball(ctx, canvas);
        //const bricks: Brick = new Brick(ctx, 1); // change to an array
        //here create several bricks, best in one line 
        //clearing the scene
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);
        player.draw();
        ball.draw();
        //bricks have to be drawn outside the loop
        //const bricks: Brick[] = this.drawBricks();
        // brickCollisionDetection(
        //      bricks,
        //      ball.xPosition,
        //      ball.yPosition,
        //      dy
        // );
        borderCollisionDetection(canvas, ball.ballRadius, ball.xPosition, ball.yPosition, player.xPosition, player.width, player.height, dx, dy);
        if (keyRightPressed) {
            console.log('asd');
            player.xPosition += 5;
            if (player.xPosition + player.width > canvas.width) {
                player.xPosition = canvas.width - player.width;
            }
        }
        else if (keyLeftPressed) {
            player.xPosition -= 5;
            if (player.xPosition < 0) {
                player.xPosition = 0;
            }
        }
        ball.xPosition += dx;
        ball.yPosition += dy;
    }
}

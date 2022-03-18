import { brickCollisionDetection, borderCollisionDetection } from "../modules/physics.js";
import Ball from "./Ball.js";
import Brick from "./Brick.js";
import Player from "./Player.js";
export default class Level {
    constructor(index, ctx) {
        this.dx = 2; //x vector of ball movement
        this.dy = -2; //y vector of ball movement
        this.index = index;
        this.ctx = ctx;
    }
    //here define objects
    initialDraw(canvas) {
        const player = new Player(this.ctx, canvas);
        const ball = new Ball(this.ctx, canvas);
        const bricks = [];
        //replace it with a predefined position of bricks for each level
        for (let i = 0; i < 10; i++) {
            const minX = 10;
            const maxX = 420;
            const minY = 10;
            const maxY = 150;
            //x from 10 to 420
            //y from 10 to 150
            const x = Math.floor(Math.random() * (maxX - minX + 1) + minX);
            const y = Math.floor(Math.random() * (maxY - minY + 1) + minY);
            bricks[i] = new Brick(this.ctx, 1, x, y);
        }
        //change the way how variables are returned
        return [player, ball, bricks];
    }
    drawScene(canvas, keyLeftPressed, keyRightPressed, player, ball, bricks) {
        //clearing the scene
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);
        player.draw();
        ball.draw();
        bricks.forEach(function (brick) {
            brick.drawBrick();
        });
        this.dy = brickCollisionDetection(bricks, ball.xPosition, ball.yPosition, this.dy);
        const array = borderCollisionDetection(canvas, ball.ballRadius, ball.xPosition, ball.yPosition, player.xPosition, player.width, player.height, this.dx, this.dy);
        this.dx = array[0];
        this.dy = array[1];
        if (keyRightPressed) {
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
        ball.xPosition += this.dx;
        ball.yPosition += this.dy;
    }
}
//To do: code refactor, think about the logic of app and placing important
//variables and attributes that are responsible for movement

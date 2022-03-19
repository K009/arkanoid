import { brickCollisionDetection, borderCollisionDetection, } from "../modules/physics.js";
import { positions } from "../data/bricksPosition.js";
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
        const removedBricks = [];
        const classContext = this;
        if (this.index === 1) {
            positions.levelOne.forEach(function (brick, i) {
                bricks[i] = new Brick(classContext.ctx, 1, brick.x, brick.y);
            });
        }
        return { player, ball, bricks, removedBricks };
    }
    drawScene(canvas, keyLeftPressed, keyRightPressed, player, ball, bricks, removedBricks) {
        //clearing the scene
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);
        player.draw();
        ball.draw();
        // if all bricks's status is 0 then alert the player
        bricks.forEach(function (brick) {
            if (brick.status === 1) {
                brick.drawBrick();
            }
            else {
                //check if the brick is not currently in the array
                //make sure that all elements are unique
                if (removedBricks.indexOf(brick) === -1) {
                    removedBricks.push(brick);
                }
            }
        });
        if (removedBricks.length === bricks.length) {
            alert("Game over!");
            removedBricks = [];
        }
        //update y vector on bricksCollision
        this.dy = brickCollisionDetection(bricks, ball.xPosition, ball.yPosition, this.dy);
        //update x and y vectors on bordersCollision
        [this.dx, this.dy] = borderCollisionDetection(canvas, ball.ballRadius, ball.xPosition, ball.yPosition, player.xPosition, player.width, player.height, this.dx, this.dy);
        //move the player when keys are pressed
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
        //move the ball with the given vectors each 10ms
        ball.xPosition += this.dx;
        ball.yPosition += this.dy;
    }
}

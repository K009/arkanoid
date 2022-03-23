import { brickCollisionDetection, borderCollisionDetection, } from "../modules/physics.js";
import { getPositions } from "../data/bricksPosition.js";
import Ball from "./Ball.js";
import Brick from "./Brick.js";
import Player from "./Player.js";
export default class Level {
    constructor(index, ctx) {
        this.dx = 2; //x vector of ball movement
        this.dy = -2; //y vector of ball movement
        this.isOver = 0; //change it to boolean in the future
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
        const probeBrick = new Brick(this.ctx, canvas, 1, 0, 0);
        let isOver = 0;
        if (this.index === 1) {
            const positions = getPositions(canvas, probeBrick);
            positions.forEach(function (brick, i) {
                bricks[i] = new Brick(classContext.ctx, canvas, 1, brick.x, brick.y);
            });
        }
        return { player, ball, bricks, removedBricks, isOver };
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
        if (removedBricks.length === bricks.length || this.isOver === 1) {
            alert("Game over!");
            removedBricks = [];
            //here code to reset the level or draw some kind of menu
        }
        //update y vector on bricksCollision
        this.dy = brickCollisionDetection(bricks, ball.xPosition, ball.yPosition, this.dy);
        //update x and y vectors on bordersCollision
        [this.dx, this.dy, this.isOver] = borderCollisionDetection(canvas, ball.ballRadius, ball.xPosition, ball.yPosition, player, this.dx, this.dy, this.isOver);
        //move the player when keys are pressed
        if (keyRightPressed) {
            player.xPosition += player.velocity;
            player.direction = "right";
            //after 0.5s when player stopped moving change the direction value
            setTimeout(() => {
                player.direction = "none";
            }, 500);
            if (player.xPosition + player.width > canvas.width) {
                player.xPosition = canvas.width - player.width;
            }
        }
        else if (keyLeftPressed) {
            player.xPosition -= player.velocity;
            player.direction = "left";
            //after 0.5s when player stopped moving change the direction value
            setTimeout(() => {
                player.direction = "none";
            }, 500);
            if (player.xPosition < 0) {
                player.xPosition = 0;
            }
        }
        //move the ball with the given vectors each 10ms
        ball.xPosition += this.dx;
        ball.yPosition += this.dy;
    }
}

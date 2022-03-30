import { brickCollisionDetection, borderCollisionDetection, } from "../modules/physics.js";
import { getPositions } from "../data/bricksPosition.js";
import Ball from "./Ball.js";
import Brick from "./Brick.js";
import Player from "./Player.js";
export default class Level {
    constructor(ctx) {
        this.dx = 2; //x vector of ball movement
        this.dy = -2; //y vector of ball movement
        this.isOver = 0; //change it to boolean in the future
        this.ctx = ctx;
    }
    //here define objects
    initialDraw(canvas, index) {
        const player = new Player(this.ctx, canvas);
        const ball = new Ball(this.ctx, canvas);
        const bricks = [];
        const removedBricks = [];
        const classContext = this;
        const probeBrick = new Brick(this.ctx, canvas, 1, 0, 0);
        if (index === 1) {
            const positions = getPositions(canvas, probeBrick);
            positions.forEach(function (brick, i) {
                bricks[i] = new Brick(classContext.ctx, canvas, 1, brick.x, brick.y);
            });
        }
        if (index === 2) {
            const positions = getPositions(canvas, probeBrick);
            positions.forEach(function (brick, i) {
                bricks[i] = new Brick(classContext.ctx, canvas, 1, brick.x + 10, brick.y + 10);
            });
        }
        return { player, ball, bricks, removedBricks, index };
    }
    resetTheLevel(bricks, ball, player) {
        const removedBricks = []; //empty the array
        //think about deleting this line and replacing it with parameter from function or just return empty array
        this.dx = 2; //to default value, which is 2
        this.dy = -2; //to default value, which is -2
        this.isOver = 0; // 0
        ball.xPosition = ball.startPositionX;
        ball.yPosition = ball.startPositionY;
        player.xPosition = player.startPositionX;
        bricks.forEach(function (brick) {
            brick.status = 1;
        });
        return [bricks, removedBricks, ball, player];
    }
    drawScene(canvas, keyLeftPressed, keyRightPressed, player, ball, bricks, removedBricks, index, superVisor) {
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
        console.log(removedBricks.length);
        console.log(bricks.length);
        //player lost
        if (this.isOver === 1) {
            [bricks, removedBricks, ball, player] = this.resetTheLevel(bricks, ball, player);
            //supervisor.goToNextLevel();
        }
        //player won
        if (removedBricks.length === bricks.length) {
            //add if player wins condition with different bricks, vectors, background
            //move this code to another function - this.goToTheNextLevel()
            removedBricks.length = 0;
            this.dx = 2; //to default value, which is 2
            this.dy = -2; //to default value, which is -2
            this.isOver = 0; // 0
            ball.xPosition = ball.startPositionX;
            ball.yPosition = ball.startPositionY;
            player.xPosition = player.startPositionX;
            player.color = 'yellow';
            //the only problem with changing something is with bricks, because we set their position in initialDraw method
            //i guess we can modify it exactly like the ball position here like:
            bricks.forEach(function (brick) {
                brick.xPosition += 10;
                brick.yPosition += 10;
                brick.status = 1;
            });
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
            }, 1000);
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
            }, 1000);
            if (player.xPosition < 0) {
                player.xPosition = 0;
            }
        }
        //move the ball with the given vectors each 10ms
        ball.xPosition += this.dx;
        ball.yPosition += this.dy;
    }
}

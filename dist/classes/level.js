import { brickCollisionDetection, borderCollisionDetection, } from "../modules/physics.js";
import { getLevelData } from "../data/levelData.js";
import Ball from "./Ball.js";
import Brick from "./Brick.js";
import Player from "./Player.js";
export default class Level {
    constructor(ctx, canvas, index) {
        this.dx = 2; //x vector of ball movement
        this.dy = -2; //y vector of ball movement
        this.isOver = 0; //change it to boolean in the future
        this.ctx = ctx;
        this.canvas = canvas;
        this.index = index;
    }
    //here define objects
    initialDraw() {
        const player = new Player(this.ctx, this.canvas);
        const ball = new Ball(this.ctx, this.canvas);
        const bricks = [];
        const removedBricks = [];
        const classContext = this;
        const probeBrick = new Brick(this.ctx, this.canvas, 1, 0, 0);
        const levelData = getLevelData(this.canvas, probeBrick, this.index);
        //TODO: fix any
        levelData.brickAttribs.forEach(function (brick, i) {
            bricks[i] = new Brick(classContext.ctx, classContext.canvas, 1, brick.x, brick.y, brick.color);
        });
        return { player, ball, bricks, removedBricks };
    }
    resetTheLevel(bricks, removedBricks, ball, player) {
        const levelConfig = getLevelData(this.canvas, new Brick(this.ctx, this.canvas, 1, 0, 0), this.index);
        //Vectors and win condition
        this.dx = levelConfig.dx;
        this.dy = levelConfig.dy;
        this.isOver = 0;
        //Ball & Player positions
        ball.xPosition = ball.startPositionX;
        ball.yPosition = ball.startPositionY;
        player.xPosition = player.startPositionX;
        //Bricks
        removedBricks.length = 0;
        bricks.forEach(function (brick) {
            brick.status = 1;
        });
        return [bricks, removedBricks, ball, player];
    }
    goToNextLevel(bricks, removedBricks, ball, player) {
        const classContext = this;
        let brickAttribs = [];
        const levelConfig = getLevelData(this.canvas, new Brick(this.ctx, this.canvas, 1, 0, 0), this.index + 1);
        //Vectors
        this.dx = levelConfig.dx;
        this.dy = levelConfig.dy;
        //Bricks
        brickAttribs = levelConfig.brickAttribs;
        removedBricks.length = 0;
        bricks.length = 0;
        //TODO: fix any
        brickAttribs.forEach(function (brick, i) {
            bricks[i] = new Brick(classContext.ctx, classContext.canvas, 1, brick.x, brick.y, brick.color);
        });
        return [bricks, removedBricks, ball, player];
    }
    drawScene(canvas, keyLeftPressed, keyRightPressed, player, ball, bricks, removedBricks, superVisor) {
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
        //player lost
        if (this.isOver === 1) {
            [bricks, removedBricks, ball, player] = this.resetTheLevel(bricks, removedBricks, ball, player);
        }
        //player won
        if (removedBricks.length === bricks.length) {
            //add if player wins condition with different bricks, vectors, background
            [bricks, removedBricks, ball, player] = this.goToNextLevel(bricks, removedBricks, ball, player);
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

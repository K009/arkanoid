import { brickCollisionDetection, borderCollisionDetection, superPowerDetection, } from "../modules/physics.js";
import { getLevelData } from "../data/levelData.js";
import Ball from "./Ball.js";
import Brick from "./Brick.js";
import Player from "./Player.js";
import Bar from "./Bar.js";
export default class Level {
    constructor(ctx, canvas, barCanvas, barCtx, index) {
        this.isOver = 0; //change it to boolean in the future
        this.ctx = ctx;
        this.canvas = canvas;
        this.barCanvas = barCanvas;
        this.barCtx = barCtx;
        this.index = index;
        this.score = 0;
        this.lives = 3;
    }
    //here define objects
    initialDraw() {
        const player = new Player(this.ctx, this.canvas);
        const balls = [];
        const removedBalls = [];
        balls[0] = new Ball(this.ctx, this.canvas);
        const bricks = [];
        const removedBricks = [];
        const classContext = this;
        const probeBrick = new Brick(this.ctx, this.canvas, 1, 0, 0);
        const superPowers = [];
        const bar = new Bar(this.barCtx, this.barCanvas);
        const levelData = getLevelData(this.canvas, probeBrick, this.index);
        balls[0].dx = levelData.dx;
        balls[0].dy = levelData.dy;
        player.color = levelData.playerColor;
        //TODO: fix any
        levelData.brickAttribs.forEach(function (brick, i) {
            bricks[i] = new Brick(classContext.ctx, classContext.canvas, 1, brick.x, brick.y, brick.color, brick.isBoss);
        });
        return {
            player,
            balls,
            bricks,
            removedBricks,
            superPowers,
            removedBalls,
            bar
        };
    }
    //TODO: add reseting superPowers here and refactor this function, move common part to another function
    resetTheLevel(bricks, removedBricks, balls, player, removedBalls) {
        const classContext = this;
        if (this.lives === 1) {
            const levelConfig = getLevelData(this.canvas, new Brick(this.ctx, this.canvas, 1, 0, 0), 1);
            //Balls and bricks reset and initializing new ball
            balls.length = 0;
            removedBalls.length = 0;
            bricks.length = 0;
            balls[0] = new Ball(this.ctx, this.canvas);
            balls[0].dx = levelConfig.dx;
            balls[0].dy = levelConfig.dy;
            //Player position and color
            player.xPosition = player.startPositionX;
            player.color = player.randColor();
            //Bricks
            removedBricks.length = 0;
            //Score reset
            this.score = 0;
            //like that we're creating totally new objects of Bricks (so different color for example)
            levelConfig.brickAttribs.forEach(function (brick, i) {
                bricks[i] = new Brick(classContext.ctx, classContext.canvas, 1, brick.x, brick.y, brick.color, brick.isBoss);
            });
            this.lives = 3;
            this.index = 1;
        }
        else {
            const levelConfig = getLevelData(this.canvas, new Brick(this.ctx, this.canvas, 1, 0, 0), this.index);
            //Balls reseet and initializing new ball
            balls.length = 0;
            removedBalls.length = 0;
            balls[0] = new Ball(this.ctx, this.canvas);
            balls[0].dx = levelConfig.dx;
            balls[0].dy = levelConfig.dy;
            //Player positions
            player.xPosition = player.startPositionX;
            this.lives = this.lives - 1;
        }
        return [bricks, removedBricks, balls, player, removedBalls];
    }
    //TODO: add reseting superPowers here
    goToNextLevel(bricks, removedBricks, balls, player, removedBalls) {
        const classContext = this;
        let brickAttribs = [];
        const levelConfig = getLevelData(this.canvas, new Brick(this.ctx, this.canvas, 1, 0, 0), this.index + 1);
        //Balls reseet and initializing new ball
        balls.length = 0;
        removedBalls.length = 0;
        balls[0] = new Ball(this.ctx, this.canvas);
        balls[0].dx = levelConfig.dx;
        balls[0].dy = levelConfig.dy;
        // //Player positions
        // player.xPosition = player.startPositionX;
        //Bricks
        brickAttribs = levelConfig.brickAttribs;
        removedBricks.length = 0;
        bricks.length = 0;
        //Player
        player.color = levelConfig.playerColor;
        //player.xPosition = player.startPositionX;
        //Score reset
        this.score = 0;
        //TODO: fix any
        brickAttribs.forEach(function (brick, i) {
            bricks[i] = new Brick(classContext.ctx, classContext.canvas, 1, brick.x, brick.y, brick.color);
        });
        this.index += 1;
        return [bricks, removedBricks, balls, player, removedBalls];
    }
    drawScene(canvas, keyLeftPressed, keyRightPressed, player, balls, bricks, removedBricks, superVisor, superPowers, removedBalls, bar) {
        const classContext = this;
        //clearing the scene
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);
        bar.draw(this.index, this.score, this.lives);
        player.draw();
        balls.forEach(function (ball) {
            ball.draw();
        });
        superPowers.forEach(function (superPower) {
            if (superPower.status === 1) {
                superPower.draw();
                superPower.yPosition += 2;
            }
        });
        // if all bricks's status is 0 then alert the player
        bricks.forEach(function (brick) {
            if (brick.status === 1) {
                brick.drawBrick(removedBricks.length, bricks.length);
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
        // console.log("LEGHIT: " + balls.length);
        // console.log("NONLEGIT: " + removedBalls.length);
        if (removedBalls.length === balls.length) {
            [bricks, removedBricks, balls, player, removedBalls] = this.resetTheLevel(bricks, removedBricks, balls, player, removedBalls);
            // player.drawSuperMode();
        }
        // console.log("REMOVED: " + removedBricks.length);
        // console.log("ACTIVE: " + bricks.length);
        //player won
        if (removedBricks.length === bricks.length) {
            //add if player wins condition with different bricks, vectors, background
            [bricks, removedBricks, balls, player, removedBalls] = this.goToNextLevel(bricks, removedBricks, balls, player, removedBalls);
        }
        //update y vector on bricksCollision
        balls.forEach(function (ball) {
            [classContext.dx, classContext.dy, superPowers, ball, classContext.score] =
                brickCollisionDetection(bricks, ball.xPosition, ball.yPosition, classContext.dx, classContext.dy, classContext.ctx, superPowers, ball, classContext.score);
            [
                classContext.dx,
                classContext.dy,
                classContext.isOver,
                superPowers,
                ball,
            ] = borderCollisionDetection(canvas, ball.ballRadius, ball.xPosition, ball.yPosition, player, classContext.dx, classContext.dy, classContext.isOver, superPowers, ball);
        });
        superPowerDetection(player, balls, superPowers, canvas, this.ctx);
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
        balls.forEach(function (ball) {
            if (ball.status === 1) {
                ball.xPosition += ball.dx;
                ball.yPosition += ball.dy;
            }
            else {
                if (removedBalls.indexOf(ball) === -1) {
                    removedBalls.push(ball);
                }
            }
        });
    }
}

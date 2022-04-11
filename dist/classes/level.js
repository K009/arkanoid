import { brickCollisionDetection, borderCollisionDetection, superPowerDetection, } from "../modules/physics.js";
import { getLevelData } from "../data/levelData.js";
import Ball from "./Ball.js";
import Brick from "./Brick.js";
import Player from "./Player.js";
export default class Level {
    constructor(ctx, canvas, index) {
        this.isOver = 0; //change it to boolean in the future
        this.ctx = ctx;
        this.canvas = canvas;
        this.index = index;
    }
    //here define objects
    initialDraw() {
        const player = new Player(this.ctx, this.canvas);
        const balls = [];
        balls[0] = new Ball(this.ctx, this.canvas);
        // const ball: Ball = new Ball(this.ctx, this.canvas);
        const bricks = [];
        const removedBricks = [];
        const classContext = this;
        const probeBrick = new Brick(this.ctx, this.canvas, 1, 0, 0);
        const superPowers = [];
        const levelData = getLevelData(this.canvas, probeBrick, this.index);
        balls[0].dx = levelData.dx;
        balls[0].dy = levelData.dy;
        player.color = levelData.playerColor;
        //TODO: fix any
        levelData.brickAttribs.forEach(function (brick, i) {
            bricks[i] = new Brick(classContext.ctx, classContext.canvas, 1, brick.x, brick.y, brick.color, brick.isBoss);
        });
        return { player, balls, bricks, removedBricks, superPowers };
    }
    //TODO: add reseting superPowers here
    resetTheLevel(bricks, removedBricks, balls, player) {
        const levelConfig = getLevelData(this.canvas, new Brick(this.ctx, this.canvas, 1, 0, 0), this.index);
        const classContext = this;
        //Vectors and win condition
        this.dx = levelConfig.dx;
        this.dy = levelConfig.dy;
        this.isOver = 0;
        //Ball & Player positions
        balls.length = 0;
        balls[0] = new Ball(this.ctx, this.canvas);
        // ball.xPosition = ball.startPositionX;
        // ball.yPosition = ball.startPositionY;
        player.xPosition = player.startPositionX;
        //Bricks
        removedBricks.length = 0;
        //like that we're creating totally new objects of Bricks (so different color for example)
        levelConfig.brickAttribs.forEach(function (brick, i) {
            bricks[i] = new Brick(classContext.ctx, classContext.canvas, 1, brick.x, brick.y, brick.color, brick.isBoss);
        });
        //like that we're just reseting their states, so the position will remain the same as when they were destroyed
        // bricks.forEach(function (brick) {
        //   brick.status = 1;
        // });
        return [bricks, removedBricks, balls, player];
    }
    //TODO: add reseting superPowers here
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
        //Player
        player.color = levelConfig.playerColor;
        //TODO: fix any
        brickAttribs.forEach(function (brick, i) {
            bricks[i] = new Brick(classContext.ctx, classContext.canvas, 1, brick.x, brick.y, brick.color);
        });
        return [bricks, removedBricks, ball, player];
    }
    drawScene(canvas, keyLeftPressed, keyRightPressed, player, balls, bricks, removedBricks, superVisor, superPowers) {
        //clearing the scene
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);
        player.draw();
        balls.forEach(function (ball) {
            ball.draw();
        });
        //ball.draw();
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
        if (this.isOver === 1) {
            [bricks, removedBricks, balls, player] = this.resetTheLevel(bricks, removedBricks, balls, player);
            // player.drawSuperMode();
        }
        //player won
        // if (removedBricks.length === bricks.length) {
        //   //add if player wins condition with different bricks, vectors, background
        //   [bricks, removedBricks, ball, player] = this.goToNextLevel(
        //     bricks,
        //     removedBricks,
        //     ball,
        //     player
        //   );
        // }
        const classContext = this;
        //update y vector on bricksCollision
        balls.forEach(function (ball) {
            [classContext.dx, classContext.dy, superPowers, ball] = brickCollisionDetection(bricks, ball.xPosition, ball.yPosition, classContext.dx, classContext.dy, classContext.ctx, superPowers, ball);
            [classContext.dx, classContext.dy, classContext.isOver, superPowers, ball] = borderCollisionDetection(canvas, ball.ballRadius, ball.xPosition, ball.yPosition, player, classContext.dx, classContext.dy, classContext.isOver, superPowers, ball);
        });
        // [this.dx, this.dy, superPowers] = brickCollisionDetection(
        //   bricks,
        //   ball.xPosition,
        //   ball.yPosition,
        //   this.dx,
        //   this.dy,
        //   this.ctx,
        //   superPowers
        // );
        //update x and y vectors on bordersCollision
        // [this.dx, this.dy, this.isOver, superPowers] = borderCollisionDetection(
        //   canvas,
        //   ball.ballRadius,
        //   ball.xPosition,
        //   ball.yPosition,
        //   player,
        //   this.dx,
        //   this.dy,
        //   this.isOver,
        //   superPowers
        // );
        // superPowerDetection(player, ball, superPowers, canvas);
        balls = superPowerDetection(player, balls, superPowers, canvas, this.ctx);
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
            ball.xPosition += ball.dx;
            ball.yPosition += ball.dy;
        });
        // ball.xPosition += this.dx;
        // ball.yPosition += this.dy;
    }
}

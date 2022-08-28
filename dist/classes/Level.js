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
        const classContext = this;
        const player = new Player(this.ctx, this.canvas);
        const balls = [];
        const removedBalls = [];
        balls[0] = new Ball(this.ctx, this.canvas);
        const bricks = [];
        const removedBricks = [];
        const probeBrick = new Brick(this.ctx, this.canvas, 1, 0, 0);
        const bar = new Bar(this.barCtx, this.barCanvas);
        const superPowers = [];
        const levelData = getLevelData(this.canvas, probeBrick, this.index);
        balls[0].dx = levelData.dx;
        balls[0].dy = levelData.dy;
        player.color = levelData.playerColor;
        levelData.brickAttribs.forEach(function (brick, i) {
            bricks[i] = new Brick(classContext.ctx, classContext.canvas, 1, brick.x, brick.y, brick.color, brick.isBoss);
        });
        let levelElements = {
            player,
            balls,
            bricks,
            removedBricks,
            superPowers,
            removedBalls,
            bar
        };
        return levelElements;
    }
    resetCommonPart(balls, player, removedBalls, levelIndex) {
        const levelConfig = getLevelData(this.canvas, new Brick(this.ctx, this.canvas, 1, 0, 0), levelIndex);
        //Balls reset and initializing new ball
        balls.length = 0;
        removedBalls.length = 0;
        balls[0] = new Ball(this.ctx, this.canvas);
        balls[0].dx = levelConfig.dx;
        balls[0].dy = levelConfig.dy;
        //Player positions
        player.xPosition = player.startPositionX;
        return [levelConfig, balls, player, removedBalls];
    }
    //TODO: add reseting superPowers here
    resetTheLevel(levelElements) {
        const classContext = this;
        let levelConfig;
        let { player, balls, removedBalls, bricks, removedBricks } = levelElements;
        if (this.lives === 1) {
            [levelConfig, balls, player, removedBalls] = this.resetCommonPart(balls, player, removedBalls, 1);
            //Bricks and score reset
            bricks.length = 0;
            removedBricks.length = 0;
            this.score = 0;
            //Player color
            player.color = player.randColor();
            //like that we're creating totally new objects of Bricks (so different color for example)
            levelConfig.brickAttribs.forEach(function (brick, i) {
                bricks[i] = new Brick(classContext.ctx, classContext.canvas, 1, brick.x, brick.y, brick.color, brick.isBoss);
            });
            this.lives = 3;
            this.index = 1;
        }
        else {
            [levelConfig, balls, player, removedBalls] = this.resetCommonPart(balls, player, removedBalls, this.index);
            this.lives = this.lives - 1;
        }
        return levelElements;
    }
    //TODO: add reseting superPowers here
    goToNextLevel(levelElements) {
        const classContext = this;
        let levelConfig;
        let { player, balls, removedBalls, bricks, removedBricks } = levelElements;
        [levelConfig, balls, player, removedBalls] = this.resetCommonPart(balls, player, removedBalls, this.index + 1);
        //Bricks
        removedBricks.length = 0;
        bricks.length = 0;
        //Player
        player.color = levelConfig.playerColor;
        //TODO: fix any
        levelConfig.brickAttribs.forEach(function (brick, i) {
            bricks[i] = new Brick(classContext.ctx, classContext.canvas, 1, brick.x, brick.y, brick.color);
        });
        this.index += 1;
        return levelElements;
    }
    drawScene(levelElements, levelController) {
        const classContext = this;
        let { player, balls, removedBalls, bricks, removedBricks, superPowers, bar, } = levelElements;
        let { canvas, keyLeftPressed, keyRightPressed } = levelController;
        let dx = this.dx;
        let dy = this.dy;
        let score = this.score;
        let ctx = this.ctx;
        let allLevelElements = Object.assign(Object.assign(Object.assign({}, levelElements), levelController), { dx,
            dy,
            score,
            ctx });
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
        if (removedBalls.length === balls.length) {
            levelElements = this.resetTheLevel(levelElements);
            // player.drawSuperMode();
        }
        //player won
        if (removedBricks.length === bricks.length) {
            if (this.index === 5) {
                bar.draw(6, this.score, this.lives);
            }
            //add if player wins condition with different bricks, vectors, background
            levelElements = this.goToNextLevel(levelElements);
        }
        //update y vector on bricksCollision
        balls.forEach(function (ball) {
            allLevelElements["ball"] = ball;
            allLevelElements = brickCollisionDetection(allLevelElements);
            allLevelElements = borderCollisionDetection(allLevelElements);
            classContext.score = allLevelElements.score;
        });
        superPowerDetection(allLevelElements);
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

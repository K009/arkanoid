import Ball from "../classes/Ball.js";
import SuperPowers from "../classes/SuperPowers.js";
//RESTORE SOUNDS!!! BUT REMOVE THEM FROM SITE AFTER BEING PLAYED (NOW ITS LAGGING IF THERE ARE TOO MANY OF THEM)
export function brickCollisionDetection(allLevelElements) {
    let { bricks, superPowers, ball, ctx, score } = allLevelElements;
    for (let r = 0; r < bricks.length; r++) {
        const brick = bricks[r];
        if (brick.status == 1) {
            // up&&down collision
            if (ball.xPosition > brick.xPosition &&
                ball.xPosition < brick.xPosition + brick.width &&
                ball.yPosition > brick.yPosition &&
                ball.yPosition < brick.yPosition + brick.height) {
                // const play: AudioController = new AudioController();
                const randomFactor = Math.floor(Math.random() * 10);
                // play.bounce();
                if (randomFactor % 2 === 0)
                    superPowers.push(new SuperPowers(brick, ctx));
                let randomValue = Math.random() * 0.25 - 0.25;
                if (ball.dx > 3.1)
                    randomValue = -Math.abs(randomValue);
                else
                    randomValue = Math.abs(randomValue);
                ball.dy = -ball.dy;
                ball.dx = ball.dx + randomValue;
                brick.status = 0;
                score += Math.floor(Math.random() * 10);
            }
            // left&&right collision
            else if (ball.xPosition > brick.xPosition - 3 &&
                ball.xPosition < brick.xPosition + brick.width + 3 &&
                ball.yPosition > brick.yPosition &&
                ball.yPosition < brick.yPosition + brick.height) {
                // const play: AudioController = new AudioController();
                const randomFactor = Math.floor(Math.random() * 10);
                // play.bounce();
                if (randomFactor % 2 === 0)
                    superPowers.push(new SuperPowers(brick, ctx));
                ball.dy = ball.dy;
                ball.dx = -ball.dx;
                brick.status = 0;
                score += Math.floor(Math.random() * 10);
            }
        }
    }
    allLevelElements["score"] = score;
    return allLevelElements;
}
export function borderCollisionDetection(allLevelElements) {
    let { bricks, superPowers, ball, gameScreen, removedBricks, player } = allLevelElements;
    let canvas = gameScreen.getCanvas();
    if (ball.xPosition + ball.dx > canvas.width - ball.ballRadius ||
        ball.xPosition + ball.dx < ball.ballRadius) {
        ball.dx = -ball.dx;
        //to make it harder we can put * 1.05
    }
    if (ball.yPosition + ball.dy < ball.ballRadius) {
        ball.dy = -ball.dy;
    }
    else if (ball.yPosition + ball.dy > canvas.height - player.height - 2) { //ballRadius * 3
        if (ball.xPosition > player.xPosition - 2 && ball.xPosition < player.xPosition + player.width + 2) { //little margin
            // if ((ballY = ballY - player.height)) {
            // const play: AudioController = new AudioController();
            // AUTO_AIM MODE
            if (removedBricks.length > (bricks.length - 0.15 * bricks.length)) { //replace with 0.15
                const validBrick = bricks.filter((brick) => brick.status === 1)[0];
                let xVectorValue = (((validBrick.xPosition + validBrick.width / 2) - ball.xPosition) / 100), yVectorValue = (validBrick.yPosition - ball.yPosition) / 100;
                if ((xVectorValue < 4 && xVectorValue > -4) && (yVectorValue < 3.5 && yVectorValue > -3.5)) {
                    ball.dx = xVectorValue;
                    ball.dy = yVectorValue;
                }
                else {
                    ball.dx = xVectorValue / 1.75;
                    ball.dy = yVectorValue / 1.75;
                }
            }
            else {
                ball.dy = -ball.dy;
                // play.bounce();
                //reverse ball x vector if player is moving in the opposite way than the ball
                if ((player.direction === "left" && ball.dx > 0) ||
                    (player.direction === "right" && ball.dx < 0)) {
                    ball.dx = -Math.sign(ball.dx) * 2;
                }
            }
        }
        else if (ball.yPosition > canvas.height + ball.ballRadius + 2) {
            ball.status = 0;
            //isOver = 1;
        }
    }
    //fix regarding ball getting into the player
    if (ball.xPosition > player.xPosition - 3 &&
        ball.xPosition < player.xPosition + player.width + 3 &&
        ball.yPosition > canvas.height - player.height &&
        ball.yPosition < canvas.height) {
        ball.dy = -ball.dy;
        ball.dx = -ball.dx;
    }
    //stop drawing superPowers if they touch the ground
    superPowers.forEach(function (superPower) {
        if (superPower.yPosition > canvas.height + superPower.height + 2) {
            superPower.status = 0;
        }
    });
    return allLevelElements;
}
export function superPowerDetection(allLevelElements) {
    let { balls, superPowers, gameScreen, player, ctx } = allLevelElements;
    let canvas = gameScreen.getCanvas();
    superPowers.forEach(function (superPower) {
        if (superPower.status === 1) {
            if ((superPower.xPosition > player.xPosition &&
                superPower.xPosition < player.xPosition + player.width) ||
                (superPower.xPosition + superPower.width > player.xPosition &&
                    superPower.xPosition + superPower.width <
                        player.xPosition + player.width)) {
                if (superPower.yPosition == canvas.height - player.height &&
                    superPower.yPosition < canvas.height) {
                    console.log("Collision!");
                    // const playerModes = [player.wideModeOn, player.fastModeOn];
                    // superPower.allPossibleTypes.forEach(function (type, i) {
                    //    if (superPower.allPossibleTypes.indexOf(superPower.type) === i) {
                    //      //console.log(i)
                    //     player.modeOn(i);
                    //    }
                    //   //   console.log("PLAYER MODE:");
                    //   //   console.log(player.normalMode);
                    //   //   if (player.normalMode) {
                    //   //     console.log(playerModes[i]);
                    //   //     player.normalMode = false;
                    //   //     playerModes[i]();
                    //   //     player.modeOn(i);
                    //   //   }
                    //   // }
                    //   // if (superPower.type === type) {
                    //   //     playerModes[0]();
                    //   // }
                    // });
                    //IDEA: make an array of all superPower types here and iterate through that
                    //above code is a sketch
                    if (superPower.type === "widerPlayer") {
                        if (player.normalMode) {
                            player.normalMode = false;
                            player.wideModeOn();
                        }
                    }
                    else if (superPower.type === "fasterPlayer") {
                        if (player.normalMode) {
                            player.normalMode = false;
                            player.fastModeOn();
                        }
                    }
                    else if (superPower.type === "moreBalls") {
                        let newBall = new Ball(ctx, canvas);
                        balls.forEach(function (ball) {
                            if (ball.status === 1) {
                                newBall.dx = ball.dx;
                                newBall.dy = ball.dy;
                                newBall.xPosition = ball.xPosition + 10;
                                newBall.yPosition = ball.yPosition + 10;
                            }
                        });
                        balls.push(newBall);
                    }
                }
            }
        }
    });
    return allLevelElements;
}

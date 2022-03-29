import AudioController from "../classes/AudioController.js";
export function brickCollisionDetection(bricks, ballX, ballY, dy) {
    for (let r = 0; r < bricks.length; r++) {
        const brick = bricks[r];
        if (brick.status == 1) {
            if (ballX + 2 > brick.xPosition &&
                ballX + 2 < brick.xPosition + brick.width &&
                ballY + 2 > brick.yPosition &&
                ballY + 2 < brick.yPosition + brick.height) {
                const play = new AudioController();
                play.bounce();
                dy = -dy;
                brick.status = 0;
            }
        }
    }
    return dy;
}
export function borderCollisionDetection(canvas, ballRadius, ballX, ballY, player, dx, dy, isOver) {
    if (ballX + dx > canvas.width - ballRadius || ballX + dx < ballRadius) {
        dx = -1.05 * dx;
    }
    if (ballY + dy < ballRadius) {
        dy = -dy;
    }
    else if (ballY + dy > canvas.height - ballRadius) {
        if (ballX > player.xPosition && ballX < player.xPosition + player.width) {
            if ((ballY = ballY - player.height)) {
                const play = new AudioController();
                dy = -dy;
                play.bounce();
                //reverse ball x vector if player is moving in the opposite way than the ball
                if ((player.direction === "left" && dx > 0) ||
                    (player.direction === "right" && dx < 0)) {
                    dx = -Math.sign(dx) * 2;
                }
            }
        }
        else if (ballY > canvas.height + ballRadius + 2) {
            isOver = 1;
        }
    }
    return [dx, dy, isOver];
}

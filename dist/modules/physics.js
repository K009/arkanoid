export function brickCollisionDetection(bricks, ballX, ballY, dy) {
    for (let r = 0; r < bricks.length; r++) {
        const brick = bricks[r];
        if (brick.status == 1) {
            if (ballX + 2 > brick.xPosition &&
                ballX + 2 < brick.xPosition + brick.width &&
                ballY + 2 > brick.yPosition &&
                ballY + 2 < brick.yPosition + brick.height) {
                dy = -dy;
                brick.status = 0;
            }
        }
    }
    return dy;
}
export function borderCollisionDetection(canvas, ballRadius, ballX, ballY, playerX, playerWidth, playerHeight, dx, dy) {
    if (ballX + dx > canvas.width - ballRadius || ballX + dx < ballRadius) {
        dx = -dx;
    }
    if (ballY + dy < ballRadius) {
        dy = -dy;
    }
    else if (ballY + dy > canvas.height - ballRadius) {
        if (ballX > playerX && ballX < playerX + playerWidth) {
            if ((ballY = ballY - playerHeight)) {
                dy = -dy;
            }
        }
    }
    return [dx, dy];
}

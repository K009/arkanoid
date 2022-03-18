export function brickCollisionDetection(bricks, x, y, dy) {
    for (let r = 0; r < 10; r++) {
        const b = bricks[r];
        if (b.status == 1) {
            if (x > b.xPosition &&
                x < b.xPosition + b.width &&
                y > b.yPosition &&
                y < b.yPosition + b.height) {
                dy = -dy;
                b.status = 0;
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
    //change the way how variables are returned
    return [dx, dy];
}

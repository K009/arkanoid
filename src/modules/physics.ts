import Brick from "../classes/Brick";

export default function collisionDetection(bricks: Brick[], x, y, dy) {
    for (var r = 0; r < 10; r++) {
        var b = bricks[r];
        if (b.status == 1) {
            if (x > b.xPosition && x < b.xPosition + b.width && y > b.yPosition && y < b.yPosition + b.height) {
                dy = -dy;
                b.status = 0;
            }
        }
    }

}
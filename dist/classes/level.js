import Brick from "./Brick";
export default class Level {
    constructor(index, ctx) {
        this.index = index;
        this.ctx = ctx;
    }
    getCoreVariables() {
        const canvas = document.getElementById("myCanvas");
        const ctx = canvas.getContext("2d");
        const ballRadius = 10;
        let x = canvas.width / 2;
        let y = canvas.height - 30;
        let dx = 2;
        let dy = -2;
        const playerWidth = 70;
        const playerHeight = 10;
        let playerX = (canvas.width - playerWidth) / 2;
    }
    drawBricks() {
        //bricks
        // const brick = new Brick(ctx);
        const allXCoordinates = [];
        const allYCoordinates = [];
        const bricks = [];
        for (let i = 0; i < 10; i++) {
            const minX = 10;
            const maxX = 420;
            const minY = 10;
            const maxY = 150;
            //x from 10 to 420
            //y from 10 to 150
            const x = Math.floor(Math.random() * (maxX - minX + 1) + minX);
            const y = Math.floor(Math.random() * (maxY - minY + 1) + minY);
            bricks[i] = new Brick(this.ctx, 1);
            bricks[i].drawBrick(x, y);
            return bricks;
        }
        //player
        //ball
        //background color
    }
}

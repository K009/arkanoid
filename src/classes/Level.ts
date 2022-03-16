import collisionDetection from "../modules/physics";
import Brick from "./Brick";

export default class Level {
    //which level should be rendered
    public index: number;
    public ctx: CanvasRenderingContext2D;

    protected color: string;

    constructor(index: number, ctx: CanvasRenderingContext2D) {
        this.index = index;
        this.ctx = ctx;      
    }

    getCoreVariables() {
        const canvas: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById("myCanvas");
        const ctx: CanvasRenderingContext2D = canvas.getContext("2d");
        const ballRadius: number = 10;
        let x: number = canvas.width / 2;
        let y: number = canvas.height - 30;
        let dx: number = 2;
        let dy: number = -2;

        const playerWidth: number = 70;
        const playerHeight: number = 10
        let playerX: number = (canvas.width - playerWidth) / 2;  
    }

    drawBricks() {
        //bricks
        // const brick = new Brick(ctx);
        const allXCoordinates: Array<number> = [];
        const allYCoordinates: Array<number> = [];
        const bricks: Brick[] = [];
        for (let i = 0; i < 10; i++) {
            const minX: number = 10;
            const maxX: number = 420;
            const minY: number = 10;
            const maxY: number = 150;        
            //x from 10 to 420
            //y from 10 to 150
            const x: number = Math.floor(Math.random() * (maxX - minX + 1) + minX);
            const y: number = Math.floor(Math.random() * (maxY - minY + 1) + minY);
            bricks[i] = new Brick(this.ctx, 1);
            bricks[i].drawBrick(x,y);

            return bricks;
        }
        //player
        //ball
        //background color



    }
}

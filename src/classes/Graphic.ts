export default class Graphic {
    public ctx: CanvasRenderingContext2D;
    public canvas: HTMLCanvasElement;
    public barCtx: CanvasRenderingContext2D;
    public barCanvas: HTMLCanvasElement;
  
    constructor() {

    }
  
    setCanvas(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
    }

    setCtx(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
    }

    getCanvas() {
        return this.canvas;
    }

    getCtx() {
        return this.ctx;
    }
}
export default class Canvas {
    constructor() {
    }
    setCanvas(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
    }
    getCanvas() {
        return this.canvas;
    }
    getCtx() {
        return this.ctx;
    }
}

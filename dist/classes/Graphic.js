export default class Graphic {
    constructor() {
    }
    setCanvas(canvas) {
        this.canvas = canvas;
    }
    setCtx(ctx) {
        this.ctx = ctx;
    }
    getCanvas() {
        return this.canvas;
    }
    getCtx() {
        return this.ctx;
    }
}

export default class AudioController {
    constructor() {
        this.bounceSound = new Audio('');
    }
    bounce() {
        this.bounceSound.play();
    }
}

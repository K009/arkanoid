export default class AudioController {
    bounceSound: HTMLAudioElement;
    constructor() {
        this.bounceSound = new Audio('');
    }
    bounce() {
        this.bounceSound.play();
    }
  }

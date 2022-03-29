export default class AudioController {
  bounceSound: HTMLAudioElement;
  constructor() {
    this.bounceSound = new Audio(
      "https://github.com/K009/arkanoid/raw/master/src/audio/bounce.mp3"
    );
  }
  bounce() {
    this.bounceSound.play();
  }
}

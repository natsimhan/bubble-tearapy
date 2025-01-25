import {Scene} from 'phaser';

const TIME_INTRO_DURATION: number = 120000;

export default class Intro extends Scene {

  constructor() {
    super('Intro');
  }

  create(): void {
    const width = this.scale.width;
    const height = this.scale.height;
    const textIntro = this.add.text(width / 2, height / 2, 'Intro',
        {
          fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
          stroke: '#000000', strokeThickness: 8,
          align: 'center'
        });
    this.add.existing(textIntro);
    this.time.delayedCall(TIME_INTRO_DURATION, this.changeScene, [], this);
    this.input.keyboard?.on('keyup', this.changeScene, this);
    this.input.on('pointerup', this.changeScene, this);
  }

  changeScene(): void {
    this.scene.start('MainMenu');
  }
}
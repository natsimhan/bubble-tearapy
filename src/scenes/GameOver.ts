import {Scene} from 'phaser';

export class GameOver extends Scene {
  camera: Phaser.Cameras.Scene2D.Camera;
  background: Phaser.GameObjects.Image;
  gameover_text: Phaser.GameObjects.Text;
  public timer!: number;

  constructor() {
    super('GameOver');
  }

  init(data: { timer: any; }): void {
    this.timer = data.timer;
  }

  create() {
    this.camera = this.cameras.main
    this.camera.setBackgroundColor(0xff0000);

    // todo temporaire le temps de la fusion avec les autres branche et de la connetion au vrai timer
    this.registry.set('timer', this.generateRandomTime());

    this.background = this.add.image(512, 384, 'background');
    this.background.setAlpha(0.5);

    this.gameover_text = this.add.text(512, 384, 'Game Over', {
      fontFamily: 'Arial Black', fontSize: 64, color: '#ffffff',
      stroke: '#000000', strokeThickness: 8,
      align: 'center'
    });
    this.gameover_text.setOrigin(0.5);

    this.input.once('pointerup', () => {
          this.scene.start('Leaderboard');
    });
  }

  // todo temporaire le temps de la fusion avec les autres branche et de la connetion au vrai timer
  generateRandomTime(): number {
    const minTime = 5;
    const maxTime = 3000;
    // const maxTime = 6;
    return Math.floor(Math.random() * (maxTime - minTime + 1)) + minTime;
  }
}

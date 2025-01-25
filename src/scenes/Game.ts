import {Scene} from 'phaser';
import Rng from '../domain/Rng.ts';

export class Game extends Scene {
  private rng: Rng;

  camera: Phaser.Cameras.Scene2D.Camera;
  background: Phaser.GameObjects.Image;
  msg_text: Phaser.GameObjects.Text;

  constructor() {
    super('Game');
    this.rng = new Rng('BubbleTearapy');
  }

  create() {
    this.camera = this.cameras.main;
    this.camera.setBackgroundColor(0x00ff00);

    this.background = this.add.image(512, 384, 'background');
    this.background.setAlpha(0.5);

    this.msg_text = this.add.text(512, 384, 'Seed : ' + this.rng.getSeed() + '\n Roll the D20 !', {
      fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
      stroke: '#000000', strokeThickness: 8,
      align: 'center'
    });
    this.msg_text.setOrigin(0.5);

    this.input.on('pointerup', () => {
      const diceResult = this.rng.rollADice();
      this.msg_text.setText('Seed : ' + this.rng.getSeed() + '\n' + diceResult);

      if (diceResult === 1) {
        this.scene.start('GameOver');
      }

    });
  }
}

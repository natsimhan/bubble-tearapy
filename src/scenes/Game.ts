import {Scene} from 'phaser';
import Rng from '../domain/Rng.ts';
import PlayerWithBubbleTeas from '../components/player/PlayerWithBubbleTeas.ts';

export class Game extends Scene {
  private rng: Rng;

  camera: Phaser.Cameras.Scene2D.Camera;
  background: Phaser.GameObjects.Image;

  constructor() {
    super('Game');
    this.rng = new Rng('BubbleTearapy');
  }

  create() {
    this.camera = this.cameras.main;
    this.camera.setBackgroundColor(0x333333);

    // this.background = this.add.image(0, 0, 'background').setOrigin(0, 0);
    // this.background.setAlpha(0.5).setScale(this.scale.width / this.background.width, this.scale.height / this.background.height);


    const player = new PlayerWithBubbleTeas(this, this.scale.width * 0.1, this.scale.height);
    player.setHeight(this.scale.height * .5);

    this.input.on('pointerup', () => {
      // const diceResult = this.rng.rollADice();

      // if (diceResult === 1) {
      //   this.scene.start('GameOver');
      // }
    });


    this.input.keyboard?.on('keydown', (event: KeyboardEvent) => {
      switch (event.code) {
        case 'ArrowUp':

          break;
        case 'ArrowDown':

          break;
        case 'ArrowLeft':
          player.move(player.getX() - 10, player.getY());
          break;
        case 'ArrowRight':
          player.move(player.getX() + 10, player.getY());
          break;
        case 'NumpadAdd':
          break;
        case 'NumpadSubtract':
          break;
        default:
          console.debug(event.code);
          break;
      }
    });
  }

}

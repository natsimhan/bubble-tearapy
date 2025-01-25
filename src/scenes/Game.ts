import {Scene} from 'phaser';
import Rng from '../domain/Rng.ts';
import PlayerWithBubbleTeas from '../components/player/PlayerWithBubbleTeas.ts';

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

    this.background = this.add.image(0, 0, 'background').setOrigin(0, 0);
    this.background.setAlpha(0.5).setScale(this.scale.width / this.background.width, this.scale.height / this.background.height);

    this.msg_text = this.add.text(this.scale.width / 2, this.scale.height / 2, 'Seed : ' + this.rng.getSeed() + '\n Roll the D20 !', {
      fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
      stroke: '#000000', strokeThickness: 8,
      align: 'center'
    });
    this.msg_text.setOrigin(0.5);

    const player = new PlayerWithBubbleTeas(this, this.scale.width * 0.1, this.scale.height);
    player.setHeight(this.scale.height * .5);

    this.input.on('pointerup', () => {
      const diceResult = this.rng.rollADice();
      this.msg_text.setText('Seed : ' + this.rng.getSeed() + '\n' + diceResult);

      if (diceResult === 1) {
        this.scene.start('GameOver');
      }
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

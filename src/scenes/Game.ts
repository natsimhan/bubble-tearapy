import {Scene, Sound} from 'phaser';
import Rng from '../domain/Rng.ts';
import Parallax from '../components/Parallax.ts';
import PlayerWithBubbleTeas from '../components/player/PlayerWithBubbleTeas.ts';

export class Game extends Scene {
  private rng: Rng;

  camera: Phaser.Cameras.Scene2D.Camera;
  background: Phaser.GameObjects.Image;
  music: Sound.BaseSound;
  private parallax: Parallax;

  constructor() {
    super('Game');
    this.rng = new Rng('BubbleTearapy');
  }

  preload() {
    this.load.audio('cinematic_opening', 'music/cinematic_opening.ogg');
  }

  create() {
    this.camera = this.cameras.main;
    this.camera.setBackgroundColor(0x333333);
    this.parallax = new Parallax(this);

    this.music = this.sound.add('cinematic_opening', {loop: true, volume: 0.5});
    this.music.play();

    const player = new PlayerWithBubbleTeas(this, this.scale.width * 0.1, this.scale.height);
    player.setHeight(this.scale.height * .5);

    this.scene.launch('Hud');

    this.input.on('pointerup', () => {
      const diceResult = this.rng.rollADice();

      if (diceResult === 1) {
        this.events.once('shutdown', () => {
          this.music.stop();
        });
        this.scene.start('GameOver', {timer: 150});
        this.scene.stop('Hud')
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

  update(): void {
    this.parallax.update();
  }

}

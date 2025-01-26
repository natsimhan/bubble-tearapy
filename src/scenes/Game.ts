import {Scene, Sound} from 'phaser';
import Rng from '../domain/Rng.ts';
import ColorableArea from '../components/Colorable/ColorableArea.ts';
import Parallax from '../components/Parallax.ts';
import PlayerWithBubbleTeas from '../components/player/PlayerWithBubbleTeas.ts';
import {TextureKey} from './Preloader.ts';

const MINIMAL_SPEED = 0.05;

export class Game extends Scene {
  private rng: Rng;

  private music: Sound.BaseSound;
  private parallax: Parallax;
  private areaTest: ColorableArea;

  private speed: number;
  private speedLastSlower: number;

  constructor() {
    super('Game');
    // this.rng = new Rng('BubbleTearapy');
    // this.rng = new Rng('97a605a1b9'); // seed 8 batiments
    this.rng = new Rng('ea9c37de09');

    this.speed = MINIMAL_SPEED;
    this.speedLastSlower = 0;
  }

  preload() {
    this.load.audio('cinematic_opening', 'music/cinematic_opening.ogg');
  }

  create() {
    this.speed = MINIMAL_SPEED;
    this.speedLastSlower = this.time.now;
    this.scene.launch('Hud');

    this.parallax = new Parallax(this);

    this.music = this.sound.add('cinematic_opening', {loop: true, volume: 0.5});
    this.music.play();
    this.events.once('shutdown', () => {
      this.music.stop();
    });

    const roadHeight = this.textures.get(TextureKey.background.road).get().height;
    const player = new PlayerWithBubbleTeas(this, this.scale.width * 0.1, this.scale.height - roadHeight / 4);
    player.setHeight(this.scale.height * .5);

    this.areaTest = new ColorableArea(this, this.scale.width / 2, this.scale.height / 2, 10, this.rng);
    this.input.on('pointerup', (pointer) => {
      this.areaTest.receivedBubble(0x123456, 50, pointer.worldX, pointer.worldY);
    });

    this.input.keyboard?.on('keyup', (event: KeyboardEvent) => {
      switch (event.code) {
        case 'Space':
          const oldSpeed = this.speed;
          const finalSpeed = Math.min(MINIMAL_SPEED * 10, this.speed * 1.5);
          this.tweens.addCounter({
            from: 0,
            to: 100,
            duration: 300,
            ease: 'Linear',
            onUpdate: (tween) => {
              const percent = tween.getValue() / 100;
              this.speed = oldSpeed + percent * (finalSpeed - oldSpeed);
            }
          });
          break;
        default:
          // console.debug(event.code);
          break;
      }
    });
  }

  update(time: number): void {
    if (this.speed > MINIMAL_SPEED && time - this.speedLastSlower > 100) {
      this.speed = Math.max(MINIMAL_SPEED, this.speed * .9);
      this.speedLastSlower = time;
    }
    this.parallax.update(this.speed);
  }

  private gameOver(): void {
    this.scene.stop('Hud');
    this.scene.start('GameOver', {timer: 150});
  }

}

import {Scene, Sound} from 'phaser';
import Rng from '../domain/Rng.ts';
import ColorableArea from '../components/Colorable/ColorableArea.ts';
import Parallax from '../components/Parallax.ts';
import PlayerWithBubbleTeas from '../components/player/PlayerWithBubbleTeas.ts';
import {AudioKey, TextureKey} from './Preloader.ts';
import {Hud} from './Hud.ts';

const MINIMAL_SPEED = 0.05;

export class Game extends Scene {
  private rng: Rng;

  private music: Sound.BaseSound;
  private parallax: Parallax;
  private areaTest: ColorableArea;
  private startTime: number

  private speed: number;
  private speedLastSlower: number;
  private endGame: boolean = false;

  constructor() {
    super('Game');
    // this.rng = new Rng('97a605a1b9'); // seed 8 batiments
    // this.rng = new Rng('c53b9c667f'); // le seed des chèvres :)
    // this.rng = new Rng('fece8633d4'); // 2 arbres + 3 buissons
    this.rng = new Rng();

    this.speed = MINIMAL_SPEED;
    this.speedLastSlower = 0;
    this.startTime = 0;
  }

  create() {
    this.endGame = false;
    this.speed = MINIMAL_SPEED;
    this.speedLastSlower = this.time.now;
    this.scene.launch('Hud');

    this.parallax = new Parallax(this);

    const music = this.sound.add(AudioKey.musics.theme_principal, {loop: true, volume: 0.5});
    const bike = this.sound.add(AudioKey.effects.velo_normal, {loop: true, volume: 1});
    music.play();
    bike.play();
    this.events.once('shutdown', () => {
      music.stop();
      bike.stop();
    });

    const roadHeight = this.textures.get(TextureKey.background.road).get().height;
    const player = new PlayerWithBubbleTeas(this, this.scale.width * 0.1, this.scale.height - roadHeight / 4);
    player.setHeight(this.scale.height * .5);

    this.areaTest = new ColorableArea(this, this.scale.width * 0.0001, this.scale.height * .95, -10, this.rng);

    this.input.on('Hud:updateProgressBar', (percentVictory: number) => {
      const hudScene = this.scene.get('Hud') as Hud;
      if (hudScene) {
        hudScene.updateProgressToVictory(percentVictory);
      }
      if (percentVictory >= .99) {
        if (!this.endGame) {
          this.endGame = true;
          setTimeout(() => this.gameOver(Math.floor((Date.now() - this.startTime) / 1000)), 1000);
        }
      }
    });

    let spaceTimerSoundLast = 0;
    this.input.keyboard?.on('keyup', (event: KeyboardEvent) => {
      switch (event.code) {
        case 'Space':
          if (spaceTimerSoundLast + 3000 < Date.now()) {
            spaceTimerSoundLast = Date.now();
            this.sound.add(AudioKey.effects.velo_rapide, {volume: 1}).play();
          }
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

    this.startTime = Date.now();
  }

  update(time: number): void {
    if (this.speed > MINIMAL_SPEED && time - this.speedLastSlower > 100) {
      this.speed = Math.max(MINIMAL_SPEED, this.speed * .9);
      this.speedLastSlower = time;
    }
    this.parallax.update(this.speed);
  }

  private gameOver(timerSec: number): void {
    this.scene.stop('Hud');
    this.scene.start('GameOver', {timer: timerSec});
  }

}

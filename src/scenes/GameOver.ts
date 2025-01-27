import {Scene} from 'phaser';
import {AudioKey, UiConfig} from './Preloader.ts';

export class GameOver extends Scene {
  camera: Phaser.Cameras.Scene2D.Camera;
  background: Phaser.GameObjects.Image;
  gameover_text: Phaser.GameObjects.Text;
  public timer: number = 0;

  constructor() {
    super('GameOver');
  }

  init(data: { timer: number; }): void {
    this.timer = data?.timer || 0;
  }

  create() {
    this.add.image(this.scale.width / 2, this.scale.height / 2, 'bg_end');

    const music = this.sound.add(AudioKey.musics.cinematique_de_fin, {loop: true, volume: 0.5});
    music.play();
    this.events.once('shutdown', () => {
      music.stop();
    });

    const minutes = Math.floor(this.timer / 60);
    const seconds = this.timer % 60;
    const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;


    this.gameover_text = this.add.text(this.scale.width / 2, this.scale.height / 2, 'You Win !' + '\n' + formattedTime, {
      fontFamily: UiConfig.fontFamily, fontSize: 100, color: '#ffffff',
      stroke: '#000000', strokeThickness: 8,
      align: 'center'
    });
    this.gameover_text.setOrigin(0.5);

    setTimeout(() => {
      this.input.once('pointerup', () => {
        this.scene.start('Leaderboard', {timer: this.timer});
      });
    }, 2000);
  }
}

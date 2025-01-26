import {Scene, GameObjects, Sound} from 'phaser';
import Button from "../components/Button.ts";
import {AudioKey} from './Preloader.ts';

export class MainMenu extends Scene {
  background: GameObjects.Image;
  music: Sound.BaseSound;

  constructor() {
    super('MainMenu');
  }

  create() {
    this.add.image(this.scale.width / 2, this.scale.height / 2, 'background');

    this.music = this.sound.add(AudioKey.musics.main_menu, {loop: true, volume: 0.25});
    this.music.play();

    const playButton = new Button(this, this.scale.width / 3, this.scale.height * .8, 'Play', []);
    const leaderBoardButton = new Button(this, (2 * this.scale.width) / 3, this.scale.height * .8, 'Scores', []);
    const creditsButton = new Button(this, this.scale.width * .9, this.scale.height * .95, 'Credits', []).setScale(.6);

    playButton.setDepth(1);
    leaderBoardButton.setDepth(1);
    creditsButton.setDepth(1);

    this.events.once('shutdown', () => {
      this.music.stop();
    });

    playButton.onClickButton('pointerup', () => {
      this.scene.start('Game');
    });
    leaderBoardButton.onClickButton('pointerup', () => {
      this.scene.start('Leaderboard');
    });
    creditsButton.onClickButton('pointerup', () => {
      this.scene.start('Credits');
    });
  }
}

import {Scene, GameObjects, Sound} from 'phaser';
import Button from "../components/Button.ts";
import {TextureKey} from './Preloader.ts';

export class MainMenu extends Scene {
  background: GameObjects.Image;
  logo: GameObjects.Image;
  music: Sound.BaseSound;

  constructor() {
    super('MainMenu');
  }

  preload() {
    this.load.audio('main_menu', 'music/main_menu.ogg');
  }

  create() {
    const width = this.scale.width;
    const height = this.scale.height;

    this.music = this.sound.add('main_menu', {loop: true, volume: 0.5});
    this.music.play();

    this.cameras.main.setBackgroundColor('#fdd784');

    const playButton = new Button(this, width / 3, (2 * height) / 3, 'play', []);
    this.add.existing(playButton);
    const leaderBoardButton = new Button(this, (2 * width) / 3, (2 * height) / 3, 'leaderboard', []);
    this.add.existing(leaderBoardButton);
    const creditsButton = new Button(this, width, height, 'credits', []);
    this.add.existing(creditsButton);
    creditsButton.setPosition(width - creditsButton.width / 2, height - creditsButton.height / 2);

    this.logo = this.add.image(512, 300, TextureKey.logo.logo_bubble_teapay);

    playButton.setDepth(1);
    leaderBoardButton.setDepth(1);
    creditsButton.setDepth(1);
    this.logo.setDepth(0);

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

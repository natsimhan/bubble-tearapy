import {Scene, GameObjects} from 'phaser';
import Button from "../components/Button.ts";

export class MainMenu extends Scene {
	background: GameObjects.Image;
	logo: GameObjects.Image;

	constructor() {
		super('MainMenu');
	}

	create() {
		const width = this.scale.width;
		const height = this.scale.height;
		this.background = this.add.image(512, 384, 'background');

		const playButton = new Button(this, width / 3, (2 * height) / 3, 'play', []);
		this.add.existing(playButton);
		const leaderBoardButton = new Button(this, (2 * width) / 3, (2 * height) / 3, 'leaderboard', []);
		this.add.existing(leaderBoardButton);
		const creditsButton = new Button(this, width, height, 'credits', []);
		this.add.existing(creditsButton);
		creditsButton.setPosition(width - creditsButton.width / 2, height - creditsButton.height / 2);

		this.logo = this.add.image(512, 300, 'logo');

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

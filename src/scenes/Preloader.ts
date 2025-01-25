import {Scene} from 'phaser';

export const TextureKey = {
	button: 'button',
};

export class Preloader extends Scene {
	constructor() {
		super('Preloader');
	}

	init() {
		this.add.image(512, 384, 'background');

		this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff);
		const bar = this.add.rectangle(512 - 230, 384, 4, 28, 0xffffff);

		this.load.on('progress', (progress: number) => {
			bar.width = 4 + (460 * progress);
		});
	}

	preload() {
		this.load.setPath('assets');
		this.load.atlas(TextureKey.button, 'button/nine-slice.png', 'button/nine-slice.json');
		this.load.image('logo', 'logo.png');
	}

	create() {
		this.scene.start('MainMenu');
	}
}
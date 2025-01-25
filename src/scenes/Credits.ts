import {Scene} from "phaser";
import Button from "../components/Button.ts";

export default class Credits extends Scene {

	constructor() {
		super('Credits');
	}

	create() {
		const width = this.scale.width;
		const height = this.scale.height;
		const mainMenuButton = new Button(this, width / 2, (3 * height) / 4, 'main menu', []);
		this.add.existing(mainMenuButton);
		mainMenuButton.on('pointerup', () => {
			this.scene.start('MainMenu');
		});
	}
}
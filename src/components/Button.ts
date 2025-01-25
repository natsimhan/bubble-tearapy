import * as Phaser from "phaser";
import {TextureKey} from "../scenes/Preloader.ts";

const BUTTON_PADDING = 50;

export default class Button extends Phaser.GameObjects.Container {

	private text: string;
	private readonly button!: Phaser.GameObjects.NineSlice;
	private readonly buttonText!: Phaser.GameObjects.Text;

	constructor(scene: Phaser.Scene, x: number, y: number, text: string, children: Phaser.GameObjects.GameObject[]) {
		super(scene, x, y, children);
		this.text = text;
		this.button = this.scene.add.nineslice(
			0,
			0,
			TextureKey.button,
			'btn-01',
			367,
			153,
			20,
			20,
		);

		this.buttonText = this.scene.add.text(
			0, 0,
			this.text,
			{
				fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
				stroke: '#000000', strokeThickness: 8,
				align: 'center'
			});

		this.button.setOrigin(0.5);
		this.buttonText.setOrigin(0.5);

		const textWidth = this.buttonText.width;
		this.button.displayWidth = textWidth + this.button.leftWidth + this.button.rightWidth + BUTTON_PADDING;
		this.button.displayHeight = this.button.height / 1.5;
		this.buttonText.setPosition(0, 0);

		this.setSize(this.button.width, this.button.height);
		this.setInteractive();
		this.add([this.button, this.buttonText]);
	}
}
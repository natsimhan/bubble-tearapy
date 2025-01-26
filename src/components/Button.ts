import * as Phaser from "phaser";
import {TextureKey} from "../scenes/Preloader.ts";

const BUTTON_PADDING = 50;

export default class Button extends Phaser.GameObjects.Container {

  private text: string;
  private readonly buttonNineSlice!: Phaser.GameObjects.NineSlice;
  private readonly textButton!: Phaser.GameObjects.Text;

  constructor(scene: Phaser.Scene, x: number, y: number, text: string, children: Phaser.GameObjects.GameObject[]) {
    super(scene, x, y, children);
    this.text = text;
    this.buttonNineSlice = this.scene.add.nineslice(
        0,
        0,
        TextureKey.button,
        'btn-01',
        367,
        153,
        20,
        20,
    );

    this.textButton = this.scene.add.text(
        0, 0,
        this.text,
        {
          fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
          stroke: '#000000', strokeThickness: 8,
          align: 'center'
        });

    this.buttonNineSlice.setOrigin(0.5);
    this.textButton.setOrigin(0.5);

    const textWidth = this.textButton.width;
    this.buttonNineSlice.displayWidth = textWidth + this.buttonNineSlice.leftWidth + this.buttonNineSlice.rightWidth + BUTTON_PADDING;
    this.buttonNineSlice.displayHeight = this.buttonNineSlice.height / 1.5;
    this.textButton.setPosition(0, 0);

    this.setSize(this.buttonNineSlice.width, this.buttonNineSlice.height);
    this.add([this.buttonNineSlice, this.textButton]);
    this.buttonNineSlice.setInteractive({
      pixelPerfect: true,
      useHandCursor: true
    });
  }

  onClickButton(event: string, callback: () => void): void {
    this.buttonNineSlice.on(event, callback);
  }
}
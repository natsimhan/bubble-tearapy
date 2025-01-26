import * as Phaser from "phaser";
import {TextureKey} from "../scenes/Preloader.ts";

export default class Button extends Phaser.GameObjects.Container {

  private readonly buttonNineSlice!: Phaser.GameObjects.NineSlice;
  private readonly textButton!: Phaser.GameObjects.Text;

  constructor(scene: Phaser.Scene, x: number, y: number, text: string, children: Phaser.GameObjects.GameObject[]) {
    super(scene, x, y, children);

    this.textButton = this.scene.add.text(
        0, 0,
        text,
        {
          fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
          stroke: '#000000', strokeThickness: 8,
          align: 'center'
        });
    this.textButton.setOrigin(0.5);

    const textWidth = this.textButton.displayWidth;
    const margesX = this.scene.scale.width / 20;
    const nineSlideWidth = textWidth + 2 * margesX;

    this.buttonNineSlice = this.scene.make.nineslice({
      x: 0,
      y: 0,
      key: TextureKey.ui.button_blue,
      leftWidth: 250,
      rightWidth: 250,
      add: false,
    }).setOrigin(.5);
    this.buttonNineSlice.setSize(nineSlideWidth * 4, 0).setScale(this.textButton.displayHeight * 2 / this.buttonNineSlice.displayHeight);

    this.add([
      this.buttonNineSlice,
      this.textButton,
    ]);
    this.buttonNineSlice.setInteractive({
      pixelPerfect: true,
      useHandCursor: true,
    });
    this.scene.add.existing(this);
  }

  onClickButton(event: string, callback: () => void): void {
    this.buttonNineSlice.on(event, callback);
  }
}
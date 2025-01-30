import Phaser from 'phaser';
import ColorableArea from './Colorable/ColorableArea.ts';
import Rng from '../domain/Rng.ts';
import ColorableDecor from './Colorable/ColorableDecor/ColorableDecor.ts';
import PNJ from './Colorable/PNJ/PNJ.ts';

export default class WorldContainer {
  private colorableAreaList: ColorableArea[];
  private worldWidth: number;

  constructor(private scene: Phaser.Scene, offsetX: number, private rng: Rng) {
    this.colorableAreaList = [];

    const nbArea = this.rng.between(3, 10);
    this.worldWidth = offsetX;
    for (let i = 0; i < nbArea; i++) {
      const area = new ColorableArea(this.scene, this.worldWidth, this.scene.scale.height * .95, -10, this.rng);
      this.colorableAreaList.push(area);
      this.worldWidth += this.scene.scale.width;
    }
  }

  public update(speed: number): void {
    for (const area of this.colorableAreaList) {
      for (const decorOrPnj of area.getChild()) {
        if (decorOrPnj instanceof ColorableDecor) {
          for (const element of decorOrPnj.getChild()) {
            for (const image of element.getChild()) {
              this.moveImageOnXWithSpeedAndWorldRotation(image, speed);
            }
          }
        } else if (decorOrPnj instanceof PNJ) {
          decorOrPnj.update(-speed, this.worldWidth);
        }
      }
    }
  }

  private moveImageOnXWithSpeedAndWorldRotation(image: Phaser.GameObjects.Image, speed: number): void {
    const newX = image.x + -speed;
    const imgW = image.displayWidth + 1;
    image.setX(newX > -imgW ? newX : this.worldWidth - imgW);
  }
}
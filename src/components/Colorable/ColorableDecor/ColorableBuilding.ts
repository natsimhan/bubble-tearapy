import ColorableDecorElement from "./ColorableDecorElement.ts";
import ColorableDecor from './ColorableDecor.ts';
import {TextureKey} from '../../../scenes/Preloader.ts';

export default class ColorableBuilding extends ColorableDecor {

    constructor(scene: Phaser.Scene, x: number, y: number, height: number, width: number) {
      super(scene, x, y, height, width);
    }

  createElementList(): void {
      this.elementList = [];
      this.elementList.push( new ColorableDecorElement(
          this.scene,
          this.x,
          this.y,
          TextureKey.decor.facade,
          this.height * 0.7,
          this.width
      ))
    this.elementList.push( new ColorableDecorElement(
        this.scene,
        this.x,
        this.y - 0.7 * this.height,
        TextureKey.decor.roof,
        this.height * 0.3,
        this.width
    ))
  }
}
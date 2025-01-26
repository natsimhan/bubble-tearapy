import ColorableDecorElement from "./ColorableDecorElement.ts";
import ColorableDecor from './ColorableDecor.ts';
import {TextureKey} from '../../../scenes/Preloader.ts';

const treeTextureKeyBorder: string = TextureKey.decor.house2.house2;

const treeTextureKeyList: string[] = [
  TextureKey.decor.house2.house2_facade,
  TextureKey.decor.house2.house2_fenetre,
  TextureKey.decor.house2.house2_porte,
  TextureKey.decor.house2.house2_toit,
];

export default class ColorableHouse2 extends ColorableDecor {

    constructor(scene: Phaser.Scene, x: number, y: number, height: number, width: number) {
      super(scene, x, y, height, width);
    }

  createElementList(): void {
      this.elementList = [];
      for (let texture of treeTextureKeyList) {
        console.debug('construct', texture);
        this.elementList.push( new ColorableDecorElement(
            this.scene,
            this.x,
            this.y,
            texture,
            this.height,
            this.width
        ))
      }
  }

  createElementBorder() {
    this.elementBorder =  new ColorableDecorElement(
        this.scene,
        this.x,
        this.y,
        treeTextureKeyBorder,
        this.height,
        this.width
    );
  }
}
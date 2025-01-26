import ColorableDecorElement from "./ColorableDecorElement.ts";
import ColorableDecor from './ColorableDecor.ts';
import {TextureKey} from '../../../scenes/Preloader.ts';

const treeTextureKeyBorder: string = TextureKey.decor.house.house;

const treeTextureKeyList: string[] = [
  TextureKey.decor.house.house_facade,
  TextureKey.decor.house.house_fenetre,
  TextureKey.decor.house.house_mur,
  TextureKey.decor.house.house_porte,
  TextureKey.decor.house.house_toit,
];

export default class ColorableHouse extends ColorableDecor {

    constructor(scene: Phaser.Scene, x: number, y: number, height: number, width: number) {
      super(scene, x, y, height, width);
    }

  createElementList(): void {
      this.elementList = [];
      for (let texture of treeTextureKeyList) {
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
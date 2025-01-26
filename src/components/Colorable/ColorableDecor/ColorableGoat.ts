import ColorableDecorElement from "./ColorableDecorElement.ts";
import ColorableDecor from './ColorableDecor.ts';
import {TextureKey} from '../../../scenes/Preloader.ts';

const treeTextureKeyBorder: string = TextureKey.decor.chevre.chevre;

const treeTextureKeyList: string[] = [
  TextureKey.decor.chevre.chevre_corne,
  TextureKey.decor.chevre.chevre_corps,
  TextureKey.decor.chevre.chevre_museau,
  TextureKey.decor.chevre.chevre_patte,
  TextureKey.decor.chevre.chevre_tache1,
  TextureKey.decor.chevre.chevre_tache2,
  TextureKey.decor.chevre.chevre_tache3,
];

export default class ColorableGoat extends ColorableDecor {

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
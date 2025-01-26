import ColorableDecorElement from "./ColorableDecorElement.ts";
import ColorableDecor from './ColorableDecor.ts';
import {TextureKey} from '../../../scenes/Preloader.ts';

const treeTextureKeyBorder: string = TextureKey.decor.vache.vache;

const treeTextureKeyList: string[] = [
  TextureKey.decor.vache.vache_corps,
  TextureKey.decor.vache.vache_tache1,
  TextureKey.decor.vache.vache_tache2,
  TextureKey.decor.vache.vache_tache3,
  TextureKey.decor.vache.vache_tache4,
  TextureKey.decor.vache.vache_tache5,
];

export default class ColorableCow extends ColorableDecor {

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
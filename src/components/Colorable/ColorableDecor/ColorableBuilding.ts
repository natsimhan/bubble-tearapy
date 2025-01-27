import ColorableDecorElement from "./ColorableDecorElement.ts";
import ColorableDecor from './ColorableDecor.ts';
import {TextureKey} from '../../../scenes/Preloader.ts';

const treeTextureKeyBorder: string = TextureKey.decor.building.building;

const treeTextureKeyList: string[] = [
  TextureKey.decor.building.building_fond,
  TextureKey.decor.building.building_fenetre,
  TextureKey.decor.building.building_porte,
];

export default class ColorableBuilding extends ColorableDecor {

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
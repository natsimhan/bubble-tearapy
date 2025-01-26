import {TextureKey} from '../../../scenes/Preloader.ts';


export default class PNJ {

  #pnjImage;
  #scene;
  #x;
  #y;
  #targetHeight: number;
  #targetWidth: number;
  #walkingZoneMin: number;
  #walkingZoneMax: number;
  #depth;
  isBackward: boolean;

  constructor(scene: Phaser.Scene, x: number, y: number, minX: number, maxX: number) {
    this.#scene = scene;
    this.#x = x;
    this.#y = y;
    this.#depth = 0;
    this.#targetWidth = scene.scale.width/10;
    this.#targetHeight = scene.scale.height/3;
    this.#walkingZoneMin = minX;
    this.#walkingZoneMax = maxX;
    this.#pnjImage = this.#scene.add.image(x, y, TextureKey.pnj.pnj_triste_1);
    this.#pnjImage.setScale(this.#targetWidth / this.#pnjImage.width, this.#targetHeight / this.#pnjImage.height);
    this.#pnjImage.setOrigin(0.5, 1);
  }

  switchToHappy() {
    this.#pnjImage.destroy();
    this.#pnjImage = this.#scene.add.image(this.#x, this.#y, TextureKey.pnj.pnj_heureux_1);
    this.#pnjImage.setScale(this.#targetWidth / this.#pnjImage.width, this.#targetHeight / this.#pnjImage.height);
    this.#pnjImage.setOrigin(0.5, 1);
    this.#pnjImage.setDepth(this.#depth);
  }

  setDepth(depth: number) {
    this.#depth = depth;
    this.#pnjImage.setDepth((depth));
  }
}

import {AudioKey, TextureKey} from '../../../scenes/Preloader.ts';

export default class PNJ {

  #pnjImage:Phaser.GameObjects.Image;
  #scene;
  #x;
  #y;
  #targetHeight: number;
  #targetWidth: number;
  #walkingZoneMin: number;
  #walkingZoneMax: number;
  #depth;
  private direction: number = -1;
  private speed = 2;
  private refX : number;

  constructor(scene: Phaser.Scene, x: number, y: number, minX: number, maxX: number) {
    this.#scene = scene;
    this.#x = x;
    this.#y = y;
    this.#depth = 0;
    this.#targetWidth = scene.scale.width/10;
    this.#targetHeight = scene.scale.height/3;
    this.#walkingZoneMin = x - minX;
    this.#walkingZoneMax = maxX - x;
    this.refX = x;
    this.#pnjImage = this.#scene.add.image(x, y, TextureKey.pnj.pnj_triste_1);
    this.#pnjImage.setScale(this.#targetWidth / this.#pnjImage.width, this.#targetHeight / this.#pnjImage.height);
    this.#pnjImage.setOrigin(0.5, 1);
  }

  switchToHappy() {
    this.#scene.sound.add(Math.random()>0.5 ? AudioKey.effects.pnj_heureux_1 : AudioKey.effects.pnj_heureux_2, {volume: 1}).play();
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

  public update(worldshift: number, worldWidth: number): void {
    if(this.#pnjImage && this.#pnjImage.visible) {
      this.refX += worldshift;

      this.#pnjImage.x += (this.speed * (this.direction>0 ? .25 : 2)) * this.direction;

      const imgW = this.#pnjImage.displayWidth + 1;
      if(this.#pnjImage.x < -imgW) {
        this.#pnjImage.x += worldWidth;
        this.refX += worldWidth;
      }

      if (this.#pnjImage.x >= this.refX + this.#walkingZoneMax) {
        this.#pnjImage.x = this.refX + this.#walkingZoneMax;
        this.direction = -1;
        this.#pnjImage.setFlipX(false);
      } else if (this.#pnjImage.x <= this.refX + this.#walkingZoneMin) {
        this.#pnjImage.x = this.refX + this.#walkingZoneMin;
        this.direction = 1;
        this.#pnjImage.setFlipX(true);
      }
    }
  }
}

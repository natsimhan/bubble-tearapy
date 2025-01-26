import {TextureKey} from '../scenes/Preloader.ts';

const INITIAL_SPEED_BG1 = 0.2;
const INITIAL_SPEED_BG2 = 2;

export default class Parallax {

  private scene: Phaser.Scene;
  private bg1!: Phaser.GameObjects.TileSprite;
  private bg2!: Phaser.GameObjects.TileSprite;
  private speedBg1: number = INITIAL_SPEED_BG1;
  private speedBg2: number = INITIAL_SPEED_BG2;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.bg1 = this.scene.add.tileSprite(0, this.scene.scale.height, 0, 0, TextureKey.background.bg1).setOrigin(0, 1);
    this.bg1.w = this.bg1.displayWidth;
    this.bg2 = this.scene.add.tileSprite(0, this.scene.scale.height, 0, 0, TextureKey.background.bg2).setOrigin(0, 1);
    this.bg2.w = this.bg2.displayWidth;
  }

  update(): void {
    this.bg1.tilePositionX += this.speedBg1;
    this.bg2.tilePositionX += this.speedBg2;

    if (this.bg1.tilePositionX > this.bg1.displayWidth) {
      this.bg1.tilePositionX = 0;
    }
    if (this.bg2.tilePositionX > this.bg2.displayWidth) {
      this.bg2.tilePositionX = 0;
    }
  }

  updateSpeed(coeff: number): void {
    this.speedBg1 = INITIAL_SPEED_BG1 * coeff;
    this.speedBg2 = INITIAL_SPEED_BG2 * coeff;
  }
}
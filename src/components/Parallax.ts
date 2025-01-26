import {TextureKey} from '../scenes/Preloader.ts';
import Phaser from 'phaser';


export default class Parallax {

  private scene: Phaser.Scene;
  private backgroundList: Phaser.GameObjects.TileSprite[];
  private speed: number = .02;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.backgroundList = [];

    const spriteR = new Phaser.Geom.Rectangle(
        0,
        0,
        this.scene.scale.width,
        this.scene.scale.height,
    );

    for (const texture of [
      TextureKey.background.parallax_bg4,
      TextureKey.background.parallax_bg3,
      TextureKey.background.parallax_bg2,
      TextureKey.background.parallax_bg1,
      TextureKey.background.road,
    ]) {
      const bg = this.scene.add.tileSprite(
          spriteR.centerX,
          spriteR.height,
          spriteR.width,
          0, //spriteR.height,
          texture
      ).setOrigin(.5, 1);
      this.backgroundList.push(bg);
    }
  }

  update(): void {
    let velocity = this.speed;
    for (const bg of this.backgroundList) {
      bg.tilePositionX += velocity;
      velocity *= 4;
    }
  }

  updateSpeed(speed: number): void {
    this.speed = speed;
  }
}
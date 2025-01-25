export default class ColorableDecorElement extends Phaser.GameObjects.Image {

  #displayHeight: number;
  #displayWidth: number;

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string, height: number, width: number) {
    super(scene, x, y, texture);

    this.#displayWidth = width;
    this.#displayHeight = height;
    this.setScale(this.#displayWidth / this.width, this.#displayHeight / this.height);
    this.setOrigin(0.5, 1);
    this.scene.add.existing(this);
  }
}

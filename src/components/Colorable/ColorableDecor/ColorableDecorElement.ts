import {TextureKey} from '../../../scenes/Preloader.ts';

const WIN_PROPORTION = 0.8;

export default class ColorableDecorElement extends Phaser.GameObjects.Image {

  #displayHeight: number;
  #displayWidth: number;
  #colorReceived: Map<number, number>;
  #totalAreaCovered: number;
  #isElementFull: boolean;
  #textureKey: string;
  #splashList: Phaser.GameObjects.Image[];

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string, height: number, width: number) {
    super(scene, x, y, texture);

    this.#displayWidth = width;
    this.#displayHeight = height;
    this.#colorReceived = new Map();
    this.#totalAreaCovered = 0;
    this.#isElementFull = false;
    this.#textureKey = texture;
    this.#splashList = [];
    this.setScale(this.#displayWidth / this.width, this.#displayHeight / this.height);
    this.setOrigin(0.5, 1);
    this.scene.add.existing(this);
  }

  isPointInElement(xWorld: number, yWorld: number): boolean {
    const xLocal = (xWorld - this.getBounds().left) / this.getBounds().width * this.texture.get().width;
    const yLocal = (yWorld - this.getBounds().top) / this.getBounds().height * this.texture.get().height;
    const pixel = this.scene.textures.getPixelAlpha(xLocal, yLocal, this.#textureKey, 0);
    return (pixel > 0);
  }

  public receiveBubble(color: number, size: number, x: number, y: number) {
    if (!this.#isElementFull) {
      this.#colorReceived.set(color, size / this.displayHeight * this.displayHeight + this.getCurrentSizeByColor(color));
      this.#isElementFull = this.checkElementFull();
      if (!this.#isElementFull) {
        const newSplash = this.scene.add.image(x, y, TextureKey.decor.splash);
        newSplash.setScale(size / newSplash.width, size / newSplash.height);
        newSplash.setTint(color);
        newSplash.setDepth(this.depth + 1);
        this.#splashList.push(newSplash);
      } else {
        this.removeSplashes();
        this.setTint(this.getMaxColor());
      }
    }
  }

  getCurrentSizeByColor(color: number): number {
    const currentColorSize = this.#colorReceived.get(color);
    if (currentColorSize) {
      return currentColorSize;
    }
    return 0;
  }

  checkElementFull(): boolean {
    return this.#totalAreaCovered > this.displayHeight * this.displayHeight * WIN_PROPORTION;
  }

  getMaxColor(): number {
    let maxSize = 0;
    let bestColor = 0;
    this.#colorReceived.forEach((size, color) => {
      if (size > maxSize) {
        maxSize = size;
        bestColor = color;
      }
    })
    return bestColor;
  }

  removeSplashes(): void {
    this.#splashList.forEach((splash) => {
      splash.setAlpha(0);
    })
  }
}

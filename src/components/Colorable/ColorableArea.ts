import ColorableDecor from './ColorableDecor/ColorableDecor.ts';
import DecorFactory, {DecorKey} from './ColorableDecor/DecorFactory.ts';
import Rng from '../../domain/Rng.ts';

const DECOR_MAX = 7;

export default class ColorableArea {

  #scene: Phaser.Scene;
  #x: number;
  #y: number;
  #width: number;
  #heigth: number;
  #depth: number;
  #rng: Rng;
  #decorMinWidth;
  #decorFactory: DecorFactory;
  #decorNb: number;
  #decorFullNb: number;
  #colorableDecorList: ColorableDecor[];


  constructor(scene: Phaser.Scene, x: number, y: number, depth: number, rng: Rng) {
    this.#scene = scene;
    this.#x = x;
    this.#y = y;
    this.#heigth = this.#scene.scale.height;
    this.#width = this.#scene.scale.width;
    this.#depth = depth;
    this.#rng = rng;
    this.#decorFullNb = 0;
    this.#decorNb = 0;
    this.#decorMinWidth = this.#scene.scale.width / 10;
    this.#decorFactory = new DecorFactory();
    this.#colorableDecorList = [];
    this.generateDecorList();
    this.setDepth(this.#depth);
  }

  generateDecorList() {
    this.#decorNb = this.#rng.between(3, DECOR_MAX);
    const leftBound = this.#x - this.#width / 2;
    let minX = leftBound;
    for (let i = 0; i < this.#decorNb; i++) {
      const maxX = leftBound + this.#width - (this.#decorNb - i - 1) * this.#decorMinWidth;
      const xRight = this.#rng.realBetween(minX + this.#decorMinWidth, maxX);
      const decorWidth = this.#rng.realBetween(this.#decorMinWidth, xRight - minX);
      const xDecor = this.#rng.realBetween(minX + decorWidth / 2, xRight - decorWidth / 2);
      const yDecor = this.#rng.realBetween(this.#y, this.#y - this.#heigth / 10)
      this.#colorableDecorList.push(this.#decorFactory.createDecor(
          this.#scene,
          xDecor,
          yDecor,
          this.#rng.realBetween(this.#scene.scale.height / 4, yDecor),
          decorWidth,
          DecorKey.tree
      ));
      minX = xRight;
    }
  }

  setDepth(depth: number) {
    this.#colorableDecorList.forEach((decor) => {
      decor.setDpeth(depth);
    })
  }

  receivedBubble(color: number, size: number, x: number, y: number) {
    for (let decor of this.#colorableDecorList) {
      const bounds = decor.getBounds();
      if (
          x >= bounds.left && x <= bounds.right &&
          y >= bounds.top && y <= bounds.bottom
      ) {
        if (decor.receiveBubble(color, size, x, y)) {
          this.#decorFullNb += 1;
        }
        break;
      }
    }
  }

  getAreaScore(): number {
    return (this.#decorFullNb / this.#decorNb)
  }



}
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
  #colorableDecorList: ColorableDecor[];


  constructor(scene: Phaser.Scene, x: number, y: number, depth: number, rng: Rng) {
    this.#scene = scene;
    this.#x = x;
    this.#y = y;
    this.#heigth = this.#scene.scale.height;
    this.#width = this.#scene.scale.width;
    this.#depth = depth;
    this.#rng = rng;
    this.#decorMinWidth = this.#scene.scale.width / 10;
    this.#decorFactory = new DecorFactory();
    this.#colorableDecorList = [];
    this.generateDecorList();
  }

  generateDecorList() {
    this.#decorNb = this.#rng.between(3, DECOR_MAX);
    const leftBound = this.#x - this.#width / 2;
    let minX = leftBound;
    for (let i = 0; i < this.#decorNb; i++) {
      let maxX = leftBound + this.#width - (this.#decorNb - i - 1) * this.#decorMinWidth;
      let xRight = this.#rng.realBetween(minX + this.#decorMinWidth, maxX);
      let decorWidth = this.#rng.realBetween(this.#decorMinWidth, xRight - minX);
      let xDecor = this.#rng.realBetween(minX + decorWidth / 2, xRight - decorWidth / 2);
      let yDecor = this.#rng.realBetween(this.#y, this.#y - this.#heigth / 10)
      this.#colorableDecorList.push(this.#decorFactory.createDecor(
          this.#scene,
          xDecor,
          yDecor,
          this.#rng.realBetween(this.#scene.scale.height / 4, yDecor),
          decorWidth,
          DecorKey.building
      ));
      minX = xRight;
    }

  }


}
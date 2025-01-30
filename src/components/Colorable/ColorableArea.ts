import ColorableDecor from './ColorableDecor/ColorableDecor.ts';
import DecorFactory, {DecorKey} from './ColorableDecor/DecorFactory.ts';
import Rng from '../../domain/Rng.ts';
import PNJ from './PNJ/PNJ.ts';

const DECOR_MAX = 5;
const PNJ_MAX = 1;

const townDecorList = [
  DecorKey.building,
  DecorKey.building2,
  DecorKey.house,
  DecorKey.house2,
  DecorKey.house3,
  DecorKey.tree,
  DecorKey.bush1
];

const countrysideDecorList = [
  DecorKey.tree,
  DecorKey.tree2,
  DecorKey.bush1,
  DecorKey.bush2,
  DecorKey.goat,
  DecorKey.cow,
  DecorKey.house,
];

const biomeList = [
  countrysideDecorList,
  townDecorList,
];

const decorSizeRelation: Map<string, number> = new Map();

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
  #pnjNb: number;
  #pnjList: PNJ[];
  #pnjWidth;
  #isPnjHappy: boolean;


  constructor(scene: Phaser.Scene, x: number, y: number, depth: number, rng: Rng) {
    this.#scene = scene;
    this.#heigth = this.#scene.scale.height;
    this.#width = this.#scene.scale.width;
    this.#x = x + this.#width / 2;
    this.#y = y;
    this.#depth = depth;
    this.#rng = rng;
    this.#decorFullNb = 0;
    this.#decorNb = 0;
    this.#decorMinWidth = this.#scene.scale.width / 5;
    this.#decorFactory = new DecorFactory();
    this.#colorableDecorList = [];
    this.#pnjList = [];
    this.#pnjWidth = this.#scene.scale.width / 10;
    this.#isPnjHappy = false;
    decorSizeRelation.set(DecorKey.building, 1);
    decorSizeRelation.set(DecorKey.building2, 1);
    decorSizeRelation.set(DecorKey.bush1, 0.4);
    decorSizeRelation.set(DecorKey.bush2, 0.4);
    decorSizeRelation.set(DecorKey.cow, 0.6);
    decorSizeRelation.set(DecorKey.goat, 0.6);
    decorSizeRelation.set(DecorKey.house, 0.75);
    decorSizeRelation.set(DecorKey.house2, 0.75);
    decorSizeRelation.set(DecorKey.house3, 0.75);
    decorSizeRelation.set(DecorKey.tree, 0.75);
    decorSizeRelation.set(DecorKey.tree2, 0.75);
    this.generateDecorList();
    this.generatePNJList()

    this.setDepth(this.#depth);

    this.#scene.input.on('ColorableArea:receivedBubble', (color: number, power: number, worldX: number, worldY: number) => {
      this.receivedBubble(color, power * 100, worldX, worldY);
    });
  }

  public getChild():(ColorableDecor|PNJ)[] {
    return [...this.#colorableDecorList, ...this.#pnjList];
  }

  generatePNJList() {
    this.#pnjNb = this.#rng.between(1, PNJ_MAX);
    const leftBound = this.#x - this.#width / 2;
    let minX = leftBound;
    for (let i = 0; i < this.#pnjNb; i++) {
      const maxX = leftBound + this.#width - (this.#pnjNb - i - 1) * this.#pnjWidth;
      const xRight = this.#rng.realBetween(minX + this.#pnjWidth, maxX);
      const xPnj = this.#rng.realBetween(minX + this.#pnjWidth / 2, xRight - this.#pnjWidth / 2);
      this.#pnjList.push(new PNJ(
          this.#scene,
          xPnj,
          this.#y,
          this.#x - this.#width / 2 + this.#pnjWidth / 2,
          this.#x + this.#width / 2 - this.#pnjWidth / 2,
      ));
      minX = xRight;
    }
  }

  generateDecorList() {
    this.#decorNb = this.#rng.between(3, DECOR_MAX);
    const biome = biomeList[this.#rng.between(0, biomeList.length - 1)];
    const leftBound = this.#x - this.#width / 2;
    let minX = leftBound;
    for (let i = 0; i < this.#decorNb; i++) {
      const maxX = leftBound + this.#width - (this.#decorNb - i - 1) * this.#decorMinWidth;
      const xRight = this.#rng.realBetween(minX + this.#decorMinWidth, maxX);
      const decorWidth = this.#rng.realBetween(this.#decorMinWidth, xRight - minX);
      const xDecor = this.#rng.realBetween(minX + decorWidth / 2, xRight - decorWidth / 2);
      const yDecor = this.#rng.realBetween(this.#y, this.#y - this.#heigth / 10);
      const decorHeight = this.#rng.realBetween(this.#scene.scale.height / 2, yDecor) ;
      const texture: string = biome[this.#rng.between(0, biome.length - 1)];
      let textureMultiplier = decorSizeRelation.get(texture);
      if (!textureMultiplier) {
        textureMultiplier = 1;
      }
      this.#colorableDecorList.push(this.#decorFactory.createDecor(
          this.#scene,
          xDecor,
          yDecor,
          decorHeight * textureMultiplier,
          decorWidth,
          texture
      ));
      minX = xRight;
    }
  }

  setDepth(depth: number) {
    this.#depth = depth;
    this.#colorableDecorList.forEach((decor) => {
      decor.setDpeth(depth);
    })
    this.#pnjList.forEach((pnj) => {
      pnj.setDepth(depth + 3);
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
          if (!this.#isPnjHappy && this.#decorFullNb === this.#decorNb) {
            this.#isPnjHappy = true;
            this.#pnjList[0].switchToHappy();
            this.#scene.input.emit('Game:victoire');
          }
        }
        break;
      }
    }
    this.#scene.input.emit('Hud:updateProgressBar', this.getAreaScore());
  }

  getAreaScore(): number {
    return (this.#decorFullNb / this.#decorNb)
  }


}
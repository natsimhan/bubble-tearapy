import ColorableDecorElement from "./ColorableDecorElement.ts";
import * as Phaser from 'phaser';

export default class ColorableDecor {

    protected scene: Phaser.Scene;
    protected elementList: ColorableDecorElement[];
    protected elementBorder?: ColorableDecorElement;
    protected x: number;
    protected y: number;
    protected height: number;
    protected width: number;
    protected depth: number;

    constructor(scene: Phaser.Scene, x: number, y: number, height: number, width: number) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
        this.createElementList();
        this.createElementBorder();
    }

    createElementList(): void {
      this.elementList = [];
    }

    createElementBorder(): void {
      this.elementBorder = undefined;
    }

    getBounds(): Phaser.Geom.Rectangle {
      return this.elementList[0].getBounds();
    }

  setDpeth(depth: number) {
    this.depth = depth;
    this.elementList.forEach((element) => {
      element.setDepth(depth);
    })
    this.elementBorder?.setDepth(depth + 2)
  }

  receiveBubble(color: number, size: number, x: number, y: number): void {
      for (let element of this.elementList) {
        if (element.isPointInElement(x, y)) {
          element.receiveBubble(color, size, x, y);
          break;
        }
      }
  }
}
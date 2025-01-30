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
    protected elementFullNb: number;
    protected isFull: boolean;

    constructor(scene: Phaser.Scene, x: number, y: number, height: number, width: number) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
        this.elementFullNb = 0;
        this.isFull = false;
        this.createElementList();
        this.createElementBorder();
    }

  public getChild():ColorableDecorElement[] {
      if(this.elementBorder) {
        return [...this.elementList, this.elementBorder];
      }
      return this.elementList;
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

  receiveBubble(color: number, size: number, x: number, y: number): boolean {
      if (!this.isFull) {
        for (let element of this.elementList) {
          if (element.isPointInElement(x, y)) {
            if (element.receiveBubble(color, size, x, y)) {
              this.elementFullNb += 1;
            }
            break;
          }
        }
        if (this.elementFullNb === this.elementList.length) {
          this.isFull = true;
        }
        return this.isFull;
      }
    return false;
  }
}
import ColorableDecorElement from "./ColorableDecorElement.ts";

export default class ColorableDecor {

    protected scene: Phaser.Scene;
    protected elementList?: ColorableDecorElement[];
    protected x: number;
    protected y: number;
    protected height: number;
    protected width: number;

    constructor(scene: Phaser.Scene, x: number, y: number, height: number, width: number) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
        this.createElementList();
    }

    createElementList(): void {
      this.elementList = [];
    }
}
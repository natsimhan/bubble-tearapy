import ColorableDecor from "./ColorableDecor.ts";

const building = [
    {
        texture: 'facade',
        height: 0.7,
        width: 1,
        x: 0.5,
        y: 0,
    },
    {
        texture: 'roof',
        height: 0.3,
        width: 1,
        x: 0.5,
        y: -0.7,
    }
]

export default class ColorableArea {

    #scene: Phaser.Scene;
    #colorableDecorList: ColorableDecor[];

    constructor(scene: Phaser.Scene, x: number, y: number) {
        this.#scene = scene;
        this.#colorableDecorList = [];
        this.#colorableDecorList.push( new ColorableDecor(this.#scene, x, y, 300, 100, building));
        this.#colorableDecorList.push( new ColorableDecor(this.#scene, x + 100, y + 100, 200, 200, building));
    }

    create() {
        this.#colorableDecorList.forEach((element) => {
            element.create();
        });
    }

}
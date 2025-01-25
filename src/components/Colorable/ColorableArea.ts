import ColorableDecor from './ColorableDecor/ColorableDecor.ts';
import DecorFactory, {DecorKey} from './ColorableDecor/DecorFactory.ts';

export default class ColorableArea {

    #scene: Phaser.Scene;
    #colorableDecorList: ColorableDecor[];
    #decorFactory: DecorFactory;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        this.#scene = scene;
        this.#decorFactory = new DecorFactory();
        this.#colorableDecorList = [];
        this.#colorableDecorList.push( this.#decorFactory.createDecor(this.#scene, x, y, 300, 100, DecorKey.building));
        this.#colorableDecorList.push( this.#decorFactory.createDecor(this.#scene, x + 100, y + 100, 200, 200, DecorKey.building));
    }
}
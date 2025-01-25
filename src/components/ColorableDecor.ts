import ColorableDecorElement from "./ColorableDecorElement.ts";

interface decorType {
    texture: string;
    height: number;
    width: number;
    x: number;
    y: number;
}

export default class ColorableDecor {

    #scene: Phaser.Scene;
    #elementList?: ColorableDecorElement[];
    #x: number;
    #y: number;
    #height: number;
    #width: number;

    constructor(scene: Phaser.Scene, x: number, y: number, height: number, width: number, decorTypeList: decorType[]) {
        this.#scene = scene;
        this.#x = x;
        this.#y = y;
        this.#height = height;
        this.#width = width;
        this.#elementList = [];

        decorTypeList.forEach((element) => {
            this.#elementList.push(this.constructElementOnPlace(element));
        })

    }

    constructElementOnPlace(element: decorType): ColorableDecorElement {
        return (
            new ColorableDecorElement(
                this.#scene,
                this.#x + this.#width * element.x,
                this.#y + this.#height * element.y,
                element.texture,
                this.#height * element.height,
                this.#width * element.width
            )
        )
    }

    create() {
        console.debug(this.#elementList);
        this.#elementList?.forEach((element) => {
            element.create();
        })
    }


}
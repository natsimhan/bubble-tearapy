import {Scene} from "phaser";
import Button from "../components/Button.ts";

interface CreditsDataType {
  name: string,
  role: string,
  color: string,
}

const PADDING: number = 50;

export default class Credits extends Scene {

  creditsData: CreditsDataType[];

  constructor() {
    super('Credits');
    this.creditsData = [
      {name: 'Jonathan BURON', role: 'Lead & developer', color: '#FF0000'},
      {name: 'Lucie BURON', role: 'Graphic artist', color: '#FF7F00'},
      {name: 'Margaux RIANT', role: 'Developer', color: '#FFFF00'},
      {name: 'Mathis VALERIO', role: 'Sound designer & Compositor', color: '#00FF00'},
      {name: 'Melody MORTIER', role: 'Graphic & Communication', color: '#0000FF'},
      {name: 'Romuald LE CORROLLER', role: 'Developer', color: '#4B0082'},
      {name: 'Valentin FOLASTRE', role: 'Developer', color: '#8B00FF'}
    ];
  }

  create(): void {
    const width = this.scale.width;
    const height = this.scale.height;
    // const speed: number = 2;

    this.creditsData.map((credit: CreditsDataType, index: number) => {
      const creditText = `${credit.name} - ${credit.role}`;
      const text = this.add.text(0, 0, creditText,
          {
            fontFamily: 'Arial Black', fontSize: 25, color: credit.color,
            stroke: '#000000', strokeThickness: 4,
            align: 'center',
          }
      );
      const yGap: number = height * 9 / 100;
      text.setX(index % 2 === 0 ? PADDING : width - text.width - PADDING);
      text.setY((index * yGap) + PADDING);

      this.add.existing(text);
    });

    const mainMenuButton = new Button(this, width / 2, (9 * height) / 10, 'main menu', []);
    this.add.existing(mainMenuButton);
    mainMenuButton.on('pointerup', () => {
      this.scene.start('MainMenu');
    });
  }
}
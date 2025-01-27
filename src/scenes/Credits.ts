import {Scene, Sound} from "phaser";
import Button from "../components/Button.ts";
import {AudioKey, UiConfig} from './Preloader.ts';

interface CreditsDataType {
  name: string,
  role: string,
  color: string,
}

const PADDING: number = 50;

export default class Credits extends Scene {

  music: Sound.BaseSound;
  creditsData: CreditsDataType[];

  constructor() {
    super('Credits');
    this.creditsData = [
      {name: 'Jonathan BURON', role: 'Lead & developer', color: '#FF0000'},
      {name: 'Lucie BURON', role: 'Graphic artist', color: '#FFFF00'},
      {name: 'Margaux RIANT', role: 'Developer', color: '#00FF00'},
      {name: 'Mathis VALERIO', role: 'Sound designer & Compositor', color: '#0000FF'},
      {name: 'Melody MORTIER', role: 'Graphic & Communication', color: '#4B0082'},
      {name: 'Romuald LE CORROLLER', role: 'Developer', color: '#8B00FF'},
      {name: 'Simone BURON', role: 'Happiness manager', color: '#FF7F00'},
      {name: 'Valentin FOLASTRE', role: 'Developer', color: '#FF0000'},
    ];
  }

  create() {
    this.add.image(this.scale.width / 2, this.scale.height / 2, 'bg_end');

    const width = this.scale.width;
    const height = this.scale.height;

    this.music = this.sound.add(AudioKey.musics.cinematique_de_fin, {loop: true, volume: 0.5});
    this.music.play();

    this.creditsData.map((credit: CreditsDataType, index: number) => {
      const creditText = `${credit.name} - ${credit.role}`;
      const text = this.add.text(
          this.scale.width / 2,
          0,
          creditText,
          {
            fontFamily: UiConfig.fontFamily, fontSize: 25, color: '#ffffff',
            stroke: '#000000', strokeThickness: 4,
            align: 'center',
          }
      );
      const yGap: number = height * 9 / 100;
      // text.setX(index % 2 === 0 ? PADDING : width - text.width - PADDING);
      text.setY((index * yGap) + PADDING);
    });

    this.events.once('shutdown', () => {
      this.music.stop();
    });

    const mainMenuButton = new Button(this, width / 2, this.scale.height * .9, 'main menu', []).setScale(.8);
    mainMenuButton.onClickButton('pointerup', () => {
      this.scene.start('MainMenu');
    });
  }
}
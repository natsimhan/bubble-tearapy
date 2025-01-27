import {Scene} from 'phaser';
import {AudioKey, TextureKey, UiConfig} from './Preloader.ts';

const STORY_SLIDES: { texture: string, text: string, duration: number }[] = [
  {
    texture: TextureKey.intro.screen_1,
    text: `Our story begins in a bleak, monochrome world where happiness is nothing but a distant memory...`,
    duration: 10000,
  },
  {
    texture: TextureKey.intro.screen_2,
    text: `One day, our protagonist accidentally invents something extraordinary: a new magic beverage.`,
    duration: 5000,
  },
  {
    texture: TextureKey.intro.screen_3,
    text: `One day, our protagonist accidentally invents something extraordinary: a new magic beverage.`,
    duration: 5000,
  },
  {
    texture: TextureKey.intro.screen_4,
    text: `They name this delightful drink bubble tea and with it comes something extraordinary: color!`,
    duration: 10000,
  },
  {
    texture: TextureKey.intro.screen_5,
    text: `Overwhelmed with excitement, our hero dashes into the streets, eager to share their discovery with the entire town.`,
    duration: 10000,
  },
];


export default class Intro extends Scene {
  private currentSlideIndex = 0;
  private isTransitioning = false;
  private backgroundMusic: Phaser.Sound.BaseSound | null = null;
  private musicStarted = false;

  constructor() {
    super('Intro');
  }

  create(): void {
    this.backgroundMusic = this.sound.add(AudioKey.musics.cinematic_opening, {loop: true, volume: 0.5});
    this.events.once('shutdown', () => {
      this.backgroundMusic?.stop();
    });

    this.showSlide();

    // Permet de passer au slide suivant sur un clic ou une touche
    this.input.on("pointerdown", this.startMusic, this);
    this.input.keyboard?.on("keyup", this.startMusic, this);
  }

  private startMusic() {
    if (!this.musicStarted && this.backgroundMusic) {
      this.backgroundMusic.play();
      this.musicStarted = true;
      return;
    }
    this.nextSlide();
  }

  private showSlide() {
    const slide = STORY_SLIDES[this.currentSlideIndex];

    // Ajout de l'image en fullscreen
    const bg = this.add.image(0, 0, slide.texture).setOrigin(0).setDisplaySize(this.scale.width, this.scale.height);

    // Ajout du rectangle noir en bas
    const rectHeight = this.scale.height / 6;
    const rect = this.add.rectangle(0, this.scale.height - rectHeight, this.scale.width, rectHeight, 0x000000, 0.5).setOrigin(0);

    // Ajout du texte
    const text = this.add
        .text(this.scale.width / 2, this.scale.height - rectHeight / 2, slide.text, {
          fontFamily: UiConfig.fontFamily,
          fontSize: 40,
          color: "#FFFFFF",
          wordWrap: {width: this.scale.width - 20},
        })
        .setOrigin(0.5);

    // Transition au prochain slide après la durée, sauf si interrompu
    this.isTransitioning = false;
    this.time.delayedCall(slide.duration, () => {
      if (!this.isTransitioning) this.nextSlide();
    });
  }

  private nextSlide() {
    if (this.isTransitioning) return;

    this.isTransitioning = true;

    // Supprime le slide actuel
    this.children.removeAll();

    this.currentSlideIndex++;

    if (this.currentSlideIndex < STORY_SLIDES.length) {
      this.showSlide();
    } else {
      this.scene.start("MainMenu");
    }
  }

}
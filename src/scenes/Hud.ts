import {Scene} from 'phaser';
import {TextureKey, UiConfig} from './Preloader.ts';
import ColorList from '../domain/ColorList.ts';

const PROGRESS_BAR_BACKGROUND_COLORS = [
  {
    color: ColorList.h2n('#E32332'),
    asset: TextureKey.hud.background_gauge_0,
  },
  {
    color: ColorList.h2n('#8e17eb'),
    asset: TextureKey.hud.background_gauge_1,
  },
  {
    color: ColorList.h2n('#2fe640'),
    asset: TextureKey.hud.background_gauge_2,
  },
  {
    color: ColorList.h2n('#f8db1b'),
    asset: TextureKey.hud.background_gauge_3,
  },
  {
    color: ColorList.h2n('#f649a8'),
    asset: TextureKey.hud.background_gauge_4,
  }
];

export class Hud extends Scene {
  private timerText: Phaser.GameObjects.Text;
  private progressBar: Phaser.GameObjects.Graphics;
  private progressBarBackground: Phaser.GameObjects.Sprite;
  private timerBackground: Phaser.GameObjects.Sprite;

  private startTime: number = 0;
  private progress: number = 0;

  constructor() {
    super({key: 'Hud', active: false});
  }

  create() {
    this.timerBackground = this.add.sprite(
        this.scale.width * .1,
        this.scale.height * .1,
        TextureKey.hud.timer_background_pink
    );
    this.timerBackground.setScale(this.scale.height / 6 / this.timerBackground.displayHeight);
    this.timerBackground.setOrigin(0.5, 0.5);

    const timerBounds = this.timerBackground.getBounds();

    this.timerText = this.add.text(
        timerBounds.centerX,
        timerBounds.centerY,
        '00:00',
        {
          fontFamily: UiConfig.fontFamily, fontSize: 80, color: '#ffffff',
          stroke: '#000000', strokeThickness: 8,
          align: 'center'
        }
    );
    this.timerText.setOrigin(0.5, 0.5).setScale(timerBounds.height / this.timerText.displayHeight * .4);

    this.progressBar = this.add.graphics();

    this.progressBarBackground = this.add.sprite(
        this.scale.width * .85,
        this.scale.height * .1,
        PROGRESS_BAR_BACKGROUND_COLORS[0].asset
    );
    this.progressBarBackground.setScale(0.4);
    this.progressBarBackground.setOrigin(0.5);


    this.startTime = Date.now();
    this.progress = 0;
    this.updateProgressBar();

    // Pour debug la progress bar sur 30s
    // this.tweens.addCounter({
    //   from: 0,
    //   to: 100,
    //   duration: 10_000,
    //   ease: 'Linear',
    //   onUpdate: (tween) => {
    //     const p = tween.getValue() / 100;
    //     this.updateProgress(p);
    //   },
    // })
  }

  update(time: number) {
    const elapsedTime = Math.floor((Date.now() - this.startTime) / 1000);
    const minutes = Math.floor(elapsedTime / 60);
    const seconds = elapsedTime % 60;

    const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    this.timerText.setText(formattedTime);
  }

  updateProgressBar() {
    this.progressBar.clear();

    // Déterminer l'index et récupérer les données associées
    const index = Math.floor(this.progress * (PROGRESS_BAR_BACKGROUND_COLORS.length - 1));
    const progressData = PROGRESS_BAR_BACKGROUND_COLORS[index];

    // Mettre à jour la texture et les positions spécifiques
    this.progressBarBackground.setTexture(progressData.asset);

    // Dessiner la barre de progression si nécessaire
    if (this.progress > 0) {
      const pBgBounds = this.progressBarBackground.getBounds();

      this.progressBar.fillStyle(progressData.color, 1);
      this.progressBar.fillRoundedRect(
          pBgBounds.left + pBgBounds.width * .25,
          pBgBounds.top + pBgBounds.height * .4,
          pBgBounds.width * .6 * this.progress,
          pBgBounds.height * .2,
          10
      );
    }
  }

  public updateProgressToVictory(percentVictory: number) {
    this.progress = Phaser.Math.Clamp(percentVictory, 0.1, 1);
    this.updateProgressBar();
  }

}

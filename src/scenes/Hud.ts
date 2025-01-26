import {Scene} from 'phaser';
import {TextureKey} from './Preloader.ts';

const TIMMER_POSITION_X = 150;
const TIMMER_POSITION_Y = 60;

const BACKGROUND_PROGRESS_BAR_POSITION_X = 800;
const BACKGROUND_PROGRESS_BAR_POSITION_Y = 70;

const PROGRESS_BAR_POSITION_X = 750;
const PROGRESS_BAR_POSITION_Y = 39;

const PROGRESS_BAR_BACKGROUND_COLORS = [
  {
    color: 0xE32332,
    asset: TextureKey.hud.progress_bar_background_red,
    position: {x: BACKGROUND_PROGRESS_BAR_POSITION_X + 7, y: BACKGROUND_PROGRESS_BAR_POSITION_Y - 3}
  },
  {
    color: 0x8E17EB,
    asset: TextureKey.hud.progress_bar_background_blue,
    position: {x: BACKGROUND_PROGRESS_BAR_POSITION_X + 3, y: BACKGROUND_PROGRESS_BAR_POSITION_Y - 6.4}
  },
  {
    color: 0x2FE640,
    asset: TextureKey.hud.progress_bar_background_green,
    position: {x: BACKGROUND_PROGRESS_BAR_POSITION_X + 8, y: BACKGROUND_PROGRESS_BAR_POSITION_Y - 4}
  },
  {
    color: 0xF649A8,
    asset: TextureKey.hud.progress_bar_background_pink,
    position: {x: BACKGROUND_PROGRESS_BAR_POSITION_X + 8, y: BACKGROUND_PROGRESS_BAR_POSITION_Y - 6}
  },
  {
    color: 0xF8DB1B,
    asset: TextureKey.hud.progress_bar_background_yellow,
    position: {x: BACKGROUND_PROGRESS_BAR_POSITION_X + 11, y: BACKGROUND_PROGRESS_BAR_POSITION_Y}
  }
];

const TIMER_BACKGROUNDS = [
  {time: 0, asset: TextureKey.hud.timer_background_pink},
  {time: 30, asset: TextureKey.hud.timer_background_purple},
  {time: 60, asset: TextureKey.hud.timer_background_blue}
];

export class Hud extends Scene {
  timerText: Phaser.GameObjects.Text;
  progressBar: Phaser.GameObjects.Graphics;
  progressBarBackground: Phaser.GameObjects.Sprite;
  timerBackground: Phaser.GameObjects.Sprite;

  startTime: number = 0;
  progress: number = 0;
  currentTimerAsset: string;

  constructor() {
    super('Hud');
  }

  create() {
    this.timerBackground = this.add.sprite(
        TIMMER_POSITION_X,
        TIMMER_POSITION_Y,
        TIMER_BACKGROUNDS[0].asset
    );
    this.timerBackground.setScale(0.2);
    this.timerBackground.setOrigin(0.5, 0.5);
    this.currentTimerAsset = TIMER_BACKGROUNDS[0].asset;

    this.timerText = this.add.text(
        TIMMER_POSITION_X,
        TIMMER_POSITION_Y,
        '00:00',
        {
          fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
          stroke: '#000000', strokeThickness: 8,
          align: 'center'
        }
    );
    this.timerText.setOrigin(0.5, 0.5);

    this.progressBarBackground = this.add.sprite(
        BACKGROUND_PROGRESS_BAR_POSITION_X,
        BACKGROUND_PROGRESS_BAR_POSITION_Y,
        PROGRESS_BAR_BACKGROUND_COLORS[0].asset
    );
    this.progressBarBackground.setScale(0.3);
    this.progressBarBackground.setOrigin(0.5, 0.5);

    this.progressBar = this.add.graphics();
    this.progressBar.fillStyle(PROGRESS_BAR_BACKGROUND_COLORS[0].color, 1);
    this.updateProgressBar();


    this.startTime = this.time.now;
    this.progress = 0
    ;
    this.updateProgressBar();
  }

  update(time: number) {
    const elapsedTime = Math.floor((time - this.startTime) / 1000);
    const minutes = Math.floor(elapsedTime / 60);
    const seconds = elapsedTime % 60;

    const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    this.timerText.setText(formattedTime);

    this.updateTimerBackground(elapsedTime);
  }

  updateTimerBackground(elapsedTime: number) {
    const timerData = TIMER_BACKGROUNDS.find((data, index) => {
      const nextData = TIMER_BACKGROUNDS[index + 1];
      return elapsedTime >= data.time && (!nextData || elapsedTime < nextData.time);
    }) || TIMER_BACKGROUNDS[0];

    if (this.currentTimerAsset !== timerData.asset) {
      this.currentTimerAsset = timerData.asset;
      this.timerBackground.setTexture(timerData.asset);
    }
  }

  updateProgressBar() {
    this.progressBar.clear();

    // Déterminer l'index et récupérer les données associées
    const index = Math.floor(this.progress * (PROGRESS_BAR_BACKGROUND_COLORS.length - 1));
    const progressData = PROGRESS_BAR_BACKGROUND_COLORS[index];

    // Mettre à jour la texture et les positions spécifiques
    this.progressBar.fillStyle(progressData.color, 1);
    this.progressBarBackground.setTexture(progressData.asset);
    this.progressBarBackground.setPosition(
        progressData.position.x,
        progressData.position.y
    );

    // Dessiner la barre de progression si nécessaire
    if (this.progress > 0) {
      this.progressBar.fillRoundedRect(
          PROGRESS_BAR_POSITION_X,
          PROGRESS_BAR_POSITION_Y,
          this.progress * 225,
          39,
          10
      );
    }
  }

  updateProgress(amount: number) {
    this.progress = Phaser.Math.Clamp(this.progress + amount, 0, 1);
    this.updateProgressBar();
  }

}

import {Scene, Sound} from 'phaser';
import Button from '../components/Button.ts';
import {AudioKey, UiConfig} from './Preloader.ts';

interface ScoreType {
  name: string,
  timeInSec: number,
}

export default class Leaderboard extends Scene {

  music: Sound.BaseSound;

  private width: number;
  private height: number;
  public timer: number = 0;
  private bestScoreText: Phaser.GameObjects.Text;

  constructor() {
    super('Leaderboard');
  }

  init(data: { timer: number; }): void {
    this.timer = data?.timer || 0;
  }

  create() {
    this.add.image(this.scale.width / 2, this.scale.height / 2, 'bg_end');

    this.width = this.scale.width;
    this.height = this.scale.height;

    this.music = this.sound.add(AudioKey.musics.theme_credits, {loop: true, volume: 0.3});
    this.music.play();

    this.bestScoreText = this.add.text(this.scale.width / 2, this.scale.height / 4, 'You\'re in the top 10 !', {
      fontFamily: UiConfig.fontFamily, fontSize: 100, color: '#ffffff',
      stroke: '#000000', strokeThickness: 8,
      align: 'center'
    });
    this.bestScoreText.setOrigin(0.5);
    this.bestScoreText.setVisible(false);

    this.events.once('shutdown', () => {
      this.music.stop();
    });
    if (this.timer && this.isInTop10(this.timer)) {
      this.promptForName();
    } else {
      this.displayLeaderboard();
    }

  }

  displayLeaderboard(): void {
    const mainMenuButton = new Button(this, this.width / 2, (9 * this.height) / 10, 'main menu', []).setScale(.8);
    mainMenuButton.onClickButton('pointerup', () => {
      this.scene.start('MainMenu');
    });

    const scores: ScoreType[] = this.loadScores();

    const title = this.add.text(this.width / 2, (this.height) / 10, 'Leaderboard', {
      fontFamily: UiConfig.fontFamily, fontSize: 100, color: '#ffffff',
      stroke: '#000000', strokeThickness: 8,
      align: 'center'
    }).setOrigin(0.5, 0);
    this.add.existing(title);

    let topY = title.getBounds().bottom * 1.2;

    scores.forEach((score, index) => {
      const rankText = this.add.text(this.width / 2, topY, `${index + 1}. ${score.name} - ${this.formatTime(score.timeInSec)}`, {
        fontFamily: UiConfig.fontFamily, fontSize: 35, color: '#ffffff',
        stroke: '#000000', strokeThickness: 8,
      }).setOrigin(0.5, 0);
      topY += rankText.getBounds().height * 1.2;
      this.add.existing(rankText);
    });
  }

  loadScores(): ScoreType[] {
    const scores = localStorage.getItem('leaderboard');
    if (scores) {
      return JSON.parse(scores);
    }
    return [];
  }

  saveScore(name: string): void {
    const scores = this.loadScores();
    if (scores.length < 10 || this.timer < scores[scores.length - 1].timeInSec) {
      scores.push({name, timeInSec: this.timer});
      scores.sort((a, b) => a.timeInSec - b.timeInSec);
      if (scores.length > 10) {
        scores.pop();
      }
      localStorage.setItem('leaderboard', JSON.stringify(scores));
    }
    this.displayLeaderboard();
  }

  formatTime(sec: number): string {
    const minutes = Math.floor(sec / 60);
    const seconds = Math.floor(sec % 60);
    return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  }

  isInTop10(timeInSec: number): boolean {
    const scores = this.loadScores();
    return scores.length < 10 || timeInSec < scores[scores.length - 1].timeInSec;
  }

  promptForName() {
    //todo A voir pour peux etre enregistré le player session car du coup a chque fois il va redemander de mettre un pseudo
    this.bestScoreText.setVisible(true);
    this.sound.add(AudioKey.effects.nouveau_record, {volume: 1}).play();

    // Créer un input DOM temporaire
    const div = document.createElement("div");
    div.id = "centered-block";
    div.innerHTML = `
      <div style="
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        width: 100vw;
        position: fixed;
        top: 0;
        left: 0;
      ">
        <input id="centered-input" type="text" style="
          padding: 10px;
          font-size: 32px;
          font-family: ${UiConfig.fontFamily};
          border: 1px solid #ccc;
          border-radius: 4px;
          outline: none;
        " placeholder="Your name...">
      </div>
    `;
    document.body.appendChild(div);
    setTimeout(() => document.getElementById("centered-input")?.focus(), 300);

    // Créer les boutons
    const submitButton = new Button(this, this.scale.width / 2, this.scale.height * .75, 'Submit', []);

    submitButton.onClickButton('pointerup', () => {
      this.submitForm(submitButton);
    });

    this.input.keyboard?.on('keyup', (event: KeyboardEvent) => {
      if (event.code === 'Enter') {
        this.submitForm(submitButton);
      }
    });
  }

  private submitForm(submitButton: Button) {
    const input = document.getElementById("centered-input");
    const enteredName = (input ? input.value.trim() : null) || 'Player';
    // Retirer l'input DOM
    const div = document.getElementById("centered-block");
    if (div) {
      div.remove();
    }
    submitButton.setVisible(false);
    this.bestScoreText.setVisible(false);
    this.saveScore(enteredName);
  }
}

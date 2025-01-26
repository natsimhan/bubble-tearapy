import {Scene, Sound} from 'phaser';
import Button from '../components/Button.ts';

interface ScoreType {
  name: string,
  timeInSec: number,
}

export default class Leaderboard extends Scene {

  music: Sound.BaseSound;

  private width: number;
  private height: number;

  constructor() {
    super('Leaderboard');
  }

  preload() {
    this.load.audio('cinematic_opening', 'music/cinematic_opening.ogg');
  }

  create() {
    this.width = this.scale.width;
    this.height = this.scale.height;

    this.music = this.sound.add('cinematic_opening', {loop: true, volume: 0.5});
    this.music.play();

    const randomTime = this.registry.get('timer');

    this.events.once('shutdown', () => {
      this.music.stop();
    });

    if (this.isInTop10(randomTime)) {
      this.promptForName((name: string) => {
        this.saveScoreToLeaderboard(name, randomTime);
      });
    } else {
      this.displayLeaderboard();
    }

  }

  saveScoreToLeaderboard(name: string, timeInMs: number) {
    this.saveScore(name, timeInMs);
  }

  displayLeaderboard(): void {
    const mainMenuButton = new Button(this, this.width / 2, (9 * this.height) / 10, 'main menu', []);
    mainMenuButton.onClickButton('pointerup', () => {
      this.scene.start('MainMenu');
    });

    const scores: ScoreType[] = this.loadScores();

    const title = this.add.text(this.width / 2, (this.height) / 10, 'Leaderboard', {
      fontFamily: 'Arial', fontSize: 32, color: '#ffffff', align: 'center'
    }).setOrigin(0.5, 0);
    this.add.existing(title);

    scores.forEach((score, index) => {
      const rankText = this.add.text(this.width / 2, title.y * 2 + index * 40, `${index + 1}. ${score.name} - ${this.formatTime(score.timeInSec)}`, {
        fontFamily: 'Arial', fontSize: 24, color: '#ffffff'
      }).setOrigin(0.5, 0);
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

  saveScore(name: string, timeInSec: number): void {
    const scores = this.loadScores();
    if (scores.length < 10 || timeInSec < scores[scores.length - 1].timeInSec) {
      scores.push({name, timeInSec: timeInSec});
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

  promptForName(callback: (name: string) => void) {
    //todo A voir pour peux etre enregistré le player session car du coup a chque fois il va redemander de mettre un pseudo

    const width = this.scale.width;
    const height = this.scale.height;

    // Créer un input DOM temporaire
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Your name';
    input.style.position = 'absolute';
    input.style.left = `${(width) / 2}px`; // Centrer horizontalement
    input.style.top = `${(2 * height) / 5}px`; // Position verticale
    input.style.zIndex = String(10);
    document.body.appendChild(input);

    // Créer les boutons
    const submitButton = new Button(this, (width) / 2, (2 * height) / 3.5, 'Submit', []);

    const skipButton = new Button(this, (width) / 2, (2 * height) / 2.5, 'Continue without submitting', []);

    submitButton.onClickButton('pointerup', () => {
      const enteredName = input.value.trim() || 'Player';
      callback(enteredName);
      input.remove(); // Retirer l'input DOM
      submitButton.setVisible(false);
      skipButton.setVisible(false);
    });

    skipButton.onClickButton('pointerup', () => {
      this.displayLeaderboard();
      input.remove(); // Retirer l'input DOM
      submitButton.setVisible(false);
      skipButton.setVisible(false);
    });
  }
}

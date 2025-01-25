import {Scene} from 'phaser';
import Button from '../components/Button.ts';

interface ScoreType {
  name: string,
  timeInSec: number,
}

export default class Leaderboard extends Scene {

  private width: number;
  private height: number;

  constructor() {
    super('Leaderboard');
  }

  create() {
    this.width = this.scale.width;
    this.height = this.scale.height;
    this.displayLeaderboard();
    const mainMenuButton = new Button(this, this.width / 2, (9 * this.height) / 10, 'main menu', []);
    this.add.existing(mainMenuButton);
    mainMenuButton.onClickButton('pointerup', () => {
      this.scene.start('MainMenu');
    });
  }

  displayLeaderboard(): void {
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
}
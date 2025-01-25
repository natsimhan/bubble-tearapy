import {Scene} from 'phaser';
import Leaderboard from './Leaderboard.ts';

export class GameOver extends Scene {
  camera: Phaser.Cameras.Scene2D.Camera;
  background: Phaser.GameObjects.Image;
  gameover_text: Phaser.GameObjects.Text;

  constructor() {
    super('GameOver');
  }

  create() {
    this.camera = this.cameras.main
    this.camera.setBackgroundColor(0xff0000);

    this.background = this.add.image(512, 384, 'background');
    this.background.setAlpha(0.5);

    this.gameover_text = this.add.text(512, 384, 'Game Over', {
      fontFamily: 'Arial Black', fontSize: 64, color: '#ffffff',
      stroke: '#000000', strokeThickness: 8,
      align: 'center'
    });
    this.gameover_text.setOrigin(0.5);

    this.input.once('pointerdown', () => {
      const randomName = this.generateRandomName();
      const randomTime = this.generateRandomTime();
      this.saveScoreToLeaderboard(randomName, randomTime);

      this.scene.start('MainMenu');
    });
  }

  saveScoreToLeaderboard(name: string, timeInMs: number) {
    const leaderboardScene = this.scene.get('Leaderboard') as Leaderboard;
    if (leaderboardScene) {
      leaderboardScene.saveScore(name, timeInMs);
    }
  }

  generateRandomName(): string {
    const names = ['Alice', 'Bob', 'Charlie', 'David', 'Eve', 'Frank', 'Grace', 'Hannah', 'Ivy', 'Jack'];
    return names[Math.floor(Math.random() * names.length)];
  }

  generateRandomTime(): number {
    const minTime = 5;
    const maxTime = 3000;
    return Math.floor(Math.random() * (maxTime - minTime + 1)) + minTime;
  }
}

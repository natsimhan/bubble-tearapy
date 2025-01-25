import {Scene} from 'phaser';
import Leaderboard from './Leaderboard.ts';

export class GameOver extends Scene {
  camera: Phaser.Cameras.Scene2D.Camera;
  background: Phaser.GameObjects.Image;
  gameover_text: Phaser.GameObjects.Text;
  private timer!: number;

  constructor() {
    super('GameOver');
  }

  init(data: { timer: any; }): void {
    this.timer = data.timer;
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

      const leaderboardScene = this.scene.get('Leaderboard') as Leaderboard;
      if (leaderboardScene && leaderboardScene.isInTop10(randomTime)) {
        this.promptForName((name: string) => {
          this.saveScoreToLeaderboard(name, randomTime);
          this.scene.start('MainMenu');
        });
      } else {
        this.saveScoreToLeaderboard(randomName, randomTime);
        this.scene.start('MainMenu');
      }
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

  promptForName(callback: (name: string) => void) {
    //todo A voir pour peux etre enregistré le player session car du coup a chque fois il va redemander de mettre un pseudo
    // un peu de css sera a faire pour l'input et le button
    const nameInput = this.add.dom(this.scale.width / 2, this.scale.height / 2).createFromHTML(`
      <div style="position: absolute; z-index: 10; display: flex; justify-content: center; align-items: center;">
        <input type="text" id="name-input" placeholder="Enter your name" style="font-size: 32px; padding: 5px; width: 300px;" />
        <button id="submit-button" style="font-size: 32px; margin-top: 10px;">Submit</button>
      </div>
    `);

    const button = nameInput.node.querySelector('#submit-button') as HTMLButtonElement;
    const inputField = nameInput.node.querySelector('#name-input') as HTMLInputElement;

    button.addEventListener('click', () => {
      const enteredName = inputField.value.trim() || 'Player';
      callback(enteredName);
      nameInput.setVisible(false);
    });

    nameInput.setDepth(20);
  }
}

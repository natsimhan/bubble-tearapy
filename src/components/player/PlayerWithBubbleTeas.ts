import PlayerCharacter from './PlayerCharacter.ts';
import BubbleTea from '../bubbletea/BubbleTea.ts';

export default class PlayerWithBubbleTeas {
  private readonly playerCharacter: PlayerCharacter;
  private readonly bubbleTeaActifList: BubbleTea[];
  private readonly bubbleTeaStockList: BubbleTea[];

  constructor(private scene: Phaser.Scene, private x: number, private y: number) {
    this.bubbleTeaActifList = [];
    this.bubbleTeaStockList = [];

    this.bubbleTeaStockList.push(new BubbleTea(this.scene, 0, 0, this.getRandomColor(), true));
    this.bubbleTeaStockList.push(new BubbleTea(this.scene, 0, 0, this.getRandomColor(), true));
    this.bubbleTeaStockList.push(new BubbleTea(this.scene, 0, 0, this.getRandomColor(), true));

    this.bubbleTeaActifList.push(new BubbleTea(this.scene, 0, 0, this.getRandomColor(), false));
    this.bubbleTeaActifList.push(new BubbleTea(this.scene, 0, 0, this.getRandomColor(), false));
    this.bubbleTeaActifList.push(new BubbleTea(this.scene, 0, 0, this.getRandomColor(), false));

    this.playerCharacter = new PlayerCharacter(this.scene, this.x + 400, this.y);

    this.move(x, y);
  }

  public getX(): number {
    return this.x;
  }

  public getY(): number {
    return this.y;
  }

  public move(x: number, y: number) {
    this.x = x;
    this.y = y;

    this.playerCharacter.setPosition(this.x, this.y);

    this.bubbleTeaStockList[0]?.move(this.playerCharacter.x + this.playerCharacter.getPlayerImageBounds().width * .699, this.playerCharacter.getPlayerImageBounds().height * 1.91);
    this.bubbleTeaStockList[1]?.move(this.playerCharacter.x + this.playerCharacter.getPlayerImageBounds().width * .8745, this.playerCharacter.getPlayerImageBounds().height * 1.91);
    this.bubbleTeaStockList[2]?.move(this.playerCharacter.x + this.playerCharacter.getPlayerImageBounds().width * 1.05, this.playerCharacter.getPlayerImageBounds().height * 1.91);

    this.bubbleTeaActifList[0]?.move(this.playerCharacter.x + this.playerCharacter.getPlayerImageBounds().width * .699, this.playerCharacter.getPlayerImageBounds().height * 1.727);
    this.bubbleTeaActifList[1]?.move(this.playerCharacter.x + this.playerCharacter.getPlayerImageBounds().width * .8745, this.playerCharacter.getPlayerImageBounds().height * 1.727);
    this.bubbleTeaActifList[2]?.move(this.playerCharacter.x + this.playerCharacter.getPlayerImageBounds().width * 1.05, this.playerCharacter.getPlayerImageBounds().height * 1.727);
  }

  public setHeight(height: number) {
    this.playerCharacter.setHeight(height);
    this.move(this.x, this.y);
    for (const bubbleTea of [...this.bubbleTeaActifList, ...this.bubbleTeaStockList]) {
      bubbleTea.setHeight(height * .17);
    }
  }


  private getRandomColor(): number {
    // Génère une couleur aléatoire entre 0x000000 et 0xFFFFFF
    return Math.floor(Math.random() * 0xFFFFFF);
  }
}
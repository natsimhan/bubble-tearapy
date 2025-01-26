import PlayerCharacter from './PlayerCharacter.ts';
import BubbleTea from '../bubbletea/BubbleTea.ts';

export default class PlayerWithBubbleTeas {
  private readonly playerCharacter: PlayerCharacter;
  private readonly bubbleTeaActifList: BubbleTea[];
  private readonly bubbleTeaStockList: BubbleTea[];

  constructor(private scene: Phaser.Scene, private x: number, private y: number) {
    this.bubbleTeaActifList = [];
    this.bubbleTeaStockList = [];

    this.bubbleTeaStockList.push(new BubbleTea(this.scene, 0, 0, null));
    this.bubbleTeaStockList.push(new BubbleTea(this.scene, 0, 0, null));
    this.bubbleTeaStockList.push(new BubbleTea(this.scene, 0, 0, null));

    this.bubbleTeaActifList.push(new BubbleTea(this.scene, 0, 0, this.bubbleTeaStockList[0]));
    this.bubbleTeaActifList.push(new BubbleTea(this.scene, 0, 0, this.bubbleTeaStockList[1]));
    this.bubbleTeaActifList.push(new BubbleTea(this.scene, 0, 0, this.bubbleTeaStockList[2]));

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
    for (const bubbleTea of [...this.bubbleTeaActifList, ...this.bubbleTeaStockList]) {
      bubbleTea.setHeight(height * .17);
    }
    this.move(this.x, this.y);
  }

}
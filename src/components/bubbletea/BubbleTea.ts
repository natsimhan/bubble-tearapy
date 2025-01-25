import {TextureKey} from '../../scenes/Preloader.ts';

export default class BubbleTea {
  private readonly teaImage: Phaser.GameObjects.Image;
  private readonly maskImage: Phaser.GameObjects.Image;
  private readonly teaMask: Phaser.Display.Masks.BitmapMask;
  private readonly cupImage: Phaser.GameObjects.Image;
  private readonly coverImage: Phaser.GameObjects.Image;

  private drinkLevel: number = 1;

  constructor(private readonly scene: Phaser.Scene, private x: number, private y: number, private color: number, private withCover: boolean = false) {
    this.teaImage = this.scene.add.image(0, 0, TextureKey.bubbletea.bubbletea).setOrigin(.5, 1);
    this.cupImage = this.scene.add.image(0, 0, TextureKey.bubbletea.cup).setOrigin(.5, 1);
    this.coverImage = this.scene.add.image(0, 0, TextureKey.bubbletea.cup_cover).setOrigin(.5, 0.5);
    this.coverImage.setAlpha(withCover ? 1 : 0);

    this.maskImage = this.scene.make.image({
      x: 0,
      y: 0,
      key: TextureKey.bubbletea.cup_mask,
      add: false,
    }).setOrigin(.5, 1);

    this.teaMask = this.maskImage.createBitmapMask();
    this.teaImage.setMask(this.teaMask);

    this.move(x, y);
    this.setTint(color);
  }

  public setDrinkLevel(level: number, duration: number) {
    this.scene.tweens.add({
      targets: this.teaImage,
      y: this.y + level * this.teaImage.displayHeight,
      duration,
      onComplete: () => {
        this.drinkLevel = level;
      }
    })
  }

  public hasCover(): boolean {
    return this.withCover;
  }

  public getColor(): number {
    return this.color;
  }

  public getDrinkLevel(): number {
    return this.drinkLevel;
  }

  public setDepth(depth: number) {
    this.teaImage.setDepth(depth);
    this.cupImage.setDepth(depth + 1);
    this.coverImage.setDepth(depth + 2);
  }

  public move(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.teaImage.setPosition(this.x, this.y);
    this.maskImage.setPosition(this.x, this.y);
    this.cupImage.setPosition(this.x, this.y);
    this.coverImage.setPosition(this.x, this.y - this.cupImage.displayHeight);
  }

  public setHeight(height: number) {
    this.teaImage.setScale(height / this.teaImage.height);
    this.maskImage.setScale(this.teaImage.scale);
    this.cupImage.setScale(this.teaImage.scale);
    this.coverImage.setScale(this.teaImage.scale);
    this.coverImage.setPosition(this.x, this.y - this.cupImage.displayHeight);
  }

  public setTint(color: number) {
    this.teaImage.setTint(color);
  }
}
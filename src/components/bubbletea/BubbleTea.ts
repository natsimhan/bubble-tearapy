import {AudioKey, TextureKey} from '../../scenes/Preloader.ts';
import ColorList from '../../domain/ColorList.ts';
import Phaser from 'phaser';

export default class BubbleTea {
  private readonly teaImage: Phaser.GameObjects.Image;
  private readonly maskImage: Phaser.GameObjects.Image;
  private readonly teaMask: Phaser.Display.Masks.BitmapMask;
  private readonly cupImage: Phaser.GameObjects.Image;
  private readonly coverImage: Phaser.GameObjects.Image;
  private color: number = 0xffffff;

  private drinkLevel: number = 1;

  constructor(private readonly scene: Phaser.Scene, private x: number, private y: number, private bubbleTeaStock: BubbleTea | null) {
    this.teaImage = this.scene.add.image(0, 0, TextureKey.bubbletea.bubbletea).setOrigin(.5, 1);
    this.cupImage = this.scene.add.image(0, 0, TextureKey.bubbletea.cup).setOrigin(.5, 1);
    this.coverImage = this.scene.add.image(0, 0, TextureKey.bubbletea.cup_cover).setOrigin(.5, 0.5);
    this.coverImage.setAlpha(this.bubbleTeaStock ? 0 : 1);

    this.maskImage = this.scene.make.image({
      x: 0,
      y: 0,
      key: TextureKey.bubbletea.cup_mask,
      add: false,
    }).setOrigin(.5, 1);

    this.teaMask = this.maskImage.createBitmapMask();
    this.teaImage.setMask(this.teaMask);

    if (bubbleTeaStock) {
      this.cupImage.setInteractive(this.scene.input.makePixelPerfect()).on('pointerup', () => {
        this.scene.input.emit('PlayerLeftHand:sarbapailleImage:tint', this);
      })
    }

    this.move(x, y);
    this.setTint(ColorList.getRandomColor());
  }

  public shakeMeAnimation(): void {
    const startX = this.x;
    const startY = this.y;
    const shakeWidth = this.teaImage.getBounds().width * .1;
    const shakeWidthDiv2 = shakeWidth / 2;
    this.scene.tweens.addCounter({
      from: 0,
      to: 100,
      duration: 50,
      repeat: 5,
      yoyo: true,
      ease: 'Linear',
      onUpdate: (tween) => {
        const t = tween.getValue() / 100;
        const x = startX + (-shakeWidthDiv2 + t * shakeWidth);
        const y = startY;
        this.move(x, y);
      },
      onComplete: () => {
        // Remet l'élément à sa position initiale après le shake
        const x = startX;
        const y = startY;
        this.move(x, y);
      },
    });

  }

  public hasCover(): boolean {
    return !(this.bubbleTeaStock instanceof BubbleTea);
  }

  public getColor(): number {
    return this.color;
  }

  public getDrinkLevel(): number {
    return this.drinkLevel;
  }

  public drink(): boolean {
    if (this.drinkLevel <= 0) {
      return false;
    }
    this.scene.sound.add(AudioKey.effects.sarbapaille_aspiration, {volume: 1}).play();
    const newLevel = Math.max(0, this.drinkLevel - .5);
    this.scene.tweens.add({
      targets: this.teaImage,
      y: this.y + (1 - newLevel) * this.teaImage.displayHeight,
      duration: 300,
      onComplete: () => {
        this.drinkLevel = newLevel;
        if (this.drinkLevel <= 0 && this.bubbleTeaStock) {
          this.scene.time.addEvent({
            delay: 2000,
            callback: () => {
              if (this.bubbleTeaStock) {
                this.setTint(this.bubbleTeaStock.takeMe());
              }
            }
          });
        }
      }
    })
    return true;
  }

  public setDepth(depth: number) {
    this.teaImage.setDepth(depth);
    this.cupImage.setDepth(depth + 1);
    this.coverImage.setDepth(depth + 2);
  }

  public move(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.teaImage.setPosition(this.x, this.y + (1 - this.drinkLevel) * this.teaImage.displayHeight);
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

  private setTint(color: number) {
    this.color = color;
    this.teaImage.setTint(this.color);
    if (this.drinkLevel < 1) {
      this.scene.sound.add(AudioKey.effects.bubbletea_remplissage, {volume: .8}).play();
      this.scene.tweens.add({
        targets: this.teaImage,
        y: this.y,
        duration: 300,
        onComplete: () => {
          this.drinkLevel = 1;
        }
      })
    }
  }

  public takeMe(): number {
    const oldColor = this.color;
    do {
      this.color = ColorList.getRandomColor();
    } while (this.color === oldColor);
    this.setTint(this.color);
    return oldColor;
  }
}
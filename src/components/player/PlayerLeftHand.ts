import {TextureKey} from '../../scenes/Preloader.ts';
import BubbleTea from '../bubbletea/BubbleTea.ts';
import PlayerCharacter from './PlayerCharacter.ts';

// Durée minimale pour un appui long en ms
const LONG_PRESSURE_DURATION = 500;

export default class PlayerLeftHand extends Phaser.GameObjects.Container {
  private readonly playerHandBackImage: Phaser.GameObjects.Image;
  private readonly playerHandFrontImage: Phaser.GameObjects.Image;
  private readonly sarbapailleImage: Phaser.GameObjects.Image;
  private currentBubbleTea: BubbleTea | null = null;
  private shotCounter: number = 0;
  private shotPower: number = 1;
  private longPressTimer: Phaser.Time.TimerEvent | null = null;
  private shotColor: number = 0xffffff;


  constructor(scene: Phaser.Scene, x: number, y: number, private playerCharacter: PlayerCharacter) {
    super(scene, x, y);

    const textureSizes = {
      player_hand_back: this.scene.textures.get(TextureKey.player.player_hand_back).get(),
    };

    this.playerHandBackImage = this.scene.add.image(0, 0, TextureKey.player.player_hand_back);
    this.sarbapailleImage = this.scene.add.image(textureSizes.player_hand_back.width * -.999, textureSizes.player_hand_back.height * .0799, TextureKey.player.sarbapaille).setOrigin(0, .5);
    this.sarbapailleImage.setRotation(Phaser.Math.DegToRad(-10));
    this.playerHandFrontImage = this.scene.add.image(textureSizes.player_hand_back.width * -0.1, textureSizes.player_hand_back.height * -0.2, TextureKey.player.player_hand_front);

    this.scene.input.on('PlayerLeftHand:sarbapailleImage:tint', (bubbleTea: BubbleTea) => {
      if (this.shotCounter) {
        bubbleTea.shakeMeAnimation();
        return;
      }
      if (!bubbleTea.drink()) {
        this.updateGauge(true);
        return;
      }
      this.shotCounter = 5;
      this.currentBubbleTea = bubbleTea;
      this.shotColor = this.currentBubbleTea.getColor();
      this.updateGauge();
    })

    this.scene.input.on('pointerdown', () => {
      this.longPressureMorePower();
    });

    this.scene.input.on('pointerup', (pointer: Phaser.Input.Pointer) => this.onPointerUp(pointer));

    this.add([
      this.playerHandBackImage,
      this.sarbapailleImage,
      this.playerHandFrontImage,
      // this.scene.add.circle(0, 0, 10, 0xff0000)
    ]);
    this.scene.add.existing(this);
  }

  private longPressureMorePower() {
    // Démarrer un timer pour détecter un appui long
    this.longPressTimer = this.scene.time.addEvent({
      delay: LONG_PRESSURE_DURATION,
      callback: () => {
        this.shotPower++;
        if (this.shotCounter < this.shotPower) {
          this.shotPower = this.shotCounter;
          return;
        }
        this.longPressureMorePower();
      },
    });
  }

  private onPointerUp(pointer: Phaser.Input.Pointer) {
    // Annuler le timer si le pointer est relâché avant le délai
    if (this.longPressTimer) {
      this.longPressTimer.remove();
      this.longPressTimer = null;
    }
    const worldPoint = this.scene.cameras.main.getWorldPoint(pointer.x, pointer.y);
    const containerMatrix = this.sarbapailleImage.getWorldTransformMatrix();
    const originX = containerMatrix.tx;
    const originY = containerMatrix.ty;
    if (worldPoint.x > this.playerCharacter.getPlayerImageBounds().right) {
      if (!this.currentBubbleTea || this.shotCounter <= 0) {
        this.updateGauge(true);
        return;
      }
      this.shotCounter -= this.shotPower;
      this.updateGauge();
      const finalPower = this.shotPower;
      this.shotPower = 1;

      const ball = this.scene.add.circle(originX, originY, 5, this.shotColor).setDepth(1);

      const distance = Phaser.Math.Distance.Between(originX, originY, worldPoint.x, worldPoint.y);
      const duration = Phaser.Math.Clamp(distance * 2, 300, 1000);

      this.scene.tweens.add({
        targets: ball,
        scale: 2 * finalPower,
        x: worldPoint.x,
        y: worldPoint.y,
        duration: duration,
        ease: 'Cubic.easeOut',
        onComplete: () => {
          this.scene.tweens.add({
            targets: ball,
            scale: 5 * finalPower,
            x: worldPoint.x - this.scene.scale.width / 2,
            alpha: 0,
            duration: 1000,
            ease: 'Linear',
            onComplete: () => {
              ball.destroy();
            },
          });
        },
      });
    }
  }

  private updateGauge(reset: boolean = false): void {
    if (reset) {
      this.currentBubbleTea = null;
      this.shotColor = 0xffffff;
      this.shotCounter = 0;
      this.shotPower = 1;
    }
    const topLeft = this.shotCounter > 0 ? this.shotColor : 0xffffff;
    const topRight = this.shotCounter > 3 ? this.shotColor : 0xffffff;
    const bottomLeft = this.shotCounter > 1 ? this.shotColor : 0xffffff;
    const bottomRight = this.shotCounter > 2 ? this.shotColor : 0xffffff;
    this.sarbapailleImage.setTint(
        topLeft,
        topRight,
        bottomLeft,
        bottomRight,
    );
  }
}
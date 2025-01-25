import {TextureKey} from '../../scenes/Preloader.ts';
import PlayerLeftHand from './PlayerLeftHand.ts';

export default class PlayerLeftArm extends Phaser.GameObjects.Container {
  private readonly playerArmBackImage: Phaser.GameObjects.Image;
  private readonly playerLeftHand: PlayerLeftHand;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);

    const textureSizes = {
      player_arm_back: this.scene.textures.get(TextureKey.player.player_arm_back).get(),
    };

    this.playerArmBackImage = this.scene.add.image(textureSizes.player_arm_back.width * -0.1499, textureSizes.player_arm_back.height * 0.2, TextureKey.player.player_arm_back).setOrigin(0, 1);
    this.playerLeftHand = new PlayerLeftHand(this.scene, textureSizes.player_arm_back.width * 0.73, textureSizes.player_arm_back.height * -0.6399);

    this.scene.tweens.add({
      targets: this.playerLeftHand,
      angle: {from: -30, to: 60},
      duration: 1000,
      ease: 'Linear',
      repeat: -1,
      yoyo: true
    });

    this.add([
      this.playerArmBackImage,
      this.playerLeftHand,
      // this.scene.add.circle(0, 0, 10, 0xff0000)
    ]);
    this.scene.add.existing(this);

  }
}
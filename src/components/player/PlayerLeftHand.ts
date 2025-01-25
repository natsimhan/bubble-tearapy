import {TextureKey} from '../../scenes/Preloader.ts';

export default class PlayerLeftHand extends Phaser.GameObjects.Container {
  private readonly playerHandBackImage: Phaser.GameObjects.Image;
  private readonly playerHandFrontImage: Phaser.GameObjects.Image;
  private readonly sarbapailleImage: Phaser.GameObjects.Image;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);

    const textureSizes = {
      player_hand_back: this.scene.textures.get(TextureKey.player.player_hand_back).get(),
    };

    this.playerHandBackImage = this.scene.add.image(textureSizes.player_hand_back.width * 0, textureSizes.player_hand_back.height * 0, TextureKey.player.player_hand_back);
    this.sarbapailleImage = this.scene.add.image(textureSizes.player_hand_back.width * -.999, textureSizes.player_hand_back.height * .0799, TextureKey.player.sarbapaille).setOrigin(0, .5);
    this.sarbapailleImage.setRotation(-10 * Math.PI / 180);
    this.playerHandFrontImage = this.scene.add.image(textureSizes.player_hand_back.width * -0.1, textureSizes.player_hand_back.height * -0.2, TextureKey.player.player_hand_front);

    this.add([
      this.playerHandBackImage,
      this.sarbapailleImage,
      this.playerHandFrontImage,
      // this.scene.add.circle(0, 0, 10, 0xff0000)
    ]);
    this.scene.add.existing(this);

  }
}
import {TextureKey} from '../../scenes/Preloader.ts';
import PlayerLeftHand from './PlayerLeftHand.ts';
import PlayerCharacter from './PlayerCharacter.ts';

export default class PlayerLeftArm extends Phaser.GameObjects.Container {
  private readonly playerArmBackImage: Phaser.GameObjects.Image;
  private readonly playerLeftHand: PlayerLeftHand;

  constructor(scene: Phaser.Scene, x: number, y: number, private playerCharacter:PlayerCharacter) {
    super(scene, x, y);

    const textureSizes = {
      player_arm_back: this.scene.textures.get(TextureKey.player.player_arm_back).get(),
    };

    this.playerArmBackImage = this.scene.add.image(textureSizes.player_arm_back.width * -0.1499, textureSizes.player_arm_back.height * 0.2, TextureKey.player.player_arm_back).setOrigin(0, 1);
    this.playerLeftHand = new PlayerLeftHand(this.scene, textureSizes.player_arm_back.width * 0.73, textureSizes.player_arm_back.height * -0.6399, this.playerCharacter);

    this.scene.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
      const worldPoint = this.scene.cameras.main.getWorldPoint(pointer.x, pointer.y);
      const containerMatrix = this.playerLeftHand.getWorldTransformMatrix();
      const originX = containerMatrix.tx;
      const originY = containerMatrix.ty;
      if (worldPoint.x > originX + this.scene.scale.width * .1) {
        const angle = Phaser.Math.Angle.Between(originX, originY, worldPoint.x, worldPoint.y);
        this.playerLeftHand.setRotation(angle + Phaser.Math.DegToRad(10));
      }
    });

    this.add([
      this.playerArmBackImage,
      this.playerLeftHand,
      // this.scene.add.circle(0, 0, 10, 0xff0000)
    ]);
    this.scene.add.existing(this);

  }
}
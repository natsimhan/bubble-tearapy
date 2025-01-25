import {TextureKey} from '../../scenes/Preloader.ts';
import PlayerLeftArm from './PlayerLeftArm.ts';

export default class PlayerCharacter extends Phaser.GameObjects.Container {
  private readonly playerLeftArm: PlayerLeftArm;
  private readonly bikeArmImage: Phaser.GameObjects.Image;
  private readonly bikeWheelImageLeft: Phaser.GameObjects.Image;
  private readonly bikeWheelImageRight: Phaser.GameObjects.Image;
  private readonly playerImage: Phaser.GameObjects.Image;
  private readonly playerLegLeftDownImage: Phaser.GameObjects.Image;
  private readonly playerLegLeftUpImage: Phaser.GameObjects.Image;
  private readonly playerLegRightDownImage: Phaser.GameObjects.Image;
  private readonly playerLegRightUpImage: Phaser.GameObjects.Image;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);

    const textureSizes = {
      player: this.scene.textures.get(TextureKey.player.player).get(),
      bike_wheel: this.scene.textures.get(TextureKey.player.bike_wheel).get(),
    };

    this.playerLeftArm = new PlayerLeftArm(this.scene, textureSizes.player.width * 0.32, textureSizes.player.height * -0.69);

    this.playerLegLeftDownImage = this.scene.add.image(textureSizes.player.width * 0.37, textureSizes.player.height * -0.32, TextureKey.player.player_leg_left_down).setVisible(false);
    this.playerLegLeftUpImage = this.scene.add.image(textureSizes.player.width * 0.362, textureSizes.player.height * -0.406, TextureKey.player.player_leg_left_up);

    this.bikeWheelImageLeft = this.scene.add.image(textureSizes.bike_wheel.width / 2, -textureSizes.bike_wheel.width / 2, TextureKey.player.bike_wheel);
    this.playerImage = this.scene.add.image(textureSizes.player.width * 0.143999, -textureSizes.player.height * 0.093, TextureKey.player.player).setOrigin(0, 1);
    this.bikeWheelImageRight = this.scene.add.image(0, 0, TextureKey.player.bike_wheel).setScale(.86);
    this.bikeWheelImageRight.setPosition(textureSizes.player.width * 0.92599, -textureSizes.player.height * 0.14299);
    this.bikeArmImage = this.scene.add.image(textureSizes.player.width * 0.68699, -textureSizes.player.height * 0.247, TextureKey.player.bike_arm);

    this.playerLegRightDownImage = this.scene.add.image(textureSizes.player.width * 0.37, textureSizes.player.height * -0.30, TextureKey.player.player_leg_right_down);
    this.playerLegRightUpImage = this.scene.add.image(textureSizes.player.width * 0.38, textureSizes.player.height * -0.35, TextureKey.player.player_leg_right_up).setVisible(false);

    this.scene.tweens.add({
      targets:         this.bikeWheelImageLeft,
      angle: 360,
      duration: 2000,
      ease: 'Linear',
      repeat: -1
    })
    this.scene.tweens.add({
      targets:         this.bikeWheelImageRight,
      angle: {from:-180, to: 180},
      duration: 2000,
      ease: 'Linear',
      repeat: -1
    })

    this.scene.time.addEvent({
      delay: 500,
      loop: true,
      callback: () => {
        this.playerLegLeftDownImage.setVisible(!this.playerLegLeftDownImage.visible);
        this.playerLegLeftUpImage.setVisible(!this.playerLegLeftUpImage.visible);
        this.playerLegRightUpImage.setVisible(!this.playerLegRightUpImage.visible);
        this.playerLegRightDownImage.setVisible(!this.playerLegRightDownImage.visible);
      },
    });

    this.add([
      this.playerLeftArm,
      this.playerLegLeftDownImage,
      this.playerLegLeftUpImage,
      this.playerImage,
      this.bikeWheelImageLeft,
      this.bikeWheelImageRight,
      this.bikeArmImage,
      this.playerLegRightDownImage,
      this.playerLegRightUpImage,
    ]);
    this.scene.add.existing(this);
  }

  public getPlayerImageBounds(): Phaser.Geom.Rectangle {
    return this.playerImage.getBounds();
  }

  public setHeight(height: number) {
    this.setScale(height / this.getBounds().height);
  }
}
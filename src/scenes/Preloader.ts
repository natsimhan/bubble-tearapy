import {Scene} from 'phaser';

export const TextureKey = {
  button: 'button',
  bubbletea: {
    bubbletea: 'bubbletea',
    cup: 'cup',
    cup_cover: 'cup_cover',
    cup_full: 'cup_full',
    cup_mask: 'cup_mask',
  },
  player: {
    bike_arm: 'bike_arm',
    bike_wheel: 'bike_wheel',
    player: 'player',
    player_arm_back: 'player_arm_back',
    player_hand_back: 'player_hand_back',
    player_hand_front: 'player_hand_front',
    player_leg_left_down: 'player_leg_left_down',
    player_leg_left_up: 'player_leg_left_up',
    player_leg_right_down: 'player_leg_right_down',
    player_leg_right_up: 'player_leg_right_up',
    sarbapaille: 'sarbapaille',
  },
  hud: {
    progress_bar_background_blue: 'progress_bar_background_blue_v2',
    progress_bar_background_green: 'progress_bar_background_green_v2',
    progress_bar_background_pink: 'progress_bar_background_pink_v2',
    progress_bar_background_red: 'progress_bar_background_red_v2',
    progress_bar_background_yellow: 'progress_bar_background_yellow_v2',
    timer_background_blue: 'timer_background_blue_v1',
    timer_background_pink: 'timer_background_pink_v1',
    timer_background_purple: 'timer_background_purple_v1',
  },
  background: {
    bg1: 'parallax_bg2',
    bg2: 'parallax_bg1',
  }
};

export class Preloader extends Scene {
  constructor() {
    super('Preloader');
  }

  init() {
    this.add.image(512, 384, 'background');

    this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff);
    const bar = this.add.rectangle(512 - 230, 384, 4, 28, 0xffffff);

    this.load.on('progress', (progress: number) => {
      bar.width = 4 + (460 * progress);
    });
  }

  preload() {
    this.load.setPath('assets');
    this.load.atlas(TextureKey.button, 'button/nine-slice.png', 'button/nine-slice.json');
    this.load.image('logo', 'logo.png');
    this.preloadPlayer();
    this.preloadBubbleTea();
    this.preloadHud();
    this.preloadParallaxBackground();
  }

  create() {
    this.scene.start('Game');
  }

  private preloadPlayer() {
    this.preloadFromListKey([
      TextureKey.player.bike_arm,
      TextureKey.player.bike_wheel,
      TextureKey.player.player,
      TextureKey.player.player_arm_back,
      TextureKey.player.player_hand_back,
      TextureKey.player.player_hand_front,
      TextureKey.player.player_leg_left_down,
      TextureKey.player.player_leg_left_up,
      TextureKey.player.player_leg_right_down,
      TextureKey.player.player_leg_right_up,
      TextureKey.player.sarbapaille,
    ], 'player');
  }

  private preloadBubbleTea() {
    this.preloadFromListKey([
      TextureKey.bubbletea.bubbletea,
      TextureKey.bubbletea.cup,
      TextureKey.bubbletea.cup_cover,
      TextureKey.bubbletea.cup_full,
      TextureKey.bubbletea.cup_mask,
    ], 'bubbletea');
  }

  private preloadHud() {
    this.preloadFromListKey([
      TextureKey.hud.progress_bar_background_blue,
      TextureKey.hud.progress_bar_background_green,
      TextureKey.hud.progress_bar_background_pink,
      TextureKey.hud.progress_bar_background_red,
      TextureKey.hud.progress_bar_background_yellow,
      TextureKey.hud.timer_background_blue,
      TextureKey.hud.timer_background_pink,
      TextureKey.hud.timer_background_purple,
    ], 'hud');
  }

  private preloadFromListKey(listKey: string[], subpath: string) {
    for (const imgKey of listKey) {
      this.load.image(imgKey, `${subpath}/${imgKey}.png`);
    }
  }


  private preloadParallaxBackground(): void {
    this.preloadFromListKey([
      TextureKey.background.bg1,
      TextureKey.background.bg2,
    ], 'background');
  }
}
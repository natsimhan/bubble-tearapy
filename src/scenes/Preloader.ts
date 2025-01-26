import {Scene} from 'phaser';

export const TextureKey = {
  ui: {
    button_blue: 'button_blue',
  },
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
  decor: {
    facade: 'facade',
    roof: 'roof',
    splash: 'splash',
    arbre: {
      arbre: 'arbre',
      elementdroit: 'elementdroit',
      elementgauche: 'elementgauche',
      elementmilieu: 'elementmilieu',
      troncD: 'troncD',
      troncG: 'troncG',
    },
    arbre2: {
      arbre2_feuillage: 'arbre2_feuillage',
      arbre2: 'arbre2',
      arbre2_tronc: 'arbre2_tronc',
    },
    building: {
      buiding_fenetre: 'buiding_fenetre',
      buiding_fond: 'buiding_fond',
      buiding: 'buiding',
      buiding_porte: 'buiding_porte',
    },
    building2: {
      building2_facade: 'building2_facade',
      building2_fenetre: 'building2_fenetre',
      building2: 'building2',
      building2_porte: 'building2_porte',
    },
    buisson1: {
      buisson_int: 'buisson_int',
      buisson: 'buisson',
    },
    buisson2: {
      buisson2_feuillage: 'buisson2_feuillage',
      buisson2: 'buisson2',
    },
    chevre: {
      chevre_corne: 'chevre_corne',
      chevre_corps: 'chevre_corps',
      chevre_museau: 'chevre_museau',
      chevre_patte: 'chevre_patte',
      chevre: 'chevre',
      chevre_tache1: 'chevre_tache1',
      chevre_tache2: 'chevre_tache2',
      chevre_tache3: 'chevre_tache3',
    },
    house: {
      house_facade: 'house_facade',
      house_fenetre: 'house_fenetre',
      house_mur: 'house_mur',
      house: 'house',
      house_porte: 'house_porte',
      house_toit: 'house_toit',
    },
    house2: {
      house2_facade: 'house2_facade',
      house2_fenetre: 'house2_fenetre',
      house2: 'house2',
      house2_porte: 'house2_porte',
      house2_toit: 'house2_toit',
    },
    house3: {
      house3_facade: 'house3_facade',
      house3_fenetre: 'house3_fenetre',
      house3: 'house3',
      house3_porte: 'house3_porte',
      house3_toit: 'house3_toit',
    },
    vache: {
      vache_corps: 'vache_corps',
      vache: 'vache',
      vache_tache1: 'vache_tache1',
      vache_tache2: 'vache_tache2',
      vache_tache3: 'vache_tache3',
      vache_tache4: 'vache_tache4',
      vache_tache5: 'vache_tache5',
    },
  },
  hud: {
    background_gauge_0: 'background_gauge_0',
    background_gauge_1: 'background_gauge_1',
    background_gauge_2: 'background_gauge_2',
    background_gauge_3: 'background_gauge_3',
    background_gauge_4: 'background_gauge_4',
    timer_background_pink: 'timer_background_pink',
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
    const bg = this.add.image(this.scale.width / 2, this.scale.height / 2, 'background');
    bg.setScale(this.scale.width / bg.displayWidth);

    const rect = this.add.rectangle(this.scale.width / 2, this.scale.height / 2, this.scale.width * .8, this.scale.height * .1).setOrigin(.5).setStrokeStyle(1, 0xffffff);
    const rectBounds = rect.getBounds();
    const bar = this.add.rectangle(rectBounds.left + 2, rectBounds.top + 2, rectBounds.width - 4, rectBounds.height - 4, 0xffffff).setOrigin(0);

    this.load.on('progress', (progress: number) => {
      bar.width = 4 + ((rectBounds.width - 8) * progress);
    });
  }

  preload() {
    this.load.setPath('assets');

    this.preloadBubbleTea();
    this.preloadDecor();
    this.preloadHud();
    this.preloadParallaxBackground();
    this.preloadPlayer();
    this.preloadUi();
  }

  create() {
    this.scene.start('MainMenu');
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

  private preloadUi() {
    this.preloadFromListKey([
      TextureKey.ui.button_blue,
    ], 'ui');
  }

  private preloadHud() {
    this.preloadFromListKey([
      TextureKey.hud.background_gauge_0,
      TextureKey.hud.background_gauge_1,
      TextureKey.hud.background_gauge_2,
      TextureKey.hud.background_gauge_3,
      TextureKey.hud.background_gauge_4,
      TextureKey.hud.timer_background_pink,
    ], 'hud');
  }

  private preloadDecor() {
    this.preloadFromListKey([
      TextureKey.decor.facade,
      TextureKey.decor.roof,
      TextureKey.decor.splash,
    ], 'decor');
    this.preloadFromListKey([
      TextureKey.decor.arbre.arbre,
      TextureKey.decor.arbre.elementdroit,
      TextureKey.decor.arbre.elementgauche,
      TextureKey.decor.arbre.elementmilieu,
      TextureKey.decor.arbre.troncD,
      TextureKey.decor.arbre.troncG,
    ], 'decor/arbre');
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

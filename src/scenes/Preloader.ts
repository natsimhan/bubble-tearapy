import {Scene} from 'phaser';

export const UiConfig = {
  fontFamily: 'DynaPuff, serif',
};

export const AudioKey = {
  effects: {
bubbletea_remplissage: 'remplissage_bubble_tea', // bubbletea new color
button_hover: 'hover', // hover d'un bouton
button_clic: 'interaction', // clic boutton
nouveau_record: 'nouveau_record', // input du pseudo sur leaderboard
     pnj_confus_1: 'pnj_confus_1',
     pnj_confus_2: 'pnj_confus_2',
pnj_heureux_1: 'pnj_heureux_1',
pnj_heureux_2: 'pnj_heureux_2',
     pnj_triste_1: 'pnj_triste_1',
     pnj_triste_2: 'pnj_triste_2',
sarbapaille_aspiration: 'aspiration', // remplit la sarbapaille
sarbapaille_tir: 'tir',
sarbapaille_tir_a_blanc: 'tir_a_blanc',
sarbapaille_tir_contact: 'contact_tir',
     sauvetage_pnj_1: 'sauvetage_pnj_1',
     sauvetage_pnj_2: 'sauvetage_pnj_2',
velo_normal: 'velo_normal', // boucle continue
velo_rapide: 'velo_rapide', // ==> spacebar
  },
  musics: {
    cinematic_opening: 'cinematic_opening',
    cinematique_de_fin: 'cinematique_de_fin',
    main_menu: 'main_menu',
    theme_credits: 'theme_credits',
    theme_principal: 'theme_principal', // game boucle
  }
}

export const TextureKey = {
  ui: {
    button_blue: 'button_blue',
  },
  intro: {
    screen_1: '1',
    screen_2: '2',
    screen_3: '3',
    screen_4: '4',
    screen_5: '5',
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
      building_fenetre: 'buiding_fenetre',
      building_fond: 'buiding_fond',
      building: 'buiding',
      building_porte: 'buiding_porte',
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
    parallax_bg1: 'parallax_bg1',
    parallax_bg2: 'parallax_bg2',
    parallax_bg3: 'parallax_bg3',
    parallax_bg4: 'parallax_bg4',
    plant1: 'plant1',
    plant2: 'plant2',
    plant3: 'plant3',
    road: 'road',
  },
  pnj: {
    pnj_heureux_1: 'pnj_heureux_1',
    pnj_heureux_2: 'pnj_heureux_2',
    pnj_triste_1: 'pnj_triste_1',
    pnj_triste_2: 'pnj_triste_2',
  }
};

export class Preloader extends Scene {
  constructor() {
    super('Preloader');
  }

  init() {
    const bg = this.add.image(this.scale.width / 2, this.scale.height / 2, 'background');
    bg.setScale(this.scale.width / bg.displayWidth);

    const rect = this.add.rectangle(this.scale.width / 2, this.scale.height * .9, this.scale.width * .8, this.scale.height * .1).setOrigin(.5).setStrokeStyle(1, 0xffffff);
    const rectBounds = rect.getBounds();
    const bar = this.add.rectangle(rectBounds.left + 2, rectBounds.top + 2, rectBounds.width - 4, rectBounds.height - 4, 0xffffff).setOrigin(0);

    // Précharger un texte invisible pour forcer le navigateur à charger la police
    this.add.text(0, 0, '.', {font: '1px "DynaPuff", serif', color: '#000'}).setAlpha(0);

    this.load.on('progress', (progress: number) => {
      bar.width = 4 + ((rectBounds.width - 8) * progress);
    });
  }

  preload() {
    this.load.setPath('assets');

    this.load.image('bg_end', 'bg_end.jpg');

    this.preloadAudioEffect();
    this.preloadAudioMusic();
    this.preloadBubbleTea();
    this.preloadDecor();
    this.preloadHud();
    this.preloadParallaxBackground();
    this.preloadPlayer();
    this.preloadUi();
    this.preloadPNJ();
    this.preloadIntro();
  }

  create() {
    this.scene.start('Intro');
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
    this.preloadFromListKey([
      TextureKey.decor.arbre2.arbre2_feuillage,
        TextureKey.decor.arbre2.arbre2,
        TextureKey.decor.arbre2.arbre2_tronc,
        ], 'decor/arbre2');
    this.preloadFromListKey([
      TextureKey.decor.building.building_fenetre,
        TextureKey.decor.building.building_fond,
        TextureKey.decor.building.building,
        TextureKey.decor.building.building_porte,
    ], 'decor/building');
    this.preloadFromListKey([
      TextureKey.decor.building2.building2_facade,
      TextureKey.decor.building2.building2_fenetre,
      TextureKey.decor.building2.building2,
      TextureKey.decor.building2.building2_porte,
    ], 'decor/building2');
    this.preloadFromListKey([
      TextureKey.decor.buisson1.buisson_int,
      TextureKey.decor.buisson1.buisson,
    ], 'decor/buisson1');
    this.preloadFromListKey([
      TextureKey.decor.buisson2.buisson2_feuillage,
      TextureKey.decor.buisson2.buisson2,
    ], 'decor/buisson2');
    this.preloadFromListKey([
        TextureKey.decor.chevre.chevre_corne,
        TextureKey.decor.chevre.chevre_corps,
        TextureKey.decor.chevre.chevre_museau,
        TextureKey.decor.chevre.chevre_patte,
        TextureKey.decor.chevre.chevre,
        TextureKey.decor.chevre.chevre_tache1,
        TextureKey.decor.chevre.chevre_tache2,
        TextureKey.decor.chevre.chevre_tache3,
    ], 'decor/chevre');
    this.preloadFromListKey([
        TextureKey.decor.house.house_facade,
        TextureKey.decor.house.house_fenetre,
        TextureKey.decor.house.house_mur,
        TextureKey.decor.house.house,
        TextureKey.decor.house.house_porte,
        TextureKey.decor.house.house_toit,
    ], 'decor/house');
    this.preloadFromListKey([
        TextureKey.decor.house2.house2_facade,
        TextureKey.decor.house2.house2_fenetre,
        TextureKey.decor.house2.house2,
        TextureKey.decor.house2.house2_porte,
        TextureKey.decor.house2.house2_toit,
    ], 'decor/house2');
    this.preloadFromListKey([
        TextureKey.decor.house3.house3_facade,
        TextureKey.decor.house3.house3_fenetre,
        TextureKey.decor.house3.house3,
        TextureKey.decor.house3.house3_porte,
        TextureKey.decor.house3.house3_toit,
    ], 'decor/house3');
    this.preloadFromListKey([
        TextureKey.decor.vache.vache_corps,
        TextureKey.decor.vache.vache,
        TextureKey.decor.vache.vache_tache1,
        TextureKey.decor.vache.vache_tache2,
        TextureKey.decor.vache.vache_tache3,
        TextureKey.decor.vache.vache_tache4,
        TextureKey.decor.vache.vache_tache5,
    ], 'decor/vache');
  }

  private preloadPNJ() {
    this.preloadFromListKey([
        TextureKey.pnj.pnj_heureux_1,
        TextureKey.pnj.pnj_heureux_2,
        TextureKey.pnj.pnj_triste_1,
        TextureKey.pnj.pnj_triste_2,
    ], 'pnj')
  }

  private preloadIntro() {
    this.preloadFromListKey([
        TextureKey.intro.screen_1,
        TextureKey.intro.screen_2,
        TextureKey.intro.screen_3,
        TextureKey.intro.screen_4,
        TextureKey.intro.screen_5,
    ], 'intro', '.jpg')
  }

  private preloadFromListKey(listKey: string[], subpath: string, extension: string = '.png') {
    for (const imgKey of listKey) {
      this.load.image(imgKey, `${subpath}/${imgKey}${extension}`);
    }
  }

  private preloadParallaxBackground(): void {
    this.preloadFromListKey([
      TextureKey.background.parallax_bg1,
      TextureKey.background.parallax_bg2,
      TextureKey.background.parallax_bg3,
      TextureKey.background.parallax_bg4,
      TextureKey.background.plant1,
      TextureKey.background.plant2,
      TextureKey.background.plant3,
      TextureKey.background.road,
    ], 'background');
  }

  private preloadAudioEffect(): void {
    this.preloadAudioFromListKey([
      AudioKey.effects.bubbletea_remplissage,
      AudioKey.effects.button_hover,
      AudioKey.effects.button_clic,
      AudioKey.effects.nouveau_record,
      AudioKey.effects.pnj_confus_1,
      AudioKey.effects.pnj_confus_2,
      AudioKey.effects.pnj_heureux_1,
      AudioKey.effects.pnj_heureux_2,
      AudioKey.effects.pnj_triste_1,
      AudioKey.effects.pnj_triste_2,
      AudioKey.effects.sarbapaille_aspiration,
      AudioKey.effects.sarbapaille_tir,
      AudioKey.effects.sarbapaille_tir_a_blanc,
      AudioKey.effects.sarbapaille_tir_contact,
      AudioKey.effects.sauvetage_pnj_1,
      AudioKey.effects.sauvetage_pnj_2,
      AudioKey.effects.velo_normal,
      AudioKey.effects.velo_rapide,
    ], 'effects');
  }

  private preloadAudioMusic(): void {
    this.preloadAudioFromListKey([
      AudioKey.musics.cinematic_opening,
      AudioKey.musics.cinematique_de_fin,
      AudioKey.musics.main_menu,
      AudioKey.musics.theme_credits,
      AudioKey.musics.theme_principal,
    ], 'musics');
  }

  private preloadAudioFromListKey(listKey: string[], subpath: string) {
    for (const soundKey of listKey) {
      this.load.audio(soundKey, `audio/${subpath}/${soundKey}.ogg`);
    }
  }

}

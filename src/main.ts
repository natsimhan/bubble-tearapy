import {Boot} from './scenes/Boot';
import {Game as MainGame} from './scenes/Game';
import {GameOver} from './scenes/GameOver';
import {MainMenu} from './scenes/MainMenu';
import {Preloader} from './scenes/Preloader';

import {Game, Types} from "phaser";
import Leaderboard from "./scenes/Leaderboard.ts";
import Credits from "./scenes/Credits.ts";
import {Hud} from './scenes/Hud.ts';
import Intro from './scenes/Intro.ts';

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  parent: 'game-container',
  backgroundColor: '#151515',
  dom: {
    createContainer: true,
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  scene: [
    Boot,
    Preloader,
    Intro,
    MainMenu,
    MainGame,
    Hud,
    GameOver,
    Leaderboard,
    Credits,
  ]
};

export default new Game(config);

export default class DebugToolsKeyboardPosition {


  /**
   * Permet de lancer un callable sur les flèches de direction afin de modifier dynamiquement un objet dans la scène pour trouver les bon coefs.
   * Les touches +/- du pavé numériques vont faire augmenter ou dimininuer la précision du pas (par coef de 10).
   *
   * Exemple d'appel :
   * ```ts
   * DebugToolsKeyboardPosition.onKeyboardMoveObject(this.scene,
   *   (coefX: number, coefY: number) => {
   *       console.debug(`width * ${coefX}, height * ${coefY}`);
   *       myImage.setPosition(otherImage.width * coefX, otherImage.height * coefY);
   *   });
   *
   * ```
   * @param scene
   * @param callable
   * @param coefX 0 par defaut
   * @param coefY 0 par defaut
   * @param pas 0.1 par defaut
   */
  static onKeyboardMoveObject(scene: Phaser.Scene,
                              callable: CallableFunction,
                              coefX: number = 0,
                              coefY: number = 0,
                              pas: number = 0.1,
  ) {
    scene.input?.keyboard?.on('keydown', (event: KeyboardEvent) => {
      switch (event.code) {
        case 'ArrowUp':
          coefY += pas;
          break;
        case 'ArrowDown':
          coefY -= pas;
          break;
        case 'ArrowLeft':
          coefX += pas;
          break;
        case 'ArrowRight':
          coefX -= pas;
          break;
        case 'NumpadAdd':
          pas *= .1;
          break;
        case 'NumpadSubtract':
          pas *= 10;
          break;
        default:
          console.debug(event.code);
          break;
      }
      callable(coefX, coefY);
    });
  }
}
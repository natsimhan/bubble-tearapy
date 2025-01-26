import ColorableBuilding from './ColorableBuilding.ts';
import ColorableDecor from './ColorableDecor.ts';
import ColorableTree from './ColorableTree.ts';
import ColorableBuilding2 from './ColorableBuilding2.ts';
import ColorableBush1 from './ColorableBush1.ts';
import ColorableBush2 from './ColorableBush2.ts';
import ColorableCow from './ColorableCow.ts';
import ColorableGoat from './ColorableGoat.ts';
import ColorableHouse from './ColorableHouse.ts';
import ColorableHouse2 from './ColorableHouse2.ts';
import ColorableHouse3 from './ColorableHouse3.ts';
import ColorableTree2 from './ColorableTree2.ts';

export const DecorKey = {
  building: 'building',
  building2: 'building2',
  bush1: 'bush1',
  bush2: 'bush2',
  cow: 'cow',
  goat: 'goat',
  house: 'house',
  house2: 'house2',
  house3: 'house3',
  tree: 'tree',
  tree2: 'tree2',
}

export default class DecorFactory {
  public createDecor(scene: Phaser.Scene, x: number, y: number, height: number, width: number, key: string) {
    console.debug('key', key);
    switch (key) {
      case DecorKey.building: {
        return new ColorableBuilding(scene, x, y, height, width);
      }
      case DecorKey.building2: {
        return new ColorableBuilding2(scene, x, y, height, width);
      }
      case DecorKey.bush1: {
        return new ColorableBush1(scene, x, y, height, width);
      }
      case DecorKey.bush2: {
        return new ColorableBush2(scene, x, y, height, width);
      }
      case DecorKey.cow: {
        return new ColorableCow(scene, x, y, height, width);
      }
      case DecorKey.goat: {
        return new ColorableGoat(scene, x, y, height, width);
      }
      case DecorKey.house: {
        return new ColorableHouse(scene, x, y, height, width);
      }
      case DecorKey.house2: {
        return new ColorableHouse2(scene, x, y, height, width);
      }
      case DecorKey.house3: {
        return new ColorableHouse3(scene, x, y, height, width);
      }
      case DecorKey.tree: {
        return new ColorableTree(scene, x, y, height, width);
      }
      case DecorKey.tree2: {
        return new ColorableTree2(scene, x, y, height, width);
      }
      default: {
        console.debug('in default');
        return new ColorableDecor(scene, x, y, height, width);
      }
    }
  }
}
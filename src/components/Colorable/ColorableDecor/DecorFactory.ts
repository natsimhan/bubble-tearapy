import ColorableBuilding from './ColorableBuilding.ts';
import ColorableDecor from './ColorableDecor.ts';
import ColorableTree from './ColorableTree.ts';

export const DecorKey = {
  building: 'building',
  tree: 'tree',
}

export default class DecorFactory {
  public createDecor(scene: Phaser.Scene, x: number, y: number, height: number, width: number, key: string) {
    switch (key) {
      case DecorKey.building: {
        return new ColorableBuilding(scene, x, y, height, width);
      }
      case DecorKey.tree: {
        return new ColorableTree(scene, x, y, height, width);
      }
      default: {
        return new ColorableDecor(scene, x, y, height, width);
      }
    }
  }
}
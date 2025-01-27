
function h2n(hex: string): number {
  return parseInt(hex.replace('#', ''), 16);
}

const COLOR_LIST = [
  h2n("#009d00"),
  h2n("#00f7ff"),
  h2n("#0028ff"),
  h2n("#17ff00"),
  h2n("#5e208a"),
  h2n("#bf00ff"),
  h2n("#ffdd00"),
  h2n("#ff0000"),
];

export default class ColorList {

  public static h2n(hex: string): number {
    return h2n(hex);
  }

  public static getRandomColor(): number {
    return COLOR_LIST[Math.floor(Math.random() * COLOR_LIST.length)];
  }
}
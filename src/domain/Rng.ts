import * as Phaser from "phaser";

export default class Rng {
  private readonly seed: string;
  private readonly rng: Phaser.Math.RandomDataGenerator;

  constructor(seed: string = "") {
    if (!seed) {
      seed = this.generateRandomSeedHash();
    }
    this.seed = seed;
    this.rng = new Phaser.Math.RandomDataGenerator([seed]);
  }

  public getSeed(): string {
    return this.seed;
  }

  public rollADice(faceCount: number = 20): number {
    return this.between(1, faceCount);
  }

  /**
   * Float entre 0 et 1 inclus.
   */
  public random(): number {
    return this.rng.realInRange(0, 1);
  }

  /**
   * Integer entre min et max
   * @param min
   * @param max
   */
  public between(min: number, max: number): number {
    return this.rng.integerInRange(min, max);
  }

  /**
   * Float entre min et max
   * @param min
   * @param max
   */
  public realBetween(min: number, max: number): number {
    return this.rng.realInRange(min, max);
  }

  private generateRandomSeedHash(length: number = 10): string {
    const randomBytes = crypto.getRandomValues(new Uint8Array(length));
    return Array.from(randomBytes)
        .map(byte => ("0" + byte.toString(16)).slice(-2))
        .join("")
        .slice(0, length);
  }
}
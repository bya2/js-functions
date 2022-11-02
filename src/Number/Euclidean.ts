export default class Euclidean {
  /**
   * @param number1
   * @param number2
   * @returns 공약수
   */
  static gcdOf(number1: number, number2: number): number {
    return number1 % number2 === 0 ? number2 : this.gcdOf(number2, number1 % number2);
  }

  /**
   * @param number1
   * @param number2
   * @returns 공배수
   */
  static lcmOf(number1: number, number2: number): number {
    return (number1 * number2) / this.gcdOf(number1, number2);
  }

  /**
   * @param numbers
   * @returns 공약수
   */
  static gcdOfAll(...numbers: number[]): number {
    return numbers.reduce((number1, number2) => this.gcdOf(number1, number2));
  }

  /**
   * @param number1
   * @param number2
   * @returns 공약수, 공배수
   */
  static gcmAndLcmOf(number1: number, number2: number): [number, number] {
    return [this.gcdOf(number1, number2), this.lcmOf(number1, number2)];
  }
}

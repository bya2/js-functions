export default interface IComposite {
  /**
   * 해당 숫자를 소인수분해한 요소들 중 가장 작은 요소를 반환합니다.
   */
  minFac(n: number): number;

  /**
   * 해당 숫자를 소인수분해한 요소들을 모두 반환합니다.
   */
  factors(n: number): number[];

  /**
   * 해당 숫자를 소인수분해한 요소들을 중복 없이 반환합니다.
   */
  uniqFactors(n: number): number[];
}

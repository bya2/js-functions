export default interface IEquation {
  /**
   * `y`에 해당하는 x의 값을 반환합니다.
   * @param y
   */
  x(y: number): number;

  /**
   * `x`에 해당하는 y의 값을 반환합니다.
   * @param x
   */
  y(x: number): number;
}

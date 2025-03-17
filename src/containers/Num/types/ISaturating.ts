export default interface ISaturating {
  /**
   * 덧셈 연산을 할 때 오버플로우를 방지합니다.
   * - 255
   * @param v
   */
  saturatingAdd(n: number): number;

  /**
   * 뺄셈 연산을 할 때 언더플로우를 방지합니다.
   * - 0
   * @param v
   */
  saturatingSub(n: number): number;
}

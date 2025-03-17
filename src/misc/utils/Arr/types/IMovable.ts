export default interface IMovable<T> {
  /**
   * 배열 내부에서 두 요소의 위치를 서로 변경합니다.
   * @param i
   * @param j
   */
  swap(i: number, j: number): void;

  /**
   * 배열을 왼쪽으로 `n`만큼 회전시킵니다.
   * 배열의 앞 요소 `n`개를 끝으로 이동시키는 작업을 수행합니다.
   * @param n
   */
  rotateLeft(n: number): T[];

  /**
   * 배열을 오른쪽으로 `n`만큼 회전시킵니다.
   * 배열의 뒷 요소 `n`개를 앞으로 이동시키는 작업을 수행합니다.
   * @param n
   */
  rotateRight(n: number): T[];
}

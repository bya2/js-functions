export default interface IGCD {
  /**
   * 이진 최대공약수 알고리즘
   *
   * STEP
   * 1. 이진 표현 상 후행 0의 개수를 파악하고 제거
   *    - a와 b의 공통 후행 0 제거
   *    - a의 나머지 후행 0 제거
   * 2. b가 0이 아닌 동안 루프
   *    - b의 나머지 후행 0 제거
   *    - a가 b보다 크면 스왑
   *    - b에서 a를 빼기
   *
   * @param a
   * @param b
   */
  binary(a: number, b: number): number;

  /**
   * 유클리드 호제법
   *
   * LOOP
   * 1. A = B
   * 2. B = A % B
   *
   * @param a
   * @param b
   */
  euclid(a: number, b: number): number;
}

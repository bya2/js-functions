function countTrailingZeros(n: number): number {
  let count = 0;
  while (n % 2 === 0) (n >>= 1), ++count;
  return count;
}

export const GCD = {
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
  binary(a: number, b: number) {
    if (a === b) return a;
    if (a === 0) return b;
    if (b === 0) return a;

    const count = countTrailingZeros(a | b);
    a >>= count;
    b >>= count;
    a >>= countTrailingZeros(a);

    while (b !== 0) {
      b >>= countTrailingZeros(b);

      if (a > b) {
        const tmp = a;
        a = b;
        b = tmp;
      }

      b -= a;
    }

    return a << count;
  },

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
  euclid(a: number, b: number): number {
    if (a < b) {
      const tmp = a;
      a = b;
      b = tmp;
    }

    while (b) {
      const tmp = a;
      a = b;
      b = tmp % b;
    }

    return a;
  },
};

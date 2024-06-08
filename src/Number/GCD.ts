export const GCD = {
  /**
   * 이진 최대공약수 알고리즘
   *
   * STEP
   * 1. 0 처리
   * 2.
   *
   * @param a
   * @param b
   */
  binary(a: number, b: number) {
    if (a === 0) return b;
    if (b === 0) return a;
    if (a === b) return a;

    const trailingZeros = (n: number): number => {
      let count = 0;
      while ((n & 1) === 0) (n >>= 1), count++;
      return count;
    };

    const shift = trailingZeros(a | b);
    a >>= shift;
    b >>= shift;
    a >>= trailingZeros(a);

    while (b !== 0) {
      b >>= trailingZeros(b);

      if (a > b) {
        const tmp = a;
        a = b;
        b = tmp;
      }

      b -= a;
    }

    return a << shift;
  },

  /**
   * 유클리드 호제법
   *
   * LOOP
   * 1. A = B
   * 2. B = A % B
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

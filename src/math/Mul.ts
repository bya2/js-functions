interface IMul {
  /**
   * 숫자 `n`까지의 곱을 구합니다.
   * @param n
   */
  upTo(n: number, k: number): number;

  /**
   * 숫자 `a`부터 `b`까지의 곱을 반환합니다.
   * @param a
   * @param b
   * @param d
   */
  between(a: number, b: number, d?: number): number;

  /**
   * 숫자 목록의 곱을 반환합니다.
   * @param iter
   */
  of(iter: Iterable<number>): number;
}

const Mul: IMul = {
  upTo(n, k) {
    console.assert(n >= 1);

    if (n <= 1) return 1;

    let acc = n;
    for (let i = n - k; i > 1; i -= k) acc *= i;

    return acc;
  },

  between(a, b, d) {
    if (a < b) {
      const tmp = a;
      a = b;
      b = tmp;
    }

    if (d === 1) {
      let mul = 1;
      let n = a;
      while (++n <= b) mul *= n;
      return mul;
    } else {
    }

    return 1;
  },

  of(iter) {
    let mul = 1;
    for (const n of iter) mul *= n;
    return mul;
  },
};

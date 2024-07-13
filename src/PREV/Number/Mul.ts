interface IMultiple {
  /**
   * 입력된 수들의 곱을 반환합니다.
   * @param items
   */
  of(items: Iterable<number>): number;

  /**
   * `a`부터 `b`까지의 곱을 반환합니다.
   * @param a
   * @param b
   * @param gap
   */
  between(a: number, b: number, gap: number): number;

  /**
   * 계승(팩토리얼): 루프
   * @param n
   */
  factorial(n: number, k: number): number;
}

export const Mul: IMultiple = {
  of(items) {
    let mul = 1;
    for (const n of items) mul *= n;
    return mul;
  },

  between(a, b, gap = 1) {
    if (a < b) {
      const tmp = a;
      a = b;
      b = tmp;
    }

    let mul = 1;
    for (let i = a; i <= b; i += gap) mul *= i;
    return mul;
  },

  factorial(n, k = 1) {
    console.assert(n >= 1);

    if (n <= 1) return 1;

    let acc = n;
    for (let i = n - k; i > 1; i -= k) acc *= i;

    return acc;
  },
};

interface ISum {
  /**
   * 숫자 `n`까지의 자연수의 합을 반환합니다.
   * @param n
   */
  upTo(n: number, d?: number): number;

  /**
   * 숫자 `a`부터 `b`까지의 합을 반환합니다.
   * @param a
   * @param b
   * @param d
   */
  between(a: number, b: number, d?: number): number;

  /**
   * 숫자 목록의 합을 반환합니다.
   * @param iter
   */
  of(iter: Iterable<number>): void;
}

export const Sum: ISum = {
  upTo(n, d = 1) {
    if (d === 1) {
      return (n * ++n) / 2;
    }

    let sum = 0;
    for (let i = 1; i <= n; i += d) sum += i;
    return sum;
  },

  between(a, b, d = 1) {
    if (a > b) {
      const tmp = a;
      a = b;
      b = tmp;
    }

    if (d === 1) {
      return ((a + b) * (Math.abs(a - b) + 1)) / 2;
    }

    let sum = 0;
    for (let n = a; n < b; n += d) sum += n;
    return sum;
  },

  of(iter) {
    let sum = 0;
    for (const n of iter) sum += n;
    return sum;
  },
};

export default Sum;

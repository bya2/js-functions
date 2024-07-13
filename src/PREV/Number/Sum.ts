interface ISum {
  /**
   * 입력된 수들의 합을 반환합니다.
   * @param items
   */
  of(items: Iterable<number>): number;

  /**
   * `a`부터 `b`까지의 합을 반환합니다.
   * @param a
   * @param b
   */
  between(a: number, b: number): number;

  /**
   * n 이하 자연수의 합을 반환합니다.
   * @param n
   */
  upTo(n: number): number;
}

export const Sum: ISum = {
  of(items) {
    let sum = 0;
    for (const n of items) sum += n;
    return sum;
  },

  between(a, b) {
    return ((a + b) * (Math.abs(a - b) + 1)) / 2;
  },

  upTo(n) {
    return (n * ++n) / 2;
  },
};

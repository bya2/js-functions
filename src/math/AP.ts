interface APInterface {
  /**
   * 등차수열의 `n`번째 항을 반환합니다.
   * @param n
   * @param a 첫번째 항
   * @param d 공차
   */
  nth(n: number, a: number, d: number): number;

  /**
   * 등차수열의 초항부터 `n`번째 항까지의 합을 반환합니다.
   * @param n
   * @param a 첫번째 항
   * @param l 마지막 항
   */
  sum(n: number, a: number, l: number): number;
}

/**
 * 등차수열
 * Arithmetical Sequence(Progression)
 */
export const AP: APInterface = {
  nth(n, a, d) {
    return a + (n - 1) * d;
  },

  sum(n, a, l) {
    return (n * (a + l)) / 2;
  },
};

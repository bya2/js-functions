interface GPInterface {
  /**
   * 등비수열의 `n`번째 항
   * @param n nth
   * @param a 초항
   * @param r 공비
   */
  nth(n: number, a: number, r: number): number;

  /**
   * 등비수열의 초항부터 `n`번째 항까지의 합
   * @param n nth
   * @param a 초항
   * @param r 공비
   */
  sum(n: number, a: number, r: number): number;
}

/**
 * 등비수열
 * Geometric Sequence(Progression)
 */
export const GP: GPInterface = {
  nth(n, a, r) {
    console.assert(a !== 0);
    console.assert(r !== 0);

    return a * r ** (n - 1);
  },

  sum(n, a, r) {
    console.assert(a !== 0);
    console.assert(r !== 0);

    return r === 1 ? a * n : (a * (r ** n - 1)) / (r - 1);
  },
};

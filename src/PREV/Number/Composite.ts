interface IComposite {
  /**
   * 합성수에 대해 소인수분해한 요소들 중 가장 작은 수를 반환합니다.
   * @param n
   */
  minFac(n: number): number;

  /**
   * 합성수에 대해 소인수분해한 요소들을 반환합니다.
   * @param n
   */
  factors(n: number): number[];

  /**
   * 합성수에 대해 소인수분해한 요소들을 중복 없이 반환합니다.
   * @param n
   */
  uniqFactors(n: number): number[];
}

const Composite: IComposite = {
  minFac(n) {
    if (n % 2 === 0) {
      return 2;
    }

    const LIM = Math.sqrt(n);

    for (let m = 3; m <= LIM; m += 2) {
      if (n % m === 0) {
        return m;
      }
    }

    return n;
  },

  factors(n) {
    if (n <= 1) {
      return [];
    }

    const arr: number[] = [];
    let curr = n;

    while (1) {
      let m = this.minFac(curr);
      arr.push(m);
      if (curr === m) break;
      curr /= m;
    }

    return arr;
  },

  uniqFactors(n) {
    if (n <= 1) {
      return [];
    }

    const arr: number[] = [];
    let curr = n;

    while (1) {
      let m = this.minFac(curr);
      arr.push(m);
      if (curr === m) break;
      while (curr % m === 0) curr /= m;
      if (curr === 1) break;
    }

    return arr;
  },
};

export default Composite;

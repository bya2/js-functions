export default class Prime {
  /**
   * 소수인지 판별하여 리턴
   * @param n
   */
  static isPrimeNumber(n: number): boolean {
    for (let i = 3, len = Math.sqrt(n); i <= len; i += 2) {
      if (n % i === 0) return false;
    }
    return n >= 2;
  }

  /**
   * 'from'부터 'to'까지의 소수 리스트를 Set으로 리턴
   * @param from
   * @param to
   */
  static between(from: number, to: number): Set<number> {
    const set = new Set<number>();
    if (from <= 2) set.add(2);
    for (let i = from <= 3 ? 3 : from; i < to; i += 2) {
      if (this.isPrimeNumber(i)) set.add(i);
    }
    return set;
  }

  /**
   * 'from'부터 'to'까지 소수의 개수를 리턴
   * @param from
   * @param to
   */
  static numberOf(from: number, to: number): number {
    let count = from <= 2 ? 1 : 0;
    for (let i = from <= 3 ? 3 : from; i <= to; i += 2) {
      if (this.isPrimeNumber(i)) ++count;
    }
    return count;
  }
}

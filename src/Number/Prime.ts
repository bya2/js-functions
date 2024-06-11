// 기능
// - 소수 판별: isPrime, has
// - [범위 내] 소수의 개수
// - [범위 내] 소수 목록: between, upTo

/**
 * 입력된 숫자 `n`이 소수인지 판별합니다.
 * @param n
 */
export function isPrime(n: number): boolean {
  const SQRT_N = Math.sqrt(n);

  for (let m = 3; m <= SQRT_N; m += 2) {
    if (n % m === 0) {
      return false;
    }
  }

  return n >= 2;
}

export const Sieve = {
  /**
   * 초기화된 에라토스테네스의 체를 반환합니다.
   * @param maximum
   */
  upTo(maximum = 1_000_000): number[] {
    console.assert(maximum >= 2, "Invalid maximum: ");

    const sieve = new Array(maximum + 1).fill(1);
    sieve[0] = sieve[1] = 0;

    for (let i = 2; i * i <= maximum; ++i) {
      if (sieve[i]) {
        for (let j = i * i; j <= maximum; j += i) {
          sieve[j] = 0;
        }
      }
    }

    return sieve;
  },
};

export class PrimeSet {
  sieve: number[];
  map: Record<number, number>;
  primes: number[];

  /**
   * Primes Utils
   * @param max
   */
  constructor(sieve: number[] = Sieve.upTo()) {
    const MAX = sieve.length - 1;

    const map = { 2: 0 };
    const primes = [2];

    for (let n = 3, i = 0; n <= MAX; n += 2) {
      if (sieve[n]) {
        map[n] = ++i;
        primes.push(n);
      }
    }

    this.sieve = sieve;
    this.map = map;
    this.primes = primes;
  }

  /**
   * 입력된 숫자 `n`이 소수인지 판별합니다.
   * @param n
   */
  has(n: number) {
    return this.map[n] !== 0;
  }

  /**
   * `this`의 `primes`에 대한 이분 탐색을 통해 숫자 `n`의 인덱스를 반환합니다.
   * @param n
   */
  binarySearch(n: number): number {
    let si = 0;
    let ei = this.primes.length - 1;

    while (si <= ei) {
      let mi = (si + ei) >> 1;
      if (this.primes[mi] === n) return mi;
      if (this.primes[mi]! < n) si = ++mi;
      else ei = --mi;
    }

    return -1;
  }

  /**
   * 숫자 `a`와 `b` 사이의 소수 목록을 반환합니다.
   * @param a
   * @param b
   */
  between(a: number, b: number): number[] {
    if (a > b) {
      const tmp = a;
      a = b;
      b = tmp;
    }

    if (a < 0) {
      if (b < 2) return [];
      a = 0;
    }

    let i = this.map[a]!;
    let j = this.map[b]!;

    if (i === undefined || j === undefined) {
      throw new Error("Invalid index: ");
    }

    if (i === 0) {
    }

    if (j === 0) {
    }

    return [];
  }

  /**
   * 숫자 `max`까지의 소수 목록을 반환합니다.
   * @param max
   */
  upTo(max: number): number[] {
    const slc = [] as number[];
    const ei = this.map[max]!;
    if (ei === 0) {
    }

    for (let i = -1; ++i <= ei; ) slc.push(this.primes[i]!);
    return slc;
  }
}

// 소수 판별
// [범위 내] 소수의 개수
// [범위 내] 소수 목록

export function binarySearchIndex(arr: number[], n: number): number {
  let si = 0;
  let ei = arr.length - 1;

  while (si <= ei) {
    let mi = (si + ei) >> 1;
    if (arr[mi] === n) return mi;
    if (arr[mi]! < n) si = ++mi;
    else ei = --mi;
  }

  return -1;
}

/**
 * 입력된 숫자 `n`이 소수인지 판별합니다.
 * @param n
 */
export function isPrime(n: number): boolean {
  for (let m = 3; m <= Math.sqrt(n); m += 2) {
    if (n % m === 0) {
      return false;
    }
    if (m * m > n) {
      return true;
    }
  }

  return n >= 2;
}

export const Sieve = {
  /**
   * 초기화된 에라토스테네스의 체를 반환합니다.
   * @param maximum
   */
  init(maximum: number = 1_000_000): number[] {
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

export class PrimeSys {
  map: number[];
  primes: number[];

  constructor(max: number) {
    const sieve = Sieve.init(max);
    const primes = [2];

    for (let n = 3, i = 0; n <= max; n += 2) {
      if (sieve[n]) {
        sieve[n] = ++i;
        primes.push(n);
      }
    }

    this.map = sieve;
    this.primes = primes;
  }

  /**
   * 입력된 숫자 `n`이 소수인지 판별합니다.
   * @param n
   */
  has(n: number) {
    return this.map[n] !== 0;
  }

  close() {
    // 이분 탐색
  }

  /**
   * 숫자 `a`와 `b` 사이의 소수 목록을 반환합니다.
   * @param a
   * @param b
   */
  between(a: number, b: number): number[] {
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

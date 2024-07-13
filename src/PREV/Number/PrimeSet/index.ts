import Composite from "../Composite";

/**
 * 숫자가 소수인지 판별합니다.
 * @param n
 */
export function isPrime(n: number): boolean {
  return n >= 2 && n === Composite.minFac(n);
}

export function sieveOfAtkin(n: number): number[] {
  const MAX = n + 1;
  const LIM = Math.ceil(Math.sqrt(n));

  const sieve = new Array(MAX).fill(0);
  sieve[2] = sieve[3] = 1;

  for (let i = 1; i <= LIM; ++i) {
    for (let j = 1; j <= LIM; ++j) {
      let tmp = 4 * i * i + j * j;
      if (tmp <= n && (tmp % 12 === 1 || tmp % 12 === 5)) {
        sieve[tmp] = 1;
      }

      tmp = 3 * i * i + j * j;
      if (tmp <= n && tmp % 12 === 7) {
        sieve[tmp] = 1;
      }

      if (i > j) {
        tmp = 3 * i * i - j * j;
        if (tmp <= n && tmp % 12 === 11) {
          sieve[tmp] = 1;
        }
      }
    }
  }

  for (let i = 5; i <= LIM; ++i) {
    if (sieve[i]) {
      for (let j = i * i; j < MAX; j += i) {
        sieve[j] = 0;
      }
    }
  }

  return sieve;
}

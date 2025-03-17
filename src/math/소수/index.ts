import { minFac } from "../소인수분해";

/**
 * 소수 판별
 * @param n
 */
export function isPrime(n: number): boolean {
  return n >= 2 && n === minFac(n);
}

/**
 * 소수 목록 반환
 * @param n
 */
export function getPrimes(n: number): number[] {}

import { composite } from "../composite";

/**
 * 입력된 숫자가 소수인지 판별합니다.
 * @param n
 * @returns
 */
export function isPrime(n: number): boolean {
  return n >= 2 && n === composite(n).minFac();
}

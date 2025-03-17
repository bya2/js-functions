import { minFac } from "./composite";

/**
 * 약수의 개수가 홀수인지 판별
 * @param n
 */
export function hasOddDivisors(n: number): boolean {
  return Number.isInteger(Math.sqrt(n));
}

/**
 * 약수의 개수
 * - 자연수를 소인수분해했을 때 각 소인수의 지수에 1을 더한 수들의 곱
 * @param n
 */
export function countDivisors(n: number): number {
  if (n <= 0) return 0;
  if (n === 1) return 1;

  let x = 2;
  let acc = 1;
  let exp = 2;

  while (1) {
    let m = minFac(n);
    if (n === m) break;
    if (m !== x) {
      acc *= exp;
      exp = 1;
    }
    n /= m;
    ++exp;
  }

  return acc;
}

/**
 * 약수들의 합
 *
 * 공식:
 * - 어떤 자연수 n을 소인수분해한 결과: a^p × b^q × c^r × ⋯
 * - 모든 약수의 합의 공식: (1+a+a^2 +⋯+a^p )×(1+b+b^2 +⋯+b^q )×(1+c+c^2 +⋯+c^r )×⋯
 * - 등비수열 합 공식: a^(p+1)-1 / a-1 x b^(q+1)-1 / b-1 x c^(r+1)-1 / c-1 x ⋯
 *
 * @param n
 */
export function sumDivisors(n: number): number {
  if (n <= 0) return 0;
  if (n === 1) return 1;

  let x = 2;
  let exp = 1;
  let acc = 1;

  while (1) {
    let m = minFac(n);
    if (n === m) break;
    if (m !== x) {
      acc *= (x ** (exp + 1) - 1) / (x - 1);
      exp = 0;
    }
    n /= m;
    ++exp;
  }

  return acc;
}

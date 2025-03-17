import GCD from "../GCD";

/**
 * 약수 목록 반환(표준)
 * @param n
 */
export function getDivisorsStandard(n: number): number[] {
  const arr: number[] = [];
  const sqrtN = Math.sqrt(n);

  let i = 1;

  while (++i < sqrtN) {
    if (n % i === 0) {
      arr.push(i);
      arr.push(n / i);
    }
  }

  if (i === sqrtN) {
    arr.push(i);
  }

  arr.sort((a, b) => a - b);

  return arr;
}

/**
 *
 * @param arr
 * @param oldLen
 * @param x
 */
export function pushNewDivisors(arr: number[], oldLen: number, x: number) {
  for (let i = 0; i < oldLen; ++i) {
    arr.push(x * arr[i]!);
  }
}

/**
 * 서로소 판별
 * - 두 수의 최대공약수가 1
 * @param a
 * @param b
 * @returns
 */
export function isCoprime(a: number, b: number) {
  return GCD.binary(a, b) === 1;
}

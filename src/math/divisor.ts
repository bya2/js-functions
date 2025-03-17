import { minFac } from "./composite";
import GCD from "./GCD";

/**
 * 약수 목록 반환 표준
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

function pushNewDivisors(arr: number[], arrLen: number, x: number) {
  for (let i = 0; i < arrLen; ++i) {
    arr.push(x * arr[i]!);
  }
}

/**
 * 약수 목록 반환
 *
 * STEP
 * 1. 짝수 처리: 입력된 숫자가 반으로 나눠질 때마다 2의 거듭제곱들을 리스트에 추가
 * 2. 홀수 처리: 3부터 시작하는 홀수 x의 거듭제곱들에 대해 약수 목록에 추가된 2의 거듭제곱들을 곱하여 약수 목록에 추가
 * 3. 소수 처리: 1보다 큰 소수에 대해 약수 목록에 추가된 요소들을 곱하여 약수 목록에 추가
 * 4. 정렬 후 초과된 수 제거
 *
 * @param n
 */
export function getDivisors(n: number): number[] {
  if (n <= 2) {
    return [];
  }

  const arr: number[] = [];
  const _n = n;

  // #1
  let e = -1;
  while (n % 2 === 0) {
    arr.push(2 << ++e);
    n >>= 1;
  }

  // #2
  let x = 3;
  let sqrtN = n ** 0.5;

  while (x <= sqrtN) {
    const oldLen = arr.length;

    let powX = x;
    let powXIsDivisor = n % x === 0;

    if (powXIsDivisor) {
      sqrtN = Math.sqrt(n);
    }

    while (powXIsDivisor) {
      arr.push(powX);
      pushNewDivisors(arr, oldLen, powX);
      n /= x;
      powXIsDivisor = n % x === 0;
      if (powXIsDivisor) powX *= x;
    }

    x += 2;
  }

  // #3
  if (n > 1 && n !== _n) {
    arr.push(n);
    pushNewDivisors(arr, arr.length - 1, n);
  }

  // #4
  if (arr.length > 1) {
    arr.sort((a, b) => a - b);
    arr.pop();
  }

  return arr;
}

/**
 * 약수의 개수에 대해 홀수 여부를 판별
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

/**
 * 약수 판별
 * @param n
 * @param d
 */
export function isDivisor(n: number, d: number): boolean {
  return n >= d && n % d === 0;
}

/**
 * 유니타리 약수 판별
 * - `n`의 약수가 `d`일 때, `d``와 `n/d`의 값이 서로소
 * @param n
 * @param d
 */
export function isUnitaryDivisor(n: number, d: number): boolean {
  return n >= d && n % d === 0 && isCoprime(n, n / d);
}

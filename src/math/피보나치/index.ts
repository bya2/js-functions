import { memoizeSync } from "@/misc/utils";

/**
 * 피보나치의 수
 * `index` + 1번째 수를 반환합니다.
 *
 * STEP
 * - 홀수:
 * - 짝수:
 *
 * @param index
 */
export const fibonacci = memoizeSync((ix) => {
  console.assert(ix >= 0);

  if (ix === 0) return 0;
  if (ix <= 2) return 1;

  if (ix & 1) {
    let n = ++ix >> 1;
    return fibonacci(n) ** 2 + fibonacci(--n) ** 2;
  } else {
    let n = ix / 2;
    const x = fibonacci(n);
    return (fibonacci(--n) * 2 + x) * x;
  }
}) as (index: number) => number;

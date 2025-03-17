/**
 * 계승(n!)
 * @param n
 * @returns
 */
export function factorial(n: number): number {
  if (n <= 1) return 1;

  let acc = 1;
  let i = 1;
  while (++i <= n) acc *= i;

  return acc;
}

/**
 * 다중 계승(n!...)
 * @param n
 * @param k default 1
 */
export function multiFactorial(n: number, k: number): number {
  if (n <= 1) return 1;

  let acc = n;
  for (let i = n - k; i > 1; i -= k) acc *= i;

  return acc;
}

/**
 * 하강 계승(n부터 n-k+1까지의 곱)
 * @param n
 * @param k
 */
export function fallingFactorial(n: number, k = 1): number {
  let acc = 1;

  let i = 1;
  while (++i <= n - k) acc *= i;

  const d = acc;

  while (++i <= n) acc *= i;

  return acc / d;
}

/**
 * 상승 계승
 * n ~ n+k-1
 * @param n
 */
export function risingFactorial(n: number, k = 1): number {
  return factorial(n + k - 1) / factorial(n - 1);
}

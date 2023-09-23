/**
 * 두 수의 최대공약수
 * @param n
 * @param m
 */
export const gcdOf = (n: number, m: number): number => {
  return n % m === 0 ? m : gcdOf(m, n % m);
};

/**
 * 두 수의 최소공배수
 * @param n
 * @param m
 */
export const lcmOf = (n: number, m: number): number => {
  return (n * m) / gcdOf(n, m);
};

/**
 * 여러 수에 대한 최대공약수
 * @param numbers
 */
export const gcdFor = (...numbers: number[]): number => {
  return numbers.reduce((n, m) => gcdOf(n, m));
};

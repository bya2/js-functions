export function countTrailingZeros(n: number): number {
  let count = 0;
  while (n % 2 === 0) (n >>= 1), ++count;
  return count;
}

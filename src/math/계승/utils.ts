export function factorialIterStandard(n: number, k = 1) {
  if (n <= 1) {
    return 1;
  }

  let acc = n;
  for (let i = n - k; i > 1; i -= k) {
    acc *= i;
  }

  return acc;
}

export function factorialRscvStandard(n: number) {
  return n > 1 ? factorialRscvStandard(n - 1) : 1;
}

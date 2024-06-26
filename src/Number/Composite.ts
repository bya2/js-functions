/**
 * 합성수에 대해 소인수분해한 요소들 중 가장 작은 수를 반환합니다.
 * @param n
 */
export function firstFac(n: number): number {
  if (n % 2 === 0) {
    return 2;
  }

  const LIM = n ** 0.5;

  for (let m = 3; m <= LIM; m += 2) {
    if (n % m === 0) {
      return m;
    }
  }

  return n;
}

/**
 * 합성수에 대해 소인수분해한 요소들을 반환합니다.
 * @param n
 */
export function factors(n: number): number[] {
  if (n <= 1) {
    return [];
  }

  const arr: number[] = [];
  let curr = n;

  while (1) {
    let m = firstFac(curr);
    arr.push(m);
    if (curr === m) break;
    curr /= m;
  }

  return arr;
}

/**
 * 합성수에 대해 소인수분해한 요소들을 중복 없이 반환합니다.
 * @param n
 */
export function uniqFactors(n: number): number[] {
  if (n <= 1) {
    return [];
  }

  const arr: number[] = [];
  let curr = n;

  while (1) {
    let m = firstFac(curr);
    arr.push(m);
    if (curr === m) break;
    while (curr % m === 0) curr /= m;
    if (curr === 1) break;
  }

  return arr;
}

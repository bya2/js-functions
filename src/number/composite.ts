/**
 * 합성수를 소인수분해한 요소들 중 최소값을 반환
 * @param n
 */
export function minFac(n: number): number {
  if (n % 2 === 0) {
    return 2;
  }

  const LIM = Math.sqrt(n);

  for (let m = 3; m <= LIM; m += 2) {
    if (n % m === 0) {
      return m;
    }
  }

  return n;
}

/**
 * 합성수를 소인수분해한 요소들의 배열을 반환
 * @param n
 */
export function factors(n: number): number[] {
  if (n <= 1) {
    return [];
  }

  const arr: number[] = [];
  let curr = n;

  while (1) {
    let m = minFac(curr);
    arr.push(m);
    if (curr === m) break;
    curr /= m;
  }

  return arr;
}

/**
 * 합성수를 소인수분해한 요소들을 중복없이 배열 형태로 반환
 * @param n
 */
export function uniqFactors(n: number): number[] {
  if (n <= 1) {
    return [];
  }

  const arr: number[] = [];
  let curr = n;

  while (1) {
    let m = minFac(curr);
    arr.push(m);
    if (curr === m) break;
    while (curr % m === 0) curr /= m;
    if (curr === 1) break;
  }

  return arr;
}

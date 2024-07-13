/**
 * 입력된 숫자가 '하샤드의 수'인지 판별합니다.
 * @param n
 */
export function isHarshad(n: number): boolean {
  console.assert(n > 0);

  const cArr = (n + "").split("");
  let m = 0;
  for (const c of cArr) {
    m += +c;
  }

  return n % m === 0;
}

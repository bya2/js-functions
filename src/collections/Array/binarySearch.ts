/**
 * 이분탐색을 통해 입력된 숫자 `n`의 위치를 반환합니다.
 * 숫자 `n`이 존재하지 않으면 -1을 반환합니다.
 * @param arr
 * @param n
 */
export function binarySearch(arr: number[], n: number): number {
  let si = 0;
  let ei = arr.length - 1;

  while (si <= ei) {
    let mi = (si + ei) >> 1;
    if (arr[mi] === n) return mi;
    if (arr[mi]! < n) si = ++mi;
    else ei = --mi;
  }

  return -1;
}

export function binarySearchBy<T>(
  arr: T[],
  fn: (v: T, i: number, arr: T[]) => number
) {
  let si = 0;
  let ei = arr.length - 1;

  while (si <= ei) {
    let mi = (si + ei) >> 1;
    const cmp = fn(arr[mi]!, mi, arr);
    if (cmp === 0) return mi;
    if (cmp >= 1) si = ++mi;
    else ei = --mi;
  }

  return -1;
}

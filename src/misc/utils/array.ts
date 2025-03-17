/**
 * 배열 `arr`의 요소들이 배열 `other`의 부분 집합인지 확인합니다.
 * - 중복은 고려하지 않습니다.
 * @param arr
 * @param other
 */
export function isSubset(arr: any[], other: any[]): boolean {
  const dict = new Set(other);
  return arr.every(dict.has);
}

/**
 * 배열 `arr`의 내부에서 두 요소의 위치를 서로 변경합니다.
 * @param arr
 * @param i
 * @param j
 */
export function swap(arr: any[], i: number, j: number): void {
  const tmp = arr[i];
  arr[i] = arr[j];
  arr[j] = tmp;
}

/**
 * 배열을 왼쪽으로 `n`만큼 회전시킵니다.
 * 배열의 앞 요소 `n`개를 끝으로 이동시키는 작업을 수행합니다.
 * @param arr
 * @param n
 * @returns
 */
export function rotateLeft(arr: any[], n = 1) {
  n %= arr.length;
  return arr.slice(n).concat(arr.slice(0, n));
}

/**
 * 배열을 오른쪽으로 `n`만큼 회전시킵니다.
 * 배열의 뒷 요소 `n`개를 앞으로 이동시키는 작업을 수행합니다.
 * @param arr
 * @param n
 */
export function rotateRight<T>(arr: T[], n = 1): T[] {
  n %= arr.length;
  return arr.slice(-n).concat(arr.slice(0, -n));
}

/**
 *
 * @param slc
 * @param si
 * @param ei
 * @returns
 */
export function filterContinity(slc: any[], si = 0, ei = slc.length) {
  slc = slc.filter((v, i, arr) => {});

  const arr = [slc[si]!];

  for (let i = ++si; i < ei; ++i) {
    if (arr[arr.length - 1] !== slc[i]) {
      arr.push(slc[i]!);
    }
  }

  return slc;
}

export function binarySearch<T>(arr: T[], cb: (elem: T, i: number) => number) {
  let si = 0;
  let ei = arr.length - 1;

  while (si <= ei) {
    let mi = (si + ei) >> 1;
    const e = arr[mi]!;

    if (cb(e, mi) === 0) return mi;
    if (cb(e, mi)) si = ++mi;
    else ei = --mi;
  }

  return -1;
}

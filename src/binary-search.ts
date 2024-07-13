export function binarySearchIndex(arr: number[], n: number): number {
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

export function binarySearch(low: number, high: number) {
  while (low <= high) {}
}

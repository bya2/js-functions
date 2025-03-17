export function union() {}

// 숫자형은 서로 뺀다.
// 문자형은 크기를 비교한다.
//

/**
 * 다중 조건 정렬
 * @param arr
 * @param properties
 */
export function sort<T extends object>(
  arr: T[],
  properties: [string, string][]
) {
  return arr.sort((a, b) => {
    for (const [prop, dir] of properties) {
      if (a[prop] > b[prop]) {
        return 1;
      }
    }
    return 0;
  });
}

/**
 * `b`가 `a`의 부분 집합인지 판별합니다.
 * @param a
 * @param b
 * @returns
 */
export function isSubset<T>(a: Set<T>, b: Set<T>): boolean {
  if (a.size < b.size) return false;

  for (const e of b) {
    if (!a.has(e)) return false;
  }

  return true;
}

/**
 * 합집합
 * @param a
 * @param b
 * @returns [`Set`] 타입의 합집합 `a`을 반환합니다.
 */
export function union<T>(a: Set<T>, b: Iterable<T>): Set<T> {
  for (const e of b) a.add(e);
  return a;
}

/**
 * 차집합
 * @param a
 * @param b
 * @returns [`Set`] 타입의 차집합 `a`을 반환합니다.
 */
export function difference<T>(a: Set<T>, b: Iterable<T>): Set<T> {
  for (const e of b) a.has(e) && a.delete(e);
  return a;
}

/**
 * 교집합
 * @param a
 * @param b
 * @returns [`Set`] 타입의 교집합 `a`을 반환합니다.
 */
export function intersection<T>(a: Set<T>, b: Iterable<T>): Set<T> {
  if (b instanceof Set) {
    for (const e of a) b.has(e) || a.delete(e);
  }
  return a;
}

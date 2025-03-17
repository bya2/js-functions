/**
 * 동기적 메모이제이션 함수를 반환합니다.
 * @param fn
 */
export function memoizeSync<R>(fn: (arg: any) => R): (arg: any) => R {
  const map = new Map();
  return (arg) => {
    map.has(arg) || map.set(arg, fn(arg));
    return map.get(arg)!;
  };
}

/**
 * 비동기적 메모이제이션 함수를 반환합니다.
 * @param fn
 */
export function memoize<R>(
  fn: (arg: any) => Promise<R>
): (arg: any) => Promise<R> {
  const map = new Map();
  return async (arg) => {
    map.has(arg) || map.set(arg, await fn(arg));
    return map.get(arg)!;
  };
}

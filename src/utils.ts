type AsyncFn<R> = (...args: any[]) => Promise<R>;
type Fn<R> = (...args: any[]) => R;

// 커스텀 작성 유틸 함수 목록
// - memoize

export function memoize<R>(fn: AsyncFn<R>): AsyncFn<R> {
  const map: Map<any, R> = new Map();
  return async (key: any, ...args: any[]) => {
    map.has(key) || map.set(key, await fn(key, ...args));
    return map.get(key)!;
  };
}

export function memoizeSync<R>(fn: Fn<R>): Fn<R> {
  const map: Map<any, R> = new Map();
  return (key: any, ...args: any[]) => {
    map.has(key) || map.set(key, fn(key, ...args));
    return map.get(key)!;
  };
}

/**
 * 매개변수 별로 함수의 차수를 분리합니다.
 * @param fn
 */
export function curry(fn: any) {
  return (...args: any[]) => {
    return args.length >= fn.length
      ? fn(...args)
      : curry(fn.bind(null, ...args));
  };
}

export function match() {
  return curry((regex: RegExp, s: string) => s.match(regex));
}

export function pluck() {
  return curry((key: string, obj: any) => obj?.[key]);
}

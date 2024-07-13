export const noop = () => {};

export const erasing = {
  linear: (n: number) => n,
  elastic: (n: number) =>
    n * (33 * n * n * n * n - 106 * n * n * n + 126 * n * n - 67 * n + 15),
  inExpo: (n: number) => Math.pow(2, 10 * (n - 1)),
};

type CB<R> = (...args: any[]) => R;

export function memoize<R>(cb: CB<R>): CB<R> {
  const map: Map<any, R> = new Map();

  return (key: any, ...args: any[]) => {
    map.has(key) || map.set(key, cb(key, ...args));
    return map.get(key)!;
  };
}

export function memoizeSync<R>(fn: CB<R>): CB<R> {
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

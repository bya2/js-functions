/**
 * 비동기적 메모이제이션 및 반환.
 * @param fn
 */
export function memoize<T>(fn: (key: any, ...args: any[]) => Promise<T>) {
  const map = new Map<any, T>();
  return async (key: any, ...args: any[]): Promise<T> => {
    if (!map.has(key)) {
      map.set(key, await fn(key, ...args));
    }
    return map.get(key)!;
  };
}

/**
 * 동기적 메모이제이션 및 반환.
 * @param fn
 */
export function memoizeSync<T>(fn: (key: any, ...args: any[]) => T) {
  const map = new Map<any, T>();
  return (key: any, ...args: any[]): T => {
    if (!map.has(key)) {
      map.set(key, fn(key, ...args));
    }
    return map.get(key)!;
  };
}

export default class Cache<K, V> extends Map<K, V> {
  /**
   * 메모이제이션
   * @param cb
   */
  memoize(cb: (...args: K[]) => V): (arg: K) => V {
    return (arg: K) => {
      if (!this.has(arg)) this.set(arg, cb(arg));
      return this.get(arg) as V;
    };
  }

  static fibonacci(value: number) {
    const cache = new this<number, number>();

    const fib = cache.memoize(
      (value: number, first: number = 0, second: number = 1): number => {
        if (value === 0) return first;
        if (value === 1) return second;
        return fib(value - 2) + fib(value - 1);
      }
    );

    return fib(value);
  }

  static factorial(value: number) {
    const cache = new this<number, number>();

    const fac = cache.memoize((value: number) => {
      if (value <= 1) return 1;
      return value * fac(value - 1);
    });

    return fac(value);
  }
}

export const memoize1 = (fn: (arg: string) => any) => {
  const cache = {} as any;
  return function (arg: string) {
    if (typeof cache[arg] !== "undefined") {
      const result = fn(arg);
      cache[arg] = result;
    }
    return cache[arg];
  };
};

export const memoize2 = <K, V>(cb: (arg: K) => V) => {
  const cache = new Map<K, V>();

  return function (arg: K): V | undefined {
    if (!cache.has(arg)) {
      cache.set(arg, cb(arg));
    }
    return cache.get(arg);
  };
};

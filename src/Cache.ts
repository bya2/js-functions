export const memoize__es5 = (fn: (arg: string) => any) => {
  const cache = {} as any;
  return function (arg: string) {
    if (typeof cache[arg] !== "undefined") {
      const result = fn(arg);
      cache[arg] = result;
    }
    return cache[arg];
  };
};

export const memoize__es6Plus = <K, V>(cb: (arg: K) => V) => {
  const cache = new Map<K, V>();

  return function (arg: K): V | undefined {
    if (!cache.has(arg)) {
      cache.set(arg, cb(arg));
    }
    return cache.get(arg);
  };
};

/**
 * @param {Function} fn
 */
export const memoize__es5 = (fn) => {
  const cache = {};
  return function (arg) {
    if (typeof cache[arg] !== "undefined") {
      const result = fn(arg);
      cache[arg] = result;
    }
    return cache[arg];
  };
};

/**
 * @param {Function} fn
 */
export const memoize__es6Plus = (fn) => {
  const map = new Map();
  return function (arg) {
    if (!map.has(arg)) {
      const result = fn(arg);
      map.set(arg, result);
    }
    return map.get(arg);
  };
};

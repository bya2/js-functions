type MemoizeSync<R> = (fn: (arg: any) => R) => (arg: any) => R;

/**
 * 동기적 메모이제이션
 * @param fn
 */
const memoize: MemoizeSync<number> = (fn) => {
  const map = new Map();
  return (ix) => {
    map.has(ix) || map.set(ix, fn(ix));
    return map.get(ix);
  };
};

/**
 * 입력된 인덱스에 해당하는 피보나치의 수를 반환합니다.
 * @param index
 */
const memFib = memoize((ix) => {
  console.assert(ix >= 0);

  if (ix === 0) return 0;
  if (ix <= 2) return 1;

  if (ix & 1) {
    let n = ++ix >> 1;
    return memFib(n) ** 2 + memFib(--n) ** 2;
  } else {
    let n = ix / 2;
    const x = memFib(n);
    return (memFib(--n) * 2 + x) * x;
  }
}) as (index: number) => number;

export const Fib = {
  nth: memFib,
};

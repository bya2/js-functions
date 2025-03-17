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

/**
 *
 */
export function match() {
  return curry((regex: RegExp, s: string) => s.match(regex));
}

/**
 *
 */
export function pluck() {
  return curry((key: string, obj: any) => obj?.[key]);
}

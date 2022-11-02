export default class Func extends Function {
  /**
   * 매개변수 별로 함수의 차수를 분리
   * @param cb 콜백함수
   * @returns 매개변수로 분리된 함수
   */
  static curry(cb: any) {
    return (...args: any[]) => {
      if (args.length >= cb.length) return cb(...args);
      return this.curry(cb.bind(null, ...args));
    };
  }

  static match() {
    return this.curry((regex: RegExp, s: string) => s.match(regex));
  }

  static pluck() {
    return this.curry((key: string, obj: any) => obj?.[key]);
  }
}

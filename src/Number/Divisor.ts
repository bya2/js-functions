export default class Divisor {
  /**
   * 숫자가 약수를 홀수 개를 가지고 있는 지 리턴
   * @param _number
   */
  static isOddNumber(_number: number): boolean {
    return Number.isInteger(Math.sqrt(_number));
  }

  /**
   * 숫자에 대한 약수 리스트를 Set으로 리턴
   * @param _number
   */
  static setOf(_number: number): Set<number> {
    const set = new Set<number>();
    for (let i = 1, len = _number / 2; i <= len; ++i) if (_number % i === 0) set.add(i);
    set.add(_number);
    return set;
  }

  /**
   * 숫자에 대한 약수 리스트를 배열로 리턴
   * @param _number
   */
  static arrOf(_number: number): number[] {
    const arr = [];
    for (let i = 1, len = _number / 2; i <= len; ++i) if (_number % i === 0) arr.push(i);
    arr.push(_number);
    return arr;
  }
}

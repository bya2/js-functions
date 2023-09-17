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

export const get_divisor = (n: number): number[] => {
  const _0 = 0;
  const _1 = 1;
  const _2 = 2;
  let _n = n;
  const v = [];

  let count_divisors_2 = 0;

  while ((_n & 1) === 0) {
    v.push(_2 << count_divisors_2);
    count_divisors_2++;
    _n >>= 1;
  }

  const _x = 3;
  // const
  return [1];
};

// export function approximated_sqrt(n: number): number {
//   let num_bits = ()
// }

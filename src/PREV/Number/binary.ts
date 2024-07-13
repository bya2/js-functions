interface IBinary32 {
  /**
   * 이진 표현 상에서 0의 개수를 반환합니다.
   * @param n
   */
  countZeros(n: number): number;

  /**
   * 이진 표현 상에서 1의 개수를 반환합니다.
   * @param n
   */
  countOnes(n: number): number;

  /**
   * 이진 표현 상에서 선행 0의 개수를 반환합니다.
   * @param n
   */
  countLeadingZeros(n: number): number;

  /**
   * 이진 표현 상에서 선행 1의 개수를 반환합니다.
   * @param n
   */
  countLeadingOnes(n: number): number;

  /**
   * 이진 표현 상에서 후행 0의 개수를 반환합니다.
   * @param n
   */
  countTrailingZeros(n: number): number;

  /**
   * 이진 표현 상에서 후행 1의 개수를 반환합니다.
   * @param n
   */
  countTrailingOnes(n: number): number;

  /**
   * 비트를 지정된 수만큼 왼쪽으로 이동하고, 잘려진 비트를 후행으로 이동합니다.
   * @param n
   */
  rotateLeft(n: number, d: number): number;

  /**
   * 비트를 지정된 수만큼 오른쪽으로 이동하고, 잘려진 비트를 선행으로 이동합니다.
   * @param n
   */
  rotateRight(n: number, d: number): number;
}

export const Binary32: IBinary32 = {
  countOnes(n) {
    let count = 0;
    while (n) (n &= n - 1), ++count;
    return count;
  },

  countZeros(n) {
    let count = 0;
    while (n) {
      if (n % 2 === 0) ++count;
      n >>= 1;
    }
    return count;
  },

  countLeadingZeros(n) {
    let s = n.toString(2);
    let i = 0;
    for (; i <= s.length; ++i) {
      if (s[i]) break;
    }
    return i;
  },

  countLeadingOnes(n) {
    let s = n.toString(2);
    let i = 0;
    for (; i <= s.length; ++i) {
      if (!s[i]) break;
    }
    return i;
  },

  countTrailingZeros(n) {
    let count = 0;
    while (n % 2 === 0) (n >>= 1), ++count;
    return count;
  },

  countTrailingOnes(n) {
    let count = 0;
    while (n & 1) (n >>= 1), ++count;
    return count;
  },

  rotateLeft(n, d) {
    return (n << d) | (n >> (32 - d));
  },

  rotateRight(n, d) {
    return (n >> d) | (n << (32 - d));
  },
};

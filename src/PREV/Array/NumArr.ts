import Arr from "./Arr";

export default class NumArr extends Arr<number> {
  // 산술

  /**
   * 배열 요소들의 합
   * @returns Sum
   */
  getSum(): number {
    return this.reduce((acc, curr) => acc + curr, 0);
  }

  /**
   * 배열 요소들의 제곱의 합
   * @returns Sum of squares
   */
  getSumOfSquares(): number {
    return this.reduce((acc, curr) => acc + curr ** 2, 0);
  }

  /**
   * 배열 요소들의 평균 값
   * @returns Average
   */
  getAvg(): number {
    return this.getSum() / this.length;
  }

  /**
   * 각 요소들의 경우의 수
   * @returns The number of cases
   */
  getNumberOfCases(): number {
    return this.reduce((acc, curr) => acc * (curr + 1), 1);
  }

  /**
   * 최댓값과 최솟값
   * @returns
   */
  getMaximumAndMinimum(): [number, number] {
    const arr = [...this].sort((a, b) => a - b);
    return [arr[arr.length - 1], arr[0]];
  }

  /**
   * H-Index: 논문 인용횟수가 'N'이 넘는 논문이 'N'편 이상
   * @returns H-지수
   */
  findHIndex(): number {
    this.arrange([NumArr.VALUE], NumArr.DESC);
    let i;
    for (i = 0; i + 1 <= this[i]; ++i) {}
    return i;
  }

  /**
   * 하향 평준화:
   * 큰 수와 작은 수의 차이를 줄이기
   * @param _cost 배열들의 값을 뺄 값
   */
  downgrade(_cost = 0): void {
    this.arrange([NumArr.VALUE], NumArr.DESC);

    while (_cost && this[0]) {
      for (let i = 0, len = this.length; _cost && i < len; ++i) {
        if (this[i] >= this[0]) {
          --_cost;
          --this[i];
        } else {
          break;
        }
      }
    }
  }

  sliceFromSerializeMatrix() {}

  /**
   * 진행도와 한 번에 배포하는 수의 리스트
   * - 진행도: progress
   * - 진행율: speeds
   * - 완료까지 남은 턴: this
   * @returns
   */
  getPointsAtOnce(): number[] {
    const numArr: number[] = [];
    const arrStack = [this[0]];

    for (let i = 1, len = this.length; i < len; ++i) {
      if (arrStack[0] <= this[i]) {
        numArr.push(arrStack.length);
        arrStack.length = 0;
      }
      arrStack.push(this[i]);
    }
    numArr.push(this.length);

    return numArr;
  }

  /**
   * 정렬
   * @param _byList 정렬 기준
   * @param _in 정렬 순서
   * @returns THIS
   */
  arrange(_byList: number[] = [NumArr.VALUE], _in: number = 0): NumArr {
    return this.sort((a, b) => {
      let obj1: any, obj2: any;

      for (const _by of _byList) {
        switch (_by) {
          case NumArr.VALUE:
          default:
            [obj1, obj2] = [a, b];
            break;
        }
      }

      switch (_in) {
        case NumArr.ASC:
          return obj1 === obj2 ? 0 : obj1 < obj2 ? -1 : 1;
        case NumArr.DESC:
          return obj1 === obj2 ? 0 : obj1 > obj2 ? -1 : 1;
        default:
          return 0;
      }
    });
  }

  /**
   * 범위
   * @param from 시작
   * @param to 끝
   * @returns
   */
  static range(from: number, to: number) {
    if (typeof to === "undefined") [from, to] = [0, from];
    const arr = new NumArr();
    for (; from < to; from++) arr.push(from);
    return arr;
  }

  static sortedByCCWInTri(length: number): number[] {
    // START: 1
    const arr = Array.from({ length }, (_, i) =>
      Array(i + 1).fill(0)
    ) as number[][];

    for (let [len, row, col, val] = [length, -1, 0, 0]; len > 0; len -= 3) {
      for (let i = 0; i < len; ++i) arr[++row][col] = ++val;
      for (let [i, end] = [0, len - 1]; i < end; ++i) arr[row][++col] = ++val;
      for (let [i, end] = [0, len - 2]; i < end; ++i) arr[--row][--col] = ++val;
    }

    let nArr = [] as number[];
    for (let i = 0; i < length; ++i) {
      nArr = [...nArr, ...arr[i]];
    }

    return nArr;
  }
}

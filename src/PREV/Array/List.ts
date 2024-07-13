import { Length0, InvalidConstant } from "@/PREV/misc/messages";

class ArrayList<E = any> extends Array<E> {
  // 방향 상수
  static readonly LEFT = 101;
  static readonly RIGHT = 102;

  // 정렬 방향 상수
  static readonly ASC = 1;
  static readonly DESC = 2;

  // 정렬 기준 상수
  static readonly VALUE = 11;
  static readonly LENGTH = 12;

  /**
   * 두 배열 요소들의 합집합을 배열로 반환.
   * @param a
   * @param b
   */
  static union<E = any>(a: E[], b: E[]): E[] {
    return [...a, ...b.filter((e) => !a.includes(e))];
  }

  /**
   * 두 배열 요소들의 차집합을 배열로 반환.
   * @param a
   * @param b
   */
  static subtraction<E = any>(a: E[], b: E[]): E[] {
    return a.filter((e) => !b.includes(e));
  }

  /**
   * 두 배열 요소들의 교집합을 배열로 반환.
   * @param a
   * @param b
   */
  static intersection<E = any>(a: E[], b: E[]): E[] {
    return a.filter((e) => b.includes(e));
  }

  /**
   * 배열의 마지막 요소를 반환.
   */
  get last() {
    return this[this.length - 1];
  }

  /**
   * 배열의 길이가 0과 일치하는지 반환.
   */
  isEmpty(): boolean {
    return this.length === 0;
  }

  /**
   * 인덱스에 위치하는 두 요소의 값이나 참조가 일치하는지 반환.
   * @param index1
   * @param index2
   */
  isEqual(index1: number, index2: number): boolean {
    return this[index1] === this[index2];
  }

  /**
   * 인덱스에 위치하는 두 요소의 내부 값이 일치하는지 반환.
   * @param index1
   * @param index2
   */
  isDeepEqual(index1: number, index2: number): boolean {
    return JSON.stringify(this[index1]) === JSON.stringify(this[index2]);
  }

  /**
   * THIS가 배열 목록의 순서와 상관관계가 일치하는지 반환.
   * @param list
   */
  isInOrderWith(list: E[]): boolean {
    for (let i = 0, len = this.length; i < len; ++i) {
      if (!list.includes(this[i]) || this[i] === list.shift()) continue;
      return false;
    }
    return true;
  }

  /**
   * 인덱스에 요소를 가지고 있는지 반환.
   * @param at
   */
  has(at: number): boolean {
    return this.length >= at && typeof this[at] !== "undefined";
  }

  /**
   * 요소 간의 위치를 변경.
   * @param index1
   * @param index2
   */
  swap(index1: number, index2: number): void {
    [this[index1], this[index2]] = [this[index2], this[index1]];
  }

  /**
   * 배열 요소 1칸씩 회전.
   * @param direction
   */
  rotateOnce(direction: number): void {
    if (this.length <= 0) {
      console.warn(Length0);
      return;
    }

    switch (direction) {
      case ArrayList.LEFT:
        this.push(this.shift()!);
        break;
      case ArrayList.RIGHT:
        this.splice(0, 0, this.pop()!);
        break;
      default:
        console.warn(InvalidConstant);
    }
  }
}

export default ArrayList;

export default class Arr<T = any> extends Array<T> {
  get last(): T {
    return this[this.length - 1];
  }

  /**
   * @returns boolean: empty
   */
  isEmpty(): boolean {
    return this.length === 0;
  }

  /**
   * @param _index1
   * @param _index2
   */
  isEqual(_index1: number, _index2: number): boolean {
    return Object.is(this[_index1], this[_index2]);
  }

  /**
   * @param _index1
   * @param _index2
   */
  isDeepEqual(_index1: number, _index2: number): boolean {
    return JSON.stringify(this[_index1]) === JSON.stringify(this[_index2]);
  }

  /**
   * 매개변수로 받는 순열과 THIS의 순서 관계에 상관 관계가 있는지 리턴
   * @param _permutation 순열
   */
  isInOrderWith(_permutation: T[]): boolean {
    for (let i = 0, len = this.length; i < len; ++i) {
      if (!_permutation.includes(this[i]) || this[i] === _permutation.shift()) continue;
      return false;
    }
    return true;
  }

  /**
   * @param _at 위치
   */
  has(_at: number): boolean {
    return this.length >= _at && typeof this[_at] !== "undefined";
  }

  /**
   * @param _obj 대상
   * @param _at 위치
   */
  insert(_obj: T, _at: number): void {
    this.splice(_at, 0, _obj);
  }

  /**
   * @param _obj 대상
   * @param _at 위치
   */
  replace(_obj: T, _at: number): void {
    this.splice(_at, 1, _obj);
  }

  /**
   * @param _at 위치
   */
  delete(_at: number): void {
    this.splice(_at, 1);
  }

  /**
   * @param _index1
   * @param _index2
   */
  swap(_index1: number, _index2: number): void {
    [this[_index1], this[_index2]] = [this[_index2], this[_index1]];
  }

  /**
   * 같은 데이터를 가진 요소들 중 (_value - 1)개씩 필터링
   * @param _value 남길 요소의 갯수
   * @returns THIS
   */
  filterLessThan(_value: number): T[] {
    const map = new Map();
    return this.filter((el) => {
      if (map.get(el) >= _value) return false;
      map.set(el, map.has(el) ? map.get(el) + 1 : 1);
      return true;
    });
  }

  /**
   * @param direction 방향
   */
  rotate(direction: number = Arr.LEFT) {
    if (this.length >= 1) {
      switch (direction) {
        case Arr.LEFT:
          this.push(this.shift() as T);
          break;
        case Arr.RIGHT:
          this.splice(0, 0, this.pop() as T);
          break;
      }
    }
  }

  static ASC = 1;
  static DESC = 2;
  static VALUE = 11;
  static LENGTH = 12;
  static LEFT = 101;
  static RIGHT = 102;

  // static union<T>(arr1: T[], arr2: T[]) {
  //   //
  // }

  // static intersection<T>(arr1: T[], arr2: T[]) {
  //   //
  // }
}

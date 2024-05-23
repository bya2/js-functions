export default class Hole<T> {
  element: T;
  pos: number;
  #arr: T[];

  constructor(data: T[], pos: number) {
    console.assert(pos >= 0 && pos < data.length);
    this.#arr = data;
    this.pos = pos;
    this.element = data[pos]!;
  }

  /**
   * 참조하는 배열의 `index`에 위치하는 요소를 반환합니다.
   * @param index
   */
  get(index: number): T {
    console.assert(index !== this.pos);
    console.assert(index >= 0 && index < this.#arr.length);
    return this.#arr[index]!;
  }

  /**
   * `Hole`의 위치를 변경합니다.
   * - `index`에 위치하는 요소와 `Hole`의 요소를 뒤바꿉니다.
   * - `Hole`의 위치를 `index`로 변경합니다.
   * @param index
   */
  moveTo(index: number): void {
    console.assert(index !== this.pos);
    console.assert(index >= 0 && index < this.#arr.length);
    this.#arr.swap(index, this.pos);
    this.pos = index;
  }
}

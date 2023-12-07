interface ImplHole<T> {}

export default class Hole<T> implements ImplHole<T> {
  data: T[]; // 데이터의 슬라이스
  #elt: T; // Hole에 의해 추출된 원소
  #pos: number; // 현재 Hole의 인덱스

  constructor(data: T[], pos: number) {
    this.data = data;
    this.#pos = pos;
  }

  get pos(): number {
    return this.#pos;
  }

  get element(): T {
    return this.#elt;
  }

  /**
   * 지정된 인덱스에 있는 원소를 반환
   * @param index
   * @returns
   */
  get(index: number): T {
    return this.data[index];
  }

  /**
   * Hole을 새로운 위치로 이동
   * 1. 홀의 인덱스 이동
   * 2.
   * @param index
   * @returns
   */
  moveTo(index: number) {}
}

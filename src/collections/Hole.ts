interface ImplHole<T> {
  /**
   * 지정된 인덱스에 있는 원소를 반환
   * @param index
   */
  get(index: number): T;

  /**
   * Hole을 새로운 위치로 이동
   * 1.
   * 2. 홀의 인덱스 이동
   * @param index
   */
  moveTo(index: number): void;
}

export default class Hole<T> implements ImplHole<T> {
  _inner: T[]; // 데이터의 슬라이스
  // _elt: T; // Hole에 의해 추출된 원소
  _pos: number; // 현재 Hole의 인덱스

  constructor(data: T[], pos: number) {
    this._inner = data;
    this._pos = pos;
    // this._elt = data[pos];
  }

  get pos(): number {
    return this._pos;
  }

  get element(): T {
    return this._inner[this._pos];
    // return this._elt;
  }

  get(index: number): T {
    console.assert(index !== this._pos);
    console.assert(index < this._inner.length);

    return this._inner[index];
  }

  swap(i: number, j: number) {
    [this._inner[i], this._inner[j]] = [this._inner[j], this._inner[i]];
  }

  moveTo(index: number) {
    console.assert(index !== this._pos);
    console.assert(index < this._inner.length);

    this.swap(index, this._pos);
    this._pos = index;
  }
}

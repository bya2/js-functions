interface ImplArr<T> {}

export default class Arr<T> extends Array<T> implements ImplArr<T> {
  static get [Symbol.species]() {
    return Array;
  }

  swap(i: number, j: number) {
    const temp = this[i];
    this[i] = this[j];
    this[j] = temp;
  }
}

import Arr from "./Arr";

export default class Stack<T = any> extends Arr<T> {
  get peek() {
    return this[this.length - 1];
  }

  // 상단부터 탐색
  search(data: T) {
    for (let i = this.length - 1; i >= 0; --i) {
      if (JSON.stringify(data) === JSON.stringify(this[i])) {
        return i;
      }
    }
    return -1;
  }
}

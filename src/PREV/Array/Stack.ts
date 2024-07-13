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

const examples = {
  배열_내_연속된_중복_숫자_제거: (arr: number[]) => {
    const STACK = new Stack();
    STACK.push(arr[0]);
    for (let i = 1; i < arr.length; ++i) {
      if (STACK.peek !== arr[i]) {
        STACK.push(arr[i]);
      }
    }
    return STACK;
  },
};

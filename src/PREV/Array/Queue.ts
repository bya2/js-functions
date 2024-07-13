import Arr from "./Arr";

export default class Queue<T = any> extends Arr<T> {
  get front() {
    return this[0];
  }
  get rear() {
    return this[this.length - 1];
  }

  public enqueue = this.push;
  public dequeue = this.shift;
}

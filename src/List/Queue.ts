import SinglyLinkedList from "./SinglyLinkedList";

export default class Queue<E = any> extends SinglyLinkedList<E> {
  get front() {
    return this.head;
  }

  get rear() {
    return this.tail;
  }

  enqueue = this.addLast;

  dequeue = this.shift;
}

import { SinglyLinkedListNode, DoublyLinkedListNode } from "./Node";

class LinkedList {
  #head = null;
  #tail = null;
  #size = null;

  set head(node) {
    this.#head = node;
  }

  get head() {
    return this.#head;
  }

  get size() {
    return this.#size;
  }
}

interface S {}

interface D {}

export class SinglyLinkedList extends LinkedList {}

export class DoublyLinkedList extends LinkedList {}

const MSG__INVALID_INDEX = "";
const MSG__NOT_EXISTS = "";
const MSG__ALREADY_EXISITS = "";

class Node<T> {
  element: T;
  neighbors: Set<Node<T>> = new Set();
  flag: any;

  constructor(x: T) {
    this.element = x;
  }
}

export default class SimpleGraph<T> {
  nodes: Map<number, Node<T>> = new Map();

  neighbors(ix: number) {}

  add(item: T) {
    const idx = this.nodes.size;
    this.nodes.set(idx, new Node(item));
    return this.nodes.size;
  }

  connect(aIx: number, bIx: number) {
    console.assert(aIx >= 0 && aIx < this.nodes.size, MSG__INVALID_INDEX);
    console.assert(bIx >= 0 && bIx < this.nodes.size, MSG__INVALID_INDEX);

    const a = this.nodes.get(aIx);
    const b = this.nodes.get(bIx);

    if (a === undefined || b === undefined) {
      throw new Error(MSG__NOT_EXISTS);
    }

    console.assert(!a.neighbors.has(b), MSG__ALREADY_EXISITS);
    console.assert(!b.neighbors.has(a), MSG__ALREADY_EXISITS);

    a.neighbors.add(b);
    b.neighbors.add(a);
  }

  remove(idx: number) {
    const a = this.nodes.get(idx);

    if (a === undefined) {
      console.warn(MSG__NOT_EXISTS);
    } else {
      this.nodes.delete(idx);
      for (const adj of a.neighbors) adj.neighbors.delete(a);
    }
  }

  disconnect(idx1: number, idx2: number) {
    const a = this.nodes.get(idx1);
    const b = this.nodes.get(idx2);

    if (a === undefined || b === undefined) {
      throw new Error(MSG__NOT_EXISTS);
    }

    console.assert(!a.neighbors.has(b), MSG__ALREADY_EXISITS);
    console.assert(!b.neighbors.has(a), MSG__ALREADY_EXISITS);

    a.neighbors.delete(b);
    b.neighbors.delete(a);
  }
}

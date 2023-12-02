interface ImplGraph<T, Ix> {
  addNode(item: T): Ix;
  removeNode(id: Ix): void;
  addEdge(a: Ix, b: Ix): Ix;
  removeEdge(id: Ix): void;
}

export class Node<T, Ix> {
  _ix: Ix;
  _inner: T;
  _neighbors: Ix[] = [];

  constructor(item: T, id: Ix) {
    this._ix = id;
    this._inner = item;
  }

  get item() {
    return this._inner;
  }

  get id() {
    return this._ix;
  }
}

export class Edge<T, Ix> {
  _ix: Ix;
  _inner: T;

  

  get weight() {
    return this._inner;
  }
}

export default class Graph<T, Ix> implements ImplGraph<T, Ix> {
  _nodes: Map<Ix, Node<T, Ix>> = new Map();
  _map: Map<Ix, Iterable<Ix>> = new Map();

  addNode(item: T): Ix {}
}

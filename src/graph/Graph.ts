interface implGraph {
  add(): void;
  remove(): void;
  connect(): void;
  disconnect(): void;
}

export class Id<T> {
  _inner: T;

  constructor(id: T) {
    this._inner = id;
  }
}

export class Node<T = any, Id = string> {
  _weight: T;

  constructor(data: T) {
    this._weight = data;
  }

  get weight() {
    return this._weight;
  }
}

// export default class Graph<N> implements implGraph {
//   _inner: Map<N>;
// }

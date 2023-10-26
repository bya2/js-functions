class Node<T> {
  _inner: T;
  _marked: boolean = false;

  constructor(data: T) {
    this._inner = data;
  }
}

interface ImplGraph {
  add(): void;
  DFS(): void;
  BFS(): void;
}

export default class Graph<T> implements ImplGraph {
  _inner: Map<T, Set<T>> = new Map();

  constructor() {}

  add() {}

  DFS() {}

  BFS() {}
}

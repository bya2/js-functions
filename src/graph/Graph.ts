interface ImplId<T> {
  id(): T;
}

class Id<T> implements ImplId<T> {
  _inner: T;

  constructor(id: T) {
    this._inner = id;
  }

  id(): T {
    return this._inner;
  }
}

// class _Node<T> {
//   _inner: T;

//   constructor(data: T) {
//     this._inner = data;
//   }

//   get data() {
//     return this._inner;
//   }
// }

interface implGraph<T, Ix> {
  // Node
  add(item: T): Id<Ix>;
  remove(): void;

  // Edge
  connect(): void;
  disconnect(): void;
  reset(): void;

  nodeCount(): number;
  edgeCount(): number;

  clone(): ThisType<T>;
}

const Graph = class<T, Ix = symbol> implements implGraph<T, Ix> {
  _nodes = new Map<Ix, T>();
  _neighbors = new Map<Ix, Ix[]>();

  constructor() {}

  add(item: T): Id<Ix> {
    const ix = Symbol(JSON.stringify(item)) as Ix;
    const id = new Id(ix);
    this._nodes.set(ix, item);
    this._neighbors.set(ix, []);
    return id;
  }

  // remove(id: symbol): void {
  //   if (this._neighbors.has(id)) {
  //     for (const nid of this._neighbors.get(id)!) {
  //       this._neighbors.get(nid).
  //     }
  //     this._nodes.delete(id);
  //   } else {
  //     console.warn("");
  //   }
  // }

  connect() {
    // 노드 리스트에 추가
    // 맵에 추가
  }
};

interface ImplDFS<T> {}

export const DFS = class<T> implements ImplDFS<T> {
  stack: T[] = [];
  discovered: Map<T, Set<T>> = new Map<T, Set<T>>();
};

interface ImplBFS {}

export const BFS = class implements ImplBFS {};

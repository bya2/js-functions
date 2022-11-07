export interface NumMapInterface<K> {
  increase: (key: K, value: number) => Map<K, number>;
  decrease: (key: K, value: number) => Map<K, number>;
  add: (...keys: K[]) => number;
  subtract: (...keys: K[]) => number;
  findSpareKey: (arr: K[]) => K | undefined;
  requestInScope: (elements: K[], scopes: number) => number;
  getKeysWithMaximum: (least: number) => K[];
  getNumberOfCase: () => number;
}

export interface AdjacencyListGraphNodeInterface<T> {
  data: T;
  adjacencyList: Set<AdjacencyListGraphNodeInterface<T>>;
  isMarked: boolean;
  mark: () => void;
  clear: () => void;
}

export interface AdjacencyListGraphInterface<T> {
  add: (obj: T) => void;
  remove: (obj: T) => void;
  connect: (obj1: T, obj2: T) => void;
  connectTo: (list: [T, T][]) => void;
  connectAll: () => void;
  disconnect: (obj1: T, obj2: T) => void;
  searchDepthFirst: (validator?: (data: T, ...args: any[]) => boolean) => { height: number };
  searchBreadthFirst: (root: T) => { n: number; height: number };
  separateGraphAndGetNumberOfNodes?: (list: [T, T][]) => [number, number][];
}

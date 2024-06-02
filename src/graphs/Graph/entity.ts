export class Node<N> {
  weight: N;
  next: [number, number];
  flag: any;

  constructor(weight: N) {
    this.weight = weight;
    this.next = [Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER];
  }
}

export class Edge<E> {
  weight: E;
  node: [number, number];
  next: [number, number];
  flag: any;

  constructor(source: number, target: number, weight: E) {
    this.weight = weight;
    this.node = [source, target];
    this.next = [Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER];
  }
}

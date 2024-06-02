class Node<N> {
  weight: N;
  next: number[];

  constructor(weight: N) {
    this.weight = weight;
    this.next = [];
  }
}

class Edge<E> {
  weight: E;
  node: [number, number];

  constructor(source: number, target: number, weight: E) {
    this.weight = weight;
    this.node = [source, target];
  }
}

class Graph<N, E> {
  nodes: Node<N>[] = [];
  edges: Edge<E>[] = [];

  add(weight: N) {
    this.nodes.push(new Node(weight));
    return this.nodes.length - 1;
  }

  connect(i: number, j: number, weight: E) {}

  *neighbors(nodeIx: number): Generator<number> {
    const { nodes, edges } = this;

    const node = nodes[nodeIx]!;

    for (const edgeIx of node.next) {
      const edge = edges[edgeIx]!;
      yield edge.node[1];
    }
  }
}

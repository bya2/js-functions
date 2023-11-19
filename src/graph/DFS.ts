interface implDFS<N> {
  moveTo(node: N): void;
}

export default class DFS<N, G extends Map<N, Iterable<N>> = Map<N, N[]>> implements implDFS<N> {
  stack: N[] = [];
  g: G;
  discovered: Map<N, boolean>;
  lv: number = 0;

  constructor(graph: G, root: N) {
    this.discovered = new Map();
    for (const node of graph.keys()) {
      this.discovered.set(node, false);
    }
    this.g = graph;
    this.moveTo(root);
  }

  moveTo(node: N) {
    this.stack.length = 0;
    this.stack.push(node);
  }

  *[Symbol.iterator]() {
    let node;
    while ((node = this.stack.pop())) {
      if (this.discovered.get(node)) continue;

      this.discovered.set(node, true);
      yield node;

      for (const adj of this.g.get(node)!) {
        if (this.discovered.get(adj)) this.stack.push(adj);
      }
    }
  }
}

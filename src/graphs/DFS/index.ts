interface IntoNeighbors<N> {
  neighbors(node: N): Iterable<N>;
}

interface ISearch<N> {
  moveTo(node: N): void;
  next(validator: (node: N) => unknown): N | undefined;
}

export default class DFS<N, G extends IntoNeighbors<N>> implements ISearch<N> {
  stack: N[];
  discovered: Set<N>;
  graph: G;
  validator: (node: N) => unknown;

  constructor(graph: G, validator?: (node: N) => unknown) {
    this.graph = graph;
    this.stack = [];
    this.discovered = new Set();
    this.validator = validator ?? (() => true);
  }

  moveTo(node: N) {
    this.stack.length = 0;
    this.stack.push(node);
  }

  next(validator = this.validator): N | undefined {
    while (this.stack.length) {
      const node = this.stack.pop()!;

      if (this.discovered.has(node) || !validator(node)) {
        continue;
      }

      this.discovered.add(node);

      for (const succ of this.graph.neighbors(node)) {
        if (!this.discovered.has(succ)) {
          this.stack.push(succ);
        }
      }

      return node;
    }

    return undefined;
  }

  reset(): void {
    this.stack.length = 0;
    this.discovered.clear();
  }

  *iter(validator = this.validator): Generator<N> {
    while (this.stack.length) {
      const node = this.stack.pop()!;

      if (this.discovered.has(node) || !validator(node)) {
        continue;
      }

      this.discovered.add(node);

      for (const succ of this.graph.neighbors(node)) {
        if (!this.discovered.has(succ)) {
          this.stack.push(succ);
        }
      }

      yield node;
    }
  }
}

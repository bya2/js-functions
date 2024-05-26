import { IntoNeighbors } from "../types";

export default class DFS<N, G extends IntoNeighbors<N>> {
  stack: N[];
  discovered: Set<N>;
  graph: G;
  validator: (node: N) => unknown;

  constructor(graph: G, root: N, validator?: (node: N) => unknown) {
    this.graph = graph;
    this.stack = [root];
    this.discovered = new Set([root]);
    this.validator = validator ?? (() => true);
  }

  moveTo(node: N): void {
    this.stack.length = 0;
    this.stack.push(node);
  }

  next(validator = this.validator): N | undefined {
    const { stack, discovered, graph } = this;

    while (stack.length) {
      const node = stack.pop()!;

      if (discovered.has(node) || !validator(node)) {
        continue;
      }

      discovered.add(node);

      for (const succ of graph.neighbors(node)) {
        if (!discovered.has(succ)) {
          stack.push(succ);
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
    const { stack, discovered, graph } = this;

    while (stack.length) {
      const node = stack.pop()!;

      if (discovered.has(node) || !validator(node)) {
        continue;
      }

      discovered.add(node);

      for (const succ of graph.neighbors(node)) {
        if (!discovered.has(succ)) {
          stack.push(succ);
        }
      }

      yield node;
    }
  }
}

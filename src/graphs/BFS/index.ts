import SLL from "@/collections/SLL";
import { IntoNeighbors } from "../types";

export default class BFS<N, G extends IntoNeighbors<N>> {
  queue: SLL<N>;
  discovered: Set<N>;
  graph: G;
  validator: (node: N) => unknown;

  constructor(graph: G, root: N, validator?: (node: N) => unknown) {
    this.graph = graph;
    this.queue = new SLL(root);
    this.discovered = new Set([root]);
    this.validator = validator ?? (() => true);
  }

  next(validator = this.validator): N | undefined {
    const { queue, discovered, graph } = this;

    while (queue.length) {
      const node = queue.popFront()!;

      if (!validator(node)) {
        continue;
      }

      for (const succ of graph.neighbors(node)) {
        if (!discovered.has(succ) && discovered.add(succ)) {
          queue.pushBack(succ);
        }
      }

      return node;
    }

    return undefined;
  }

  reset(): void {
    this.queue.clear();
    this.discovered.clear();
  }

  *iter(validator = this.validator): Generator<N> {
    const { queue, discovered, graph } = this;

    while (queue.length) {
      const node = queue.popFront()!;

      if (!validator(node)) {
        continue;
      }

      for (const succ of graph.neighbors(node)) {
        if (!discovered.has(succ) && discovered.add(succ)) {
          queue.pushBack(succ);
        }
      }

      yield node;
    }
  }
}

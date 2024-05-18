import SLL from "@/collections/SLL";
import { IntoNeighbors } from "../types";

export function* iterBFS<N, G extends IntoNeighbors<N>>(
  graph: G,
  root: N
): Generator<N> {
  const queue = new SLL(root);
  const discovered = new Set([root]);

  while (queue.length) {
    const node = queue.popFront()!;

    for (const succ of graph.neighbors(node)) {
      if (discovered.has(succ)) {
        queue.pushBack(succ);
        discovered.add(succ);
      }
    }

    yield node;
  }
}

export default class BFS<N, G extends IntoNeighbors<N>> {
  queue: SLL<N>;
  discovered: Set<N>;
  graph: G;

  constructor(graph: G, root: N, validator?: (node: N) => unknown) {
    this.graph = graph;
    this.queue = new SLL(root);
    this.discovered = new Set([root]);
    this.validator = validator ?? (() => true);
  }

  validator: (node: N) => unknown;

  next(graph: G = this.graph): Option<N> {
    const { queue, discovered, validator } = this;

    while (queue.length) {
      const node = queue.popFront();
      if (!node) break;
      if (!validator(node)) continue;

      for (const succ of graph.neighbors(node)) {
        if (!discovered.has(succ)) {
          queue.pushBack(succ);
          discovered.add(succ);
        }
      }

      return Some(node);
    }

    return None;
  }

  reset(): void {
    this.queue.clear();
    this.discovered.clear();
  }

  *iter(graph: G = this.graph): Generator<Option<N>> {
    const { queue, discovered, validator } = this;

    while (queue.length) {
      const node = queue.popFront()!;
      if (!validator(node)) continue;

      for (const succ of graph.neighbors(node)) {
        if (!discovered.has(succ)) {
          queue.pushBack(succ);
          discovered.add(succ);
        }
      }

      yield Some(node);
    }
  }
}

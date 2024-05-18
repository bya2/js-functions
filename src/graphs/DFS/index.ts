import { IntoNeighbors } from "../types";

export function* iterDFS<N, G extends IntoNeighbors<N>>(graph: G, root: N) {
  const stack: N[] = [root];
  const discovered: Set<N> = new Set();

  while (stack.length) {
    const node = stack.pop()!;

    discovered.add(node);

    for (const succ of graph.neighbors(node)) {
      discovered.has(succ) || stack.push(succ);
    }

    yield node;
  }
}

export default class DFS<N, G extends IntoNeighbors<N>> {
  stack: N[];
  discovered: Set<N> = new Set();
  graph: G;

  constructor(graph: G, root: N, validator?: (node: N) => unknown) {
    this.graph = graph;
    this.stack = [root];
    this.validator = validator ?? (() => true);
  }

  validator: (node: N) => unknown;

  moveTo(node: N): void {
    this.stack.length = 0;
    this.stack.push(node);
  }

  next(graph: G = this.graph): Option<N> {
    const { stack, discovered, validator } = this;

    while (stack.length) {
      const node = stack.pop();
      if (!node) break;
      if (!validator(node)) continue;

      discovered.add(node);

      for (const succ of graph.neighbors(node)) {
        if (!discovered.has(succ)) {
          stack.push(succ);
        }
      }

      return Some(node);
    }

    return None;
  }

  reset(): void {
    this.stack.length = 0;
    this.discovered.clear();
  }

  *iter(graph: G = this.graph): Generator<Option<N>> {
    const { stack, discovered, validator } = this;

    while (stack.length) {
      const node = stack.pop()!;
      if (!validator(node)) continue;

      discovered.add(node);

      for (const succ of graph.neighbors(node)) {
        if (!discovered.has(succ)) {
          stack.push(succ);
        }
      }

      yield Some(node);
    }
  }
}

import { IntoNeighbors } from "../types";

function visit<T>() {
  const cache = new Set();
  return (arg: T) => {
    if (cache.has(arg)) {
      return 1;
    } else {
      cache.add(arg);
      return 0;
    }
  };
}

class VM {
  cache: Set<unknown>;

  constructor(...items: any[]) {
    const cache = new Set();
    for (const item of items) {
      cache.add(item);
    }
    this.cache = cache;
  }

  visit(x: any): boolean {
    if (this.cache.has(x)) {
      return true;
    } else {
      this.cache.add(x);
      return false;
    }
  }

  isVisit(x: any): boolean {
    return this.cache.has(x);
  }
}

export default class DFSPostOrder<N, G extends IntoNeighbors<N>> {
  stack: N[];
  discovered: Set<N>;
  finished: Set<N>;
  graph: G;
  validator: (node: N) => unknown;

  constructor(graph: G, root: N, validator?: (node: N) => unknown) {
    this.graph = graph;
    this.stack = [root];
    this.discovered = new Set([root]);
    this.finished = new Set([root]);
    this.validator = validator ?? (() => true);
  }

  moveTo(node: N): void {
    this.stack.length = 0;
    this.stack.push(node);
  }

  next(validator = this.validator): N | undefined {
    const { stack, discovered, finished, graph } = this;

    while (stack.length) {
      const node = stack[stack.length - 1]!;

      if (!validator(node)) {
        stack.length--;
        continue;
      }

      if (!discovered.has(node) && discovered.add(node)) {
        for (const succ of graph.neighbors(node)) {
          if (!discovered.has(succ)) {
            stack.push(succ);
          }
        }
      } else {
        stack.length--;
        if (!finished.has(node) && finished.add(node)) {
          return node;
        }
      }
    }

    return undefined;
  }

  reset(): void {
    this.stack.length = 0;
    this.discovered.clear();
    this.finished.clear();
  }

  *iter(validator = this.validator): Generator<N> {
    const { stack, discovered, finished, graph } = this;

    while (stack.length) {
      const node = stack[stack.length - 1]!;

      if (!validator(node)) {
        stack.length--;
        continue;
      }

      if (!discovered.has(node) && discovered.add(node)) {
        for (const succ of graph.neighbors(node)) {
          if (!discovered.has(succ)) {
            stack.push(succ);
          }
        }
      } else {
        stack.length--;
        if (!finished.has(node) && finished.add(node)) {
          yield node;
        }
      }
    }
  }
}

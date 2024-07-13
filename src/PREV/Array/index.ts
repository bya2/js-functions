// import DFS from "@/graphs/DFS";
// import { IntoNeighbors } from "@/graphs/types";

class DFS<N, G extends { neighbors(node: N): Iterable<N> }> {
  stack: N[] = [];

  constructor(g: G) {}

  moveTo(node: N) {
    this.stack.length = 0;
    this.stack.push(node);
  }

  next() {
    while (this.stack.length) {
      const node = this.stack.pop()!;
    }
  }
}

export function combine(arr: string[], length: number) {
  const combinations: string[] = [];

  const stack = [] as { acc: string[]; index: number }[];

  stack.push({
    acc: [],
    index: 0,
  });

  while (stack.length) {
    const node = stack.pop()!;

    if (node.acc.length === length) {
      combinations.push(node.acc.join(""));
      return;
    }

    for (let i = node.index; i < arr.length; ++i) {
      stack.push({
        acc: node.acc,
        index: i + 1,
      });
    }
  }
}

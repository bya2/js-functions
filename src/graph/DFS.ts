interface ImplDFS {}

export default class DFS<N, VM> implements ImplDFS {
  stack: N[] = [];
  discovered: VM = new Map();

  constructor<G>(graph: G, root: any) {}

  moveTo(root: N) {
    this.stack.length = 0;
    this.stack.push(root);
  }
}

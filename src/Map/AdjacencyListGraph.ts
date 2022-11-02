import Queue from "@/Array/Queue";

interface NodeInterface<D> {
  data: D;
  adjacencyList: Set<NodeInterface<D>>;
  isMarked: boolean;
  mark: () => void;
  clear: () => void;
}

export class Node<D extends object = any> implements NodeInterface<D> {
  data;
  adjacencyList;
  isMarked = false;

  constructor(data: D, adjacencyList = new Set<NodeInterface<D>>()) {
    this.data = data;
    this.adjacencyList = adjacencyList;
  }

  mark() {
    this.isMarked = true;
  }

  clear() {
    this.isMarked = false;
  }
}

type CB<D> = (data: D, ...args: any[]) => [boolean, any[]];

interface AdjacencyListGraphInterface<D> {
  root: NodeInterface<D>;
  createNode: (node: NodeInterface<D>) => void;
  createEdge: (node1: NodeInterface<D>, node2: NodeInterface<D>) => void;
  searchDepthFirst: (cb?: CB<D>, args?: any[]) => { height: number };
  searchBreadthFirst: (cb?: CB<D>, args?: any[]) => { height: number };
}

export default class AdjacencyListGraph<D extends object = any>
  extends Map<NodeInterface<D>, Set<NodeInterface<D>>>
  implements AdjacencyListGraphInterface<D>
{
  public root;
  constructor(root: NodeInterface<D>) {
    super();
    this.root = root;
  }

  createNode(node: NodeInterface<D>) {
    if (!this.has(node)) {
      this.set(node, new Set<NodeInterface<D>>());
    } else {
      //
    }
  }

  createEdge(node1: NodeInterface<D>, node2: NodeInterface<D>) {
    if (this.has(node1) && this.has(node2)) {
      this.get(node1)?.add(node2);
      this.get(node2)?.add(node1);
      node1.adjacencyList.add(node2);
      node2.adjacencyList.add(node1);
    } else {
      //
    }
  }

  connectAllNodes() {
    for (const node1 of this.keys()) {
      for (const node2 of this.keys()) {
        if (!Object.is(node1, node2)) {
          this.createEdge(node1, node2);
        }
      }
    }
  }

  searchDepthFirst(cb?: CB<D>, args: any[] = []): { height: number } {
    let height = 0;

    const DFS = (curr: NodeInterface<D>, depth: number, params: any[]) => {
      if (this.get(curr)) {
        height = Math.max(height, depth);

        curr.isMarked = true;
        for (const adj of this.get(curr) as Set<NodeInterface<D>>) {
          if (!adj.isMarked) {
            const [condition, ...params] = cb?.(adj.data, ...args) || [true];
            if (condition) DFS(adj, 0, params);
          }
        }
        curr.isMarked = false;
      }
    };

    for (const node of this.keys()) {
      const [condition, ...params] = cb?.(node.data, ...args) || [true];
      if (condition) DFS(node, 0, params);
    }

    return {
      height,
    };
  }

  searchBreadthFirst(cb?: CB<D>, args: any[] = []): { height: number } {
    const queue = new Queue<NodeInterface<D>>();
    queue.enqueue(this.root);
    this.root.mark();

    let depth = 0;
    for (; !queue.isEmpty(); ++depth) {
      for (let queueSize = queue.length; queueSize > 0; --queueSize) {
        const curr = queue.dequeue() as NodeInterface<D>;

        for (const adj of this.get(curr) as Set<NodeInterface<D>>) {
          if (!adj.isMarked) {
            queue.enqueue(adj);
            adj.mark();
          }
        }
      }
    }

    return {
      height: depth,
    };
  }
}

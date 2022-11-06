import Queue from "@/Array/Queue";
import { WARN_NodeAlreadyExist, WARN_NoSuchNodeExist } from "@/misc/messages";
import { AdjacencyListGraphNodeInterface, AdjacencyListGraphInterface } from "@/misc/interfaces";

type CB<D> = (data: D, ...args: any[]) => [boolean, any[]];

export class Node<D extends object = any> implements AdjacencyListGraphNodeInterface<D> {
  data;
  adjacencyList = new Set<Node<D>>();
  isMarked = false;

  constructor(data: D) {
    this.data = data;
  }

  mark() {
    this.isMarked = true;
  }

  clear() {
    this.isMarked = false;
  }
}

export default class AdjacencyListNodeGraph<D extends object = any>
  extends Map<Node<D>, Set<Node<D>>>
  implements AdjacencyListGraphInterface<Node<D>>
{
  root;

  constructor(root: Node<D>) {
    super();
    this.root = root;
  }

  /**
   * 인접 리스트 그래프 노드 추가(인접 리스트의 키에 해당하는 노드를 추가)
   * @param node
   */
  add(node: Node<D>): void {
    if (!this.has(node)) {
      this.set(node, new Set<Node<D>>());
    } else {
      console.warn(WARN_NodeAlreadyExist);
    }
  }

  /**
   * 인접 리스트 그래프의 노드 간 간선 추가(인접 리스트의 키에 매핑되는 리스트에 노드를 추가)
   * @param node1
   * @param node2
   */
  connect(node1: Node<D>, node2: Node<D>): void {
    if (this.has(node1) && this.has(node2)) {
      this.get(node1)!.add(node2);
      this.get(node2)!.add(node1);
    } else {
      console.warn(WARN_NoSuchNodeExist);
    }
  }

  /**
   * 인접 리스트 그래프의 모든 노드 간 간선 추가
   */
  connectAll(): void {
    for (const node1 of this.keys()) {
      for (const node2 of this.keys()) {
        if (node1 !== node2) {
          this.connect(node1, node2);
        }
      }
    }
  }

  /**
   * 인접 리스트 그래프의 노드 간 간선 제거(인접 리스트의 키에 매핑되는 리스트에서 노드를 제거)
   * @param node1
   * @param node2
   */
  disconnect(node1: Node<D>, node2: Node<D>): void {
    if (this.has(node1) && this.has(node2)) {
      this.get(node1)!.delete(node2);
      this.get(node2)!.delete(node1);
    } else {
      console.warn(WARN_NoSuchNodeExist);
    }
  }

  /**
   * 깊이 우선 탐색을 통해 높이 등 그래프 정보를 리턴
   * @param validator
   */
  searchDepthFirst(validator?: (data: Node<D>, ...args: any[]) => boolean): { height: number } {
    const marked = new Map<Node<D>, boolean>();
    let height = 0;

    const searchChild = (curr: Node<D>, depth: number = 0) => {
      if (height < depth) height = depth;

      marked.set(curr, true);
      for (const adj of this.get(curr)!) {
        if (!marked.get(adj)) {
          if (validator?.(adj) ?? true) {
            searchChild(adj, depth + 1);
          }
        }
      }
      marked.set(curr, false);
    };

    for (const root of this.keys()) {
      if (validator?.(root) ?? true) {
        searchChild(root, 0);
      }
    }

    return {
      height,
    };
  }

  /**
   * 너비 우선 탐색을 통해 노드의 개수, 높이 등 그래프 정보를 리턴
   * @param root
   */
  searchBreadthFirst(root: Node<D>): { n: number; height: number } {
    const queue = [root];
    const marked = new Map([[root, true]]);

    let n = 0;
    let depth = 0;
    for (; queue.length > 0; ++depth) {
      for (let size = queue.length; size > 0; --size, ++n) {
        const curr = queue.shift()!;
        for (const adj of this.get(curr)!) {
          if (!marked.get(adj)) {
            queue.push(adj);
            marked.set(adj, true);
          }
        }
      }
    }

    return {
      n,
      height: depth,
    };
  }

  /**
   * 깊이 우선 탐색을 통해 높이 등 그래프 정보를 리턴
   * @param cb
   * @param args
   * @returns
   */
  searchDepthFirst2(cb?: CB<D>, args: any[] = []): { height: number } {
    let height = 0;

    const DFS = (curr: Node<D>, depth: number, params: any[]) => {
      if (this.get(curr)) {
        height = Math.max(height, depth);

        curr.isMarked = true;
        for (const adj of this.get(curr) as Set<Node<D>>) {
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

  /**
   * 너비 우선 탐색을 통해 노드의 개수, 높이 등 그래프 정보를 리턴
   * @param cb
   * @param args
   * @returns
   */
  searchBreadthFirst2(cb?: CB<D>, args: any[] = []): { height: number } {
    const queue = new Queue<Node<D>>();
    queue.enqueue(this.root);
    this.root.mark();
    let depth = 0;
    for (; !queue.isEmpty(); ++depth) {
      for (let queueSize = queue.length; queueSize > 0; --queueSize) {
        const curr = queue.dequeue() as Node<D>;
        for (const adj of this.get(curr) as Set<Node<D>>) {
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

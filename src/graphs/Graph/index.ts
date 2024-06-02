import { Node, Edge } from "./entity";
import { IntoNeighbors } from "../types";

const Direction = {
  Outgoing: 0,
  Incoming: 1,
} as const;

function boundIndex(ix: number, len: number): number {
  return ix >= 0 ? ix % len : (ix % len) + len;
}

function swapPop<T>(arr: T[], ix: number): T | undefined {
  const x = arr[ix];
  if (x !== undefined) {
    arr[ix] = arr.pop()!;
    return x;
  }
}

export default class Graph<N, E> implements IntoNeighbors<number> {
  nodes: Node<N>[] = [];
  edges: Edge<E>[] = [];

  get nodeCount() {
    return this.nodes.length;
  }

  get edgeCount() {
    return this.edges.length;
  }

  add(weight: N): number {
    this.nodes.push(new Node(weight));
    return this.nodes.length - 1;
  }

  remove(nodeIx: number) {
    console.assert(nodeIx >= 0 && nodeIx < this.nodes.length);

    const { nodes } = this;

    const node = swapPop(nodes, nodeIx)!;

    if (!node) return undefined;
  }

  connect(aIx: number, bIx: number, weight: E): number {
    console.assert(aIx >= 0 && aIx < this.nodes.length);
    console.assert(bIx >= 0 && bIx < this.nodes.length);

    const { nodes, edges } = this;

    const edge = new Edge(aIx, bIx, weight);
    const edgeIx = edges.length;
    edges.push(edge);

    if (aIx === bIx) {
      const node = nodes[aIx]!;

      edge.next[0] = node.next[0];
      edge.next[1] = node.next[1];

      node.next[0] = edgeIx;
      node.next[1] = edgeIx;
    } else {
      const nodeA = nodes[aIx]!;
      const nodeB = nodes[bIx]!;

      edge.next[0] = nodeA.next[0];
      edge.next[1] = nodeB.next[1];

      nodeA.next[0] = edgeIx;
      nodeB.next[1] = edgeIx;
    }

    return edgeIx;
  }

  disconnect(ix: number) {}

  removeEdge(edgeIx: number) {
    const { edges } = this;
  }

  *neighbors(nodeIx: number): Generator<number> {
    console.assert(nodeIx >= 0 && nodeIx < this.nodes.length);

    const { nodes, edges } = this;

    const node = nodes[nodeIx]!;
    const edgeIx = node.next[0];

    const edge = edges[edgeIx]!;

    // 간선의 인덱스를 구하고
    // 인덱스가 null이 아닌동안

    // let edgeIdx = this.nodes[index]!.next[]

    // while (edgeIdx !== undefined) {}

    // const node = nodes[index]!;

    return [];
  }
}

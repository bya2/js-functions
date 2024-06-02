const { MAX_SAFE_INTEGER } = Number;

const MSG__NO_PROP = "";

class Ix {
  0: number;
  constructor(arr: any[], ix: number) {
    this[0] = ix;
  }
}

class Node<N> {
  weight: N;
  next: [number, number];

  constructor(x: N) {
    this.weight = x;
    this.next = [MAX_SAFE_INTEGER, MAX_SAFE_INTEGER];
  }
}

class Edge<E> {
  weight: E;
  node: [number, number];
  next: [number, number];

  constructor(source: number, target: number, x: E) {
    this.weight = x;
    this.node = [source, target];
    this.next = [MAX_SAFE_INTEGER, MAX_SAFE_INTEGER];
  }
}

/**
 *
 * @param arr
 * @param index
 */
function swapPop<T>(arr: T[], index: number): T | undefined {
  console.assert(index >= 0 && index < arr.length);

  if (arr.length <= 1) return arr.pop();
  const x = arr[index]!;
  arr[index] = arr.pop()!;
  return x;
}

export default class DiGraph<N, E> {
  nodes: Node<N>[] = [];
  edges: Edge<E>[] = [];

  /**
   * 정점 추가
   *
   * STEP
   * 1. 노드 생성 후 배열에 추가
   *
   * @param weight
   * @returns 노드 인덱스
   */
  addNode(weight: N): number {
    this.nodes.push(new Node(weight));
    return this.nodes.length - 1;
  }

  /**
   * 간선 추가
   *
   * STEP
   * - [SOURCE_NODE] -(s:o)-> -(e:i)-> [EDGE] -(e:o)-> -(t:i)-> [TARGET_NODE]
   * 1. 간선 생성 및 배열에 추가
   * 2. 노드들의 연결 정보로 간선 연결 정보 작성 (e:o ← s:o, e:i ← t:i)
   * 3. 노드들의 연결 정보 수정 (s:o ← ei, e:i ← ei)
   *
   * @param aIx 소스 노드 인덱스
   * @param bIx 타겟 노드 인덱스
   * @param weight
   * @returns 간선 인덱스
   */
  addEdge(aIx: number, bIx: number, weight: E): number {
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
      const source = nodes[aIx]!;
      const target = nodes[bIx]!;

      edge.next[0] = source.next[0];
      edge.next[1] = target.next[1];

      source.next[0] = edgeIx;
      target.next[1] = edgeIx;
    }

    return edgeIx;
  }

  /**
   * 정점 추출
   *
   * STEP
   * 1. 방향 별로 노드에 연결된 간선들을 제거
   * 2. 노드 추출 및 배열 재구성
   * 3. 배열 내 입력된 위치로 옮겨진 노드의 간선 정보 수정
   * 4.
   *
   * @param ix 노드 인덱스
   */
  removeNode(ix: number) {
    console.assert(ix >= 0 && ix < this.nodes.length);

    const { nodes, edges } = this;

    const node = swapPop(nodes, ix);
  }

  /**
   * 간선 추출
   *
   * STEP
   * 1.
   * @param ix
   */
  removeEdge(ix: number) {
    console.assert(ix >= 0 && ix < this.edges.length);

    const { edges } = this;

    const edge = edges[ix]!;
  }

  changeEdgeLinks(edge: Edge<E>) {}

  neighbors(ix: number) {
    console.assert(ix >= 0 && ix < this.nodes.length);

    const OUTGOING = 0;

    const { nodes, edges } = this;

    const node = nodes[ix];

    const iter = {
      next: node ? [...node.next] : [MAX_SAFE_INTEGER, MAX_SAFE_INTEGER],
    };

    // 방향 그래프일 때,
    // 1. 방향의 반대 방향은 인덱스를 삭제

    // OUTGOIGNG이면

    // if (node) {
    //   next = [MAX_SAFE_INTEGER, MAX_SAFE_INTEGER];
    // }

    // 시작: 노드 인덱스
    // 다음: 방향에 해당하는 간선 인덱스
  }
}

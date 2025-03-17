import Hole from "./Hole";

type TCompareFn<T> = (a: T, b: T) => unknown;

export default class BinaryHeap<T> {
  #inner: T[];

  constructor(cmpFn: TCompareFn<T>, data: T[] = []) {
    this.cmp = cmpFn;
    this.#inner = data;
  }

  *[Symbol.iterator]() {
    for (const e of this.#inner) {
      yield e;
    }
  }

  get length() {
    return this.#inner.length;
  }

  /**
   * 우선 순위를 비교하고, 올바르게 정렬되어 있는지 확인.
   * @param a Parent element
   * @param b Child element
   */
  cmp: TCompareFn<T>;

  /**
   * 최우선 순위의 요소를 반환합니다.
   */
  peek() {
    return this.#inner[0];
  }

  /**
   * 하위 노드(`pos`)부터 특정 상위 노드(`start`)까지 정렬.
   * @param start 정렬 범위의 최상위 노드 인덱스
   * @param pos 대상 노드 인덱스
   */
  siftUp(start: number, pos: number): number {
    const hole = new Hole(this.#inner, pos);

    while (hole.pos > start) {
      const parent = (hole.pos - 1) >> 1;
      if (this.cmp(hole.get(parent), hole.element)) break;
      hole.moveTo(parent);
    }

    return hole.pos;
  }

  /**
   * 상위 노드(`pos`)부터 특정 하위 노드(`end`)까지 정렬.
   * @param pos 대상 노드 인덱스
   * @param end 정렬 범위 최하위 노드 인덱스
   */
  siftDown(pos: number, end: number): void {
    const hole = new Hole(this.#inner, pos);

    let child = 2 * hole.pos + 1;
    const leaf = end - 2 || 0;

    while (child <= leaf) {
      if (this.cmp(hole.get(child + 1), hole.get(child))) child++;
      if (this.cmp(hole.element, hole.get(child))) return;
      hole.moveTo(child);
      child = 2 * hole.pos + 1;
    }

    if (child === end - 1 && this.cmp(hole.get(child), hole.element)) {
      hole.moveTo(child);
    }
  }

  /**
   * 상위 노드(`pos`)부터 단말 노드까지 자식 노드를 비교해가며 적절한 경로로 내려와, 단말부터 루트까지 정렬.
   * @param pos 대상 노드 인덱스
   */
  siftDownToBottom(pos: number): void {
    const END = this.#inner.length;

    const hole = new Hole(this.#inner, pos);

    let child = 2 * hole.pos + 1;
    const leaf = END - 2 || 0;

    while (child <= leaf) {
      if (this.cmp(hole.get(child + 1), hole.get(child))) child++;
      hole.moveTo(child);
      child = 2 * hole.pos + 1;
    }

    if (child === END - 1) {
      hole.moveTo(child);
    }

    this.siftUp(pos, hole.pos);
  }

  /**
   * 단말에 노드를 삽입하고, 아래에서 위로 정렬.
   * - O(1)~
   * @param item
   */
  push(item: T): void {
    this.#inner.push(item);
    this.siftUp(0, this.#inner.length - 1);
  }

  /**
   * 이진 트리 루트의 값을 내보내고, 마지막 단말 노드를 루트에 이동시켜 위에서 아래로 정렬. 
   * - O(log(n))
   */
  pop(): T | undefined {
    let item = this.#inner.pop();

    if (item !== undefined) {
      const x = item;
      item = this.#inner[0];
      this.#inner[0] = x;

      this.siftDownToBottom(0);
    }
    return item;
  }
}

/**
 * @returns Max-Heap instance
 */
export const maxHeap = () => new BinaryHeap<number>((a, b) => a > b);

/**
 * @returns Min-Heap instance
 */
export const minHeap = () => new BinaryHeap<number>((a, b) => a < b);

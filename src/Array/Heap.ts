import BinaryTree from "./BinaryTree";

interface HeapInterface<T> {
  insert: (node: any) => void;
  poll: () => T | null;
}

type CompareFunctionType<T> = (a: T, b: T) => boolean;

export default class Heap<T = number> extends BinaryTree implements HeapInterface<T> {
  private comparator: CompareFunctionType<T>;

  /**
   * 힙 인스턴스 생성
   * @param _comparator 우선 순위 비교 함수
   */
  constructor(_comparator: (a: T, b: T) => boolean) {
    super();
    this.push(Infinity);
    this.comparator = _comparator || ((a: T, b: T) => a > b); // MAX HEAP
  }

  /**
   * 부모 노드의 두 자식 노드 중 우선 순위가 되는 노드의 인덱스를 반환
   * @param _idxOfP
   * @returns Index
   */
  private getPriorIndexOfChild(_idxOfP: number): number {
    const [idxOfLC, idxOfRC] = Heap.indexesOfChildren(_idxOfP);
    return this.has(idxOfRC) && this.comparator(this[idxOfRC], this[idxOfLC]) ? idxOfRC : idxOfLC;
  }

  /**
   * 현재 노드와 부모 노드를 비교해서 우선 순위에 따라 노드 위치를 뒤바꾸기
   */
  private heapifyUp(): void {
    for (
      let idxOfCurr = this.length - 1, idxOfP = Heap.indexOfParent(idxOfCurr);
      idxOfCurr >= 2 && this.comparator(this[idxOfCurr], this[idxOfP]);
      idxOfCurr = idxOfP, idxOfP = Heap.indexOfParent(idxOfCurr)
    ) {
      this.swap(idxOfCurr, idxOfP);
    }
  }

  /**
   * 루트 노드부터 자식 노드와 비교하여 우선 순위에 따라 정렬될 때까지 노드 위치를 뒤바꾸기를 반복
   */
  private heapifyDown(): void {
    for (
      let idxOfCurr = 1, idxOfC = this.getPriorIndexOfChild(idxOfCurr);
      this.comparator(this[idxOfC], this[idxOfCurr]);
      idxOfCurr = idxOfC, idxOfC = this.getPriorIndexOfChild(idxOfCurr)
    ) {
      this.swap(idxOfCurr, idxOfC);
    }
  }

  /**
   * 노드 삽입
   * @param _node 삽입할 데이터
   */
  public insert(_node: any): void {
    this.push(_node);
    if (this.length >= 3) this.heapifyUp();
  }

  /**
   * 가장 우선 순위인 루트 노드를 추출
   * @returns Root
   */
  public poll(): T | null {
    if (this.length <= 1) return null;
    else if (this.length === 2) return this.pop();
    else {
      [this[0], this[1]] = [this[1], this.pop()];
      this.heapifyDown();
      return this[0];
    }
  }
}

export class PriorityQueue extends Heap<number> {
  get front() {
    return this[1];
  }

  get rear() {
    return this[this.length - 1];
  }

  enqueue = this.insert;
  dequeue = this.poll;
}

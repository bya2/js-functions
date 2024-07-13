import Heap from "./Heap";

describe("ArrayHeap methods", () => {
  it("MaxHeap", () => {
    const heap = new Heap();
    heap.insert(9);
    console.log(heap);
    heap.insert(1);
    console.log(heap);

    heap.insert(3);
    console.log(heap);

    heap.insert(4);
    console.log(heap);

    heap.insert(5);
    console.log(heap);

    expect([...heap]).toEqual([9, 5, 3, 1, 4]);

    let arr: number[] = [];

    arr.push(heap.poll());
    arr.push(heap.poll());
    arr.push(heap.poll());
    arr.push(heap.poll());
    arr.push(heap.poll());

    expect(arr).toEqual([9, 5, 4, 3, 1]);
  });

  it("MinHeap", () => {
    const heap = new Heap((a, b) => a < b);
    heap.insert(9);
    heap.insert(1);
    heap.insert(3);
    heap.insert(4);
    heap.insert(5);
    // expect([...heap]).toEqual([1, 4, 3, 9, 5]);

    let arr: number[] = [];

    arr.push(heap.poll());
    arr.push(heap.poll());
    arr.push(heap.poll());
    arr.push(heap.poll());
    arr.push(heap.poll());
    arr.push(heap.poll());
    arr.push(2);


    expect(arr).toEqual([1, 3, 4, 5, 9, undefined, 2]);
  });
});

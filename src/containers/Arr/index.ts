import IFilterable from "./IFilterable";
import ISortable from "./ISortable";
import IWrapped from "./IWrapped";

class Numbers {
  slc: number[];

  constructor(arr: number[]) {
    this.slc = arr;
  }

  binarySearch(n: number): number {
    let si = 0;
    let ei = this.slc.length - 1;

    while (si <= ei) {
      let mi = (si + ei) >> 1;
      if (this.slc[mi]! === n) return mi;
      if (this.slc[mi]! < n) si = ++mi;
      else ei = --mi;
    }

    return -1;
  }
}

class TArr<T> implements IWrapped<T>, ISwap, ISortable, IFilterable {
  slc: T[];

  constructor(arr: T[]) {
    this.slc = arr;
  }
  sort(properties: "" | ""[], direction: "asc" | "desc" | "random"): this {}

  filterContinity(si = 0, ei = this.slc.length): this {
    this.slc = this.slc.filter((v, i, arr) => {});

    const arr = [this.slc[si]!];

    for (let i = ++si; i < ei; ++i) {
      if (arr[arr.length - 1] !== this.slc[i]) {
        arr.push(this.slc[i]!);
      }
    }

    return this;
  }
}

export function Arr<T>(array: T[]): TArr<T> {
  return new TArr(array);
}

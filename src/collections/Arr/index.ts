interface IArr<T> {
  reduceContinity(si: number, ei: number): T[];
}

export default class Arr<T> {
  slc: T[];

  constructor(arr: T[]) {
    this.slc = arr;
  }

  reduceContinity(si = 0, ei = this.slc.length) {
    const arr = [this.slc[si]];

    for (let i = ++si; i < ei; ++i) {
      if (arr[arr.length - 1] !== this.slc[i]) {
        arr.push(this.slc[i]);
      }
    }

    return arr;
  }
}

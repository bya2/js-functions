import IArr from "./types";

class TArr<T> implements IArr<T> {
  inner: T[];

  constructor(v: T[]) {
    this.inner = v;
  }
}

export function Arr<T>(v: T[]): TArr<T> {
  return new TArr(v);
}

import { UnreachableCodeError } from "@/misc/error";

import INum from "./types";
import { CompareOptions } from "./types/IComparable";

class TNum implements INum {
  inner: number;

  constructor(value: number) {
    this.inner = value;
  }

  isLowerCaseCode(): boolean {
    return this.inner >= 97 && this.inner <= 122;
  }

  isUpperCaseCode(): boolean {
    return this.inner >= 65 && this.inner <= 90;
  }

  countZeros(): number {
    let n = this.inner;
    let count = 0;

    while (n) {
      if (n % 2 === 0) ++count;
      n >>= 1;
    }

    return count;
  }

  countOnes(): number {
    let n = this.inner;
    let count = 0;

    while (n) {
      n &= n - 1;
      ++count;
    }

    return count;
  }

  countLeadingZeros(): number {
    let s = this.inner.toString(2);
    let i = 0;

    for (; i <= s.length; ++i) {
      if (s[i]) break;
    }

    return i;
  }

  countLeadingOnes(): number {
    let s = this.inner.toString(2);
    let i = 0;

    for (; i <= s.length; ++i) {
      if (!s[i]) break;
    }

    return i;
  }

  countTrailingZeros(): number {
    let n = this.inner;
    let count = 0;

    while (n % 2 === 0) {
      n >>= 1;
      ++count;
    }

    return count;
  }

  countTrailingOnes(): number {
    let n = this.inner;
    let count = 0;

    while (n & 1) {
      n >>= 1;
      ++count;
    }

    return count;
  }

  minFac(n = this.inner): number {
    if (n % 2 === 0) {
      return 2;
    }

    const LIM = Math.sqrt(this.inner);

    for (let m = 3; m <= LIM; m += 2) {
      if (n % m === 0) {
        return m;
      }
    }

    return this.inner;
  }

  factors(n = this.inner): number[] {
    if (n <= 1) {
      return [];
    }

    const arr: number[] = [];
    let curr = n;

    while (1) {
      let m = this.minFac(curr);
      arr.push(m);
      if (curr === m) break;
      curr /= m;
    }

    return arr;
  }

  uniqFactors(n = this.inner): number[] {
    if (n <= 1) {
      return [];
    }

    const arr: number[] = [];
    let curr = n;

    while (1) {
      let m = this.minFac(curr);
      arr.push(m);
      if (curr === m) break;
      while (curr % m === 0) curr /= m;
      if (curr === 1) break;
    }

    return arr;
  }

  cmp<R>(other: number, options: CompareOptions<R>): unknown {
    if (this.inner < other) {
      options.Less();
      return;
    }

    if (this.inner === other) {
      options.Equal();
      return;
    }

    if (this.inner > other) {
      options.Greater();
      return;
    }

    throw UnreachableCodeError.typeUnchecked();
  }

  saturatingAdd(n: number): number {
    const v = this.inner + n;
    return v > 255 ? 255 : v;
  }

  saturatingSub(n: number): number {
    return this.inner - n || 0;
  }
}

export const Num = (value: number) => new TNum(value);

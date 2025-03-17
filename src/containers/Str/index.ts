import IStr from "./types";

class Str implements IStr {
  inner: string;

  constructor(v: string) {
    this.inner = v;
  }

  // IWrapped
  unwrap(): string {
    return this.inner;
  }

  // IStr
  isPalindrome(): boolean {
    let i = -1;
    let j = this.inner.length;

    while (++i < --j) {
      if (this.inner[i] !== this.inner[j]) return false;
    }

    return true;
  }

  // IStrNum
  max(deleteCount = 0): this {
    const stack: string[] = [this.inner[0]!];

    for (let i = 1, len = this.inner.length; i < len; ++i) {
      const item = this.inner[i]!;

      while (stack[stack.length - 1]! < item) {
        --deleteCount;
        stack.pop();

        if (deleteCount === 0) {
          this.inner = stack.join("") + this.inner.slice(i, len);
          break;
        }

        if (stack.length === 0) {
          break;
        }
      }

      stack.push(item);
    }

    this.inner = stack.join("").slice(0, this.inner.length - deleteCount);
    return this;
  }

  // IEnclose
  isEnclose(pairs: Record<string, string>): boolean {
    const v = this.inner;
    const stack: string[] = [];

    let i = -1;
    while (i < v.length) {
      const c = this.inner[i]!;

      if (!pairs[c]) {
        stack.push(c);
      }
    }

    return stack.length === 0;
  }

  // IEng
  isUpperCase(): boolean {
    return this.inner.split("").every((v) => v >= "A" && v <= "Z");
  }

  // IEng
  isLowerCase(): boolean {
    return this.inner.split("").every((v) => v >= "a" && v <= "z");
  }

  // IEngWord
  toCap(): string {
    console.assert(/^[^a-zA-Z]*$/.test(this.inner));

    return this.inner[0]!.toUpperCase() + this.inner.slice(1).toLowerCase();
  }

  // IEngSentence
  toCaps(): string {
    return this.inner
      .toLowerCase()
      .split(" ")
      .map((w) => (w === "" ? w : this.toCap.call(w)))
      .join(" ");
  }
}

/**
 *
 * @param v
 */
export const S = (v: string) => new Str(v);

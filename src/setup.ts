import { defineOption, defineResult } from "@bya2/rusty-container-api";

defineOption();

defineResult();

if (!Array.prototype.hasOwnProperty("swap")) {
  Object.defineProperties(Array.prototype, {
    swap: {
      value(i: number, j: number): void {
        console.assert(
          i >= 0 && j >= 0 && i < this.length && j < this.length,
          ""
        );
        [this[i], this[j]] = [this[j], this[i]];
      },
    },
  });
}

if (!Number.prototype.hasOwnProperty("saturatingSub")) {
  Object.defineProperty(Number.prototype, "saturatingSub", {
    value(n: number) {
      return this - n || 0;
    },
  });
}

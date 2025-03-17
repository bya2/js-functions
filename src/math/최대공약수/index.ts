import IGCD from "./IGCD";
import { countTrailingZeros } from "./utils";

const GCD: IGCD = {
  binary(a, b) {
    if (a === b) return a;
    if (a === 0) return b;
    if (b === 0) return a;

    const count = countTrailingZeros(a | b);
    a >>= count;
    b >>= count;
    a >>= countTrailingZeros(a);

    while (b !== 0) {
      b >>= countTrailingZeros(b);

      if (a > b) {
        const tmp = a;
        a = b;
        b = tmp;
      }

      b -= a;
    }

    return a << count;
  },

  euclid(a, b) {
    if (a < b) {
      const tmp = a;
      a = b;
      b = tmp;
    }

    while (b) {
      const tmp = a;
      a = b;
      b = tmp % b;
    }

    return a;
  },
};

export default GCD;

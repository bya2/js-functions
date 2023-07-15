Object.defineProperties(Number.prototype, {
  isPrime: {
    value() {
      for (let i = 3, to = Math.sqrt(this); i <= to; i += 2) {
        if (this % i === 0) return false;
      }
      return this >= 2;
    },
  },

  hasOddNumberOfDivisors: {
    value() {
      Number.isInteger(Math.sqrt(this));
    },
  },
});

export const Prime = {
  check: (val: number): boolean => {
    for (let i = 3, to = Math.sqrt(val); i <= to; i += 2) {
      if (val % i === 0) return false;
    }
    return val >= 2;
  },

  between: (from: number, to: number): number[] => {
    if (from > to) throw new Error();

    const arr = [];
    if (from <= 2) arr.push(2);
    for (let val = from <= 3 ? 3 : from; val < to; val += 2) {
      if (Prime.check(val)) arr.push(val);
    }
    return arr;
  },

  numberOf: (from: number, to: number): number => {
    if (from > to) [from, to] = [to, from];

    let n = from <= 2 ? 1 : 0;
    for (let val = from <= 3 ? 3 : from; val < to; val += 2) {
      if (Prime.check(val)) n++;
    }
    return n;
  },
};

export const Divisor = {
  listOf: (val: number): number[] => {
    const arr = [];
    for (let n = 1, to = val / 2; n <= to; ++n) {
      if (val % n === 0) arr.push(n);
    }
    arr.push(val);
    return arr;
  },
};

export const Euclidean = {
  GCD: function (val1: number, val2: number): number {
    return val1 % val2 === 0 ? val2 : this.GCD(val2, val1 % val2);
  },

  LCM: function (val1: number, val2: number): number {
    return (val1 * val2) / this.GCD(val1, val2);
  },

  allGCD: function (...numbers: number[]): number {
    return numbers.reduce((number1, number2) => this.GCD(number1, number2));
  },

  allLCM: function (...numbers: number[]): number {
    return numbers.reduce((acc, n) => acc * n, 1) / this.allGCD(...numbers);
  },
};

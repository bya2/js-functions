import BinaryHeap from "@/collections/BinaryHeap";
import { composite } from "./composite";

export function isPrime(n: number) {
  return n >= 2 && n === composite(n).minFac();
}

const WHEEL30 = [1, 7, 11, 13, 17, 19, 23, 29];

class Wheel30 {
  base: number;
  ix: number;

  constructor(base = 0, ix = 1) {
    this.base = base;
    this.ix = ix;
  }
}

export const PrimeSieve = {
  basic(n: number): number[] {
    if (n <= 1) {
      return [];
    }

    const LEN = n + 1;
    const LIM = n ** 0.5;
    const MAX = n;

    const sieve = new Array(LEN).fill(1);
    sieve[0] = sieve[1] = 0;

    for (let i = 2; i <= LIM; ++i) {
      if (sieve[i]) {
        for (let j = i * i; j <= MAX; j += i) {
          sieve[j] = 0;
        }
      }
    }

    return sieve;
  },

  optimized(n: number): number[] {
    if (n <= 1) {
      return [];
    }

    const LEN = n + 1;
    const LIM = n ** 0.5;
    const MAX = n;

    const sieve = new Array(LEN).fill(0);
    sieve[2] = sieve[3] = 1;

    const updateFlags = (start: number, acc: number, flag: number) => {
      for (let i = start; i <= MAX; i += acc) {
        sieve[i] = flag;
      }
    };

    updateFlags(5, 6, 1);
    updateFlags(7, 6, 1);

    for (let i = 5, nxt = (i - 3) % 6; i <= LIM; i += nxt) {
      if (sieve[i]) {
        const j = i * i;
        const acc = i * 6;
        updateFlags(j, acc, 0);
        updateFlags(nxt * i + j, acc, 0);
      }
    }

    return sieve;
  },

  v3(n: number) {
    if (n <= 1) return [];

    const LIM = n ** 0.5;
    const MAX = n;

    const primes = new Set([2, 3]);

    const range = (start: number, acc: number, flag: any) => {
      for (let i = start; i <= MAX; i += acc) {
        flag ? primes.add(i) : primes.delete(i);
      }
    };

    range(5, 6, 1);
    range(7, 6, 1);

    for (let i = 5, nxt = (i - 3) % 6; i <= LIM; i += nxt) {
      if (primes.has(i)) {
        const j = i * i;
        const acc = i * 6;
        range(j, acc, 0);
        range(nxt * i + j, acc, 0);
      }
    }

    const heap = new BinaryHeap<number>((a, b) => a < b, [...primes]);
    return [...heap];
  },
};

//

export function primes(sieve: number[]): number[] {
  const heap: BinaryHeap<number> = new BinaryHeap((a, b) => a - b);

  for (let i = -1; ++i < sieve.length; ) {
    heap.push(sieve[i]!);
  }

  return [...heap];
}

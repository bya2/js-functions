import BinaryHeap from "@/collections/BinaryHeap";

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

export function firstFac(x: number): number {
  if (x % 2 === 0) {
    return 2;
  }

  const LIM = x ** 0.5;

  for (let i = 3; i <= LIM; i += 2) {
    if (x % i === 0) {
      return i;
    }
  }

  return x;
}

export function isPrime(x: number): boolean {
  return x >= 2 && x === firstFac(x);
}

export function factors(x: number) {
  if (x <= 1) {
    return [];
  }

  const arr: number[] = [];

  let curr = x;

  while (1) {
    let m = firstFac(curr);
    arr.push(m);
    if (m === curr) break;
    curr /= m;
  }

  return arr;
}

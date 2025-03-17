import BinaryHeap from "@/collections/BinaryHeap";
import Wheel30 from "./Wheel30";

interface IPrimeSieve {
  /**
   *
   * @param composite
   * @param prime
   */
  insert(composite: number, prime: number): void;

  /**
   *
   */
  expand(): void;
}

class Sieve {
  sieve: BinaryHeap<[number, number]>;
  primes: number[];
  wheel: Wheel30;

  constructor() {
    this.sieve = new BinaryHeap((a, b) =>
      a[0] === b[0] ? a[1] < b[1] : a[0] < b[0]
    );
    this.primes = [2, 3, 5];
    this.wheel = new Wheel30(0, 1);
  }

  insert(prime: number, composite: number) {
    this.sieve.push([composite, prime]);
  }

  // (49, 7)

  // comp: 49, fac: 7, nextp: 11
  // (49, 7) (121, 11)

  // comp: 121, fac: 11, nextp: 13
  // (49, 7) (121, 11) (13, 169)
  expand() {
    let nextp = this.wheel.next();

    while (1) {
      const peek = this.sieve.peek()!;

      // SIEVE가 비어있으면
      // - sieve.push([WHEEL 요소, WHEEL 요소의 제곱]), primes.push(WHEEL 요소), 함수 종료

      // 있으면
      // 우선수위의 합성수와 요소를 꺼내서
      // - 합성수와 WHEEL의 요소를 비교
      // > 합성수보다 WHEEL 요소가 크면: sieve.pop, sieve.push([요소, 합성수 + 2 * 요소]) 루프 계속
      // > 두 수가 같으면: sieve.pop, sieve.push([요소, 합성수 + 2 * 요소]) 루프 계속
      // > 합성수보다 WHEEL 요소가 작으면: sieve.push([WHEEL 요소, WHEEL 요소의 제곱]), primes.push(WHEEL 요소) 루프 종료 및 함수 종료

      if (!peek) {
        this.insert(nextp, nextp * nextp);
        this.primes.push(nextp);
        return;
      }

      const [composite, factor] = peek;

      if (composite < nextp) {
        this.sieve.pop();
        this.insert(factor, composite + 2 * factor);
        continue;
      }

      if (composite === nextp) {
        this.sieve.pop();
        this.insert(factor, composite + 2 * factor);
        nextp = this.wheel.next();
        continue;
      }

      if (composite > nextp) {
        this.insert(nextp, nextp * nextp);
        this.primes.push(nextp);
        return;
      }
    }
  }
}

export default Sieve;

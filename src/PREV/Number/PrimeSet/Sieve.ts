import Wheel30 from "./Wheel30";

class Sieve {
  sieve: number[];
  primes: number[];
  wheel: Wheel30;

  constructor() {
    this.sieve = [];
    this.primes = [2, 3, 5];
    this.wheel = new Wheel30();
  }

  insert() {
    this.sieve.push();
  }
}

export default Sieve;

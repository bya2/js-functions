export default class Prime {
  /**
   * 소수인지 판별하여 리턴
   * @param n
   */
  static isPrimeNumber(n: number): boolean {
    for (let i = 3, len = Math.sqrt(n); i <= len; i += 2) {
      if (n % i === 0) return false;
    }
    return n >= 2;
  }

  /**
   * 'from'부터 'to'까지의 소수 리스트를 Set으로 리턴
   * @param from
   * @param to
   */
  static between(from: number, to: number): Set<number> {
    const set = new Set<number>();
    if (from <= 2) set.add(2);
    for (let i = from <= 3 ? 3 : from; i < to; i += 2) {
      if (this.isPrimeNumber(i)) set.add(i);
    }
    return set;
  }

  /**
   * 'from'부터 'to'까지 소수의 개수를 리턴
   * @param from
   * @param to
   */
  static numberOf(from: number, to: number): number {
    let count = from <= 2 ? 1 : 0;
    for (let i = from <= 3 ? 3 : from; i <= to; i += 2) {
      if (this.isPrimeNumber(i)) ++count;
    }
    return count;
  }
}

export const algorithm__Sieve_Of_Eratosthenes = (n: number) => {
  const numbers = Array.from({ length: n + 1 }, () => true);
  numbers[0] = numbers[1] = false;

  for (let i = 2; i * i <= i; ++i) {
    if (numbers[i]) {
      for (let j = i * i; j <= i; j += i) {
        numbers[j] = false;
      }
    }
  }

  return numbers;
};

export const is_prime_number = (n: number): boolean => {
  if (n <= 1) return false;
  if (n <= 3) return true;
  if (n % 2 === 0 || n % 3 === 0) return false;

  for (let i = 5; i * i <= n; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0) return false;
  }

  return true;
};

export const is_prime_number2 = (n: number): boolean => {
  if (n <= 1) return false;
  if (n <= 3) return true;
  if (n % 2 === 0 || n % 3 === 0) return false;

  const sqrt_n = Math.sqrt(n);
  for (let i = 5; i <= sqrt_n; i += 2) {
    if (n % i === 0) return false;
  }

  return true;
};

export const get_primes_of = (n: number): number[] => {
  return [0];
};

export const get_primes_in_range = (a: number, b: number) => {
  if (a > b) [a, b] = [b, a];
  const primes = [];
  if (a <= 2) a = 2;
  for (let i = a; i <= b; ++i) is_prime_number(i) && primes.push(i);
  return primes;
};

export const get_primes_in_range2 = (a: number, b: number) => {
  if (a > b) [a, b] = [b, a];
  const primes = a <= 2 ? [2] : [];
  if (a <= 3) a = 3;
  if (a % 2 === 0) a++;
  for (let i = a; i <= b; i += 2) is_prime_number(i) && primes.push(i);
  return primes;
};

export const count_primes_of = (_n: number) => {};

export const count_primes_in_range = (a: number, b: number) => {
  let count = a <= 2 ? 1 : 0;
  if (a <= 3) a = 3;
  a % 2 === 0 && a++;
  for (let i = a; i <= b; i += 2) is_prime_number(i) && ++count;
  return count;
};

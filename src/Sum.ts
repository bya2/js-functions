export const Sum = {
  in(arr: number[]): number {
    return arr.reduce((a, b) => a + b, 0);
  },

  between(from: number, to: number): number {
    return ((from + to) * (Math.abs(from - to) + 1)) / 2;
  },

  upTo(num: number): number {
    return (num * (num + 1)) / 2;
  },
};

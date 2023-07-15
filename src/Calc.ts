export const sum = {
  between: (from: number, to: number): number => {
    return ((from + to) * (Math.abs(from - to) + 1)) / 2;
  },

  upTo: (value: number, cost: number = 1): number => {
    return ((value * (value + 1)) / 2) * cost;
  },
};
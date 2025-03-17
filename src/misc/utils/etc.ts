export const noop = () => {};

export const range = (start: number, end: number, gap = 1): number[] => {
  const arr: number[] = [];
  for (let i = start; i <= end; i += gap) arr.push(i);
  return arr;
};

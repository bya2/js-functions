const comparator = {
  isSameValue: <T extends object = any>(a: T, b: T) => JSON.stringify(a) === JSON.stringify(b),
};

export default comparator;

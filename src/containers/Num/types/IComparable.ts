export interface CompareOptions<R> {
  Less: () => R;
  Equal: () => R;
  Greater: () => R;
}

export default interface IComparable {
  cmp<R>(other: number, options: CompareOptions<R>): unknown;
}

export default interface IAscending<T> {
  /**
   * 이분 탐색
   * @param predicate
   */
  binarySearchIndex(predicate: (element: T, index: number) => number): number;

  /**
   *
   * @param predicate
   */
  binarySearch(predicate: (element: T, index: number) => number): T | undefined;
}

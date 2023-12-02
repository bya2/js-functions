export interface List<T> {
  push: (item: T) => void;
  pop: () => T;
  unshift?: (...items: T[]) => void;
  shift?: () => T;
  swap?: (i: number, j: number) => void;

  compare: (a: T, b: T) => boolean;

  // find<S extends T>(predicate: (value: T, index: number, obj: LinkedList<T>) => value is S, thisArg?: any): T | undefined;
  // // find(predicate: (value: T, index: number, obj: LinkedList<T>) => unknown, thisArg?: any): T | undefined;
  // findIndex(predicate: (value: T, index: number, obj: LinkedList<T>) => unknown, thisArg?: any): number;
  // // every<S extends T>(predicate: (value: T, index: number, array: T[]) => value is S, thisArg?: any): this is S[];
  // // every(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): boolean;
  // // some(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): boolean;
  // // filter(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): T[];
  // // reduce(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T): T;
  // // reduce(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T, initialValue: T): T;
  // // reduce<U>(callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U, initialValue: U): U;
  // clone(): LinkedList<T>;
  // toArray(): T[];
}

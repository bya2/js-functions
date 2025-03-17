export type TOp<T, U> = (value: T, index: number) => U;

export type TPredicate<T> = (value: T, index: number) => unknown;

export interface ILogger {
  log(): void;
}

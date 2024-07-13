export declare global {
  // Option
  type Option<T> = import("@bya2/rusty-container-api").Option<T>;
  function Some<T>(expr: T): Option<T>;
  const None: Option<any>;

  // Result
  type Result<T, E> = import("@bya2/rusty-container-api").Result<T, E>;
  function Ok<T, E>(expr: T): Result<T, E>;
  function Err<T, E>(expr: E): Result<T, E>;

  // Array.prototype
  interface Array<T> {
    swap(i: number, j: number): void;
  }
}

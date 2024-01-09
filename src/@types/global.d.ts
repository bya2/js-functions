import type { SomeType, NoneType } from "@bya2/js-option";
import type { OkType, ErrType } from "@bya2/js-result";

export declare global {
  type Option<T> = import("@bya2/js-option").Option<T>;
  function Some<T>(value: T): SomeType<T>;
  const None: NoneType;

  type Result<T, E> = import("@bya2/js-result").Result<T, E>;
  function Ok<T>(value: T): OkType<T>;
  function Err<E>(error: E): ErrType<E>;
}

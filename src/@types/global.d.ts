import type { SomeType, NoneType } from "@bya2/js-option";

export declare global {
  type Option<T> = import("@bya2/js-option").Option<T>;
  function Some<T>(value: T): SomeType<T>;
  const None: NoneType;
}

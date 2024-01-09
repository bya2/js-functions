import { SomeType, NoneType } from "@bya2/js-option";
import { OkType, ErrType } from "@bya2/js-result";
import { unreachableUnchecked } from "./error";

export const isEq = <T>(a: T, b: T): boolean => {
  return a === b;
};

export const isEqual = <T>(a: T, b: T, deep: boolean = false): boolean => {
  if ((a instanceof SomeType && b instanceof SomeType) || (a instanceof OkType && b instanceof OkType)) {
    return isEqual(a.unwrap(), b.unwrap());
  }

  if (a instanceof ErrType && b instanceof ErrType) {
    return isEqual(a.unwrapErr(), b.unwrapErr());
  }

  return isEq(a, b);
};

const matchJsType = <T>(a: T, b: T) => {
  return [Number, String, Boolean, Function, Date, Array, RegExp, Map, WeakMap, Set, WeakSet, Symbol, Error, Object].some(
    E => a instanceof E && b === E,
  );
};

const matchObject = <T extends { [key: string]: any } = any>(objA: T, matcher: T): boolean => {
  return Object.keys(matcher).every(p => isMatch(objA[p], matcher[p]));
};

export const isMatch = <T>(a: T, b: T): boolean => {
  if ((a instanceof OkType && b instanceof OkType) || (a instanceof SomeType && b instanceof SomeType)) {
    return isMatch(a.unwrap(), b.unwrap());
  }

  if (a instanceof ErrType && b instanceof ErrType) {
    return isMatch(a.unwrapErr(), b.unwrapErr());
  }

  if (
    (a instanceof OkType && b === Ok) ||
    (a instanceof ErrType && b === Err) ||
    (a instanceof SomeType && b === Some) ||
    (a === None && b === None)
  ) {
    return true;
  }

  if (isEq(a, b)) {
    return true;
  }

  if (matchJsType(a, b)) {
    return true;
  }

  if (a instanceof String && typeof b === "string") {
    return a.includes(b);
  }

  if (a instanceof Date && b instanceof Date && a.valueOf() === b.valueOf()) {
    return true;
  }

  if (a instanceof Object) {
    if (b instanceof Function) {
      return a instanceof b;
    }

    if (b instanceof Object) {
      return matchObject(a, b);
    }
  }

  return false;
};

export const match = <T, U>(value: T | SomeType<T> | OkType<T> | ErrType<T>, matchArms: Iterable<((x: T) => U) | [any, U | ((x: T) => U)]>): U => {
  for (const op of matchArms) {
    if (op instanceof Function) {
      if (value instanceof SomeType || value instanceof OkType) return op(value.unwrap());
      if (value instanceof ErrType) return op(value.unwrapErr());
      return op(value);
    }

    if (op instanceof Array) {
      const [op1, op2] = op;
      if (isMatch(value, op1)) {
        if (op2 instanceof Function) {
          if (value instanceof SomeType || value instanceof OkType) return op2(value.unwrap());
          if (value instanceof ErrType) return op2(value.unwrapErr());
        } else {
          return op2;
        }
      }
    }
  }

  unreachableUnchecked();
};

// export const match = <T, U>(value: T | SomeType<T> | OkType<T> | ErrType<T>, matchArms: Iterable<((x: T) => U) | [any, U | ((x: T) => U)]>): U => {
//   for (const op of matchArms) {
//     if (op instanceof Function) {
//       if (value instanceof SomeType || value instanceof OkType) return op(value.unwrap());
//       if (value instanceof ErrType) return op(value.unwrapErr());
//       return op(value);
//     }

//     if (op instanceof Array) {
//       const [op1, op2] = op;
//       if (isMatch(value, op1)) {
//         if (op2 instanceof Function) {
//           if (value instanceof SomeType || value instanceof OkType) return op2(value.unwrap());
//           if (value instanceof ErrType) return op2(value.unwrapErr());
//         } else {
//           return op2;
//         }
//       }
//     }
//   }

//   unreachableUnchecked();
// };

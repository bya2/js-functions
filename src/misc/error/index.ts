import { round, square } from "@/misc/utils";
import { IErrorOptions } from "./types";

class CustomError extends Error {
  constructor(option: IErrorOptions = {}) {
    const { cause, label, message, type } = option;
    super(message, cause ? { cause } : {});
    this.name = `${square(label)} ${this.constructor.name}${round(type)}`;
  }
}

/**
 * 행위 실패에 관한 에러
 */
export class FailureError extends CustomError {
  /**
   * `unwrap` 함수나 메서드가 실패했음을 알리는 에러 객체를 반환합니다.
   * @param message
   * @param error
   */
  static unwrapFailed<E>(message: string, error?: E): Error {
    return new FailureError({
      type: "Unwrap failed",
      message,
      cause: error,
    });
  }

  /**
   * 어떤 변수나 프로퍼티에 바인딩이 실패했음을 알리는 에러 객체를 반환합니다.
   * @param message
   */
  static bindingFailed(message: string): Error {
    return new FailureError({
      type: "Binding failed",
      message,
    });
  }
}

/**
 * 인식 불가에 관한 에러
 */
export class InvalidCodeError extends CustomError {}

/**
 * 도달 불가에 관한 에러
 */
export class UnreachableCodeError extends CustomError {
  /**
   * 지정된 열거값이 아닐 때, 해당 코드가 도달할 수 없는 지점임을 알리는 에러 객체를 반환합니다.
   * @param message
   * @returns
   */
  static variantUnchecked(message?: string): Error {
    return new UnreachableCodeError({
      type: "Variant unchecked",
      message: message || "`variantUnchecked()` must never be reached.",
    });
  }

  /**
   * 지정된 타입이 아닐 때, 해당 코드가 도달할 수 없는 지점임을 알리는 에러 객체를 반환합니다.
   * @param message
   */
  static typeUnchecked(message?: string): Error {
    return new UnreachableCodeError({
      type: "Type unchecked",
      message: message || "`typeUnchecked()` must never be reached.",
    });
  }
}

export default class ASCII {
  static isUpperCase(code: number): boolean {
    return code >= 65 && code <= 90;
  }

  static isLowerCase(code: number): boolean {
    return code >= 97 && code <= 122;
  }
}

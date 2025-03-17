export default interface IASCII {
  /**
   * ASCII가 소문자를 표현하는지 판별합니다.
   */
  isLowerCaseCode(): boolean;

  /**
   * ASCII가 대문자를 표현하는지 판별합니다.
   */
  isUpperCaseCode(): boolean;
}

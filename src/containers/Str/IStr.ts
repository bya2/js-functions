export interface IStr {
  /**
   * 문자열이 거꾸로 정렬된 문자열과 동일한 값인지 판별합니다.
   */
  isPalindrome(): boolean;
}

export interface IStrNum {
  /**
   * 문자열 내 여러 숫자를 삭제해서 만들어질 수 있는 가장 큰 수로 수정하고 반환합니다.
   * @param deleteCount
   */
  max(deleteCount: number): this;
}

export interface IStrIndexing {
  mid(): string;
}

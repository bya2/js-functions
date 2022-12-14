export default class Str extends String {
  /**
   * 문자열의 각 문자들을 값으로 변환.
   * @param _pairs 키-값쌍이 문자열 타입인 여러 쌍
   * @returns String
   */
  switch(_pairs: { [key: string]: string } | Map<string, string>): string {
    if (_pairs instanceof Map) {
      return [...this].map((c) => _pairs.get(c)).join("");
    } else {
      return [...this].map((c) => _pairs[c]).join("");
    }
  }

  /**
   * 배열 타입의 튜플 생성
   * @param s
   * @returns Tuple
   */
  static toTuple(s: string): number[][] {
    const matchArr = s.match(/(\d+,)*\d+/g);
    return matchArr === null ? [] : matchArr.map((s) => s.split(",").map((n) => +n));
  }
}

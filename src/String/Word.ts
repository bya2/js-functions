export default class Word extends String {
  /**
   * 단어의 첫글자 대문자화
   * @returns Capital
   */
  static toCap(word: string): string {
    return word[0].toUpperCase() + word.slice(1).toLowerCase();
  }

  /**
   * 단어의 중간에 위치한 1,2 문자
   * @param word
   * @returns Char(1~2)
   */
  static middleOf(word: string): string {
    return word.substring(Math.ceil(word.length / 2) - 1, word.length % 2 === 0 ? 2 : 1);
  }
}

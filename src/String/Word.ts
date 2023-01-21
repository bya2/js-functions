export default class Word extends String {
  /**
   * 단어가 거꾸로 해도 맞는지 확인
   * @param word
   */
  static isPalindrome(word: string): boolean {
    const recur = (l: number, r: number): boolean => {
      if (l >= r) return true;
      else if (word[l] !== word[r]) return false;
      else return recur(l + 1, r - 1);
    };
    return recur(0, word.length - 1);
  }

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

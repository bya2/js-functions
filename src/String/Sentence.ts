import Word from "./Word";

export default class Sentence extends String {
  /**
   * 단어 별 첫글자 대문자화
   * @returns Capitals
   */
  static toCaps(sentence: string): string {
    return sentence
      .toLowerCase()
      .split(" ")
      .map((word) => (word.length === 0 ? word : Word.toCap(word)))
      .join(" ");
  }
}

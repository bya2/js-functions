export interface IEng {
  /**
   * 문자열의 모든 요소가 대문자인지 판별합니다.
   */
  isUpperCase(): boolean;

  /**
   * 문자열의 모든 요소가 소문자인지 판별합니다.
   */
  isLowerCase(): boolean;
}

export interface IEngWord {
  /**
   * 맨 앞의 문자가 영어일 경우, 해당 문자를 대문자로 변환합니다.
   */
  toCap(): string;
}

export interface IEngSentence {
  /**
   * 마침표 `.`를 기준ㅇ
   */
  toCaps(): string;

  /**
   * 영어 문법에 맞게 문장으로 변환합니다.
   */
  toEngSentence(): string;
}

// /**
//  * 단어의 첫문자가 대문자, 나머지 문자가 소문자인 문자열을 반환합니다.
//  * @param word
//  */
// export function toCap(word: string): string {
//   console.assert(/^[^a-zA-Z]*$/.test(word));

//   return word[0]!.toUpperCase() + word.slice(1).toLowerCase();
// }

// /**
//  * 단어 별 첫문자가 대문자, 나머지 문자가 소문자인 문자열을 반환합니다.
//  * @param sentence
//  */
// export function toCaps(sentence: string): string {
//   return sentence
//     .toLowerCase()
//     .split(" ")
//     .map((w) => (w === "" ? w : toCap(w)))
//     .join(" ");
// }

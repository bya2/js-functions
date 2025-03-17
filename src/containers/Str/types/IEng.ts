interface IEngString {
  /**
   * 문자열의 모든 요소가 대문자인지 판별합니다.
   */
  isUpperCase(): boolean;

  /**
   * 문자열의 모든 요소가 소문자인지 판별합니다.
   */
  isLowerCase(): boolean;
}

interface IEngWord {
  /**
   * 맨 앞의 문자가 영어일 경우, 해당 문자를 대문자로 변환합니다.
   */
  toCap(): string;
}

interface IEngSentence {
  /**
   * 마침표 `.`를 기준ㅇ
   */
  toCaps(): string;

  /**
   * 영어 문법에 맞게 문장으로 변환합니다.
   */
  toEngSentence(): string;
}

type IEng = IEngString & IEngWord & IEngSentence;

export default IEng;

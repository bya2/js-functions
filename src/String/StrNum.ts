import ArrStack from "@/Array/Stack";

export default class StrNum extends String {
  /**
   * 문자열 내 여러 숫자를 삭제해서 가장 큰 수 생성
   * @param number 숫자의 문자열
   * @param deleteCount 삭제할 숫자 갯수
   * @returns 가장 큰 수의 문자열
   */
  static maximumOf(number: string, deleteCount: number): string {
    const arrStack = new ArrStack<string>();

    arrStack.push(number[0]);
    for (let i = 1, len = number.length; i < len; ++i) {
      const item = number[i];
      while (arrStack.peek < item) {
        --deleteCount;
        arrStack.pop();
        if (deleteCount === 0) return arrStack.join("") + number.slice(i, len);
        if (arrStack.length === 0) break;
      }
      arrStack.push(item);
    }

    return arrStack.join("").slice(0, number.length - deleteCount);
  }
}

/**
 * 모든 문자가 대문자인지 판별합니다.
 * @param s
 */
export function isUpperCase(s: string): boolean {
  return s.split("").every((c) => c >= "A" && c <= "Z");
}

/**
 * 모든 문자가 소문자인지 판별합니다.
 * @param s
 */
export function isLowerCase(s: string): boolean {
  return s.split("").every((c) => c >= "a" && c <= "z");
}

/**
 * ASCII가 대문자를 표현하는지 판별합니다.
 * @param code
 */
export function isUpperCaseCode(code: number): boolean {
  return code >= 65 && code <= 90;
}

/**
 * ASCII가 소문자를 표현하는지 판별합니다.
 * @param code
 */
export function isLowerCaseCode(code: number): boolean {
  return code >= 97 && code <= 122;
}

/**
 * 거꾸로 읽어도 동일한 문자열인지 판별합니다.
 * @param s
 */
export function isPalindrome(s: string): boolean {
  let i = -1;
  let j = s.length;

  while (++i < --j) {
    if (s[i] !== s[j]) return false;
  }

  return true;
}

/**
 * 단어의 첫문자가 대문자, 나머지 문자가 소문자인 문자열을 반환합니다.
 * @param word
 */
export function toCap(word: string): string {
  console.assert(/^[^a-zA-Z]*$/.test(word));

  return word[0]!.toUpperCase() + word.slice(1).toLowerCase();
}

/**
 * 단어 별 첫문자가 대문자, 나머지 문자가 소문자인 문자열을 반환합니다.
 * @param sentence
 */
export function toCaps(sentence: string): string {
  return sentence
    .toLowerCase()
    .split(" ")
    .map((w) => (w === "" ? w : toCap(w)))
    .join(" ");
}

/**
 * 문자열의 중간에 위치한 하나 혹은 두 개의 문자를 반환합니다.
 * @param s
 */
export function mid(s: string): string {
  console.assert(!s.includes(" "));

  return s.substring(Math.ceil(s.length / 2) - 1, s.length % 2 === 0 ? 2 : 1);
}

// static maximumOf(number: string, deleteCount: number): string {
//   const arrStack = new ArrStack<string>();

//   arrStack.push(number[0]);
//   for (let i = 1, len = number.length; i < len; ++i) {
//     const item = number[i];
//     while (arrStack.peek < item) {
//       --deleteCount;
//       arrStack.pop();
//       if (deleteCount === 0) return arrStack.join("") + number.slice(i, len);
//       if (arrStack.length === 0) break;
//     }
//     arrStack.push(item);
//   }

//   return arrStack.join("").slice(0, number.length - deleteCount);
// }

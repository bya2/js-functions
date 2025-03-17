/**
 * 소괄호로 감싼 문자열을 반환합니다.
 * @param s
 */
export const round = (s?: string) => {
  return s ? `(${s})` : "";
};

/**
 * 중괄호로 감싼 문자열을 반환합니다.
 * @param s
 */
export const curly = (s?: string) => {
  return s ? `{${s}}` : "";
};

/**
 * 대괄호로 감싼 문자열을 반환합니다.
 * @param s
 */
export const square = (s?: string) => {
  return s ? `[${s}]` : "";
};

/**
 * 꺽쇠(부등호) 괄호로 감싼 문자열을 반환합니다.
 * @param s
 */
export const angle = (s?: string) => {
  return s ? `<${s}>` : "";
};

// 약수의 개수
// 약수의 합
// 진약수: n의 약수 중
// 최대공약수
// 유니타리 약수: n의 약수 중 d라는 수가 있을 때, d와 n/d가 서로소이면, d를 n의 유니타리 약수라 칭함

export const hasOdd = (n: number): boolean => {
  return Number.isInteger(Math.sqrt(n));
};

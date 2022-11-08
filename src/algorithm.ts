/**
 * 하노이의 탑
 * (https://shoark7.github.io/programming/algorithm/tower-of-hanoi)
 * - '세 개의 기둥'과 이 기동에 꽂을 수 있는 크기가 다양한 '원판'이 있다.
 * - 퍼즐을 시작하기 전에는 한 기둥에 원판들이 작은 것이 위에 있도록 순서대로 쌓여 있다.
 * - 목적은 한 기둥에 꽂힌 원판들을 그 순서 그대로 다른 기둥으로 옮겨서 다시 쌓는 것이다.
 * - 한 번에 하나의 원판만 옮길 수 있다.
 * - 큰 원판이 작은 원판 위에 있어서는 안된다.
 * @param n 초기에 1번 기둥에 있는 원판의 수
 * @param from
 * @param to
 * @param via
 * @param paths
 * @return 목적지까지의 경로(paths)
 */
export const hanoi3 = <K = any>(n: number, from: K, to: K, via: K, paths: K[][] = []) => {
  if (n === 1) {
    paths.push([from, to]);
  } else {
    hanoi3(n - 1, from, via, to, paths);
    paths.push([from, to]);
    hanoi3(n - 1, via, to, from, paths);
  }
  return paths;
};

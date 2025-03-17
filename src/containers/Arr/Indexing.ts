export default interface ArrIndexing {
  /**
   * 배열 내 위치 i의 요소와 위치 j의 요소를 서로 바꾸고, 성공 여부를 반환합니다.
   * @param i
   * @param j
   */
  swap(i: number, j: number): boolean;
}

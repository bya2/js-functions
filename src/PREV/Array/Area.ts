class Area extends Array<number[]> {
  /**
   * 어떤 공간 내 가장 큰 공간의 길이를 리턴
   * - 0은 벽
   * - 1은 공간
   */
  getLengthOfLargestSquare(): number {
    const rows = this.length,
      columns = this[0].length;

    if (rows === 0 || columns === 0) return 0;
    else if (rows === 1 || columns === 1) return 1;

    let maxPartLen = 0;

    for (let rowi = 1; rowi < rows; ++rowi) {
      for (let coli = 1; coli < columns; ++coli) {
        if (this[rowi][coli] !== 0) {
          const minimum = Math.min(
            this[rowi - 1][coli - 1],
            this[rowi - 1][coli],
            this[rowi][coli - 1]
          );
          this[rowi][coli] = minimum + 1;
        }

        if (maxPartLen < this[rowi][coli]) maxPartLen = this[rowi][coli];
      }
    }

    return maxPartLen;
  }
}

export default Area;

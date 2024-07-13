interface Position {
  left: number;
  right: number;
  top: number;
  bottom: number;
}

function memoizeSync<R>(fn: (...args: any[]) => R): (...args: any[]) => R {
  const map = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    map.has(key) || map.set(key, fn(...args));
    return map.get(key);
  };
}

export function isSquare(
  grid: number[][],
  left: number,
  right: number,
  top: number,
  bottom: number
): boolean {
  if (left + 1 === right && top + 1 === bottom) {
    return grid[top]![left] === 1;
  }

  const midRow = (top + bottom) >> 1;
  const midCol = (left + right) >> 1;

  return (
    isSquare(grid, left, midCol, top, midRow) &&
    isSquare(grid, midCol + 1, right, top, midRow) &&
    isSquare(grid, left, midCol, midRow + 1, bottom) &&
    isSquare(grid, midCol + 1, right, midRow + 1, bottom)
  );
}

class Pos {
  left: number;
  right: number;
  top: number;
  bottom: number;

  constructor(left: number, right: number, top: number, bottom: number) {
    this.left = left;
    this.right = right;
    this.top = top;
    this.bottom = bottom;
  }

  /**
   * 각 위치 요소들이 모두 유효한지 판별합니다.
   *
   * STEP
   * 1. `top`보다 `bottom`이 크고, `left`보다 `right`가 크다
   * 2. 각 위치 요소들은 인덱스 범위이다.
   *
   * @param sieve
   */
  isValid(sieve: number[][]): boolean {
    return (
      this.left < this.right &&
      this.top < this.bottom &&
      this.left >= 0 &&
      this.right < sieve[0]!.length &&
      this.top >= 0 &&
      this.bottom < sieve.length
    );
  }

  // /**
  //  * 그리드 범위 내 모든 요소가 Truthy인지 판별합니다.
  //  *
  //  * @param sieve
  //  */
  // isSquare(sieve: number[][]): boolean {
  //   if (left + 1 === right && top + 1 === bottom) {
  //     return grid[top]![left] === 1;
  //   }

  //   const midRow = (top + bottom) >> 1;
  //   const midCol = (left + right) >> 1;

  //   return (
  //     this.isSquare(left, midCol, top, midRow) &&
  //     this.isSquare(midCol + 1, right, top, midRow) &&
  //     this.isSquare(left, midCol, midRow + 1, bottom) &&
  //     this.isSquare(midCol + 1, right, midRow + 1, bottom)
  //   );
  // }
}

class Grid {
  sieve: number[][];
  memoSquare = memoizeSync(this.isSquare);

  constructor(sieve: number[][]) {
    this.sieve = sieve;
  }

  isSquare(left: number, right: number, top: number, bottom: number) {
    if (left + 1 === right && top + 1 === bottom) {
      return this.sieve[top]![left] === 1;
    }

    const midRow = (top + bottom) >> 1;
    const midCol = (left + right) >> 1;

    return (
      this.isSquare(left, midCol, top, midRow) &&
      this.isSquare(midCol + 1, right, top, midRow) &&
      this.isSquare(left, midCol, midRow + 1, bottom) &&
      this.isSquare(midCol + 1, right, midRow + 1, bottom)
    );
  }

  findBiggestSquare(pos: Pos) {
    if (pos.isValid(this.sieve)) {
      return 0;
    }

    if (pos.isSquare(this.sieve)) {
      return (pos.bottom - pos.top + 1) * (pos.right - pos.left + 1);
    }
  }
}

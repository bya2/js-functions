interface Position {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

export function isValidPosition(
  grid: number[][],
  { left, right, top, bottom }: Position
) {
  return (
    left >= 0 &&
    left < grid[0]!.length &&
    top >= 0 &&
    top < grid.length &&
    left <= right &&
    top <= bottom
  );
}

export function isSquare(
  grid: number[][],
  { left, right, top, bottom }: Position
) {
  for (let i = top; i <= bottom; ++i) {
    for (let j = left; j <= right; ++j) {
      if (!grid[i][j]) {
        return false;
      }
    }
  }
}

export function findLargestSquare(grid: number[][], position: Position) {}

class Grid {
  inner: number[][];

  constructor(data: number[][]) {
    this.inner = data;
  }

  isSquare({ left, right, top, bottom }: Position) {
    for (let i = top; i <= bottom; ++i) {
      for (let j = left; j <= right; ++j) {
        if (!this.inner[i][j]) {
          return false;
        }
      }
    }

    return true;
  }
}

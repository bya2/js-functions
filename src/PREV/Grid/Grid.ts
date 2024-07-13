export interface Coordinate {
  row: number;
  column: number;
}

export interface GridInterface {
  findLargestSquare(topLeft: Coordinate, bottomRight: Coordinate): number;
  isValidSquare(topLeft: Coordinate, bottomRight: Coordinate): boolean;
  isSquare(topLeft: Coordinate, bottomRight: Coordinate): boolean;
}

export default class Grid implements GridInterface {
  private data: number[][];
  private rows: number;
  private columns: number;

  constructor(data: number[][]) {
    this.data = data;
    this.rows = data.length;
    this.columns = data[0].length;
  }

  findLargestSquare(topLeft: Coordinate, bottomRight: Coordinate): number {
    if (!this.isValidSquare(topLeft, bottomRight)) {
      return 0;
    }

    if (this.isSquare(topLeft, bottomRight)) {
      return (bottomRight.row - topLeft.row + 1) * (bottomRight.column - topLeft.column + 1);
    }

    const midRow = Math.floor((topLeft.row + bottomRight.row) / 2);
    const midCol = Math.floor((topLeft.column + bottomRight.column) / 2);

    const square1 = this.findLargestSquare(topLeft, { row: midRow, column: midCol });
    const square2 = this.findLargestSquare(
      { row: topLeft.row, column: midCol + 1 },
      { row: midRow, column: bottomRight.column }
    );
    const square3 = this.findLargestSquare(
      { row: midRow + 1, column: topLeft.column },
      { row: bottomRight.row, column: midCol }
    );
    const square4 = this.findLargestSquare({ row: midRow, column: midCol }, bottomRight);

    return Math.max(square1, square2, square3, square4);
  }

  isValidSquare(topLeft: Coordinate, bottomRight: Coordinate): boolean {
    return (
      bottomRight.row >= topLeft.row &&
      bottomRight.column >= topLeft.column &&
      bottomRight.row < this.rows &&
      bottomRight.column < this.columns
    );
  }

  isSquare(topLeft: Coordinate, bottomRight: Coordinate): boolean {
    for (let i = topLeft.row; i <= bottomRight.row; ++i) {
      for (let j = topLeft.column; j <= bottomRight.column; ++j) {
        if (this.data[i][j] === 0) {
          return false;
        }
      }
    }
    return true;
  }
}

// interface GridInterface {
//   findLargestSquare(topLeft, bottomRight):
// }

// class Grid implements GridInterface {

// }
// export default Grid;

// export function divideAndConquer(matrix: number[][]): number[][] {
//   if (matrix.length === 1) {
//     return matrix;
//   }

//   const mid = Math.floor(matrix.length / 2);
//   const a = divideAndConquer(matrix.slice(0, mid).map((row) => row.slice(0, mid)));

//   return matrix;
// }

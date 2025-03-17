interface Board<T> {
  board: T[][];
}

interface Matrix<T extends number = number> {
  matrix: T[][];
}

interface Position {
  left: number;
  right: number;
  top: number;
  bottom: number;
}

export class MatrixSievePos implements Position {
  top: number;
  right: number;
  bottom: number;
  left: number;

  constructor(top: number, right: number, bottom: number, left: number) {
    this.top = top;
    this.right = right;
    this.bottom = bottom;
    this.left = left;
  }

  isValid(mat: any[][]): boolean {
    return (
      this.top <= this.bottom &&
      this.left <= this.right &&
      this.top >= 0 &&
      this.bottom < mat.length &&
      this.left >= 0 &&
      this.right < mat[0]!.length
    );
  }

  isTruthy(mat: any[][]): boolean {
    for (let i = this.top; i <= this.bottom; ++i) {
      for (let j = this.left; j <= this.right; ++j) {
        if (!mat[i]![j]) {
          return false;
        }
      }
    }

    return true;
  }
}

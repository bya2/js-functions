import * as path from "path";

const CWD = process.cwd();

class Path {
  static fromFile(...paths: string[]) {
    return path.resolve(__dirname, ...paths);
  }

  static fromCWD(...paths: string[]) {
    return path.resolve(CWD, ...paths);
  }
}

export default Path;

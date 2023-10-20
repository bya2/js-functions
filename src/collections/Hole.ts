interface HoleConstructor<T> {
  new (data: T[], pos: number): Hole<T>;
  pos: number;
}

interface ImplHole<T> {
  element(): T;
  get(): T;
  moveTo(index: number): void;
}

class Hole<T> implements ImplHole<T> {
  data: T[];
  elt: any;
  pos: number;

  constructor(data: T[], pos: number) {
    if (pos >= data.length) throw new Error();

    this.data = data;
    this.elt = [];
    this.pos = pos;
  }

  get pos(): number {
    return this.pos;
  }

  element(): T {
    throw new Error("Method not implemented.");
  }
  get(): T {
    throw new Error("Method not implemented.");
  }
  moveTo(index: number): void {
    throw new Error("Method not implemented.");
  }
}

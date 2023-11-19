interface ImplVisitMap<Ix> {
  visit(ix: Ix): void;
  isVisit(x: Ix): boolean;
}

export class VisitSet<Ix = any> extends Set<Ix> implements ImplVisitMap<Ix> {
  visit(x: Ix) {
    return this.add(x);
  }

  isVisit(x: Ix): boolean {
    return this.has(x);
  }
}

export class VisitMap<Ix = any> extends Map<Ix, boolean> implements ImplVisitMap<Ix> {
  visit(x: Ix) {
    return this.set(x, true);
  }

  isVisit(x: Ix): boolean {
    return this.has(x);
  }
}

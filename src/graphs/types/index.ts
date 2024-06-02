export interface IntoNeighbors<N> {
  neighbors(node: N): Iterable<N>;
}

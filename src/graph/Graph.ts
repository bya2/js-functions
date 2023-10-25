interface ImplGraph {}

export default class Graph<DT> implements ImplGraph {
  _inner: Map<Node<DT>, Node<DT>[]>;

  constructor() {
    
  }
}

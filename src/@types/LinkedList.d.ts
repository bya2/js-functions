export interface IDoublyLinkedNode<T> {
  element: T;
  prev: Option<IDoublyLinkedNode<T>>;
  next: Option<IDoublyLinkedNode<T>>;
}

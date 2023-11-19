import DLL from "@/List/DLL";

interface implBFS {}

export default class BFS<T> implements implBFS {
  queue: DLL<T>;
}

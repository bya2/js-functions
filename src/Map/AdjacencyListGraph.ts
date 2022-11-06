import { WARN_NodeAlreadyExist, WARN_NoSuchNodeExist } from "@/misc/messages";
import { AdjacencyListGraphInterface } from "@/misc/interfaces";

class AdjacencyListGraph<T = any> extends Map<T, Set<T>> implements AdjacencyListGraphInterface<T> {
  /**
   * 인접 리스트 그래프 노드 추가(인접 리스트의 키에 해당하는 노드를 추가)
   * @param obj
   */
  add(obj: T): void {
    if (this.has(obj)) {
      console.warn(WARN_NodeAlreadyExist);
    } else {
      this.set(obj, new Set<T>());
    }
  }

  /**
   * 인접 리스트 그래프의 노드 간 간선 추가(인접 리스트의 키에 매핑되는 리스트에 노드를 추가)
   * @param obj1
   * @param obj2
   */
  connect(obj1: T, obj2: T): void {
    if (this.has(obj1) && this.has(obj2)) {
      this.get(obj1)!.add(obj2);
      this.get(obj2)!.add(obj1);
    } else {
      console.warn(WARN_NoSuchNodeExist);
    }
  }

  /**
   * 인접 리스트 그래프의 모든 노드 간 간선 추가
   */
  connectAll(): void {
    for (const obj1 of this.keys()) {
      for (const obj2 of this.keys()) {
        if (obj1 !== obj2) {
          this.connect(obj1, obj2);
        }
      }
    }
  }

  /**
   * 인접 리스트 그래프의 노드 간 간선 제거(인접 리스트의 키에 매핑되는 리스트에서 노드를 제거)
   * @param obj1
   * @param obj2
   */
  disconnect(obj1: T, obj2: T): void {
    if (this.has(obj1) && this.has(obj2)) {
      this.get(obj1)!.delete(obj2);
      this.get(obj2)!.delete(obj1);
    } else {
      console.warn(WARN_NoSuchNodeExist);
    }
  }

  /**
   * 깊이 우선 탐색을 통해 높이 등 그래프 정보를 리턴
   * @param validator
   */
  searchDepthFirst(validator?: (data: T, ...args: any[]) => boolean): { height: number } {
    const marked = new Map<T, boolean>();
    let height = 0;

    const searchChild = (curr: T, depth: number = 0) => {
      if (height < depth) height = depth;

      marked.set(curr, true);
      for (const adj of this.get(curr)!) {
        if (!marked.get(adj)) {
          if (validator?.(adj) ?? true) {
            searchChild(adj, depth + 1);
          }
        }
      }
      marked.set(curr, false);
    };

    for (const root of this.keys()) {
      if (validator?.(root) ?? true) {
        searchChild(root, 0);
      }
    }

    return {
      height,
    };
  }

  /**
   * 너비 우선 탐색을 통해 노드의 개수, 높이 등 그래프 정보를 리턴
   * @param root
   */
  searchBreadthFirst(root: T): { n: number; height: number } {
    const queue = [root];
    const marked = new Map([[root, true]]);

    let n = 0;
    let depth = 0;
    for (; queue.length > 0; ++depth) {
      for (let size = queue.length; size > 0; --size, ++n) {
        const curr = queue.shift()!;
        for (const adj of this.get(curr)!) {
          if (!marked.get(adj)) {
            queue.push(adj);
            marked.set(adj, true);
          }
        }
      }
    }

    return {
      n,
      height: depth,
    };
  }
}

export default AdjacencyListGraph;

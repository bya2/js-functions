import Heap from "./Heap";

class Progress extends Array<number> {
  /**
   * 진행되는 요소마다 해싱과 우선순위 큐
   * 요구조건이 충족되지 않을 때마다, 코스트가 존재한다면, 진행된 요소 내에서 우선순위에 해당하는 요소를 해시 내에서 마이너스
   * @param cost 사용할 수 있는 비용
   * @param frees 비용 없이 진행할 수 있는 개수
   * @returns 진행될 수 있는 요소 개수
   */
  getRountToProceed(cost: number, frees: number = 0) {
    const dict = {} as any;
    const heap = new Heap();

    for (let i = 0, len = this.length; i < len; ++i) {
      const el = this[i];

      cost -= el;
      if (dict[el]) dict[el]++;
      else {
        heap.insert(el);
        dict[el] = 1;
      }

      if (cost < 0) {
        if (frees) {
          frees--;
          const max = heap[0];
          cost += max;
          dict[max]--;
          if (!dict[max]) heap.poll();
        } else {
          return i;
        }
      }
    }

    return this.length;
  }
}

export default Progress;

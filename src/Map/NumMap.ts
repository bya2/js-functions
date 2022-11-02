export default class NumMap<K = any> extends Map<K, number> implements NumMapInterface {
  /**
   * 증가
   * @param key
   * @param value
   * @returns THIS
   */
  increase(key: K, value: number = 1) {
    return this.set(key, (this.get(key) ?? 0) + value);
  }

  /**
   * 감소
   * @param key
   * @param value
   * @returns THIS
   */
  decrease(key: K, value: number = 1) {
    return this.set(key, (this.get(key) ?? 0) - value);
  }

  /**
   * 키에 대응하는 값 더하기
   * @param keys
   * @returns 매개 변수들의 합
   */
  add(...keys: K[]): number {
    return keys.reduce((acc, key) => acc + (this.get(key) ?? 0), 0);
  }

  /**
   * 키에 대응하는 값 빼기
   * @param keys
   * @returns 첫 매개변수 - 나머지 매개변수의 합
   */
  subtract(...keys: K[]): number {
    const [el, ...arr] = keys;
    return arr.reduce((acc, key) => acc - (this.get(key) ?? 0), this.get(el) ?? 0);
  }

  /**
   * 맵과 비교하여 매개변수 배열 내에서 여분의 키를 검색
   * @param arr
   * @returns K | undefined
   */
  findSpareKey(arr: K[]): K | undefined {
    return arr.find((k) => {
      if ((this.get(k) ?? 0) > 0) this.decrease(k);
      else return true;
    });
  }

  /**
   * 범위 내 요청
   * - Lv2. 할인 행사
   * @param elements: 요청 가능한 요소 목록
   * @param scopes: 첫 매개변수 배열에서 한 번에 요청할 수 있는 인덱스 범위 크기
   * @return 유효한 요청 갯수 or 유효한 범위 갯수(크기)
   */
  requestInScope(elements: K[], scopes: number): number {
    if (elements.length < scopes) return 0;

    let validScopes: number = elements.length - scopes + 1;
    let requests: K[] = [...this.keys()];
    const numMap = NumMap.from<K>(elements.slice(0, scopes));

    // 요소를 요청한 갯수보다 요청 가능한 요소의 갯수가 적으면,
    // - 유효 요청 갯수 감소
    // - 해당 인덱스에 있는 요소를 맨 앞으로
    const compare = () => {
      for (let i = 0, len = requests.length; i < len; ++i) {
        if ((this.get(requests[i]) ?? 0) > (numMap.get(requests[i]) ?? 0)) {
          --validScopes;
          i !== 0 && (requests = [requests[i], ...(requests.splice(i, 1), requests)]);
          break;
        }
      }
    };

    compare();
    for (let i = scopes, len = elements.length; i < len; ++i) {
      numMap.increase(elements[i]);
      numMap.decrease(elements[i - scopes]);
      compare();
    }

    return validScopes;
  }

  /**
   * MAP 안에서 최댓값을 가진 키 목록 (Stack)
   * @param least 키값이 가져야할 최솟값
   * @returns 키 목록
   */
  keysWithMaximum(least: number = 1): K[] {
    const arrStack = []; // keys
    let maximum = 0;

    for (const key of this.keys()) {
      if ((this.get(key) || -Infinity) < least) continue;

      if (arrStack.length === 0) {
        arrStack.push(key);
        maximum = this.get(key) || -Infinity;
        continue;
      }

      const b = this.get(key) || -Infinity;
      if (maximum > b) continue;
      if (maximum < b) arrStack.length = 0;
      arrStack.push(key);
      maximum = this.get(key) || -Infinity;
    }

    return arrStack;
  }

  /**
   * 모든 값이 사건의 수일 때 일어날 수 있는 '경우의 가짓수'
   * @returns 경우의 수
   */
  numberOfCase() {
    return [...this.values()].reduce((acc, val) => acc * (val + 1), 1);
  }

  /**
   * 각 요소 별 갯수를 대응하는 해쉬 생성
   * @param arr
   * @returns NumMap
   */
  static from<K = any>(arr: K[]): NumMap<K> {
    return arr.reduce((map, k) => map.increase(k), new this<K>());
  }

  /**
   * 합집합
   * @param map1
   * @param map2
   * @returns NumMap
   */
  static union<K = any>(map1: Map<K, number>, map2: Map<K, number>): NumMap<K> {
    for (const key of map2.keys()) {
      if (map1.has(key)) {
        map1.set(key, Math.max(map1.get(key) as number, map2.get(key) as number));
      } else {
        map1.set(key, map2.get(key) as number);
      }
    }
    return new this<K>([...map1]);
  }

  /**
   * 교집합
   * @param map1
   * @param map2
   * @returns NumMap
   */
  static intersection<K = any>(map1: Map<K, number>, map2: Map<K, number>): NumMap<K> {
    const numMap = new this<K>();
    for (const key of map1.keys()) {
      if (map2.has(key)) {
        numMap.set(key, Math.min(map1.get(key) as number, map2.get(key) as number));
      }
    }
    return numMap;
  }
}

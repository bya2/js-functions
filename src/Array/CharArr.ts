type Dict<T> = { [key: string]: T };

export default class CharArr extends Array<string> {
  /**
   * 특정 길이의 문자 조합을 리턴 (순서가 달라도 구성이 같다면 같은 문자열로 취급)
   * @param length 조합될 문자열의 길이
   */
  combineOrderedStringsOf(length: number): string[] {
    const combinations: string[] = [];

    /**
     * @param acc 누적되는 문자 리스트
     * @param index 검색할 문자의 시작 인덱스
     */
    const recur = (acc: string[] = [], index: number = 0): void => {
      if (acc.length === length) {
        combinations.push(acc.join(""));
        return;
      }

      for (let i = index, len = this.length; i < len; ++i) {
        recur([...acc, this[i]], i + 1);
      }
    };

    recur();
    return combinations;
  }

  /**
   * 특정 길이의 문자 조합을 리턴 (순서가 다르면 다른 문자열로 취급)
   * @param length 조합될 문자열의 길이
   */
  combineAllStringsOf(length: number): string[] {
    const combinations: string[] = [];
    const visited = this.reduce((obj, t) => ((obj[t] = false), obj), {} as Dict<boolean>);

    /**
     * @param acc 누적되는 문자 리스트
     * @param dict 탐색 여부 해시
     */
    const recur = (acc: string[] = [], dict: Dict<boolean> = { ...visited }): void => {
      if (acc.length === length) {
        combinations.push(acc.join(""));
        return;
      }

      for (const char of this) {
        if (!dict[char]) {
          recur([...acc, char], { ...dict, [char]: true });
        }
      }
    };

    recur();
    return combinations;
  }
}

// getCombinationsBy(_length: number): string[] {
//   let combinations: string[] = [];

//   const cb = (acc: string[], index: number): void => {
//     if (acc.length === _length) {
//       combinations.push(acc.join(""));
//       return;
//     }

//     for (let i = index, len = this.length; i < len; ++i) {
//       cb([...acc, this[i]], i + 1);
//     }
//   };

//   cb([], 0);
//   return combinations;
// }

// /**
//  * 문자들을 'length'의 길이로 조합하고 해쉬에 추가
//  * @param _length 조합될 길이
//  * @returns 조합된 문자들의 갯수 해쉬
//  */
//  increaseCombsTo(_map: Map<string, number>, _length: number): Map<string, number> {
//   const cb = (acc: string[], index: number): void => {
//     if (acc.length === _length) {
//       const comb = acc.join("");
//       _map.set(comb, (_map.get(comb) || 0) + 1);
//       return;
//     }

//     for (let i = index, len = this.length; i < len; ++i) {
//       cb([...acc, this[i]], i + 1);
//     }
//   };

//   cb([], 0);
//   return _map;
// }

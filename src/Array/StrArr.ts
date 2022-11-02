import Arr from "./Arr";

export default class StrArr extends Arr<string> {
  /**
   * 정렬
   * @param _byList 정렬 기준
   * @param _in 정렬 순서
   * @returns THIS
   */
  arrange(_byList: number[] = [StrArr.VALUE], _in: number = 0): StrArr {
    return this.sort((a, b) => {
      let obj1: any, obj2: any;

      for (const _by of _byList) {
        switch (_by) {
          case StrArr.LENGTH:
            [obj1, obj2] = [a.length, b.length];
            break;
          case StrArr.VALUE:
          default:
            [obj1, obj2] = [a, b];
            break;
        }
      }

      switch (_in) {
        case StrArr.ASC:
          return obj1 === obj2 ? 0 : obj1 < obj2 ? -1 : 1;
        case StrArr.DESC:
          return obj1 === obj2 ? 0 : obj1 > obj2 ? -1 : 1;
        default:
          return 0;
      }
    });
  }
}

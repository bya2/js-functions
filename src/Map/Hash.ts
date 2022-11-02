interface HashInterface {}

export default class Hash<K = any, V = any> extends Map<K, V> implements HashInterface {
  /**
   * 키 값 쌍을 Map으로 생성
   * @param _keys
   * @param _values
   * @returns Map
   */
  static from<K, V>(_keys: K[], _values: V[]): Map<K, V> {
    return _keys.reduce((hash, key, i) => hash.set(key, _values[i]), new Map<K, V>());
  }
}

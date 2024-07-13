export const MapUtils = {
  union<K, V>(a: Map<K, V>, b: Map<K, V>): Map<K, V> {
    for (const [k, v] of b) a.has(k) || a.set(k, v);
    return a;
  },

  difference<K, V>(a: Map<K, V>, b: Map<K, V>): Map<K, V> {
    for (const k of b.keys()) a.has(k) && a.delete(k);
    return a;
  },

  intersection<K, V>(a: Map<K, V>, b: Map<K, V>): Map<K, V> {
    for (const k of b.keys()) a.has(k) || a.delete(k);
    return a;
  },
};

export const SetUtils = {
  union<T>(a: Set<T>, b: Set<T>): Set<T> {
    for (const v of b) a.has(v) || a.add(v);
    return a;
  },

  diffrence<T>(a: Set<T>, b: Set<T>): Set<T> {
    for (const v of b) a.has(v) && a.delete(v);
    return a;
  },

  intersection<T>(a: Set<T>, b: Set<T>): Set<T> {
    for (const v of b) a.has(v) || a.delete(v);
    return a;
  },
};

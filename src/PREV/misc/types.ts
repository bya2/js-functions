export type Memoize<K, V> = (fn: (arg: K) => V) => (arg: K) => V;

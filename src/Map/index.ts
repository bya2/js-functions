Object.defineProperties(Map, {
  from: {
    value: function <K, V>(keys: K[], values: V[]): Map<K, V> {
      return keys.reduce((map, key, i) => map.set(key, values[i]), new this());
    },
  },
});

Object.defineProperties(Map.prototype, {
  test: {
    value: function () {},
  },
});

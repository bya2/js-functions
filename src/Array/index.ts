Object.defineProperties(Array, {
  // from: {
  //   value: function <K, V>(keys: K[], values: V[]): Map<K, V> {
  //     return keys.reduce((map, key, i) => map.set(key, values[i]), new this());
  //   },
  // },
});

Object.defineProperties(Array.prototype, {
  LEFT: {
    value: 101,
    writable: false,
  },

  RIGHT: {
    value: 102,
    writable: false,
  },

  rotate: {
    value: function (direction: number = 101) {
      if (this.length >= 1) {
        switch (direction) {
          case this.LEFT:
            this.push(this.shift());
            break;
          case this.RIGHT:
            this.splice(0, 0, this.pop());
            break;
        }
      }
    },
  },
});

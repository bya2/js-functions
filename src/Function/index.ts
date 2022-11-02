Object.defineProperties(Function, {
  curry: {
    value: function (cb: any) {
      return (...args: any[]) => {
        if (args.length >= cb.length) return cb(...args);
        return this.curry(cb.bind(null, ...args));
      };
    },
  },
});

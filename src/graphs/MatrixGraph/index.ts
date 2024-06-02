const INVALID_PROP = "";

interface ErrOptions {
  cause?: unknown;
  code?: number;
  message: string;
}

function Some<O extends object>(o: O) {
  return new Proxy(o, {
    get(target, p, receiver) {
      if (p in target) {
        return Reflect.get(target, p, receiver);
      } else {
        throw new Error(`Invalid property: `);
      }
    },
  });
}

function reactive<T extends object>(o: T): T {
  return new Proxy(o, {
    get(target, p, receiver) {},
  });
}

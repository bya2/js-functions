import { Some, None } from "@bya2/js-option";

(function () {
  Object.defineProperties(globalThis, {
    Some: {
      value: Some,
    },
    None: {
      value: None,
    },
  });
})();

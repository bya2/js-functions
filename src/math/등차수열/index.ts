import IAP from "./IAP";

/**
 * 등차수열
 * Arithmetical Sequence(Progression)
 */
export const AP: IAP = {
  nth(n, a, d) {
    return a + (n - 1) * d;
  },

  sum(n, a, l) {
    return (n * (a + l)) / 2;
  },
};

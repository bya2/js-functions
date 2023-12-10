import BinaryHeap from "./BinaryHeap";

const examples = [
  {
    desc: "",
    tests: [
      {
        name: "",
        actual: `13
        0
        1
        2
        0
        0
        3
        2
        1
        0
        0
        0
        0
        0`,
        expected: `0
        2
        1
        3
        2
        1
        0
        0`,
      },
    ],
  },
];

for (const { desc, tests } of examples) {
  describe(desc, () => {
    for (const { name, actual, expected } of tests) {
      it(name, () => {
        expect(actual).toBe(expected);
      });
    }
  });
}

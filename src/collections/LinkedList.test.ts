import LinkedList from "./LinkedList";

const examples = [
  {
    desc: "",
    tests: [
      {
        name: "",
        actual: "",
        expected: "",
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

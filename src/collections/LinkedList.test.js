import LinkedList from "./LinkedList";

const examples = [
  {
    DESC: "Methods of 'LinkedList' class",
    table: [
      // {
      //   TEST_NAME: "at",
      //   // args: [],
      //   actual: "",
      //   expected: "",
      // },
      ["at", "", ""],
    ],
  },
];

beforeEach(() => {});

afterEach(() => {});

for (const { DESC, table } of examples) {
  describe(DESC, () => {
    // test.each(table)("%s", (method, args, expected) => {
    //   expect(ll[method](...args)).toBe(expected);
    // });
    for (const { TEST, actual, expected } of table) {
      test(TEST, () => {
        expect(actual).toBe(expected);
      });
    }
  });
}

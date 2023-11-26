import LinkedList from "./LinkedList";

const ll = new LinkedList();

const v = [
  {
    DESC_NAME: "Methods of 'LinkedList' class",
    items: [
      // {
      //   TEST_NAME: "at",
      //   actual: "",
      //   expected: "",
      // },
      ["at", 0, "값"],
    ],
  },
];

beforeEach(() => {});

afterEach(() => {});

for (const i of v) {
  describe(i.DESC_NAME, () => {
    test.each(i.items)("%s", (methodName, arg, expected) => {
      expect(ll[methodName](arg)).toBe(expected);
    });

    // for (const item of i.items) {
    //   test(item.TEST_NAME, () => {
    //     expect(item.actual).toBe(item.expected);
    //   });
    // }
  });
}

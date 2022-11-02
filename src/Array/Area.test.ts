import Area from "./Area";

describe("Area.proptotype.methods", () => {
  it("get - length of biggest part", () => {
    const area = new Area(
      ...[
        [0, 1, 1, 1],
        [1, 1, 1, 1],
        [1, 1, 1, 1],
        [0, 0, 1, 0],
      ]
    );
    expect(area.getLengthOfLargestSquare()).toBe(3);
  });
});

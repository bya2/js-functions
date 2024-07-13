import NumArr from "./NumArr";

describe("Number array prototype methods", () => {
  it("arrange", () => {
    const numArr = new NumArr();
    const received = [3, 1, 2, 5, 4];
    const expected = received.sort((a, b) => a - b);
    expect(numArr.arrange.call(received, [NumArr.VALUE], NumArr.ASC)).toEqual(expected);
  });
});

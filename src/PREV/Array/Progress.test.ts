import Progress from "./Progress";

describe("Progress array prototype methods", () => {
  it("coding test - 디펜스 게임", () => {
    const progress = new Progress();

    const examples = [
      {
        n: 7,
        k: 3,
        enemy: [4, 2, 4, 5, 3, 3, 1],
        answer: 5,
      },
      {
        n: 2,
        k: 4,
        enemy: [3, 3, 3, 3],
        answer: 4,
      },
    ];

    for (const example of examples) {
      expect(progress.getRountToProceed.call(example.enemy, example.n, example.k)).toBe(
        example.answer
      );
    }
  });
});

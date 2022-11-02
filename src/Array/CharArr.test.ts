import CharArr from "@/Array/CharArr";

describe("CharArr.prototype.methods", () => {
  it("combine - ordered", () => {
    const charArr = new CharArr();
    const signs = ["+", "-", "*"];
    expect(charArr.combineOrderedStringsOf.call(signs, 3)).toEqual(["+-*"]);
  });

  it("combine - all", () => {
    const charArr = new CharArr();
    const signs = ["+", "-", "*"];
    expect(charArr.combineAllStringsOf.call(signs, 3)).toEqual([
      "+-*",
      "+*-",
      "-+*",
      "-*+",
      "*+-",
      "*-+",
    ]);
  });
});

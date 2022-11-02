import StrArr from "@/Array/StrArr";

describe("String array prototype methods", () => {
  test("arrange", () => {
    const strArr = new StrArr();
    const received = ["ADS", "AC", "A", "AD", "VDVDS", "VDVD"];
    const expected = ["A", "AC", "AD", "ADS", "VDVD", "VDVDS"];
    // const tmpArr = new StrArr(...received);
    // const b = tmpArr.arrange([tmpArr.LENGTH, tmpArr.VALUE], tmpArr.ASC);
    // const tmp = tmpArr.arrange.call(data, [tmpArr.LENGTH, tmpArr.VALUE], tmpArr.ASC);

    expect(strArr.arrange.call(received, [StrArr.LENGTH], StrArr.ASC)).toEqual(
      expected
    );
  });
});

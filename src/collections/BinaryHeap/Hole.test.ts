import Hole from "./Hole";

describe("Hole methods", () => {
  const hole = new Hole([1, 2, 3, 4, 5], 4);

  test("properties", () => {
    expect(hole.element).toBe(5);
    expect(hole.pos).toBe(4);
  });

  test(".get", () => {
    expect(hole.get(0)).toBe(1);
    expect(hole.get(1)).toBe(2);
    expect(hole.get(2)).toBe(3);
    expect(hole.get(3)).toBe(4);
    expect(hole.get(4)).toBe(5);
  });

  test(".moveTo", () => {
    hole.moveTo(0); // pos: 4 -> 0
    expect(hole.element).toBe(5);
    expect(hole.pos).toBe(0);
    expect(hole.get(4)).toBe(1);
    expect(hole.get(0)).toBe(hole.element);

    hole.moveTo(1); // pos: 0 -> 1
    expect(hole.element).toBe(5);
    expect(hole.pos).toBe(1);
    expect(hole.get(0)).toBe(2);
    expect(hole.get(1)).toBe(hole.element);

    hole.moveTo(2); // pos: 1 -> 2
    expect(hole.element).toBe(5);
    expect(hole.pos).toBe(2);
    expect(hole.get(1)).toBe(3);
    expect(hole.get(2)).toBe(hole.element);
  });
});

import {copy} from "./copy";

describe("utils", () => {
  describe("copy()", () => {
    describe("for array", () => {
      it("should return copy array", () => {
        const value = [1, 2, 3];
        expect(copy(value)).not.toBe(value);
        expect(copy(value)).toEqual(value);
      });
    });

    describe("for object", () => {
      it("should return copy object", () => {
        const value = {foo: 1, bar: 2};
        expect(copy(value)).not.toBe(value);
        expect(copy(value)).toEqual(value);
      });
    });

    describe("for primitives", () => {
      it("should return input", () => {
        expect(copy(1)).toBe(1);
        expect(copy("foo")).toBe("foo");
        expect(copy(true)).toBe(true);
        expect(copy(null)).toBe(null);
      });
    });
  });
});

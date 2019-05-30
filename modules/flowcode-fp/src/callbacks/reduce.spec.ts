import * as reduce from "./reduce";

describe("fold", () => {
  describe("count()", () => {
    it("should count inputs", () => {
      const input = [1, 2, 3, 4, 5];
      expect(input.reduce(reduce.count, 0)).toEqual(5);
    });
  });

  describe("push()", () => {
    it("should append items to array", () => {
      const input = [1, 2, 3, 4, 5];
      expect(input.reduce(reduce.push, [])).toEqual([1, 2, 3, 4, 5]);
    });
  });

  describe("unshift()", () => {
    it("should prepend items to array", () => {
      const input = [1, 2, 3, 4, 5];
      expect(input.reduce(reduce.unshift, [])).toEqual([5, 4, 3, 2, 1]);
    });
  });

  describe("concat()", () => {
    it("should concat items to array", () => {
      const input = [[1, 2], [3, 4], [5]];
      expect(input.reduce(reduce.concat, [])).toEqual([1, 2, 3, 4, 5]);
    });
  });

  describe("last()", () => {
    it("should return last item", () => {
      const input = [1, 2, 3, 4, 5];
      expect(input.reduce(reduce.last)).toEqual(5);
    });
  });

  describe("first()", () => {
    it("should return first item", () => {
      const input = [1, 2, 3, 4, 5];
      expect(input.reduce(reduce.first)).toEqual(1);
    });
  });

  describe("add()", () => {
    it("should return joined string", () => {
      const input = ["1", "2", "3", "4", "5"];
      expect(input.reduce(reduce.add, "")).toEqual("12345");
    });
  });

  describe("min()", () => {
    it("should return minimum item", () => {
      const input = [1, 2, 3, 4, 5];
      expect(input.reduce(reduce.min, Infinity)).toEqual(1);
    });
  });

  describe("max()", () => {
    it("should return maximum item", () => {
      const input = [1, 2, 3, 4, 5];
      expect(input.reduce(reduce.max, -Infinity)).toEqual(5);
    });
  });
});

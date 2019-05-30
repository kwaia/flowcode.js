import * as map from "./map";

describe("map", () => {
  describe("constant()", () => {
    it("should return specified value", () => {
      expect(map.constant(5)(null)).toBe(5);
    });
  });

  describe("split()", () => {
    it("should return split string", () => {
      expect(map.split(",")("foo,bar,baz"))
      .toEqual(["foo", "bar", "baz"]);
    });
  });

  describe("pluck()", () => {
    it("should return specified eqProperty", () => {
      expect(map.pluck("foo")({foo: 5, bar: true})).toBe(5);
    });
  });

  describe("mpluck()", () => {
    let mpluck: (value: {}) => any;

    beforeEach(() => {
      mpluck = map.mpluck(["foo", "bar"]);
    });

    it("should pluck multiple values", () => {
      expect(mpluck({bar: 1, foo: "hello", baz: null})).toEqual(["hello", 1]);
    });
  });

  describe("add()", () => {
    let join: (value: Array<any>) => string;

    beforeEach(() => {
      join = map.join(";");
    });

    it("should join input array", () => {
      expect(join(["foo", 5, true])).toBe("foo;5;true");
    });
  });

  describe("append()", () => {
    let append: (value: string) => string;

    beforeEach(() => {
      append = map.append("_");
    });

    it("should append to input string", () => {
      expect(append("foo")).toBe("foo_");
    });
  });

  describe("prepend()", () => {
    let prepend: (value: string) => string;

    beforeEach(() => {
      prepend = map.prepend("_");
    });

    it("should prepend to input string", () => {
      expect(prepend("foo")).toBe("_foo");
    });
  });

  describe("round()", () => {
    describe("when precision is specified", () => {
      let round: (next: number) => number;

      beforeEach(() => {
        round = map.round(2);
      });

      it("should return value rounded to precision", () => {
        expect(round(5)).toBe(5);
        expect(round(5.11)).toBe(5.11);
        expect(round(5.111)).toBe(5.11);
        expect(round(5.115)).toBe(5.12);
      });
    });

    describe("when precision is not specified", () => {
      let round: (next: number) => number;

      beforeEach(() => {
        round = map.round();
      });

      it("should return value rounded to whole", () => {
        expect(round(5)).toBe(5);
        expect(round(5.1)).toBe(5);
        expect(round(5.5)).toBe(6);
      });
    });
  });
});

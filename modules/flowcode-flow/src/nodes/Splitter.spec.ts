import {connect} from "flowcode";
import {createSplitter, Splitter} from "./Splitter";

describe("createSplitter()", () => {
  describe("on input (d_val)", () => {
    let node: Splitter<{ foo: number, bar: number }>;

    beforeEach(() => {
      node = createSplitter(["foo", "bar"]);
    });

    it("should emit on all ports", () => {
      const foo = jasmine.createSpy();
      const bar = jasmine.createSpy();
      connect(node.o.foo, foo);
      connect(node.o.bar, bar);
      node.i.all({foo: 5, bar: 3}, "1");
      expect(foo).toHaveBeenCalledWith(5, "1");
      expect(bar).toHaveBeenCalledWith(3, "1");
    });
  });
});

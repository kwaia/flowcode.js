import {connect} from "flowcode";
import {createSwitcher, Switcher} from "./Switcher";

describe("createSwitcher()", () => {
  describe("on input (all)", () => {
    let node: Switcher<"foo" | "bar" | "baz", number>;

    beforeEach(() => {
      node = createSwitcher(["foo", "bar", "baz"]);
    });

    it("should forward to specified output", () => {
      const foo = jasmine.createSpy();
      const bar = jasmine.createSpy();
      const baz = jasmine.createSpy();
      connect(node.o.foo, foo);
      connect(node.o.bar, bar);
      connect(node.o.baz, baz);
      node.i.all({
        d_val: 5,
        st_pos: "bar"
      }, "1");
      expect(foo).not.toHaveBeenCalled();
      expect(bar).toHaveBeenCalledWith(5, "1");
      expect(baz).not.toHaveBeenCalled();
    });

    describe("on invalid position", () => {
      it("should bounce input on 'b_all'", () => {
        const spy = jasmine.createSpy();
        connect(node.o.b_all, spy);
        node.i.all({
          d_val: 5,
          st_pos: <any>"quux"
        }, "1");
        expect(spy).toHaveBeenCalledWith({
          d_val: 5,
          st_pos: <any>"quux"
        }, "1");
      });
    });
  });

  describe("on input (d_val)", () => {
    let node: Switcher<"foo" | "bar" | "baz", number>;

    beforeEach(() => {
      node = createSwitcher(["foo", "bar", "baz"], "bar");
    });

    it("should forward to current position", () => {
      const foo = jasmine.createSpy();
      const bar = jasmine.createSpy();
      const baz = jasmine.createSpy();
      connect(node.o.foo, foo);
      connect(node.o.bar, bar);
      connect(node.o.baz, baz);
      node.i.d_val(5, "1");
      expect(foo).not.toHaveBeenCalled();
      expect(bar).toHaveBeenCalledWith(5, "1");
      expect(baz).not.toHaveBeenCalled();
    });

    describe("on invalid position", () => {
      beforeEach(() => {
        node.i.st_pos(<any>"quux", "1");
      });

      it("should bounce input on 'b_d_val'", () => {
        const spy = jasmine.createSpy();
        connect(node.o.b_d_val, spy);
        node.i.d_val(5, "2");
        expect(spy).toHaveBeenCalledWith(5, "2");
      });
    });
  });
});

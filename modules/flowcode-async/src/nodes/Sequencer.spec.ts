import {connect} from "flowcode";
import {createSequencer, Sequencer} from "./Sequencer";

describe("createSequencer()", () => {
  describe("on input (d_val)", () => {
    let node: Sequencer<number>;

    beforeEach(() => {
      node = createSequencer();
    });

    describe("when there is no matching tag", () => {
      it("should not emit on d_val", () => {
        const spy = jasmine.createSpy();
        connect(node.o.d_val, spy);
        node.i.d_val(5, "1");
        expect(spy).not.toHaveBeenCalled();
      });
    });

    describe("on matching tag(s)", () => {
      beforeEach(() => {
        node.i.r_tag(null, "1");
        node.i.r_tag(null, "2");
        node.i.r_tag(null, "3");
      });

      it("should emit on d_val", () => {
        const spy = jasmine.createSpy();
        connect(node.o.d_val, spy);
        node.i.d_val(3, "2");
        node.i.d_val(5, "1");
        expect(spy.calls.allArgs()).toEqual([
          [5, "1"],
          [3, "2"]
        ]);
      });
    });
  });

  describe("on input (r_tag)", () => {
    let node: Sequencer<number>;

    beforeEach(() => {
      node = createSequencer();
    });

    describe("when there is no matching value", () => {
      beforeEach(() => {
        node.i.d_val(3, "2");
      });

      it("should not emit on d_val", () => {
        const spy = jasmine.createSpy();
        connect(node.o.d_val, spy);
        node.i.r_tag(null, "1");
        expect(spy).not.toHaveBeenCalled();
      });
    });

    describe("on matching value", () => {
      beforeEach(() => {
        node.i.d_val(3, "2");
        node.i.d_val(5, "1");
      });

      it("should emit on d_val", () => {
        const spy = jasmine.createSpy();
        connect(node.o.d_val, spy);
        node.i.r_tag(null, "1");
        expect(spy).toHaveBeenCalledWith(5, "1");
      });
    });
  });
});

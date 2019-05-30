import {connect} from "flowcode";
import {createGate, Gate} from "./Gate";

describe("createGate()", () => {
  describe("on input (all)", () => {
    let node: Gate<number>;

    beforeEach(() => {
      node = createGate();
    });

    describe("when st_open is true", () => {
      it("should forward d_val", () => {
        const spy = jasmine.createSpy();
        connect(node.o.d_val, spy);
        node.i.all({
          d_val: 5,
          st_open: true
        }, "1");
        expect(spy).toHaveBeenCalledWith(5, "1");
      });
    });

    describe("when st_open is false", () => {
      it("should not forward d_val", () => {
        const spy = jasmine.createSpy();
        connect(node.o.d_val, spy);
        node.i.all({
          d_val: 5,
          st_open: false
        }, "1");
        expect(spy).not.toHaveBeenCalled();
      });

      it("should bounce input on 'b_all'", () => {
        const spy = jasmine.createSpy();
        connect(node.o.b_all, spy);
        node.i.all({
          d_val: 5,
          st_open: false
        }, "1");
        expect(spy).toHaveBeenCalledWith({
          d_val: 5,
          st_open: false
        }, "1");
      });
    });
  });

  describe("on input (d_val)", () => {
    describe("when open", () => {
      let node: Gate<number>;

      beforeEach(() => {
        node = createGate(true);
      });

      it("should forward d_val", () => {
        const spy = jasmine.createSpy();
        connect(node.o.d_val, spy);
        node.i.d_val(5, "1");
        expect(spy).toHaveBeenCalledWith(5, "1");
      });
    });

    describe("when closed", () => {
      let node: Gate<number>;

      beforeEach(() => {
        node = createGate(false);
      });

      it("should not forward d_val", () => {
        const spy = jasmine.createSpy();
        connect(node.o.d_val, spy);
        node.i.d_val(5, "1");
        expect(spy).not.toHaveBeenCalled();
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

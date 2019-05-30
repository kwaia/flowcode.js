import {connect} from "flowcode";
import {createReducer, Reducer} from "./Reducer";

describe("createReducer()", () => {
  describe("when initialized", () => {
    describe("on input (all)", () => {
      let node: Reducer<number, number>;

      beforeEach(() => {
        node = createReducer((curr, next) => curr + next, 0);
      });

      describe("when a_flush is true", () => {
        beforeEach(() => {
          node.i.all({d_val: 5, a_flush: false}, "1");
          node.i.all({d_val: 3, a_flush: false}, "2");
        });

        it("should emit on d_val", () => {
          const spy = jasmine.createSpy();
          connect(node.o.d_val, spy);
          node.i.all({d_val: 4, a_flush: true}, "3");
          expect(spy).toHaveBeenCalledWith(12, "3");
        });
      });

      describe("when callback throws", () => {
        beforeEach(() => {
          node = createReducer(() => {
            throw new Error("foo");
          }, 0);
        });

        it("should bounce input on 'b_all'", () => {
          const spy = jasmine.createSpy();
          connect(node.o.b_all, spy);
          node.i.all({
            a_flush: true,
            d_val: 4
          }, "1");
          expect(spy).toHaveBeenCalledWith({
            a_flush: true,
            d_val: 4
          }, "1");
        });

        it("should emit error message 'ev_err'", () => {
          const spy = jasmine.createSpy();
          connect(node.o.ev_err, spy);
          node.i.all({
            a_flush: true,
            d_val: 4
          }, "1");
          expect(spy).toHaveBeenCalledWith("Error: foo", "1");
        });
      });
    });

    describe("on input (d_val)", () => {
      let node: Reducer<number, number>;

      describe("when callback throws", () => {
        beforeEach(() => {
          node = createReducer(() => {
            throw new Error("foo");
          }, 0);
        });

        it("should bounce input on 'b_d_val'", () => {
          const spy = jasmine.createSpy();
          connect(node.o.b_d_val, spy);
          node.i.d_val(4, "1");
          expect(spy).toHaveBeenCalledWith(4, "1");
        });

        it("should emit error message 'ev_err'", () => {
          const spy = jasmine.createSpy();
          connect(node.o.ev_err, spy);
          node.i.d_val(4, "1");
          expect(spy).toHaveBeenCalledWith("Error: foo", "1");
        });
      });
    });

    describe("on input (a_flush)", () => {
      let node: Reducer<number, number>;

      beforeEach(() => {
        node = createReducer((curr, next) => curr + next, 0);
      });

      describe("when truthy", () => {
        beforeEach(() => {
          node.i.a_flush(false, "1");
          node.i.d_val(5, "2");
          node.i.d_val(3, "3");
        });

        it("should emit on d_val", () => {
          const spy = jasmine.createSpy();
          connect(node.o.d_val, spy);
          node.i.a_flush(true, "4");
          expect(spy).toHaveBeenCalledWith(8, "4");
        });
      });

      describe("when falsy", () => {
        beforeEach(() => {
          node.i.a_flush(false, "1");
          node.i.d_val(5, "2");
          node.i.d_val(3, "3");
        });

        it("should not emit on d_val", () => {
          const spy = jasmine.createSpy();
          connect(node.o.d_val, spy);
          node.i.a_flush(false, "4");
          expect(spy).not.toHaveBeenCalled();
        });
      });
    });
  });

  describe("when uninitialized", () => {
    describe("on input (all)", () => {
      let node: Reducer<number, number>;

      beforeEach(() => {
        node = createReducer((curr, next) => curr + next);
      });

      describe("for first", () => {
        describe("when a_flush is true", () => {
          it("should emit on d_val", () => {
            const spy = jasmine.createSpy();
            connect(node.o.d_val, spy);
            node.i.all({d_val: 5, a_flush: true}, "3");
            expect(spy).toHaveBeenCalledWith(5, "3");
          });
        });
      });

      describe("for rest", () => {
        describe("when a_flush is true", () => {
          beforeEach(() => {
            node.i.all({d_val: 5, a_flush: false}, "1");
            node.i.all({d_val: 3, a_flush: false}, "2");
          });

          it("should emit on d_val", () => {
            const spy = jasmine.createSpy();
            connect(node.o.d_val, spy);
            node.i.all({d_val: 4, a_flush: true}, "3");
            expect(spy).toHaveBeenCalledWith(12, "3");
          });
        });

        describe("when callback throws", () => {
          beforeEach(() => {
            node = createReducer(() => {
              throw new Error("foo");
            });
            node.i.all({d_val: 5, a_flush: false}, "1");
          });

          it("should bounce input on 'b_all'", () => {
            const spy = jasmine.createSpy();
            connect(node.o.b_all, spy);
            node.i.all({
              a_flush: true,
              d_val: 4
            }, "2");
            expect(spy).toHaveBeenCalledWith({
              a_flush: true,
              d_val: 4
            }, "2");
          });

          it("should emit error message 'ev_err'", () => {
            const spy = jasmine.createSpy();
            connect(node.o.ev_err, spy);
            node.i.all({
              a_flush: true,
              d_val: 4
            }, "2");
            expect(spy).toHaveBeenCalledWith("Error: foo", "2");
          });
        });
      });
    });

    describe("on input (d_val)", () => {
      let node: Reducer<number, number>;

      describe("for rest", () => {
        describe("when callback throws", () => {
          beforeEach(() => {
            node = createReducer(() => {
              throw new Error("foo");
            });
            node.i.d_val(5, "1");
          });

          it("should bounce input on 'b_d_val'", () => {
            const spy = jasmine.createSpy();
            connect(node.o.b_d_val, spy);
            node.i.d_val(4, "2");
            expect(spy).toHaveBeenCalledWith(4, "2");
          });

          it("should emit error message 'ev_err'", () => {
            const spy = jasmine.createSpy();
            connect(node.o.ev_err, spy);
            node.i.d_val(4, "2");
            expect(spy).toHaveBeenCalledWith("Error: foo", "2");
          });
        });
      });
    });

    describe("on input (a_flush)", () => {
      let node: Reducer<number, number>;

      beforeEach(() => {
        node = createReducer((curr, next) => curr + next);
      });

      describe("when truthy", () => {
        beforeEach(() => {
          node.i.a_flush(false, "1");
          node.i.d_val(5, "2");
          node.i.d_val(3, "3");
        });

        it("should emit on d_val", () => {
          const spy = jasmine.createSpy();
          connect(node.o.d_val, spy);
          node.i.a_flush(true, "4");
          expect(spy).toHaveBeenCalledWith(8, "4");
        });
      });

      describe("when falsy", () => {
        beforeEach(() => {
          node.i.a_flush(false, "1");
          node.i.d_val(5, "2");
          node.i.d_val(3, "3");
        });

        it("should not emit on d_val", () => {
          const spy = jasmine.createSpy();
          connect(node.o.d_val, spy);
          node.i.a_flush(false, "4");
          expect(spy).not.toHaveBeenCalled();
        });
      });
    });
  });
});

import {connect} from "flowcode";
import {createTicker, Ticker} from "./Ticker";

describe("createTicker()", () => {
  describe("on creation", () => {
    describe("when 'ticking' is true", () => {
      beforeEach(() => {
        jasmine.clock().install();
      });

      afterEach(() => {
        jasmine.clock().uninstall();
      });

      it("should start interval", () => {
        const node = createTicker(100, true);
        const spy = jasmine.createSpy();
        connect(node.o.ev_tick, spy);
        jasmine.clock().tick(101);
        expect(spy).toHaveBeenCalledWith(undefined, undefined);
      });
    });

    describe("when 'ticking' is false", () => {
      beforeEach(() => {
        jasmine.clock().install();
      });

      afterEach(() => {
        jasmine.clock().uninstall();
      });

      it("should not start interval", () => {
        const node = createTicker(100, false);
        const spy = jasmine.createSpy();
        connect(node.o.ev_tick, spy);
        jasmine.clock().tick(101);
        expect(spy).not.toHaveBeenCalled();
      });
    });
  });

  describe("on input (st_ticking)", () => {
    let node: Ticker;

    beforeEach(() => {
      node = createTicker(100);
      jasmine.clock().install();
    });

    afterEach(() => {
      jasmine.clock().uninstall();
    });

    describe("passing true", () => {
      it("should start interval", () => {
        const spy = jasmine.createSpy();
        connect(node.o.ev_tick, spy);
        node.i.st_ticking(true);
        expect(spy).not.toHaveBeenCalled();
        jasmine.clock().tick(101);
        expect(spy).toHaveBeenCalledWith(undefined, undefined);
      });
    });

    describe("passing false", () => {
      beforeEach(() => {
        node.i.st_ticking(true);
      });

      it("should stop interval", () => {
        const spy = jasmine.createSpy();
        connect(node.o.ev_tick, spy);
        node.i.st_ticking(false);
        jasmine.clock().tick(101);
        expect(spy).not.toHaveBeenCalled();
      });
    });
  });
});

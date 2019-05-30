import {connect} from "flowcode";
import {createMuxer, Muxer} from "./Muxer";

describe("createMuxer()", () => {
  describe("on input", () => {
    let node: Muxer<{ foo: number, bar: number }>;

    beforeEach(() => {
      node = createMuxer(["foo", "bar"]);
    });

    it("should emit on d_mux", () => {
      const spy = jasmine.createSpy();
      connect(node.o.d_mux, spy);
      node.i.bar(5, "1");
      expect(spy).toHaveBeenCalledWith({field: "bar", value: 5}, "1");
    });
  });
});

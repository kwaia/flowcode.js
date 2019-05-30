import {connect} from "flowcode";
import {createDemuxer, Demuxer} from "./Demuxer";

describe("createDemuxer()", () => {
  describe("on input (d_mux)", () => {
    let node: Demuxer<{ foo: number, bar: number }>;

    beforeEach(() => {
      node = createDemuxer(["foo", "bar"]);
    });

    it("should emit on specified port", () => {
      const spy = jasmine.createSpy();
      connect(node.o.bar, spy);
      node.i.d_mux({field: "bar", value: 5}, "1");
      expect(spy).toHaveBeenCalledWith(5, "1");
    });
  });
});

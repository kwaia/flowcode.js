import {InPort, OutPort} from "../types";
import {connect} from "./connect";
import {disconnect} from "./disconnect";

describe("disconnect", () => {
  let outPort: OutPort<number>;
  let inPort1: InPort<number>;
  let inPort2: InPort<number>;

  beforeEach(() => {
    outPort = new Set();
    inPort1 = () => null;
    inPort2 = () => null;
    connect(outPort, inPort1);
    connect(outPort, inPort2);
  });

  describe("on specifying port", () => {
    it("should remove port from connections", () => {
      disconnect(outPort, inPort1);
      expect(outPort.has(inPort1)).toBeFalsy();
      expect(outPort.has(inPort2)).toBeTruthy();
    });
  });

  describe("on omitting port", () => {
    it("should remove all ports from connections", () => {
      disconnect(outPort);
      expect(outPort.size).toBe(0);
    });
  });
});

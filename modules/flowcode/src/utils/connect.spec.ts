import {InPort, OutPort} from "../types";
import {connect} from "./connect";

describe("connect", () => {
  let outPort: OutPort<number>;
  let inPort: InPort<number>;

  beforeEach(() => {
    outPort = new Set();
    inPort = () => null;
  });

  it("should add port to connections", () => {
    connect(outPort, inPort);
    expect(outPort.has(inPort)).toBeTruthy();
  });
});

import {InPort, OutPort} from "../types";

/**
 * Tears down the connection between the specified ports, or, when the input
 * port is omitted, tears down all downstream connections of the output port.
 * @param outPort
 * @param inPort
 */
export function disconnect<V>(outPort: OutPort<V>, inPort?: InPort<V>): void {
  if (inPort) {
    outPort.delete(inPort);
  } else {
    outPort.clear();
  }
}

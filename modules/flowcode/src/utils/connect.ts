import {InPort, OutPort} from "../types";

/**
 * Establishes a connection between an output port and an input port. Data
 * emitted on an output port are automatically forwarded to connected input
 * ports.
 * @param outPort
 * @param inPort
 */
export function connect<V>(outPort: OutPort<V>, inPort: InPort<V>): void {
  outPort.add(inPort);
}

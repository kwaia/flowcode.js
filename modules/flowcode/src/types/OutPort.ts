import {InPort} from "./InPort";

/**
 * Describes an output port.
 * Output ports serve the sole purpose of being connected to input ports.
 * From a technical standpoint, output ports are but a set of input ports.
 * (Of other nodes.)
 */
export type OutPort<V> = Set<InPort<V>>;

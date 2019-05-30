import {InPort} from "./InPort";

/**
 * A bundle of input ports.
 * Every node has exactly one input port bundle and one output port bundle.
 */
export type InPorts<I> = {
  [K in keyof I]: InPort<I[K]>
};

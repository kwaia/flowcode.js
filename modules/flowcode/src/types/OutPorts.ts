import {OutPort} from "./OutPort";

/**
 * A bundle of output ports.
 * Every node has exactly one input port bundle and one output port bundle.
 */
export type OutPorts<O> = {
  [K in keyof O]: OutPort<O[K]>
};

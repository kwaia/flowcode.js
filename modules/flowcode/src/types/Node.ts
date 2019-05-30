import {InPorts} from "./InPorts";
import {OutPorts} from "./OutPorts";

/**
 * Single node, atomic or composite.
 * Nodes expose input and output ports that may be connected to each other.
 * @see connect
 */
export type Node<I, O> = {
  i: InPorts<I>;
  o: OutPorts<O>;
};

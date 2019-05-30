import {InPorts, Node, OutPorts, Outputs} from "../types";

/**
 * Creates a node based on the specified output port names and input port
 * collection generator function.
 * @param outFields List of output port names.
 * @param createInPorts Creates a set of input ports.
 */
export function createNode<I, O>(
  outFields: Array<keyof O>,
  createInPorts: (outputs: Outputs<O>) => InPorts<I>
): Node<I, O> {
  const o = <OutPorts<O>>{};
  const outputs = <Outputs<O>>{};
  for (const field of outFields) {
    o[field] = new Set();
  }
  for (const field in o) {
    const inPorts = o[field];
    outputs[field] = (value, tag) => {
      for (const inPort of inPorts) {
        inPort(value, tag);
      }
    };
  }
  const i: InPorts<I> = createInPorts(outputs);
  return {i, o};
}

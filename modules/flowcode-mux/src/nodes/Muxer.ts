import {createNode, InPorts, Node} from "flowcode";
import {Muxed} from "../types/Muxed";

export type In<T> = T;

export type Out<T> = {
  /** Multiplexed input value. */
  d_mux: Muxed<T>;
};

/**
 * Multiplexes input value.
 * Forwards multiplexed input value to a single output port.
 * @link https://github.com/kwaia/flowcode.js/wiki/Muxer
 */
export type Muxer<T> = Node<In<T>, Out<T>>;

/**
 * Creates a Muxer node.
 * @param fields List of input fields.
 */
export function createMuxer<T>(fields: Array<keyof T>): Muxer<T> {
  return createNode<In<T>, Out<T>>(["d_mux"], (outputs) => {
    const o_d_mux = outputs.d_mux;
    const i = <InPorts<In<T>>>{};
    for (const field of fields) {
      i[field] = (value, tag) => {
        o_d_mux({field, value}, tag);
      };
    }
    return i;
  });
}

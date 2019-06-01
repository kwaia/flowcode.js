import {Node} from "../types";
import {createNode} from "../utils";

export type In<V> = {
  /** Value to be forwarded. */
  d_val: V;
};

export type Out<V> = {
  /** Forwarded input value. */
  d_val: V;
};

/**
 * Forwards input value unconditionally.
 * @link https://github.com/kwaia/flowcode.js/wiki/Noop
 */
export type Noop<V> = Node<In<V>, Out<V>>;

/**
 * Creates a Noop node.
 */
export function createNoop<V>(): Noop<V> {
  return createNode<In<V>, Out<V>>(["d_val"], (outputs) => {
    return {
      d_val: outputs.d_val
    };
  });
}

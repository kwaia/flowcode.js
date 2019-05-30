import {createNode, Node} from "flowcode";

export type In<V> = {
  /** Value to be delayed. */
  d_val: V;
};

export type Out<V> = {
  /** Delayed value. */
  d_val: V;
};

/**
 * Forwards input value with the specified delay.
 * @link https://github.com/kwaia/flowcode/wiki/Delayer
 */
export type Delayer<V> = Node<In<V>, Out<V>>;

/**
 * Creates a Delayer node.
 * @param ms Number of milliseconds between receiving and forwarding input.
 */
export function createDelayer<V>(ms: number): Delayer<V> {
  return createNode<In<V>, Out<V>>(["d_val"], (outputs) => {
    const o_d_val = outputs.d_val;
    return {
      d_val: (value, tag) => {
        setTimeout(() => {
          o_d_val(value, tag);
        }, ms);
      }
    };
  });
}

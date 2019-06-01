import {createNode, Node} from "flowcode";

export type In<V> = {
  /** Value to be sampled. */
  d_val: V;

  /** Sampling signal. */
  a_smp: any;
};

export type Out<V> = {
  /** Sampled input value. */
  d_val: V;
};

/**
 * Forwards last input value on receiving a sampling signal.
 * @link https://github.com/kwaia/flowcode.js/wiki/Sampler
 */
export type Sampler<V> = Node<In<V>, Out<V>>;

/**
 * Creates a Sampler node.
 */
export function createSampler<V>() {
  return createNode<In<V>, Out<V>>(["d_val"], (outputs) => {
    const o_d_val = outputs.d_val;
    let input: V;
    return {
      d_val: (value) => {
        input = value;
      },

      a_smp: (value, tag) => {
        o_d_val(input, tag);
      }
    };
  });
}

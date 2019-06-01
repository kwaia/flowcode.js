import {createNode, Node, Tag} from "flowcode";

export type In<V> = {
  /** Values to serialize. */
  d_val: V;

  /** Reference input. */
  r_tag: any;
};

export type Out<V> = {
  /** Forwarded value. */
  d_val: V;
};

/**
 * Forwards input values in an order matching the reference input.
 * @link https://github.com/kwaia/flowcode.js/wiki/Sequencer
 */
export type Sequencer<V> = Node<In<V>, Out<V>>;

/**
 * Creates a Sequencer node.
 */
export function createSequencer<V>(): Sequencer<V> {
  return createNode<In<V>, Out<V>>(["d_val"], (outputs) => {
    const o_d_val = outputs.d_val;
    const values: Map<Tag, V> = new Map();
    const order: Array<Tag> = [];

    function flush() {
      while (values.has(order[0])) {
        const tag = order.shift();
        const value = values.get(tag);
        values.delete(tag);
        o_d_val(value, tag);
      }
    }

    return {
      d_val: (value, tag) => {
        values.set(tag, value);
        flush();
      },

      r_tag: (value, tag) => {
        order.push(tag);
        flush();
      }
    };
  });
}

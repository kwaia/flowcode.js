import {createNode, Node} from "flowcode";

export type InFields<V> = {
  /** Value to be forwarded. */
  d_val: V;

  /** Whether gate is open. */
  st_open: boolean;
};

export type In<V> = InFields<V> & {
  /** All input fields at once. */
  all: InFields<V>
};

export type Out<V> = {
  /** Value bounced when gate is closed. */
  b_all: InFields<V>;

  /** Value bounced when gate is closed. */
  b_d_val: V;

  /** Forwarded value. */
  d_val: V;
};

/**
 * Forwards input value when gate is open.
 * Operates with either independent or joined inputs.
 * @link https://github.com/kwaia/flowcode/wiki/Gate
 */
export type Gate<V> = Node<In<V>, Out<V>>;

/**
 * Creates a Gate node.
 * @param open Initial 'open' state.
 */
export function createGate<V>(open?: boolean): Gate<V> {
  return createNode<In<V>, Out<V>>
  (["b_all", "b_d_val", "d_val"], (outputs) => {
    const o_b_all = outputs.b_all;
    const o_b_d_val = outputs.b_d_val;
    const o_d_val = outputs.d_val;
    return {
      all: ({d_val, st_open}, tag) => {
        open = st_open;
        if (st_open) {
          o_d_val(d_val, tag);
        } else {
          o_b_all({d_val, st_open}, tag);
        }
      },

      d_val: (value, tag) => {
        if (open) {
          o_d_val(value, tag);
        } else {
          o_b_d_val(value, tag);
        }
      },

      st_open: (value) => {
        open = value;
      }
    };
  });
}

import {createNode, Node} from "flowcode";

export type InFields<P extends string, V> = {
  /** Value to be forwarded. */
  d_val: V;

  /** Active output. */
  st_pos: P;
};

export type OutFields<P extends string, V> = {
  /** Output positions */
  [K in P]: V;
};

export type In<P extends string, V> = InFields<P, V> & {
  /** Synchronous inputs */
  all: InFields<P, V>
};

export type Out<P extends string, V> = OutFields<P, V> & {
  /** Value bounced on invalid position. */
  b_all: InFields<P, V>;

  /** Value bounced on invalid position. */
  b_d_val: V;
};

/**
 * Forwards input value to one of the output ports, depending on the
 * node's current 'position' state.
 * Operates with either independent or joined inputs.
 * @link https://github.com/kwaia/flowcode.js/wiki/Switcher
 */
export type Switcher<P extends string, V> = Node<In<P, V>, Out<P, V>>;

/**
 * Creates a Switcher node.
 * @param positions List of all possible positions.
 * @param position Initial 'position' state.
 */
export function createSwitcher<P extends string, V>(
  positions: Array<P>,
  position?: P
): Switcher<P, V> {
  return createNode<In<P, V>, Out<P, V>>
  ((<any>positions).concat(["b_all", "b_d_val"]), (outputs) => {
    const o_b_all = outputs.b_all;
    const o_b_d_val = outputs.b_d_val;
    const lookup = new Set(positions);
    return {
      all: ({d_val, st_pos}, tag) => {
        if (lookup.has(st_pos)) {
          position = st_pos;
          outputs[position](<any>d_val, tag);
        } else {
          o_b_all(<any>{d_val, st_pos}, tag);
        }
      },

      d_val: (value, tag) => {
        if (lookup.has(position)) {
          outputs[position](<any>value, tag);
        } else {
          o_b_d_val(value, tag);
        }
      },

      st_pos: (value) => {
        position = value;
      }
    };
  });
}

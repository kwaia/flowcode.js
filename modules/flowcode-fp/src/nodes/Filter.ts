import {createNode, Node} from "flowcode";
import {FilterCallback} from "../types";

export type In<V> = {
  /** Value to be filtered. */
  d_val: V;
};

export type Out<V> = {
  /** Value bounced when callback throws. */
  b_d_val: V;

  /** Forwarded value. */
  d_val: V;

  /** Error message when callback throws. */
  ev_err: string
};

/**
 * Filters input values according to a filter callback.
 * @link https://github.com/kwaia/flowcode/wiki/Filter
 */
export type Filter<V> = Node<In<V>, Out<V>>;

/**
 * Creates a Filter node.
 * @param cb Filter callback.
 */
export function createFilter<V>(cb: FilterCallback<V>): Filter<V> {
  return createNode<In<V>, Out<V>>
  (["b_d_val", "d_val", "ev_err"], (outputs) => {
    const o_b_d_val = outputs.b_d_val;
    const o_d_val = outputs.d_val;
    const o_ev_err = outputs.ev_err;
    return {
      d_val: (value, tag) => {
        try {
          if (cb(value, tag)) {
            o_d_val(value, tag);
          }
        } catch (err) {
          o_b_d_val(value, tag);
          o_ev_err(String(err), tag);
        }
      }
    };
  });
}

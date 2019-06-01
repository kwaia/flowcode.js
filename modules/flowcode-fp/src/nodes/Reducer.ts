import {copy, createNode, Node} from "flowcode";
import {ReducerCallback} from "../types/ReducerCallback";

export type InFields<I> = {
  /** Flushes reduced value. */
  a_flush: boolean;

  /** Value in stream to be reduced. */
  d_val: I;
};

export type In<I> = InFields<I> & {
  /** All input fields at once. */
  all: InFields<I>
};

export type Out<I, O> = {
  /** Value bounced when callback throws. */
  b_all: InFields<I>

  /** Value bounced when callback throws. */
  b_d_val: I,

  /** Reduced (aggregated) value. */
  d_val: O;

  /** Error message emitted when callback throws. */
  ev_err: string;
};

/**
 * Aggregates input values between reset signals, according to an aggregator
 * (reduce) callback.
 * Operates with either independent or joined inputs.
 * @link https://github.com/kwaia/flowcode.js/wiki/Reducer
 */
export type Reducer<I, O> = Node<In<I>, Out<I, O>>;

/**
 * Creates a Reducer node.
 * @param cb Aggregator (reduce) function.
 * @param initial Initial value for aggregation.
 */
export function createReducer<I, O>(
  cb: ReducerCallback<I, O>,
  initial?: O
): Reducer<I, O> {
  return createNode<In<I>, Out<I, O>>
  (["b_all", "b_d_val", "d_val", "ev_err"], (outputs) => {
    const o_b_all = outputs.b_all;
    const o_b_d_val = outputs.b_d_val;
    const o_d_val = outputs.d_val;
    const o_ev_err = outputs.ev_err;
    const initialized = arguments.length === 2;
    let reduced: O;
    let first: boolean = true;

    return {
      all: ({d_val, a_flush}, tag) => {
        try {
          if (first) {
            reduced = initialized ?
              cb(copy(initial), d_val, tag) :
              <any>d_val;
            first = a_flush;
          } else {
            reduced = cb(reduced, d_val, tag);
          }
        } catch (err) {
          o_b_all({d_val, a_flush}, tag);
          o_ev_err(String(err), tag);
        }
        if (a_flush) {
          o_d_val(reduced, tag);
          first = true;
        }
      },

      d_val: (value, tag) => {
        try {
          if (first) {
            reduced = initialized ?
              cb(copy(initial), value, tag) :
              <any>value;
            first = false;
          } else {
            reduced = cb(reduced, value, tag);
          }
        } catch (err) {
          o_b_d_val(value, tag);
          o_ev_err(String(err), tag);
        }
      },

      a_flush: (value, tag) => {
        if (value) {
          o_d_val(reduced, tag);
          first = true;
        }
      }
    };
  });
}

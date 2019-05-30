import {createNode, Node} from "flowcode";
import {MapperCallback} from "../types";

export type In<I> = {
  /** Value to be mapped. */
  d_val: I;
};

export type Out<I, O> = {
  /** Value bounced when callback throws. */
  b_d_val: I;

  /** Mapped value. */
  d_val: O;

  /** Error emitted when callback throws. */
  ev_err: string;
};

/**
 * Maps input value according to mapper callback.
 * @link https://github.com/kwaia/flowcode/wiki/Mapper
 */
export type Mapper<I, O> = Node<In<I>, Out<I, O>>;

/**
 * Creates a Mapper node.
 * @param cb Mapper callback.
 */
export function createMapper<I, O>(cb: MapperCallback<I, O>): Mapper<I, O> {
  return createNode<In<I>, Out<I, O>>
  (["b_d_val", "d_val", "ev_err"], (outputs) => {
    const o_b_d_val = outputs.b_d_val;
    const o_d_val = outputs.d_val;
    const o_ev_err = outputs.ev_err;
    return {
      d_val: (value, tag) => {
        try {
          o_d_val(cb(value, tag), tag);
        } catch (err) {
          o_b_d_val(value, tag);
          o_ev_err(String(err), tag);
        }
      }
    };
  });
}

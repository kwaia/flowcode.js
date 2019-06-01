import {createNode, Node, Tag} from "flowcode";

export type InFields<V> = {
  /** Value to be buffered. */
  d_val: V;

  /** Whether the buffer is open. */
  st_open: boolean;
};

export type In<V> = InFields<V> & {
  /** All input fields at once. */
  all: InFields<V>;
};

export type Out<V> = {
  /** Forwarded value. */
  d_val: V;

  /** Current buffer size. Non-zero when only when buffer is closed. */
  st_size: number;
};

/**
 * Buffers values.
 * When the buffer is closed, it stores input values. When the buffer is
 * open it releases stored values and forwards input value.
 * Operates with either independent or joined inputs.
 * @link https://github.com/kwaia/flowcode.js/wiki/Buffer
 */
export type Buffer<V> = Node<In<V>, Out<V>>;

/**
 * Creates a Buffer node.
 * @param open Whether buffer is open initially.
 */
export function createBuffer<V>(open?: boolean): Buffer<V> {
  return createNode<In<V>, Out<V>>
  (["d_val", "st_size"], (outputs) => {
    const o_d_val = outputs.d_val;
    const o_st_size = outputs.st_size;
    const buffer: Array<{ value: V, tag: Tag }> = [];

    function flush() {
      while (buffer.length) {
        const next = buffer.shift();
        o_d_val(next.value, next.tag);
      }
    }

    return {
      all: ({d_val, st_open}, tag) => {
        if (st_open && !open) {
          flush();
        }
        open = st_open;
        if (open) {
          o_d_val(d_val, tag);
        } else {
          buffer.push({value: d_val, tag});
        }
        o_st_size(buffer.length, tag);
      },

      d_val: (value, tag) => {
        if (open) {
          o_d_val(value, tag);
        } else {
          buffer.push({value, tag});
        }
        o_st_size(buffer.length, tag);
      },

      st_open: (value, tag) => {
        if (value && !open) {
          flush();
        }
        open = value;
        o_st_size(buffer.length, tag);
      }
    };
  });
}

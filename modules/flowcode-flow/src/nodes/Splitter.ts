import {createNode, Node} from "flowcode";

export type In<T> = {
  /** Value to be split. */
  all: T;
};

export type Out<T> = T;

/**
 * Splits object input into its properties.
 * @link https://github.com/kwaia/flowcode.js/wiki/Splitter
 */
export type Splitter<T> = Node<In<T>, Out<T>>;

export function createSplitter<T>(fields: Array<keyof T>): Splitter<T> {
  return createNode<In<T>, Out<T>>(fields, (outputs) => {
    return {
      all: (value, tag) => {
        for (const field of fields) {
          outputs[field](value[field], tag);
        }
      }
    };
  });
}

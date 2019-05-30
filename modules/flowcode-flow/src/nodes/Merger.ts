import {copy, createNode, InPorts, Node} from "flowcode";

export type In<T> = T;

export type Out<T> = {
  /** Merged inputs. */
  all: T;
};

/**
 * Merges last input values from all ports.
 * @link https://github.com/kwaia/flowcode/wiki/Merger
 */
export type Merger<T> = Node<In<T>, Out<T>>;

/**
 * Creates a Merger node.
 * @param fields List of input fields.
 */
export function createMerger<T>(fields: Array<keyof T>): Merger<T> {
  return createNode<In<T>, Out<T>>(["all"], (outputs) => {
    const o_all = outputs.all;
    const inputs = <T>{};
    const i = <InPorts<In<T>>>{};
    for (const field of fields) {
      i[field] = (value, tag) => {
        inputs[field] = value;
        o_all(copy(inputs), tag);
      };
    }

    return i;
  });
}

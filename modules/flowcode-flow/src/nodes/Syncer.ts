import {createNode, InPorts, Node, Tag} from "flowcode";

export type In<T> = T;

export type Out<T> = {
  /** Joined inputs. */
  all: T;
};

/**
 * Synchronizes input values from all ports having the same tag.
 * @link https://github.com/kwaia/flowcode.js/wiki/Syncer
 */
export type Syncer<T> = Node<In<T>, Out<T>>;

/**
 * Creates a Syncer node.
 * @param fields List of input fields.
 */
export function createSyncer<T>(fields: Array<keyof T>): Syncer<T> {
  return createNode<In<T>, Out<T>>(["all"], (outputs) => {
    const o_all = outputs.all;
    const inputSets: Map<Tag, T> = new Map();
    const portSets: Map<Tag, Set<keyof T>> = new Map();

    const i = <InPorts<In<T>>>{};
    for (const field of fields) {
      i[field] = (value, tag) => {
        let inputs = inputSets.get(tag);
        if (!inputs) {
          inputs = <T>{};
          inputSets.set(tag, inputs);
        }

        let ports = portSets.get(tag);
        if (!ports) {
          ports = new Set(fields);
          portSets.set(tag, ports);
        }

        inputs[field] = value;
        ports.delete(field);

        if (ports.size === 0) {
          inputSets.delete(tag);
          portSets.delete(tag);
          o_all(inputs, tag);
        }
      };
    }

    return i;
  });
}

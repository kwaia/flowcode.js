import {Tag} from "./Tag";

/**
 * Describes an input port.
 * Input ports are functions that process input values and either alter the
 * state node's state and / or emit values on output ports.
 * Any function satisfying the signature qualifies as an input port.
 */
export type InPort<V> = (value: V, tag?: Tag) => void;

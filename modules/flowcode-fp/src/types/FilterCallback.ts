import {Tag} from "flowcode";

export type FilterCallback<V> = (value: V, tag?: Tag) => boolean;

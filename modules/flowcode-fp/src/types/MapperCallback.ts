import {Tag} from "flowcode";

export type MapperCallback<I, O> = (value: I, tag?: Tag) => O;

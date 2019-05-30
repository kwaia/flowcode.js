import {Tag} from "flowcode";

export type ReducerCallback<I, O> = (
  curr: O,
  next: I,
  tag?: Tag) => O;

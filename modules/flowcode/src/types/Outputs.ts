import {InPort} from "./InPort";

export type Outputs<O> = {
  [K in keyof O]: InPort<O[K]>
};

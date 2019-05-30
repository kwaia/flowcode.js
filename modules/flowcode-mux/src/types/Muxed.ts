/**
 * Describes a multiplexed value.
 * Multiplexed values include the original value, and the field through
 * witch they were received or are to be emitted.
 */
export type Muxed<T> = {
  field: keyof T;
  value: T[keyof T];
};

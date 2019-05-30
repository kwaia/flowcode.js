import {MapperCallback} from "../types";

/**
 * Creates a function that maps any value to the specified constant.
 * @param value
 */
export function constant(value: any): MapperCallback<any, any> {
  return () => value;
}

/**
 * Creates a function that splits strings along the specified delimiter.
 * @param delimiter
 */
export function split(delimiter: string): MapperCallback<string, Array<string>> {
  return (next: string) => next.split(delimiter);
}

/**
 * Creates a function that plucks the specified property from objects.
 * @param property
 */
export function pluck<T>(property: string): MapperCallback<T, T[keyof T]> {
  return (value: T) => value[property];
}

/**
 * Creates a function that plucks the specified properties from objects, in the
 * specified order.
 * @param fields
 */
export function mpluck<T>(fields: Array<string>): MapperCallback<T, Array<T[keyof T]>> {
  return (next: T) => {
    const result = [];
    for (const field of fields) {
      result.push(next[field]);
    }
    return result;
  };
}

/**
 * Creates a function that joins lists of string, using the specified delimiter.
 * @param delimiter
 */
export function join(delimiter: string): MapperCallback<Array<string>, string> {
  return (next: Array<string>) => {
    return next.join(delimiter);
  };
}

/**
 * Creates a function that appends the specified postfix to strings.
 * @param postfix
 */
export function append(postfix: string): MapperCallback<string, string> {
  return (next: string) => {
    return next + postfix;
  };
}

/**
 * Creates a function that prepends the specified prefix to strings.
 * @param prefix
 */
export function prepend(prefix: string): MapperCallback<string, string> {
  return (next: string) => {
    return prefix + next;
  };
}

/**
 * Creates a function that rounds numbers to the specified precision. When
 * precision is 0, returns Math.round.
 * @param precision
 */
export function round(precision?: number): MapperCallback<number, number> {
  const factor = Math.pow(10, precision);
  return precision ?
    (next: number) => {
      return Math.round(next * factor) / factor;
    } :
    Math.round;
}

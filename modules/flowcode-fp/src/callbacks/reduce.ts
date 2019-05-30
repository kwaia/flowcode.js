/**
 * Counts items.
 * Requires numeric initial value.
 * @param curr
 */

export function count(curr: number) {
  return ++curr;
}

/**
 * Pushes next item to result array.
 * Requires array initial value.
 * @param curr
 * @param next
 */
export function push(curr: Array<any>, next: any): Array<any> {
  curr.push(next);
  return curr;
}

/**
 * Unshifts next item to result array.
 * Requires array initial value.
 * @param curr
 * @param next
 */
export function unshift(curr: Array<any>, next: any): Array<any> {
  curr.unshift(next);
  return curr;
}

/**
 * Concatenates next item to array.
 * @param curr
 * @param next
 */
export function concat(curr: Array<any>, next: Array<any>): Array<any> {
  return curr.concat(next);
}

/**
 * Selects first item.
 * @param curr
 */
export function first(curr: any): any {
  return curr;
}

/**
 * Selects last item.
 * @param curr
 * @param next
 */
export function last(curr: any, next: any): any {
  return next;
}

/**
 * Concatenates items.
 * @param curr
 * @param next
 */
export function add(curr: string, next: string): string;

/**
 * Sums items.
 * @param curr
 * @param next
 */
export function add(curr: number, next: number): string;

export function add(curr: any, next: any): any {
  return curr + next;
}

/**
 * Selects lowest item.
 * TODO: Make generic w/ comparer callback.
 * @param curr
 * @param next
 */
export function min(curr: number, next: number): number {
  return next < curr ? next : curr;
}

/**
 * Selects highest item.
 * TODO: Make generic w/ comparer callback.
 * @param curr
 * @param next
 */
export function max(curr: number, next: number): number {
  return next > curr ? next : curr;
}

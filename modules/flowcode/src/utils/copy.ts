/**
 * Returns a shallow copy of the specified value.
 * @param a
 */
export function copy(a: any): any {
  if (a instanceof Array) {
    return a.slice();
  } else if (a instanceof Object) {
    const result = {};
    // tslint:disable:forin
    for (const key in a) {
      result[key] = a[key];
    }
    // tslint:enable:forin
    return result;
  } else {
    return a;
  }
}

/* eslint-disable import/prefer-default-export */
/**
 * Map helpers in $util.map
 *
 * $util.map contains methods to help with common
 * Map operations, such as removing or retaining
 * items from a Map for filtering use cases.
 */

/**
 * Makes a shallow copy of the first map, retaining only the
 * keys specified in the list, if they are present. All other
 * keys will be removed from the copy.
 * @param map
 * @param list
 */
export function copyAndRetainAllKeys(map: object, list: Array<string>): object {
  return Object.entries(map).reduce((sum, [key, value]) => {
    if (list.indexOf(key) === -1) return sum;
    return {
      ...sum,
      [key]: value,
    };
  }, {});
}

/**
 * Makes a shallow copy of the first map, removing any entries
 * where the key is specified in the list, if they are present.
 * All other keys will be retained in the copy.
 * @param map
 * @param list
 */
export function copyAndRemoveAllKeys(map: object, list: Array<string>): object {
  const result: any = { ...map };
  list.forEach((key) => delete result[key]);
  return result;
}

/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */

export function createGetter(path) {
  const fields = path.split(".");

  return function getValue(object) {
    let currentObject = object;

    for (const field of fields) {
      if (currentObject.hasOwnProperty(field)) {
        currentObject = currentObject[field];
      } else {
        return undefined;
      }
    }

    return currentObject;
  };
}

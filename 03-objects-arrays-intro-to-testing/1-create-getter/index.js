/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
const object = {
  category: {
    title: "Goods",
    foo: undefined,
  },
};

export function createGetter(path) {
  const fields = path.split(".");

  return function getValue(object) {
    let currentObject = object;
    let hasOwnProperty = false;

    fields.forEach((key, index) => {
      if (currentObject.hasOwnProperty(key)) {
        currentObject = currentObject[key];

        if (index === fields.length - 1) {
          hasOwnProperty = true;
        }
      }
    });

    return hasOwnProperty ? currentObject : undefined;
  };
}

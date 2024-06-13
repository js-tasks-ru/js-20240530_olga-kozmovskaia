/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
  let result = string.at(0) || "";
  let ln = size - 1;

  if (size == 0) {
    return "";
  }

  if (!size) {
    return string;
  }

  for (let i = 1; i < string.length; i++) {
    if (ln > 0) {
      result = result.concat(string.at(i));
      ln -= 1;
    }

    if (string.at(i) !== string.at(i + 1)) {
      ln = size;
    }
  }

  return result;
}

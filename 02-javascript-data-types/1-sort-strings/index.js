/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = "asc") {
  let copyArr = [...arr];

  if (param == "asc") {
    return copyArr.sort((a, b) =>
      a.localeCompare(b, ["ru", "en"], {
        sensitivity: "case",
        caseFirst: "upper",
      })
    );
  } else {
    return copyArr.sort((a, b) =>
      b.localeCompare(a, ["ru", "en"], {
        sensitivity: "case",
        caseFirst: "upper",
      })
    );
  }
}

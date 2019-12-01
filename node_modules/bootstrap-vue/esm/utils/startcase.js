/**
 * Converts a string, including strings in camelCase or snake_case, into Start Case (a variant
 * of Title Case where all words start with a capital letter), it keeps original single quote
 * and hyphen in the word.
 *
 * Copyright (c) 2017 Compass (MIT)
 * https://github.com/UrbanCompass/to-start-case
 * @author Zhuoyuan Zhang <https://github.com/drawyan>
 * @author Wei Wang <https://github.com/onlywei>
 *
 *
 *   'management_companies' to 'Management Companies'
 *   'managementCompanies' to 'Management Companies'
 *   `hell's kitchen` to `Hell's Kitchen`
 *   `co-op` to `Co-op`
 *
 * @param {String} str
 * @returns {String}
 */
var startCase = function startCase(str) {
  return str.replace(/_/g, ' ').replace(/([a-z])([A-Z])/g, function (str, $1, $2) {
    return $1 + ' ' + $2;
  }).replace(/(\s|^)(\w)/g, function (str, $1, $2) {
    return $1 + $2.toUpperCase();
  });
};

export default startCase;
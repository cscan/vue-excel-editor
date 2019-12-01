/**
 * @param {string} str
 */
var lowerFirst = function lowerFirst(str) {
  str = String(str);
  return str.charAt(0).toLowerCase() + str.slice(1);
};

export default lowerFirst;
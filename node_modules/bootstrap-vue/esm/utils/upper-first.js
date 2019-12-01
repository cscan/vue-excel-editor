import { isString } from './inspect';
/**
 * Transform the first character to uppercase
 * @param {string} str
 */

var upperFirst = function upperFirst(str) {
  if (!isString(str)) {
    str = String(str);
  }

  str = str.trim();
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export default upperFirst;
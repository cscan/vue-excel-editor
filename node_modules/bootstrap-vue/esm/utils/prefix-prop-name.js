import upperFirst from './upper-first';
/**
 * @param {string} prefix
 * @param {string} value
 */

var prefixPropName = function prefixPropName(prefix, value) {
  return prefix + upperFirst(value);
};

export default prefixPropName;
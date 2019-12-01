import { isArray, isObject } from './inspect';
/**
 * Get property defined by dot/array notation in string.
 *
 * @link https://gist.github.com/jeneg/9767afdcca45601ea44930ea03e0febf#gistcomment-1935901
 *
 * @param {Object} obj
 * @param {string|Array} path
 * @param {*} defaultValue (optional)
 * @return {*}
 */

var get = function get(obj, path) {
  var defaultValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  // Handle array of path values
  path = isArray(path) ? path.join('.') : path; // If no path or no object passed

  if (!path || !isObject(obj)) {
    return defaultValue;
  } // Handle edge case where user has dot(s) in top-level item field key
  // See https://github.com/bootstrap-vue/bootstrap-vue/issues/2762
  // Switched to `in` operator vs `hasOwnProperty` to handle obj.prototype getters
  // https://github.com/bootstrap-vue/bootstrap-vue/issues/3463


  if (path in obj) {
    return obj[path];
  } // Handle string array notation (numeric indices only)


  path = String(path).replace(/\[(\d+)]/g, '.$1');
  var steps = path.split('.').filter(Boolean); // Handle case where someone passes a string of only dots

  if (steps.length === 0) {
    return defaultValue;
  } // Traverse path in object to find result
  // We use `!=` vs `!==` to test for both `null` and `undefined`
  // Switched to `in` operator vs `hasOwnProperty` to handle obj.prototype getters
  // https://github.com/bootstrap-vue/bootstrap-vue/issues/3463


  return steps.every(function (step) {
    return isObject(obj) && step in obj && (obj = obj[step]) != null;
  }) ? obj : defaultValue;
};

export default get;
import identity from './identity';
import { isArray } from './inspect';
import { keys } from './object';
/**
 * Given an array of properties or an object of property keys,
 * plucks all the values off the target object, returning a new object
 * that has props that reference the original prop values
 *
 * @param {{}|string[]} keysToPluck
 * @param {{}} objToPluck
 * @param {Function} transformFn
 * @return {{}}
 */

var pluckProps = function pluckProps(keysToPluck, objToPluck) {
  var transformFn = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : identity;
  return (isArray(keysToPluck) ? keysToPluck.slice() : keys(keysToPluck)).reduce(function (memo, prop) {
    memo[transformFn(prop)] = objToPluck[prop];
    return memo;
  }, {});
};

export default pluckProps;
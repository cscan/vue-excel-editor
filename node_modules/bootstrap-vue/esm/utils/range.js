/**
 * @param {number} length
 * @return {Array}
 */
var range = function range(length) {
  return Array.apply(null, {
    length: length
  });
};

export default range;
// --- Static ---
export var from = Array.from;
export var isArray = Array.isArray; // --- Instance ---

export var arrayIncludes = function arrayIncludes(array, value) {
  return array.indexOf(value) !== -1;
};
export var concat = function concat() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return Array.prototype.concat.apply([], args);
};
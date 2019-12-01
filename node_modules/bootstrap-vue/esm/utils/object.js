function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

import { isArray } from './array'; // --- Static ---

export var assign = Object.assign;
export var getOwnPropertyNames = Object.getOwnPropertyNames;
export var keys = Object.keys;
export var defineProperties = Object.defineProperties;
export var defineProperty = Object.defineProperty;
export var freeze = Object.freeze;
export var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
export var getOwnPropertySymbols = Object.getOwnPropertySymbols;
export var getPrototypeOf = Object.getPrototypeOf;
export var create = Object.create;
export var isFrozen = Object.isFrozen;
export var is = Object.is; // --- "Instance" ---

export var hasOwnProperty = function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
};
export var toString = function toString(obj) {
  return Object.prototype.toString.call(obj);
}; // --- Utilities ---

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 * Note object could be a complex type like array, date, etc.
 */

export var isObject = function isObject(obj) {
  return obj !== null && _typeof(obj) === 'object';
};
/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */

export var isPlainObject = function isPlainObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
};
/**
 * Shallow copy an object. If the passed in object
 * is null or undefined, returns an empty object
 */

export var clone = function clone(obj) {
  return _objectSpread({}, obj);
};
/**
 * Return a shallow copy of object with
 * the specified properties omitted
 * @link https://gist.github.com/bisubus/2da8af7e801ffd813fab7ac221aa7afc
 */

export var omit = function omit(obj, props) {
  return keys(obj).filter(function (key) {
    return props.indexOf(key) === -1;
  }).reduce(function (result, key) {
    return _objectSpread({}, result, _defineProperty({}, key, obj[key]));
  }, {});
};
/**
 * Convenience method to create a read-only descriptor
 */

export var readonlyDescriptor = function readonlyDescriptor() {
  return {
    enumerable: true,
    configurable: false,
    writable: false
  };
};
/**
 * Deep-freezes and object, making it immutable / read-only.
 * Returns the same object passed-in, but frozen.
 * Freezes inner object/array/values first.
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze
 * Note: this method will not work for property values using Symbol() as a key
 */

export var deepFreeze = function deepFreeze(obj) {
  // Retrieve the property names defined on object/array
  // Note: `keys` will ignore properties that are keyed by a `Symbol()`
  var props = keys(obj); // Iterate over each prop and recursively freeze it

  props.forEach(function (prop) {
    var value = obj[prop]; // If value is a plain object or array, we deepFreeze it

    obj[prop] = value && (isPlainObject(value) || isArray(value)) ? deepFreeze(value) : value;
  });
  return freeze(obj);
};
import Vue from './vue';
import cloneDeep from './clone-deep';
import get from './get';
import memoize from './memoize';
import DEFAULTS from './config-defaults'; // --- Constants ---

var PROP_NAME = '$bvConfig';
var VueProto = Vue.prototype; // --- Getter methods ---
// All methods return a deep clone (immutable) copy of the config
// value, to prevent mutation of the user config object.
// Get the current user config. For testing purposes only

export var getConfig = function getConfig() {
  return VueProto[PROP_NAME] ? VueProto[PROP_NAME].getConfig() : {};
}; // Method to grab a config value based on a dotted/array notation key

export var getConfigValue = function getConfigValue(key) {
  return VueProto[PROP_NAME] ? VueProto[PROP_NAME].getConfigValue(key) : cloneDeep(get(DEFAULTS, key));
}; // Method to grab a config value for a particular component

export var getComponentConfig = function getComponentConfig(cmpName) {
  var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  // Return the particular config value for key for if specified,
  // otherwise we return the full config (or an empty object if not found)
  return key ? getConfigValue("".concat(cmpName, ".").concat(key)) : getConfigValue(cmpName) || {};
}; // Convenience method for getting all breakpoint names

export var getBreakpoints = function getBreakpoints() {
  return getConfigValue('breakpoints');
}; // Private function for caching / locking-in breakpoint names

var _getBreakpointsCached = memoize(function () {
  return getBreakpoints();
}); // Convenience method for getting all breakpoint names.
// Caches the results after first access.


export var getBreakpointsCached = function getBreakpointsCached() {
  return cloneDeep(_getBreakpointsCached());
}; // Convenience method for getting breakpoints with
// the smallest breakpoint set as ''.
// Useful for components that create breakpoint specific props.

export var getBreakpointsUp = function getBreakpointsUp() {
  var breakpoints = getBreakpoints();
  breakpoints[0] = '';
  return breakpoints;
}; // Convenience method for getting breakpoints with
// the smallest breakpoint set as ''.
// Useful for components that create breakpoint specific props.
// Caches the results after first access.

export var getBreakpointsUpCached = memoize(function () {
  var breakpoints = getBreakpointsCached();
  breakpoints[0] = '';
  return breakpoints;
}); // Convenience method for getting breakpoints with
// the largest breakpoint set as ''.
// Useful for components that create breakpoint specific props.

export var getBreakpointsDown = function getBreakpointsDown() {
  var breakpoints = getBreakpoints();
  breakpoints[breakpoints.length - 1] = '';
  return breakpoints;
}; // Convenience method for getting breakpoints with
// the largest breakpoint set as ''.
// Useful for components that create breakpoint specific props.
// Caches the results after first access.

/* istanbul ignore next: we don't use this method anywhere, yet */

export var getBreakpointsDownCached = function getBreakpointsDownCached()
/* istanbul ignore next */
{
  var breakpoints = getBreakpointsCached();
  breakpoints[breakpoints.length - 1] = '';
  return breakpoints;
};
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

import OurVue from './vue';
import cloneDeep from './clone-deep';
import get from './get';
import warn from './warn';
import { isArray, isPlainObject, isString, isUndefined } from './inspect';
import { getOwnPropertyNames, hasOwnProperty } from './object';
import DEFAULTS from './config-defaults'; // --- Constants ---

var PROP_NAME = '$bvConfig'; // Config manager class

var BvConfig =
/*#__PURE__*/
function () {
  function BvConfig() {
    _classCallCheck(this, BvConfig);

    // TODO: pre-populate with default config values (needs updated tests)
    // this.$_config = cloneDeep(DEFAULTS)
    this.$_config = {};
    this.$_cachedBreakpoints = null;
  }

  _createClass(BvConfig, [{
    key: "getDefaults",
    // Returns the defaults
    value: function getDefaults()
    /* istanbul ignore next */
    {
      return this.defaults;
    } // Method to merge in user config parameters

  }, {
    key: "setConfig",
    value: function setConfig() {
      var _this = this;

      var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (!isPlainObject(config)) {
        /* istanbul ignore next */
        return;
      }

      var configKeys = getOwnPropertyNames(config);
      configKeys.forEach(function (cmpName) {
        /* istanbul ignore next */
        if (!hasOwnProperty(DEFAULTS, cmpName)) {
          warn("config: unknown config property \"".concat(cmpName, "\""));
          return;
        }

        var cmpConfig = config[cmpName];

        if (cmpName === 'breakpoints') {
          // Special case for breakpoints
          var breakpoints = config.breakpoints;
          /* istanbul ignore if */

          if (!isArray(breakpoints) || breakpoints.length < 2 || breakpoints.some(function (b) {
            return !isString(b) || b.length === 0;
          })) {
            warn('config: "breakpoints" must be an array of at least 2 breakpoint names');
          } else {
            _this.$_config.breakpoints = cloneDeep(breakpoints);
          }
        } else if (isPlainObject(cmpConfig)) {
          // Component prop defaults
          var props = getOwnPropertyNames(cmpConfig);
          props.forEach(function (prop) {
            /* istanbul ignore if */
            if (!hasOwnProperty(DEFAULTS[cmpName], prop)) {
              warn("config: unknown config property \"".concat(cmpName, ".").concat(prop, "\""));
            } else {
              // TODO: If we pre-populate the config with defaults, we can skip this line
              _this.$_config[cmpName] = _this.$_config[cmpName] || {};

              if (!isUndefined(cmpConfig[prop])) {
                _this.$_config[cmpName][prop] = cloneDeep(cmpConfig[prop]);
              }
            }
          });
        }
      });
    } // Clear the config. For testing purposes only

  }, {
    key: "resetConfig",
    value: function resetConfig() {
      this.$_config = {};
    } // Returns a deep copy of the user config

  }, {
    key: "getConfig",
    value: function getConfig() {
      return cloneDeep(this.$_config);
    }
  }, {
    key: "getConfigValue",
    value: function getConfigValue(key) {
      // First we try the user config, and if key not found we fall back to default value
      // NOTE: If we deep clone DEFAULTS into config, then we can skip the fallback for get
      return cloneDeep(get(this.$_config, key, get(DEFAULTS, key)));
    }
  }, {
    key: "defaults",
    get: function get()
    /* istanbul ignore next */
    {
      return DEFAULTS;
    }
  }], [{
    key: "Defaults",
    get: function get()
    /* istanbul ignore next */
    {
      return DEFAULTS;
    }
  }]);

  return BvConfig;
}(); // Method for applying a global config


export var setConfig = function setConfig() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var Vue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : OurVue;
  // Ensure we have a $bvConfig Object on the Vue prototype.
  // We set on Vue and OurVue just in case consumer has not set an alias of `vue`.
  Vue.prototype[PROP_NAME] = OurVue.prototype[PROP_NAME] = Vue.prototype[PROP_NAME] || OurVue.prototype[PROP_NAME] || new BvConfig(); // Apply the config values

  Vue.prototype[PROP_NAME].setConfig(config);
}; // Method for resetting the user config. Exported for testing purposes only.

export var resetConfig = function resetConfig() {
  if (OurVue.prototype[PROP_NAME] && OurVue.prototype[PROP_NAME].resetConfig) {
    OurVue.prototype[PROP_NAME].resetConfig();
  }
};
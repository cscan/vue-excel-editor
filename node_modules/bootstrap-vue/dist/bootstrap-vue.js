/*!
 * BoostrapVue 2.1.0
 *
 * @link https://bootstrap-vue.js.org
 * @source https://github.com/bootstrap-vue/bootstrap-vue
 * @copyright (c) 2016-2019 BootstrapVue
 * @license MIT
 * https://github.com/bootstrap-vue/bootstrap-vue/blob/master/LICENSE
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('vue')) :
  typeof define === 'function' && define.amd ? define(['vue'], factory) :
  (global = global || self, global.bootstrapVue = factory(global.Vue));
}(this, (function (Vue) { 'use strict';

  Vue = Vue && Vue.hasOwnProperty('default') ? Vue['default'] : Vue;

  function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(source, true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(source).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _construct(Parent, args, Class) {
    if (isNativeReflectConstruct()) {
      _construct = Reflect.construct;
    } else {
      _construct = function _construct(Parent, args, Class) {
        var a = [null];
        a.push.apply(a, args);
        var Constructor = Function.bind.apply(Parent, a);
        var instance = new Constructor();
        if (Class) _setPrototypeOf(instance, Class.prototype);
        return instance;
      };
    }

    return _construct.apply(null, arguments);
  }

  function _isNativeFunction(fn) {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
  }

  function _wrapNativeSuper(Class) {
    var _cache = typeof Map === "function" ? new Map() : undefined;

    _wrapNativeSuper = function _wrapNativeSuper(Class) {
      if (Class === null || !_isNativeFunction(Class)) return Class;

      if (typeof Class !== "function") {
        throw new TypeError("Super expression must either be null or a function");
      }

      if (typeof _cache !== "undefined") {
        if (_cache.has(Class)) return _cache.get(Class);

        _cache.set(Class, Wrapper);
      }

      function Wrapper() {
        return _construct(Class, arguments, _getPrototypeOf(this).constructor);
      }

      Wrapper.prototype = Object.create(Class.prototype, {
        constructor: {
          value: Wrapper,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      return _setPrototypeOf(Wrapper, Class);
    };

    return _wrapNativeSuper(Class);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _superPropBase(object, property) {
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
      object = _getPrototypeOf(object);
      if (object === null) break;
    }

    return object;
  }

  function _get(target, property, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.get) {
      _get = Reflect.get;
    } else {
      _get = function _get(target, property, receiver) {
        var base = _superPropBase(target, property);

        if (!base) return;
        var desc = Object.getOwnPropertyDescriptor(base, property);

        if (desc.get) {
          return desc.get.call(receiver);
        }

        return desc.value;
      };
    }

    return _get(target, property, receiver || target);
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    }
  }

  function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
  }

  //

  /**
   * Utilities to get information about the current environment
   */
  // --- Constants ---
  var hasWindowSupport = typeof window !== 'undefined';
  var hasDocumentSupport = typeof document !== 'undefined';
  var hasNavigatorSupport = typeof navigator !== 'undefined';
  var hasPromiseSupport = typeof Promise !== 'undefined';
  var hasMutationObserverSupport = typeof MutationObserver !== 'undefined' || typeof WebKitMutationObserver !== 'undefined' || typeof MozMutationObserver !== 'undefined';
  var isBrowser = hasWindowSupport && hasDocumentSupport && hasNavigatorSupport; // Browser type sniffing

  var userAgent = isBrowser ? window.navigator.userAgent.toLowerCase() : '';
  var isJSDOM = userAgent.indexOf('jsdom') > 0;
  var isIE = /msie|trident/.test(userAgent); // Determine if the browser supports the option passive for events

  var hasPassiveEventSupport = function () {
    var passiveEventSupported = false;

    if (isBrowser) {
      try {
        var options = {
          get passive() {
            // This function will be called when the browser
            // attempts to access the passive property.

            /* istanbul ignore next: will never be called in JSDOM */
            passiveEventSupported = true;
          }

        };
        window.addEventListener('test', options, options);
        window.removeEventListener('test', options, options);
      } catch (err) {
        /* istanbul ignore next: will never be called in JSDOM */
        passiveEventSupported = false;
      }
    }

    return passiveEventSupported;
  }();
  var hasTouchSupport = isBrowser && ('ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0);
  var hasPointerEventSupport = isBrowser && Boolean(window.PointerEvent || window.MSPointerEvent);
  var hasIntersectionObserverSupport = isBrowser && 'IntersectionObserver' in window && 'IntersectionObserverEntry' in window && // Edge 15 and UC Browser lack support for `isIntersecting`
  // but we an use intersectionRatio > 0 instead
  // 'isIntersecting' in window.IntersectionObserverEntry.prototype &&
  'intersectionRatio' in window.IntersectionObserverEntry.prototype; // --- Getters ---

  var getEnv = function getEnv(key) {
    var fallback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var env = typeof process !== 'undefined' && process ? process.env || {} : {};

    if (!key) {
      /* istanbul ignore next */
      return env;
    }

    return env[key] || fallback;
  };
  var getNoWarn = function getNoWarn() {
    return getEnv('BOOTSTRAP_VUE_NO_WARN');
  };

  /**
   * Log a warning message to the console with BootstrapVue formatting
   * @param {string} message
   */

  var warn = function warn(message)
  /* istanbul ignore next */
  {
    if (!getNoWarn()) {
      console.warn("[BootstrapVue warn]: ".concat(message));
    }
  };
  /**
   * Warn when no Promise support is given
   * @param {string} source
   * @returns {boolean} warned
   */

  var warnNotClient = function warnNotClient(source) {
    /* istanbul ignore else */
    if (isBrowser) {
      return false;
    } else {
      warn("".concat(source, ": Can not be called during SSR."));
      return true;
    }
  };
  /**
   * Warn when no Promise support is given
   * @param {string} source
   * @returns {boolean} warned
   */

  var warnNoPromiseSupport = function warnNoPromiseSupport(source) {
    /* istanbul ignore else */
    if (hasPromiseSupport) {
      return false;
    } else {
      warn("".concat(source, ": Requires Promise support."));
      return true;
    }
  };
  /**
   * Warn when no MutationObserver support is given
   * @param {string} source
   * @returns {boolean} warned
   */

  var warnNoMutationObserverSupport = function warnNoMutationObserverSupport(source) {
    /* istanbul ignore else */
    if (hasMutationObserverSupport) {
      return false;
    } else {
      warn("".concat(source, ": Requires MutationObserver support."));
      return true;
    }
  }; // Default export

  // --- Static ---
  var from = Array.from;
  var isArray = Array.isArray; // --- Instance ---

  var arrayIncludes = function arrayIncludes(array, value) {
    return array.indexOf(value) !== -1;
  };
  var concat = function concat() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return Array.prototype.concat.apply([], args);
  };

  var assign = Object.assign;
  var getOwnPropertyNames = Object.getOwnPropertyNames;
  var keys = Object.keys;
  var defineProperties = Object.defineProperties;
  var defineProperty = Object.defineProperty;
  var freeze = Object.freeze;
  var create = Object.create;

  var hasOwnProperty = function hasOwnProperty(obj, prop) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
  };
  var toString = function toString(obj) {
    return Object.prototype.toString.call(obj);
  }; // --- Utilities ---

  /**
   * Quick object check - this is primarily used to tell
   * Objects from primitive values when we know the value
   * is a JSON-compliant type.
   * Note object could be a complex type like array, date, etc.
   */

  var isObject = function isObject(obj) {
    return obj !== null && _typeof(obj) === 'object';
  };
  /**
   * Strict object type check. Only returns true
   * for plain JavaScript objects.
   */

  var isPlainObject = function isPlainObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]';
  };
  /**
   * Shallow copy an object. If the passed in object
   * is null or undefined, returns an empty object
   */

  var clone = function clone(obj) {
    return _objectSpread2({}, obj);
  };
  /**
   * Return a shallow copy of object with
   * the specified properties omitted
   * @link https://gist.github.com/bisubus/2da8af7e801ffd813fab7ac221aa7afc
   */

  var omit = function omit(obj, props) {
    return keys(obj).filter(function (key) {
      return props.indexOf(key) === -1;
    }).reduce(function (result, key) {
      return _objectSpread2({}, result, _defineProperty({}, key, obj[key]));
    }, {});
  };
  /**
   * Convenience method to create a read-only descriptor
   */

  var readonlyDescriptor = function readonlyDescriptor() {
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

  var deepFreeze = function deepFreeze(obj) {
    // Retrieve the property names defined on object/array
    // Note: `keys` will ignore properties that are keyed by a `Symbol()`
    var props = keys(obj); // Iterate over each prop and recursively freeze it

    props.forEach(function (prop) {
      var value = obj[prop]; // If value is a plain object or array, we deepFreeze it

      obj[prop] = value && (isPlainObject(value) || isArray(value)) ? deepFreeze(value) : value;
    });
    return freeze(obj);
  };

  var w = hasWindowSupport ? window : {};
  var Element$1 = hasWindowSupport ? w.Element :
  /*#__PURE__*/
  function (_Object) {
    _inherits(Element, _Object);

    function Element() {
      _classCallCheck(this, Element);

      return _possibleConstructorReturn(this, _getPrototypeOf(Element).apply(this, arguments));
    }

    return Element;
  }(_wrapNativeSuper(Object));
  var HTMLElement = hasWindowSupport ? w.HTMLElement :
  /*#__PURE__*/
  function (_Element) {
    _inherits(HTMLElement, _Element);

    function HTMLElement() {
      _classCallCheck(this, HTMLElement);

      return _possibleConstructorReturn(this, _getPrototypeOf(HTMLElement).apply(this, arguments));
    }

    return HTMLElement;
  }(Element$1);
  var SVGElement = hasWindowSupport ? w.SVGElement :
  /*#__PURE__*/
  function (_Element2) {
    _inherits(SVGElement, _Element2);

    function SVGElement() {
      _classCallCheck(this, SVGElement);

      return _possibleConstructorReturn(this, _getPrototypeOf(SVGElement).apply(this, arguments));
    }

    return SVGElement;
  }(Element$1);
  var File = hasWindowSupport ? w.File :
  /*#__PURE__*/
  function (_Object2) {
    _inherits(File, _Object2);

    function File() {
      _classCallCheck(this, File);

      return _possibleConstructorReturn(this, _getPrototypeOf(File).apply(this, arguments));
    }

    return File;
  }(_wrapNativeSuper(Object));

  var toType = function toType(val) {
    return _typeof(val);
  };
  var toRawType = function toRawType(val) {
    return Object.prototype.toString.call(val).slice(8, -1);
  };
  var isUndefined = function isUndefined(val) {
    return val === undefined;
  };
  var isNull = function isNull(val) {
    return val === null;
  };
  var isUndefinedOrNull = function isUndefinedOrNull(val) {
    return isUndefined(val) || isNull(val);
  };
  var isFunction = function isFunction(val) {
    return toType(val) === 'function';
  };
  var isBoolean = function isBoolean(val) {
    return toType(val) === 'boolean';
  };
  var isString = function isString(val) {
    return toType(val) === 'string';
  };
  var isNumber = function isNumber(val) {
    return toType(val) === 'number';
  };
  var isDate = function isDate(val) {
    return val instanceof Date;
  };
  var isEvent = function isEvent(val) {
    return val instanceof Event;
  };
  var isFile = function isFile(val) {
    return val instanceof File;
  };
  var isRegExp = function isRegExp(val) {
    return toRawType(val) === 'RegExp';
  };
  var isPromise = function isPromise(val) {
    return !isUndefinedOrNull(val) && isFunction(val.then) && isFunction(val.catch);
  }; // Extra convenience named re-exports

  var cloneDeep = function cloneDeep(obj) {
    var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : obj;

    if (isArray(obj)) {
      return obj.reduce(function (result, val) {
        return [].concat(_toConsumableArray(result), [cloneDeep(val, val)]);
      }, []);
    }

    if (isPlainObject(obj)) {
      return keys(obj).reduce(function (result, key) {
        return _objectSpread2({}, result, _defineProperty({}, key, cloneDeep(obj[key], obj[key])));
      }, {});
    }

    return defaultValue;
  };

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

  // NOTES
  //
  // The global config SHALL NOT be used to set defaults for Boolean props, as the props
  // would loose their semantic meaning, and force people writing 3rd party components to
  // explicity set a true or false value using the v-bind syntax on boolean props
  //
  // Supported config values (depending on the prop's supported type(s)):
  // `String`, `Array`, `Object`, `null` or `undefined`
  // BREAKPOINT DEFINITIONS
  //
  // Some components (`<b-col>` and `<b-form-group>`) generate props based on breakpoints,
  // and this occurs when the component is first loaded (evaluated), which may happen
  // before the config is created/modified
  //
  // To get around this we make these components' props async (lazy evaluation)
  // The component definition is only called/executed when the first access to the
  // component is used (and cached on subsequent uses)
  // PROP DEFAULTS
  //
  // For default values on props, we use the default value factory function approach so
  // that the default values are pulled in at each component instantiation
  //
  //  props: {
  //    variant: {
  //      type: String,
  //      default: () => getConfigComponent('BAlert', 'variant')
  //    }
  //  }
  //
  // We also provide a cached getter for breakpoints, which are "frozen" on first access
  // prettier-ignore

  var DEFAULTS = deepFreeze({
    // Breakpoints
    breakpoints: ['xs', 'sm', 'md', 'lg', 'xl'],
    // Form controls
    formControls: {
      size: null
    },
    // Component specific defaults are keyed by the component
    // name (PascalCase) and prop name (camelCase)
    BAlert: {
      dismissLabel: 'Close',
      variant: 'info'
    },
    BBadge: {
      variant: 'secondary'
    },
    BButton: {
      size: null,
      variant: 'secondary'
    },
    BButtonClose: {
      // `textVariant` is `null` to inherit the current text color
      textVariant: null,
      ariaLabel: 'Close'
    },
    BCardSubTitle: {
      // `<b-card>` and `<b-card-body>` also inherit this prop
      subTitleTextVariant: 'muted'
    },
    BCarousel: {
      labelPrev: 'Previous Slide',
      labelNext: 'Next Slide',
      labelGotoSlide: 'Goto Slide',
      labelIndicators: 'Select a slide to display'
    },
    BDropdown: {
      toggleText: 'Toggle Dropdown',
      size: null,
      variant: 'secondary',
      splitVariant: null
    },
    BFormFile: {
      browseText: 'Browse',
      // Chrome default file prompt
      placeholder: 'No file chosen',
      dropPlaceholder: 'Drop files here'
    },
    BFormText: {
      textVariant: 'muted'
    },
    BImg: {
      blankColor: 'transparent'
    },
    BImgLazy: {
      blankColor: 'transparent'
    },
    BInputGroup: {
      size: null
    },
    BJumbotron: {
      bgVariant: null,
      borderVariant: null,
      textVariant: null
    },
    BListGroupItem: {
      variant: null
    },
    BModal: {
      titleTag: 'h5',
      size: 'md',
      headerBgVariant: null,
      headerBorderVariant: null,
      headerTextVariant: null,
      headerCloseVariant: null,
      bodyBgVariant: null,
      bodyTextVariant: null,
      footerBgVariant: null,
      footerBorderVariant: null,
      footerTextVariant: null,
      cancelTitle: 'Cancel',
      cancelVariant: 'secondary',
      okTitle: 'OK',
      okVariant: 'primary',
      headerCloseLabel: 'Close'
    },
    BNavbar: {
      variant: null
    },
    BNavbarToggle: {
      label: 'Toggle navigation'
    },
    BPagination: {
      size: null
    },
    BPaginationNav: {
      size: null
    },
    BPopover: {
      boundary: 'scrollParent',
      boundaryPadding: 5,
      customClass: null,
      delay: 50,
      variant: null
    },
    BProgress: {
      variant: null
    },
    BProgressBar: {
      variant: null
    },
    BSpinner: {
      variant: null
    },
    BTable: {
      selectedVariant: 'active',
      headVariant: null,
      footVariant: null
    },
    BToast: {
      toaster: 'b-toaster-top-right',
      autoHideDelay: 5000,
      variant: null,
      toastClass: null,
      headerClass: null,
      bodyClass: null
    },
    BToaster: {
      ariaLive: null,
      ariaAtomic: null,
      role: null
    },
    BTooltip: {
      boundary: 'scrollParent',
      boundaryPadding: 5,
      customClass: null,
      delay: 50,
      variant: null
    }
  });

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


  var setConfig = function setConfig() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var Vue$1 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Vue;
    // Ensure we have a $bvConfig Object on the Vue prototype.
    // We set on Vue and OurVue just in case consumer has not set an alias of `vue`.
    Vue$1.prototype[PROP_NAME] = Vue.prototype[PROP_NAME] = Vue$1.prototype[PROP_NAME] || Vue.prototype[PROP_NAME] || new BvConfig(); // Apply the config values

    Vue$1.prototype[PROP_NAME].setConfig(config);
  }; // Method for resetting the user config. Exported for testing purposes only.

  /**
   * Checks if there are multiple instances of Vue, and warns (once) about possible issues.
   * @param {object} Vue
   */

  var checkMultipleVue = function () {
    var checkMultipleVueWarned = false;
    var MULTIPLE_VUE_WARNING = ['Multiple instances of Vue detected!', 'You may need to set up an alias for Vue in your bundler config.', 'See: https://bootstrap-vue.js.org/docs#using-module-bundlers'].join('\n');
    return function (Vue$1) {
      /* istanbul ignore next */
      if (!checkMultipleVueWarned && Vue !== Vue$1 && !isJSDOM) {
        warn(MULTIPLE_VUE_WARNING);
      }

      checkMultipleVueWarned = true;
    };
  }();
  /**
   * Plugin install factory function.
   * @param {object} { components, directives }
   * @returns {function} plugin install function
   */

  var installFactory = function installFactory() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        components = _ref.components,
        directives = _ref.directives,
        plugins = _ref.plugins;

    var install = function install(Vue) {
      var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (install.installed) {
        /* istanbul ignore next */
        return;
      }

      install.installed = true;
      checkMultipleVue(Vue);
      setConfig(config, Vue);
      registerComponents(Vue, components);
      registerDirectives(Vue, directives);
      registerPlugins(Vue, plugins);
    };

    install.installed = false;
    return install;
  };
  /**
   * Plugin object factory function.
   * @param {object} { components, directives, plugins }
   * @returns {object} plugin install object
   */

  var pluginFactory = function pluginFactory() {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var extend = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return _objectSpread2({}, extend, {
      install: installFactory(opts)
    });
  };
  /**
   * Load a group of plugins.
   * @param {object} Vue
   * @param {object} Plugin definitions
   */

  var registerPlugins = function registerPlugins(Vue) {
    var plugins = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    for (var plugin in plugins) {
      if (plugin && plugins[plugin]) {
        Vue.use(plugins[plugin]);
      }
    }
  };
  /**
   * Load a component.
   * @param {object} Vue
   * @param {string} Component name
   * @param {object} Component definition
   */

  var registerComponent = function registerComponent(Vue, name, def) {
    if (Vue && name && def) {
      Vue.component(name, def);
    }
  };
  /**
   * Load a group of components.
   * @param {object} Vue
   * @param {object} Object of component definitions
   */

  var registerComponents = function registerComponents(Vue) {
    var components = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    for (var component in components) {
      registerComponent(Vue, component, components[component]);
    }
  };
  /**
   * Load a directive.
   * @param {object} Vue
   * @param {string} Directive name
   * @param {object} Directive definition
   */

  var registerDirective = function registerDirective(Vue, name, def) {
    if (Vue && name && def) {
      // Ensure that any leading V is removed from the
      // name, as Vue adds it automatically
      Vue.directive(name.replace(/^VB/, 'B'), def);
    }
  };
  /**
   * Load a group of directives.
   * @param {object} Vue
   * @param {object} Object of directive definitions
   */

  var registerDirectives = function registerDirectives(Vue) {
    var directives = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    for (var directive in directives) {
      registerDirective(Vue, directive, directives[directive]);
    }
  };
  /**
   * Install plugin if window.Vue available
   * @param {object} Plugin definition
   */

  var vueUse = function vueUse(VuePlugin) {
    /* istanbul ignore next */
    if (hasWindowSupport && window.Vue) {
      window.Vue.use(VuePlugin);
    }
    /* istanbul ignore next */


    if (hasWindowSupport && VuePlugin.NAME) {
      window[VuePlugin.NAME] = VuePlugin;
    }
  };

  var memoize = function memoize(fn) {
    var cache = create(null);
    return function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var argsKey = JSON.stringify(args);
      return cache[argsKey] = cache[argsKey] || fn.apply(null, args);
    };
  };

  var PROP_NAME$1 = '$bvConfig';
  var VueProto = Vue.prototype; // --- Getter methods ---

  var getConfigValue = function getConfigValue(key) {
    return VueProto[PROP_NAME$1] ? VueProto[PROP_NAME$1].getConfigValue(key) : cloneDeep(get(DEFAULTS, key));
  }; // Method to grab a config value for a particular component

  var getComponentConfig = function getComponentConfig(cmpName) {
    var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    // Return the particular config value for key for if specified,
    // otherwise we return the full config (or an empty object if not found)
    return key ? getConfigValue("".concat(cmpName, ".").concat(key)) : getConfigValue(cmpName) || {};
  }; // Convenience method for getting all breakpoint names

  var getBreakpoints = function getBreakpoints() {
    return getConfigValue('breakpoints');
  }; // Private function for caching / locking-in breakpoint names

  var _getBreakpointsCached = memoize(function () {
    return getBreakpoints();
  }); // Convenience method for getting all breakpoint names.
  // Caches the results after first access.


  var getBreakpointsCached = function getBreakpointsCached() {
    return cloneDeep(_getBreakpointsCached());
  }; // Convenience method for getting breakpoints with
  // the smallest breakpoint set as ''.
  // Useful for components that create breakpoint specific props.
  // Caches the results after first access.

  var getBreakpointsUpCached = memoize(function () {
    var breakpoints = getBreakpointsCached();
    breakpoints[0] = '';
    return breakpoints;
  }); // Convenience method for getting breakpoints with

  var w$1 = hasWindowSupport ? window : {};
  var d = hasDocumentSupport ? document : {};
  var elProto = typeof Element !== 'undefined' ? Element.prototype : {}; // --- Normalization utils ---
  // See: https://developer.mozilla.org/en-US/docs/Web/API/Element/matches#Polyfill

  /* istanbul ignore next */

  var matchesEl = elProto.matches || elProto.msMatchesSelector || elProto.webkitMatchesSelector; // See: https://developer.mozilla.org/en-US/docs/Web/API/Element/closest

  /* istanbul ignore next */

  var closestEl = elProto.closest || function (sel)
  /* istanbul ignore next */
  {
    var el = this;

    do {
      // Use our "patched" matches function
      if (matches(el, sel)) {
        return el;
      }

      el = el.parentElement || el.parentNode;
    } while (!isNull(el) && el.nodeType === Node.ELEMENT_NODE);

    return null;
  }; // `requestAnimationFrame()` convenience method

  var requestAF = w$1.requestAnimationFrame || w$1.webkitRequestAnimationFrame || w$1.mozRequestAnimationFrame || w$1.msRequestAnimationFrame || w$1.oRequestAnimationFrame || // Fallback, but not a true polyfill
  // Only needed for Opera Mini

  /* istanbul ignore next */
  function (cb) {
    return setTimeout(cb, 16);
  };
  var MutationObs = w$1.MutationObserver || w$1.WebKitMutationObserver || w$1.MozMutationObserver || null; // --- Utils ---
  // Normalize event options based on support of passive option
  // Exported only for testing purposes

  var parseEventOptions = function parseEventOptions(options) {
    /* istanbul ignore else: can't test in JSDOM, as it supports passive */
    if (hasPassiveEventSupport) {
      return isObject(options) ? options : {
        useCapture: Boolean(options || false)
      };
    } else {
      // Need to translate to actual Boolean value
      return Boolean(isObject(options) ? options.useCapture : options);
    }
  }; // Attach an event listener to an element

  var eventOn = function eventOn(el, evtName, handler, options) {
    if (el && el.addEventListener) {
      el.addEventListener(evtName, handler, parseEventOptions(options));
    }
  }; // Remove an event listener from an element

  var eventOff = function eventOff(el, evtName, handler, options) {
    if (el && el.removeEventListener) {
      el.removeEventListener(evtName, handler, parseEventOptions(options));
    }
  }; // Determine if an element is an HTML Element

  var isElement = function isElement(el) {
    return Boolean(el && el.nodeType === Node.ELEMENT_NODE);
  }; // Determine if an HTML element is visible - Faster than CSS check

  var isVisible = function isVisible(el) {
    if (!isElement(el) || !contains(d.body, el)) {
      return false;
    }

    if (el.style.display === 'none') {
      // We do this check to help with vue-test-utils when using v-show

      /* istanbul ignore next */
      return false;
    } // All browsers support getBoundingClientRect(), except JSDOM as it returns all 0's for values :(
    // So any tests that need isVisible will fail in JSDOM
    // Except when we override the getBCR prototype in some tests


    var bcr = getBCR(el);
    return Boolean(bcr && bcr.height > 0 && bcr.width > 0);
  }; // Determine if an element is disabled

  var isDisabled = function isDisabled(el) {
    return !isElement(el) || el.disabled || Boolean(getAttr(el, 'disabled')) || hasClass(el, 'disabled');
  }; // Cause/wait-for an element to reflow it's content (adjusting it's height/width)

  var reflow = function reflow(el) {
    // Requesting an elements offsetHight will trigger a reflow of the element content

    /* istanbul ignore next: reflow doesn't happen in JSDOM */
    return isElement(el) && el.offsetHeight;
  }; // Select all elements matching selector. Returns `[]` if none found

  var selectAll = function selectAll(selector, root) {
    return from((isElement(root) ? root : d).querySelectorAll(selector));
  }; // Select a single element, returns `null` if not found

  var select = function select(selector, root) {
    return (isElement(root) ? root : d).querySelector(selector) || null;
  }; // Determine if an element matches a selector

  var matches = function matches(el, selector) {
    if (!isElement(el)) {
      return false;
    }

    return matchesEl.call(el, selector);
  }; // Finds closest element matching selector. Returns `null` if not found

  var closest = function closest(selector, root) {
    var includeRoot = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    if (!isElement(root)) {
      return null;
    }

    var el = closestEl.call(root, selector); // Native closest behaviour when `includeRoot` is truthy,
    // else emulate jQuery closest and return `null` if match is
    // the passed in root element when `includeRoot` is falsey

    return includeRoot ? el : el === root ? null : el;
  }; // Returns true if the parent element contains the child element

  var contains = function contains(parent, child) {
    if (!parent || !isFunction(parent.contains)) {
      return false;
    }

    return parent.contains(child);
  }; // Get an element given an ID

  var getById = function getById(id) {
    return d.getElementById(/^#/.test(id) ? id.slice(1) : id) || null;
  }; // Add a class to an element

  var addClass = function addClass(el, className) {
    // We are checking for `el.classList` existence here since IE 11
    // returns `undefined` for some elements (e.g. SVG elements)
    // See https://github.com/bootstrap-vue/bootstrap-vue/issues/2713
    if (className && isElement(el) && el.classList) {
      el.classList.add(className);
    }
  }; // Remove a class from an element

  var removeClass = function removeClass(el, className) {
    // We are checking for `el.classList` existence here since IE 11
    // returns `undefined` for some elements (e.g. SVG elements)
    // See https://github.com/bootstrap-vue/bootstrap-vue/issues/2713
    if (className && isElement(el) && el.classList) {
      el.classList.remove(className);
    }
  }; // Test if an element has a class

  var hasClass = function hasClass(el, className) {
    // We are checking for `el.classList` existence here since IE 11
    // returns `undefined` for some elements (e.g. SVG elements)
    // See https://github.com/bootstrap-vue/bootstrap-vue/issues/2713
    if (className && isElement(el) && el.classList) {
      return el.classList.contains(className);
    }

    return false;
  }; // Set an attribute on an element

  var setAttr = function setAttr(el, attr, val) {
    if (attr && isElement(el)) {
      el.setAttribute(attr, val);
    }
  }; // Remove an attribute from an element

  var removeAttr = function removeAttr(el, attr) {
    if (attr && isElement(el)) {
      el.removeAttribute(attr);
    }
  }; // Get an attribute value from an element
  // Returns `null` if not found

  var getAttr = function getAttr(el, attr) {
    return attr && isElement(el) ? el.getAttribute(attr) : null;
  }; // Determine if an attribute exists on an element
  // Returns `true` or `false`, or `null` if element not found

  var hasAttr = function hasAttr(el, attr) {
    return attr && isElement(el) ? el.hasAttribute(attr) : null;
  }; // Return the Bounding Client Rect of an element
  // Returns `null` if not an element

  /* istanbul ignore next: getBoundingClientRect() doesn't work in JSDOM */

  var getBCR = function getBCR(el) {
    return isElement(el) ? el.getBoundingClientRect() : null;
  }; // Get computed style object for an element

  /* istanbul ignore next: getComputedStyle() doesn't work in JSDOM */

  var getCS = function getCS(el) {
    return hasWindowSupport && isElement(el) ? w$1.getComputedStyle(el) : {};
  }; // Returns a `Selection` object representing the range of text selected
  // Returns `null` if no window support is given

  /* istanbul ignore next: getSelection() doesn't work in JSDOM */

  var getSel = function getSel() {
    return hasWindowSupport && w$1.getSelection ? w$1.getSelection() : null;
  }; // Return an element's offset with respect to document element
  // https://j11y.io/jquery/#v=git&fn=jQuery.fn.offset

  var offset = function offset(el)
  /* istanbul ignore next: getBoundingClientRect(), getClientRects() doesn't work in JSDOM */
  {
    var _offset = {
      top: 0,
      left: 0
    };

    if (!isElement(el) || el.getClientRects().length === 0) {
      return _offset;
    }

    var bcr = getBCR(el);

    if (bcr) {
      var win = el.ownerDocument.defaultView;
      _offset.top = bcr.top + win.pageYOffset;
      _offset.left = bcr.left + win.pageXOffset;
    }

    return _offset;
  }; // Return an element's offset with respect to to it's offsetParent
  // https://j11y.io/jquery/#v=git&fn=jQuery.fn.position

  var position = function position(el)
  /* istanbul ignore next: getBoundingClientRect() doesn't work in JSDOM */
  {
    var _offset = {
      top: 0,
      left: 0
    };

    if (!isElement(el)) {
      return _offset;
    }

    var parentOffset = {
      top: 0,
      left: 0
    };
    var elStyles = getCS(el);

    if (elStyles.position === 'fixed') {
      _offset = getBCR(el) || _offset;
    } else {
      _offset = offset(el);
      var doc = el.ownerDocument;
      var offsetParent = el.offsetParent || doc.documentElement;

      while (offsetParent && (offsetParent === doc.body || offsetParent === doc.documentElement) && getCS(offsetParent).position === 'static') {
        offsetParent = offsetParent.parentNode;
      }

      if (offsetParent && offsetParent !== el && offsetParent.nodeType === Node.ELEMENT_NODE) {
        parentOffset = offset(offsetParent);
        var offsetParentStyles = getCS(offsetParent);
        parentOffset.top += parseFloat(offsetParentStyles.borderTopWidth);
        parentOffset.left += parseFloat(offsetParentStyles.borderLeftWidth);
      }
    }

    return {
      top: _offset.top - parentOffset.top - parseFloat(elStyles.marginTop),
      left: _offset.left - parentOffset.left - parseFloat(elStyles.marginLeft)
    };
  };

  var e=function(){return (e=Object.assign||function(e){for(var t,r=1,s=arguments.length;r<s;r++)for(var a in t=arguments[r])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e}).apply(this,arguments)},t={kebab:/-(\w)/g,styleProp:/:(.*)/,styleList:/;(?![^(]*\))/g};function r(e,t){return t?t.toUpperCase():""}function s(e){for(var s,a={},c=0,o=e.split(t.styleList);c<o.length;c++){var n=o[c].split(t.styleProp),i=n[0],l=n[1];(i=i.trim())&&("string"==typeof l&&(l=l.trim()),a[(s=i,s.replace(t.kebab,r))]=l);}return a}function a(){for(var t,r,a={},c=arguments.length;c--;)for(var o=0,n=Object.keys(arguments[c]);o<n.length;o++)switch(t=n[o]){case"class":case"style":case"directives":if(Array.isArray(a[t])||(a[t]=[]),"style"===t){var i=void 0;i=Array.isArray(arguments[c].style)?arguments[c].style:[arguments[c].style];for(var l=0;l<i.length;l++){var y=i[l];"string"==typeof y&&(i[l]=s(y));}arguments[c].style=i;}a[t]=a[t].concat(arguments[c][t]);break;case"staticClass":if(!arguments[c][t])break;void 0===a[t]&&(a[t]=""),a[t]&&(a[t]+=" "),a[t]+=arguments[c][t].trim();break;case"on":case"nativeOn":a[t]||(a[t]={});for(var p=0,f=Object.keys(arguments[c][t]||{});p<f.length;p++)r=f[p],a[t][r]?a[t][r]=[].concat(a[t][r],arguments[c][t][r]):a[t][r]=arguments[c][t][r];break;case"attrs":case"props":case"domProps":case"scopedSlots":case"staticStyle":case"hook":case"transition":a[t]||(a[t]={}),a[t]=e({},arguments[c][t],a[t]);break;case"slot":case"key":case"ref":case"tag":case"show":case"keepAlive":default:a[t]||(a[t]=arguments[c][t]);}return a}

  var NO_FADE_PROPS = {
    name: '',
    enterClass: '',
    enterActiveClass: '',
    enterToClass: 'show',
    leaveClass: 'show',
    leaveActiveClass: '',
    leaveToClass: ''
  };

  var FADE_PROPS = _objectSpread2({}, NO_FADE_PROPS, {
    enterActiveClass: 'fade',
    leaveActiveClass: 'fade'
  });

  var BVTransition =
  /*#__PURE__*/
  Vue.extend({
    name: 'BVTransition',
    functional: true,
    props: {
      noFade: {
        // Only applicable to the built in transition
        // Has no effect if `trans-props` provided
        type: Boolean,
        default: false
      },
      appear: {
        // Has no effect if `trans-props` provided
        type: Boolean,
        default: false
      },
      mode: {
        // Can be overridden by user supplied trans-props
        type: String // default: undefined

      },
      // For user supplied transitions (if needed)
      transProps: {
        type: Object,
        default: null
      }
    },
    render: function render(h, _ref) {
      var children = _ref.children,
          data = _ref.data,
          listeners = _ref.listeners,
          props = _ref.props;
      var transProps = props.transProps;

      if (!isPlainObject(transProps)) {
        transProps = props.noFade ? NO_FADE_PROPS : FADE_PROPS;

        if (props.appear) {
          // Default the appear classes to equal the enter classes
          transProps = _objectSpread2({}, transProps, {
            appear: true,
            appearClass: transProps.enterClass,
            appearActiveClass: transProps.enterActiveClass,
            appearToClass: transProps.enterToClass
          });
        }
      }

      transProps = _objectSpread2({
        mode: props.mode
      }, transProps, {
        // We always need `css` true
        css: true
      });
      return h('transition', // Any transition event listeners will get merged here
      a(data, {
        props: transProps
      }), children);
    }
  });

  // In functional components, `slots` is a function so it must be called
  // first before passing to the below methods. `scopedSlots` is always an
  // object and may be undefined (for Vue < 2.6.x)

  /**
   * Returns true if either scoped or unscoped named slot exists
   *
   * @param {String, Array} name or name[]
   * @param {Object} scopedSlots
   * @param {Object} slots
   * @returns {Array|undefined} VNodes
   */

  var hasNormalizedSlot = function hasNormalizedSlot(names) {
    var $scopedSlots = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var $slots = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    // Ensure names is an array
    names = concat(names).filter(Boolean); // Returns true if the either a $scopedSlot or $slot exists with the specified name

    return names.some(function (name) {
      return $scopedSlots[name] || $slots[name];
    });
  };
  /**
   * Returns VNodes for named slot either scoped or unscoped
   *
   * @param {String, Array} name or name[]
   * @param {String} scope
   * @param {Object} scopedSlots
   * @param {Object} slots
   * @returns {Array|undefined} VNodes
   */


  var normalizeSlot = function normalizeSlot(names) {
    var scope = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var $scopedSlots = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var $slots = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    // Ensure names is an array
    names = concat(names).filter(Boolean);
    var slot;

    for (var i = 0; i < names.length && !slot; i++) {
      var name = names[i];
      slot = $scopedSlots[name] || $slots[name];
    } // Note: in Vue 2.6.x, all named slots are also scoped slots


    return isFunction(slot) ? slot(scope) : slot;
  }; // Named exports

  var normalizeSlotMixin = {
    methods: {
      hasNormalizedSlot: function hasNormalizedSlot$1(names) {
        // Returns true if the either a $scopedSlot or $slot exists with the specified name
        // `names` can be a string name or an array of names
        return hasNormalizedSlot(names, this.$scopedSlots, this.$slots);
      },
      normalizeSlot: function normalizeSlot$1(names) {
        var scope = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        // Returns an array of rendered VNodes if slot found.
        // Returns undefined if not found.
        // `names` can be a string name or an array of names
        var vNodes = normalizeSlot(names, scope, this.$scopedSlots, this.$slots);

        return vNodes ? concat(vNodes) : vNodes;
      }
    }
  };

  var NAME = 'BButtonClose';
  var props = {
    disabled: {
      type: Boolean,
      default: false
    },
    ariaLabel: {
      type: String,
      default: function _default() {
        return getComponentConfig(NAME, 'ariaLabel');
      }
    },
    textVariant: {
      type: String,
      default: function _default() {
        return getComponentConfig(NAME, 'textVariant');
      }
    }
  }; // @vue/component

  var BButtonClose =
  /*#__PURE__*/
  Vue.extend({
    name: NAME,
    functional: true,
    props: props,
    render: function render(h, _ref) {
      var props = _ref.props,
          data = _ref.data,
          listeners = _ref.listeners,
          slots = _ref.slots,
          scopedSlots = _ref.scopedSlots;
      var $slots = slots();
      var $scopedSlots = scopedSlots || {};
      var componentData = {
        staticClass: 'close',
        class: _defineProperty({}, "text-".concat(props.textVariant), props.textVariant),
        attrs: {
          type: 'button',
          disabled: props.disabled,
          'aria-label': props.ariaLabel ? String(props.ariaLabel) : null
        },
        on: {
          click: function click(evt) {
            // Ensure click on button HTML content is also disabled

            /* istanbul ignore if: bug in JSDOM still emits click on inner element */
            if (props.disabled && isEvent(evt)) {
              evt.stopPropagation();
              evt.preventDefault();
            }
          }
        }
      }; // Careful not to override the default slot with innerHTML

      if (!hasNormalizedSlot('default', $scopedSlots, $slots)) {
        componentData.domProps = {
          innerHTML: '&times;'
        };
      }

      return h('button', a(data, componentData), normalizeSlot('default', {}, $scopedSlots, $slots));
    }
  });

  var NAME$1 = 'BAlert'; // Convert `show` value to a number

  var parseCountDown = function parseCountDown(show) {
    if (show === '' || isBoolean(show)) {
      return 0;
    }

    show = parseInt(show, 10);
    return show > 0 ? show : 0;
  }; // Convert `show` value to a boolean


  var parseShow = function parseShow(show) {
    if (show === '' || show === true) {
      return true;
    }

    if (parseInt(show, 10) < 1) {
      // Boolean will always return false for the above comparison
      return false;
    }

    return Boolean(show);
  }; // Is a value number like (i.e. a number or a number as string)


  var isNumericLike = function isNumericLike(value) {
    return !isNaN(parseInt(value, 10));
  }; // @vue/component


  var BAlert =
  /*#__PURE__*/
  Vue.extend({
    name: NAME$1,
    mixins: [normalizeSlotMixin],
    model: {
      prop: 'show',
      event: 'input'
    },
    props: {
      variant: {
        type: String,
        default: function _default() {
          return getComponentConfig(NAME$1, 'variant');
        }
      },
      dismissible: {
        type: Boolean,
        default: false
      },
      dismissLabel: {
        type: String,
        default: function _default() {
          return getComponentConfig(NAME$1, 'dismissLabel');
        }
      },
      show: {
        type: [Boolean, Number, String],
        default: false
      },
      fade: {
        type: Boolean,
        default: false
      }
    },
    data: function data() {
      return {
        countDownTimerId: null,
        countDown: 0,
        // If initially shown, we need to set these for SSR
        localShow: parseShow(this.show)
      };
    },
    watch: {
      show: function show(newVal) {
        this.countDown = parseCountDown(newVal);
        this.localShow = parseShow(newVal);
      },
      countDown: function countDown(newVal) {
        var _this = this;

        this.clearTimer();

        if (isNumericLike(this.show)) {
          // Ignore if this.show transitions to a boolean value.
          this.$emit('dismiss-count-down', newVal);

          if (this.show !== newVal) {
            // Update the v-model if needed
            this.$emit('input', newVal);
          }

          if (newVal > 0) {
            this.localShow = true;
            this.countDownTimerId = setTimeout(function () {
              _this.countDown--;
            }, 1000);
          } else {
            // Slightly delay the hide to allow any UI updates
            this.$nextTick(function () {
              requestAF(function () {
                _this.localShow = false;
              });
            });
          }
        }
      },
      localShow: function localShow(newVal) {
        if (!newVal && (this.dismissible || isNumericLike(this.show))) {
          // Only emit dismissed events for dismissible or auto dismissing alerts
          this.$emit('dismissed');
        }

        if (!isNumericLike(this.show) && this.show !== newVal) {
          // Only emit booleans if we weren't passed a number via `this.show`
          this.$emit('input', newVal);
        }
      }
    },
    created: function created() {
      this.countDown = parseCountDown(this.show);
      this.localShow = parseShow(this.show);
    },
    mounted: function mounted() {
      this.countDown = parseCountDown(this.show);
      this.localShow = parseShow(this.show);
    },
    beforeDestroy: function beforeDestroy() {
      this.clearTimer();
    },
    methods: {
      dismiss: function dismiss() {
        this.clearTimer();
        this.countDown = 0;
        this.localShow = false;
      },
      clearTimer: function clearTimer() {
        if (this.countDownTimerId) {
          clearInterval(this.countDownTimerId);
          this.countDownTimerId = null;
        }
      }
    },
    render: function render(h) {
      var $alert; // undefined

      if (this.localShow) {
        var $dismissBtn = h();

        if (this.dismissible) {
          // Add dismiss button
          $dismissBtn = h(BButtonClose, {
            attrs: {
              'aria-label': this.dismissLabel
            },
            on: {
              click: this.dismiss
            }
          }, [this.normalizeSlot('dismiss')]);
        }

        $alert = h('div', {
          key: this._uid,
          staticClass: 'alert',
          class: _defineProperty({
            'alert-dismissible': this.dismissible
          }, "alert-".concat(this.variant), this.variant),
          attrs: {
            role: 'alert',
            'aria-live': 'polite',
            'aria-atomic': true
          }
        }, [$dismissBtn, this.normalizeSlot('default')]);
        $alert = [$alert];
      }

      return h(BVTransition, {
        props: {
          noFade: !this.fade
        }
      }, $alert);
    }
  });

  var AlertPlugin =
  /*#__PURE__*/
  pluginFactory({
    components: {
      BAlert: BAlert
    }
  });

  var identity = function identity(x) {
    return x;
  };

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

  /**
   * Convert a value to a string that can be rendered.
   */

  var toString$1 = function toString(val) {
    var spaces = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
    return isUndefinedOrNull(val) ? '' : isArray(val) || isPlainObject(val) && val.toString === Object.prototype.toString ? JSON.stringify(val, null, spaces) : String(val);
  };

  var ANCHOR_TAG = 'a'; // Precompile RegExp

  var commaRE = /%2C/g;
  var encodeReserveRE = /[!'()*]/g; // Method to replace reserved chars

  var encodeReserveReplacer = function encodeReserveReplacer(c) {
    return '%' + c.charCodeAt(0).toString(16);
  }; // Fixed encodeURIComponent which is more conformant to RFC3986:
  // - escapes [!'()*]
  // - preserve commas


  var encode = function encode(str) {
    return encodeURIComponent(toString$1(str)).replace(encodeReserveRE, encodeReserveReplacer).replace(commaRE, ',');
  };

  var decode = decodeURIComponent; // Stringifies an object of query parameters
  // See: https://github.com/vuejs/vue-router/blob/dev/src/util/query.js

  var stringifyQueryObj = function stringifyQueryObj(obj) {
    if (!isPlainObject(obj)) {
      return '';
    }

    var query = keys(obj).map(function (key) {
      var val = obj[key];

      if (isUndefined(val)) {
        return '';
      } else if (isNull(val)) {
        return encode(key);
      } else if (isArray(val)) {
        return val.reduce(function (results, val2) {
          if (isNull(val2)) {
            results.push(encode(key));
          } else if (!isUndefined(val2)) {
            // Faster than string interpolation
            results.push(encode(key) + '=' + encode(val2));
          }

          return results;
        }, []).join('&');
      } // Faster than string interpolation


      return encode(key) + '=' + encode(val);
    })
    /* must check for length, as we only want to filter empty strings, not things that look falsey! */
    .filter(function (x) {
      return x.length > 0;
    }).join('&');
    return query ? "?".concat(query) : '';
  };
  var parseQuery = function parseQuery(query) {
    var parsed = {};
    query = toString$1(query).trim().replace(/^(\?|#|&)/, '');

    if (!query) {
      return parsed;
    }

    query.split('&').forEach(function (param) {
      var parts = param.replace(/\+/g, ' ').split('=');
      var key = decode(parts.shift());
      var val = parts.length > 0 ? decode(parts.join('=')) : null;

      if (isUndefined(parsed[key])) {
        parsed[key] = val;
      } else if (isArray(parsed[key])) {
        parsed[key].push(val);
      } else {
        parsed[key] = [parsed[key], val];
      }
    });
    return parsed;
  };
  var isRouterLink = function isRouterLink(tag) {
    return toString$1(tag).toLowerCase() !== ANCHOR_TAG;
  };
  var computeTag = function computeTag() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        to = _ref.to,
        disabled = _ref.disabled;

    var thisOrParent = arguments.length > 1 ? arguments[1] : undefined;
    return thisOrParent.$router && to && !disabled ? thisOrParent.$nuxt ? 'nuxt-link' : 'router-link' : ANCHOR_TAG;
  };
  var computeRel = function computeRel() {
    var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        target = _ref2.target,
        rel = _ref2.rel;

    if (target === '_blank' && isNull(rel)) {
      return 'noopener';
    }

    return rel || null;
  };
  var computeHref = function computeHref() {
    var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        href = _ref3.href,
        to = _ref3.to;

    var tag = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ANCHOR_TAG;
    var fallback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '#';
    var toFallback = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '/';

    // We've already checked the $router in computeTag(), so isRouterLink() indicates a live router.
    // When deferring to Vue Router's router-link, don't use the href attribute at all.
    // We return null, and then remove href from the attributes passed to router-link
    if (isRouterLink(tag)) {
      return null;
    } // Return `href` when explicitly provided


    if (href) {
      return href;
    } // Reconstruct `href` when `to` used, but no router


    if (to) {
      // Fallback to `to` prop (if `to` is a string)
      if (isString(to)) {
        return to || toFallback;
      } // Fallback to `to.path + to.query + to.hash` prop (if `to` is an object)


      if (isPlainObject(to) && (to.path || to.query || to.hash)) {
        var path = toString$1(to.path);
        var query = stringifyQueryObj(to.query);
        var hash = toString$1(to.hash);
        hash = !hash || hash.charAt(0) === '#' ? hash : "#".concat(hash);
        return "".concat(path).concat(query).concat(hash) || toFallback;
      }
    } // If nothing is provided return the fallback


    return fallback;
  };

  /**
   * The Link component is used in many other BV components.
   * As such, sharing its props makes supporting all its features easier.
   * However, some components need to modify the defaults for their own purpose.
   * Prefer sharing a fresh copy of the props to ensure mutations
   * do not affect other component references to the props.
   *
   * https://github.com/vuejs/vue-router/blob/dev/src/components/link.js
   * @return {{}}
   */

  var propsFactory = function propsFactory() {
    return {
      href: {
        type: String,
        default: null
      },
      rel: {
        type: String,
        default: null
      },
      target: {
        type: String,
        default: '_self'
      },
      active: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      // router-link specific props
      to: {
        type: [String, Object],
        default: null
      },
      append: {
        type: Boolean,
        default: false
      },
      replace: {
        type: Boolean,
        default: false
      },
      event: {
        type: [String, Array],
        default: 'click'
      },
      activeClass: {
        type: String // default: undefined

      },
      exact: {
        type: Boolean,
        default: false
      },
      exactActiveClass: {
        type: String // default: undefined

      },
      routerTag: {
        type: String,
        default: 'a'
      },
      // nuxt-link specific prop(s)
      noPrefetch: {
        type: Boolean,
        default: false
      }
    };
  };

  var BLink =
  /*#__PURE__*/
  Vue.extend({
    name: 'BLink',
    mixins: [normalizeSlotMixin],
    inheritAttrs: false,
    props: propsFactory(),
    computed: {
      computedTag: function computedTag() {
        // We don't pass `this` as the first arg as we need reactivity of the props
        return computeTag({
          to: this.to,
          disabled: this.disabled
        }, this);
      },
      isRouterLink: function isRouterLink$1() {
        return isRouterLink(this.computedTag);
      },
      computedRel: function computedRel() {
        // We don't pass `this` as the first arg as we need reactivity of the props
        return computeRel({
          target: this.target,
          rel: this.rel
        });
      },
      computedHref: function computedHref() {
        // We don't pass `this` as the first arg as we need reactivity of the props
        return computeHref({
          to: this.to,
          href: this.href
        }, this.computedTag);
      },
      computedProps: function computedProps() {
        return this.isRouterLink ? _objectSpread2({}, this.$props, {
          tag: this.routerTag
        }) : {};
      }
    },
    methods: {
      onClick: function onClick(evt) {
        var _arguments = arguments;
        var evtIsEvent = isEvent(evt);
        var isRouterLink = this.isRouterLink;
        var suppliedHandler = this.$listeners.click;

        if (evtIsEvent && this.disabled) {
          // Stop event from bubbling up
          evt.stopPropagation(); // Kill the event loop attached to this specific `EventTarget`
          // Needed to prevent `vue-router` for doing it's thing

          evt.stopImmediatePropagation();
        } else {
          /* istanbul ignore next: difficult to test, but we know it works */
          if (isRouterLink && evt.currentTarget.__vue__) {
            // Router links do not emit instance `click` events, so we
            // add in an $emit('click', evt) on it's vue instance
            evt.currentTarget.__vue__.$emit('click', evt);
          } // Call the suppliedHandler(s), if any provided


          concat(suppliedHandler).filter(function (h) {
            return isFunction(h);
          }).forEach(function (handler) {
            handler.apply(void 0, _toConsumableArray(_arguments));
          }); // Emit the global $root click event

          this.$root.$emit('clicked::link', evt);
        } // Stop scroll-to-top behavior or navigation on
        // regular links when href is just '#'


        if (evtIsEvent && (this.disabled || !isRouterLink && this.computedHref === '#')) {
          evt.preventDefault();
        }
      },
      focus: function focus() {
        if (this.$el && this.$el.focus) {
          this.$el.focus();
        }
      },
      blur: function blur() {
        if (this.$el && this.$el.blur) {
          this.$el.blur();
        }
      }
    },
    render: function render(h) {
      var tag = this.computedTag;
      var rel = this.computedRel;
      var href = this.computedHref;
      var isRouterLink = this.isRouterLink;
      var componentData = {
        class: {
          active: this.active,
          disabled: this.disabled
        },
        attrs: _objectSpread2({}, this.$attrs, {
          rel: rel,
          target: this.target,
          tabindex: this.disabled ? '-1' : isUndefined(this.$attrs.tabindex) ? null : this.$attrs.tabindex,
          'aria-disabled': this.disabled ? 'true' : null
        }),
        props: this.computedProps
      }; // Add the event handlers. We must use `navtiveOn` for
      // `<router-link>`/`<nuxt-link>` instead of `on`

      componentData[isRouterLink ? 'nativeOn' : 'on'] = _objectSpread2({}, this.$listeners, {
        // We want to overwrite any click handler since our callback
        // will invoke the user supplied handler(s) if `!this.disabled`
        click: this.onClick
      }); // If href attribute exists on <router-link> (even undefined or null) it fails working on
      // SSR, so we explicitly add it here if needed (i.e. if computedHref() is truthy)

      if (href) {
        componentData.attrs.href = href;
      } else {
        // Ensure the prop HREF does not exist for router links
        delete componentData.props.href;
      }

      return h(tag, componentData, this.normalizeSlot('default'));
    }
  });

  var NAME$2 = 'BBadge';
  var linkProps = propsFactory();
  delete linkProps.href.default;
  delete linkProps.to.default;
  var props$1 = _objectSpread2({}, linkProps, {
    tag: {
      type: String,
      default: 'span'
    },
    variant: {
      type: String,
      default: function _default() {
        return getComponentConfig(NAME$2, 'variant');
      }
    },
    pill: {
      type: Boolean,
      default: false
    }
  }); // @vue/component

  var BBadge =
  /*#__PURE__*/
  Vue.extend({
    name: NAME$2,
    functional: true,
    props: props$1,
    render: function render(h, _ref) {
      var props = _ref.props,
          data = _ref.data,
          children = _ref.children;
      var tag = !props.href && !props.to ? props.tag : BLink;
      var componentData = {
        staticClass: 'badge',
        class: [props.variant ? "badge-".concat(props.variant) : 'badge-secondary', {
          'badge-pill': Boolean(props.pill),
          active: props.active,
          disabled: props.disabled
        }],
        props: pluckProps(linkProps, props)
      };
      return h(tag, a(data, componentData), children);
    }
  });

  var BadgePlugin =
  /*#__PURE__*/
  pluginFactory({
    components: {
      BBadge: BBadge
    }
  });

  var stripTagsRegex = /(<([^>]+)>)/gi; // Removes any thing that looks like an HTML tag from the supplied string

  var stripTags = function stripTags() {
    var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    return String(text).replace(stripTagsRegex, '');
  }; // Generate a domProps object for either innerHTML, textContent or nothing

  var htmlOrText = function htmlOrText(innerHTML, textContent) {
    return innerHTML ? {
      innerHTML: innerHTML
    } : textContent ? {
      textContent: textContent
    } : {};
  };

  var props$2 = _objectSpread2({}, propsFactory(), {
    text: {
      type: String,
      default: null
    },
    html: {
      type: String,
      default: null
    },
    ariaCurrent: {
      type: String,
      default: 'location'
    }
  }); // @vue/component

  var BBreadcrumbLink =
  /*#__PURE__*/
  Vue.extend({
    name: 'BBreadcrumbLink',
    functional: true,
    props: props$2,
    render: function render(h, _ref) {
      var suppliedProps = _ref.props,
          data = _ref.data,
          children = _ref.children;
      var tag = suppliedProps.active ? 'span' : BLink;
      var componentData = {
        props: pluckProps(props$2, suppliedProps)
      };

      if (suppliedProps.active) {
        componentData.attrs = {
          'aria-current': suppliedProps.ariaCurrent
        };
      }

      if (!children) {
        componentData.domProps = htmlOrText(suppliedProps.html, suppliedProps.text);
      }

      return h(tag, a(data, componentData), children);
    }
  });

  var BBreadcrumbItem =
  /*#__PURE__*/
  Vue.extend({
    name: 'BBreadcrumbItem',
    functional: true,
    props: props$2,
    render: function render(h, _ref) {
      var props = _ref.props,
          data = _ref.data,
          children = _ref.children;
      return h('li', a(data, {
        staticClass: 'breadcrumb-item',
        class: {
          active: props.active
        }
      }), [h(BBreadcrumbLink, {
        props: props
      }, children)]);
    }
  });

  var props$3 = {
    items: {
      type: Array,
      default: null
    }
  }; // @vue/component

  var BBreadcrumb =
  /*#__PURE__*/
  Vue.extend({
    name: 'BBreadcrumb',
    functional: true,
    props: props$3,
    render: function render(h, _ref) {
      var props = _ref.props,
          data = _ref.data,
          children = _ref.children;
      var childNodes = children; // Build child nodes from items if given.

      if (isArray(props.items)) {
        var activeDefined = false;
        childNodes = props.items.map(function (item, idx) {
          if (!isObject(item)) {
            item = {
              text: toString$1(item)
            };
          } // Copy the value here so we can normalize it.


          var active = item.active;

          if (active) {
            activeDefined = true;
          }

          if (!active && !activeDefined) {
            // Auto-detect active by position in list.
            active = idx + 1 === props.items.length;
          }

          return h(BBreadcrumbItem, {
            props: _objectSpread2({}, item, {
              active: active
            })
          });
        });
      }

      return h('ol', a(data, {
        staticClass: 'breadcrumb'
      }), childNodes);
    }
  });

  var BreadcrumbPlugin =
  /*#__PURE__*/
  pluginFactory({
    components: {
      BBreadcrumb: BBreadcrumb,
      BBreadcrumbItem: BBreadcrumbItem,
      BBreadcrumbLink: BBreadcrumbLink
    }
  });

  var NAME$3 = 'BButton';
  var btnProps = {
    block: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: function _default() {
        return getComponentConfig(NAME$3, 'size');
      }
    },
    variant: {
      type: String,
      default: function _default() {
        return getComponentConfig(NAME$3, 'variant');
      }
    },
    type: {
      type: String,
      default: 'button'
    },
    tag: {
      type: String,
      default: 'button'
    },
    pill: {
      type: Boolean,
      default: false
    },
    squared: {
      type: Boolean,
      default: false
    },
    pressed: {
      // tri-state prop: true, false or null
      // => on, off, not a toggle
      type: Boolean,
      default: null
    }
  };
  var linkProps$1 = propsFactory();
  delete linkProps$1.href.default;
  delete linkProps$1.to.default;
  var linkPropKeys = keys(linkProps$1);
  var props$4 = _objectSpread2({}, linkProps$1, {}, btnProps); // --- Helper methods ---
  // Focus handler for toggle buttons.  Needs class of 'focus' when focused.

  var handleFocus = function handleFocus(evt) {
    if (evt.type === 'focusin') {
      addClass(evt.target, 'focus');
    } else if (evt.type === 'focusout') {
      removeClass(evt.target, 'focus');
    }
  }; // Is the requested button a link?


  var isLink = function isLink(props) {
    // If tag prop is set to `a`, we use a b-link to get proper disabled handling
    return Boolean(props.href || props.to || props.tag && String(props.tag).toLowerCase() === 'a');
  }; // Is the button to be a toggle button?


  var isToggle = function isToggle(props) {
    return isBoolean(props.pressed);
  }; // Is the button "really" a button?


  var isButton = function isButton(props) {
    if (isLink(props)) {
      return false;
    } else if (props.tag && String(props.tag).toLowerCase() !== 'button') {
      return false;
    }

    return true;
  }; // Is the requested tag not a button or link?


  var isNonStandardTag = function isNonStandardTag(props) {
    return !isLink(props) && !isButton(props);
  }; // Compute required classes (non static classes)


  var computeClass = function computeClass(props) {
    var _ref;

    return ["btn-".concat(props.variant || getComponentConfig(NAME$3, 'variant')), (_ref = {}, _defineProperty(_ref, "btn-".concat(props.size), Boolean(props.size)), _defineProperty(_ref, 'btn-block', props.block), _defineProperty(_ref, 'rounded-pill', props.pill), _defineProperty(_ref, 'rounded-0', props.squared && !props.pill), _defineProperty(_ref, "disabled", props.disabled), _defineProperty(_ref, "active", props.pressed), _ref)];
  }; // Compute the link props to pass to b-link (if required)


  var computeLinkProps = function computeLinkProps(props) {
    return isLink(props) ? pluckProps(linkPropKeys, props) : null;
  }; // Compute the attributes for a button


  var computeAttrs = function computeAttrs(props, data) {
    var button = isButton(props);
    var link = isLink(props);
    var toggle = isToggle(props);
    var nonStdTag = isNonStandardTag(props);
    var role = data.attrs && data.attrs.role ? data.attrs.role : null;
    var tabindex = data.attrs ? data.attrs.tabindex : null;

    if (nonStdTag) {
      tabindex = '0';
    }

    return {
      // Type only used for "real" buttons
      type: button && !link ? props.type : null,
      // Disabled only set on "real" buttons
      disabled: button ? props.disabled : null,
      // We add a role of button when the tag is not a link or button for ARIA.
      // Don't bork any role provided in data.attrs when isLink or isButton
      role: nonStdTag ? 'button' : role,
      // We set the aria-disabled state for non-standard tags
      'aria-disabled': nonStdTag ? String(props.disabled) : null,
      // For toggles, we need to set the pressed state for ARIA
      'aria-pressed': toggle ? String(props.pressed) : null,
      // autocomplete off is needed in toggle mode to prevent some browsers from
      // remembering the previous setting when using the back button.
      autocomplete: toggle ? 'off' : null,
      // Tab index is used when the component is not a button.
      // Links are tabbable, but don't allow disabled, while non buttons or links
      // are not tabbable, so we mimic that functionality by disabling tabbing
      // when disabled, and adding a tabindex of '0' to non buttons or non links.
      tabindex: props.disabled && !button ? '-1' : tabindex
    };
  }; // @vue/component


  var BButton =
  /*#__PURE__*/
  Vue.extend({
    name: NAME$3,
    functional: true,
    props: props$4,
    render: function render(h, _ref2) {
      var props = _ref2.props,
          data = _ref2.data,
          listeners = _ref2.listeners,
          children = _ref2.children;
      var toggle = isToggle(props);
      var link = isLink(props);
      var on = {
        click: function click(evt) {
          /* istanbul ignore if: blink/button disabled should handle this */
          if (props.disabled && isEvent(evt)) {
            evt.stopPropagation();
            evt.preventDefault();
          } else if (toggle && listeners && listeners['update:pressed']) {
            // Send .sync updates to any "pressed" prop (if .sync listeners)
            // Concat will normalize the value to an array
            // without double wrapping an array value in an array.
            concat(listeners['update:pressed']).forEach(function (fn) {
              if (isFunction(fn)) {
                fn(!props.pressed);
              }
            });
          }
        }
      };

      if (toggle) {
        on.focusin = handleFocus;
        on.focusout = handleFocus;
      }

      var componentData = {
        staticClass: 'btn',
        class: computeClass(props),
        props: computeLinkProps(props),
        attrs: computeAttrs(props, data),
        on: on
      };
      return h(link ? BLink : props.tag, a(data, componentData), children);
    }
  });

  var ButtonPlugin =
  /*#__PURE__*/
  pluginFactory({
    components: {
      BButton: BButton,
      BBtn: BButton,
      BButtonClose: BButtonClose,
      BBtnClose: BButtonClose
    }
  });

  var NAME$4 = 'BButtonGroup';
  var props$5 = {
    vertical: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: function _default() {
        return getComponentConfig('BButton', 'size');
      }
    },
    tag: {
      type: String,
      default: 'div'
    },
    ariaRole: {
      type: String,
      default: 'group'
    }
  }; // @vue/component

  var BButtonGroup =
  /*#__PURE__*/
  Vue.extend({
    name: NAME$4,
    functional: true,
    props: props$5,
    render: function render(h, _ref) {
      var props = _ref.props,
          data = _ref.data,
          children = _ref.children;
      return h(props.tag, a(data, {
        class: _defineProperty({
          'btn-group': !props.vertical,
          'btn-group-vertical': props.vertical
        }, "btn-group-".concat(props.size), Boolean(props.size)),
        attrs: {
          role: props.ariaRole
        }
      }), children);
    }
  });

  var ButtonGroupPlugin =
  /*#__PURE__*/
  pluginFactory({
    components: {
      BButtonGroup: BButtonGroup,
      BBtnGroup: BButtonGroup
    }
  });

  /*
   * Key Codes (events)
   */
  var KEY_CODES = {
    SPACE: 32,
    ENTER: 13,
    ESC: 27,
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    PAGEUP: 33,
    PAGEDOWN: 34,
    HOME: 36,
    END: 35,
    TAB: 9,
    SHIFT: 16,
    CTRL: 17,
    BACKSPACE: 8,
    ALT: 18,
    PAUSE: 19,
    BREAK: 19,
    INSERT: 45,
    INS: 45,
    DELETE: 46
  };

  var ITEM_SELECTOR = ['.btn:not(.disabled):not([disabled]):not(.dropdown-item)', '.form-control:not(.disabled):not([disabled])', 'select:not(.disabled):not([disabled])', 'input[type="checkbox"]:not(.disabled)', 'input[type="radio"]:not(.disabled)'].join(','); // @vue/component

  var BButtonToolbar =
  /*#__PURE__*/
  Vue.extend({
    name: 'BButtonToolbar',
    mixins: [normalizeSlotMixin],
    props: {
      justify: {
        type: Boolean,
        default: false
      },
      keyNav: {
        type: Boolean,
        default: false
      }
    },
    mounted: function mounted() {
      if (this.keyNav) {
        // Pre-set the tabindexes if the markup does not include tabindex="-1" on the toolbar items
        this.getItems();
      }
    },
    methods: {
      onFocusin: function onFocusin(evt) {
        if (evt.target === this.$el) {
          evt.preventDefault();
          evt.stopPropagation();
          this.focusFirst(evt);
        }
      },
      stop: function stop(evt) {
        evt.preventDefault();
        evt.stopPropagation();
      },
      onKeydown: function onKeydown(evt) {
        if (!this.keyNav) {
          /* istanbul ignore next: should never happen */
          return;
        }

        var key = evt.keyCode;
        var shift = evt.shiftKey;

        if (key === KEY_CODES.UP || key === KEY_CODES.LEFT) {
          this.stop(evt);
          shift ? this.focusFirst(evt) : this.focusPrev(evt);
        } else if (key === KEY_CODES.DOWN || key === KEY_CODES.RIGHT) {
          this.stop(evt);
          shift ? this.focusLast(evt) : this.focusNext(evt);
        }
      },
      setItemFocus: function setItemFocus(item) {
        item && item.focus && item.focus();
      },
      focusFirst: function focusFirst(evt) {
        var items = this.getItems();
        this.setItemFocus(items[0]);
      },
      focusPrev: function focusPrev(evt) {
        var items = this.getItems();
        var index = items.indexOf(evt.target);

        if (index > -1) {
          items = items.slice(0, index).reverse();
          this.setItemFocus(items[0]);
        }
      },
      focusNext: function focusNext(evt) {
        var items = this.getItems();
        var index = items.indexOf(evt.target);

        if (index > -1) {
          items = items.slice(index + 1);
          this.setItemFocus(items[0]);
        }
      },
      focusLast: function focusLast(evt) {
        var items = this.getItems().reverse();
        this.setItemFocus(items[0]);
      },
      getItems: function getItems() {
        var items = selectAll(ITEM_SELECTOR, this.$el);
        items.forEach(function (item) {
          // Ensure tabfocus is -1 on any new elements
          item.tabIndex = -1;
        });
        return items.filter(function (el) {
          return isVisible(el);
        });
      }
    },
    render: function render(h) {
      return h('div', {
        staticClass: 'btn-toolbar',
        class: {
          'justify-content-between': this.justify
        },
        attrs: {
          role: 'toolbar',
          tabindex: this.keyNav ? '0' : null
        },
        on: this.keyNav ? {
          focusin: this.onFocusin,
          keydown: this.onKeydown
        } : {}
      }, [this.normalizeSlot('default')]);
    }
  });

  var ButtonToolbarPlugin =
  /*#__PURE__*/
  pluginFactory({
    components: {
      BButtonToolbar: BButtonToolbar,
      BBtnToolbar: BButtonToolbar
    }
  });

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

  /**
   * @param {string} prefix
   * @param {string} value
   */

  var prefixPropName = function prefixPropName(prefix, value) {
    return prefix + upperFirst(value);
  };

  /**
   * @param {string} str
   */
  var lowerFirst = function lowerFirst(str) {
    str = String(str);
    return str.charAt(0).toLowerCase() + str.slice(1);
  };

  /**
   * @param {string} prefix
   * @param {string} value
   */

  var unprefixPropName = function unprefixPropName(prefix, value) {
    return lowerFirst(value.replace(prefix, ''));
  };

  /**
   * Copies props from one array/object to a new array/object. Prop values
   * are also cloned as new references to prevent possible mutation of original
   * prop object values. Optionally accepts a function to transform the prop name.
   *
   * @param {[]|{}} props
   * @param {Function} transformFn
   */

  var copyProps = function copyProps(props) {
    var transformFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : identity;

    if (isArray(props)) {
      return props.map(transformFn);
    } // Props as an object.


    var copied = {};

    for (var prop in props) {
      /* istanbul ignore else */
      // eslint-disable-next-line no-prototype-builtins
      if (props.hasOwnProperty(prop)) {
        // If the prop value is an object, do a shallow clone to prevent
        // potential mutations to the original object.
        copied[transformFn(prop)] = isObject(props[prop]) ? clone(props[prop]) : props[prop];
      }
    }

    return copied;
  };

  // @vue/component
  var cardMixin = {
    props: {
      tag: {
        type: String,
        default: 'div'
      },
      bgVariant: {
        type: String,
        default: null
      },
      borderVariant: {
        type: String,
        default: null
      },
      textVariant: {
        type: String,
        default: null
      }
    }
  };

  var props$6 = {
    title: {
      type: String,
      default: ''
    },
    titleTag: {
      type: String,
      default: 'h4'
    }
  }; // @vue/component

  var BCardTitle =
  /*#__PURE__*/
  Vue.extend({
    name: 'BCardTitle',
    functional: true,
    props: props$6,
    render: function render(h, _ref) {
      var props = _ref.props,
          data = _ref.data,
          children = _ref.children;
      return h(props.titleTag, a(data, {
        staticClass: 'card-title'
      }), children || props.title);
    }
  });

  var NAME$5 = 'BCardSubTitle';
  var props$7 = {
    subTitle: {
      type: String,
      default: ''
    },
    subTitleTag: {
      type: String,
      default: 'h6'
    },
    subTitleTextVariant: {
      type: String,
      default: function _default() {
        return getComponentConfig(NAME$5, 'subTitleTextVariant');
      }
    }
  }; // @vue/component

  var BCardSubTitle =
  /*#__PURE__*/
  Vue.extend({
    name: NAME$5,
    functional: true,
    props: props$7,
    render: function render(h, _ref) {
      var props = _ref.props,
          data = _ref.data,
          children = _ref.children;
      return h(props.subTitleTag, a(data, {
        staticClass: 'card-subtitle',
        class: [props.subTitleTextVariant ? "text-".concat(props.subTitleTextVariant) : null]
      }), children || props.subTitle);
    }
  });

  var props$8 = _objectSpread2({}, copyProps(cardMixin.props, prefixPropName.bind(null, 'body')), {
    bodyClass: {
      type: [String, Object, Array],
      default: null
    }
  }, props$6, {}, props$7, {
    overlay: {
      type: Boolean,
      default: false
    }
  }); // @vue/component

  var BCardBody =
  /*#__PURE__*/
  Vue.extend({
    name: 'BCardBody',
    functional: true,
    props: props$8,
    render: function render(h, _ref) {
      var _ref2;

      var props = _ref.props,
          data = _ref.data,
          children = _ref.children;
      var cardTitle = h();
      var cardSubTitle = h();
      var cardContent = children || [h()];

      if (props.title) {
        cardTitle = h(BCardTitle, {
          props: pluckProps(props$6, props)
        });
      }

      if (props.subTitle) {
        cardSubTitle = h(BCardSubTitle, {
          props: pluckProps(props$7, props),
          class: ['mb-2']
        });
      }

      return h(props.bodyTag, a(data, {
        staticClass: 'card-body',
        class: [(_ref2 = {
          'card-img-overlay': props.overlay
        }, _defineProperty(_ref2, "bg-".concat(props.bodyBgVariant), Boolean(props.bodyBgVariant)), _defineProperty(_ref2, "border-".concat(props.bodyBorderVariant), Boolean(props.bodyBorderVariant)), _defineProperty(_ref2, "text-".concat(props.bodyTextVariant), Boolean(props.bodyTextVariant)), _ref2), props.bodyClass || {}]
      }), [cardTitle, cardSubTitle].concat(_toConsumableArray(cardContent)));
    }
  });

  var props$9 = _objectSpread2({}, copyProps(cardMixin.props, prefixPropName.bind(null, 'header')), {
    header: {
      type: String,
      default: null
    },
    headerHtml: {
      type: String,
      default: null
    },
    headerClass: {
      type: [String, Object, Array],
      default: null
    }
  }); // @vue/component

  var BCardHeader =
  /*#__PURE__*/
  Vue.extend({
    name: 'BCardHeader',
    functional: true,
    props: props$9,
    render: function render(h, _ref) {
      var _ref2;

      var props = _ref.props,
          data = _ref.data,
          children = _ref.children;
      return h(props.headerTag, a(data, {
        staticClass: 'card-header',
        class: [props.headerClass, (_ref2 = {}, _defineProperty(_ref2, "bg-".concat(props.headerBgVariant), Boolean(props.headerBgVariant)), _defineProperty(_ref2, "border-".concat(props.headerBorderVariant), Boolean(props.headerBorderVariant)), _defineProperty(_ref2, "text-".concat(props.headerTextVariant), Boolean(props.headerTextVariant)), _ref2)]
      }), children || [h('div', {
        domProps: htmlOrText(props.headerHtml, props.header)
      })]);
    }
  });

  var props$a = _objectSpread2({}, copyProps(cardMixin.props, prefixPropName.bind(null, 'footer')), {
    footer: {
      type: String,
      default: null
    },
    footerHtml: {
      type: String,
      default: null
    },
    footerClass: {
      type: [String, Object, Array],
      default: null
    }
  }); // @vue/component

  var BCardFooter =
  /*#__PURE__*/
  Vue.extend({
    name: 'BCardFooter',
    functional: true,
    props: props$a,
    render: function render(h, _ref) {
      var _ref2;

      var props = _ref.props,
          data = _ref.data,
          children = _ref.children;
      return h(props.footerTag, a(data, {
        staticClass: 'card-footer',
        class: [props.footerClass, (_ref2 = {}, _defineProperty(_ref2, "bg-".concat(props.footerBgVariant), Boolean(props.footerBgVariant)), _defineProperty(_ref2, "border-".concat(props.footerBorderVariant), Boolean(props.footerBorderVariant)), _defineProperty(_ref2, "text-".concat(props.footerTextVariant), Boolean(props.footerTextVariant)), _ref2)]
      }), children || [h('div', {
        domProps: htmlOrText(props.footerHtml, props.footer)
      })]);
    }
  });

  var props$b = {
    src: {
      type: String,
      default: null,
      required: true
    },
    alt: {
      type: String,
      default: null
    },
    top: {
      type: Boolean,
      default: false
    },
    bottom: {
      type: Boolean,
      default: false
    },
    start: {
      type: Boolean,
      default: false
    },
    left: {
      // alias of 'start'
      type: Boolean,
      default: false
    },
    end: {
      type: Boolean,
      default: false
    },
    right: {
      // alias of 'end'
      type: Boolean,
      default: false
    },
    height: {
      type: [Number, String],
      default: null
    },
    width: {
      type: [Number, String],
      default: null
    }
  }; // @vue/component

  var BCardImg =
  /*#__PURE__*/
  Vue.extend({
    name: 'BCardImg',
    functional: true,
    props: props$b,
    render: function render(h, _ref) {
      var props = _ref.props,
          data = _ref.data;
      var baseClass = 'card-img';

      if (props.top) {
        baseClass += '-top';
      } else if (props.right || props.end) {
        baseClass += '-right';
      } else if (props.bottom) {
        baseClass += '-bottom';
      } else if (props.left || props.start) {
        baseClass += '-left';
      }

      return h('img', a(data, {
        class: [baseClass],
        attrs: {
          src: props.src,
          alt: props.alt,
          height: props.height,
          width: props.width
        }
      }));
    }
  });

  var cardImgProps = copyProps(props$b, prefixPropName.bind(null, 'img'));
  cardImgProps.imgSrc.required = false;
  var props$c = _objectSpread2({}, props$8, {}, props$9, {}, props$a, {}, cardImgProps, {}, copyProps(cardMixin.props), {
    align: {
      type: String,
      default: null
    },
    noBody: {
      type: Boolean,
      default: false
    }
  }); // @vue/component

  var BCard =
  /*#__PURE__*/
  Vue.extend({
    name: 'BCard',
    functional: true,
    props: props$c,
    render: function render(h, _ref) {
      var _class;

      var props = _ref.props,
          data = _ref.data,
          slots = _ref.slots,
          scopedSlots = _ref.scopedSlots;
      var $slots = slots(); // Vue < 2.6.x may return undefined for scopedSlots

      var $scopedSlots = scopedSlots || {}; // Create placeholder elements for each section

      var imgFirst = h();
      var header = h();
      var content = h();
      var footer = h();
      var imgLast = h();

      if (props.imgSrc) {
        var img = h(BCardImg, {
          props: pluckProps(cardImgProps, props, unprefixPropName.bind(null, 'img'))
        });

        if (props.imgBottom) {
          imgLast = img;
        } else {
          imgFirst = img;
        }
      }

      if (props.header || hasNormalizedSlot('header', $scopedSlots, $slots)) {
        header = h(BCardHeader, {
          props: pluckProps(props$9, props)
        }, normalizeSlot('header', {}, $scopedSlots, $slots));
      }

      content = normalizeSlot('default', {}, $scopedSlots, $slots) || [];

      if (!props.noBody) {
        // Wrap content in card-body
        content = [h(BCardBody, {
          props: pluckProps(props$8, props)
        }, _toConsumableArray(content))];
      }

      if (props.footer || hasNormalizedSlot('footer', $scopedSlots, $slots)) {
        footer = h(BCardFooter, {
          props: pluckProps(props$a, props)
        }, normalizeSlot('footer', {}, $scopedSlots, $slots));
      }

      return h(props.tag, a(data, {
        staticClass: 'card',
        class: (_class = {
          'flex-row': props.imgLeft || props.imgStart,
          'flex-row-reverse': (props.imgRight || props.imgEnd) && !(props.imgLeft || props.imgStart)
        }, _defineProperty(_class, "text-".concat(props.align), Boolean(props.align)), _defineProperty(_class, "bg-".concat(props.bgVariant), Boolean(props.bgVariant)), _defineProperty(_class, "border-".concat(props.borderVariant), Boolean(props.borderVariant)), _defineProperty(_class, "text-".concat(props.textVariant), Boolean(props.textVariant)), _class)
      }), [imgFirst, header].concat(_toConsumableArray(content), [footer, imgLast]));
    }
  });

  // Handles when arrays are "sparse" (array.every(...) doesn't handle sparse)

  var compareArrays = function compareArrays(a, b) {
    if (a.length !== b.length) {
      return false;
    }

    var equal = true;

    for (var i = 0; equal && i < a.length; i++) {
      equal = looseEqual(a[i], b[i]);
    }

    return equal;
  };
  /**
   * Check if two values are loosely equal - that is,
   * if they are plain objects, do they have the same shape?
   * Returns boolean true or false
   */


  var looseEqual = function looseEqual(a, b) {
    if (a === b) {
      return true;
    }

    var aValidType = isDate(a);
    var bValidType = isDate(b);

    if (aValidType || bValidType) {
      return aValidType && bValidType ? a.getTime() === b.getTime() : false;
    }

    aValidType = isArray(a);
    bValidType = isArray(b);

    if (aValidType || bValidType) {
      return aValidType && bValidType ? compareArrays(a, b) : false;
    }

    aValidType = isObject(a);
    bValidType = isObject(b);

    if (aValidType || bValidType) {
      /* istanbul ignore if: this if will probably never be called */
      if (!aValidType || !bValidType) {
        return false;
      }

      var aKeysCount = keys(a).length;
      var bKeysCount = keys(b).length;

      if (aKeysCount !== bKeysCount) {
        return false;
      }

      for (var key in a) {
        // eslint-disable-next-line no-prototype-builtins
        var aHasKey = a.hasOwnProperty(key); // eslint-disable-next-line no-prototype-builtins

        var bHasKey = b.hasOwnProperty(key);

        if (aHasKey && !bHasKey || !aHasKey && bHasKey || !looseEqual(a[key], b[key])) {
          return false;
        }
      }
    }

    return String(a) === String(b);
  };

  var OBSERVER_PROP_NAME = '__bv__visibility_observer';

  var VisibilityObserver =
  /*#__PURE__*/
  function () {
    function VisibilityObserver(el, options, vnode) {
      _classCallCheck(this, VisibilityObserver);

      this.el = el;
      this.callback = options.callback;
      this.margin = options.margin || 0;
      this.once = options.once || false;
      this.observer = null;
      this.visible = undefined;
      this.doneOnce = false; // Create the observer instance (if possible)

      this.createObserver(vnode);
    }

    _createClass(VisibilityObserver, [{
      key: "createObserver",
      value: function createObserver(vnode) {
        var _this = this;

        // Remove any previous observer
        if (this.observer) {
          /* istanbul ignore next */
          this.stop();
        } // Should only be called once and `callback` prop should be a function


        if (this.doneOnce || !isFunction(this.callback)) {
          /* istanbul ignore next */
          return;
        } // Create the observer instance


        try {
          // Future: Possibly add in other modifiers for left/right/top/bottom
          // offsets, root element reference, and thresholds
          this.observer = new IntersectionObserver(this.handler.bind(this), {
            // `null` = 'viewport'
            root: null,
            // Pixels away from view port to consider "visible"
            rootMargin: this.margin,
            // Intersection ratio of el and root (as a value from 0 to 1)
            threshold: 0
          });
        } catch (_unused) {
          // No IntersectionObserver support, so just stop trying to observe
          this.doneOnce = true;
          this.observer = undefined;
          this.callback(null);
          return;
        } // Start observing in a `$nextTick()` (to allow DOM to complete rendering)

        /* istanbul ignore next: IntersectionObserver not supported in JSDOM */


        vnode.context.$nextTick(function () {
          requestAF(function () {
            // Placed in an `if` just in case we were destroyed before
            // this `requestAnimationFrame` runs
            if (_this.observer) {
              _this.observer.observe(_this.el);
            }
          });
        });
      }
    }, {
      key: "handler",
      value: function handler(entries)
      /* istanbul ignore next: IntersectionObserver not supported in JSDOM */
      {
        var entry = entries ? entries[0] : {};
        var isIntersecting = Boolean(entry.isIntersecting || entry.intersectionRatio > 0.0);

        if (isIntersecting !== this.visible) {
          this.visible = isIntersecting;
          this.callback(isIntersecting);

          if (this.once && this.visible) {
            this.doneOnce = true;
            this.stop();
          }
        }
      }
    }, {
      key: "stop",
      value: function stop() {
        var observer = this.observer;
        /* istanbul ignore next */

        if (observer && observer.disconnect) {
          observer.disconnect();
        }

        this.observer = null;
      }
    }]);

    return VisibilityObserver;
  }();

  var destroy = function destroy(el) {
    var observer = el[OBSERVER_PROP_NAME];

    if (observer && observer.stop) {
      observer.stop();
    }

    delete el[OBSERVER_PROP_NAME];
  };

  var bind = function bind(el, _ref, vnode) {
    var value = _ref.value,
        modifiers = _ref.modifiers;
    // `value` is the callback function
    var options = {
      margin: '0px',
      once: false,
      callback: value
    }; // Parse modifiers

    keys(modifiers).forEach(function (mod) {
      /* istanbul ignore else: Until <b-img-lazy> is switched to use this directive */
      if (/^\d+$/.test(mod)) {
        options.margin = "".concat(mod, "px");
      } else if (mod.toLowerCase() === 'once') {
        options.once = true;
      }
    }); // Destroy any previous observer

    destroy(el); // Create new observer

    el[OBSERVER_PROP_NAME] = new VisibilityObserver(el, options, vnode); // Store the current modifiers on the object (cloned)

    el[OBSERVER_PROP_NAME]._prevModifiers = clone(modifiers);
  }; // When the directive options may have been updated (or element)


  var componentUpdated = function componentUpdated(el, _ref2, vnode) {
    var value = _ref2.value,
        oldValue = _ref2.oldValue,
        modifiers = _ref2.modifiers;
    // Compare value/oldValue and modifiers to see if anything has changed
    // and if so, destroy old observer and create new observer

    /* istanbul ignore next */
    modifiers = clone(modifiers);
    /* istanbul ignore next */

    if (el && (value !== oldValue || !el[OBSERVER_PROP_NAME] || !looseEqual(modifiers, el[OBSERVER_PROP_NAME]._prevModifiers))) {
      // Re-bind on element
      bind(el, {
        value: value,
        modifiers: modifiers
      }, vnode);
    }
  }; // When directive un-binds from element


  var unbind = function unbind(el) {
    // Remove the observer
    destroy(el);
  }; // Export the directive


  var VBVisible = {
    bind: bind,
    componentUpdated: componentUpdated,
    unbind: unbind
  };

  var NAME$6 = 'BImg'; // Blank image with fill template

  var BLANK_TEMPLATE = '<svg width="%{w}" height="%{h}" ' + 'xmlns="http://www.w3.org/2000/svg" ' + 'viewBox="0 0 %{w} %{h}" preserveAspectRatio="none">' + '<rect width="100%" height="100%" style="fill:%{f};"></rect>' + '</svg>';
  var props$d = {
    src: {
      type: String,
      default: null
    },
    srcset: {
      type: [String, Array],
      default: null
    },
    sizes: {
      type: [String, Array],
      default: null
    },
    alt: {
      type: String,
      default: null
    },
    width: {
      type: [Number, String],
      default: null
    },
    height: {
      type: [Number, String],
      default: null
    },
    block: {
      type: Boolean,
      default: false
    },
    fluid: {
      type: Boolean,
      default: false
    },
    fluidGrow: {
      // Gives fluid images class `w-100` to make them grow to fit container
      type: Boolean,
      default: false
    },
    rounded: {
      // rounded can be:
      //   false: no rounding of corners
      //   true: slightly rounded corners
      //   'top': top corners rounded
      //   'right': right corners rounded
      //   'bottom': bottom corners rounded
      //   'left': left corners rounded
      //   'circle': circle/oval
      //   '0': force rounding off
      type: [Boolean, String],
      default: false
    },
    thumbnail: {
      type: Boolean,
      default: false
    },
    left: {
      type: Boolean,
      default: false
    },
    right: {
      type: Boolean,
      default: false
    },
    center: {
      type: Boolean,
      default: false
    },
    blank: {
      type: Boolean,
      default: false
    },
    blankColor: {
      type: String,
      default: function _default() {
        return getComponentConfig(NAME$6, 'blankColor');
      }
    }
  }; // --- Helper methods ---

  var makeBlankImgSrc = function makeBlankImgSrc(width, height, color) {
    var src = encodeURIComponent(BLANK_TEMPLATE.replace('%{w}', String(width)).replace('%{h}', String(height)).replace('%{f}', color));
    return "data:image/svg+xml;charset=UTF-8,".concat(src);
  }; // @vue/component


  var BImg =
  /*#__PURE__*/
  Vue.extend({
    name: NAME$6,
    functional: true,
    props: props$d,
    render: function render(h, _ref) {
      var _class;

      var props = _ref.props,
          data = _ref.data;
      var src = props.src;
      var width = parseInt(props.width, 10) ? parseInt(props.width, 10) : null;
      var height = parseInt(props.height, 10) ? parseInt(props.height, 10) : null;
      var align = null;
      var block = props.block;
      var srcset = concat(props.srcset).filter(Boolean).join(',');
      var sizes = concat(props.sizes).filter(Boolean).join(',');

      if (props.blank) {
        if (!height && Boolean(width)) {
          height = width;
        } else if (!width && Boolean(height)) {
          width = height;
        }

        if (!width && !height) {
          width = 1;
          height = 1;
        } // Make a blank SVG image


        src = makeBlankImgSrc(width, height, props.blankColor || 'transparent'); // Disable srcset and sizes

        srcset = null;
        sizes = null;
      }

      if (props.left) {
        align = 'float-left';
      } else if (props.right) {
        align = 'float-right';
      } else if (props.center) {
        align = 'mx-auto';
        block = true;
      }

      return h('img', a(data, {
        attrs: {
          src: src,
          alt: props.alt,
          width: width ? String(width) : null,
          height: height ? String(height) : null,
          srcset: srcset || null,
          sizes: sizes || null
        },
        class: (_class = {
          'img-thumbnail': props.thumbnail,
          'img-fluid': props.fluid || props.fluidGrow,
          'w-100': props.fluidGrow,
          rounded: props.rounded === '' || props.rounded === true
        }, _defineProperty(_class, "rounded-".concat(props.rounded), isString(props.rounded) && props.rounded !== ''), _defineProperty(_class, align, Boolean(align)), _defineProperty(_class, 'd-block', block), _class)
      }));
    }
  });

  var NAME$7 = 'BImgLazy';
  var props$e = {
    src: {
      type: String,
      default: null,
      required: true
    },
    srcset: {
      type: [String, Array],
      default: null
    },
    sizes: {
      type: [String, Array],
      default: null
    },
    alt: {
      type: String,
      default: null
    },
    width: {
      type: [Number, String],
      default: null
    },
    height: {
      type: [Number, String],
      default: null
    },
    blankSrc: {
      // If null, a blank image is generated
      type: String,
      default: null
    },
    blankColor: {
      type: String,
      default: function _default() {
        return getComponentConfig(NAME$7, 'blankColor');
      }
    },
    blankWidth: {
      type: [Number, String],
      default: null
    },
    blankHeight: {
      type: [Number, String],
      default: null
    },
    show: {
      type: Boolean,
      default: false
    },
    fluid: {
      type: Boolean,
      default: false
    },
    fluidGrow: {
      type: Boolean,
      default: false
    },
    block: {
      type: Boolean,
      default: false
    },
    thumbnail: {
      type: Boolean,
      default: false
    },
    rounded: {
      type: [Boolean, String],
      default: false
    },
    left: {
      type: Boolean,
      default: false
    },
    right: {
      type: Boolean,
      default: false
    },
    center: {
      type: Boolean,
      default: false
    },
    offset: {
      // Distance away from viewport (in pixels) before being
      // considered "visible"
      type: [Number, String],
      default: 360
    }
  }; // @vue/component

  var BImgLazy =
  /*#__PURE__*/
  Vue.extend({
    name: NAME$7,
    directives: {
      bVisible: VBVisible
    },
    props: props$e,
    data: function data() {
      return {
        isShown: this.show
      };
    },
    computed: {
      computedSrc: function computedSrc() {
        return !this.blankSrc || this.isShown ? this.src : this.blankSrc;
      },
      computedBlank: function computedBlank() {
        return !(this.isShown || this.blankSrc);
      },
      computedWidth: function computedWidth() {
        return this.isShown ? this.width : this.blankWidth || this.width;
      },
      computedHeight: function computedHeight() {
        return this.isShown ? this.height : this.blankHeight || this.height;
      },
      computedSrcset: function computedSrcset() {
        var srcset = concat(this.srcset).filter(Boolean).join(',');
        return !this.blankSrc || this.isShown ? srcset : null;
      },
      computedSizes: function computedSizes() {
        var sizes = concat(this.sizes).filter(Boolean).join(',');
        return !this.blankSrc || this.isShown ? sizes : null;
      }
    },
    watch: {
      show: function show(newVal, oldVal) {
        if (newVal !== oldVal) {
          // If IntersectionObserver support is not available, image is always shown
          var visible = hasIntersectionObserverSupport ? newVal : true;
          this.isShown = visible;

          if (visible !== newVal) {
            // Ensure the show prop is synced (when no IntersectionObserver)
            this.$nextTick(this.updateShowProp);
          }
        }
      },
      isShown: function isShown(newVal, oldVal) {
        if (newVal !== oldVal) {
          // Update synched show prop
          this.updateShowProp();
        }
      }
    },
    mounted: function mounted() {
      // If IntersectionObserver is not available, image is always shown
      this.isShown = hasIntersectionObserverSupport ? this.show : true;
    },
    methods: {
      updateShowProp: function updateShowProp() {
        this.$emit('update:show', this.isShown);
      },
      doShow: function doShow(visible) {
        // If IntersectionObserver is not supported, the callback
        // will be called with `null` rather than `true` or `false`
        if ((visible || visible === null) && !this.isShown) {
          this.isShown = true;
        }
      }
    },
    render: function render(h) {
      var directives = [];

      if (!this.isShown) {
        var _modifiers;

        // We only add the visible directive if we are not shown
        directives.push({
          // Visible directive will silently do nothing if
          // IntersectionObserver is not supported
          name: 'b-visible',
          // Value expects a callback (passed one arg of `visible` = `true` or `false`)
          value: this.doShow,
          modifiers: (_modifiers = {}, _defineProperty(_modifiers, "".concat(parseInt(this.offset, 10) || 0), true), _defineProperty(_modifiers, "once", true), _modifiers)
        });
      }

      return h(BImg, {
        directives: directives,
        props: {
          // Computed value props
          src: this.computedSrc,
          blank: this.computedBlank,
          width: this.computedWidth,
          height: this.computedHeight,
          srcset: this.computedSrcset || null,
          sizes: this.computedSizes || null,
          // Passthrough props
          alt: this.alt,
          blankColor: this.blankColor,
          fluid: this.fluid,
          fluidGrow: this.fluidGrow,
          block: this.block,
          thumbnail: this.thumbnail,
          rounded: this.rounded,
          left: this.left,
          right: this.right,
          center: this.center
        }
      });
    }
  });

  // The `omit()` util creates a new object, so we can just pass the original props

  var lazyProps = omit(props$e, ['left', 'right', 'center', 'block', 'rounded', 'thumbnail', 'fluid', 'fluidGrow']);
  var props$f = _objectSpread2({}, lazyProps, {
    top: {
      type: Boolean,
      default: false
    },
    bottom: {
      type: Boolean,
      default: false
    },
    start: {
      type: Boolean,
      default: false
    },
    left: {
      // alias of 'start'
      type: Boolean,
      default: false
    },
    end: {
      type: Boolean,
      default: false
    },
    right: {
      // alias of 'end'
      type: Boolean,
      default: false
    }
  }); // @vue/component

  var BCardImgLazy =
  /*#__PURE__*/
  Vue.extend({
    name: 'BCardImgLazy',
    functional: true,
    props: props$f,
    render: function render(h, _ref) {
      var props = _ref.props,
          data = _ref.data;
      var baseClass = 'card-img';

      if (props.top) {
        baseClass += '-top';
      } else if (props.right || props.end) {
        baseClass += '-right';
      } else if (props.bottom) {
        baseClass += '-bottom';
      } else if (props.left || props.start) {
        baseClass += '-left';
      } // False out the left/center/right props before passing to b-img-lazy


      var lazyProps = _objectSpread2({}, props, {
        left: false,
        right: false,
        center: false
      });

      return h(BImgLazy, a(data, {
        class: [baseClass],
        props: lazyProps
      }));
    }
  });

  var props$g = {
    textTag: {
      type: String,
      default: 'p'
    }
  }; // @vue/component

  var BCardText =
  /*#__PURE__*/
  Vue.extend({
    name: 'BCardText',
    functional: true,
    props: props$g,
    render: function render(h, _ref) {
      var props = _ref.props,
          data = _ref.data,
          children = _ref.children;
      return h(props.textTag, a(data, {
        staticClass: 'card-text'
      }), children);
    }
  });

  var props$h = {
    tag: {
      type: String,
      default: 'div'
    },
    deck: {
      type: Boolean,
      default: false
    },
    columns: {
      type: Boolean,
      default: false
    }
  }; // @vue/component

  var BCardGroup =
  /*#__PURE__*/
  Vue.extend({
    name: 'BCardGroup',
    functional: true,
    props: props$h,
    render: function render(h, _ref) {
      var props = _ref.props,
          data = _ref.data,
          children = _ref.children;
      var baseClass = 'card-group';

      if (props.deck) {
        baseClass = 'card-deck';
      } else if (props.columns) {
        baseClass = 'card-columns';
      }

      return h(props.tag, a(data, {
        class: baseClass
      }), children);
    }
  });

  var CardPlugin =
  /*#__PURE__*/
  pluginFactory({
    components: {
      BCard: BCard,
      BCardHeader: BCardHeader,
      BCardBody: BCardBody,
      BCardTitle: BCardTitle,
      BCardSubTitle: BCardSubTitle,
      BCardFooter: BCardFooter,
      BCardImg: BCardImg,
      BCardImgLazy: BCardImgLazy,
      BCardText: BCardText,
      BCardGroup: BCardGroup
    }
  });

  var noop = function noop() {};

  /**
   * Observe a DOM element changes, falls back to eventListener mode
   * @param {Element} el The DOM element to observe
   * @param {Function} callback callback to be called on change
   * @param {object} [opts={childList: true, subtree: true}] observe options
   * @see http://stackoverflow.com/questions/3219758
   */

  var observeDom = function observeDom(el, callback, opts)
  /* istanbul ignore next: difficult to test in JSDOM */
  {
    // Handle cases where we might be passed a Vue instance
    el = el ? el.$el || el : null; // Early exit when we have no element

    /* istanbul ignore next: difficult to test in JSDOM */

    if (!isElement(el)) {
      return null;
    } // Exit and throw a warning when `MutationObserver` isn't available


    if (warnNoMutationObserverSupport('observeDom')) {
      return null;
    } // Define a new observer


    var obs = new MutationObs(function (mutations) {
      var changed = false; // A mutation can contain several change records, so we loop
      // through them to see what has changed
      // We break out of the loop early if any "significant" change
      // has been detected

      for (var i = 0; i < mutations.length && !changed; i++) {
        // The mutation record
        var mutation = mutations[i]; // Mutation type

        var type = mutation.type; // DOM node (could be any DOM node type - HTMLElement, Text, comment, etc.)

        var target = mutation.target; // Detect whether a change happened based on type and target

        if (type === 'characterData' && target.nodeType === Node.TEXT_NODE) {
          // We ignore nodes that are not TEXT (i.e. comments, etc)
          // as they don't change layout
          changed = true;
        } else if (type === 'attributes') {
          changed = true;
        } else if (type === 'childList' && (mutation.addedNodes.length > 0 || mutation.removedNodes.length > 0)) {
          // This includes HTMLElement and text nodes being
          // added/removed/re-arranged
          changed = true;
        }
      } // We only call the callback if a change that could affect
      // layout/size truely happened


      if (changed) {
        callback();
      }
    }); // Have the observer observe foo for changes in children, etc

    obs.observe(el, _objectSpread2({
      childList: true,
      subtree: true
    }, opts)); // We return a reference to the observer so that `obs.disconnect()`
    // can be called if necessary
    // To reduce overhead when the root element is hidden

    return obs;
  };

  /*
   * SSR Safe Client Side ID attribute generation
   * id's can only be generated client side, after mount.
   * this._uid is not synched between server and client.
   */
  // @vue/component
  var idMixin = {
    props: {
      id: {
        type: String,
        default: null
      }
    },
    data: function data() {
      return {
        localId_: null
      };
    },
    computed: {
      safeId: function safeId() {
        // Computed property that returns a dynamic function for creating the ID.
        // Reacts to changes in both .id and .localId_ And regens a new function
        var id = this.id || this.localId_; // We return a function that accepts an optional suffix string
        // So this computed prop looks and works like a method!!!
        // But benefits from Vue's Computed prop caching

        var fn = function fn(suffix) {
          if (!id) {
            return null;
          }

          suffix = String(suffix || '').replace(/\s+/g, '_');
          return suffix ? id + '_' + suffix : id;
        };

        return fn;
      }
    },
    mounted: function mounted() {
      var _this = this;

      // mounted only occurs client side
      this.$nextTick(function () {
        // Update dom with auto ID after dom loaded to prevent
        // SSR hydration errors.
        _this.localId_ = "__BVID__".concat(_this._uid);
      });
    }
  };

  var NAME$8 = 'BCarousel'; // Slide directional classes

  var DIRECTION = {
    next: {
      dirClass: 'carousel-item-left',
      overlayClass: 'carousel-item-next'
    },
    prev: {
      dirClass: 'carousel-item-right',
      overlayClass: 'carousel-item-prev'
    }
  }; // Fallback Transition duration (with a little buffer) in ms

  var TRANS_DURATION = 600 + 50; // Time for mouse compat events to fire after touch

  var TOUCH_EVENT_COMPAT_WAIT = 500; // Number of pixels to consider touch move a swipe

  var SWIPE_THRESHOLD = 40; // PointerEvent pointer types

  var PointerType = {
    TOUCH: 'touch',
    PEN: 'pen'
  }; // Transition Event names

  var TransitionEndEvents = {
    WebkitTransition: 'webkitTransitionEnd',
    MozTransition: 'transitionend',
    OTransition: 'otransitionend oTransitionEnd',
    transition: 'transitionend'
  };
  var EventOptions = {
    passive: true,
    capture: false
  }; // Return the browser specific transitionEnd event name

  var getTransitionEndEvent = function getTransitionEndEvent(el) {
    for (var name in TransitionEndEvents) {
      if (!isUndefined(el.style[name])) {
        return TransitionEndEvents[name];
      }
    } // Fallback

    /* istanbul ignore next */


    return null;
  }; // @vue/component


  var BCarousel =
  /*#__PURE__*/
  Vue.extend({
    name: NAME$8,
    mixins: [idMixin, normalizeSlotMixin],
    provide: function provide() {
      return {
        bvCarousel: this
      };
    },
    model: {
      prop: 'value',
      event: 'input'
    },
    props: {
      labelPrev: {
        type: String,
        default: function _default() {
          return getComponentConfig(NAME$8, 'labelPrev');
        }
      },
      labelNext: {
        type: String,
        default: function _default() {
          return getComponentConfig(NAME$8, 'labelNext');
        }
      },
      labelGotoSlide: {
        type: String,
        default: function _default() {
          return getComponentConfig(NAME$8, 'labelGotoSlide');
        }
      },
      labelIndicators: {
        type: String,
        default: function _default() {
          return getComponentConfig(NAME$8, 'labelIndicators');
        }
      },
      interval: {
        type: Number,
        default: 5000
      },
      indicators: {
        type: Boolean,
        default: false
      },
      controls: {
        type: Boolean,
        default: false
      },
      noAnimation: {
        // Disable slide/fade animation
        type: Boolean,
        default: false
      },
      fade: {
        // Enable cross-fade animation instead of slide animation
        type: Boolean,
        default: false
      },
      noWrap: {
        // Disable wrapping/looping when start/end is reached
        type: Boolean,
        default: false
      },
      noTouch: {
        // Sniffed by carousel-slide
        type: Boolean,
        default: false
      },
      noHoverPause: {
        // Disable pause on hover
        type: Boolean,
        default: false
      },
      imgWidth: {
        // Sniffed by carousel-slide
        type: [Number, String] // default: undefined

      },
      imgHeight: {
        // Sniffed by carousel-slide
        type: [Number, String] // default: undefined

      },
      background: {
        type: String // default: undefined

      },
      value: {
        type: Number,
        default: 0
      }
    },
    data: function data() {
      return {
        index: this.value || 0,
        isSliding: false,
        transitionEndEvent: null,
        slides: [],
        direction: null,
        isPaused: !(parseInt(this.interval, 10) > 0),
        // Touch event handling values
        touchStartX: 0,
        touchDeltaX: 0
      };
    },
    computed: {
      numSlides: function numSlides() {
        return this.slides.length;
      }
    },
    watch: {
      value: function value(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.setSlide(parseInt(newVal, 10) || 0);
        }
      },
      interval: function interval(newVal, oldVal) {
        if (newVal === oldVal) {
          /* istanbul ignore next */
          return;
        }

        if (!newVal) {
          // Pausing slide show
          this.pause(false);
        } else {
          // Restarting or Changing interval
          this.pause(true);
          this.start(false);
        }
      },
      isPaused: function isPaused(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.$emit(newVal ? 'paused' : 'unpaused');
        }
      },
      index: function index(to, from) {
        if (to === from || this.isSliding) {
          /* istanbul ignore next */
          return;
        }

        this.doSlide(to, from);
      }
    },
    created: function created() {
      // Create private non-reactive props
      this._intervalId = null;
      this._animationTimeout = null;
      this._touchTimeout = null; // Set initial paused state

      this.isPaused = !(parseInt(this.interval, 10) > 0);
    },
    mounted: function mounted() {
      // Cache current browser transitionend event name
      this.transitionEndEvent = getTransitionEndEvent(this.$el) || null; // Get all slides

      this.updateSlides(); // Observe child changes so we can update slide list

      observeDom(this.$refs.inner, this.updateSlides.bind(this), {
        subtree: false,
        childList: true,
        attributes: true,
        attributeFilter: ['id']
      });
    },
    beforeDestroy: function beforeDestroy() {
      clearTimeout(this._animationTimeout);
      clearTimeout(this._touchTimeout);
      clearInterval(this._intervalId);
      this._intervalId = null;
      this._animationTimeout = null;
      this._touchTimeout = null;
    },
    methods: {
      // Set slide
      setSlide: function setSlide(slide) {
        var _this = this;

        var direction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

        // Don't animate when page is not visible

        /* istanbul ignore if: difficult to test */
        if (isBrowser && document.visibilityState && document.hidden) {
          return;
        }

        var noWrap = this.noWrap;
        var numSlides = this.numSlides; // Make sure we have an integer (you never know!)

        slide = Math.floor(slide); // Don't do anything if nothing to slide to

        if (numSlides === 0) {
          return;
        } // Don't change slide while transitioning, wait until transition is done


        if (this.isSliding) {
          // Schedule slide after sliding complete
          this.$once('sliding-end', function () {
            return _this.setSlide(slide, direction);
          });
          return;
        }

        this.direction = direction; // Set new slide index
        // Wrap around if necessary (if no-wrap not enabled)

        this.index = slide >= numSlides ? noWrap ? numSlides - 1 : 0 : slide < 0 ? noWrap ? 0 : numSlides - 1 : slide; // Ensure the v-model is synched up if no-wrap is enabled
        // and user tried to slide pass either ends

        if (noWrap && this.index !== slide && this.index !== this.value) {
          this.$emit('input', this.index);
        }
      },
      // Previous slide
      prev: function prev() {
        this.setSlide(this.index - 1, 'prev');
      },
      // Next slide
      next: function next() {
        this.setSlide(this.index + 1, 'next');
      },
      // Pause auto rotation
      pause: function pause(evt) {
        if (!evt) {
          this.isPaused = true;
        }

        if (this._intervalId) {
          clearInterval(this._intervalId);
          this._intervalId = null;
        }
      },
      // Start auto rotate slides
      start: function start(evt) {
        if (!evt) {
          this.isPaused = false;
        }
        /* istanbul ignore next: most likely will never happen, but just in case */


        if (this._intervalId) {
          clearInterval(this._intervalId);
          this._intervalId = null;
        } // Don't start if no interval, or less than 2 slides


        if (this.interval && this.numSlides > 1) {
          this._intervalId = setInterval(this.next, Math.max(1000, this.interval));
        }
      },
      // Restart auto rotate slides when focus/hover leaves the carousel
      restart: function restart(evt)
      /* istanbul ignore next: difficult to test */
      {
        if (!this.$el.contains(document.activeElement)) {
          this.start();
        }
      },
      doSlide: function doSlide(to, from) {
        var _this2 = this;

        var isCycling = Boolean(this.interval); // Determine sliding direction

        var direction = this.calcDirection(this.direction, from, to);
        var overlayClass = direction.overlayClass;
        var dirClass = direction.dirClass; // Determine current and next slides

        var currentSlide = this.slides[from];
        var nextSlide = this.slides[to]; // Don't do anything if there aren't any slides to slide to

        if (!currentSlide || !nextSlide) {
          /* istanbul ignore next */
          return;
        } // Start animating


        this.isSliding = true;

        if (isCycling) {
          this.pause(false);
        }

        this.$emit('sliding-start', to); // Update v-model

        this.$emit('input', this.index);

        if (this.noAnimation) {
          addClass(nextSlide, 'active');
          removeClass(currentSlide, 'active');
          this.isSliding = false; // Notify ourselves that we're done sliding (slid)

          this.$nextTick(function () {
            return _this2.$emit('sliding-end', to);
          });
        } else {
          addClass(nextSlide, overlayClass); // Trigger a reflow of next slide

          reflow(nextSlide);
          addClass(currentSlide, dirClass);
          addClass(nextSlide, dirClass); // Transition End handler

          var called = false;
          /* istanbul ignore next: difficult to test */

          var onceTransEnd = function onceTransEnd(evt) {
            if (called) {
              return;
            }

            called = true;
            /* istanbul ignore if: transition events cant be tested in JSDOM */

            if (_this2.transitionEndEvent) {
              var events = _this2.transitionEndEvent.split(/\s+/);

              events.forEach(function (evt) {
                return eventOff(currentSlide, evt, onceTransEnd, EventOptions);
              });
            }

            _this2._animationTimeout = null;
            removeClass(nextSlide, dirClass);
            removeClass(nextSlide, overlayClass);
            addClass(nextSlide, 'active');
            removeClass(currentSlide, 'active');
            removeClass(currentSlide, dirClass);
            removeClass(currentSlide, overlayClass);
            setAttr(currentSlide, 'aria-current', 'false');
            setAttr(nextSlide, 'aria-current', 'true');
            setAttr(currentSlide, 'aria-hidden', 'true');
            setAttr(nextSlide, 'aria-hidden', 'false');
            _this2.isSliding = false;
            _this2.direction = null; // Notify ourselves that we're done sliding (slid)

            _this2.$nextTick(function () {
              return _this2.$emit('sliding-end', to);
            });
          }; // Set up transitionend handler

          /* istanbul ignore if: transition events cant be tested in JSDOM */


          if (this.transitionEndEvent) {
            var events = this.transitionEndEvent.split(/\s+/);
            events.forEach(function (event) {
              return eventOn(currentSlide, event, onceTransEnd, EventOptions);
            });
          } // Fallback to setTimeout()


          this._animationTimeout = setTimeout(onceTransEnd, TRANS_DURATION);
        }

        if (isCycling) {
          this.start(false);
        }
      },
      // Update slide list
      updateSlides: function updateSlides() {
        this.pause(true); // Get all slides as DOM elements

        this.slides = selectAll('.carousel-item', this.$refs.inner);
        var numSlides = this.slides.length; // Keep slide number in range

        var index = Math.max(0, Math.min(Math.floor(this.index), numSlides - 1));
        this.slides.forEach(function (slide, idx) {
          var n = idx + 1;

          if (idx === index) {
            addClass(slide, 'active');
            setAttr(slide, 'aria-current', 'true');
          } else {
            removeClass(slide, 'active');
            setAttr(slide, 'aria-current', 'false');
          }

          setAttr(slide, 'aria-posinset', String(n));
          setAttr(slide, 'aria-setsize', String(numSlides));
        }); // Set slide as active

        this.setSlide(index);
        this.start(this.isPaused);
      },
      calcDirection: function calcDirection() {
        var direction = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
        var curIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var nextIndex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

        if (!direction) {
          return nextIndex > curIndex ? DIRECTION.next : DIRECTION.prev;
        }

        return DIRECTION[direction];
      },
      handleClick: function handleClick(evt, fn) {
        var keyCode = evt.keyCode;

        if (evt.type === 'click' || keyCode === KEY_CODES.SPACE || keyCode === KEY_CODES.ENTER) {
          evt.preventDefault();
          evt.stopPropagation();
          fn();
        }
      },
      handleSwipe: function handleSwipe()
      /* istanbul ignore next: JSDOM doesn't support touch events */
      {
        var absDeltaX = Math.abs(this.touchDeltaX);

        if (absDeltaX <= SWIPE_THRESHOLD) {
          return;
        }

        var direction = absDeltaX / this.touchDeltaX; // Reset touch delta X
        // https://github.com/twbs/bootstrap/pull/28558

        this.touchDeltaX = 0;

        if (direction > 0) {
          // Swipe left
          this.prev();
        } else if (direction < 0) {
          // Swipe right
          this.next();
        }
      },
      touchStart: function touchStart(evt)
      /* istanbul ignore next: JSDOM doesn't support touch events */
      {
        if (hasPointerEventSupport && PointerType[evt.pointerType.toUpperCase()]) {
          this.touchStartX = evt.clientX;
        } else if (!hasPointerEventSupport) {
          this.touchStartX = evt.touches[0].clientX;
        }
      },
      touchMove: function touchMove(evt)
      /* istanbul ignore next: JSDOM doesn't support touch events */
      {
        // Ensure swiping with one touch and not pinching
        if (evt.touches && evt.touches.length > 1) {
          this.touchDeltaX = 0;
        } else {
          this.touchDeltaX = evt.touches[0].clientX - this.touchStartX;
        }
      },
      touchEnd: function touchEnd(evt)
      /* istanbul ignore next: JSDOM doesn't support touch events */
      {
        if (hasPointerEventSupport && PointerType[evt.pointerType.toUpperCase()]) {
          this.touchDeltaX = evt.clientX - this.touchStartX;
        }

        this.handleSwipe(); // If it's a touch-enabled device, mouseenter/leave are fired as
        // part of the mouse compatibility events on first tap - the carousel
        // would stop cycling until user tapped out of it;
        // here, we listen for touchend, explicitly pause the carousel
        // (as if it's the second time we tap on it, mouseenter compat event
        // is NOT fired) and after a timeout (to allow for mouse compatibility
        // events to fire) we explicitly restart cycling

        this.pause(false);

        if (this._touchTimeout) {
          clearTimeout(this._touchTimeout);
        }

        this._touchTimeout = setTimeout(this.start, TOUCH_EVENT_COMPAT_WAIT + Math.max(1000, this.interval));
      }
    },
    render: function render(h) {
      var _this3 = this;

      // Wrapper for slides
      var inner = h('div', {
        ref: 'inner',
        class: ['carousel-inner'],
        attrs: {
          id: this.safeId('__BV_inner_'),
          role: 'list'
        }
      }, [this.normalizeSlot('default')]); // Prev and next controls

      var controls = h();

      if (this.controls) {
        var prevHandler = function prevHandler(evt) {
          /* istanbul ignore next */
          if (!_this3.isSliding) {
            _this3.handleClick(evt, _this3.prev);
          } else {
            evt.preventDefault();
          }
        };

        var nextHandler = function nextHandler(evt) {
          /* istanbul ignore next */
          if (!_this3.isSliding) {
            _this3.handleClick(evt, _this3.next);
          } else {
            evt.preventDefault();
          }
        };

        controls = [h('a', {
          class: ['carousel-control-prev'],
          attrs: {
            href: '#',
            role: 'button',
            'aria-controls': this.safeId('__BV_inner_'),
            'aria-disabled': this.isSliding ? 'true' : null
          },
          on: {
            click: prevHandler,
            keydown: prevHandler
          }
        }, [h('span', {
          class: ['carousel-control-prev-icon'],
          attrs: {
            'aria-hidden': 'true'
          }
        }), h('span', {
          class: ['sr-only']
        }, [this.labelPrev])]), h('a', {
          class: ['carousel-control-next'],
          attrs: {
            href: '#',
            role: 'button',
            'aria-controls': this.safeId('__BV_inner_'),
            'aria-disabled': this.isSliding ? 'true' : null
          },
          on: {
            click: nextHandler,
            keydown: nextHandler
          }
        }, [h('span', {
          class: ['carousel-control-next-icon'],
          attrs: {
            'aria-hidden': 'true'
          }
        }), h('span', {
          class: ['sr-only']
        }, [this.labelNext])])];
      } // Indicators


      var indicators = h('ol', {
        class: ['carousel-indicators'],
        directives: [{
          name: 'show',
          rawName: 'v-show',
          value: this.indicators,
          expression: 'indicators'
        }],
        attrs: {
          id: this.safeId('__BV_indicators_'),
          'aria-hidden': this.indicators ? 'false' : 'true',
          'aria-label': this.labelIndicators,
          'aria-owns': this.safeId('__BV_inner_')
        }
      }, this.slides.map(function (slide, n) {
        return h('li', {
          key: "slide_".concat(n),
          class: {
            active: n === _this3.index
          },
          attrs: {
            role: 'button',
            id: _this3.safeId("__BV_indicator_".concat(n + 1, "_")),
            tabindex: _this3.indicators ? '0' : '-1',
            'aria-current': n === _this3.index ? 'true' : 'false',
            'aria-label': "".concat(_this3.labelGotoSlide, " ").concat(n + 1),
            'aria-describedby': _this3.slides[n].id || null,
            'aria-controls': _this3.safeId('__BV_inner_')
          },
          on: {
            click: function click(evt) {
              _this3.handleClick(evt, function () {
                _this3.setSlide(n);
              });
            },
            keydown: function keydown(evt) {
              _this3.handleClick(evt, function () {
                _this3.setSlide(n);
              });
            }
          }
        });
      }));
      var on = {
        mouseenter: this.noHoverPause ? noop : this.pause,
        mouseleave: this.noHoverPause ? noop : this.restart,
        focusin: this.pause,
        focusout: this.restart,
        keydown: function keydown(evt) {
          if (/input|textarea/i.test(evt.target.tagName)) {
            /* istanbul ignore next */
            return;
          }

          var keyCode = evt.keyCode;

          if (keyCode === KEY_CODES.LEFT || keyCode === KEY_CODES.RIGHT) {
            evt.preventDefault();
            evt.stopPropagation();

            _this3[keyCode === KEY_CODES.LEFT ? 'prev' : 'next']();
          }
        }
      }; // Touch support event handlers for environment

      if (!this.noTouch && hasTouchSupport) {
        // Attach appropriate listeners (prepend event name with '&' for passive mode)

        /* istanbul ignore next: JSDOM doesn't support touch events */
        if (hasPointerEventSupport) {
          on['&pointerdown'] = this.touchStart;
          on['&pointerup'] = this.touchEnd;
        } else {
          on['&touchstart'] = this.touchStart;
          on['&touchmove'] = this.touchMove;
          on['&touchend'] = this.touchEnd;
        }
      } // Return the carousel


      return h('div', {
        staticClass: 'carousel',
        class: {
          slide: !this.noAnimation,
          'carousel-fade': !this.noAnimation && this.fade,
          'pointer-event': !this.noTouch && hasTouchSupport && hasPointerEventSupport
        },
        style: {
          background: this.background
        },
        attrs: {
          role: 'region',
          id: this.safeId(),
          'aria-busy': this.isSliding ? 'true' : 'false'
        },
        on: on
      }, [inner, controls, indicators]);
    }
  });

  var props$i = {
    imgSrc: {
      type: String // default: undefined

    },
    imgAlt: {
      type: String // default: undefined

    },
    imgWidth: {
      type: [Number, String] // default: undefined

    },
    imgHeight: {
      type: [Number, String] // default: undefined

    },
    imgBlank: {
      type: Boolean,
      default: false
    },
    imgBlankColor: {
      type: String,
      default: 'transparent'
    },
    contentVisibleUp: {
      type: String
    },
    contentTag: {
      type: String,
      default: 'div'
    },
    caption: {
      type: String
    },
    captionHtml: {
      type: String
    },
    captionTag: {
      type: String,
      default: 'h3'
    },
    text: {
      type: String
    },
    textHtml: {
      type: String
    },
    textTag: {
      type: String,
      default: 'p'
    },
    background: {
      type: String
    }
  }; // @vue/component

  var BCarouselSlide =
  /*#__PURE__*/
  Vue.extend({
    name: 'BCarouselSlide',
    mixins: [idMixin, normalizeSlotMixin],
    inject: {
      bvCarousel: {
        default: function _default() {
          return {
            // Explicitly disable touch if not a child of carousel
            noTouch: true
          };
        }
      }
    },
    props: props$i,
    computed: {
      contentClasses: function contentClasses() {
        return [this.contentVisibleUp ? 'd-none' : '', this.contentVisibleUp ? "d-".concat(this.contentVisibleUp, "-block") : ''];
      },
      computedWidth: function computedWidth() {
        // Use local width, or try parent width
        return this.imgWidth || this.bvCarousel.imgWidth || null;
      },
      computedHeight: function computedHeight() {
        // Use local height, or try parent height
        return this.imgHeight || this.bvCarousel.imgHeight || null;
      }
    },
    render: function render(h) {
      var noDrag = !this.bvCarousel.noTouch && hasTouchSupport;
      var img = this.normalizeSlot('img');

      if (!img && (this.imgSrc || this.imgBlank)) {
        img = h(BImg, {
          props: {
            fluidGrow: true,
            block: true,
            src: this.imgSrc,
            blank: this.imgBlank,
            blankColor: this.imgBlankColor,
            width: this.computedWidth,
            height: this.computedHeight,
            alt: this.imgAlt
          },
          // Touch support event handler
          on: noDrag ? {
            dragstart: function dragstart(e) {
              /* istanbul ignore next: difficult to test in JSDOM */
              e.preventDefault();
            }
          } : {}
        });
      }

      if (!img) {
        img = h();
      }

      var content = h();
      var contentChildren = [this.caption || this.captionHtml ? h(this.captionTag, {
        domProps: htmlOrText(this.captionHtml, this.caption)
      }) : false, this.text || this.textHtml ? h(this.textTag, {
        domProps: htmlOrText(this.textHtml, this.text)
      }) : false, this.normalizeSlot('default') || false];

      if (contentChildren.some(Boolean)) {
        content = h(this.contentTag, {
          staticClass: 'carousel-caption',
          class: this.contentClasses
        }, contentChildren.map(function (i) {
          return i || h();
        }));
      }

      return h('div', {
        staticClass: 'carousel-item',
        style: {
          background: this.background || this.bvCarousel.background || null
        },
        attrs: {
          id: this.safeId(),
          role: 'listitem'
        }
      }, [img, content]);
    }
  });

  var CarouselPlugin =
  /*#__PURE*/
  pluginFactory({
    components: {
      BCarousel: BCarousel,
      BCarouselSlide: BCarouselSlide
    }
  });

  /**
   * Issue #569: collapse::toggle::state triggered too many times
   * @link https://github.com/bootstrap-vue/bootstrap-vue/issues/569
   */
  // @vue/component
  var listenOnRootMixin = {
    methods: {
      /**
       * Safely register event listeners on the root Vue node.
       * While Vue automatically removes listeners for individual components,
       * when a component registers a listener on root and is destroyed,
       * this orphans a callback because the node is gone,
       * but the root does not clear the callback.
       *
       * When registering a $root listener, it also registers a listener on
       * the component's `beforeDestroy` hook to automatically remove the
       * event listener from the $root instance.
       *
       * @param {string} event
       * @param {function} callback
       * @chainable
       */
      listenOnRoot: function listenOnRoot(event, callback) {
        var _this = this;

        this.$root.$on(event, callback);
        this.$on('hook:beforeDestroy', function () {
          _this.$root.$off(event, callback);
        }); // Return this for easy chaining

        return this;
      },

      /**
       * Safely register a $once event listener on the root Vue node.
       * While Vue automatically removes listeners for individual components,
       * when a component registers a listener on root and is destroyed,
       * this orphans a callback because the node is gone,
       * but the root does not clear the callback.
       *
       * When registering a $root listener, it also registers a listener on
       * the component's `beforeDestroy` hook to automatically remove the
       * event listener from the $root instance.
       *
       * @param {string} event
       * @param {function} callback
       * @chainable
       */
      listenOnRootOnce: function listenOnRootOnce(event, callback) {
        var _this2 = this;

        this.$root.$once(event, callback);
        this.$on('hook:beforeDestroy', function () {
          _this2.$root.$off(event, callback);
        }); // Return this for easy chaining

        return this;
      },

      /**
       * Convenience method for calling vm.$emit on vm.$root.
       * @param {string} event
       * @param {*} args
       * @chainable
       */
      emitOnRoot: function emitOnRoot(event) {
        var _this$$root;

        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        (_this$$root = this.$root).$emit.apply(_this$$root, [event].concat(args)); // Return this for easy chaining


        return this;
      }
    }
  };

  var EVENT_STATE = 'bv::collapse::state';
  var EVENT_ACCORDION = 'bv::collapse::accordion'; // Private event we emit on `$root` to ensure the toggle state is
  // always synced. It gets emitted even if the state has not changed!
  // This event is NOT to be documented as people should not be using it

  var EVENT_STATE_SYNC = 'bv::collapse::sync::state'; // Events we listen to on `$root`

  var EVENT_TOGGLE = 'bv::toggle::collapse';
  var EVENT_STATE_REQUEST = 'bv::request::collapse::state'; // Event listener options

  var EventOptions$1 = {
    passive: true,
    capture: false
  }; // @vue/component

  var BCollapse =
  /*#__PURE__*/
  Vue.extend({
    name: 'BCollapse',
    mixins: [idMixin, listenOnRootMixin, normalizeSlotMixin],
    model: {
      prop: 'visible',
      event: 'input'
    },
    props: {
      isNav: {
        type: Boolean,
        default: false
      },
      accordion: {
        type: String,
        default: null
      },
      visible: {
        type: Boolean,
        default: false
      },
      tag: {
        type: String,
        default: 'div'
      }
    },
    data: function data() {
      return {
        show: this.visible,
        transitioning: false
      };
    },
    computed: {
      classObject: function classObject() {
        return {
          'navbar-collapse': this.isNav,
          collapse: !this.transitioning,
          show: this.show && !this.transitioning
        };
      }
    },
    watch: {
      visible: function visible(newVal) {
        if (newVal !== this.show) {
          this.show = newVal;
        }
      },
      show: function show(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.emitState();
        }
      }
    },
    created: function created() {
      this.show = this.visible;
    },
    mounted: function mounted() {
      var _this = this;

      this.show = this.visible; // Listen for toggle events to open/close us

      this.listenOnRoot(EVENT_TOGGLE, this.handleToggleEvt); // Listen to other collapses for accordion events

      this.listenOnRoot(EVENT_ACCORDION, this.handleAccordionEvt);

      if (this.isNav) {
        // Set up handlers
        this.setWindowEvents(true);
        this.handleResize();
      }

      this.$nextTick(function () {
        _this.emitState();
      }); // Listen for "Sync state" requests from `v-b-toggle`

      this.listenOnRoot(EVENT_STATE_REQUEST, function (id) {
        if (id === _this.safeId()) {
          _this.$nextTick(_this.emitSync);
        }
      });
    },
    updated: function updated() {
      // Emit a private event every time this component updates to ensure
      // the toggle button is in sync with the collapse's state
      // It is emitted regardless if the visible state changes
      this.emitSync();
    },
    deactivated: function deactivated()
    /* istanbul ignore next */
    {
      if (this.isNav) {
        this.setWindowEvents(false);
      }
    },
    activated: function activated()
    /* istanbul ignore next */
    {
      if (this.isNav) {
        this.setWindowEvents(true);
      }

      this.emitSync();
    },
    beforeDestroy: function beforeDestroy() {
      // Trigger state emit if needed
      this.show = false;

      if (this.isNav && isBrowser) {
        this.setWindowEvents(false);
      }
    },
    methods: {
      setWindowEvents: function setWindowEvents(on) {
        var method = on ? eventOn : eventOff;
        method(window, 'resize', this.handleResize, EventOptions$1);
        method(window, 'orientationchange', this.handleResize, EventOptions$1);
      },
      toggle: function toggle() {
        this.show = !this.show;
      },
      onEnter: function onEnter(el) {
        el.style.height = 0;
        reflow(el);
        el.style.height = el.scrollHeight + 'px';
        this.transitioning = true; // This should be moved out so we can add cancellable events

        this.$emit('show');
      },
      onAfterEnter: function onAfterEnter(el) {
        el.style.height = null;
        this.transitioning = false;
        this.$emit('shown');
      },
      onLeave: function onLeave(el) {
        el.style.height = 'auto';
        el.style.display = 'block';
        el.style.height = getBCR(el).height + 'px';
        reflow(el);
        this.transitioning = true;
        el.style.height = 0; // This should be moved out so we can add cancellable events

        this.$emit('hide');
      },
      onAfterLeave: function onAfterLeave(el) {
        el.style.height = null;
        this.transitioning = false;
        this.$emit('hidden');
      },
      emitState: function emitState() {
        this.$emit('input', this.show); // Let v-b-toggle know the state of this collapse

        this.$root.$emit(EVENT_STATE, this.safeId(), this.show);

        if (this.accordion && this.show) {
          // Tell the other collapses in this accordion to close
          this.$root.$emit(EVENT_ACCORDION, this.safeId(), this.accordion);
        }
      },
      emitSync: function emitSync() {
        // Emit a private event every time this component updates to ensure
        // the toggle button is in sync with the collapse's state
        // It is emitted regardless if the visible state changes
        this.$root.$emit(EVENT_STATE_SYNC, this.safeId(), this.show);
      },
      checkDisplayBlock: function checkDisplayBlock() {
        // Check to see if the collapse has `display: block !important;` set.
        // We can't set `display: none;` directly on this.$el, as it would
        // trigger a new transition to start (or cancel a current one).
        var restore = hasClass(this.$el, 'show');
        removeClass(this.$el, 'show');
        var isBlock = getCS(this.$el).display === 'block';
        restore && addClass(this.$el, 'show');
        return isBlock;
      },
      clickHandler: function clickHandler(evt) {
        // If we are in a nav/navbar, close the collapse when non-disabled link clicked
        var el = evt.target;

        if (!this.isNav || !el || getCS(this.$el).display !== 'block') {
          /* istanbul ignore next: can't test getComputedStyle in JSDOM */
          return;
        }

        if (matches(el, '.nav-link,.dropdown-item') || closest('.nav-link,.dropdown-item', el)) {
          if (!this.checkDisplayBlock()) {
            // Only close the collapse if it is not forced to be 'display: block !important;'
            this.show = false;
          }
        }
      },
      handleToggleEvt: function handleToggleEvt(target) {
        if (target !== this.safeId()) {
          return;
        }

        this.toggle();
      },
      handleAccordionEvt: function handleAccordionEvt(openedId, accordion) {
        if (!this.accordion || accordion !== this.accordion) {
          return;
        }

        if (openedId === this.safeId()) {
          // Open this collapse if not shown
          if (!this.show) {
            this.toggle();
          }
        } else {
          // Close this collapse if shown
          if (this.show) {
            this.toggle();
          }
        }
      },
      handleResize: function handleResize() {
        // Handler for orientation/resize to set collapsed state in nav/navbar
        this.show = getCS(this.$el).display === 'block';
      }
    },
    render: function render(h) {
      var content = h(this.tag, {
        class: this.classObject,
        directives: [{
          name: 'show',
          value: this.show
        }],
        attrs: {
          id: this.safeId()
        },
        on: {
          click: this.clickHandler
        }
      }, [this.normalizeSlot('default')]);
      return h('transition', {
        props: {
          enterClass: '',
          enterActiveClass: 'collapsing',
          enterToClass: '',
          leaveClass: '',
          leaveActiveClass: 'collapsing',
          leaveToClass: ''
        },
        on: {
          enter: this.onEnter,
          afterEnter: this.onAfterEnter,
          leave: this.onLeave,
          afterLeave: this.onAfterLeave
        }
      }, [content]);
    }
  });

  var allListenTypes = {
    hover: true,
    click: true,
    focus: true
  };
  var BVBoundListeners = '__BV_boundEventListeners__';

  var getTargets = function getTargets(binding) {
    var targets = keys(binding.modifiers || {}).filter(function (t) {
      return !allListenTypes[t];
    });

    if (binding.value) {
      targets.push(binding.value);
    }

    return targets;
  };

  var bindTargets = function bindTargets(vnode, binding, listenTypes, fn) {
    var targets = getTargets(binding);

    var listener = function listener() {
      fn({
        targets: targets,
        vnode: vnode
      });
    };

    keys(allListenTypes).forEach(function (type) {
      if (listenTypes[type] || binding.modifiers[type]) {
        eventOn(vnode.elm, type, listener);
        var boundListeners = vnode.elm[BVBoundListeners] || {};
        boundListeners[type] = boundListeners[type] || [];
        boundListeners[type].push(listener);
        vnode.elm[BVBoundListeners] = boundListeners;
      }
    }); // Return the list of targets

    return targets;
  };

  var unbindTargets = function unbindTargets(vnode, binding, listenTypes) {
    keys(allListenTypes).forEach(function (type) {
      if (listenTypes[type] || binding.modifiers[type]) {
        var boundListeners = vnode.elm[BVBoundListeners] && vnode.elm[BVBoundListeners][type];

        if (boundListeners) {
          boundListeners.forEach(function (listener) {
            return eventOff(vnode.elm, type, listener);
          });
          delete vnode.elm[BVBoundListeners][type];
        }
      }
    });
  };

  var listenTypes = {
    click: true
  }; // Property key for handler storage

  var BV_TOGGLE = '__BV_toggle__';
  var BV_TOGGLE_STATE = '__BV_toggle_STATE__';
  var BV_TOGGLE_CONTROLS = '__BV_toggle_CONTROLS__';
  var BV_TOGGLE_TARGETS = '__BV_toggle_TARGETS__'; // Emitted control event for collapse (emitted to collapse)

  var EVENT_TOGGLE$1 = 'bv::toggle::collapse'; // Listen to event for toggle state update (emitted by collapse)

  var EVENT_STATE$1 = 'bv::collapse::state'; // Private event emitted on $root to ensure the toggle state is always synced.
  // Gets emitted even if the state of b-collapse has not changed.
  // This event is NOT to be documented as people should not be using it.

  var EVENT_STATE_SYNC$1 = 'bv::collapse::sync::state'; // Private event we send to collapse to request state update sync event

  var EVENT_STATE_REQUEST$1 = 'bv::request::collapse::state'; // Reset and remove a property from the provided element

  var resetProp = function resetProp(el, prop) {
    el[prop] = null;
    delete el[prop];
  }; // Handle targets update


  var handleTargets = function handleTargets(_ref) {
    var targets = _ref.targets,
        vnode = _ref.vnode;
    targets.forEach(function (target) {
      vnode.context.$root.$emit(EVENT_TOGGLE$1, target);
    });
  }; // Handle directive updates

  /* istanbul ignore next: not easy to test */


  var handleUpdate = function handleUpdate(el, binding, vnode) {
    if (!isBrowser) {
      return;
    }

    if (!looseEqual(getTargets(binding), el[BV_TOGGLE_TARGETS])) {
      // Targets have changed, so update accordingly
      unbindTargets(vnode, binding, listenTypes);
      var targets = bindTargets(vnode, binding, listenTypes, handleTargets); // Update targets array to element

      el[BV_TOGGLE_TARGETS] = targets; // Add aria attributes to element

      el[BV_TOGGLE_CONTROLS] = targets.join(' '); // ensure aria-controls is up to date

      setAttr(el, 'aria-controls', el[BV_TOGGLE_CONTROLS]); // Request a state update from targets so that we can ensure
      // expanded state is correct

      targets.forEach(function (target) {
        vnode.context.$root.$emit(EVENT_STATE_REQUEST$1, target);
      });
    } // Ensure the collapse class and aria-* attributes persist
    // after element is updated (either by parent re-rendering
    // or changes to this element or it's contents


    if (el[BV_TOGGLE_STATE] === true) {
      addClass(el, 'collapsed');
      setAttr(el, 'aria-expanded', 'true');
    } else if (el[BV_TOGGLE_STATE] === false) {
      removeClass(el, 'collapsed');
      setAttr(el, 'aria-expanded', 'false');
    }

    setAttr(el, 'aria-controls', el[BV_TOGGLE_CONTROLS]);
  };
  /*
   * Export our directive
   */


  var VBToggle = {
    bind: function bind(el, binding, vnode) {
      var targets = bindTargets(vnode, binding, listenTypes, handleTargets);

      if (isBrowser && vnode.context && targets.length > 0) {
        // Add targets array to element
        el[BV_TOGGLE_TARGETS] = targets; // Add aria attributes to element

        el[BV_TOGGLE_CONTROLS] = targets.join(' '); // State is initially collapsed until we receive a state event

        el[BV_TOGGLE_STATE] = false;
        setAttr(el, 'aria-controls', el[BV_TOGGLE_CONTROLS]);
        setAttr(el, 'aria-expanded', 'false'); // If element is not a button, we add `role="button"` for accessibility

        if (el.tagName !== 'BUTTON' && !hasAttr(el, 'role')) {
          setAttr(el, 'role', 'button');
        } // Toggle state handler


        var toggleDirectiveHandler = function toggleDirectiveHandler(id, state) {
          var targets = el[BV_TOGGLE_TARGETS] || [];

          if (targets.indexOf(id) !== -1) {
            // Set aria-expanded state
            setAttr(el, 'aria-expanded', state ? 'true' : 'false'); // Set/Clear 'collapsed' class state

            el[BV_TOGGLE_STATE] = state;

            if (state) {
              removeClass(el, 'collapsed');
            } else {
              addClass(el, 'collapsed');
            }
          }
        }; // Store the toggle handler on the element


        el[BV_TOGGLE] = toggleDirectiveHandler; // Listen for toggle state changes (public)

        vnode.context.$root.$on(EVENT_STATE$1, el[BV_TOGGLE]); // Listen for toggle state sync (private)

        vnode.context.$root.$on(EVENT_STATE_SYNC$1, el[BV_TOGGLE]);
      }
    },
    componentUpdated: handleUpdate,
    updated: handleUpdate,
    unbind: function unbind(el, binding, vnode)
    /* istanbul ignore next */
    {
      unbindTargets(vnode, binding, listenTypes); // Remove our $root listener

      if (el[BV_TOGGLE]) {
        vnode.context.$root.$off(EVENT_STATE$1, el[BV_TOGGLE]);
        vnode.context.$root.$off(EVENT_STATE_SYNC$1, el[BV_TOGGLE]);
      } // Reset custom  props


      resetProp(el, BV_TOGGLE);
      resetProp(el, BV_TOGGLE_STATE);
      resetProp(el, BV_TOGGLE_CONTROLS);
      resetProp(el, BV_TOGGLE_TARGETS); // Reset classes/attrs

      removeClass(el, 'collapsed');
      removeAttr(el, 'aria-expanded');
      removeAttr(el, 'aria-controls');
      removeAttr(el, 'role');
    }
  };

  var CollapsePlugin =
  /*#__PURE__*/
  pluginFactory({
    components: {
      BCollapse: BCollapse
    },
    directives: {
      VBToggle: VBToggle
    }
  });

  /**!
   * @fileOverview Kickass library to create and place poppers near their reference elements.
   * @version 1.16.0
   * @license
   * Copyright (c) 2016 Federico Zivolo and contributors
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in all
   * copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   * SOFTWARE.
   */
  var isBrowser$1 = typeof window !== 'undefined' && typeof document !== 'undefined' && typeof navigator !== 'undefined';

  var timeoutDuration = function () {
    var longerTimeoutBrowsers = ['Edge', 'Trident', 'Firefox'];
    for (var i = 0; i < longerTimeoutBrowsers.length; i += 1) {
      if (isBrowser$1 && navigator.userAgent.indexOf(longerTimeoutBrowsers[i]) >= 0) {
        return 1;
      }
    }
    return 0;
  }();

  function microtaskDebounce(fn) {
    var called = false;
    return function () {
      if (called) {
        return;
      }
      called = true;
      window.Promise.resolve().then(function () {
        called = false;
        fn();
      });
    };
  }

  function taskDebounce(fn) {
    var scheduled = false;
    return function () {
      if (!scheduled) {
        scheduled = true;
        setTimeout(function () {
          scheduled = false;
          fn();
        }, timeoutDuration);
      }
    };
  }

  var supportsMicroTasks = isBrowser$1 && window.Promise;

  /**
  * Create a debounced version of a method, that's asynchronously deferred
  * but called in the minimum time possible.
  *
  * @method
  * @memberof Popper.Utils
  * @argument {Function} fn
  * @returns {Function}
  */
  var debounce = supportsMicroTasks ? microtaskDebounce : taskDebounce;

  /**
   * Check if the given variable is a function
   * @method
   * @memberof Popper.Utils
   * @argument {Any} functionToCheck - variable to check
   * @returns {Boolean} answer to: is a function?
   */
  function isFunction$1(functionToCheck) {
    var getType = {};
    return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
  }

  /**
   * Get CSS computed property of the given element
   * @method
   * @memberof Popper.Utils
   * @argument {Eement} element
   * @argument {String} property
   */
  function getStyleComputedProperty(element, property) {
    if (element.nodeType !== 1) {
      return [];
    }
    // NOTE: 1 DOM access here
    var window = element.ownerDocument.defaultView;
    var css = window.getComputedStyle(element, null);
    return property ? css[property] : css;
  }

  /**
   * Returns the parentNode or the host of the element
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @returns {Element} parent
   */
  function getParentNode(element) {
    if (element.nodeName === 'HTML') {
      return element;
    }
    return element.parentNode || element.host;
  }

  /**
   * Returns the scrolling parent of the given element
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @returns {Element} scroll parent
   */
  function getScrollParent(element) {
    // Return body, `getScroll` will take care to get the correct `scrollTop` from it
    if (!element) {
      return document.body;
    }

    switch (element.nodeName) {
      case 'HTML':
      case 'BODY':
        return element.ownerDocument.body;
      case '#document':
        return element.body;
    }

    // Firefox want us to check `-x` and `-y` variations as well

    var _getStyleComputedProp = getStyleComputedProperty(element),
        overflow = _getStyleComputedProp.overflow,
        overflowX = _getStyleComputedProp.overflowX,
        overflowY = _getStyleComputedProp.overflowY;

    if (/(auto|scroll|overlay)/.test(overflow + overflowY + overflowX)) {
      return element;
    }

    return getScrollParent(getParentNode(element));
  }

  /**
   * Returns the reference node of the reference object, or the reference object itself.
   * @method
   * @memberof Popper.Utils
   * @param {Element|Object} reference - the reference element (the popper will be relative to this)
   * @returns {Element} parent
   */
  function getReferenceNode(reference) {
    return reference && reference.referenceNode ? reference.referenceNode : reference;
  }

  var isIE11 = isBrowser$1 && !!(window.MSInputMethodContext && document.documentMode);
  var isIE10 = isBrowser$1 && /MSIE 10/.test(navigator.userAgent);

  /**
   * Determines if the browser is Internet Explorer
   * @method
   * @memberof Popper.Utils
   * @param {Number} version to check
   * @returns {Boolean} isIE
   */
  function isIE$1(version) {
    if (version === 11) {
      return isIE11;
    }
    if (version === 10) {
      return isIE10;
    }
    return isIE11 || isIE10;
  }

  /**
   * Returns the offset parent of the given element
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @returns {Element} offset parent
   */
  function getOffsetParent(element) {
    if (!element) {
      return document.documentElement;
    }

    var noOffsetParent = isIE$1(10) ? document.body : null;

    // NOTE: 1 DOM access here
    var offsetParent = element.offsetParent || null;
    // Skip hidden elements which don't have an offsetParent
    while (offsetParent === noOffsetParent && element.nextElementSibling) {
      offsetParent = (element = element.nextElementSibling).offsetParent;
    }

    var nodeName = offsetParent && offsetParent.nodeName;

    if (!nodeName || nodeName === 'BODY' || nodeName === 'HTML') {
      return element ? element.ownerDocument.documentElement : document.documentElement;
    }

    // .offsetParent will return the closest TH, TD or TABLE in case
    // no offsetParent is present, I hate this job...
    if (['TH', 'TD', 'TABLE'].indexOf(offsetParent.nodeName) !== -1 && getStyleComputedProperty(offsetParent, 'position') === 'static') {
      return getOffsetParent(offsetParent);
    }

    return offsetParent;
  }

  function isOffsetContainer(element) {
    var nodeName = element.nodeName;

    if (nodeName === 'BODY') {
      return false;
    }
    return nodeName === 'HTML' || getOffsetParent(element.firstElementChild) === element;
  }

  /**
   * Finds the root node (document, shadowDOM root) of the given element
   * @method
   * @memberof Popper.Utils
   * @argument {Element} node
   * @returns {Element} root node
   */
  function getRoot(node) {
    if (node.parentNode !== null) {
      return getRoot(node.parentNode);
    }

    return node;
  }

  /**
   * Finds the offset parent common to the two provided nodes
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element1
   * @argument {Element} element2
   * @returns {Element} common offset parent
   */
  function findCommonOffsetParent(element1, element2) {
    // This check is needed to avoid errors in case one of the elements isn't defined for any reason
    if (!element1 || !element1.nodeType || !element2 || !element2.nodeType) {
      return document.documentElement;
    }

    // Here we make sure to give as "start" the element that comes first in the DOM
    var order = element1.compareDocumentPosition(element2) & Node.DOCUMENT_POSITION_FOLLOWING;
    var start = order ? element1 : element2;
    var end = order ? element2 : element1;

    // Get common ancestor container
    var range = document.createRange();
    range.setStart(start, 0);
    range.setEnd(end, 0);
    var commonAncestorContainer = range.commonAncestorContainer;

    // Both nodes are inside #document

    if (element1 !== commonAncestorContainer && element2 !== commonAncestorContainer || start.contains(end)) {
      if (isOffsetContainer(commonAncestorContainer)) {
        return commonAncestorContainer;
      }

      return getOffsetParent(commonAncestorContainer);
    }

    // one of the nodes is inside shadowDOM, find which one
    var element1root = getRoot(element1);
    if (element1root.host) {
      return findCommonOffsetParent(element1root.host, element2);
    } else {
      return findCommonOffsetParent(element1, getRoot(element2).host);
    }
  }

  /**
   * Gets the scroll value of the given element in the given side (top and left)
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @argument {String} side `top` or `left`
   * @returns {number} amount of scrolled pixels
   */
  function getScroll(element) {
    var side = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'top';

    var upperSide = side === 'top' ? 'scrollTop' : 'scrollLeft';
    var nodeName = element.nodeName;

    if (nodeName === 'BODY' || nodeName === 'HTML') {
      var html = element.ownerDocument.documentElement;
      var scrollingElement = element.ownerDocument.scrollingElement || html;
      return scrollingElement[upperSide];
    }

    return element[upperSide];
  }

  /*
   * Sum or subtract the element scroll values (left and top) from a given rect object
   * @method
   * @memberof Popper.Utils
   * @param {Object} rect - Rect object you want to change
   * @param {HTMLElement} element - The element from the function reads the scroll values
   * @param {Boolean} subtract - set to true if you want to subtract the scroll values
   * @return {Object} rect - The modifier rect object
   */
  function includeScroll(rect, element) {
    var subtract = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    var scrollTop = getScroll(element, 'top');
    var scrollLeft = getScroll(element, 'left');
    var modifier = subtract ? -1 : 1;
    rect.top += scrollTop * modifier;
    rect.bottom += scrollTop * modifier;
    rect.left += scrollLeft * modifier;
    rect.right += scrollLeft * modifier;
    return rect;
  }

  /*
   * Helper to detect borders of a given element
   * @method
   * @memberof Popper.Utils
   * @param {CSSStyleDeclaration} styles
   * Result of `getStyleComputedProperty` on the given element
   * @param {String} axis - `x` or `y`
   * @return {number} borders - The borders size of the given axis
   */

  function getBordersSize(styles, axis) {
    var sideA = axis === 'x' ? 'Left' : 'Top';
    var sideB = sideA === 'Left' ? 'Right' : 'Bottom';

    return parseFloat(styles['border' + sideA + 'Width'], 10) + parseFloat(styles['border' + sideB + 'Width'], 10);
  }

  function getSize(axis, body, html, computedStyle) {
    return Math.max(body['offset' + axis], body['scroll' + axis], html['client' + axis], html['offset' + axis], html['scroll' + axis], isIE$1(10) ? parseInt(html['offset' + axis]) + parseInt(computedStyle['margin' + (axis === 'Height' ? 'Top' : 'Left')]) + parseInt(computedStyle['margin' + (axis === 'Height' ? 'Bottom' : 'Right')]) : 0);
  }

  function getWindowSizes(document) {
    var body = document.body;
    var html = document.documentElement;
    var computedStyle = isIE$1(10) && getComputedStyle(html);

    return {
      height: getSize('Height', body, html, computedStyle),
      width: getSize('Width', body, html, computedStyle)
    };
  }

  var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();





  var defineProperty$1 = function (obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  };

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  /**
   * Given element offsets, generate an output similar to getBoundingClientRect
   * @method
   * @memberof Popper.Utils
   * @argument {Object} offsets
   * @returns {Object} ClientRect like output
   */
  function getClientRect(offsets) {
    return _extends({}, offsets, {
      right: offsets.left + offsets.width,
      bottom: offsets.top + offsets.height
    });
  }

  /**
   * Get bounding client rect of given element
   * @method
   * @memberof Popper.Utils
   * @param {HTMLElement} element
   * @return {Object} client rect
   */
  function getBoundingClientRect(element) {
    var rect = {};

    // IE10 10 FIX: Please, don't ask, the element isn't
    // considered in DOM in some circumstances...
    // This isn't reproducible in IE10 compatibility mode of IE11
    try {
      if (isIE$1(10)) {
        rect = element.getBoundingClientRect();
        var scrollTop = getScroll(element, 'top');
        var scrollLeft = getScroll(element, 'left');
        rect.top += scrollTop;
        rect.left += scrollLeft;
        rect.bottom += scrollTop;
        rect.right += scrollLeft;
      } else {
        rect = element.getBoundingClientRect();
      }
    } catch (e) {}

    var result = {
      left: rect.left,
      top: rect.top,
      width: rect.right - rect.left,
      height: rect.bottom - rect.top
    };

    // subtract scrollbar size from sizes
    var sizes = element.nodeName === 'HTML' ? getWindowSizes(element.ownerDocument) : {};
    var width = sizes.width || element.clientWidth || result.width;
    var height = sizes.height || element.clientHeight || result.height;

    var horizScrollbar = element.offsetWidth - width;
    var vertScrollbar = element.offsetHeight - height;

    // if an hypothetical scrollbar is detected, we must be sure it's not a `border`
    // we make this check conditional for performance reasons
    if (horizScrollbar || vertScrollbar) {
      var styles = getStyleComputedProperty(element);
      horizScrollbar -= getBordersSize(styles, 'x');
      vertScrollbar -= getBordersSize(styles, 'y');

      result.width -= horizScrollbar;
      result.height -= vertScrollbar;
    }

    return getClientRect(result);
  }

  function getOffsetRectRelativeToArbitraryNode(children, parent) {
    var fixedPosition = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    var isIE10 = isIE$1(10);
    var isHTML = parent.nodeName === 'HTML';
    var childrenRect = getBoundingClientRect(children);
    var parentRect = getBoundingClientRect(parent);
    var scrollParent = getScrollParent(children);

    var styles = getStyleComputedProperty(parent);
    var borderTopWidth = parseFloat(styles.borderTopWidth, 10);
    var borderLeftWidth = parseFloat(styles.borderLeftWidth, 10);

    // In cases where the parent is fixed, we must ignore negative scroll in offset calc
    if (fixedPosition && isHTML) {
      parentRect.top = Math.max(parentRect.top, 0);
      parentRect.left = Math.max(parentRect.left, 0);
    }
    var offsets = getClientRect({
      top: childrenRect.top - parentRect.top - borderTopWidth,
      left: childrenRect.left - parentRect.left - borderLeftWidth,
      width: childrenRect.width,
      height: childrenRect.height
    });
    offsets.marginTop = 0;
    offsets.marginLeft = 0;

    // Subtract margins of documentElement in case it's being used as parent
    // we do this only on HTML because it's the only element that behaves
    // differently when margins are applied to it. The margins are included in
    // the box of the documentElement, in the other cases not.
    if (!isIE10 && isHTML) {
      var marginTop = parseFloat(styles.marginTop, 10);
      var marginLeft = parseFloat(styles.marginLeft, 10);

      offsets.top -= borderTopWidth - marginTop;
      offsets.bottom -= borderTopWidth - marginTop;
      offsets.left -= borderLeftWidth - marginLeft;
      offsets.right -= borderLeftWidth - marginLeft;

      // Attach marginTop and marginLeft because in some circumstances we may need them
      offsets.marginTop = marginTop;
      offsets.marginLeft = marginLeft;
    }

    if (isIE10 && !fixedPosition ? parent.contains(scrollParent) : parent === scrollParent && scrollParent.nodeName !== 'BODY') {
      offsets = includeScroll(offsets, parent);
    }

    return offsets;
  }

  function getViewportOffsetRectRelativeToArtbitraryNode(element) {
    var excludeScroll = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    var html = element.ownerDocument.documentElement;
    var relativeOffset = getOffsetRectRelativeToArbitraryNode(element, html);
    var width = Math.max(html.clientWidth, window.innerWidth || 0);
    var height = Math.max(html.clientHeight, window.innerHeight || 0);

    var scrollTop = !excludeScroll ? getScroll(html) : 0;
    var scrollLeft = !excludeScroll ? getScroll(html, 'left') : 0;

    var offset = {
      top: scrollTop - relativeOffset.top + relativeOffset.marginTop,
      left: scrollLeft - relativeOffset.left + relativeOffset.marginLeft,
      width: width,
      height: height
    };

    return getClientRect(offset);
  }

  /**
   * Check if the given element is fixed or is inside a fixed parent
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @argument {Element} customContainer
   * @returns {Boolean} answer to "isFixed?"
   */
  function isFixed(element) {
    var nodeName = element.nodeName;
    if (nodeName === 'BODY' || nodeName === 'HTML') {
      return false;
    }
    if (getStyleComputedProperty(element, 'position') === 'fixed') {
      return true;
    }
    var parentNode = getParentNode(element);
    if (!parentNode) {
      return false;
    }
    return isFixed(parentNode);
  }

  /**
   * Finds the first parent of an element that has a transformed property defined
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @returns {Element} first transformed parent or documentElement
   */

  function getFixedPositionOffsetParent(element) {
    // This check is needed to avoid errors in case one of the elements isn't defined for any reason
    if (!element || !element.parentElement || isIE$1()) {
      return document.documentElement;
    }
    var el = element.parentElement;
    while (el && getStyleComputedProperty(el, 'transform') === 'none') {
      el = el.parentElement;
    }
    return el || document.documentElement;
  }

  /**
   * Computed the boundaries limits and return them
   * @method
   * @memberof Popper.Utils
   * @param {HTMLElement} popper
   * @param {HTMLElement} reference
   * @param {number} padding
   * @param {HTMLElement} boundariesElement - Element used to define the boundaries
   * @param {Boolean} fixedPosition - Is in fixed position mode
   * @returns {Object} Coordinates of the boundaries
   */
  function getBoundaries(popper, reference, padding, boundariesElement) {
    var fixedPosition = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

    // NOTE: 1 DOM access here

    var boundaries = { top: 0, left: 0 };
    var offsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, getReferenceNode(reference));

    // Handle viewport case
    if (boundariesElement === 'viewport') {
      boundaries = getViewportOffsetRectRelativeToArtbitraryNode(offsetParent, fixedPosition);
    } else {
      // Handle other cases based on DOM element used as boundaries
      var boundariesNode = void 0;
      if (boundariesElement === 'scrollParent') {
        boundariesNode = getScrollParent(getParentNode(reference));
        if (boundariesNode.nodeName === 'BODY') {
          boundariesNode = popper.ownerDocument.documentElement;
        }
      } else if (boundariesElement === 'window') {
        boundariesNode = popper.ownerDocument.documentElement;
      } else {
        boundariesNode = boundariesElement;
      }

      var offsets = getOffsetRectRelativeToArbitraryNode(boundariesNode, offsetParent, fixedPosition);

      // In case of HTML, we need a different computation
      if (boundariesNode.nodeName === 'HTML' && !isFixed(offsetParent)) {
        var _getWindowSizes = getWindowSizes(popper.ownerDocument),
            height = _getWindowSizes.height,
            width = _getWindowSizes.width;

        boundaries.top += offsets.top - offsets.marginTop;
        boundaries.bottom = height + offsets.top;
        boundaries.left += offsets.left - offsets.marginLeft;
        boundaries.right = width + offsets.left;
      } else {
        // for all the other DOM elements, this one is good
        boundaries = offsets;
      }
    }

    // Add paddings
    padding = padding || 0;
    var isPaddingNumber = typeof padding === 'number';
    boundaries.left += isPaddingNumber ? padding : padding.left || 0;
    boundaries.top += isPaddingNumber ? padding : padding.top || 0;
    boundaries.right -= isPaddingNumber ? padding : padding.right || 0;
    boundaries.bottom -= isPaddingNumber ? padding : padding.bottom || 0;

    return boundaries;
  }

  function getArea(_ref) {
    var width = _ref.width,
        height = _ref.height;

    return width * height;
  }

  /**
   * Utility used to transform the `auto` placement to the placement with more
   * available space.
   * @method
   * @memberof Popper.Utils
   * @argument {Object} data - The data object generated by update method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function computeAutoPlacement(placement, refRect, popper, reference, boundariesElement) {
    var padding = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;

    if (placement.indexOf('auto') === -1) {
      return placement;
    }

    var boundaries = getBoundaries(popper, reference, padding, boundariesElement);

    var rects = {
      top: {
        width: boundaries.width,
        height: refRect.top - boundaries.top
      },
      right: {
        width: boundaries.right - refRect.right,
        height: boundaries.height
      },
      bottom: {
        width: boundaries.width,
        height: boundaries.bottom - refRect.bottom
      },
      left: {
        width: refRect.left - boundaries.left,
        height: boundaries.height
      }
    };

    var sortedAreas = Object.keys(rects).map(function (key) {
      return _extends({
        key: key
      }, rects[key], {
        area: getArea(rects[key])
      });
    }).sort(function (a, b) {
      return b.area - a.area;
    });

    var filteredAreas = sortedAreas.filter(function (_ref2) {
      var width = _ref2.width,
          height = _ref2.height;
      return width >= popper.clientWidth && height >= popper.clientHeight;
    });

    var computedPlacement = filteredAreas.length > 0 ? filteredAreas[0].key : sortedAreas[0].key;

    var variation = placement.split('-')[1];

    return computedPlacement + (variation ? '-' + variation : '');
  }

  /**
   * Get offsets to the reference element
   * @method
   * @memberof Popper.Utils
   * @param {Object} state
   * @param {Element} popper - the popper element
   * @param {Element} reference - the reference element (the popper will be relative to this)
   * @param {Element} fixedPosition - is in fixed position mode
   * @returns {Object} An object containing the offsets which will be applied to the popper
   */
  function getReferenceOffsets(state, popper, reference) {
    var fixedPosition = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

    var commonOffsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, getReferenceNode(reference));
    return getOffsetRectRelativeToArbitraryNode(reference, commonOffsetParent, fixedPosition);
  }

  /**
   * Get the outer sizes of the given element (offset size + margins)
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @returns {Object} object containing width and height properties
   */
  function getOuterSizes(element) {
    var window = element.ownerDocument.defaultView;
    var styles = window.getComputedStyle(element);
    var x = parseFloat(styles.marginTop || 0) + parseFloat(styles.marginBottom || 0);
    var y = parseFloat(styles.marginLeft || 0) + parseFloat(styles.marginRight || 0);
    var result = {
      width: element.offsetWidth + y,
      height: element.offsetHeight + x
    };
    return result;
  }

  /**
   * Get the opposite placement of the given one
   * @method
   * @memberof Popper.Utils
   * @argument {String} placement
   * @returns {String} flipped placement
   */
  function getOppositePlacement(placement) {
    var hash = { left: 'right', right: 'left', bottom: 'top', top: 'bottom' };
    return placement.replace(/left|right|bottom|top/g, function (matched) {
      return hash[matched];
    });
  }

  /**
   * Get offsets to the popper
   * @method
   * @memberof Popper.Utils
   * @param {Object} position - CSS position the Popper will get applied
   * @param {HTMLElement} popper - the popper element
   * @param {Object} referenceOffsets - the reference offsets (the popper will be relative to this)
   * @param {String} placement - one of the valid placement options
   * @returns {Object} popperOffsets - An object containing the offsets which will be applied to the popper
   */
  function getPopperOffsets(popper, referenceOffsets, placement) {
    placement = placement.split('-')[0];

    // Get popper node sizes
    var popperRect = getOuterSizes(popper);

    // Add position, width and height to our offsets object
    var popperOffsets = {
      width: popperRect.width,
      height: popperRect.height
    };

    // depending by the popper placement we have to compute its offsets slightly differently
    var isHoriz = ['right', 'left'].indexOf(placement) !== -1;
    var mainSide = isHoriz ? 'top' : 'left';
    var secondarySide = isHoriz ? 'left' : 'top';
    var measurement = isHoriz ? 'height' : 'width';
    var secondaryMeasurement = !isHoriz ? 'height' : 'width';

    popperOffsets[mainSide] = referenceOffsets[mainSide] + referenceOffsets[measurement] / 2 - popperRect[measurement] / 2;
    if (placement === secondarySide) {
      popperOffsets[secondarySide] = referenceOffsets[secondarySide] - popperRect[secondaryMeasurement];
    } else {
      popperOffsets[secondarySide] = referenceOffsets[getOppositePlacement(secondarySide)];
    }

    return popperOffsets;
  }

  /**
   * Mimics the `find` method of Array
   * @method
   * @memberof Popper.Utils
   * @argument {Array} arr
   * @argument prop
   * @argument value
   * @returns index or -1
   */
  function find(arr, check) {
    // use native find if supported
    if (Array.prototype.find) {
      return arr.find(check);
    }

    // use `filter` to obtain the same behavior of `find`
    return arr.filter(check)[0];
  }

  /**
   * Return the index of the matching object
   * @method
   * @memberof Popper.Utils
   * @argument {Array} arr
   * @argument prop
   * @argument value
   * @returns index or -1
   */
  function findIndex(arr, prop, value) {
    // use native findIndex if supported
    if (Array.prototype.findIndex) {
      return arr.findIndex(function (cur) {
        return cur[prop] === value;
      });
    }

    // use `find` + `indexOf` if `findIndex` isn't supported
    var match = find(arr, function (obj) {
      return obj[prop] === value;
    });
    return arr.indexOf(match);
  }

  /**
   * Loop trough the list of modifiers and run them in order,
   * each of them will then edit the data object.
   * @method
   * @memberof Popper.Utils
   * @param {dataObject} data
   * @param {Array} modifiers
   * @param {String} ends - Optional modifier name used as stopper
   * @returns {dataObject}
   */
  function runModifiers(modifiers, data, ends) {
    var modifiersToRun = ends === undefined ? modifiers : modifiers.slice(0, findIndex(modifiers, 'name', ends));

    modifiersToRun.forEach(function (modifier) {
      if (modifier['function']) {
        // eslint-disable-line dot-notation
        console.warn('`modifier.function` is deprecated, use `modifier.fn`!');
      }
      var fn = modifier['function'] || modifier.fn; // eslint-disable-line dot-notation
      if (modifier.enabled && isFunction$1(fn)) {
        // Add properties to offsets to make them a complete clientRect object
        // we do this before each modifier to make sure the previous one doesn't
        // mess with these values
        data.offsets.popper = getClientRect(data.offsets.popper);
        data.offsets.reference = getClientRect(data.offsets.reference);

        data = fn(data, modifier);
      }
    });

    return data;
  }

  /**
   * Updates the position of the popper, computing the new offsets and applying
   * the new style.<br />
   * Prefer `scheduleUpdate` over `update` because of performance reasons.
   * @method
   * @memberof Popper
   */
  function update() {
    // if popper is destroyed, don't perform any further update
    if (this.state.isDestroyed) {
      return;
    }

    var data = {
      instance: this,
      styles: {},
      arrowStyles: {},
      attributes: {},
      flipped: false,
      offsets: {}
    };

    // compute reference element offsets
    data.offsets.reference = getReferenceOffsets(this.state, this.popper, this.reference, this.options.positionFixed);

    // compute auto placement, store placement inside the data object,
    // modifiers will be able to edit `placement` if needed
    // and refer to originalPlacement to know the original value
    data.placement = computeAutoPlacement(this.options.placement, data.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding);

    // store the computed placement inside `originalPlacement`
    data.originalPlacement = data.placement;

    data.positionFixed = this.options.positionFixed;

    // compute the popper offsets
    data.offsets.popper = getPopperOffsets(this.popper, data.offsets.reference, data.placement);

    data.offsets.popper.position = this.options.positionFixed ? 'fixed' : 'absolute';

    // run the modifiers
    data = runModifiers(this.modifiers, data);

    // the first `update` will call `onCreate` callback
    // the other ones will call `onUpdate` callback
    if (!this.state.isCreated) {
      this.state.isCreated = true;
      this.options.onCreate(data);
    } else {
      this.options.onUpdate(data);
    }
  }

  /**
   * Helper used to know if the given modifier is enabled.
   * @method
   * @memberof Popper.Utils
   * @returns {Boolean}
   */
  function isModifierEnabled(modifiers, modifierName) {
    return modifiers.some(function (_ref) {
      var name = _ref.name,
          enabled = _ref.enabled;
      return enabled && name === modifierName;
    });
  }

  /**
   * Get the prefixed supported property name
   * @method
   * @memberof Popper.Utils
   * @argument {String} property (camelCase)
   * @returns {String} prefixed property (camelCase or PascalCase, depending on the vendor prefix)
   */
  function getSupportedPropertyName(property) {
    var prefixes = [false, 'ms', 'Webkit', 'Moz', 'O'];
    var upperProp = property.charAt(0).toUpperCase() + property.slice(1);

    for (var i = 0; i < prefixes.length; i++) {
      var prefix = prefixes[i];
      var toCheck = prefix ? '' + prefix + upperProp : property;
      if (typeof document.body.style[toCheck] !== 'undefined') {
        return toCheck;
      }
    }
    return null;
  }

  /**
   * Destroys the popper.
   * @method
   * @memberof Popper
   */
  function destroy$1() {
    this.state.isDestroyed = true;

    // touch DOM only if `applyStyle` modifier is enabled
    if (isModifierEnabled(this.modifiers, 'applyStyle')) {
      this.popper.removeAttribute('x-placement');
      this.popper.style.position = '';
      this.popper.style.top = '';
      this.popper.style.left = '';
      this.popper.style.right = '';
      this.popper.style.bottom = '';
      this.popper.style.willChange = '';
      this.popper.style[getSupportedPropertyName('transform')] = '';
    }

    this.disableEventListeners();

    // remove the popper if user explicitly asked for the deletion on destroy
    // do not use `remove` because IE11 doesn't support it
    if (this.options.removeOnDestroy) {
      this.popper.parentNode.removeChild(this.popper);
    }
    return this;
  }

  /**
   * Get the window associated with the element
   * @argument {Element} element
   * @returns {Window}
   */
  function getWindow(element) {
    var ownerDocument = element.ownerDocument;
    return ownerDocument ? ownerDocument.defaultView : window;
  }

  function attachToScrollParents(scrollParent, event, callback, scrollParents) {
    var isBody = scrollParent.nodeName === 'BODY';
    var target = isBody ? scrollParent.ownerDocument.defaultView : scrollParent;
    target.addEventListener(event, callback, { passive: true });

    if (!isBody) {
      attachToScrollParents(getScrollParent(target.parentNode), event, callback, scrollParents);
    }
    scrollParents.push(target);
  }

  /**
   * Setup needed event listeners used to update the popper position
   * @method
   * @memberof Popper.Utils
   * @private
   */
  function setupEventListeners(reference, options, state, updateBound) {
    // Resize event listener on window
    state.updateBound = updateBound;
    getWindow(reference).addEventListener('resize', state.updateBound, { passive: true });

    // Scroll event listener on scroll parents
    var scrollElement = getScrollParent(reference);
    attachToScrollParents(scrollElement, 'scroll', state.updateBound, state.scrollParents);
    state.scrollElement = scrollElement;
    state.eventsEnabled = true;

    return state;
  }

  /**
   * It will add resize/scroll events and start recalculating
   * position of the popper element when they are triggered.
   * @method
   * @memberof Popper
   */
  function enableEventListeners() {
    if (!this.state.eventsEnabled) {
      this.state = setupEventListeners(this.reference, this.options, this.state, this.scheduleUpdate);
    }
  }

  /**
   * Remove event listeners used to update the popper position
   * @method
   * @memberof Popper.Utils
   * @private
   */
  function removeEventListeners(reference, state) {
    // Remove resize event listener on window
    getWindow(reference).removeEventListener('resize', state.updateBound);

    // Remove scroll event listener on scroll parents
    state.scrollParents.forEach(function (target) {
      target.removeEventListener('scroll', state.updateBound);
    });

    // Reset state
    state.updateBound = null;
    state.scrollParents = [];
    state.scrollElement = null;
    state.eventsEnabled = false;
    return state;
  }

  /**
   * It will remove resize/scroll events and won't recalculate popper position
   * when they are triggered. It also won't trigger `onUpdate` callback anymore,
   * unless you call `update` method manually.
   * @method
   * @memberof Popper
   */
  function disableEventListeners() {
    if (this.state.eventsEnabled) {
      cancelAnimationFrame(this.scheduleUpdate);
      this.state = removeEventListeners(this.reference, this.state);
    }
  }

  /**
   * Tells if a given input is a number
   * @method
   * @memberof Popper.Utils
   * @param {*} input to check
   * @return {Boolean}
   */
  function isNumeric(n) {
    return n !== '' && !isNaN(parseFloat(n)) && isFinite(n);
  }

  /**
   * Set the style to the given popper
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element - Element to apply the style to
   * @argument {Object} styles
   * Object with a list of properties and values which will be applied to the element
   */
  function setStyles(element, styles) {
    Object.keys(styles).forEach(function (prop) {
      var unit = '';
      // add unit if the value is numeric and is one of the following
      if (['width', 'height', 'top', 'right', 'bottom', 'left'].indexOf(prop) !== -1 && isNumeric(styles[prop])) {
        unit = 'px';
      }
      element.style[prop] = styles[prop] + unit;
    });
  }

  /**
   * Set the attributes to the given popper
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element - Element to apply the attributes to
   * @argument {Object} styles
   * Object with a list of properties and values which will be applied to the element
   */
  function setAttributes(element, attributes) {
    Object.keys(attributes).forEach(function (prop) {
      var value = attributes[prop];
      if (value !== false) {
        element.setAttribute(prop, attributes[prop]);
      } else {
        element.removeAttribute(prop);
      }
    });
  }

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by `update` method
   * @argument {Object} data.styles - List of style properties - values to apply to popper element
   * @argument {Object} data.attributes - List of attribute properties - values to apply to popper element
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The same data object
   */
  function applyStyle(data) {
    // any property present in `data.styles` will be applied to the popper,
    // in this way we can make the 3rd party modifiers add custom styles to it
    // Be aware, modifiers could override the properties defined in the previous
    // lines of this modifier!
    setStyles(data.instance.popper, data.styles);

    // any property present in `data.attributes` will be applied to the popper,
    // they will be set as HTML attributes of the element
    setAttributes(data.instance.popper, data.attributes);

    // if arrowElement is defined and arrowStyles has some properties
    if (data.arrowElement && Object.keys(data.arrowStyles).length) {
      setStyles(data.arrowElement, data.arrowStyles);
    }

    return data;
  }

  /**
   * Set the x-placement attribute before everything else because it could be used
   * to add margins to the popper margins needs to be calculated to get the
   * correct popper offsets.
   * @method
   * @memberof Popper.modifiers
   * @param {HTMLElement} reference - The reference element used to position the popper
   * @param {HTMLElement} popper - The HTML element used as popper
   * @param {Object} options - Popper.js options
   */
  function applyStyleOnLoad(reference, popper, options, modifierOptions, state) {
    // compute reference element offsets
    var referenceOffsets = getReferenceOffsets(state, popper, reference, options.positionFixed);

    // compute auto placement, store placement inside the data object,
    // modifiers will be able to edit `placement` if needed
    // and refer to originalPlacement to know the original value
    var placement = computeAutoPlacement(options.placement, referenceOffsets, popper, reference, options.modifiers.flip.boundariesElement, options.modifiers.flip.padding);

    popper.setAttribute('x-placement', placement);

    // Apply `position` to popper before anything else because
    // without the position applied we can't guarantee correct computations
    setStyles(popper, { position: options.positionFixed ? 'fixed' : 'absolute' });

    return options;
  }

  /**
   * @function
   * @memberof Popper.Utils
   * @argument {Object} data - The data object generated by `update` method
   * @argument {Boolean} shouldRound - If the offsets should be rounded at all
   * @returns {Object} The popper's position offsets rounded
   *
   * The tale of pixel-perfect positioning. It's still not 100% perfect, but as
   * good as it can be within reason.
   * Discussion here: https://github.com/FezVrasta/popper.js/pull/715
   *
   * Low DPI screens cause a popper to be blurry if not using full pixels (Safari
   * as well on High DPI screens).
   *
   * Firefox prefers no rounding for positioning and does not have blurriness on
   * high DPI screens.
   *
   * Only horizontal placement and left/right values need to be considered.
   */
  function getRoundedOffsets(data, shouldRound) {
    var _data$offsets = data.offsets,
        popper = _data$offsets.popper,
        reference = _data$offsets.reference;
    var round = Math.round,
        floor = Math.floor;

    var noRound = function noRound(v) {
      return v;
    };

    var referenceWidth = round(reference.width);
    var popperWidth = round(popper.width);

    var isVertical = ['left', 'right'].indexOf(data.placement) !== -1;
    var isVariation = data.placement.indexOf('-') !== -1;
    var sameWidthParity = referenceWidth % 2 === popperWidth % 2;
    var bothOddWidth = referenceWidth % 2 === 1 && popperWidth % 2 === 1;

    var horizontalToInteger = !shouldRound ? noRound : isVertical || isVariation || sameWidthParity ? round : floor;
    var verticalToInteger = !shouldRound ? noRound : round;

    return {
      left: horizontalToInteger(bothOddWidth && !isVariation && shouldRound ? popper.left - 1 : popper.left),
      top: verticalToInteger(popper.top),
      bottom: verticalToInteger(popper.bottom),
      right: horizontalToInteger(popper.right)
    };
  }

  var isFirefox = isBrowser$1 && /Firefox/i.test(navigator.userAgent);

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by `update` method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function computeStyle(data, options) {
    var x = options.x,
        y = options.y;
    var popper = data.offsets.popper;

    // Remove this legacy support in Popper.js v2

    var legacyGpuAccelerationOption = find(data.instance.modifiers, function (modifier) {
      return modifier.name === 'applyStyle';
    }).gpuAcceleration;
    if (legacyGpuAccelerationOption !== undefined) {
      console.warn('WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!');
    }
    var gpuAcceleration = legacyGpuAccelerationOption !== undefined ? legacyGpuAccelerationOption : options.gpuAcceleration;

    var offsetParent = getOffsetParent(data.instance.popper);
    var offsetParentRect = getBoundingClientRect(offsetParent);

    // Styles
    var styles = {
      position: popper.position
    };

    var offsets = getRoundedOffsets(data, window.devicePixelRatio < 2 || !isFirefox);

    var sideA = x === 'bottom' ? 'top' : 'bottom';
    var sideB = y === 'right' ? 'left' : 'right';

    // if gpuAcceleration is set to `true` and transform is supported,
    //  we use `translate3d` to apply the position to the popper we
    // automatically use the supported prefixed version if needed
    var prefixedProperty = getSupportedPropertyName('transform');

    // now, let's make a step back and look at this code closely (wtf?)
    // If the content of the popper grows once it's been positioned, it
    // may happen that the popper gets misplaced because of the new content
    // overflowing its reference element
    // To avoid this problem, we provide two options (x and y), which allow
    // the consumer to define the offset origin.
    // If we position a popper on top of a reference element, we can set
    // `x` to `top` to make the popper grow towards its top instead of
    // its bottom.
    var left = void 0,
        top = void 0;
    if (sideA === 'bottom') {
      // when offsetParent is <html> the positioning is relative to the bottom of the screen (excluding the scrollbar)
      // and not the bottom of the html element
      if (offsetParent.nodeName === 'HTML') {
        top = -offsetParent.clientHeight + offsets.bottom;
      } else {
        top = -offsetParentRect.height + offsets.bottom;
      }
    } else {
      top = offsets.top;
    }
    if (sideB === 'right') {
      if (offsetParent.nodeName === 'HTML') {
        left = -offsetParent.clientWidth + offsets.right;
      } else {
        left = -offsetParentRect.width + offsets.right;
      }
    } else {
      left = offsets.left;
    }
    if (gpuAcceleration && prefixedProperty) {
      styles[prefixedProperty] = 'translate3d(' + left + 'px, ' + top + 'px, 0)';
      styles[sideA] = 0;
      styles[sideB] = 0;
      styles.willChange = 'transform';
    } else {
      // othwerise, we use the standard `top`, `left`, `bottom` and `right` properties
      var invertTop = sideA === 'bottom' ? -1 : 1;
      var invertLeft = sideB === 'right' ? -1 : 1;
      styles[sideA] = top * invertTop;
      styles[sideB] = left * invertLeft;
      styles.willChange = sideA + ', ' + sideB;
    }

    // Attributes
    var attributes = {
      'x-placement': data.placement
    };

    // Update `data` attributes, styles and arrowStyles
    data.attributes = _extends({}, attributes, data.attributes);
    data.styles = _extends({}, styles, data.styles);
    data.arrowStyles = _extends({}, data.offsets.arrow, data.arrowStyles);

    return data;
  }

  /**
   * Helper used to know if the given modifier depends from another one.<br />
   * It checks if the needed modifier is listed and enabled.
   * @method
   * @memberof Popper.Utils
   * @param {Array} modifiers - list of modifiers
   * @param {String} requestingName - name of requesting modifier
   * @param {String} requestedName - name of requested modifier
   * @returns {Boolean}
   */
  function isModifierRequired(modifiers, requestingName, requestedName) {
    var requesting = find(modifiers, function (_ref) {
      var name = _ref.name;
      return name === requestingName;
    });

    var isRequired = !!requesting && modifiers.some(function (modifier) {
      return modifier.name === requestedName && modifier.enabled && modifier.order < requesting.order;
    });

    if (!isRequired) {
      var _requesting = '`' + requestingName + '`';
      var requested = '`' + requestedName + '`';
      console.warn(requested + ' modifier is required by ' + _requesting + ' modifier in order to work, be sure to include it before ' + _requesting + '!');
    }
    return isRequired;
  }

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by update method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function arrow(data, options) {
    var _data$offsets$arrow;

    // arrow depends on keepTogether in order to work
    if (!isModifierRequired(data.instance.modifiers, 'arrow', 'keepTogether')) {
      return data;
    }

    var arrowElement = options.element;

    // if arrowElement is a string, suppose it's a CSS selector
    if (typeof arrowElement === 'string') {
      arrowElement = data.instance.popper.querySelector(arrowElement);

      // if arrowElement is not found, don't run the modifier
      if (!arrowElement) {
        return data;
      }
    } else {
      // if the arrowElement isn't a query selector we must check that the
      // provided DOM node is child of its popper node
      if (!data.instance.popper.contains(arrowElement)) {
        console.warn('WARNING: `arrow.element` must be child of its popper element!');
        return data;
      }
    }

    var placement = data.placement.split('-')[0];
    var _data$offsets = data.offsets,
        popper = _data$offsets.popper,
        reference = _data$offsets.reference;

    var isVertical = ['left', 'right'].indexOf(placement) !== -1;

    var len = isVertical ? 'height' : 'width';
    var sideCapitalized = isVertical ? 'Top' : 'Left';
    var side = sideCapitalized.toLowerCase();
    var altSide = isVertical ? 'left' : 'top';
    var opSide = isVertical ? 'bottom' : 'right';
    var arrowElementSize = getOuterSizes(arrowElement)[len];

    //
    // extends keepTogether behavior making sure the popper and its
    // reference have enough pixels in conjunction
    //

    // top/left side
    if (reference[opSide] - arrowElementSize < popper[side]) {
      data.offsets.popper[side] -= popper[side] - (reference[opSide] - arrowElementSize);
    }
    // bottom/right side
    if (reference[side] + arrowElementSize > popper[opSide]) {
      data.offsets.popper[side] += reference[side] + arrowElementSize - popper[opSide];
    }
    data.offsets.popper = getClientRect(data.offsets.popper);

    // compute center of the popper
    var center = reference[side] + reference[len] / 2 - arrowElementSize / 2;

    // Compute the sideValue using the updated popper offsets
    // take popper margin in account because we don't have this info available
    var css = getStyleComputedProperty(data.instance.popper);
    var popperMarginSide = parseFloat(css['margin' + sideCapitalized], 10);
    var popperBorderSide = parseFloat(css['border' + sideCapitalized + 'Width'], 10);
    var sideValue = center - data.offsets.popper[side] - popperMarginSide - popperBorderSide;

    // prevent arrowElement from being placed not contiguously to its popper
    sideValue = Math.max(Math.min(popper[len] - arrowElementSize, sideValue), 0);

    data.arrowElement = arrowElement;
    data.offsets.arrow = (_data$offsets$arrow = {}, defineProperty$1(_data$offsets$arrow, side, Math.round(sideValue)), defineProperty$1(_data$offsets$arrow, altSide, ''), _data$offsets$arrow);

    return data;
  }

  /**
   * Get the opposite placement variation of the given one
   * @method
   * @memberof Popper.Utils
   * @argument {String} placement variation
   * @returns {String} flipped placement variation
   */
  function getOppositeVariation(variation) {
    if (variation === 'end') {
      return 'start';
    } else if (variation === 'start') {
      return 'end';
    }
    return variation;
  }

  /**
   * List of accepted placements to use as values of the `placement` option.<br />
   * Valid placements are:
   * - `auto`
   * - `top`
   * - `right`
   * - `bottom`
   * - `left`
   *
   * Each placement can have a variation from this list:
   * - `-start`
   * - `-end`
   *
   * Variations are interpreted easily if you think of them as the left to right
   * written languages. Horizontally (`top` and `bottom`), `start` is left and `end`
   * is right.<br />
   * Vertically (`left` and `right`), `start` is top and `end` is bottom.
   *
   * Some valid examples are:
   * - `top-end` (on top of reference, right aligned)
   * - `right-start` (on right of reference, top aligned)
   * - `bottom` (on bottom, centered)
   * - `auto-end` (on the side with more space available, alignment depends by placement)
   *
   * @static
   * @type {Array}
   * @enum {String}
   * @readonly
   * @method placements
   * @memberof Popper
   */
  var placements = ['auto-start', 'auto', 'auto-end', 'top-start', 'top', 'top-end', 'right-start', 'right', 'right-end', 'bottom-end', 'bottom', 'bottom-start', 'left-end', 'left', 'left-start'];

  // Get rid of `auto` `auto-start` and `auto-end`
  var validPlacements = placements.slice(3);

  /**
   * Given an initial placement, returns all the subsequent placements
   * clockwise (or counter-clockwise).
   *
   * @method
   * @memberof Popper.Utils
   * @argument {String} placement - A valid placement (it accepts variations)
   * @argument {Boolean} counter - Set to true to walk the placements counterclockwise
   * @returns {Array} placements including their variations
   */
  function clockwise(placement) {
    var counter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    var index = validPlacements.indexOf(placement);
    var arr = validPlacements.slice(index + 1).concat(validPlacements.slice(0, index));
    return counter ? arr.reverse() : arr;
  }

  var BEHAVIORS = {
    FLIP: 'flip',
    CLOCKWISE: 'clockwise',
    COUNTERCLOCKWISE: 'counterclockwise'
  };

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by update method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function flip(data, options) {
    // if `inner` modifier is enabled, we can't use the `flip` modifier
    if (isModifierEnabled(data.instance.modifiers, 'inner')) {
      return data;
    }

    if (data.flipped && data.placement === data.originalPlacement) {
      // seems like flip is trying to loop, probably there's not enough space on any of the flippable sides
      return data;
    }

    var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, options.boundariesElement, data.positionFixed);

    var placement = data.placement.split('-')[0];
    var placementOpposite = getOppositePlacement(placement);
    var variation = data.placement.split('-')[1] || '';

    var flipOrder = [];

    switch (options.behavior) {
      case BEHAVIORS.FLIP:
        flipOrder = [placement, placementOpposite];
        break;
      case BEHAVIORS.CLOCKWISE:
        flipOrder = clockwise(placement);
        break;
      case BEHAVIORS.COUNTERCLOCKWISE:
        flipOrder = clockwise(placement, true);
        break;
      default:
        flipOrder = options.behavior;
    }

    flipOrder.forEach(function (step, index) {
      if (placement !== step || flipOrder.length === index + 1) {
        return data;
      }

      placement = data.placement.split('-')[0];
      placementOpposite = getOppositePlacement(placement);

      var popperOffsets = data.offsets.popper;
      var refOffsets = data.offsets.reference;

      // using floor because the reference offsets may contain decimals we are not going to consider here
      var floor = Math.floor;
      var overlapsRef = placement === 'left' && floor(popperOffsets.right) > floor(refOffsets.left) || placement === 'right' && floor(popperOffsets.left) < floor(refOffsets.right) || placement === 'top' && floor(popperOffsets.bottom) > floor(refOffsets.top) || placement === 'bottom' && floor(popperOffsets.top) < floor(refOffsets.bottom);

      var overflowsLeft = floor(popperOffsets.left) < floor(boundaries.left);
      var overflowsRight = floor(popperOffsets.right) > floor(boundaries.right);
      var overflowsTop = floor(popperOffsets.top) < floor(boundaries.top);
      var overflowsBottom = floor(popperOffsets.bottom) > floor(boundaries.bottom);

      var overflowsBoundaries = placement === 'left' && overflowsLeft || placement === 'right' && overflowsRight || placement === 'top' && overflowsTop || placement === 'bottom' && overflowsBottom;

      // flip the variation if required
      var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;

      // flips variation if reference element overflows boundaries
      var flippedVariationByRef = !!options.flipVariations && (isVertical && variation === 'start' && overflowsLeft || isVertical && variation === 'end' && overflowsRight || !isVertical && variation === 'start' && overflowsTop || !isVertical && variation === 'end' && overflowsBottom);

      // flips variation if popper content overflows boundaries
      var flippedVariationByContent = !!options.flipVariationsByContent && (isVertical && variation === 'start' && overflowsRight || isVertical && variation === 'end' && overflowsLeft || !isVertical && variation === 'start' && overflowsBottom || !isVertical && variation === 'end' && overflowsTop);

      var flippedVariation = flippedVariationByRef || flippedVariationByContent;

      if (overlapsRef || overflowsBoundaries || flippedVariation) {
        // this boolean to detect any flip loop
        data.flipped = true;

        if (overlapsRef || overflowsBoundaries) {
          placement = flipOrder[index + 1];
        }

        if (flippedVariation) {
          variation = getOppositeVariation(variation);
        }

        data.placement = placement + (variation ? '-' + variation : '');

        // this object contains `position`, we want to preserve it along with
        // any additional property we may add in the future
        data.offsets.popper = _extends({}, data.offsets.popper, getPopperOffsets(data.instance.popper, data.offsets.reference, data.placement));

        data = runModifiers(data.instance.modifiers, data, 'flip');
      }
    });
    return data;
  }

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by update method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function keepTogether(data) {
    var _data$offsets = data.offsets,
        popper = _data$offsets.popper,
        reference = _data$offsets.reference;

    var placement = data.placement.split('-')[0];
    var floor = Math.floor;
    var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;
    var side = isVertical ? 'right' : 'bottom';
    var opSide = isVertical ? 'left' : 'top';
    var measurement = isVertical ? 'width' : 'height';

    if (popper[side] < floor(reference[opSide])) {
      data.offsets.popper[opSide] = floor(reference[opSide]) - popper[measurement];
    }
    if (popper[opSide] > floor(reference[side])) {
      data.offsets.popper[opSide] = floor(reference[side]);
    }

    return data;
  }

  /**
   * Converts a string containing value + unit into a px value number
   * @function
   * @memberof {modifiers~offset}
   * @private
   * @argument {String} str - Value + unit string
   * @argument {String} measurement - `height` or `width`
   * @argument {Object} popperOffsets
   * @argument {Object} referenceOffsets
   * @returns {Number|String}
   * Value in pixels, or original string if no values were extracted
   */
  function toValue(str, measurement, popperOffsets, referenceOffsets) {
    // separate value from unit
    var split = str.match(/((?:\-|\+)?\d*\.?\d*)(.*)/);
    var value = +split[1];
    var unit = split[2];

    // If it's not a number it's an operator, I guess
    if (!value) {
      return str;
    }

    if (unit.indexOf('%') === 0) {
      var element = void 0;
      switch (unit) {
        case '%p':
          element = popperOffsets;
          break;
        case '%':
        case '%r':
        default:
          element = referenceOffsets;
      }

      var rect = getClientRect(element);
      return rect[measurement] / 100 * value;
    } else if (unit === 'vh' || unit === 'vw') {
      // if is a vh or vw, we calculate the size based on the viewport
      var size = void 0;
      if (unit === 'vh') {
        size = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
      } else {
        size = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
      }
      return size / 100 * value;
    } else {
      // if is an explicit pixel unit, we get rid of the unit and keep the value
      // if is an implicit unit, it's px, and we return just the value
      return value;
    }
  }

  /**
   * Parse an `offset` string to extrapolate `x` and `y` numeric offsets.
   * @function
   * @memberof {modifiers~offset}
   * @private
   * @argument {String} offset
   * @argument {Object} popperOffsets
   * @argument {Object} referenceOffsets
   * @argument {String} basePlacement
   * @returns {Array} a two cells array with x and y offsets in numbers
   */
  function parseOffset(offset, popperOffsets, referenceOffsets, basePlacement) {
    var offsets = [0, 0];

    // Use height if placement is left or right and index is 0 otherwise use width
    // in this way the first offset will use an axis and the second one
    // will use the other one
    var useHeight = ['right', 'left'].indexOf(basePlacement) !== -1;

    // Split the offset string to obtain a list of values and operands
    // The regex addresses values with the plus or minus sign in front (+10, -20, etc)
    var fragments = offset.split(/(\+|\-)/).map(function (frag) {
      return frag.trim();
    });

    // Detect if the offset string contains a pair of values or a single one
    // they could be separated by comma or space
    var divider = fragments.indexOf(find(fragments, function (frag) {
      return frag.search(/,|\s/) !== -1;
    }));

    if (fragments[divider] && fragments[divider].indexOf(',') === -1) {
      console.warn('Offsets separated by white space(s) are deprecated, use a comma (,) instead.');
    }

    // If divider is found, we divide the list of values and operands to divide
    // them by ofset X and Y.
    var splitRegex = /\s*,\s*|\s+/;
    var ops = divider !== -1 ? [fragments.slice(0, divider).concat([fragments[divider].split(splitRegex)[0]]), [fragments[divider].split(splitRegex)[1]].concat(fragments.slice(divider + 1))] : [fragments];

    // Convert the values with units to absolute pixels to allow our computations
    ops = ops.map(function (op, index) {
      // Most of the units rely on the orientation of the popper
      var measurement = (index === 1 ? !useHeight : useHeight) ? 'height' : 'width';
      var mergeWithPrevious = false;
      return op
      // This aggregates any `+` or `-` sign that aren't considered operators
      // e.g.: 10 + +5 => [10, +, +5]
      .reduce(function (a, b) {
        if (a[a.length - 1] === '' && ['+', '-'].indexOf(b) !== -1) {
          a[a.length - 1] = b;
          mergeWithPrevious = true;
          return a;
        } else if (mergeWithPrevious) {
          a[a.length - 1] += b;
          mergeWithPrevious = false;
          return a;
        } else {
          return a.concat(b);
        }
      }, [])
      // Here we convert the string values into number values (in px)
      .map(function (str) {
        return toValue(str, measurement, popperOffsets, referenceOffsets);
      });
    });

    // Loop trough the offsets arrays and execute the operations
    ops.forEach(function (op, index) {
      op.forEach(function (frag, index2) {
        if (isNumeric(frag)) {
          offsets[index] += frag * (op[index2 - 1] === '-' ? -1 : 1);
        }
      });
    });
    return offsets;
  }

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by update method
   * @argument {Object} options - Modifiers configuration and options
   * @argument {Number|String} options.offset=0
   * The offset value as described in the modifier description
   * @returns {Object} The data object, properly modified
   */
  function offset$1(data, _ref) {
    var offset = _ref.offset;
    var placement = data.placement,
        _data$offsets = data.offsets,
        popper = _data$offsets.popper,
        reference = _data$offsets.reference;

    var basePlacement = placement.split('-')[0];

    var offsets = void 0;
    if (isNumeric(+offset)) {
      offsets = [+offset, 0];
    } else {
      offsets = parseOffset(offset, popper, reference, basePlacement);
    }

    if (basePlacement === 'left') {
      popper.top += offsets[0];
      popper.left -= offsets[1];
    } else if (basePlacement === 'right') {
      popper.top += offsets[0];
      popper.left += offsets[1];
    } else if (basePlacement === 'top') {
      popper.left += offsets[0];
      popper.top -= offsets[1];
    } else if (basePlacement === 'bottom') {
      popper.left += offsets[0];
      popper.top += offsets[1];
    }

    data.popper = popper;
    return data;
  }

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by `update` method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function preventOverflow(data, options) {
    var boundariesElement = options.boundariesElement || getOffsetParent(data.instance.popper);

    // If offsetParent is the reference element, we really want to
    // go one step up and use the next offsetParent as reference to
    // avoid to make this modifier completely useless and look like broken
    if (data.instance.reference === boundariesElement) {
      boundariesElement = getOffsetParent(boundariesElement);
    }

    // NOTE: DOM access here
    // resets the popper's position so that the document size can be calculated excluding
    // the size of the popper element itself
    var transformProp = getSupportedPropertyName('transform');
    var popperStyles = data.instance.popper.style; // assignment to help minification
    var top = popperStyles.top,
        left = popperStyles.left,
        transform = popperStyles[transformProp];

    popperStyles.top = '';
    popperStyles.left = '';
    popperStyles[transformProp] = '';

    var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, boundariesElement, data.positionFixed);

    // NOTE: DOM access here
    // restores the original style properties after the offsets have been computed
    popperStyles.top = top;
    popperStyles.left = left;
    popperStyles[transformProp] = transform;

    options.boundaries = boundaries;

    var order = options.priority;
    var popper = data.offsets.popper;

    var check = {
      primary: function primary(placement) {
        var value = popper[placement];
        if (popper[placement] < boundaries[placement] && !options.escapeWithReference) {
          value = Math.max(popper[placement], boundaries[placement]);
        }
        return defineProperty$1({}, placement, value);
      },
      secondary: function secondary(placement) {
        var mainSide = placement === 'right' ? 'left' : 'top';
        var value = popper[mainSide];
        if (popper[placement] > boundaries[placement] && !options.escapeWithReference) {
          value = Math.min(popper[mainSide], boundaries[placement] - (placement === 'right' ? popper.width : popper.height));
        }
        return defineProperty$1({}, mainSide, value);
      }
    };

    order.forEach(function (placement) {
      var side = ['left', 'top'].indexOf(placement) !== -1 ? 'primary' : 'secondary';
      popper = _extends({}, popper, check[side](placement));
    });

    data.offsets.popper = popper;

    return data;
  }

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by `update` method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function shift(data) {
    var placement = data.placement;
    var basePlacement = placement.split('-')[0];
    var shiftvariation = placement.split('-')[1];

    // if shift shiftvariation is specified, run the modifier
    if (shiftvariation) {
      var _data$offsets = data.offsets,
          reference = _data$offsets.reference,
          popper = _data$offsets.popper;

      var isVertical = ['bottom', 'top'].indexOf(basePlacement) !== -1;
      var side = isVertical ? 'left' : 'top';
      var measurement = isVertical ? 'width' : 'height';

      var shiftOffsets = {
        start: defineProperty$1({}, side, reference[side]),
        end: defineProperty$1({}, side, reference[side] + reference[measurement] - popper[measurement])
      };

      data.offsets.popper = _extends({}, popper, shiftOffsets[shiftvariation]);
    }

    return data;
  }

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by update method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function hide(data) {
    if (!isModifierRequired(data.instance.modifiers, 'hide', 'preventOverflow')) {
      return data;
    }

    var refRect = data.offsets.reference;
    var bound = find(data.instance.modifiers, function (modifier) {
      return modifier.name === 'preventOverflow';
    }).boundaries;

    if (refRect.bottom < bound.top || refRect.left > bound.right || refRect.top > bound.bottom || refRect.right < bound.left) {
      // Avoid unnecessary DOM access if visibility hasn't changed
      if (data.hide === true) {
        return data;
      }

      data.hide = true;
      data.attributes['x-out-of-boundaries'] = '';
    } else {
      // Avoid unnecessary DOM access if visibility hasn't changed
      if (data.hide === false) {
        return data;
      }

      data.hide = false;
      data.attributes['x-out-of-boundaries'] = false;
    }

    return data;
  }

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by `update` method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function inner(data) {
    var placement = data.placement;
    var basePlacement = placement.split('-')[0];
    var _data$offsets = data.offsets,
        popper = _data$offsets.popper,
        reference = _data$offsets.reference;

    var isHoriz = ['left', 'right'].indexOf(basePlacement) !== -1;

    var subtractLength = ['top', 'left'].indexOf(basePlacement) === -1;

    popper[isHoriz ? 'left' : 'top'] = reference[basePlacement] - (subtractLength ? popper[isHoriz ? 'width' : 'height'] : 0);

    data.placement = getOppositePlacement(placement);
    data.offsets.popper = getClientRect(popper);

    return data;
  }

  /**
   * Modifier function, each modifier can have a function of this type assigned
   * to its `fn` property.<br />
   * These functions will be called on each update, this means that you must
   * make sure they are performant enough to avoid performance bottlenecks.
   *
   * @function ModifierFn
   * @argument {dataObject} data - The data object generated by `update` method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {dataObject} The data object, properly modified
   */

  /**
   * Modifiers are plugins used to alter the behavior of your poppers.<br />
   * Popper.js uses a set of 9 modifiers to provide all the basic functionalities
   * needed by the library.
   *
   * Usually you don't want to override the `order`, `fn` and `onLoad` props.
   * All the other properties are configurations that could be tweaked.
   * @namespace modifiers
   */
  var modifiers = {
    /**
     * Modifier used to shift the popper on the start or end of its reference
     * element.<br />
     * It will read the variation of the `placement` property.<br />
     * It can be one either `-end` or `-start`.
     * @memberof modifiers
     * @inner
     */
    shift: {
      /** @prop {number} order=100 - Index used to define the order of execution */
      order: 100,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: shift
    },

    /**
     * The `offset` modifier can shift your popper on both its axis.
     *
     * It accepts the following units:
     * - `px` or unit-less, interpreted as pixels
     * - `%` or `%r`, percentage relative to the length of the reference element
     * - `%p`, percentage relative to the length of the popper element
     * - `vw`, CSS viewport width unit
     * - `vh`, CSS viewport height unit
     *
     * For length is intended the main axis relative to the placement of the popper.<br />
     * This means that if the placement is `top` or `bottom`, the length will be the
     * `width`. In case of `left` or `right`, it will be the `height`.
     *
     * You can provide a single value (as `Number` or `String`), or a pair of values
     * as `String` divided by a comma or one (or more) white spaces.<br />
     * The latter is a deprecated method because it leads to confusion and will be
     * removed in v2.<br />
     * Additionally, it accepts additions and subtractions between different units.
     * Note that multiplications and divisions aren't supported.
     *
     * Valid examples are:
     * ```
     * 10
     * '10%'
     * '10, 10'
     * '10%, 10'
     * '10 + 10%'
     * '10 - 5vh + 3%'
     * '-10px + 5vh, 5px - 6%'
     * ```
     * > **NB**: If you desire to apply offsets to your poppers in a way that may make them overlap
     * > with their reference element, unfortunately, you will have to disable the `flip` modifier.
     * > You can read more on this at this [issue](https://github.com/FezVrasta/popper.js/issues/373).
     *
     * @memberof modifiers
     * @inner
     */
    offset: {
      /** @prop {number} order=200 - Index used to define the order of execution */
      order: 200,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: offset$1,
      /** @prop {Number|String} offset=0
       * The offset value as described in the modifier description
       */
      offset: 0
    },

    /**
     * Modifier used to prevent the popper from being positioned outside the boundary.
     *
     * A scenario exists where the reference itself is not within the boundaries.<br />
     * We can say it has "escaped the boundaries" — or just "escaped".<br />
     * In this case we need to decide whether the popper should either:
     *
     * - detach from the reference and remain "trapped" in the boundaries, or
     * - if it should ignore the boundary and "escape with its reference"
     *
     * When `escapeWithReference` is set to`true` and reference is completely
     * outside its boundaries, the popper will overflow (or completely leave)
     * the boundaries in order to remain attached to the edge of the reference.
     *
     * @memberof modifiers
     * @inner
     */
    preventOverflow: {
      /** @prop {number} order=300 - Index used to define the order of execution */
      order: 300,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: preventOverflow,
      /**
       * @prop {Array} [priority=['left','right','top','bottom']]
       * Popper will try to prevent overflow following these priorities by default,
       * then, it could overflow on the left and on top of the `boundariesElement`
       */
      priority: ['left', 'right', 'top', 'bottom'],
      /**
       * @prop {number} padding=5
       * Amount of pixel used to define a minimum distance between the boundaries
       * and the popper. This makes sure the popper always has a little padding
       * between the edges of its container
       */
      padding: 5,
      /**
       * @prop {String|HTMLElement} boundariesElement='scrollParent'
       * Boundaries used by the modifier. Can be `scrollParent`, `window`,
       * `viewport` or any DOM element.
       */
      boundariesElement: 'scrollParent'
    },

    /**
     * Modifier used to make sure the reference and its popper stay near each other
     * without leaving any gap between the two. Especially useful when the arrow is
     * enabled and you want to ensure that it points to its reference element.
     * It cares only about the first axis. You can still have poppers with margin
     * between the popper and its reference element.
     * @memberof modifiers
     * @inner
     */
    keepTogether: {
      /** @prop {number} order=400 - Index used to define the order of execution */
      order: 400,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: keepTogether
    },

    /**
     * This modifier is used to move the `arrowElement` of the popper to make
     * sure it is positioned between the reference element and its popper element.
     * It will read the outer size of the `arrowElement` node to detect how many
     * pixels of conjunction are needed.
     *
     * It has no effect if no `arrowElement` is provided.
     * @memberof modifiers
     * @inner
     */
    arrow: {
      /** @prop {number} order=500 - Index used to define the order of execution */
      order: 500,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: arrow,
      /** @prop {String|HTMLElement} element='[x-arrow]' - Selector or node used as arrow */
      element: '[x-arrow]'
    },

    /**
     * Modifier used to flip the popper's placement when it starts to overlap its
     * reference element.
     *
     * Requires the `preventOverflow` modifier before it in order to work.
     *
     * **NOTE:** this modifier will interrupt the current update cycle and will
     * restart it if it detects the need to flip the placement.
     * @memberof modifiers
     * @inner
     */
    flip: {
      /** @prop {number} order=600 - Index used to define the order of execution */
      order: 600,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: flip,
      /**
       * @prop {String|Array} behavior='flip'
       * The behavior used to change the popper's placement. It can be one of
       * `flip`, `clockwise`, `counterclockwise` or an array with a list of valid
       * placements (with optional variations)
       */
      behavior: 'flip',
      /**
       * @prop {number} padding=5
       * The popper will flip if it hits the edges of the `boundariesElement`
       */
      padding: 5,
      /**
       * @prop {String|HTMLElement} boundariesElement='viewport'
       * The element which will define the boundaries of the popper position.
       * The popper will never be placed outside of the defined boundaries
       * (except if `keepTogether` is enabled)
       */
      boundariesElement: 'viewport',
      /**
       * @prop {Boolean} flipVariations=false
       * The popper will switch placement variation between `-start` and `-end` when
       * the reference element overlaps its boundaries.
       *
       * The original placement should have a set variation.
       */
      flipVariations: false,
      /**
       * @prop {Boolean} flipVariationsByContent=false
       * The popper will switch placement variation between `-start` and `-end` when
       * the popper element overlaps its reference boundaries.
       *
       * The original placement should have a set variation.
       */
      flipVariationsByContent: false
    },

    /**
     * Modifier used to make the popper flow toward the inner of the reference element.
     * By default, when this modifier is disabled, the popper will be placed outside
     * the reference element.
     * @memberof modifiers
     * @inner
     */
    inner: {
      /** @prop {number} order=700 - Index used to define the order of execution */
      order: 700,
      /** @prop {Boolean} enabled=false - Whether the modifier is enabled or not */
      enabled: false,
      /** @prop {ModifierFn} */
      fn: inner
    },

    /**
     * Modifier used to hide the popper when its reference element is outside of the
     * popper boundaries. It will set a `x-out-of-boundaries` attribute which can
     * be used to hide with a CSS selector the popper when its reference is
     * out of boundaries.
     *
     * Requires the `preventOverflow` modifier before it in order to work.
     * @memberof modifiers
     * @inner
     */
    hide: {
      /** @prop {number} order=800 - Index used to define the order of execution */
      order: 800,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: hide
    },

    /**
     * Computes the style that will be applied to the popper element to gets
     * properly positioned.
     *
     * Note that this modifier will not touch the DOM, it just prepares the styles
     * so that `applyStyle` modifier can apply it. This separation is useful
     * in case you need to replace `applyStyle` with a custom implementation.
     *
     * This modifier has `850` as `order` value to maintain backward compatibility
     * with previous versions of Popper.js. Expect the modifiers ordering method
     * to change in future major versions of the library.
     *
     * @memberof modifiers
     * @inner
     */
    computeStyle: {
      /** @prop {number} order=850 - Index used to define the order of execution */
      order: 850,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: computeStyle,
      /**
       * @prop {Boolean} gpuAcceleration=true
       * If true, it uses the CSS 3D transformation to position the popper.
       * Otherwise, it will use the `top` and `left` properties
       */
      gpuAcceleration: true,
      /**
       * @prop {string} [x='bottom']
       * Where to anchor the X axis (`bottom` or `top`). AKA X offset origin.
       * Change this if your popper should grow in a direction different from `bottom`
       */
      x: 'bottom',
      /**
       * @prop {string} [x='left']
       * Where to anchor the Y axis (`left` or `right`). AKA Y offset origin.
       * Change this if your popper should grow in a direction different from `right`
       */
      y: 'right'
    },

    /**
     * Applies the computed styles to the popper element.
     *
     * All the DOM manipulations are limited to this modifier. This is useful in case
     * you want to integrate Popper.js inside a framework or view library and you
     * want to delegate all the DOM manipulations to it.
     *
     * Note that if you disable this modifier, you must make sure the popper element
     * has its position set to `absolute` before Popper.js can do its work!
     *
     * Just disable this modifier and define your own to achieve the desired effect.
     *
     * @memberof modifiers
     * @inner
     */
    applyStyle: {
      /** @prop {number} order=900 - Index used to define the order of execution */
      order: 900,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: applyStyle,
      /** @prop {Function} */
      onLoad: applyStyleOnLoad,
      /**
       * @deprecated since version 1.10.0, the property moved to `computeStyle` modifier
       * @prop {Boolean} gpuAcceleration=true
       * If true, it uses the CSS 3D transformation to position the popper.
       * Otherwise, it will use the `top` and `left` properties
       */
      gpuAcceleration: undefined
    }
  };

  /**
   * The `dataObject` is an object containing all the information used by Popper.js.
   * This object is passed to modifiers and to the `onCreate` and `onUpdate` callbacks.
   * @name dataObject
   * @property {Object} data.instance The Popper.js instance
   * @property {String} data.placement Placement applied to popper
   * @property {String} data.originalPlacement Placement originally defined on init
   * @property {Boolean} data.flipped True if popper has been flipped by flip modifier
   * @property {Boolean} data.hide True if the reference element is out of boundaries, useful to know when to hide the popper
   * @property {HTMLElement} data.arrowElement Node used as arrow by arrow modifier
   * @property {Object} data.styles Any CSS property defined here will be applied to the popper. It expects the JavaScript nomenclature (eg. `marginBottom`)
   * @property {Object} data.arrowStyles Any CSS property defined here will be applied to the popper arrow. It expects the JavaScript nomenclature (eg. `marginBottom`)
   * @property {Object} data.boundaries Offsets of the popper boundaries
   * @property {Object} data.offsets The measurements of popper, reference and arrow elements
   * @property {Object} data.offsets.popper `top`, `left`, `width`, `height` values
   * @property {Object} data.offsets.reference `top`, `left`, `width`, `height` values
   * @property {Object} data.offsets.arrow] `top` and `left` offsets, only one of them will be different from 0
   */

  /**
   * Default options provided to Popper.js constructor.<br />
   * These can be overridden using the `options` argument of Popper.js.<br />
   * To override an option, simply pass an object with the same
   * structure of the `options` object, as the 3rd argument. For example:
   * ```
   * new Popper(ref, pop, {
   *   modifiers: {
   *     preventOverflow: { enabled: false }
   *   }
   * })
   * ```
   * @type {Object}
   * @static
   * @memberof Popper
   */
  var Defaults = {
    /**
     * Popper's placement.
     * @prop {Popper.placements} placement='bottom'
     */
    placement: 'bottom',

    /**
     * Set this to true if you want popper to position it self in 'fixed' mode
     * @prop {Boolean} positionFixed=false
     */
    positionFixed: false,

    /**
     * Whether events (resize, scroll) are initially enabled.
     * @prop {Boolean} eventsEnabled=true
     */
    eventsEnabled: true,

    /**
     * Set to true if you want to automatically remove the popper when
     * you call the `destroy` method.
     * @prop {Boolean} removeOnDestroy=false
     */
    removeOnDestroy: false,

    /**
     * Callback called when the popper is created.<br />
     * By default, it is set to no-op.<br />
     * Access Popper.js instance with `data.instance`.
     * @prop {onCreate}
     */
    onCreate: function onCreate() {},

    /**
     * Callback called when the popper is updated. This callback is not called
     * on the initialization/creation of the popper, but only on subsequent
     * updates.<br />
     * By default, it is set to no-op.<br />
     * Access Popper.js instance with `data.instance`.
     * @prop {onUpdate}
     */
    onUpdate: function onUpdate() {},

    /**
     * List of modifiers used to modify the offsets before they are applied to the popper.
     * They provide most of the functionalities of Popper.js.
     * @prop {modifiers}
     */
    modifiers: modifiers
  };

  /**
   * @callback onCreate
   * @param {dataObject} data
   */

  /**
   * @callback onUpdate
   * @param {dataObject} data
   */

  // Utils
  // Methods
  var Popper = function () {
    /**
     * Creates a new Popper.js instance.
     * @class Popper
     * @param {Element|referenceObject} reference - The reference element used to position the popper
     * @param {Element} popper - The HTML / XML element used as the popper
     * @param {Object} options - Your custom options to override the ones defined in [Defaults](#defaults)
     * @return {Object} instance - The generated Popper.js instance
     */
    function Popper(reference, popper) {
      var _this = this;

      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      classCallCheck(this, Popper);

      this.scheduleUpdate = function () {
        return requestAnimationFrame(_this.update);
      };

      // make update() debounced, so that it only runs at most once-per-tick
      this.update = debounce(this.update.bind(this));

      // with {} we create a new object with the options inside it
      this.options = _extends({}, Popper.Defaults, options);

      // init state
      this.state = {
        isDestroyed: false,
        isCreated: false,
        scrollParents: []
      };

      // get reference and popper elements (allow jQuery wrappers)
      this.reference = reference && reference.jquery ? reference[0] : reference;
      this.popper = popper && popper.jquery ? popper[0] : popper;

      // Deep merge modifiers options
      this.options.modifiers = {};
      Object.keys(_extends({}, Popper.Defaults.modifiers, options.modifiers)).forEach(function (name) {
        _this.options.modifiers[name] = _extends({}, Popper.Defaults.modifiers[name] || {}, options.modifiers ? options.modifiers[name] : {});
      });

      // Refactoring modifiers' list (Object => Array)
      this.modifiers = Object.keys(this.options.modifiers).map(function (name) {
        return _extends({
          name: name
        }, _this.options.modifiers[name]);
      })
      // sort the modifiers by order
      .sort(function (a, b) {
        return a.order - b.order;
      });

      // modifiers have the ability to execute arbitrary code when Popper.js get inited
      // such code is executed in the same order of its modifier
      // they could add new properties to their options configuration
      // BE AWARE: don't add options to `options.modifiers.name` but to `modifierOptions`!
      this.modifiers.forEach(function (modifierOptions) {
        if (modifierOptions.enabled && isFunction$1(modifierOptions.onLoad)) {
          modifierOptions.onLoad(_this.reference, _this.popper, _this.options, modifierOptions, _this.state);
        }
      });

      // fire the first update to position the popper in the right place
      this.update();

      var eventsEnabled = this.options.eventsEnabled;
      if (eventsEnabled) {
        // setup event listeners, they will take care of update the position in specific situations
        this.enableEventListeners();
      }

      this.state.eventsEnabled = eventsEnabled;
    }

    // We can't use class properties because they don't get listed in the
    // class prototype and break stuff like Sinon stubs


    createClass(Popper, [{
      key: 'update',
      value: function update$$1() {
        return update.call(this);
      }
    }, {
      key: 'destroy',
      value: function destroy$$1() {
        return destroy$1.call(this);
      }
    }, {
      key: 'enableEventListeners',
      value: function enableEventListeners$$1() {
        return enableEventListeners.call(this);
      }
    }, {
      key: 'disableEventListeners',
      value: function disableEventListeners$$1() {
        return disableEventListeners.call(this);
      }

      /**
       * Schedules an update. It will run on the next UI update available.
       * @method scheduleUpdate
       * @memberof Popper
       */


      /**
       * Collection of utilities useful when writing custom modifiers.
       * Starting from version 1.7, this method is available only if you
       * include `popper-utils.js` before `popper.js`.
       *
       * **DEPRECATION**: This way to access PopperUtils is deprecated
       * and will be removed in v2! Use the PopperUtils module directly instead.
       * Due to the high instability of the methods contained in Utils, we can't
       * guarantee them to follow semver. Use them at your own risk!
       * @static
       * @private
       * @type {Object}
       * @deprecated since version 1.8
       * @member Utils
       * @memberof Popper
       */

    }]);
    return Popper;
  }();

  /**
   * The `referenceObject` is an object that provides an interface compatible with Popper.js
   * and lets you use it as replacement of a real DOM node.<br />
   * You can use this method to position a popper relatively to a set of coordinates
   * in case you don't have a DOM node to use as reference.
   *
   * ```
   * new Popper(referenceObject, popperNode);
   * ```
   *
   * NB: This feature isn't supported in Internet Explorer 10.
   * @name referenceObject
   * @property {Function} data.getBoundingClientRect
   * A function that returns a set of coordinates compatible with the native `getBoundingClientRect` method.
   * @property {number} data.clientWidth
   * An ES6 getter that will return the width of the virtual reference element.
   * @property {number} data.clientHeight
   * An ES6 getter that will return the height of the virtual reference element.
   */


  Popper.Utils = (typeof window !== 'undefined' ? window : global).PopperUtils;
  Popper.placements = placements;
  Popper.Defaults = Defaults;

  var BvEvent =
  /*#__PURE__*/
  function () {
    function BvEvent(type) {
      var eventInit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      _classCallCheck(this, BvEvent);

      // Start by emulating native Event constructor
      if (!type) {
        /* istanbul ignore next */
        throw new TypeError("Failed to construct '".concat(this.constructor.name, "'. 1 argument required, ").concat(arguments.length, " given."));
      } // Merge defaults first, the eventInit, and the type last
      // so it can't be overwritten


      assign(this, BvEvent.Defaults, this.constructor.Defaults, eventInit, {
        type: type
      }); // Freeze some props as readonly, but leave them enumerable

      defineProperties(this, {
        type: readonlyDescriptor(),
        cancelable: readonlyDescriptor(),
        nativeEvent: readonlyDescriptor(),
        target: readonlyDescriptor(),
        relatedTarget: readonlyDescriptor(),
        vueTarget: readonlyDescriptor(),
        componentId: readonlyDescriptor()
      }); // Create a private variable using closure scoping

      var defaultPrevented = false; // Recreate preventDefault method. One way setter

      this.preventDefault = function preventDefault() {
        if (this.cancelable) {
          defaultPrevented = true;
        }
      }; // Create `defaultPrevented` publicly accessible prop that
      // can only be altered by the preventDefault method


      defineProperty(this, 'defaultPrevented', {
        enumerable: true,
        get: function get() {
          return defaultPrevented;
        }
      });
    }

    _createClass(BvEvent, null, [{
      key: "Defaults",
      get: function get() {
        return {
          type: '',
          cancelable: true,
          nativeEvent: null,
          target: null,
          relatedTarget: null,
          vueTarget: null,
          componentId: null
        };
      }
    }]);

    return BvEvent;
  }(); // Named Exports

  var eventOptions = {
    passive: true,
    capture: false
  }; // @vue/component

  var clickOutMixin = {
    data: function data() {
      return {
        listenForClickOut: false
      };
    },
    watch: {
      listenForClickOut: function listenForClickOut(newValue, oldValue) {
        if (newValue !== oldValue) {
          eventOff(this.clickOutElement, this.clickOutEventName, this._clickOutHandler, eventOptions);

          if (newValue) {
            eventOn(this.clickOutElement, this.clickOutEventName, this._clickOutHandler, eventOptions);
          }
        }
      }
    },
    beforeCreate: function beforeCreate() {
      // Declare non-reactive properties
      this.clickOutElement = null;
      this.clickOutEventName = null;
    },
    mounted: function mounted() {
      if (!this.clickOutElement) {
        this.clickOutElement = document;
      }

      if (!this.clickOutEventName) {
        this.clickOutEventName = 'ontouchstart' in document.documentElement ? 'touchstart' : 'click';
      }

      if (this.listenForClickOut) {
        eventOn(this.clickOutElement, this.clickOutEventName, this._clickOutHandler, eventOptions);
      }
    },
    beforeDestroy: function beforeDestroy()
    /* istanbul ignore next */
    {
      eventOff(this.clickOutElement, this.clickOutEventName, this._clickOutHandler, eventOptions);
    },
    methods: {
      isClickOut: function isClickOut(evt) {
        return !contains(this.$el, evt.target);
      },
      _clickOutHandler: function _clickOutHandler(evt) {
        if (this.clickOutHandler && this.isClickOut(evt)) {
          this.clickOutHandler(evt);
        }
      }
    }
  };

  var eventOptions$1 = {
    passive: true,
    capture: false
  }; // @vue/component

  var focusInMixin = {
    data: function data() {
      return {
        listenForFocusIn: false
      };
    },
    watch: {
      listenForFocusIn: function listenForFocusIn(newValue, oldValue) {
        if (newValue !== oldValue) {
          eventOff(this.focusInElement, 'focusin', this._focusInHandler, eventOptions$1);

          if (newValue) {
            eventOn(this.focusInElement, 'focusin', this._focusInHandler, eventOptions$1);
          }
        }
      }
    },
    beforeCreate: function beforeCreate() {
      // Declare non-reactive properties
      this.focusInElement = null;
    },
    mounted: function mounted() {
      if (!this.focusInElement) {
        this.focusInElement = document;
      }

      if (this.listenForFocusIn) {
        eventOn(this.focusInElement, 'focusin', this._focusInHandler, eventOptions$1);
      }
    },
    beforeDestroy: function beforeDestroy()
    /* istanbul ignore next */
    {
      eventOff(this.focusInElement, 'focusin', this._focusInHandler, eventOptions$1);
    },
    methods: {
      _focusInHandler: function _focusInHandler(evt) {
        if (this.focusInHandler) {
          this.focusInHandler(evt);
        }
      }
    }
  };

  var filterVisibles = function filterVisibles(els) {
    return (els || []).filter(isVisible);
  }; // Root dropdown event names


  var ROOT_DROPDOWN_PREFIX = 'bv::dropdown::';
  var ROOT_DROPDOWN_SHOWN = "".concat(ROOT_DROPDOWN_PREFIX, "shown");
  var ROOT_DROPDOWN_HIDDEN = "".concat(ROOT_DROPDOWN_PREFIX, "hidden"); // Delay when loosing focus before closing menu (in ms)

  var FOCUSOUT_DELAY = hasTouchSupport ? 450 : 150; // Dropdown item CSS selectors

  var Selector = {
    FORM_CHILD: '.dropdown form',
    ITEM_SELECTOR: ['.dropdown-item', '.b-dropdown-form'].map(function (selector) {
      return "".concat(selector, ":not(.disabled):not([disabled])");
    }).join(', ')
  }; // Popper attachment positions

  var AttachmentMap = {
    // Dropup left align
    TOP: 'top-start',
    // Dropup right align
    TOPEND: 'top-end',
    // Dropdown left align
    BOTTOM: 'bottom-start',
    // Dropdown right align
    BOTTOMEND: 'bottom-end',
    // Dropright left align
    RIGHT: 'right-start',
    // Dropright right align
    RIGHTEND: 'right-end',
    // Dropleft left align
    LEFT: 'left-start',
    // Dropleft right align
    LEFTEND: 'left-end'
  }; // @vue/component

  var dropdownMixin = {
    mixins: [idMixin, clickOutMixin, focusInMixin],
    provide: function provide() {
      return {
        bvDropdown: this
      };
    },
    props: {
      disabled: {
        type: Boolean,
        default: false
      },
      text: {
        // Button label
        type: String,
        default: ''
      },
      html: {
        // Button label
        type: String
      },
      dropup: {
        // place on top if possible
        type: Boolean,
        default: false
      },
      dropright: {
        // place right if possible
        type: Boolean,
        default: false
      },
      dropleft: {
        // place left if possible
        type: Boolean,
        default: false
      },
      right: {
        // Right align menu (default is left align)
        type: Boolean,
        default: false
      },
      offset: {
        // Number of pixels to offset menu, or a CSS unit value (i.e. 1px, 1rem, etc)
        type: [Number, String],
        default: 0
      },
      noFlip: {
        // Disable auto-flipping of menu from bottom<=>top
        type: Boolean,
        default: false
      },
      lazy: {
        // If true, only render menu contents when open
        type: Boolean,
        default: false
      },
      popperOpts: {
        // type: Object,
        default: function _default() {}
      }
    },
    data: function data() {
      return {
        visible: false,
        inNavbar: null,
        visibleChangePrevented: false
      };
    },
    computed: {
      toggler: function toggler() {
        var toggle = this.$refs.toggle;
        return toggle ? toggle.$el || toggle : null;
      },
      directionClass: function directionClass() {
        if (this.dropup) {
          return 'dropup';
        } else if (this.dropright) {
          return 'dropright';
        } else if (this.dropleft) {
          return 'dropleft';
        }

        return '';
      }
    },
    watch: {
      visible: function visible(newValue, oldValue) {
        if (this.visibleChangePrevented) {
          this.visibleChangePrevented = false;
          return;
        }

        if (newValue !== oldValue) {
          var evtName = newValue ? 'show' : 'hide';
          var bvEvt = new BvEvent(evtName, {
            cancelable: true,
            vueTarget: this,
            target: this.$refs.menu,
            relatedTarget: null,
            componentId: this.safeId ? this.safeId() : this.id || null
          });
          this.emitEvent(bvEvt);

          if (bvEvt.defaultPrevented) {
            // Reset value and exit if canceled
            this.visibleChangePrevented = true;
            this.visible = oldValue; // Just in case a child element triggered this.hide(true)

            this.$off('hidden', this.focusToggler);
            return;
          }

          if (evtName === 'show') {
            this.showMenu();
          } else {
            this.hideMenu();
          }
        }
      },
      disabled: function disabled(newValue, oldValue) {
        if (newValue !== oldValue && newValue && this.visible) {
          // Hide dropdown if disabled changes to true
          this.visible = false;
        }
      }
    },
    created: function created() {
      // Create non-reactive property
      this.$_popper = null;
      this.$_hideTimeout = null;

      this.$_noop = function () {};
    },
    deactivated: function deactivated()
    /* istanbul ignore next: not easy to test */
    {
      // In case we are inside a `<keep-alive>`
      this.visible = false;
      this.whileOpenListen(false);
      this.destroyPopper();
    },
    beforeDestroy: function beforeDestroy() {
      this.visible = false;
      this.whileOpenListen(false);
      this.destroyPopper();
      this.clearHideTimeout();
    },
    methods: {
      // Event emitter
      emitEvent: function emitEvent(bvEvt) {
        var type = bvEvt.type;
        this.$emit(type, bvEvt);
        this.$root.$emit("".concat(ROOT_DROPDOWN_PREFIX).concat(type), bvEvt);
      },
      showMenu: function showMenu() {
        var _this = this;

        if (this.disabled) {
          /* istanbul ignore next */
          return;
        } // Are we in a navbar ?


        if (isNull(this.inNavbar) && this.isNav) {
          // We should use an injection for this

          /* istanbul ignore next */
          this.inNavbar = Boolean(closest('.navbar', this.$el));
        } // Disable totally Popper.js for Dropdown in Navbar


        if (!this.inNavbar) {
          if (typeof Popper === 'undefined') {
            /* istanbul ignore next */
            warn('b-dropdown: Popper.js not found. Falling back to CSS positioning.');
          } else {
            // for dropup with alignment we use the parent element as popper container
            var element = this.dropup && this.right || this.split ? this.$el : this.$refs.toggle; // Make sure we have a reference to an element, not a component!

            element = element.$el || element; // Instantiate popper.js

            this.createPopper(element);
          }
        } // Ensure other menus are closed


        this.$root.$emit(ROOT_DROPDOWN_SHOWN, this);
        this.whileOpenListen(true); // Wrap in nextTick to ensure menu is fully rendered/shown

        this.$nextTick(function () {
          // Focus on the menu container on show
          _this.focusMenu(); // Emit the shown event


          _this.$emit('shown');
        });
      },
      hideMenu: function hideMenu() {
        this.whileOpenListen(false);
        this.$root.$emit(ROOT_DROPDOWN_HIDDEN, this);
        this.$emit('hidden');
        this.destroyPopper();
      },
      createPopper: function createPopper(element) {
        this.destroyPopper();
        this.$_popper = new Popper(element, this.$refs.menu, this.getPopperConfig());
      },
      destroyPopper: function destroyPopper() {
        if (this.$_popper) {
          // Ensure popper event listeners are removed cleanly
          this.$_popper.destroy();
        }

        this.$_popper = null;
      },
      clearHideTimeout: function clearHideTimeout() {
        /* istanbul ignore next */
        if (this.$_hideTimeout) {
          clearTimeout(this.$_hideTimeout);
          this.$_hideTimeout = null;
        }
      },
      getPopperConfig: function getPopperConfig() {
        var placement = AttachmentMap.BOTTOM;

        if (this.dropup) {
          placement = this.right ? AttachmentMap.TOPEND : AttachmentMap.TOP;
        } else if (this.dropright) {
          placement = AttachmentMap.RIGHT;
        } else if (this.dropleft) {
          placement = AttachmentMap.LEFT;
        } else if (this.right) {
          placement = AttachmentMap.BOTTOMEND;
        }

        var popperConfig = {
          placement: placement,
          modifiers: {
            offset: {
              offset: this.offset || 0
            },
            flip: {
              enabled: !this.noFlip
            }
          }
        };

        if (this.boundary) {
          popperConfig.modifiers.preventOverflow = {
            boundariesElement: this.boundary
          };
        }

        return _objectSpread2({}, popperConfig, {}, this.popperOpts || {});
      },
      // Turn listeners on/off while open
      whileOpenListen: function whileOpenListen(isOpen) {
        // Hide the dropdown when clicked outside
        this.listenForClickOut = isOpen; // Hide the dropdown when it loses focus

        this.listenForFocusIn = isOpen; // Hide the dropdown when another dropdown is opened

        var method = isOpen ? '$on' : '$off';
        this.$root[method](ROOT_DROPDOWN_SHOWN, this.rootCloseListener);
      },
      rootCloseListener: function rootCloseListener(vm) {
        if (vm !== this) {
          this.visible = false;
        }
      },
      show: function show() {
        var _this2 = this;

        // Public method to show dropdown
        if (this.disabled) {
          return;
        } // Wrap in a requestAnimationFrame to allow any previous
        // click handling to occur first


        requestAF(function () {
          _this2.visible = true;
        });
      },
      hide: function hide() {
        var refocus = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

        // Public method to hide dropdown
        if (this.disabled) {
          /* istanbul ignore next */
          return;
        }

        this.visible = false;

        if (refocus) {
          // Child element is closing the dropdown on click
          this.$once('hidden', this.focusToggler);
        }
      },
      // Called only by a button that toggles the menu
      toggle: function toggle(evt) {
        evt = evt || {};
        var type = evt.type;
        var key = evt.keyCode;

        if (type !== 'click' && !(type === 'keydown' && (key === KEY_CODES.ENTER || key === KEY_CODES.SPACE || key === KEY_CODES.DOWN))) {
          // We only toggle on Click, Enter, Space, and Arrow Down

          /* istanbul ignore next */
          return;
        }
        /* istanbul ignore next */


        if (this.disabled) {
          this.visible = false;
          return;
        }

        this.$emit('toggle', evt);
        evt.preventDefault();
        evt.stopPropagation(); // Toggle visibility

        if (this.visible) {
          this.hide(true);
        } else {
          this.show();
        }
      },
      // Called only in split button mode, for the split button
      click: function click(evt) {
        /* istanbul ignore next */
        if (this.disabled) {
          this.visible = false;
          return;
        }

        this.$emit('click', evt);
      },
      // Called from dropdown menu context
      onKeydown: function onKeydown(evt) {
        var key = evt.keyCode;

        if (key === KEY_CODES.ESC) {
          // Close on ESC
          this.onEsc(evt);
        } else if (key === KEY_CODES.DOWN) {
          // Down Arrow
          this.focusNext(evt, false);
        } else if (key === KEY_CODES.UP) {
          // Up Arrow
          this.focusNext(evt, true);
        }
      },
      // If uses presses ESC to close menu
      onEsc: function onEsc(evt) {
        if (this.visible) {
          this.visible = false;
          evt.preventDefault();
          evt.stopPropagation(); // Return focus to original trigger button

          this.$once('hidden', this.focusToggler);
        }
      },
      // Document click out listener
      clickOutHandler: function clickOutHandler(evt) {
        var _this3 = this;

        var target = evt.target;

        if (this.visible && !contains(this.$refs.menu, target) && !contains(this.toggler, target)) {
          var doHide = function doHide() {
            _this3.visible = false;
            return null;
          }; // When we are in a navbar (which has been responsively stacked), we
          // delay the dropdown's closing so that the next element has a chance
          // to have it's click handler fired (in case it's position moves on
          // the screen do to a navbar menu above it collapsing)
          // https://github.com/bootstrap-vue/bootstrap-vue/issues/4113


          this.clearHideTimeout();
          this.$_hideTimeout = this.inNavbar ? setTimeout(doHide, FOCUSOUT_DELAY) : doHide();
        }
      },
      // Document focusin listener
      focusInHandler: function focusInHandler(evt) {
        // Shared logic with click-out handler
        this.clickOutHandler(evt);
      },
      // Keyboard nav
      focusNext: function focusNext(evt, up) {
        var _this4 = this;

        // Ignore key up/down on form elements
        if (!this.visible || evt && closest(Selector.FORM_CHILD, evt.target)) {
          /* istanbul ignore next: should never happen */
          return;
        }

        evt.preventDefault();
        evt.stopPropagation();
        this.$nextTick(function () {
          var items = _this4.getItems();

          if (items.length < 1) {
            /* istanbul ignore next: should never happen */
            return;
          }

          var index = items.indexOf(evt.target);

          if (up && index > 0) {
            index--;
          } else if (!up && index < items.length - 1) {
            index++;
          }

          if (index < 0) {
            /* istanbul ignore next: should never happen */
            index = 0;
          }

          _this4.focusItem(index, items);
        });
      },
      focusItem: function focusItem(idx, items) {
        var el = items.find(function (el, i) {
          return i === idx;
        });

        if (el && el.focus) {
          el.focus();
        }
      },
      getItems: function getItems() {
        // Get all items
        return filterVisibles(selectAll(Selector.ITEM_SELECTOR, this.$refs.menu));
      },
      focusMenu: function focusMenu() {
        this.$refs.menu.focus && this.$refs.menu.focus();
      },
      focusToggler: function focusToggler() {
        var _this5 = this;

        this.$nextTick(function () {
          var toggler = _this5.toggler;

          if (toggler && toggler.focus) {
            toggler.focus();
          }
        });
      }
    }
  };

  var NAME$9 = 'BDropdown';
  var props$j = {
    toggleText: {
      // This really should be toggleLabel
      type: String,
      default: function _default() {
        return getComponentConfig(NAME$9, 'toggleText');
      }
    },
    size: {
      type: String,
      default: function _default() {
        return getComponentConfig(NAME$9, 'size');
      }
    },
    variant: {
      type: String,
      default: function _default() {
        return getComponentConfig(NAME$9, 'variant');
      }
    },
    block: {
      type: Boolean,
      default: false
    },
    menuClass: {
      type: [String, Array],
      default: null
    },
    toggleTag: {
      type: String,
      default: 'button'
    },
    toggleClass: {
      type: [String, Array],
      default: null
    },
    noCaret: {
      type: Boolean,
      default: false
    },
    split: {
      type: Boolean,
      default: false
    },
    splitHref: {
      type: String // default: undefined

    },
    splitTo: {
      type: [String, Object] // default: undefined

    },
    splitVariant: {
      type: String,
      default: function _default() {
        return getComponentConfig(NAME$9, 'splitVariant');
      }
    },
    splitButtonType: {
      type: String,
      default: 'button',
      validator: function validator(value) {
        return arrayIncludes(['button', 'submit', 'reset'], value);
      }
    },
    role: {
      type: String,
      default: 'menu'
    },
    boundary: {
      // String: `scrollParent`, `window` or `viewport`
      // HTMLElement: HTML Element reference
      type: [String, HTMLElement],
      default: 'scrollParent'
    }
  }; // @vue/component

  var BDropdown =
  /*#__PURE__*/
  Vue.extend({
    name: NAME$9,
    mixins: [idMixin, dropdownMixin, normalizeSlotMixin],
    props: props$j,
    computed: {
      dropdownClasses: function dropdownClasses() {
        return [this.directionClass, {
          show: this.visible,
          // The 'btn-group' class is required in `split` mode for button alignment
          // It needs also to be applied when `block` is disabled to allow multiple
          // dropdowns to be aligned one line
          'btn-group': this.split || !this.block,
          // When `block` is enabled and we are in `split` mode the 'd-flex' class
          // needs to be applied to allow the buttons to stretch to full width
          'd-flex': this.block && this.split,
          // Position `static` is needed to allow menu to "breakout" of the `scrollParent`
          // boundaries when boundary is anything other than `scrollParent`
          // See: https://github.com/twbs/bootstrap/issues/24251#issuecomment-341413786
          'position-static': this.boundary !== 'scrollParent' || !this.boundary
        }];
      },
      menuClasses: function menuClasses() {
        return [this.menuClass, {
          'dropdown-menu-right': this.right,
          show: this.visible
        }];
      },
      toggleClasses: function toggleClasses() {
        return [this.toggleClass, {
          'dropdown-toggle-split': this.split,
          'dropdown-toggle-no-caret': this.noCaret && !this.split
        }];
      }
    },
    render: function render(h) {
      var split = h();
      var buttonContent = this.normalizeSlot('button-content') || this.html || stripTags(this.text);

      if (this.split) {
        var btnProps = {
          variant: this.splitVariant || this.variant,
          size: this.size,
          block: this.block,
          disabled: this.disabled
        }; // We add these as needed due to router-link issues with defined property with undefined/null values

        if (this.splitTo) {
          btnProps.to = this.splitTo;
        } else if (this.splitHref) {
          btnProps.href = this.splitHref;
        } else if (this.splitButtonType) {
          btnProps.type = this.splitButtonType;
        }

        split = h(BButton, {
          ref: 'button',
          props: btnProps,
          attrs: {
            id: this.safeId('_BV_button_')
          },
          on: {
            click: this.click
          }
        }, [buttonContent]);
      }

      var toggle = h(BButton, {
        ref: 'toggle',
        staticClass: 'dropdown-toggle',
        class: this.toggleClasses,
        props: {
          tag: this.toggleTag,
          variant: this.variant,
          size: this.size,
          block: this.block && !this.split,
          disabled: this.disabled
        },
        attrs: {
          id: this.safeId('_BV_toggle_'),
          'aria-haspopup': 'true',
          'aria-expanded': this.visible ? 'true' : 'false'
        },
        on: {
          click: this.toggle,
          // click
          keydown: this.toggle // enter, space, down

        }
      }, [this.split ? h('span', {
        class: ['sr-only']
      }, [this.toggleText]) : buttonContent]);
      var menu = h('ul', {
        ref: 'menu',
        staticClass: 'dropdown-menu',
        class: this.menuClasses,
        attrs: {
          role: this.role,
          tabindex: '-1',
          'aria-labelledby': this.safeId(this.split ? '_BV_button_' : '_BV_toggle_')
        },
        on: {
          keydown: this.onKeydown // up, down, esc

        }
      }, !this.lazy || this.visible ? this.normalizeSlot('default', {
        hide: this.hide
      }) : [h()]);
      return h('div', {
        staticClass: 'dropdown b-dropdown',
        class: this.dropdownClasses,
        attrs: {
          id: this.safeId()
        }
      }, [split, toggle, menu]);
    }
  });

  var props$k = propsFactory(); // @vue/component

  var BDropdownItem =
  /*#__PURE__*/
  Vue.extend({
    name: 'BDropdownItem',
    mixins: [normalizeSlotMixin],
    inheritAttrs: false,
    inject: {
      bvDropdown: {
        default: null
      }
    },
    props: _objectSpread2({}, props$k, {
      variant: {
        type: String,
        default: null
      }
    }),
    methods: {
      closeDropdown: function closeDropdown() {
        var _this = this;

        // Close on next animation frame to allow <b-link> time to process
        requestAF(function () {
          if (_this.bvDropdown) {
            _this.bvDropdown.hide(true);
          }
        });
      },
      onClick: function onClick(evt) {
        this.$emit('click', evt);
        this.closeDropdown();
      }
    },
    render: function render(h) {
      return h('li', {
        attrs: {
          role: 'presentation'
        }
      }, [h(BLink, {
        props: this.$props,
        staticClass: 'dropdown-item',
        class: _defineProperty({}, "text-".concat(this.variant), this.variant && !(this.active || this.disabled)),
        attrs: _objectSpread2({}, this.$attrs, {
          role: 'menuitem'
        }),
        on: {
          click: this.onClick
        },
        ref: 'item'
      }, this.normalizeSlot('default'))]);
    }
  });

  var props$l = {
    active: {
      type: Boolean,
      default: false
    },
    activeClass: {
      type: String,
      default: 'active'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    variant: {
      type: String,
      default: null
    }
  }; // @vue/component

  var BDropdownItemButton =
  /*#__PURE__*/
  Vue.extend({
    name: 'BDropdownItemButton',
    mixins: [normalizeSlotMixin],
    inheritAttrs: false,
    inject: {
      bvDropdown: {
        default: null
      }
    },
    props: props$l,
    methods: {
      closeDropdown: function closeDropdown() {
        if (this.bvDropdown) {
          this.bvDropdown.hide(true);
        }
      },
      onClick: function onClick(evt) {
        this.$emit('click', evt);
        this.closeDropdown();
      }
    },
    render: function render(h) {
      var _class;

      return h('li', {
        attrs: {
          role: 'presentation'
        }
      }, [h('button', {
        staticClass: 'dropdown-item',
        class: (_class = {}, _defineProperty(_class, this.activeClass, this.active), _defineProperty(_class, "text-".concat(this.variant), this.variant && !(this.active || this.disabled)), _class),
        attrs: _objectSpread2({}, this.$attrs, {
          role: 'menuitem',
          type: 'button',
          disabled: this.disabled
        }),
        on: {
          click: this.onClick
        },
        ref: 'button'
      }, this.normalizeSlot('default'))]);
    }
  });

  var props$m = {
    id: {
      type: String,
      default: null
    },
    tag: {
      type: String,
      default: 'header'
    },
    variant: {
      type: String,
      default: null
    }
  }; // @vue/component

  var BDropdownHeader =
  /*#__PURE__*/
  Vue.extend({
    name: 'BDropdownHeader',
    functional: true,
    props: props$m,
    render: function render(h, _ref) {
      var props = _ref.props,
          data = _ref.data,
          children = _ref.children;
      var $attrs = data.attrs || {};
      data.attrs = {};
      return h('li', a(data, {
        attrs: {
          role: 'presentation'
        }
      }), [h(props.tag, {
        staticClass: 'dropdown-header',
        class: _defineProperty({}, "text-".concat(props.variant), props.variant),
        attrs: _objectSpread2({}, $attrs, {
          id: props.id || null,
          role: 'heading'
        }),
        ref: 'header'
      }, children)]);
    }
  });

  var props$n = {
    tag: {
      type: String,
      default: 'hr'
    }
  }; // @vue/component

  var BDropdownDivider =
  /*#__PURE__*/
  Vue.extend({
    name: 'BDropdownDivider',
    functional: true,
    props: props$n,
    render: function render(h, _ref) {
      var props = _ref.props,
          data = _ref.data;
      var $attrs = data.attrs || {};
      data.attrs = {};
      return h('li', a(data, {
        attrs: {
          role: 'presentation'
        }
      }), [h(props.tag, {
        staticClass: 'dropdown-divider',
        attrs: _objectSpread2({}, $attrs, {
          role: 'separator',
          'aria-orientation': 'horizontal'
        }),
        ref: 'divider'
      })]);
    }
  });

  var props$o = {
    id: {
      type: String,
      default: null
    },
    inline: {
      type: Boolean,
      default: false
    },
    novalidate: {
      type: Boolean,
      default: false
    },
    validated: {
      type: Boolean,
      default: false
    }
  }; // @vue/component

  var BForm =
  /*#__PURE__*/
  Vue.extend({
    name: 'BForm',
    functional: true,
    props: props$o,
    render: function render(h, _ref) {
      var props = _ref.props,
          data = _ref.data,
          children = _ref.children;
      return h('form', a(data, {
        class: {
          'form-inline': props.inline,
          'was-validated': props.validated
        },
        attrs: {
          id: props.id,
          novalidate: props.novalidate
        }
      }), children);
    }
  });

  var BDropdownForm =
  /*#__PURE__*/
  Vue.extend({
    name: 'BDropdownForm',
    functional: true,
    props: _objectSpread2({}, props$o, {
      disabled: {
        type: Boolean,
        default: false
      }
    }),
    render: function render(h, _ref) {
      var props = _ref.props,
          data = _ref.data,
          children = _ref.children;
      var $attrs = data.attrs || {};
      var $listeners = data.on || {};
      data.attrs = {};
      data.on = {};
      return h('li', a(data, {
        attrs: {
          role: 'presentation'
        }
      }), [h(BForm, {
        ref: 'form',
        staticClass: 'b-dropdown-form',
        class: {
          disabled: props.disabled
        },
        props: props,
        attrs: _objectSpread2({}, $attrs, {
          disabled: props.disabled,
          // Tab index of -1 for keyboard navigation
          tabindex: props.disabled ? null : '-1'
        }),
        on: $listeners
      }, children)]);
    }
  });

  var BDropdownText =
  /*#__PURE__*/
  Vue.extend({
    name: 'BDropdownText',
    functional: true,
    props: {
      tag: {
        type: String,
        default: 'p'
      },
      variant: {
        type: String,
        default: null
      }
    },
    render: function render(h, _ref) {
      var props = _ref.props,
          data = _ref.data,
          children = _ref.children;
      var $attrs = data.attrs || {};
      data.attrs = {};
      return h('li', a(data, {
        attrs: {
          role: 'presentation'
        }
      }), [h(props.tag, {
        staticClass: 'b-dropdown-text',
        class: _defineProperty({}, "text-".concat(props.variant), props.variant),
        props: props,
        attrs: $attrs,
        ref: 'text'
      }, children)]);
    }
  });

  var props$p = {
    id: {
      type: String,
      default: null
    },
    header: {
      type: String,
      default: null
    },
    headerTag: {
      type: String,
      default: 'header'
    },
    headerVariant: {
      type: String,
      default: null
    },
    headerClasses: {
      type: [String, Array, Object],
      default: null
    },
    ariaDescribedby: {
      type: String,
      default: null
    }
  }; // @vue/component

  var BDropdownGroup =
  /*#__PURE__*/
  Vue.extend({
    name: 'BDropdownGroup',
    functional: true,
    props: props$p,
    render: function render(h, _ref) {
      var props = _ref.props,
          data = _ref.data,
          slots = _ref.slots,
          scopedSlots = _ref.scopedSlots;
      var $slots = slots();
      var $scopedSlots = scopedSlots || {};
      var $attrs = data.attrs || {};
      data.attrs = {};
      var header;
      var headerId = null;

      if (hasNormalizedSlot('header', $scopedSlots, $slots) || props.header) {
        headerId = props.id ? "_bv_".concat(props.id, "_group_dd_header") : null;
        header = h(props.headerTag, {
          staticClass: 'dropdown-header',
          class: [props.headerClasses, _defineProperty({}, "text-".concat(props.variant), props.variant)],
          attrs: {
            id: headerId,
            role: 'heading'
          }
        }, normalizeSlot('header', {}, $scopedSlots, $slots) || props.header);
      }

      var adb = [headerId, props.ariaDescribedBy].filter(Boolean).join(' ').trim();
      return h('li', a(data, {
        attrs: {
          role: 'presentation'
        }
      }), [header || h(), h('ul', {
        staticClass: 'list-unstyled',
        attrs: _objectSpread2({}, $attrs, {
          id: props.id || null,
          role: 'group',
          'aria-describedby': adb || null
        })
      }, normalizeSlot('default', {}, $scopedSlots, $slots))]);
    }
  });

  var DropdownPlugin =
  /*#__PURE__*/
  pluginFactory({
    components: {
      BDropdown: BDropdown,
      BDd: BDropdown,
      BDropdownItem: BDropdownItem,
      BDdItem: BDropdownItem,
      BDropdownItemButton: BDropdownItemButton,
      BDropdownItemBtn: BDropdownItemButton,
      BDdItemButton: BDropdownItemButton,
      BDdItemBtn: BDropdownItemButton,
      BDropdownHeader: BDropdownHeader,
      BDdHeader: BDropdownHeader,
      BDropdownDivider: BDropdownDivider,
      BDdDivider: BDropdownDivider,
      BDropdownForm: BDropdownForm,
      BDdForm: BDropdownForm,
      BDropdownText: BDropdownText,
      BDdText: BDropdownText,
      BDropdownGroup: BDropdownGroup,
      BDdGroup: BDropdownGroup
    }
  });

  var props$q = {
    type: {
      type: String,
      default: 'iframe',
      validator: function validator(str) {
        return arrayIncludes(['iframe', 'embed', 'video', 'object', 'img', 'b-img', 'b-img-lazy'], str);
      }
    },
    tag: {
      type: String,
      default: 'div'
    },
    aspect: {
      type: String,
      default: '16by9'
    }
  }; // @vue/component

  var BEmbed =
  /*#__PURE__*/
  Vue.extend({
    name: 'BEmbed',
    functional: true,
    props: props$q,
    render: function render(h, _ref) {
      var props = _ref.props,
          data = _ref.data,
          children = _ref.children;
      return h(props.tag, {
        ref: data.ref,
        staticClass: 'embed-responsive',
        class: _defineProperty({}, "embed-responsive-".concat(props.aspect), Boolean(props.aspect))
      }, [h(props.type, a(data, {
        ref: '',
        staticClass: 'embed-responsive-item'
      }), children)]);
    }
  });

  var EmbedPlugin =
  /*#__PURE__*/
  pluginFactory({
    components: {
      BEmbed: BEmbed
    }
  });

  var formOptionsMixin = {
    props: {
      options: {
        type: [Array, Object],
        default: function _default() {
          return [];
        }
      },
      valueField: {
        type: String,
        default: 'value'
      },
      textField: {
        type: String,
        default: 'text'
      },
      htmlField: {
        type: String,
        default: 'html'
      },
      disabledField: {
        type: String,
        default: 'disabled'
      }
    },
    computed: {
      formOptions: function formOptions() {
        var options = this.options;
        var valueField = this.valueField;
        var textField = this.textField;
        var htmlField = this.htmlField;
        var disabledField = this.disabledField;

        if (isArray(options)) {
          // Normalize flat-ish arrays to Array of Objects
          return options.map(function (option) {
            if (isPlainObject(option)) {
              var value = option[valueField];
              var text = String(option[textField]);
              return {
                value: isUndefined(value) ? text : value,
                text: stripTags(text),
                html: option[htmlField],
                disabled: Boolean(option[disabledField])
              };
            }

            return {
              value: option,
              text: stripTags(String(option)),
              disabled: false
            };
          });
        } else {
          // options is Object
          // Normalize Objects to Array of Objects
          return keys(options).map(function (key) {
            var option = options[key] || {};

            if (isPlainObject(option)) {
              var value = option[valueField];
              var text = option[textField];
              return {
                value: isUndefined(value) ? key : value,
                text: isUndefined(text) ? stripTags(String(key)) : stripTags(String(text)),
                html: option[htmlField],
                disabled: Boolean(option[disabledField])
              };
            }

            return {
              value: key,
              text: stripTags(String(option)),
              disabled: false
            };
          });
        }
      }
    }
  };

  var BFormDatalist =
  /*#__PURE__*/
  Vue.extend({
    name: 'BFormDatalist',
    mixins: [formOptionsMixin, normalizeSlotMixin],
    props: {
      id: {
        type: String,
        default: null,
        required: true
      }
    },
    render: function render(h) {
      var options = this.formOptions.map(function (option, index) {
        return h('option', {
          key: "option_".concat(index, "_opt"),
          attrs: {
            disabled: option.disabled
          },
          domProps: _objectSpread2({}, htmlOrText(option.html, option.text), {
            value: option.value
          })
        });
      });
      return h('datalist', {
        attrs: {
          id: this.id
        }
      }, [options, this.normalizeSlot('default')]);
    }
  });

  var NAME$a = 'BFormText';
  var props$r = {
    id: {
      type: String,
      default: null
    },
    tag: {
      type: String,
      default: 'small'
    },
    textVariant: {
      type: String,
      default: function _default() {
        return getComponentConfig(NAME$a, 'textVariant');
      }
    },
    inline: {
      type: Boolean,
      default: false
    }
  }; // @vue/component

  var BFormText =
  /*#__PURE__*/
  Vue.extend({
    name: NAME$a,
    functional: true,
    props: props$r,
    render: function render(h, _ref) {
      var props = _ref.props,
          data = _ref.data,
          children = _ref.children;
      return h(props.tag, a(data, {
        class: _defineProperty({
          'form-text': !props.inline
        }, "text-".concat(props.textVariant), Boolean(props.textVariant)),
        attrs: {
          id: props.id
        }
      }), children);
    }
  });

  var props$s = {
    id: {
      type: String,
      default: null
    },
    tag: {
      type: String,
      default: 'div'
    },
    tooltip: {
      type: Boolean,
      default: false
    },
    forceShow: {
      type: Boolean,
      default: false
    },
    state: {
      type: Boolean,
      default: null
    },
    ariaLive: {
      type: String,
      default: null
    },
    role: {
      type: String,
      default: null
    }
  }; // @vue/component

  var BFormInvalidFeedback =
  /*#__PURE__*/
  Vue.extend({
    name: 'BFormInvalidFeedback',
    functional: true,
    props: props$s,
    render: function render(h, _ref) {
      var props = _ref.props,
          data = _ref.data,
          children = _ref.children;
      var show = props.forceShow === true || props.state === false;
      return h(props.tag, a(data, {
        class: {
          'invalid-feedback': !props.tooltip,
          'invalid-tooltip': props.tooltip,
          'd-block': show
        },
        attrs: {
          id: props.id,
          role: props.role,
          'aria-live': props.ariaLive,
          'aria-atomic': props.ariaLive ? 'true' : null
        }
      }), children);
    }
  });

  var props$t = {
    id: {
      type: String,
      default: null
    },
    tag: {
      type: String,
      default: 'div'
    },
    tooltip: {
      type: Boolean,
      default: false
    },
    forceShow: {
      type: Boolean,
      default: false
    },
    state: {
      type: Boolean,
      default: null
    },
    ariaLive: {
      type: String,
      default: null
    },
    role: {
      type: String,
      default: null
    }
  }; // @vue/component

  var BFormValidFeedback =
  /*#__PURE__*/
  Vue.extend({
    name: 'BFormValidFeedback',
    functional: true,
    props: props$t,
    render: function render(h, _ref) {
      var props = _ref.props,
          data = _ref.data,
          children = _ref.children;
      var show = props.forceShow === true || props.state === true;
      return h(props.tag, a(data, {
        class: {
          'valid-feedback': !props.tooltip,
          'valid-tooltip': props.tooltip,
          'd-block': show
        },
        attrs: {
          id: props.id,
          role: props.role,
          'aria-live': props.ariaLive,
          'aria-atomic': props.ariaLive ? 'true' : null
        }
      }), children);
    }
  });

  var props$u = {
    tag: {
      type: String,
      default: 'div'
    }
  }; // @vue/component

  var BFormRow =
  /*#__PURE__*/
  Vue.extend({
    name: 'BFormRow',
    functional: true,
    props: props$u,
    render: function render(h, _ref) {
      var props = _ref.props,
          data = _ref.data,
          children = _ref.children;
      return h(props.tag, a(data, {
        staticClass: 'form-row'
      }), children);
    }
  });

  var FormPlugin =
  /*#__PURE__*/
  pluginFactory({
    components: {
      BForm: BForm,
      BFormDatalist: BFormDatalist,
      BDatalist: BFormDatalist,
      BFormText: BFormText,
      BFormInvalidFeedback: BFormInvalidFeedback,
      BFormFeedback: BFormInvalidFeedback,
      BFormValidFeedback: BFormValidFeedback,
      // Added here for convenience
      BFormRow: BFormRow
    }
  }); // BFormRow is not exported here as a named export, as it is exported by Layout

  /* Form control contextual state class computation
   *
   * Returned class is either 'is-valid' or 'is-invalid' based on the 'state' prop
   * state can be one of five values:
   *  - true for is-valid
   *  - false for is-invalid
   *  - null for no contextual state
   */

  var formStateMixin = {
    props: {
      state: {
        // Tri-state prop: true, false, null (or undefined)
        type: Boolean,
        default: null
      }
    },
    computed: {
      computedState: function computedState() {
        // If not a boolean, ensure that value is null
        return isBoolean(this.state) ? this.state : null;
      },
      stateClass: function stateClass() {
        var state = this.computedState;

        if (state === true) {
          return 'is-valid';
        } else if (state === false) {
          return 'is-invalid';
        }

        return null;
      }
    }
  };

  /**
   * Suffix can be a falsey value so nothing is appended to string.
   * (helps when looping over props & some shouldn't change)
   * Use data last parameters to allow for currying.
   * @param {string} suffix
   * @param {string} str
   */

  var suffixPropName = function suffixPropName(suffix, str) {
    return str + (suffix ? upperFirst(suffix) : '');
  };

  var boolStrNum = function boolStrNum() {
    return {
      type: [Boolean, String, Number],
      default: false
    };
  }; // Generates a prop object with a type of `[String, Number]`


  var strNum = function strNum() {
    return {
      type: [String, Number],
      default: null
    };
  }; // Compute a breakpoint class name


  var computeBreakpoint = function computeBreakpoint(type, breakpoint, val) {
    var className = type;

    if (isUndefined(val) || isNull(val) || val === false) {
      return undefined;
    }

    if (breakpoint) {
      className += "-".concat(breakpoint);
    } // Handling the boolean style prop when accepting [Boolean, String, Number]
    // means Vue will not convert <b-col sm></b-col> to sm: true for us.
    // Since the default is false, an empty string indicates the prop's presence.


    if (type === 'col' && (val === '' || val === true)) {
      // .col-md
      return className.toLowerCase();
    } // .order-md-6


    className += "-".concat(val);
    return className.toLowerCase();
  }; // Memoized function for better performance on generating class names


  var computeBreakpointClass = memoize(computeBreakpoint); // Cached copy of the breakpoint prop names

  var breakpointPropMap = create(null); // Lazy evaled props factory for BCol

  var generateProps = function generateProps() {
    // Grab the breakpoints from the cached config (exclude the '' (xs) breakpoint)
    var breakpoints = getBreakpointsUpCached().filter(Boolean); // Supports classes like: .col-sm, .col-md-6, .col-lg-auto

    var breakpointCol = breakpoints.reduce(function (propMap, breakpoint) {
      if (breakpoint) {
        // We filter out the '' breakpoint (xs), as making a prop name ''
        // would not work. The `cols` prop is used for `xs`
        propMap[breakpoint] = boolStrNum();
      }

      return propMap;
    }, create(null)); // Supports classes like: .offset-md-1, .offset-lg-12

    var breakpointOffset = breakpoints.reduce(function (propMap, breakpoint) {
      propMap[suffixPropName(breakpoint, 'offset')] = strNum();
      return propMap;
    }, create(null)); // Supports classes like: .order-md-1, .order-lg-12

    var breakpointOrder = breakpoints.reduce(function (propMap, breakpoint) {
      propMap[suffixPropName(breakpoint, 'order')] = strNum();
      return propMap;
    }, create(null)); // For loop doesn't need to check hasOwnProperty
    // when using an object created from null

    breakpointPropMap = assign(create(null), {
      col: keys(breakpointCol),
      offset: keys(breakpointOffset),
      order: keys(breakpointOrder)
    }); // Return the generated props

    return _objectSpread2({
      // Generic flexbox .col (xs)
      col: {
        type: Boolean,
        default: false
      },
      // .col-[1-12]|auto  (xs)
      cols: strNum()
    }, breakpointCol, {
      offset: strNum()
    }, breakpointOffset, {
      order: strNum()
    }, breakpointOrder, {
      // Flex alignment
      alignSelf: {
        type: String,
        default: null,
        validator: function validator(str) {
          return arrayIncludes(['auto', 'start', 'end', 'center', 'baseline', 'stretch'], str);
        }
      },
      tag: {
        type: String,
        default: 'div'
      }
    });
  }; // We do not use Vue.extend here as that would evaluate the props
  // immediately, which we do not want to happen
  // @vue/component


  var BCol = {
    name: 'BCol',
    functional: true,

    get props() {
      // Allow props to be lazy evaled on first access and
      // then they become a non-getter afterwards.
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get#Smart_self-overwriting_lazy_getters
      delete this.props; // eslint-disable-next-line no-return-assign

      return this.props = generateProps();
    },

    render: function render(h, _ref) {
      var _classList$push;

      var props = _ref.props,
          data = _ref.data,
          children = _ref.children;
      var classList = []; // Loop through `col`, `offset`, `order` breakpoint props

      for (var type in breakpointPropMap) {
        // Returns colSm, offset, offsetSm, orderMd, etc.
        var _keys = breakpointPropMap[type];

        for (var i = 0; i < _keys.length; i++) {
          // computeBreakpoint(col, colSm => Sm, value=[String, Number, Boolean])
          var c = computeBreakpointClass(type, _keys[i].replace(type, ''), props[_keys[i]]); // If a class is returned, push it onto the array.

          if (c) {
            classList.push(c);
          }
        }
      }

      var hasColClasses = classList.some(function (className) {
        return /^col-/.test(className);
      });
      classList.push((_classList$push = {
        // Default to .col if no other col-{bp}-* classes generated nor `cols` specified.
        col: props.col || !hasColClasses && !props.cols
      }, _defineProperty(_classList$push, "col-".concat(props.cols), props.cols), _defineProperty(_classList$push, "offset-".concat(props.offset), props.offset), _defineProperty(_classList$push, "order-".concat(props.order), props.order), _defineProperty(_classList$push, "align-self-".concat(props.alignSelf), props.alignSelf), _classList$push));
      return h(props.tag, a(data, {
        class: classList
      }), children);
    }
  };

  var NAME$b = 'BFormGroup'; // Selector for finding first input in the form-group

  var SELECTOR = 'input:not([disabled]),textarea:not([disabled]),select:not([disabled])'; // Render helper functions (here rather than polluting the instance with more methods)

  var renderInvalidFeedback = function renderInvalidFeedback(h, ctx) {
    var content = ctx.normalizeSlot('invalid-feedback') || ctx.invalidFeedback;
    var invalidFeedback = h();

    if (content) {
      invalidFeedback = h(BFormInvalidFeedback, {
        props: {
          id: ctx.invalidFeedbackId,
          // If state is explicitly false, always show the feedback
          state: ctx.computedState,
          tooltip: ctx.tooltip,
          ariaLive: ctx.feedbackAriaLive,
          role: ctx.feedbackAriaLive ? 'alert' : null
        },
        attrs: {
          tabindex: content ? '-1' : null
        }
      }, [content]);
    }

    return invalidFeedback;
  };

  var renderValidFeedback = function renderValidFeedback(h, ctx) {
    var content = ctx.normalizeSlot('valid-feedback') || ctx.validFeedback;
    var validFeedback = h();

    if (content) {
      validFeedback = h(BFormValidFeedback, {
        props: {
          id: ctx.validFeedbackId,
          // If state is explicitly true, always show the feedback
          state: ctx.computedState,
          tooltip: ctx.tooltip,
          ariaLive: ctx.feedbackAriaLive,
          role: ctx.feedbackAriaLive ? 'alert' : null
        },
        attrs: {
          tabindex: content ? '-1' : null
        }
      }, [content]);
    }

    return validFeedback;
  };

  var renderHelpText = function renderHelpText(h, ctx) {
    // Form help text (description)
    var content = ctx.normalizeSlot('description') || ctx.description;
    var description = h();

    if (content) {
      description = h(BFormText, {
        attrs: {
          id: ctx.descriptionId,
          tabindex: content ? '-1' : null
        }
      }, [content]);
    }

    return description;
  };

  var renderLabel = function renderLabel(h, ctx) {
    // Render label/legend inside b-col if necessary
    var content = ctx.normalizeSlot('label') || ctx.label;
    var labelFor = ctx.labelFor;
    var isLegend = !labelFor;
    var isHorizontal = ctx.isHorizontal;
    var labelTag = isLegend ? 'legend' : 'label';

    if (!content && !isHorizontal) {
      return h();
    } else if (ctx.labelSrOnly) {
      var label = h();

      if (content) {
        label = h(labelTag, {
          class: 'sr-only',
          attrs: {
            id: ctx.labelId,
            for: labelFor || null
          }
        }, [content]);
      }

      return h(isHorizontal ? BCol : 'div', {
        props: isHorizontal ? ctx.labelColProps : {}
      }, [label]);
    } else {
      return h(isHorizontal ? BCol : labelTag, {
        on: isLegend ? {
          click: ctx.legendClick
        } : {},
        props: isHorizontal ? _objectSpread2({
          tag: labelTag
        }, ctx.labelColProps) : {},
        attrs: {
          id: ctx.labelId,
          for: labelFor || null,
          // We add a tab index to legend so that screen readers
          // will properly read the aria-labelledby in IE.
          tabindex: isLegend ? '-1' : null
        },
        class: [// When horizontal or if a legend is rendered, add col-form-label
        // for correct sizing as Bootstrap has inconsistent font styling
        // for legend in non-horizontal form-groups.
        // See: https://github.com/twbs/bootstrap/issues/27805
        isHorizontal || isLegend ? 'col-form-label' : '', // Emulate label padding top of 0 on legend when not horizontal
        !isHorizontal && isLegend ? 'pt-0' : '', // If not horizontal and not a legend, we add d-block to label
        // so that label-align works
        !isHorizontal && !isLegend ? 'd-block' : '', ctx.labelSize ? "col-form-label-".concat(ctx.labelSize) : '', ctx.labelAlignClasses, ctx.labelClass]
      }, [content]);
    }
  }; // -- BFormGroup Prop factory -- used for lazy generation of props
  // Memoize this function to return cached values to
  // save time in computed functions


  var makePropName = memoize(function () {
    var breakpoint = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var prefix = arguments.length > 1 ? arguments[1] : undefined;
    return "".concat(prefix).concat(upperFirst(breakpoint));
  }); // BFormGroup prop generator for lazy generation of props

  var generateProps$1 = function generateProps() {
    var BREAKPOINTS = getBreakpointsUpCached(); // Generate the labelCol breakpoint props

    var bpLabelColProps = BREAKPOINTS.reduce(function (props, breakpoint) {
      // i.e. label-cols, label-cols-sm, label-cols-md, ...
      props[makePropName(breakpoint, 'labelCols')] = {
        type: [Number, String, Boolean],
        default: breakpoint ? false : null
      };
      return props;
    }, create(null)); // Generate the labelAlign breakpoint props

    var bpLabelAlignProps = BREAKPOINTS.reduce(function (props, breakpoint) {
      // label-align, label-align-sm, label-align-md, ...
      props[makePropName(breakpoint, 'labelAlign')] = {
        type: String,
        // left, right, center
        default: null
      };
      return props;
    }, create(null));
    return _objectSpread2({
      label: {
        type: String,
        default: null
      },
      labelFor: {
        type: String,
        default: null
      },
      labelSize: {
        type: String,
        default: null
      },
      labelSrOnly: {
        type: Boolean,
        default: false
      }
    }, bpLabelColProps, {}, bpLabelAlignProps, {
      labelClass: {
        type: [String, Array, Object],
        default: null
      },
      description: {
        type: String,
        default: null
      },
      invalidFeedback: {
        type: String,
        default: null
      },
      validFeedback: {
        type: String,
        default: null
      },
      tooltip: {
        // Enable tooltip style feedback
        type: Boolean,
        default: false
      },
      feedbackAriaLive: {
        type: String,
        default: 'assertive'
      },
      validated: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      }
    });
  }; // We do not use Vue.extend here as that would evaluate the props
  // immediately, which we do not want to happen
  // @vue/component


  var BFormGroup = {
    name: NAME$b,
    mixins: [idMixin, formStateMixin, normalizeSlotMixin],

    get props() {
      // Allow props to be lazy evaled on first access and
      // then they become a non-getter afterwards.
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get#Smart_self-overwriting_lazy_getters
      delete this.props; // eslint-disable-next-line no-return-assign

      return this.props = generateProps$1();
    },

    computed: {
      labelColProps: function labelColProps() {
        var _this = this;

        var props = {};
        getBreakpointsUpCached().forEach(function (breakpoint) {
          // Grab the value if the label column breakpoint prop
          var propVal = _this[makePropName(breakpoint, 'labelCols')]; // Handle case where the prop's value is an empty string,
          // which represents true


          propVal = propVal === '' ? true : propVal || false;

          if (!isBoolean(propVal) && propVal !== 'auto') {
            // Convert to column size to number
            propVal = parseInt(propVal, 10) || 0; // Ensure column size is greater than 0

            propVal = propVal > 0 ? propVal : false;
          }

          if (propVal) {
            // Add the prop to the list of props to give to b-col
            // If breakpoint is '' (labelCols=true), then we use the
            // col prop to make equal width at xs
            var bColPropName = breakpoint || (isBoolean(propVal) ? 'col' : 'cols'); // Add it to the props

            props[bColPropName] = propVal;
          }
        });
        return props;
      },
      labelAlignClasses: function labelAlignClasses() {
        var _this2 = this;

        var classes = [];
        getBreakpointsUpCached().forEach(function (breakpoint) {
          // Assemble the label column breakpoint align classes
          var propVal = _this2[makePropName(breakpoint, 'labelAlign')] || null;

          if (propVal) {
            var className = breakpoint ? "text-".concat(breakpoint, "-").concat(propVal) : "text-".concat(propVal);
            classes.push(className);
          }
        });
        return classes;
      },
      isHorizontal: function isHorizontal() {
        // Determine if the resultant form-group will be rendered
        // horizontal (meaning it has label-col breakpoints)
        return keys(this.labelColProps).length > 0;
      },
      labelId: function labelId() {
        return this.hasNormalizedSlot('label') || this.label ? this.safeId('_BV_label_') : null;
      },
      descriptionId: function descriptionId() {
        return this.hasNormalizedSlot('description') || this.description ? this.safeId('_BV_description_') : null;
      },
      hasInvalidFeedback: function hasInvalidFeedback() {
        // Used for computing aria-describedby
        return this.computedState === false && (this.hasNormalizedSlot('invalid-feedback') || this.invalidFeedback);
      },
      invalidFeedbackId: function invalidFeedbackId() {
        return this.hasInvalidFeedback ? this.safeId('_BV_feedback_invalid_') : null;
      },
      hasValidFeedback: function hasValidFeedback() {
        // Used for computing aria-describedby
        return this.computedState === true && (this.hasNormalizedSlot('valid-feedback') || this.validFeedback);
      },
      validFeedbackId: function validFeedbackId() {
        return this.hasValidFeedback ? this.safeId('_BV_feedback_valid_') : null;
      },
      describedByIds: function describedByIds() {
        // Screen readers will read out any content linked to by aria-describedby
        // even if the content is hidden with `display: none;`, hence we only include
        // feedback IDs if the form-group's state is explicitly valid or invalid.
        return [this.descriptionId, this.invalidFeedbackId, this.validFeedbackId].filter(Boolean).join(' ') || null;
      }
    },
    watch: {
      describedByIds: function describedByIds(add, remove) {
        if (add !== remove) {
          this.setInputDescribedBy(add, remove);
        }
      }
    },
    mounted: function mounted() {
      var _this3 = this;

      this.$nextTick(function () {
        // Set the aria-describedby IDs on the input specified by label-for
        // We do this in a nextTick to ensure the children have finished rendering
        _this3.setInputDescribedBy(_this3.describedByIds);
      });
    },
    methods: {
      legendClick: function legendClick(evt) {
        if (this.labelFor) {
          // Don't do anything if labelFor is set

          /* istanbul ignore next: clicking a label will focus the input, so no need to test */
          return;
        }

        var tagName = evt.target ? evt.target.tagName : '';

        if (/^(input|select|textarea|label|button|a)$/i.test(tagName)) {
          // If clicked an interactive element inside legend,
          // we just let the default happen

          /* istanbul ignore next */
          return;
        }

        var inputs = selectAll(SELECTOR, this.$refs.content).filter(isVisible);

        if (inputs && inputs.length === 1 && inputs[0].focus) {
          // if only a single input, focus it, emulating label behaviour
          inputs[0].focus();
        }
      },
      setInputDescribedBy: function setInputDescribedBy(add, remove) {
        // Sets the `aria-describedby` attribute on the input if label-for is set.
        // Optionally accepts a string of IDs to remove as the second parameter.
        // Preserves any aria-describedby value(s) user may have on input.
        if (this.labelFor && isBrowser) {
          var input = select("#".concat(this.labelFor), this.$refs.content);

          if (input) {
            var adb = 'aria-describedby';
            var ids = (getAttr(input, adb) || '').split(/\s+/);
            add = (add || '').split(/\s+/);
            remove = (remove || '').split(/\s+/); // Update ID list, preserving any original IDs
            // and ensuring the ID's are unique

            ids = ids.filter(function (id) {
              return !arrayIncludes(remove, id);
            }).concat(add).filter(Boolean);
            ids = keys(ids.reduce(function (memo, id) {
              return _objectSpread2({}, memo, _defineProperty({}, id, true));
            }, {})).join(' ').trim();

            if (ids) {
              setAttr(input, adb, ids);
            } else {
              // No IDs, so remove the attribute
              removeAttr(input, adb);
            }
          }
        }
      }
    },
    render: function render(h) {
      var isFieldset = !this.labelFor;
      var isHorizontal = this.isHorizontal; // Generate the label

      var label = renderLabel(h, this); // Generate the content

      var content = h(isHorizontal ? BCol : 'div', {
        ref: 'content',
        attrs: {
          tabindex: isFieldset ? '-1' : null,
          role: isFieldset ? 'group' : null
        }
      }, [this.normalizeSlot('default') || h(), renderInvalidFeedback(h, this), renderValidFeedback(h, this), renderHelpText(h, this)]); // Create the form-group

      var data = {
        staticClass: 'form-group',
        class: [this.validated ? 'was-validated' : null, this.stateClass],
        attrs: {
          id: this.safeId(),
          disabled: isFieldset ? this.disabled : null,
          role: isFieldset ? null : 'group',
          'aria-invalid': this.computedState === false ? 'true' : null,
          // Only apply aria-labelledby if we are a horizontal fieldset
          // as the legend is no longer a direct child of fieldset
          'aria-labelledby': isFieldset && isHorizontal ? this.labelId : null,
          // Only apply aria-describedby IDs if we are a fieldset
          // as the input will have the IDs when not a fieldset
          'aria-describedby': isFieldset ? this.describedByIds : null
        }
      }; // Return it wrapped in a form-group
      // Note: Fieldsets do not support adding `row` or `form-row` directly
      // to them due to browser specific render issues, so we move the `form-row`
      // to an inner wrapper div when horizontal and using a fieldset

      return h(isFieldset ? 'fieldset' : isHorizontal ? BFormRow : 'div', data, isHorizontal && isFieldset ? [h(BFormRow, {}, [label, content])] : [label, content]);
    }
  };

  var FormGroupPlugin =
  /*#__PURE__*/
  pluginFactory({
    components: {
      BFormGroup: BFormGroup,
      BFormFieldset: BFormGroup
    }
  });

  var looseIndexOf = function looseIndexOf(arr, val) {
    // Assumes that the first argument is an array
    for (var i = 0; i < arr.length; i++) {
      if (looseEqual(arr[i], val)) {
        return i;
      }
    }

    return -1;
  };

  var SELECTOR$1 = 'input, textarea, select'; // @vue/component

  var formMixin = {
    props: {
      name: {
        type: String // default: undefined

      },
      id: {
        type: String // default: undefined

      },
      disabled: {
        type: Boolean
      },
      required: {
        type: Boolean,
        default: false
      },
      form: {
        type: String,
        default: null
      },
      autofocus: {
        type: Boolean,
        default: false
      }
    },
    mounted: function mounted() {
      this.handleAutofocus();
    },
    activated: function activated()
    /* istanbul ignore next */
    {
      this.handleAutofocus();
    },
    methods: {
      handleAutofocus: function handleAutofocus() {
        var _this = this;

        this.$nextTick(function () {
          requestAF(function () {
            var el = _this.$el;

            if (_this.autofocus && isVisible(el)) {
              if (!matches(el, SELECTOR$1)) {
                el = select(SELECTOR$1, el);
              }

              el && el.focus && el.focus();
            }
          });
        });
      }
    }
  };

  var formRadioCheckMixin = {
    mixins: [normalizeSlotMixin],
    inheritAttrs: false,
    model: {
      prop: 'checked',
      event: 'input'
    },
    props: {
      value: {// Value when checked
        // type: Object,
        // default: undefined
      },
      checked: {// This is the v-model
        // type: Object,
        // default: undefined
      },
      inline: {
        type: Boolean,
        default: false
      },
      plain: {
        type: Boolean,
        default: false
      },
      button: {
        // Only applicable in standalone mode (non group)
        type: Boolean,
        default: false
      },
      buttonVariant: {
        // Only applicable when rendered with button style
        type: String,
        default: null
      },
      ariaLabel: {
        // Placed on the input if present.
        type: String,
        default: null
      },
      ariaLabelledby: {
        // Placed on the input if present.
        type: String,
        default: null
      }
    },
    data: function data() {
      return {
        localChecked: this.isGroup ? this.bvGroup.checked : this.checked,
        hasFocus: false
      };
    },
    computed: {
      computedLocalChecked: {
        get: function get() {
          return this.isGroup ? this.bvGroup.localChecked : this.localChecked;
        },
        set: function set(val) {
          if (this.isGroup) {
            this.bvGroup.localChecked = val;
          } else {
            this.localChecked = val;
          }
        }
      },
      isGroup: function isGroup() {
        // Is this check/radio a child of check-group or radio-group?
        return Boolean(this.bvGroup);
      },
      isBtnMode: function isBtnMode() {
        // Support button style in single input mode
        return this.isGroup ? this.bvGroup.buttons : this.button;
      },
      isPlain: function isPlain() {
        return this.isBtnMode ? false : this.isGroup ? this.bvGroup.plain : this.plain;
      },
      isCustom: function isCustom() {
        return this.isBtnMode ? false : !this.isPlain;
      },
      isSwitch: function isSwitch() {
        // Custom switch styling (checkboxes only)
        return this.isBtnMode || this.isRadio || this.isPlain ? false : this.isGroup ? this.bvGroup.switches : this.switch;
      },
      isInline: function isInline() {
        return this.isGroup ? this.bvGroup.inline : this.inline;
      },
      isDisabled: function isDisabled() {
        // Child can be disabled while parent isn't, but is always disabled if group is
        return this.isGroup ? this.bvGroup.disabled || this.disabled : this.disabled;
      },
      isRequired: function isRequired() {
        // Required only works when a name is provided for the input(s)
        // Child can only be required when parent is
        // Groups will always have a name (either user supplied or auto generated)
        return Boolean(this.getName && (this.isGroup ? this.bvGroup.required : this.required));
      },
      getName: function getName() {
        // Group name preferred over local name
        return (this.isGroup ? this.bvGroup.groupName : this.name) || null;
      },
      getForm: function getForm() {
        return (this.isGroup ? this.bvGroup.form : this.form) || null;
      },
      getSize: function getSize() {
        return (this.isGroup ? this.bvGroup.size : this.size) || '';
      },
      getState: function getState() {
        return this.isGroup ? this.bvGroup.computedState : this.computedState;
      },
      getButtonVariant: function getButtonVariant() {
        // Local variant preferred over group variant
        if (this.buttonVariant) {
          return this.buttonVariant;
        } else if (this.isGroup && this.bvGroup.buttonVariant) {
          return this.bvGroup.buttonVariant;
        } // default variant


        return 'secondary';
      },
      buttonClasses: function buttonClasses() {
        var _ref;

        // Same for radio & check
        return ['btn', "btn-".concat(this.getButtonVariant), (_ref = {}, _defineProperty(_ref, "btn-".concat(this.getSize), this.getSize), _defineProperty(_ref, "disabled", this.isDisabled), _defineProperty(_ref, "active", this.isChecked), _defineProperty(_ref, "focus", this.hasFocus), _ref)];
      }
    },
    watch: {
      checked: function checked(newVal, oldVal) {
        this.computedLocalChecked = newVal;
      }
    },
    methods: {
      handleFocus: function handleFocus(evt) {
        // When in buttons mode, we need to add 'focus' class to label when input focused
        // As it is the hidden input which has actual focus
        if (evt.target) {
          if (evt.type === 'focus') {
            this.hasFocus = true;
          } else if (evt.type === 'blur') {
            this.hasFocus = false;
          }
        }
      },
      // Convenience methods for focusing the input
      focus: function focus() {
        if (!this.isDisabled && this.$refs.input && this.$refs.input.focus) {
          this.$refs.input.focus();
        }
      },
      blur: function blur() {
        if (!this.isDisabled && this.$refs.input && this.$refs.input.blur) {
          this.$refs.input.blur();
        }
      }
    },
    render: function render(h) {
      var defaultSlot = this.normalizeSlot('default'); // Generate the input element

      var on = {
        change: this.handleChange
      };

      if (this.isBtnMode) {
        // Handlers for focus styling when in button mode
        on.focus = on.blur = this.handleFocus;
      }

      var input = h('input', {
        ref: 'input',
        key: 'input',
        on: on,
        class: {
          'form-check-input': this.isPlain,
          'custom-control-input': this.isCustom,
          'is-valid': this.getState === true && !this.isBtnMode,
          'is-invalid': this.getState === false && !this.isBtnMode,
          // https://github.com/bootstrap-vue/bootstrap-vue/issues/2911
          'position-static': this.isPlain && !defaultSlot
        },
        directives: [{
          name: 'model',
          rawName: 'v-model',
          value: this.computedLocalChecked,
          expression: 'computedLocalChecked'
        }],
        attrs: _objectSpread2({}, this.$attrs, {
          id: this.safeId(),
          type: this.isRadio ? 'radio' : 'checkbox',
          name: this.getName,
          form: this.getForm,
          disabled: this.isDisabled,
          required: this.isRequired,
          autocomplete: 'off',
          'aria-required': this.isRequired || null,
          'aria-label': this.ariaLabel || null,
          'aria-labelledby': this.ariaLabelledby || null
        }),
        domProps: {
          value: this.value,
          checked: this.isChecked
        }
      });

      if (this.isBtnMode) {
        // Button mode
        var button = h('label', {
          class: this.buttonClasses
        }, [input, defaultSlot]);

        if (!this.isGroup) {
          // Standalone button mode, so wrap in 'btn-group-toggle'
          // and flag it as inline-block to mimic regular buttons
          button = h('div', {
            class: ['btn-group-toggle', 'd-inline-block']
          }, [button]);
        }

        return button;
      } else {
        // Not button mode
        var label = h(); // If no label content in plain mode we dont render the label
        // https://github.com/bootstrap-vue/bootstrap-vue/issues/2911

        if (!(this.isPlain && !defaultSlot)) {
          label = h('label', {
            class: {
              'form-check-label': this.isPlain,
              'custom-control-label': this.isCustom
            },
            attrs: {
              for: this.safeId()
            }
          }, defaultSlot);
        } // Wrap it in a div


        return h('div', {
          class: _defineProperty({
            'form-check': this.isPlain,
            'form-check-inline': this.isPlain && this.isInline,
            'custom-control': this.isCustom,
            'custom-control-inline': this.isCustom && this.isInline,
            'custom-checkbox': this.isCustom && this.isCheck && !this.isSwitch,
            'custom-switch': this.isSwitch,
            'custom-radio': this.isCustom && this.isRadio
          }, "b-custom-control-".concat(this.getSize), Boolean(this.getSize && !this.isBtnMode))
        }, [input, label]);
      }
    }
  };

  var formSizeMixin = {
    props: {
      size: {
        type: String,
        default: function _default() {
          return getComponentConfig('formControls', 'size');
        }
      }
    },
    computed: {
      sizeFormClass: function sizeFormClass() {
        return [this.size ? "form-control-".concat(this.size) : null];
      },
      sizeBtnClass: function sizeBtnClass()
      /* istanbul ignore next: don't think this is used */
      {
        return [this.size ? "btn-".concat(this.size) : null];
      }
    }
  };

  var BFormCheckbox =
  /*#__PURE__*/
  Vue.extend({
    name: 'BFormCheckbox',
    mixins: [formRadioCheckMixin, // Includes shared render function
    idMixin, formMixin, formSizeMixin, formStateMixin],
    inject: {
      bvGroup: {
        from: 'bvCheckGroup',
        default: false
      }
    },
    props: {
      value: {
        // type: [String, Number, Boolean, Object],
        default: true
      },
      uncheckedValue: {
        // type: [String, Number, Boolean, Object],
        // Not applicable in multi-check mode
        default: false
      },
      indeterminate: {
        // Not applicable in multi-check mode
        type: Boolean,
        default: false
      },
      switch: {
        // Custom switch styling
        type: Boolean,
        default: false
      },
      checked: {
        // v-model (Array when multiple checkboxes have same name)
        // type: [String, Number, Boolean, Object, Array],
        default: null
      }
    },
    computed: {
      isChecked: function isChecked() {
        var checked = this.computedLocalChecked;
        var value = this.value;

        if (isArray(checked)) {
          return looseIndexOf(checked, value) > -1;
        } else {
          return looseEqual(checked, value);
        }
      },
      isRadio: function isRadio() {
        return false;
      },
      isCheck: function isCheck() {
        return true;
      }
    },
    watch: {
      computedLocalChecked: function computedLocalChecked(newVal, oldVal) {
        this.$emit('input', newVal);

        if (this.$refs && this.$refs.input) {
          this.$emit('update:indeterminate', this.$refs.input.indeterminate);
        }
      },
      indeterminate: function indeterminate(newVal, oldVal) {
        this.setIndeterminate(newVal);
      }
    },
    mounted: function mounted() {
      // Set initial indeterminate state
      this.setIndeterminate(this.indeterminate);
    },
    methods: {
      handleChange: function handleChange(_ref) {
        var _ref$target = _ref.target,
            checked = _ref$target.checked,
            indeterminate = _ref$target.indeterminate;
        var localChecked = this.computedLocalChecked;
        var value = this.value;
        var isArr = isArray(localChecked);
        var uncheckedValue = isArr ? null : this.uncheckedValue; // Update computedLocalChecked

        if (isArr) {
          var idx = looseIndexOf(localChecked, value);

          if (checked && idx < 0) {
            // Add value to array
            localChecked = localChecked.concat(value);
          } else if (!checked && idx > -1) {
            // Remove value from array
            localChecked = localChecked.slice(0, idx).concat(localChecked.slice(idx + 1));
          }
        } else {
          localChecked = checked ? value : uncheckedValue;
        }

        this.computedLocalChecked = localChecked; // Change is only emitted on user interaction

        this.$emit('change', checked ? value : uncheckedValue); // If this is a child of form-checkbox-group, we emit a change event on it as well

        if (this.isGroup) {
          this.bvGroup.$emit('change', localChecked);
        }

        this.$emit('update:indeterminate', indeterminate);
      },
      setIndeterminate: function setIndeterminate(state) {
        // Indeterminate only supported in single checkbox mode
        if (isArray(this.computedLocalChecked)) {
          state = false;
        }

        if (this.$refs && this.$refs.input) {
          this.$refs.input.indeterminate = state; // Emit update event to prop

          this.$emit('update:indeterminate', state);
        }
      }
    }
  });

  var BFormRadio =
  /*#__PURE__*/
  Vue.extend({
    name: 'BFormRadio',
    mixins: [idMixin, formRadioCheckMixin, // Includes shared render function
    formMixin, formSizeMixin, formStateMixin],
    inject: {
      bvGroup: {
        from: 'bvRadioGroup',
        default: false
      }
    },
    props: {
      checked: {
        // v-model
        // type: [String, Number, Boolean, Object],
        default: null
      }
    },
    computed: {
      // Radio Groups can only have a single value, so determining if checked is simple
      isChecked: function isChecked() {
        return looseEqual(this.value, this.computedLocalChecked);
      },
      // Flags for form-radio-check mixin
      isRadio: function isRadio() {
        return true;
      },
      isCheck: function isCheck() {
        return false;
      }
    },
    watch: {
      // Radio Groups can only have a single value, so our watchers are simple
      computedLocalChecked: function computedLocalChecked(newVal, oldVal) {
        this.$emit('input', this.computedLocalChecked);
      }
    },
    methods: {
      handleChange: function handleChange(_ref) {
        var checked = _ref.target.checked;
        var value = this.value;
        this.computedLocalChecked = value; // Change is only emitted on user interaction

        this.$emit('change', checked ? value : null); // If this is a child of form-radio-group, we emit a change event on it as well

        if (this.isGroup) {
          this.bvGroup.$emit('change', checked ? value : null);
        }
      }
    }
  });

  var formRadioCheckGroupMixin = {
    mixins: [normalizeSlotMixin],
    model: {
      prop: 'checked',
      event: 'input'
    },
    props: {
      validated: {
        type: Boolean,
        default: false
      },
      ariaInvalid: {
        type: [Boolean, String],
        default: false
      },
      stacked: {
        type: Boolean,
        default: false
      },
      plain: {
        type: Boolean,
        default: false
      },
      buttons: {
        // Render as button style
        type: Boolean,
        default: false
      },
      buttonVariant: {
        // Only applicable when rendered with button style
        type: String,
        default: 'secondary'
      }
    },
    computed: {
      inline: function inline() {
        return !this.stacked;
      },
      groupName: function groupName() {
        // Checks/Radios tied to the same model must have the same name,
        // especially for ARIA accessibility.
        return this.name || this.safeId();
      },
      groupClasses: function groupClasses() {
        if (this.buttons) {
          return ['btn-group-toggle', this.inline ? 'btn-group' : 'btn-group-vertical', this.size ? "btn-group-".concat(this.size) : '', this.validated ? "was-validated" : ''];
        }

        return [this.validated ? "was-validated" : ''];
      },
      computedAriaInvalid: function computedAriaInvalid() {
        var ariaInvalid = this.ariaInvalid;

        if (ariaInvalid === true || ariaInvalid === 'true' || ariaInvalid === '') {
          return 'true';
        }

        return this.computedState === false ? 'true' : null;
      }
    },
    watch: {
      checked: function checked(newVal, oldVal) {
        this.localChecked = newVal;
      },
      localChecked: function localChecked(newVal, oldVal) {
        this.$emit('input', newVal);
      }
    },
    render: function render(h) {
      var _this = this;

      var inputs = this.formOptions.map(function (option, idx) {
        var uid = "_BV_option_".concat(idx, "_");
        return h(_this.isRadioGroup ? BFormRadio : BFormCheckbox, {
          key: uid,
          props: {
            id: _this.safeId(uid),
            value: option.value,
            // Individual radios or checks can be disabled in a group
            disabled: option.disabled || false // We don't need to include these, since the input's will know they are inside here
            // name: this.groupName,
            // form: this.form || null,
            // required: Boolean(this.name && this.required)

          }
        }, [h('span', {
          domProps: htmlOrText(option.html, option.text)
        })]);
      });
      return h('div', {
        class: this.groupClasses,
        attrs: {
          id: this.safeId(),
          role: this.isRadioGroup ? 'radiogroup' : 'group',
          // Tabindex to allow group to be focused if needed
          tabindex: '-1',
          'aria-required': this.required ? 'true' : null,
          'aria-invalid': this.computedAriaInvalid
        }
      }, [this.normalizeSlot('first'), inputs, this.normalizeSlot('default')]);
    }
  };

  var props$v = {
    switches: {
      // Custom switch styling
      type: Boolean,
      default: false
    },
    checked: {
      type: Array,
      default: null
    }
  }; // @vue/component

  var BFormCheckboxGroup =
  /*#__PURE__*/
  Vue.extend({
    name: 'BFormCheckboxGroup',
    mixins: [idMixin, formMixin, formRadioCheckGroupMixin, // Includes render function
    formOptionsMixin, formSizeMixin, formStateMixin],
    provide: function provide() {
      return {
        bvCheckGroup: this
      };
    },
    props: props$v,
    data: function data() {
      return {
        localChecked: this.checked || []
      };
    },
    computed: {
      isRadioGroup: function isRadioGroup() {
        return false;
      }
    }
  });

  var FormCheckboxPlugin =
  /*#__PURE__*/
  pluginFactory({
    components: {
      BFormCheckbox: BFormCheckbox,
      BCheckbox: BFormCheckbox,
      BCheck: BFormCheckbox,
      BFormCheckboxGroup: BFormCheckboxGroup,
      BCheckboxGroup: BFormCheckboxGroup,
      BCheckGroup: BFormCheckboxGroup
    }
  });

  var props$w = {
    checked: {
      // type: [String, Number, Boolean, Object],
      default: null
    }
  }; // @vue/component

  var BFormRadioGroup =
  /*#__PURE__*/
  Vue.extend({
    name: 'BFormRadioGroup',
    mixins: [idMixin, formMixin, formRadioCheckGroupMixin, // Includes render function
    formOptionsMixin, formSizeMixin, formStateMixin],
    provide: function provide() {
      return {
        bvRadioGroup: this
      };
    },
    props: props$w,
    data: function data() {
      return {
        localChecked: this.checked
      };
    },
    computed: {
      isRadioGroup: function isRadioGroup() {
        return true;
      }
    }
  });

  var FormRadioPlugin =
  /*#__PURE__*/
  pluginFactory({
    components: {
      BFormRadio: BFormRadio,
      BRadio: BFormRadio,
      BFormRadioGroup: BFormRadioGroup,
      BRadioGroup: BFormRadioGroup
    }
  });

  var formTextMixin = {
    model: {
      prop: 'value',
      event: 'update'
    },
    props: {
      value: {
        type: [String, Number],
        default: ''
      },
      ariaInvalid: {
        type: [Boolean, String],
        default: false
      },
      readonly: {
        type: Boolean,
        default: false
      },
      plaintext: {
        type: Boolean,
        default: false
      },
      autocomplete: {
        type: String,
        default: null
      },
      placeholder: {
        type: String,
        default: null
      },
      formatter: {
        type: Function,
        default: null
      },
      lazyFormatter: {
        type: Boolean,
        default: false
      },
      trim: {
        type: Boolean,
        default: false
      },
      number: {
        type: Boolean,
        default: false
      },
      lazy: {
        // Only update the `v-model` on blur/change events
        type: Boolean,
        default: false
      },
      debounce: {
        // Debounce timout (in ms). Not applicable with `lazy` prop
        type: [Number, String],
        default: 0
      }
    },
    data: function data() {
      return {
        localValue: this.stringifyValue(this.value),
        vModelValue: this.value
      };
    },
    computed: {
      computedDebounce: function computedDebounce() {
        // Ensure we have a positive number equal to or greater than 0
        return Math.max(parseInt(this.debounce, 10) || 0, 0);
      },
      computedClass: function computedClass() {
        return [{
          // Range input needs class `custom-range`
          'custom-range': this.type === 'range',
          // `plaintext` not supported by `type="range"` or `type="color"`
          'form-control-plaintext': this.plaintext && this.type !== 'range' && this.type !== 'color',
          // `form-control` not used by `type="range"` or `plaintext`
          // Always used by `type="color"`
          'form-control': !this.plaintext && this.type !== 'range' || this.type === 'color'
        }, this.sizeFormClass, this.stateClass];
      },
      computedAriaInvalid: function computedAriaInvalid() {
        if (!this.ariaInvalid || this.ariaInvalid === 'false') {
          // `this.ariaInvalid` is `null` or `false` or 'false'
          return this.computedState === false ? 'true' : null;
        }

        if (this.ariaInvalid === true) {
          // User wants explicit `:aria-invalid="true"`
          return 'true';
        } // Most likely a string value (which could be the string 'true')


        return this.ariaInvalid;
      }
    },
    watch: {
      value: function value(newVal) {
        var stringifyValue = this.stringifyValue(newVal);

        if (stringifyValue !== this.localValue && newVal !== this.vModelValue) {
          // Clear any pending debounce timeout, as we are overwriting the user input
          this.clearDebounce(); // Update the local values

          this.localValue = stringifyValue;
          this.vModelValue = newVal;
        }
      }
    },
    mounted: function mounted() {
      // Create non-reactive property and set up destroy handler
      this.$_inputDebounceTimer = null;
      this.$on('hook:beforeDestroy', this.clearDebounce); // Preset the internal state

      var value = this.value;
      var stringifyValue = this.stringifyValue(value);
      /* istanbul ignore next */

      if (stringifyValue !== this.localValue && value !== this.vModelValue) {
        this.localValue = stringifyValue;
        this.vModelValue = value;
      }
    },
    methods: {
      clearDebounce: function clearDebounce() {
        clearTimeout(this.$_inputDebounceTimer);
        this.$_inputDebounceTimer = null;
      },
      stringifyValue: function stringifyValue(value) {
        return isUndefinedOrNull(value) ? '' : String(value);
      },
      formatValue: function formatValue(value, evt) {
        var force = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        value = this.stringifyValue(value);

        if ((!this.lazyFormatter || force) && isFunction(this.formatter)) {
          value = this.formatter(value, evt);
        }

        return value;
      },
      modifyValue: function modifyValue(value) {
        // Emulate `.trim` modifier behaviour
        if (this.trim) {
          value = value.trim();
        } // Emulate `.number` modifier behaviour


        if (this.number) {
          var number = parseFloat(value);
          value = isNaN(number) ? value : number;
        }

        return value;
      },
      updateValue: function updateValue(value) {
        var _this = this;

        var force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var lazy = this.lazy;
        var ms = this.computedDebounce;

        if (lazy && !force) {
          return;
        }

        value = this.modifyValue(value);

        if (value !== this.vModelValue) {
          this.clearDebounce();

          var doUpdate = function doUpdate() {
            _this.vModelValue = value;

            _this.$emit('update', value);
          };

          if (ms > 0 && !lazy && !force) {
            // Change/Blur/Force will not be debounced
            this.$_inputDebounceTimer = setTimeout(doUpdate, ms);
          } else {
            // Immediately update the v-model
            doUpdate();
          }
        }
      },
      onInput: function onInput(evt) {
        // `evt.target.composing` is set by Vue
        // https://github.com/vuejs/vue/blob/dev/src/platforms/web/runtime/directives/model.js

        /* istanbul ignore if: hard to test composition events */
        if (evt.target.composing) {
          return;
        }

        var value = evt.target.value;
        var formattedValue = this.formatValue(value, evt); // Exit when the `formatter` function strictly returned `false`
        // or prevented the input event

        /* istanbul ignore next */

        if (formattedValue === false || evt.defaultPrevented) {
          evt.preventDefault();
          return;
        }

        this.localValue = formattedValue;
        this.updateValue(formattedValue);
        this.$emit('input', formattedValue);
      },
      onChange: function onChange(evt) {
        // `evt.target.composing` is set by Vue
        // https://github.com/vuejs/vue/blob/dev/src/platforms/web/runtime/directives/model.js

        /* istanbul ignore if: hard to test composition events */
        if (evt.target.composing) {
          return;
        }

        var value = evt.target.value;
        var formattedValue = this.formatValue(value, evt); // Exit when the `formatter` function strictly returned `false`
        // or prevented the input event

        /* istanbul ignore next */

        if (formattedValue === false || evt.defaultPrevented) {
          evt.preventDefault();
          return;
        }

        this.localValue = formattedValue;
        this.updateValue(formattedValue, true);
        this.$emit('change', formattedValue);
      },
      onBlur: function onBlur(evt) {
        // Apply the `localValue` on blur to prevent cursor jumps
        // on mobile browsers (e.g. caused by autocomplete)
        var value = evt.target.value;
        var formattedValue = this.formatValue(value, evt, true);

        if (formattedValue !== false) {
          // We need to use the modified value here to apply the
          // `.trim` and `.number` modifiers properly
          this.localValue = this.stringifyValue(this.modifyValue(formattedValue)); // We pass the formatted value here since the `updateValue` method
          // handles the modifiers itself

          this.updateValue(formattedValue, true);
        } // Emit native blur event


        this.$emit('blur', evt);
      },
      focus: function focus() {
        // For external handler that may want a focus method
        if (!this.disabled) {
          this.$el.focus();
        }
      },
      blur: function blur() {
        // For external handler that may want a blur method
        if (!this.disabled) {
          this.$el.blur();
        }
      }
    }
  };

  // @vue/component
  var formSelectionMixin = {
    computed: {
      selectionStart: {
        // Expose selectionStart for formatters, etc
        cache: false,
        get: function get()
        /* istanbul ignore next */
        {
          return this.$refs.input.selectionStart;
        },
        set: function set(val)
        /* istanbul ignore next */
        {
          this.$refs.input.selectionStart = val;
        }
      },
      selectionEnd: {
        // Expose selectionEnd for formatters, etc
        cache: false,
        get: function get()
        /* istanbul ignore next */
        {
          return this.$refs.input.selectionEnd;
        },
        set: function set(val)
        /* istanbul ignore next */
        {
          this.$refs.input.selectionEnd = val;
        }
      },
      selectionDirection: {
        // Expose selectionDirection for formatters, etc
        cache: false,
        get: function get()
        /* istanbul ignore next */
        {
          return this.$refs.input.selectionDirection;
        },
        set: function set(val)
        /* istanbul ignore next */
        {
          this.$refs.input.selectionDirection = val;
        }
      }
    },
    methods: {
      select: function select()
      /* istanbul ignore next */
      {
        var _this$$refs$input;

        // For external handler that may want a select() method
        (_this$$refs$input = this.$refs.input).select.apply(_this$$refs$input, arguments);
      },
      setSelectionRange: function setSelectionRange()
      /* istanbul ignore next */
      {
        var _this$$refs$input2;

        // For external handler that may want a setSelectionRange(a,b,c) method
        (_this$$refs$input2 = this.$refs.input).setSelectionRange.apply(_this$$refs$input2, arguments);
      },
      setRangeText: function setRangeText()
      /* istanbul ignore next */
      {
        var _this$$refs$input3;

        // For external handler that may want a setRangeText(a,b,c) method
        (_this$$refs$input3 = this.$refs.input).setRangeText.apply(_this$$refs$input3, arguments);
      }
    }
  };

  // @vue/component
  var formValidityMixin = {
    computed: {
      validity: {
        // Expose validity property
        cache: false,
        get: function get()
        /* istanbul ignore next */
        {
          return this.$refs.input.validity;
        }
      },
      validationMessage: {
        // Expose validationMessage property
        cache: false,
        get: function get()
        /* istanbul ignore next */
        {
          return this.$refs.input.validationMessage;
        }
      },
      willValidate: {
        // Expose willValidate property
        cache: false,
        get: function get()
        /* istanbul ignore next */
        {
          return this.$refs.input.willValidate;
        }
      }
    },
    methods: {
      setCustomValidity: function setCustomValidity()
      /* istanbul ignore next */
      {
        var _this$$refs$input;

        // For external handler that may want a setCustomValidity(...) method
        return (_this$$refs$input = this.$refs.input).setCustomValidity.apply(_this$$refs$input, arguments);
      },
      checkValidity: function checkValidity()
      /* istanbul ignore next */
      {
        var _this$$refs$input2;

        // For external handler that may want a checkValidity(...) method
        return (_this$$refs$input2 = this.$refs.input).checkValidity.apply(_this$$refs$input2, arguments);
      },
      reportValidity: function reportValidity()
      /* istanbul ignore next */
      {
        var _this$$refs$input3;

        // For external handler that may want a reportValidity(...) method
        return (_this$$refs$input3 = this.$refs.input).reportValidity.apply(_this$$refs$input3, arguments);
      }
    }
  };

  var TYPES = ['text', 'password', 'email', 'number', 'url', 'tel', 'search', 'range', 'color', 'date', 'time', 'datetime', 'datetime-local', 'month', 'week']; // @vue/component

  var BFormInput =
  /*#__PURE__*/
  Vue.extend({
    name: 'BFormInput',
    mixins: [idMixin, formMixin, formSizeMixin, formStateMixin, formTextMixin, formSelectionMixin, formValidityMixin],
    props: {
      // value prop defined in form-text mixin
      // value: { },
      type: {
        type: String,
        default: 'text',
        validator: function validator(type) {
          return arrayIncludes(TYPES, type);
        }
      },
      noWheel: {
        // Disable mousewheel to prevent wheel from changing values (i.e. number/date).
        type: Boolean,
        default: false
      },
      min: {
        type: [String, Number],
        default: null
      },
      max: {
        type: [String, Number],
        default: null
      },
      step: {
        type: [String, Number],
        default: null
      },
      list: {
        type: String,
        default: null
      }
    },
    computed: {
      localType: function localType() {
        // We only allow certain types
        return arrayIncludes(TYPES, this.type) ? this.type : 'text';
      }
    },
    watch: {
      noWheel: function noWheel(newVal) {
        this.setWheelStopper(newVal);
      }
    },
    mounted: function mounted() {
      this.setWheelStopper(this.noWheel);
    },
    deactivated: function deactivated() {
      // Turn off listeners when keep-alive component deactivated

      /* istanbul ignore next */
      this.setWheelStopper(false);
    },
    activated: function activated() {
      // Turn on listeners (if no-wheel) when keep-alive component activated

      /* istanbul ignore next */
      this.setWheelStopper(this.noWheel);
    },
    beforeDestroy: function beforeDestroy() {
      /* istanbul ignore next */
      this.setWheelStopper(false);
    },
    methods: {
      setWheelStopper: function setWheelStopper(on) {
        var input = this.$el; // We use native events, so that we don't interfere with propgation

        if (on) {
          eventOn(input, 'focus', this.onWheelFocus);
          eventOn(input, 'blur', this.onWheelBlur);
        } else {
          eventOff(input, 'focus', this.onWheelFocus);
          eventOff(input, 'blur', this.onWheelBlur);
          eventOff(document, 'wheel', this.stopWheel);
        }
      },
      onWheelFocus: function onWheelFocus(evt) {
        eventOn(document, 'wheel', this.stopWheel);
      },
      onWheelBlur: function onWheelBlur(evt) {
        eventOff(document, 'wheel', this.stopWheel);
      },
      stopWheel: function stopWheel(evt) {
        evt.preventDefault();
        this.$el.blur();
      }
    },
    render: function render(h) {
      var self = this;
      return h('input', {
        ref: 'input',
        class: self.computedClass,
        directives: [{
          name: 'model',
          rawName: 'v-model',
          value: self.localValue,
          expression: 'localValue'
        }],
        attrs: {
          id: self.safeId(),
          name: self.name,
          form: self.form || null,
          type: self.localType,
          disabled: self.disabled,
          placeholder: self.placeholder,
          required: self.required,
          autocomplete: self.autocomplete || null,
          readonly: self.readonly || self.plaintext,
          min: self.min,
          max: self.max,
          step: self.step,
          list: self.localType !== 'password' ? self.list : null,
          'aria-required': self.required ? 'true' : null,
          'aria-invalid': self.computedAriaInvalid
        },
        domProps: {
          value: self.localValue
        },
        on: _objectSpread2({}, self.$listeners, {
          input: self.onInput,
          change: self.onChange,
          blur: self.onBlur
        })
      });
    }
  });

  var FormInputPlugin =
  /*#__PURE__*/
  pluginFactory({
    components: {
      BFormInput: BFormInput,
      BInput: BFormInput
    }
  });

  var BFormTextarea =
  /*#__PURE__*/
  Vue.extend({
    name: 'BFormTextarea',
    directives: {
      'b-visible': VBVisible
    },
    mixins: [idMixin, listenOnRootMixin, formMixin, formSizeMixin, formStateMixin, formTextMixin, formSelectionMixin, formValidityMixin],
    props: {
      rows: {
        type: [Number, String],
        default: 2
      },
      maxRows: {
        type: [Number, String],
        default: null
      },
      wrap: {
        // 'soft', 'hard' or 'off'. Browser default is 'soft'
        type: String,
        default: 'soft'
      },
      noResize: {
        // Disable the resize handle of textarea
        type: Boolean,
        default: false
      },
      noAutoShrink: {
        // When in auto resize mode, disable shrinking to content height
        type: Boolean,
        default: false
      }
    },
    data: function data() {
      return {
        heightInPx: null
      };
    },
    computed: {
      computedStyle: function computedStyle() {
        var styles = {
          // Setting `noResize` to true will disable the ability for the user to
          // manually resize the textarea. We also disable when in auto height mode
          resize: !this.computedRows || this.noResize ? 'none' : null
        };

        if (!this.computedRows) {
          // Conditionally set the computed CSS height when auto rows/height is enabled
          // We avoid setting the style to `null`, which can override user manual resize handle
          styles.height = this.heightInPx; // We always add a vertical scrollbar to the textarea when auto-height is
          // enabled so that the computed height calculation returns a stable value

          styles.overflowY = 'scroll';
        }

        return styles;
      },
      computedMinRows: function computedMinRows() {
        // Ensure rows is at least 2 and positive (2 is the native textarea value)
        // A value of 1 can cause issues in some browsers, and most browsers
        // only support 2 as the smallest value
        return Math.max(parseInt(this.rows, 10) || 2, 2);
      },
      computedMaxRows: function computedMaxRows() {
        return Math.max(this.computedMinRows, parseInt(this.maxRows, 10) || 0);
      },
      computedRows: function computedRows() {
        // This is used to set the attribute 'rows' on the textarea
        // If auto-height is enabled, then we return `null` as we use CSS to control height
        return this.computedMinRows === this.computedMaxRows ? this.computedMinRows : null;
      }
    },
    watch: {
      localValue: function localValue(newVal, oldVal) {
        this.setHeight();
      }
    },
    mounted: function mounted() {
      this.setHeight();
    },
    methods: {
      // Called by intersection observer directive
      visibleCallback: function visibleCallback(visible)
      /* istanbul ignore next */
      {
        if (visible) {
          // We use a `$nextTick()` here just to make sure any
          // transitions or portalling have completed
          this.$nextTick(this.setHeight);
        }
      },
      setHeight: function setHeight() {
        var _this = this;

        this.$nextTick(function () {
          requestAF(function () {
            _this.heightInPx = _this.computeHeight();
          });
        });
      },
      computeHeight: function computeHeight()
      /* istanbul ignore next: can't test getComputedStyle in JSDOM */
      {
        if (this.$isServer || !isNull(this.computedRows)) {
          return null;
        }

        var el = this.$el; // Element must be visible (not hidden) and in document
        // Must be checked after above checks

        if (!isVisible(el)) {
          return null;
        } // Get current computed styles


        var computedStyle = getCS(el); // Height of one line of text in px

        var lineHeight = parseFloat(computedStyle.lineHeight); // Calculate height of border and padding

        var border = (parseFloat(computedStyle.borderTopWidth) || 0) + (parseFloat(computedStyle.borderBottomWidth) || 0);
        var padding = (parseFloat(computedStyle.paddingTop) || 0) + (parseFloat(computedStyle.paddingBottom) || 0); // Calculate offset

        var offset = border + padding; // Minimum height for min rows (which must be 2 rows or greater for cross-browser support)

        var minHeight = lineHeight * this.computedMinRows + offset; // Get the current style height (with `px` units)

        var oldHeight = el.style.height || computedStyle.height; // Probe scrollHeight by temporarily changing the height to `auto`

        el.style.height = 'auto';
        var scrollHeight = el.scrollHeight; // Place the original old height back on the element, just in case `computedProp`
        // returns the same value as before

        el.style.height = oldHeight; // Calculate content height in 'rows' (scrollHeight includes padding but not border)

        var contentRows = Math.max((scrollHeight - padding) / lineHeight, 2); // Calculate number of rows to display (limited within min/max rows)

        var rows = Math.min(Math.max(contentRows, this.computedMinRows), this.computedMaxRows); // Calculate the required height of the textarea including border and padding (in pixels)

        var height = Math.max(Math.ceil(rows * lineHeight + offset), minHeight); // Computed height remains the larger of `oldHeight` and new `height`,
        // when height is in `sticky` mode (prop `no-auto-shrink` is true)

        if (this.noAutoShrink && (parseFloat(oldHeight) || 0) > height) {
          return oldHeight;
        } // Return the new computed CSS height in px units


        return "".concat(height, "px");
      }
    },
    render: function render(h) {
      // Using self instead of this helps reduce code size during minification
      var self = this;
      return h('textarea', {
        ref: 'input',
        class: self.computedClass,
        style: self.computedStyle,
        directives: [{
          name: 'model',
          value: self.localValue
        }, {
          name: 'b-visible',
          value: this.visibleCallback,
          // If textarea is within 640px of viewport, consider it visible
          modifiers: {
            '640': true
          }
        }],
        attrs: {
          id: self.safeId(),
          name: self.name,
          form: self.form || null,
          disabled: self.disabled,
          placeholder: self.placeholder,
          required: self.required,
          autocomplete: self.autocomplete || null,
          readonly: self.readonly || self.plaintext,
          rows: self.computedRows,
          wrap: self.wrap || null,
          'aria-required': self.required ? 'true' : null,
          'aria-invalid': self.computedAriaInvalid
        },
        domProps: {
          value: self.localValue
        },
        on: _objectSpread2({}, self.$listeners, {
          input: self.onInput,
          change: self.onChange,
          blur: self.onBlur
        })
      });
    }
  });

  var FormTextareaPlugin =
  /*#__PURE__*/
  pluginFactory({
    components: {
      BFormTextarea: BFormTextarea,
      BTextarea: BFormTextarea
    }
  });

  // @vue/component
  var formCustomMixin = {
    props: {
      plain: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      custom: function custom() {
        return !this.plain;
      }
    }
  };

  var NAME$c = 'BFormFile'; // @vue/component

  var BFormFile =
  /*#__PURE__*/
  Vue.extend({
    name: NAME$c,
    mixins: [idMixin, formMixin, formStateMixin, formCustomMixin, normalizeSlotMixin],
    inheritAttrs: false,
    model: {
      prop: 'value',
      event: 'input'
    },
    props: {
      size: {
        type: String,
        default: function _default() {
          return getComponentConfig('BFormControl', 'size');
        }
      },
      value: {
        type: [File, Array],
        default: null,
        validator: function validator(val) {
          /* istanbul ignore next */
          if (val === '') {
            warn("".concat(NAME$c, " - setting value/v-model to an empty string for reset is deprecated. Set to 'null' instead"));
            return true;
          }

          return isUndefinedOrNull(val) || isFile(val) || isArray(val) && (val.length === 0 || val.every(isFile));
        }
      },
      accept: {
        type: String,
        default: ''
      },
      // Instruct input to capture from camera
      capture: {
        type: Boolean,
        default: false
      },
      placeholder: {
        type: String,
        default: function _default() {
          return getComponentConfig(NAME$c, 'placeholder');
        }
      },
      browseText: {
        type: String,
        default: function _default() {
          return getComponentConfig(NAME$c, 'browseText');
        }
      },
      dropPlaceholder: {
        type: String,
        default: function _default() {
          return getComponentConfig(NAME$c, 'dropPlaceholder');
        }
      },
      multiple: {
        type: Boolean,
        default: false
      },
      directory: {
        type: Boolean,
        default: false
      },
      noTraverse: {
        type: Boolean,
        default: false
      },
      noDrop: {
        type: Boolean,
        default: false
      },
      fileNameFormatter: {
        type: Function,
        default: null
      }
    },
    data: function data() {
      return {
        selectedFile: null,
        dragging: false,
        hasFocus: false
      };
    },
    computed: {
      selectLabel: function selectLabel() {
        // Draging active
        if (this.dragging && this.dropPlaceholder) {
          return this.dropPlaceholder;
        } // No file chosen


        if (!this.selectedFile || this.selectedFile.length === 0) {
          return this.placeholder;
        } // Convert selectedFile to an array (if not already one)


        var files = concat(this.selectedFile).filter(Boolean);

        if (this.hasNormalizedSlot('file-name')) {
          // There is a slot for formatting the files/names
          return [this.normalizeSlot('file-name', {
            files: files,
            names: files.map(function (f) {
              return f.name;
            })
          })];
        } else {
          // Use the user supplied formatter, or the built in one.
          return isFunction(this.fileNameFormatter) ? String(this.fileNameFormatter(files)) : files.map(function (file) {
            return file.name;
          }).join(', ');
        }
      }
    },
    watch: {
      selectedFile: function selectedFile(newVal, oldVal) {
        // The following test is needed when the file input is "reset" or the
        // exact same file(s) are selected to prevent an infinite loop.
        // When in `multiple` mode we need to check for two empty arrays or
        // two arrays with identical files
        if (newVal === oldVal || isArray(newVal) && isArray(oldVal) && newVal.length === oldVal.length && newVal.every(function (v, i) {
          return v === oldVal[i];
        })) {
          return;
        }

        if (!newVal && this.multiple) {
          this.$emit('input', []);
        } else {
          this.$emit('input', newVal);
        }
      },
      value: function value(newVal) {
        if (!newVal || isArray(newVal) && newVal.length === 0) {
          this.reset();
        }
      }
    },
    methods: {
      focusHandler: function focusHandler(evt) {
        // Bootstrap v4 doesn't have focus styling for custom file input
        // Firefox has a '[type=file]:focus ~ sibling' selector issue,
        // so we add a 'focus' class to get around these bugs
        if (this.plain || evt.type === 'focusout') {
          this.hasFocus = false;
        } else {
          // Add focus styling for custom file input
          this.hasFocus = true;
        }
      },
      reset: function reset() {
        try {
          // Wrapped in try in case IE 11 craps out
          this.$refs.input.value = '';
        } catch (e) {} // IE 11 doesn't support setting `input.value` to '' or null
        // So we use this little extra hack to reset the value, just in case.
        // This also appears to work on modern browsers as well.


        this.$refs.input.type = '';
        this.$refs.input.type = 'file';
        this.selectedFile = this.multiple ? [] : null;
      },
      onFileChange: function onFileChange(evt) {
        var _this = this;

        // Always emit original event
        this.$emit('change', evt); // Check if special `items` prop is available on event (drop mode)
        // Can be disabled by setting no-traverse

        var items = evt.dataTransfer && evt.dataTransfer.items;
        /* istanbul ignore next: not supported in JSDOM */

        if (items && !this.noTraverse) {
          var queue = [];

          for (var i = 0; i < items.length; i++) {
            var item = items[i].webkitGetAsEntry();

            if (item) {
              queue.push(this.traverseFileTree(item));
            }
          }

          Promise.all(queue).then(function (filesArr) {
            _this.setFiles(from(filesArr));
          });
          return;
        } // Normal handling


        this.setFiles(evt.target.files || evt.dataTransfer.files);
      },
      setFiles: function setFiles() {
        var files = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

        if (!files) {
          /* istanbul ignore next: this will probably not happen */
          this.selectedFile = null;
        } else if (this.multiple) {
          // Convert files to array
          var filesArray = [];

          for (var i = 0; i < files.length; i++) {
            filesArray.push(files[i]);
          } // Return file(s) as array


          this.selectedFile = filesArray;
        } else {
          // Return single file object
          this.selectedFile = files[0] || null;
        }
      },
      onReset: function onReset() {
        // Triggered when the parent form (if any) is reset
        this.selectedFile = this.multiple ? [] : null;
      },
      onDragover: function onDragover(evt)
      /* istanbul ignore next: difficult to test in JSDOM */
      {
        evt.preventDefault();
        evt.stopPropagation();

        if (this.noDrop || !this.custom) {
          return;
        }

        this.dragging = true;
        evt.dataTransfer.dropEffect = 'copy';
      },
      onDragleave: function onDragleave(evt)
      /* istanbul ignore next: difficult to test in JSDOM */
      {
        evt.preventDefault();
        evt.stopPropagation();
        this.dragging = false;
      },
      onDrop: function onDrop(evt)
      /* istanbul ignore next: difficult to test in JSDOM */
      {
        evt.preventDefault();
        evt.stopPropagation();

        if (this.noDrop) {
          return;
        }

        this.dragging = false;

        if (evt.dataTransfer.files && evt.dataTransfer.files.length > 0) {
          this.onFileChange(evt);
        }
      },
      traverseFileTree: function traverseFileTree(item, path)
      /* istanbul ignore next: not supported in JSDOM */
      {
        var _this2 = this;

        // Based on http://stackoverflow.com/questions/3590058
        return new Promise(function (resolve) {
          path = path || '';

          if (item.isFile) {
            // Get file
            item.file(function (file) {
              file.$path = path; // Inject $path to file obj

              resolve(file);
            });
          } else if (item.isDirectory) {
            // Get folder contents
            item.createReader().readEntries(function (entries) {
              var queue = [];

              for (var i = 0; i < entries.length; i++) {
                queue.push(_this2.traverseFileTree(entries[i], path + item.name + '/'));
              }

              Promise.all(queue).then(function (filesArr) {
                resolve(from(filesArr));
              });
            });
          }
        });
      }
    },
    render: function render(h) {
      // Form Input
      var input = h('input', {
        ref: 'input',
        class: [{
          'form-control-file': this.plain,
          'custom-file-input': this.custom,
          focus: this.custom && this.hasFocus
        }, this.stateClass],
        attrs: _objectSpread2({}, this.$attrs, {
          type: 'file',
          id: this.safeId(),
          name: this.name,
          disabled: this.disabled,
          required: this.required,
          form: this.form || null,
          capture: this.capture || null,
          accept: this.accept || null,
          multiple: this.multiple,
          webkitdirectory: this.directory,
          'aria-required': this.required ? 'true' : null
        }),
        on: {
          change: this.onFileChange,
          focusin: this.focusHandler,
          focusout: this.focusHandler,
          reset: this.onReset
        }
      });

      if (this.plain) {
        return input;
      } // Overlay Labels


      var label = h('label', {
        staticClass: 'custom-file-label',
        class: [this.dragging ? 'dragging' : null],
        attrs: {
          for: this.safeId(),
          'data-browse': this.browseText || null
        }
      }, this.selectLabel); // Return rendered custom file input

      return h('div', {
        staticClass: 'custom-file b-form-file',
        class: [this.stateClass, _defineProperty({}, "b-custom-control-".concat(this.size), Boolean(this.size))],
        attrs: {
          id: this.safeId('_BV_file_outer_')
        },
        on: {
          dragover: this.onDragover,
          dragleave: this.onDragleave,
          drop: this.onDrop
        }
      }, [input, label]);
    }
  });

  var FormFilePlugin =
  /*#__PURE__*/
  pluginFactory({
    components: {
      BFormFile: BFormFile,
      BFile: BFormFile
    }
  });

  var BFormSelect =
  /*#__PURE__*/
  Vue.extend({
    name: 'BFormSelect',
    mixins: [idMixin, normalizeSlotMixin, formMixin, formSizeMixin, formStateMixin, formCustomMixin, formOptionsMixin],
    model: {
      prop: 'value',
      event: 'input'
    },
    props: {
      value: {// type: [Object, Array, String, Number, Boolean],
        // default: undefined
      },
      multiple: {
        type: Boolean,
        default: false
      },
      selectSize: {
        // Browsers default size to 0, which shows 4 rows in most browsers in multiple mode
        // Size of 1 can bork out Firefox
        type: Number,
        default: 0
      },
      ariaInvalid: {
        type: [Boolean, String],
        default: false
      }
    },
    data: function data() {
      return {
        localValue: this.value
      };
    },
    computed: {
      computedSelectSize: function computedSelectSize() {
        // Custom selects with a size of zero causes the arrows to be hidden,
        // so dont render the size attribute in this case
        return !this.plain && this.selectSize === 0 ? null : this.selectSize;
      },
      inputClass: function inputClass() {
        return [this.plain ? 'form-control' : 'custom-select', this.size && this.plain ? "form-control-".concat(this.size) : null, this.size && !this.plain ? "custom-select-".concat(this.size) : null, this.stateClass];
      },
      computedAriaInvalid: function computedAriaInvalid() {
        if (this.ariaInvalid === true || this.ariaInvalid === 'true') {
          return 'true';
        }

        return this.stateClass === 'is-invalid' ? 'true' : null;
      }
    },
    watch: {
      value: function value(newVal, oldVal) {
        this.localValue = newVal;
      },
      localValue: function localValue(newVal, oldVal) {
        this.$emit('input', this.localValue);
      }
    },
    methods: {
      focus: function focus() {
        this.$refs.input.focus();
      },
      blur: function blur() {
        this.$refs.input.blur();
      }
    },
    render: function render(h) {
      var _this = this;

      var options = this.formOptions.map(function (option, index) {
        return h('option', {
          key: "option_".concat(index, "_opt"),
          attrs: {
            disabled: Boolean(option.disabled)
          },
          domProps: _objectSpread2({}, htmlOrText(option.html, option.text), {
            value: option.value
          })
        });
      });
      return h('select', {
        ref: 'input',
        class: this.inputClass,
        directives: [{
          name: 'model',
          rawName: 'v-model',
          value: this.localValue,
          expression: 'localValue'
        }],
        attrs: {
          id: this.safeId(),
          name: this.name,
          form: this.form || null,
          multiple: this.multiple || null,
          size: this.computedSelectSize,
          disabled: this.disabled,
          required: this.required,
          'aria-required': this.required ? 'true' : null,
          'aria-invalid': this.computedAriaInvalid
        },
        on: {
          change: function change(evt) {
            var target = evt.target;
            var selectedVal = from(target.options).filter(function (o) {
              return o.selected;
            }).map(function (o) {
              return '_value' in o ? o._value : o.value;
            });
            _this.localValue = target.multiple ? selectedVal : selectedVal[0];

            _this.$nextTick(function () {
              _this.$emit('change', _this.localValue);
            });
          }
        }
      }, [this.normalizeSlot('first'), options, this.normalizeSlot('default')]);
    }
  });

  var FormSelectPlugin =
  /*#__PURE__*/
  pluginFactory({
    components: {
      BFormSelect: BFormSelect,
      BSelect: BFormSelect
    }
  });

  var ImagePlugin =
  /*#__PURE__*/
  pluginFactory({
    components: {
      BImg: BImg,
      BImgLazy: BImgLazy
    }
  });

  var props$x = {
    tag: {
      type: String,
      default: 'div'
    }
  }; // @vue/component

  var BInputGroupText =
  /*#__PURE__*/
  Vue.extend({
    name: 'BInputGroupText',
    functional: true,
    props: props$x,
    render: function render(h, _ref) {
      var props = _ref.props,
          data = _ref.data,
          children = _ref.children;
      return h(props.tag, a(data, {
        staticClass: 'input-group-text'
      }), children);
    }
  });

  var commonProps = {
    id: {
      type: String,
      default: null
    },
    tag: {
      type: String,
      default: 'div'
    },
    isText: {
      type: Boolean,
      default: false
    }
  }; // @vue/component

  var BInputGroupAddon =
  /*#__PURE__*/
  Vue.extend({
    name: 'BInputGroupAddon',
    functional: true,
    props: _objectSpread2({}, commonProps, {
      append: {
        type: Boolean,
        default: false
      }
    }),
    render: function render(h, _ref) {
      var props = _ref.props,
          data = _ref.data,
          children = _ref.children;
      return h(props.tag, a(data, {
        class: {
          'input-group-append': props.append,
          'input-group-prepend': !props.append
        },
        attrs: {
          id: props.id
        }
      }), props.isText ? [h(BInputGroupText, children)] : children);
    }
  });

  var BInputGroupPrepend =
  /*#__PURE__*/
  Vue.extend({
    name: 'BInputGroupPrepend',
    functional: true,
    props: commonProps,
    render: function render(h, _ref) {
      var props = _ref.props,
          data = _ref.data,
          children = _ref.children;
      // pass all our props/attrs down to child, and set`append` to false
      return h(BInputGroupAddon, a(data, {
        props: _objectSpread2({}, props, {
          append: false
        })
      }), children);
    }
  });

  var BInputGroupAppend =
  /*#__PURE__*/
  Vue.extend({
    name: 'BInputGroupAppend',
    functional: true,
    props: commonProps,
    render: function render(h, _ref) {
      var props = _ref.props,
          data = _ref.data,
          children = _ref.children;
      // pass all our props/attrs down to child, and set`append` to true
      return h(BInputGroupAddon, a(data, {
        props: _objectSpread2({}, props, {
          append: true
        })
      }), children);
    }
  });

  var NAME$d = 'BInputGroup';
  var props$y = {
    id: {
      type: String
    },
    size: {
      type: String,
      default: function _default() {
        return getComponentConfig(NAME$d, 'size');
      }
    },
    prepend: {
      type: String
    },
    prependHtml: {
      type: String
    },
    append: {
      type: String
    },
    appendHtml: {
      type: String
    },
    tag: {
      type: String,
      default: 'div'
    }
  }; // @vue/component

  var BInputGroup =
  /*#__PURE__*/
  Vue.extend({
    name: NAME$d,
    functional: true,
    props: props$y,
    render: function render(h, _ref) {
      var props = _ref.props,
          data = _ref.data,
          slots = _ref.slots,
          scopedSlots = _ref.scopedSlots;
      var $slots = slots();
      var $scopedSlots = scopedSlots || {};
      var childNodes = []; // Prepend prop/slot

      if (props.prepend || props.prependHtml || hasNormalizedSlot('prepend', $scopedSlots, $slots)) {
        childNodes.push(h(BInputGroupPrepend, [// Prop
        props.prepend || props.prependHtml ? h(BInputGroupText, {
          domProps: htmlOrText(props.prependHtml, props.prepend)
        }) : h(), // Slot
        normalizeSlot('prepend', {}, $scopedSlots, $slots) || h()]));
      } else {
        childNodes.push(h());
      } // Default slot


      if (hasNormalizedSlot('default', $scopedSlots, $slots)) {
        childNodes.push.apply(childNodes, _toConsumableArray(normalizeSlot('default', {}, $scopedSlots, $slots)));
      } else {
        childNodes.push(h());
      } // Append prop


      if (props.append || props.appendHtml || hasNormalizedSlot('append', $scopedSlots, $slots)) {
        childNodes.push(h(BInputGroupAppend, [// prop
        props.append || props.appendHtml ? h(BInputGroupText, {
          domProps: htmlOrText(props.appendHtml, props.append)
        }) : h(), // Slot
        normalizeSlot('append', {}, $scopedSlots, $slots) || h()]));
      } else {
        childNodes.push(h());
      }

      return h(props.tag, a(data, {
        staticClass: 'input-group',
        class: _defineProperty({}, "input-group-".concat(props.size), Boolean(props.size)),
        attrs: {
          id: props.id || null,
          role: 'group'
        }
      }), childNodes);
    }
  });

  var InputGroupPlugin =
  /*#__PURE__*/
  pluginFactory({
    components: {
      BInputGroup: BInputGroup,
      BInputGroupAddon: BInputGroupAddon,
      BInputGroupPrepend: BInputGroupPrepend,
      BInputGroupAppend: BInputGroupAppend,
      BInputGroupText: BInputGroupText
    }
  });

  var props$z = {
    tag: {
      type: String,
      default: 'div'
    },
    fluid: {
      type: Boolean,
      default: false
    }
  }; // @vue/component

  var BContainer =
  /*#__PURE__*/
  Vue.extend({
    name: 'BContainer',
    functional: true,
    props: props$z,
    render: function render(h, _ref) {
      var props = _ref.props,
          data = _ref.data,
          children = _ref.children;
      return h(props.tag, a(data, {
        class: {
          container: !props.fluid,
          'container-fluid': props.fluid
        }
      }), children);
    }
  });

  var NAME$e = 'BJumbotron';
  var props$A = {
    fluid: {
      type: Boolean,
      default: false
    },
    containerFluid: {
      type: Boolean,
      default: false
    },
    header: {
      type: String,
      default: null
    },
    headerHtml: {
      type: String,
      default: null
    },
    headerTag: {
      type: String,
      default: 'h1'
    },
    headerLevel: {
      type: [Number, String],
      default: '3'
    },
    lead: {
      type: String,
      default: null
    },
    leadHtml: {
      type: String,
      default: null
    },
    leadTag: {
      type: String,
      default: 'p'
    },
    tag: {
      type: String,
      default: 'div'
    },
    bgVariant: {
      type: String,
      default: function _default() {
        return getComponentConfig(NAME$e, 'bgVariant');
      }
    },
    borderVariant: {
      type: String,
      default: function _default() {
        return getComponentConfig(NAME$e, 'borderVariant');
      }
    },
    textVariant: {
      type: String,
      default: function _default() {
        return getComponentConfig(NAME$e, 'textVariant');
      }
    }
  }; // @vue/component

  var BJumbotron =
  /*#__PURE__*/
  Vue.extend({
    name: NAME$e,
    functional: true,
    props: props$A,
    render: function render(h, _ref) {
      var _class2;

      var props = _ref.props,
          data = _ref.data,
          slots = _ref.slots,
          scopedSlots = _ref.scopedSlots;
      // The order of the conditionals matter.
      // We are building the component markup in order.
      var childNodes = [];
      var $slots = slots();
      var $scopedSlots = scopedSlots || {}; // Header

      if (props.header || hasNormalizedSlot('header', $scopedSlots, $slots) || props.headerHtml) {
        childNodes.push(h(props.headerTag, {
          class: _defineProperty({}, "display-".concat(props.headerLevel), Boolean(props.headerLevel))
        }, normalizeSlot('header', {}, $scopedSlots, $slots) || props.headerHtml || stripTags(props.header)));
      } // Lead


      if (props.lead || hasNormalizedSlot('lead', $scopedSlots, $slots) || props.leadHtml) {
        childNodes.push(h(props.leadTag, {
          staticClass: 'lead'
        }, normalizeSlot('lead', {}, $scopedSlots, $slots) || props.leadHtml || stripTags(props.lead)));
      } // Default slot


      if (hasNormalizedSlot('default', $scopedSlots, $slots)) {
        childNodes.push(normalizeSlot('default', {}, $scopedSlots, $slots));
      } // If fluid, wrap content in a container/container-fluid


      if (props.fluid) {
        // Children become a child of a container
        childNodes = [h(BContainer, {
          props: {
            fluid: props.containerFluid
          }
        }, childNodes)];
      } // Return the jumbotron


      return h(props.tag, a(data, {
        staticClass: 'jumbotron',
        class: (_class2 = {
          'jumbotron-fluid': props.fluid
        }, _defineProperty(_class2, "text-".concat(props.textVariant), Boolean(props.textVariant)), _defineProperty(_class2, "bg-".concat(props.bgVariant), Boolean(props.bgVariant)), _defineProperty(_class2, "border-".concat(props.borderVariant), Boolean(props.borderVariant)), _defineProperty(_class2, "border", Boolean(props.borderVariant)), _class2)
      }), childNodes);
    }
  });

  var JumbotronPlugin =
  /*#__PURE__*/
  pluginFactory({
    components: {
      BJumbotron: BJumbotron
    }
  });

  var COMMON_ALIGNMENT = ['start', 'end', 'center'];
  var props$B = {
    tag: {
      type: String,
      default: 'div'
    },
    noGutters: {
      type: Boolean,
      default: false
    },
    alignV: {
      type: String,
      default: null,
      validator: function validator(str) {
        return arrayIncludes(COMMON_ALIGNMENT.concat(['baseline', 'stretch']), str);
      }
    },
    alignH: {
      type: String,
      default: null,
      validator: function validator(str) {
        return arrayIncludes(COMMON_ALIGNMENT.concat(['between', 'around']), str);
      }
    },
    alignContent: {
      type: String,
      default: null,
      validator: function validator(str) {
        return arrayIncludes(COMMON_ALIGNMENT.concat(['between', 'around', 'stretch']), str);
      }
    }
  }; // @vue/component

  var BRow =
  /*#__PURE__*/
  Vue.extend({
    name: 'BRow',
    functional: true,
    props: props$B,
    render: function render(h, _ref) {
      var _class;

      var props = _ref.props,
          data = _ref.data,
          children = _ref.children;
      return h(props.tag, a(data, {
        staticClass: 'row',
        class: (_class = {
          'no-gutters': props.noGutters
        }, _defineProperty(_class, "align-items-".concat(props.alignV), props.alignV), _defineProperty(_class, "justify-content-".concat(props.alignH), props.alignH), _defineProperty(_class, "align-content-".concat(props.alignContent), props.alignContent), _class)
      }), children);
    }
  });

  var LayoutPlugin =
  /*#__PURE__*/
  pluginFactory({
    components: {
      BContainer: BContainer,
      BRow: BRow,
      BCol: BCol,
      BFormRow: BFormRow
    }
  });

  var LinkPlugin =
  /*#__PURE__*/
  pluginFactory({
    components: {
      BLink: BLink
    }
  });

  var props$C = {
    tag: {
      type: String,
      default: 'div'
    },
    flush: {
      type: Boolean,
      default: false
    },
    horizontal: {
      type: [Boolean, String],
      default: false
    }
  }; // @vue/component

  var BListGroup =
  /*#__PURE__*/
  Vue.extend({
    name: 'BListGroup',
    functional: true,
    props: props$C,
    render: function render(h, _ref) {
      var props = _ref.props,
          data = _ref.data,
          children = _ref.children;
      var horizontal = props.horizontal === '' ? true : props.horizontal;
      horizontal = props.flush ? false : horizontal;
      var componentData = {
        staticClass: 'list-group',
        class: _defineProperty({
          'list-group-flush': props.flush,
          'list-group-horizontal': horizontal === true
        }, "list-group-horizontal-".concat(horizontal), isString(horizontal))
      };
      return h(props.tag, a(data, componentData), children);
    }
  });

  var NAME$f = 'BListGroupItem';
  var actionTags = ['a', 'router-link', 'button', 'b-link'];
  var linkProps$2 = propsFactory();
  delete linkProps$2.href.default;
  delete linkProps$2.to.default;
  var props$D = _objectSpread2({
    tag: {
      type: String,
      default: 'div'
    },
    action: {
      type: Boolean,
      default: null
    },
    button: {
      type: Boolean,
      default: null
    },
    variant: {
      type: String,
      default: function _default() {
        return getComponentConfig(NAME$f, 'variant');
      }
    }
  }, linkProps$2); // @vue/component

  var BListGroupItem =
  /*#__PURE__*/
  Vue.extend({
    name: NAME$f,
    functional: true,
    props: props$D,
    render: function render(h, _ref) {
      var _class;

      var props = _ref.props,
          data = _ref.data,
          children = _ref.children;
      var tag = props.button ? 'button' : !props.href && !props.to ? props.tag : BLink;
      var isAction = Boolean(props.href || props.to || props.action || props.button || arrayIncludes(actionTags, props.tag));
      var attrs = {};
      var itemProps = {};

      if (tag === 'button') {
        if (!data.attrs || !data.attrs.type) {
          // Add a type for button is one not provided in passed attributes
          attrs.type = 'button';
        }

        if (props.disabled) {
          // Set disabled attribute if button and disabled
          attrs.disabled = true;
        }
      } else {
        itemProps = pluckProps(linkProps$2, props);
      }

      var componentData = {
        attrs: attrs,
        props: itemProps,
        staticClass: 'list-group-item',
        class: (_class = {}, _defineProperty(_class, "list-group-item-".concat(props.variant), Boolean(props.variant)), _defineProperty(_class, 'list-group-item-action', isAction), _defineProperty(_class, "active", props.active), _defineProperty(_class, "disabled", props.disabled), _class)
      };
      return h(tag, a(data, componentData), children);
    }
  });

  var ListGroupPlugin =
  /*#__PURE__*/
  pluginFactory({
    components: {
      BListGroup: BListGroup,
      BListGroupItem: BListGroupItem
    }
  });

  var props$E = {
    tag: {
      type: String,
      default: 'div'
    }
  }; // @vue/component

  var BMediaBody =
  /*#__PURE__*/
  Vue.extend({
    name: 'BMediaBody',
    functional: true,
    props: props$E,
    render: function render(h, _ref) {
      var props = _ref.props,
          data = _ref.data,
          children = _ref.children;
      return h(props.tag, a(data, {
        staticClass: 'media-body'
      }), children);
    }
  });

  var props$F = {
    tag: {
      type: String,
      default: 'div'
    },
    verticalAlign: {
      type: String,
      default: 'top'
    }
  }; // @vue/component

  var BMediaAside =
  /*#__PURE__*/
  Vue.extend({
    name: 'BMediaAside',
    functional: true,
    props: props$F,
    render: function render(h, _ref) {
      var props = _ref.props,
          data = _ref.data,
          children = _ref.children;
      var align = props.verticalAlign === 'top' ? 'start' : props.verticalAlign === 'bottom' ? 'end' : props.verticalAlign;
      return h(props.tag, a(data, {
        staticClass: 'd-flex',
        class: _defineProperty({}, "align-self-".concat(align), align)
      }), children);
    }
  });

  var props$G = {
    tag: {
      type: String,
      default: 'div'
    },
    rightAlign: {
      type: Boolean,
      default: false
    },
    verticalAlign: {
      type: String,
      default: 'top'
    },
    noBody: {
      type: Boolean,
      default: false
    }
  }; // @vue/component

  var BMedia =
  /*#__PURE__*/
  Vue.extend({
    name: 'BMedia',
    functional: true,
    props: props$G,
    render: function render(h, _ref) {
      var props = _ref.props,
          data = _ref.data,
          slots = _ref.slots,
          scopedSlots = _ref.scopedSlots,
          children = _ref.children;
      var childNodes = props.noBody ? children : [];

      if (!props.noBody) {
        var $slots = slots();
        var $scopedSlots = scopedSlots || {};
        var $aside = normalizeSlot('aside', {}, $scopedSlots, $slots);
        var $default = normalizeSlot('default', {}, $scopedSlots, $slots);

        if ($aside && !props.rightAlign) {
          childNodes.push(h(BMediaAside, {
            staticClass: 'mr-3',
            props: {
              verticalAlign: props.verticalAlign
            }
          }, $aside));
        }

        childNodes.push(h(BMediaBody, {}, $default));

        if ($aside && props.rightAlign) {
          childNodes.push(h(BMediaAside, {
            staticClass: 'ml-3',
            props: {
              verticalAlign: props.verticalAlign
            }
          }, $aside));
        }
      }

      return h(props.tag, a(data, {
        staticClass: 'media'
      }), childNodes);
    }
  });

  var MediaPlugin =
  /*#__PURE__*/
  pluginFactory({
    components: {
      BMedia: BMedia,
      BMediaAside: BMediaAside,
      BMediaBody: BMediaBody
    }
  });

  //
  // Single root node portaling of content, which retains parent/child hierarchy
  // Unlike Portal-Vue where portaled content is no longer a descendent of it's
  // intended parent components
  //
  // Private components for use by Tooltips, Popovers and Modals
  //
  // Based on vue-simple-portal
  // https://github.com/LinusBorg/vue-simple-portal
  // Transporter target used by BTransporterSingle
  // Supports only a single root element
  // @vue/component

  var BTransporterTargetSingle =
  /*#__PURE__*/
  Vue.extend({
    // As an abstract component, it doesn't appear in the $parent chain of
    // components, which means the next parent of any component rendered inside
    // of this one will be the parent from which is was portal'd
    abstract: true,
    name: 'BTransporterTargetSingle',
    props: {
      nodes: {
        // Even though we only support a single root element,
        // VNodes are always passed as an array
        type: [Array, Function] // default: undefined

      }
    },
    data: function data(vm) {
      return {
        updatedNodes: vm.nodes
      };
    },
    destroyed: function destroyed() {
      var el = this.$el;
      el && el.parentNode && el.parentNode.removeChild(el);
    },
    render: function render(h) {
      var nodes = isFunction(this.updatedNodes) ? this.updatedNodes({}) : this.updatedNodes;
      nodes = concat(nodes).filter(Boolean);
      /* istanbul ignore else */

      if (nodes && nodes.length > 0 && !nodes[0].text) {
        return nodes[0];
      } else {
        /* istanbul ignore next */
        return h();
      }
    }
  }); // This component has no root element, so only a single VNode is allowed
  // @vue/component

  var BTransporterSingle =
  /*#__PURE__*/
  Vue.extend({
    name: 'BTransporterSingle',
    mixins: [normalizeSlotMixin],
    props: {
      disabled: {
        type: Boolean,
        default: false
      },
      container: {
        // String: CSS selector,
        // HTMLElement: Element reference
        // Mainly needed for tooltips/popovers inside modals
        type: [String, HTMLElement],
        default: 'body'
      },
      tag: {
        // This should be set to match the root element type
        type: String,
        default: 'div'
      }
    },
    watch: {
      disabled: {
        immediate: true,
        handler: function handler(disabled) {
          disabled ? this.unmountTarget() : this.$nextTick(this.mountTarget);
        }
      }
    },
    created: function created() {
      this._bv_defaultFn = null;
      this._bv_target = null;
    },
    beforeMount: function beforeMount() {
      this.mountTarget();
    },
    updated: function updated() {
      var _this = this;

      // Placed in a nextTick to ensure that children have completed
      // updating before rendering in the target
      this.$nextTick(function () {
        _this.updateTarget();
      });
    },
    beforeDestroy: function beforeDestroy() {
      this.unmountTarget();
      this._bv_defaultFn = null;
    },
    methods: {
      // Get the element which the target should be appended to
      getContainer: function getContainer() {
        /* istanbul ignore else */
        if (isBrowser) {
          var container = this.container;
          return isString(container) ? select(container) : container;
        } else {
          return null;
        }
      },
      // Mount the target
      mountTarget: function mountTarget() {
        if (!this._bv_target) {
          var container = this.getContainer();

          if (container) {
            var el = document.createElement('div');
            container.appendChild(el);
            this._bv_target = new BTransporterTargetSingle({
              el: el,
              parent: this,
              propsData: {
                // Initial nodes to be rendered
                nodes: concat(this.normalizeSlot('default'))
              }
            });
          }
        }
      },
      // Update the content of the target
      updateTarget: function updateTarget() {
        if (isBrowser && this._bv_target) {
          var defaultFn = this.$scopedSlots.default;

          if (!this.disabled) {
            /* istanbul ignore else: only applicable in Vue 2.5.x */
            if (defaultFn && this._bv_defaultFn !== defaultFn) {
              // We only update the target component if the scoped slot
              // function is a fresh one. The new slot syntax (since Vue 2.6)
              // can cache unchanged slot functions and we want to respect that here
              this._bv_target.updatedNodes = defaultFn;
            } else if (!defaultFn) {
              // We also need to be back compatible with non-scoped default slot (i.e. 2.5.x)
              this._bv_target.updatedNodes = this.$slots.default;
            }
          } // Update the scoped slot function cache


          this._bv_defaultFn = defaultFn;
        }
      },
      // Unmount the target
      unmountTarget: function unmountTarget() {
        if (this._bv_target) {
          this._bv_target.$destroy();

          this._bv_target = null;
        }
      }
    },
    render: function render(h) {
      if (this.disabled) {
        var nodes = concat(this.normalizeSlot('default')).filter(Boolean);

        if (nodes.length > 0 && !nodes[0].text) {
          return nodes[0];
        }
      }

      return h();
    }
  });

  // This method returns a component's scoped style attribute name: `data-v-xxxxxxx`
  // The `_scopeId` options property is added by vue-loader when using scoped styles
  // and will be `undefined` if no scoped styles are in use
  var getScopeId = function getScopeId(vm) {
    var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    return vm ? vm.$options._scopeId || defaultValue : defaultValue;
  };

  var scopedStyleAttrsMixin = {
    computed: {
      scopedStyleAttrs: function scopedStyleAttrs() {
        var scopeId = getScopeId(this.$parent);
        return scopeId ? _defineProperty({}, scopeId, '') : {};
      }
    }
  };

  /**
   * Private ModalManager helper
   * Handles controlling modal stacking zIndexes and body adjustments/classes
   */
  // Default modal backdrop z-index

  var DEFAULT_ZINDEX = 1040; // Selectors for padding/margin adjustments

  var Selector$1 = {
    FIXED_CONTENT: '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top',
    STICKY_CONTENT: '.sticky-top',
    NAVBAR_TOGGLER: '.navbar-toggler'
  }; // @vue/component

  var ModalManager =
  /*#__PURE__*/
  Vue.extend({
    data: function data() {
      return {
        modals: [],
        baseZIndex: null,
        scrollbarWidth: null,
        isBodyOverflowing: false
      };
    },
    computed: {
      modalCount: function modalCount() {
        return this.modals.length;
      },
      modalsAreOpen: function modalsAreOpen() {
        return this.modalCount > 0;
      }
    },
    watch: {
      modalCount: function modalCount(newCount, oldCount) {
        if (isBrowser) {
          this.getScrollbarWidth();

          if (newCount > 0 && oldCount === 0) {
            // Transitioning to modal(s) open
            this.checkScrollbar();
            this.setScrollbar();
            addClass(document.body, 'modal-open');
          } else if (newCount === 0 && oldCount > 0) {
            // Transitioning to modal(s) closed
            this.resetScrollbar();
            removeClass(document.body, 'modal-open');
          }

          setAttr(document.body, 'data-modal-open-count', String(newCount));
        }
      },
      modals: function modals(newVal, oldVal) {
        var _this = this;

        this.checkScrollbar();
        requestAF(function () {
          _this.updateModals(newVal || []);
        });
      }
    },
    methods: {
      // Public methods
      registerModal: function registerModal(modal) {
        var _this2 = this;

        // Register the modal if not already registered
        if (modal && this.modals.indexOf(modal) === -1) {
          // Add modal to modals array
          this.modals.push(modal);
          modal.$once('hook:beforeDestroy', function () {
            _this2.unregisterModal(modal);
          });
        }
      },
      unregisterModal: function unregisterModal(modal) {
        var index = this.modals.indexOf(modal);

        if (index > -1) {
          // Remove modal from modals array
          this.modals.splice(index, 1); // Reset the modal's data

          if (!(modal._isBeingDestroyed || modal._isDestroyed)) {
            this.resetModal(modal);
          }
        }
      },
      getBaseZIndex: function getBaseZIndex() {
        if (isNull(this.baseZIndex) && isBrowser) {
          // Create a temporary `div.modal-backdrop` to get computed z-index
          var div = document.createElement('div');
          div.className = 'modal-backdrop d-none';
          div.style.display = 'none';
          document.body.appendChild(div);
          this.baseZIndex = parseInt(getCS(div).zIndex || DEFAULT_ZINDEX, 10);
          document.body.removeChild(div);
        }

        return this.baseZIndex || DEFAULT_ZINDEX;
      },
      getScrollbarWidth: function getScrollbarWidth() {
        if (isNull(this.scrollbarWidth) && isBrowser) {
          // Create a temporary `div.measure-scrollbar` to get computed z-index
          var div = document.createElement('div');
          div.className = 'modal-scrollbar-measure';
          document.body.appendChild(div);
          this.scrollbarWidth = getBCR(div).width - div.clientWidth;
          document.body.removeChild(div);
        }

        return this.scrollbarWidth || 0;
      },
      // Private methods
      updateModals: function updateModals(modals) {
        var _this3 = this;

        var baseZIndex = this.getBaseZIndex();
        var scrollbarWidth = this.getScrollbarWidth();
        modals.forEach(function (modal, index) {
          // We update data values on each modal
          modal.zIndex = baseZIndex + index;
          modal.scrollbarWidth = scrollbarWidth;
          modal.isTop = index === _this3.modals.length - 1;
          modal.isBodyOverflowing = _this3.isBodyOverflowing;
        });
      },
      resetModal: function resetModal(modal) {
        if (modal) {
          modal.zIndex = this.getBaseZIndex();
          modal.isTop = true;
          modal.isBodyOverflowing = false;
        }
      },
      checkScrollbar: function checkScrollbar() {
        // Determine if the body element is overflowing
        var _getBCR = getBCR(document.body),
            left = _getBCR.left,
            right = _getBCR.right;

        this.isBodyOverflowing = left + right < window.innerWidth;
      },
      setScrollbar: function setScrollbar() {
        var body = document.body; // Storage place to cache changes to margins and padding
        // Note: This assumes the following element types are not added to the
        // document after the modal has opened.

        body._paddingChangedForModal = body._paddingChangedForModal || [];
        body._marginChangedForModal = body._marginChangedForModal || [];

        if (this.isBodyOverflowing) {
          var scrollbarWidth = this.scrollbarWidth; // Adjust fixed content padding

          /* istanbul ignore next: difficult to test in JSDOM */

          selectAll(Selector$1.FIXED_CONTENT).forEach(function (el) {
            var actualPadding = el.style.paddingRight;
            var calculatedPadding = getCS(el).paddingRight || 0;
            setAttr(el, 'data-padding-right', actualPadding);
            el.style.paddingRight = "".concat(parseFloat(calculatedPadding) + scrollbarWidth, "px");

            body._paddingChangedForModal.push(el);
          }); // Adjust sticky content margin

          /* istanbul ignore next: difficult to test in JSDOM */

          selectAll(Selector$1.STICKY_CONTENT).forEach(function (el)
          /* istanbul ignore next */
          {
            var actualMargin = el.style.marginRight;
            var calculatedMargin = getCS(el).marginRight || 0;
            setAttr(el, 'data-margin-right', actualMargin);
            el.style.marginRight = "".concat(parseFloat(calculatedMargin) - scrollbarWidth, "px");

            body._marginChangedForModal.push(el);
          }); // Adjust <b-navbar-toggler> margin

          /* istanbul ignore next: difficult to test in JSDOM */

          selectAll(Selector$1.NAVBAR_TOGGLER).forEach(function (el)
          /* istanbul ignore next */
          {
            var actualMargin = el.style.marginRight;
            var calculatedMargin = getCS(el).marginRight || 0;
            setAttr(el, 'data-margin-right', actualMargin);
            el.style.marginRight = "".concat(parseFloat(calculatedMargin) + scrollbarWidth, "px");

            body._marginChangedForModal.push(el);
          }); // Adjust body padding

          var actualPadding = body.style.paddingRight;
          var calculatedPadding = getCS(body).paddingRight;
          setAttr(body, 'data-padding-right', actualPadding);
          body.style.paddingRight = "".concat(parseFloat(calculatedPadding) + scrollbarWidth, "px");
        }
      },
      resetScrollbar: function resetScrollbar() {
        var body = document.body;

        if (body._paddingChangedForModal) {
          // Restore fixed content padding
          body._paddingChangedForModal.forEach(function (el) {
            /* istanbul ignore next: difficult to test in JSDOM */
            if (hasAttr(el, 'data-padding-right')) {
              el.style.paddingRight = getAttr(el, 'data-padding-right') || '';
              removeAttr(el, 'data-padding-right');
            }
          });
        }

        if (body._marginChangedForModal) {
          // Restore sticky content and navbar-toggler margin
          body._marginChangedForModal.forEach(function (el) {
            /* istanbul ignore next: difficult to test in JSDOM */
            if (hasAttr(el, 'data-margin-right')) {
              el.style.marginRight = getAttr(el, 'data-margin-right') || '';
              removeAttr(el, 'data-margin-right');
            }
          });
        }

        body._paddingChangedForModal = null;
        body._marginChangedForModal = null; // Restore body padding

        if (hasAttr(body, 'data-padding-right')) {
          body.style.paddingRight = getAttr(body, 'data-padding-right') || '';
          removeAttr(body, 'data-padding-right');
        }
      }
    }
  }); // Create and export our modal manager instance

  var modalManager = new ModalManager();

  var BvModalEvent =
  /*#__PURE__*/
  function (_BvEvent) {
    _inherits(BvModalEvent, _BvEvent);

    function BvModalEvent(type) {
      var _this;

      var eventInit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      _classCallCheck(this, BvModalEvent);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(BvModalEvent).call(this, type, eventInit)); // Freeze our new props as readonly, but leave them enumerable

      defineProperties(_assertThisInitialized(_this), {
        trigger: readonlyDescriptor()
      });
      return _this;
    }

    _createClass(BvModalEvent, null, [{
      key: "Defaults",
      get: function get() {
        return _objectSpread2({}, _get(_getPrototypeOf(BvModalEvent), "Defaults", this), {
          trigger: null
        });
      }
    }]);

    return BvModalEvent;
  }(BvEvent); // Named exports

  var NAME$g = 'BModal'; // ObserveDom config to detect changes in modal content
  // so that we can adjust the modal padding if needed

  var OBSERVER_CONFIG = {
    subtree: true,
    childList: true,
    characterData: true,
    attributes: true,
    attributeFilter: ['style', 'class']
  }; // Options for DOM event listeners

  var EVT_OPTIONS = {
    passive: true,
    capture: false
  }; // Query selector to find all tabbable elements
  // (includes tabindex="-1", which we filter out after)

  var TABABLE_SELECTOR = ['button', '[href]:not(.disabled)', 'input', 'select', 'textarea', '[tabindex]', '[contenteditable]'].map(function (s) {
    return "".concat(s, ":not(:disabled):not([disabled])");
  }).join(', '); // --- Utility methods ---
  // Attempt to focus an element, and return true if successful

  var attemptFocus = function attemptFocus(el) {
    if (el && isVisible(el) && el.focus) {
      try {
        el.focus();
      } catch (_unused) {}
    } // If the element has focus, then return true


    return document.activeElement === el;
  }; // --- Props ---


  var props$H = {
    size: {
      type: String,
      default: function _default() {
        return getComponentConfig(NAME$g, 'size');
      }
    },
    centered: {
      type: Boolean,
      default: false
    },
    scrollable: {
      type: Boolean,
      default: false
    },
    buttonSize: {
      type: String,
      default: ''
    },
    noStacking: {
      type: Boolean,
      default: false
    },
    noFade: {
      type: Boolean,
      default: false
    },
    noCloseOnBackdrop: {
      type: Boolean,
      default: false
    },
    noCloseOnEsc: {
      type: Boolean,
      default: false
    },
    noEnforceFocus: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    titleHtml: {
      type: String
    },
    titleTag: {
      type: String,
      default: function _default() {
        return getComponentConfig(NAME$g, 'titleTag');
      }
    },
    titleClass: {
      type: [String, Array, Object],
      default: null
    },
    titleSrOnly: {
      type: Boolean,
      default: false
    },
    ariaLabel: {
      type: String,
      default: null
    },
    headerBgVariant: {
      type: String,
      default: function _default() {
        return getComponentConfig(NAME$g, 'headerBgVariant');
      }
    },
    headerBorderVariant: {
      type: String,
      default: function _default() {
        return getComponentConfig(NAME$g, 'headerBorderVariant');
      }
    },
    headerTextVariant: {
      type: String,
      default: function _default() {
        return getComponentConfig(NAME$g, 'headerTextVariant');
      }
    },
    headerCloseVariant: {
      type: String,
      default: function _default() {
        return getComponentConfig(NAME$g, 'headerCloseVariant');
      }
    },
    headerClass: {
      type: [String, Array, Object],
      default: null
    },
    bodyBgVariant: {
      type: String,
      default: function _default() {
        return getComponentConfig(NAME$g, 'bodyBgVariant');
      }
    },
    bodyTextVariant: {
      type: String,
      default: function _default() {
        return getComponentConfig(NAME$g, 'bodyTextVariant');
      }
    },
    modalClass: {
      type: [String, Array, Object],
      default: null
    },
    dialogClass: {
      type: [String, Array, Object],
      default: null
    },
    contentClass: {
      type: [String, Array, Object],
      default: null
    },
    bodyClass: {
      type: [String, Array, Object],
      default: null
    },
    footerBgVariant: {
      type: String,
      default: function _default() {
        return getComponentConfig(NAME$g, 'footerBgVariant');
      }
    },
    footerBorderVariant: {
      type: String,
      default: function _default() {
        return getComponentConfig(NAME$g, 'footerBorderVariant');
      }
    },
    footerTextVariant: {
      type: String,
      default: function _default() {
        return getComponentConfig(NAME$g, 'footerTextVariant');
      }
    },
    footerClass: {
      type: [String, Array, Object],
      default: null
    },
    hideHeader: {
      type: Boolean,
      default: false
    },
    hideFooter: {
      type: Boolean,
      default: false
    },
    hideHeaderClose: {
      type: Boolean,
      default: false
    },
    hideBackdrop: {
      type: Boolean,
      default: false
    },
    okOnly: {
      type: Boolean,
      default: false
    },
    okDisabled: {
      type: Boolean,
      default: false
    },
    cancelDisabled: {
      type: Boolean,
      default: false
    },
    visible: {
      type: Boolean,
      default: false
    },
    returnFocus: {
      // HTML Element, CSS selector string or Vue component instance
      type: [HTMLElement, String, Object],
      default: null
    },
    headerCloseLabel: {
      type: String,
      default: function _default() {
        return getComponentConfig(NAME$g, 'headerCloseLabel');
      }
    },
    cancelTitle: {
      type: String,
      default: function _default() {
        return getComponentConfig(NAME$g, 'cancelTitle');
      }
    },
    cancelTitleHtml: {
      type: String
    },
    okTitle: {
      type: String,
      default: function _default() {
        return getComponentConfig(NAME$g, 'okTitle');
      }
    },
    okTitleHtml: {
      type: String
    },
    cancelVariant: {
      type: String,
      default: function _default() {
        return getComponentConfig(NAME$g, 'cancelVariant');
      }
    },
    okVariant: {
      type: String,
      default: function _default() {
        return getComponentConfig(NAME$g, 'okVariant');
      }
    },
    lazy: {
      type: Boolean,
      default: false
    },
    busy: {
      type: Boolean,
      default: false
    },
    static: {
      type: Boolean,
      default: false
    },
    autoFocusButton: {
      type: String,
      default: null,
      validator: function validator(val) {
        /* istanbul ignore next */
        return isUndefinedOrNull(val) || arrayIncludes(['ok', 'cancel', 'close'], val);
      }
    }
  }; // @vue/component

  var BModal =
  /*#__PURE__*/
  Vue.extend({
    name: NAME$g,
    mixins: [idMixin, listenOnRootMixin, normalizeSlotMixin, scopedStyleAttrsMixin],
    inheritAttrs: false,
    model: {
      prop: 'visible',
      event: 'change'
    },
    props: props$H,
    data: function data() {
      return {
        isHidden: true,
        // If modal should not be in document
        isVisible: false,
        // Controls modal visible state
        isTransitioning: false,
        // Used for style control
        isShow: false,
        // Used for style control
        isBlock: false,
        // Used for style control
        isOpening: false,
        // To signal that the modal is in the process of opening
        isClosing: false,
        // To signal that the modal is in the process of closing
        ignoreBackdropClick: false,
        // Used to signify if click out listener should ignore the click
        isModalOverflowing: false,
        return_focus: this.returnFocus || null,
        // The following items are controlled by the modalManager instance
        scrollbarWidth: 0,
        zIndex: modalManager.getBaseZIndex(),
        isTop: true,
        isBodyOverflowing: false
      };
    },
    computed: {
      modalClasses: function modalClasses() {
        return [{
          fade: !this.noFade,
          show: this.isShow
        }, this.modalClass];
      },
      modalStyles: function modalStyles() {
        var sbWidth = "".concat(this.scrollbarWidth, "px");
        return {
          paddingLeft: !this.isBodyOverflowing && this.isModalOverflowing ? sbWidth : '',
          paddingRight: this.isBodyOverflowing && !this.isModalOverflowing ? sbWidth : '',
          // Needed to fix issue https://github.com/bootstrap-vue/bootstrap-vue/issues/3457
          // Even though we are using v-show, we must ensure 'none' is restored in the styles
          display: this.isBlock ? 'block' : 'none'
        };
      },
      dialogClasses: function dialogClasses() {
        var _ref;

        return [(_ref = {}, _defineProperty(_ref, "modal-".concat(this.size), Boolean(this.size)), _defineProperty(_ref, 'modal-dialog-centered', this.centered), _defineProperty(_ref, 'modal-dialog-scrollable', this.scrollable), _ref), this.dialogClass];
      },
      headerClasses: function headerClasses() {
        var _ref2;

        return [(_ref2 = {}, _defineProperty(_ref2, "bg-".concat(this.headerBgVariant), Boolean(this.headerBgVariant)), _defineProperty(_ref2, "text-".concat(this.headerTextVariant), Boolean(this.headerTextVariant)), _defineProperty(_ref2, "border-".concat(this.headerBorderVariant), Boolean(this.headerBorderVariant)), _ref2), this.headerClass];
      },
      titleClasses: function titleClasses() {
        return [{
          'sr-only': this.titleSrOnly
        }, this.titleClass];
      },
      bodyClasses: function bodyClasses() {
        var _ref3;

        return [(_ref3 = {}, _defineProperty(_ref3, "bg-".concat(this.bodyBgVariant), Boolean(this.bodyBgVariant)), _defineProperty(_ref3, "text-".concat(this.bodyTextVariant), Boolean(this.bodyTextVariant)), _ref3), this.bodyClass];
      },
      footerClasses: function footerClasses() {
        var _ref4;

        return [(_ref4 = {}, _defineProperty(_ref4, "bg-".concat(this.footerBgVariant), Boolean(this.footerBgVariant)), _defineProperty(_ref4, "text-".concat(this.footerTextVariant), Boolean(this.footerTextVariant)), _defineProperty(_ref4, "border-".concat(this.footerBorderVariant), Boolean(this.footerBorderVariant)), _ref4), this.footerClass];
      },
      modalOuterStyle: function modalOuterStyle() {
        // Styles needed for proper stacking of modals
        return {
          position: 'absolute',
          zIndex: this.zIndex
        };
      },
      slotScope: function slotScope() {
        return {
          ok: this.onOk,
          cancel: this.onCancel,
          close: this.onClose,
          hide: this.hide,
          visible: this.isVisible
        };
      }
    },
    watch: {
      visible: function visible(newVal, oldVal) {
        if (newVal !== oldVal) {
          this[newVal ? 'show' : 'hide']();
        }
      }
    },
    created: function created() {
      // Define non-reactive properties
      this._observer = null;
    },
    mounted: function mounted() {
      // Set initial z-index as queried from the DOM
      this.zIndex = modalManager.getBaseZIndex(); // Listen for events from others to either open or close ourselves
      // and listen to all modals to enable/disable enforce focus

      this.listenOnRoot('bv::show::modal', this.showHandler);
      this.listenOnRoot('bv::hide::modal', this.hideHandler);
      this.listenOnRoot('bv::toggle::modal', this.toggleHandler); // Listen for `bv:modal::show events`, and close ourselves if the
      // opening modal not us

      this.listenOnRoot('bv::modal::show', this.modalListener); // Initially show modal?

      if (this.visible === true) {
        this.$nextTick(this.show);
      }
    },
    beforeDestroy: function beforeDestroy() {
      // Ensure everything is back to normal
      if (this._observer) {
        this._observer.disconnect();

        this._observer = null;
      }

      this.setEnforceFocus(false);
      this.setResizeEvent(false);

      if (this.isVisible) {
        this.isVisible = false;
        this.isShow = false;
        this.isTransitioning = false;
      }
    },
    methods: {
      // Private method to update the v-model
      updateModel: function updateModel(val) {
        if (val !== this.visible) {
          this.$emit('change', val);
        }
      },
      // Private method to create a BvModalEvent object
      buildEvent: function buildEvent(type) {
        var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        return new BvModalEvent(type, _objectSpread2({
          // Default options
          cancelable: false,
          target: this.$refs.modal || this.$el || null,
          relatedTarget: null,
          trigger: null
        }, opts, {
          // Options that can't be overridden
          vueTarget: this,
          componentId: this.safeId()
        }));
      },
      // Public method to show modal
      show: function show() {
        if (this.isVisible || this.isOpening) {
          // If already open, or in the process of opening, do nothing

          /* istanbul ignore next */
          return;
        }
        /* istanbul ignore next */


        if (this.isClosing) {
          // If we are in the process of closing, wait until hidden before re-opening

          /* istanbul ignore next */
          this.$once('hidden', this.show);
          /* istanbul ignore next */

          return;
        }

        this.isOpening = true; // Set the element to return focus to when closed

        this.return_focus = this.return_focus || this.getActiveElement();
        var showEvt = this.buildEvent('show', {
          cancelable: true
        });
        this.emitEvent(showEvt); // Don't show if canceled

        if (showEvt.defaultPrevented || this.isVisible) {
          this.isOpening = false; // Ensure the v-model reflects the current state

          this.updateModel(false);
          return;
        } // Show the modal


        this.doShow();
      },
      // Public method to hide modal
      hide: function hide() {
        var trigger = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

        if (!this.isVisible || this.isClosing) {
          /* istanbul ignore next */
          return;
        }

        this.isClosing = true;
        var hideEvt = this.buildEvent('hide', {
          cancelable: trigger !== 'FORCE',
          trigger: trigger || null
        }); // We emit specific event for one of the three built-in buttons

        if (trigger === 'ok') {
          this.$emit('ok', hideEvt);
        } else if (trigger === 'cancel') {
          this.$emit('cancel', hideEvt);
        } else if (trigger === 'headerclose') {
          this.$emit('close', hideEvt);
        }

        this.emitEvent(hideEvt); // Hide if not canceled

        if (hideEvt.defaultPrevented || !this.isVisible) {
          this.isClosing = false; // Ensure v-model reflects current state

          this.updateModel(true);
          return;
        } // Stop observing for content changes


        if (this._observer) {
          this._observer.disconnect();

          this._observer = null;
        } // Trigger the hide transition


        this.isVisible = false; // Update the v-model

        this.updateModel(false);
      },
      // Public method to toggle modal visibility
      toggle: function toggle(triggerEl) {
        if (triggerEl) {
          this.return_focus = triggerEl;
        }

        if (this.isVisible) {
          this.hide('toggle');
        } else {
          this.show();
        }
      },
      // Private method to get the current document active element
      getActiveElement: function getActiveElement() {
        if (isBrowser) {
          var activeElement = document.activeElement; // Note: On IE11, `document.activeElement` may be null.
          // So we test it for truthiness first.
          // https://github.com/bootstrap-vue/bootstrap-vue/issues/3206
          // Returning focus to document.body may cause unwanted scrolls, so we
          // exclude setting focus on body

          if (activeElement && activeElement !== document.body && activeElement.focus) {
            // Preset the fallback return focus value if it is not set
            // `document.activeElement` should be the trigger element that was clicked or
            // in the case of using the v-model, which ever element has current focus
            // Will be overridden by some commands such as toggle, etc.
            return activeElement;
          }
        }

        return null;
      },
      // Private method to get a list of all tabable elements within modal content
      getTabables: function getTabables() {
        // Find all tabable elements in the modal content
        // Assumes users have not used tabindex > 0 on elements!
        return selectAll(TABABLE_SELECTOR, this.$refs.content).filter(isVisible).filter(function (i) {
          return i.tabIndex > -1 && !i.disabled;
        });
      },
      // Private method to finish showing modal
      doShow: function doShow() {
        var _this = this;

        /* istanbul ignore next: commenting out for now until we can test stacking */
        if (modalManager.modalsAreOpen && this.noStacking) {
          // If another modal(s) is already open, wait for it(them) to close
          this.listenOnRootOnce('bv::modal::hidden', this.doShow);
          return;
        }

        modalManager.registerModal(this); // Place modal in DOM

        this.isHidden = false;
        this.$nextTick(function () {
          // We do this in `$nextTick()` to ensure the modal is in DOM first
          // before we show it
          _this.isVisible = true;
          _this.isOpening = false; // Update the v-model

          _this.updateModel(true);

          _this.$nextTick(function () {
            // In a nextTick in case modal content is lazy
            // Observe changes in modal content and adjust if necessary
            _this._observer = observeDom(_this.$refs.content, _this.checkModalOverflow.bind(_this), OBSERVER_CONFIG);
          });
        });
      },
      // Transition handlers
      onBeforeEnter: function onBeforeEnter() {
        this.isTransitioning = true;
        this.setResizeEvent(true);
      },
      onEnter: function onEnter() {
        this.isBlock = true;
      },
      onAfterEnter: function onAfterEnter() {
        var _this2 = this;

        this.checkModalOverflow();
        this.isShow = true;
        this.isTransitioning = false; // We use `requestAF()` to allow transition hooks to complete
        // before passing control over to the other handlers
        // This will allow users to not have to use `$nextTick()` or `requestAF()`
        // when trying to pre-focus an element

        requestAF(function () {
          _this2.emitEvent(_this2.buildEvent('shown'));

          _this2.setEnforceFocus(true);

          _this2.$nextTick(function () {
            // Delayed in a `$nextTick()` to allow users time to pre-focus
            // an element if the wish
            _this2.focusFirst();
          });
        });
      },
      onBeforeLeave: function onBeforeLeave() {
        this.isTransitioning = true;
        this.setResizeEvent(false);
        this.setEnforceFocus(false);
      },
      onLeave: function onLeave() {
        // Remove the 'show' class
        this.isShow = false;
      },
      onAfterLeave: function onAfterLeave() {
        var _this3 = this;

        this.isBlock = false;
        this.isTransitioning = false;
        this.isModalOverflowing = false;
        this.isHidden = true;
        this.$nextTick(function () {
          _this3.isClosing = false;
          modalManager.unregisterModal(_this3);

          _this3.returnFocusTo(); // TODO: Need to find a way to pass the `trigger` property
          //       to the `hidden` event, not just only the `hide` event


          _this3.emitEvent(_this3.buildEvent('hidden'));
        });
      },
      // Event emitter
      emitEvent: function emitEvent(bvModalEvt) {
        var type = bvModalEvt.type; // We emit on root first incase a global listener wants to cancel
        // the event first before the instance emits it's event

        this.emitOnRoot("bv::modal::".concat(type), bvModalEvt, bvModalEvt.componentId);
        this.$emit(type, bvModalEvt);
      },
      // UI event handlers
      onDialogMousedown: function onDialogMousedown() {
        var _this4 = this;

        // Watch to see if the matching mouseup event occurs outside the dialog
        // And if it does, cancel the clickOut handler
        var modal = this.$refs.modal;

        var onceModalMouseup = function onceModalMouseup(evt) {
          eventOff(modal, 'mouseup', onceModalMouseup, EVT_OPTIONS);

          if (evt.target === modal) {
            _this4.ignoreBackdropClick = true;
          }
        };

        eventOn(modal, 'mouseup', onceModalMouseup, EVT_OPTIONS);
      },
      onClickOut: function onClickOut(evt) {
        if (this.ignoreBackdropClick) {
          // Click was initiated inside the modal content, but finished outside.
          // Set by the above onDialogMousedown handler
          this.ignoreBackdropClick = false;
          return;
        } // Do nothing if not visible, backdrop click disabled, or element
        // that generated click event is no longer in document body


        if (!this.isVisible || this.noCloseOnBackdrop || !contains(document.body, evt.target)) {
          return;
        } // If backdrop clicked, hide modal


        if (!contains(this.$refs.content, evt.target)) {
          this.hide('backdrop');
        }
      },
      onOk: function onOk() {
        this.hide('ok');
      },
      onCancel: function onCancel() {
        this.hide('cancel');
      },
      onClose: function onClose() {
        this.hide('headerclose');
      },
      onEsc: function onEsc(evt) {
        // If ESC pressed, hide modal
        if (evt.keyCode === KEY_CODES.ESC && this.isVisible && !this.noCloseOnEsc) {
          this.hide('esc');
        }
      },
      // Document focusin listener
      focusHandler: function focusHandler(evt) {
        // If focus leaves modal content, bring it back
        var content = this.$refs.content;
        var target = evt.target;

        if (!this.noEnforceFocus && this.isTop && this.isVisible && content && document !== target && !contains(content, target)) {
          var tabables = this.getTabables();

          if (this.$refs.bottomTrap && target === this.$refs.bottomTrap) {
            // If user pressed TAB out of modal into our bottom trab trap element
            // Find the first tabable element in the modal content and focus it
            if (attemptFocus(tabables[0])) {
              // Focus was successful
              return;
            }
          } else if (this.$refs.topTrap && target === this.$refs.topTrap) {
            // If user pressed CTRL-TAB out of modal and into our top tab trap element
            // Find the last tabable element in the modal content and focus it
            if (attemptFocus(tabables[tabables.length - 1])) {
              // Focus was successful
              return;
            }
          } // Otherwise focus the modal content container


          content.focus({
            preventScroll: true
          });
        }
      },
      // Turn on/off focusin listener
      setEnforceFocus: function setEnforceFocus(on) {
        var method = on ? eventOn : eventOff;
        method(document, 'focusin', this.focusHandler, EVT_OPTIONS);
      },
      // Resize listener
      setResizeEvent: function setResizeEvent(on) {
        var method = on ? eventOn : eventOff; // These events should probably also check if
        // body is overflowing

        method(window, 'resize', this.checkModalOverflow, EVT_OPTIONS);
        method(window, 'orientationchange', this.checkModalOverflow, EVT_OPTIONS);
      },
      // Root listener handlers
      showHandler: function showHandler(id, triggerEl) {
        if (id === this.safeId()) {
          this.return_focus = triggerEl || this.getActiveElement();
          this.show();
        }
      },
      hideHandler: function hideHandler(id) {
        if (id === this.safeId()) {
          this.hide('event');
        }
      },
      toggleHandler: function toggleHandler(id, triggerEl) {
        if (id === this.safeId()) {
          this.toggle(triggerEl);
        }
      },
      modalListener: function modalListener(bvEvt) {
        // If another modal opens, close this one if stacking not permitted
        if (this.noStacking && bvEvt.vueTarget !== this) {
          this.hide();
        }
      },
      // Focus control handlers
      focusFirst: function focusFirst() {
        var _this5 = this;

        // Don't try and focus if we are SSR
        if (isBrowser) {
          requestAF(function () {
            var modal = _this5.$refs.modal;
            var content = _this5.$refs.content;

            var activeElement = _this5.getActiveElement(); // If the modal contains the activeElement, we don't do anything


            if (modal && content && !(activeElement && contains(content, activeElement))) {
              var ok = _this5.$refs['ok-button'];
              var cancel = _this5.$refs['cancel-button'];
              var close = _this5.$refs['close-button']; // Focus the appropriate button or modal content wrapper

              var autoFocus = _this5.autoFocusButton;
              var el = autoFocus === 'ok' && ok ? ok.$el || ok : autoFocus === 'cancel' && cancel ? cancel.$el || cancel : autoFocus === 'close' && close ? close.$el || close : content; // Focus the element

              attemptFocus(el);

              if (el === content) {
                // Make sure top of modal is showing (if longer than the viewport)
                _this5.$nextTick(function () {
                  modal.scrollTop = 0;
                });
              }
            }
          });
        }
      },
      returnFocusTo: function returnFocusTo() {
        // Prefer `returnFocus` prop over event specified
        // `return_focus` value
        var el = this.returnFocus || this.return_focus || null;
        this.return_focus = null;
        this.$nextTick(function () {
          // Is el a string CSS selector?
          el = isString(el) ? select(el) : el;

          if (el) {
            // Possibly could be a component reference
            el = el.$el || el;
            attemptFocus(el);
          }
        });
      },
      checkModalOverflow: function checkModalOverflow() {
        if (this.isVisible) {
          var modal = this.$refs.modal;
          this.isModalOverflowing = modal.scrollHeight > document.documentElement.clientHeight;
        }
      },
      makeModal: function makeModal(h) {
        // Modal header
        var header = h();

        if (!this.hideHeader) {
          var modalHeader = this.normalizeSlot('modal-header', this.slotScope);

          if (!modalHeader) {
            var closeButton = h();

            if (!this.hideHeaderClose) {
              closeButton = h(BButtonClose, {
                ref: 'close-button',
                props: {
                  disabled: this.isTransitioning,
                  ariaLabel: this.headerCloseLabel,
                  textVariant: this.headerCloseVariant || this.headerTextVariant
                },
                on: {
                  click: this.onClose
                }
              }, [this.normalizeSlot('modal-header-close')]);
            }

            var domProps = !this.hasNormalizedSlot('modal-title') && this.titleHtml ? {
              innerHTML: this.titleHtml
            } : {};
            modalHeader = [h(this.titleTag, {
              staticClass: 'modal-title',
              class: this.titleClasses,
              attrs: {
                id: this.safeId('__BV_modal_title_')
              },
              domProps: domProps
            }, [this.normalizeSlot('modal-title', this.slotScope) || stripTags(this.title)]), closeButton];
          }

          header = h('header', {
            ref: 'header',
            staticClass: 'modal-header',
            class: this.headerClasses,
            attrs: {
              id: this.safeId('__BV_modal_header_')
            }
          }, [modalHeader]);
        } // Modal body


        var body = h('div', {
          ref: 'body',
          staticClass: 'modal-body',
          class: this.bodyClasses,
          attrs: {
            id: this.safeId('__BV_modal_body_')
          }
        }, this.normalizeSlot('default', this.slotScope)); // Modal footer

        var footer = h();

        if (!this.hideFooter) {
          var modalFooter = this.normalizeSlot('modal-footer', this.slotScope);

          if (!modalFooter) {
            var cancelButton = h();

            if (!this.okOnly) {
              var cancelHtml = this.cancelTitleHtml ? {
                innerHTML: this.cancelTitleHtml
              } : null;
              cancelButton = h(BButton, {
                ref: 'cancel-button',
                props: {
                  variant: this.cancelVariant,
                  size: this.buttonSize,
                  disabled: this.cancelDisabled || this.busy || this.isTransitioning
                },
                on: {
                  click: this.onCancel
                }
              }, [this.normalizeSlot('modal-cancel') || (cancelHtml ? h('span', {
                domProps: cancelHtml
              }) : stripTags(this.cancelTitle))]);
            }

            var okHtml = this.okTitleHtml ? {
              innerHTML: this.okTitleHtml
            } : null;
            var okButton = h(BButton, {
              ref: 'ok-button',
              props: {
                variant: this.okVariant,
                size: this.buttonSize,
                disabled: this.okDisabled || this.busy || this.isTransitioning
              },
              on: {
                click: this.onOk
              }
            }, [this.normalizeSlot('modal-ok') || (okHtml ? h('span', {
              domProps: okHtml
            }) : stripTags(this.okTitle))]);
            modalFooter = [cancelButton, okButton];
          }

          footer = h('footer', {
            ref: 'footer',
            staticClass: 'modal-footer',
            class: this.footerClasses,
            attrs: {
              id: this.safeId('__BV_modal_footer_')
            }
          }, [modalFooter]);
        } // Assemble modal content


        var modalContent = h('div', {
          ref: 'content',
          staticClass: 'modal-content',
          class: this.contentClass,
          attrs: {
            role: 'document',
            id: this.safeId('__BV_modal_content_'),
            tabindex: '-1'
          }
        }, [header, body, footer]); // Tab trap to prevent page from scrolling to next element in
        // tab index during enforce focus tab cycle

        var tabTrapTop = h();
        var tabTrapBottom = h();

        if (this.isVisible && !this.noEnforceFocus) {
          tabTrapTop = h('span', {
            ref: 'topTrap',
            attrs: {
              tabindex: '0'
            }
          });
          tabTrapBottom = h('span', {
            ref: 'bottomTrap',
            attrs: {
              tabindex: '0'
            }
          });
        } // Modal dialog wrapper


        var modalDialog = h('div', {
          ref: 'dialog',
          staticClass: 'modal-dialog',
          class: this.dialogClasses,
          on: {
            mousedown: this.onDialogMousedown
          }
        }, [tabTrapTop, modalContent, tabTrapBottom]); // Modal

        var modal = h('div', {
          ref: 'modal',
          staticClass: 'modal',
          class: this.modalClasses,
          style: this.modalStyles,
          directives: [{
            name: 'show',
            rawName: 'v-show',
            value: this.isVisible,
            expression: 'isVisible'
          }],
          attrs: {
            id: this.safeId(),
            role: 'dialog',
            'aria-hidden': this.isVisible ? null : 'true',
            'aria-modal': this.isVisible ? 'true' : null,
            'aria-label': this.ariaLabel,
            'aria-labelledby': this.hideHeader || this.ariaLabel || !(this.hasNormalizedSlot('modal-title') || this.titleHtml || this.title) ? null : this.safeId('__BV_modal_title_'),
            'aria-describedby': this.safeId('__BV_modal_body_')
          },
          on: {
            keydown: this.onEsc,
            click: this.onClickOut
          }
        }, [modalDialog]); // Wrap modal in transition
        // Sadly, we can't use BVTransition here due to the differences in
        // transition durations for .modal and .modal-dialog. Not until
        // issue https://github.com/vuejs/vue/issues/9986 is resolved

        modal = h('transition', {
          props: {
            enterClass: '',
            enterToClass: '',
            enterActiveClass: '',
            leaveClass: '',
            leaveActiveClass: '',
            leaveToClass: ''
          },
          on: {
            beforeEnter: this.onBeforeEnter,
            enter: this.onEnter,
            afterEnter: this.onAfterEnter,
            beforeLeave: this.onBeforeLeave,
            leave: this.onLeave,
            afterLeave: this.onAfterLeave
          }
        }, [modal]); // Modal backdrop

        var backdrop = h();

        if (!this.hideBackdrop && this.isVisible) {
          backdrop = h('div', {
            staticClass: 'modal-backdrop',
            attrs: {
              id: this.safeId('__BV_modal_backdrop_')
            }
          }, [this.normalizeSlot('modal-backdrop')]);
        }

        backdrop = h(BVTransition, {
          props: {
            noFade: this.noFade
          }
        }, [backdrop]); // If the parent has a scoped style attribute, and the modal
        // is portalled, add the scoped attribute to the modal wrapper

        var scopedStyleAttrs = !this.static ? this.scopedStyleAttrs : {}; // Assemble modal and backdrop in an outer <div>

        return h('div', {
          key: "modal-outer-".concat(this._uid),
          style: this.modalOuterStyle,
          attrs: _objectSpread2({}, scopedStyleAttrs, {}, this.$attrs, {
            id: this.safeId('__BV_modal_outer_')
          })
        }, [modal, backdrop]);
      }
    },
    render: function render(h) {
      if (this.static) {
        return this.lazy && this.isHidden ? h() : this.makeModal(h);
      } else {
        return this.isHidden ? h() : h(BTransporterSingle, {}, [this.makeModal(h)]);
      }
    }
  });

  var EVENT_SHOW = 'bv::show::modal'; // Prop name we use to store info on root element

  var HANDLER = '__bv_modal_directive__';
  var EVENT_OPTS = {
    passive: true
  };

  var getTarget = function getTarget(_ref) {
    var _ref$modifiers = _ref.modifiers,
        modifiers = _ref$modifiers === void 0 ? {} : _ref$modifiers,
        arg = _ref.arg,
        value = _ref.value;
    // Try value, then arg, otherwise pick last modifier
    return isString(value) ? value : isString(arg) ? arg : keys(modifiers).reverse()[0];
  };

  var getTriggerElement = function getTriggerElement(el) {
    // If root element is a dropdown-item or nav-item, we
    // need to target the inner link or button instead
    return el && matches(el, '.dropdown-menu > li, li.nav-item') ? select('a, button', el) || el : el;
  };

  var setRole = function setRole(trigger) {
    // Ensure accessibility on non button elements
    if (trigger && trigger.tagName !== 'BUTTON') {
      // Only set a role if the trigger element doesn't have one
      if (!hasAttr(trigger, 'role')) {
        setAttr(trigger, 'role', 'button');
      } // Add a tabindex is not a button or link, and tabindex is not provided


      if (trigger.tagName !== 'A' && !hasAttr(trigger, 'tabindex')) {
        setAttr(trigger, 'tabindex', '0');
      }
    }
  };

  var bind$1 = function bind(el, binding, vnode) {
    var target = getTarget(binding);
    var trigger = getTriggerElement(el);

    if (target && trigger) {
      var handler = function handler(evt) {
        // `currentTarget` is the element with the listener on it
        var currentTarget = evt.currentTarget;

        if (!isDisabled(currentTarget)) {
          var type = evt.type;
          var key = evt.keyCode; // Open modal only if trigger is not disabled

          if (type === 'click' || type === 'keydown' && (key === KEY_CODES.ENTER || key === KEY_CODES.SPACE)) {
            vnode.context.$root.$emit(EVENT_SHOW, target, currentTarget);
          }
        }
      };

      el[HANDLER] = handler; // If element is not a button, we add `role="button"` for accessibility

      setRole(trigger); // Listen for click events

      eventOn(trigger, 'click', handler, EVENT_OPTS);

      if (trigger.tagName !== 'BUTTON' && getAttr(trigger, 'role') === 'button') {
        // If trigger isn't a button but has role button,
        // we also listen for `keydown.space` && `keydown.enter`
        eventOn(trigger, 'keydown', handler, EVENT_OPTS);
      }
    }
  };

  var unbind$1 = function unbind(el) {
    var trigger = getTriggerElement(el);
    var handler = el ? el[HANDLER] : null;

    if (trigger && handler) {
      eventOff(trigger, 'click', handler, EVENT_OPTS);
      eventOff(trigger, 'keydown', handler, EVENT_OPTS);
    }

    delete el[HANDLER];
  };

  var componentUpdated$1 = function componentUpdated(el, binding, vnode) {
    // We bind and rebind just in case target changes
    unbind$1(el);
    bind$1(el, binding, vnode);
  };

  var updated = function updated() {};
  /*
   * Export our directive
   */


  var VBModal = {
    inserted: componentUpdated$1,
    updated: updated,
    componentUpdated: componentUpdated$1,
    unbind: unbind$1
  };

  var PROP_NAME$2 = '$bvModal';
  var PROP_NAME_PRIV = '_bv__modal'; // Base modal props that are allowed
  // Some may be ignored or overridden on some message boxes
  // Prop ID is allowed, but really only should be used for testing
  // We need to add it in explicitly as it comes from the `idMixin`

  var BASE_PROPS = ['id'].concat(_toConsumableArray(keys(omit(props$H, ['busy', 'lazy', 'noStacking', "static", 'visible'])))); // Fallback event resolver (returns undefined)

  var defaultResolver = function defaultResolver(bvModalEvt) {}; // Map prop names to modal slot names


  var propsToSlots = {
    msgBoxContent: 'default',
    title: 'modal-title',
    okTitle: 'modal-ok',
    cancelTitle: 'modal-cancel'
  }; // --- Utility methods ---
  // Method to filter only recognized props that are not undefined

  var filterOptions = function filterOptions(options) {
    return BASE_PROPS.reduce(function (memo, key) {
      if (!isUndefined(options[key])) {
        memo[key] = options[key];
      }

      return memo;
    }, {});
  }; // Method to install `$bvModal` VM injection


  var plugin = function plugin(Vue) {
    // Create a private sub-component that extends BModal
    // which self-destructs after hidden
    // @vue/component
    var BMsgBox = Vue.extend({
      name: 'BMsgBox',
      extends: BModal,
      destroyed: function destroyed() {
        // Make sure we not in document any more
        if (this.$el && this.$el.parentNode) {
          this.$el.parentNode.removeChild(this.$el);
        }
      },
      mounted: function mounted() {
        var _this = this;

        // Self destruct handler
        var handleDestroy = function handleDestroy() {
          var self = _this;

          _this.$nextTick(function () {
            // In a `setTimeout()` to release control back to application
            setTimeout(function () {
              return self.$destroy();
            }, 0);
          });
        }; // Self destruct if parent destroyed


        this.$parent.$once('hook:destroyed', handleDestroy); // Self destruct after hidden

        this.$once('hidden', handleDestroy); // Self destruct on route change

        /* istanbul ignore if */

        if (this.$router && this.$route) {
          // Destroy ourselves if route changes

          /* istanbul ignore next */
          this.$once('hook:beforeDestroy', this.$watch('$router', handleDestroy));
        } // Show the `BMsgBox`


        this.show();
      }
    }); // Method to generate the on-demand modal message box
    // Returns a promise that resolves to a value returned by the resolve

    var asyncMsgBox = function asyncMsgBox($parent, props) {
      var resolver = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultResolver;

      if (warnNotClient(PROP_NAME$2) || warnNoPromiseSupport(PROP_NAME$2)) {
        /* istanbul ignore next */
        return;
      } // Create an instance of `BMsgBox` component


      var msgBox = new BMsgBox({
        // We set parent as the local VM so these modals can emit events on
        // the app `$root`, as needed by things like tooltips and popovers
        // And it helps to ensure `BMsgBox` is destroyed when parent is destroyed
        parent: $parent,
        // Preset the prop values
        propsData: _objectSpread2({}, filterOptions(getComponentConfig('BModal') || {}), {
          // Defaults that user can override
          hideHeaderClose: true,
          hideHeader: !(props.title || props.titleHtml)
        }, omit(props, keys(propsToSlots)), {
          // Props that can't be overridden
          lazy: false,
          busy: false,
          visible: false,
          noStacking: false,
          noEnforceFocus: false
        })
      }); // Convert certain props to scoped slots

      keys(propsToSlots).forEach(function (prop) {
        if (!isUndefined(props[prop])) {
          // Can be a string, or array of VNodes.
          // Alternatively, user can use HTML version of prop to pass an HTML string.
          msgBox.$slots[propsToSlots[prop]] = concat(props[prop]);
        }
      }); // Return a promise that resolves when hidden, or rejects on destroyed

      return new Promise(function (resolve, reject) {
        var resolved = false;
        msgBox.$once('hook:destroyed', function () {
          if (!resolved) {
            /* istanbul ignore next */
            reject(new Error('BootstrapVue MsgBox destroyed before resolve'));
          }
        });
        msgBox.$on('hide', function (bvModalEvt) {
          if (!bvModalEvt.defaultPrevented) {
            var result = resolver(bvModalEvt); // If resolver didn't cancel hide, we resolve

            if (!bvModalEvt.defaultPrevented) {
              resolved = true;
              resolve(result);
            }
          }
        }); // Create a mount point (a DIV) and mount the msgBo which will trigger it to show

        var div = document.createElement('div');
        document.body.appendChild(div);
        msgBox.$mount(div);
      });
    }; // Private utility method to open a user defined message box and returns a promise.
    // Not to be used directly by consumers, as this method may change calling syntax


    var makeMsgBox = function makeMsgBox($parent, content) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var resolver = arguments.length > 3 ? arguments[3] : undefined;

      if (!content || warnNoPromiseSupport(PROP_NAME$2) || warnNotClient(PROP_NAME$2) || !isFunction(resolver)) {
        /* istanbul ignore next */
        return;
      }

      return asyncMsgBox($parent, _objectSpread2({}, filterOptions(options), {
        msgBoxContent: content
      }), resolver);
    }; // BvModal instance class


    var BvModal =
    /*#__PURE__*/
    function () {
      function BvModal(vm) {
        _classCallCheck(this, BvModal);

        // Assign the new properties to this instance
        assign(this, {
          _vm: vm,
          _root: vm.$root
        }); // Set these properties as read-only and non-enumerable

        defineProperties(this, {
          _vm: readonlyDescriptor(),
          _root: readonlyDescriptor()
        });
      } // --- Instance methods ---
      // Show modal with the specified ID args are for future use


      _createClass(BvModal, [{
        key: "show",
        value: function show(id) {
          if (id && this._root) {
            var _this$_root;

            for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
              args[_key - 1] = arguments[_key];
            }

            (_this$_root = this._root).$emit.apply(_this$_root, ['bv::show::modal', id].concat(args));
          }
        } // Hide modal with the specified ID args are for future use

      }, {
        key: "hide",
        value: function hide(id) {
          if (id && this._root) {
            var _this$_root2;

            for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
              args[_key2 - 1] = arguments[_key2];
            }

            (_this$_root2 = this._root).$emit.apply(_this$_root2, ['bv::hide::modal', id].concat(args));
          }
        } // The following methods require Promise support!
        // IE 11 and others do not support Promise natively, so users
        // should have a Polyfill loaded (which they need anyways for IE 11 support)
        // Open a message box with OK button only and returns a promise

      }, {
        key: "msgBoxOk",
        value: function msgBoxOk(message) {
          var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

          // Pick the modal props we support from options
          var props = _objectSpread2({}, options, {
            // Add in overrides and our content prop
            okOnly: true,
            okDisabled: false,
            hideFooter: false,
            msgBoxContent: message
          });

          return makeMsgBox(this._vm, message, props, function (bvModalEvt) {
            // Always resolve to true for OK
            return true;
          });
        } // Open a message box modal with OK and CANCEL buttons
        // and returns a promise

      }, {
        key: "msgBoxConfirm",
        value: function msgBoxConfirm(message) {
          var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

          // Set the modal props we support from options
          var props = _objectSpread2({}, options, {
            // Add in overrides and our content prop
            okOnly: false,
            okDisabled: false,
            cancelDisabled: false,
            hideFooter: false
          });

          return makeMsgBox(this._vm, message, props, function (bvModalEvt) {
            var trigger = bvModalEvt.trigger;
            return trigger === 'ok' ? true : trigger === 'cancel' ? false : null;
          });
        }
      }]);

      return BvModal;
    }(); // Add our instance mixin


    Vue.mixin({
      beforeCreate: function beforeCreate() {
        // Because we need access to `$root` for `$emits`, and VM for parenting,
        // we have to create a fresh instance of `BvModal` for each VM
        this[PROP_NAME_PRIV] = new BvModal(this);
      }
    }); // Define our read-only `$bvModal` instance property
    // Placed in an if just in case in HMR mode
    // eslint-disable-next-line no-prototype-builtins

    if (!Vue.prototype.hasOwnProperty(PROP_NAME$2)) {
      defineProperty(Vue.prototype, PROP_NAME$2, {
        get: function get() {
          /* istanbul ignore next */
          if (!this || !this[PROP_NAME_PRIV]) {
            warn("'".concat(PROP_NAME$2, "' must be accessed from a Vue instance 'this' context"));
          }

          return this[PROP_NAME_PRIV];
        }
      });
    }
  };

  var BVModalPlugin =
  /*#__PURE__*/
  pluginFactory({
    plugins: {
      plugin: plugin
    }
  });

  var ModalPlugin =
  /*#__PURE__*/
  pluginFactory({
    components: {
      BModal: BModal
    },
    directives: {
      VBModal: VBModal
    },
    // $bvModal injection
    plugins: {
      BVModalPlugin: BVModalPlugin
    }
  });

  var props$I = {
    tag: {
      type: String,
      default: 'ul'
    },
    fill: {
      type: Boolean,
      default: false
    },
    justified: {
      type: Boolean,
      default: false
    },
    align: {
      type: String,
      default: null
    },
    tabs: {
      type: Boolean,
      default: false
    },
    pills: {
      type: Boolean,
      default: false
    },
    vertical: {
      type: Boolean,
      default: false
    },
    small: {
      type: Boolean,
      default: false
    },
    cardHeader: {
      // Set to true if placing in a card header
      type: Boolean,
      default: false
    }
  }; // -- Utils --

  var computeJustifyContent = function computeJustifyContent(value) {
    // Normalize value
    value = value === 'left' ? 'start' : value === 'right' ? 'end' : value;
    return "justify-content-".concat(value);
  }; // @vue/component


  var BNav =
  /*#__PURE__*/
  Vue.extend({
    name: 'BNav',
    functional: true,
    props: props$I,
    render: function render(h, _ref) {
      var _class;

      var props = _ref.props,
          data = _ref.data,
          children = _ref.children;
      return h(props.tag, a(data, {
        staticClass: 'nav',
        class: (_class = {
          'nav-tabs': props.tabs,
          'nav-pills': props.pills && !props.tabs,
          'card-header-tabs': !props.vertical && props.cardHeader && props.tabs,
          'card-header-pills': !props.vertical && props.cardHeader && props.pills && !props.tabs,
          'flex-column': props.vertical,
          'nav-fill': !props.vertical && props.fill,
          'nav-justified': !props.vertical && props.justified
        }, _defineProperty(_class, computeJustifyContent(props.align), !props.vertical && props.align), _defineProperty(_class, "small", props.small), _class)
      }), children);
    }
  });

  var props$J = propsFactory(); // @vue/component

  var BNavItem =
  /*#__PURE__*/
  Vue.extend({
    name: 'BNavItem',
    functional: true,
    props: _objectSpread2({}, props$J, {
      linkAttrs: {
        type: Object,
        default: function _default() {}
      },
      linkClasses: {
        type: [String, Object, Array],
        default: null
      }
    }),
    render: function render(h, _ref) {
      var props = _ref.props,
          data = _ref.data,
          listeners = _ref.listeners,
          children = _ref.children;
      // We transfer the listeners to the link
      delete data.on;
      return h('li', a(data, {
        staticClass: 'nav-item'
      }), [h(BLink, {
        staticClass: 'nav-link',
        class: props.linkClasses,
        attrs: props.linkAttrs,
        props: props,
        on: listeners
      }, children)]);
    }
  });

  var props$K = {}; // @vue/component

  var BNavText =
  /*#__PURE__*/
  Vue.extend({
    name: 'BNavText',
    functional: true,
    props: props$K,
    render: function render(h, _ref) {
      var props = _ref.props,
          data = _ref.data,
          children = _ref.children;
      return h('li', a(data, {
        staticClass: 'navbar-text'
      }), children);
    }
  });

  var props$L = _objectSpread2({}, omit(props$o, ['inline']), {
    formClass: {
      type: [String, Array, Object],
      default: null
    }
  }); // @vue/component

  var BNavForm =
  /*#__PURE__*/
  Vue.extend({
    name: 'BNavForm',
    functional: true,
    props: props$L,
    render: function render(h, _ref) {
      var props = _ref.props,
          data = _ref.data,
          children = _ref.children,
          _ref$listeners = _ref.listeners,
          listeners = _ref$listeners === void 0 ? {} : _ref$listeners;
      var attrs = data.attrs; // The following data properties are cleared out
      // as they will be passed to BForm directly

      data.attrs = {};
      data.on = {};
      var $form = h(BForm, {
        class: props.formClass,
        props: _objectSpread2({}, props, {
          inline: true
        }),
        attrs: attrs,
        on: listeners
      }, children);
      return h('li', a(data, {
        staticClass: 'form-inline'
      }), [$form]);
    }
  });

  var props$M = pluckProps(['menuClass', 'toggleClass', 'noCaret', 'role'], props$j); // @vue/component

  var BNavItemDropdown =
  /*#__PURE__*/
  Vue.extend({
    name: 'BNavItemDropdown',
    mixins: [idMixin, dropdownMixin, normalizeSlotMixin],
    props: props$M,
    computed: {
      isNav: function isNav() {
        // Signal to dropdown mixin that we are in a navbar
        return true;
      },
      dropdownClasses: function dropdownClasses() {
        return [this.directionClass, {
          show: this.visible
        }];
      },
      menuClasses: function menuClasses() {
        return [this.menuClass, {
          'dropdown-menu-right': this.right,
          show: this.visible
        }];
      },
      toggleClasses: function toggleClasses() {
        return [this.toggleClass, {
          'dropdown-toggle-no-caret': this.noCaret
        }];
      }
    },
    render: function render(h) {
      var button = h(BLink, {
        ref: 'toggle',
        staticClass: 'nav-link dropdown-toggle',
        class: this.toggleClasses,
        props: {
          href: '#',
          disabled: this.disabled
        },
        attrs: {
          id: this.safeId('_BV_button_'),
          'aria-haspopup': 'true',
          'aria-expanded': this.visible ? 'true' : 'false'
        },
        on: {
          click: this.toggle,
          keydown: this.toggle // space, enter, down

        }
      }, [this.$slots['button-content'] || this.$slots.text || h('span', {
        domProps: htmlOrText(this.html, this.text)
      })]);
      var menu = h('ul', {
        staticClass: 'dropdown-menu',
        class: this.menuClasses,
        ref: 'menu',
        attrs: {
          tabindex: '-1',
          'aria-labelledby': this.safeId('_BV_button_')
        },
        on: {
          keydown: this.onKeydown // up, down, esc

        }
      }, !this.lazy || this.visible ? this.normalizeSlot('default', {
        hide: this.hide
      }) : [h()]);
      return h('li', {
        staticClass: 'nav-item b-nav-dropdown dropdown',
        class: this.dropdownClasses,
        attrs: {
          id: this.safeId()
        }
      }, [button, menu]);
    }
  });

  var NavPlugin =
  /*#__PURE__*/
  pluginFactory({
    components: {
      BNav: BNav,
      BNavItem: BNavItem,
      BNavText: BNavText,
      BNavForm: BNavForm,
      BNavItemDropdown: BNavItemDropdown,
      BNavItemDd: BNavItemDropdown,
      BNavDropdown: BNavItemDropdown,
      BNavDd: BNavItemDropdown
    },
    plugins: {
      DropdownPlugin: DropdownPlugin
    }
  });

  var NAME$h = 'BNavbar';
  var props$N = {
    tag: {
      type: String,
      default: 'nav'
    },
    type: {
      type: String,
      default: 'light'
    },
    variant: {
      type: String,
      default: function _default() {
        return getComponentConfig(NAME$h, 'variant');
      }
    },
    toggleable: {
      type: [Boolean, String],
      default: false
    },
    fixed: {
      type: String
    },
    sticky: {
      type: Boolean,
      default: false
    },
    print: {
      type: Boolean,
      default: false
    }
  }; // @vue/component

  var BNavbar =
  /*#__PURE__*/
  Vue.extend({
    name: NAME$h,
    functional: true,
    props: props$N,
    render: function render(h, _ref) {
      var _class;

      var props = _ref.props,
          data = _ref.data,
          children = _ref.children;
      var breakpoint = '';
      var xs = getBreakpoints()[0];

      if (props.toggleable && isString(props.toggleable) && props.toggleable !== xs) {
        breakpoint = "navbar-expand-".concat(props.toggleable);
      } else if (props.toggleable === false) {
        breakpoint = 'navbar-expand';
      }

      return h(props.tag, a(data, {
        staticClass: 'navbar',
        class: (_class = {
          'd-print': props.print,
          'sticky-top': props.sticky
        }, _defineProperty(_class, "navbar-".concat(props.type), Boolean(props.type)), _defineProperty(_class, "bg-".concat(props.variant), Boolean(props.variant)), _defineProperty(_class, "fixed-".concat(props.fixed), Boolean(props.fixed)), _defineProperty(_class, "".concat(breakpoint), Boolean(breakpoint)), _class),
        attrs: {
          role: props.tag === 'nav' ? null : 'navigation'
        }
      }), children);
    }
  });

  var props$O = pluckProps(['tag', 'fill', 'justified', 'align', 'small'], props$I); // -- Utils --

  var computeJustifyContent$1 = function computeJustifyContent(value) {
    // Normalize value
    value = value === 'left' ? 'start' : value === 'right' ? 'end' : value;
    return "justify-content-".concat(value);
  }; // @vue/component


  var BNavbarNav =
  /*#__PURE__*/
  Vue.extend({
    name: 'BNavbarNav',
    functional: true,
    props: props$O,
    render: function render(h, _ref) {
      var _class;

      var props = _ref.props,
          data = _ref.data,
          children = _ref.children;
      return h(props.tag, a(data, {
        staticClass: 'navbar-nav',
        class: (_class = {
          'nav-fill': props.fill,
          'nav-justified': props.justified
        }, _defineProperty(_class, computeJustifyContent$1(props.align), props.align), _defineProperty(_class, "small", props.small), _class)
      }), children);
    }
  });

  var linkProps$3 = propsFactory();
  linkProps$3.href.default = undefined;
  linkProps$3.to.default = undefined;
  var props$P = _objectSpread2({}, linkProps$3, {
    tag: {
      type: String,
      default: 'div'
    }
  }); // @vue/component

  var BNavbarBrand =
  /*#__PURE__*/
  Vue.extend({
    name: 'BNavbarBrand',
    functional: true,
    props: props$P,
    render: function render(h, _ref) {
      var props = _ref.props,
          data = _ref.data,
          children = _ref.children;
      var isLink = Boolean(props.to || props.href);
      var tag = isLink ? BLink : props.tag;
      return h(tag, a(data, {
        staticClass: 'navbar-brand',
        props: isLink ? pluckProps(linkProps$3, props) : {}
      }), children);
    }
  });

  var NAME$i = 'BNavbarToggle'; // TODO: Switch to using VBToggle directive, will reduce code footprint
  // Events we emit on $root

  var EVENT_TOGGLE$2 = 'bv::toggle::collapse'; // Events we listen to on $root

  var EVENT_STATE$2 = 'bv::collapse::state'; // This private event is NOT to be documented as people should not be using it.

  var EVENT_STATE_SYNC$2 = 'bv::collapse::sync::state'; // @vue/component

  var BNavbarToggle =
  /*#__PURE__*/
  Vue.extend({
    name: NAME$i,
    mixins: [listenOnRootMixin, normalizeSlotMixin],
    props: {
      label: {
        type: String,
        default: function _default() {
          return getComponentConfig(NAME$i, 'label');
        }
      },
      target: {
        type: String,
        required: true
      }
    },
    data: function data() {
      return {
        toggleState: false
      };
    },
    created: function created() {
      this.listenOnRoot(EVENT_STATE$2, this.handleStateEvt);
      this.listenOnRoot(EVENT_STATE_SYNC$2, this.handleStateEvt);
    },
    methods: {
      onClick: function onClick(evt) {
        this.$emit('click', evt);

        if (!evt.defaultPrevented) {
          this.$root.$emit(EVENT_TOGGLE$2, this.target);
        }
      },
      handleStateEvt: function handleStateEvt(id, state) {
        if (id === this.target) {
          this.toggleState = state;
        }
      }
    },
    render: function render(h) {
      return h('button', {
        class: ['navbar-toggler'],
        attrs: {
          type: 'button',
          'aria-label': this.label,
          'aria-controls': this.target,
          'aria-expanded': this.toggleState ? 'true' : 'false'
        },
        on: {
          click: this.onClick
        }
      }, [this.normalizeSlot('default') || h('span', {
        class: ['navbar-toggler-icon']
      })]);
    }
  });

  var NavbarPlugin =
  /*#__PURE__*/
  pluginFactory({
    components: {
      BNavbar: BNavbar,
      BNavbarNav: BNavbarNav,
      BNavbarBrand: BNavbarBrand,
      BNavbarToggle: BNavbarToggle,
      BNavToggle: BNavbarToggle
    },
    plugins: {
      NavPlugin: NavPlugin,
      CollapsePlugin: CollapsePlugin,
      DropdownPlugin: DropdownPlugin
    }
  });

  /**
   * @param {number} length
   * @return {Array}
   */
  var range = function range(length) {
    return Array.apply(null, {
      length: length
    });
  };

  // for <b-pagination> and <b-pagination-nav>
  // Threshold of limit size when we start/stop showing ellipsis

  var ELLIPSIS_THRESHOLD = 3; // Default # of buttons limit

  var DEFAULT_LIMIT = 5; // Make an array of N to N+X

  var makePageArray = function makePageArray(startNumber, numberOfPages) {
    return range(numberOfPages).map(function (val, i) {
      return {
        number: startNumber + i,
        classes: null
      };
    });
  }; // Sanitize the provided limit value (converting to a number)


  var sanitizeLimit = function sanitizeLimit(val) {
    var limit = parseInt(val, 10) || 1;
    return limit < 1 ? DEFAULT_LIMIT : limit;
  }; // Sanitize the provided current page number (converting to a number)


  var sanitizeCurrentPage = function sanitizeCurrentPage(val, numberOfPages) {
    var page = parseInt(val, 10) || 1;
    return page > numberOfPages ? numberOfPages : page < 1 ? 1 : page;
  }; // Links don't normally respond to SPACE, so we add that
  // functionality via this handler


  var onSpaceKey = function onSpaceKey(evt) {
    if (evt.keyCode === KEY_CODES.SPACE) {
      evt.preventDefault(); // Stop page from scrolling

      evt.stopImmediatePropagation();
      evt.stopPropagation(); // Trigger the click event on the link

      evt.currentTarget.click();
      return false;
    }
  };

  var props$Q = {
    disabled: {
      type: Boolean,
      default: false
    },
    value: {
      type: [Number, String],
      default: null,
      validator: function validator(value)
      /* istanbul ignore next */
      {
        var num = parseInt(value, 10);

        if (!isNull(value) && (isNaN(num) || num < 1)) {
          warn('pagination: v-model value must be a number greater than 0');
          return false;
        }

        return true;
      }
    },
    limit: {
      type: [Number, String],
      default: DEFAULT_LIMIT,
      validator: function validator(value)
      /* istanbul ignore next */
      {
        var num = parseInt(value, 10);

        if (isNaN(num) || num < 1) {
          warn('pagination: prop "limit" must be a number greater than 0');
          return false;
        }

        return true;
      }
    },
    align: {
      type: String,
      default: 'left'
    },
    pills: {
      type: Boolean,
      default: false
    },
    hideGotoEndButtons: {
      type: Boolean,
      default: false
    },
    ariaLabel: {
      type: String,
      default: 'Pagination'
    },
    labelFirstPage: {
      type: String,
      default: 'Go to first page'
    },
    firstText: {
      type: String,
      default: "\xAB" // '«'

    },
    labelPrevPage: {
      type: String,
      default: 'Go to previous page'
    },
    prevText: {
      type: String,
      default: "\u2039" // '‹'

    },
    labelNextPage: {
      type: String,
      default: 'Go to next page'
    },
    nextText: {
      type: String,
      default: "\u203A" // '›'

    },
    labelLastPage: {
      type: String,
      default: 'Go to last page'
    },
    lastText: {
      type: String,
      default: "\xBB" // '»'

    },
    labelPage: {
      type: [String, Function],
      default: 'Go to page'
    },
    hideEllipsis: {
      type: Boolean,
      default: false
    },
    ellipsisText: {
      type: String,
      default: "\u2026" // '…'

    }
  }; // @vue/component

  var paginationMixin = {
    mixins: [normalizeSlotMixin],
    model: {
      prop: 'value',
      event: 'input'
    },
    props: props$Q,
    data: function data() {
      var curr = parseInt(this.value, 10);
      return {
        // -1 signifies no page initially selected
        currentPage: curr > 0 ? curr : -1,
        localNumberOfPages: 1,
        localLimit: DEFAULT_LIMIT
      };
    },
    computed: {
      btnSize: function btnSize() {
        return this.size ? "pagination-".concat(this.size) : '';
      },
      alignment: function alignment() {
        var align = this.align;

        if (align === 'center') {
          return 'justify-content-center';
        } else if (align === 'end' || align === 'right') {
          return 'justify-content-end';
        } else if (align === 'fill') {
          // The page-items will also have 'flex-fill' added.
          // We ad text centering to make the button appearance better in fill mode.
          return 'text-center';
        }

        return '';
      },
      styleClass: function styleClass() {
        return this.pills ? 'b-pagination-pills' : '';
      },
      computedCurrentPage: function computedCurrentPage() {
        return sanitizeCurrentPage(this.currentPage, this.localNumberOfPages);
      },
      paginationParams: function paginationParams() {
        // Determine if we should show the the ellipsis
        var limit = this.limit;
        var numberOfPages = this.localNumberOfPages;
        var currentPage = this.computedCurrentPage;
        var hideEllipsis = this.hideEllipsis;
        var showFirstDots = false;
        var showLastDots = false;
        var numberOfLinks = limit;
        var startNumber = 1;

        if (numberOfPages <= limit) {
          // Special Case: Less pages available than the limit of displayed pages
          numberOfLinks = numberOfPages;
        } else if (currentPage < limit - 1 && limit > ELLIPSIS_THRESHOLD) {
          // We are near the beginning of the page list
          if (!hideEllipsis) {
            showLastDots = true;
            numberOfLinks = limit - 1;
          }
        } else if (numberOfPages - currentPage + 2 < limit && limit > ELLIPSIS_THRESHOLD) {
          // We are near the end of the list
          if (!hideEllipsis) {
            numberOfLinks = limit - 1;
            showFirstDots = true;
          }

          startNumber = numberOfPages - numberOfLinks + 1;
        } else {
          // We are somewhere in the middle of the page list
          if (limit > ELLIPSIS_THRESHOLD && !hideEllipsis) {
            numberOfLinks = limit - 2;
            showFirstDots = showLastDots = true;
          }

          startNumber = currentPage - Math.floor(numberOfLinks / 2);
        } // Sanity checks


        if (startNumber < 1) {
          /* istanbul ignore next */
          startNumber = 1;
        } else if (startNumber > numberOfPages - numberOfLinks) {
          startNumber = numberOfPages - numberOfLinks + 1;
        }

        return {
          showFirstDots: showFirstDots,
          showLastDots: showLastDots,
          numberOfLinks: numberOfLinks,
          startNumber: startNumber
        };
      },
      pageList: function pageList() {
        // Generates the pageList array
        var _this$paginationParam = this.paginationParams,
            numberOfLinks = _this$paginationParam.numberOfLinks,
            startNumber = _this$paginationParam.startNumber;
        var currentPage = this.computedCurrentPage; // Generate list of page numbers

        var pages = makePageArray(startNumber, numberOfLinks); // We limit to a total of 3 page buttons on XS screens
        // So add classes to page links to hide them for XS breakpoint
        // Note: Ellipsis will also be hidden on XS screens
        // TODO: Make this visual limit configurable based on breakpoint(s)

        if (pages.length > 3) {
          var idx = currentPage - startNumber; // THe following is a bootstrap-vue custom utility class

          var classes = 'bv-d-xs-down-none';

          if (idx === 0) {
            // Keep leftmost 3 buttons visible when current page is first page
            for (var i = 3; i < pages.length; i++) {
              pages[i].classes = classes;
            }
          } else if (idx === pages.length - 1) {
            // Keep rightmost 3 buttons visible when current page is last page
            for (var _i = 0; _i < pages.length - 3; _i++) {
              pages[_i].classes = classes;
            }
          } else {
            // Hide all except current page, current page - 1 and current page + 1
            for (var _i2 = 0; _i2 < idx - 1; _i2++) {
              // hide some left button(s)
              pages[_i2].classes = classes;
            }

            for (var _i3 = pages.length - 1; _i3 > idx + 1; _i3--) {
              // hide some right button(s)
              pages[_i3].classes = classes;
            }
          }
        }

        return pages;
      }
    },
    watch: {
      value: function value(newValue, oldValue) {
        if (newValue !== oldValue) {
          this.currentPage = sanitizeCurrentPage(newValue, this.localNumberOfPages);
        }
      },
      currentPage: function currentPage(newValue, oldValue) {
        if (newValue !== oldValue) {
          // Emit null if no page selected
          this.$emit('input', newValue > 0 ? newValue : null);
        }
      },
      limit: function limit(newValue, oldValue) {
        if (newValue !== oldValue) {
          this.localLimit = sanitizeLimit(newValue);
        }
      }
    },
    created: function created() {
      var _this = this;

      // Set our default values in data
      this.localLimit = sanitizeLimit(this.limit);
      this.$nextTick(function () {
        // Sanity check
        _this.currentPage = _this.currentPage > _this.localNumberOfPages ? _this.localNumberOfPages : _this.currentPage;
      });
    },
    methods: {
      handleKeyNav: function handleKeyNav(evt) {
        var keyCode = evt.keyCode;
        var shift = evt.shiftKey;

        if (keyCode === KEY_CODES.LEFT || keyCode === KEY_CODES.UP) {
          evt.preventDefault();
          shift ? this.focusFirst() : this.focusPrev();
        } else if (keyCode === KEY_CODES.RIGHT || keyCode === KEY_CODES.DOWN) {
          evt.preventDefault();
          shift ? this.focusLast() : this.focusNext();
        }
      },
      getButtons: function getButtons() {
        // Return only buttons that are visible
        return selectAll('a.page-link', this.$el).filter(function (btn) {
          return isVisible(btn);
        });
      },
      setBtnFocus: function setBtnFocus(btn) {
        btn.focus();
      },
      focusCurrent: function focusCurrent() {
        var _this2 = this;

        // We do this in next tick to ensure buttons have finished rendering
        this.$nextTick(function () {
          var btn = _this2.getButtons().find(function (el) {
            return parseInt(getAttr(el, 'aria-posinset'), 10) === _this2.computedCurrentPage;
          });

          if (btn && btn.focus) {
            _this2.setBtnFocus(btn);
          } else {
            // Fallback if current page is not in button list
            _this2.focusFirst();
          }
        });
      },
      focusFirst: function focusFirst() {
        var _this3 = this;

        // We do this in next tick to ensure buttons have finished rendering
        this.$nextTick(function () {
          var btn = _this3.getButtons().find(function (el) {
            return !isDisabled(el);
          });

          if (btn && btn.focus && btn !== document.activeElement) {
            _this3.setBtnFocus(btn);
          }
        });
      },
      focusLast: function focusLast() {
        var _this4 = this;

        // We do this in next tick to ensure buttons have finished rendering
        this.$nextTick(function () {
          var btn = _this4.getButtons().reverse().find(function (el) {
            return !isDisabled(el);
          });

          if (btn && btn.focus && btn !== document.activeElement) {
            _this4.setBtnFocus(btn);
          }
        });
      },
      focusPrev: function focusPrev() {
        var _this5 = this;

        // We do this in next tick to ensure buttons have finished rendering
        this.$nextTick(function () {
          var buttons = _this5.getButtons();

          var idx = buttons.indexOf(document.activeElement);

          if (idx > 0 && !isDisabled(buttons[idx - 1]) && buttons[idx - 1].focus) {
            _this5.setBtnFocus(buttons[idx - 1]);
          }
        });
      },
      focusNext: function focusNext() {
        var _this6 = this;

        // We do this in next tick to ensure buttons have finished rendering
        this.$nextTick(function () {
          var buttons = _this6.getButtons();

          var idx = buttons.indexOf(document.activeElement);
          var cnt = buttons.length - 1;

          if (idx < cnt && !isDisabled(buttons[idx + 1]) && buttons[idx + 1].focus) {
            _this6.setBtnFocus(buttons[idx + 1]);
          }
        });
      }
    },
    render: function render(h) {
      var _this7 = this;

      var buttons = [];
      var numberOfPages = this.localNumberOfPages;
      var disabled = this.disabled;
      var _this$paginationParam2 = this.paginationParams,
          showFirstDots = _this$paginationParam2.showFirstDots,
          showLastDots = _this$paginationParam2.showLastDots;
      var currentPage = this.computedCurrentPage;
      var fill = this.align === 'fill'; // Helper function and flag

      var isActivePage = function isActivePage(pageNum) {
        return pageNum === currentPage;
      };

      var noCurrPage = this.currentPage < 1; // Factory function for prev/next/first/last buttons

      var makeEndBtn = function makeEndBtn(linkTo, ariaLabel, btnSlot, btnText, pageTest, key) {
        var isDisabled = disabled || isActivePage(pageTest) || noCurrPage || linkTo < 1 || linkTo > numberOfPages;
        var pageNum = linkTo < 1 ? 1 : linkTo > numberOfPages ? numberOfPages : linkTo;
        var scope = {
          disabled: isDisabled,
          page: pageNum,
          index: pageNum - 1
        };
        var btnContent = _this7.normalizeSlot(btnSlot, scope) || toString$1(btnText) || h();
        var inner = h(isDisabled ? 'span' : BLink, {
          staticClass: 'page-link',
          props: isDisabled ? {} : _this7.linkProps(linkTo),
          attrs: {
            role: 'menuitem',
            tabindex: isDisabled ? null : '-1',
            'aria-label': ariaLabel,
            'aria-controls': _this7.ariaControls || null,
            'aria-disabled': isDisabled ? 'true' : null
          },
          on: isDisabled ? {} : {
            click: function click(evt) {
              _this7.onClick(linkTo, evt);
            },
            keydown: onSpaceKey
          }
        }, [btnContent]);
        return h('li', {
          key: key,
          staticClass: 'page-item',
          class: {
            disabled: isDisabled,
            'flex-fill': fill
          },
          attrs: {
            role: 'presentation',
            'aria-hidden': isDisabled ? 'true' : null
          }
        }, [inner]);
      }; // Ellipsis factory


      var makeEllipsis = function makeEllipsis(isLast) {
        return h('li', {
          key: "ellipsis-".concat(isLast ? 'last' : 'first'),
          staticClass: 'page-item',
          class: ['disabled', 'bv-d-xs-down-none', fill ? 'flex-fill' : ''],
          attrs: {
            role: 'separator'
          }
        }, [h('span', {
          staticClass: 'page-link'
        }, [_this7.normalizeSlot('ellipsis-text') || toString$1(_this7.ellipsisText) || h()])]);
      }; // Goto First Page button bookend


      buttons.push(this.hideGotoEndButtons ? h() : makeEndBtn(1, this.labelFirstPage, 'first-text', this.firstText, 1, 'bookend-goto-first')); // Goto Previous page button bookend

      buttons.push(makeEndBtn(currentPage - 1, this.labelPrevPage, 'prev-text', this.prevText, 1, 'bookend-goto-prev')); // First Ellipsis Bookend

      buttons.push(showFirstDots ? makeEllipsis(false) : h()); // Individual Page links

      this.pageList.forEach(function (page, idx) {
        var active = isActivePage(page.number) && !noCurrPage; // Active page will have tabindex of 0, or if no current page and first page button

        var tabIndex = disabled ? null : active || noCurrPage && idx === 0 ? '0' : '-1';
        var attrs = {
          role: 'menuitemradio',
          'aria-disabled': disabled ? 'true' : null,
          'aria-controls': _this7.ariaControls || null,
          'aria-label': isFunction(_this7.labelPage) ? _this7.labelPage(page.number) : "".concat(_this7.labelPage, " ").concat(page.number),
          'aria-checked': active ? 'true' : 'false',
          'aria-posinset': page.number,
          'aria-setsize': numberOfPages,
          // ARIA "roving tabindex" method
          tabindex: tabIndex
        };
        var btnContent = toString$1(_this7.makePage(page.number));
        var scope = {
          page: page.number,
          index: page.number - 1,
          content: btnContent,
          active: active,
          disabled: disabled
        };
        var inner = h(disabled ? 'span' : BLink, {
          props: disabled ? {} : _this7.linkProps(page.number),
          staticClass: 'page-link',
          attrs: attrs,
          on: disabled ? {} : {
            click: function click(evt) {
              _this7.onClick(page.number, evt);
            },
            keydown: onSpaceKey
          }
        }, [_this7.normalizeSlot('page', scope) || btnContent]);
        buttons.push(h('li', {
          key: "page-".concat(page.number),
          staticClass: 'page-item',
          class: [{
            disabled: disabled,
            active: active,
            'flex-fill': fill
          }, page.classes],
          attrs: {
            role: 'presentation'
          }
        }, [inner]));
      }); // Last Ellipsis Bookend

      buttons.push(showLastDots ? makeEllipsis(true) : h()); // Goto Next page button bookend

      buttons.push(makeEndBtn(currentPage + 1, this.labelNextPage, 'next-text', this.nextText, numberOfPages, 'bookend-goto-next')); // Goto Last Page button bookend

      buttons.push(this.hideGotoEndButtons ? h() : makeEndBtn(numberOfPages, this.labelLastPage, 'last-text', this.lastText, numberOfPages, 'bookend-goto-last')); // Assemble the pagination buttons

      var pagination = h('ul', {
        ref: 'ul',
        staticClass: 'pagination',
        class: ['b-pagination', this.btnSize, this.alignment, this.styleClass],
        attrs: {
          role: 'menubar',
          'aria-disabled': disabled ? 'true' : 'false',
          'aria-label': this.ariaLabel || null
        },
        on: {
          keydown: this.handleKeyNav
        }
      }, buttons); // if we are pagination-nav, wrap in '<nav>' wrapper

      if (this.isNav) {
        return h('nav', {
          attrs: {
            'aria-disabled': disabled ? 'true' : null,
            'aria-hidden': disabled ? 'true' : 'false'
          }
        }, [pagination]);
      } else {
        return pagination;
      }
    }
  };

  var NAME$j = 'BPagination';
  var DEFAULT_PER_PAGE = 20;
  var DEFAULT_TOTAL_ROWS = 0;
  var props$R = {
    size: {
      type: String,
      default: function _default() {
        return getComponentConfig(NAME$j, 'size');
      }
    },
    perPage: {
      type: [Number, String],
      default: DEFAULT_PER_PAGE
    },
    totalRows: {
      type: [Number, String],
      default: DEFAULT_TOTAL_ROWS
    },
    ariaControls: {
      type: String,
      default: null
    }
  }; // --- Helper functions ---
  // Sanitize the provided per page number (converting to a number)

  var sanitizePerPage = function sanitizePerPage(val) {
    var perPage = parseInt(val, 10) || DEFAULT_PER_PAGE;
    return perPage < 1 ? 1 : perPage;
  }; // Sanitize the provided total rows number (converting to a number)


  var sanitizeTotalRows = function sanitizeTotalRows(val) {
    var totalRows = parseInt(val, 10) || DEFAULT_TOTAL_ROWS;
    return totalRows < 0 ? 0 : totalRows;
  }; // The render function is brought in via the `paginationMixin`
  // @vue/component


  var BPagination =
  /*#__PURE__*/
  Vue.extend({
    name: NAME$j,
    mixins: [paginationMixin],
    props: props$R,
    computed: {
      numberOfPages: function numberOfPages() {
        var result = Math.ceil(sanitizeTotalRows(this.totalRows) / sanitizePerPage(this.perPage));
        return result < 1 ? 1 : result;
      },
      pageSizeNumberOfPages: function pageSizeNumberOfPages() {
        // Used for watching changes to `perPage` and `numberOfPages`
        return {
          perPage: sanitizePerPage(this.perPage),
          totalRows: sanitizeTotalRows(this.totalRows),
          numberOfPages: this.numberOfPages
        };
      }
    },
    watch: {
      pageSizeNumberOfPages: function pageSizeNumberOfPages(newVal, oldVal) {
        if (!isUndefinedOrNull(oldVal)) {
          if (newVal.perPage !== oldVal.perPage && newVal.totalRows === oldVal.totalRows) {
            // If the page size changes, reset to page 1
            this.currentPage = 1;
          } else if (newVal.numberOfPages !== oldVal.numberOfPages && this.currentPage > newVal.numberOfPages) {
            // If `numberOfPages` changes and is less than
            // the `currentPage` number, reset to page 1
            this.currentPage = 1;
          }
        }

        this.localNumberOfPages = newVal.numberOfPages;
      }
    },
    created: function created() {
      var _this = this;

      // Set the initial page count
      this.localNumberOfPages = this.numberOfPages; // Set the initial page value

      var currentPage = parseInt(this.value, 10) || 0;

      if (currentPage > 0) {
        this.currentPage = currentPage;
      } else {
        this.$nextTick(function () {
          // If this value parses to NaN or a value less than 1
          // Trigger an initial emit of 'null' if no page specified
          _this.currentPage = 0;
        });
      }
    },
    mounted: function mounted() {
      // Set the initial page count
      this.localNumberOfPages = this.numberOfPages;
    },
    methods: {
      // These methods are used by the render function
      onClick: function onClick(num, evt) {
        var _this2 = this;

        // Handle edge cases where number of pages has changed (i.e. if perPage changes)
        // This should normally not happen, but just in case.
        if (num > this.numberOfPages) {
          /* istanbul ignore next */
          num = this.numberOfPages;
        } else if (num < 1) {
          /* istanbul ignore next */
          num = 1;
        } // Update the v-model


        this.currentPage = num; // Emit event triggered by user interaction

        this.$emit('change', this.currentPage);
        this.$nextTick(function () {
          // Keep the current button focused if possible
          var target = evt.target;

          if (isVisible(target) && _this2.$el.contains(target) && target.focus) {
            target.focus();
          } else {
            _this2.focusCurrent();
          }
        });
      },
      makePage: function makePage(pageNum) {
        return pageNum;
      },
      linkProps: function linkProps(pageNum) {
        // Always '#' for pagination component
        return {
          href: '#'
        };
      }
    }
  });

  var PaginationPlugin =
  /*#__PURE__*/
  pluginFactory({
    components: {
      BPagination: BPagination
    }
  });

  var NAME$k = 'BPaginationNav'; // Sanitize the provided number of pages (converting to a number)

  var sanitizeNumberOfPages = function sanitizeNumberOfPages(value) {
    var numberOfPages = parseInt(value, 10) || 1;
    return numberOfPages < 1 ? 1 : numberOfPages;
  };
  var props$S = {
    size: {
      type: String,
      default: function _default() {
        return getComponentConfig(NAME$k, 'size');
      }
    },
    numberOfPages: {
      type: [Number, String],
      default: 1,
      validator: function validator(value)
      /* istanbul ignore next */
      {
        var num = parseInt(value, 10);

        if (isNaN(num) || num < 1) {
          warn('b-pagination: prop "number-of-pages" must be a number greater than 0');
          return false;
        }

        return true;
      }
    },
    baseUrl: {
      type: String,
      default: '/'
    },
    useRouter: {
      type: Boolean,
      default: false
    },
    linkGen: {
      type: Function,
      default: null
    },
    pageGen: {
      type: Function,
      default: null
    },
    pages: {
      // Optional array of page links
      type: Array,
      default: null
    },
    noPageDetect: {
      // Disable auto page number detection if true
      type: Boolean,
      default: false
    },
    // router-link specific props
    activeClass: {
      type: String // default: undefined

    },
    exact: {
      type: Boolean,
      default: false
    },
    exactActiveClass: {
      type: String // default: undefined

    },
    // nuxt-link specific prop(s)
    noPrefetch: {
      type: Boolean,
      default: false
    }
  }; // The render function is brought in via the pagination mixin
  // @vue/component

  var BPaginationNav =
  /*#__PURE__*/
  Vue.extend({
    name: NAME$k,
    mixins: [paginationMixin],
    props: props$S,
    computed: {
      // Used by render function to trigger wrapping in '<nav>' element
      isNav: function isNav() {
        return true;
      },
      computedValue: function computedValue() {
        // Returns the value prop as a number or `null` if undefined or < 1
        var val = parseInt(this.value, 10);
        return isNaN(val) || val < 1 ? null : val;
      }
    },
    watch: {
      numberOfPages: function numberOfPages(newVal, oldVal) {
        var _this = this;

        this.$nextTick(function () {
          _this.setNumberOfPages();
        });
      },
      pages: function pages(newVal, oldVal) {
        var _this2 = this;

        this.$nextTick(function () {
          _this2.setNumberOfPages();
        });
      }
    },
    created: function created() {
      this.setNumberOfPages();
    },
    mounted: function mounted() {
      var _this3 = this;

      if (this.$router) {
        // We only add the watcher if vue router is detected
        this.$watch('$route', function (to, from) {
          _this3.$nextTick(function () {
            requestAF(function () {
              _this3.guessCurrentPage();
            });
          });
        });
      }
    },
    methods: {
      setNumberOfPages: function setNumberOfPages() {
        var _this4 = this;

        if (isArray(this.pages) && this.pages.length > 0) {
          this.localNumberOfPages = this.pages.length;
        } else {
          this.localNumberOfPages = sanitizeNumberOfPages(this.numberOfPages);
        }

        this.$nextTick(function () {
          _this4.guessCurrentPage();
        });
      },
      onClick: function onClick(pageNum, evt) {
        var _this5 = this;

        // Dont do anything if clicking the current active page
        if (pageNum === this.currentPage) {
          return;
        }

        requestAF(function () {
          // Update the v-model
          // Done in in requestAF() to allow browser to complete the
          // native browser click handling of a link
          _this5.currentPage = pageNum;

          _this5.$emit('change', pageNum);
        });
        this.$nextTick(function () {
          // Done in a nextTick() to ensure rendering complete
          try {
            // Emulate native link click page reloading behaviour by blurring the
            // paginator and returning focus to the document
            var target = evt.currentTarget || evt.target;
            target.blur();
          } catch (e) {}
        });
      },
      getPageInfo: function getPageInfo(pageNum) {
        if (!isArray(this.pages) || this.pages.length === 0 || isUndefined(this.pages[pageNum - 1])) {
          var link = "".concat(this.baseUrl).concat(pageNum);
          return {
            link: this.useRouter ? {
              path: link
            } : link,
            text: toString$1(pageNum)
          };
        }

        var info = this.pages[pageNum - 1];

        if (isObject(info)) {
          var _link = info.link;
          return {
            // Normalize link for router use
            link: isObject(_link) ? _link : this.useRouter ? {
              path: _link
            } : _link,
            // Make sure text has a value
            text: toString$1(info.text || pageNum)
          };
        } else {
          return {
            link: toString$1(info),
            text: toString$1(pageNum)
          };
        }
      },
      makePage: function makePage(pageNum) {
        var info = this.getPageInfo(pageNum);

        if (this.pageGen && isFunction(this.pageGen)) {
          return this.pageGen(pageNum, info);
        }

        return info.text;
      },
      makeLink: function makeLink(pageNum) {
        var info = this.getPageInfo(pageNum);

        if (this.linkGen && isFunction(this.linkGen)) {
          return this.linkGen(pageNum, info);
        }

        return info.link;
      },
      linkProps: function linkProps(pageNum) {
        var link = this.makeLink(pageNum);
        var props = {
          target: this.target || null,
          rel: this.rel || null,
          disabled: this.disabled,
          // The following props are only used if BLink detects router
          exact: this.exact,
          activeClass: this.activeClass,
          exactActiveClass: this.exactActiveClass,
          append: this.append,
          replace: this.replace,
          // nuxt-link specific prop
          noPrefetch: this.noPrefetch
        };

        if (this.useRouter || isObject(link)) {
          props.to = link;
        } else {
          props.href = link;
        }

        return props;
      },
      resolveLink: function resolveLink() {
        var to = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
        // Given a to (or href string), convert to normalized route-like structure
        // Works only client side!!
        var link;

        try {
          // Convert the `to` to a HREF via a temporary `a` tag
          link = document.createElement('a');
          link.href = computeHref({
            to: to
          }, 'a', '/', '/'); // We need to add the anchor to the document to make sure the
          // `pathname` is correctly detected in any browser (i.e. IE)

          document.body.appendChild(link); // Once href is assigned, the link will be normalized to the full URL bits

          var _link2 = link,
              pathname = _link2.pathname,
              hash = _link2.hash,
              search = _link2.search; // Remove link from document

          document.body.removeChild(link); // Return the location in a route-like object

          return {
            path: pathname,
            hash: hash,
            query: parseQuery(search)
          };
        } catch (e) {
          /* istanbul ignore next */
          try {
            link && link.parentNode && link.parentNode.removeChild(link);
          } catch (e) {}
          /* istanbul ignore next */


          return {};
        }
      },
      resolveRoute: function resolveRoute() {
        var to = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

        // Given a to (or href string), convert to normalized route location structure
        // works only when router available!!
        try {
          var route = this.$router.resolve(to, this.$route).route;
          return {
            path: route.path,
            hash: route.hash,
            query: route.query
          };
        } catch (e) {
          /* istanbul ignore next */
          return {};
        }
      },
      guessCurrentPage: function guessCurrentPage() {
        var guess = this.computedValue;
        var $router = this.$router;
        var $route = this.$route; // This section only occurs if we are client side, or server-side with $router

        /* istanbul ignore else */

        if (!this.noPageDetect && !guess && (isBrowser || !isBrowser && $router)) {
          // Current route (if router available)
          var currRoute = $router && $route ? {
            path: $route.path,
            hash: $route.hash,
            query: $route.query
          } : {}; // Current page full HREF (if client side). Can't be done as a computed prop!

          var loc = isBrowser ? window.location || document.location : null;
          var currLink = loc ? {
            path: loc.pathname,
            hash: loc.hash,
            query: parseQuery(loc.search)
          } : {}; // Loop through the possible pages looking for a match until found

          for (var page = 1; !guess && page <= this.localNumberOfPages; page++) {
            var to = this.makeLink(page);

            if ($router && (isObject(to) || this.useRouter)) {
              // Resolve the page via the $router
              guess = looseEqual(this.resolveRoute(to), currRoute) ? page : null;
            } else if (isBrowser) {
              // If no $router available (or !this.useRouter when `to` is a string)
              // we compare using parsed URIs
              guess = looseEqual(this.resolveLink(to), currLink) ? page : null;
            } else {
              // probably SSR, but no $router so we can't guess, so lets break out of
              // the loop early

              /* istanbul ignore next */
              guess = -1;
            }
          }
        } // We set currentPage to 0 to trigger an $emit('input', null)
        // As the default for this.currentPage is -1 when no value is specified
        // And valid page numbers are greater than 0


        this.currentPage = guess > 0 ? guess : 0;
      }
    }
  });

  var PaginationNavPlugin =
  /*#__PURE__*/
  pluginFactory({
    components: {
      BPaginationNav: BPaginationNav
    }
  });

  // Base on-demand component for tooltip / popover templates
  var NAME$l = 'BVPopper';
  var AttachmentMap$1 = {
    AUTO: 'auto',
    TOP: 'top',
    RIGHT: 'right',
    BOTTOM: 'bottom',
    LEFT: 'left',
    TOPLEFT: 'top',
    TOPRIGHT: 'top',
    RIGHTTOP: 'right',
    RIGHTBOTTOM: 'right',
    BOTTOMLEFT: 'bottom',
    BOTTOMRIGHT: 'bottom',
    LEFTTOP: 'left',
    LEFTBOTTOM: 'left'
  };
  var OffsetMap = {
    AUTO: 0,
    TOPLEFT: -1,
    TOP: 0,
    TOPRIGHT: +1,
    RIGHTTOP: -1,
    RIGHT: 0,
    RIGHTBOTTOM: +1,
    BOTTOMLEFT: -1,
    BOTTOM: 0,
    BOTTOMRIGHT: +1,
    LEFTTOP: -1,
    LEFT: 0,
    LEFTBOTTOM: +1
  }; // @vue/component

  var BVPopper =
  /*#__PURE__*/
  Vue.extend({
    name: NAME$l,
    props: {
      target: {
        // Element that the tooltip/popover is positioned relative to
        type: [HTMLElement, SVGElement],
        default: null
      },
      placement: {
        type: String,
        default: 'top'
      },
      fallbackPlacement: {
        type: [String, Array],
        default: 'flip'
      },
      offset: {
        type: Number,
        default: 0
      },
      boundary: {
        // 'scrollParent', 'viewport', 'window', or Element
        type: [String, HTMLElement],
        default: 'scrollParent'
      },
      boundaryPadding: {
        // Tooltip/popover will try and stay away from
        // boundary edge by this many pixels
        type: Number,
        default: 5
      },
      arrowPadding: {
        // The minimum distance (in `px`) from the edge of the
        // tooltip/popover that the arrow can be positioned
        type: Number,
        default: 6
      }
    },
    data: function data() {
      return {
        // reactive props set by parent
        noFade: false,
        // State related data
        localShow: true,
        attachment: this.getAttachment(this.placement)
      };
    },
    computed: {
      templateType: function templateType()
      /* istanbul ignore next */
      {
        // Overridden by template component
        return 'unknown';
      },
      popperConfig: function popperConfig() {
        var _this = this;

        var placement = this.placement;
        return {
          placement: this.getAttachment(placement),
          modifiers: {
            offset: {
              offset: this.getOffset(placement)
            },
            flip: {
              behavior: this.fallbackPlacement
            },
            // `arrow.element` can also be a reference to an HTML Element
            // maybe we should make this a `$ref` in the templates?
            arrow: {
              element: '.arrow'
            },
            preventOverflow: {
              padding: this.boundaryPadding,
              boundariesElement: this.boundary
            }
          },
          onCreate: function onCreate(data) {
            // Handle flipping arrow classes
            if (data.originalPlacement !== data.placement) {
              /* istanbul ignore next: can't test in JSDOM */
              _this.popperPlacementChange(data);
            }
          },
          onUpdate: function onUpdate(data) {
            // Handle flipping arrow classes
            _this.popperPlacementChange(data);
          }
        };
      }
    },
    created: function created() {
      var _this2 = this;

      // Note: We are created on-demand, and should be guaranteed that
      // DOM is rendered/ready by the time the created hook runs
      this.$_popper = null; // Ensure we show as we mount

      this.localShow = true; // Create popper instance before shown

      this.$on('show', function (el) {
        _this2.popperCreate(el);
      }); // Self destruct once hidden

      this.$on('hidden', function () {
        _this2.$nextTick(_this2.$destroy);
      }); // If parent is destroyed, ensure we are destroyed

      this.$parent.$once('hook:destroyed', this.$destroy);
    },
    beforeMount: function beforeMount() {
      // Ensure that the attachment position is correct before mounting
      // as our propsData is added after `new Template({...})`
      this.attachment = this.getAttachment(this.placement);
    },
    mounted: function mounted() {// TBD
    },
    updated: function updated() {
      // Update popper if needed
      // TODO: Should this be a watcher on `this.popperConfig` instead?
      this.popperUpdate();
    },
    beforeDestroy: function beforeDestroy() {
      this.popperDestroy();
    },
    destroyed: function destroyed() {
      // Make sure template is removed from DOM
      var el = this.$el;
      el && el.parentNode && el.parentNode.removeChild(el);
    },
    methods: {
      // "Public" method to trigger hide template
      hide: function hide() {
        this.localShow = false;
      },
      // Private
      getAttachment: function getAttachment(placement) {
        return AttachmentMap$1[String(placement).toUpperCase()] || 'auto';
      },
      getOffset: function getOffset(placement) {
        if (!this.offset) {
          // Could set a ref for the arrow element
          var arrow = this.$refs.arrow || select('.arrow', this.$el);
          var arrowOffset = (parseFloat(getCS(arrow).width) || 0) + (parseFloat(this.arrowPadding) || 0);

          switch (OffsetMap[String(placement).toUpperCase()] || 0) {
            case +1:
              /* istanbul ignore next: can't test in JSDOM */
              return "+50%p - ".concat(arrowOffset, "px");

            case -1:
              /* istanbul ignore next: can't test in JSDOM */
              return "-50%p + ".concat(arrowOffset, "px");

            default:
              return 0;
          }
        }
        /* istanbul ignore next */


        return this.offset;
      },
      popperCreate: function popperCreate(el) {
        this.popperDestroy(); // We use `el` rather than `this.$el` just in case the original
        // mountpoint root element type was changed by the template

        this.$_popper = new Popper(this.target, el, this.popperConfig);
      },
      popperDestroy: function popperDestroy() {
        this.$_popper && this.$_popper.destroy();
        this.$_popper = null;
      },
      popperUpdate: function popperUpdate() {
        this.$_popper && this.$_popper.scheduleUpdate();
      },
      popperPlacementChange: function popperPlacementChange(data) {
        // Callback used by popper to adjust the arrow placement
        this.attachment = this.getAttachment(data.placement);
      },
      renderTemplate: function renderTemplate(h)
      /* istanbul ignore next */
      {
        // Will be overridden by templates
        return h('div');
      }
    },
    render: function render(h) {
      var _this3 = this;

      // Note: `show` and 'fade' classes are only appled during transition
      return h(BVTransition, {
        // Transitions as soon as mounted
        props: {
          appear: true,
          noFade: this.noFade
        },
        on: {
          // Events used by parent component/instance
          beforeEnter: function beforeEnter(el) {
            return _this3.$emit('show', el);
          },
          afterEnter: function afterEnter(el) {
            return _this3.$emit('shown', el);
          },
          beforeLeave: function beforeLeave(el) {
            return _this3.$emit('hide', el);
          },
          afterLeave: function afterLeave(el) {
            return _this3.$emit('hidden', el);
          }
        }
      }, [this.localShow ? this.renderTemplate(h) : h()]);
    }
  });

  var NAME$m = 'BVTooltipTemplate'; // @vue/component

  var BVTooltipTemplate =
  /*#__PURE__*/
  Vue.extend({
    name: NAME$m,
    extends: BVPopper,
    mixins: [scopedStyleAttrsMixin],
    props: {
      // Other non-reactive (while open) props are pulled in from BVPopper
      id: {
        type: String,
        default: null
      },
      html: {
        // Used only by the directive versions
        type: Boolean,
        default: false
      }
    },
    data: function data() {
      // We use data, rather than props to ensure reactivity
      // Parent component will directly set this data
      return {
        title: '',
        content: '',
        variant: null,
        customClass: null
      };
    },
    computed: {
      templateType: function templateType() {
        return 'tooltip';
      },
      templateClasses: function templateClasses() {
        var _ref;

        return [(_ref = {}, _defineProperty(_ref, "b-".concat(this.templateType, "-").concat(this.variant), this.variant), _defineProperty(_ref, "bs-".concat(this.templateType, "-").concat(this.attachment), this.attachment), _ref), this.customClass];
      },
      templateAttributes: function templateAttributes() {
        return _objectSpread2({
          id: this.id,
          role: 'tooltip',
          tabindex: '-1'
        }, this.scopedStyleAttrs);
      },
      templateListeners: function templateListeners() {
        var _this = this;

        // Used for hover/focus trigger listeners
        return {
          mouseenter: function mouseenter(evt) {
            /* istanbul ignore next: difficult to test in JSDOM */
            _this.$emit('mouseenter', evt);
          },
          mouseleave: function mouseleave(evt) {
            /* istanbul ignore next: difficult to test in JSDOM */
            _this.$emit('mouseleave', evt);
          },
          focusin: function focusin(evt) {
            /* istanbul ignore next: difficult to test in JSDOM */
            _this.$emit('focusin', evt);
          },
          focusout: function focusout(evt) {
            /* istanbul ignore next: difficult to test in JSDOM */
            _this.$emit('focusout', evt);
          }
        };
      }
    },
    methods: {
      renderTemplate: function renderTemplate(h) {
        // Title can be a scoped slot function
        var $title = isFunction(this.title) ? this.title({}) : isUndefinedOrNull(this.title) ? h() : this.title; // Directive versions only

        var domProps = this.html && !isFunction(this.title) ? {
          innerHTML: this.title
        } : {};
        return h('div', {
          staticClass: 'tooltip b-tooltip',
          class: this.templateClasses,
          attrs: this.templateAttributes,
          on: this.templateListeners
        }, [h('div', {
          ref: 'arrow',
          staticClass: 'arrow'
        }), h('div', {
          staticClass: 'tooltip-inner',
          domProps: domProps
        }, [$title])]);
      }
    }
  });

  var NAME$n = 'BVTooltip'; // Modal container selector for appending tooltip/popover

  var MODAL_SELECTOR = '.modal-content'; // Modal `$root` hidden event

  var MODAL_CLOSE_EVENT = 'bv::modal::hidden'; // For dropdown sniffing

  var DROPDOWN_CLASS = 'dropdown';
  var DROPDOWN_OPEN_SELECTOR = '.dropdown-menu.show'; // Options for Native Event Listeners (since we never call preventDefault)

  var EvtOpts = {
    passive: true,
    capture: false
  }; // Data specific to popper and template
  // We don't use props, as we need reactivity (we can't pass reactive props)

  var templateData = {
    // Text string or Scoped slot function
    title: '',
    // Text string or Scoped slot function
    content: '',
    // String
    variant: null,
    // String, Array, Object
    customClass: null,
    // String or array of Strings (overwritten by BVPopper)
    triggers: '',
    // String (overwritten by BVPopper)
    placement: 'auto',
    // String or array of strings
    fallbackPlacement: 'flip',
    // Element or Component reference (or function that returns element) of
    // the element that will have the trigger events bound, and is also
    // default element for positioning
    target: null,
    // HTML ID, Element or Component reference
    container: null,
    // 'body'
    // Boolean
    noFade: false,
    // 'scrollParent', 'viewport', 'window', Element, or Component reference
    boundary: 'scrollParent',
    // Tooltip/popover will try and stay away from
    // boundary edge by this many pixels (Number)
    boundaryPadding: 5,
    // Arrow offset (Number)
    offset: 0,
    // Hover/focus delay (Number or Object)
    delay: 0,
    // Arrow of Tooltip/popover will try and stay away from
    // the edge of tooltip/popover edge by this many pixels
    arrowPadding: 6,
    // Disabled state (Boolean)
    disabled: false,
    // ID to use for tooltip/popover
    id: null,
    // Flag used by directives only, for HTML content
    html: false
  }; // @vue/component

  var BVTooltip =
  /*#__PURE__*/
  Vue.extend({
    name: NAME$n,
    props: {// None
    },
    data: function data() {
      return _objectSpread2({}, templateData, {
        // State management data
        activeTrigger: {
          // manual: false,
          hover: false,
          click: false,
          focus: false
        },
        localShow: false
      });
    },
    computed: {
      templateType: function templateType() {
        // Overwritten by BVPopover
        return 'tooltip';
      },
      computedId: function computedId() {
        return this.id || "__bv_".concat(this.templateType, "_").concat(this._uid, "__");
      },
      computedDelay: function computedDelay() {
        // Normalizes delay into object form
        var delay = {
          show: 0,
          hide: 0
        };

        if (isPlainObject(this.delay)) {
          delay.show = Math.max(parseInt(this.delay.show, 10) || 0, 0);
          delay.hide = Math.max(parseInt(this.delay.hide, 10) || 0, 0);
        } else if (isNumber(this.delay) || isString(this.delay)) {
          delay.show = delay.hide = Math.max(parseInt(this.delay, 10) || 0, 0);
        }

        return delay;
      },
      computedTriggers: function computedTriggers() {
        // Returns the triggers in sorted array form
        // TODO: Switch this to object form for easier lookup
        return concat(this.triggers).filter(Boolean).join(' ').trim().toLowerCase().split(/\s+/).sort();
      },
      isWithActiveTrigger: function isWithActiveTrigger() {
        for (var trigger in this.activeTrigger) {
          if (this.activeTrigger[trigger]) {
            return true;
          }
        }

        return false;
      },
      computedTemplateData: function computedTemplateData() {
        return {
          title: this.title,
          content: this.content,
          variant: this.variant,
          customClass: this.customClass,
          noFade: this.noFade
        };
      }
    },
    watch: {
      computedTriggers: function computedTriggers(newTriggers, oldTriggers) {
        var _this = this;

        // Triggers have changed, so re-register them

        /* istanbul ignore next */
        if (!looseEqual(newTriggers, oldTriggers)) {
          this.$nextTick(function () {
            // Disable trigger listeners
            _this.unListen(); // Clear any active triggers that are no longer in the list of triggers


            oldTriggers.forEach(function (trigger) {
              if (!arrayIncludes(newTriggers, trigger)) {
                if (_this.activeTrigger[trigger]) {
                  _this.activeTrigger[trigger] = false;
                }
              }
            }); // Re-enable the trigger listeners

            _this.listen();
          });
        }
      },
      computedTemplateData: function computedTemplateData() {
        // If any of the while open reactive "props" change,
        // ensure that the template updates accordingly
        this.handleTemplateUpdate();
      },
      disabled: function disabled(newVal) {
        newVal ? this.disable() : this.enable();
      }
    },
    created: function created() {
      var _this2 = this;

      // Create non-reactive properties
      this.$_tip = null;
      this.$_hoverTimeout = null;
      this.$_hoverState = '';
      this.$_visibleInterval = null;
      this.$_enabled = !this.disabled;

      this.$_noop = function () {}; // Destroy ourselves when the parent is destroyed


      if (this.$parent) {
        this.$parent.$once('hook:beforeDestroy', this.$destroy);
      }

      this.$nextTick(function () {
        var target = _this2.getTarget();

        if (target && contains(document.body, target)) {
          // Copy the parent's scoped style attribute
          _this2.scopeId = getScopeId(_this2.$parent); // Set up all trigger handlers and listeners

          _this2.listen();
        } else {
          /* istanbul ignore next */
          warn("".concat(_this2.templateType, " unable to find target element in document"));
        }
      });
    },
    updated: function updated()
    /* istanbul ignore next */
    {
      // Usually called when the slots/data changes
      this.$nextTick(this.handleTemplateUpdate);
    },
    deactivated: function deactivated()
    /* istanbul ignore next */
    {
      // In a keepalive that has been deactivated, so hide
      // the tooltip/popover if it is showing
      this.forceHide();
    },
    beforeDestroy: function beforeDestroy()
    /* istanbul ignore next */
    {
      // Remove all handler/listeners
      this.unListen();
      this.setWhileOpenListeners(false); // Clear any timeouts/Timers

      clearTimeout(this.$_hoverTimeout);
      this.$_hoverTimeout = null;
      this.destroyTemplate();
      this.restoreTitle();
    },
    methods: {
      //
      // Methods for creating and destroying the template
      //
      getTemplate: function getTemplate() {
        // Overridden by BVPopover
        return BVTooltipTemplate;
      },
      updateData: function updateData() {
        var _this3 = this;

        var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        // Method for updating popper/template data
        // We only update data if it exists, and has not changed
        var titleUpdated = false;
        keys(templateData).forEach(function (prop) {
          if (!isUndefined(data[prop]) && _this3[prop] !== data[prop]) {
            _this3[prop] = data[prop];

            if (prop === 'title') {
              titleUpdated = true;
            }
          }
        });

        if (titleUpdated && this.localShow) {
          // If the title has updated, we may need to handle the title
          // attribute on the trigger target. We only do this while the
          // template is open
          this.fixTitle();
        }
      },
      createTemplateAndShow: function createTemplateAndShow() {
        // Creates the template instance and show it
        // this.destroyTemplate()
        var container = this.getContainer();
        var Template = this.getTemplate();
        var $tip = this.$_tip = new Template({
          parent: this,
          // The following is not reactive to changes in the props data
          propsData: {
            // These values cannot be changed while template is showing
            id: this.computedId,
            html: this.html,
            placement: this.placement,
            fallbackPlacement: this.fallbackPlacement,
            target: this.getPlacementTarget(),
            boundary: this.getBoundary(),
            // Ensure the following are integers
            offset: parseInt(this.offset, 10) || 0,
            arrowPadding: parseInt(this.arrowPadding, 10) || 0,
            boundaryPadding: parseInt(this.boundaryPadding, 10) || 0
          }
        }); // We set the initial reactive data (values that can be changed while open)

        this.handleTemplateUpdate(); // Template transition phase events (handled once only)
        // When the template has mounted, but not visibly shown yet

        $tip.$once('show', this.onTemplateShow); // When the template has completed showing

        $tip.$once('shown', this.onTemplateShown); // When the template has started to hide

        $tip.$once('hide', this.onTemplateHide); // When the template has completed hiding

        $tip.$once('hidden', this.onTemplateHidden); // When the template gets destroyed for any reason

        $tip.$once('hook:destroyed', this.destroyTemplate); // Convenience events from template
        // To save us from manually adding/removing DOM
        // listeners to tip element when it is open

        $tip.$on('focusin', this.handleEvent);
        $tip.$on('focusout', this.handleEvent);
        $tip.$on('mouseenter', this.handleEvent);
        $tip.$on('mouseleave', this.handleEvent); // Mount (which triggers the `show`)

        $tip.$mount(container.appendChild(document.createElement('div'))); // Template will automatically remove its markup from DOM when hidden
      },
      hideTemplate: function hideTemplate() {
        // Trigger the template to start hiding
        // The template will emit the `hide` event after this and
        // then emit the `hidden` event once it is fully hidden
        // The `hook:destroyed` will also be called (safety measure)
        this.$_tip && this.$_tip.hide();
      },
      destroyTemplate: function destroyTemplate() {
        // Destroy the template instance and reset state
        this.setWhileOpenListeners(false);
        clearTimeout(this.$_hoverTimeout);
        this.$_hoverTimout = null;
        this.$_hoverState = '';
        this.clearActiveTriggers();
        this.localPlacementTarget = null;

        try {
          this.$_tip && this.$_tip.$destroy();
        } catch (_unused) {}

        this.$_tip = null;
        this.localShow = false;
      },
      getTemplateElement: function getTemplateElement() {
        return this.$_tip ? this.$_tip.$el : null;
      },
      handleTemplateUpdate: function handleTemplateUpdate() {
        var _this4 = this;

        // Update our template title/content "props"
        // So that the template updates accordingly
        var $tip = this.$_tip;

        if ($tip) {
          var props = ['title', 'content', 'variant', 'customClass', 'noFade']; // Only update the values if they have changed

          props.forEach(function (prop) {
            if ($tip[prop] !== _this4[prop]) {
              $tip[prop] = _this4[prop];
            }
          });
        }
      },
      //
      // Show and Hide handlers
      //
      show: function show() {
        // Show the tooltip
        var target = this.getTarget();

        if (!target || !contains(document.body, target) || !isVisible(target) || this.dropdownOpen() || (isUndefinedOrNull(this.title) || this.title === '') && (isUndefinedOrNull(this.content) || this.content === '')) {
          // If trigger element isn't in the DOM or is not visible, or
          // is on an open dropdown toggle, or has no content, then
          // we exit without showing
          return;
        }

        if (this.$_tip || this.localShow) {
          // If tip already exists, exit early

          /* istanbul ignore next */
          return;
        } // In the process of showing


        this.localShow = true; // Create a cancelable BvEvent

        var showEvt = this.buildEvent('show', {
          cancelable: true
        });
        this.emitEvent(showEvt);
        /* istanbul ignore next: ignore for now */

        if (showEvt.defaultPrevented) {
          // Don't show if event cancelled
          // Destroy the template (if for some reason it was created)

          /* istanbul ignore next */
          this.destroyTemplate(); // Clear the localShow flag

          /* istanbul ignore next */

          this.localShow = false;
          /* istanbul ignore next */

          return;
        } // Fix the title attribute on target


        this.fixTitle(); // Set aria-describedby on target

        this.addAriaDescribedby(); // Create and show the tooltip

        this.createTemplateAndShow();
      },
      hide: function hide() {
        var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        // Hide the tooltip
        var tip = this.getTemplateElement();

        if (!tip || !this.localShow) {
          /* istanbul ignore next */
          this.restoreTitle();
          /* istanbul ignore next */

          return;
        } // Emit cancelable BvEvent 'hide'
        // We disable cancelling if `force` is true


        var hideEvt = this.buildEvent('hide', {
          cancelable: !force
        });
        this.emitEvent(hideEvt);
        /* istanbul ignore next: ignore for now */

        if (hideEvt.defaultPrevented) {
          // Don't hide if event cancelled

          /* istanbul ignore next */
          return;
        } // Tell the template to hide


        this.hideTemplate(); // TODO: The following could be added to `hideTemplate()`
        // Clear out any stragging active triggers

        this.clearActiveTriggers(); // Reset the hover state

        this.$_hoverState = '';
      },
      forceHide: function forceHide() {
        // Forcefully hides/destroys the template, regardless of any active triggers
        var tip = this.getTemplateElement();

        if (!tip || !this.localShow) {
          /* istanbul ignore next */
          return;
        } // Disable while open listeners/watchers
        // This is also done in the template `hide` evt handler


        this.setWhileOpenListeners(false); // Clear any hover enter/leave event

        clearTimeout(this.hoverTimeout);
        this.$_hoverTimeout = null;
        this.$_hoverState = '';
        this.clearActiveTriggers(); // Disable the fade animation on the template

        if (this.$_tip) {
          this.$_tip.noFade = true;
        } // Hide the tip (with force = true)


        this.hide(true);
      },
      enable: function enable() {
        this.$_enabled = true; // Create a non-cancelable BvEvent

        this.emitEvent(this.buildEvent('enabled', {}));
      },
      disable: function disable() {
        this.$_enabled = false; // Create a non-cancelable BvEvent

        this.emitEvent(this.buildEvent('disabled', {}));
      },
      //
      // Handlers for template events
      //
      onTemplateShow: function onTemplateShow() {
        // When template is inserted into DOM, but not yet shown
        // Enable while open listeners/watchers
        this.setWhileOpenListeners(true);
      },
      onTemplateShown: function onTemplateShown() {
        // When template show transition completes
        var prevHoverState = this.$_hoverState;
        this.$_hoverState = '';

        if (prevHoverState === 'out') {
          this.leave(null);
        } // Emit a non-cancelable BvEvent 'shown'


        this.emitEvent(this.buildEvent('shown', {}));
      },
      onTemplateHide: function onTemplateHide() {
        // When template is starting to hide
        // Disable while open listeners/watchers
        this.setWhileOpenListeners(false);
      },
      onTemplateHidden: function onTemplateHidden() {
        // When template has completed closing (just before it self destructs)
        // TODO:
        //   The next two lines could be moved into `destroyTemplate()`
        this.removeAriaDescribedby();
        this.restoreTitle();
        this.destroyTemplate(); // Emit a non-cancelable BvEvent 'shown'

        this.emitEvent(this.buildEvent('hidden', {}));
      },
      //
      // Utility methods
      //
      getTarget: function getTarget() {
        // Handle case where target may be a component ref
        var target = this.target ? this.target.$el || this.target : null; // If an ID

        target = isString(target) ? getById(target.replace(/^#/, '')) : target; // If a function

        target = isFunction(target) ? target() : target; // If an element ref

        return isElement(target) ? target : null;
      },
      getPlacementTarget: function getPlacementTarget() {
        // This is the target that the tooltip will be placed on, which may not
        // necessarily be the same element that has the trigger event listeners
        // For now, this is the same as target
        // TODO:
        //   Add in child selector support
        //   Add in visibility checks for this element
        //   Fallback to target if not found
        return this.getTarget();
      },
      getTargetId: function getTargetId() {
        // Returns the ID of the trigger element
        var target = this.getTarget();
        return target && target.id ? target.id : null;
      },
      getContainer: function getContainer() {
        // Handle case where container may be a component ref
        var container = this.container ? this.container.$el || this.container : false;
        var body = document.body;
        var target = this.getTarget(); // If we are in a modal, we append to the modal instead
        // of body, unless a container is specified
        // TODO:
        //   Template should periodically check to see if it is in dom
        //   And if not, self destruct (if container got v-if'ed out of DOM)
        //   Or this could possibly be part of the visibility check

        return container === false ? closest(MODAL_SELECTOR, target) || body : isString(container) ? getById(container.replace(/^#/, '')) || body : body;
      },
      getBoundary: function getBoundary() {
        return this.boundary ? this.boundary.$el || this.boundary : 'scrollParent';
      },
      isInModal: function isInModal() {
        var target = this.getTarget();
        return target && closest(MODAL_SELECTOR, target);
      },
      isDropdown: function isDropdown() {
        // Returns true if trigger is a dropdown
        var target = this.getTarget();
        return target && hasClass(target, DROPDOWN_CLASS);
      },
      dropdownOpen: function dropdownOpen() {
        // Returns true if trigger is a dropdown and the dropdown menu is open
        var target = this.getTarget();
        return this.isDropdown() && target && select(DROPDOWN_OPEN_SELECTOR, target);
      },
      clearActiveTriggers: function clearActiveTriggers() {
        for (var trigger in this.activeTrigger) {
          this.activeTrigger[trigger] = false;
        }
      },
      addAriaDescribedby: function addAriaDescribedby() {
        // Add aria-describedby on trigger element, without removing any other IDs
        var target = this.getTarget();
        var desc = getAttr(target, 'aria-describedby') || '';
        desc = desc.split(/\s+/).concat(this.computedId).join(' ').trim(); // Update/add aria-described by

        setAttr(target, 'aria-describedby', desc);
      },
      removeAriaDescribedby: function removeAriaDescribedby() {
        var _this5 = this;

        // Remove aria-describedby on trigger element, without removing any other IDs
        var target = this.getTarget();
        var desc = getAttr(target, 'aria-describedby') || '';
        desc = desc.split(/\s+/).filter(function (d) {
          return d !== _this5.computedId;
        }).join(' ').trim(); // Update or remove aria-describedby

        if (desc) {
          /* istanbul ignore next */
          setAttr(target, 'aria-describedby', desc);
        } else {
          removeAttr(target, 'aria-describedby');
        }
      },
      fixTitle: function fixTitle() {
        // If the target has a title attribute, null it out and
        // store on data-title
        var target = this.getTarget();

        if (target && getAttr(target, 'title')) {
          // We only update title attribute if it has a value
          setAttr(target, 'data-original-title', getAttr(target, 'title') || '');
          setAttr(target, 'title', '');
        }
      },
      restoreTitle: function restoreTitle() {
        // If target had a title, restore the title attribute
        // and remove the data-title attribute
        var target = this.getTarget();

        if (target && hasAttr(target, 'data-original-title')) {
          setAttr(target, 'title', getAttr(target, 'data-original-title') || '');
          removeAttr(target, 'data-original-title');
        }
      },
      //
      // BvEvent helpers
      //
      buildEvent: function buildEvent(type) {
        var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        // Defaults to a non-cancellable event
        return new BvEvent(type, _objectSpread2({
          cancelable: false,
          target: this.getTarget(),
          relatedTarget: this.getTemplateElement() || null,
          componentId: this.computedId,
          vueTarget: this
        }, opts));
      },
      emitEvent: function emitEvent(bvEvt) {
        // Emits a BvEvent on $root and this instance
        var evtName = bvEvt.type;
        var $root = this.$root;

        if ($root && $root.$emit) {
          // Emit an event on $root
          $root.$emit("bv::".concat(this.templateType, "::").concat(evtName), bvEvt);
        }

        this.$emit(evtName, bvEvt);
      },
      //
      // Event handler setup methods
      //
      listen: function listen() {
        var _this6 = this;

        // Enable trigger event handlers
        var el = this.getTarget();

        if (!el) {
          /* istanbul ignore next */
          return;
        } // Listen for global show/hide events


        this.setRootListener(true); // Set up our listeners on the target trigger element

        this.computedTriggers.forEach(function (trigger) {
          if (trigger === 'click') {
            eventOn(el, 'click', _this6.handleEvent, EvtOpts);
          } else if (trigger === 'focus') {
            eventOn(el, 'focusin', _this6.handleEvent, EvtOpts);
            eventOn(el, 'focusout', _this6.handleEvent, EvtOpts);
          } else if (trigger === 'blur') {
            // Used to close $tip when element looses focus

            /* istanbul ignore next */
            eventOn(el, 'focusout', _this6.handleEvent, EvtOpts);
          } else if (trigger === 'hover') {
            eventOn(el, 'mouseenter', _this6.handleEvent, EvtOpts);
            eventOn(el, 'mouseleave', _this6.handleEvent, EvtOpts);
          }
        }, this);
      },
      unListen: function unListen()
      /* istanbul ignore next */
      {
        var _this7 = this;

        // Remove trigger event handlers
        var events = ['click', 'focusin', 'focusout', 'mouseenter', 'mouseleave'];
        var target = this.getTarget(); // Stop listening for global show/hide/enable/disable events

        this.setRootListener(false); // Clear out any active target listeners

        events.forEach(function (evt) {
          target && eventOff(target, evt, _this7.handleEvent, EvtOpts);
        }, this);
      },
      setRootListener: function setRootListener(on) {
        // Listen for global `bv::{hide|show}::{tooltip|popover}` hide request event
        var $root = this.$root;

        if ($root) {
          var method = on ? '$on' : '$off';
          var type = this.templateType;
          $root[method]("bv::hide::".concat(type), this.doHide);
          $root[method]("bv::show::".concat(type), this.doShow);
          $root[method]("bv::disable::".concat(type), this.doDisable);
          $root[method]("bv::enable::".concat(type), this.doEnable);
        }
      },
      setWhileOpenListeners: function setWhileOpenListeners(on) {
        // Events that are only registered when the template is showing
        // Modal close events
        this.setModalListener(on); // Dropdown open events (if we are attached to a dropdown)

        this.setDropdownListener(on); // Periodic $element visibility check
        // For handling when tip target is in <keepalive>, tabs, carousel, etc

        this.visibleCheck(on); // On-touch start listeners

        this.setOnTouchStartListener(on);
      },
      visibleCheck: function visibleCheck(on) {
        var _this8 = this;

        // Handler for periodic visibility check
        clearInterval(this.$_visibleInterval);
        this.$_visibleInterval = null;
        var target = this.getTarget();
        var tip = this.getTemplateElement();

        if (on) {
          this.visibleInterval = setInterval(function () {
            if (tip && _this8.localShow && (!target.parentNode || !isVisible(target))) {
              // Target element is no longer visible or not in DOM, so force-hide the tooltip
              _this8.forceHide();
            }
          }, 100);
        }
      },
      setModalListener: function setModalListener(on) {
        // Handle case where tooltip/target is in a modal
        if (this.isInModal()) {
          // We can listen for modal hidden events on `$root`
          this.$root[on ? '$on' : '$off'](MODAL_CLOSE_EVENT, this.forceHide);
        }
      },
      setOnTouchStartListener: function setOnTouchStartListener(on)
      /* istanbul ignore next: JSDOM doesn't support `ontouchstart` */
      {
        var _this9 = this;

        // If this is a touch-enabled device we add extra empty
        // `mouseover` listeners to the body's immediate children
        // Only needed because of broken event delegation on iOS
        // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html
        if ('ontouchstart' in document.documentElement) {
          var method = on ? eventOn : eventOff;
          from(document.body.children).forEach(function (el) {
            method(el, 'mouseover', _this9.$_noop);
          });
        }
      },
      setDropdownListener: function setDropdownListener(on) {
        var target = this.getTarget();

        if (!target || !this.$root || !this.isDropdown) {
          return;
        } // We can listen for dropdown shown events on it's instance
        // TODO:
        //   We could grab the ID from the dropdown, and listen for
        //   $root events for that particular dropdown id
        //   Dropdown shown and hidden events will need to emit
        //   Note: Dropdown auto-ID happens in a `$nextTick()` after mount
        //         So the ID lookup would need to be done in a `$nextTick()`


        if (target.__vue__) {
          target.__vue__[on ? '$on' : '$off']('shown', this.forceHide);
        }
      },
      //
      // Event handlers
      //
      handleEvent: function handleEvent(evt) {
        // General trigger event handler
        // target is the trigger element
        var target = this.getTarget();

        if (!target || isDisabled(target) || !this.$_enabled || this.dropdownOpen()) {
          // If disabled or not enabled, or if a dropdown that is open, don't do anything
          // If tip is shown before element gets disabled, then tip will not
          // close until no longer disabled or forcefully closed
          return;
        }

        var type = evt.type;
        var triggers = this.computedTriggers;

        if (type === 'click' && arrayIncludes(triggers, 'click')) {
          this.click(evt);
        } else if (type === 'mouseenter' && arrayIncludes(triggers, 'hover')) {
          // `mouseenter` is a non-bubbling event
          this.enter(evt);
        } else if (type === 'focusin' && arrayIncludes(triggers, 'focus')) {
          // `focusin` is a bubbling event
          // `evt` includes `relatedTarget` (element loosing focus)
          this.enter(evt);
        } else if (type === 'focusout' && (arrayIncludes(triggers, 'focus') || arrayIncludes(triggers, 'blur')) || type === 'mouseleave' && arrayIncludes(triggers, 'hover')) {
          // `focusout` is a bubbling event
          // `mouseleave` is a non-bubbling event
          // `tip` is the template (will be null if not open)
          var tip = this.getTemplateElement(); // `evtTarget` is the element which is loosing focus/hover and

          var evtTarget = evt.target; // `relatedTarget` is the element gaining focus/hover

          var relatedTarget = evt.relatedTarget;
          /* istanbul ignore next */

          if ( // From tip to target
          tip && contains(tip, evtTarget) && contains(target, relatedTarget) || // From target to tip
          tip && contains(target, evtTarget) && contains(tip, relatedTarget) || // Within tip
          tip && contains(tip, evtTarget) && contains(tip, relatedTarget) || // Within target
          contains(target, evtTarget) && contains(target, relatedTarget)) {
            // If focus/hover moves within `tip` and `target`, don't trigger a leave
            return;
          } // Otherwise trigger a leave


          this.leave(evt);
        }
      },
      doHide: function doHide(id) {
        // Programmatically hide tooltip or popover
        if (!id || this.getTargetId() === id || this.computedId === id) {
          // Close all tooltips or popovers, or this specific tip (with ID)
          this.forceHide();
        }
      },
      doShow: function doShow(id) {
        // Programmatically show tooltip or popover
        if (!id || this.getTargetId() === id || this.computedId === id) {
          // Open all tooltips or popovers, or this specific tip (with ID)
          this.show();
        }
      },
      doDisable: function doDisable(id)
      /*istanbul ignore next: ignore for now */
      {
        // Programmatically disable tooltip or popover
        if (!id || this.getTargetId() === id || this.computedId === id) {
          // Disable all tooltips or popovers (no ID), or this specific tip (with ID)
          this.disable();
        }
      },
      doEnable: function doEnable(id)
      /*istanbul ignore next: ignore for now */
      {
        // Programmatically enable tooltip or popover
        if (!id || this.getTargetId() === id || this.computedId === id) {
          // Enable all tooltips or popovers (no ID), or this specific tip (with ID)
          this.enable();
        }
      },
      click: function click(evt) {
        if (!this.$_enabled || this.dropdownOpen()) {
          /* istanbul ignore next */
          return;
        }

        this.activeTrigger.click = !this.activeTrigger.click;

        if (this.isWithActiveTrigger) {
          this.enter(null);
        } else {
          /* istanbul ignore next */
          this.leave(null);
        }
      },
      toggle: function toggle()
      /* istanbul ignore next */
      {
        // Manual toggle handler
        if (!this.$_enabled || this.dropdownOpen()) {
          /* istanbul ignore next */
          return;
        } // Should we register as an active trigger?
        // this.activeTrigger.manual = !this.activeTrigger.manual


        if (this.localShow) {
          this.leave(null);
        } else {
          this.enter(null);
        }
      },
      enter: function enter() {
        var _this10 = this;

        var evt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

        // Opening trigger handler
        // Note: Click events are sent with evt === null
        if (evt) {
          this.activeTrigger[evt.type === 'focusin' ? 'focus' : 'hover'] = true;
        }
        /* istanbul ignore next */


        if (this.localShow || this.$_hoverState === 'in') {
          this.$_hoverState = 'in';
          return;
        }

        clearTimeout(this.hoverTimeout);
        this.$_hoverState = 'in';

        if (!this.computedDelay.show) {
          this.show();
        } else {
          // Hide any title attribute while enter delay is active
          this.fixTitle();
          this.hoverTimeout = setTimeout(function () {
            /* istanbul ignore else */
            if (_this10.$_hoverState === 'in') {
              _this10.show();
            } else if (!_this10.localShow) {
              _this10.restoreTitle();
            }
          }, this.computedDelay.show);
        }
      },
      leave: function leave() {
        var _this11 = this;

        var evt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

        // Closing trigger handler
        // Note: Click events are sent with evt === null
        if (evt) {
          this.activeTrigger[evt.type === 'focusout' ? 'focus' : 'hover'] = false;
          /* istanbul ignore next */

          if (evt.type === 'focusout' && arrayIncludes(this.computedTriggers, 'blur')) {
            // Special case for `blur`: we clear out the other triggers
            this.activeTrigger.click = false;
            this.activeTrigger.hover = false;
          }
        }
        /* istanbul ignore next: ignore for now */


        if (this.isWithActiveTrigger) {
          return;
        }

        clearTimeout(this.hoverTimeout);
        this.$_hoverState = 'out';

        if (!this.computedDelay.hide) {
          this.hide();
        } else {
          this.$hoverTimeout = setTimeout(function () {
            if (_this11.$_hoverState === 'out') {
              _this11.hide();
            }
          }, this.computedDelay.hide);
        }
      }
    }
  });

  var NAME$o = 'BTooltip'; // @vue/component

  var BTooltip =
  /*#__PURE__*/
  Vue.extend({
    name: NAME$o,
    props: {
      title: {
        type: String // default: undefined

      },
      // Added in by BPopover
      // content: {
      //   type: String,
      //   default: undefined
      // },
      target: {
        // String ID of element, or element/component reference
        // Or function that returns one of the above
        type: [String, HTMLElement, SVGElement, Function, Object],
        // default: undefined,
        required: true
      },
      triggers: {
        type: [String, Array],
        default: 'hover focus'
      },
      placement: {
        type: String,
        default: 'top'
      },
      fallbackPlacement: {
        type: [String, Array],
        default: 'flip',
        validator: function validator(value) {
          return isArray(value) && value.every(function (v) {
            return isString(v);
          }) || arrayIncludes(['flip', 'clockwise', 'counterclockwise'], value);
        }
      },
      variant: {
        type: String,
        default: function _default() {
          return getComponentConfig(NAME$o, 'variant');
        }
      },
      customClass: {
        type: String,
        default: function _default() {
          return getComponentConfig(NAME$o, 'customClass');
        }
      },
      delay: {
        type: [Number, Object, String],
        default: function _default() {
          return getComponentConfig(NAME$o, 'delay');
        }
      },
      boundary: {
        // String: scrollParent, window, or viewport
        // Element: element reference
        // Object: Vue component
        type: [String, HTMLElement, Object],
        default: function _default() {
          return getComponentConfig(NAME$o, 'boundary');
        }
      },
      boundaryPadding: {
        type: [Number, String],
        default: function _default() {
          return getComponentConfig(NAME$o, 'boundaryPadding');
        }
      },
      offset: {
        type: [Number, String],
        default: 0
      },
      noFade: {
        type: Boolean,
        default: false
      },
      container: {
        // String: HTML ID of container, if null body is used (default)
        // HTMLElement: element reference reference
        // Object: Vue Component
        type: [String, HTMLElement, Object] // default: undefined

      },
      show: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      id: {
        // ID to use for tooltip element
        // If not provided on will automatically be generated
        type: String,
        default: null
      }
    },
    data: function data() {
      return {
        localShow: this.show,
        localTitle: '',
        localContent: ''
      };
    },
    computed: {
      templateData: function templateData() {
        // Data that will be passed to the template and popper
        return {
          // We use massaged versions of the title and content props/slots
          title: this.localTitle,
          content: this.localContent,
          // Pass these props as is
          target: this.target,
          triggers: this.triggers,
          placement: this.placement,
          fallbackPlacement: this.fallbackPlacement,
          variant: this.variant,
          customClass: this.customClass,
          container: this.container,
          boundary: this.boundary,
          boundaryPadding: this.boundaryPadding,
          delay: this.delay,
          offset: this.offset,
          noFade: this.noFade,
          disabled: this.disabled,
          id: this.id
        };
      },
      templateTitleContent: function templateTitleContent() {
        // Used to watch for changes to the title and content props
        return {
          title: this.title,
          content: this.content
        };
      }
    },
    watch: {
      show: function show(_show, oldVal) {
        if (_show !== oldVal && _show !== this.localShow && this.$_bv_toolpop) {
          if (_show) {
            this.$_bv_toolpop.show();
          } else {
            // We use `forceHide()` to override any active triggers
            this.$_bv_toolpop.forceHide();
          }
        }
      },
      disabled: function disabled(newVal, oldVal) {
        if (newVal) {
          this.doDisable();
        } else {
          this.doEnable();
        }
      },
      localShow: function localShow(show, oldVal) {
        // TODO: May need to be done in a `$nextTick()`
        this.$emit('update:show', show);
      },
      templateData: function templateData(newVal, oldVal) {
        var _this = this;

        this.$nextTick(function () {
          if (_this.$_bv_toolpop) {
            _this.$_bv_toolpop.updateData(_this.templateData);
          }
        });
      },
      // Watchers for title/content props (prop changes do not trigger the `updated()` hook)
      templateTitleContent: function templateTitleContent(newVal, oldVal) {
        this.$nextTick(this.updateContent);
      }
    },
    created: function created() {
      // Non reactive properties
      this.$_bv_toolpop = null;
    },
    updated: function updated() {
      // Update the `propData` object
      // Done in a `$nextTick()` to ensure slot(s) have updated
      this.$nextTick(this.updateContent);
    },
    beforeDestroy: function beforeDestroy() {
      // Shutdown our local event listeners
      this.$off('open', this.doOpen);
      this.$off('close', this.doClose);
      this.$off('disable', this.doDisable);
      this.$off('enable', this.doEnable); // Destroy the tip instance

      this.$_bv_toolpop && this.$_bv_toolpop.$destroy();
      this.$_bv_toolpop = null;
    },
    mounted: function mounted() {
      var _this2 = this;

      // Instantiate a new BVTooltip instance
      // Done in a `$nextTick()` to ensure DOM has completed rendering
      // so that target can be found
      this.$nextTick(function () {
        // Load the on demand child instance
        var Component = _this2.getComponent(); // Ensure we have initial content


        _this2.updateContent(); // Pass down the scoped style attribute if available


        var scopeId = getScopeId(_this2) || getScopeId(_this2.$parent); // Create the instance

        var $toolpop = _this2.$_bv_toolpop = new Component({
          parent: _this2,
          // Pass down the scoped style ID
          _scopeId: scopeId || undefined
        }); // Set the initial data

        $toolpop.updateData(_this2.templateData); // Set listeners

        $toolpop.$on('show', _this2.onShow);
        $toolpop.$on('shown', _this2.onShown);
        $toolpop.$on('hide', _this2.onHide);
        $toolpop.$on('hidden', _this2.onHidden);
        $toolpop.$on('disabled', _this2.onDisabled);
        $toolpop.$on('enabled', _this2.onEnabled); // Initially disabled?

        if (_this2.disabled) {
          // Initially disabled
          _this2.doDisable();
        } // Listen to open signals from others


        _this2.$on('open', _this2.doOpen); // Listen to close signals from others


        _this2.$on('close', _this2.doClose); // Listen to disable signals from others


        _this2.$on('disable', _this2.doDisable); // Listen to enable signals from others


        _this2.$on('enable', _this2.doEnable); // Initially show tooltip?


        if (_this2.localShow) {
          _this2.$_bv_toolpop && _this2.$_bv_toolpop.show();
        }
      });
    },
    methods: {
      getComponent: function getComponent() {
        // Overridden by BPopover
        return BVTooltip;
      },
      updateContent: function updateContent() {
        // Overridden by BPopover
        // Tooltip: Default slot is `title`
        // Popover: Default slot is `content`, `title` slot is title
        // We pass a scoped slot function reference by default (Vue v2.6x)
        // And pass the title prop as a fallback
        this.setTitle(this.$scopedSlots.default || this.title);
      },
      // Helper methods for `updateContent()`
      setTitle: function setTitle(val) {
        val = isUndefinedOrNull(val) ? '' : val; // We only update the value if it has changed

        if (this.localTitle !== val) {
          this.localTitle = val;
        }
      },
      setContent: function setContent(val) {
        val = isUndefinedOrNull(val) ? '' : val; // We only update the value if it has changed

        if (this.localContent !== val) {
          this.localContent = val;
        }
      },
      // --- Template event handlers ---
      onShow: function onShow(bvEvt) {
        // Placeholder
        this.$emit('show', bvEvt);

        if (bvEvt) {
          this.localShow = !bvEvt.defaultPrevented;
        }
      },
      onShown: function onShown(bvEvt) {
        // Tip is now showing
        this.localShow = true;
        this.$emit('shown', bvEvt);
      },
      onHide: function onHide(bvEvt) {
        this.$emit('hide', bvEvt);
      },
      onHidden: function onHidden(bvEvt) {
        // Tip is no longer showing
        this.$emit('hidden', bvEvt);
        this.localShow = false;
      },
      onDisabled: function onDisabled(bvEvt) {
        // Prevent possible endless loop if user mistakenly
        // fires `disabled` instead of `disable`
        if (bvEvt && bvEvt.type === 'disabled') {
          this.$emit('update:disabled', true);
          this.$emit('disabled', bvEvt);
        }
      },
      onEnabled: function onEnabled(bvEvt) {
        // Prevent possible endless loop if user mistakenly
        // fires `enabled` instead of `enable`
        if (bvEvt && bvEvt.type === 'enabled') {
          this.$emit('update:disabled', false);
          this.$emit('enabled', bvEvt);
        }
      },
      // --- Local event listeners ---
      doOpen: function doOpen() {
        !this.localShow && this.$_bv_toolpop && this.$_bv_toolpop.show();
      },
      doClose: function doClose() {
        this.localShow && this.$_bv_toolpop && this.$_bv_toolpop.hide();
      },
      doDisable: function doDisable(evt) {
        this.$_bv_toolpop && this.$_bv_toolpop.disable();
      },
      doEnable: function doEnable() {
        this.$_bv_toolpop && this.$_bv_toolpop.enable();
      }
    },
    render: function render(h) {
      // Always renders a comment node
      // TODO:
      //   Future: Possibly render a target slot (single root element)
      //   which we can apply the listeners to (pass `this.$el` to BVTooltip)
      return h();
    }
  });

  var NAME$p = 'BVPopoverTemplate'; // @vue/component

  var BVPopoverTemplate =
  /*#__PURE__*/
  Vue.extend({
    name: NAME$p,
    extends: BVTooltipTemplate,
    computed: {
      templateType: function templateType() {
        return 'popover';
      }
    },
    methods: {
      renderTemplate: function renderTemplate(h) {
        // Title and content could be a scoped slot function
        var $title = isFunction(this.title) ? this.title({}) : this.title;
        var $content = isFunction(this.content) ? this.content({}) : this.content; // Directive usage only

        var titleDomProps = this.html && !isFunction(this.title) ? {
          innerHTML: this.title
        } : {};
        var contentDomProps = this.html && !isFunction(this.content) ? {
          innerHTML: this.content
        } : {};
        return h('div', {
          staticClass: 'popover b-popover',
          class: this.templateClasses,
          attrs: this.templateAttributes,
          on: this.templateListeners
        }, [h('div', {
          ref: 'arrow',
          staticClass: 'arrow'
        }), isUndefinedOrNull($title) || $title === '' ? h() : h('h3', {
          staticClass: 'popover-header',
          domProps: titleDomProps
        }, [$title]), isUndefinedOrNull($content) || $content === '' ? h() : h('div', {
          staticClass: 'popover-body',
          domProps: contentDomProps
        }, [$content])]);
      }
    }
  });

  // Popover "Class" (Built as a renderless Vue instance)
  var NAME$q = 'BVPopover'; // @vue/component

  var BVPopover =
  /*#__PURE__*/
  Vue.extend({
    name: NAME$q,
    extends: BVTooltip,
    computed: {
      // Overwrites BVTooltip
      templateType: function templateType() {
        return 'popover';
      }
    },
    methods: {
      getTemplate: function getTemplate() {
        // Overwrites BVTooltip
        return BVPopoverTemplate;
      }
    }
  });

  var NAME$r = 'BPopover';
  var BPopover =
  /*#__PURE__*/
  Vue.extend({
    name: NAME$r,
    extends: BTooltip,
    inheritAttrs: false,
    props: {
      title: {
        type: String // default: undefined

      },
      content: {
        type: String // default: undefined

      },
      triggers: {
        type: [String, Array],
        default: 'click'
      },
      placement: {
        type: String,
        default: 'right'
      },
      variant: {
        type: String,
        default: function _default() {
          return getComponentConfig(NAME$r, 'variant');
        }
      },
      customClass: {
        type: String,
        default: function _default() {
          return getComponentConfig(NAME$r, 'customClass');
        }
      },
      delay: {
        type: [Number, Object, String],
        default: function _default() {
          return getComponentConfig(NAME$r, 'delay');
        }
      },
      boundary: {
        // String: scrollParent, window, or viewport
        // Element: element reference
        // Object: Vue component
        type: [String, HTMLElement, Object],
        default: function _default() {
          return getComponentConfig(NAME$r, 'boundary');
        }
      },
      boundaryPadding: {
        type: [Number, String],
        default: function _default() {
          return getComponentConfig(NAME$r, 'boundaryPadding');
        }
      }
    },
    methods: {
      getComponent: function getComponent() {
        // Overridden by BPopover
        return BVPopover;
      },
      updateContent: function updateContent() {
        // Tooltip: Default slot is `title`
        // Popover: Default slot is `content`, `title` slot is title
        // We pass a scoped slot function references by default (Vue v2.6x)
        // And pass the title prop as a fallback
        this.setContent(this.$scopedSlots.default || this.content);
        this.setTitle(this.$scopedSlots.title || this.title);
      }
    } // Render function provided by BTooltip

  });

  var BV_POPOVER = '__BV_Popover__'; // Default trigger

  var DefaultTrigger = 'click'; // Valid event triggers

  var validTriggers = {
    focus: true,
    hover: true,
    click: true,
    blur: true,
    manual: true
  }; // Directive modifier test regular expressions. Pre-compile for performance

  var htmlRE = /^html$/i;
  var noFadeRE = /^nofade$/i;
  var placementRE = /^(auto|top(left|right)?|bottom(left|right)?|left(top|bottom)?|right(top|bottom)?)$/i;
  var boundaryRE = /^(window|viewport|scrollParent)$/i;
  var delayRE = /^d\d+$/i;
  var delayShowRE = /^ds\d+$/i;
  var delayHideRE = /^dh\d+$/i;
  var offsetRE = /^o-?\d+$/i;
  var variantRE = /^v-.+$/i; // Build a Popover config based on bindings (if any)
  // Arguments and modifiers take precedence over passed value config object

  var parseBindings = function parseBindings(bindings, vnode)
  /* istanbul ignore next: not easy to test */
  {
    // We start out with a basic config
    var NAME = 'BPopover';
    var config = {
      title: undefined,
      content: undefined,
      trigger: '',
      // Default set below if needed
      placement: 'right',
      fallbackPlacement: 'flip',
      container: false,
      // Default of body
      animation: true,
      offset: 0,
      disabled: false,
      id: null,
      html: false,
      delay: getComponentConfig(NAME, 'delay'),
      boundary: String(getComponentConfig(NAME, 'boundary')),
      boundaryPadding: parseInt(getComponentConfig(NAME, 'boundaryPadding'), 10) || 0,
      variant: getComponentConfig(NAME, 'variant'),
      customClass: getComponentConfig(NAME, 'customClass')
    }; // Process `bindings.value`

    if (isString(bindings.value) || isNumber(bindings.value)) {
      // Value is popover content (html optionally supported)
      config.content = bindings.value;
    } else if (isFunction(bindings.value)) {
      // Content generator function
      config.content = bindings.value;
    } else if (isPlainObject(bindings.value)) {
      // Value is config object, so merge
      config = _objectSpread2({}, config, {}, bindings.value);
    } // If argument, assume element ID of container element


    if (bindings.arg) {
      // Element ID specified as arg
      // We must prepend '#' to become a CSS selector
      config.container = "#".concat(bindings.arg);
    } // If title is not provided, try title attribute


    if (isUndefined(config.title)) {
      // Try attribute
      var data = vnode.data || {};
      config.title = data.attrs && !isUndefinedOrNull(data.attrs.title) ? data.attrs.title : undefined;
    } // Normalize delay


    if (!isPlainObject(config.delay)) {
      config.delay = {
        show: parseInt(config.delay, 10) || 0,
        hide: parseInt(config.delay, 10) || 0
      };
    } // Process modifiers


    keys(bindings.modifiers).forEach(function (mod) {
      if (htmlRE.test(mod)) {
        // Title/content allows HTML
        config.html = true;
      } else if (noFadeRE.test(mod)) {
        // No animation
        config.animation = false;
      } else if (placementRE.test(mod)) {
        // Placement of popover
        config.placement = mod;
      } else if (boundaryRE.test(mod)) {
        // Boundary of popover
        mod = mod === 'scrollparent' ? 'scrollParent' : mod;
        config.boundary = mod;
      } else if (delayRE.test(mod)) {
        // Delay value
        var delay = parseInt(mod.slice(1), 10) || 0;
        config.delay.show = delay;
        config.delay.hide = delay;
      } else if (delayShowRE.test(mod)) {
        // Delay show value
        config.delay.show = parseInt(mod.slice(2), 10) || 0;
      } else if (delayHideRE.test(mod)) {
        // Delay hide value
        config.delay.hide = parseInt(mod.slice(2), 10) || 0;
      } else if (offsetRE.test(mod)) {
        // Offset value, negative allowed
        config.offset = parseInt(mod.slice(1), 10) || 0;
      } else if (variantRE.test(mod)) {
        // Variant
        config.variant = mod.slice(2) || null;
      }
    }); // Special handling of event trigger modifiers trigger is
    // a space separated list

    var selectedTriggers = {}; // Parse current config object trigger

    concat(config.trigger || '').filter(Boolean).join(' ').trim().toLowerCase().split(/\s+/).forEach(function (trigger) {
      if (validTriggers[trigger]) {
        selectedTriggers[trigger] = true;
      }
    }); // Parse modifiers for triggers

    keys(bindings.modifiers).forEach(function (mod) {
      mod = mod.toLowerCase();

      if (validTriggers[mod]) {
        // If modifier is a valid trigger
        selectedTriggers[mod] = true;
      }
    }); // Sanitize triggers

    config.trigger = keys(selectedTriggers).join(' ');

    if (config.trigger === 'blur') {
      // Blur by itself is useless, so convert it to 'focus'
      config.trigger = 'focus';
    }

    if (!config.trigger) {
      // Use default trigger
      config.trigger = DefaultTrigger;
    }

    return config;
  }; // Add or update Popover on our element


  var applyPopover = function applyPopover(el, bindings, vnode) {
    if (!isBrowser) {
      /* istanbul ignore next */
      return;
    }

    var config = parseBindings(bindings, vnode);

    if (!el[BV_POPOVER]) {
      var $parent = vnode.context;
      el[BV_POPOVER] = new BVPopover({
        parent: $parent,
        // Add the parent's scoped style attribute data
        _scopeId: getScopeId($parent, undefined)
      });
      el[BV_POPOVER].__bv_prev_data__ = {};
      el[BV_POPOVER].$on('show', function ()
      /* istanbul ignore next: for now */
      {
        // Before showing the popover, we update the title
        // and content if they are functions
        var data = {};

        if (isFunction(config.title)) {
          data.title = config.title(el);
        }

        if (isFunction(config.content)) {
          data.content = config.content(el);
        }

        if (keys(data).length > 0) {
          el[BV_POPOVER].updateData(data);
        }
      });
    }

    var data = {
      title: config.title,
      content: config.content,
      triggers: config.trigger,
      placement: config.placement,
      fallbackPlacement: config.fallbackPlacement,
      variant: config.variant,
      customClass: config.customClass,
      container: config.container,
      boundary: config.boundary,
      delay: config.delay,
      offset: config.offset,
      noFade: !config.animation,
      id: config.id,
      disabled: config.disabled,
      html: config.html
    };
    var oldData = el[BV_POPOVER].__bv_prev_data__;
    el[BV_POPOVER].__bv_prev_data__ = data;

    if (!looseEqual(data, oldData)) {
      // We only update the instance if data has changed
      var newData = {
        target: el
      };
      keys(data).forEach(function (prop) {
        // We only pass data properties that have changed
        if (data[prop] !== oldData[prop]) {
          // If title/content is a function, we execute it here
          newData[prop] = (prop === 'title' || prop === 'content') && isFunction(data[prop]) ? data[prop](el) : data[prop];
        }
      });
      el[BV_POPOVER].updateData(newData);
    }
  }; // Remove Popover from our element


  var removePopover = function removePopover(el) {
    if (el[BV_POPOVER]) {
      el[BV_POPOVER].$destroy();
      el[BV_POPOVER] = null;
    }

    delete el[BV_POPOVER];
  }; // Export our directive


  var VBPopover = {
    bind: function bind(el, bindings, vnode) {
      applyPopover(el, bindings, vnode);
    },
    // We use `componentUpdated` here instead of `update`, as the former
    // waits until the containing component and children have finished updating
    componentUpdated: function componentUpdated(el, bindings, vnode) {
      // Performed in a `$nextTick()` to prevent endless render/update loops
      vnode.context.$nextTick(function () {
        applyPopover(el, bindings, vnode);
      });
    },
    unbind: function unbind(el) {
      removePopover(el);
    }
  };

  var VBPopoverPlugin =
  /*#__PURE__*/
  pluginFactory({
    directives: {
      VBPopover: VBPopover
    }
  });

  var PopoverPlugin =
  /*#__PURE__*/
  pluginFactory({
    components: {
      BPopover: BPopover
    },
    plugins: {
      VBPopoverPlugin: VBPopoverPlugin
    }
  });

  var NAME$s = 'BProgressBar'; // @vue/component

  var BProgressBar =
  /*#__PURE__*/
  Vue.extend({
    name: NAME$s,
    mixins: [normalizeSlotMixin],
    inject: {
      bvProgress: {
        default: function _default()
        /* istanbul ignore next */
        {
          return {};
        }
      }
    },
    props: {
      value: {
        type: Number,
        default: 0
      },
      label: {
        type: String,
        default: null
      },
      labelHtml: {
        type: String
      },
      // $parent (this.bvProgress) prop values may take precedence over the following props
      // Which is why they are defaulted to null
      max: {
        type: Number,
        default: null
      },
      precision: {
        type: Number,
        default: null
      },
      variant: {
        type: String,
        default: function _default() {
          return getComponentConfig(NAME$s, 'variant');
        }
      },
      striped: {
        type: Boolean,
        default: null
      },
      animated: {
        type: Boolean,
        default: null
      },
      showProgress: {
        type: Boolean,
        default: null
      },
      showValue: {
        type: Boolean,
        default: null
      }
    },
    computed: {
      progressBarClasses: function progressBarClasses() {
        return [this.computedVariant ? "bg-".concat(this.computedVariant) : '', this.computedStriped || this.computedAnimated ? 'progress-bar-striped' : '', this.computedAnimated ? 'progress-bar-animated' : ''];
      },
      progressBarStyles: function progressBarStyles() {
        return {
          width: 100 * (this.value / this.computedMax) + '%'
        };
      },
      computedProgress: function computedProgress() {
        var p = Math.pow(10, this.computedPrecision);
        return Math.round(100 * p * this.value / this.computedMax) / p;
      },
      computedMax: function computedMax() {
        // Prefer our max over parent setting
        return isNumber(this.max) ? this.max : this.bvProgress.max || 100;
      },
      computedVariant: function computedVariant() {
        // Prefer our variant over parent setting
        return this.variant || this.bvProgress.variant;
      },
      computedPrecision: function computedPrecision() {
        // Prefer our precision over parent setting
        return isNumber(this.precision) ? this.precision : this.bvProgress.precision || 0;
      },
      computedStriped: function computedStriped() {
        // Prefer our striped over parent setting
        return isBoolean(this.striped) ? this.striped : this.bvProgress.striped || false;
      },
      computedAnimated: function computedAnimated() {
        // Prefer our animated over parent setting
        return isBoolean(this.animated) ? this.animated : this.bvProgress.animated || false;
      },
      computedShowProgress: function computedShowProgress() {
        // Prefer our showProgress over parent setting
        return isBoolean(this.showProgress) ? this.showProgress : this.bvProgress.showProgress || false;
      },
      computedShowValue: function computedShowValue() {
        // Prefer our showValue over parent setting
        return isBoolean(this.showValue) ? this.showValue : this.bvProgress.showValue || false;
      }
    },
    render: function render(h) {
      var childNodes = h();

      if (this.hasNormalizedSlot('default')) {
        childNodes = this.normalizeSlot('default');
      } else if (this.label || this.labelHtml) {
        childNodes = h('span', {
          domProps: htmlOrText(this.labelHtml, this.label)
        });
      } else if (this.computedShowProgress) {
        childNodes = this.computedProgress.toFixed(this.computedPrecision);
      } else if (this.computedShowValue) {
        childNodes = this.value.toFixed(this.computedPrecision);
      }

      return h('div', {
        staticClass: 'progress-bar',
        class: this.progressBarClasses,
        style: this.progressBarStyles,
        attrs: {
          role: 'progressbar',
          'aria-valuemin': '0',
          'aria-valuemax': this.computedMax.toString(),
          'aria-valuenow': this.value.toFixed(this.computedPrecision)
        }
      }, [childNodes]);
    }
  });

  var NAME$t = 'BProgress'; // @vue/component

  var BProgress =
  /*#__PURE__*/
  Vue.extend({
    name: NAME$t,
    mixins: [normalizeSlotMixin],
    provide: function provide() {
      return {
        bvProgress: this
      };
    },
    props: {
      // These props can be inherited via the child b-progress-bar(s)
      variant: {
        type: String,
        default: function _default() {
          return getComponentConfig(NAME$t, 'variant');
        }
      },
      striped: {
        type: Boolean,
        default: false
      },
      animated: {
        type: Boolean,
        default: false
      },
      height: {
        type: String,
        default: null
      },
      precision: {
        type: Number,
        default: 0
      },
      showProgress: {
        type: Boolean,
        default: false
      },
      showValue: {
        type: Boolean,
        default: false
      },
      max: {
        type: Number,
        default: 100
      },
      // This prop is not inherited by child b-progress-bar(s)
      value: {
        type: Number,
        default: 0
      }
    },
    computed: {
      progressHeight: function progressHeight() {
        return {
          height: this.height || null
        };
      }
    },
    render: function render(h) {
      var childNodes = this.normalizeSlot('default');

      if (!childNodes) {
        childNodes = h(BProgressBar, {
          props: {
            value: this.value,
            max: this.max,
            precision: this.precision,
            variant: this.variant,
            animated: this.animated,
            striped: this.striped,
            showProgress: this.showProgress,
            showValue: this.showValue
          }
        });
      }

      return h('div', {
        class: ['progress'],
        style: this.progressHeight
      }, [childNodes]);
    }
  });

  var ProgressPlugin =
  /*#__PURE__*/
  pluginFactory({
    components: {
      BProgress: BProgress,
      BProgressBar: BProgressBar
    }
  });

  var NAME$u = 'BSpinner'; // @vue/component

  var BSpinner =
  /*#__PURE__*/
  Vue.extend({
    name: NAME$u,
    functional: true,
    props: {
      type: {
        type: String,
        default: 'border' // SCSS currently supports 'border' or 'grow'

      },
      label: {
        type: String,
        default: null
      },
      variant: {
        type: String,
        default: function _default() {
          return getComponentConfig(NAME$u, 'variant');
        }
      },
      small: {
        type: Boolean,
        default: false
      },
      role: {
        type: String,
        default: 'status'
      },
      tag: {
        type: String,
        default: 'span'
      }
    },
    render: function render(h, _ref) {
      var _class;

      var props = _ref.props,
          data = _ref.data,
          slots = _ref.slots,
          scopedSlots = _ref.scopedSlots;
      var $slots = slots();
      var $scopedSlots = scopedSlots || {};
      var label = normalizeSlot('label', {}, $scopedSlots, $slots) || props.label;

      if (label) {
        label = h('span', {
          staticClass: 'sr-only'
        }, label);
      }

      return h(props.tag, a(data, {
        attrs: {
          role: label ? props.role || 'status' : null,
          'aria-hidden': label ? null : 'true'
        },
        class: (_class = {}, _defineProperty(_class, "spinner-".concat(props.type), Boolean(props.type)), _defineProperty(_class, "spinner-".concat(props.type, "-sm"), props.small), _defineProperty(_class, "text-".concat(props.variant), Boolean(props.variant)), _class)
      }), [label || h()]);
    }
  });

  var SpinnerPlugin =
  /*#__PURE__*/
  pluginFactory({
    components: {
      BSpinner: BSpinner
    }
  });

  /**
   * Converts a string, including strings in camelCase or snake_case, into Start Case (a variant
   * of Title Case where all words start with a capital letter), it keeps original single quote
   * and hyphen in the word.
   *
   * Copyright (c) 2017 Compass (MIT)
   * https://github.com/UrbanCompass/to-start-case
   * @author Zhuoyuan Zhang <https://github.com/drawyan>
   * @author Wei Wang <https://github.com/onlywei>
   *
   *
   *   'management_companies' to 'Management Companies'
   *   'managementCompanies' to 'Management Companies'
   *   `hell's kitchen` to `Hell's Kitchen`
   *   `co-op` to `Co-op`
   *
   * @param {String} str
   * @returns {String}
   */
  var startCase = function startCase(str) {
    return str.replace(/_/g, ' ').replace(/([a-z])([A-Z])/g, function (str, $1, $2) {
      return $1 + ' ' + $2;
    }).replace(/(\s|^)(\w)/g, function (str, $1, $2) {
      return $1 + $2.toUpperCase();
    });
  };

  // Constants used by table helpers
  // Object of item keys that should be ignored for headers and
  // stringification and filter events
  var IGNORED_FIELD_KEYS = {
    _rowVariant: true,
    _cellVariants: true,
    _showDetails: true
  }; // Filter CSS selector for click/dblclick/etc. events
  // If any of these selectors match the clicked element, we ignore the event

  var EVENT_FILTER = ['a', 'a *', // Include content inside links
  'button', 'button *', // Include content inside buttons
  'input:not(.disabled):not([disabled])', 'select:not(.disabled):not([disabled])', 'textarea:not(.disabled):not([disabled])', '[role="link"]', '[role="link"] *', '[role="button"]', '[role="button"] *', '[tabindex]:not(.disabled):not([disabled])'].join(',');

  var processField = function processField(key, value) {
    var field = null;

    if (isString(value)) {
      // Label shortcut
      field = {
        key: key,
        label: value
      };
    } else if (isFunction(value)) {
      // Formatter shortcut
      field = {
        key: key,
        formatter: value
      };
    } else if (isObject(value)) {
      field = clone(value);
      field.key = field.key || key;
    } else if (value !== false) {
      // Fallback to just key

      /* istanbul ignore next */
      field = {
        key: key
      };
    }

    return field;
  }; // We normalize fields into an array of objects
  // [ { key:..., label:..., ...}, {...}, ..., {..}]


  var normalizeFields = function normalizeFields(origFields, items) {
    var fields = [];

    if (isArray(origFields)) {
      // Normalize array Form
      origFields.filter(function (f) {
        return f;
      }).forEach(function (f) {
        if (isString(f)) {
          fields.push({
            key: f,
            label: startCase(f)
          });
        } else if (isObject(f) && f.key && isString(f.key)) {
          // Full object definition. We use assign so that we don't mutate the original
          fields.push(clone(f));
        } else if (isObject(f) && keys(f).length === 1) {
          // Shortcut object (i.e. { 'foo_bar': 'This is Foo Bar' }
          var key = keys(f)[0];
          var field = processField(key, f[key]);

          if (field) {
            fields.push(field);
          }
        }
      });
    } // If no field provided, take a sample from first record (if exits)


    if (fields.length === 0 && isArray(items) && items.length > 0) {
      var sample = items[0];
      keys(sample).forEach(function (k) {
        if (!IGNORED_FIELD_KEYS[k]) {
          fields.push({
            key: k,
            label: startCase(k)
          });
        }
      });
    } // Ensure we have a unique array of fields and that they have String labels


    var memo = {};
    return fields.filter(function (f) {
      if (!memo[f.key]) {
        memo[f.key] = true;
        f.label = isString(f.label) ? f.label : startCase(f.key);
        return true;
      }

      return false;
    });
  };

  var itemsMixin = {
    props: {
      items: {
        // Provider mixin adds in `Function` type
        type: Array,
        default: function _default()
        /* istanbul ignore next */
        {
          return [];
        }
      },
      fields: {
        type: Array,
        default: null
      },
      primaryKey: {
        // Primary key for record
        // If provided the value in each row must be unique!
        type: String,
        default: null
      },
      value: {
        // `v-model` for retrieving the current displayed rows
        type: Array,
        default: function _default() {
          return [];
        }
      }
    },
    data: function data() {
      return {
        // Our local copy of the items
        // Must be an array
        localItems: isArray(this.items) ? this.items.slice() : []
      };
    },
    computed: {
      computedFields: function computedFields() {
        // We normalize fields into an array of objects
        // `[ { key:..., label:..., ...}, {...}, ..., {..}]`
        return normalizeFields(this.fields, this.localItems);
      },
      computedFieldsObj: function computedFieldsObj() {
        // Fields as a simple lookup hash object
        // Mainly for formatter lookup and use in `scopedSlots` for convenience
        // If the field has a formatter, it normalizes formatter to a
        // function ref or `undefined` if no formatter
        var parent = this.$parent;
        return this.computedFields.reduce(function (obj, f) {
          // We use object spread here so we don't mutate the original field object
          obj[f.key] = clone(f);

          if (f.formatter) {
            // Normalize formatter to a function ref or `undefined`
            var formatter = f.formatter;

            if (isString(formatter) && isFunction(parent[formatter])) {
              formatter = parent[formatter];
            } else if (!isFunction(formatter)) {
              /* istanbul ignore next */
              formatter = undefined;
            } // Return formatter function or `undefined` if none


            obj[f.key].formatter = formatter;
          }

          return obj;
        }, {});
      },
      computedItems: function computedItems() {
        // Fallback if various mixins not provided
        return (this.paginatedItems || this.sortedItems || this.filteredItems || this.localItems || []).slice();
      },
      context: function context() {
        // Current state of sorting, filtering and pagination props/values
        return {
          filter: this.localFilter,
          sortBy: this.localSortBy,
          sortDesc: this.localSortDesc,
          perPage: parseInt(this.perPage, 10) || 0,
          currentPage: parseInt(this.currentPage, 10) || 1,
          apiUrl: this.apiUrl
        };
      }
    },
    watch: {
      items: function items(newItems) {
        /* istanbul ignore else */
        if (isArray(newItems)) {
          // Set `localItems`/`filteredItems` to a copy of the provided array
          this.localItems = newItems.slice();
        } else if (isUndefined(newItems) || isNull(newItems)) {
          /* istanbul ignore next */
          this.localItems = [];
        }
      },
      // Watch for changes on `computedItems` and update the `v-model`
      computedItems: function computedItems(newVal) {
        this.$emit('input', newVal);
      },
      // Watch for context changes
      context: function context(newVal, oldVal) {
        // Emit context information for external paging/filtering/sorting handling
        if (!looseEqual(newVal, oldVal)) {
          this.$emit('context-changed', newVal);
        }
      }
    },
    mounted: function mounted() {
      // Initially update the `v-model` of displayed items
      this.$emit('input', this.computedItems);
    },
    methods: {
      // Method to get the formatter method for a given field key
      getFieldFormatter: function getFieldFormatter(key) {
        var field = this.computedFieldsObj[key]; // `this.computedFieldsObj` has pre-normalized the formatter to a
        // function ref if present, otherwise `undefined`

        return field ? field.formatter : undefined;
      }
    }
  };

  // Mixin for providing stacked tables
  var stackedMixin = {
    props: {
      stacked: {
        type: [Boolean, String],
        default: false
      }
    },
    computed: {
      isStacked: function isStacked() {
        // `true` when always stacked, or returns breakpoint specified
        return this.stacked === '' ? true : this.stacked;
      },
      isStackedAlways: function isStackedAlways() {
        return this.isStacked === true;
      },
      stackedTableClasses: function stackedTableClasses() {
        return _defineProperty({
          'b-table-stacked': this.isStackedAlways
        }, "b-table-stacked-".concat(this.stacked), !this.isStackedAlways && this.isStacked);
      }
    }
  };

  var sanitizeRow = function sanitizeRow(row, ignoreFields, includeFields) {
    var fieldsObj = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    return keys(row).reduce(function (obj, key) {
      // Ignore special fields that start with `_`
      // Ignore fields in the `ignoreFields` array
      // Include only fields in the `includeFields` array
      if (!IGNORED_FIELD_KEYS[key] && !(ignoreFields && ignoreFields.length > 0 && arrayIncludes(ignoreFields, key)) && !(includeFields && includeFields.length > 0 && !arrayIncludes(includeFields, key))) {
        var f = fieldsObj[key] || {};
        var val = row[key]; // `f.filterByFormatted` will either be a function or boolean
        // `f.formater` will have already been noramlized into a function ref

        var filterByFormatted = f.filterByFormatted;
        var formatter = isFunction(filterByFormatted) ? filterByFormatted : filterByFormatted ? f.formatter : null;
        obj[key] = isFunction(formatter) ? formatter(val, key, row) : val;
      }

      return obj;
    }, {});
  };

  // SSR safe deterministic way (keys are sorted before stringification)
  //
  //   ex:
  //     { b: 3, c: { z: 'zzz', d: null, e: 2 }, d: [10, 12, 11], a: 'one' }
  //   becomes
  //     'one 3 2 zzz 10 12 11'
  //
  // Primitives (numbers/strings) are returned as-is
  // Null and undefined values are filtered out
  // Dates are converted to their native string format

  var stringifyObjectValues = function stringifyObjectValues(val) {
    if (isUndefinedOrNull(val)) {
      /* istanbul ignore next */
      return '';
    } // Arrays are also object, and keys just returns the array indexes
    // Date objects we convert to strings


    if (isObject(val) && !isDate(val)) {
      return keys(val).sort() // Sort to prevent SSR issues on pre-rendered sorted tables
      .filter(function (v) {
        return !isUndefinedOrNull(v);
      }) // Ignore undefined/null values
      .map(function (k) {
        return stringifyObjectValues(val[k]);
      }).join(' ');
    }

    return String(val);
  };

  // TODO: Add option to stringify `scopedSlot` items

  var stringifyRecordValues = function stringifyRecordValues(row, ignoreFields, includeFields, fieldsObj) {
    return isObject(row) ? stringifyObjectValues(sanitizeRow(row, ignoreFields, includeFields, fieldsObj)) : '';
  };

  var DEPRECATED_DEBOUNCE = 'b-table: Prop "filter-debounce" is deprecated. Use the debounce feature of <b-form-input> instead';
  var filteringMixin = {
    props: {
      filter: {
        type: [String, RegExp, Object, Array],
        default: null
      },
      filterFunction: {
        type: Function,
        default: null
      },
      filterIgnoredFields: {
        type: Array // default: undefined

      },
      filterIncludedFields: {
        type: Array // default: undefined

      },
      filterDebounce: {
        type: [Number, String],
        deprecated: DEPRECATED_DEBOUNCE,
        default: 0,
        validator: function validator(val) {
          return /^\d+/.test(String(val));
        }
      }
    },
    data: function data() {
      return {
        // Flag for displaying which empty slot to show and some event triggering
        isFiltered: false,
        // Where we store the copy of the filter criteria after debouncing
        // We pre-set it with the sanitized filter value
        localFilter: this.filterSanitize(this.filter)
      };
    },
    computed: {
      computedFilterIgnored: function computedFilterIgnored() {
        return this.filterIgnoredFields ? concat(this.filterIgnoredFields).filter(Boolean) : null;
      },
      computedFilterIncluded: function computedFilterIncluded() {
        return this.filterIncludedFields ? concat(this.filterIncludedFields).filter(Boolean) : null;
      },
      computedFilterDebounce: function computedFilterDebounce() {
        var ms = parseInt(this.filterDebounce, 10) || 0;
        /* istanbul ignore next */

        if (ms > 0) {
          warn(DEPRECATED_DEBOUNCE);
        }

        return ms;
      },
      localFiltering: function localFiltering() {
        return this.hasProvider ? !!this.noProviderFiltering : true;
      },
      // For watching changes to `filteredItems` vs `localItems`
      filteredCheck: function filteredCheck() {
        return {
          filteredItems: this.filteredItems,
          localItems: this.localItems,
          localFilter: this.localFilter
        };
      },
      // Sanitized/normalize filter-function prop
      localFilterFn: function localFilterFn() {
        // Return `null` to signal to use internal filter function
        return isFunction(this.filterFunction) ? this.filterFunction : null;
      },
      // Returns the records in `localItems` that match the filter criteria
      // Returns the original `localItems` array if not sorting
      filteredItems: function filteredItems() {
        var items = this.localItems || []; // Note the criteria is debounced and sanitized

        var criteria = this.localFilter; // Resolve the filtering function, when requested
        // We prefer the provided filtering function and fallback to the internal one
        // When no filtering criteria is specified the filtering factories will return `null`

        var filterFn = this.localFiltering ? this.filterFnFactory(this.localFilterFn, criteria) || this.defaultFilterFnFactory(criteria) : null; // We only do local filtering when requested and there are records to filter

        return filterFn && items.length > 0 ? items.filter(filterFn) : items;
      }
    },
    watch: {
      // Watch for debounce being set to 0
      computedFilterDebounce: function computedFilterDebounce(newVal, oldVal) {
        if (!newVal && this.$_filterTimer) {
          clearTimeout(this.$_filterTimer);
          this.$_filterTimer = null;
          this.localFilter = this.filterSanitize(this.filter);
        }
      },
      // Watch for changes to the filter criteria, and debounce if necessary
      filter: {
        // We need a deep watcher in case the user passes
        // an object when using `filter-function`
        deep: true,
        handler: function handler(newCriteria, oldCriteria) {
          var _this = this;

          var timeout = this.computedFilterDebounce;
          clearTimeout(this.$_filterTimer);
          this.$_filterTimer = null;

          if (timeout && timeout > 0) {
            // If we have a debounce time, delay the update of `localFilter`
            this.$_filterTimer = setTimeout(function () {
              _this.localFilter = _this.filterSanitize(newCriteria);
            }, timeout);
          } else {
            // Otherwise, immediately update `localFilter` with `newFilter` value
            this.localFilter = this.filterSanitize(newCriteria);
          }
        }
      },
      // Watch for changes to the filter criteria and filtered items vs `localItems`
      // Set visual state and emit events as required
      filteredCheck: function filteredCheck(_ref) {
        var filteredItems = _ref.filteredItems,
            localItems = _ref.localItems,
            localFilter = _ref.localFilter;
        // Determine if the dataset is filtered or not
        var isFiltered = false;

        if (!localFilter) {
          // If filter criteria is falsey
          isFiltered = false;
        } else if (looseEqual(localFilter, []) || looseEqual(localFilter, {})) {
          // If filter criteria is an empty array or object
          isFiltered = false;
        } else if (localFilter) {
          // If filter criteria is truthy
          isFiltered = true;
        }

        if (isFiltered) {
          this.$emit('filtered', filteredItems, filteredItems.length);
        }

        this.isFiltered = isFiltered;
      },
      isFiltered: function isFiltered(newVal, oldVal) {
        if (newVal === false && oldVal === true) {
          // We need to emit a filtered event if isFiltered transitions from true to
          // false so that users can update their pagination controls.
          this.$emit('filtered', this.localItems, this.localItems.length);
        }
      }
    },
    created: function created() {
      var _this2 = this;

      // Create non-reactive prop where we store the debounce timer id
      this.$_filterTimer = null; // If filter is "pre-set", set the criteria
      // This will trigger any watchers/dependents
      // this.localFilter = this.filterSanitize(this.filter)
      // Set the initial filtered state in a `$nextTick()` so that
      // we trigger a filtered event if needed

      this.$nextTick(function () {
        _this2.isFiltered = Boolean(_this2.localFilter);
      });
    },
    beforeDestroy: function beforeDestroy()
    /* istanbul ignore next */
    {
      clearTimeout(this.$_filterTimer);
      this.$_filterTimer = null;
    },
    methods: {
      filterSanitize: function filterSanitize(criteria) {
        // Sanitizes filter criteria based on internal or external filtering
        if (this.localFiltering && !this.localFilterFn && !(isString(criteria) || isRegExp(criteria))) {
          // If using internal filter function, which only accepts string or RegExp,
          // return '' to signify no filter
          return '';
        } // Could be a string, object or array, as needed by external filter function
        // We use `cloneDeep` to ensure we have a new copy of an object or array
        // without Vue's reactive observers


        return cloneDeep(criteria);
      },
      // Filter Function factories
      filterFnFactory: function filterFnFactory(filterFn, criteria) {
        // Wrapper factory for external filter functions
        // Wrap the provided filter-function and return a new function
        // Returns `null` if no filter-function defined or if criteria is falsey
        // Rather than directly grabbing `this.computedLocalFilterFn` or `this.filterFunction`
        // we have it passed, so that the caller computed prop will be reactive to changes
        // in the original filter-function (as this routine is a method)
        if (!filterFn || !isFunction(filterFn) || !criteria || looseEqual(criteria, []) || looseEqual(criteria, {})) {
          return null;
        } // Build the wrapped filter test function, passing the criteria to the provided function


        var fn = function fn(item) {
          // Generated function returns true if the criteria matches part
          // of the serialized data, otherwise false
          return filterFn(item, criteria);
        }; // Return the wrapped function


        return fn;
      },
      defaultFilterFnFactory: function defaultFilterFnFactory(criteria) {
        var _this3 = this;

        // Generates the default filter function, using the given filter criteria
        // Returns `null` if no criteria or criteria format not supported
        if (!criteria || !(isString(criteria) || isRegExp(criteria))) {
          // Built in filter can only support strings or RegExp criteria (at the moment)
          return null;
        } // Build the regexp needed for filtering


        var regexp = criteria;

        if (isString(regexp)) {
          // Escape special `RegExp` characters in the string and convert contiguous
          // whitespace to `\s+` matches
          var pattern = criteria.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&').replace(/[\s\uFEFF\xA0]+/g, '\\s+'); // Build the `RegExp` (no need for global flag, as we only need
          // to find the value once in the string)

          regexp = new RegExp(".*".concat(pattern, ".*"), 'i');
        } // Generate the wrapped filter test function to use


        var fn = function fn(item) {
          // This searches all row values (and sub property values) in the entire (excluding
          // special `_` prefixed keys), because we convert the record to a space-separated
          // string containing all the value properties (recursively), even ones that are
          // not visible (not specified in this.fields)
          // Users can ignore filtering on specific fields, or on only certain fields,
          // and can optionall specify searching results of fields with formatter
          //
          // TODO: Enable searching on scoped slots (optional, as it will be SLOW)
          //
          // Generated function returns true if the criteria matches part of
          // the serialized data, otherwise false
          // We set `lastIndex = 0` on the `RegExp` in case someone specifies the `/g` global flag
          regexp.lastIndex = 0;
          return regexp.test(stringifyRecordValues(item, _this3.computedFilterIgnored, _this3.computedFilterIncluded, _this3.computedFieldsObj));
        }; // Return the generated function


        return fn;
      }
    }
  };

  /*
   * Consistent and stable sort function across JavaScript platforms
   *
   * Inconsistent sorts can cause SSR problems between client and server
   * such as in <b-table> if sortBy is applied to the data on server side render.
   * Chrome and V8 native sorts are inconsistent/unstable
   *
   * This function uses native sort with fallback to index compare when the a and b
   * compare returns 0
   *
   * Algorithm based on:
   * https://stackoverflow.com/questions/1427608/fast-stable-sorting-algorithm-implementation-in-javascript/45422645#45422645
   *
   * @param {array} array to sort
   * @param {function} sort compare function
   * @return {array}
   */
  var stableSort = function stableSort(array, compareFn) {
    // Using `.bind(compareFn)` on the wrapped anonymous function improves
    // performance by avoiding the function call setup. We don't use an arrow
    // function here as it binds `this` to the `stableSort` context rather than
    // the `compareFn` context, which wouldn't give us the performance increase.
    return array.map(function (a, index) {
      return [index, a];
    }).sort(function (a, b) {
      return this(a[1], b[1]) || a[0] - b[0];
    }.bind(compareFn)).map(function (e) {
      return e[1];
    });
  };

  //
  // TODO: Add option to sort by multiple columns (tri-state per column,
  //       plus order of columns in sort)  where sortBy could be an array
  //       of objects `[ {key: 'foo', sortDir: 'asc'}, {key:'bar', sortDir: 'desc'} ...]`
  //       or an array of arrays `[ ['foo','asc'], ['bar','desc'] ]`
  //       Multisort will most likely be handled in mixin-sort.js by
  //       calling this method for each sortBy

  var defaultSortCompare = function defaultSortCompare(a, b, sortBy, sortDesc, formatter, localeOpts, locale, nullLast) {
    var aa = get(a, sortBy, null);
    var bb = get(b, sortBy, null);

    if (isFunction(formatter)) {
      aa = formatter(aa, sortBy, a);
      bb = formatter(bb, sortBy, b);
    }

    aa = isUndefinedOrNull(aa) ? '' : aa;
    bb = isUndefinedOrNull(bb) ? '' : bb;

    if (isDate(aa) && isDate(bb) || isNumber(aa) && isNumber(bb)) {
      // Special case for comparing dates and numbers
      // Internally dates are compared via their epoch number values
      return aa < bb ? -1 : aa > bb ? 1 : 0;
    } else if (nullLast && aa === '' && bb !== '') {
      // Special case when sorting null/undefined/empty string last
      return 1;
    } else if (nullLast && aa !== '' && bb === '') {
      // Special case when sorting null/undefined/empty string last
      return -1;
    } // Do localized string comparison


    return stringifyObjectValues(aa).localeCompare(stringifyObjectValues(bb), locale, localeOpts);
  };

  var sortingMixin = {
    props: {
      sortBy: {
        type: String,
        default: ''
      },
      sortDesc: {
        // TODO: Make this tri-state: true, false, null
        type: Boolean,
        default: false
      },
      sortDirection: {
        // This prop is named incorrectly
        // It should be `initialSortDirection` as it is a bit misleading
        // (not to mention it screws up the ARIA label on the headers)
        type: String,
        default: 'asc',
        validator: function validator(direction) {
          return arrayIncludes(['asc', 'desc', 'last'], direction);
        }
      },
      sortCompare: {
        type: Function,
        default: null
      },
      sortCompareOptions: {
        // Supported localCompare options, see `options` section of:
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare
        type: Object,
        default: function _default() {
          return {
            numeric: true
          };
        }
      },
      sortCompareLocale: {
        // String: locale code
        // Array: array of Locale strings
        type: [String, Array] // default: undefined

      },
      sortNullLast: {
        // Sort null and undefined to appear last
        type: Boolean,
        default: false
      },
      noSortReset: {
        // Another prop that should have had a better name.
        // It should be noSortClear (on non-sortable headers).
        // We will need to make sure the documentation is clear on what
        // this prop does (as well as in the code for future reference)
        type: Boolean,
        default: false
      },
      labelSortAsc: {
        type: String,
        default: 'Click to sort Ascending'
      },
      labelSortDesc: {
        type: String,
        default: 'Click to sort Descending'
      },
      labelSortClear: {
        type: String,
        default: 'Click to clear sorting'
      },
      noLocalSorting: {
        type: Boolean,
        default: false
      },
      noFooterSorting: {
        type: Boolean,
        default: false
      },
      sortIconLeft: {
        // Place the sorting icon on the left of the header cells
        type: Boolean,
        default: false
      }
    },
    data: function data() {
      return {
        localSortBy: this.sortBy || '',
        localSortDesc: this.sortDesc || false
      };
    },
    computed: {
      localSorting: function localSorting() {
        return this.hasProvider ? !!this.noProviderSorting : !this.noLocalSorting;
      },
      isSortable: function isSortable() {
        return this.computedFields.some(function (f) {
          return f.sortable;
        });
      },
      sortedItems: function sortedItems() {
        // Sorts the filtered items and returns a new array of the sorted items
        // or the original items array if not sorted.
        var items = (this.filteredItems || this.localItems || []).slice();
        var sortBy = this.localSortBy;
        var sortDesc = this.localSortDesc;
        var sortCompare = this.sortCompare;
        var localSorting = this.localSorting;

        var sortOptions = _objectSpread2({}, this.sortCompareOptions, {
          usage: 'sort'
        });

        var sortLocale = this.sortCompareLocale || undefined;
        var nullLast = this.sortNullLast;

        if (sortBy && localSorting) {
          var field = this.computedFieldsObj[sortBy] || {};
          var sortByFormatted = field.sortByFormatted;
          var formatter = isFunction(sortByFormatted) ? sortByFormatted : sortByFormatted ? this.getFieldFormatter(sortBy) : undefined; // `stableSort` returns a new array, and leaves the original array intact

          return stableSort(items, function (a, b) {
            var result = null;

            if (isFunction(sortCompare)) {
              // Call user provided sortCompare routine
              result = sortCompare(a, b, sortBy, sortDesc, formatter, sortOptions, sortLocale);
            }

            if (isUndefinedOrNull(result) || result === false) {
              // Fallback to built-in defaultSortCompare if sortCompare
              // is not defined or returns null/false
              result = defaultSortCompare(a, b, sortBy, sortDesc, formatter, sortOptions, sortLocale, nullLast);
            } // Negate result if sorting in descending order


            return (result || 0) * (sortDesc ? -1 : 1);
          });
        }

        return items;
      }
    },
    watch: {
      isSortable: function isSortable(newVal, oldVal)
      /* istanbul ignore next: pain in the butt to test */
      {
        if (newVal) {
          if (this.isSortable) {
            this.$on('head-clicked', this.handleSort);
          }
        } else {
          this.$off('head-clicked', this.handleSort);
        }
      },
      sortDesc: function sortDesc(newVal, oldVal) {
        if (newVal === this.localSortDesc) {
          /* istanbul ignore next */
          return;
        }

        this.localSortDesc = newVal || false;
      },
      sortBy: function sortBy(newVal, oldVal) {
        if (newVal === this.localSortBy) {
          /* istanbul ignore next */
          return;
        }

        this.localSortBy = newVal || '';
      },
      // Update .sync props
      localSortDesc: function localSortDesc(newVal, oldVal) {
        // Emit update to sort-desc.sync
        if (newVal !== oldVal) {
          this.$emit('update:sortDesc', newVal);
        }
      },
      localSortBy: function localSortBy(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.$emit('update:sortBy', newVal);
        }
      }
    },
    created: function created() {
      if (this.isSortable) {
        this.$on('head-clicked', this.handleSort);
      }
    },
    methods: {
      // Handlers
      // Need to move from thead-mixin
      handleSort: function handleSort(key, field, evt, isFoot) {
        var _this = this;

        if (!this.isSortable) {
          /* istanbul ignore next */
          return;
        }

        if (isFoot && this.noFooterSorting) {
          return;
        } // TODO: make this tri-state sorting
        // cycle desc => asc => none => desc => ...


        var sortChanged = false;

        var toggleLocalSortDesc = function toggleLocalSortDesc() {
          var sortDirection = field.sortDirection || _this.sortDirection;

          if (sortDirection === 'asc') {
            _this.localSortDesc = false;
          } else if (sortDirection === 'desc') {
            _this.localSortDesc = true;
          }
        };

        if (field.sortable) {
          if (key === this.localSortBy) {
            // Change sorting direction on current column
            this.localSortDesc = !this.localSortDesc;
          } else {
            // Start sorting this column ascending
            this.localSortBy = key; // this.localSortDesc = false

            toggleLocalSortDesc();
          }

          sortChanged = true;
        } else if (this.localSortBy && !this.noSortReset) {
          this.localSortBy = '';
          toggleLocalSortDesc();
          sortChanged = true;
        }

        if (sortChanged) {
          // Sorting parameters changed
          this.$emit('sort-changed', this.context);
        }
      },
      // methods to compute classes and attrs for thead>th cells
      sortTheadThClasses: function sortTheadThClasses(key, field, isFoot) {
        return {
          // If sortable and sortIconLeft are true, then place sort icon on the left
          'b-table-sort-icon-left': field.sortable && this.sortIconLeft && !(isFoot && this.noFooterSorting)
        };
      },
      sortTheadThAttrs: function sortTheadThAttrs(key, field, isFoot) {
        if (!this.isSortable || isFoot && this.noFooterSorting) {
          // No attributes if not a sortable table
          return {};
        }

        var sortable = field.sortable;
        var ariaLabel = '';

        if ((!field.label || !field.label.trim()) && !field.headerTitle) {
          // In case field's label and title are empty/blank, we need to
          // add a hint about what the column is about for non-sighted users.
          // This is duplicated code from tbody-row mixin, but we need it
          // here as well, since we overwrite the original aria-label.

          /* istanbul ignore next */
          ariaLabel = startCase(key);
        } // The correctness of these labels is very important for screen-reader users.


        var ariaLabelSorting = '';

        if (sortable) {
          if (this.localSortBy === key) {
            // currently sorted sortable column.
            ariaLabelSorting = this.localSortDesc ? this.labelSortAsc : this.labelSortDesc;
          } else {
            // Not currently sorted sortable column.
            // Not using nested ternary's here for clarity/readability
            // Default for ariaLabel
            ariaLabelSorting = this.localSortDesc ? this.labelSortDesc : this.labelSortAsc; // Handle sortDirection setting

            var sortDirection = this.sortDirection || field.sortDirection;

            if (sortDirection === 'asc') {
              ariaLabelSorting = this.labelSortAsc;
            } else if (sortDirection === 'desc') {
              ariaLabelSorting = this.labelSortDesc;
            }
          }
        } else if (!this.noSortReset) {
          // Non sortable column
          ariaLabelSorting = this.localSortBy ? this.labelSortClear : '';
        } // Assemble the aria-label attribute value


        ariaLabel = [ariaLabel.trim(), ariaLabelSorting.trim()].filter(Boolean).join(': '); // Assemble the aria-sort attribute value

        var ariaSort = sortable && this.localSortBy === key ? this.localSortDesc ? 'descending' : 'ascending' : sortable ? 'none' : null; // Return the attributes
        // (All the above just to get these two values)

        return {
          'aria-label': ariaLabel || null,
          'aria-sort': ariaSort
        };
      }
    }
  };

  var paginationMixin$1 = {
    props: {
      perPage: {
        type: [Number, String],
        default: 0
      },
      currentPage: {
        type: [Number, String],
        default: 1
      }
    },
    computed: {
      localPaging: function localPaging() {
        return this.hasProvider ? !!this.noProviderPaging : true;
      },
      paginatedItems: function paginatedItems() {
        var items = this.sortedItems || this.filteredItems || this.localItems || [];
        var currentPage = Math.max(parseInt(this.currentPage, 10) || 1, 1);
        var perPage = Math.max(parseInt(this.perPage, 10) || 0, 0); // Apply local pagination

        if (this.localPaging && !!perPage) {
          // Grab the current page of data (which may be past filtered items limit)
          items = items.slice((currentPage - 1) * perPage, currentPage * perPage);
        } // Return the items to display in the table


        return items;
      }
    }
  };

  var captionMixin = {
    props: {
      // `caption-top` is part of table-redere mixin (styling)
      // captionTop: {
      //   type: Boolean,
      //   default: false
      // },
      caption: {
        type: String,
        default: null
      },
      captionHtml: {
        type: String
      }
    },
    computed: {
      captionId: function captionId() {
        // Even though `this.safeId` looks like a method, it is a computed prop
        // that returns a new function if the underlying ID changes
        return this.isStacked ? this.safeId('_caption_') : null;
      }
    },
    methods: {
      renderCaption: function renderCaption() {
        var h = this.$createElement; // Build the caption

        var $captionSlot = this.normalizeSlot('table-caption');
        var $caption = h();

        if ($captionSlot || this.caption || this.captionHtml) {
          var data = {
            key: 'caption',
            attrs: {
              id: this.captionId
            }
          };

          if (!$captionSlot) {
            data.domProps = htmlOrText(this.captionHtml, this.caption);
          }

          $caption = h('caption', data, [$captionSlot]);
        }

        return $caption;
      }
    }
  };

  var colgroupMixin = {
    methods: {
      renderColgroup: function renderColgroup() {
        var h = this.$createElement;
        var fields = this.computedFields;
        var $colgroup = h();

        if (this.hasNormalizedSlot('table-colgroup')) {
          $colgroup = h('colgroup', {
            key: 'colgroup'
          }, [this.normalizeSlot('table-colgroup', {
            columns: fields.length,
            fields: fields
          })]);
        }

        return $colgroup;
      }
    }
  };

  var TABLE_TAG_NAMES = ['TD', 'TH', 'TR']; // Returns `true` if we should ignore the click/double-click/keypress event
  // Avoids having the user need to use `@click.stop` on the form control

  var filterEvent = function filterEvent(evt) {
    // Exit early when we don't have a target element
    if (!evt || !evt.target) {
      /* istanbul ignore next */
      return false;
    }

    var el = evt.target; // Exit early when element is disabled or a table element

    if (el.disabled || TABLE_TAG_NAMES.indexOf(el.tagName) !== -1) {
      return false;
    } // Ignore the click when it was inside a dropdown menu


    if (closest('.dropdown-menu', el)) {
      return true;
    }

    var label = el.tagName === 'LABEL' ? el : closest('label', el); // If the label's form control is not disabled then we don't propagate event
    // Modern browsers have `label.control` that references the associated input, but IE11
    // does not have this property on the label element, so we resort to DOM lookups

    if (label) {
      var labelFor = getAttr(label, 'for');
      var input = labelFor ? getById(labelFor) : select('input, select, textarea', label);

      if (input && !input.disabled) {
        return true;
      }
    } // Otherwise check if the event target matches one of the selectors in the
    // event filter (i.e. anchors, non disabled inputs, etc.)
    // Return `true` if we should ignore the event


    return matches(el, EVENT_FILTER);
  };

  // Used to filter out click events caused by the mouse up at end of selection
  //
  // Accepts an element as only argument to test to see if selection overlaps or is
  // contained within the element

  var textSelectionActive = function textSelectionActive() {
    var el = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
    var sel = getSel();
    return sel && sel.toString().trim() !== '' && sel.containsNode && isElement(el) ? sel.containsNode(el, true) : false;
  };

  var props$T = {
    headVariant: {
      // Also sniffed by <b-tr> / <b-td> / <b-th>
      type: String,
      // supported values: 'lite', 'dark', or null
      default: null
    }
  }; // @vue/component

  var BThead =
  /*#__PURE__*/
  Vue.extend({
    name: 'BThead',
    mixins: [normalizeSlotMixin],
    inheritAttrs: false,
    provide: function provide() {
      return {
        bvTableRowGroup: this
      };
    },
    inject: {
      bvTable: {
        // Sniffed by <b-tr> / <b-td> / <b-th>
        default: function _default()
        /* istanbul ignore next */
        {
          return {};
        }
      }
    },
    props: props$T,
    computed: {
      isThead: function isThead() {
        // Sniffed by <b-tr> / <b-td> / <b-th>
        return true;
      },
      isDark: function isDark() {
        // Sniffed by <b-tr> / <b-td> / <b-th>
        return this.bvTable.dark;
      },
      isStacked: function isStacked() {
        // Sniffed by <b-tr> / <b-td> / <b-th>
        return this.bvTable.isStacked;
      },
      isResponsive: function isResponsive() {
        // Sniffed by <b-tr> / <b-td> / <b-th>
        return this.bvTable.isResponsive;
      },
      isStickyHeader: function isStickyHeader() {
        // Sniffed by <b-tr> / <b-td> / <b-th>
        // Needed to handle header background classes, due to lack of
        // background color inheritance with Bootstrap v4 table CSS
        // Sticky headers only apply to cells in table `thead`
        return !this.isStacked && this.bvTable.stickyHeader;
      },
      hasStickyHeader: function hasStickyHeader() {
        // Sniffed by <b-tr> / <b-td> / <b-th>
        // Needed to handle header background classes, due to lack of
        // background color inheritance with Bootstrap v4 table CSS
        return !this.isStacked && this.bvTable.stickyHeader;
      },
      tableVariant: function tableVariant() {
        // Sniffed by <b-tr> / <b-td> / <b-th>
        return this.bvTable.tableVariant;
      },
      theadClasses: function theadClasses() {
        return [this.headVariant ? "thead-".concat(this.headVariant) : null];
      },
      theadAttrs: function theadAttrs() {
        return _objectSpread2({
          role: 'rowgroup'
        }, this.$attrs);
      }
    },
    render: function render(h) {
      return h('thead', {
        class: this.theadClasses,
        attrs: this.theadAttrs,
        // Pass down any native listeners
        on: this.$listeners
      }, this.normalizeSlot('default', {}));
    }
  });

  var props$U = {
    footVariant: {
      type: String,
      // supported values: 'lite', 'dark', or null
      default: null
    }
  }; // @vue/component

  var BTfoot =
  /*#__PURE__*/
  Vue.extend({
    name: 'BTfoot',
    mixins: [normalizeSlotMixin],
    inheritAttrs: false,
    provide: function provide() {
      return {
        bvTableRowGroup: this
      };
    },
    inject: {
      bvTable: {
        // Sniffed by <b-tr> / <b-td> / <b-th>
        default: function _default()
        /* istanbul ignore next */
        {
          return {};
        }
      }
    },
    props: props$U,
    computed: {
      isTfoot: function isTfoot() {
        // Sniffed by <b-tr> / <b-td> / <b-th>
        return true;
      },
      isDark: function isDark()
      /* istanbul ignore next: Not currently sniffed in tests */
      {
        // Sniffed by <b-tr> / <b-td> / <b-th>
        return this.bvTable.dark;
      },
      isStacked: function isStacked() {
        // Sniffed by <b-tr> / <b-td> / <b-th>
        return this.bvTable.isStacked;
      },
      isResponsive: function isResponsive() {
        // Sniffed by <b-tr> / <b-td> / <b-th>
        return this.bvTable.isResponsive;
      },
      isStickyHeader: function isStickyHeader() {
        // Sniffed by <b-tr> / <b-td> / <b-th>
        // Sticky headers are only supported in thead
        return false;
      },
      hasStickyHeader: function hasStickyHeader() {
        // Sniffed by <b-tr> / <b-td> / <b-th>
        // Needed to handle header background classes, due to lack of
        // background color inheritance with Bootstrap v4 table CSS
        return !this.isStacked && this.bvTable.stickyHeader;
      },
      tableVariant: function tableVariant()
      /* istanbul ignore next: Not currently sniffed in tests */
      {
        // Sniffed by <b-tr> / <b-td> / <b-th>
        return this.bvTable.tableVariant;
      },
      tfootClasses: function tfootClasses() {
        return [this.footVariant ? "thead-".concat(this.footVariant) : null];
      },
      tfootAttrs: function tfootAttrs() {
        return _objectSpread2({
          role: 'rowgroup'
        }, this.$attrs);
      }
    },
    render: function render(h) {
      return h('tfoot', {
        class: this.tfootClasses,
        attrs: this.tfootAttrs,
        // Pass down any native listeners
        on: this.$listeners
      }, this.normalizeSlot('default', {}));
    }
  });

  var props$V = {
    variant: {
      type: String,
      default: null
    }
  };
  var LIGHT = 'light';
  var DARK = 'dark'; // @vue/component

  var BTr =
  /*#__PURE__*/
  Vue.extend({
    name: 'BTr',
    mixins: [normalizeSlotMixin],
    inheritAttrs: false,
    provide: function provide() {
      return {
        bvTableTr: this
      };
    },
    inject: {
      bvTableRowGroup: {
        defaut: function defaut()
        /* istanbul ignore next */
        {
          return {};
        }
      }
    },
    props: props$V,
    computed: {
      inTbody: function inTbody() {
        // Sniffed by <b-td> / <b-th>
        return this.bvTableRowGroup.isTbody;
      },
      inThead: function inThead() {
        // Sniffed by <b-td> / <b-th>
        return this.bvTableRowGroup.isThead;
      },
      inTfoot: function inTfoot() {
        // Sniffed by <b-td> / <b-th>
        return this.bvTableRowGroup.isTfoot;
      },
      isDark: function isDark() {
        // Sniffed by <b-td> / <b-th>
        return this.bvTableRowGroup.isDark;
      },
      isStacked: function isStacked() {
        // Sniffed by <b-td> / <b-th>
        return this.bvTableRowGroup.isStacked;
      },
      isResponsive: function isResponsive() {
        // Sniffed by <b-td> / <b-th>
        return this.bvTableRowGroup.isResponsive;
      },
      isStickyHeader: function isStickyHeader() {
        // Sniffed by <b-td> / <b-th>
        // Sticky headers are only supported in thead
        return this.bvTableRowGroup.isStickyHeader;
      },
      hasStickyHeader: function hasStickyHeader() {
        // Sniffed by <b-tr> / <b-td> / <b-th>
        // Needed to handle header background classes, due to lack of
        // background color inheritance with Bootstrap v4 table CSS
        return !this.isStacked && this.bvTableRowGroup.hasStickyHeader;
      },
      tableVariant: function tableVariant() {
        // Sniffed by <b-td> / <b-th>
        return this.bvTableRowGroup.tableVariant;
      },
      headVariant: function headVariant() {
        // Sniffed by <b-td> / <b-th>
        return this.inThead ? this.bvTableRowGroup.headVariant : null;
      },
      footVariant: function footVariant() {
        // Sniffed by <b-td> / <b-th>
        return this.inTfoot ? this.bvTableRowGroup.footVariant : null;
      },
      isRowDark: function isRowDark() {
        return this.headVariant === LIGHT || this.footVariant === LIGHT ? false : this.headVariant === DARK || this.footVariant === DARK ? true : this.isDark;
      },
      trClasses: function trClasses() {
        return [this.variant ? "".concat(this.isRowDark ? 'bg' : 'table', "-").concat(this.variant) : null];
      },
      trAttrs: function trAttrs() {
        return _objectSpread2({
          role: 'row'
        }, this.$attrs);
      }
    },
    render: function render(h) {
      return h('tr', {
        class: this.trClasses,
        attrs: this.trAttrs,
        // Pass native listeners to child
        on: this.$listeners
      }, this.normalizeSlot('default', {}));
    }
  });

  var digitsRx = /^\d+$/; // Parse a rowspan or colspan into a digit (or null if < 1 or NaN)

  var parseSpan = function parseSpan(val) {
    val = parseInt(val, 10);
    return digitsRx.test(String(val)) && val > 0 ? val : null;
  };
  /* istanbul ignore next */


  var spanValidator = function spanValidator(val) {
    return isUndefinedOrNull(val) || parseSpan(val) > 0;
  };

  var props$W = {
    variant: {
      type: String,
      default: null
    },
    colspan: {
      type: [Number, String],
      default: null,
      validator: spanValidator
    },
    rowspan: {
      type: [Number, String],
      default: null,
      validator: spanValidator
    },
    stackedHeading: {
      type: String,
      default: null
    },
    stickyColumn: {
      type: Boolean,
      default: false
    }
  }; // @vue/component

  var BTd =
  /*#__PURE__*/
  Vue.extend({
    name: 'BTableCell',
    mixins: [normalizeSlotMixin],
    inheritAttrs: false,
    inject: {
      bvTableTr: {
        default: function _default()
        /* istanbul ignore next */
        {
          return {};
        }
      }
    },
    props: props$W,
    computed: {
      tag: function tag() {
        // Overridden by <b-th>
        return 'td';
      },
      inTbody: function inTbody() {
        return this.bvTableTr.inTbody;
      },
      inThead: function inThead() {
        return this.bvTableTr.inThead;
      },
      inTfoot: function inTfoot() {
        return this.bvTableTr.inTfoot;
      },
      isDark: function isDark() {
        return this.bvTableTr.isDark;
      },
      isStacked: function isStacked() {
        return this.bvTableTr.isStacked;
      },
      isStackedCell: function isStackedCell() {
        // We only support stacked-heading in tbody in stacked mode
        return this.inTbody && this.isStacked;
      },
      isResponsive: function isResponsive() {
        return this.bvTableTr.isResponsive;
      },
      isStickyHeader: function isStickyHeader() {
        // Needed to handle header background classes, due to lack of
        // background color inheritance with Bootstrap v4 table CSS
        // Sticky headers only apply to cells in table `thead`
        return this.bvTableTr.isStickyHeader;
      },
      hasStickyHeader: function hasStickyHeader() {
        // Needed to handle header background classes, due to lack of
        // background color inheritance with Bootstrap v4 table CSS
        return this.bvTableTr.hasStickyHeader;
      },
      isStickyColumn: function isStickyColumn() {
        // Needed to handle background classes, due to lack of
        // background color inheritance with Bootstrap v4 table CSS
        // Sticky column cells are only available in responsive
        // mode (horizontal scrolling) or when sticky header mode
        // Applies to cells in `thead`, `tbody` and `tfoot`
        return !this.isStacked && (this.isResponsive || this.hasStickyHeader) && this.stickyColumn;
      },
      rowVariant: function rowVariant() {
        return this.bvTableTr.variant;
      },
      headVariant: function headVariant() {
        return this.bvTableTr.headVariant;
      },
      footVariant: function footVariant()
      /* istanbul ignore next: need to add in tests for footer variant */
      {
        return this.bvTableTr.footVariant;
      },
      tableVariant: function tableVariant() {
        return this.bvTableTr.tableVariant;
      },
      computedColspan: function computedColspan() {
        return parseSpan(this.colspan);
      },
      computedRowspan: function computedRowspan() {
        return parseSpan(this.rowspan);
      },
      cellClasses: function cellClasses() {
        // We use computed props here for improved performance by caching
        // the results of the string interpolation
        // TODO: need to add handling for footVariant
        var variant = this.variant;

        if (!variant && this.isStickyHeader && !this.headVariant || !variant && this.isStickyColumn) {
          // Needed for sticky-header mode as Bootstrap v4 table cells do
          // not inherit parent's background-color. Boo!
          variant = this.rowVariant || this.tableVariant || 'b-table-default';
        }

        return [variant ? "".concat(this.isDark ? 'bg' : 'table', "-").concat(variant) : null, this.isStickyColumn ? 'b-table-sticky-column' : null];
      },
      cellAttrs: function cellAttrs() {
        // We use computed props here for improved performance by caching
        // the results of the object spread (Object.assign)
        var headOrFoot = this.inThead || this.inTfoot; // Make sure col/rowspan's are > 0 or null

        var colspan = this.computedColspan;
        var rowspan = this.computedRowspan; // Default role and scope

        var role = 'cell';
        var scope = null; // Compute role and scope
        // We only add scopes with an explicit span of 1 or greater

        if (headOrFoot) {
          // Header or footer cells
          role = 'columnheader';
          scope = colspan > 0 ? 'colspan' : 'col';
        } else if (this.tag === 'th') {
          // th's in tbody
          role = 'rowheader';
          scope = rowspan > 0 ? 'rowgroup' : 'row';
        }

        return _objectSpread2({
          colspan: colspan,
          rowspan: rowspan,
          role: role,
          scope: scope
        }, this.$attrs, {
          // Add in the stacked cell label data-attribute if in
          // stacked mode (if a stacked heading label is provided)
          'data-label': this.isStackedCell && !isUndefinedOrNull(this.stackedHeading) ? toString$1(this.stackedHeading) : null
        });
      }
    },
    render: function render(h) {
      var content = [this.normalizeSlot('default')];
      return h(this.tag, {
        class: this.cellClasses,
        attrs: this.cellAttrs,
        // Transfer any native listeners
        on: this.$listeners
      }, [this.isStackedCell ? h('div', [content]) : content]);
    }
  });

  var BTh =
  /*#__PURE__*/
  Vue.extend({
    name: 'BTh',
    extends: BTd,
    computed: {
      tag: function tag() {
        return 'th';
      }
    }
  });

  var theadMixin = {
    props: {
      headVariant: {
        type: String,
        // 'light', 'dark' or `null` (or custom)
        default: function _default() {
          return getComponentConfig('BTable', 'headVariant');
        }
      },
      headRowVariant: {
        type: String,
        // Any Bootstrap theme variant (or custom)
        default: null
      },
      theadClass: {
        type: [String, Array, Object] // default: undefined

      },
      theadTrClass: {
        type: [String, Array, Object] // default: undefined

      }
    },
    methods: {
      fieldClasses: function fieldClasses(field) {
        // Header field (<th>) classes
        return [field.class ? field.class : '', field.thClass ? field.thClass : ''];
      },
      headClicked: function headClicked(evt, field, isFoot) {
        if (this.stopIfBusy && this.stopIfBusy(evt)) {
          // If table is busy (via provider) then don't propagate
          return;
        } else if (filterEvent(evt)) {
          // Clicked on a non-disabled control so ignore
          return;
        } else if (textSelectionActive(this.$el)) {
          // User is selecting text, so ignore

          /* istanbul ignore next: JSDOM doesn't support getSelection() */
          return;
        }

        evt.stopPropagation();
        evt.preventDefault();
        this.$emit('head-clicked', field.key, field, evt, isFoot);
      },
      renderThead: function renderThead() {
        var _this = this;

        var isFoot = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        var h = this.$createElement;
        var fields = this.computedFields || [];

        if (this.isStackedAlways || fields.length === 0) {
          // In always stacked mode, we don't bother rendering the head/foot
          // Or if no field headings (empty table)
          return h();
        } // Reference to `selectAllRows` and `clearSelected()`, if table is selectable


        var selectAllRows = this.isSelectable ? this.selectAllRows : function () {};
        var clearSelected = this.isSelectable ? this.clearSelected : function () {}; // Helper function to generate a field <th> cell

        var makeCell = function makeCell(field, colIndex) {
          var ariaLabel = null;

          if (!field.label.trim() && !field.headerTitle) {
            // In case field's label and title are empty/blank
            // We need to add a hint about what the column is about for non-sighted users

            /* istanbul ignore next */
            ariaLabel = startCase(field.key);
          }

          var hasHeadClickListener = _this.$listeners['head-clicked'] || _this.isSortable;
          var handlers = {};

          if (hasHeadClickListener) {
            handlers.click = function (evt) {
              _this.headClicked(evt, field, isFoot);
            };

            handlers.keydown = function (evt) {
              var keyCode = evt.keyCode;

              if (keyCode === KEY_CODES.ENTER || keyCode === KEY_CODES.SPACE) {
                _this.headClicked(evt, field, isFoot);
              }
            };
          }

          var sortAttrs = _this.isSortable ? _this.sortTheadThAttrs(field.key, field, isFoot) : {};
          var sortClass = _this.isSortable ? _this.sortTheadThClasses(field.key, field, isFoot) : null;
          var data = {
            key: field.key,
            class: [_this.fieldClasses(field), sortClass],
            props: {
              variant: field.variant,
              stickyColumn: field.stickyColumn
            },
            style: field.thStyle || {},
            attrs: _objectSpread2({
              // We only add a tabindex of 0 if there is a head-clicked listener
              tabindex: hasHeadClickListener ? '0' : null,
              abbr: field.headerAbbr || null,
              title: field.headerTitle || null,
              'aria-colindex': String(colIndex + 1),
              'aria-label': ariaLabel
            }, _this.getThValues(null, field.key, field.thAttr, isFoot ? 'foot' : 'head', {}), {}, sortAttrs),
            on: handlers
          }; // Handle edge case where in-document templates are used with new
          // `v-slot:name` syntax where the browser lower-cases the v-slot's
          // name (attributes become lower cased when parsed by the browser)
          // We have replaced the square bracket syntax with round brackets
          // to prevent confusion with dynamic slot names

          var slotNames = ["head(".concat(field.key, ")"), "head(".concat(field.key.toLowerCase(), ")"), 'head()'];

          if (isFoot) {
            // Footer will fallback to header slot names
            slotNames = ["foot(".concat(field.key, ")"), "foot(".concat(field.key.toLowerCase(), ")"), 'foot()'].concat(_toConsumableArray(slotNames));
          }

          var hasSlot = _this.hasNormalizedSlot(slotNames);

          var slot = field.label;

          if (hasSlot) {
            slot = _this.normalizeSlot(slotNames, {
              label: field.label,
              column: field.key,
              field: field,
              isFoot: isFoot,
              // Add in row select methods
              selectAllRows: selectAllRows,
              clearSelected: clearSelected
            });
          } else {
            data.domProps = htmlOrText(field.labelHtml);
          }

          return h(BTh, data, slot);
        }; // Generate the array of <th> cells


        var $cells = fields.map(makeCell).filter(function (th) {
          return th;
        }); // Genrate the row(s)

        var $trs = [];

        if (isFoot) {
          var trProps = {
            variant: isUndefinedOrNull(this.footRowVariant) ? this.headRowVariant : this.footRowVariant
          };
          $trs.push(h(BTr, {
            class: this.tfootTrClass,
            props: trProps
          }, $cells));
        } else {
          var scope = {
            columns: fields.length,
            fields: fields,
            // Add in row select methods
            selectAllRows: selectAllRows,
            clearSelected: clearSelected
          };
          $trs.push(this.normalizeSlot('thead-top', scope) || h());
          $trs.push(h(BTr, {
            class: this.theadTrClass,
            props: {
              variant: this.headRowVariant
            }
          }, $cells));
        }

        return h(isFoot ? BTfoot : BThead, {
          key: isFoot ? 'bv-tfoot' : 'bv-thead',
          class: (isFoot ? this.tfootClass : this.theadClass) || null,
          props: isFoot ? {
            footVariant: this.footVariant || this.headVariant || null
          } : {
            headVariant: this.headVariant || null
          }
        }, $trs);
      }
    }
  };

  var tfootMixin = {
    props: {
      footClone: {
        type: Boolean,
        default: false
      },
      footVariant: {
        type: String,
        // 'dark', 'light', or `null` (or custom)
        default: function _default() {
          return getComponentConfig('BTable', 'footVariant');
        }
      },
      footRowVariant: {
        type: String,
        // Any Bootstrap theme variant (or custom). Falls back to `headRowVariant`
        default: null
      },
      tfootClass: {
        type: [String, Array, Object],
        default: null
      },
      tfootTrClass: {
        type: [String, Array, Object],
        default: null
      }
    },
    methods: {
      renderTFootCustom: function renderTFootCustom() {
        var h = this.$createElement;

        if (this.hasNormalizedSlot('custom-foot')) {
          return h(BTfoot, {
            key: 'bv-tfoot-custom',
            class: this.tfootClass || null,
            props: {
              footVariant: this.footVariant || this.headVariant || null
            }
          }, this.normalizeSlot('custom-foot', {
            items: this.computedItems.slice(),
            fields: this.computedFields.slice(),
            columns: this.computedFields.length
          }));
        } else {
          return h();
        }
      },
      renderTfoot: function renderTfoot() {
        // Passing true to renderThead will make it render a tfoot
        return this.footClone ? this.renderThead(true) : this.renderTFootCustom();
      }
    }
  };

  var props$X = {
    tbodyTransitionProps: {
      type: Object // default: undefined

    },
    tbodyTransitionHandlers: {
      type: Object // default: undefined

    }
  }; // @vue/component

  var BTbody =
  /*#__PURE__*/
  Vue.extend({
    name: 'BTbody',
    mixins: [normalizeSlotMixin],
    inheritAttrs: false,
    provide: function provide() {
      return {
        bvTableRowGroup: this
      };
    },
    inject: {
      bvTable: {
        // Sniffed by <b-tr> / <b-td> / <b-th>
        default: function _default()
        /* istanbul ignore next */
        {
          return {};
        }
      }
    },
    props: props$X,
    computed: {
      isTbody: function isTbody() {
        // Sniffed by <b-tr> / <b-td> / <b-th>
        return true;
      },
      isDark: function isDark() {
        // Sniffed by <b-tr> / <b-td> / <b-th>
        return this.bvTable.dark;
      },
      isStacked: function isStacked() {
        // Sniffed by <b-tr> / <b-td> / <b-th>
        return this.bvTable.isStacked;
      },
      isResponsive: function isResponsive() {
        // Sniffed by <b-tr> / <b-td> / <b-th>
        return this.bvTable.isResponsive;
      },
      isStickyHeader: function isStickyHeader() {
        // Sniffed by <b-tr> / <b-td> / <b-th>
        // Sticky headers are only supported in thead
        return false;
      },
      hasStickyHeader: function hasStickyHeader() {
        // Sniffed by <b-tr> / <b-td> / <b-th>
        // Needed to handle header background classes, due to lack of
        // background color inheritance with Bootstrap v4 table CSS
        return !this.isStacked && this.bvTable.stickyHeader;
      },
      tableVariant: function tableVariant()
      /* istanbul ignore next: Not currently sniffed in tests */
      {
        // Sniffed by <b-tr> / <b-td> / <b-th>
        return this.bvTable.tableVariant;
      },
      isTransitionGroup: function isTransitionGroup() {
        return this.tbodyTransitionProps || this.tbodyTransitionHandlers;
      },
      tbodyAttrs: function tbodyAttrs() {
        return _objectSpread2({
          role: 'rowgroup'
        }, this.$attrs);
      },
      tbodyProps: function tbodyProps() {
        return this.tbodyTransitionProps ? _objectSpread2({}, this.tbodyTransitionProps, {
          tag: 'tbody'
        }) : {};
      }
    },
    render: function render(h) {
      var data = {
        props: this.tbodyProps,
        attrs: this.tbodyAttrs
      };

      if (this.isTransitionGroup) {
        // We use native listeners if a transition group
        // for any delegated events
        data.on = this.tbodyTransitionHandlers || {};
        data.nativeOn = this.$listeners || {};
      } else {
        // Otherwise we place any listeners on the tbody element
        data.on = this.$listeners || {};
      }

      return h(this.isTransitionGroup ? 'transition-group' : 'tbody', data, this.normalizeSlot('default', {}));
    }
  });

  var detailsSlotName = 'row-details';
  var tbodyRowMixin = {
    props: {
      tbodyTrClass: {
        type: [String, Array, Object, Function],
        default: null
      },
      detailsTdClass: {
        type: [String, Array, Object],
        default: null
      }
    },
    methods: {
      // Methods for computing classes, attributes and styles for table cells
      getTdValues: function getTdValues(item, key, tdValue, defValue) {
        var parent = this.$parent;

        if (tdValue) {
          var value = get(item, key, '');

          if (isFunction(tdValue)) {
            return tdValue(value, key, item);
          } else if (isString(tdValue) && isFunction(parent[tdValue])) {
            return parent[tdValue](value, key, item);
          }

          return tdValue;
        }

        return defValue;
      },
      getThValues: function getThValues(item, key, thValue, type, defValue) {
        var parent = this.$parent;

        if (thValue) {
          var value = get(item, key, '');

          if (isFunction(thValue)) {
            return thValue(value, key, item, type);
          } else if (isString(thValue) && isFunction(parent[thValue])) {
            return parent[thValue](value, key, item, type);
          }

          return thValue;
        }

        return defValue;
      },
      // Method to get the value for a field
      getFormattedValue: function getFormattedValue(item, field) {
        var key = field.key;
        var formatter = this.getFieldFormatter(key);
        var value = get(item, key, null);

        if (isFunction(formatter)) {
          value = formatter(value, key, item);
        }

        return isUndefinedOrNull(value) ? '' : value;
      },
      // Factory function methods
      toggleDetailsFactory: function toggleDetailsFactory(hasDetailsSlot, item) {
        var _this = this;

        // Returns a function to toggle a row's details slot
        return function () {
          if (hasDetailsSlot) {
            _this.$set(item, '_showDetails', !item._showDetails);
          }
        };
      },
      // Row event handlers
      rowHovered: function rowHovered(evt) {
        // `mouseenter` handler (non-bubbling)
        // `this.tbodyRowEvtStopped` from tbody mixin
        if (!this.tbodyRowEvtStopped(evt)) {
          // `this.emitTbodyRowEvent` from tbody mixin
          this.emitTbodyRowEvent('row-hovered', evt);
        }
      },
      rowUnhovered: function rowUnhovered(evt) {
        // `mouseleave` handler (non-bubbling)
        // `this.tbodyRowEvtStopped` from tbody mixin
        if (!this.tbodyRowEvtStopped(evt)) {
          // `this.emitTbodyRowEvent` from tbody mixin
          this.emitTbodyRowEvent('row-unhovered', evt);
        }
      },
      // Render helpers
      renderTbodyRowCell: function renderTbodyRowCell(field, colIndex, item, rowIndex) {
        var _this2 = this;

        // Renders a TD or TH for a row's field
        var h = this.$createElement;
        var hasDetailsSlot = this.hasNormalizedSlot(detailsSlotName);
        var formatted = this.getFormattedValue(item, field);
        var key = field.key;
        var stickyColumn = !this.isStacked && (this.isResponsive || this.stickyHeader) && field.stickyColumn; // We only uses the helper components for sticky columns to
        // improve performance of BTable/BTableLite by reducing the
        // total number of vue instances created during render

        var cellTag = stickyColumn ? field.isRowHeader ? BTh : BTd : field.isRowHeader ? 'th' : 'td';
        var cellVariant = item._cellVariants && item._cellVariants[key] ? item._cellVariants[key] : field.variant || null;
        var data = {
          // For the Vue key, we concatenate the column index and
          // field key (as field keys could be duplicated)
          // TODO: Although we do prevent duplicate field keys...
          //   So we could change this to: `row-${rowIndex}-cell-${key}`
          key: "row-".concat(rowIndex, "-cell-").concat(colIndex, "-").concat(key),
          class: [field.class ? field.class : '', this.getTdValues(item, key, field.tdClass, '')],
          props: {},
          attrs: _objectSpread2({
            'aria-colindex': String(colIndex + 1)
          }, field.isRowHeader ? this.getThValues(item, key, field.thAttr, 'row', {}) : this.getTdValues(item, key, field.tdAttr, {}))
        };

        if (stickyColumn) {
          // We are using the helper BTd or BTh
          data.props = {
            stackedHeading: this.isStacked ? field.label : null,
            stickyColumn: true,
            variant: cellVariant
          };
        } else {
          // Using native TD or TH element, so we need to
          // add in the attributes and variant class
          data.attrs['data-label'] = this.isStacked && !isUndefinedOrNull(field.label) ? toString$1(field.label) : null;
          data.attrs.role = field.isRowHeader ? 'rowheader' : 'cell';
          data.attrs.scope = field.isRowHeader ? 'row' : null; // Add in the variant class

          if (cellVariant) {
            data.class.push("".concat(this.dark ? 'bg' : 'table', "-").concat(cellVariant));
          }
        }

        var slotScope = {
          item: item,
          index: rowIndex,
          field: field,
          unformatted: get(item, key, ''),
          value: formatted,
          toggleDetails: this.toggleDetailsFactory(hasDetailsSlot, item),
          detailsShowing: Boolean(item._showDetails)
        }; // If table supports selectable mode, then add in the following scope
        // this.supportsSelectableRows will be undefined if mixin isn't loaded

        if (this.supportsSelectableRows) {
          slotScope.rowSelected = this.isRowSelected(rowIndex);

          slotScope.selectRow = function () {
            return _this2.selectRow(rowIndex);
          };

          slotScope.unselectRow = function () {
            return _this2.unselectRow(rowIndex);
          };
        } // The new `v-slot` syntax doesn't like a slot name starting with
        // a square bracket and if using in-document HTML templates, the
        // v-slot attributes are lower-cased by the browser.
        // Switched to round bracket syntax to prevent confusion with
        // dynamic slot name syntax.
        // We look for slots in this order: `cell(${key})`, `cell(${key.toLowerCase()})`, 'cell()'
        // Slot names are now cached by mixin tbody in `this.$_bodyFieldSlotNameCache`
        // Will be `null` if no slot (or fallback slot) exists


        var slotName = this.$_bodyFieldSlotNameCache[key];
        var $childNodes = slotName ? this.normalizeSlot(slotName, slotScope) : toString$1(formatted);

        if (this.isStacked) {
          // We wrap in a DIV to ensure rendered as a single cell when visually stacked!
          $childNodes = [h('div', {}, [$childNodes])];
        } // Render either a td or th cell


        return h(cellTag, data, [$childNodes]);
      },
      renderTbodyRow: function renderTbodyRow(item, rowIndex) {
        var _this3 = this;

        // Renders an item's row (or rows if details supported)
        var h = this.$createElement;
        var fields = this.computedFields;
        var tableStriped = this.striped;
        var hasDetailsSlot = this.hasNormalizedSlot(detailsSlotName);
        var rowShowDetails = Boolean(item._showDetails && hasDetailsSlot);
        var hasRowClickHandler = this.$listeners['row-clicked'] || this.hasSelectableRowClick; // We can return more than one TR if rowDetails enabled

        var $rows = []; // Details ID needed for `aria-details` when details showing
        // We set it to `null` when not showing so that attribute
        // does not appear on the element

        var detailsId = rowShowDetails ? this.safeId("_details_".concat(rowIndex, "_")) : null; // For each item data field in row

        var $tds = fields.map(function (field, colIndex) {
          return _this3.renderTbodyRowCell(field, colIndex, item, rowIndex);
        }); // Calculate the row number in the dataset (indexed from 1)

        var ariaRowIndex = null;

        if (this.currentPage && this.perPage && this.perPage > 0) {
          ariaRowIndex = String((this.currentPage - 1) * this.perPage + rowIndex + 1);
        } // Create a unique :key to help ensure that sub components are re-rendered rather than
        // re-used, which can cause issues. If a primary key is not provided we use the rendered
        // rows index within the tbody.
        // See: https://github.com/bootstrap-vue/bootstrap-vue/issues/2410


        var primaryKey = this.primaryKey;
        var primaryKeyValue = toString$1(get(item, primaryKey)) || null;
        var rowKey = primaryKeyValue || String(rowIndex); // If primary key is provided, use it to generate a unique ID on each tbody > tr
        // In the format of '{tableId}__row_{primaryKeyValue}'

        var rowId = primaryKeyValue ? this.safeId("_row_".concat(primaryKeyValue)) : null; // Selectable classes and attributes

        var selectableClasses = this.selectableRowClasses ? this.selectableRowClasses(rowIndex) : {};
        var selectableAttrs = this.selectableRowAttrs ? this.selectableRowAttrs(rowIndex) : {}; // Add the item row

        $rows.push(h(BTr, {
          key: "__b-table-row-".concat(rowKey, "__"),
          ref: 'itemRows',
          refInFor: true,
          class: [isFunction(this.tbodyTrClass) ? this.tbodyTrClass(item, 'row') : this.tbodyTrClass, selectableClasses, rowShowDetails ? 'b-table-has-details' : ''],
          props: {
            variant: item._rowVariant || null
          },
          attrs: _objectSpread2({
            id: rowId,
            tabindex: hasRowClickHandler ? '0' : null,
            'data-pk': primaryKeyValue || null,
            'aria-details': detailsId,
            'aria-owns': detailsId,
            'aria-rowindex': ariaRowIndex
          }, selectableAttrs),
          on: {
            // Note: These events are not A11Y friendly!
            mouseenter: this.rowHovered,
            mouseleave: this.rowUnhovered
          }
        }, $tds)); // Row Details slot

        if (rowShowDetails) {
          var detailsScope = {
            item: item,
            index: rowIndex,
            fields: fields,
            toggleDetails: this.toggleDetailsFactory(hasDetailsSlot, item)
          }; // If table supports selectable mode, then add in the following scope
          // this.supportsSelectableRows will be undefined if mixin isn't loaded

          if (this.supportsSelectableRows) {
            detailsScope.rowSelected = this.isRowSelected(rowIndex);

            detailsScope.selectRow = function () {
              return _this3.selectRow(rowIndex);
            };

            detailsScope.unselectRow = function () {
              return _this3.unselectRow(rowIndex);
            };
          } // Render the details slot in a TD


          var $details = h(BTd, {
            props: {
              colspan: fields.length
            },
            class: this.detailsTdClass
          }, [this.normalizeSlot(detailsSlotName, detailsScope)]); // Add a hidden row to keep table row striping consistent when details showing
          // Only added if the table is striped

          if (tableStriped) {
            $rows.push( // We don't use `BTr` here as we don't need the extra functionality
            h('tr', {
              key: "__b-table-details-stripe__".concat(rowKey),
              staticClass: 'd-none',
              attrs: {
                'aria-hidden': 'true',
                role: 'presentation'
              }
            }));
          } // Add the actual details row


          $rows.push(h(BTr, {
            key: "__b-table-details__".concat(rowKey),
            staticClass: 'b-table-details',
            class: [isFunction(this.tbodyTrClass) ? this.tbodyTrClass(item, detailsSlotName) : this.tbodyTrClass],
            props: {
              variant: item._rowVariant || null
            },
            attrs: {
              id: detailsId,
              tabindex: '-1'
            }
          }, [$details]));
        } else if (hasDetailsSlot) {
          // Only add the placeholder if a the table has a row-details slot defined (but not shown)
          $rows.push(h());

          if (tableStriped) {
            // Add extra placeholder if table is striped
            $rows.push(h());
          }
        } // Return the row(s)


        return $rows;
      }
    }
  };

  var props$Y = _objectSpread2({}, props$X, {
    tbodyClass: {
      type: [String, Array, Object] // default: undefined

    }
  });

  var tbodyMixin = {
    mixins: [tbodyRowMixin],
    props: props$Y,
    methods: {
      // Helper methods
      getTbodyTrs: function getTbodyTrs() {
        // Returns all the item TR elements (excludes detail and spacer rows)
        // `this.$refs.itemRows` is an array of item TR components/elements
        // Rows should all be B-TR components, but we map to TR elements
        // Also note that `this.$refs.itemRows` may not always be in document order
        var tbody = this.$refs.tbody.$el || this.$refs.tbody;
        var trs = (this.$refs.itemRows || []).map(function (tr) {
          return tr.$el || tr;
        }); // TODO: This may take time for tables many rows, so we may want to cache
        //       the result of this during each render cycle on a non-reactive
        //       property. We clear out the cache as each render starts, and
        //       populate it on first access of this method if null

        return from(tbody.children).filter(function (tr) {
          return arrayIncludes(trs, tr);
        });
      },
      getTbodyTrIndex: function getTbodyTrIndex(el) {
        // Returns index of a particular TBODY item TR
        // We set `true` on closest to include self in result

        /* istanbul ignore next: should not normally happen */
        if (!isElement(el)) {
          return -1;
        }

        var tr = el.tagName === 'TR' ? el : closest('tr', el, true);
        return tr ? this.getTbodyTrs().indexOf(tr) : -1;
      },
      emitTbodyRowEvent: function emitTbodyRowEvent(type, evt) {
        // Emits a row event, with the item object, row index and original event
        if (type && evt && evt.target) {
          var rowIndex = this.getTbodyTrIndex(evt.target);

          if (rowIndex > -1) {
            // The array of TRs correlate to the `computedItems` array
            var item = this.computedItems[rowIndex];
            this.$emit(type, item, rowIndex, evt);
          }
        }
      },
      tbodyRowEvtStopped: function tbodyRowEvtStopped(evt) {
        return this.stopIfBusy && this.stopIfBusy(evt);
      },
      // Delegated row event handlers
      onTbodyRowKeydown: function onTbodyRowKeydown(evt) {
        // Keyboard navigation and row click emulation
        var target = evt.target;

        if (this.tbodyRowEvtStopped(evt) || target.tagName !== 'TR' || target !== document.activeElement || target.tabIndex !== 0) {
          // Early exit if not an item row TR
          return;
        }

        var keyCode = evt.keyCode;

        if (arrayIncludes([KEY_CODES.ENTER, KEY_CODES.SPACE], keyCode)) {
          // Emulated click for keyboard users, transfer to click handler
          evt.stopPropagation();
          evt.preventDefault();
          this.onTBodyRowClicked(evt);
        } else if (arrayIncludes([KEY_CODES.UP, KEY_CODES.DOWN, KEY_CODES.HOME, KEY_CODES.END], keyCode)) {
          // Keyboard navigation
          var rowIndex = this.getTbodyTrIndex(target);

          if (rowIndex > -1) {
            evt.stopPropagation();
            evt.preventDefault();
            var trs = this.getTbodyTrs();
            var shift = evt.shiftKey;

            if (keyCode === KEY_CODES.HOME || shift && keyCode === KEY_CODES.UP) {
              // Focus first row
              trs[0].focus();
            } else if (keyCode === KEY_CODES.END || shift && keyCode === KEY_CODES.DOWN) {
              // Focus last row
              trs[trs.length - 1].focus();
            } else if (keyCode === KEY_CODES.UP && rowIndex > 0) {
              // Focus previous row
              trs[rowIndex - 1].focus();
            } else if (keyCode === KEY_CODES.DOWN && rowIndex < trs.length - 1) {
              // Focus next row
              trs[rowIndex + 1].focus();
            }
          }
        }
      },
      onTBodyRowClicked: function onTBodyRowClicked(evt) {
        if (this.tbodyRowEvtStopped(evt)) {
          // If table is busy, then don't propagate
          return;
        } else if (filterEvent(evt) || textSelectionActive(this.$el)) {
          // Clicked on a non-disabled control so ignore
          // Or user is selecting text, so ignore
          return;
        }

        this.emitTbodyRowEvent('row-clicked', evt);
      },
      onTbodyRowMiddleMouseRowClicked: function onTbodyRowMiddleMouseRowClicked(evt) {
        if (!this.tbodyRowEvtStopped(evt) && evt.which === 2) {
          this.emitTbodyRowEvent('row-middle-clicked', evt);
        }
      },
      onTbodyRowContextmenu: function onTbodyRowContextmenu(evt) {
        if (!this.tbodyRowEvtStopped(evt)) {
          this.emitTbodyRowEvent('row-contextmenu', evt);
        }
      },
      onTbodyRowDblClicked: function onTbodyRowDblClicked(evt) {
        if (!this.tbodyRowEvtStopped(evt) && !filterEvent(evt)) {
          this.emitTbodyRowEvent('row-dblclicked', evt);
        }
      },
      // Note: Row hover handlers are handled by the tbody-row mixin
      // As mouseenter/mouseleave events do not bubble
      //
      // Render Helper
      renderTbody: function renderTbody() {
        var _this = this;

        // Render the tbody element and children
        var items = this.computedItems; // Shortcut to `createElement` (could use `this._c()` instead)

        var h = this.$createElement;
        var hasRowClickHandler = this.$listeners['row-clicked'] || this.hasSelectableRowClick; // Prepare the tbody rows

        var $rows = []; // Add the item data rows or the busy slot

        var $busy = this.renderBusy ? this.renderBusy() : null;

        if ($busy) {
          // If table is busy and a busy slot, then return only the busy "row" indicator
          $rows.push($busy);
        } else {
          // Table isn't busy, or we don't have a busy slot
          // Create a slot cache for improved performance when looking up cell slot names
          // Values will be keyed by the field's `key` and will store the slot's name
          // Slots could be dynamic (i.e. `v-if`), so we must compute on each render
          // Used by tbody-row mixin render helper
          var cache = {};
          var defaultSlotName = this.hasNormalizedSlot('cell()') ? 'cell()' : null;
          this.computedFields.forEach(function (field) {
            var key = field.key;
            var fullName = "cell(".concat(key, ")");
            var lowerName = "cell(".concat(key.toLowerCase(), ")");
            cache[key] = _this.hasNormalizedSlot(fullName) ? fullName : _this.hasNormalizedSlot(lowerName) ? lowerName : defaultSlotName;
          }); // Created as a non-reactive property so to not trigger component updates
          // Must be a fresh object each render

          this.$_bodyFieldSlotNameCache = cache; // Add static top row slot (hidden in visibly stacked mode
          // as we can't control `data-label` attr)

          $rows.push(this.renderTopRow ? this.renderTopRow() : h()); // Render the rows

          items.forEach(function (item, rowIndex) {
            // Render the individual item row (rows if details slot)
            $rows.push(_this.renderTbodyRow(item, rowIndex));
          }); // Empty items / empty filtered row slot (only shows if `items.length < 1`)

          $rows.push(this.renderEmpty ? this.renderEmpty() : h()); // Static bottom row slot (hidden in visibly stacked mode
          // as we can't control `data-label` attr)

          $rows.push(this.renderBottomRow ? this.renderBottomRow() : h());
        }

        var handlers = {
          // TODO: We may want to to only instantiate these handlers
          //       if there is an event listener registered
          auxclick: this.onTbodyRowMiddleMouseRowClicked,
          // TODO: Perhaps we do want to automatically prevent the
          //       default context menu from showing if there is
          //       a `row-contextmenu` listener registered.
          contextmenu: this.onTbodyRowContextmenu,
          // The following event(s) is not considered A11Y friendly
          dblclick: this.onTbodyRowDblClicked // hover events (mouseenter/mouseleave) ad handled by tbody-row mixin

        };

        if (hasRowClickHandler) {
          handlers.click = this.onTBodyRowClicked;
          handlers.keydown = this.onTbodyRowKeydown;
        } // Assemble rows into the tbody


        var $tbody = h(BTbody, {
          ref: 'tbody',
          class: this.tbodyClass || null,
          props: {
            tbodyTransitionProps: this.tbodyTransitionProps,
            tbodyTransitionHandlers: this.tbodyTransitionHandlers
          },
          // BTbody transfers all native event listeners to the root element
          // TODO: Only set the handlers if the table is not busy
          on: handlers
        }, $rows); // Return the assembled tbody

        return $tbody;
      }
    }
  };

  var emptyMixin = {
    props: {
      showEmpty: {
        type: Boolean,
        default: false
      },
      emptyText: {
        type: String,
        default: 'There are no records to show'
      },
      emptyHtml: {
        type: String
      },
      emptyFilteredText: {
        type: String,
        default: 'There are no records matching your request'
      },
      emptyFilteredHtml: {
        type: String
      }
    },
    methods: {
      renderEmpty: function renderEmpty() {
        var h = this.$createElement;
        var items = this.computedItems;
        var $empty;

        if (this.showEmpty && (!items || items.length === 0) && !(this.computedBusy && this.hasNormalizedSlot('table-busy'))) {
          $empty = this.normalizeSlot(this.isFiltered ? 'emptyfiltered' : 'empty', {
            emptyFilteredHtml: this.emptyFilteredHtml,
            emptyFilteredText: this.emptyFilteredText,
            emptyHtml: this.emptyHtml,
            emptyText: this.emptyText,
            fields: this.computedFields,
            // Not sure why this is included, as it will always be an empty array
            items: this.computedItems
          });

          if (!$empty) {
            $empty = h('div', {
              class: ['text-center', 'my-2'],
              domProps: this.isFiltered ? htmlOrText(this.emptyFilteredHtml, this.emptyFilteredText) : htmlOrText(this.emptyHtml, this.emptyText)
            });
          }

          $empty = h(BTd, {
            props: {
              colspan: this.computedFields.length || null
            }
          }, [h('div', {
            attrs: {
              role: 'alert',
              'aria-live': 'polite'
            }
          }, [$empty])]);
          $empty = h(BTr, {
            key: this.isFiltered ? 'b-empty-filtered-row' : 'b-empty-row',
            staticClass: 'b-table-empty-row',
            class: [isFunction(this.tbodyTrClass) ? this.tbodyTrClass(null, 'row-empty') : this.tbodyTrClass]
          }, [$empty]);
        }

        return $empty || h();
      }
    }
  };

  var slotName = 'top-row';
  var topRowMixin = {
    methods: {
      renderTopRow: function renderTopRow() {
        var h = this.$createElement; // Add static Top Row slot (hidden in visibly stacked mode as we can't control the data-label)
        // If in *always* stacked mode, we don't bother rendering the row

        if (!this.hasNormalizedSlot(slotName) || this.stacked === true || this.stacked === '') {
          return h();
        }

        var fields = this.computedFields;
        return h(BTr, {
          key: 'b-top-row',
          staticClass: 'b-table-top-row',
          class: [isFunction(this.tbodyTrClass) ? this.tbodyTrClass(null, 'row-top') : this.tbodyTrClass]
        }, [this.normalizeSlot(slotName, {
          columns: fields.length,
          fields: fields
        })]);
      }
    }
  };

  var slotName$1 = 'bottom-row';
  var bottomRowMixin = {
    methods: {
      renderBottomRow: function renderBottomRow() {
        var h = this.$createElement; // Static bottom row slot (hidden in visibly stacked mode as we can't control the data-label)
        // If in *always* stacked mode, we don't bother rendering the row

        if (!this.hasNormalizedSlot(slotName$1) || this.stacked === true || this.stacked === '') {
          return h();
        }

        var fields = this.computedFields;
        return h(BTr, {
          key: 'b-bottom-row',
          staticClass: 'b-table-bottom-row',
          class: [isFunction(this.tbodyTrClass) ? this.tbodyTrClass(null, 'row-bottom') : this.tbodyTrClass]
        }, this.normalizeSlot(slotName$1, {
          columns: fields.length,
          fields: fields
        }));
      }
    }
  };

  var busySlotName = 'table-busy';
  var busyMixin = {
    props: {
      busy: {
        type: Boolean,
        default: false
      }
    },
    data: function data() {
      return {
        localBusy: false
      };
    },
    computed: {
      computedBusy: function computedBusy() {
        return this.busy || this.localBusy;
      }
    },
    watch: {
      localBusy: function localBusy(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.$emit('update:busy', newVal);
        }
      }
    },
    methods: {
      // Event handler helper
      stopIfBusy: function stopIfBusy(evt) {
        if (this.computedBusy) {
          // If table is busy (via provider) then don't propagate
          evt.preventDefault();
          evt.stopPropagation();
          return true;
        }

        return false;
      },
      // Render the busy indicator or return `null` if not busy
      renderBusy: function renderBusy() {
        var h = this.$createElement; // Return a busy indicator row, or `null` if not busy

        if (this.computedBusy && this.hasNormalizedSlot(busySlotName)) {
          // Show the busy slot
          return h(BTr, {
            key: 'table-busy-slot',
            staticClass: 'b-table-busy-slot',
            class: [isFunction(this.tbodyTrClass) ? this.tbodyTrClass(null, busySlotName) : this.tbodyTrClass]
          }, [h(BTd, {
            props: {
              colspan: this.computedFields.length || null
            }
          }, [this.normalizeSlot(busySlotName)])]);
        } else {
          // We return `null` here so that we can determine if we need to
          // render the table items rows or not
          return null;
        }
      }
    }
  };

  var selectableMixin = {
    props: {
      selectable: {
        type: Boolean,
        default: false
      },
      selectMode: {
        type: String,
        default: 'multi',
        validator: function validator(val) {
          return arrayIncludes(['range', 'multi', 'single'], val);
        }
      },
      selectedVariant: {
        type: String,
        default: function _default() {
          return getComponentConfig('BTable', 'selectedVariant');
        }
      },
      noSelectOnClick: {
        // Disable use of click handlers for row selection
        type: Boolean,
        default: false
      }
    },
    data: function data() {
      return {
        selectedRows: [],
        selectedLastRow: -1
      };
    },
    computed: {
      isSelectable: function isSelectable() {
        return this.selectable && this.selectMode;
      },
      hasSelectableRowClick: function hasSelectableRowClick() {
        return this.isSelectable && !this.noSelectOnClick;
      },
      supportsSelectableRows: function supportsSelectableRows() {
        return true;
      },
      selectableHasSelection: function selectableHasSelection() {
        return this.isSelectable && this.selectedRows && this.selectedRows.length > 0 && this.selectedRows.some(Boolean);
      },
      selectableIsMultiSelect: function selectableIsMultiSelect() {
        return this.isSelectable && arrayIncludes(['range', 'multi'], this.selectMode);
      },
      selectableTableClasses: function selectableTableClasses() {
        var _ref;

        return _ref = {
          'b-table-selectable': this.isSelectable
        }, _defineProperty(_ref, "b-table-select-".concat(this.selectMode), this.isSelectable), _defineProperty(_ref, 'b-table-selecting', this.selectableHasSelection), _defineProperty(_ref, 'b-table-selectable-no-click', this.isSelectable && !this.hasSelectableRowClick), _ref;
      },
      selectableTableAttrs: function selectableTableAttrs() {
        return {
          // TODO:
          //   Should this attribute not be included when no-select-on-click is set
          //   since this attribute implies keyboard navigation?
          'aria-multiselectable': !this.isSelectable ? null : this.selectableIsMultiSelect ? 'true' : 'false'
        };
      }
    },
    watch: {
      computedItems: function computedItems(newVal, oldVal) {
        // Reset for selectable
        var equal = false;

        if (this.isSelectable && this.selectedRows.length > 0) {
          // Quick check against array length
          equal = isArray(newVal) && isArray(oldVal) && newVal.length === oldVal.length;

          for (var i = 0; equal && i < newVal.length; i++) {
            // Look for the first non-loosely equal row, after ignoring reserved fields
            equal = looseEqual(sanitizeRow(newVal[i]), sanitizeRow(oldVal[i]));
          }
        }

        if (!equal) {
          this.clearSelected();
        }
      },
      selectable: function selectable(newVal, oldVal) {
        this.clearSelected();
        this.setSelectionHandlers(newVal);
      },
      selectMode: function selectMode(newVal, oldVal) {
        this.clearSelected();
      },
      hasSelectableRowClick: function hasSelectableRowClick(newVal, oldVal) {
        this.clearSelected();
        this.setSelectionHandlers(!newVal);
      },
      selectedRows: function selectedRows(_selectedRows, oldVal) {
        var _this = this;

        if (this.isSelectable && !looseEqual(_selectedRows, oldVal)) {
          var items = []; // `.forEach()` skips over non-existent indices (on sparse arrays)

          _selectedRows.forEach(function (v, idx) {
            if (v) {
              items.push(_this.computedItems[idx]);
            }
          });

          this.$emit('row-selected', items);
        }
      }
    },
    beforeMount: function beforeMount() {
      // Set up handlers if needed
      if (this.isSelectable) {
        this.setSelectionHandlers(true);
      }
    },
    methods: {
      // Public methods
      selectRow: function selectRow(index) {
        // Select a particular row (indexed based on computedItems)
        if (this.isSelectable && isNumber(index) && index >= 0 && index < this.computedItems.length && !this.isRowSelected(index)) {
          var selectedRows = this.selectableIsMultiSelect ? this.selectedRows.slice() : [];
          selectedRows[index] = true;
          this.selectedLastClicked = -1;
          this.selectedRows = selectedRows;
        }
      },
      unselectRow: function unselectRow(index) {
        // Un-select a particular row (indexed based on `computedItems`)
        if (this.isSelectable && isNumber(index) && this.isRowSelected(index)) {
          var selectedRows = this.selectedRows.slice();
          selectedRows[index] = false;
          this.selectedLastClicked = -1;
          this.selectedRows = selectedRows;
        }
      },
      selectAllRows: function selectAllRows() {
        var length = this.computedItems.length;

        if (this.isSelectable && length > 0) {
          this.selectedLastClicked = -1;
          this.selectedRows = this.selectableIsMultiSelect ? range(length).map(function (i) {
            return true;
          }) : [true];
        }
      },
      isRowSelected: function isRowSelected(index) {
        // Determine if a row is selected (indexed based on `computedItems`)
        return Boolean(isNumber(index) && this.selectedRows[index]);
      },
      clearSelected: function clearSelected() {
        // Clear any active selected row(s)
        this.selectedLastClicked = -1;
        this.selectedRows = [];
      },
      // Internal private methods
      selectableRowClasses: function selectableRowClasses(index) {
        if (this.isSelectable && this.isRowSelected(index)) {
          var variant = this.selectedVariant;
          return _defineProperty({
            'b-table-row-selected': true
          }, "".concat(this.dark ? 'bg' : 'table', "-").concat(variant), variant);
        } else {
          return {};
        }
      },
      selectableRowAttrs: function selectableRowAttrs(index) {
        return {
          'aria-selected': !this.isSelectable ? null : this.isRowSelected(index) ? 'true' : 'false'
        };
      },
      setSelectionHandlers: function setSelectionHandlers(on) {
        var method = on && !this.noSelectOnClick ? '$on' : '$off'; // Handle row-clicked event

        this[method]('row-clicked', this.selectionHandler); // Clear selection on filter, pagination, and sort changes

        this[method]('filtered', this.clearSelected);
        this[method]('context-changed', this.clearSelected);
      },
      selectionHandler: function selectionHandler(item, index, evt) {
        /* istanbul ignore if: should never happen */
        if (!this.isSelectable || this.noSelectOnClick) {
          // Don't do anything if table is not in selectable mode
          this.clearSelected();
          return;
        }

        var selectMode = this.selectMode;
        var selectedRows = this.selectedRows.slice();
        var selected = !selectedRows[index]; // Note 'multi' mode needs no special event handling

        if (selectMode === 'single') {
          selectedRows = [];
        } else if (selectMode === 'range') {
          if (this.selectedLastRow > -1 && evt.shiftKey) {
            // range
            for (var idx = Math.min(this.selectedLastRow, index); idx <= Math.max(this.selectedLastRow, index); idx++) {
              selectedRows[idx] = true;
            }

            selected = true;
          } else {
            if (!(evt.ctrlKey || evt.metaKey)) {
              // Clear range selection if any
              selectedRows = [];
              selected = true;
            }

            this.selectedLastRow = selected ? index : -1;
          }
        }

        selectedRows[index] = selected;
        this.selectedRows = selectedRows;
      }
    }
  };

  var providerMixin = {
    mixins: [listenOnRootMixin],
    props: {
      // Prop override(s)
      items: {
        // Adds in 'Function' support
        type: [Array, Function],
        default: function _default()
        /* istanbul ignore next */
        {
          return [];
        }
      },
      // Additional props
      noProviderPaging: {
        type: Boolean,
        default: false
      },
      noProviderSorting: {
        type: Boolean,
        default: false
      },
      noProviderFiltering: {
        type: Boolean,
        default: false
      },
      apiUrl: {
        // Passthrough prop. Passed to the context object. Not used by b-table directly
        type: String,
        default: ''
      }
    },
    computed: {
      hasProvider: function hasProvider() {
        return isFunction(this.items);
      },
      providerTriggerContext: function providerTriggerContext() {
        // Used to trigger the provider function via a watcher. Only the fields that
        // are needed for triggering a provider update are included. Note that the
        // regular this.context is sent to the provider during fetches though, as they
        // may need all the prop info.
        var ctx = {
          apiUrl: this.apiUrl,
          filter: null,
          sortBy: null,
          sortDesc: null,
          perPage: null,
          currentPage: null
        };

        if (!this.noProviderFiltering) {
          // Either a string, or could be an object or array.
          ctx.filter = this.localFilter;
        }

        if (!this.noProviderSorting) {
          ctx.sortBy = this.localSortBy;
          ctx.sortDesc = this.localSortDesc;
        }

        if (!this.noProviderPaging) {
          ctx.perPage = this.perPage;
          ctx.currentPage = this.currentPage;
        }

        return clone(ctx);
      }
    },
    watch: {
      // Provider update triggering
      items: function items(newVal, oldVal) {
        // If a new provider has been specified, trigger an update
        if (this.hasProvider || isFunction(newVal)) {
          this.$nextTick(this._providerUpdate);
        }
      },
      providerTriggerContext: function providerTriggerContext(newVal, oldVal) {
        // Trigger the provider to update as the relevant context values have changed.
        if (!looseEqual(newVal, oldVal)) {
          this.$nextTick(this._providerUpdate);
        }
      }
    },
    mounted: function mounted() {
      var _this = this;

      // Call the items provider if necessary
      if (this.hasProvider && (!this.localItems || this.localItems.length === 0)) {
        // Fetch on mount if localItems is empty
        this._providerUpdate();
      } // Listen for global messages to tell us to force refresh the table


      this.listenOnRoot('bv::refresh::table', function (id) {
        if (id === _this.id || id === _this) {
          _this.refresh();
        }
      });
    },
    methods: {
      refresh: function refresh() {
        // Public Method: Force a refresh of the provider function
        this.$off('refreshed', this.refresh);

        if (this.computedBusy) {
          // Can't force an update when forced busy by user (busy prop === true)
          if (this.localBusy && this.hasProvider) {
            // But if provider running (localBusy), re-schedule refresh once `refreshed` emitted
            this.$on('refreshed', this.refresh);
          }
        } else {
          this.clearSelected();

          if (this.hasProvider) {
            this.$nextTick(this._providerUpdate);
          } else {
            /* istanbul ignore next */
            this.localItems = isArray(this.items) ? this.items.slice() : [];
          }
        }
      },
      // Provider related methods
      _providerSetLocal: function _providerSetLocal(items) {
        this.localItems = isArray(items) ? items.slice() : [];
        this.localBusy = false;
        this.$emit('refreshed'); // New root emit

        if (this.id) {
          this.emitOnRoot('bv::table::refreshed', this.id);
        }
      },
      _providerUpdate: function _providerUpdate() {
        var _this2 = this;

        // Refresh the provider function items.
        if (!this.hasProvider) {
          // Do nothing if no provider
          return;
        } // If table is busy, wait until refreshed before calling again


        if (this.computedBusy) {
          // Schedule a new refresh once `refreshed` is emitted
          this.$nextTick(this.refresh);
          return;
        } // Set internal busy state


        this.localBusy = true; // Call provider function with context and optional callback after DOM is fully updated

        this.$nextTick(function () {
          try {
            // Call provider function passing it the context and optional callback
            var data = _this2.items(_this2.context, _this2._providerSetLocal);

            if (isPromise(data)) {
              // Provider returned Promise
              data.then(function (items) {
                // Provider resolved with items
                _this2._providerSetLocal(items);
              });
            } else if (isArray(data)) {
              // Provider returned Array data
              _this2._providerSetLocal(data);
            } else {
              /* istanbul ignore if */
              if (_this2.items.length !== 2) {
                // Check number of arguments provider function requested
                // Provider not using callback (didn't request second argument), so we clear
                // busy state as most likely there was an error in the provider function

                /* istanbul ignore next */
                warn("b-table provider function didn't request callback and did not return a promise or data");
                _this2.localBusy = false;
              }
            }
          } catch (e)
          /* istanbul ignore next */
          {
            // Provider function borked on us, so we spew out a warning
            // and clear the busy state
            warn("b-table provider function error [".concat(e.name, "] ").concat(e.message));
            _this2.localBusy = false;

            _this2.$off('refreshed', _this2.refresh);
          }
        });
      }
    }
  };

  // Includes all main table styling options

  var tableRendererMixin = {
    // Don't place attributes on root element automatically,
    // as table could be wrapped in responsive `<div>`
    inheritAttrs: false,
    provide: function provide() {
      return {
        bvTable: this
      };
    },
    props: {
      striped: {
        type: Boolean,
        default: false
      },
      bordered: {
        type: Boolean,
        default: false
      },
      borderless: {
        type: Boolean,
        default: false
      },
      outlined: {
        type: Boolean,
        default: false
      },
      dark: {
        type: Boolean,
        default: false
      },
      hover: {
        type: Boolean,
        default: false
      },
      small: {
        type: Boolean,
        default: false
      },
      fixed: {
        type: Boolean,
        default: false
      },
      responsive: {
        type: [Boolean, String],
        default: false
      },
      stickyHeader: {
        // If a string, it is assumed to be the table `max-height` value
        type: [Boolean, String],
        default: false
      },
      noBorderCollapse: {
        type: Boolean,
        default: false
      },
      captionTop: {
        type: Boolean,
        default: false
      },
      tableVariant: {
        type: String,
        default: null
      },
      tableClass: {
        type: [String, Array, Object],
        default: null
      }
    },
    computed: {
      // Layout related computed props
      isResponsive: function isResponsive() {
        var responsive = this.responsive === '' ? true : this.responsive;
        return this.isStacked ? false : responsive;
      },
      isStickyHeader: function isStickyHeader() {
        var stickyHeader = this.stickyHeader === '' ? true : this.stickyHeader;
        return this.isStacked ? false : stickyHeader;
      },
      wrapperClasses: function wrapperClasses() {
        return [this.isStickyHeader ? 'b-table-sticky-header' : '', this.isResponsive === true ? 'table-responsive' : this.isResponsive ? "table-responsive-".concat(this.responsive) : ''].filter(Boolean);
      },
      wrapperStyles: function wrapperStyles() {
        return this.isStickyHeader && !isBoolean(this.isStickyHeader) ? {
          maxHeight: this.isStickyHeader
        } : {};
      },
      tableClasses: function tableClasses() {
        var hover = this.isTableSimple ? this.hover : this.hover && this.computedItems.length > 0 && !this.computedBusy;
        return [// User supplied classes
        this.tableClass, // Styling classes
        {
          'table-striped': this.striped,
          'table-hover': hover,
          'table-dark': this.dark,
          'table-bordered': this.bordered,
          'table-borderless': this.borderless,
          'table-sm': this.small,
          // The following are b-table custom styles
          border: this.outlined,
          'b-table-fixed': this.fixed,
          'b-table-caption-top': this.captionTop,
          'b-table-no-border-collapse': this.noBorderCollapse
        }, this.tableVariant ? "".concat(this.dark ? 'bg' : 'table', "-").concat(this.tableVariant) : '', // Stacked table classes
        this.stackedTableClasses, // Selectable classes
        this.selectableTableClasses];
      },
      tableAttrs: function tableAttrs() {
        // Preserve user supplied aria-describedby, if provided in `$attrs`
        var adb = [(this.$attrs || {})['aria-describedby'], this.captionId].filter(Boolean).join(' ') || null;
        var items = this.computedItems;
        var filteredItems = this.filteredItems;
        var fields = this.computedFields;
        var selectableAttrs = this.selectableTableAttrs || {};
        var ariaAttrs = this.isTableSimple ? {} : {
          'aria-busy': this.computedBusy ? 'true' : 'false',
          'aria-colcount': String(fields.length),
          'aria-describedby': adb
        };
        var rowCount = items && filteredItems && filteredItems.length > items.length ? String(filteredItems.length) : null;
        return _objectSpread2({
          // We set `aria-rowcount` before merging in `$attrs`,
          // in case user has supplied their own
          'aria-rowcount': rowCount
        }, this.$attrs, {
          // Now we can override any `$attrs` here
          id: this.safeId(),
          role: 'table'
        }, ariaAttrs, {}, selectableAttrs);
      }
    },
    render: function render(h) {
      var $content = [];

      if (this.isTableSimple) {
        $content.push(this.normalizeSlot('default', {}));
      } else {
        // Build the `<caption>` (from caption mixin)
        $content.push(this.renderCaption ? this.renderCaption() : null); // Build the `<colgroup>`

        $content.push(this.renderColgroup ? this.renderColgroup() : null); // Build the `<thead>`

        $content.push(this.renderThead ? this.renderThead() : null); // Build the `<tbody>`

        $content.push(this.renderTbody ? this.renderTbody() : null); // Build the `<tfoot>`

        $content.push(this.renderTfoot ? this.renderTfoot() : null);
      } // Assemble `<table>`


      var $table = h('table', {
        key: 'b-table',
        staticClass: 'table b-table',
        class: this.tableClasses,
        attrs: this.tableAttrs
      }, $content.filter(Boolean)); // Add responsive/sticky wrapper if needed and return table

      return this.wrapperClasses.length > 0 ? h('div', {
        key: 'wrap',
        class: this.wrapperClasses,
        style: this.wrapperStyles
      }, [$table]) : $table;
    }
  };

  // @vue/component

  var BTable =
  /*#__PURE__*/
  Vue.extend({
    name: 'BTable',
    // Order of mixins is important!
    // They are merged from first to last, followed by this component.
    mixins: [// Required Mixins
    idMixin, normalizeSlotMixin, itemsMixin, tableRendererMixin, stackedMixin, theadMixin, tfootMixin, tbodyMixin, // Features Mixins
    stackedMixin, filteringMixin, sortingMixin, paginationMixin$1, captionMixin, colgroupMixin, selectableMixin, emptyMixin, topRowMixin, bottomRowMixin, busyMixin, providerMixin] // render function provided by table-renderer mixin

  });

  // @vue/component

  var BTableLite =
  /*#__PURE__*/
  Vue.extend({
    name: 'BTableLite',
    // Order of mixins is important!
    // They are merged from first to last, followed by this component.
    mixins: [// Required mixins
    idMixin, normalizeSlotMixin, itemsMixin, tableRendererMixin, stackedMixin, theadMixin, tfootMixin, tbodyMixin, // Features Mixins
    // These are pretty lightweight, and are useful for lightweight tables
    captionMixin, colgroupMixin] // render function provided by table-renderer mixin

  });

  // @vue/component

  var BTableSimple =
  /*#__PURE__*/
  Vue.extend({
    name: 'BTableSimple',
    // Order of mixins is important!
    // They are merged from first to last, followed by this component.
    mixins: [// Required mixins
    idMixin, normalizeSlotMixin, tableRendererMixin, // feature mixin
    // Stacked requires extra handling by users via
    // the table cell `stacked-heading` prop
    stackedMixin],
    computed: {
      isTableSimple: function isTableSimple() {
        return true;
      }
    } // render function provided by table-renderer mixin

  });

  var TableLitePlugin =
  /*#__PURE__*/
  pluginFactory({
    components: {
      BTableLite: BTableLite
    }
  });
  var TableSimplePlugin =
  /*#__PURE__*/
  pluginFactory({
    components: {
      BTableSimple: BTableSimple,
      BTbody: BTbody,
      BThead: BThead,
      BTfoot: BTfoot,
      BTr: BTr,
      BTd: BTd,
      BTh: BTh
    }
  });
  var TablePlugin =
  /*#__PURE__*/
  pluginFactory({
    components: {
      BTable: BTable
    },
    plugins: {
      TableLitePlugin: TableLitePlugin,
      TableSimplePlugin: TableSimplePlugin
    }
  });

  var navProps = omit(props$I, ['tabs', 'isNavBar', 'cardHeader']); // -- Utils --
  // Filter function to filter out disabled tabs

  var notDisabled = function notDisabled(tab) {
    return !tab.disabled;
  }; // --- Helper components ---
  // @vue/component


  var BTabButtonHelper =
  /*#__PURE__*/
  Vue.extend({
    name: 'BTabButtonHelper',
    inject: {
      bvTabs: {
        default: function _default()
        /* istanbul ignore next */
        {
          return {};
        }
      }
    },
    props: {
      // Reference to the child <b-tab> instance
      tab: {
        default: null
      },
      tabs: {
        type: Array,
        default: function _default()
        /* istanbul ignore next */
        {
          return [];
        }
      },
      id: {
        type: String,
        default: null
      },
      controls: {
        type: String,
        default: null
      },
      tabIndex: {
        type: Number,
        default: null
      },
      posInSet: {
        type: Number,
        default: null
      },
      setSize: {
        type: Number,
        default: null
      },
      noKeyNav: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      focus: function focus() {
        if (this.$refs && this.$refs.link && this.$refs.link.focus) {
          this.$refs.link.focus();
        }
      },
      handleEvt: function handleEvt(evt) {
        var stop = function stop() {
          evt.preventDefault();
          evt.stopPropagation();
        };

        if (this.tab.disabled) {
          /* istanbul ignore next */
          return;
        }

        var type = evt.type;
        var key = evt.keyCode;
        var shift = evt.shiftKey;

        if (type === 'click') {
          stop();
          this.$emit('click', evt);
        } else if (type === 'keydown' && key === KEY_CODES.SPACE) {
          // For ARIA tabs the SPACE key will also trigger a click/select
          // Even with keyboard navigation disabled, SPACE should "click" the button
          // See: https://github.com/bootstrap-vue/bootstrap-vue/issues/4323
          stop();
          this.$emit('click', evt);
        } else if (type === 'keydown' && !this.noKeyNav) {
          // For keyboard navigation
          if (key === KEY_CODES.UP || key === KEY_CODES.LEFT || key === KEY_CODES.HOME) {
            stop();

            if (shift || key === KEY_CODES.HOME) {
              this.$emit('first', evt);
            } else {
              this.$emit('prev', evt);
            }
          } else if (key === KEY_CODES.DOWN || key === KEY_CODES.RIGHT || key === KEY_CODES.END) {
            stop();

            if (shift || key === KEY_CODES.END) {
              this.$emit('last', evt);
            } else {
              this.$emit('next', evt);
            }
          }
        }
      }
    },
    render: function render(h) {
      var link = h(BLink, {
        ref: 'link',
        staticClass: 'nav-link',
        class: [{
          active: this.tab.localActive && !this.tab.disabled,
          disabled: this.tab.disabled
        }, this.tab.titleLinkClass, // Apply <b-tabs> `activeNavItemClass` styles when the tab is active
        this.tab.localActive ? this.bvTabs.activeNavItemClass : null],
        props: {
          disabled: this.tab.disabled
        },
        attrs: {
          role: 'tab',
          id: this.id,
          // Roving tab index when keynav enabled
          tabindex: this.tabIndex,
          'aria-selected': this.tab.localActive && !this.tab.disabled ? 'true' : 'false',
          'aria-setsize': this.setSize,
          'aria-posinset': this.posInSet,
          'aria-controls': this.controls
        },
        on: {
          click: this.handleEvt,
          keydown: this.handleEvt
        }
      }, [this.tab.normalizeSlot('title') || this.tab.title]);
      return h('li', {
        staticClass: 'nav-item',
        class: [this.tab.titleItemClass],
        attrs: {
          role: 'presentation'
        }
      }, [link]);
    }
  }); // @vue/component

  var BTabs =
  /*#__PURE__*/
  Vue.extend({
    name: 'BTabs',
    mixins: [idMixin, normalizeSlotMixin],
    provide: function provide() {
      return {
        bvTabs: this
      };
    },
    model: {
      prop: 'value',
      event: 'input'
    },
    props: _objectSpread2({}, navProps, {
      tag: {
        type: String,
        default: 'div'
      },
      card: {
        type: Boolean,
        default: false
      },
      end: {
        // Synonym for 'bottom'
        type: Boolean,
        default: false
      },
      noFade: {
        type: Boolean,
        default: false
      },
      noNavStyle: {
        type: Boolean,
        default: false
      },
      noKeyNav: {
        type: Boolean,
        default: false
      },
      lazy: {
        // This prop is sniffed by the <b-tab> child
        type: Boolean,
        default: false
      },
      contentClass: {
        type: [String, Array, Object],
        default: null
      },
      navClass: {
        type: [String, Array, Object],
        default: null
      },
      navWrapperClass: {
        type: [String, Array, Object],
        default: null
      },
      activeNavItemClass: {
        // Only applied to the currently active <b-nav-item>
        type: [String, Array, Object],
        default: null
      },
      activeTabClass: {
        // Only applied to the currently active <b-tab>
        // This prop is sniffed by the <b-tab> child
        type: [String, Array, Object],
        default: null
      },
      value: {
        // v-model
        type: Number,
        default: null
      }
    }),
    data: function data() {
      var tabIdx = parseInt(this.value, 10);
      tabIdx = isNaN(tabIdx) ? -1 : tabIdx;
      return {
        // Index of current tab
        currentTab: tabIdx,
        // Array of direct child <b-tab> instances, in DOM order
        tabs: [],
        // Array of child instances registered (for triggering reactive updates)
        registeredTabs: [],
        // Flag to know if we are mounted or not
        isMounted: false
      };
    },
    computed: {
      fade: function fade() {
        // This computed prop is sniffed by the tab child
        return !this.noFade;
      },
      localNavClass: function localNavClass() {
        var classes = [];

        if (this.card && this.vertical) {
          classes.push('card-header', 'h-100', 'border-bottom-0', 'rounded-0');
        }

        return [].concat(classes, [this.navClass]);
      }
    },
    watch: {
      currentTab: function currentTab(val, old) {
        var index = -1; // Ensure only one tab is active at most

        this.tabs.forEach(function (tab, idx) {
          if (val === idx && !tab.disabled) {
            tab.localActive = true;
            index = idx;
          } else {
            tab.localActive = false;
          }
        }); // Update the v-model

        this.$emit('input', index);
      },
      value: function value(val, old) {
        if (val !== old) {
          val = parseInt(val, 10);
          val = isNaN(val) ? -1 : val;
          old = parseInt(old, 10) || 0;
          var tabs = this.tabs;

          if (tabs[val] && !tabs[val].disabled) {
            this.activateTab(tabs[val]);
          } else {
            // Try next or prev tabs
            if (val < old) {
              this.previousTab();
            } else {
              this.nextTab();
            }
          }
        }
      },
      registeredTabs: function registeredTabs(newVal, oldVal) {
        var _this = this;

        // Each b-tab will register/unregister itself.
        // We use this to detect when tabs are added/removed
        // to trigger the update of the tabs.
        this.$nextTick(function () {
          requestAF(function () {
            _this.updateTabs();
          });
        });
      },
      tabs: function tabs(newVal, oldVal) {
        var _this2 = this;

        // If tabs added, removed, or re-ordered, we emit a `changed` event.
        // We use `tab._uid` instead of `tab.safeId()`, as the later is changed
        // in a nextTick if no explicit ID is provided, causing duplicate emits.
        if (!looseEqual(newVal.map(function (t) {
          return t._uid;
        }), oldVal.map(function (t) {
          return t._uid;
        }))) {
          // In a nextTick to ensure currentTab has been set first.
          this.$nextTick(function () {
            // We emit shallow copies of the new and old arrays of tabs, to
            // prevent users from potentially mutating the internal arrays.
            _this2.$emit('changed', newVal.slice(), oldVal.slice());
          });
        }
      },
      isMounted: function isMounted(newVal, oldVal) {
        var _this3 = this;

        // Trigger an update after mounted.  Needed for tabs inside lazy modals.
        if (newVal) {
          requestAF(function () {
            _this3.updateTabs();
          });
        } // Enable or disable the observer


        this.setObserver(newVal);
      }
    },
    created: function created() {
      var _this4 = this;

      var tabIdx = parseInt(this.value, 10);
      this.currentTab = isNaN(tabIdx) ? -1 : tabIdx;
      this._bvObserver = null; // For SSR and to make sure only a single tab is shown on mount
      // We wrap this in a `$nextTick()` to ensure the child tabs have been created

      this.$nextTick(function () {
        _this4.updateTabs();
      });
    },
    mounted: function mounted() {
      var _this5 = this;

      // Call `updateTabs()` just in case...
      this.updateTabs();
      this.$nextTick(function () {
        // Flag we are now mounted and to switch to DOM for tab probing.
        // As this.$slots.default appears to lie about component instances
        // after b-tabs is destroyed and re-instantiated.
        // And this.$children does not respect DOM order.
        _this5.isMounted = true;
      });
    },
    deactivated: function deactivated()
    /* istanbul ignore next */
    {
      this.isMounted = false;
    },
    activated: function activated()
    /* istanbul ignore next */
    {
      var _this6 = this;

      var tabIdx = parseInt(this.value, 10);
      this.currentTab = isNaN(tabIdx) ? -1 : tabIdx;
      this.$nextTick(function () {
        _this6.updateTabs();

        _this6.isMounted = true;
      });
    },
    beforeDestroy: function beforeDestroy() {
      this.isMounted = false;
    },
    destroyed: function destroyed() {
      // Ensure no references to child instances exist
      this.tabs = [];
    },
    methods: {
      registerTab: function registerTab(tab) {
        var _this7 = this;

        if (!arrayIncludes(this.registeredTabs, tab)) {
          this.registeredTabs.push(tab);
          tab.$once('hook:destroyed', function () {
            _this7.unregisterTab(tab);
          });
        }
      },
      unregisterTab: function unregisterTab(tab) {
        this.registeredTabs = this.registeredTabs.slice().filter(function (t) {
          return t !== tab;
        });
      },
      setObserver: function setObserver(on) {
        // DOM observer is needed to detect changes in order of tabs
        if (on) {
          // Make sure no existing observer running
          this.setObserver(false);
          var self = this;
          /* istanbul ignore next: difficult to test mutation observer in JSDOM */

          var handler = function handler() {
            // We delay the update to ensure that `tab.safeId()` has
            // updated with the final ID value.
            self.$nextTick(function () {
              requestAF(function () {
                self.updateTabs();
              });
            });
          }; // Watch for changes to <b-tab> sub components


          this._bvObserver = observeDom(this.$refs.tabsContainer, handler, {
            childList: true,
            subtree: false,
            attributes: true,
            attributeFilter: ['id']
          });
        } else {
          if (this._bvObserver && this._bvObserver.disconnect) {
            this._bvObserver.disconnect();
          }

          this._bvObserver = null;
        }
      },
      getTabs: function getTabs() {
        // We use registeredTabs as the source of truth for child tab components. And we
        // filter out any BTab components that are extended BTab with a root child BTab.
        // https://github.com/bootstrap-vue/bootstrap-vue/issues/3260
        var tabs = this.registeredTabs.filter(function (tab) {
          return tab.$children.filter(function (t) {
            return t._isTab;
          }).length === 0;
        }); // DOM Order of Tabs

        var order = [];

        if (this.isMounted && tabs.length > 0) {
          // We rely on the DOM when mounted to get the 'true' order of the b-tab children.
          // querySelectorAll(...) always returns elements in document order, regardless of
          // order specified in the selector.
          var selector = tabs.map(function (tab) {
            return "#".concat(tab.safeId());
          }).join(', ');
          order = selectAll(selector, this.$el).map(function (el) {
            return el.id;
          }).filter(Boolean);
        } // Stable sort keeps the original order if not found in the
        // `order` array, which will be an empty array before mount.


        return stableSort(tabs, function (a, b) {
          return order.indexOf(a.safeId()) - order.indexOf(b.safeId());
        });
      },
      // Update list of <b-tab> children
      updateTabs: function updateTabs() {
        // Probe tabs
        var tabs = this.getTabs(); // Find *last* active non-disabled tab in current tabs
        // We trust tab state over currentTab, in case tabs were added/removed/re-ordered

        var tabIndex = tabs.indexOf(tabs.slice().reverse().find(function (tab) {
          return tab.localActive && !tab.disabled;
        })); // Else try setting to currentTab

        if (tabIndex < 0) {
          var currentTab = this.currentTab;

          if (currentTab >= tabs.length) {
            // Handle last tab being removed, so find the last non-disabled tab
            tabIndex = tabs.indexOf(tabs.slice().reverse().find(notDisabled));
          } else if (tabs[currentTab] && !tabs[currentTab].disabled) {
            // Current tab is not disabled
            tabIndex = currentTab;
          }
        } // Else find *first* non-disabled tab in current tabs


        if (tabIndex < 0) {
          tabIndex = tabs.indexOf(tabs.find(notDisabled));
        } // Set the current tab state to active


        tabs.forEach(function (tab, idx) {
          // tab.localActive = idx === tabIndex && !tab.disabled
          tab.localActive = false;
        });

        if (tabs[tabIndex]) {
          tabs[tabIndex].localActive = true;
        } // Update the array of tab children


        this.tabs = tabs; // Set the currentTab index (can be -1 if no non-disabled tabs)

        this.currentTab = tabIndex;
      },
      // Find a button that controls a tab, given the tab reference
      // Returns the button vm instance
      getButtonForTab: function getButtonForTab(tab) {
        return (this.$refs.buttons || []).find(function (btn) {
          return btn.tab === tab;
        });
      },
      // Force a button to re-render it's content, given a <b-tab> instance
      // Called by <b-tab> on `update()`
      updateButton: function updateButton(tab) {
        var button = this.getButtonForTab(tab);

        if (button && button.$forceUpdate) {
          button.$forceUpdate();
        }
      },
      // Activate a tab given a <b-tab> instance
      // Also accessed by <b-tab>
      activateTab: function activateTab(tab) {
        var result = false;

        if (tab) {
          var index = this.tabs.indexOf(tab);

          if (!tab.disabled && index > -1 && index !== this.currentTab) {
            var tabEvt = new BvEvent('activate-tab', {
              cancelable: true,
              vueTarget: this,
              componentId: this.safeId()
            });
            this.$emit(tabEvt.type, index, this.currentTab, tabEvt);

            if (!tabEvt.defaultPrevented) {
              result = true;
              this.currentTab = index;
            }
          }
        } // Couldn't set tab, so ensure v-model is set to `this.currentTab`

        /* istanbul ignore next: should rarely happen */


        if (!result && this.currentTab !== this.value) {
          this.$emit('input', this.currentTab);
        }

        return result;
      },
      // Deactivate a tab given a <b-tab> instance
      // Accessed by <b-tab>
      deactivateTab: function deactivateTab(tab) {
        if (tab) {
          // Find first non-disabled tab that isn't the one being deactivated
          // If no tabs are available, then don't deactivate current tab
          return this.activateTab(this.tabs.filter(function (t) {
            return t !== tab;
          }).find(notDisabled));
        }
        /* istanbul ignore next: should never/rarely happen */


        return false;
      },
      // Focus a tab button given it's <b-tab> instance
      focusButton: function focusButton(tab) {
        var _this8 = this;

        // Wrap in `$nextTick()` to ensure DOM has completed rendering/updating before focusing
        this.$nextTick(function () {
          var button = _this8.getButtonForTab(tab);

          if (button && button.focus) {
            button.focus();
          }
        });
      },
      // Emit a click event on a specified <b-tab> component instance
      emitTabClick: function emitTabClick(tab, evt) {
        if (isEvent(evt) && tab && tab.$emit && !tab.disabled) {
          tab.$emit('click', evt);
        }
      },
      // Click handler
      clickTab: function clickTab(tab, evt) {
        this.activateTab(tab);
        this.emitTabClick(tab, evt);
      },
      // Move to first non-disabled tab
      firstTab: function firstTab(focus) {
        var tab = this.tabs.find(notDisabled);

        if (this.activateTab(tab) && focus) {
          this.focusButton(tab);
          this.emitTabClick(tab, focus);
        }
      },
      // Move to previous non-disabled tab
      previousTab: function previousTab(focus) {
        var currentIndex = Math.max(this.currentTab, 0);
        var tab = this.tabs.slice(0, currentIndex).reverse().find(notDisabled);

        if (this.activateTab(tab) && focus) {
          this.focusButton(tab);
          this.emitTabClick(tab, focus);
        }
      },
      // Move to next non-disabled tab
      nextTab: function nextTab(focus) {
        var currentIndex = Math.max(this.currentTab, -1);
        var tab = this.tabs.slice(currentIndex + 1).find(notDisabled);

        if (this.activateTab(tab) && focus) {
          this.focusButton(tab);
          this.emitTabClick(tab, focus);
        }
      },
      // Move to last non-disabled tab
      lastTab: function lastTab(focus) {
        var tab = this.tabs.slice().reverse().find(notDisabled);

        if (this.activateTab(tab) && focus) {
          this.focusButton(tab);
          this.emitTabClick(tab, focus);
        }
      }
    },
    render: function render(h) {
      var _this9 = this;

      var tabs = this.tabs; // Currently active tab

      var activeTab = tabs.find(function (tab) {
        return tab.localActive && !tab.disabled;
      }); // Tab button to allow focusing when no active tab found (keynav only)

      var fallbackTab = tabs.find(function (tab) {
        return !tab.disabled;
      }); // For each <b-tab> found create the tab buttons

      var buttons = tabs.map(function (tab, index) {
        var tabIndex = null; // Ensure at least one tab button is focusable when keynav enabled (if possible)

        if (!_this9.noKeyNav) {
          // Buttons are not in tab index unless active, or a fallback tab
          tabIndex = -1;

          if (activeTab === tab || !activeTab && fallbackTab === tab) {
            // Place tab button in tab sequence
            tabIndex = null;
          }
        }

        return h(BTabButtonHelper, {
          key: tab._uid || index,
          ref: 'buttons',
          // Needed to make `this.$refs.buttons` an array
          refInFor: true,
          props: {
            tab: tab,
            tabs: tabs,
            id: tab.controlledBy || (tab.safeId ? tab.safeId("_BV_tab_button_") : null),
            controls: tab.safeId ? tab.safeId() : null,
            tabIndex: tabIndex,
            setSize: tabs.length,
            posInSet: index + 1,
            noKeyNav: _this9.noKeyNav
          },
          on: {
            click: function click(evt) {
              _this9.clickTab(tab, evt);
            },
            first: _this9.firstTab,
            prev: _this9.previousTab,
            next: _this9.nextTab,
            last: _this9.lastTab
          }
        });
      }); // Nav

      var nav = h(BNav, {
        ref: 'nav',
        class: this.localNavClass,
        attrs: {
          role: 'tablist',
          id: this.safeId('_BV_tab_controls_')
        },
        props: {
          fill: this.fill,
          justified: this.justified,
          align: this.align,
          tabs: !this.noNavStyle && !this.pills,
          pills: !this.noNavStyle && this.pills,
          vertical: this.vertical,
          small: this.small,
          cardHeader: this.card && !this.vertical
        }
      }, [this.normalizeSlot('tabs-start') || h(), buttons, this.normalizeSlot('tabs-end') || h()]);
      nav = h('div', {
        key: 'bv-tabs-nav',
        class: [{
          'card-header': this.card && !this.vertical && !this.end,
          'card-footer': this.card && !this.vertical && this.end,
          'col-auto': this.vertical
        }, this.navWrapperClass]
      }, [nav]);
      var empty = h();

      if (!tabs || tabs.length === 0) {
        empty = h('div', {
          key: 'bv-empty-tab',
          class: ['tab-pane', 'active', {
            'card-body': this.card
          }]
        }, this.normalizeSlot('empty'));
      } // Main content section


      var content = h('div', {
        ref: 'tabsContainer',
        key: 'bv-tabs-container',
        staticClass: 'tab-content',
        class: [{
          col: this.vertical
        }, this.contentClass],
        attrs: {
          id: this.safeId('_BV_tab_container_')
        }
      }, concat(this.normalizeSlot('default'), empty)); // Render final output

      return h(this.tag, {
        staticClass: 'tabs',
        class: {
          row: this.vertical,
          'no-gutters': this.vertical && this.card
        },
        attrs: {
          id: this.safeId()
        }
      }, [this.end ? content : h(), [nav], this.end ? h() : content]);
    }
  });

  var BTab =
  /*#__PURE__*/
  Vue.extend({
    name: 'BTab',
    mixins: [idMixin, normalizeSlotMixin],
    inject: {
      bvTabs: {
        default: function _default() {
          return {
            // Don't set a tab index if not rendered inside <b-tabs>
            noKeyNav: true
          };
        }
      }
    },
    props: {
      active: {
        type: Boolean,
        default: false
      },
      tag: {
        type: String,
        default: 'div'
      },
      buttonId: {
        type: String,
        default: ''
      },
      title: {
        type: String,
        default: ''
      },
      titleItemClass: {
        // Sniffed by tabs.js and added to nav 'li.nav-item'
        type: [String, Array, Object],
        default: null
      },
      titleLinkClass: {
        // Sniffed by tabs.js and added to nav 'a.nav-link'
        type: [String, Array, Object],
        default: null
      },
      disabled: {
        type: Boolean,
        default: false
      },
      noBody: {
        type: Boolean,
        default: false
      },
      lazy: {
        type: Boolean,
        default: false
      }
    },
    data: function data() {
      return {
        localActive: this.active && !this.disabled,
        show: false
      };
    },
    computed: {
      tabClasses: function tabClasses() {
        return [{
          active: this.localActive,
          disabled: this.disabled,
          'card-body': this.bvTabs.card && !this.noBody
        }, // Apply <b-tabs> `activeTabClass` styles when this tab is active
        this.localActive ? this.bvTabs.activeTabClass : null];
      },
      controlledBy: function controlledBy() {
        return this.buttonId || this.safeId('__BV_tab_button__');
      },
      computedNoFade: function computedNoFade() {
        return !(this.bvTabs.fade || false);
      },
      computedLazy: function computedLazy() {
        return this.bvTabs.lazy || this.lazy;
      },
      _isTab: function _isTab() {
        // For parent sniffing of child
        return true;
      }
    },
    watch: {
      localActive: function localActive(newVal, oldVal) {
        // Make 'active' prop work with `.sync` modifier
        this.$emit('update:active', newVal);
      },
      active: function active(newVal, oldVal) {
        if (newVal !== oldVal) {
          if (newVal) {
            // If activated post mount
            this.activate();
          } else {
            /* istanbul ignore next */
            if (!this.deactivate()) {
              // Tab couldn't be deactivated, so we reset the synced active prop
              // Deactivation will fail if no other tabs to activate
              this.$emit('update:active', this.localActive);
            }
          }
        }
      },
      disabled: function disabled(newVal, oldVal) {
        if (newVal !== oldVal) {
          if (newVal && this.localActive && this.bvTabs.firstTab) {
            this.localActive = false;
            this.bvTabs.firstTab();
          }
        }
      }
    },
    mounted: function mounted() {
      // Inform b-tabs of our presence
      this.registerTab(); // Initially show on mount if active and not disabled

      this.show = this.localActive;
    },
    updated: function updated() {
      // Force the tab button content to update (since slots are not reactive)
      // Only done if we have a title slot, as the title prop is reactive
      if (this.hasNormalizedSlot('title') && this.bvTabs.updateButton) {
        this.bvTabs.updateButton(this);
      }
    },
    destroyed: function destroyed() {
      // inform b-tabs of our departure
      this.unregisterTab();
    },
    methods: {
      // Private methods
      registerTab: function registerTab() {
        // Inform `b-tabs` of our presence
        this.bvTabs.registerTab && this.bvTabs.registerTab(this);
      },
      unregisterTab: function unregisterTab() {
        // Inform `b-tabs` of our departure
        this.bvTabs.unregisterTab && this.bvTabs.unregisterTab(this);
      },
      // Public methods
      activate: function activate() {
        if (this.bvTabs.activateTab && !this.disabled) {
          return this.bvTabs.activateTab(this);
        } else {
          // Not inside a <b-tabs> component or tab is disabled
          return false;
        }
      },
      deactivate: function deactivate() {
        if (this.bvTabs.deactivateTab && this.localActive) {
          return this.bvTabs.deactivateTab(this);
        } else {
          // Not inside a <b-tabs> component or not active to begin with
          return false;
        }
      }
    },
    render: function render(h) {
      var content = h(this.tag, {
        ref: 'panel',
        staticClass: 'tab-pane',
        class: this.tabClasses,
        directives: [{
          name: 'show',
          rawName: 'v-show',
          value: this.localActive,
          expression: 'localActive'
        }],
        attrs: {
          role: 'tabpanel',
          id: this.safeId(),
          tabindex: this.localActive && !this.bvTabs.noKeyNav ? '-1' : null,
          'aria-hidden': this.localActive ? 'false' : 'true',
          'aria-labelledby': this.controlledBy || null
        }
      }, // Render content lazily if requested
      [this.localActive || !this.computedLazy ? this.normalizeSlot('default') : h()]);
      return h(BVTransition, {
        props: {
          mode: 'out-in',
          noFade: this.computedNoFade
        }
      }, [content]);
    }
  });

  var TabsPlugin =
  /*#__PURE__*/
  pluginFactory({
    components: {
      BTabs: BTabs,
      BTab: BTab
    }
  });

  function _typeof$1(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof$1 = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof$1 = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof$1(obj);
  }

  function _toConsumableArray$1(arr) {
    return _arrayWithoutHoles$1(arr) || _iterableToArray$1(arr) || _nonIterableSpread$1();
  }

  function _arrayWithoutHoles$1(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    }
  }

  function _iterableToArray$1(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
  }

  function _nonIterableSpread$1() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
  }

  var inBrowser = typeof window !== 'undefined';
  function freeze$1(item) {
    if (Array.isArray(item) || _typeof$1(item) === 'object') {
      return Object.freeze(item);
    }

    return item;
  }
  function combinePassengers(transports) {
    var slotProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return transports.reduce(function (passengers, transport) {
      var temp = transport.passengers[0];
      var newPassengers = typeof temp === 'function' ? temp(slotProps) : transport.passengers;
      return passengers.concat(newPassengers);
    }, []);
  }
  function stableSort$1(array, compareFn) {
    return array.map(function (v, idx) {
      return [idx, v];
    }).sort(function (a, b) {
      return compareFn(a[1], b[1]) || a[0] - b[0];
    }).map(function (c) {
      return c[1];
    });
  }
  function pick(obj, keys) {
    return keys.reduce(function (acc, key) {
      if (obj.hasOwnProperty(key)) {
        acc[key] = obj[key];
      }

      return acc;
    }, {});
  }

  var transports = {};
  var targets = {};
  var sources = {};
  var Wormhole = Vue.extend({
    data: function data() {
      return {
        transports: transports,
        targets: targets,
        sources: sources,
        trackInstances: inBrowser
      };
    },
    methods: {
      open: function open(transport) {
        if (!inBrowser) return;
        var to = transport.to,
            from = transport.from,
            passengers = transport.passengers,
            _transport$order = transport.order,
            order = _transport$order === void 0 ? Infinity : _transport$order;
        if (!to || !from || !passengers) return;
        var newTransport = {
          to: to,
          from: from,
          passengers: freeze$1(passengers),
          order: order
        };
        var keys = Object.keys(this.transports);

        if (keys.indexOf(to) === -1) {
          Vue.set(this.transports, to, []);
        }

        var currentIndex = this.$_getTransportIndex(newTransport); // Copying the array here so that the PortalTarget change event will actually contain two distinct arrays

        var newTransports = this.transports[to].slice(0);

        if (currentIndex === -1) {
          newTransports.push(newTransport);
        } else {
          newTransports[currentIndex] = newTransport;
        }

        this.transports[to] = stableSort$1(newTransports, function (a, b) {
          return a.order - b.order;
        });
      },
      close: function close(transport) {
        var force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var to = transport.to,
            from = transport.from;
        if (!to || !from && force === false) return;

        if (!this.transports[to]) {
          return;
        }

        if (force) {
          this.transports[to] = [];
        } else {
          var index = this.$_getTransportIndex(transport);

          if (index >= 0) {
            // Copying the array here so that the PortalTarget change event will actually contain two distinct arrays
            var newTransports = this.transports[to].slice(0);
            newTransports.splice(index, 1);
            this.transports[to] = newTransports;
          }
        }
      },
      registerTarget: function registerTarget(target, vm, force) {
        if (!inBrowser) return;

        if (this.trackInstances && !force && this.targets[target]) {
          console.warn("[portal-vue]: Target ".concat(target, " already exists"));
        }

        this.$set(this.targets, target, Object.freeze([vm]));
      },
      unregisterTarget: function unregisterTarget(target) {
        this.$delete(this.targets, target);
      },
      registerSource: function registerSource(source, vm, force) {
        if (!inBrowser) return;

        if (this.trackInstances && !force && this.sources[source]) {
          console.warn("[portal-vue]: source ".concat(source, " already exists"));
        }

        this.$set(this.sources, source, Object.freeze([vm]));
      },
      unregisterSource: function unregisterSource(source) {
        this.$delete(this.sources, source);
      },
      hasTarget: function hasTarget(to) {
        return !!(this.targets[to] && this.targets[to][0]);
      },
      hasSource: function hasSource(to) {
        return !!(this.sources[to] && this.sources[to][0]);
      },
      hasContentFor: function hasContentFor(to) {
        return !!this.transports[to] && !!this.transports[to].length;
      },
      // Internal
      $_getTransportIndex: function $_getTransportIndex(_ref) {
        var to = _ref.to,
            from = _ref.from;

        for (var i in this.transports[to]) {
          if (this.transports[to][i].from === from) {
            return +i;
          }
        }

        return -1;
      }
    }
  });
  var wormhole = new Wormhole(transports);

  var _id = 1;
  var Portal = Vue.extend({
    name: 'portal',
    props: {
      disabled: {
        type: Boolean
      },
      name: {
        type: String,
        default: function _default() {
          return String(_id++);
        }
      },
      order: {
        type: Number,
        default: 0
      },
      slim: {
        type: Boolean
      },
      slotProps: {
        type: Object,
        default: function _default() {
          return {};
        }
      },
      tag: {
        type: String,
        default: 'DIV'
      },
      to: {
        type: String,
        default: function _default() {
          return String(Math.round(Math.random() * 10000000));
        }
      }
    },
    created: function created() {
      var _this = this;

      this.$nextTick(function () {
        wormhole.registerSource(_this.name, _this);
      });
    },
    mounted: function mounted() {
      if (!this.disabled) {
        this.sendUpdate();
      }
    },
    updated: function updated() {
      if (this.disabled) {
        this.clear();
      } else {
        this.sendUpdate();
      }
    },
    beforeDestroy: function beforeDestroy() {
      wormhole.unregisterSource(this.name);
      this.clear();
    },
    watch: {
      to: function to(newValue, oldValue) {
        oldValue && oldValue !== newValue && this.clear(oldValue);
        this.sendUpdate();
      }
    },
    methods: {
      clear: function clear(target) {
        var closer = {
          from: this.name,
          to: target || this.to
        };
        wormhole.close(closer);
      },
      normalizeSlots: function normalizeSlots() {
        return this.$scopedSlots.default ? [this.$scopedSlots.default] : this.$slots.default;
      },
      normalizeOwnChildren: function normalizeOwnChildren(children) {
        return typeof children === 'function' ? children(this.slotProps) : children;
      },
      sendUpdate: function sendUpdate() {
        var slotContent = this.normalizeSlots();

        if (slotContent) {
          var transport = {
            from: this.name,
            to: this.to,
            passengers: _toConsumableArray$1(slotContent),
            order: this.order
          };
          wormhole.open(transport);
        } else {
          this.clear();
        }
      }
    },
    render: function render(h) {
      var children = this.$slots.default || this.$scopedSlots.default || [];
      var Tag = this.tag;

      if (children && this.disabled) {
        return children.length <= 1 && this.slim ? this.normalizeOwnChildren(children)[0] : h(Tag, [this.normalizeOwnChildren(children)]);
      } else {
        return this.slim ? h() : h(Tag, {
          class: {
            'v-portal': true
          },
          style: {
            display: 'none'
          },
          key: 'v-portal-placeholder'
        });
      }
    }
  });

  var PortalTarget = Vue.extend({
    name: 'portalTarget',
    props: {
      multiple: {
        type: Boolean,
        default: false
      },
      name: {
        type: String,
        required: true
      },
      slim: {
        type: Boolean,
        default: false
      },
      slotProps: {
        type: Object,
        default: function _default() {
          return {};
        }
      },
      tag: {
        type: String,
        default: 'div'
      },
      transition: {
        type: [String, Object, Function]
      }
    },
    data: function data() {
      return {
        transports: wormhole.transports,
        firstRender: true
      };
    },
    created: function created() {
      var _this = this;

      this.$nextTick(function () {
        wormhole.registerTarget(_this.name, _this);
      });
    },
    watch: {
      ownTransports: function ownTransports() {
        this.$emit('change', this.children().length > 0);
      },
      name: function name(newVal, oldVal) {
        /**
         * TODO
         * This should warn as well ...
         */
        wormhole.unregisterTarget(oldVal);
        wormhole.registerTarget(newVal, this);
      }
    },
    mounted: function mounted() {
      var _this2 = this;

      if (this.transition) {
        this.$nextTick(function () {
          // only when we have a transition, because it causes a re-render
          _this2.firstRender = false;
        });
      }
    },
    beforeDestroy: function beforeDestroy() {
      wormhole.unregisterTarget(this.name);
    },
    computed: {
      ownTransports: function ownTransports() {
        var transports = this.transports[this.name] || [];

        if (this.multiple) {
          return transports;
        }

        return transports.length === 0 ? [] : [transports[transports.length - 1]];
      },
      passengers: function passengers() {
        return combinePassengers(this.ownTransports, this.slotProps);
      }
    },
    methods: {
      // can't be a computed prop because it has to "react" to $slot changes.
      children: function children() {
        return this.passengers.length !== 0 ? this.passengers : this.$scopedSlots.default ? this.$scopedSlots.default(this.slotProps) : this.$slots.default || [];
      },
      // can't be a computed prop because it has to "react" to this.children().
      noWrapper: function noWrapper() {
        var noWrapper = this.slim && !this.transition;

        if (noWrapper && this.children().length > 1) {
          console.warn('[portal-vue]: PortalTarget with `slim` option received more than one child element.');
        }

        return noWrapper;
      }
    },
    render: function render(h) {
      var noWrapper = this.noWrapper();
      var children = this.children();
      var Tag = this.transition || this.tag;
      return noWrapper ? children[0] : this.slim && !Tag ? h() : h(Tag, {
        props: {
          // if we have a transition component, pass the tag if it exists
          tag: this.transition && this.tag ? this.tag : undefined
        },
        class: {
          'vue-portal-target': true
        }
      }, children);
    }
  });

  var _id$1 = 0;
  var portalProps = ['disabled', 'name', 'order', 'slim', 'slotProps', 'tag', 'to'];
  var targetProps = ['multiple', 'transition'];
  var MountingPortal = Vue.extend({
    name: 'MountingPortal',
    inheritAttrs: false,
    props: {
      append: {
        type: [Boolean, String]
      },
      bail: {
        type: Boolean
      },
      mountTo: {
        type: String,
        required: true
      },
      // Portal
      disabled: {
        type: Boolean
      },
      // name for the portal
      name: {
        type: String,
        default: function _default() {
          return 'mounted_' + String(_id$1++);
        }
      },
      order: {
        type: Number,
        default: 0
      },
      slim: {
        type: Boolean
      },
      slotProps: {
        type: Object,
        default: function _default() {
          return {};
        }
      },
      tag: {
        type: String,
        default: 'DIV'
      },
      // name for the target
      to: {
        type: String,
        default: function _default() {
          return String(Math.round(Math.random() * 10000000));
        }
      },
      // Target
      multiple: {
        type: Boolean,
        default: false
      },
      targetSlim: {
        type: Boolean
      },
      targetSlotProps: {
        type: Object,
        default: function _default() {
          return {};
        }
      },
      targetTag: {
        type: String,
        default: 'div'
      },
      transition: {
        type: [String, Object, Function]
      }
    },
    created: function created() {
      if (typeof document === 'undefined') return;
      var el = document.querySelector(this.mountTo);

      if (!el) {
        console.error("[portal-vue]: Mount Point '".concat(this.mountTo, "' not found in document"));
        return;
      }

      var props = this.$props; // Target already exists

      if (wormhole.targets[props.name]) {
        if (props.bail) {
          console.warn("[portal-vue]: Target ".concat(props.name, " is already mounted.\n        Aborting because 'bail: true' is set"));
        } else {
          this.portalTarget = wormhole.targets[props.name];
        }

        return;
      }

      var append = props.append;

      if (append) {
        var type = typeof append === 'string' ? append : 'DIV';
        var mountEl = document.createElement(type);
        el.appendChild(mountEl);
        el = mountEl;
      } // get props for target from $props
      // we have to rename a few of them


      var _props = pick(this.$props, targetProps);

      _props.slim = this.targetSlim;
      _props.tag = this.targetTag;
      _props.slotProps = this.targetSlotProps;
      _props.name = this.to;
      this.portalTarget = new PortalTarget({
        el: el,
        parent: this.$parent || this,
        propsData: _props
      });
    },
    beforeDestroy: function beforeDestroy() {
      var target = this.portalTarget;

      if (this.append) {
        var el = target.$el;
        el.parentNode.removeChild(el);
      }

      target.$destroy();
    },
    render: function render(h) {
      if (!this.portalTarget) {
        console.warn("[portal-vue] Target wasn't mounted");
        return h();
      } // if there's no "manual" scoped slot, so we create a <Portal> ourselves


      if (!this.$scopedSlots.manual) {
        var props = pick(this.$props, portalProps);
        return h(Portal, {
          props: props,
          attrs: this.$attrs,
          on: this.$listeners,
          scopedSlots: this.$scopedSlots
        }, this.$slots.default);
      } // else, we render the scoped slot


      var content = this.$scopedSlots.manual({
        to: this.to
      }); // if user used <template> for the scoped slot
      // content will be an array

      if (Array.isArray(content)) {
        content = content[0];
      }

      if (!content) return h();
      return content;
    }
  });

  var NAME$v = 'BToaster';
  var props$Z = {
    name: {
      type: String,
      required: true
    },
    ariaLive: {
      type: String,
      default: function _default() {
        return getComponentConfig(NAME$v, 'ariaLive');
      }
    },
    ariaAtomic: {
      type: String,
      default: function _default() {
        return getComponentConfig(NAME$v, 'ariaAtomic');
      } // Allowed: 'true' or 'false' or null

    },
    role: {
      // Aria role
      type: String,
      default: function _default() {
        return getComponentConfig(NAME$v, 'role');
      }
    }
    /*
    transition: {
      type: [Boolean, String, Object],
      default: false
    }
    */

  }; // @vue/component

  var DefaultTransition =
  /*#__PURE__*/
  Vue.extend({
    data: function data() {
      return {
        // Transition classes base name
        name: 'b-toaster'
      };
    },
    methods: {
      onAfterEnter: function onAfterEnter(el) {
        var _this = this;

        // Handle bug where enter-to class is not removed.
        // Bug is related to portal-vue and transition-groups.
        requestAF(function () {
          removeClass(el, "".concat(_this.name, "-enter-to")); // The *-move class is also stuck on elements that moved,
          // but there are no javascript hooks to handle after move.
        });
      }
    },
    render: function render(h) {
      return h('transition-group', {
        props: {
          tag: 'div',
          name: this.name
        },
        on: {
          afterEnter: this.onAfterEnter
        }
      }, this.$slots.default);
    }
  }); // @vue/component

  var BToaster =
  /*#__PURE__*/
  Vue.extend({
    name: NAME$v,
    props: props$Z,
    data: function data() {
      return {
        // We don't render on SSR or if a an existing target found
        doRender: false,
        dead: false,
        // Toaster names cannot change once created
        staticName: this.name
      };
    },
    beforeMount: function beforeMount() {
      var _this2 = this;

      this.staticName = this.name;
      /* istanbul ignore if */

      if (wormhole.hasTarget(this.staticName)) {
        warn("b-toaster: A <portal-target> with name '".concat(this.name, "' already exists in the document."));
        this.dead = true;
      } else {
        this.doRender = true;
        this.$once('hook:beforeDestroy', function () {
          // Let toasts made with `this.$bvToast.toast()` know that this toaster
          // is being destroyed and should should also destroy/hide themselves
          _this2.$root.$emit('bv::toaster::destroyed', _this2.staticName);
        });
      }
    },
    destroyed: function destroyed() {
      // Remove from DOM if needed

      /* istanbul ignore next: difficult to test */
      if (this.$el && this.$el.parentNode) {
        this.$el.parentNode.removeChild(this.$el);
      }
    },
    render: function render(h) {
      var $toaster = h('div', {
        class: ['d-none', {
          'b-dead-toaster': this.dead
        }]
      });

      if (this.doRender) {
        var $target = h(PortalTarget, {
          staticClass: 'b-toaster-slot',
          props: {
            name: this.staticName,
            multiple: true,
            tag: 'div',
            slim: false,
            // transition: this.transition || DefaultTransition
            transition: DefaultTransition
          }
        });
        $toaster = h('div', {
          staticClass: 'b-toaster',
          class: [this.staticName],
          attrs: {
            id: this.staticName,
            role: this.role || null,
            // Fallback to null to make sure attribute doesn't exist
            'aria-live': this.ariaLive,
            'aria-atomic': this.ariaAtomic
          }
        }, [$target]);
      }

      return $toaster;
    }
  });

  var NAME$w = 'BToast';
  var MIN_DURATION = 1000;
  var EVENT_OPTIONS = {
    passive: true,
    capture: false
  }; // --- Props ---

  var props$_ = {
    id: {
      // Even though the ID prop is provided by idMixin, we
      // add it here for $bvToast props filtering
      type: String,
      default: null
    },
    title: {
      type: String,
      default: null
    },
    toaster: {
      type: String,
      default: function _default() {
        return getComponentConfig(NAME$w, 'toaster');
      }
    },
    visible: {
      type: Boolean,
      default: false
    },
    variant: {
      type: String,
      default: function _default() {
        return getComponentConfig(NAME$w, 'variant');
      }
    },
    isStatus: {
      // Switches role to 'status' and aria-live to 'polite'
      type: Boolean,
      default: false
    },
    appendToast: {
      type: Boolean,
      default: false
    },
    noAutoHide: {
      type: Boolean,
      default: false
    },
    autoHideDelay: {
      type: [Number, String],
      default: function _default() {
        return getComponentConfig(NAME$w, 'autoHideDelay');
      }
    },
    noCloseButton: {
      type: Boolean,
      default: false
    },
    noFade: {
      type: Boolean,
      default: false
    },
    noHoverPause: {
      type: Boolean,
      default: false
    },
    solid: {
      type: Boolean,
      default: false
    },
    toastClass: {
      type: [String, Object, Array],
      default: function _default() {
        return getComponentConfig(NAME$w, 'toastClass');
      }
    },
    headerClass: {
      type: [String, Object, Array],
      default: function _default() {
        return getComponentConfig(NAME$w, 'headerClass');
      }
    },
    bodyClass: {
      type: [String, Object, Array],
      default: function _default() {
        return getComponentConfig(NAME$w, 'bodyClass');
      }
    },
    href: {
      type: String,
      default: null
    },
    to: {
      type: [String, Object],
      default: null
    },
    static: {
      // Render the toast in place, rather than in a portal-target
      type: Boolean,
      default: false
    }
  }; // @vue/component

  var BToast =
  /*#__PURE__*/
  Vue.extend({
    name: NAME$w,
    mixins: [idMixin, listenOnRootMixin, normalizeSlotMixin, scopedStyleAttrsMixin],
    inheritAttrs: false,
    model: {
      prop: 'visible',
      event: 'change'
    },
    props: props$_,
    data: function data() {
      return {
        isMounted: false,
        doRender: false,
        localShow: false,
        isTransitioning: false,
        isHiding: false,
        order: 0,
        timer: null,
        dismissStarted: 0,
        resumeDismiss: 0
      };
    },
    computed: {
      bToastClasses: function bToastClasses() {
        return _defineProperty({
          'b-toast-solid': this.solid,
          'b-toast-append': this.appendToast,
          'b-toast-prepend': !this.appendToast
        }, "b-toast-".concat(this.variant), this.variant);
      },
      slotScope: function slotScope() {
        return {
          hide: this.hide
        };
      },
      computedDuration: function computedDuration() {
        // Minimum supported duration is 1 second
        return Math.max(parseInt(this.autoHideDelay, 10) || 0, MIN_DURATION);
      },
      computedToaster: function computedToaster() {
        return String(this.toaster);
      },
      transitionHandlers: function transitionHandlers() {
        return {
          beforeEnter: this.onBeforeEnter,
          afterEnter: this.onAfterEnter,
          beforeLeave: this.onBeforeLeave,
          afterLeave: this.onAfterLeave
        };
      }
    },
    watch: {
      visible: function visible(newVal) {
        newVal ? this.show() : this.hide();
      },
      localShow: function localShow(newVal) {
        if (newVal !== this.visible) {
          this.$emit('change', newVal);
        }
      },
      toaster: function toaster(newVal)
      /* istanbul ignore next */
      {
        var _this = this;

        // If toaster target changed, make sure toaster exists
        this.$nextTick(function () {
          return _this.ensureToaster;
        });
      },
      static: function _static(newVal)
      /* istanbul ignore next */
      {
        // If static changes to true, and the toast is showing,
        // ensure the toaster target exists
        if (newVal && this.localShow) {
          this.ensureToaster();
        }
      }
    },
    mounted: function mounted() {
      var _this2 = this;

      this.isMounted = true;
      this.$nextTick(function () {
        if (_this2.visible) {
          requestAF(function () {
            _this2.show();
          });
        }
      }); // Listen for global $root show events

      this.listenOnRoot('bv::show::toast', function (id) {
        if (id === _this2.safeId()) {
          _this2.show();
        }
      }); // Listen for global $root hide events

      this.listenOnRoot('bv::hide::toast', function (id) {
        if (!id || id === _this2.safeId()) {
          _this2.hide();
        }
      }); // Make sure we hide when toaster is destroyed

      /* istanbul ignore next: difficult to test */

      this.listenOnRoot('bv::toaster::destroyed', function (toaster) {
        /* istanbul ignore next */
        if (toaster === _this2.computedToaster) {
          /* istanbul ignore next */
          _this2.hide();
        }
      });
    },
    beforeDestroy: function beforeDestroy() {
      this.clearDismissTimer();
    },
    methods: {
      show: function show() {
        var _this3 = this;

        if (!this.localShow) {
          this.ensureToaster();
          var showEvt = this.buildEvent('show');
          this.emitEvent(showEvt);
          this.dismissStarted = this.resumeDismiss = 0;
          this.order = Date.now() * (this.appendToast ? 1 : -1);
          this.isHiding = false;
          this.doRender = true;
          this.$nextTick(function () {
            // We show the toast after we have rendered the portal and b-toast wrapper
            // so that screen readers will properly announce the toast
            requestAF(function () {
              _this3.localShow = true;
            });
          });
        }
      },
      hide: function hide() {
        var _this4 = this;

        if (this.localShow) {
          var hideEvt = this.buildEvent('hide');
          this.emitEvent(hideEvt);
          this.setHoverHandler(false);
          this.dismissStarted = this.resumeDismiss = 0;
          this.clearDismissTimer();
          this.isHiding = true;
          requestAF(function () {
            _this4.localShow = false;
          });
        }
      },
      buildEvent: function buildEvent(type) {
        var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        return new BvEvent(type, _objectSpread2({
          cancelable: false,
          target: this.$el || null,
          relatedTarget: null
        }, opts, {
          vueTarget: this,
          componentId: this.safeId()
        }));
      },
      emitEvent: function emitEvent(bvEvt) {
        var type = bvEvt.type;
        this.$root.$emit("bv::toast:".concat(type), bvEvt);
        this.$emit(type, bvEvt);
      },
      ensureToaster: function ensureToaster() {
        if (this.static) {
          return;
        }

        if (!wormhole.hasTarget(this.computedToaster)) {
          var div = document.createElement('div');
          document.body.appendChild(div);
          var toaster = new BToaster({
            parent: this.$root,
            propsData: {
              name: this.computedToaster
            }
          });
          toaster.$mount(div);
        }
      },
      startDismissTimer: function startDismissTimer() {
        this.clearDismissTimer();

        if (!this.noAutoHide) {
          this.timer = setTimeout(this.hide, this.resumeDismiss || this.computedDuration);
          this.dismissStarted = Date.now();
          this.resumeDismiss = 0;
        }
      },
      clearDismissTimer: function clearDismissTimer() {
        clearTimeout(this.timer);
        this.timer = null;
      },
      setHoverHandler: function setHoverHandler(on) {
        var method = on ? eventOn : eventOff;
        var el = this.$refs['b-toast'];
        method(el, 'mouseenter', this.onPause, EVENT_OPTIONS);
        method(el, 'mouseleave', this.onUnPause, EVENT_OPTIONS);
      },
      onPause: function onPause(evt) {
        // Determine time remaining, and then pause timer
        if (this.noAutoHide || this.noHoverPause || !this.timer || this.resumeDismiss) {
          return;
        }

        var passed = Date.now() - this.dismissStarted;

        if (passed > 0) {
          this.clearDismissTimer();
          this.resumeDismiss = Math.max(this.computedDuration - passed, MIN_DURATION);
        }
      },
      onUnPause: function onUnPause(evt) {
        // Restart timer with max of time remaining or 1 second
        if (this.noAutoHide || this.noHoverPause || !this.resumeDismiss) {
          this.resumeDismiss = this.dismissStarted = 0;
          return;
        }

        this.startDismissTimer();
      },
      onLinkClick: function onLinkClick() {
        var _this5 = this;

        // We delay the close to allow time for the
        // browser to process the link click
        this.$nextTick(function () {
          requestAF(function () {
            _this5.hide();
          });
        });
      },
      onBeforeEnter: function onBeforeEnter() {
        this.isTransitioning = true;
      },
      onAfterEnter: function onAfterEnter() {
        this.isTransitioning = false;
        var hiddenEvt = this.buildEvent('shown');
        this.emitEvent(hiddenEvt);
        this.startDismissTimer();
        this.setHoverHandler(true);
      },
      onBeforeLeave: function onBeforeLeave() {
        this.isTransitioning = true;
      },
      onAfterLeave: function onAfterLeave() {
        this.isTransitioning = false;
        this.order = 0;
        this.resumeDismiss = this.dismissStarted = 0;
        var hiddenEvt = this.buildEvent('hidden');
        this.emitEvent(hiddenEvt);
        this.doRender = false;
      },
      makeToast: function makeToast(h) {
        var _this6 = this;

        // Render helper for generating the toast
        // Assemble the header content
        var $headerContent = [];
        var $title = this.normalizeSlot('toast-title', this.slotScope);

        if ($title) {
          $headerContent.push($title);
        } else if (this.title) {
          $headerContent.push(h('strong', {
            staticClass: 'mr-2'
          }, this.title));
        }

        if (!this.noCloseButton) {
          $headerContent.push(h(BButtonClose, {
            staticClass: 'ml-auto mb-1',
            on: {
              click: function click(evt) {
                _this6.hide();
              }
            }
          }));
        } // Assemble the header (if needed)


        var $header = h();

        if ($headerContent.length > 0) {
          $header = h('header', {
            staticClass: 'toast-header',
            class: this.headerClass
          }, $headerContent);
        } // Toast body


        var isLink = this.href || this.to;
        var $body = h(isLink ? BLink : 'div', {
          staticClass: 'toast-body',
          class: this.bodyClass,
          props: isLink ? {
            to: this.to,
            href: this.href
          } : {},
          on: isLink ? {
            click: this.onLinkClick
          } : {}
        }, [this.normalizeSlot('default', this.slotScope) || h()]); // Build the toast

        var $toast = h('div', {
          key: "toast-".concat(this._uid),
          ref: 'toast',
          staticClass: 'toast',
          class: this.toastClass,
          attrs: _objectSpread2({}, this.$attrs, {
            tabindex: '0',
            id: this.safeId()
          })
        }, [$header, $body]);
        return $toast;
      }
    },
    render: function render(h) {
      if (!this.doRender || !this.isMounted) {
        return h();
      }

      var name = "b-toast-".concat(this._uid); // If scoped styles are applied and the toast is not static,
      // make sure the scoped style data attribute is applied

      var scopedStyleAttrs = !this.static ? this.scopedStyleAttrs : {};
      return h(Portal, {
        props: {
          name: name,
          to: this.computedToaster,
          order: this.order,
          slim: true,
          disabled: this.static
        }
      }, [h('div', {
        key: name,
        ref: 'b-toast',
        staticClass: 'b-toast',
        class: this.bToastClasses,
        attrs: _objectSpread2({}, scopedStyleAttrs, {
          id: this.safeId('_toast_outer'),
          role: this.isHiding ? null : this.isStatus ? 'status' : 'alert',
          'aria-live': this.isHiding ? null : this.isStatus ? 'polite' : 'assertive',
          'aria-atomic': this.isHiding ? null : 'true'
        })
      }, [h(BVTransition, {
        props: {
          noFade: this.noFade
        },
        on: this.transitionHandlers
      }, [this.localShow ? this.makeToast(h) : h()])])]);
    }
  });

  var PROP_NAME$3 = '$bvToast';
  var PROP_NAME_PRIV$1 = '_bv__toast'; // Base toast props that are allowed
  // Some may be ignored or overridden on some message boxes
  // Prop ID is allowed, but really only should be used for testing
  // We need to add it in explicitly as it comes from the `idMixin`

  var BASE_PROPS$1 = ['id'].concat(_toConsumableArray(keys(omit(props$_, ['static', 'visible'])))); // Map prop names to toast slot names

  var propsToSlots$1 = {
    toastContent: 'default',
    title: 'toast-title'
  }; // --- Utility methods ---
  // Method to filter only recognized props that are not undefined

  var filterOptions$1 = function filterOptions(options) {
    return BASE_PROPS$1.reduce(function (memo, key) {
      if (!isUndefined(options[key])) {
        memo[key] = options[key];
      }

      return memo;
    }, {});
  }; // Method to install `$bvToast` VM injection


  var plugin$1 = function plugin(Vue) {
    // Create a private sub-component constructor that
    // extends BToast and self-destructs after hidden
    // @vue/component
    var BToastPop = Vue.extend({
      name: 'BToastPop',
      extends: BToast,
      destroyed: function destroyed() {
        // Make sure we not in document any more
        if (this.$el && this.$el.parentNode) {
          this.$el.parentNode.removeChild(this.$el);
        }
      },
      mounted: function mounted() {
        var self = this; // Self destruct handler

        var handleDestroy = function handleDestroy() {
          // Ensure the toast has been force hidden
          self.localShow = false;
          self.doRender = false;
          self.$nextTick(function () {
            self.$nextTick(function () {
              // In a `requestAF()` to release control back to application
              // and to allow the portal-target time to remove the content
              requestAF(function () {
                self.$destroy();
              });
            });
          });
        }; // Self destruct if parent destroyed


        this.$parent.$once('hook:destroyed', handleDestroy); // Self destruct after hidden

        this.$once('hidden', handleDestroy); // Self destruct when toaster is destroyed

        this.listenOnRoot('bv::toaster::destroyed', function (toaster) {
          /* istanbul ignore next: hard to test */
          if (toaster === self.toaster) {
            handleDestroy();
          }
        });
      }
    }); // Private method to generate the on-demand toast

    var makeToast = function makeToast(props, $parent) {
      if (warnNotClient(PROP_NAME$3)) {
        /* istanbul ignore next */
        return;
      } // Create an instance of `BToastPop` component


      var toast = new BToastPop({
        // We set parent as the local VM so these toasts can emit events on the
        // app `$root`, and it ensures `BToast` is destroyed when parent is destroyed
        parent: $parent,
        propsData: _objectSpread2({}, filterOptions$1(getComponentConfig('BToast') || {}), {}, omit(props, keys(propsToSlots$1)), {
          // Props that can't be overridden
          static: false,
          visible: true
        })
      }); // Convert certain props to slots

      keys(propsToSlots$1).forEach(function (prop) {
        var value = props[prop];

        if (!isUndefined(value)) {
          // Can be a string, or array of VNodes
          if (prop === 'title' && isString(value)) {
            // Special case for title if it is a string, we wrap in a <strong>
            value = [$parent.$createElement('strong', {
              class: 'mr-2'
            }, value)];
          }

          toast.$slots[propsToSlots$1[prop]] = concat(value);
        }
      }); // Create a mount point (a DIV) and mount it (which triggers the show)

      var div = document.createElement('div');
      document.body.appendChild(div);
      toast.$mount(div);
    }; // Declare BvToast instance property class


    var BvToast =
    /*#__PURE__*/
    function () {
      function BvToast(vm) {
        _classCallCheck(this, BvToast);

        // Assign the new properties to this instance
        assign(this, {
          _vm: vm,
          _root: vm.$root
        }); // Set these properties as read-only and non-enumerable

        defineProperties(this, {
          _vm: readonlyDescriptor(),
          _root: readonlyDescriptor()
        });
      } // --- Public Instance methods ---
      // Opens a user defined toast and returns immediately


      _createClass(BvToast, [{
        key: "toast",
        value: function toast(content) {
          var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

          if (!content || warnNotClient(PROP_NAME$3)) {
            /* istanbul ignore next */
            return;
          }

          makeToast(_objectSpread2({}, filterOptions$1(options), {
            toastContent: content
          }), this._vm);
        } // shows a `<b-toast>` component with the specified ID

      }, {
        key: "show",
        value: function show(id) {
          if (id) {
            this._root.$emit('bv::show::toast', id);
          }
        } // Hide a toast with specified ID, or if not ID all toasts

      }, {
        key: "hide",
        value: function hide() {
          var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

          this._root.$emit('bv::hide::toast', id);
        }
      }]);

      return BvToast;
    }(); // Add our instance mixin


    Vue.mixin({
      beforeCreate: function beforeCreate() {
        // Because we need access to `$root` for `$emits`, and VM for parenting,
        // we have to create a fresh instance of `BvToast` for each VM
        this[PROP_NAME_PRIV$1] = new BvToast(this);
      }
    }); // Define our read-only `$bvToast` instance property
    // Placed in an if just in case in HMR mode
    // eslint-disable-next-line no-prototype-builtins

    if (!Vue.prototype.hasOwnProperty(PROP_NAME$3)) {
      defineProperty(Vue.prototype, PROP_NAME$3, {
        get: function get() {
          /* istanbul ignore next */
          if (!this || !this[PROP_NAME_PRIV$1]) {
            warn("'".concat(PROP_NAME$3, "' must be accessed from a Vue instance 'this' context"));
          }

          return this[PROP_NAME_PRIV$1];
        }
      });
    }
  };

  var BVToastPlugin =
  /*#__PURE__*/
  pluginFactory({
    plugins: {
      plugin: plugin$1
    }
  });

  var ToastPlugin =
  /*#__PURE__*/
  pluginFactory({
    components: {
      BToast: BToast,
      BToaster: BToaster
    },
    // $bvToast injection
    plugins: {
      BVToastPlugin: BVToastPlugin
    }
  });

  var BV_TOOLTIP = '__BV_Tooltip__'; // Default trigger

  var DefaultTrigger$1 = 'hover focus'; // Valid event triggers

  var validTriggers$1 = {
    focus: true,
    hover: true,
    click: true,
    blur: true,
    manual: true
  }; // Directive modifier test regular expressions. Pre-compile for performance

  var htmlRE$1 = /^html$/i;
  var noFadeRE$1 = /^nofade$/i;
  var placementRE$1 = /^(auto|top(left|right)?|bottom(left|right)?|left(top|bottom)?|right(top|bottom)?)$/i;
  var boundaryRE$1 = /^(window|viewport|scrollParent)$/i;
  var delayRE$1 = /^d\d+$/i;
  var delayShowRE$1 = /^ds\d+$/i;
  var delayHideRE$1 = /^dh\d+$/i;
  var offsetRE$1 = /^o-?\d+$/i;
  var variantRE$1 = /^v-.+$/i; // Build a Tooltip config based on bindings (if any)
  // Arguments and modifiers take precedence over passed value config object

  var parseBindings$1 = function parseBindings(bindings, vnode)
  /* istanbul ignore next: not easy to test */
  {
    // We start out with a basic config
    var NAME = 'BTooltip'; // Default config

    var config = {
      title: undefined,
      trigger: '',
      // Default set below if needed
      placement: 'top',
      fallbackPlacement: 'flip',
      container: false,
      // Default of body
      animation: true,
      offset: 0,
      id: null,
      html: false,
      disabled: false,
      delay: getComponentConfig(NAME, 'delay'),
      boundary: String(getComponentConfig(NAME, 'boundary')),
      boundaryPadding: parseInt(getComponentConfig(NAME, 'boundaryPadding'), 10) || 0,
      variant: getComponentConfig(NAME, 'variant'),
      customClass: getComponentConfig(NAME, 'customClass')
    }; // Process `bindings.value`

    if (isString(bindings.value) || isNumber(bindings.value)) {
      // Value is tooltip content (HTML optionally supported)
      config.title = bindings.value;
    } else if (isFunction(bindings.value)) {
      // Title generator function
      config.title = bindings.value;
    } else if (isPlainObject(bindings.value)) {
      // Value is config object, so merge
      config = _objectSpread2({}, config, {}, bindings.value);
    } // If title is not provided, try title attribute


    if (isUndefined(config.title)) {
      // Try attribute
      var data = vnode.data || {};
      config.title = data.attrs && !isUndefinedOrNull(data.attrs.title) ? data.attrs.title : undefined;
    } // Normalize delay


    if (!isPlainObject(config.delay)) {
      config.delay = {
        show: parseInt(config.delay, 10) || 0,
        hide: parseInt(config.delay, 10) || 0
      };
    } // If argument, assume element ID of container element


    if (bindings.arg) {
      // Element ID specified as arg
      // We must prepend '#' to become a CSS selector
      config.container = "#".concat(bindings.arg);
    } // Process modifiers


    keys(bindings.modifiers).forEach(function (mod) {
      if (htmlRE$1.test(mod)) {
        // Title allows HTML
        config.html = true;
      } else if (noFadeRE$1.test(mod)) {
        // No animation
        config.animation = false;
      } else if (placementRE$1.test(mod)) {
        // Placement of tooltip
        config.placement = mod;
      } else if (boundaryRE$1.test(mod)) {
        // Boundary of tooltip
        mod = mod === 'scrollparent' ? 'scrollParent' : mod;
        config.boundary = mod;
      } else if (delayRE$1.test(mod)) {
        // Delay value
        var delay = parseInt(mod.slice(1), 10) || 0;
        config.delay.show = delay;
        config.delay.hide = delay;
      } else if (delayShowRE$1.test(mod)) {
        // Delay show value
        config.delay.show = parseInt(mod.slice(2), 10) || 0;
      } else if (delayHideRE$1.test(mod)) {
        // Delay hide value
        config.delay.hide = parseInt(mod.slice(2), 10) || 0;
      } else if (offsetRE$1.test(mod)) {
        // Offset value, negative allowed
        config.offset = parseInt(mod.slice(1), 10) || 0;
      } else if (variantRE$1.test(mod)) {
        // Variant
        config.variant = mod.slice(2) || null;
      }
    }); // Special handling of event trigger modifiers trigger is
    // a space separated list

    var selectedTriggers = {}; // Parse current config object trigger

    concat(config.trigger || '').filter(Boolean).join(' ').trim().toLowerCase().split(/\s+/).forEach(function (trigger) {
      if (validTriggers$1[trigger]) {
        selectedTriggers[trigger] = true;
      }
    }); // Parse modifiers for triggers

    keys(bindings.modifiers).forEach(function (mod) {
      mod = mod.toLowerCase();

      if (validTriggers$1[mod]) {
        // If modifier is a valid trigger
        selectedTriggers[mod] = true;
      }
    }); // Sanitize triggers

    config.trigger = keys(selectedTriggers).join(' ');

    if (config.trigger === 'blur') {
      // Blur by itself is useless, so convert it to 'focus'
      config.trigger = 'focus';
    }

    if (!config.trigger) {
      // Use default trigger
      config.trigger = DefaultTrigger$1;
    } // Return the config


    return config;
  }; // Add/update Tooltip on our element


  var applyTooltip = function applyTooltip(el, bindings, vnode) {
    if (!isBrowser) {
      /* istanbul ignore next */
      return;
    }

    var config = parseBindings$1(bindings, vnode);

    if (!el[BV_TOOLTIP]) {
      var $parent = vnode.context;
      el[BV_TOOLTIP] = new BVTooltip({
        parent: $parent,
        // Add the parent's scoped style attribute data
        _scopeId: getScopeId($parent, undefined)
      });
      el[BV_TOOLTIP].__bv_prev_data__ = {};
      el[BV_TOOLTIP].$on('show', function ()
      /* istanbul ignore next: for now */
      {
        // Before showing the tooltip, we update the title if it is a function
        if (isFunction(config.title)) {
          el[BV_TOOLTIP].updateData({
            title: config.title(el)
          });
        }
      });
    }

    var data = {
      title: config.title,
      triggers: config.trigger,
      placement: config.placement,
      fallbackPlacement: config.fallbackPlacement,
      variant: config.variant,
      customClass: config.customClass,
      container: config.container,
      boundary: config.boundary,
      delay: config.delay,
      offset: config.offset,
      noFade: !config.animation,
      id: config.id,
      disabled: config.disabled,
      html: config.html
    };
    var oldData = el[BV_TOOLTIP].__bv_prev_data__;
    el[BV_TOOLTIP].__bv_prev_data__ = data;

    if (!looseEqual(data, oldData)) {
      // We only update the instance if data has changed
      var newData = {
        target: el
      };
      keys(data).forEach(function (prop) {
        // We only pass data properties that have changed
        if (data[prop] !== oldData[prop]) {
          // if title is a function, we execute it here
          newData[prop] = prop === 'title' && isFunction(data[prop]) ? data[prop](el) : data[prop];
        }
      });
      el[BV_TOOLTIP].updateData(newData);
    }
  }; // Remove Tooltip on our element


  var removeTooltip = function removeTooltip(el) {
    if (el[BV_TOOLTIP]) {
      el[BV_TOOLTIP].$destroy();
      el[BV_TOOLTIP] = null;
    }

    delete el[BV_TOOLTIP];
  }; // Export our directive


  var VBTooltip = {
    bind: function bind(el, bindings, vnode) {
      applyTooltip(el, bindings, vnode);
    },
    // We use `componentUpdated` here instead of `update`, as the former
    // waits until the containing component and children have finished updating
    componentUpdated: function componentUpdated(el, bindings, vnode) {
      // Performed in a `$nextTick()` to prevent render update loops
      vnode.context.$nextTick(function () {
        applyTooltip(el, bindings, vnode);
      });
    },
    unbind: function unbind(el) {
      removeTooltip(el);
    }
  };

  var VBTooltipPlugin =
  /*#__PURE__*/
  pluginFactory({
    directives: {
      VBTooltip: VBTooltip
    }
  });

  var TooltipPlugin =
  /*#__PURE__*/
  pluginFactory({
    components: {
      BTooltip: BTooltip
    },
    plugins: {
      VBTooltipPlugin: VBTooltipPlugin
    }
  });

  var componentsPlugin =
  /*#__PURE__*/
  pluginFactory({
    plugins: {
      AlertPlugin: AlertPlugin,
      BadgePlugin: BadgePlugin,
      BreadcrumbPlugin: BreadcrumbPlugin,
      ButtonPlugin: ButtonPlugin,
      ButtonGroupPlugin: ButtonGroupPlugin,
      ButtonToolbarPlugin: ButtonToolbarPlugin,
      CardPlugin: CardPlugin,
      CarouselPlugin: CarouselPlugin,
      CollapsePlugin: CollapsePlugin,
      DropdownPlugin: DropdownPlugin,
      EmbedPlugin: EmbedPlugin,
      FormPlugin: FormPlugin,
      FormGroupPlugin: FormGroupPlugin,
      FormCheckboxPlugin: FormCheckboxPlugin,
      FormRadioPlugin: FormRadioPlugin,
      FormInputPlugin: FormInputPlugin,
      FormTextareaPlugin: FormTextareaPlugin,
      FormFilePlugin: FormFilePlugin,
      FormSelectPlugin: FormSelectPlugin,
      ImagePlugin: ImagePlugin,
      InputGroupPlugin: InputGroupPlugin,
      JumbotronPlugin: JumbotronPlugin,
      LayoutPlugin: LayoutPlugin,
      LinkPlugin: LinkPlugin,
      ListGroupPlugin: ListGroupPlugin,
      MediaPlugin: MediaPlugin,
      ModalPlugin: ModalPlugin,
      NavPlugin: NavPlugin,
      NavbarPlugin: NavbarPlugin,
      PaginationPlugin: PaginationPlugin,
      PaginationNavPlugin: PaginationNavPlugin,
      PopoverPlugin: PopoverPlugin,
      ProgressPlugin: ProgressPlugin,
      SpinnerPlugin: SpinnerPlugin,
      TablePlugin: TablePlugin,
      TabsPlugin: TabsPlugin,
      ToastPlugin: ToastPlugin,
      TooltipPlugin: TooltipPlugin
    }
  });

  var VBModalPlugin =
  /*#__PURE__*/
  pluginFactory({
    directives: {
      VBModal: VBModal
    }
  });

  /*
   * Constants / Defaults
   */

  var NAME$x = 'v-b-scrollspy';
  var ACTIVATE_EVENT = 'bv::scrollspy::activate';
  var Default = {
    element: 'body',
    offset: 10,
    method: 'auto',
    throttle: 75
  };
  var DefaultType = {
    element: '(string|element|component)',
    offset: 'number',
    method: 'string',
    throttle: 'number'
  };
  var ClassName = {
    DROPDOWN_ITEM: 'dropdown-item',
    ACTIVE: 'active'
  };
  var Selector$2 = {
    ACTIVE: '.active',
    NAV_LIST_GROUP: '.nav, .list-group',
    NAV_LINKS: '.nav-link',
    NAV_ITEMS: '.nav-item',
    LIST_ITEMS: '.list-group-item',
    DROPDOWN: '.dropdown, .dropup',
    DROPDOWN_ITEMS: '.dropdown-item',
    DROPDOWN_TOGGLE: '.dropdown-toggle'
  };
  var OffsetMethod = {
    OFFSET: 'offset',
    POSITION: 'position'
  }; // HREFs must end with a hash followed by at least one non-hash character.
  // HREFs in the links are assumed to point to non-external links.
  // Comparison to the current page base URL is not performed!

  var HREF_REGEX = /^.*(#[^#]+)$/; // Transition Events

  var TransitionEndEvents$1 = ['webkitTransitionEnd', 'transitionend', 'otransitionend', 'oTransitionEnd']; // Options for events

  var EventOptions$2 = {
    passive: true,
    capture: false
  };
  /*
   * Utility Methods
   */
  // Better var type detection

  var toType$1 = function toType(obj)
  /* istanbul ignore next: not easy to test */
  {
    return toString(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
  }; // Check config properties for expected types


  var typeCheckConfig = function typeCheckConfig(componentName, config, configTypes)
  /* istanbul ignore next: not easy to test */
  {
    for (var property in configTypes) {
      if (Object.prototype.hasOwnProperty.call(configTypes, property)) {
        var expectedTypes = configTypes[property];
        var value = config[property];
        var valueType = value && isElement(value) ? 'element' : toType$1(value); // handle Vue instances

        valueType = value && value._isVue ? 'component' : valueType;

        if (!new RegExp(expectedTypes).test(valueType)) {
          /* istanbul ignore next */
          warn("".concat(componentName, ": Option \"").concat(property, "\" provided type \"").concat(valueType, "\" but expected type \"").concat(expectedTypes, "\""));
        }
      }
    }
  };
  /*
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  /* istanbul ignore next: not easy to test */


  var ScrollSpy
  /* istanbul ignore next: not easy to test */
  =
  /*#__PURE__*/
  function () {
    function ScrollSpy(element, config, $root) {
      _classCallCheck(this, ScrollSpy);

      // The element we activate links in
      this.$el = element;
      this.$scroller = null;
      this.$selector = [Selector$2.NAV_LINKS, Selector$2.LIST_ITEMS, Selector$2.DROPDOWN_ITEMS].join(',');
      this.$offsets = [];
      this.$targets = [];
      this.$activeTarget = null;
      this.$scrollHeight = 0;
      this.$resizeTimeout = null;
      this.$obs_scroller = null;
      this.$obs_targets = null;
      this.$root = $root || null;
      this.$config = null;
      this.updateConfig(config);
    }

    _createClass(ScrollSpy, [{
      key: "updateConfig",
      value: function updateConfig(config, $root) {
        if (this.$scroller) {
          // Just in case out scroll element has changed
          this.unlisten();
          this.$scroller = null;
        }

        var cfg = _objectSpread2({}, this.constructor.Default, {}, config);

        if ($root) {
          this.$root = $root;
        }

        typeCheckConfig(this.constructor.Name, cfg, this.constructor.DefaultType);
        this.$config = cfg;

        if (this.$root) {
          var self = this;
          this.$root.$nextTick(function () {
            self.listen();
          });
        } else {
          this.listen();
        }
      }
    }, {
      key: "dispose",
      value: function dispose() {
        this.unlisten();
        clearTimeout(this.$resizeTimeout);
        this.$resizeTimeout = null;
        this.$el = null;
        this.$config = null;
        this.$scroller = null;
        this.$selector = null;
        this.$offsets = null;
        this.$targets = null;
        this.$activeTarget = null;
        this.$scrollHeight = null;
      }
    }, {
      key: "listen",
      value: function listen() {
        var _this = this;

        var scroller = this.getScroller();

        if (scroller && scroller.tagName !== 'BODY') {
          eventOn(scroller, 'scroll', this, EventOptions$2);
        }

        eventOn(window, 'scroll', this, EventOptions$2);
        eventOn(window, 'resize', this, EventOptions$2);
        eventOn(window, 'orientationchange', this, EventOptions$2);
        TransitionEndEvents$1.forEach(function (evtName) {
          eventOn(window, evtName, _this, EventOptions$2);
        });
        this.setObservers(true); // Schedule a refresh

        this.handleEvent('refresh');
      }
    }, {
      key: "unlisten",
      value: function unlisten() {
        var _this2 = this;

        var scroller = this.getScroller();
        this.setObservers(false);

        if (scroller && scroller.tagName !== 'BODY') {
          eventOff(scroller, 'scroll', this, EventOptions$2);
        }

        eventOff(window, 'scroll', this, EventOptions$2);
        eventOff(window, 'resize', this, EventOptions$2);
        eventOff(window, 'orientationchange', this, EventOptions$2);
        TransitionEndEvents$1.forEach(function (evtName) {
          eventOff(window, evtName, _this2, EventOptions$2);
        });
      }
    }, {
      key: "setObservers",
      value: function setObservers(on) {
        var _this3 = this;

        // We observe both the scroller for content changes, and the target links
        if (this.$obs_scroller) {
          this.$obs_scroller.disconnect();
          this.$obs_scroller = null;
        }

        if (this.$obs_targets) {
          this.$obs_targets.disconnect();
          this.$obs_targets = null;
        }

        if (on) {
          this.$obs_targets = observeDom(this.$el, function () {
            _this3.handleEvent('mutation');
          }, {
            subtree: true,
            childList: true,
            attributes: true,
            attributeFilter: ['href']
          });
          this.$obs_scroller = observeDom(this.getScroller(), function () {
            _this3.handleEvent('mutation');
          }, {
            subtree: true,
            childList: true,
            characterData: true,
            attributes: true,
            attributeFilter: ['id', 'style', 'class']
          });
        }
      } // General event handler

    }, {
      key: "handleEvent",
      value: function handleEvent(evt) {
        var type = isString(evt) ? evt : evt.type;
        var self = this;

        var resizeThrottle = function resizeThrottle() {
          if (!self.$resizeTimeout) {
            self.$resizeTimeout = setTimeout(function () {
              self.refresh();
              self.process();
              self.$resizeTimeout = null;
            }, self.$config.throttle);
          }
        };

        if (type === 'scroll') {
          if (!this.$obs_scroller) {
            // Just in case we are added to the DOM before the scroll target is
            // We re-instantiate our listeners, just in case
            this.listen();
          }

          this.process();
        } else if (/(resize|orientationchange|mutation|refresh)/.test(type)) {
          // Postpone these events by throttle time
          resizeThrottle();
        }
      } // Refresh the list of target links on the element we are applied to

    }, {
      key: "refresh",
      value: function refresh() {
        var _this4 = this;

        var scroller = this.getScroller();

        if (!scroller) {
          return;
        }

        var autoMethod = scroller !== scroller.window ? OffsetMethod.POSITION : OffsetMethod.OFFSET;
        var method = this.$config.method === 'auto' ? autoMethod : this.$config.method;
        var methodFn = method === OffsetMethod.POSITION ? position : offset;
        var offsetBase = method === OffsetMethod.POSITION ? this.getScrollTop() : 0;
        this.$offsets = [];
        this.$targets = [];
        this.$scrollHeight = this.getScrollHeight(); // Find all the unique link HREFs that we will control

        selectAll(this.$selector, this.$el) // Get HREF value
        .map(function (link) {
          return getAttr(link, 'href');
        }) // Filter out HREFs that do not match our RegExp
        .filter(function (href) {
          return href && HREF_REGEX.test(href || '');
        }) // Find all elements with ID that match HREF hash
        .map(function (href) {
          // Convert HREF into an ID (including # at beginning)
          var id = href.replace(HREF_REGEX, '$1').trim();

          if (!id) {
            return null;
          } // Find the element with the ID specified by id


          var el = select(id, scroller);

          if (el && isVisible(el)) {
            return {
              offset: parseInt(methodFn(el).top, 10) + offsetBase,
              target: id
            };
          }

          return null;
        }).filter(Boolean) // Sort them by their offsets (smallest first)
        .sort(function (a, b) {
          return a.offset - b.offset;
        }) // record only unique targets/offsets
        .reduce(function (memo, item) {
          if (!memo[item.target]) {
            _this4.$offsets.push(item.offset);

            _this4.$targets.push(item.target);

            memo[item.target] = true;
          }

          return memo;
        }, {}); // Return this for easy chaining

        return this;
      } // Handle activating/clearing

    }, {
      key: "process",
      value: function process() {
        var scrollTop = this.getScrollTop() + this.$config.offset;
        var scrollHeight = this.getScrollHeight();
        var maxScroll = this.$config.offset + scrollHeight - this.getOffsetHeight();

        if (this.$scrollHeight !== scrollHeight) {
          this.refresh();
        }

        if (scrollTop >= maxScroll) {
          var target = this.$targets[this.$targets.length - 1];

          if (this.$activeTarget !== target) {
            this.activate(target);
          }

          return;
        }

        if (this.$activeTarget && scrollTop < this.$offsets[0] && this.$offsets[0] > 0) {
          this.$activeTarget = null;
          this.clear();
          return;
        }

        for (var i = this.$offsets.length; i--;) {
          var isActiveTarget = this.$activeTarget !== this.$targets[i] && scrollTop >= this.$offsets[i] && (isUndefined(this.$offsets[i + 1]) || scrollTop < this.$offsets[i + 1]);

          if (isActiveTarget) {
            this.activate(this.$targets[i]);
          }
        }
      }
    }, {
      key: "getScroller",
      value: function getScroller() {
        if (this.$scroller) {
          return this.$scroller;
        }

        var scroller = this.$config.element;

        if (!scroller) {
          return null;
        } else if (isElement(scroller.$el)) {
          scroller = scroller.$el;
        } else if (isString(scroller)) {
          scroller = select(scroller);
        }

        if (!scroller) {
          return null;
        }

        this.$scroller = scroller.tagName === 'BODY' ? window : scroller;
        return this.$scroller;
      }
    }, {
      key: "getScrollTop",
      value: function getScrollTop() {
        var scroller = this.getScroller();
        return scroller === window ? scroller.pageYOffset : scroller.scrollTop;
      }
    }, {
      key: "getScrollHeight",
      value: function getScrollHeight() {
        return this.getScroller().scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
      }
    }, {
      key: "getOffsetHeight",
      value: function getOffsetHeight() {
        var scroller = this.getScroller();
        return scroller === window ? window.innerHeight : getBCR(scroller).height;
      }
    }, {
      key: "activate",
      value: function activate(target) {
        var _this5 = this;

        this.$activeTarget = target;
        this.clear(); // Grab the list of target links (<a href="{$target}">)

        var links = selectAll(this.$selector // Split out the base selectors
        .split(',') // Map to a selector that matches links with HREF ending in the ID (including '#')
        .map(function (selector) {
          return "".concat(selector, "[href$=\"").concat(target, "\"]");
        }) // Join back into a single selector string
        .join(','), this.$el);
        links.forEach(function (link) {
          if (hasClass(link, ClassName.DROPDOWN_ITEM)) {
            // This is a dropdown item, so find the .dropdown-toggle and set it's state
            var dropdown = closest(Selector$2.DROPDOWN, link);

            if (dropdown) {
              _this5.setActiveState(select(Selector$2.DROPDOWN_TOGGLE, dropdown), true);
            } // Also set this link's state


            _this5.setActiveState(link, true);
          } else {
            // Set triggered link as active
            _this5.setActiveState(link, true);

            if (matches(link.parentElement, Selector$2.NAV_ITEMS)) {
              // Handle nav-link inside nav-item, and set nav-item active
              _this5.setActiveState(link.parentElement, true);
            } // Set triggered links parents as active
            // With both <ul> and <nav> markup a parent is the previous sibling of any nav ancestor


            var el = link;

            while (el) {
              el = closest(Selector$2.NAV_LIST_GROUP, el);
              var sibling = el ? el.previousElementSibling : null;

              if (sibling && matches(sibling, "".concat(Selector$2.NAV_LINKS, ", ").concat(Selector$2.LIST_ITEMS))) {
                _this5.setActiveState(sibling, true);
              } // Handle special case where nav-link is inside a nav-item


              if (sibling && matches(sibling, Selector$2.NAV_ITEMS)) {
                _this5.setActiveState(select(Selector$2.NAV_LINKS, sibling), true); // Add active state to nav-item as well


                _this5.setActiveState(sibling, true);
              }
            }
          }
        }); // Signal event to via $root, passing ID of activated target and reference to array of links

        if (links && links.length > 0 && this.$root) {
          this.$root.$emit(ACTIVATE_EVENT, target, links);
        }
      }
    }, {
      key: "clear",
      value: function clear() {
        var _this6 = this;

        selectAll("".concat(this.$selector, ", ").concat(Selector$2.NAV_ITEMS), this.$el).filter(function (el) {
          return hasClass(el, ClassName.ACTIVE);
        }).forEach(function (el) {
          return _this6.setActiveState(el, false);
        });
      }
    }, {
      key: "setActiveState",
      value: function setActiveState(el, active) {
        if (!el) {
          return;
        }

        if (active) {
          addClass(el, ClassName.ACTIVE);
        } else {
          removeClass(el, ClassName.ACTIVE);
        }
      }
    }], [{
      key: "Name",
      get: function get() {
        return NAME$x;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default;
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return DefaultType;
      }
    }]);

    return ScrollSpy;
  }();

  var BV_SCROLLSPY = '__BV_ScrollSpy__'; // Build a ScrollSpy config based on bindings (if any)
  // Arguments and modifiers take precedence over passed value config object

  /* istanbul ignore next: not easy to test */

  var parseBindings$2 = function parseBindings(bindings)
  /* istanbul ignore next: not easy to test */
  {
    var config = {}; // If argument, assume element ID

    if (bindings.arg) {
      // Element ID specified as arg
      // We must prepend '#' to become a CSS selector
      config.element = "#".concat(bindings.arg);
    } // Process modifiers


    keys(bindings.modifiers).forEach(function (mod) {
      if (/^\d+$/.test(mod)) {
        // Offset value
        config.offset = parseInt(mod, 10);
      } else if (/^(auto|position|offset)$/.test(mod)) {
        // Offset method
        config.method = mod;
      }
    }); // Process value

    if (isString(bindings.value)) {
      // Value is a CSS ID or selector
      config.element = bindings.value;
    } else if (isNumber(bindings.value)) {
      // Value is offset
      config.offset = Math.round(bindings.value);
    } else if (isObject(bindings.value)) {
      // Value is config object
      // Filter the object based on our supported config options
      keys(bindings.value).filter(function (k) {
        return Boolean(ScrollSpy.DefaultType[k]);
      }).forEach(function (k) {
        config[k] = bindings.value[k];
      });
    }

    return config;
  }; // Add or update ScrollSpy on our element


  var applyScrollspy = function applyScrollspy(el, bindings, vnode)
  /* istanbul ignore next: not easy to test */
  {
    if (!isBrowser) {
      /* istanbul ignore next */
      return;
    }

    var config = parseBindings$2(bindings);

    if (el[BV_SCROLLSPY]) {
      el[BV_SCROLLSPY].updateConfig(config, vnode.context.$root);
    } else {
      el[BV_SCROLLSPY] = new ScrollSpy(el, config, vnode.context.$root);
    }
  }; // Remove ScrollSpy on our element

  /* istanbul ignore next: not easy to test */


  var removeScrollspy = function removeScrollspy(el)
  /* istanbul ignore next: not easy to test */
  {
    if (el[BV_SCROLLSPY]) {
      el[BV_SCROLLSPY].dispose();
      el[BV_SCROLLSPY] = null;
      delete el[BV_SCROLLSPY];
    }
  };
  /*
   * Export our directive
   */


  var VBScrollspy = {
    bind: function bind(el, bindings, vnode)
    /* istanbul ignore next: not easy to test */
    {
      applyScrollspy(el, bindings, vnode);
    },
    inserted: function inserted(el, bindings, vnode)
    /* istanbul ignore next: not easy to test */
    {
      applyScrollspy(el, bindings, vnode);
    },
    update: function update(el, bindings, vnode)
    /* istanbul ignore next: not easy to test */
    {
      if (bindings.value !== bindings.oldValue) {
        applyScrollspy(el, bindings, vnode);
      }
    },
    componentUpdated: function componentUpdated(el, bindings, vnode)
    /* istanbul ignore next: not easy to test */
    {
      if (bindings.value !== bindings.oldValue) {
        applyScrollspy(el, bindings, vnode);
      }
    },
    unbind: function unbind(el)
    /* istanbul ignore next: not easy to test */
    {
      removeScrollspy(el);
    }
  };

  var VBScrollspyPlugin =
  /*#__PURE__*/
  pluginFactory({
    directives: {
      VBScrollspy: VBScrollspy
    }
  });

  var VBTogglePlugin =
  /*#__PURE__*/
  pluginFactory({
    directives: {
      VBToggle: VBToggle
    }
  });

  var VBVisiblePlugin =
  /*#__PURE__*/
  pluginFactory({
    directives: {
      VBVisible: VBVisible
    }
  });

  var directivesPlugin =
  /*#__PURE__*/
  pluginFactory({
    plugins: {
      VBModalPlugin: VBModalPlugin,
      VBPopoverPlugin: VBPopoverPlugin,
      VBScrollspyPlugin: VBScrollspyPlugin,
      VBTogglePlugin: VBTogglePlugin,
      VBTooltipPlugin: VBTooltipPlugin,
      VBVisiblePlugin: VBVisiblePlugin
    }
  });

  var NAME$y = 'BootstrapVue'; //
  // BootstrapVue installer
  //

  var install =
  /*#__PURE__*/
  installFactory({
    plugins: {
      componentsPlugin: componentsPlugin,
      directivesPlugin: directivesPlugin
    }
  }); //
  // BootstrapVue plugin
  //

  var BootstrapVue =
  /*#__PURE__*/
  {
    install: install,
    NAME: NAME$y
  }; //

  // Main entry point for the browser build

  vueUse(BootstrapVue);

  return BootstrapVue;

})));
//# sourceMappingURL=bootstrap-vue.js.map

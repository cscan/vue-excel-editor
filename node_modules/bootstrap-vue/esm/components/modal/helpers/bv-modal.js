function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

// Plugin for adding `$bvModal` property to all Vue instances
import { BModal, props as modalProps } from '../modal';
import { concat } from '../../../utils/array';
import { getComponentConfig } from '../../../utils/config';
import { isUndefined, isFunction } from '../../../utils/inspect';
import { assign, keys, omit, defineProperty, defineProperties, readonlyDescriptor } from '../../../utils/object';
import { pluginFactory } from '../../../utils/plugins';
import { warn, warnNotClient, warnNoPromiseSupport } from '../../../utils/warn'; // --- Constants ---

var PROP_NAME = '$bvModal';
var PROP_NAME_PRIV = '_bv__modal'; // Base modal props that are allowed
// Some may be ignored or overridden on some message boxes
// Prop ID is allowed, but really only should be used for testing
// We need to add it in explicitly as it comes from the `idMixin`

var BASE_PROPS = ['id'].concat(_toConsumableArray(keys(omit(modalProps, ['busy', 'lazy', 'noStacking', "static", 'visible'])))); // Fallback event resolver (returns undefined)

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

    if (warnNotClient(PROP_NAME) || warnNoPromiseSupport(PROP_NAME)) {
      /* istanbul ignore next */
      return;
    } // Create an instance of `BMsgBox` component


    var msgBox = new BMsgBox({
      // We set parent as the local VM so these modals can emit events on
      // the app `$root`, as needed by things like tooltips and popovers
      // And it helps to ensure `BMsgBox` is destroyed when parent is destroyed
      parent: $parent,
      // Preset the prop values
      propsData: _objectSpread({}, filterOptions(getComponentConfig('BModal') || {}), {
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

    if (!content || warnNoPromiseSupport(PROP_NAME) || warnNotClient(PROP_NAME) || !isFunction(resolver)) {
      /* istanbul ignore next */
      return;
    }

    return asyncMsgBox($parent, _objectSpread({}, filterOptions(options), {
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
        var props = _objectSpread({}, options, {
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
        var props = _objectSpread({}, options, {
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

  if (!Vue.prototype.hasOwnProperty(PROP_NAME)) {
    defineProperty(Vue.prototype, PROP_NAME, {
      get: function get() {
        /* istanbul ignore next */
        if (!this || !this[PROP_NAME_PRIV]) {
          warn("'".concat(PROP_NAME, "' must be accessed from a Vue instance 'this' context"));
        }

        return this[PROP_NAME_PRIV];
      }
    });
  }
};

export var BVModalPlugin =
/*#__PURE__*/
pluginFactory({
  plugins: {
    plugin: plugin
  }
});
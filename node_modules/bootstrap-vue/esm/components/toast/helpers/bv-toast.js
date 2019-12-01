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

/**
 * Plugin for adding `$bvToast` property to all Vue instances
 */
import { concat } from '../../../utils/array';
import { getComponentConfig } from '../../../utils/config';
import { requestAF } from '../../../utils/dom';
import { isUndefined, isString } from '../../../utils/inspect';
import { assign, defineProperties, defineProperty, keys, omit, readonlyDescriptor } from '../../../utils/object';
import { pluginFactory } from '../../../utils/plugins';
import { warn, warnNotClient } from '../../../utils/warn';
import { BToast, props as toastProps } from '../toast'; // --- Constants ---

var PROP_NAME = '$bvToast';
var PROP_NAME_PRIV = '_bv__toast'; // Base toast props that are allowed
// Some may be ignored or overridden on some message boxes
// Prop ID is allowed, but really only should be used for testing
// We need to add it in explicitly as it comes from the `idMixin`

var BASE_PROPS = ['id'].concat(_toConsumableArray(keys(omit(toastProps, ['static', 'visible'])))); // Map prop names to toast slot names

var propsToSlots = {
  toastContent: 'default',
  title: 'toast-title'
}; // --- Utility methods ---
// Method to filter only recognized props that are not undefined

var filterOptions = function filterOptions(options) {
  return BASE_PROPS.reduce(function (memo, key) {
    if (!isUndefined(options[key])) {
      memo[key] = options[key];
    }

    return memo;
  }, {});
}; // Method to install `$bvToast` VM injection


var plugin = function plugin(Vue) {
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
    if (warnNotClient(PROP_NAME)) {
      /* istanbul ignore next */
      return;
    } // Create an instance of `BToastPop` component


    var toast = new BToastPop({
      // We set parent as the local VM so these toasts can emit events on the
      // app `$root`, and it ensures `BToast` is destroyed when parent is destroyed
      parent: $parent,
      propsData: _objectSpread({}, filterOptions(getComponentConfig('BToast') || {}), {}, omit(props, keys(propsToSlots)), {
        // Props that can't be overridden
        static: false,
        visible: true
      })
    }); // Convert certain props to slots

    keys(propsToSlots).forEach(function (prop) {
      var value = props[prop];

      if (!isUndefined(value)) {
        // Can be a string, or array of VNodes
        if (prop === 'title' && isString(value)) {
          // Special case for title if it is a string, we wrap in a <strong>
          value = [$parent.$createElement('strong', {
            class: 'mr-2'
          }, value)];
        }

        toast.$slots[propsToSlots[prop]] = concat(value);
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

        if (!content || warnNotClient(PROP_NAME)) {
          /* istanbul ignore next */
          return;
        }

        makeToast(_objectSpread({}, filterOptions(options), {
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
      this[PROP_NAME_PRIV] = new BvToast(this);
    }
  }); // Define our read-only `$bvToast` instance property
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

export var BVToastPlugin =
/*#__PURE__*/
pluginFactory({
  plugins: {
    plugin: plugin
  }
});
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import Popper from 'popper.js';
import KeyCodes from '../utils/key-codes';
import warn from '../utils/warn';
import { BvEvent } from '../utils/bv-event.class';
import { closest, contains, isVisible, requestAF, selectAll } from '../utils/dom';
import { hasTouchSupport } from '../utils/env';
import { isNull } from '../utils/inspect';
import clickOutMixin from './click-out';
import focusInMixin from './focus-in';
import idMixin from './id'; // Return an array of visible items

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

export default {
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

      return _objectSpread({}, popperConfig, {}, this.popperOpts || {});
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

      if (type !== 'click' && !(type === 'keydown' && (key === KeyCodes.ENTER || key === KeyCodes.SPACE || key === KeyCodes.DOWN))) {
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

      if (key === KeyCodes.ESC) {
        // Close on ESC
        this.onEsc(evt);
      } else if (key === KeyCodes.DOWN) {
        // Down Arrow
        this.focusNext(evt, false);
      } else if (key === KeyCodes.UP) {
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
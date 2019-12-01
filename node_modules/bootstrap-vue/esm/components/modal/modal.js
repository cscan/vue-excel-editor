function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import Vue from '../../utils/vue';
import BVTransition from '../../utils/bv-transition';
import KeyCodes from '../../utils/key-codes';
import observeDom from '../../utils/observe-dom';
import { arrayIncludes } from '../../utils/array';
import { getComponentConfig } from '../../utils/config';
import { contains, eventOff, eventOn, isVisible, requestAF, select, selectAll } from '../../utils/dom';
import { isBrowser } from '../../utils/env';
import { stripTags } from '../../utils/html';
import { isString, isUndefinedOrNull } from '../../utils/inspect';
import { HTMLElement } from '../../utils/safe-types';
import { BTransporterSingle } from '../../utils/transporter';
import idMixin from '../../mixins/id';
import listenOnRootMixin from '../../mixins/listen-on-root';
import normalizeSlotMixin from '../../mixins/normalize-slot';
import scopedStyleAttrsMixin from '../../mixins/scoped-style-attrs';
import { BButton } from '../button/button';
import { BButtonClose } from '../button/button-close';
import { modalManager } from './helpers/modal-manager';
import { BvModalEvent } from './helpers/bv-modal-event.class'; // --- Constants ---

var NAME = 'BModal'; // ObserveDom config to detect changes in modal content
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


export var props = {
  size: {
    type: String,
    default: function _default() {
      return getComponentConfig(NAME, 'size');
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
      return getComponentConfig(NAME, 'titleTag');
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
      return getComponentConfig(NAME, 'headerBgVariant');
    }
  },
  headerBorderVariant: {
    type: String,
    default: function _default() {
      return getComponentConfig(NAME, 'headerBorderVariant');
    }
  },
  headerTextVariant: {
    type: String,
    default: function _default() {
      return getComponentConfig(NAME, 'headerTextVariant');
    }
  },
  headerCloseVariant: {
    type: String,
    default: function _default() {
      return getComponentConfig(NAME, 'headerCloseVariant');
    }
  },
  headerClass: {
    type: [String, Array, Object],
    default: null
  },
  bodyBgVariant: {
    type: String,
    default: function _default() {
      return getComponentConfig(NAME, 'bodyBgVariant');
    }
  },
  bodyTextVariant: {
    type: String,
    default: function _default() {
      return getComponentConfig(NAME, 'bodyTextVariant');
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
      return getComponentConfig(NAME, 'footerBgVariant');
    }
  },
  footerBorderVariant: {
    type: String,
    default: function _default() {
      return getComponentConfig(NAME, 'footerBorderVariant');
    }
  },
  footerTextVariant: {
    type: String,
    default: function _default() {
      return getComponentConfig(NAME, 'footerTextVariant');
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
      return getComponentConfig(NAME, 'headerCloseLabel');
    }
  },
  cancelTitle: {
    type: String,
    default: function _default() {
      return getComponentConfig(NAME, 'cancelTitle');
    }
  },
  cancelTitleHtml: {
    type: String
  },
  okTitle: {
    type: String,
    default: function _default() {
      return getComponentConfig(NAME, 'okTitle');
    }
  },
  okTitleHtml: {
    type: String
  },
  cancelVariant: {
    type: String,
    default: function _default() {
      return getComponentConfig(NAME, 'cancelVariant');
    }
  },
  okVariant: {
    type: String,
    default: function _default() {
      return getComponentConfig(NAME, 'okVariant');
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

export var BModal =
/*#__PURE__*/
Vue.extend({
  name: NAME,
  mixins: [idMixin, listenOnRootMixin, normalizeSlotMixin, scopedStyleAttrsMixin],
  inheritAttrs: false,
  model: {
    prop: 'visible',
    event: 'change'
  },
  props: props,
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
      return new BvModalEvent(type, _objectSpread({
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
      if (evt.keyCode === KeyCodes.ESC && this.isVisible && !this.noCloseOnEsc) {
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
        attrs: _objectSpread({}, scopedStyleAttrs, {}, this.$attrs, {
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
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import Vue from '../../utils/vue';
import { Portal, Wormhole } from 'portal-vue';
import BVTransition from '../../utils/bv-transition';
import { BvEvent } from '../../utils/bv-event.class';
import { getComponentConfig } from '../../utils/config';
import { requestAF, eventOn, eventOff } from '../../utils/dom';
import idMixin from '../../mixins/id';
import listenOnRootMixin from '../../mixins/listen-on-root';
import normalizeSlotMixin from '../../mixins/normalize-slot';
import scopedStyleAttrsMixin from '../../mixins/scoped-style-attrs';
import { BToaster } from './toaster';
import { BButtonClose } from '../button/button-close';
import { BLink } from '../link/link'; // --- Constants ---

var NAME = 'BToast';
var MIN_DURATION = 1000;
var EVENT_OPTIONS = {
  passive: true,
  capture: false
}; // --- Props ---

export var props = {
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
      return getComponentConfig(NAME, 'toaster');
    }
  },
  visible: {
    type: Boolean,
    default: false
  },
  variant: {
    type: String,
    default: function _default() {
      return getComponentConfig(NAME, 'variant');
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
      return getComponentConfig(NAME, 'autoHideDelay');
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
      return getComponentConfig(NAME, 'toastClass');
    }
  },
  headerClass: {
    type: [String, Object, Array],
    default: function _default() {
      return getComponentConfig(NAME, 'headerClass');
    }
  },
  bodyClass: {
    type: [String, Object, Array],
    default: function _default() {
      return getComponentConfig(NAME, 'bodyClass');
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

export var BToast =
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
      return new BvEvent(type, _objectSpread({
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

      if (!Wormhole.hasTarget(this.computedToaster)) {
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
        attrs: _objectSpread({}, this.$attrs, {
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
      attrs: _objectSpread({}, scopedStyleAttrs, {
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
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import Vue from '../../utils/vue';
import { getComponentConfig } from '../../utils/config';
import { requestAF } from '../../utils/dom';
import { isBoolean } from '../../utils/inspect';
import BVTransition from '../../utils/bv-transition';
import normalizeSlotMixin from '../../mixins/normalize-slot';
import { BButtonClose } from '../button/button-close';
var NAME = 'BAlert'; // Convert `show` value to a number

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


export var BAlert =
/*#__PURE__*/
Vue.extend({
  name: NAME,
  mixins: [normalizeSlotMixin],
  model: {
    prop: 'show',
    event: 'input'
  },
  props: {
    variant: {
      type: String,
      default: function _default() {
        return getComponentConfig(NAME, 'variant');
      }
    },
    dismissible: {
      type: Boolean,
      default: false
    },
    dismissLabel: {
      type: String,
      default: function _default() {
        return getComponentConfig(NAME, 'dismissLabel');
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
import Vue from '../../utils/vue';
import { getComponentConfig } from '../../utils/config';
import { htmlOrText } from '../../utils/html';
import { isBoolean, isNumber } from '../../utils/inspect';
import normalizeSlotMixin from '../../mixins/normalize-slot';
var NAME = 'BProgressBar'; // @vue/component

export var BProgressBar =
/*#__PURE__*/
Vue.extend({
  name: NAME,
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
        return getComponentConfig(NAME, 'variant');
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
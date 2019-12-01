function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import Vue from '../../utils/vue';
import { mergeData } from 'vue-functional-data-merge';
import { getComponentConfig } from '../../utils/config';
import { normalizeSlot } from '../../utils/normalize-slot';
var NAME = 'BSpinner'; // @vue/component

export var BSpinner =
/*#__PURE__*/
Vue.extend({
  name: NAME,
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
        return getComponentConfig(NAME, 'variant');
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

    return h(props.tag, mergeData(data, {
      attrs: {
        role: label ? props.role || 'status' : null,
        'aria-hidden': label ? null : 'true'
      },
      class: (_class = {}, _defineProperty(_class, "spinner-".concat(props.type), Boolean(props.type)), _defineProperty(_class, "spinner-".concat(props.type, "-sm"), props.small), _defineProperty(_class, "text-".concat(props.variant), Boolean(props.variant)), _class)
    }), [label || h()]);
  }
});
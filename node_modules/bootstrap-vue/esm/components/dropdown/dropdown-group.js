function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import Vue from '../../utils/vue';
import { mergeData } from 'vue-functional-data-merge';
import { hasNormalizedSlot, normalizeSlot } from '../../utils/normalize-slot';
export var props = {
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

export var BDropdownGroup =
/*#__PURE__*/
Vue.extend({
  name: 'BDropdownGroup',
  functional: true,
  props: props,
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
    return h('li', mergeData(data, {
      attrs: {
        role: 'presentation'
      }
    }), [header || h(), h('ul', {
      staticClass: 'list-unstyled',
      attrs: _objectSpread({}, $attrs, {
        id: props.id || null,
        role: 'group',
        'aria-describedby': adb || null
      })
    }, normalizeSlot('default', {}, $scopedSlots, $slots))]);
  }
});
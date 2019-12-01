function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import Vue from '../../utils/vue';
import { mergeData } from 'vue-functional-data-merge';
export var props = {
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

export var BDropdownHeader =
/*#__PURE__*/
Vue.extend({
  name: 'BDropdownHeader',
  functional: true,
  props: props,
  render: function render(h, _ref) {
    var props = _ref.props,
        data = _ref.data,
        children = _ref.children;
    var $attrs = data.attrs || {};
    data.attrs = {};
    return h('li', mergeData(data, {
      attrs: {
        role: 'presentation'
      }
    }), [h(props.tag, {
      staticClass: 'dropdown-header',
      class: _defineProperty({}, "text-".concat(props.variant), props.variant),
      attrs: _objectSpread({}, $attrs, {
        id: props.id || null,
        role: 'heading'
      }),
      ref: 'header'
    }, children)]);
  }
});
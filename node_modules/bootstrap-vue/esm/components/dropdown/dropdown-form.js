function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import Vue from '../../utils/vue';
import { mergeData } from 'vue-functional-data-merge';
import { BForm, props as formProps } from '../form/form';
export var BDropdownForm =
/*#__PURE__*/
Vue.extend({
  name: 'BDropdownForm',
  functional: true,
  props: _objectSpread({}, formProps, {
    disabled: {
      type: Boolean,
      default: false
    }
  }),
  render: function render(h, _ref) {
    var props = _ref.props,
        data = _ref.data,
        children = _ref.children;
    var $attrs = data.attrs || {};
    var $listeners = data.on || {};
    data.attrs = {};
    data.on = {};
    return h('li', mergeData(data, {
      attrs: {
        role: 'presentation'
      }
    }), [h(BForm, {
      ref: 'form',
      staticClass: 'b-dropdown-form',
      class: {
        disabled: props.disabled
      },
      props: props,
      attrs: _objectSpread({}, $attrs, {
        disabled: props.disabled,
        // Tab index of -1 for keyboard navigation
        tabindex: props.disabled ? null : '-1'
      }),
      on: $listeners
    }, children)]);
  }
});
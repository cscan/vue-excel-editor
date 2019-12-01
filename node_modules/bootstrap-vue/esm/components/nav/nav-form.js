function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import Vue from '../../utils/vue';
import { mergeData } from 'vue-functional-data-merge';
import { omit } from '../../utils/object';
import { BForm, props as BFormProps } from '../form/form';
export var props = _objectSpread({}, omit(BFormProps, ['inline']), {
  formClass: {
    type: [String, Array, Object],
    default: null
  }
}); // @vue/component

export var BNavForm =
/*#__PURE__*/
Vue.extend({
  name: 'BNavForm',
  functional: true,
  props: props,
  render: function render(h, _ref) {
    var props = _ref.props,
        data = _ref.data,
        children = _ref.children,
        _ref$listeners = _ref.listeners,
        listeners = _ref$listeners === void 0 ? {} : _ref$listeners;
    var attrs = data.attrs; // The following data properties are cleared out
    // as they will be passed to BForm directly

    data.attrs = {};
    data.on = {};
    var $form = h(BForm, {
      class: props.formClass,
      props: _objectSpread({}, props, {
        inline: true
      }),
      attrs: attrs,
      on: listeners
    }, children);
    return h('li', mergeData(data, {
      staticClass: 'form-inline'
    }), [$form]);
  }
});
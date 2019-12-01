function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import Vue from '../../utils/vue';
import { mergeData } from 'vue-functional-data-merge';
import prefixPropName from '../../utils/prefix-prop-name';
import copyProps from '../../utils/copy-props';
import { htmlOrText } from '../../utils/html';
import cardMixin from '../../mixins/card';
export var props = _objectSpread({}, copyProps(cardMixin.props, prefixPropName.bind(null, 'footer')), {
  footer: {
    type: String,
    default: null
  },
  footerHtml: {
    type: String,
    default: null
  },
  footerClass: {
    type: [String, Object, Array],
    default: null
  }
}); // @vue/component

export var BCardFooter =
/*#__PURE__*/
Vue.extend({
  name: 'BCardFooter',
  functional: true,
  props: props,
  render: function render(h, _ref) {
    var _ref2;

    var props = _ref.props,
        data = _ref.data,
        children = _ref.children;
    return h(props.footerTag, mergeData(data, {
      staticClass: 'card-footer',
      class: [props.footerClass, (_ref2 = {}, _defineProperty(_ref2, "bg-".concat(props.footerBgVariant), Boolean(props.footerBgVariant)), _defineProperty(_ref2, "border-".concat(props.footerBorderVariant), Boolean(props.footerBorderVariant)), _defineProperty(_ref2, "text-".concat(props.footerTextVariant), Boolean(props.footerTextVariant)), _ref2)]
    }), children || [h('div', {
      domProps: htmlOrText(props.footerHtml, props.footer)
    })]);
  }
});
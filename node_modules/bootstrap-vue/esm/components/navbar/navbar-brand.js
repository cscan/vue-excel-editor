function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import Vue from '../../utils/vue';
import { mergeData } from 'vue-functional-data-merge';
import pluckProps from '../../utils/pluck-props';
import { BLink, propsFactory } from '../link/link';
var linkProps = propsFactory();
linkProps.href.default = undefined;
linkProps.to.default = undefined;
export var props = _objectSpread({}, linkProps, {
  tag: {
    type: String,
    default: 'div'
  }
}); // @vue/component

export var BNavbarBrand =
/*#__PURE__*/
Vue.extend({
  name: 'BNavbarBrand',
  functional: true,
  props: props,
  render: function render(h, _ref) {
    var props = _ref.props,
        data = _ref.data,
        children = _ref.children;
    var isLink = Boolean(props.to || props.href);
    var tag = isLink ? BLink : props.tag;
    return h(tag, mergeData(data, {
      staticClass: 'navbar-brand',
      props: isLink ? pluckProps(linkProps, props) : {}
    }), children);
  }
});
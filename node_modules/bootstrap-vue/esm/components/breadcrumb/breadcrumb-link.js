function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import Vue from '../../utils/vue';
import { mergeData } from 'vue-functional-data-merge';
import pluckProps from '../../utils/pluck-props';
import { htmlOrText } from '../../utils/html';
import { BLink, propsFactory as linkPropsFactory } from '../link/link';
export var props = _objectSpread({}, linkPropsFactory(), {
  text: {
    type: String,
    default: null
  },
  html: {
    type: String,
    default: null
  },
  ariaCurrent: {
    type: String,
    default: 'location'
  }
}); // @vue/component

export var BBreadcrumbLink =
/*#__PURE__*/
Vue.extend({
  name: 'BBreadcrumbLink',
  functional: true,
  props: props,
  render: function render(h, _ref) {
    var suppliedProps = _ref.props,
        data = _ref.data,
        children = _ref.children;
    var tag = suppliedProps.active ? 'span' : BLink;
    var componentData = {
      props: pluckProps(props, suppliedProps)
    };

    if (suppliedProps.active) {
      componentData.attrs = {
        'aria-current': suppliedProps.ariaCurrent
      };
    }

    if (!children) {
      componentData.domProps = htmlOrText(suppliedProps.html, suppliedProps.text);
    }

    return h(tag, mergeData(data, componentData), children);
  }
});
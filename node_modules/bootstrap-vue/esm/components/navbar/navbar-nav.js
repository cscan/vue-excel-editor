function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import Vue from '../../utils/vue';
import { mergeData } from 'vue-functional-data-merge';
import pluckProps from '../../utils/pluck-props';
import { props as BNavProps } from '../nav/nav'; // -- Constants --

export var props = pluckProps(['tag', 'fill', 'justified', 'align', 'small'], BNavProps); // -- Utils --

var computeJustifyContent = function computeJustifyContent(value) {
  // Normalize value
  value = value === 'left' ? 'start' : value === 'right' ? 'end' : value;
  return "justify-content-".concat(value);
}; // @vue/component


export var BNavbarNav =
/*#__PURE__*/
Vue.extend({
  name: 'BNavbarNav',
  functional: true,
  props: props,
  render: function render(h, _ref) {
    var _class;

    var props = _ref.props,
        data = _ref.data,
        children = _ref.children;
    return h(props.tag, mergeData(data, {
      staticClass: 'navbar-nav',
      class: (_class = {
        'nav-fill': props.fill,
        'nav-justified': props.justified
      }, _defineProperty(_class, computeJustifyContent(props.align), props.align), _defineProperty(_class, "small", props.small), _class)
    }), children);
  }
});
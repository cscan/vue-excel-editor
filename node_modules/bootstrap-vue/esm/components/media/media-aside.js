function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import Vue from '../../utils/vue';
import { mergeData } from 'vue-functional-data-merge';
export var props = {
  tag: {
    type: String,
    default: 'div'
  },
  verticalAlign: {
    type: String,
    default: 'top'
  }
}; // @vue/component

export var BMediaAside =
/*#__PURE__*/
Vue.extend({
  name: 'BMediaAside',
  functional: true,
  props: props,
  render: function render(h, _ref) {
    var props = _ref.props,
        data = _ref.data,
        children = _ref.children;
    var align = props.verticalAlign === 'top' ? 'start' : props.verticalAlign === 'bottom' ? 'end' : props.verticalAlign;
    return h(props.tag, mergeData(data, {
      staticClass: 'd-flex',
      class: _defineProperty({}, "align-self-".concat(align), align)
    }), children);
  }
});
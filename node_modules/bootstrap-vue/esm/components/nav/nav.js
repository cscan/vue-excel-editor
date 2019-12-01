function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import Vue from '../../utils/vue';
import { mergeData } from 'vue-functional-data-merge'; // -- Constants --

export var props = {
  tag: {
    type: String,
    default: 'ul'
  },
  fill: {
    type: Boolean,
    default: false
  },
  justified: {
    type: Boolean,
    default: false
  },
  align: {
    type: String,
    default: null
  },
  tabs: {
    type: Boolean,
    default: false
  },
  pills: {
    type: Boolean,
    default: false
  },
  vertical: {
    type: Boolean,
    default: false
  },
  small: {
    type: Boolean,
    default: false
  },
  cardHeader: {
    // Set to true if placing in a card header
    type: Boolean,
    default: false
  }
}; // -- Utils --

var computeJustifyContent = function computeJustifyContent(value) {
  // Normalize value
  value = value === 'left' ? 'start' : value === 'right' ? 'end' : value;
  return "justify-content-".concat(value);
}; // @vue/component


export var BNav =
/*#__PURE__*/
Vue.extend({
  name: 'BNav',
  functional: true,
  props: props,
  render: function render(h, _ref) {
    var _class;

    var props = _ref.props,
        data = _ref.data,
        children = _ref.children;
    return h(props.tag, mergeData(data, {
      staticClass: 'nav',
      class: (_class = {
        'nav-tabs': props.tabs,
        'nav-pills': props.pills && !props.tabs,
        'card-header-tabs': !props.vertical && props.cardHeader && props.tabs,
        'card-header-pills': !props.vertical && props.cardHeader && props.pills && !props.tabs,
        'flex-column': props.vertical,
        'nav-fill': !props.vertical && props.fill,
        'nav-justified': !props.vertical && props.justified
      }, _defineProperty(_class, computeJustifyContent(props.align), !props.vertical && props.align), _defineProperty(_class, "small", props.small), _class)
    }), children);
  }
});
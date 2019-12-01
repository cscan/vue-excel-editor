import Vue from '../../utils/vue';
import { mergeData } from 'vue-functional-data-merge';
export var props = {}; // @vue/component

export var BNavText =
/*#__PURE__*/
Vue.extend({
  name: 'BNavText',
  functional: true,
  props: props,
  render: function render(h, _ref) {
    var props = _ref.props,
        data = _ref.data,
        children = _ref.children;
    return h('li', mergeData(data, {
      staticClass: 'navbar-text'
    }), children);
  }
});
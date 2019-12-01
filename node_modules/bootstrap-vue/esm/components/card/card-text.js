import Vue from '../../utils/vue';
import { mergeData } from 'vue-functional-data-merge';
export var props = {
  textTag: {
    type: String,
    default: 'p'
  }
}; // @vue/component

export var BCardText =
/*#__PURE__*/
Vue.extend({
  name: 'BCardText',
  functional: true,
  props: props,
  render: function render(h, _ref) {
    var props = _ref.props,
        data = _ref.data,
        children = _ref.children;
    return h(props.textTag, mergeData(data, {
      staticClass: 'card-text'
    }), children);
  }
});
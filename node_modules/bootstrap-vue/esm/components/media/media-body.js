import Vue from '../../utils/vue';
import { mergeData } from 'vue-functional-data-merge';
export var props = {
  tag: {
    type: String,
    default: 'div'
  }
}; // @vue/component

export var BMediaBody =
/*#__PURE__*/
Vue.extend({
  name: 'BMediaBody',
  functional: true,
  props: props,
  render: function render(h, _ref) {
    var props = _ref.props,
        data = _ref.data,
        children = _ref.children;
    return h(props.tag, mergeData(data, {
      staticClass: 'media-body'
    }), children);
  }
});
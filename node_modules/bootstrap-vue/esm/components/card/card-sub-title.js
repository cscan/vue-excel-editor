import Vue from '../../utils/vue';
import { mergeData } from 'vue-functional-data-merge';
import { getComponentConfig } from '../../utils/config';
var NAME = 'BCardSubTitle';
export var props = {
  subTitle: {
    type: String,
    default: ''
  },
  subTitleTag: {
    type: String,
    default: 'h6'
  },
  subTitleTextVariant: {
    type: String,
    default: function _default() {
      return getComponentConfig(NAME, 'subTitleTextVariant');
    }
  }
}; // @vue/component

export var BCardSubTitle =
/*#__PURE__*/
Vue.extend({
  name: NAME,
  functional: true,
  props: props,
  render: function render(h, _ref) {
    var props = _ref.props,
        data = _ref.data,
        children = _ref.children;
    return h(props.subTitleTag, mergeData(data, {
      staticClass: 'card-subtitle',
      class: [props.subTitleTextVariant ? "text-".concat(props.subTitleTextVariant) : null]
    }), children || props.subTitle);
  }
});
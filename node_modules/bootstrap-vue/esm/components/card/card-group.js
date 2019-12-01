import Vue from '../../utils/vue';
import { mergeData } from 'vue-functional-data-merge';
export var props = {
  tag: {
    type: String,
    default: 'div'
  },
  deck: {
    type: Boolean,
    default: false
  },
  columns: {
    type: Boolean,
    default: false
  }
}; // @vue/component

export var BCardGroup =
/*#__PURE__*/
Vue.extend({
  name: 'BCardGroup',
  functional: true,
  props: props,
  render: function render(h, _ref) {
    var props = _ref.props,
        data = _ref.data,
        children = _ref.children;
    var baseClass = 'card-group';

    if (props.deck) {
      baseClass = 'card-deck';
    } else if (props.columns) {
      baseClass = 'card-columns';
    }

    return h(props.tag, mergeData(data, {
      class: baseClass
    }), children);
  }
});
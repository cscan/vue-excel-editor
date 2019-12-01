import Vue from '../../utils/vue';
import { mergeData } from 'vue-functional-data-merge';
export var props = {
  id: {
    type: String,
    default: null
  },
  tag: {
    type: String,
    default: 'div'
  },
  tooltip: {
    type: Boolean,
    default: false
  },
  forceShow: {
    type: Boolean,
    default: false
  },
  state: {
    type: Boolean,
    default: null
  },
  ariaLive: {
    type: String,
    default: null
  },
  role: {
    type: String,
    default: null
  }
}; // @vue/component

export var BFormInvalidFeedback =
/*#__PURE__*/
Vue.extend({
  name: 'BFormInvalidFeedback',
  functional: true,
  props: props,
  render: function render(h, _ref) {
    var props = _ref.props,
        data = _ref.data,
        children = _ref.children;
    var show = props.forceShow === true || props.state === false;
    return h(props.tag, mergeData(data, {
      class: {
        'invalid-feedback': !props.tooltip,
        'invalid-tooltip': props.tooltip,
        'd-block': show
      },
      attrs: {
        id: props.id,
        role: props.role,
        'aria-live': props.ariaLive,
        'aria-atomic': props.ariaLive ? 'true' : null
      }
    }), children);
  }
});
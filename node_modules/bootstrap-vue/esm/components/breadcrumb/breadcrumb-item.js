import Vue from '../../utils/vue';
import { mergeData } from 'vue-functional-data-merge';
import { BBreadcrumbLink, props } from './breadcrumb-link'; // @vue/component

export var BBreadcrumbItem =
/*#__PURE__*/
Vue.extend({
  name: 'BBreadcrumbItem',
  functional: true,
  props: props,
  render: function render(h, _ref) {
    var props = _ref.props,
        data = _ref.data,
        children = _ref.children;
    return h('li', mergeData(data, {
      staticClass: 'breadcrumb-item',
      class: {
        active: props.active
      }
    }), [h(BBreadcrumbLink, {
      props: props
    }, children)]);
  }
});
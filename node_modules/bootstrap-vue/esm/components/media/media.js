import Vue from '../../utils/vue';
import { mergeData } from 'vue-functional-data-merge';
import { normalizeSlot } from '../../utils/normalize-slot';
import { BMediaBody } from './media-body';
import { BMediaAside } from './media-aside';
export var props = {
  tag: {
    type: String,
    default: 'div'
  },
  rightAlign: {
    type: Boolean,
    default: false
  },
  verticalAlign: {
    type: String,
    default: 'top'
  },
  noBody: {
    type: Boolean,
    default: false
  }
}; // @vue/component

export var BMedia =
/*#__PURE__*/
Vue.extend({
  name: 'BMedia',
  functional: true,
  props: props,
  render: function render(h, _ref) {
    var props = _ref.props,
        data = _ref.data,
        slots = _ref.slots,
        scopedSlots = _ref.scopedSlots,
        children = _ref.children;
    var childNodes = props.noBody ? children : [];

    if (!props.noBody) {
      var $slots = slots();
      var $scopedSlots = scopedSlots || {};
      var $aside = normalizeSlot('aside', {}, $scopedSlots, $slots);
      var $default = normalizeSlot('default', {}, $scopedSlots, $slots);

      if ($aside && !props.rightAlign) {
        childNodes.push(h(BMediaAside, {
          staticClass: 'mr-3',
          props: {
            verticalAlign: props.verticalAlign
          }
        }, $aside));
      }

      childNodes.push(h(BMediaBody, {}, $default));

      if ($aside && props.rightAlign) {
        childNodes.push(h(BMediaAside, {
          staticClass: 'ml-3',
          props: {
            verticalAlign: props.verticalAlign
          }
        }, $aside));
      }
    }

    return h(props.tag, mergeData(data, {
      staticClass: 'media'
    }), childNodes);
  }
});
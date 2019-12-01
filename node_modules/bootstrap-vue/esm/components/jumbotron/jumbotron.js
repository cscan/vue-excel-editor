function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import Vue from '../../utils/vue';
import { mergeData } from 'vue-functional-data-merge';
import { getComponentConfig } from '../../utils/config';
import { stripTags } from '../../utils/html';
import { hasNormalizedSlot, normalizeSlot } from '../../utils/normalize-slot';
import { BContainer } from '../layout/container';
var NAME = 'BJumbotron';
export var props = {
  fluid: {
    type: Boolean,
    default: false
  },
  containerFluid: {
    type: Boolean,
    default: false
  },
  header: {
    type: String,
    default: null
  },
  headerHtml: {
    type: String,
    default: null
  },
  headerTag: {
    type: String,
    default: 'h1'
  },
  headerLevel: {
    type: [Number, String],
    default: '3'
  },
  lead: {
    type: String,
    default: null
  },
  leadHtml: {
    type: String,
    default: null
  },
  leadTag: {
    type: String,
    default: 'p'
  },
  tag: {
    type: String,
    default: 'div'
  },
  bgVariant: {
    type: String,
    default: function _default() {
      return getComponentConfig(NAME, 'bgVariant');
    }
  },
  borderVariant: {
    type: String,
    default: function _default() {
      return getComponentConfig(NAME, 'borderVariant');
    }
  },
  textVariant: {
    type: String,
    default: function _default() {
      return getComponentConfig(NAME, 'textVariant');
    }
  }
}; // @vue/component

export var BJumbotron =
/*#__PURE__*/
Vue.extend({
  name: NAME,
  functional: true,
  props: props,
  render: function render(h, _ref) {
    var _class2;

    var props = _ref.props,
        data = _ref.data,
        slots = _ref.slots,
        scopedSlots = _ref.scopedSlots;
    // The order of the conditionals matter.
    // We are building the component markup in order.
    var childNodes = [];
    var $slots = slots();
    var $scopedSlots = scopedSlots || {}; // Header

    if (props.header || hasNormalizedSlot('header', $scopedSlots, $slots) || props.headerHtml) {
      childNodes.push(h(props.headerTag, {
        class: _defineProperty({}, "display-".concat(props.headerLevel), Boolean(props.headerLevel))
      }, normalizeSlot('header', {}, $scopedSlots, $slots) || props.headerHtml || stripTags(props.header)));
    } // Lead


    if (props.lead || hasNormalizedSlot('lead', $scopedSlots, $slots) || props.leadHtml) {
      childNodes.push(h(props.leadTag, {
        staticClass: 'lead'
      }, normalizeSlot('lead', {}, $scopedSlots, $slots) || props.leadHtml || stripTags(props.lead)));
    } // Default slot


    if (hasNormalizedSlot('default', $scopedSlots, $slots)) {
      childNodes.push(normalizeSlot('default', {}, $scopedSlots, $slots));
    } // If fluid, wrap content in a container/container-fluid


    if (props.fluid) {
      // Children become a child of a container
      childNodes = [h(BContainer, {
        props: {
          fluid: props.containerFluid
        }
      }, childNodes)];
    } // Return the jumbotron


    return h(props.tag, mergeData(data, {
      staticClass: 'jumbotron',
      class: (_class2 = {
        'jumbotron-fluid': props.fluid
      }, _defineProperty(_class2, "text-".concat(props.textVariant), Boolean(props.textVariant)), _defineProperty(_class2, "bg-".concat(props.bgVariant), Boolean(props.bgVariant)), _defineProperty(_class2, "border-".concat(props.borderVariant), Boolean(props.borderVariant)), _defineProperty(_class2, "border", Boolean(props.borderVariant)), _class2)
    }), childNodes);
  }
});
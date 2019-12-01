function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

import Vue from '../../utils/vue';
import { mergeData } from 'vue-functional-data-merge';
import { getComponentConfig } from '../../utils/config';
import { htmlOrText } from '../../utils/html';
import { hasNormalizedSlot, normalizeSlot } from '../../utils/normalize-slot';
import { BInputGroupPrepend } from './input-group-prepend';
import { BInputGroupAppend } from './input-group-append';
import { BInputGroupText } from './input-group-text';
var NAME = 'BInputGroup';
export var props = {
  id: {
    type: String
  },
  size: {
    type: String,
    default: function _default() {
      return getComponentConfig(NAME, 'size');
    }
  },
  prepend: {
    type: String
  },
  prependHtml: {
    type: String
  },
  append: {
    type: String
  },
  appendHtml: {
    type: String
  },
  tag: {
    type: String,
    default: 'div'
  }
}; // @vue/component

export var BInputGroup =
/*#__PURE__*/
Vue.extend({
  name: NAME,
  functional: true,
  props: props,
  render: function render(h, _ref) {
    var props = _ref.props,
        data = _ref.data,
        slots = _ref.slots,
        scopedSlots = _ref.scopedSlots;
    var $slots = slots();
    var $scopedSlots = scopedSlots || {};
    var childNodes = []; // Prepend prop/slot

    if (props.prepend || props.prependHtml || hasNormalizedSlot('prepend', $scopedSlots, $slots)) {
      childNodes.push(h(BInputGroupPrepend, [// Prop
      props.prepend || props.prependHtml ? h(BInputGroupText, {
        domProps: htmlOrText(props.prependHtml, props.prepend)
      }) : h(), // Slot
      normalizeSlot('prepend', {}, $scopedSlots, $slots) || h()]));
    } else {
      childNodes.push(h());
    } // Default slot


    if (hasNormalizedSlot('default', $scopedSlots, $slots)) {
      childNodes.push.apply(childNodes, _toConsumableArray(normalizeSlot('default', {}, $scopedSlots, $slots)));
    } else {
      childNodes.push(h());
    } // Append prop


    if (props.append || props.appendHtml || hasNormalizedSlot('append', $scopedSlots, $slots)) {
      childNodes.push(h(BInputGroupAppend, [// prop
      props.append || props.appendHtml ? h(BInputGroupText, {
        domProps: htmlOrText(props.appendHtml, props.append)
      }) : h(), // Slot
      normalizeSlot('append', {}, $scopedSlots, $slots) || h()]));
    } else {
      childNodes.push(h());
    }

    return h(props.tag, mergeData(data, {
      staticClass: 'input-group',
      class: _defineProperty({}, "input-group-".concat(props.size), Boolean(props.size)),
      attrs: {
        id: props.id || null,
        role: 'group'
      }
    }), childNodes);
  }
});
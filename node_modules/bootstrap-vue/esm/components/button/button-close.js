function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import Vue from '../../utils/vue';
import { mergeData } from 'vue-functional-data-merge';
import { getComponentConfig } from '../../utils/config';
import { isEvent } from '../../utils/inspect';
import { hasNormalizedSlot, normalizeSlot } from '../../utils/normalize-slot';
var NAME = 'BButtonClose';
var props = {
  disabled: {
    type: Boolean,
    default: false
  },
  ariaLabel: {
    type: String,
    default: function _default() {
      return getComponentConfig(NAME, 'ariaLabel');
    }
  },
  textVariant: {
    type: String,
    default: function _default() {
      return getComponentConfig(NAME, 'textVariant');
    }
  }
}; // @vue/component

export var BButtonClose =
/*#__PURE__*/
Vue.extend({
  name: NAME,
  functional: true,
  props: props,
  render: function render(h, _ref) {
    var props = _ref.props,
        data = _ref.data,
        listeners = _ref.listeners,
        slots = _ref.slots,
        scopedSlots = _ref.scopedSlots;
    var $slots = slots();
    var $scopedSlots = scopedSlots || {};
    var componentData = {
      staticClass: 'close',
      class: _defineProperty({}, "text-".concat(props.textVariant), props.textVariant),
      attrs: {
        type: 'button',
        disabled: props.disabled,
        'aria-label': props.ariaLabel ? String(props.ariaLabel) : null
      },
      on: {
        click: function click(evt) {
          // Ensure click on button HTML content is also disabled

          /* istanbul ignore if: bug in JSDOM still emits click on inner element */
          if (props.disabled && isEvent(evt)) {
            evt.stopPropagation();
            evt.preventDefault();
          }
        }
      }
    }; // Careful not to override the default slot with innerHTML

    if (!hasNormalizedSlot('default', $scopedSlots, $slots)) {
      componentData.domProps = {
        innerHTML: '&times;'
      };
    }

    return h('button', mergeData(data, componentData), normalizeSlot('default', {}, $scopedSlots, $slots));
  }
});
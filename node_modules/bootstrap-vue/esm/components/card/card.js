function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import Vue from '../../utils/vue';
import { mergeData } from 'vue-functional-data-merge';
import prefixPropName from '../../utils/prefix-prop-name';
import unPrefixPropName from '../../utils/unprefix-prop-name';
import copyProps from '../../utils/copy-props';
import pluckProps from '../../utils/pluck-props';
import { hasNormalizedSlot, normalizeSlot } from '../../utils/normalize-slot';
import cardMixin from '../../mixins/card';
import { BCardBody, props as bodyProps } from './card-body';
import { BCardHeader, props as headerProps } from './card-header';
import { BCardFooter, props as footerProps } from './card-footer';
import { BCardImg, props as imgProps } from './card-img';
var cardImgProps = copyProps(imgProps, prefixPropName.bind(null, 'img'));
cardImgProps.imgSrc.required = false;
export var props = _objectSpread({}, bodyProps, {}, headerProps, {}, footerProps, {}, cardImgProps, {}, copyProps(cardMixin.props), {
  align: {
    type: String,
    default: null
  },
  noBody: {
    type: Boolean,
    default: false
  }
}); // @vue/component

export var BCard =
/*#__PURE__*/
Vue.extend({
  name: 'BCard',
  functional: true,
  props: props,
  render: function render(h, _ref) {
    var _class;

    var props = _ref.props,
        data = _ref.data,
        slots = _ref.slots,
        scopedSlots = _ref.scopedSlots;
    var $slots = slots(); // Vue < 2.6.x may return undefined for scopedSlots

    var $scopedSlots = scopedSlots || {}; // Create placeholder elements for each section

    var imgFirst = h();
    var header = h();
    var content = h();
    var footer = h();
    var imgLast = h();

    if (props.imgSrc) {
      var img = h(BCardImg, {
        props: pluckProps(cardImgProps, props, unPrefixPropName.bind(null, 'img'))
      });

      if (props.imgBottom) {
        imgLast = img;
      } else {
        imgFirst = img;
      }
    }

    if (props.header || hasNormalizedSlot('header', $scopedSlots, $slots)) {
      header = h(BCardHeader, {
        props: pluckProps(headerProps, props)
      }, normalizeSlot('header', {}, $scopedSlots, $slots));
    }

    content = normalizeSlot('default', {}, $scopedSlots, $slots) || [];

    if (!props.noBody) {
      // Wrap content in card-body
      content = [h(BCardBody, {
        props: pluckProps(bodyProps, props)
      }, _toConsumableArray(content))];
    }

    if (props.footer || hasNormalizedSlot('footer', $scopedSlots, $slots)) {
      footer = h(BCardFooter, {
        props: pluckProps(footerProps, props)
      }, normalizeSlot('footer', {}, $scopedSlots, $slots));
    }

    return h(props.tag, mergeData(data, {
      staticClass: 'card',
      class: (_class = {
        'flex-row': props.imgLeft || props.imgStart,
        'flex-row-reverse': (props.imgRight || props.imgEnd) && !(props.imgLeft || props.imgStart)
      }, _defineProperty(_class, "text-".concat(props.align), Boolean(props.align)), _defineProperty(_class, "bg-".concat(props.bgVariant), Boolean(props.bgVariant)), _defineProperty(_class, "border-".concat(props.borderVariant), Boolean(props.borderVariant)), _defineProperty(_class, "text-".concat(props.textVariant), Boolean(props.textVariant)), _class)
    }), [imgFirst, header].concat(_toConsumableArray(content), [footer, imgLast]));
  }
});
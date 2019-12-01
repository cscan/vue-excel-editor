function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import Vue from '../../utils/vue';
import { mergeData } from 'vue-functional-data-merge';
import { concat } from '../../utils/array';
import { getComponentConfig } from '../../utils/config';
import { isString } from '../../utils/inspect'; // --- Constants --

var NAME = 'BImg'; // Blank image with fill template

var BLANK_TEMPLATE = '<svg width="%{w}" height="%{h}" ' + 'xmlns="http://www.w3.org/2000/svg" ' + 'viewBox="0 0 %{w} %{h}" preserveAspectRatio="none">' + '<rect width="100%" height="100%" style="fill:%{f};"></rect>' + '</svg>';
export var props = {
  src: {
    type: String,
    default: null
  },
  srcset: {
    type: [String, Array],
    default: null
  },
  sizes: {
    type: [String, Array],
    default: null
  },
  alt: {
    type: String,
    default: null
  },
  width: {
    type: [Number, String],
    default: null
  },
  height: {
    type: [Number, String],
    default: null
  },
  block: {
    type: Boolean,
    default: false
  },
  fluid: {
    type: Boolean,
    default: false
  },
  fluidGrow: {
    // Gives fluid images class `w-100` to make them grow to fit container
    type: Boolean,
    default: false
  },
  rounded: {
    // rounded can be:
    //   false: no rounding of corners
    //   true: slightly rounded corners
    //   'top': top corners rounded
    //   'right': right corners rounded
    //   'bottom': bottom corners rounded
    //   'left': left corners rounded
    //   'circle': circle/oval
    //   '0': force rounding off
    type: [Boolean, String],
    default: false
  },
  thumbnail: {
    type: Boolean,
    default: false
  },
  left: {
    type: Boolean,
    default: false
  },
  right: {
    type: Boolean,
    default: false
  },
  center: {
    type: Boolean,
    default: false
  },
  blank: {
    type: Boolean,
    default: false
  },
  blankColor: {
    type: String,
    default: function _default() {
      return getComponentConfig(NAME, 'blankColor');
    }
  }
}; // --- Helper methods ---

var makeBlankImgSrc = function makeBlankImgSrc(width, height, color) {
  var src = encodeURIComponent(BLANK_TEMPLATE.replace('%{w}', String(width)).replace('%{h}', String(height)).replace('%{f}', color));
  return "data:image/svg+xml;charset=UTF-8,".concat(src);
}; // @vue/component


export var BImg =
/*#__PURE__*/
Vue.extend({
  name: NAME,
  functional: true,
  props: props,
  render: function render(h, _ref) {
    var _class;

    var props = _ref.props,
        data = _ref.data;
    var src = props.src;
    var width = parseInt(props.width, 10) ? parseInt(props.width, 10) : null;
    var height = parseInt(props.height, 10) ? parseInt(props.height, 10) : null;
    var align = null;
    var block = props.block;
    var srcset = concat(props.srcset).filter(Boolean).join(',');
    var sizes = concat(props.sizes).filter(Boolean).join(',');

    if (props.blank) {
      if (!height && Boolean(width)) {
        height = width;
      } else if (!width && Boolean(height)) {
        width = height;
      }

      if (!width && !height) {
        width = 1;
        height = 1;
      } // Make a blank SVG image


      src = makeBlankImgSrc(width, height, props.blankColor || 'transparent'); // Disable srcset and sizes

      srcset = null;
      sizes = null;
    }

    if (props.left) {
      align = 'float-left';
    } else if (props.right) {
      align = 'float-right';
    } else if (props.center) {
      align = 'mx-auto';
      block = true;
    }

    return h('img', mergeData(data, {
      attrs: {
        src: src,
        alt: props.alt,
        width: width ? String(width) : null,
        height: height ? String(height) : null,
        srcset: srcset || null,
        sizes: sizes || null
      },
      class: (_class = {
        'img-thumbnail': props.thumbnail,
        'img-fluid': props.fluid || props.fluidGrow,
        'w-100': props.fluidGrow,
        rounded: props.rounded === '' || props.rounded === true
      }, _defineProperty(_class, "rounded-".concat(props.rounded), isString(props.rounded) && props.rounded !== ''), _defineProperty(_class, align, Boolean(align)), _defineProperty(_class, 'd-block', block), _class)
    }));
  }
});
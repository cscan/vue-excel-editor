function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import Vue from '../../utils/vue';
import { concat } from '../../utils/array';
import { getComponentConfig } from '../../utils/config';
import { hasIntersectionObserverSupport } from '../../utils/env';
import { VBVisible } from '../../directives/visible/visible';
import { BImg } from './img';
var NAME = 'BImgLazy';
export var props = {
  src: {
    type: String,
    default: null,
    required: true
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
  blankSrc: {
    // If null, a blank image is generated
    type: String,
    default: null
  },
  blankColor: {
    type: String,
    default: function _default() {
      return getComponentConfig(NAME, 'blankColor');
    }
  },
  blankWidth: {
    type: [Number, String],
    default: null
  },
  blankHeight: {
    type: [Number, String],
    default: null
  },
  show: {
    type: Boolean,
    default: false
  },
  fluid: {
    type: Boolean,
    default: false
  },
  fluidGrow: {
    type: Boolean,
    default: false
  },
  block: {
    type: Boolean,
    default: false
  },
  thumbnail: {
    type: Boolean,
    default: false
  },
  rounded: {
    type: [Boolean, String],
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
  offset: {
    // Distance away from viewport (in pixels) before being
    // considered "visible"
    type: [Number, String],
    default: 360
  }
}; // @vue/component

export var BImgLazy =
/*#__PURE__*/
Vue.extend({
  name: NAME,
  directives: {
    bVisible: VBVisible
  },
  props: props,
  data: function data() {
    return {
      isShown: this.show
    };
  },
  computed: {
    computedSrc: function computedSrc() {
      return !this.blankSrc || this.isShown ? this.src : this.blankSrc;
    },
    computedBlank: function computedBlank() {
      return !(this.isShown || this.blankSrc);
    },
    computedWidth: function computedWidth() {
      return this.isShown ? this.width : this.blankWidth || this.width;
    },
    computedHeight: function computedHeight() {
      return this.isShown ? this.height : this.blankHeight || this.height;
    },
    computedSrcset: function computedSrcset() {
      var srcset = concat(this.srcset).filter(Boolean).join(',');
      return !this.blankSrc || this.isShown ? srcset : null;
    },
    computedSizes: function computedSizes() {
      var sizes = concat(this.sizes).filter(Boolean).join(',');
      return !this.blankSrc || this.isShown ? sizes : null;
    }
  },
  watch: {
    show: function show(newVal, oldVal) {
      if (newVal !== oldVal) {
        // If IntersectionObserver support is not available, image is always shown
        var visible = hasIntersectionObserverSupport ? newVal : true;
        this.isShown = visible;

        if (visible !== newVal) {
          // Ensure the show prop is synced (when no IntersectionObserver)
          this.$nextTick(this.updateShowProp);
        }
      }
    },
    isShown: function isShown(newVal, oldVal) {
      if (newVal !== oldVal) {
        // Update synched show prop
        this.updateShowProp();
      }
    }
  },
  mounted: function mounted() {
    // If IntersectionObserver is not available, image is always shown
    this.isShown = hasIntersectionObserverSupport ? this.show : true;
  },
  methods: {
    updateShowProp: function updateShowProp() {
      this.$emit('update:show', this.isShown);
    },
    doShow: function doShow(visible) {
      // If IntersectionObserver is not supported, the callback
      // will be called with `null` rather than `true` or `false`
      if ((visible || visible === null) && !this.isShown) {
        this.isShown = true;
      }
    }
  },
  render: function render(h) {
    var directives = [];

    if (!this.isShown) {
      var _modifiers;

      // We only add the visible directive if we are not shown
      directives.push({
        // Visible directive will silently do nothing if
        // IntersectionObserver is not supported
        name: 'b-visible',
        // Value expects a callback (passed one arg of `visible` = `true` or `false`)
        value: this.doShow,
        modifiers: (_modifiers = {}, _defineProperty(_modifiers, "".concat(parseInt(this.offset, 10) || 0), true), _defineProperty(_modifiers, "once", true), _modifiers)
      });
    }

    return h(BImg, {
      directives: directives,
      props: {
        // Computed value props
        src: this.computedSrc,
        blank: this.computedBlank,
        width: this.computedWidth,
        height: this.computedHeight,
        srcset: this.computedSrcset || null,
        sizes: this.computedSizes || null,
        // Passthrough props
        alt: this.alt,
        blankColor: this.blankColor,
        fluid: this.fluid,
        fluidGrow: this.fluidGrow,
        block: this.block,
        thumbnail: this.thumbnail,
        rounded: this.rounded,
        left: this.left,
        right: this.right,
        center: this.center
      }
    });
  }
});
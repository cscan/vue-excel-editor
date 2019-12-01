function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import Vue from '../../utils/vue';
import normalizeSlotMixin from '../../mixins/normalize-slot';
export var props = {
  variant: {
    type: String,
    default: null
  }
};
var LIGHT = 'light';
var DARK = 'dark'; // @vue/component

export var BTr =
/*#__PURE__*/
Vue.extend({
  name: 'BTr',
  mixins: [normalizeSlotMixin],
  inheritAttrs: false,
  provide: function provide() {
    return {
      bvTableTr: this
    };
  },
  inject: {
    bvTableRowGroup: {
      defaut: function defaut()
      /* istanbul ignore next */
      {
        return {};
      }
    }
  },
  props: props,
  computed: {
    inTbody: function inTbody() {
      // Sniffed by <b-td> / <b-th>
      return this.bvTableRowGroup.isTbody;
    },
    inThead: function inThead() {
      // Sniffed by <b-td> / <b-th>
      return this.bvTableRowGroup.isThead;
    },
    inTfoot: function inTfoot() {
      // Sniffed by <b-td> / <b-th>
      return this.bvTableRowGroup.isTfoot;
    },
    isDark: function isDark() {
      // Sniffed by <b-td> / <b-th>
      return this.bvTableRowGroup.isDark;
    },
    isStacked: function isStacked() {
      // Sniffed by <b-td> / <b-th>
      return this.bvTableRowGroup.isStacked;
    },
    isResponsive: function isResponsive() {
      // Sniffed by <b-td> / <b-th>
      return this.bvTableRowGroup.isResponsive;
    },
    isStickyHeader: function isStickyHeader() {
      // Sniffed by <b-td> / <b-th>
      // Sticky headers are only supported in thead
      return this.bvTableRowGroup.isStickyHeader;
    },
    hasStickyHeader: function hasStickyHeader() {
      // Sniffed by <b-tr> / <b-td> / <b-th>
      // Needed to handle header background classes, due to lack of
      // background color inheritance with Bootstrap v4 table CSS
      return !this.isStacked && this.bvTableRowGroup.hasStickyHeader;
    },
    tableVariant: function tableVariant() {
      // Sniffed by <b-td> / <b-th>
      return this.bvTableRowGroup.tableVariant;
    },
    headVariant: function headVariant() {
      // Sniffed by <b-td> / <b-th>
      return this.inThead ? this.bvTableRowGroup.headVariant : null;
    },
    footVariant: function footVariant() {
      // Sniffed by <b-td> / <b-th>
      return this.inTfoot ? this.bvTableRowGroup.footVariant : null;
    },
    isRowDark: function isRowDark() {
      return this.headVariant === LIGHT || this.footVariant === LIGHT ? false : this.headVariant === DARK || this.footVariant === DARK ? true : this.isDark;
    },
    trClasses: function trClasses() {
      return [this.variant ? "".concat(this.isRowDark ? 'bg' : 'table', "-").concat(this.variant) : null];
    },
    trAttrs: function trAttrs() {
      return _objectSpread({
        role: 'row'
      }, this.$attrs);
    }
  },
  render: function render(h) {
    return h('tr', {
      class: this.trClasses,
      attrs: this.trAttrs,
      // Pass native listeners to child
      on: this.$listeners
    }, this.normalizeSlot('default', {}));
  }
});
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import Vue from '../../utils/vue';
import toString from '../../utils/to-string';
import { isUndefinedOrNull } from '../../utils/inspect';
import normalizeSlotMixin from '../../mixins/normalize-slot';
var digitsRx = /^\d+$/; // Parse a rowspan or colspan into a digit (or null if < 1 or NaN)

var parseSpan = function parseSpan(val) {
  val = parseInt(val, 10);
  return digitsRx.test(String(val)) && val > 0 ? val : null;
};
/* istanbul ignore next */


var spanValidator = function spanValidator(val) {
  return isUndefinedOrNull(val) || parseSpan(val) > 0;
};

export var props = {
  variant: {
    type: String,
    default: null
  },
  colspan: {
    type: [Number, String],
    default: null,
    validator: spanValidator
  },
  rowspan: {
    type: [Number, String],
    default: null,
    validator: spanValidator
  },
  stackedHeading: {
    type: String,
    default: null
  },
  stickyColumn: {
    type: Boolean,
    default: false
  }
}; // @vue/component

export var BTd =
/*#__PURE__*/
Vue.extend({
  name: 'BTableCell',
  mixins: [normalizeSlotMixin],
  inheritAttrs: false,
  inject: {
    bvTableTr: {
      default: function _default()
      /* istanbul ignore next */
      {
        return {};
      }
    }
  },
  props: props,
  computed: {
    tag: function tag() {
      // Overridden by <b-th>
      return 'td';
    },
    inTbody: function inTbody() {
      return this.bvTableTr.inTbody;
    },
    inThead: function inThead() {
      return this.bvTableTr.inThead;
    },
    inTfoot: function inTfoot() {
      return this.bvTableTr.inTfoot;
    },
    isDark: function isDark() {
      return this.bvTableTr.isDark;
    },
    isStacked: function isStacked() {
      return this.bvTableTr.isStacked;
    },
    isStackedCell: function isStackedCell() {
      // We only support stacked-heading in tbody in stacked mode
      return this.inTbody && this.isStacked;
    },
    isResponsive: function isResponsive() {
      return this.bvTableTr.isResponsive;
    },
    isStickyHeader: function isStickyHeader() {
      // Needed to handle header background classes, due to lack of
      // background color inheritance with Bootstrap v4 table CSS
      // Sticky headers only apply to cells in table `thead`
      return this.bvTableTr.isStickyHeader;
    },
    hasStickyHeader: function hasStickyHeader() {
      // Needed to handle header background classes, due to lack of
      // background color inheritance with Bootstrap v4 table CSS
      return this.bvTableTr.hasStickyHeader;
    },
    isStickyColumn: function isStickyColumn() {
      // Needed to handle background classes, due to lack of
      // background color inheritance with Bootstrap v4 table CSS
      // Sticky column cells are only available in responsive
      // mode (horizontal scrolling) or when sticky header mode
      // Applies to cells in `thead`, `tbody` and `tfoot`
      return !this.isStacked && (this.isResponsive || this.hasStickyHeader) && this.stickyColumn;
    },
    rowVariant: function rowVariant() {
      return this.bvTableTr.variant;
    },
    headVariant: function headVariant() {
      return this.bvTableTr.headVariant;
    },
    footVariant: function footVariant()
    /* istanbul ignore next: need to add in tests for footer variant */
    {
      return this.bvTableTr.footVariant;
    },
    tableVariant: function tableVariant() {
      return this.bvTableTr.tableVariant;
    },
    computedColspan: function computedColspan() {
      return parseSpan(this.colspan);
    },
    computedRowspan: function computedRowspan() {
      return parseSpan(this.rowspan);
    },
    cellClasses: function cellClasses() {
      // We use computed props here for improved performance by caching
      // the results of the string interpolation
      // TODO: need to add handling for footVariant
      var variant = this.variant;

      if (!variant && this.isStickyHeader && !this.headVariant || !variant && this.isStickyColumn) {
        // Needed for sticky-header mode as Bootstrap v4 table cells do
        // not inherit parent's background-color. Boo!
        variant = this.rowVariant || this.tableVariant || 'b-table-default';
      }

      return [variant ? "".concat(this.isDark ? 'bg' : 'table', "-").concat(variant) : null, this.isStickyColumn ? 'b-table-sticky-column' : null];
    },
    cellAttrs: function cellAttrs() {
      // We use computed props here for improved performance by caching
      // the results of the object spread (Object.assign)
      var headOrFoot = this.inThead || this.inTfoot; // Make sure col/rowspan's are > 0 or null

      var colspan = this.computedColspan;
      var rowspan = this.computedRowspan; // Default role and scope

      var role = 'cell';
      var scope = null; // Compute role and scope
      // We only add scopes with an explicit span of 1 or greater

      if (headOrFoot) {
        // Header or footer cells
        role = 'columnheader';
        scope = colspan > 0 ? 'colspan' : 'col';
      } else if (this.tag === 'th') {
        // th's in tbody
        role = 'rowheader';
        scope = rowspan > 0 ? 'rowgroup' : 'row';
      }

      return _objectSpread({
        colspan: colspan,
        rowspan: rowspan,
        role: role,
        scope: scope
      }, this.$attrs, {
        // Add in the stacked cell label data-attribute if in
        // stacked mode (if a stacked heading label is provided)
        'data-label': this.isStackedCell && !isUndefinedOrNull(this.stackedHeading) ? toString(this.stackedHeading) : null
      });
    }
  },
  render: function render(h) {
    var content = [this.normalizeSlot('default')];
    return h(this.tag, {
      class: this.cellClasses,
      attrs: this.cellAttrs,
      // Transfer any native listeners
      on: this.$listeners
    }, [this.isStackedCell ? h('div', [content]) : content]);
  }
});
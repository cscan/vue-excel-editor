function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { isBoolean } from '../../../utils/inspect'; // Main `<table>` render mixin
// Includes all main table styling options

export default {
  // Don't place attributes on root element automatically,
  // as table could be wrapped in responsive `<div>`
  inheritAttrs: false,
  provide: function provide() {
    return {
      bvTable: this
    };
  },
  props: {
    striped: {
      type: Boolean,
      default: false
    },
    bordered: {
      type: Boolean,
      default: false
    },
    borderless: {
      type: Boolean,
      default: false
    },
    outlined: {
      type: Boolean,
      default: false
    },
    dark: {
      type: Boolean,
      default: false
    },
    hover: {
      type: Boolean,
      default: false
    },
    small: {
      type: Boolean,
      default: false
    },
    fixed: {
      type: Boolean,
      default: false
    },
    responsive: {
      type: [Boolean, String],
      default: false
    },
    stickyHeader: {
      // If a string, it is assumed to be the table `max-height` value
      type: [Boolean, String],
      default: false
    },
    noBorderCollapse: {
      type: Boolean,
      default: false
    },
    captionTop: {
      type: Boolean,
      default: false
    },
    tableVariant: {
      type: String,
      default: null
    },
    tableClass: {
      type: [String, Array, Object],
      default: null
    }
  },
  computed: {
    // Layout related computed props
    isResponsive: function isResponsive() {
      var responsive = this.responsive === '' ? true : this.responsive;
      return this.isStacked ? false : responsive;
    },
    isStickyHeader: function isStickyHeader() {
      var stickyHeader = this.stickyHeader === '' ? true : this.stickyHeader;
      return this.isStacked ? false : stickyHeader;
    },
    wrapperClasses: function wrapperClasses() {
      return [this.isStickyHeader ? 'b-table-sticky-header' : '', this.isResponsive === true ? 'table-responsive' : this.isResponsive ? "table-responsive-".concat(this.responsive) : ''].filter(Boolean);
    },
    wrapperStyles: function wrapperStyles() {
      return this.isStickyHeader && !isBoolean(this.isStickyHeader) ? {
        maxHeight: this.isStickyHeader
      } : {};
    },
    tableClasses: function tableClasses() {
      var hover = this.isTableSimple ? this.hover : this.hover && this.computedItems.length > 0 && !this.computedBusy;
      return [// User supplied classes
      this.tableClass, // Styling classes
      {
        'table-striped': this.striped,
        'table-hover': hover,
        'table-dark': this.dark,
        'table-bordered': this.bordered,
        'table-borderless': this.borderless,
        'table-sm': this.small,
        // The following are b-table custom styles
        border: this.outlined,
        'b-table-fixed': this.fixed,
        'b-table-caption-top': this.captionTop,
        'b-table-no-border-collapse': this.noBorderCollapse
      }, this.tableVariant ? "".concat(this.dark ? 'bg' : 'table', "-").concat(this.tableVariant) : '', // Stacked table classes
      this.stackedTableClasses, // Selectable classes
      this.selectableTableClasses];
    },
    tableAttrs: function tableAttrs() {
      // Preserve user supplied aria-describedby, if provided in `$attrs`
      var adb = [(this.$attrs || {})['aria-describedby'], this.captionId].filter(Boolean).join(' ') || null;
      var items = this.computedItems;
      var filteredItems = this.filteredItems;
      var fields = this.computedFields;
      var selectableAttrs = this.selectableTableAttrs || {};
      var ariaAttrs = this.isTableSimple ? {} : {
        'aria-busy': this.computedBusy ? 'true' : 'false',
        'aria-colcount': String(fields.length),
        'aria-describedby': adb
      };
      var rowCount = items && filteredItems && filteredItems.length > items.length ? String(filteredItems.length) : null;
      return _objectSpread({
        // We set `aria-rowcount` before merging in `$attrs`,
        // in case user has supplied their own
        'aria-rowcount': rowCount
      }, this.$attrs, {
        // Now we can override any `$attrs` here
        id: this.safeId(),
        role: 'table'
      }, ariaAttrs, {}, selectableAttrs);
    }
  },
  render: function render(h) {
    var $content = [];

    if (this.isTableSimple) {
      $content.push(this.normalizeSlot('default', {}));
    } else {
      // Build the `<caption>` (from caption mixin)
      $content.push(this.renderCaption ? this.renderCaption() : null); // Build the `<colgroup>`

      $content.push(this.renderColgroup ? this.renderColgroup() : null); // Build the `<thead>`

      $content.push(this.renderThead ? this.renderThead() : null); // Build the `<tbody>`

      $content.push(this.renderTbody ? this.renderTbody() : null); // Build the `<tfoot>`

      $content.push(this.renderTfoot ? this.renderTfoot() : null);
    } // Assemble `<table>`


    var $table = h('table', {
      key: 'b-table',
      staticClass: 'table b-table',
      class: this.tableClasses,
      attrs: this.tableAttrs
    }, $content.filter(Boolean)); // Add responsive/sticky wrapper if needed and return table

    return this.wrapperClasses.length > 0 ? h('div', {
      key: 'wrap',
      class: this.wrapperClasses,
      style: this.wrapperStyles
    }, [$table]) : $table;
  }
};
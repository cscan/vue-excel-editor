function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import Vue from '../../utils/vue';
import normalizeSlotMixin from '../../mixins/normalize-slot';
export var props = {
  tbodyTransitionProps: {
    type: Object // default: undefined

  },
  tbodyTransitionHandlers: {
    type: Object // default: undefined

  }
}; // @vue/component

export var BTbody =
/*#__PURE__*/
Vue.extend({
  name: 'BTbody',
  mixins: [normalizeSlotMixin],
  inheritAttrs: false,
  provide: function provide() {
    return {
      bvTableRowGroup: this
    };
  },
  inject: {
    bvTable: {
      // Sniffed by <b-tr> / <b-td> / <b-th>
      default: function _default()
      /* istanbul ignore next */
      {
        return {};
      }
    }
  },
  props: props,
  computed: {
    isTbody: function isTbody() {
      // Sniffed by <b-tr> / <b-td> / <b-th>
      return true;
    },
    isDark: function isDark() {
      // Sniffed by <b-tr> / <b-td> / <b-th>
      return this.bvTable.dark;
    },
    isStacked: function isStacked() {
      // Sniffed by <b-tr> / <b-td> / <b-th>
      return this.bvTable.isStacked;
    },
    isResponsive: function isResponsive() {
      // Sniffed by <b-tr> / <b-td> / <b-th>
      return this.bvTable.isResponsive;
    },
    isStickyHeader: function isStickyHeader() {
      // Sniffed by <b-tr> / <b-td> / <b-th>
      // Sticky headers are only supported in thead
      return false;
    },
    hasStickyHeader: function hasStickyHeader() {
      // Sniffed by <b-tr> / <b-td> / <b-th>
      // Needed to handle header background classes, due to lack of
      // background color inheritance with Bootstrap v4 table CSS
      return !this.isStacked && this.bvTable.stickyHeader;
    },
    tableVariant: function tableVariant()
    /* istanbul ignore next: Not currently sniffed in tests */
    {
      // Sniffed by <b-tr> / <b-td> / <b-th>
      return this.bvTable.tableVariant;
    },
    isTransitionGroup: function isTransitionGroup() {
      return this.tbodyTransitionProps || this.tbodyTransitionHandlers;
    },
    tbodyAttrs: function tbodyAttrs() {
      return _objectSpread({
        role: 'rowgroup'
      }, this.$attrs);
    },
    tbodyProps: function tbodyProps() {
      return this.tbodyTransitionProps ? _objectSpread({}, this.tbodyTransitionProps, {
        tag: 'tbody'
      }) : {};
    }
  },
  render: function render(h) {
    var data = {
      props: this.tbodyProps,
      attrs: this.tbodyAttrs
    };

    if (this.isTransitionGroup) {
      // We use native listeners if a transition group
      // for any delegated events
      data.on = this.tbodyTransitionHandlers || {};
      data.nativeOn = this.$listeners || {};
    } else {
      // Otherwise we place any listeners on the tbody element
      data.on = this.$listeners || {};
    }

    return h(this.isTransitionGroup ? 'transition-group' : 'tbody', data, this.normalizeSlot('default', {}));
  }
});
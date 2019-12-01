function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Mixin for providing stacked tables
export default {
  props: {
    stacked: {
      type: [Boolean, String],
      default: false
    }
  },
  computed: {
    isStacked: function isStacked() {
      // `true` when always stacked, or returns breakpoint specified
      return this.stacked === '' ? true : this.stacked;
    },
    isStackedAlways: function isStackedAlways() {
      return this.isStacked === true;
    },
    stackedTableClasses: function stackedTableClasses() {
      return _defineProperty({
        'b-table-stacked': this.isStackedAlways
      }, "b-table-stacked-".concat(this.stacked), !this.isStackedAlways && this.isStacked);
    }
  }
};
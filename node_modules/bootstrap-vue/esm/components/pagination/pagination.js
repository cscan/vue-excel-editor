import Vue from '../../utils/vue';
import { getComponentConfig } from '../../utils/config';
import { isVisible } from '../../utils/dom';
import { isUndefinedOrNull } from '../../utils/inspect';
import paginationMixin from '../../mixins/pagination'; // --- Constants ---

var NAME = 'BPagination';
var DEFAULT_PER_PAGE = 20;
var DEFAULT_TOTAL_ROWS = 0;
var props = {
  size: {
    type: String,
    default: function _default() {
      return getComponentConfig(NAME, 'size');
    }
  },
  perPage: {
    type: [Number, String],
    default: DEFAULT_PER_PAGE
  },
  totalRows: {
    type: [Number, String],
    default: DEFAULT_TOTAL_ROWS
  },
  ariaControls: {
    type: String,
    default: null
  }
}; // --- Helper functions ---
// Sanitize the provided per page number (converting to a number)

var sanitizePerPage = function sanitizePerPage(val) {
  var perPage = parseInt(val, 10) || DEFAULT_PER_PAGE;
  return perPage < 1 ? 1 : perPage;
}; // Sanitize the provided total rows number (converting to a number)


var sanitizeTotalRows = function sanitizeTotalRows(val) {
  var totalRows = parseInt(val, 10) || DEFAULT_TOTAL_ROWS;
  return totalRows < 0 ? 0 : totalRows;
}; // The render function is brought in via the `paginationMixin`
// @vue/component


export var BPagination =
/*#__PURE__*/
Vue.extend({
  name: NAME,
  mixins: [paginationMixin],
  props: props,
  computed: {
    numberOfPages: function numberOfPages() {
      var result = Math.ceil(sanitizeTotalRows(this.totalRows) / sanitizePerPage(this.perPage));
      return result < 1 ? 1 : result;
    },
    pageSizeNumberOfPages: function pageSizeNumberOfPages() {
      // Used for watching changes to `perPage` and `numberOfPages`
      return {
        perPage: sanitizePerPage(this.perPage),
        totalRows: sanitizeTotalRows(this.totalRows),
        numberOfPages: this.numberOfPages
      };
    }
  },
  watch: {
    pageSizeNumberOfPages: function pageSizeNumberOfPages(newVal, oldVal) {
      if (!isUndefinedOrNull(oldVal)) {
        if (newVal.perPage !== oldVal.perPage && newVal.totalRows === oldVal.totalRows) {
          // If the page size changes, reset to page 1
          this.currentPage = 1;
        } else if (newVal.numberOfPages !== oldVal.numberOfPages && this.currentPage > newVal.numberOfPages) {
          // If `numberOfPages` changes and is less than
          // the `currentPage` number, reset to page 1
          this.currentPage = 1;
        }
      }

      this.localNumberOfPages = newVal.numberOfPages;
    }
  },
  created: function created() {
    var _this = this;

    // Set the initial page count
    this.localNumberOfPages = this.numberOfPages; // Set the initial page value

    var currentPage = parseInt(this.value, 10) || 0;

    if (currentPage > 0) {
      this.currentPage = currentPage;
    } else {
      this.$nextTick(function () {
        // If this value parses to NaN or a value less than 1
        // Trigger an initial emit of 'null' if no page specified
        _this.currentPage = 0;
      });
    }
  },
  mounted: function mounted() {
    // Set the initial page count
    this.localNumberOfPages = this.numberOfPages;
  },
  methods: {
    // These methods are used by the render function
    onClick: function onClick(num, evt) {
      var _this2 = this;

      // Handle edge cases where number of pages has changed (i.e. if perPage changes)
      // This should normally not happen, but just in case.
      if (num > this.numberOfPages) {
        /* istanbul ignore next */
        num = this.numberOfPages;
      } else if (num < 1) {
        /* istanbul ignore next */
        num = 1;
      } // Update the v-model


      this.currentPage = num; // Emit event triggered by user interaction

      this.$emit('change', this.currentPage);
      this.$nextTick(function () {
        // Keep the current button focused if possible
        var target = evt.target;

        if (isVisible(target) && _this2.$el.contains(target) && target.focus) {
          target.focus();
        } else {
          _this2.focusCurrent();
        }
      });
    },
    makePage: function makePage(pageNum) {
      return pageNum;
    },
    linkProps: function linkProps(pageNum) {
      // Always '#' for pagination component
      return {
        href: '#'
      };
    }
  }
});
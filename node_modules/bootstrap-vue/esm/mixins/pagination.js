import KeyCodes from '../utils/key-codes';
import range from '../utils/range';
import toString from '../utils/to-string';
import warn from '../utils/warn';
import { isFunction, isNull } from '../utils/inspect';
import { isVisible, isDisabled, selectAll, getAttr } from '../utils/dom';
import normalizeSlotMixin from '../mixins/normalize-slot';
import { BLink } from '../components/link/link'; // Common props, computed, data, render function, and methods
// for <b-pagination> and <b-pagination-nav>
// Threshold of limit size when we start/stop showing ellipsis

var ELLIPSIS_THRESHOLD = 3; // Default # of buttons limit

var DEFAULT_LIMIT = 5; // Make an array of N to N+X

var makePageArray = function makePageArray(startNumber, numberOfPages) {
  return range(numberOfPages).map(function (val, i) {
    return {
      number: startNumber + i,
      classes: null
    };
  });
}; // Sanitize the provided limit value (converting to a number)


var sanitizeLimit = function sanitizeLimit(val) {
  var limit = parseInt(val, 10) || 1;
  return limit < 1 ? DEFAULT_LIMIT : limit;
}; // Sanitize the provided current page number (converting to a number)


var sanitizeCurrentPage = function sanitizeCurrentPage(val, numberOfPages) {
  var page = parseInt(val, 10) || 1;
  return page > numberOfPages ? numberOfPages : page < 1 ? 1 : page;
}; // Links don't normally respond to SPACE, so we add that
// functionality via this handler


var onSpaceKey = function onSpaceKey(evt) {
  if (evt.keyCode === KeyCodes.SPACE) {
    evt.preventDefault(); // Stop page from scrolling

    evt.stopImmediatePropagation();
    evt.stopPropagation(); // Trigger the click event on the link

    evt.currentTarget.click();
    return false;
  }
};

export var props = {
  disabled: {
    type: Boolean,
    default: false
  },
  value: {
    type: [Number, String],
    default: null,
    validator: function validator(value)
    /* istanbul ignore next */
    {
      var num = parseInt(value, 10);

      if (!isNull(value) && (isNaN(num) || num < 1)) {
        warn('pagination: v-model value must be a number greater than 0');
        return false;
      }

      return true;
    }
  },
  limit: {
    type: [Number, String],
    default: DEFAULT_LIMIT,
    validator: function validator(value)
    /* istanbul ignore next */
    {
      var num = parseInt(value, 10);

      if (isNaN(num) || num < 1) {
        warn('pagination: prop "limit" must be a number greater than 0');
        return false;
      }

      return true;
    }
  },
  align: {
    type: String,
    default: 'left'
  },
  pills: {
    type: Boolean,
    default: false
  },
  hideGotoEndButtons: {
    type: Boolean,
    default: false
  },
  ariaLabel: {
    type: String,
    default: 'Pagination'
  },
  labelFirstPage: {
    type: String,
    default: 'Go to first page'
  },
  firstText: {
    type: String,
    default: "\xAB" // '«'

  },
  labelPrevPage: {
    type: String,
    default: 'Go to previous page'
  },
  prevText: {
    type: String,
    default: "\u2039" // '‹'

  },
  labelNextPage: {
    type: String,
    default: 'Go to next page'
  },
  nextText: {
    type: String,
    default: "\u203A" // '›'

  },
  labelLastPage: {
    type: String,
    default: 'Go to last page'
  },
  lastText: {
    type: String,
    default: "\xBB" // '»'

  },
  labelPage: {
    type: [String, Function],
    default: 'Go to page'
  },
  hideEllipsis: {
    type: Boolean,
    default: false
  },
  ellipsisText: {
    type: String,
    default: "\u2026" // '…'

  }
}; // @vue/component

export default {
  mixins: [normalizeSlotMixin],
  model: {
    prop: 'value',
    event: 'input'
  },
  props: props,
  data: function data() {
    var curr = parseInt(this.value, 10);
    return {
      // -1 signifies no page initially selected
      currentPage: curr > 0 ? curr : -1,
      localNumberOfPages: 1,
      localLimit: DEFAULT_LIMIT
    };
  },
  computed: {
    btnSize: function btnSize() {
      return this.size ? "pagination-".concat(this.size) : '';
    },
    alignment: function alignment() {
      var align = this.align;

      if (align === 'center') {
        return 'justify-content-center';
      } else if (align === 'end' || align === 'right') {
        return 'justify-content-end';
      } else if (align === 'fill') {
        // The page-items will also have 'flex-fill' added.
        // We ad text centering to make the button appearance better in fill mode.
        return 'text-center';
      }

      return '';
    },
    styleClass: function styleClass() {
      return this.pills ? 'b-pagination-pills' : '';
    },
    computedCurrentPage: function computedCurrentPage() {
      return sanitizeCurrentPage(this.currentPage, this.localNumberOfPages);
    },
    paginationParams: function paginationParams() {
      // Determine if we should show the the ellipsis
      var limit = this.limit;
      var numberOfPages = this.localNumberOfPages;
      var currentPage = this.computedCurrentPage;
      var hideEllipsis = this.hideEllipsis;
      var showFirstDots = false;
      var showLastDots = false;
      var numberOfLinks = limit;
      var startNumber = 1;

      if (numberOfPages <= limit) {
        // Special Case: Less pages available than the limit of displayed pages
        numberOfLinks = numberOfPages;
      } else if (currentPage < limit - 1 && limit > ELLIPSIS_THRESHOLD) {
        // We are near the beginning of the page list
        if (!hideEllipsis) {
          showLastDots = true;
          numberOfLinks = limit - 1;
        }
      } else if (numberOfPages - currentPage + 2 < limit && limit > ELLIPSIS_THRESHOLD) {
        // We are near the end of the list
        if (!hideEllipsis) {
          numberOfLinks = limit - 1;
          showFirstDots = true;
        }

        startNumber = numberOfPages - numberOfLinks + 1;
      } else {
        // We are somewhere in the middle of the page list
        if (limit > ELLIPSIS_THRESHOLD && !hideEllipsis) {
          numberOfLinks = limit - 2;
          showFirstDots = showLastDots = true;
        }

        startNumber = currentPage - Math.floor(numberOfLinks / 2);
      } // Sanity checks


      if (startNumber < 1) {
        /* istanbul ignore next */
        startNumber = 1;
      } else if (startNumber > numberOfPages - numberOfLinks) {
        startNumber = numberOfPages - numberOfLinks + 1;
      }

      return {
        showFirstDots: showFirstDots,
        showLastDots: showLastDots,
        numberOfLinks: numberOfLinks,
        startNumber: startNumber
      };
    },
    pageList: function pageList() {
      // Generates the pageList array
      var _this$paginationParam = this.paginationParams,
          numberOfLinks = _this$paginationParam.numberOfLinks,
          startNumber = _this$paginationParam.startNumber;
      var currentPage = this.computedCurrentPage; // Generate list of page numbers

      var pages = makePageArray(startNumber, numberOfLinks); // We limit to a total of 3 page buttons on XS screens
      // So add classes to page links to hide them for XS breakpoint
      // Note: Ellipsis will also be hidden on XS screens
      // TODO: Make this visual limit configurable based on breakpoint(s)

      if (pages.length > 3) {
        var idx = currentPage - startNumber; // THe following is a bootstrap-vue custom utility class

        var classes = 'bv-d-xs-down-none';

        if (idx === 0) {
          // Keep leftmost 3 buttons visible when current page is first page
          for (var i = 3; i < pages.length; i++) {
            pages[i].classes = classes;
          }
        } else if (idx === pages.length - 1) {
          // Keep rightmost 3 buttons visible when current page is last page
          for (var _i = 0; _i < pages.length - 3; _i++) {
            pages[_i].classes = classes;
          }
        } else {
          // Hide all except current page, current page - 1 and current page + 1
          for (var _i2 = 0; _i2 < idx - 1; _i2++) {
            // hide some left button(s)
            pages[_i2].classes = classes;
          }

          for (var _i3 = pages.length - 1; _i3 > idx + 1; _i3--) {
            // hide some right button(s)
            pages[_i3].classes = classes;
          }
        }
      }

      return pages;
    }
  },
  watch: {
    value: function value(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.currentPage = sanitizeCurrentPage(newValue, this.localNumberOfPages);
      }
    },
    currentPage: function currentPage(newValue, oldValue) {
      if (newValue !== oldValue) {
        // Emit null if no page selected
        this.$emit('input', newValue > 0 ? newValue : null);
      }
    },
    limit: function limit(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.localLimit = sanitizeLimit(newValue);
      }
    }
  },
  created: function created() {
    var _this = this;

    // Set our default values in data
    this.localLimit = sanitizeLimit(this.limit);
    this.$nextTick(function () {
      // Sanity check
      _this.currentPage = _this.currentPage > _this.localNumberOfPages ? _this.localNumberOfPages : _this.currentPage;
    });
  },
  methods: {
    handleKeyNav: function handleKeyNav(evt) {
      var keyCode = evt.keyCode;
      var shift = evt.shiftKey;

      if (keyCode === KeyCodes.LEFT || keyCode === KeyCodes.UP) {
        evt.preventDefault();
        shift ? this.focusFirst() : this.focusPrev();
      } else if (keyCode === KeyCodes.RIGHT || keyCode === KeyCodes.DOWN) {
        evt.preventDefault();
        shift ? this.focusLast() : this.focusNext();
      }
    },
    getButtons: function getButtons() {
      // Return only buttons that are visible
      return selectAll('a.page-link', this.$el).filter(function (btn) {
        return isVisible(btn);
      });
    },
    setBtnFocus: function setBtnFocus(btn) {
      btn.focus();
    },
    focusCurrent: function focusCurrent() {
      var _this2 = this;

      // We do this in next tick to ensure buttons have finished rendering
      this.$nextTick(function () {
        var btn = _this2.getButtons().find(function (el) {
          return parseInt(getAttr(el, 'aria-posinset'), 10) === _this2.computedCurrentPage;
        });

        if (btn && btn.focus) {
          _this2.setBtnFocus(btn);
        } else {
          // Fallback if current page is not in button list
          _this2.focusFirst();
        }
      });
    },
    focusFirst: function focusFirst() {
      var _this3 = this;

      // We do this in next tick to ensure buttons have finished rendering
      this.$nextTick(function () {
        var btn = _this3.getButtons().find(function (el) {
          return !isDisabled(el);
        });

        if (btn && btn.focus && btn !== document.activeElement) {
          _this3.setBtnFocus(btn);
        }
      });
    },
    focusLast: function focusLast() {
      var _this4 = this;

      // We do this in next tick to ensure buttons have finished rendering
      this.$nextTick(function () {
        var btn = _this4.getButtons().reverse().find(function (el) {
          return !isDisabled(el);
        });

        if (btn && btn.focus && btn !== document.activeElement) {
          _this4.setBtnFocus(btn);
        }
      });
    },
    focusPrev: function focusPrev() {
      var _this5 = this;

      // We do this in next tick to ensure buttons have finished rendering
      this.$nextTick(function () {
        var buttons = _this5.getButtons();

        var idx = buttons.indexOf(document.activeElement);

        if (idx > 0 && !isDisabled(buttons[idx - 1]) && buttons[idx - 1].focus) {
          _this5.setBtnFocus(buttons[idx - 1]);
        }
      });
    },
    focusNext: function focusNext() {
      var _this6 = this;

      // We do this in next tick to ensure buttons have finished rendering
      this.$nextTick(function () {
        var buttons = _this6.getButtons();

        var idx = buttons.indexOf(document.activeElement);
        var cnt = buttons.length - 1;

        if (idx < cnt && !isDisabled(buttons[idx + 1]) && buttons[idx + 1].focus) {
          _this6.setBtnFocus(buttons[idx + 1]);
        }
      });
    }
  },
  render: function render(h) {
    var _this7 = this;

    var buttons = [];
    var numberOfPages = this.localNumberOfPages;
    var disabled = this.disabled;
    var _this$paginationParam2 = this.paginationParams,
        showFirstDots = _this$paginationParam2.showFirstDots,
        showLastDots = _this$paginationParam2.showLastDots;
    var currentPage = this.computedCurrentPage;
    var fill = this.align === 'fill'; // Helper function and flag

    var isActivePage = function isActivePage(pageNum) {
      return pageNum === currentPage;
    };

    var noCurrPage = this.currentPage < 1; // Factory function for prev/next/first/last buttons

    var makeEndBtn = function makeEndBtn(linkTo, ariaLabel, btnSlot, btnText, pageTest, key) {
      var isDisabled = disabled || isActivePage(pageTest) || noCurrPage || linkTo < 1 || linkTo > numberOfPages;
      var pageNum = linkTo < 1 ? 1 : linkTo > numberOfPages ? numberOfPages : linkTo;
      var scope = {
        disabled: isDisabled,
        page: pageNum,
        index: pageNum - 1
      };
      var btnContent = _this7.normalizeSlot(btnSlot, scope) || toString(btnText) || h();
      var inner = h(isDisabled ? 'span' : BLink, {
        staticClass: 'page-link',
        props: isDisabled ? {} : _this7.linkProps(linkTo),
        attrs: {
          role: 'menuitem',
          tabindex: isDisabled ? null : '-1',
          'aria-label': ariaLabel,
          'aria-controls': _this7.ariaControls || null,
          'aria-disabled': isDisabled ? 'true' : null
        },
        on: isDisabled ? {} : {
          click: function click(evt) {
            _this7.onClick(linkTo, evt);
          },
          keydown: onSpaceKey
        }
      }, [btnContent]);
      return h('li', {
        key: key,
        staticClass: 'page-item',
        class: {
          disabled: isDisabled,
          'flex-fill': fill
        },
        attrs: {
          role: 'presentation',
          'aria-hidden': isDisabled ? 'true' : null
        }
      }, [inner]);
    }; // Ellipsis factory


    var makeEllipsis = function makeEllipsis(isLast) {
      return h('li', {
        key: "ellipsis-".concat(isLast ? 'last' : 'first'),
        staticClass: 'page-item',
        class: ['disabled', 'bv-d-xs-down-none', fill ? 'flex-fill' : ''],
        attrs: {
          role: 'separator'
        }
      }, [h('span', {
        staticClass: 'page-link'
      }, [_this7.normalizeSlot('ellipsis-text') || toString(_this7.ellipsisText) || h()])]);
    }; // Goto First Page button bookend


    buttons.push(this.hideGotoEndButtons ? h() : makeEndBtn(1, this.labelFirstPage, 'first-text', this.firstText, 1, 'bookend-goto-first')); // Goto Previous page button bookend

    buttons.push(makeEndBtn(currentPage - 1, this.labelPrevPage, 'prev-text', this.prevText, 1, 'bookend-goto-prev')); // First Ellipsis Bookend

    buttons.push(showFirstDots ? makeEllipsis(false) : h()); // Individual Page links

    this.pageList.forEach(function (page, idx) {
      var active = isActivePage(page.number) && !noCurrPage; // Active page will have tabindex of 0, or if no current page and first page button

      var tabIndex = disabled ? null : active || noCurrPage && idx === 0 ? '0' : '-1';
      var attrs = {
        role: 'menuitemradio',
        'aria-disabled': disabled ? 'true' : null,
        'aria-controls': _this7.ariaControls || null,
        'aria-label': isFunction(_this7.labelPage) ? _this7.labelPage(page.number) : "".concat(_this7.labelPage, " ").concat(page.number),
        'aria-checked': active ? 'true' : 'false',
        'aria-posinset': page.number,
        'aria-setsize': numberOfPages,
        // ARIA "roving tabindex" method
        tabindex: tabIndex
      };
      var btnContent = toString(_this7.makePage(page.number));
      var scope = {
        page: page.number,
        index: page.number - 1,
        content: btnContent,
        active: active,
        disabled: disabled
      };
      var inner = h(disabled ? 'span' : BLink, {
        props: disabled ? {} : _this7.linkProps(page.number),
        staticClass: 'page-link',
        attrs: attrs,
        on: disabled ? {} : {
          click: function click(evt) {
            _this7.onClick(page.number, evt);
          },
          keydown: onSpaceKey
        }
      }, [_this7.normalizeSlot('page', scope) || btnContent]);
      buttons.push(h('li', {
        key: "page-".concat(page.number),
        staticClass: 'page-item',
        class: [{
          disabled: disabled,
          active: active,
          'flex-fill': fill
        }, page.classes],
        attrs: {
          role: 'presentation'
        }
      }, [inner]));
    }); // Last Ellipsis Bookend

    buttons.push(showLastDots ? makeEllipsis(true) : h()); // Goto Next page button bookend

    buttons.push(makeEndBtn(currentPage + 1, this.labelNextPage, 'next-text', this.nextText, numberOfPages, 'bookend-goto-next')); // Goto Last Page button bookend

    buttons.push(this.hideGotoEndButtons ? h() : makeEndBtn(numberOfPages, this.labelLastPage, 'last-text', this.lastText, numberOfPages, 'bookend-goto-last')); // Assemble the pagination buttons

    var pagination = h('ul', {
      ref: 'ul',
      staticClass: 'pagination',
      class: ['b-pagination', this.btnSize, this.alignment, this.styleClass],
      attrs: {
        role: 'menubar',
        'aria-disabled': disabled ? 'true' : 'false',
        'aria-label': this.ariaLabel || null
      },
      on: {
        keydown: this.handleKeyNav
      }
    }, buttons); // if we are pagination-nav, wrap in '<nav>' wrapper

    if (this.isNav) {
      return h('nav', {
        attrs: {
          'aria-disabled': disabled ? 'true' : null,
          'aria-hidden': disabled ? 'true' : 'false'
        }
      }, [pagination]);
    } else {
      return pagination;
    }
  }
};
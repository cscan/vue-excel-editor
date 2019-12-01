function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import Vue from '../../utils/vue';
import KeyCodes from '../../utils/key-codes';
import looseEqual from '../../utils/loose-equal';
import observeDom from '../../utils/observe-dom';
import stableSort from '../../utils/stable-sort';
import { arrayIncludes, concat } from '../../utils/array';
import { BvEvent } from '../../utils/bv-event.class';
import { requestAF, selectAll } from '../../utils/dom';
import { isEvent } from '../../utils/inspect';
import { omit } from '../../utils/object';
import idMixin from '../../mixins/id';
import normalizeSlotMixin from '../../mixins/normalize-slot';
import { BLink } from '../link/link';
import { BNav, props as BNavProps } from '../nav/nav'; // -- Constants --

var navProps = omit(BNavProps, ['tabs', 'isNavBar', 'cardHeader']); // -- Utils --
// Filter function to filter out disabled tabs

var notDisabled = function notDisabled(tab) {
  return !tab.disabled;
}; // --- Helper components ---
// @vue/component


var BTabButtonHelper =
/*#__PURE__*/
Vue.extend({
  name: 'BTabButtonHelper',
  inject: {
    bvTabs: {
      default: function _default()
      /* istanbul ignore next */
      {
        return {};
      }
    }
  },
  props: {
    // Reference to the child <b-tab> instance
    tab: {
      default: null
    },
    tabs: {
      type: Array,
      default: function _default()
      /* istanbul ignore next */
      {
        return [];
      }
    },
    id: {
      type: String,
      default: null
    },
    controls: {
      type: String,
      default: null
    },
    tabIndex: {
      type: Number,
      default: null
    },
    posInSet: {
      type: Number,
      default: null
    },
    setSize: {
      type: Number,
      default: null
    },
    noKeyNav: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    focus: function focus() {
      if (this.$refs && this.$refs.link && this.$refs.link.focus) {
        this.$refs.link.focus();
      }
    },
    handleEvt: function handleEvt(evt) {
      var stop = function stop() {
        evt.preventDefault();
        evt.stopPropagation();
      };

      if (this.tab.disabled) {
        /* istanbul ignore next */
        return;
      }

      var type = evt.type;
      var key = evt.keyCode;
      var shift = evt.shiftKey;

      if (type === 'click') {
        stop();
        this.$emit('click', evt);
      } else if (type === 'keydown' && key === KeyCodes.SPACE) {
        // For ARIA tabs the SPACE key will also trigger a click/select
        // Even with keyboard navigation disabled, SPACE should "click" the button
        // See: https://github.com/bootstrap-vue/bootstrap-vue/issues/4323
        stop();
        this.$emit('click', evt);
      } else if (type === 'keydown' && !this.noKeyNav) {
        // For keyboard navigation
        if (key === KeyCodes.UP || key === KeyCodes.LEFT || key === KeyCodes.HOME) {
          stop();

          if (shift || key === KeyCodes.HOME) {
            this.$emit('first', evt);
          } else {
            this.$emit('prev', evt);
          }
        } else if (key === KeyCodes.DOWN || key === KeyCodes.RIGHT || key === KeyCodes.END) {
          stop();

          if (shift || key === KeyCodes.END) {
            this.$emit('last', evt);
          } else {
            this.$emit('next', evt);
          }
        }
      }
    }
  },
  render: function render(h) {
    var link = h(BLink, {
      ref: 'link',
      staticClass: 'nav-link',
      class: [{
        active: this.tab.localActive && !this.tab.disabled,
        disabled: this.tab.disabled
      }, this.tab.titleLinkClass, // Apply <b-tabs> `activeNavItemClass` styles when the tab is active
      this.tab.localActive ? this.bvTabs.activeNavItemClass : null],
      props: {
        disabled: this.tab.disabled
      },
      attrs: {
        role: 'tab',
        id: this.id,
        // Roving tab index when keynav enabled
        tabindex: this.tabIndex,
        'aria-selected': this.tab.localActive && !this.tab.disabled ? 'true' : 'false',
        'aria-setsize': this.setSize,
        'aria-posinset': this.posInSet,
        'aria-controls': this.controls
      },
      on: {
        click: this.handleEvt,
        keydown: this.handleEvt
      }
    }, [this.tab.normalizeSlot('title') || this.tab.title]);
    return h('li', {
      staticClass: 'nav-item',
      class: [this.tab.titleItemClass],
      attrs: {
        role: 'presentation'
      }
    }, [link]);
  }
}); // @vue/component

export var BTabs =
/*#__PURE__*/
Vue.extend({
  name: 'BTabs',
  mixins: [idMixin, normalizeSlotMixin],
  provide: function provide() {
    return {
      bvTabs: this
    };
  },
  model: {
    prop: 'value',
    event: 'input'
  },
  props: _objectSpread({}, navProps, {
    tag: {
      type: String,
      default: 'div'
    },
    card: {
      type: Boolean,
      default: false
    },
    end: {
      // Synonym for 'bottom'
      type: Boolean,
      default: false
    },
    noFade: {
      type: Boolean,
      default: false
    },
    noNavStyle: {
      type: Boolean,
      default: false
    },
    noKeyNav: {
      type: Boolean,
      default: false
    },
    lazy: {
      // This prop is sniffed by the <b-tab> child
      type: Boolean,
      default: false
    },
    contentClass: {
      type: [String, Array, Object],
      default: null
    },
    navClass: {
      type: [String, Array, Object],
      default: null
    },
    navWrapperClass: {
      type: [String, Array, Object],
      default: null
    },
    activeNavItemClass: {
      // Only applied to the currently active <b-nav-item>
      type: [String, Array, Object],
      default: null
    },
    activeTabClass: {
      // Only applied to the currently active <b-tab>
      // This prop is sniffed by the <b-tab> child
      type: [String, Array, Object],
      default: null
    },
    value: {
      // v-model
      type: Number,
      default: null
    }
  }),
  data: function data() {
    var tabIdx = parseInt(this.value, 10);
    tabIdx = isNaN(tabIdx) ? -1 : tabIdx;
    return {
      // Index of current tab
      currentTab: tabIdx,
      // Array of direct child <b-tab> instances, in DOM order
      tabs: [],
      // Array of child instances registered (for triggering reactive updates)
      registeredTabs: [],
      // Flag to know if we are mounted or not
      isMounted: false
    };
  },
  computed: {
    fade: function fade() {
      // This computed prop is sniffed by the tab child
      return !this.noFade;
    },
    localNavClass: function localNavClass() {
      var classes = [];

      if (this.card && this.vertical) {
        classes.push('card-header', 'h-100', 'border-bottom-0', 'rounded-0');
      }

      return [].concat(classes, [this.navClass]);
    }
  },
  watch: {
    currentTab: function currentTab(val, old) {
      var index = -1; // Ensure only one tab is active at most

      this.tabs.forEach(function (tab, idx) {
        if (val === idx && !tab.disabled) {
          tab.localActive = true;
          index = idx;
        } else {
          tab.localActive = false;
        }
      }); // Update the v-model

      this.$emit('input', index);
    },
    value: function value(val, old) {
      if (val !== old) {
        val = parseInt(val, 10);
        val = isNaN(val) ? -1 : val;
        old = parseInt(old, 10) || 0;
        var tabs = this.tabs;

        if (tabs[val] && !tabs[val].disabled) {
          this.activateTab(tabs[val]);
        } else {
          // Try next or prev tabs
          if (val < old) {
            this.previousTab();
          } else {
            this.nextTab();
          }
        }
      }
    },
    registeredTabs: function registeredTabs(newVal, oldVal) {
      var _this = this;

      // Each b-tab will register/unregister itself.
      // We use this to detect when tabs are added/removed
      // to trigger the update of the tabs.
      this.$nextTick(function () {
        requestAF(function () {
          _this.updateTabs();
        });
      });
    },
    tabs: function tabs(newVal, oldVal) {
      var _this2 = this;

      // If tabs added, removed, or re-ordered, we emit a `changed` event.
      // We use `tab._uid` instead of `tab.safeId()`, as the later is changed
      // in a nextTick if no explicit ID is provided, causing duplicate emits.
      if (!looseEqual(newVal.map(function (t) {
        return t._uid;
      }), oldVal.map(function (t) {
        return t._uid;
      }))) {
        // In a nextTick to ensure currentTab has been set first.
        this.$nextTick(function () {
          // We emit shallow copies of the new and old arrays of tabs, to
          // prevent users from potentially mutating the internal arrays.
          _this2.$emit('changed', newVal.slice(), oldVal.slice());
        });
      }
    },
    isMounted: function isMounted(newVal, oldVal) {
      var _this3 = this;

      // Trigger an update after mounted.  Needed for tabs inside lazy modals.
      if (newVal) {
        requestAF(function () {
          _this3.updateTabs();
        });
      } // Enable or disable the observer


      this.setObserver(newVal);
    }
  },
  created: function created() {
    var _this4 = this;

    var tabIdx = parseInt(this.value, 10);
    this.currentTab = isNaN(tabIdx) ? -1 : tabIdx;
    this._bvObserver = null; // For SSR and to make sure only a single tab is shown on mount
    // We wrap this in a `$nextTick()` to ensure the child tabs have been created

    this.$nextTick(function () {
      _this4.updateTabs();
    });
  },
  mounted: function mounted() {
    var _this5 = this;

    // Call `updateTabs()` just in case...
    this.updateTabs();
    this.$nextTick(function () {
      // Flag we are now mounted and to switch to DOM for tab probing.
      // As this.$slots.default appears to lie about component instances
      // after b-tabs is destroyed and re-instantiated.
      // And this.$children does not respect DOM order.
      _this5.isMounted = true;
    });
  },
  deactivated: function deactivated()
  /* istanbul ignore next */
  {
    this.isMounted = false;
  },
  activated: function activated()
  /* istanbul ignore next */
  {
    var _this6 = this;

    var tabIdx = parseInt(this.value, 10);
    this.currentTab = isNaN(tabIdx) ? -1 : tabIdx;
    this.$nextTick(function () {
      _this6.updateTabs();

      _this6.isMounted = true;
    });
  },
  beforeDestroy: function beforeDestroy() {
    this.isMounted = false;
  },
  destroyed: function destroyed() {
    // Ensure no references to child instances exist
    this.tabs = [];
  },
  methods: {
    registerTab: function registerTab(tab) {
      var _this7 = this;

      if (!arrayIncludes(this.registeredTabs, tab)) {
        this.registeredTabs.push(tab);
        tab.$once('hook:destroyed', function () {
          _this7.unregisterTab(tab);
        });
      }
    },
    unregisterTab: function unregisterTab(tab) {
      this.registeredTabs = this.registeredTabs.slice().filter(function (t) {
        return t !== tab;
      });
    },
    setObserver: function setObserver(on) {
      // DOM observer is needed to detect changes in order of tabs
      if (on) {
        // Make sure no existing observer running
        this.setObserver(false);
        var self = this;
        /* istanbul ignore next: difficult to test mutation observer in JSDOM */

        var handler = function handler() {
          // We delay the update to ensure that `tab.safeId()` has
          // updated with the final ID value.
          self.$nextTick(function () {
            requestAF(function () {
              self.updateTabs();
            });
          });
        }; // Watch for changes to <b-tab> sub components


        this._bvObserver = observeDom(this.$refs.tabsContainer, handler, {
          childList: true,
          subtree: false,
          attributes: true,
          attributeFilter: ['id']
        });
      } else {
        if (this._bvObserver && this._bvObserver.disconnect) {
          this._bvObserver.disconnect();
        }

        this._bvObserver = null;
      }
    },
    getTabs: function getTabs() {
      // We use registeredTabs as the source of truth for child tab components. And we
      // filter out any BTab components that are extended BTab with a root child BTab.
      // https://github.com/bootstrap-vue/bootstrap-vue/issues/3260
      var tabs = this.registeredTabs.filter(function (tab) {
        return tab.$children.filter(function (t) {
          return t._isTab;
        }).length === 0;
      }); // DOM Order of Tabs

      var order = [];

      if (this.isMounted && tabs.length > 0) {
        // We rely on the DOM when mounted to get the 'true' order of the b-tab children.
        // querySelectorAll(...) always returns elements in document order, regardless of
        // order specified in the selector.
        var selector = tabs.map(function (tab) {
          return "#".concat(tab.safeId());
        }).join(', ');
        order = selectAll(selector, this.$el).map(function (el) {
          return el.id;
        }).filter(Boolean);
      } // Stable sort keeps the original order if not found in the
      // `order` array, which will be an empty array before mount.


      return stableSort(tabs, function (a, b) {
        return order.indexOf(a.safeId()) - order.indexOf(b.safeId());
      });
    },
    // Update list of <b-tab> children
    updateTabs: function updateTabs() {
      // Probe tabs
      var tabs = this.getTabs(); // Find *last* active non-disabled tab in current tabs
      // We trust tab state over currentTab, in case tabs were added/removed/re-ordered

      var tabIndex = tabs.indexOf(tabs.slice().reverse().find(function (tab) {
        return tab.localActive && !tab.disabled;
      })); // Else try setting to currentTab

      if (tabIndex < 0) {
        var currentTab = this.currentTab;

        if (currentTab >= tabs.length) {
          // Handle last tab being removed, so find the last non-disabled tab
          tabIndex = tabs.indexOf(tabs.slice().reverse().find(notDisabled));
        } else if (tabs[currentTab] && !tabs[currentTab].disabled) {
          // Current tab is not disabled
          tabIndex = currentTab;
        }
      } // Else find *first* non-disabled tab in current tabs


      if (tabIndex < 0) {
        tabIndex = tabs.indexOf(tabs.find(notDisabled));
      } // Set the current tab state to active


      tabs.forEach(function (tab, idx) {
        // tab.localActive = idx === tabIndex && !tab.disabled
        tab.localActive = false;
      });

      if (tabs[tabIndex]) {
        tabs[tabIndex].localActive = true;
      } // Update the array of tab children


      this.tabs = tabs; // Set the currentTab index (can be -1 if no non-disabled tabs)

      this.currentTab = tabIndex;
    },
    // Find a button that controls a tab, given the tab reference
    // Returns the button vm instance
    getButtonForTab: function getButtonForTab(tab) {
      return (this.$refs.buttons || []).find(function (btn) {
        return btn.tab === tab;
      });
    },
    // Force a button to re-render it's content, given a <b-tab> instance
    // Called by <b-tab> on `update()`
    updateButton: function updateButton(tab) {
      var button = this.getButtonForTab(tab);

      if (button && button.$forceUpdate) {
        button.$forceUpdate();
      }
    },
    // Activate a tab given a <b-tab> instance
    // Also accessed by <b-tab>
    activateTab: function activateTab(tab) {
      var result = false;

      if (tab) {
        var index = this.tabs.indexOf(tab);

        if (!tab.disabled && index > -1 && index !== this.currentTab) {
          var tabEvt = new BvEvent('activate-tab', {
            cancelable: true,
            vueTarget: this,
            componentId: this.safeId()
          });
          this.$emit(tabEvt.type, index, this.currentTab, tabEvt);

          if (!tabEvt.defaultPrevented) {
            result = true;
            this.currentTab = index;
          }
        }
      } // Couldn't set tab, so ensure v-model is set to `this.currentTab`

      /* istanbul ignore next: should rarely happen */


      if (!result && this.currentTab !== this.value) {
        this.$emit('input', this.currentTab);
      }

      return result;
    },
    // Deactivate a tab given a <b-tab> instance
    // Accessed by <b-tab>
    deactivateTab: function deactivateTab(tab) {
      if (tab) {
        // Find first non-disabled tab that isn't the one being deactivated
        // If no tabs are available, then don't deactivate current tab
        return this.activateTab(this.tabs.filter(function (t) {
          return t !== tab;
        }).find(notDisabled));
      }
      /* istanbul ignore next: should never/rarely happen */


      return false;
    },
    // Focus a tab button given it's <b-tab> instance
    focusButton: function focusButton(tab) {
      var _this8 = this;

      // Wrap in `$nextTick()` to ensure DOM has completed rendering/updating before focusing
      this.$nextTick(function () {
        var button = _this8.getButtonForTab(tab);

        if (button && button.focus) {
          button.focus();
        }
      });
    },
    // Emit a click event on a specified <b-tab> component instance
    emitTabClick: function emitTabClick(tab, evt) {
      if (isEvent(evt) && tab && tab.$emit && !tab.disabled) {
        tab.$emit('click', evt);
      }
    },
    // Click handler
    clickTab: function clickTab(tab, evt) {
      this.activateTab(tab);
      this.emitTabClick(tab, evt);
    },
    // Move to first non-disabled tab
    firstTab: function firstTab(focus) {
      var tab = this.tabs.find(notDisabled);

      if (this.activateTab(tab) && focus) {
        this.focusButton(tab);
        this.emitTabClick(tab, focus);
      }
    },
    // Move to previous non-disabled tab
    previousTab: function previousTab(focus) {
      var currentIndex = Math.max(this.currentTab, 0);
      var tab = this.tabs.slice(0, currentIndex).reverse().find(notDisabled);

      if (this.activateTab(tab) && focus) {
        this.focusButton(tab);
        this.emitTabClick(tab, focus);
      }
    },
    // Move to next non-disabled tab
    nextTab: function nextTab(focus) {
      var currentIndex = Math.max(this.currentTab, -1);
      var tab = this.tabs.slice(currentIndex + 1).find(notDisabled);

      if (this.activateTab(tab) && focus) {
        this.focusButton(tab);
        this.emitTabClick(tab, focus);
      }
    },
    // Move to last non-disabled tab
    lastTab: function lastTab(focus) {
      var tab = this.tabs.slice().reverse().find(notDisabled);

      if (this.activateTab(tab) && focus) {
        this.focusButton(tab);
        this.emitTabClick(tab, focus);
      }
    }
  },
  render: function render(h) {
    var _this9 = this;

    var tabs = this.tabs; // Currently active tab

    var activeTab = tabs.find(function (tab) {
      return tab.localActive && !tab.disabled;
    }); // Tab button to allow focusing when no active tab found (keynav only)

    var fallbackTab = tabs.find(function (tab) {
      return !tab.disabled;
    }); // For each <b-tab> found create the tab buttons

    var buttons = tabs.map(function (tab, index) {
      var tabIndex = null; // Ensure at least one tab button is focusable when keynav enabled (if possible)

      if (!_this9.noKeyNav) {
        // Buttons are not in tab index unless active, or a fallback tab
        tabIndex = -1;

        if (activeTab === tab || !activeTab && fallbackTab === tab) {
          // Place tab button in tab sequence
          tabIndex = null;
        }
      }

      return h(BTabButtonHelper, {
        key: tab._uid || index,
        ref: 'buttons',
        // Needed to make `this.$refs.buttons` an array
        refInFor: true,
        props: {
          tab: tab,
          tabs: tabs,
          id: tab.controlledBy || (tab.safeId ? tab.safeId("_BV_tab_button_") : null),
          controls: tab.safeId ? tab.safeId() : null,
          tabIndex: tabIndex,
          setSize: tabs.length,
          posInSet: index + 1,
          noKeyNav: _this9.noKeyNav
        },
        on: {
          click: function click(evt) {
            _this9.clickTab(tab, evt);
          },
          first: _this9.firstTab,
          prev: _this9.previousTab,
          next: _this9.nextTab,
          last: _this9.lastTab
        }
      });
    }); // Nav

    var nav = h(BNav, {
      ref: 'nav',
      class: this.localNavClass,
      attrs: {
        role: 'tablist',
        id: this.safeId('_BV_tab_controls_')
      },
      props: {
        fill: this.fill,
        justified: this.justified,
        align: this.align,
        tabs: !this.noNavStyle && !this.pills,
        pills: !this.noNavStyle && this.pills,
        vertical: this.vertical,
        small: this.small,
        cardHeader: this.card && !this.vertical
      }
    }, [this.normalizeSlot('tabs-start') || h(), buttons, this.normalizeSlot('tabs-end') || h()]);
    nav = h('div', {
      key: 'bv-tabs-nav',
      class: [{
        'card-header': this.card && !this.vertical && !this.end,
        'card-footer': this.card && !this.vertical && this.end,
        'col-auto': this.vertical
      }, this.navWrapperClass]
    }, [nav]);
    var empty = h();

    if (!tabs || tabs.length === 0) {
      empty = h('div', {
        key: 'bv-empty-tab',
        class: ['tab-pane', 'active', {
          'card-body': this.card
        }]
      }, this.normalizeSlot('empty'));
    } // Main content section


    var content = h('div', {
      ref: 'tabsContainer',
      key: 'bv-tabs-container',
      staticClass: 'tab-content',
      class: [{
        col: this.vertical
      }, this.contentClass],
      attrs: {
        id: this.safeId('_BV_tab_container_')
      }
    }, concat(this.normalizeSlot('default'), empty)); // Render final output

    return h(this.tag, {
      staticClass: 'tabs',
      class: {
        row: this.vertical,
        'no-gutters': this.vertical && this.card
      },
      attrs: {
        id: this.safeId()
      }
    }, [this.end ? content : h(), [nav], this.end ? h() : content]);
  }
});
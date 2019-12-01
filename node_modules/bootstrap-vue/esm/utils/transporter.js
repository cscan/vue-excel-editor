import Vue from './vue';
import { concat } from './array';
import { select } from './dom';
import { isBrowser } from './env';
import { isFunction, isString } from './inspect';
import { HTMLElement } from './safe-types';
import normalizeSlotMixin from '../mixins/normalize-slot'; // BTransporterSingle/BTransporterTargetSingle:
//
// Single root node portaling of content, which retains parent/child hierarchy
// Unlike Portal-Vue where portaled content is no longer a descendent of it's
// intended parent components
//
// Private components for use by Tooltips, Popovers and Modals
//
// Based on vue-simple-portal
// https://github.com/LinusBorg/vue-simple-portal
// Transporter target used by BTransporterSingle
// Supports only a single root element
// @vue/component

var BTransporterTargetSingle =
/*#__PURE__*/
Vue.extend({
  // As an abstract component, it doesn't appear in the $parent chain of
  // components, which means the next parent of any component rendered inside
  // of this one will be the parent from which is was portal'd
  abstract: true,
  name: 'BTransporterTargetSingle',
  props: {
    nodes: {
      // Even though we only support a single root element,
      // VNodes are always passed as an array
      type: [Array, Function] // default: undefined

    }
  },
  data: function data(vm) {
    return {
      updatedNodes: vm.nodes
    };
  },
  destroyed: function destroyed() {
    var el = this.$el;
    el && el.parentNode && el.parentNode.removeChild(el);
  },
  render: function render(h) {
    var nodes = isFunction(this.updatedNodes) ? this.updatedNodes({}) : this.updatedNodes;
    nodes = concat(nodes).filter(Boolean);
    /* istanbul ignore else */

    if (nodes && nodes.length > 0 && !nodes[0].text) {
      return nodes[0];
    } else {
      /* istanbul ignore next */
      return h();
    }
  }
}); // This component has no root element, so only a single VNode is allowed
// @vue/component

export var BTransporterSingle =
/*#__PURE__*/
Vue.extend({
  name: 'BTransporterSingle',
  mixins: [normalizeSlotMixin],
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    container: {
      // String: CSS selector,
      // HTMLElement: Element reference
      // Mainly needed for tooltips/popovers inside modals
      type: [String, HTMLElement],
      default: 'body'
    },
    tag: {
      // This should be set to match the root element type
      type: String,
      default: 'div'
    }
  },
  watch: {
    disabled: {
      immediate: true,
      handler: function handler(disabled) {
        disabled ? this.unmountTarget() : this.$nextTick(this.mountTarget);
      }
    }
  },
  created: function created() {
    this._bv_defaultFn = null;
    this._bv_target = null;
  },
  beforeMount: function beforeMount() {
    this.mountTarget();
  },
  updated: function updated() {
    var _this = this;

    // Placed in a nextTick to ensure that children have completed
    // updating before rendering in the target
    this.$nextTick(function () {
      _this.updateTarget();
    });
  },
  beforeDestroy: function beforeDestroy() {
    this.unmountTarget();
    this._bv_defaultFn = null;
  },
  methods: {
    // Get the element which the target should be appended to
    getContainer: function getContainer() {
      /* istanbul ignore else */
      if (isBrowser) {
        var container = this.container;
        return isString(container) ? select(container) : container;
      } else {
        return null;
      }
    },
    // Mount the target
    mountTarget: function mountTarget() {
      if (!this._bv_target) {
        var container = this.getContainer();

        if (container) {
          var el = document.createElement('div');
          container.appendChild(el);
          this._bv_target = new BTransporterTargetSingle({
            el: el,
            parent: this,
            propsData: {
              // Initial nodes to be rendered
              nodes: concat(this.normalizeSlot('default'))
            }
          });
        }
      }
    },
    // Update the content of the target
    updateTarget: function updateTarget() {
      if (isBrowser && this._bv_target) {
        var defaultFn = this.$scopedSlots.default;

        if (!this.disabled) {
          /* istanbul ignore else: only applicable in Vue 2.5.x */
          if (defaultFn && this._bv_defaultFn !== defaultFn) {
            // We only update the target component if the scoped slot
            // function is a fresh one. The new slot syntax (since Vue 2.6)
            // can cache unchanged slot functions and we want to respect that here
            this._bv_target.updatedNodes = defaultFn;
          } else if (!defaultFn) {
            // We also need to be back compatible with non-scoped default slot (i.e. 2.5.x)
            this._bv_target.updatedNodes = this.$slots.default;
          }
        } // Update the scoped slot function cache


        this._bv_defaultFn = defaultFn;
      }
    },
    // Unmount the target
    unmountTarget: function unmountTarget() {
      if (this._bv_target) {
        this._bv_target.$destroy();

        this._bv_target = null;
      }
    }
  },
  render: function render(h) {
    if (this.disabled) {
      var nodes = concat(this.normalizeSlot('default')).filter(Boolean);

      if (nodes.length > 0 && !nodes[0].text) {
        return nodes[0];
      }
    }

    return h();
  }
});
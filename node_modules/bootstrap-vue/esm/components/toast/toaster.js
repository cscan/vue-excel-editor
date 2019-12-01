import Vue from '../../utils/vue';
import { PortalTarget, Wormhole } from 'portal-vue';
import warn from '../../utils/warn';
import { getComponentConfig } from '../../utils/config';
import { removeClass, requestAF } from '../../utils/dom'; // --- Constants ---

var NAME = 'BToaster';
export var props = {
  name: {
    type: String,
    required: true
  },
  ariaLive: {
    type: String,
    default: function _default() {
      return getComponentConfig(NAME, 'ariaLive');
    }
  },
  ariaAtomic: {
    type: String,
    default: function _default() {
      return getComponentConfig(NAME, 'ariaAtomic');
    } // Allowed: 'true' or 'false' or null

  },
  role: {
    // Aria role
    type: String,
    default: function _default() {
      return getComponentConfig(NAME, 'role');
    }
  }
  /*
  transition: {
    type: [Boolean, String, Object],
    default: false
  }
  */

}; // @vue/component

export var DefaultTransition =
/*#__PURE__*/
Vue.extend({
  data: function data() {
    return {
      // Transition classes base name
      name: 'b-toaster'
    };
  },
  methods: {
    onAfterEnter: function onAfterEnter(el) {
      var _this = this;

      // Handle bug where enter-to class is not removed.
      // Bug is related to portal-vue and transition-groups.
      requestAF(function () {
        removeClass(el, "".concat(_this.name, "-enter-to")); // The *-move class is also stuck on elements that moved,
        // but there are no javascript hooks to handle after move.
      });
    }
  },
  render: function render(h) {
    return h('transition-group', {
      props: {
        tag: 'div',
        name: this.name
      },
      on: {
        afterEnter: this.onAfterEnter
      }
    }, this.$slots.default);
  }
}); // @vue/component

export var BToaster =
/*#__PURE__*/
Vue.extend({
  name: NAME,
  props: props,
  data: function data() {
    return {
      // We don't render on SSR or if a an existing target found
      doRender: false,
      dead: false,
      // Toaster names cannot change once created
      staticName: this.name
    };
  },
  beforeMount: function beforeMount() {
    var _this2 = this;

    this.staticName = this.name;
    /* istanbul ignore if */

    if (Wormhole.hasTarget(this.staticName)) {
      warn("b-toaster: A <portal-target> with name '".concat(this.name, "' already exists in the document."));
      this.dead = true;
    } else {
      this.doRender = true;
      this.$once('hook:beforeDestroy', function () {
        // Let toasts made with `this.$bvToast.toast()` know that this toaster
        // is being destroyed and should should also destroy/hide themselves
        _this2.$root.$emit('bv::toaster::destroyed', _this2.staticName);
      });
    }
  },
  destroyed: function destroyed() {
    // Remove from DOM if needed

    /* istanbul ignore next: difficult to test */
    if (this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el);
    }
  },
  render: function render(h) {
    var $toaster = h('div', {
      class: ['d-none', {
        'b-dead-toaster': this.dead
      }]
    });

    if (this.doRender) {
      var $target = h(PortalTarget, {
        staticClass: 'b-toaster-slot',
        props: {
          name: this.staticName,
          multiple: true,
          tag: 'div',
          slim: false,
          // transition: this.transition || DefaultTransition
          transition: DefaultTransition
        }
      });
      $toaster = h('div', {
        staticClass: 'b-toaster',
        class: [this.staticName],
        attrs: {
          id: this.staticName,
          role: this.role || null,
          // Fallback to null to make sure attribute doesn't exist
          'aria-live': this.ariaLive,
          'aria-atomic': this.ariaAtomic
        }
      }, [$target]);
    }

    return $toaster;
  }
});
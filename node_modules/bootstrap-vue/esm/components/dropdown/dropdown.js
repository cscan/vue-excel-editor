import Vue from '../../utils/vue';
import { arrayIncludes } from '../../utils/array';
import { stripTags } from '../../utils/html';
import { getComponentConfig } from '../../utils/config';
import { HTMLElement } from '../../utils/safe-types';
import idMixin from '../../mixins/id';
import dropdownMixin from '../../mixins/dropdown';
import normalizeSlotMixin from '../../mixins/normalize-slot';
import { BButton } from '../button/button';
var NAME = 'BDropdown';
export var props = {
  toggleText: {
    // This really should be toggleLabel
    type: String,
    default: function _default() {
      return getComponentConfig(NAME, 'toggleText');
    }
  },
  size: {
    type: String,
    default: function _default() {
      return getComponentConfig(NAME, 'size');
    }
  },
  variant: {
    type: String,
    default: function _default() {
      return getComponentConfig(NAME, 'variant');
    }
  },
  block: {
    type: Boolean,
    default: false
  },
  menuClass: {
    type: [String, Array],
    default: null
  },
  toggleTag: {
    type: String,
    default: 'button'
  },
  toggleClass: {
    type: [String, Array],
    default: null
  },
  noCaret: {
    type: Boolean,
    default: false
  },
  split: {
    type: Boolean,
    default: false
  },
  splitHref: {
    type: String // default: undefined

  },
  splitTo: {
    type: [String, Object] // default: undefined

  },
  splitVariant: {
    type: String,
    default: function _default() {
      return getComponentConfig(NAME, 'splitVariant');
    }
  },
  splitButtonType: {
    type: String,
    default: 'button',
    validator: function validator(value) {
      return arrayIncludes(['button', 'submit', 'reset'], value);
    }
  },
  role: {
    type: String,
    default: 'menu'
  },
  boundary: {
    // String: `scrollParent`, `window` or `viewport`
    // HTMLElement: HTML Element reference
    type: [String, HTMLElement],
    default: 'scrollParent'
  }
}; // @vue/component

export var BDropdown =
/*#__PURE__*/
Vue.extend({
  name: NAME,
  mixins: [idMixin, dropdownMixin, normalizeSlotMixin],
  props: props,
  computed: {
    dropdownClasses: function dropdownClasses() {
      return [this.directionClass, {
        show: this.visible,
        // The 'btn-group' class is required in `split` mode for button alignment
        // It needs also to be applied when `block` is disabled to allow multiple
        // dropdowns to be aligned one line
        'btn-group': this.split || !this.block,
        // When `block` is enabled and we are in `split` mode the 'd-flex' class
        // needs to be applied to allow the buttons to stretch to full width
        'd-flex': this.block && this.split,
        // Position `static` is needed to allow menu to "breakout" of the `scrollParent`
        // boundaries when boundary is anything other than `scrollParent`
        // See: https://github.com/twbs/bootstrap/issues/24251#issuecomment-341413786
        'position-static': this.boundary !== 'scrollParent' || !this.boundary
      }];
    },
    menuClasses: function menuClasses() {
      return [this.menuClass, {
        'dropdown-menu-right': this.right,
        show: this.visible
      }];
    },
    toggleClasses: function toggleClasses() {
      return [this.toggleClass, {
        'dropdown-toggle-split': this.split,
        'dropdown-toggle-no-caret': this.noCaret && !this.split
      }];
    }
  },
  render: function render(h) {
    var split = h();
    var buttonContent = this.normalizeSlot('button-content') || this.html || stripTags(this.text);

    if (this.split) {
      var btnProps = {
        variant: this.splitVariant || this.variant,
        size: this.size,
        block: this.block,
        disabled: this.disabled
      }; // We add these as needed due to router-link issues with defined property with undefined/null values

      if (this.splitTo) {
        btnProps.to = this.splitTo;
      } else if (this.splitHref) {
        btnProps.href = this.splitHref;
      } else if (this.splitButtonType) {
        btnProps.type = this.splitButtonType;
      }

      split = h(BButton, {
        ref: 'button',
        props: btnProps,
        attrs: {
          id: this.safeId('_BV_button_')
        },
        on: {
          click: this.click
        }
      }, [buttonContent]);
    }

    var toggle = h(BButton, {
      ref: 'toggle',
      staticClass: 'dropdown-toggle',
      class: this.toggleClasses,
      props: {
        tag: this.toggleTag,
        variant: this.variant,
        size: this.size,
        block: this.block && !this.split,
        disabled: this.disabled
      },
      attrs: {
        id: this.safeId('_BV_toggle_'),
        'aria-haspopup': 'true',
        'aria-expanded': this.visible ? 'true' : 'false'
      },
      on: {
        click: this.toggle,
        // click
        keydown: this.toggle // enter, space, down

      }
    }, [this.split ? h('span', {
      class: ['sr-only']
    }, [this.toggleText]) : buttonContent]);
    var menu = h('ul', {
      ref: 'menu',
      staticClass: 'dropdown-menu',
      class: this.menuClasses,
      attrs: {
        role: this.role,
        tabindex: '-1',
        'aria-labelledby': this.safeId(this.split ? '_BV_button_' : '_BV_toggle_')
      },
      on: {
        keydown: this.onKeydown // up, down, esc

      }
    }, !this.lazy || this.visible ? this.normalizeSlot('default', {
      hide: this.hide
    }) : [h()]);
    return h('div', {
      staticClass: 'dropdown b-dropdown',
      class: this.dropdownClasses,
      attrs: {
        id: this.safeId()
      }
    }, [split, toggle, menu]);
  }
});
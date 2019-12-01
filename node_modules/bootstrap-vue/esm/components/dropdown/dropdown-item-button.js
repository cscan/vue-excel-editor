function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import Vue from '../../utils/vue';
import nomalizeSlotMixin from '../../mixins/normalize-slot';
export var props = {
  active: {
    type: Boolean,
    default: false
  },
  activeClass: {
    type: String,
    default: 'active'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  variant: {
    type: String,
    default: null
  }
}; // @vue/component

export var BDropdownItemButton =
/*#__PURE__*/
Vue.extend({
  name: 'BDropdownItemButton',
  mixins: [nomalizeSlotMixin],
  inheritAttrs: false,
  inject: {
    bvDropdown: {
      default: null
    }
  },
  props: props,
  methods: {
    closeDropdown: function closeDropdown() {
      if (this.bvDropdown) {
        this.bvDropdown.hide(true);
      }
    },
    onClick: function onClick(evt) {
      this.$emit('click', evt);
      this.closeDropdown();
    }
  },
  render: function render(h) {
    var _class;

    return h('li', {
      attrs: {
        role: 'presentation'
      }
    }, [h('button', {
      staticClass: 'dropdown-item',
      class: (_class = {}, _defineProperty(_class, this.activeClass, this.active), _defineProperty(_class, "text-".concat(this.variant), this.variant && !(this.active || this.disabled)), _class),
      attrs: _objectSpread({}, this.$attrs, {
        role: 'menuitem',
        type: 'button',
        disabled: this.disabled
      }),
      on: {
        click: this.onClick
      },
      ref: 'button'
    }, this.normalizeSlot('default'))]);
  }
});
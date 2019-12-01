function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import normalizeSlotMixin from './normalize-slot'; // @vue/component

export default {
  mixins: [normalizeSlotMixin],
  inheritAttrs: false,
  model: {
    prop: 'checked',
    event: 'input'
  },
  props: {
    value: {// Value when checked
      // type: Object,
      // default: undefined
    },
    checked: {// This is the v-model
      // type: Object,
      // default: undefined
    },
    inline: {
      type: Boolean,
      default: false
    },
    plain: {
      type: Boolean,
      default: false
    },
    button: {
      // Only applicable in standalone mode (non group)
      type: Boolean,
      default: false
    },
    buttonVariant: {
      // Only applicable when rendered with button style
      type: String,
      default: null
    },
    ariaLabel: {
      // Placed on the input if present.
      type: String,
      default: null
    },
    ariaLabelledby: {
      // Placed on the input if present.
      type: String,
      default: null
    }
  },
  data: function data() {
    return {
      localChecked: this.isGroup ? this.bvGroup.checked : this.checked,
      hasFocus: false
    };
  },
  computed: {
    computedLocalChecked: {
      get: function get() {
        return this.isGroup ? this.bvGroup.localChecked : this.localChecked;
      },
      set: function set(val) {
        if (this.isGroup) {
          this.bvGroup.localChecked = val;
        } else {
          this.localChecked = val;
        }
      }
    },
    isGroup: function isGroup() {
      // Is this check/radio a child of check-group or radio-group?
      return Boolean(this.bvGroup);
    },
    isBtnMode: function isBtnMode() {
      // Support button style in single input mode
      return this.isGroup ? this.bvGroup.buttons : this.button;
    },
    isPlain: function isPlain() {
      return this.isBtnMode ? false : this.isGroup ? this.bvGroup.plain : this.plain;
    },
    isCustom: function isCustom() {
      return this.isBtnMode ? false : !this.isPlain;
    },
    isSwitch: function isSwitch() {
      // Custom switch styling (checkboxes only)
      return this.isBtnMode || this.isRadio || this.isPlain ? false : this.isGroup ? this.bvGroup.switches : this.switch;
    },
    isInline: function isInline() {
      return this.isGroup ? this.bvGroup.inline : this.inline;
    },
    isDisabled: function isDisabled() {
      // Child can be disabled while parent isn't, but is always disabled if group is
      return this.isGroup ? this.bvGroup.disabled || this.disabled : this.disabled;
    },
    isRequired: function isRequired() {
      // Required only works when a name is provided for the input(s)
      // Child can only be required when parent is
      // Groups will always have a name (either user supplied or auto generated)
      return Boolean(this.getName && (this.isGroup ? this.bvGroup.required : this.required));
    },
    getName: function getName() {
      // Group name preferred over local name
      return (this.isGroup ? this.bvGroup.groupName : this.name) || null;
    },
    getForm: function getForm() {
      return (this.isGroup ? this.bvGroup.form : this.form) || null;
    },
    getSize: function getSize() {
      return (this.isGroup ? this.bvGroup.size : this.size) || '';
    },
    getState: function getState() {
      return this.isGroup ? this.bvGroup.computedState : this.computedState;
    },
    getButtonVariant: function getButtonVariant() {
      // Local variant preferred over group variant
      if (this.buttonVariant) {
        return this.buttonVariant;
      } else if (this.isGroup && this.bvGroup.buttonVariant) {
        return this.bvGroup.buttonVariant;
      } // default variant


      return 'secondary';
    },
    buttonClasses: function buttonClasses() {
      var _ref;

      // Same for radio & check
      return ['btn', "btn-".concat(this.getButtonVariant), (_ref = {}, _defineProperty(_ref, "btn-".concat(this.getSize), this.getSize), _defineProperty(_ref, "disabled", this.isDisabled), _defineProperty(_ref, "active", this.isChecked), _defineProperty(_ref, "focus", this.hasFocus), _ref)];
    }
  },
  watch: {
    checked: function checked(newVal, oldVal) {
      this.computedLocalChecked = newVal;
    }
  },
  methods: {
    handleFocus: function handleFocus(evt) {
      // When in buttons mode, we need to add 'focus' class to label when input focused
      // As it is the hidden input which has actual focus
      if (evt.target) {
        if (evt.type === 'focus') {
          this.hasFocus = true;
        } else if (evt.type === 'blur') {
          this.hasFocus = false;
        }
      }
    },
    // Convenience methods for focusing the input
    focus: function focus() {
      if (!this.isDisabled && this.$refs.input && this.$refs.input.focus) {
        this.$refs.input.focus();
      }
    },
    blur: function blur() {
      if (!this.isDisabled && this.$refs.input && this.$refs.input.blur) {
        this.$refs.input.blur();
      }
    }
  },
  render: function render(h) {
    var defaultSlot = this.normalizeSlot('default'); // Generate the input element

    var on = {
      change: this.handleChange
    };

    if (this.isBtnMode) {
      // Handlers for focus styling when in button mode
      on.focus = on.blur = this.handleFocus;
    }

    var input = h('input', {
      ref: 'input',
      key: 'input',
      on: on,
      class: {
        'form-check-input': this.isPlain,
        'custom-control-input': this.isCustom,
        'is-valid': this.getState === true && !this.isBtnMode,
        'is-invalid': this.getState === false && !this.isBtnMode,
        // https://github.com/bootstrap-vue/bootstrap-vue/issues/2911
        'position-static': this.isPlain && !defaultSlot
      },
      directives: [{
        name: 'model',
        rawName: 'v-model',
        value: this.computedLocalChecked,
        expression: 'computedLocalChecked'
      }],
      attrs: _objectSpread({}, this.$attrs, {
        id: this.safeId(),
        type: this.isRadio ? 'radio' : 'checkbox',
        name: this.getName,
        form: this.getForm,
        disabled: this.isDisabled,
        required: this.isRequired,
        autocomplete: 'off',
        'aria-required': this.isRequired || null,
        'aria-label': this.ariaLabel || null,
        'aria-labelledby': this.ariaLabelledby || null
      }),
      domProps: {
        value: this.value,
        checked: this.isChecked
      }
    });

    if (this.isBtnMode) {
      // Button mode
      var button = h('label', {
        class: this.buttonClasses
      }, [input, defaultSlot]);

      if (!this.isGroup) {
        // Standalone button mode, so wrap in 'btn-group-toggle'
        // and flag it as inline-block to mimic regular buttons
        button = h('div', {
          class: ['btn-group-toggle', 'd-inline-block']
        }, [button]);
      }

      return button;
    } else {
      // Not button mode
      var label = h(); // If no label content in plain mode we dont render the label
      // https://github.com/bootstrap-vue/bootstrap-vue/issues/2911

      if (!(this.isPlain && !defaultSlot)) {
        label = h('label', {
          class: {
            'form-check-label': this.isPlain,
            'custom-control-label': this.isCustom
          },
          attrs: {
            for: this.safeId()
          }
        }, defaultSlot);
      } // Wrap it in a div


      return h('div', {
        class: _defineProperty({
          'form-check': this.isPlain,
          'form-check-inline': this.isPlain && this.isInline,
          'custom-control': this.isCustom,
          'custom-control-inline': this.isCustom && this.isInline,
          'custom-checkbox': this.isCustom && this.isCheck && !this.isSwitch,
          'custom-switch': this.isSwitch,
          'custom-radio': this.isCustom && this.isRadio
        }, "b-custom-control-".concat(this.getSize), Boolean(this.getSize && !this.isBtnMode))
      }, [input, label]);
    }
  }
};
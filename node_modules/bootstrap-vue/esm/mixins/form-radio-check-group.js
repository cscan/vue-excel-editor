import { htmlOrText } from '../utils/html';
import normalizeSlotMixin from './normalize-slot';
import { BFormCheckbox } from '../components/form-checkbox/form-checkbox';
import { BFormRadio } from '../components/form-radio/form-radio'; // @vue/component

export default {
  mixins: [normalizeSlotMixin],
  model: {
    prop: 'checked',
    event: 'input'
  },
  props: {
    validated: {
      type: Boolean,
      default: false
    },
    ariaInvalid: {
      type: [Boolean, String],
      default: false
    },
    stacked: {
      type: Boolean,
      default: false
    },
    plain: {
      type: Boolean,
      default: false
    },
    buttons: {
      // Render as button style
      type: Boolean,
      default: false
    },
    buttonVariant: {
      // Only applicable when rendered with button style
      type: String,
      default: 'secondary'
    }
  },
  computed: {
    inline: function inline() {
      return !this.stacked;
    },
    groupName: function groupName() {
      // Checks/Radios tied to the same model must have the same name,
      // especially for ARIA accessibility.
      return this.name || this.safeId();
    },
    groupClasses: function groupClasses() {
      if (this.buttons) {
        return ['btn-group-toggle', this.inline ? 'btn-group' : 'btn-group-vertical', this.size ? "btn-group-".concat(this.size) : '', this.validated ? "was-validated" : ''];
      }

      return [this.validated ? "was-validated" : ''];
    },
    computedAriaInvalid: function computedAriaInvalid() {
      var ariaInvalid = this.ariaInvalid;

      if (ariaInvalid === true || ariaInvalid === 'true' || ariaInvalid === '') {
        return 'true';
      }

      return this.computedState === false ? 'true' : null;
    }
  },
  watch: {
    checked: function checked(newVal, oldVal) {
      this.localChecked = newVal;
    },
    localChecked: function localChecked(newVal, oldVal) {
      this.$emit('input', newVal);
    }
  },
  render: function render(h) {
    var _this = this;

    var inputs = this.formOptions.map(function (option, idx) {
      var uid = "_BV_option_".concat(idx, "_");
      return h(_this.isRadioGroup ? BFormRadio : BFormCheckbox, {
        key: uid,
        props: {
          id: _this.safeId(uid),
          value: option.value,
          // Individual radios or checks can be disabled in a group
          disabled: option.disabled || false // We don't need to include these, since the input's will know they are inside here
          // name: this.groupName,
          // form: this.form || null,
          // required: Boolean(this.name && this.required)

        }
      }, [h('span', {
        domProps: htmlOrText(option.html, option.text)
      })]);
    });
    return h('div', {
      class: this.groupClasses,
      attrs: {
        id: this.safeId(),
        role: this.isRadioGroup ? 'radiogroup' : 'group',
        // Tabindex to allow group to be focused if needed
        tabindex: '-1',
        'aria-required': this.required ? 'true' : null,
        'aria-invalid': this.computedAriaInvalid
      }
    }, [this.normalizeSlot('first'), inputs, this.normalizeSlot('default')]);
  }
};
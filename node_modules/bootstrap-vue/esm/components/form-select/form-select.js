function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import Vue from '../../utils/vue';
import idMixin from '../../mixins/id';
import formOptionsMixin from '../../mixins/form-options';
import formMixin from '../../mixins/form';
import formSizeMixin from '../../mixins/form-size';
import formStateMixin from '../../mixins/form-state';
import formCustomMixin from '../../mixins/form-custom';
import normalizeSlotMixin from '../../mixins/normalize-slot';
import { from as arrayFrom } from '../../utils/array';
import { htmlOrText } from '../../utils/html'; // @vue/component

export var BFormSelect =
/*#__PURE__*/
Vue.extend({
  name: 'BFormSelect',
  mixins: [idMixin, normalizeSlotMixin, formMixin, formSizeMixin, formStateMixin, formCustomMixin, formOptionsMixin],
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    value: {// type: [Object, Array, String, Number, Boolean],
      // default: undefined
    },
    multiple: {
      type: Boolean,
      default: false
    },
    selectSize: {
      // Browsers default size to 0, which shows 4 rows in most browsers in multiple mode
      // Size of 1 can bork out Firefox
      type: Number,
      default: 0
    },
    ariaInvalid: {
      type: [Boolean, String],
      default: false
    }
  },
  data: function data() {
    return {
      localValue: this.value
    };
  },
  computed: {
    computedSelectSize: function computedSelectSize() {
      // Custom selects with a size of zero causes the arrows to be hidden,
      // so dont render the size attribute in this case
      return !this.plain && this.selectSize === 0 ? null : this.selectSize;
    },
    inputClass: function inputClass() {
      return [this.plain ? 'form-control' : 'custom-select', this.size && this.plain ? "form-control-".concat(this.size) : null, this.size && !this.plain ? "custom-select-".concat(this.size) : null, this.stateClass];
    },
    computedAriaInvalid: function computedAriaInvalid() {
      if (this.ariaInvalid === true || this.ariaInvalid === 'true') {
        return 'true';
      }

      return this.stateClass === 'is-invalid' ? 'true' : null;
    }
  },
  watch: {
    value: function value(newVal, oldVal) {
      this.localValue = newVal;
    },
    localValue: function localValue(newVal, oldVal) {
      this.$emit('input', this.localValue);
    }
  },
  methods: {
    focus: function focus() {
      this.$refs.input.focus();
    },
    blur: function blur() {
      this.$refs.input.blur();
    }
  },
  render: function render(h) {
    var _this = this;

    var options = this.formOptions.map(function (option, index) {
      return h('option', {
        key: "option_".concat(index, "_opt"),
        attrs: {
          disabled: Boolean(option.disabled)
        },
        domProps: _objectSpread({}, htmlOrText(option.html, option.text), {
          value: option.value
        })
      });
    });
    return h('select', {
      ref: 'input',
      class: this.inputClass,
      directives: [{
        name: 'model',
        rawName: 'v-model',
        value: this.localValue,
        expression: 'localValue'
      }],
      attrs: {
        id: this.safeId(),
        name: this.name,
        form: this.form || null,
        multiple: this.multiple || null,
        size: this.computedSelectSize,
        disabled: this.disabled,
        required: this.required,
        'aria-required': this.required ? 'true' : null,
        'aria-invalid': this.computedAriaInvalid
      },
      on: {
        change: function change(evt) {
          var target = evt.target;
          var selectedVal = arrayFrom(target.options).filter(function (o) {
            return o.selected;
          }).map(function (o) {
            return '_value' in o ? o._value : o.value;
          });
          _this.localValue = target.multiple ? selectedVal : selectedVal[0];

          _this.$nextTick(function () {
            _this.$emit('change', _this.localValue);
          });
        }
      }
    }, [this.normalizeSlot('first'), options, this.normalizeSlot('default')]);
  }
});
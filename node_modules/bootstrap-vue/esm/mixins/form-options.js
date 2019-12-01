import { stripTags } from '../utils/html';
import { isArray, isPlainObject, isUndefined } from '../utils/inspect';
import { keys } from '../utils/object'; // @vue/component

export default {
  props: {
    options: {
      type: [Array, Object],
      default: function _default() {
        return [];
      }
    },
    valueField: {
      type: String,
      default: 'value'
    },
    textField: {
      type: String,
      default: 'text'
    },
    htmlField: {
      type: String,
      default: 'html'
    },
    disabledField: {
      type: String,
      default: 'disabled'
    }
  },
  computed: {
    formOptions: function formOptions() {
      var options = this.options;
      var valueField = this.valueField;
      var textField = this.textField;
      var htmlField = this.htmlField;
      var disabledField = this.disabledField;

      if (isArray(options)) {
        // Normalize flat-ish arrays to Array of Objects
        return options.map(function (option) {
          if (isPlainObject(option)) {
            var value = option[valueField];
            var text = String(option[textField]);
            return {
              value: isUndefined(value) ? text : value,
              text: stripTags(text),
              html: option[htmlField],
              disabled: Boolean(option[disabledField])
            };
          }

          return {
            value: option,
            text: stripTags(String(option)),
            disabled: false
          };
        });
      } else {
        // options is Object
        // Normalize Objects to Array of Objects
        return keys(options).map(function (key) {
          var option = options[key] || {};

          if (isPlainObject(option)) {
            var value = option[valueField];
            var text = option[textField];
            return {
              value: isUndefined(value) ? key : value,
              text: isUndefined(text) ? stripTags(String(key)) : stripTags(String(text)),
              html: option[htmlField],
              disabled: Boolean(option[disabledField])
            };
          }

          return {
            value: key,
            text: stripTags(String(option)),
            disabled: false
          };
        });
      }
    }
  }
};
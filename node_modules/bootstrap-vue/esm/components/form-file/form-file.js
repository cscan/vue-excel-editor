function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import Vue from '../../utils/vue';
import { from as arrayFrom, isArray, concat } from '../../utils/array';
import { getComponentConfig } from '../../utils/config';
import { isFile, isFunction, isUndefinedOrNull } from '../../utils/inspect';
import { File } from '../../utils/safe-types';
import { warn } from '../../utils/warn';
import formCustomMixin from '../../mixins/form-custom';
import formMixin from '../../mixins/form';
import formStateMixin from '../../mixins/form-state';
import idMixin from '../../mixins/id';
import normalizeSlotMixin from '../../mixins/normalize-slot';
var NAME = 'BFormFile'; // @vue/component

export var BFormFile =
/*#__PURE__*/
Vue.extend({
  name: NAME,
  mixins: [idMixin, formMixin, formStateMixin, formCustomMixin, normalizeSlotMixin],
  inheritAttrs: false,
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    size: {
      type: String,
      default: function _default() {
        return getComponentConfig('BFormControl', 'size');
      }
    },
    value: {
      type: [File, Array],
      default: null,
      validator: function validator(val) {
        /* istanbul ignore next */
        if (val === '') {
          warn("".concat(NAME, " - setting value/v-model to an empty string for reset is deprecated. Set to 'null' instead"));
          return true;
        }

        return isUndefinedOrNull(val) || isFile(val) || isArray(val) && (val.length === 0 || val.every(isFile));
      }
    },
    accept: {
      type: String,
      default: ''
    },
    // Instruct input to capture from camera
    capture: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: function _default() {
        return getComponentConfig(NAME, 'placeholder');
      }
    },
    browseText: {
      type: String,
      default: function _default() {
        return getComponentConfig(NAME, 'browseText');
      }
    },
    dropPlaceholder: {
      type: String,
      default: function _default() {
        return getComponentConfig(NAME, 'dropPlaceholder');
      }
    },
    multiple: {
      type: Boolean,
      default: false
    },
    directory: {
      type: Boolean,
      default: false
    },
    noTraverse: {
      type: Boolean,
      default: false
    },
    noDrop: {
      type: Boolean,
      default: false
    },
    fileNameFormatter: {
      type: Function,
      default: null
    }
  },
  data: function data() {
    return {
      selectedFile: null,
      dragging: false,
      hasFocus: false
    };
  },
  computed: {
    selectLabel: function selectLabel() {
      // Draging active
      if (this.dragging && this.dropPlaceholder) {
        return this.dropPlaceholder;
      } // No file chosen


      if (!this.selectedFile || this.selectedFile.length === 0) {
        return this.placeholder;
      } // Convert selectedFile to an array (if not already one)


      var files = concat(this.selectedFile).filter(Boolean);

      if (this.hasNormalizedSlot('file-name')) {
        // There is a slot for formatting the files/names
        return [this.normalizeSlot('file-name', {
          files: files,
          names: files.map(function (f) {
            return f.name;
          })
        })];
      } else {
        // Use the user supplied formatter, or the built in one.
        return isFunction(this.fileNameFormatter) ? String(this.fileNameFormatter(files)) : files.map(function (file) {
          return file.name;
        }).join(', ');
      }
    }
  },
  watch: {
    selectedFile: function selectedFile(newVal, oldVal) {
      // The following test is needed when the file input is "reset" or the
      // exact same file(s) are selected to prevent an infinite loop.
      // When in `multiple` mode we need to check for two empty arrays or
      // two arrays with identical files
      if (newVal === oldVal || isArray(newVal) && isArray(oldVal) && newVal.length === oldVal.length && newVal.every(function (v, i) {
        return v === oldVal[i];
      })) {
        return;
      }

      if (!newVal && this.multiple) {
        this.$emit('input', []);
      } else {
        this.$emit('input', newVal);
      }
    },
    value: function value(newVal) {
      if (!newVal || isArray(newVal) && newVal.length === 0) {
        this.reset();
      }
    }
  },
  methods: {
    focusHandler: function focusHandler(evt) {
      // Bootstrap v4 doesn't have focus styling for custom file input
      // Firefox has a '[type=file]:focus ~ sibling' selector issue,
      // so we add a 'focus' class to get around these bugs
      if (this.plain || evt.type === 'focusout') {
        this.hasFocus = false;
      } else {
        // Add focus styling for custom file input
        this.hasFocus = true;
      }
    },
    reset: function reset() {
      try {
        // Wrapped in try in case IE 11 craps out
        this.$refs.input.value = '';
      } catch (e) {} // IE 11 doesn't support setting `input.value` to '' or null
      // So we use this little extra hack to reset the value, just in case.
      // This also appears to work on modern browsers as well.


      this.$refs.input.type = '';
      this.$refs.input.type = 'file';
      this.selectedFile = this.multiple ? [] : null;
    },
    onFileChange: function onFileChange(evt) {
      var _this = this;

      // Always emit original event
      this.$emit('change', evt); // Check if special `items` prop is available on event (drop mode)
      // Can be disabled by setting no-traverse

      var items = evt.dataTransfer && evt.dataTransfer.items;
      /* istanbul ignore next: not supported in JSDOM */

      if (items && !this.noTraverse) {
        var queue = [];

        for (var i = 0; i < items.length; i++) {
          var item = items[i].webkitGetAsEntry();

          if (item) {
            queue.push(this.traverseFileTree(item));
          }
        }

        Promise.all(queue).then(function (filesArr) {
          _this.setFiles(arrayFrom(filesArr));
        });
        return;
      } // Normal handling


      this.setFiles(evt.target.files || evt.dataTransfer.files);
    },
    setFiles: function setFiles() {
      var files = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      if (!files) {
        /* istanbul ignore next: this will probably not happen */
        this.selectedFile = null;
      } else if (this.multiple) {
        // Convert files to array
        var filesArray = [];

        for (var i = 0; i < files.length; i++) {
          filesArray.push(files[i]);
        } // Return file(s) as array


        this.selectedFile = filesArray;
      } else {
        // Return single file object
        this.selectedFile = files[0] || null;
      }
    },
    onReset: function onReset() {
      // Triggered when the parent form (if any) is reset
      this.selectedFile = this.multiple ? [] : null;
    },
    onDragover: function onDragover(evt)
    /* istanbul ignore next: difficult to test in JSDOM */
    {
      evt.preventDefault();
      evt.stopPropagation();

      if (this.noDrop || !this.custom) {
        return;
      }

      this.dragging = true;
      evt.dataTransfer.dropEffect = 'copy';
    },
    onDragleave: function onDragleave(evt)
    /* istanbul ignore next: difficult to test in JSDOM */
    {
      evt.preventDefault();
      evt.stopPropagation();
      this.dragging = false;
    },
    onDrop: function onDrop(evt)
    /* istanbul ignore next: difficult to test in JSDOM */
    {
      evt.preventDefault();
      evt.stopPropagation();

      if (this.noDrop) {
        return;
      }

      this.dragging = false;

      if (evt.dataTransfer.files && evt.dataTransfer.files.length > 0) {
        this.onFileChange(evt);
      }
    },
    traverseFileTree: function traverseFileTree(item, path)
    /* istanbul ignore next: not supported in JSDOM */
    {
      var _this2 = this;

      // Based on http://stackoverflow.com/questions/3590058
      return new Promise(function (resolve) {
        path = path || '';

        if (item.isFile) {
          // Get file
          item.file(function (file) {
            file.$path = path; // Inject $path to file obj

            resolve(file);
          });
        } else if (item.isDirectory) {
          // Get folder contents
          item.createReader().readEntries(function (entries) {
            var queue = [];

            for (var i = 0; i < entries.length; i++) {
              queue.push(_this2.traverseFileTree(entries[i], path + item.name + '/'));
            }

            Promise.all(queue).then(function (filesArr) {
              resolve(arrayFrom(filesArr));
            });
          });
        }
      });
    }
  },
  render: function render(h) {
    // Form Input
    var input = h('input', {
      ref: 'input',
      class: [{
        'form-control-file': this.plain,
        'custom-file-input': this.custom,
        focus: this.custom && this.hasFocus
      }, this.stateClass],
      attrs: _objectSpread({}, this.$attrs, {
        type: 'file',
        id: this.safeId(),
        name: this.name,
        disabled: this.disabled,
        required: this.required,
        form: this.form || null,
        capture: this.capture || null,
        accept: this.accept || null,
        multiple: this.multiple,
        webkitdirectory: this.directory,
        'aria-required': this.required ? 'true' : null
      }),
      on: {
        change: this.onFileChange,
        focusin: this.focusHandler,
        focusout: this.focusHandler,
        reset: this.onReset
      }
    });

    if (this.plain) {
      return input;
    } // Overlay Labels


    var label = h('label', {
      staticClass: 'custom-file-label',
      class: [this.dragging ? 'dragging' : null],
      attrs: {
        for: this.safeId(),
        'data-browse': this.browseText || null
      }
    }, this.selectLabel); // Return rendered custom file input

    return h('div', {
      staticClass: 'custom-file b-form-file',
      class: [this.stateClass, _defineProperty({}, "b-custom-control-".concat(this.size), Boolean(this.size))],
      attrs: {
        id: this.safeId('_BV_file_outer_')
      },
      on: {
        dragover: this.onDragover,
        dragleave: this.onDragleave,
        drop: this.onDrop
      }
    }, [input, label]);
  }
});
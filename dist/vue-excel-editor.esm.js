import draggable from 'vuedraggable';
import XLSX from 'xlsx';
import moment from 'moment';

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var script = {
  props: {
    value: {
      type: String,
      default: ''
    },
    interactive: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      uid: '',
      table: null,
      cell: null,
      row: null,
      colPos: 0,
      rect: null
    };
  },

  computed: {
    listeners() {
      return { ...this.$listeners,
        input: this.onInput
      };
    },

    err() {
      if (this.validate) return this.validate(this.value);
      return '';
    },

    filterRowTop() {
      if (this.cell) return {
        top: this.cell.offsetTop + 'px'
      };else return {};
    }

  },
  watch: {
    value(newVal) {
      if (newVal !== this.$el.textContent) this.$refs.cell.textContent = newVal;
    }

  },

  mounted() {
    this.uid = 'uid' + this._uid; // remember the first value
    // Convert the value into html

    this.cell = this.$refs.cell;
    this.cell.textContent = this.value; // Store the DOM neighbour

    this.row = this.cell.parentNode;
    this.thead = this.row.parentNode;
    this.colPos = Array.from(this.row.children).indexOf(this.cell) - 1;
    this.colLabel = this.thead.children[0].children[this.colPos + 1];
  },

  methods: {
    updateValue(e) {
      const content = e.target.textContent;
      if (this.value !== content) this.$emit('input', content);
    },

    onInput(e) {
      if (this.interactive) this.updateValue(e);
    },

    onFocus() {
      setTimeout(() => {
        this.colLabel.classList.add('focus');
        document.execCommand('selectAll', false, null);
        this.$parent.currentColPos = this.colPos;
        this.$parent.currentRowPos = -1;
        this.$parent.labelTr.children[this.$parent.currentColPos + 1].classList.add('focus');
      }, 0);
    },

    onBlur(e) {
      this.updateValue(e);
      this.colLabel.classList.remove('focus');
      e.target.classList.remove('edit');
    },

    keyWest(e) {
      const sel = document.getSelection();

      if (e.target.textContent === sel.toString() || sel.focusOffset === 0) {
        let td = e.target.previousSibling;
        if (td && td.style && td.style.display === 'none') td = td.previousSibling;
        if (!td) return td;
        if (!td.tagName) td = td.previousSibling;
        if (td.focus) td.focus();
        return td;
      }
    },

    keyEast(e) {
      const sel = document.getSelection();

      if (e.target.textContent === sel.toString() || sel.focusOffset >= e.target.textContent.length) {
        let td = e.target.nextSibling;
        if (td && td.style && td.style.display === 'none') td = td.nextSibling;
        if (!td) return td;
        if (!td.tagName) td = td.nextSibling;
        if (td.focus) td.focus();
        return td;
      }

      return e.target;
    },

    keyEnter(e) {
      e.preventDefault();
      document.execCommand('selectAll', false, null); // if (!this.$parent.keyEast(e))

      this.updateValue(e);
    },

    keyDelete(e) {
      if (e.target.textContent === '') setTimeout(this.updateValue(e), 0);
    },

    mouseMove(e) {
      this.cell.style.cursor = this.cell.offsetWidth - e.offsetX < 15 ? 'pointer' : 'text';
    },

    mouseDown(e) {
      if (e.button === 0 && this.cell.offsetWidth - e.offsetX < 15) {
        e.preventDefault();
        setTimeout(() => {
          // this.$parent.showFilterPanel(this)
          this.$parent.$refs.panelFilter.showPanel(this);
        }, 0);
      }
    }

  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

const isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return (id, style) => addStyle(id, style);
}
let HEAD;
const styles = {};
function addStyle(id, css) {
    const group = isOldIE ? css.media || 'default' : id;
    const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        let code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                style.element.setAttribute('media', css.media);
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            const index = style.ids.size - 1;
            const textNode = document.createTextNode(code);
            const nodes = style.element.childNodes;
            if (nodes[index])
                style.element.removeChild(nodes[index]);
            if (nodes.length)
                style.element.insertBefore(textNode, nodes[index]);
            else
                style.element.appendChild(textNode);
        }
    }
}

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "td",
    _vm._g(
      {
        ref: "cell",
        staticClass: "cell column-filter",
        style: _vm.filterRowTop,
        attrs: {
          id: _vm.uid,
          contenteditable: "",
          ondragenter:
            "event.preventDefault(); event.dataTransfer.dropEffect = 'none'",
          ondragover:
            "event.preventDefault(); event.dataTransfer.dropEffect = 'none'",
          autocomplete: "off",
          autocorrect: "off",
          autocapitalize: "off",
          spellcheck: "false"
        },
        on: {
          focus: _vm.onFocus,
          blur: _vm.onBlur,
          keydown: [
            function($event) {
              if (!$event.type.indexOf("key") && $event.keyCode !== 37) {
                return null
              }
              if (
                $event.ctrlKey ||
                $event.shiftKey ||
                $event.altKey ||
                $event.metaKey
              ) {
                return null
              }
              return _vm.keyWest($event)
            },
            function($event) {
              if (!$event.type.indexOf("key") && $event.keyCode !== 39) {
                return null
              }
              if (
                $event.ctrlKey ||
                $event.shiftKey ||
                $event.altKey ||
                $event.metaKey
              ) {
                return null
              }
              return _vm.keyEast($event)
            },
            function($event) {
              if (
                !$event.type.indexOf("key") &&
                _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")
              ) {
                return null
              }
              if (
                $event.ctrlKey ||
                $event.shiftKey ||
                $event.altKey ||
                $event.metaKey
              ) {
                return null
              }
              return _vm.keyEnter($event)
            }
          ],
          keyup: function($event) {
            if (
              !$event.type.indexOf("key") &&
              _vm._k($event.keyCode, "delete", [8, 46], $event.key, [
                "Backspace",
                "Delete",
                "Del"
              ])
            ) {
              return null
            }
            if (
              $event.ctrlKey ||
              $event.shiftKey ||
              $event.altKey ||
              $event.metaKey
            ) {
              return null
            }
            return _vm.keyDelete($event)
          },
          mousemove: _vm.mouseMove,
          mousedown: _vm.mouseDown
        }
      },
      _vm.listeners
    )
  )
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-5c277c28_0", { source: "\n.column-filter[data-v-5c277c28] {\n  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHsAAABuCAMAAAAwApxlAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAE4UExURQAAAAAAAICAgFVVVUBAQICAgGZmZoCAgJKSko6OjmZmZoCAgHZ2doCAgIiIiHh4eIeHh4CAgHl5eXl5eYaGhoWFhYCAgIWFhXt7e4SEhIODg4CAgICAgH19fYKCgoCAgISEhIKCgn19fX19fYKCgoCAgH5+foGBgX5+foCAgHx8fH19fYCAgH5+foCAgHx8fH5+fn5+foGBgYCAgH5+fn5+foCAgIODg4CAgIGBgYODg3x8fICAgIGBgYCAgICAgH9/f39/f4CAgH9/f4CAgICAgH9/f4CAgIGBgYSEhIODg39/f4CAgH9/f4CAgICAgICAgH9/f4CAgH5+fn9/f35+foCAgIKCgoSEhIODg39/f4CAgIKCgoSEhH9/f4GBgYKCgoODg4SEhIWFhYaGhoeHh4iIiImJiW6rGxQAAABedFJOUwABAgMEBAUGBwkKCg0ODxEREhMVFRcYGRsfJSowMTE0NDU7Pz9CQ0VNUFReXl9gZ2ttb3BxdXh5fH19f4CAgoWLkZqbnqChoaSkqqurra28wsXFydXW1tbq7u/x+fuJeTf3AAAACXBIWXMAABbqAAAW6gHljkMQAAABFUlEQVRoQ+3X11LCUBSF4RAEVFCwYEXFgr0g9gLYexcbahLDOcn7v4HArGfYmWHWd7X/q3O39xyDiIiIiIiIiIgoKOHORLwNs7DuhVK5tDyEkrX45Svv9wAla8e3LEvd9CElmXu6/nbtIY0WtaEcx9EXHUhRmdv3t8rjPEpYOjc3O4yZqFWlxrOZILZa3cjx88vTySRKVl65f653GkVKihS95j4fQEsy95t37K4fLWrpR9eUexRCihosXJ6dH46ihMWSval2zEQtyhzLb65PhVGyZl6r39XKKkrWlmfbtneVQEqKFBt/A/c+iFsS2m3cMX3dhRaV+/C1/7mGkhWfWNkuTPegxEVjGIiIiIiIiIiIiIJlGP8KtCi1NMvKyQAAAABJRU5ErkJggg==');\n  background-repeat: no-repeat;\n  background-size: 36px;\n  background-position: right -12px top -1px;\n}\n\n", map: {"version":3,"sources":["/Users/can/vuejs/hello-world/plugins/VueExcelEditor/src/VueExcelFilter.vue"],"names":[],"mappings":";AAkJA;EACA,+mCAAA;EACA,4BAAA;EACA,qBAAA;EACA,yCAAA;AACA","file":"VueExcelFilter.vue","sourcesContent":["<template>\n  <td\n    :id=\"uid\"\n    ref=\"cell\"\n    contenteditable\n    ondragenter=\"event.preventDefault(); event.dataTransfer.dropEffect = 'none'\"\n    ondragover=\"event.preventDefault(); event.dataTransfer.dropEffect = 'none'\"\n    class=\"cell column-filter\"\n    :style=\"filterRowTop\"\n    autocomplete=\"off\" autocorrect=\"off\" autocapitalize=\"off\" spellcheck=\"false\"\n    v-on=\"listeners\"\n    @focus=\"onFocus\"\n    @blur=\"onBlur\"\n    @keydown.exact.37=\"keyWest\"\n    @keydown.exact.39=\"keyEast\"\n    @keydown.exact.enter=\"keyEnter\"\n    @keyup.exact.delete=\"keyDelete\"\n    @mousemove=\"mouseMove\"\n    @mousedown=\"mouseDown\" />\n</template>\n\n<script>\nexport default {\n  props: {\n    value: {type: String, default: ''},\n    interactive: {type: Boolean, default: false}\n  },\n  data () {\n    return {\n      uid: '',\n      table: null,\n      cell: null,\n      row: null,\n      colPos: 0,\n      rect: null\n    }\n  },\n  computed: {\n    listeners () {\n      return {\n        ...this.$listeners, input: this.onInput\n      }\n    },\n    err () {\n      if (this.validate)\n        return this.validate(this.value)\n      return ''\n    },\n    filterRowTop () {\n      if (this.cell) return {top: this.cell.offsetTop + 'px'}\n      else return {}\n    },\n  },\n  watch: {\n    value (newVal) {\n      if (newVal !== this.$el.textContent)\n        this.$refs.cell.textContent = newVal\n    }\n  },\n  mounted () {\n    this.uid = 'uid' + this._uid\n    // remember the first value\n\n    // Convert the value into html\n    this.cell = this.$refs.cell\n    this.cell.textContent = this.value\n\n    // Store the DOM neighbour\n    this.row = this.cell.parentNode\n    this.thead = this.row.parentNode\n    this.colPos = Array.from(this.row.children).indexOf(this.cell) - 1\n    this.colLabel = this.thead.children[0].children[this.colPos + 1]\n  },\n  methods: {\n    updateValue (e) {\n      const content = e.target.textContent\n      if (this.value !== content)\n        this.$emit('input', content)\n    },\n    onInput (e) {\n      if (this.interactive)\n        this.updateValue(e)\n    },\n    onFocus () {\n      setTimeout(() => {\n        this.colLabel.classList.add('focus')\n        document.execCommand('selectAll', false, null)\n        this.$parent.currentColPos = this.colPos\n        this.$parent.currentRowPos = -1\n        this.$parent.labelTr.children[this.$parent.currentColPos + 1].classList.add('focus')\n      }, 0)\n    },\n    onBlur (e) {\n      this.updateValue(e)\n      this.colLabel.classList.remove('focus')\n      e.target.classList.remove('edit')\n    },\n    keyWest (e) {\n      const sel = document.getSelection()\n      if (e.target.textContent === sel.toString() || sel.focusOffset === 0) {\n        let td = e.target.previousSibling\n        if (td && td.style && td.style.display === 'none') td = td.previousSibling\n        if (!td) return td\n        if (!td.tagName) td = td.previousSibling\n        if (td.focus) td.focus()\n        return td\n      }\n    },\n    keyEast (e) {\n      const sel = document.getSelection()\n      if (e.target.textContent === sel.toString() || sel.focusOffset >= e.target.textContent.length) {\n        let td = e.target.nextSibling\n        if (td && td.style && td.style.display === 'none') td = td.nextSibling\n        if (!td) return td\n        if (!td.tagName) td = td.nextSibling\n        if (td.focus) td.focus()\n        return td\n      }\n      return e.target\n    },\n    keyEnter (e) {\n      e.preventDefault()\n      document.execCommand('selectAll', false, null)\n      // if (!this.$parent.keyEast(e))\n      this.updateValue(e)\n    },\n    keyDelete (e) {\n      if (e.target.textContent === '')\n        setTimeout(this.updateValue(e), 0)\n    },\n    mouseMove (e) {\n      this.cell.style.cursor = this.cell.offsetWidth - e.offsetX < 15 ? 'pointer' : 'text'\n    },\n    mouseDown (e) {\n      if (e.button === 0 && this.cell.offsetWidth - e.offsetX < 15) {\n        e.preventDefault()\n        setTimeout(() => {\n          // this.$parent.showFilterPanel(this)\n          this.$parent.$refs.panelFilter.showPanel(this)\n        }, 0)\n      }\n    }\n  }\n}\n</script>\n<style scoped>\n.column-filter {\n  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHsAAABuCAMAAAAwApxlAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAE4UExURQAAAAAAAICAgFVVVUBAQICAgGZmZoCAgJKSko6OjmZmZoCAgHZ2doCAgIiIiHh4eIeHh4CAgHl5eXl5eYaGhoWFhYCAgIWFhXt7e4SEhIODg4CAgICAgH19fYKCgoCAgISEhIKCgn19fX19fYKCgoCAgH5+foGBgX5+foCAgHx8fH19fYCAgH5+foCAgHx8fH5+fn5+foGBgYCAgH5+fn5+foCAgIODg4CAgIGBgYODg3x8fICAgIGBgYCAgICAgH9/f39/f4CAgH9/f4CAgICAgH9/f4CAgIGBgYSEhIODg39/f4CAgH9/f4CAgICAgICAgH9/f4CAgH5+fn9/f35+foCAgIKCgoSEhIODg39/f4CAgIKCgoSEhH9/f4GBgYKCgoODg4SEhIWFhYaGhoeHh4iIiImJiW6rGxQAAABedFJOUwABAgMEBAUGBwkKCg0ODxEREhMVFRcYGRsfJSowMTE0NDU7Pz9CQ0VNUFReXl9gZ2ttb3BxdXh5fH19f4CAgoWLkZqbnqChoaSkqqurra28wsXFydXW1tbq7u/x+fuJeTf3AAAACXBIWXMAABbqAAAW6gHljkMQAAABFUlEQVRoQ+3X11LCUBSF4RAEVFCwYEXFgr0g9gLYexcbahLDOcn7v4HArGfYmWHWd7X/q3O39xyDiIiIiIiIiIgoKOHORLwNs7DuhVK5tDyEkrX45Svv9wAla8e3LEvd9CElmXu6/nbtIY0WtaEcx9EXHUhRmdv3t8rjPEpYOjc3O4yZqFWlxrOZILZa3cjx88vTySRKVl65f653GkVKihS95j4fQEsy95t37K4fLWrpR9eUexRCihosXJ6dH46ihMWSval2zEQtyhzLb65PhVGyZl6r39XKKkrWlmfbtneVQEqKFBt/A/c+iFsS2m3cMX3dhRaV+/C1/7mGkhWfWNkuTPegxEVjGIiIiIiIiIiIiIJlGP8KtCi1NMvKyQAAAABJRU5ErkJggg==');\n  background-repeat: no-repeat;\n  background-size: 36px;\n  background-position: right -12px top -1px;\n}\n\n</style>\n"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = "data-v-5c277c28";
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__ = normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    createInjector,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var script$1 = {
  props: {
    nFilterCount: {
      type: Number,
      default: 200
    },
    // show top n values in filter dialog
    localizedLabel: {
      type: Object,

      default() {
        return {
          sortingAndFiltering: 'Sorting And Filtering',
          sortAscending: 'Sort Ascending',
          sortDescending: 'Sort Descending',
          near: '≒ Near',
          exactMatch: '= Exact Match',
          greaterThan: '&gt; Greater Than',
          greaterThanOrEqualTo: '≥ Greater Than or Equal To',
          lessThan: '&lt; Less Than',
          lessThanOrEqualTo: '≤ Less Than Or Equal To',
          regularExpression: '~ Regular Expression',
          customFilter: 'Custom Filter',
          listFirstNValuesOnly: n => `List first ${n} values only`,
          apply: 'Apply'
        };
      }

    }
  },

  data() {
    return {
      show: false,
      showDropdown: false,
      processing: false,
      columnFilterRef: null,
      inputFilter: '',
      inputFilterCondition: '',
      sortedUniqueValueList: []
    };
  },

  computed: {
    filteredSortedUniqueValueList() {
      const filter = this.inputFilter.toUpperCase();
      return this.sortedUniqueValueList.filter(item => item.toUpperCase().startsWith(filter));
    },

    symbol() {
      switch (this.inputFilterCondition) {
        case '':
          return '≒';

        case '<=':
          return '≤';

        case '>=':
          return '≥';

        default:
          return this.inputFilterCondition;
      }
    }

  },
  methods: {
    clickOutside(e) {
      if (e.target.id === 'panelModal') this.hidePanel();
    },

    sort(direction) {
      this.hidePanel();
      this.$parent.sort(direction, this.columnFilterRef.colPos);
    },

    setFilterCondition(choice) {
      this.showDropdown = false;
      this.inputFilterCondition = choice;
      this.$refs.inputFilter.focus();
    },

    freezePanelSizeAfterShown() {
      const target = this.$refs.panelList;
      const rect = target.getBoundingClientRect();
      target.setAttribute('style', `width:${rect.width}px; height:${rect.height}px;`);
    },

    removePanelSizeAfterHide() {
      const target = this.$refs.panelList;
      target.removeAttribute('style');
    },

    doInputFilter() {
      if (window.delay) clearTimeout(window.delay);
      window.delay = setTimeout(() => {
        this.inputFilter = this.$refs.inputFilter.value;
      }, 200);
    },

    doFilter() {
      const opt = this.inputFilterCondition + this.$refs.inputFilter.value;
      this.columnFilterRef.$el.textContent = opt;
      this.columnFilterRef.$emit('input', opt);
      this.hidePanel();
    },

    filterPanelSelect(opt) {
      // this.columnFilter[this.columnFilterRef.colPos] = el  // Cannot use this, dunno why
      this.columnFilterRef.$el.textContent = '=' + opt;
      this.columnFilterRef.$emit('input', '=' + opt);
      this.hidePanel();
    },

    showPanel(ref) {
      this.columnFilterRef = ref;
      this.inputFilter = '';
      this.inputFilterCondition = '';
      this.sortedUniqueValueList = [];
      this.$refs.inputFilter.value = '';
      this.show = true;
      this.columnFilterRef.$el.textContent = '';
      this.columnFilterRef.$emit('input', '');
      setTimeout(() => this.$refs.inputFilter.focus());
      const hash = {};
      const fieldName = this.$parent.fields[ref.colPos].name;
      this.$parent.table.forEach(record => hash[record[fieldName]] = true);
      const keys = Object.keys(hash);
      keys.sort();
      if (keys.length > 0 && keys[0] === '') keys[0] = ' ';
      this.sortedUniqueValueList = keys;
      setTimeout(() => this.freezePanelSizeAfterShown());
    },

    hidePanel() {
      this.show = false;
      this.removePanelSizeAfterHide();
      setTimeout(() => {
        this.sortedUniqueValueList = [];
      }, 0);
    }

  }
};

/* script */
const __vue_script__$1 = script$1;

/* template */
var __vue_render__$1 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    {
      directives: [
        { name: "show", rawName: "v-show", value: _vm.show, expression: "show" }
      ],
      staticClass: "panel-modal",
      attrs: { id: "panelModal" },
      on: {
        click: _vm.clickOutside,
        keydown: function($event) {
          if (
            !$event.type.indexOf("key") &&
            _vm._k($event.keyCode, "esc", 27, $event.key, ["Esc", "Escape"])
          ) {
            return null
          }
          if (
            $event.ctrlKey ||
            $event.shiftKey ||
            $event.altKey ||
            $event.metaKey
          ) {
            return null
          }
          return _vm.hidePanel($event)
        }
      }
    },
    [
      _c("div", { ref: "panelFilter", staticClass: "panel-body" }, [
        _c("div", { staticClass: "panel-title" }, [
          _c(
            "svg",
            {
              staticClass: "svg-inline--fa fa-sort-amount-down fa-w-16 fa-1x",
              attrs: {
                "aria-hidden": "true",
                focusable: "false",
                "data-prefix": "fas",
                "data-icon": "sort-amount-down",
                role: "img",
                xmlns: "http://www.w3.org/2000/svg",
                viewBox: "0 0 512 512"
              }
            },
            [
              _c("path", {
                attrs: {
                  fill: "currentColor",
                  d:
                    "M304 416h-64a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h64a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm-128-64h-48V48a16 16 0 0 0-16-16H80a16 16 0 0 0-16 16v304H16c-14.19 0-21.37 17.24-11.29 27.31l80 96a16 16 0 0 0 22.62 0l80-96C197.35 369.26 190.22 352 176 352zm256-192H240a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h192a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm-64 128H240a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h128a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zM496 32H240a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h256a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"
                }
              })
            ]
          ),
          _vm._v(" "),
          _c("span", {
            domProps: {
              innerHTML: _vm._s(_vm.localizedLabel.sortingAndFiltering)
            }
          })
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "panel-content" }, [
          _c("div", { staticClass: "panel-action" }, [
            _c(
              "button",
              {
                staticClass: "panel-button float-left",
                on: {
                  click: function($event) {
                    return _vm.sort(1)
                  }
                }
              },
              [
                _c(
                  "svg",
                  {
                    staticClass: "svg-inline--fa fa-sort-alpha-down fa-w-14",
                    attrs: {
                      "aria-hidden": "true",
                      focusable: "false",
                      "data-prefix": "fas",
                      "data-icon": "sort-alpha-down",
                      role: "img",
                      xmlns: "http://www.w3.org/2000/svg",
                      viewBox: "0 0 448 512"
                    }
                  },
                  [
                    _c("path", {
                      attrs: {
                        fill: "currentColor",
                        d:
                          "M176 352h-48V48a16 16 0 0 0-16-16H80a16 16 0 0 0-16 16v304H16c-14.19 0-21.36 17.24-11.29 27.31l80 96a16 16 0 0 0 22.62 0l80-96C197.35 369.26 190.22 352 176 352zm240-64H288a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h56l-61.26 70.45A32 32 0 0 0 272 446.37V464a16 16 0 0 0 16 16h128a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16h-56l61.26-70.45A32 32 0 0 0 432 321.63V304a16 16 0 0 0-16-16zm31.06-85.38l-59.27-160A16 16 0 0 0 372.72 32h-41.44a16 16 0 0 0-15.07 10.62l-59.27 160A16 16 0 0 0 272 224h24.83a16 16 0 0 0 15.23-11.08l4.42-12.92h71l4.41 12.92A16 16 0 0 0 407.16 224H432a16 16 0 0 0 15.06-21.38zM335.61 144L352 96l16.39 48z"
                      }
                    })
                  ]
                ),
                _vm._v(" "),
                _c("span", {
                  domProps: {
                    innerHTML: _vm._s(_vm.localizedLabel.sortAscending)
                  }
                })
              ]
            ),
            _vm._v(" "),
            _c(
              "button",
              {
                staticClass: "panel-button float-right",
                on: {
                  click: function($event) {
                    return _vm.sort(-1)
                  }
                }
              },
              [
                _c(
                  "svg",
                  {
                    staticClass: "svg-inline--fa fa-sort-alpha-up-alt fa-w-14",
                    attrs: {
                      "aria-hidden": "true",
                      focusable: "false",
                      "data-prefix": "fas",
                      "data-icon": "sort-alpha-up-alt",
                      role: "img",
                      xmlns: "http://www.w3.org/2000/svg",
                      viewBox: "0 0 448 512"
                    }
                  },
                  [
                    _c("path", {
                      attrs: {
                        fill: "currentColor",
                        d:
                          "M16 160h48v304a16 16 0 0 0 16 16h32a16 16 0 0 0 16-16V160h48c14.21 0 21.38-17.24 11.31-27.31l-80-96a16 16 0 0 0-22.62 0l-80 96C-5.35 142.74 1.78 160 16 160zm272 64h128a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16h-56l61.26-70.45A32 32 0 0 0 432 65.63V48a16 16 0 0 0-16-16H288a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h56l-61.26 70.45A32 32 0 0 0 272 190.37V208a16 16 0 0 0 16 16zm159.06 234.62l-59.27-160A16 16 0 0 0 372.72 288h-41.44a16 16 0 0 0-15.07 10.62l-59.27 160A16 16 0 0 0 272 480h24.83a16 16 0 0 0 15.23-11.08l4.42-12.92h71l4.41 12.92A16 16 0 0 0 407.16 480H432a16 16 0 0 0 15.06-21.38zM335.61 400L352 352l16.39 48z"
                      }
                    })
                  ]
                ),
                _vm._v(" "),
                _c("span", {
                  domProps: {
                    innerHTML: _vm._s(_vm.localizedLabel.sortDescending)
                  }
                })
              ]
            )
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "panel-action" }, [
            _c("div", [
              _c(
                "button",
                {
                  staticClass: "panel-input-button",
                  on: {
                    click: function($event) {
                      _vm.showDropdown = !_vm.showDropdown;
                    }
                  }
                },
                [_vm._v(_vm._s(_vm.symbol))]
              ),
              _vm._v(" "),
              _c(
                "div",
                {
                  staticClass: "panel-dropdown",
                  class: { show: _vm.showDropdown }
                },
                [
                  _c(
                    "div",
                    {
                      staticClass: "panel-dropdown-item",
                      on: {
                        click: function($event) {
                          $event.preventDefault();
                          return _vm.setFilterCondition("")
                        }
                      }
                    },
                    [
                      _c("span", {
                        domProps: { innerHTML: _vm._s(_vm.localizedLabel.near) }
                      })
                    ]
                  ),
                  _vm._v(" "),
                  _c(
                    "div",
                    {
                      staticClass: "panel-dropdown-item",
                      on: {
                        click: function($event) {
                          $event.preventDefault();
                          return _vm.setFilterCondition("=")
                        }
                      }
                    },
                    [
                      _c("span", {
                        domProps: {
                          innerHTML: _vm._s(_vm.localizedLabel.exactMatch)
                        }
                      })
                    ]
                  ),
                  _vm._v(" "),
                  _c(
                    "div",
                    {
                      staticClass: "panel-dropdown-item",
                      on: {
                        click: function($event) {
                          $event.preventDefault();
                          return _vm.setFilterCondition(">")
                        }
                      }
                    },
                    [
                      _c("span", {
                        domProps: {
                          innerHTML: _vm._s(_vm.localizedLabel.greaterThan)
                        }
                      })
                    ]
                  ),
                  _vm._v(" "),
                  _c(
                    "div",
                    {
                      staticClass: "panel-dropdown-item",
                      on: {
                        click: function($event) {
                          $event.preventDefault();
                          return _vm.setFilterCondition(">=")
                        }
                      }
                    },
                    [
                      _c("span", {
                        domProps: {
                          innerHTML: _vm._s(
                            _vm.localizedLabel.greaterThanOrEqualTo
                          )
                        }
                      })
                    ]
                  ),
                  _vm._v(" "),
                  _c(
                    "div",
                    {
                      staticClass: "panel-dropdown-item",
                      on: {
                        click: function($event) {
                          $event.preventDefault();
                          return _vm.setFilterCondition("<")
                        }
                      }
                    },
                    [
                      _c("span", {
                        domProps: {
                          innerHTML: _vm._s(_vm.localizedLabel.lessThan)
                        }
                      })
                    ]
                  ),
                  _vm._v(" "),
                  _c(
                    "div",
                    {
                      staticClass: "panel-dropdown-item",
                      on: {
                        click: function($event) {
                          $event.preventDefault();
                          return _vm.setFilterCondition("<=")
                        }
                      }
                    },
                    [
                      _c("span", {
                        domProps: {
                          innerHTML: _vm._s(
                            _vm.localizedLabel.lessThanOrEqualTo
                          )
                        }
                      })
                    ]
                  ),
                  _vm._v(" "),
                  _c(
                    "div",
                    {
                      staticClass: "panel-dropdown-item",
                      on: {
                        click: function($event) {
                          $event.preventDefault();
                          return _vm.setFilterCondition("~")
                        }
                      }
                    },
                    [
                      _c("span", {
                        domProps: {
                          innerHTML: _vm._s(
                            _vm.localizedLabel.regularExpression
                          )
                        }
                      })
                    ]
                  )
                ]
              ),
              _vm._v(" "),
              _c("span", { staticClass: "panel-input-b" }, [
                _c("input", {
                  ref: "inputFilter",
                  staticClass: "panel-input",
                  attrs: {
                    type: "text",
                    placeholder: _vm.localizedLabel.customFilter,
                    trim: "",
                    autocomplete: "off",
                    autocorrect: "off",
                    autocapitalize: "off",
                    spellcheck: "false"
                  },
                  on: {
                    keyup: _vm.doInputFilter,
                    keydown: function($event) {
                      if (
                        !$event.type.indexOf("key") &&
                        _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")
                      ) {
                        return null
                      }
                      if (
                        $event.ctrlKey ||
                        $event.shiftKey ||
                        $event.altKey ||
                        $event.metaKey
                      ) {
                        return null
                      }
                      return _vm.doFilter($event)
                    }
                  }
                })
              ])
            ])
          ]),
          _vm._v(" "),
          _c("div", [
            _c(
              "div",
              { ref: "panelList", staticClass: "panel-list" },
              _vm._l(
                _vm.filteredSortedUniqueValueList.slice(0, _vm.nFilterCount),
                function(item, k) {
                  return _c(
                    "div",
                    {
                      key: k,
                      staticClass: "panel-list-item",
                      on: {
                        click: function($event) {
                          $event.preventDefault();
                          return _vm.filterPanelSelect(item)
                        }
                      }
                    },
                    [
                      _c("input", {
                        staticClass: "panel-checkbox",
                        attrs: { type: "checkbox" }
                      }),
                      _vm._v(" "),
                      _c("span", [_vm._v(_vm._s(item))])
                    ]
                  )
                }
              ),
              0
            ),
            _vm._v(" "),
            _vm.filteredSortedUniqueValueList.length > 500
              ? _c(
                  "div",
                  {
                    staticClass: "normal-text",
                    staticStyle: { float: "right" }
                  },
                  [
                    _c("span", {
                      domProps: {
                        innerHTML: _vm._s(
                          _vm.localizedLabel.listFirstNValuesOnly(
                            _vm.nFilterCount
                          )
                        )
                      }
                    })
                  ]
                )
              : _vm._e()
          ])
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "panel-footer" }, [
          _c(
            "button",
            { staticClass: "panel-button", on: { click: _vm.doFilter } },
            [
              _c(
                "svg",
                {
                  staticClass:
                    "svg-inline--fa fa-sign-in-alt fa-w-16 fa-fw fa-sm",
                  attrs: {
                    "aria-hidden": "true",
                    focusable: "false",
                    "data-prefix": "fas",
                    "data-icon": "sign-in-alt",
                    role: "img",
                    xmlns: "http://www.w3.org/2000/svg",
                    viewBox: "0 0 512 512"
                  }
                },
                [
                  _c("path", {
                    attrs: {
                      fill: "currentColor",
                      d:
                        "M416 448h-84c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h84c17.7 0 32-14.3 32-32V160c0-17.7-14.3-32-32-32h-84c-6.6 0-12-5.4-12-12V76c0-6.6 5.4-12 12-12h84c53 0 96 43 96 96v192c0 53-43 96-96 96zm-47-201L201 79c-15-15-41-4.5-41 17v96H24c-13.3 0-24 10.7-24 24v96c0 13.3 10.7 24 24 24h136v96c0 21.5 26 32 41 17l168-168c9.3-9.4 9.3-24.6 0-34z"
                    }
                  })
                ]
              ),
              _vm._v(" "),
              _c("span", {
                domProps: { innerHTML: _vm._s(_vm.localizedLabel.apply) }
              })
            ]
          )
        ])
      ])
    ]
  )
};
var __vue_staticRenderFns__$1 = [];
__vue_render__$1._withStripped = true;

  /* style */
  const __vue_inject_styles__$1 = function (inject) {
    if (!inject) return
    inject("data-v-3d3be5e3_0", { source: "\ninput[data-v-3d3be5e3]:focus, button[data-v-3d3be5e3]:focus {\n  outline: none !important;\n  box-shadow: none !important;\n}\n.panel-modal[data-v-3d3be5e3] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100vw;\n  height: 100vh;\n  overflow: hidden;\n  background-color: #0007;\n  z-index: 999;\n  font-weight: 400;\n  font-size: 1rem;\n  text-shadow: none;\n}\n.panel-body[data-v-3d3be5e3] {\n  background-color: white;\n  position: fixed;\n  border-radius: 5px;\n  padding: 0;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  width: 28rem;\n  max-width: 75vh;\n  height: fit-content;\n  max-height: 80vh;\n  display: flex;\n  flex-direction: column;\n}\n.panel-title[data-v-3d3be5e3] {\n  padding: 1rem;\n  display: flex;\n  color: dimgray;\n  font-size: 1.25rem;\n  line-height: 1.5rem;\n  align-items: center;\n  justify-content: flex-start;\n  border-bottom: 1px solid lightgray;\n}\ndiv.panel-title span[data-v-3d3be5e3], button.panel-button span[data-v-3d3be5e3] {\n  margin-left: 6px;\n}\n.panel-content[data-v-3d3be5e3] {\n  padding: 1rem;\n  text-align: left;\n  overflow-y: scroll;\n}\n.panel-content .panel-button[data-v-3d3be5e3] {\n  width: 48%;\n  background-color: #17a2b8;\n}\n.panel-action[data-v-3d3be5e3] {\n  display: inline-block;\n  margin-bottom: 0.5rem;\n  width: 100%;\n  position: relative;\n  white-space: nowrap;\n}\n.panel-input-b[data-v-3d3be5e3] {\n  display: inline-block;\n  border-top-right-radius: 4px;\n  border-bottom-right-radius: 4px;\n  width: calc(100% - 2.2rem);\n  border: 1px solid lightgray;\n  border-left: 0;\n  margin-left: -4px;\n  height: 2.3rem;\n}\n.panel-input[data-v-3d3be5e3] {\n  border: 0;\n  box-shadow: none;\n  padding: 0.6rem;\n  width: calc(100% - 2.2rem);\n  font-size: 0.88rem;\n  background-color: transparent;\n}\n.panel-input-button[data-v-3d3be5e3] {\n  border-top-left-radius: 4px;\n  border-bottom-left-radius: 4px;\n  color: white;\n  background-color: #28a745;\n  border: 1px solid #28a745;\n  font-size: 1.3rem;\n  width: 2.2rem;\n  height: 2.35rem;\n  vertical-align: -2px;\n  cursor: pointer;\n}\n.panel-dropdown[data-v-3d3be5e3] {\n  z-index: 50;\n  position: absolute;\n  left: 0;\n  top: 2.4rem;\n  display: inline-block;\n  background-color: white;\n  border: 1px solid gray;\n  margin-top: -1px;\n  display: none;\n}\n.panel-dropdown.show[data-v-3d3be5e3] {\n  display: inline-block;\n}\n.panel-dropdown-item[data-v-3d3be5e3] {\n  padding: 0.35rem 0.65rem;\n  cursor: pointer;\n}\n.panel-dropdown-item[data-v-3d3be5e3]:hover {\n  background-color: lightskyblue;\n}\n.panel-dropdown-item span[data-v-3d3be5e3] {\n  margin-right: 6px;\n  color: gray;\n}\n.panel-dropdown-item[data-v-3d3be5e3]:not(:last-child) {\n  border-bottom: 1px solid lightgray;\n}\n.panel-footer[data-v-3d3be5e3] {\n  display: flex;\n  padding: 1rem;\n  align-items: center;\n  justify-content: flex-end;\n  border-top: 1px solid lightgray;\n}\n.panel-button[data-v-3d3be5e3] {\n  width: 120px;\n  font-size: 0.88rem;\n  border-radius: 5px;\n  border: 0;\n  background-color: #007bff;\n  color: white;\n  padding: 0.6rem;\n  cursor: pointer;\n}\n.float-left[data-v-3d3be5e3] {\n  float: left !important;\n}\n.float-right[data-v-3d3be5e3] {\n  float: right !important;\n}\n.panel-list[data-v-3d3be5e3] {\n  overflow-y: scroll;\n  max-height: 20rem;\n  border: 1px solid #ced4da;\n  border-radius: 0.25rem;\n  display: flex;\n  flex-direction: column;\n}\n.panel-checkbox[data-v-3d3be5e3] {\n  vertical-align: 2px;\n}\n.panel-list span[data-v-3d3be5e3] {\n  margin-left: 10px;\n  color: gray;\n}\n.panel-list-item[data-v-3d3be5e3] {\n  padding: 10px 10px;\n  font-size: 0.88rem;\n  cursor: pointer;\n}\n.panel-list-item[data-v-3d3be5e3]:hover {\n  background-color: lightskyblue;\n}\n.panel-list-item[data-v-3d3be5e3]:not(:last-child) {\n  border-bottom: 1px solid lightgray;\n}\n.normal-text[data-v-3d3be5e3] {\n  font-size: 0.88rem;\n  color: gray;\n}\n.fa-spin[data-v-3d3be5e3] {\n  -webkit-animation: fa-spin 2s infinite linear;\n  animation: fa-spin 2s infinite linear;\n}\n.svg-inline--fa.fa-w-14[data-v-3d3be5e3] {\n  width: 0.875em;\n}\n.svg-inline--fa.fa-w-16[data-v-3d3be5e3] {\n  width: 1em;\n}\n.svg-inline--fa.fa-fw[data-v-3d3be5e3] {\n  width: 1.25em;\n}\n.svg-inline--fa[data-v-3d3be5e3] {\n  display: inline-block;\n  font-size: inherit;\n  height: 1em;\n  overflow: visible;\n  vertical-align: -0.125em;\n}\n.fa-fw[data-v-3d3be5e3] {\n  text-align: center;\n  width: 1.25em;\n}\n.fa-xs[data-v-3d3be5e3] {\n  font-size: 0.75em;\n}\n.fa-sm[data-v-3d3be5e3] {\n  font-size: 0.875em;\n}\n.fa-1x[data-v-3d3be5e3] {\n  font-size: 1em;\n}\n.fa-2x[data-v-3d3be5e3] {\n  font-size: 2em;\n}\n.fa-3x[data-v-3d3be5e3] {\n  font-size: 3em;\n}\n", map: {"version":3,"sources":["/Users/can/vuejs/hello-world/plugins/VueExcelEditor/src/panelFilter.vue"],"names":[],"mappings":";AAgNA;EACA,wBAAA;EACA,2BAAA;AACA;AAEA;EACA,eAAA;EACA,MAAA;EACA,OAAA;EACA,YAAA;EACA,aAAA;EACA,gBAAA;EACA,uBAAA;EACA,YAAA;EACA,gBAAA;EACA,eAAA;EACA,iBAAA;AACA;AAEA;EACA,uBAAA;EACA,eAAA;EACA,kBAAA;EACA,UAAA;EACA,QAAA;EACA,SAAA;EACA,gCAAA;EACA,YAAA;EACA,eAAA;EACA,mBAAA;EACA,gBAAA;EACA,aAAA;EACA,sBAAA;AACA;AAEA;EACA,aAAA;EACA,aAAA;EACA,cAAA;EACA,kBAAA;EACA,mBAAA;EACA,mBAAA;EACA,2BAAA;EACA,kCAAA;AACA;AAEA;EACA,gBAAA;AACA;AAEA;EACA,aAAA;EACA,gBAAA;EACA,kBAAA;AACA;AAEA;EACA,UAAA;EACA,yBAAA;AACA;AAEA;EACA,qBAAA;EACA,qBAAA;EACA,WAAA;EACA,kBAAA;EACA,mBAAA;AACA;AAEA;EACA,qBAAA;EACA,4BAAA;EACA,+BAAA;EACA,0BAAA;EACA,2BAAA;EACA,cAAA;EACA,iBAAA;EACA,cAAA;AACA;AACA;EACA,SAAA;EACA,gBAAA;EACA,eAAA;EACA,0BAAA;EACA,kBAAA;EACA,6BAAA;AACA;AACA;EACA,2BAAA;EACA,8BAAA;EACA,YAAA;EACA,yBAAA;EACA,yBAAA;EACA,iBAAA;EACA,aAAA;EACA,eAAA;EACA,oBAAA;EACA,eAAA;AACA;AAEA;EACA,WAAA;EACA,kBAAA;EACA,OAAA;EACA,WAAA;EACA,qBAAA;EACA,uBAAA;EACA,sBAAA;EACA,gBAAA;EACA,aAAA;AACA;AAEA;EACA,qBAAA;AACA;AACA;EACA,wBAAA;EACA,eAAA;AACA;AACA;EACA,8BAAA;AACA;AACA;EACA,iBAAA;EACA,WAAA;AACA;AACA;EACA,kCAAA;AACA;AAEA;EACA,aAAA;EACA,aAAA;EACA,mBAAA;EACA,yBAAA;EACA,+BAAA;AACA;AAEA;EACA,YAAA;EACA,kBAAA;EACA,kBAAA;EACA,SAAA;EACA,yBAAA;EACA,YAAA;EACA,eAAA;EACA,eAAA;AACA;AAEA;EACA,sBAAA;AACA;AAEA;EACA,uBAAA;AACA;AAEA;EACA,kBAAA;EACA,iBAAA;EACA,yBAAA;EACA,sBAAA;EACA,aAAA;EACA,sBAAA;AACA;AACA;EACA,mBAAA;AACA;AACA;EACA,iBAAA;EACA,WAAA;AACA;AACA;EACA,kBAAA;EACA,kBAAA;EACA,eAAA;AACA;AACA;EACA,8BAAA;AACA;AACA;EACA,kCAAA;AACA;AACA;EACA,kBAAA;EACA,WAAA;AACA;AAEA;EACA,6CAAA;EACA,qCAAA;AACA;AACA;EACA,cAAA;AACA;AACA;EACA,UAAA;AACA;AACA;EACA,aAAA;AACA;AACA;EACA,qBAAA;EACA,kBAAA;EACA,WAAA;EACA,iBAAA;EACA,wBAAA;AACA;AACA;EACA,kBAAA;EACA,aAAA;AACA;AACA;EACA,iBAAA;AACA;AACA;EACA,kBAAA;AACA;AACA;EACA,cAAA;AACA;AACA;EACA,cAAA;AACA;AACA;EACA,cAAA;AACA","file":"panelFilter.vue","sourcesContent":["<template>\n  <div id=\"panelModal\" v-show=\"show\" class=\"panel-modal\" @click=\"clickOutside\" @keydown.exact.esc=\"hidePanel\">\n    <div ref=\"panelFilter\"\n         class=\"panel-body\">\n      <div class=\"panel-title\">\n        <svg aria-hidden=\"true\" focusable=\"false\" data-prefix=\"fas\" data-icon=\"sort-amount-down\" role=\"img\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\" class=\"svg-inline--fa fa-sort-amount-down fa-w-16 fa-1x\"><path fill=\"currentColor\" d=\"M304 416h-64a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h64a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm-128-64h-48V48a16 16 0 0 0-16-16H80a16 16 0 0 0-16 16v304H16c-14.19 0-21.37 17.24-11.29 27.31l80 96a16 16 0 0 0 22.62 0l80-96C197.35 369.26 190.22 352 176 352zm256-192H240a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h192a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm-64 128H240a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h128a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zM496 32H240a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h256a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z\" class=\"\"></path></svg>        \n        <span v-html=\"localizedLabel.sortingAndFiltering\" />\n      </div>\n      <div class=\"panel-content\">\n        <div class=\"panel-action\">\n          <button class=\"panel-button float-left\" @click=\"sort(1)\">\n            <svg aria-hidden=\"true\" focusable=\"false\" data-prefix=\"fas\" data-icon=\"sort-alpha-down\" role=\"img\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 448 512\" class=\"svg-inline--fa fa-sort-alpha-down fa-w-14\"><path fill=\"currentColor\" d=\"M176 352h-48V48a16 16 0 0 0-16-16H80a16 16 0 0 0-16 16v304H16c-14.19 0-21.36 17.24-11.29 27.31l80 96a16 16 0 0 0 22.62 0l80-96C197.35 369.26 190.22 352 176 352zm240-64H288a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h56l-61.26 70.45A32 32 0 0 0 272 446.37V464a16 16 0 0 0 16 16h128a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16h-56l61.26-70.45A32 32 0 0 0 432 321.63V304a16 16 0 0 0-16-16zm31.06-85.38l-59.27-160A16 16 0 0 0 372.72 32h-41.44a16 16 0 0 0-15.07 10.62l-59.27 160A16 16 0 0 0 272 224h24.83a16 16 0 0 0 15.23-11.08l4.42-12.92h71l4.41 12.92A16 16 0 0 0 407.16 224H432a16 16 0 0 0 15.06-21.38zM335.61 144L352 96l16.39 48z\" class=\"\"></path></svg>\n            <span v-html=\"localizedLabel.sortAscending\" />\n          </button>\n          <button class=\"panel-button float-right\" @click=\"sort(-1)\">\n            <svg aria-hidden=\"true\" focusable=\"false\" data-prefix=\"fas\" data-icon=\"sort-alpha-up-alt\" role=\"img\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 448 512\" class=\"svg-inline--fa fa-sort-alpha-up-alt fa-w-14\"><path fill=\"currentColor\" d=\"M16 160h48v304a16 16 0 0 0 16 16h32a16 16 0 0 0 16-16V160h48c14.21 0 21.38-17.24 11.31-27.31l-80-96a16 16 0 0 0-22.62 0l-80 96C-5.35 142.74 1.78 160 16 160zm272 64h128a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16h-56l61.26-70.45A32 32 0 0 0 432 65.63V48a16 16 0 0 0-16-16H288a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h56l-61.26 70.45A32 32 0 0 0 272 190.37V208a16 16 0 0 0 16 16zm159.06 234.62l-59.27-160A16 16 0 0 0 372.72 288h-41.44a16 16 0 0 0-15.07 10.62l-59.27 160A16 16 0 0 0 272 480h24.83a16 16 0 0 0 15.23-11.08l4.42-12.92h71l4.41 12.92A16 16 0 0 0 407.16 480H432a16 16 0 0 0 15.06-21.38zM335.61 400L352 352l16.39 48z\" class=\"\"></path></svg>\n            <span v-html=\"localizedLabel.sortDescending\" />\n          </button>\n        </div>\n        <div class=\"panel-action\">\n          <div>\n            <button class=\"panel-input-button\" @click=\"showDropdown = !showDropdown\">{{ symbol }}</button>\n            <div :class=\"{show: showDropdown}\" class=\"panel-dropdown\">\n              <div class=\"panel-dropdown-item\" @click.prevent=\"setFilterCondition('')\">\n                <span v-html=\"localizedLabel.near\" />\n              </div>\n              <div class=\"panel-dropdown-item\" @click.prevent=\"setFilterCondition('=')\">\n                <span v-html=\"localizedLabel.exactMatch\" />\n              </div>\n              <div class=\"panel-dropdown-item\" @click.prevent=\"setFilterCondition('>')\">\n                <span v-html=\"localizedLabel.greaterThan\" />\n              </div>\n              <div class=\"panel-dropdown-item\" @click.prevent=\"setFilterCondition('>=')\">\n                <span v-html=\"localizedLabel.greaterThanOrEqualTo\" />\n              </div>\n              <div class=\"panel-dropdown-item\" @click.prevent=\"setFilterCondition('<')\">\n                <span v-html=\"localizedLabel.lessThan\" />\n              </div>\n              <div class=\"panel-dropdown-item\" @click.prevent=\"setFilterCondition('<=')\">\n                <span v-html=\"localizedLabel.lessThanOrEqualTo\" />\n              </div>\n              <div class=\"panel-dropdown-item\" @click.prevent=\"setFilterCondition('~')\">\n                <span v-html=\"localizedLabel.regularExpression\" />\n              </div>\n            </div>\n            <span class=\"panel-input-b\">\n              <input type=\"text\"\n                     ref=\"inputFilter\"\n                     class=\"panel-input\"\n                     :placeholder=\"localizedLabel.customFilter\"\n                     trim autocomplete=\"off\" autocorrect=\"off\" autocapitalize=\"off\" spellcheck=\"false\"\n                     @keyup=\"doInputFilter\"\n                     @keydown.exact.enter=\"doFilter\" />\n            </span>\n          </div>\n        </div>\n        <div>\n          <div ref=\"panelList\" class=\"panel-list\">\n            <div v-for=\"(item, k) in filteredSortedUniqueValueList.slice(0, nFilterCount)\" :key=\"k\"\n                 class=\"panel-list-item\"\n                 @click.prevent=\"filterPanelSelect(item)\">\n              <input type=\"checkbox\" class=\"panel-checkbox\" />\n              <span>{{ item }}</span>\n            </div>\n          </div>\n          <div v-if=\"filteredSortedUniqueValueList.length>500\" class=\"normal-text\" style=\"float:right\">\n            <span v-html=\"localizedLabel.listFirstNValuesOnly(nFilterCount)\" />\n          </div>\n        </div>\n      </div>\n\n      <div class=\"panel-footer\">\n        <button class=\"panel-button\" @click=\"doFilter\">\n          <svg aria-hidden=\"true\" focusable=\"false\" data-prefix=\"fas\" data-icon=\"sign-in-alt\" role=\"img\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\" class=\"svg-inline--fa fa-sign-in-alt fa-w-16 fa-fw fa-sm\"><path fill=\"currentColor\" d=\"M416 448h-84c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h84c17.7 0 32-14.3 32-32V160c0-17.7-14.3-32-32-32h-84c-6.6 0-12-5.4-12-12V76c0-6.6 5.4-12 12-12h84c53 0 96 43 96 96v192c0 53-43 96-96 96zm-47-201L201 79c-15-15-41-4.5-41 17v96H24c-13.3 0-24 10.7-24 24v96c0 13.3 10.7 24 24 24h136v96c0 21.5 26 32 41 17l168-168c9.3-9.4 9.3-24.6 0-34z\" class=\"\"></path></svg>\n          <span v-html=\"localizedLabel.apply\" />\n        </button>\n      </div>\n    </div>\n  </div>\n</template>\n\n<script>\nexport default {\n  props: {\n    nFilterCount: {type: Number, default: 200},     // show top n values in filter dialog\n    localizedLabel: {\n      type: Object,\n      default () {\n        return {\n          sortingAndFiltering: 'Sorting And Filtering',\n          sortAscending: 'Sort Ascending',\n          sortDescending: 'Sort Descending',\n          near: '≒ Near',\n          exactMatch: '= Exact Match',\n          greaterThan: '&gt; Greater Than',\n          greaterThanOrEqualTo: '≥ Greater Than or Equal To',\n          lessThan: '&lt; Less Than',\n          lessThanOrEqualTo: '≤ Less Than Or Equal To',\n          regularExpression: '~ Regular Expression',\n          customFilter: 'Custom Filter',\n          listFirstNValuesOnly: n => `List first ${n} values only`,\n          apply: 'Apply'\n        }\n      }\n    }\n  },\n  data () {\n    return {\n      show: false,\n      showDropdown: false,\n      processing: false,\n      columnFilterRef: null,\n      inputFilter: '',\n      inputFilterCondition: '',\n      sortedUniqueValueList: []\n    }\n  },\n  computed: {\n    filteredSortedUniqueValueList () {\n      const filter = this.inputFilter.toUpperCase()\n      return this.sortedUniqueValueList.filter(item => item.toUpperCase().startsWith(filter))\n    },\n    symbol () {\n      switch(this.inputFilterCondition) {\n        case '':\n          return '≒'\n        case '<=':\n          return '≤'\n        case '>=':\n          return '≥'\n        default:\n          return this.inputFilterCondition\n      }\n    },\n  },\n  methods: {\n    clickOutside (e) {\n      if (e.target.id === 'panelModal') this.hidePanel()\n    },\n    sort (direction) {\n      this.hidePanel()\n      this.$parent.sort(direction, this.columnFilterRef.colPos)\n    },\n    setFilterCondition(choice) {\n      this.showDropdown = false\n      this.inputFilterCondition = choice\n      this.$refs.inputFilter.focus()\n    },\n    freezePanelSizeAfterShown () {\n      const target = this.$refs.panelList\n      const rect = target.getBoundingClientRect()\n      target.setAttribute('style', `width:${rect.width}px; height:${rect.height}px;`)\n    },\n    removePanelSizeAfterHide () {\n      const target = this.$refs.panelList\n      target.removeAttribute('style')\n    },\n    doInputFilter () {\n      if (window.delay) clearTimeout(window.delay)\n      window.delay = setTimeout(() => {\n        this.inputFilter = this.$refs.inputFilter.value\n      }, 200)\n    },\n    doFilter () {\n      const opt = this.inputFilterCondition + this.$refs.inputFilter.value\n      this.columnFilterRef.$el.textContent = opt\n      this.columnFilterRef.$emit('input', opt)\n      this.hidePanel()\n    },\n    filterPanelSelect (opt) {\n      // this.columnFilter[this.columnFilterRef.colPos] = el  // Cannot use this, dunno why\n      this.columnFilterRef.$el.textContent = '=' + opt\n      this.columnFilterRef.$emit('input', '=' + opt)\n      this.hidePanel()\n    },\n    showPanel (ref) {\n      this.columnFilterRef = ref\n      this.inputFilter = ''\n      this.inputFilterCondition = ''\n      this.sortedUniqueValueList = []\n      this.$refs.inputFilter.value = ''\n      this.show = true\n      this.columnFilterRef.$el.textContent = ''\n      this.columnFilterRef.$emit('input', '')\n      setTimeout(() => (this.$refs.inputFilter.focus()))\n\n      const hash = {}\n      const fieldName = this.$parent.fields[ref.colPos].name\n      this.$parent.table.forEach(record => (hash[record[fieldName]] = true))\n      const keys = Object.keys(hash)\n      keys.sort()\n      if (keys.length > 0 && keys[0] === '') keys[0] = ' '\n      this.sortedUniqueValueList = keys\n      setTimeout(() => this.freezePanelSizeAfterShown())\n    },\n    hidePanel () {\n      this.show = false\n      this.removePanelSizeAfterHide()\n      setTimeout(() => {\n        this.sortedUniqueValueList = []\n      }, 0)\n    }\n  }\n}\n</script>\n\n<style scoped>\n\ninput:focus, button:focus {\n  outline: none !important;\n  box-shadow: none !important;\n}\n\n.panel-modal {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100vw;\n  height: 100vh;\n  overflow: hidden;\n  background-color: #0007;\n  z-index: 999;\n  font-weight: 400;\n  font-size: 1rem;\n  text-shadow: none;\n}\n\n.panel-body {\n  background-color: white;\n  position: fixed;\n  border-radius: 5px;\n  padding: 0;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  width: 28rem;\n  max-width: 75vh;\n  height: fit-content;\n  max-height: 80vh;\n  display: flex;\n  flex-direction: column;\n}\n\n.panel-title {\n  padding: 1rem;\n  display: flex;\n  color: dimgray;\n  font-size: 1.25rem;\n  line-height: 1.5rem;\n  align-items: center;\n  justify-content: flex-start;\n  border-bottom: 1px solid lightgray;\n}\n\ndiv.panel-title span, button.panel-button span {\n  margin-left: 6px;\n}\n\n.panel-content {\n  padding: 1rem;\n  text-align: left;\n  overflow-y: scroll;\n}\n\n.panel-content .panel-button {\n  width: 48%;\n  background-color: #17a2b8;\n}\n\n.panel-action {\n  display: inline-block;\n  margin-bottom: 0.5rem;\n  width: 100%;\n  position: relative;\n  white-space: nowrap;\n}\n\n.panel-input-b {\n  display: inline-block;\n  border-top-right-radius: 4px;\n  border-bottom-right-radius: 4px;\n  width: calc(100% - 2.2rem);\n  border: 1px solid lightgray;\n  border-left: 0;\n  margin-left: -4px;\n  height: 2.3rem;\n}\n.panel-input {\n  border: 0;\n  box-shadow: none;\n  padding: 0.6rem;\n  width: calc(100% - 2.2rem);\n  font-size: 0.88rem;\n  background-color: transparent;\n}\n.panel-input-button {\n  border-top-left-radius: 4px;\n  border-bottom-left-radius: 4px;\n  color: white;\n  background-color: #28a745;\n  border: 1px solid #28a745;\n  font-size: 1.3rem;\n  width: 2.2rem;\n  height: 2.35rem;\n  vertical-align: -2px;\n  cursor: pointer;\n}\n\n.panel-dropdown {\n  z-index: 50;\n  position: absolute;\n  left: 0;\n  top: 2.4rem;\n  display: inline-block;\n  background-color: white;\n  border: 1px solid gray;\n  margin-top: -1px;\n  display: none;\n}\n\n.panel-dropdown.show {\n  display: inline-block;\n}\n.panel-dropdown-item {\n  padding: 0.35rem 0.65rem;\n  cursor: pointer;\n}\n.panel-dropdown-item:hover {\n  background-color: lightskyblue;\n}\n.panel-dropdown-item span {\n  margin-right: 6px;\n  color: gray;\n}\n.panel-dropdown-item:not(:last-child) {\n  border-bottom: 1px solid lightgray;\n}\n\n.panel-footer {\n  display: flex;\n  padding: 1rem;\n  align-items: center;\n  justify-content: flex-end;\n  border-top: 1px solid lightgray;\n}\n\n.panel-button {\n  width: 120px;\n  font-size: 0.88rem;\n  border-radius: 5px;\n  border: 0;\n  background-color: #007bff;\n  color: white;\n  padding: 0.6rem;\n  cursor: pointer;\n}\n\n.float-left {\n  float: left !important;\n}\n\n.float-right {\n  float: right !important;\n}\n\n.panel-list {\n  overflow-y: scroll;\n  max-height: 20rem;\n  border: 1px solid #ced4da;\n  border-radius: 0.25rem;\n  display: flex;\n  flex-direction: column;\n}\n.panel-checkbox {\n  vertical-align: 2px;\n}\n.panel-list span {\n  margin-left: 10px;\n  color: gray;\n}\n.panel-list-item {\n  padding: 10px 10px;\n  font-size: 0.88rem;\n  cursor: pointer;\n}\n.panel-list-item:hover {\n  background-color: lightskyblue;\n}\n.panel-list-item:not(:last-child) {\n  border-bottom: 1px solid lightgray;\n}\n.normal-text {\n  font-size: 0.88rem;\n  color: gray;\n}\n\n.fa-spin {\n  -webkit-animation: fa-spin 2s infinite linear;\n  animation: fa-spin 2s infinite linear;\n}\n.svg-inline--fa.fa-w-14 {\n  width: 0.875em;\n}\n.svg-inline--fa.fa-w-16 {\n  width: 1em;\n}\n.svg-inline--fa.fa-fw {\n  width: 1.25em;\n}\n.svg-inline--fa {\n  display: inline-block;\n  font-size: inherit;\n  height: 1em;\n  overflow: visible;\n  vertical-align: -0.125em;\n}\n.fa-fw {\n  text-align: center;\n  width: 1.25em;\n}\n.fa-xs {\n  font-size: 0.75em;\n}\n.fa-sm {\n  font-size: 0.875em;\n}\n.fa-1x {\n  font-size: 1em;\n}\n.fa-2x {\n  font-size: 2em;\n}\n.fa-3x {\n  font-size: 3em;\n}\n</style>\n"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$1 = "data-v-3d3be5e3";
  /* module identifier */
  const __vue_module_identifier__$1 = undefined;
  /* functional template */
  const __vue_is_functional_template__$1 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$1 = normalizeComponent(
    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
    __vue_inject_styles__$1,
    __vue_script__$1,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1,
    __vue_module_identifier__$1,
    false,
    createInjector,
    undefined,
    undefined
  );

//
var script$2 = {
  components: {
    'draggable': draggable
  },
  props: {
    value: Array,
    localizedLabel: {
      type: Object,

      default() {
        return {
          tableSetting: 'Table Setting',
          exportExcel: 'Export Excel',
          importExcel: 'Import Excel',
          back: 'Back'
        };
      }

    }
  },

  data() {
    return {
      show: false,
      processing: false
    };
  },

  computed: {
    fields: {
      get: function () {
        return this.value;
      },
      set: function (newVal) {
        this.$emit('input', newVal);
      }
    }
  },
  methods: {
    clickOutside(e) {
      if (e.target.id === 'panelModal') this.hidePanel();
    },

    columnLabelClick(item) {
      item.invisible = !item.invisible;
      setTimeout(this.$parent.calStickyLeft);
    },

    freezePanelSizeAfterShown() {
      const target = this.$refs.panelList;
      const rect = target.getBoundingClientRect();
      target.setAttribute('style', `width:${rect.width}px; height:${rect.height}px;`);
    },

    removePanelSizeAfterHide() {
      const target = this.$refs.panelList;
      target.removeAttribute('style');
    },

    exportTable(format) {
      this.hidePanel();
      this.$parent.exportTable(format);
    },

    importTable() {
      this.hidePanel();
      this.$parent.importTable();
    },

    showPanel() {
      this.show = true;
      setTimeout(() => this.$refs.button.focus());
      setTimeout(() => this.freezePanelSizeAfterShown());
    },

    hidePanel() {
      this.show = false;
      this.removePanelSizeAfterHide();
    }

  }
};

/* script */
const __vue_script__$2 = script$2;

/* template */
var __vue_render__$2 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    {
      directives: [
        { name: "show", rawName: "v-show", value: _vm.show, expression: "show" }
      ],
      staticClass: "panel-modal",
      attrs: { id: "panelModal" },
      on: {
        click: _vm.clickOutside,
        keydown: function($event) {
          if (
            !$event.type.indexOf("key") &&
            _vm._k($event.keyCode, "esc", 27, $event.key, ["Esc", "Escape"])
          ) {
            return null
          }
          if (
            $event.ctrlKey ||
            $event.shiftKey ||
            $event.altKey ||
            $event.metaKey
          ) {
            return null
          }
          return _vm.hidePanel($event)
        }
      }
    },
    [
      _c("div", { ref: "panelSetting", staticClass: "panel-body" }, [
        _c("div", { staticClass: "panel-title" }, [
          _c(
            "svg",
            {
              staticClass: "svg-inline--fa fa-bars fa-w-14 fa-1x",
              attrs: {
                "aria-hidden": "true",
                focusable: "false",
                "data-prefix": "fas",
                "data-icon": "bars",
                role: "img",
                xmlns: "http://www.w3.org/2000/svg",
                viewBox: "0 0 448 512"
              }
            },
            [
              _c("path", {
                attrs: {
                  fill: "currentColor",
                  d:
                    "M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"
                }
              })
            ]
          ),
          _vm._v(" "),
          _c("span", {
            domProps: { innerHTML: _vm._s(_vm.localizedLabel.tableSetting) }
          })
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "panel-content" }, [
          _c("div", { staticClass: "panel-action" }, [
            _c(
              "button",
              {
                staticClass: "panel-button float-left",
                on: {
                  click: function($event) {
                    return _vm.exportTable("excel")
                  }
                }
              },
              [
                _c(
                  "svg",
                  {
                    staticClass: "svg-inline--fa fa-file-excel fa-w-12",
                    attrs: {
                      "aria-hidden": "true",
                      focusable: "false",
                      "data-prefix": "fas",
                      "data-icon": "file-excel",
                      role: "img",
                      xmlns: "http://www.w3.org/2000/svg",
                      viewBox: "0 0 384 512"
                    }
                  },
                  [
                    _c("path", {
                      attrs: {
                        fill: "currentColor",
                        d:
                          "M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm60.1 106.5L224 336l60.1 93.5c5.1 8-.6 18.5-10.1 18.5h-34.9c-4.4 0-8.5-2.4-10.6-6.3C208.9 405.5 192 373 192 373c-6.4 14.8-10 20-36.6 68.8-2.1 3.9-6.1 6.3-10.5 6.3H110c-9.5 0-15.2-10.5-10.1-18.5l60.3-93.5-60.3-93.5c-5.2-8 .6-18.5 10.1-18.5h34.8c4.4 0 8.5 2.4 10.6 6.3 26.1 48.8 20 33.6 36.6 68.5 0 0 6.1-11.7 36.6-68.5 2.1-3.9 6.2-6.3 10.6-6.3H274c9.5-.1 15.2 10.4 10.1 18.4zM384 121.9v6.1H256V0h6.1c6.4 0 12.5 2.5 17 7l97.9 98c4.5 4.5 7 10.6 7 16.9z"
                      }
                    })
                  ]
                ),
                _vm._v(" "),
                _c("span", {
                  domProps: {
                    innerHTML: _vm._s(_vm.localizedLabel.exportExcel)
                  }
                })
              ]
            ),
            _vm._v(" "),
            _c(
              "button",
              {
                staticClass: "panel-button float-right",
                on: { click: _vm.importTable }
              },
              [
                _c(
                  "svg",
                  {
                    staticClass: "svg-inline--fa fa-file-csv fa-w-12",
                    attrs: {
                      "aria-hidden": "true",
                      focusable: "false",
                      "data-prefix": "fas",
                      "data-icon": "file-csv",
                      role: "img",
                      xmlns: "http://www.w3.org/2000/svg",
                      viewBox: "0 0 384 512"
                    }
                  },
                  [
                    _c("path", {
                      attrs: {
                        fill: "currentColor",
                        d:
                          "M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm-96 144c0 4.42-3.58 8-8 8h-8c-8.84 0-16 7.16-16 16v32c0 8.84 7.16 16 16 16h8c4.42 0 8 3.58 8 8v16c0 4.42-3.58 8-8 8h-8c-26.51 0-48-21.49-48-48v-32c0-26.51 21.49-48 48-48h8c4.42 0 8 3.58 8 8v16zm44.27 104H160c-4.42 0-8-3.58-8-8v-16c0-4.42 3.58-8 8-8h12.27c5.95 0 10.41-3.5 10.41-6.62 0-1.3-.75-2.66-2.12-3.84l-21.89-18.77c-8.47-7.22-13.33-17.48-13.33-28.14 0-21.3 19.02-38.62 42.41-38.62H200c4.42 0 8 3.58 8 8v16c0 4.42-3.58 8-8 8h-12.27c-5.95 0-10.41 3.5-10.41 6.62 0 1.3.75 2.66 2.12 3.84l21.89 18.77c8.47 7.22 13.33 17.48 13.33 28.14.01 21.29-19 38.62-42.39 38.62zM256 264v20.8c0 20.27 5.7 40.17 16 56.88 10.3-16.7 16-36.61 16-56.88V264c0-4.42 3.58-8 8-8h16c4.42 0 8 3.58 8 8v20.8c0 35.48-12.88 68.89-36.28 94.09-3.02 3.25-7.27 5.11-11.72 5.11s-8.7-1.86-11.72-5.11c-23.4-25.2-36.28-58.61-36.28-94.09V264c0-4.42 3.58-8 8-8h16c4.42 0 8 3.58 8 8zm121-159L279.1 7c-4.5-4.5-10.6-7-17-7H256v128h128v-6.1c0-6.3-2.5-12.4-7-16.9z"
                      }
                    })
                  ]
                ),
                _vm._v(" "),
                _c("span", {
                  domProps: {
                    innerHTML: _vm._s(_vm.localizedLabel.importExcel)
                  }
                })
              ]
            )
          ]),
          _vm._v(" "),
          _c("div", [
            _c(
              "div",
              { ref: "panelList", staticClass: "panel-list" },
              [
                _c(
                  "draggable",
                  {
                    attrs: { draggable: ".panel-list-item" },
                    model: {
                      value: _vm.fields,
                      callback: function($$v) {
                        _vm.fields = $$v;
                      },
                      expression: "fields"
                    }
                  },
                  _vm._l(_vm.fields, function(item, k) {
                    return _c(
                      "div",
                      {
                        key: k,
                        staticClass: "panel-list-item",
                        on: {
                          click: function($event) {
                            $event.preventDefault();
                            return _vm.columnLabelClick(item)
                          }
                        }
                      },
                      [
                        _c("input", {
                          staticClass: "panel-checkbox",
                          attrs: { type: "checkbox" },
                          domProps: { checked: !item.invisible }
                        }),
                        _vm._v(" "),
                        _c("span", [_vm._v(_vm._s(item.label))])
                      ]
                    )
                  }),
                  0
                )
              ],
              1
            )
          ])
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "panel-footer" }, [
          _c(
            "button",
            {
              ref: "button",
              staticClass: "panel-button",
              on: { click: _vm.hidePanel }
            },
            [
              _c(
                "svg",
                {
                  staticClass: "svg-inline--fa fa-save fa-w-14 fa-fw fa-sm",
                  attrs: {
                    "aria-hidden": "true",
                    focusable: "false",
                    "data-prefix": "fas",
                    "data-icon": "save",
                    role: "img",
                    xmlns: "http://www.w3.org/2000/svg",
                    viewBox: "0 0 448 512"
                  }
                },
                [
                  _c("path", {
                    attrs: {
                      fill: "currentColor",
                      d:
                        "M433.941 129.941l-83.882-83.882A48 48 0 0 0 316.118 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V163.882a48 48 0 0 0-14.059-33.941zM224 416c-35.346 0-64-28.654-64-64 0-35.346 28.654-64 64-64s64 28.654 64 64c0 35.346-28.654 64-64 64zm96-304.52V212c0 6.627-5.373 12-12 12H76c-6.627 0-12-5.373-12-12V108c0-6.627 5.373-12 12-12h228.52c3.183 0 6.235 1.264 8.485 3.515l3.48 3.48A11.996 11.996 0 0 1 320 111.48z"
                    }
                  })
                ]
              ),
              _vm._v(" "),
              _c("span", {
                domProps: { innerHTML: _vm._s(_vm.localizedLabel.back) }
              })
            ]
          )
        ])
      ])
    ]
  )
};
var __vue_staticRenderFns__$2 = [];
__vue_render__$2._withStripped = true;

  /* style */
  const __vue_inject_styles__$2 = function (inject) {
    if (!inject) return
    inject("data-v-56385c92_0", { source: "\ninput[data-v-56385c92]:focus, button[data-v-56385c92]:focus {\n  outline: none !important;\n  box-shadow: inset 0 -1px 0 #ddd !important;\n}\n.panel-modal[data-v-56385c92] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100vw;\n  height: 100vh;\n  overflow: hidden;\n  background-color: #0007;\n  z-index: 999;\n  font-weight: 400;\n  font-size: 1rem;\n  text-shadow: none;\n}\n.panel-body[data-v-56385c92] {\n  background-color: white;\n  position: fixed;\n  border-radius: 5px;\n  padding: 0;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  width: 28rem;\n  max-width: 75vh;\n  height: fit-content;\n  max-height: 80vh;\n  display: flex;\n  flex-direction: column;\n}\n.panel-title[data-v-56385c92] {\n  padding: 1rem;\n  display: flex;\n  color: dimgray;\n  font-size: 1.25rem;\n  line-height: 1.5rem;\n  align-items: center;\n  justify-content: flex-start;\n  border-bottom: 1px solid lightgray;\n}\ndiv.panel-title span[data-v-56385c92], button.panel-button span[data-v-56385c92] {\n  margin-left: 6px;\n}\n.panel-content[data-v-56385c92] {\n  padding: 1rem;\n  text-align: left;\n  overflow-y: scroll;\n}\n.panel-content .panel-button[data-v-56385c92] {\n  width: 48%;\n  background-color: #17a2b8;\n}\n.panel-action[data-v-56385c92] {\n  display: inline-block;\n  margin-bottom: 0.5rem;\n  width: 100%;\n  position: relative;\n  white-space: nowrap;\n}\n.panel-footer[data-v-56385c92] {\n  display: flex;\n  padding: 1rem;\n  align-items: center;\n  justify-content: flex-end;\n  border-top: 1px solid lightgray;\n}\n.panel-button[data-v-56385c92] {\n  width: 120px;\n  font-size: 0.88rem;\n  border-radius: 5px;\n  border: 0;\n  background-color: #007bff;\n  color: white;\n  padding: 0.6rem;\n  cursor: pointer;\n}\n.float-left[data-v-56385c92] {\n  float: left !important;\n}\n.float-right[data-v-56385c92] {\n  float: right !important;\n}\n.panel-list[data-v-56385c92] {\n  overflow-y: scroll;\n  max-height: 20rem;\n  border: 1px solid #ced4da;\n  border-radius: 0.25rem;\n  display: flex;\n  flex-direction: column;\n}\n.panel-checkbox[data-v-56385c92] {\n  vertical-align: 2px;\n}\n.panel-list span[data-v-56385c92] {\n  margin-left: 10px;\n  color: gray;\n}\n.panel-list-item[data-v-56385c92] {\n  padding: 10px 10px;\n  font-size: 0.88rem;\n  cursor: pointer;\n}\n.panel-list-item[data-v-56385c92]:hover {\n  background-color: lightskyblue;\n}\n.panel-list-item[data-v-56385c92]:not(:last-child) {\n  border-bottom: 1px solid lightgray;\n}\n.fa-spin[data-v-56385c92] {\n  -webkit-animation: fa-spin 2s infinite linear;\n  animation: fa-spin 2s infinite linear;\n}\n.svg-inline--fa.fa-w-14[data-v-56385c92] {\n  width: 0.875em;\n}\n.svg-inline--fa.fa-w-16[data-v-56385c92] {\n  width: 1em;\n}\n.svg-inline--fa.fa-fw[data-v-56385c92] {\n  width: 1.25em;\n}\n.svg-inline--fa[data-v-56385c92] {\n  display: inline-block;\n  font-size: inherit;\n  height: 1em;\n  overflow: visible;\n  vertical-align: -0.125em;\n}\n.fa-fw[data-v-56385c92] {\n  text-align: center;\n  width: 1.25em;\n}\n.fa-xs[data-v-56385c92] {\n  font-size: 0.75em;\n}\n.fa-sm[data-v-56385c92] {\n  font-size: 0.875em;\n}\n.fa-1x[data-v-56385c92] {\n  font-size: 1em;\n}\n.fa-2x[data-v-56385c92] {\n  font-size: 2em;\n}\n.fa-3x[data-v-56385c92] {\n  font-size: 3em;\n}\n", map: {"version":3,"sources":["/Users/can/vuejs/hello-world/plugins/VueExcelEditor/src/panelSetting.vue"],"names":[],"mappings":";AAwHA;EACA,wBAAA;EACA,0CAAA;AACA;AAEA;EACA,eAAA;EACA,MAAA;EACA,OAAA;EACA,YAAA;EACA,aAAA;EACA,gBAAA;EACA,uBAAA;EACA,YAAA;EACA,gBAAA;EACA,eAAA;EACA,iBAAA;AACA;AAEA;EACA,uBAAA;EACA,eAAA;EACA,kBAAA;EACA,UAAA;EACA,QAAA;EACA,SAAA;EACA,gCAAA;EACA,YAAA;EACA,eAAA;EACA,mBAAA;EACA,gBAAA;EACA,aAAA;EACA,sBAAA;AACA;AAEA;EACA,aAAA;EACA,aAAA;EACA,cAAA;EACA,kBAAA;EACA,mBAAA;EACA,mBAAA;EACA,2BAAA;EACA,kCAAA;AACA;AAEA;EACA,gBAAA;AACA;AAEA;EACA,aAAA;EACA,gBAAA;EACA,kBAAA;AACA;AAEA;EACA,UAAA;EACA,yBAAA;AACA;AAEA;EACA,qBAAA;EACA,qBAAA;EACA,WAAA;EACA,kBAAA;EACA,mBAAA;AACA;AAEA;EACA,aAAA;EACA,aAAA;EACA,mBAAA;EACA,yBAAA;EACA,+BAAA;AACA;AAEA;EACA,YAAA;EACA,kBAAA;EACA,kBAAA;EACA,SAAA;EACA,yBAAA;EACA,YAAA;EACA,eAAA;EACA,eAAA;AACA;AAEA;EACA,sBAAA;AACA;AAEA;EACA,uBAAA;AACA;AAEA;EACA,kBAAA;EACA,iBAAA;EACA,yBAAA;EACA,sBAAA;EACA,aAAA;EACA,sBAAA;AACA;AACA;EACA,mBAAA;AACA;AACA;EACA,iBAAA;EACA,WAAA;AACA;AACA;EACA,kBAAA;EACA,kBAAA;EACA,eAAA;AACA;AACA;EACA,8BAAA;AACA;AACA;EACA,kCAAA;AACA;AAEA;EACA,6CAAA;EACA,qCAAA;AACA;AACA;EACA,cAAA;AACA;AACA;EACA,UAAA;AACA;AACA;EACA,aAAA;AACA;AACA;EACA,qBAAA;EACA,kBAAA;EACA,WAAA;EACA,iBAAA;EACA,wBAAA;AACA;AACA;EACA,kBAAA;EACA,aAAA;AACA;AACA;EACA,iBAAA;AACA;AACA;EACA,kBAAA;AACA;AACA;EACA,cAAA;AACA;AACA;EACA,cAAA;AACA;AACA;EACA,cAAA;AACA","file":"panelSetting.vue","sourcesContent":["<template>\n  <div id=\"panelModal\" v-show=\"show\" class=\"panel-modal\" @click=\"clickOutside\" @keydown.exact.esc=\"hidePanel\">\n    <div ref=\"panelSetting\"\n         class=\"panel-body\">\n      <div class=\"panel-title\">\n        <svg aria-hidden=\"true\" focusable=\"false\" data-prefix=\"fas\" data-icon=\"bars\" role=\"img\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 448 512\" class=\"svg-inline--fa fa-bars fa-w-14 fa-1x\"><path fill=\"currentColor\" d=\"M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z\" class=\"\"></path></svg>\n        <span v-html=\"localizedLabel.tableSetting\" />\n      </div>\n      <div class=\"panel-content\">\n        <div class=\"panel-action\">\n          <button class=\"panel-button float-left\" @click=\"exportTable('excel')\">\n            <svg aria-hidden=\"true\" focusable=\"false\" data-prefix=\"fas\" data-icon=\"file-excel\" role=\"img\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 384 512\" class=\"svg-inline--fa fa-file-excel fa-w-12\"><path fill=\"currentColor\" d=\"M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm60.1 106.5L224 336l60.1 93.5c5.1 8-.6 18.5-10.1 18.5h-34.9c-4.4 0-8.5-2.4-10.6-6.3C208.9 405.5 192 373 192 373c-6.4 14.8-10 20-36.6 68.8-2.1 3.9-6.1 6.3-10.5 6.3H110c-9.5 0-15.2-10.5-10.1-18.5l60.3-93.5-60.3-93.5c-5.2-8 .6-18.5 10.1-18.5h34.8c4.4 0 8.5 2.4 10.6 6.3 26.1 48.8 20 33.6 36.6 68.5 0 0 6.1-11.7 36.6-68.5 2.1-3.9 6.2-6.3 10.6-6.3H274c9.5-.1 15.2 10.4 10.1 18.4zM384 121.9v6.1H256V0h6.1c6.4 0 12.5 2.5 17 7l97.9 98c4.5 4.5 7 10.6 7 16.9z\" class=\"\"></path></svg>\n            <span v-html=\"localizedLabel.exportExcel\" />\n          </button>\n          <button class=\"panel-button float-right\" @click=\"importTable\">\n            <svg aria-hidden=\"true\" focusable=\"false\" data-prefix=\"fas\" data-icon=\"file-csv\" role=\"img\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 384 512\" class=\"svg-inline--fa fa-file-csv fa-w-12\"><path fill=\"currentColor\" d=\"M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm-96 144c0 4.42-3.58 8-8 8h-8c-8.84 0-16 7.16-16 16v32c0 8.84 7.16 16 16 16h8c4.42 0 8 3.58 8 8v16c0 4.42-3.58 8-8 8h-8c-26.51 0-48-21.49-48-48v-32c0-26.51 21.49-48 48-48h8c4.42 0 8 3.58 8 8v16zm44.27 104H160c-4.42 0-8-3.58-8-8v-16c0-4.42 3.58-8 8-8h12.27c5.95 0 10.41-3.5 10.41-6.62 0-1.3-.75-2.66-2.12-3.84l-21.89-18.77c-8.47-7.22-13.33-17.48-13.33-28.14 0-21.3 19.02-38.62 42.41-38.62H200c4.42 0 8 3.58 8 8v16c0 4.42-3.58 8-8 8h-12.27c-5.95 0-10.41 3.5-10.41 6.62 0 1.3.75 2.66 2.12 3.84l21.89 18.77c8.47 7.22 13.33 17.48 13.33 28.14.01 21.29-19 38.62-42.39 38.62zM256 264v20.8c0 20.27 5.7 40.17 16 56.88 10.3-16.7 16-36.61 16-56.88V264c0-4.42 3.58-8 8-8h16c4.42 0 8 3.58 8 8v20.8c0 35.48-12.88 68.89-36.28 94.09-3.02 3.25-7.27 5.11-11.72 5.11s-8.7-1.86-11.72-5.11c-23.4-25.2-36.28-58.61-36.28-94.09V264c0-4.42 3.58-8 8-8h16c4.42 0 8 3.58 8 8zm121-159L279.1 7c-4.5-4.5-10.6-7-17-7H256v128h128v-6.1c0-6.3-2.5-12.4-7-16.9z\" class=\"\"></path></svg>\n            <span v-html=\"localizedLabel.importExcel\" />\n          </button>\n        </div>\n        <div>\n          <div ref=\"panelList\" class=\"panel-list\">\n            <draggable v-model=\"fields\" draggable=\".panel-list-item\">\n              <div v-for=\"(item, k) in fields\" :key=\"k\"\n                   class=\"panel-list-item\"\n                   @click.prevent=\"columnLabelClick(item)\">\n                <input type=\"checkbox\" :checked=\"!item.invisible\" class=\"panel-checkbox\">\n                <span>{{ item.label }}</span>\n              </div>\n            </draggable>\n          </div>\n        </div>\n      </div>\n\n      <div class=\"panel-footer\">\n        <button ref=\"button\" class=\"panel-button\" @click=\"hidePanel\">\n          <svg aria-hidden=\"true\" focusable=\"false\" data-prefix=\"fas\" data-icon=\"save\" role=\"img\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 448 512\" class=\"svg-inline--fa fa-save fa-w-14 fa-fw fa-sm\"><path fill=\"currentColor\" d=\"M433.941 129.941l-83.882-83.882A48 48 0 0 0 316.118 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V163.882a48 48 0 0 0-14.059-33.941zM224 416c-35.346 0-64-28.654-64-64 0-35.346 28.654-64 64-64s64 28.654 64 64c0 35.346-28.654 64-64 64zm96-304.52V212c0 6.627-5.373 12-12 12H76c-6.627 0-12-5.373-12-12V108c0-6.627 5.373-12 12-12h228.52c3.183 0 6.235 1.264 8.485 3.515l3.48 3.48A11.996 11.996 0 0 1 320 111.48z\" class=\"\"></path></svg>\n          <span v-html=\"localizedLabel.back\" />\n        </button>\n      </div>\n    </div>\n  </div>\n</template>\n\n<script>\nimport draggable from 'vuedraggable'\n\nexport default {\n  components: {\n    'draggable': draggable\n  },\n  props: {\n    value: Array,\n    localizedLabel: {\n      type: Object,\n      default () {\n        return {\n          tableSetting: 'Table Setting',\n          exportExcel: 'Export Excel',\n          importExcel: 'Import Excel',\n          back: 'Back'\n        }\n      }\n    }\n  },\n  data () {\n    return {\n      show: false,\n      processing: false\n    }\n  },\n  computed: {\n    fields: {\n      get: function () {\n        return this.value\n      },\n      set: function (newVal) {\n        this.$emit('input', newVal)\n      }\n    }\n  },\n  methods: {\n    clickOutside (e) {\n      if (e.target.id === 'panelModal') this.hidePanel()\n    },\n    columnLabelClick (item) {\n      item.invisible = !item.invisible\n      setTimeout(this.$parent.calStickyLeft)\n    },\n    freezePanelSizeAfterShown () {\n      const target = this.$refs.panelList\n      const rect = target.getBoundingClientRect()\n      target.setAttribute('style', `width:${rect.width}px; height:${rect.height}px;`)\n    },\n    removePanelSizeAfterHide () {\n      const target = this.$refs.panelList\n      target.removeAttribute('style')\n    },\n    exportTable (format) {\n      this.hidePanel()\n      this.$parent.exportTable(format)\n    },\n    importTable () {\n      this.hidePanel()\n      this.$parent.importTable()\n    },\n    showPanel () {\n      this.show = true\n      setTimeout(() => (this.$refs.button.focus()))\n      setTimeout(() => this.freezePanelSizeAfterShown())\n    },\n    hidePanel () {\n      this.show = false\n      this.removePanelSizeAfterHide()\n    }\n  }\n}\n</script>\n\n<style scoped>\n\ninput:focus, button:focus {\n  outline: none !important;\n  box-shadow: inset 0 -1px 0 #ddd !important;\n}\n\n.panel-modal {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100vw;\n  height: 100vh;\n  overflow: hidden;\n  background-color: #0007;\n  z-index: 999;\n  font-weight: 400;\n  font-size: 1rem;\n  text-shadow: none;\n}\n\n.panel-body {\n  background-color: white;\n  position: fixed;\n  border-radius: 5px;\n  padding: 0;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  width: 28rem;\n  max-width: 75vh;\n  height: fit-content;\n  max-height: 80vh;\n  display: flex;\n  flex-direction: column;\n}\n\n.panel-title {\n  padding: 1rem;\n  display: flex;\n  color: dimgray;\n  font-size: 1.25rem;\n  line-height: 1.5rem;\n  align-items: center;\n  justify-content: flex-start;\n  border-bottom: 1px solid lightgray;\n}\n\ndiv.panel-title span, button.panel-button span {\n  margin-left: 6px;\n}\n\n.panel-content {\n  padding: 1rem;\n  text-align: left;\n  overflow-y: scroll;\n}\n\n.panel-content .panel-button {\n  width: 48%;\n  background-color: #17a2b8;\n}\n\n.panel-action {\n  display: inline-block;\n  margin-bottom: 0.5rem;\n  width: 100%;\n  position: relative;\n  white-space: nowrap;\n}\n\n.panel-footer {\n  display: flex;\n  padding: 1rem;\n  align-items: center;\n  justify-content: flex-end;\n  border-top: 1px solid lightgray;\n}\n\n.panel-button {\n  width: 120px;\n  font-size: 0.88rem;\n  border-radius: 5px;\n  border: 0;\n  background-color: #007bff;\n  color: white;\n  padding: 0.6rem;\n  cursor: pointer;\n}\n\n.float-left {\n  float: left !important;\n}\n\n.float-right {\n  float: right !important;\n}\n\n.panel-list {\n  overflow-y: scroll;\n  max-height: 20rem;\n  border: 1px solid #ced4da;\n  border-radius: 0.25rem;\n  display: flex;\n  flex-direction: column;\n}\n.panel-checkbox {\n  vertical-align: 2px;\n}\n.panel-list span {\n  margin-left: 10px;\n  color: gray;\n}\n.panel-list-item {\n  padding: 10px 10px;\n  font-size: 0.88rem;\n  cursor: pointer;\n}\n.panel-list-item:hover {\n  background-color: lightskyblue;\n}\n.panel-list-item:not(:last-child) {\n  border-bottom: 1px solid lightgray;\n}\n\n.fa-spin {\n  -webkit-animation: fa-spin 2s infinite linear;\n  animation: fa-spin 2s infinite linear;\n}\n.svg-inline--fa.fa-w-14 {\n  width: 0.875em;\n}\n.svg-inline--fa.fa-w-16 {\n  width: 1em;\n}\n.svg-inline--fa.fa-fw {\n  width: 1.25em;\n}\n.svg-inline--fa {\n  display: inline-block;\n  font-size: inherit;\n  height: 1em;\n  overflow: visible;\n  vertical-align: -0.125em;\n}\n.fa-fw {\n  text-align: center;\n  width: 1.25em;\n}\n.fa-xs {\n  font-size: 0.75em;\n}\n.fa-sm {\n  font-size: 0.875em;\n}\n.fa-1x {\n  font-size: 1em;\n}\n.fa-2x {\n  font-size: 2em;\n}\n.fa-3x {\n  font-size: 3em;\n}\n</style>\n"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$2 = "data-v-56385c92";
  /* module identifier */
  const __vue_module_identifier__$2 = undefined;
  /* functional template */
  const __vue_is_functional_template__$2 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$2 = normalizeComponent(
    { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
    __vue_inject_styles__$2,
    __vue_script__$2,
    __vue_scope_id__$2,
    __vue_is_functional_template__$2,
    __vue_module_identifier__$2,
    false,
    createInjector,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var script$3 = {
  props: {
    localizedLabel: {
      type: Object,

      default() {
        return {};
      }

    }
  },

  data() {
    return {
      show: false,
      processing: false,
      inputFind: ''
    };
  },

  methods: {
    clickOutside(e) {
      if (e.target.id === 'panelModal') this.hidePanel();
    },

    doFind(s, e) {
      if (e) e.preventDefault();
      this.hidePanel();
      this.$parent.doFind(this.inputFind);
    },

    showPanel() {
      this.show = true;
      setTimeout(() => this.$refs.inputFind.focus());
    },

    hidePanel() {
      this.show = false;
    }

  }
};

/* script */
const __vue_script__$3 = script$3;

/* template */
var __vue_render__$3 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    {
      directives: [
        { name: "show", rawName: "v-show", value: _vm.show, expression: "show" }
      ],
      staticClass: "panel-modal",
      attrs: { id: "panelModal" },
      on: {
        click: _vm.clickOutside,
        keydown: function($event) {
          if (
            !$event.type.indexOf("key") &&
            _vm._k($event.keyCode, "esc", 27, $event.key, ["Esc", "Escape"])
          ) {
            return null
          }
          if (
            $event.ctrlKey ||
            $event.shiftKey ||
            $event.altKey ||
            $event.metaKey
          ) {
            return null
          }
          return _vm.hidePanel($event)
        }
      }
    },
    [
      _c("div", { ref: "panelFind", staticClass: "panel-body" }, [
        _c("div", [
          _c("span", { staticClass: "panel-input-b" }, [
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.inputFind,
                  expression: "inputFind"
                }
              ],
              ref: "inputFind",
              staticClass: "panel-input",
              attrs: {
                type: "text",
                trim: "",
                autocomplete: "off",
                autocorrect: "off",
                autocapitalize: "off",
                spellcheck: "false"
              },
              domProps: { value: _vm.inputFind },
              on: {
                keydown: function($event) {
                  if (
                    !$event.type.indexOf("key") &&
                    _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")
                  ) {
                    return null
                  }
                  if (
                    $event.ctrlKey ||
                    $event.shiftKey ||
                    $event.altKey ||
                    $event.metaKey
                  ) {
                    return null
                  }
                  return _vm.doFind(_vm.inputFind, $event)
                },
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.inputFind = $event.target.value;
                }
              }
            })
          ]),
          _vm._v(" "),
          _c(
            "button",
            {
              staticClass: "panel-input-button",
              on: {
                click: function($event) {
                  return _vm.doFind(_vm.inputFind)
                }
              }
            },
            [
              _c(
                "svg",
                {
                  staticClass: "svg-inline--fa fa-search fa-w-16 fa-sm",
                  attrs: {
                    "aria-hidden": "true",
                    focusable: "false",
                    "data-prefix": "fas",
                    "data-icon": "search",
                    role: "img",
                    xmlns: "http://www.w3.org/2000/svg",
                    viewBox: "0 0 512 512"
                  }
                },
                [
                  _c("path", {
                    attrs: {
                      fill: "currentColor",
                      d:
                        "M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
                    }
                  })
                ]
              )
            ]
          )
        ])
      ])
    ]
  )
};
var __vue_staticRenderFns__$3 = [];
__vue_render__$3._withStripped = true;

  /* style */
  const __vue_inject_styles__$3 = function (inject) {
    if (!inject) return
    inject("data-v-de81928c_0", { source: "\ninput[data-v-de81928c]:focus, button[data-v-de81928c]:focus {\n  outline: none !important;\n  box-shadow: none !important;\n}\n.panel-modal[data-v-de81928c] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100vw;\n  height: 100vh;\n  overflow: hidden;\n  background-color: #0007;\n  z-index: 999;\n  font-weight: 400;\n  font-size: 1rem;\n  text-shadow: none;\n}\n.panel-body[data-v-de81928c] {\n  background-color: white;\n  position: fixed;\n  border-radius: 5px;\n  padding: 1rem;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  width: 28rem;\n  max-width: 75vh;\n  height: fit-content;\n  max-height: 80vh;\n  display: flex;\n  flex-direction: column;\n  white-space: nowrap;\n}\n.panel-input-b[data-v-de81928c] {\n  display: inline-block;\n  border-top-left-radius: 4px;\n  border-bottom-left-radius: 4px;\n  width: calc(100% - 2.2rem);\n  border: 1px solid lightgray;\n  border-right: 0;\n  margin-right: -4px;\n  height: 2.3rem;\n}\n.panel-input[data-v-de81928c] {\n  border: 0;\n  box-shadow: none;\n  padding: 0.6rem;\n  width: calc(100% - 2.2rem);\n  font-size: 0.88rem;\n  background-color: transparent;\n}\n.panel-input-button[data-v-de81928c] {\n  border-top-right-radius: 4px;\n  border-bottom-right-radius: 4px;\n  color: white;\n  background-color: #28a745;\n  border: 1px solid #28a745;\n  font-size: 1.3rem;\n  width: 2.2rem;\n  height: 2.35rem;\n  vertical-align: -2px;\n  cursor: pointer;\n}\n.fa-spin[data-v-de81928c] {\n  -webkit-animation: fa-spin 2s infinite linear;\n  animation: fa-spin 2s infinite linear;\n}\n.svg-inline--fa.fa-w-14[data-v-de81928c] {\n  width: 0.875em;\n}\n.svg-inline--fa.fa-w-16[data-v-de81928c] {\n  width: 1em;\n}\n.svg-inline--fa.fa-fw[data-v-de81928c] {\n  width: 1.25em;\n}\n.svg-inline--fa[data-v-de81928c] {\n  display: inline-block;\n  font-size: inherit;\n  height: 1em;\n  overflow: visible;\n  vertical-align: -0.125em;\n}\n.fa-fw[data-v-de81928c] {\n  text-align: center;\n  width: 1.25em;\n}\n.fa-xs[data-v-de81928c] {\n  font-size: 0.75em;\n}\n.fa-sm[data-v-de81928c] {\n  font-size: 0.875em;\n}\n.fa-1x[data-v-de81928c] {\n  font-size: 1em;\n}\n.fa-2x[data-v-de81928c] {\n  font-size: 2em;\n}\n.fa-3x[data-v-de81928c] {\n  font-size: 3em;\n}\n", map: {"version":3,"sources":["/Users/can/vuejs/hello-world/plugins/VueExcelEditor/src/panelFind.vue"],"names":[],"mappings":";AA4DA;EACA,wBAAA;EACA,2BAAA;AACA;AAEA;EACA,eAAA;EACA,MAAA;EACA,OAAA;EACA,YAAA;EACA,aAAA;EACA,gBAAA;EACA,uBAAA;EACA,YAAA;EACA,gBAAA;EACA,eAAA;EACA,iBAAA;AACA;AAEA;EACA,uBAAA;EACA,eAAA;EACA,kBAAA;EACA,aAAA;EACA,QAAA;EACA,SAAA;EACA,gCAAA;EACA,YAAA;EACA,eAAA;EACA,mBAAA;EACA,gBAAA;EACA,aAAA;EACA,sBAAA;EACA,mBAAA;AACA;AAEA;EACA,qBAAA;EACA,2BAAA;EACA,8BAAA;EACA,0BAAA;EACA,2BAAA;EACA,eAAA;EACA,kBAAA;EACA,cAAA;AACA;AACA;EACA,SAAA;EACA,gBAAA;EACA,eAAA;EACA,0BAAA;EACA,kBAAA;EACA,6BAAA;AACA;AACA;EACA,4BAAA;EACA,+BAAA;EACA,YAAA;EACA,yBAAA;EACA,yBAAA;EACA,iBAAA;EACA,aAAA;EACA,eAAA;EACA,oBAAA;EACA,eAAA;AACA;AAEA;EACA,6CAAA;EACA,qCAAA;AACA;AACA;EACA,cAAA;AACA;AACA;EACA,UAAA;AACA;AACA;EACA,aAAA;AACA;AACA;EACA,qBAAA;EACA,kBAAA;EACA,WAAA;EACA,iBAAA;EACA,wBAAA;AACA;AACA;EACA,kBAAA;EACA,aAAA;AACA;AACA;EACA,iBAAA;AACA;AACA;EACA,kBAAA;AACA;AACA;EACA,cAAA;AACA;AACA;EACA,cAAA;AACA;AACA;EACA,cAAA;AACA","file":"panelFind.vue","sourcesContent":["<template>\n  <div id=\"panelModal\" v-show=\"show\" class=\"panel-modal\" @click=\"clickOutside\" @keydown.exact.esc=\"hidePanel\">\n    <div ref=\"panelFind\" class=\"panel-body\">\n      <div>\n        <span class=\"panel-input-b\">\n          <input type=\"text\"\n                 ref=\"inputFind\"\n                 v-model=\"inputFind\"\n                 class=\"panel-input\"\n                 trim autocomplete=\"off\" autocorrect=\"off\" autocapitalize=\"off\" spellcheck=\"false\"\n                 @keydown.exact.enter=\"doFind(inputFind, $event)\" />\n        </span>\n        <button class=\"panel-input-button\" @click=\"doFind(inputFind)\">\n          <svg aria-hidden=\"true\" focusable=\"false\" data-prefix=\"fas\" data-icon=\"search\" role=\"img\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\" class=\"svg-inline--fa fa-search fa-w-16 fa-sm\"><path fill=\"currentColor\" d=\"M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z\" class=\"\"></path></svg>\n        </button>\n      </div>\n    </div>\n  </div>\n</template>\n\n<script>\nexport default {\n  props: {\n    localizedLabel: {\n      type: Object,\n      default () {\n        return {\n        }\n      }\n    }\n  },\n  data () {\n    return {\n      show: false,\n      processing: false,\n      inputFind: ''\n    }\n  },\n  methods: {\n    clickOutside (e) {\n      if (e.target.id === 'panelModal') this.hidePanel()\n    },\n    doFind(s, e) {\n      if (e) e.preventDefault()\n      this.hidePanel()\n      this.$parent.doFind(this.inputFind)\n    },\n    showPanel () {\n      this.show = true\n      setTimeout(() => (this.$refs.inputFind.focus()))\n    },\n    hidePanel () {\n      this.show = false\n    }\n  }\n}\n</script>\n\n<style scoped>\n\ninput:focus, button:focus {\n  outline: none !important;\n  box-shadow: none !important;\n}\n\n.panel-modal {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100vw;\n  height: 100vh;\n  overflow: hidden;\n  background-color: #0007;\n  z-index: 999;\n  font-weight: 400;\n  font-size: 1rem;\n  text-shadow: none;\n}\n\n.panel-body {\n  background-color: white;\n  position: fixed;\n  border-radius: 5px;\n  padding: 1rem;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  width: 28rem;\n  max-width: 75vh;\n  height: fit-content;\n  max-height: 80vh;\n  display: flex;\n  flex-direction: column;\n  white-space: nowrap;\n}\n\n.panel-input-b {\n  display: inline-block;\n  border-top-left-radius: 4px;\n  border-bottom-left-radius: 4px;\n  width: calc(100% - 2.2rem);\n  border: 1px solid lightgray;\n  border-right: 0;\n  margin-right: -4px;\n  height: 2.3rem;\n}\n.panel-input {\n  border: 0;\n  box-shadow: none;\n  padding: 0.6rem;\n  width: calc(100% - 2.2rem);\n  font-size: 0.88rem;\n  background-color: transparent;\n}\n.panel-input-button {\n  border-top-right-radius: 4px;\n  border-bottom-right-radius: 4px;\n  color: white;\n  background-color: #28a745;\n  border: 1px solid #28a745;\n  font-size: 1.3rem;\n  width: 2.2rem;\n  height: 2.35rem;\n  vertical-align: -2px;\n  cursor: pointer;\n}\n\n.fa-spin {\n  -webkit-animation: fa-spin 2s infinite linear;\n  animation: fa-spin 2s infinite linear;\n}\n.svg-inline--fa.fa-w-14 {\n  width: 0.875em;\n}\n.svg-inline--fa.fa-w-16 {\n  width: 1em;\n}\n.svg-inline--fa.fa-fw {\n  width: 1.25em;\n}\n.svg-inline--fa {\n  display: inline-block;\n  font-size: inherit;\n  height: 1em;\n  overflow: visible;\n  vertical-align: -0.125em;\n}\n.fa-fw {\n  text-align: center;\n  width: 1.25em;\n}\n.fa-xs {\n  font-size: 0.75em;\n}\n.fa-sm {\n  font-size: 0.875em;\n}\n.fa-1x {\n  font-size: 1em;\n}\n.fa-2x {\n  font-size: 2em;\n}\n.fa-3x {\n  font-size: 3em;\n}\n</style>\n"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$3 = "data-v-de81928c";
  /* module identifier */
  const __vue_module_identifier__$3 = undefined;
  /* functional template */
  const __vue_is_functional_template__$3 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$3 = normalizeComponent(
    { render: __vue_render__$3, staticRenderFns: __vue_staticRenderFns__$3 },
    __vue_inject_styles__$3,
    __vue_script__$3,
    __vue_scope_id__$3,
    __vue_is_functional_template__$3,
    __vue_module_identifier__$3,
    false,
    createInjector,
    undefined,
    undefined
  );

/**
 * @name toDate
 * @category Common Helpers
 * @summary Convert the given argument to an instance of Date.
 *
 * @description
 * Convert the given argument to an instance of Date.
 *
 * If the argument is an instance of Date, the function returns its clone.
 *
 * If the argument is a number, it is treated as a timestamp.
 *
 * If the argument is none of the above, the function returns Invalid Date.
 *
 * **Note**: *all* Date arguments passed to any *date-fns* function is processed by `toDate`.
 *
 * @param {Date|Number} argument - the value to convert
 * @returns {Date} the parsed date in the local time zone
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Clone the date:
 * const result = toDate(new Date(2014, 1, 11, 11, 30, 30))
 * //=> Tue Feb 11 2014 11:30:30
 *
 * @example
 * // Convert the timestamp to date:
 * const result = toDate(1392098430000)
 * //=> Tue Feb 11 2014 11:30:30
 */
function toDate(argument) {
  if (arguments.length < 1) {
    throw new TypeError('1 argument required, but only ' + arguments.length + ' present');
  }

  var argStr = Object.prototype.toString.call(argument); // Clone the date

  if (argument instanceof Date || typeof argument === 'object' && argStr === '[object Date]') {
    // Prevent the date to lose the milliseconds when passed to new Date() in IE10
    return new Date(argument.getTime());
  } else if (typeof argument === 'number' || argStr === '[object Number]') {
    return new Date(argument);
  } else {
    if ((typeof argument === 'string' || argStr === '[object String]') && typeof console !== 'undefined') {
      // eslint-disable-next-line no-console
      console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as arguments. Please use `parseISO` to parse strings. See: https://git.io/fjule"); // eslint-disable-next-line no-console

      console.warn(new Error().stack);
    }

    return new Date(NaN);
  }
}

function toInteger(dirtyNumber) {
  if (dirtyNumber === null || dirtyNumber === true || dirtyNumber === false) {
    return NaN;
  }

  var number = Number(dirtyNumber);

  if (isNaN(number)) {
    return number;
  }

  return number < 0 ? Math.ceil(number) : Math.floor(number);
}

/**
 * @name startOfDay
 * @category Day Helpers
 * @summary Return the start of a day for the given date.
 *
 * @description
 * Return the start of a day for the given date.
 * The result will be in the local timezone.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the original date
 * @returns {Date} the start of a day
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // The start of a day for 2 September 2014 11:55:00:
 * var result = startOfDay(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 02 2014 00:00:00
 */

function startOfDay(dirtyDate) {
  if (arguments.length < 1) {
    throw new TypeError('1 argument required, but only ' + arguments.length + ' present');
  }

  var date = toDate(dirtyDate);
  date.setHours(0, 0, 0, 0);
  return date;
}

/**
 * @name getDaysInMonth
 * @category Month Helpers
 * @summary Get the number of days in a month of the given date.
 *
 * @description
 * Get the number of days in a month of the given date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the given date
 * @returns {Number} the number of days in a month
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // How many days are in February 2000?
 * var result = getDaysInMonth(new Date(2000, 1))
 * //=> 29
 */

function getDaysInMonth(dirtyDate) {
  if (arguments.length < 1) {
    throw new TypeError('1 argument required, but only ' + arguments.length + ' present');
  }

  var date = toDate(dirtyDate);
  var year = date.getFullYear();
  var monthIndex = date.getMonth();
  var lastDayOfMonth = new Date(0);
  lastDayOfMonth.setFullYear(year, monthIndex + 1, 0);
  lastDayOfMonth.setHours(0, 0, 0, 0);
  return lastDayOfMonth.getDate();
}

/**
 * @name addMonths
 * @category Month Helpers
 * @summary Add the specified number of months to the given date.
 *
 * @description
 * Add the specified number of months to the given date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} amount - the amount of months to be added
 * @returns {Date} the new date with the months added
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Add 5 months to 1 September 2014:
 * var result = addMonths(new Date(2014, 8, 1), 5)
 * //=> Sun Feb 01 2015 00:00:00
 */

function addMonths(dirtyDate, dirtyAmount) {
  if (arguments.length < 2) {
    throw new TypeError('2 arguments required, but only ' + arguments.length + ' present');
  }

  var date = toDate(dirtyDate);
  var amount = toInteger(dirtyAmount);
  var desiredMonth = date.getMonth() + amount;
  var dateWithDesiredMonth = new Date(0);
  dateWithDesiredMonth.setFullYear(date.getFullYear(), desiredMonth, 1);
  dateWithDesiredMonth.setHours(0, 0, 0, 0);
  var daysInMonth = getDaysInMonth(dateWithDesiredMonth); // Set the last day of the new month
  // if the original date was the last day of the longer month

  date.setMonth(desiredMonth, Math.min(daysInMonth, date.getDate()));
  return date;
}

/**
 * @name addYears
 * @category Year Helpers
 * @summary Add the specified number of years to the given date.
 *
 * @description
 * Add the specified number of years to the given date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} amount - the amount of years to be added
 * @returns {Date} the new date with the years added
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Add 5 years to 1 September 2014:
 * var result = addYears(new Date(2014, 8, 1), 5)
 * //=> Sun Sep 01 2019 00:00:00
 */

function addYears(dirtyDate, dirtyAmount) {
  if (arguments.length < 2) {
    throw new TypeError('2 arguments required, but only ' + arguments.length + ' present');
  }

  var amount = toInteger(dirtyAmount);
  return addMonths(dirtyDate, amount * 12);
}

/**
 * @name differenceInCalendarMonths
 * @category Month Helpers
 * @summary Get the number of calendar months between the given dates.
 *
 * @description
 * Get the number of calendar months between the given dates.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} dateLeft - the later date
 * @param {Date|Number} dateRight - the earlier date
 * @returns {Number} the number of calendar months
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // How many calendar months are between 31 January 2014 and 1 September 2014?
 * var result = differenceInCalendarMonths(
 *   new Date(2014, 8, 1),
 *   new Date(2014, 0, 31)
 * )
 * //=> 8
 */

function differenceInCalendarMonths(dirtyDateLeft, dirtyDateRight) {
  if (arguments.length < 2) {
    throw new TypeError('2 arguments required, but only ' + arguments.length + ' present');
  }

  var dateLeft = toDate(dirtyDateLeft);
  var dateRight = toDate(dirtyDateRight);
  var yearDiff = dateLeft.getFullYear() - dateRight.getFullYear();
  var monthDiff = dateLeft.getMonth() - dateRight.getMonth();
  return yearDiff * 12 + monthDiff;
}

/**
 * @name startOfMonth
 * @category Month Helpers
 * @summary Return the start of a month for the given date.
 *
 * @description
 * Return the start of a month for the given date.
 * The result will be in the local timezone.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the original date
 * @returns {Date} the start of a month
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // The start of a month for 2 September 2014 11:55:00:
 * var result = startOfMonth(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Mon Sep 01 2014 00:00:00
 */

function startOfMonth(dirtyDate) {
  if (arguments.length < 1) {
    throw new TypeError('1 argument required, but only ' + arguments.length + ' present');
  }

  var date = toDate(dirtyDate);
  date.setDate(1);
  date.setHours(0, 0, 0, 0);
  return date;
}

/**
 * @name startOfYear
 * @category Year Helpers
 * @summary Return the start of a year for the given date.
 *
 * @description
 * Return the start of a year for the given date.
 * The result will be in the local timezone.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the original date
 * @returns {Date} the start of a year
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // The start of a year for 2 September 2014 11:55:00:
 * var result = startOfYear(new Date(2014, 8, 2, 11, 55, 00))
 * //=> Wed Jan 01 2014 00:00:00
 */

function startOfYear(dirtyDate) {
  if (arguments.length < 1) {
    throw new TypeError('1 argument required, but only ' + arguments.length + ' present');
  }

  var cleanDate = toDate(dirtyDate);
  var date = new Date(0);
  date.setFullYear(cleanDate.getFullYear(), 0, 1);
  date.setHours(0, 0, 0, 0);
  return date;
}

/**
 * @name setMonth
 * @category Month Helpers
 * @summary Set the month to the given date.
 *
 * @description
 * Set the month to the given date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} month - the month of the new date
 * @returns {Date} the new date with the month set
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Set February to 1 September 2014:
 * var result = setMonth(new Date(2014, 8, 1), 1)
 * //=> Sat Feb 01 2014 00:00:00
 */

function setMonth(dirtyDate, dirtyMonth) {
  if (arguments.length < 2) {
    throw new TypeError('2 arguments required, but only ' + arguments.length + ' present');
  }

  var date = toDate(dirtyDate);
  var month = toInteger(dirtyMonth);
  var year = date.getFullYear();
  var day = date.getDate();
  var dateWithDesiredMonth = new Date(0);
  dateWithDesiredMonth.setFullYear(year, month, 15);
  dateWithDesiredMonth.setHours(0, 0, 0, 0);
  var daysInMonth = getDaysInMonth(dateWithDesiredMonth); // Set the last day of the new month
  // if the original date was the last day of the longer month

  date.setMonth(month, Math.min(day, daysInMonth));
  return date;
}

/**
 * @name setYear
 * @category Year Helpers
 * @summary Set the year to the given date.
 *
 * @description
 * Set the year to the given date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} year - the year of the new date
 * @returns {Date} the new date with the year set
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Set year 2013 to 1 September 2014:
 * var result = setYear(new Date(2014, 8, 1), 2013)
 * //=> Sun Sep 01 2013 00:00:00
 */

function setYear(dirtyDate, dirtyYear) {
  if (arguments.length < 2) {
    throw new TypeError('2 arguments required, but only ' + arguments.length + ' present');
  }

  var date = toDate(dirtyDate);
  var year = toInteger(dirtyYear); // Check if date is Invalid Date because Date.prototype.setFullYear ignores the value of Invalid Date

  if (isNaN(date)) {
    return new Date(NaN);
  }

  date.setFullYear(year);
  return date;
}

/**
 * @name subMonths
 * @category Month Helpers
 * @summary Subtract the specified number of months from the given date.
 *
 * @description
 * Subtract the specified number of months from the given date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} amount - the amount of months to be subtracted
 * @returns {Date} the new date with the months subtracted
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Subtract 5 months from 1 February 2015:
 * var result = subMonths(new Date(2015, 1, 1), 5)
 * //=> Mon Sep 01 2014 00:00:00
 */

function subMonths(dirtyDate, dirtyAmount) {
  if (arguments.length < 2) {
    throw new TypeError('2 arguments required, but only ' + arguments.length + ' present');
  }

  var amount = toInteger(dirtyAmount);
  return addMonths(dirtyDate, -amount);
}

/**
 * @name subYears
 * @category Year Helpers
 * @summary Subtract the specified number of years from the given date.
 *
 * @description
 * Subtract the specified number of years from the given date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} amount - the amount of years to be subtracted
 * @returns {Date} the new date with the years subtracted
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Subtract 5 years from 1 September 2014:
 * var result = subYears(new Date(2014, 8, 1), 5)
 * //=> Tue Sep 01 2009 00:00:00
 */

function subYears(dirtyDate, dirtyAmount) {
  if (arguments.length < 2) {
    throw new TypeError('2 arguments required, but only ' + arguments.length + ' present');
  }

  var amount = toInteger(dirtyAmount);
  return addYears(dirtyDate, -amount);
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(source, true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(source).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) {
    return;
  }

  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

function isDate(value) {
  return value instanceof Date || Object.prototype.toString.call(value) === '[object Date]';
}

function toDate$1(value) {
  if (isDate(value)) {
    return new Date(value.getTime());
  }

  if (value == null) {
    return new Date(NaN);
  }

  return new Date(value);
}

function isValidDate(value) {
  return isDate(value) && !isNaN(value.getTime());
}

function startOfWeek(value) {
  var firstDayOfWeek = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  if (!(firstDayOfWeek >= 0 && firstDayOfWeek <= 6)) {
    throw new RangeError('weekStartsOn must be between 0 and 6');
  }

  var date = toDate$1(value);
  var day = date.getDay();
  var diff = (day + 7 - firstDayOfWeek) % 7;
  date.setDate(date.getDate() - diff);
  date.setHours(0, 0, 0, 0);
  return date;
}

function startOfWeekYear(value) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$firstDayOfWeek = _ref.firstDayOfWeek,
      firstDayOfWeek = _ref$firstDayOfWeek === void 0 ? 0 : _ref$firstDayOfWeek,
      _ref$firstWeekContain = _ref.firstWeekContainsDate,
      firstWeekContainsDate = _ref$firstWeekContain === void 0 ? 1 : _ref$firstWeekContain;

  if (!(firstWeekContainsDate >= 1 && firstWeekContainsDate <= 7)) {
    throw new RangeError('firstWeekContainsDate must be between 1 and 7');
  }

  var date = toDate$1(value);
  var year = date.getFullYear();
  var firstDateOfFirstWeek = new Date(0);

  for (var i = year + 1; i >= year - 1; i--) {
    firstDateOfFirstWeek.setFullYear(i, 0, firstWeekContainsDate);
    firstDateOfFirstWeek.setHours(0, 0, 0, 0);
    firstDateOfFirstWeek = startOfWeek(firstDateOfFirstWeek, firstDayOfWeek);

    if (date.getTime() >= firstDateOfFirstWeek.getTime()) {
      break;
    }
  }

  return firstDateOfFirstWeek;
}

function getWeek(value) {
  var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref2$firstDayOfWeek = _ref2.firstDayOfWeek,
      firstDayOfWeek = _ref2$firstDayOfWeek === void 0 ? 0 : _ref2$firstDayOfWeek,
      _ref2$firstWeekContai = _ref2.firstWeekContainsDate,
      firstWeekContainsDate = _ref2$firstWeekContai === void 0 ? 1 : _ref2$firstWeekContai;

  var date = toDate$1(value);
  var firstDateOfThisWeek = startOfWeek(date, firstDayOfWeek);
  var firstDateOfFirstWeek = startOfWeekYear(date, {
    firstDayOfWeek: firstDayOfWeek,
    firstWeekContainsDate: firstWeekContainsDate
  });
  var diff = firstDateOfThisWeek.getTime() - firstDateOfFirstWeek.getTime();
  return Math.round(diff / (7 * 24 * 3600 * 1000)) + 1;
}

var locale = {
  months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  weekdays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  weekdaysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  weekdaysMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
  firstDayOfWeek: 0,
  firstWeekContainsDate: 1
};
var REGEX_FORMAT = /\[([^\]]+)]|YYYY|YY?|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|m{1,2}|s{1,2}|Z{1,2}|S{1,3}|w{1,2}|x|X|a|A/g;

function pad(val) {
  var len = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
  var output = "".concat(Math.abs(val));
  var sign = val < 0 ? '-' : '';

  while (output.length < len) {
    output = "0".concat(output);
  }

  return sign + output;
}

function formatTimezone(offset) {
  var delimeter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var sign = offset > 0 ? '-' : '+';
  var absOffset = Math.abs(offset);
  var hours = Math.floor(absOffset / 60);
  var minutes = absOffset % 60;
  return sign + pad(hours, 2) + delimeter + pad(minutes, 2);
}

var meridiem = function meridiem(h, _, isLowercase) {
  var word = h < 12 ? 'AM' : 'PM';
  return isLowercase ? word.toLocaleLowerCase() : word;
};

var formatFlags = {
  Y: function Y(date) {
    var y = date.getFullYear();
    return y <= 9999 ? "".concat(y) : "+".concat(y);
  },
  // Year: 00, 01, ..., 99
  YY: function YY(date) {
    return pad(date.getFullYear(), 4).substr(2);
  },
  // Year: 1900, 1901, ..., 2099
  YYYY: function YYYY(date) {
    return pad(date.getFullYear(), 4);
  },
  // Month: 1, 2, ..., 12
  M: function M(date) {
    return date.getMonth() + 1;
  },
  // Month: 01, 02, ..., 12
  MM: function MM(date) {
    return pad(date.getMonth() + 1, 2);
  },
  MMM: function MMM(date, locale) {
    return locale.monthsShort[date.getMonth()];
  },
  MMMM: function MMMM(date, locale) {
    return locale.months[date.getMonth()];
  },
  // Day of month: 1, 2, ..., 31
  D: function D(date) {
    return date.getDate();
  },
  // Day of month: 01, 02, ..., 31
  DD: function DD(date) {
    return pad(date.getDate(), 2);
  },
  // Hour: 0, 1, ... 23
  H: function H(date) {
    return date.getHours();
  },
  // Hour: 00, 01, ..., 23
  HH: function HH(date) {
    return pad(date.getHours(), 2);
  },
  // Hour: 1, 2, ..., 12
  h: function h(date) {
    var hours = date.getHours();

    if (hours === 0) {
      return 12;
    }

    if (hours > 12) {
      return hours % 12;
    }

    return hours;
  },
  // Hour: 01, 02, ..., 12
  hh: function hh() {
    var hours = formatFlags.h.apply(formatFlags, arguments);
    return pad(hours, 2);
  },
  // Minute: 0, 1, ..., 59
  m: function m(date) {
    return date.getMinutes();
  },
  // Minute: 00, 01, ..., 59
  mm: function mm(date) {
    return pad(date.getMinutes(), 2);
  },
  // Second: 0, 1, ..., 59
  s: function s(date) {
    return date.getSeconds();
  },
  // Second: 00, 01, ..., 59
  ss: function ss(date) {
    return pad(date.getSeconds(), 2);
  },
  // 1/10 of second: 0, 1, ..., 9
  S: function S(date) {
    return Math.floor(date.getMilliseconds() / 100);
  },
  // 1/100 of second: 00, 01, ..., 99
  SS: function SS(date) {
    return pad(Math.floor(date.getMilliseconds() / 10), 2);
  },
  // Millisecond: 000, 001, ..., 999
  SSS: function SSS(date) {
    return pad(date.getMilliseconds(), 3);
  },
  // Day of week: 0, 1, ..., 6
  d: function d(date) {
    return date.getDay();
  },
  // Day of week: 'Su', 'Mo', ..., 'Sa'
  dd: function dd(date, locale) {
    return locale.weekdaysMin[date.getDay()];
  },
  // Day of week: 'Sun', 'Mon',..., 'Sat'
  ddd: function ddd(date, locale) {
    return locale.weekdaysShort[date.getDay()];
  },
  // Day of week: 'Sunday', 'Monday', ...,'Saturday'
  dddd: function dddd(date, locale) {
    return locale.weekdays[date.getDay()];
  },
  // AM, PM
  A: function A(date, locale) {
    var meridiemFunc = locale.meridiem || meridiem;
    return meridiemFunc(date.getHours(), date.getMinutes(), false);
  },
  // am, pm
  a: function a(date, locale) {
    var meridiemFunc = locale.meridiem || meridiem;
    return meridiemFunc(date.getHours(), date.getMinutes(), true);
  },
  // Timezone: -01:00, +00:00, ... +12:00
  Z: function Z(date) {
    return formatTimezone(date.getTimezoneOffset(), ':');
  },
  // Timezone: -0100, +0000, ... +1200
  ZZ: function ZZ(date) {
    return formatTimezone(date.getTimezoneOffset());
  },
  // Seconds timestamp: 512969520
  X: function X(date) {
    return Math.floor(date.getTime() / 1000);
  },
  // Milliseconds timestamp: 512969520900
  x: function x(date) {
    return date.getTime();
  },
  w: function w(date, locale) {
    return getWeek(date, {
      firstDayOfWeek: locale.firstDayOfWeek,
      firstWeekContainsDate: locale.firstWeekContainsDate
    });
  },
  ww: function ww(date, locale) {
    return pad(formatFlags.w(date, locale), 2);
  }
};

function format(val, str) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var formatStr = str ? String(str) : 'YYYY-MM-DDTHH:mm:ss.SSSZ';
  var date = toDate$1(val);

  if (!isValidDate(date)) {
    return 'Invalid Date';
  }

  var locale$1 = options.locale || locale;
  return formatStr.replace(REGEX_FORMAT, function (match, p1) {
    if (p1) {
      return p1;
    }

    if (typeof formatFlags[match] === 'function') {
      return "".concat(formatFlags[match](date, locale$1));
    }

    return match;
  });
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }
}

function ownKeys$1(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys$1(source, true).forEach(function (key) {
        _defineProperty$1(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys$1(source).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _slicedToArray$1(arr, i) {
  return _arrayWithHoles$1(arr) || _iterableToArrayLimit$1(arr, i) || _nonIterableRest$1();
}

function _nonIterableRest$1() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

function _iterableToArrayLimit$1(arr, i) {
  if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) {
    return;
  }

  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _arrayWithHoles$1(arr) {
  if (Array.isArray(arr)) return arr;
}

function _defineProperty$1(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

var formattingTokens = /(\[[^\[]*\])|(MM?M?M?|Do|DD?|ddd?d?|w[o|w]?|YYYY|YY|a|A|hh?|HH?|mm?|ss?|S{1,3}|x|X|ZZ?|.)/g;
var match1 = /\d/; // 0 - 9

var match2 = /\d\d/; // 00 - 99

var match3 = /\d{3}/; // 000 - 999

var match4 = /\d{4}/; // 0000 - 9999

var match1to2 = /\d\d?/; // 0 - 99

var matchShortOffset = /[+-]\d\d:?\d\d/; // +00:00 -00:00 +0000 or -0000

var matchSigned = /[+-]?\d+/; // -inf - inf

var matchTimestamp = /[+-]?\d+(\.\d{1,3})?/; // 123456789 123456789.123

var matchWord = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i; // Word

var YEAR = 'year';
var MONTH = 'month';
var DAY = 'day';
var HOUR = 'hour';
var MINUTE = 'minute';
var SECOND = 'second';
var MILLISECOND = 'millisecond';
var parseFlags = {};

var addParseFlag = function addParseFlag(token, regex, callback) {
  var tokens = Array.isArray(token) ? token : [token];
  var func;

  if (typeof callback === 'string') {
    func = function func(input) {
      var value = parseInt(input, 10);
      return _defineProperty$1({}, callback, value);
    };
  } else {
    func = callback;
  }

  tokens.forEach(function (key) {
    parseFlags[key] = [regex, func];
  });
};

var matchWordCallback = function matchWordCallback(localeKey, key) {
  return function (input, locale) {
    var array = locale[localeKey];

    if (!Array.isArray(array)) {
      throw new Error("Locale[".concat(localeKey, "] need an array"));
    }

    var index = array.indexOf(input);

    if (index < 0) {
      throw new Error('Invalid Word');
    }

    return _defineProperty$1({}, key, index);
  };
};

addParseFlag('Y', matchSigned, YEAR);
addParseFlag('YY', match2, function (input) {
  var year = new Date().getFullYear();
  var cent = Math.floor(year / 100);
  var value = parseInt(input, 10);
  value = (value > 68 ? cent - 1 : cent) * 100 + value;
  return _defineProperty$1({}, YEAR, value);
});
addParseFlag('YYYY', match4, YEAR);
addParseFlag('M', match1to2, function (input) {
  return _defineProperty$1({}, MONTH, parseInt(input, 10) - 1);
});
addParseFlag('MM', match2, function (input) {
  return _defineProperty$1({}, MONTH, parseInt(input, 10) - 1);
});
addParseFlag('MMM', matchWord, matchWordCallback('monthsShort', MONTH));
addParseFlag('MMMM', matchWord, matchWordCallback('months', MONTH));
addParseFlag('D', match1to2, DAY);
addParseFlag('DD', match2, DAY);
addParseFlag(['H', 'h'], match1to2, HOUR);
addParseFlag(['HH', 'hh'], match2, HOUR);
addParseFlag('m', match1to2, MINUTE);
addParseFlag('mm', match2, MINUTE);
addParseFlag('s', match1to2, SECOND);
addParseFlag('ss', match2, SECOND);
addParseFlag('S', match1, function (input) {
  return _defineProperty$1({}, MILLISECOND, parseInt(input, 10) * 100);
});
addParseFlag('SS', match2, function (input) {
  return _defineProperty$1({}, MILLISECOND, parseInt(input, 10) * 10);
});
addParseFlag('SSS', match3, MILLISECOND);

function matchMeridiem(locale) {
  return locale.meridiemParse || /[ap]\.?m?\.?/i;
}

function defaultIsPM(input) {
  return "".concat(input).toLowerCase().charAt(0) === 'p';
}

addParseFlag(['A', 'a'], matchMeridiem, function (input, locale) {
  var isPM = typeof locale.isPM === 'function' ? locale.isPM(input) : defaultIsPM(input);
  return {
    isPM: isPM
  };
});

function offsetFromString(str) {
  var _ref8 = str.match(/([+-]|\d\d)/g) || ['-', '0', '0'],
      _ref9 = _slicedToArray$1(_ref8, 3),
      symbol = _ref9[0],
      hour = _ref9[1],
      minute = _ref9[2];

  var minutes = parseInt(hour, 10) * 60 + parseInt(minute, 10);

  if (minutes === 0) {
    return 0;
  }

  return symbol === '+' ? -minutes : +minutes;
}

addParseFlag(['Z', 'ZZ'], matchShortOffset, function (input) {
  return {
    offset: offsetFromString(input)
  };
});
addParseFlag('x', matchSigned, function (input) {
  return {
    date: new Date(parseInt(input, 10))
  };
});
addParseFlag('X', matchTimestamp, function (input) {
  return {
    date: new Date(parseFloat(input) * 1000)
  };
});
addParseFlag('d', match1, 'weekday');
addParseFlag('dd', matchWord, matchWordCallback('weekdaysMin', 'weekday'));
addParseFlag('ddd', matchWord, matchWordCallback('weekdaysShort', 'weekday'));
addParseFlag('dddd', matchWord, matchWordCallback('weekdays', 'weekday'));
addParseFlag('w', match1to2, 'week');
addParseFlag('ww', match2, 'week');

function to24hour(hour, isPM) {
  if (hour !== undefined && isPM !== undefined) {
    if (isPM) {
      if (hour < 12) {
        return hour + 12;
      }
    } else if (hour === 12) {
      return 0;
    }
  }

  return hour;
}

function getFullInputArray(input) {
  var backupDate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Date();
  var result = [0, 0, 1, 0, 0, 0, 0];
  var backupArr = [backupDate.getFullYear(), backupDate.getMonth(), backupDate.getDate(), backupDate.getHours(), backupDate.getMinutes(), backupDate.getSeconds(), backupDate.getMilliseconds()];
  var useBackup = true;

  for (var i = 0; i < 7; i++) {
    if (input[i] === undefined) {
      result[i] = useBackup ? backupArr[i] : result[i];
    } else {
      result[i] = input[i];
      useBackup = false;
    }
  }

  return result;
}

function createUTCDate() {
  var date;

  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var y = args[0];

  if (y < 100 && y >= 0) {
    args[0] += 400;
    date = new Date(Date.UTC.apply(Date, args)); // eslint-disable-next-line no-restricted-globals

    if (isFinite(date.getUTCFullYear())) {
      date.setUTCFullYear(y);
    }
  } else {
    date = new Date(Date.UTC.apply(Date, args));
  }

  return date;
}

function makeParser(dateString, format, locale) {
  var tokens = format.match(formattingTokens);

  if (!tokens) {
    throw new Error();
  }

  var length = tokens.length;
  var mark = {};

  for (var i = 0; i < length; i += 1) {
    var token = tokens[i];
    var parseTo = parseFlags[token];

    if (!parseTo) {
      var word = token.replace(/^\[|\]$/g, '');

      if (dateString.indexOf(word) === 0) {
        dateString = dateString.substr(word.length);
      } else {
        throw new Error('not match');
      }
    } else {
      var regex = typeof parseTo[0] === 'function' ? parseTo[0](locale) : parseTo[0];
      var parser = parseTo[1];
      var value = (regex.exec(dateString) || [])[0];
      var obj = parser(value, locale);
      mark = _objectSpread({}, mark, {}, obj);
      dateString = dateString.replace(value, '');
    }
  }

  return mark;
}

function parse(str, format) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  try {
    var _options$locale = options.locale,
        _locale = _options$locale === void 0 ? locale : _options$locale,
        _options$backupDate = options.backupDate,
        backupDate = _options$backupDate === void 0 ? new Date() : _options$backupDate;

    var parseResult = makeParser(str, format, _locale);
    var year = parseResult.year,
        month = parseResult.month,
        day = parseResult.day,
        hour = parseResult.hour,
        minute = parseResult.minute,
        second = parseResult.second,
        millisecond = parseResult.millisecond,
        isPM = parseResult.isPM,
        date = parseResult.date,
        offset = parseResult.offset,
        weekday = parseResult.weekday,
        week = parseResult.week;

    if (date) {
      return date;
    }

    var inputArray = [year, month, day, hour, minute, second, millisecond];
    inputArray[3] = to24hour(inputArray[3], isPM); // check week

    if (week !== undefined && month === undefined && day === undefined) {
      // new Date(year, 3) make sure in current year
      var firstDate = startOfWeekYear(year === undefined ? backupDate : new Date(year, 3), {
        firstDayOfWeek: _locale.firstDayOfWeek,
        firstWeekContainsDate: _locale.firstWeekContainsDate
      });
      return new Date(firstDate.getTime() + (week - 1) * 7 * 24 * 3600 * 1000);
    }

    var utcDate = createUTCDate.apply(void 0, _toConsumableArray(getFullInputArray(inputArray, backupDate)));
    var offsetMilliseconds = (offset === undefined ? utcDate.getTimezoneOffset() : offset) * 60 * 1000;
    var parsedDate = new Date(utcDate.getTime() + offsetMilliseconds); // check weekday

    if (weekday !== undefined && parsedDate.getDay() !== weekday) {
      return new Date(NaN);
    }

    return parsedDate;
  } catch (e) {
    return new Date(NaN);
  }
} // new Date(10, 0, 1) The year from 0 to 99 will be incremented by 1900 automatically.


function createDate(y) {
  var M = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var d = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  var h = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
  var m = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
  var s = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;
  var ms = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 0;
  var date = new Date(y, M, d, h, m, s, ms);

  if (y < 100 && y >= 0) {
    date.setFullYear(y);
  }

  return date;
}

function isValidDate$1(date) {
  return date instanceof Date && !isNaN(date);
}

function isValidRangeDate(date) {
  return Array.isArray(date) && date.length === 2 && date.every(isValidDate$1) && date[0] <= date[1];
}

function getValidDate(value) {
  var date = new Date(value);

  for (var _len = arguments.length, backup = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    backup[_key - 1] = arguments[_key];
  }

  return isValidDate$1(date) ? date : getValidDate.apply(void 0, backup);
}

function assignTime(target, source) {
  var date = new Date(target);
  var time = new Date(source);
  date.setHours(time.getHours(), time.getMinutes(), time.getSeconds());
  return date;
}
/**
 * chunk the array
 * @param {Array} arr
 * @param {Number} size
 */


function chunk(arr, size) {
  if (!Array.isArray(arr)) {
    return [];
  }

  var result = [];
  var len = arr.length;
  var i = 0;
  size = size || len;

  while (i < len) {
    result.push(arr.slice(i, i += size));
  }

  return result;
}
/**
 * isObject
 * @param {*} obj
 * @returns {Boolean}
 */


function isObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
}
/**
 * pick object
 * @param {Object} obj
 * @param {Array|String} props
 */


function pick(obj, props) {
  if (!isObject(obj)) return {};

  if (!Array.isArray(props)) {
    props = [props];
  }

  var res = {};
  props.forEach(function (prop) {
    if (prop in obj) {
      res[prop] = obj[prop];
    }
  });
  return res;
}
/**
 * deep merge two object without merging array
 * @param {object} target
 * @param {object} source
 */


function mergeDeep(target, source) {
  if (!isObject(target)) {
    return {};
  }

  var result = target;

  if (isObject(source)) {
    Object.keys(source).forEach(function (key) {
      var value = source[key];

      if (isObject(value) && isObject(target[key])) {
        value = mergeDeep(target[key], value);
      }

      result = _objectSpread2({}, result, _defineProperty({}, key, value));
    });
  }

  return result;
}

function unwrapExports(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
  return module = {
    exports: {}
  }, fn(module, module.exports), module.exports;
}

var en = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports["default"] = void 0;
  var locale = {
    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    weekdays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    weekdaysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    weekdaysMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
    firstDayOfWeek: 0,
    firstWeekContainsDate: 1
  };
  var _default = locale;
  exports["default"] = _default;
  module.exports = exports.default;
});
var en$1 = unwrapExports(en);
var lang = {
  formatLocale: en$1,
  yearFormat: 'YYYY',
  monthFormat: 'MMM',
  monthBeforeYear: true
};
var defaultLocale = 'en';
var locales = {};
locales[defaultLocale] = lang;

function locale$1(name, object, isLocal) {
  if (typeof name !== 'string') return locales[defaultLocale];
  var l = defaultLocale;

  if (locales[name]) {
    l = name;
  }

  if (object) {
    locales[name] = object;
    l = name;
  }

  if (!isLocal) {
    defaultLocale = l;
  }

  return locales[name] || locales[defaultLocale];
}
/**
 * get locale object
 * @param {string} name lang
 */


function getLocale(name) {
  return locale$1(name, null, true);
}
/**
 * get locale field value
 * @param {string} field field eg: 'formatLocale.shortMonth'
 * @param {object} lang locale object
 */


function getLocaleFieldValue(field, lang) {
  var arr = (field || '').split('.');
  var current = lang || getLocale();
  var value;

  for (var i = 0, len = arr.length; i < len; i++) {
    var prop = arr[i];
    value = current[prop];

    if (i === len - 1) {
      return value;
    }

    if (!value) {
      return null;
    }

    current = value;
  }

  return null;
}
/* istanbul ignore file */


function rafThrottle(fn) {
  var isRunning = false;
  return function fnBinfRaf() {
    var _this = this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (isRunning) return;
    isRunning = true;
    requestAnimationFrame(function () {
      isRunning = false;
      fn.apply(_this, args);
    });
  };
}
/**
 * get the hidden element width, height
 * @param {HTMLElement} element dom
 */


function getPopupElementSize(element) {
  var originalDisplay = element.style.display;
  var originalVisibility = element.style.visibility;
  element.style.display = 'block';
  element.style.visibility = 'hidden';
  var styles = window.getComputedStyle(element);
  var width = element.offsetWidth + parseInt(styles.marginLeft, 10) + parseInt(styles.marginRight, 10);
  var height = element.offsetHeight + parseInt(styles.marginTop, 10) + parseInt(styles.marginBottom, 10);
  element.style.display = originalDisplay;
  element.style.visibility = originalVisibility;
  return {
    width: width,
    height: height
  };
}
/**
 * get the popup position
 * @param {HTMLElement} el relative element
 * @param {Number} targetWidth target element's width
 * @param {Number} targetHeight target element's height
 * @param {Boolean} fixed
 */


function getRelativePosition(el, targetWidth, targetHeight, fixed) {
  var left = 0;
  var top = 0;
  var offsetX = 0;
  var offsetY = 0;
  var relativeRect = el.getBoundingClientRect();
  var dw = document.documentElement.clientWidth;
  var dh = document.documentElement.clientHeight;

  if (fixed) {
    offsetX = window.pageXOffset + relativeRect.left;
    offsetY = window.pageYOffset + relativeRect.top;
  }

  if (dw - relativeRect.left < targetWidth && relativeRect.right < targetWidth) {
    left = offsetX - relativeRect.left + 1;
  } else if (relativeRect.left + relativeRect.width / 2 <= dw / 2) {
    left = offsetX;
  } else {
    left = offsetX + relativeRect.width - targetWidth;
  }

  if (relativeRect.top <= targetHeight && dh - relativeRect.bottom <= targetHeight) {
    top = offsetY + dh - relativeRect.top - targetHeight;
  } else if (relativeRect.top + relativeRect.height / 2 <= dh / 2) {
    top = offsetY + relativeRect.height;
  } else {
    top = offsetY - targetHeight;
  }

  return {
    left: "".concat(left, "px"),
    top: "".concat(top, "px")
  };
}

function getScrollParent(node) {
  var until = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;

  if (!node || node === until) {
    return null;
  }

  if (node.scrollHeight > node.clientHeight) {
    return node;
  }

  return getScrollParent(node.parentNode, until);
}

var Popup = {
  name: 'Popup',
  inject: {
    prefixClass: {
      default: 'mx'
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    appendToBody: {
      type: Boolean,
      default: true
    },
    inline: {
      type: Boolean,
      default: false
    }
  },
  data: function data() {
    return {
      top: '',
      left: ''
    };
  },
  watch: {
    visible: {
      immediate: true,
      handler: function handler(val) {
        var _this = this;

        this.$nextTick(function () {
          if (val) {
            _this.displayPopup();
          }
        });
      }
    }
  },
  mounted: function mounted() {
    var _this2 = this;

    if (this.inline) {
      return;
    }

    if (this.appendToBody) {
      document.body.appendChild(this.$el);
    }

    this._clickoutEvent = 'ontouchend' in document ? 'touchstart' : 'mousedown';
    document.addEventListener(this._clickoutEvent, this.handleClickOutside); // change the popup position when resize or scroll

    var relativeElement = this.$parent.$el;
    this._displayPopup = rafThrottle(function () {
      return _this2.displayPopup();
    });
    this._scrollParent = getScrollParent(relativeElement) || window;

    this._scrollParent.addEventListener('scroll', this._displayPopup);

    window.addEventListener('resize', this._displayPopup);
  },
  beforeDestroy: function beforeDestroy() {
    if (this.inline) {
      return;
    }

    if (this.appendToBody && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el);
    }

    document.removeEventListener(this._clickoutEvent, this.handleClickOutside);

    this._scrollParent.removeEventListener('scroll', this._displayPopup);

    window.removeEventListener('resize', this._displayPopup);
  },
  methods: {
    handleClickOutside: function handleClickOutside(evt) {
      if (!this.visible) return;
      var target = evt.target;
      var el = this.$el;

      if (el && !el.contains(target)) {
        this.$emit('clickoutside', evt);
      }
    },
    displayPopup: function displayPopup() {
      if (this.inline || !this.visible) return;
      var popup = this.$el;
      var relativeElement = this.$parent.$el;
      var appendToBody = this.appendToBody;

      if (!this._popupRect) {
        this._popupRect = getPopupElementSize(popup);
      }

      var _this$_popupRect = this._popupRect,
          width = _this$_popupRect.width,
          height = _this$_popupRect.height;

      var _getRelativePosition = getRelativePosition(relativeElement, width, height, appendToBody),
          left = _getRelativePosition.left,
          top = _getRelativePosition.top;

      this.left = left;
      this.top = top;
    }
  },
  render: function render() {
    var h = arguments[0];
    var prefixClass = this.prefixClass;

    if (this.inline) {
      return h("div", {
        "class": "".concat(prefixClass, "-datepicker-main")
      }, [this.$slots.default]);
    }

    return h("transition", {
      "attrs": {
        "name": "".concat(prefixClass, "-zoom-in-down")
      }
    }, [this.visible && h("div", {
      "class": "".concat(prefixClass, "-datepicker-main ").concat(prefixClass, "-datepicker-popup"),
      "style": {
        top: this.top,
        left: this.left,
        position: 'absolute'
      }
    }, [this.$slots.default])]);
  }
};

function normalizeComponent$1(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
/* server only */
, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
  if (typeof shadowMode !== 'boolean') {
    createInjectorSSR = createInjector;
    createInjector = shadowMode;
    shadowMode = false;
  } // Vue.extend constructor export interop.


  var options = typeof script === 'function' ? script.options : script; // render functions

  if (template && template.render) {
    options.render = template.render;
    options.staticRenderFns = template.staticRenderFns;
    options._compiled = true; // functional template

    if (isFunctionalTemplate) {
      options.functional = true;
    }
  } // scopedId


  if (scopeId) {
    options._scopeId = scopeId;
  }

  var hook;

  if (moduleIdentifier) {
    // server build
    hook = function hook(context) {
      // 2.3 injection
      context = context || // cached call
      this.$vnode && this.$vnode.ssrContext || // stateful
      this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
      // 2.2 with runInNewContext: true

      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
      } // inject component styles


      if (style) {
        style.call(this, createInjectorSSR(context));
      } // register component module identifier for async chunk inference


      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier);
      }
    }; // used by ssr in case component is cached and beforeCreate
    // never gets called


    options._ssrRegister = hook;
  } else if (style) {
    hook = shadowMode ? function (context) {
      style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
    } : function (context) {
      style.call(this, createInjector(context));
    };
  }

  if (hook) {
    if (options.functional) {
      // register for functional component in vue file
      var originalRender = options.render;

      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context);
        return originalRender(h, context);
      };
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate;
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
    }
  }

  return script;
}

var isOldIE$1 = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
/* script */

/* template */

var __vue_render__$4 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('svg', {
    attrs: {
      "xmlns": "http://www.w3.org/2000/svg",
      "viewBox": "0 0 1024 1024"
    }
  }, [_c('path', {
    attrs: {
      "d": "M940.218182 107.054545h-209.454546V46.545455h-65.163636v60.50909H363.054545V46.545455H297.890909v60.50909H83.781818c-18.618182 0-32.581818 13.963636-32.581818 32.581819v805.236363c0 18.618182 13.963636 32.581818 32.581818 32.581818h861.090909c18.618182 0 32.581818-13.963636 32.581818-32.581818V139.636364c-4.654545-18.618182-18.618182-32.581818-37.236363-32.581819zM297.890909 172.218182V232.727273h65.163636V172.218182h307.2V232.727273h65.163637V172.218182h176.872727v204.8H116.363636V172.218182h181.527273zM116.363636 912.290909V442.181818h795.927273v470.109091H116.363636z"
    }
  })]);
};

var __vue_staticRenderFns__$4 = [];
/* style */

var __vue_inject_styles__$4 = undefined;
/* scoped */

var __vue_scope_id__$4 = undefined;
/* module identifier */

var __vue_module_identifier__$4 = undefined;
/* functional template */

var __vue_is_functional_template__$4 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var IconCalendar = normalizeComponent$1({
  render: __vue_render__$4,
  staticRenderFns: __vue_staticRenderFns__$4
}, __vue_inject_styles__$4, {}, __vue_scope_id__$4, __vue_is_functional_template__$4, __vue_module_identifier__$4, false, undefined, undefined, undefined);
/* script */

/* template */

var __vue_render__$1$1 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('svg', {
    attrs: {
      "xmlns": "http://www.w3.org/2000/svg",
      "viewBox": "0 0 1024 1024"
    }
  }, [_c('path', {
    attrs: {
      "d": "M810.005333 274.005333l-237.994667 237.994667 237.994667 237.994667-60.010667 60.010667-237.994667-237.994667-237.994667 237.994667-60.010667-60.010667 237.994667-237.994667-237.994667-237.994667 60.010667-60.010667 237.994667 237.994667 237.994667-237.994667z"
    }
  })]);
};

var __vue_staticRenderFns__$1$1 = [];
/* style */

var __vue_inject_styles__$1$1 = undefined;
/* scoped */

var __vue_scope_id__$1$1 = undefined;
/* module identifier */

var __vue_module_identifier__$1$1 = undefined;
/* functional template */

var __vue_is_functional_template__$1$1 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var IconClose = normalizeComponent$1({
  render: __vue_render__$1$1,
  staticRenderFns: __vue_staticRenderFns__$1$1
}, __vue_inject_styles__$1$1, {}, __vue_scope_id__$1$1, __vue_is_functional_template__$1$1, __vue_module_identifier__$1$1, false, undefined, undefined, undefined); //

var script$4 = {
  name: 'TableDate',
  inject: {
    t: {
      default: function _default() {
        return getLocaleFieldValue;
      }
    },
    getWeek: {
      default: function _default() {
        return getWeek;
      }
    },
    prefixClass: {
      default: 'mx'
    }
  },
  props: {
    calendarYear: {
      type: Number,
      default: function _default() {
        return new Date().getFullYear();
      }
    },
    calendarMonth: {
      type: Number,
      default: function _default() {
        return new Date().getMonth();
      }
    },
    showWeekNumber: {
      type: Boolean,
      default: false
    },
    titleFormat: {
      type: String,
      default: 'YYYY-MM-DD'
    },
    getRowClasses: {
      type: Function,
      default: function _default() {
        return [];
      }
    },
    getCellClasses: {
      type: Function,
      default: function _default() {
        return [];
      }
    }
  },
  computed: {
    firstDayOfWeek: function firstDayOfWeek() {
      return this.t('formatLocale.firstDayOfWeek') || 0;
    },
    days: function days() {
      var days = this.t('days') || this.t('formatLocale.weekdaysMin');
      return days.concat(days).slice(this.firstDayOfWeek, this.firstDayOfWeek + 7);
    },
    dates: function dates() {
      var arr = [];
      var firstDayOfWeek = this.firstDayOfWeek;
      var year = this.calendarYear;
      var month = this.calendarMonth; // change to the last day of the last month

      var calendar = createDate(year, month, 0);
      var lastDayInLastMonth = calendar.getDate(); // getDay() 0 is Sunday, 1 is Monday

      var firstDayInLastMonth = lastDayInLastMonth - (calendar.getDay() + 7 - firstDayOfWeek) % 7;

      for (var i = firstDayInLastMonth; i <= lastDayInLastMonth; i++) {
        var day = i - lastDayInLastMonth;
        arr.push({
          day: day,
          text: i
        });
      } // change to the last day of the current month


      calendar.setMonth(month + 1, 0);
      var lastDayInCurrentMonth = calendar.getDate();

      for (var _i = 1; _i <= lastDayInCurrentMonth; _i++) {
        arr.push({
          day: _i,
          text: _i
        });
      }

      var lastMonthLength = lastDayInLastMonth - firstDayInLastMonth + 1;
      var nextMonthLength = 6 * 7 - lastMonthLength - lastDayInCurrentMonth;

      for (var _i2 = 1; _i2 <= nextMonthLength; _i2++) {
        arr.push({
          day: lastDayInCurrentMonth + _i2,
          text: _i2
        });
      }

      return chunk(arr, 7);
    }
  },
  methods: {
    formatDate: function formatDate(date, fmt) {
      return format(date, fmt, {
        locale: this.t('formatLocale')
      });
    },
    handleCellClick: function handleCellClick(evt) {
      var target = evt.target;

      if (target.tagName === 'DIV') {
        target = target.parentNode;
      }

      var day = target.getAttribute('data-day');

      if (day) {
        this.$emit('select', parseInt(day, 10));
      }
    },
    getCellTitle: function getCellTitle(day) {
      var year = this.calendarYear;
      var month = this.calendarMonth;
      var fmt = this.titleFormat;
      var date = createDate(year, month, day);
      return this.formatDate(date, fmt);
    },
    getWeekNumber: function getWeekNumber(day) {
      var year = this.calendarYear;
      var month = this.calendarMonth;
      var date = createDate(year, month, day);
      return this.getWeek(date, this.t('formatLocale'));
    }
  }
};
/* script */

var __vue_script__$4 = script$4;
/* template */

var __vue_render__$2$1 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('table', {
    class: _vm.prefixClass + "-table " + _vm.prefixClass + "-table-date"
  }, [_c('thead', [_c('tr', [_vm.showWeekNumber ? _c('th', {
    class: _vm.prefixClass + "-week-number-header"
  }) : _vm._e(), _vm._v(" "), _vm._l(_vm.days, function (day) {
    return _c('th', {
      key: day
    }, [_vm._v(_vm._s(day))]);
  })], 2)]), _vm._v(" "), _c('tbody', {
    on: {
      "click": _vm.handleCellClick
    }
  }, _vm._l(_vm.dates, function (row, i) {
    return _c('tr', {
      key: i,
      class: [_vm.prefixClass + "-date-row", _vm.getRowClasses(row)]
    }, [_vm.showWeekNumber ? _c('td', {
      class: _vm.prefixClass + "-week-number"
    }, [_vm._v("\n        " + _vm._s(_vm.getWeekNumber(row[0].day)) + "\n      ")]) : _vm._e(), _vm._v(" "), _vm._l(row, function (cell, j) {
      return _c('td', {
        key: j,
        staticClass: "cell",
        class: _vm.getCellClasses(cell.day),
        attrs: {
          "data-day": cell.day,
          "title": _vm.getCellTitle(cell.day)
        }
      }, [_c('div', [_vm._v(_vm._s(cell.text))])]);
    })], 2);
  }), 0)]);
};

var __vue_staticRenderFns__$2$1 = [];
/* style */

var __vue_inject_styles__$2$1 = undefined;
/* scoped */

var __vue_scope_id__$2$1 = undefined;
/* module identifier */

var __vue_module_identifier__$2$1 = undefined;
/* functional template */

var __vue_is_functional_template__$2$1 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var TableDate = normalizeComponent$1({
  render: __vue_render__$2$1,
  staticRenderFns: __vue_staticRenderFns__$2$1
}, __vue_inject_styles__$2$1, __vue_script__$4, __vue_scope_id__$2$1, __vue_is_functional_template__$2$1, __vue_module_identifier__$2$1, false, undefined, undefined, undefined); //

var script$1$1 = {
  name: 'TableMonth',
  inject: {
    t: {
      default: function _default() {
        return getLocaleFieldValue;
      }
    },
    prefixClass: {
      default: 'mx'
    }
  },
  props: {
    getCellClasses: {
      type: Function,
      default: function _default() {
        return [];
      }
    }
  },
  computed: {
    months: function months() {
      var monthsLocale = this.t('months') || this.t('formatLocale.monthsShort');
      var months = monthsLocale.map(function (text, month) {
        return {
          text: text,
          month: month
        };
      });
      return chunk(months, 3);
    }
  },
  methods: {
    handleClick: function handleClick(evt) {
      var target = evt.target;

      if (target.tagName === 'DIV') {
        target = target.parentNode;
      }

      var month = target.getAttribute('data-month');

      if (month) {
        this.$emit('select', parseInt(month, 10));
      }
    }
  }
};
/* script */

var __vue_script__$1$1 = script$1$1;
/* template */

var __vue_render__$3$1 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('table', {
    class: _vm.prefixClass + "-table " + _vm.prefixClass + "-table-month",
    on: {
      "click": _vm.handleClick
    }
  }, _vm._l(_vm.months, function (row, i) {
    return _c('tr', {
      key: i
    }, _vm._l(row, function (cell, j) {
      return _c('td', {
        key: j,
        staticClass: "cell",
        class: _vm.getCellClasses(cell.month),
        attrs: {
          "data-month": cell.month
        }
      }, [_c('div', [_vm._v(_vm._s(cell.text))])]);
    }), 0);
  }), 0);
};

var __vue_staticRenderFns__$3$1 = [];
/* style */

var __vue_inject_styles__$3$1 = undefined;
/* scoped */

var __vue_scope_id__$3$1 = undefined;
/* module identifier */

var __vue_module_identifier__$3$1 = undefined;
/* functional template */

var __vue_is_functional_template__$3$1 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var TableMonth = normalizeComponent$1({
  render: __vue_render__$3$1,
  staticRenderFns: __vue_staticRenderFns__$3$1
}, __vue_inject_styles__$3$1, __vue_script__$1$1, __vue_scope_id__$3$1, __vue_is_functional_template__$3$1, __vue_module_identifier__$3$1, false, undefined, undefined, undefined); //

var script$2$1 = {
  name: 'TableYear',
  inject: {
    prefixClass: {
      default: 'mx'
    }
  },
  props: {
    decade: Number,
    getCellClasses: {
      type: Function,
      default: function _default() {
        return [];
      }
    }
  },
  computed: {
    years: function years() {
      var firstYear = this.decade;
      var years = [];

      for (var i = 0; i < 10; i++) {
        years.push(firstYear + i);
      }

      return chunk(years, 2);
    }
  },
  methods: {
    handleClick: function handleClick(evt) {
      var target = evt.target;

      if (target.tagName === 'DIV') {
        target = target.parentNode;
      }

      var year = target.getAttribute('data-year');

      if (year) {
        this.$emit('select', parseInt(year, 10));
      }
    }
  }
};
/* script */

var __vue_script__$2$1 = script$2$1;
/* template */

var __vue_render__$4$1 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('table', {
    class: _vm.prefixClass + "-table " + _vm.prefixClass + "-table-year",
    on: {
      "click": _vm.handleClick
    }
  }, _vm._l(_vm.years, function (row, i) {
    return _c('tr', {
      key: i
    }, _vm._l(row, function (cell, j) {
      return _c('td', {
        key: j,
        staticClass: "cell",
        class: _vm.getCellClasses(cell),
        attrs: {
          "data-year": cell
        }
      }, [_c('div', [_vm._v(_vm._s(cell))])]);
    }), 0);
  }), 0);
};

var __vue_staticRenderFns__$4$1 = [];
/* style */

var __vue_inject_styles__$4$1 = undefined;
/* scoped */

var __vue_scope_id__$4$1 = undefined;
/* module identifier */

var __vue_module_identifier__$4$1 = undefined;
/* functional template */

var __vue_is_functional_template__$4$1 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var TableYear = normalizeComponent$1({
  render: __vue_render__$4$1,
  staticRenderFns: __vue_staticRenderFns__$4$1
}, __vue_inject_styles__$4$1, __vue_script__$2$1, __vue_scope_id__$4$1, __vue_is_functional_template__$4$1, __vue_module_identifier__$4$1, false, undefined, undefined, undefined); //

var script$3$1 = {
  name: 'CalendarPanel',
  components: {
    TableDate: TableDate,
    TableMonth: TableMonth,
    TableYear: TableYear
  },
  inject: {
    t: {
      default: function _default() {
        return getLocaleFieldValue;
      }
    },
    prefixClass: {
      default: 'mx'
    }
  },
  props: {
    value: {},
    defaultValue: {
      default: function _default() {
        var date = new Date();
        date.setHours(0, 0, 0, 0);
        return date;
      }
    },
    defaultPanel: {
      type: String
    },
    disabledDate: {
      type: Function,
      default: function _default() {
        return false;
      }
    },
    type: {
      type: String,
      default: 'date'
    },
    getClasses: {
      type: Function,
      default: function _default() {
        return [];
      }
    },
    showWeekNumber: {
      type: Boolean,
      default: undefined
    },
    titleFormat: {
      type: String,
      default: 'YYYY-MM-DD'
    },
    calendar: Date,
    // update date when select year or month
    partialUpdate: {
      type: Boolean,
      default: false
    }
  },
  data: function data() {
    var panels = ['date', 'month', 'year'];
    var index = Math.max(panels.indexOf(this.type), panels.indexOf(this.defaultPanel));
    var panel = index !== -1 ? panels[index] : 'date';
    return {
      panel: panel,
      innerCalendar: null
    };
  },
  computed: {
    innerValue: function innerValue() {
      var value = Array.isArray(this.value) ? this.value : [this.value];
      var map = {
        year: startOfYear,
        month: startOfMonth,
        date: startOfDay
      };
      var start = map[this.type] || map.date;
      return value.filter(isValidDate$1).map(function (v) {
        return start(v);
      });
    },
    calendarYear: function calendarYear() {
      return this.innerCalendar.getFullYear();
    },
    calendarMonth: function calendarMonth() {
      return this.innerCalendar.getMonth();
    },
    calendarDecade: function calendarDecade() {
      return Math.floor(this.calendarYear / 10) * 10;
    },
    showIconDoubleArrow: function showIconDoubleArrow() {
      return this.panel === 'date' || this.panel === 'month' || this.panel === 'year';
    },
    showIconArrow: function showIconArrow() {
      return this.panel === 'date';
    },
    dateHeader: function dateHeader() {
      var monthBeforeYear = this.t('monthBeforeYear');
      var yearFormat = this.t('yearFormat');
      var monthFormat = this.t('monthFormat') || 'MMM';
      var yearLabel = {
        panel: 'year',
        label: this.formatDate(this.innerCalendar, yearFormat)
      };
      var monthLabel = {
        panel: 'month',
        label: this.formatDate(this.innerCalendar, monthFormat)
      };
      return monthBeforeYear ? [monthLabel, yearLabel] : [yearLabel, monthLabel];
    }
  },
  watch: {
    value: {
      immediate: true,
      handler: 'initCalendar'
    },
    calendar: {
      handler: 'initCalendar'
    },
    defaultValue: {
      handler: 'initCalendar'
    }
  },
  methods: {
    formatDate: function formatDate(date, fmt) {
      return format(date, fmt, {
        locale: this.t('formatLocale')
      });
    },
    initCalendar: function initCalendar() {
      var calendarDate = this.calendar;

      if (!isValidDate$1(calendarDate)) {
        calendarDate = getValidDate(this.innerValue[0], this.defaultValue);
      }

      this.innerCalendar = calendarDate;
    },
    isDisabled: function isDisabled(date) {
      return this.disabledDate(new Date(date), this.innerValue);
    },
    emitDate: function emitDate(date, type) {
      if (!this.isDisabled(date)) {
        this.$emit('select', date, type);
      }
    },
    updateCalendar: function updateCalendar(date) {
      this.innerCalendar = date;
      this.$emit('update:calendar', date);
    },
    handelPanelChange: function handelPanelChange(panel) {
      this.panel = panel;
    },
    handleIconLeftClick: function handleIconLeftClick() {
      var nextCalendar = subMonths(this.innerCalendar, 1);
      this.updateCalendar(nextCalendar);
    },
    handleIconRightClick: function handleIconRightClick() {
      var nextCalendar = addMonths(this.innerCalendar, 1);
      this.updateCalendar(nextCalendar);
    },
    handleIconDoubleLeftClick: function handleIconDoubleLeftClick() {
      var nextCalendar = subYears(this.innerCalendar, this.panel === 'year' ? 10 : 1);
      this.updateCalendar(nextCalendar);
    },
    handleIconDoubleRightClick: function handleIconDoubleRightClick() {
      var nextCalendar = addYears(this.innerCalendar, this.panel === 'year' ? 10 : 1);
      this.updateCalendar(nextCalendar);
    },
    handleSelectYear: function handleSelectYear(year) {
      if (this.type === 'year') {
        var date = this.getCellDate(year, 'year');
        this.emitDate(date, 'year');
      } else {
        var nextCalendar = setYear(this.innerCalendar, year);
        this.updateCalendar(nextCalendar);
        this.handelPanelChange('month');

        if (this.partialUpdate && this.innerValue[0]) {
          var _date = setYear(this.innerValue[0], year);

          this.emitDate(_date, 'year');
        }
      }
    },
    handleSelectMonth: function handleSelectMonth(month) {
      if (this.type === 'month') {
        var date = this.getCellDate(month, 'month');
        this.emitDate(date, 'month');
      } else {
        var nextCalendar = setMonth(this.innerCalendar, month);
        this.updateCalendar(nextCalendar);
        this.handelPanelChange('date');

        if (this.partialUpdate && this.innerValue[0]) {
          var _date2 = setMonth(setYear(this.innerValue[0], this.calendarYear), month);

          this.emitDate(_date2, 'month');
        }
      }
    },
    handleSelectDate: function handleSelectDate(day) {
      var date = this.getCellDate(day, 'date');
      this.emitDate(date, this.type === 'week' ? 'week' : 'date');
    },
    getCellDate: function getCellDate(value, type) {
      if (type === 'year') {
        return createDate(value, 0);
      }

      if (type === 'month') {
        return createDate(this.calendarYear, value);
      }

      return createDate(this.calendarYear, this.calendarMonth, value);
    },
    getDateClasses: function getDateClasses(day) {
      var cellDate = this.getCellDate(day, 'date');
      var notCurrentMonth = cellDate.getMonth() !== this.calendarMonth;
      var classes = [];

      if (cellDate.getTime() === new Date().setHours(0, 0, 0, 0)) {
        classes.push('today');
      }

      if (notCurrentMonth) {
        classes.push('not-current-month');
      }

      var state = this.getStateClass(cellDate);

      if (!(state === 'active' && notCurrentMonth)) {
        classes.push(state);
      }

      return classes.concat(this.getClasses(cellDate, this.innerValue, classes.join(' ')));
    },
    getMonthClasses: function getMonthClasses(month) {
      if (this.type !== 'month') {
        return this.calendarMonth === month ? 'active' : '';
      }

      var classes = [];
      var cellDate = this.getCellDate(month, 'month');
      classes.push(this.getStateClass(cellDate));
      return classes.concat(this.getClasses(cellDate, this.innerValue, classes.join(' ')));
    },
    getYearClasses: function getYearClasses(year) {
      if (this.type !== 'year') {
        return this.calendarYear === year ? 'active' : '';
      }

      var classes = [];
      var cellDate = this.getCellDate(year, 'year');
      classes.push(this.getStateClass(cellDate));
      return classes.concat(this.getClasses(cellDate, this.innerValue, classes.join(' ')));
    },
    getStateClass: function getStateClass(cellDate) {
      if (this.isDisabled(cellDate)) {
        return 'disabled';
      }

      if (this.innerValue.some(function (v) {
        return v.getTime() === cellDate.getTime();
      })) {
        return 'active';
      }

      return '';
    },
    getWeekState: function getWeekState(row) {
      if (this.type !== 'week') return '';
      var start = this.getCellDate(row[0].day, 'date').getTime();
      var end = this.getCellDate(row[6].day, 'date').getTime();
      var active = this.innerValue.some(function (v) {
        var time = v.getTime();
        return time >= start && time <= end;
      });
      return active ? "".concat(this.prefixClass, "-active-week") : '';
    }
  }
};
/* script */

var __vue_script__$3$1 = script$3$1;
/* template */

var __vue_render__$5 = function __vue_render__() {
  var _obj;

  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    class: [_vm.prefixClass + "-calendar", _vm.prefixClass + "-calendar-panel-" + _vm.panel, (_obj = {}, _obj[_vm.prefixClass + "-calendar-week-mode"] = _vm.type === 'week', _obj)]
  }, [_c('div', {
    class: _vm.prefixClass + "-calendar-header"
  }, [_c('button', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.showIconDoubleArrow,
      expression: "showIconDoubleArrow"
    }],
    class: _vm.prefixClass + "-btn " + _vm.prefixClass + "-btn-text " + _vm.prefixClass + "-btn-icon-double-left",
    attrs: {
      "type": "button"
    },
    on: {
      "click": _vm.handleIconDoubleLeftClick
    }
  }, [_c('i', {
    class: _vm.prefixClass + "-icon-double-left"
  })]), _vm._v(" "), _c('button', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.showIconArrow,
      expression: "showIconArrow"
    }],
    class: _vm.prefixClass + "-btn " + _vm.prefixClass + "-btn-text " + _vm.prefixClass + "-btn-icon-left",
    attrs: {
      "type": "button"
    },
    on: {
      "click": _vm.handleIconLeftClick
    }
  }, [_c('i', {
    class: _vm.prefixClass + "-icon-left"
  })]), _vm._v(" "), _c('button', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.showIconDoubleArrow,
      expression: "showIconDoubleArrow"
    }],
    class: _vm.prefixClass + "-btn " + _vm.prefixClass + "-btn-text " + _vm.prefixClass + "-btn-icon-double-right",
    attrs: {
      "type": "button"
    },
    on: {
      "click": _vm.handleIconDoubleRightClick
    }
  }, [_c('i', {
    class: _vm.prefixClass + "-icon-double-right"
  })]), _vm._v(" "), _c('button', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.showIconArrow,
      expression: "showIconArrow"
    }],
    class: _vm.prefixClass + "-btn " + _vm.prefixClass + "-btn-text " + _vm.prefixClass + "-btn-icon-right",
    attrs: {
      "type": "button"
    },
    on: {
      "click": _vm.handleIconRightClick
    }
  }, [_c('i', {
    class: _vm.prefixClass + "-icon-right"
  })]), _vm._v(" "), _c('span', {
    class: _vm.prefixClass + "-calendar-header-label"
  }, [_vm.panel === 'year' ? [_c('span', [_vm._v(_vm._s(_vm.calendarDecade))]), _vm._v(" "), _c('span', {
    class: _vm.prefixClass + "-calendar-decade-separator"
  }), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.calendarDecade + 9))])] : _vm.panel === 'month' ? _c('button', {
    class: _vm.prefixClass + "-btn " + _vm.prefixClass + "-btn-text",
    attrs: {
      "type": "button"
    },
    on: {
      "click": function click($event) {
        return _vm.handelPanelChange('year');
      }
    }
  }, [_vm._v("\n        " + _vm._s(_vm.calendarYear) + "\n      ")]) : _vm.panel === 'date' ? _vm._l(_vm.dateHeader, function (item) {
    return _c('button', {
      key: item.panel,
      class: _vm.prefixClass + "-btn " + _vm.prefixClass + "-btn-text " + _vm.prefixClass + "-btn-current-" + item.panel,
      attrs: {
        "type": "button"
      },
      on: {
        "click": function click($event) {
          return _vm.handelPanelChange(item.panel);
        }
      }
    }, [_vm._v("\n          " + _vm._s(item.label) + "\n        ")]);
  }) : _vm._e()], 2)]), _vm._v(" "), _c('div', {
    class: _vm.prefixClass + "-calendar-content"
  }, [_c('table-year', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.panel === 'year',
      expression: "panel === 'year'"
    }],
    attrs: {
      "decade": _vm.calendarDecade,
      "get-cell-classes": _vm.getYearClasses
    },
    on: {
      "select": _vm.handleSelectYear
    }
  }), _vm._v(" "), _vm.type !== 'year' ? _c('table-month', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.panel === 'month',
      expression: "panel === 'month'"
    }],
    attrs: {
      "get-cell-classes": _vm.getMonthClasses
    },
    on: {
      "select": _vm.handleSelectMonth
    }
  }) : _vm._e(), _vm._v(" "), _vm.type !== 'year' && _vm.type !== 'month' ? _c('table-date', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.panel === 'date',
      expression: "panel === 'date'"
    }],
    attrs: {
      "calendar-year": _vm.calendarYear,
      "calendar-month": _vm.calendarMonth,
      "title-format": _vm.titleFormat,
      "show-week-number": typeof _vm.showWeekNumber === 'boolean' ? _vm.showWeekNumber : _vm.type === 'week',
      "get-cell-classes": _vm.getDateClasses,
      "get-row-classes": _vm.getWeekState
    },
    on: {
      "select": _vm.handleSelectDate
    }
  }) : _vm._e()], 1)]);
};

var __vue_staticRenderFns__$5 = [];
/* style */

var __vue_inject_styles__$5 = undefined;
/* scoped */

var __vue_scope_id__$5 = undefined;
/* module identifier */

var __vue_module_identifier__$5 = undefined;
/* functional template */

var __vue_is_functional_template__$5 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var CalendarPanel = normalizeComponent$1({
  render: __vue_render__$5,
  staticRenderFns: __vue_staticRenderFns__$5
}, __vue_inject_styles__$5, __vue_script__$3$1, __vue_scope_id__$5, __vue_is_functional_template__$5, __vue_module_identifier__$5, false, undefined, undefined, undefined);
var CalendarRange = {
  name: 'CalendarRange',
  components: {
    CalendarPanel: CalendarPanel
  },
  inject: {
    prefixClass: {
      default: 'mx'
    }
  },
  props: _objectSpread2({}, CalendarPanel.props),
  data: function data() {
    return {
      innerValue: [],
      calendars: []
    };
  },
  computed: {
    // Minimum difference between start and end calendars
    calendarMinDiff: function calendarMinDiff() {
      var map = {
        date: 1,
        // type:date  min 1 month
        month: 1 * 12,
        // type:month min 1 year
        year: 10 * 12 // type:year  min 10 year

      };
      return map[this.type] || map.date;
    },
    calendarMaxDiff: function calendarMaxDiff() {
      return Infinity;
    },
    defaultValues: function defaultValues() {
      return Array.isArray(this.defaultValue) ? this.defaultValue : [this.defaultValue, this.defaultValue];
    }
  },
  watch: {
    value: {
      immediate: true,
      handler: function handler() {
        var _this = this;

        this.innerValue = isValidRangeDate(this.value) ? this.value : [new Date(NaN), new Date(NaN)];
        this.calendars = this.innerValue.map(function (v, i) {
          return getValidDate(v, _this.defaultValues[i]);
        });
        this.validateCalendars(1);
      }
    }
  },
  methods: {
    handleSelect: function handleSelect(date, type) {
      var _this$innerValue = _slicedToArray(this.innerValue, 2),
          startValue = _this$innerValue[0],
          endValue = _this$innerValue[1];

      if (isValidDate$1(startValue) && !isValidDate$1(endValue)) {
        if (startValue.getTime() > date.getTime()) {
          this.innerValue = [date, startValue];
        } else {
          this.innerValue = [startValue, date];
        }

        this.emitDate(this.innerValue, type);
      } else {
        this.innerValue = [date, new Date(NaN)];
      }
    },
    emitDate: function emitDate(dates, type) {
      this.$emit('select', dates, type);
    },
    updateStartCalendar: function updateStartCalendar(value) {
      this.calendars.splice(0, 1, value);
      this.validateCalendars(1);
    },
    updateEndCalendar: function updateEndCalendar(value) {
      this.calendars.splice(1, 1, value);
      this.validateCalendars(0);
    },
    validateCalendars: function validateCalendars(index) {
      var gap = this.getCalendarGap();

      if (gap) {
        var calendar = this.calendars[index];

        if (index === 0) {
          calendar = subMonths(calendar, gap);
        } else {
          calendar = addMonths(calendar, gap);
        }

        this.calendars.splice(index, 1, calendar);
      }
    },
    getCalendarGap: function getCalendarGap() {
      var diff = differenceInCalendarMonths(this.calendars[1], this.calendars[0]);
      var min = this.calendarMinDiff;
      var max = this.calendarMaxDiff;

      if (diff < min) {
        return min - diff;
      }

      if (diff > max) {
        return max - diff;
      }

      return 0;
    },
    getRangeClasses: function getRangeClasses(cellDate, currentDates, classnames) {
      var classes = [].concat(this.getClasses(cellDate, currentDates, classnames));

      if (!/disabled|active|not-current-month/.test(classnames) && currentDates.length === 2 && cellDate.getTime() > currentDates[0].getTime() && cellDate.getTime() < currentDates[1].getTime()) {
        classes.push('in-range');
      }

      return classes;
    }
  },
  render: function render() {
    var _this2 = this;

    var h = arguments[0];
    var calendarRange = this.calendars.map(function (calendar, index) {
      var props = _objectSpread2({}, _this2.$props, {
        calendar: calendar,
        value: _this2.innerValue,
        defaultValue: _this2.defaultValues[index],
        getClasses: _this2.getRangeClasses,
        // don't update when range is true
        partialUpdate: false
      });

      var on = {
        select: _this2.handleSelect,
        'update:calendar': index === 0 ? _this2.updateStartCalendar : _this2.updateEndCalendar
      };
      return h("calendar-panel", {
        "props": _objectSpread2({}, props),
        "on": _objectSpread2({}, on)
      });
    });
    var prefixClass = this.prefixClass;
    return h("div", {
      "class": "".concat(prefixClass, "-range-wrapper")
    }, [calendarRange]);
  }
};
var scrollBarWidth;

function getScrollbarWidth() {
  if (typeof window === 'undefined') return 0;
  if (scrollBarWidth !== undefined) return scrollBarWidth;
  var outer = document.createElement('div');
  outer.style.visibility = 'hidden';
  outer.style.overflow = 'scroll';
  outer.style.width = '100px';
  outer.style.position = 'absolute';
  outer.style.top = '-9999px';
  document.body.appendChild(outer);
  var inner = document.createElement('div');
  inner.style.width = '100%';
  outer.appendChild(inner);
  scrollBarWidth = outer.offsetWidth - inner.offsetWidth;
  outer.parentNode.removeChild(outer);
  return scrollBarWidth;
} //


var script$4$1 = {
  inject: {
    prefixClass: {
      default: 'mx'
    }
  },
  data: function data() {
    return {
      scrollbarWidth: 0,
      thumbTop: '',
      thumbHeight: ''
    };
  },
  created: function created() {
    this.scrollbarWidth = getScrollbarWidth();
    document.addEventListener('mouseup', this.handleDragend);
  },
  beforeDestroy: function beforeDestroy() {
    document.addEventListener('mouseup', this.handleDragend);
  },
  mounted: function mounted() {
    this.$nextTick(this.getThumbSize);
  },
  methods: {
    getThumbSize: function getThumbSize() {
      var wrap = this.$refs.wrap;
      if (!wrap) return;
      var heightPercentage = wrap.clientHeight * 100 / wrap.scrollHeight;
      this.thumbHeight = heightPercentage < 100 ? "".concat(heightPercentage, "%") : '';
    },
    handleScroll: function handleScroll(evt) {
      var el = evt.currentTarget;
      var scrollHeight = el.scrollHeight,
          scrollTop = el.scrollTop;
      this.thumbTop = "".concat(scrollTop * 100 / scrollHeight, "%");
    },
    handleDragstart: function handleDragstart(evt) {
      evt.stopImmediatePropagation();
      this._draggable = true;
      var offsetTop = this.$refs.thumb.offsetTop;
      this._prevY = evt.clientY - offsetTop;
      document.addEventListener('mousemove', this.handleDraging);
    },
    handleDraging: function handleDraging(evt) {
      if (!this._draggable) return;
      var clientY = evt.clientY;
      var wrap = this.$refs.wrap;
      var scrollHeight = wrap.scrollHeight,
          clientHeight = wrap.clientHeight;
      var offsetY = clientY - this._prevY;
      var top = offsetY * scrollHeight / clientHeight;
      wrap.scrollTop = top;
    },
    handleDragend: function handleDragend() {
      if (this._draggable) {
        this._draggable = false;
        document.removeEventListener('mousemove', this.handleDraging);
      }
    }
  }
};
/* script */

var __vue_script__$4$1 = script$4$1;
/* template */

var __vue_render__$6 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    class: _vm.prefixClass + "-scrollbar",
    style: {
      position: 'relative',
      overflow: 'hidden'
    }
  }, [_c('div', {
    ref: "wrap",
    class: _vm.prefixClass + "-scrollbar-wrap",
    style: {
      marginRight: "-" + _vm.scrollbarWidth + "px"
    },
    on: {
      "scroll": _vm.handleScroll
    }
  }, [_vm._t("default")], 2), _vm._v(" "), _c('div', {
    class: _vm.prefixClass + "-scrollbar-track"
  }, [_c('div', {
    ref: "thumb",
    class: _vm.prefixClass + "-scrollbar-thumb",
    style: {
      height: _vm.thumbHeight,
      top: _vm.thumbTop
    },
    on: {
      "mousedown": _vm.handleDragstart
    }
  })])]);
};

var __vue_staticRenderFns__$6 = [];
/* style */

var __vue_inject_styles__$6 = undefined;
/* scoped */

var __vue_scope_id__$6 = undefined;
/* module identifier */

var __vue_module_identifier__$6 = undefined;
/* functional template */

var __vue_is_functional_template__$6 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var ScrollbarVertical = normalizeComponent$1({
  render: __vue_render__$6,
  staticRenderFns: __vue_staticRenderFns__$6
}, __vue_inject_styles__$6, __vue_script__$4$1, __vue_scope_id__$6, __vue_is_functional_template__$6, __vue_module_identifier__$6, false, undefined, undefined, undefined); //

var padNumber = function padNumber(value) {
  value = parseInt(value, 10);
  return value < 10 ? "0".concat(value) : "".concat(value);
};

var generateOptions = function generateOptions(length, step, options) {
  if (Array.isArray(options)) {
    return options.filter(function (v) {
      return v >= 0 && v < length;
    });
  }

  if (step <= 0) {
    step = 1;
  }

  var arr = [];

  for (var i = 0; i < length; i += step) {
    arr.push(i);
  }

  return arr;
};

var scrollTo = function scrollTo(element, to) {
  var duration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0; // jump to target if duration zero

  if (duration <= 0) {
    requestAnimationFrame(function () {
      element.scrollTop = to;
    });
    return;
  }

  var difference = to - element.scrollTop;
  var tick = difference / duration * 10;
  requestAnimationFrame(function () {
    var scrollTop = element.scrollTop + tick;

    if (scrollTop >= to) {
      element.scrollTop = to;
      return;
    }

    element.scrollTop = scrollTop;
    scrollTo(element, to, duration - 10);
  });
};

var script$5 = {
  name: 'ListColumns',
  components: {
    ScrollbarVertical: ScrollbarVertical
  },
  inject: {
    prefixClass: {
      default: 'mx'
    }
  },
  props: {
    date: Date,
    getClasses: {
      type: Function,
      default: function _default() {
        return [];
      }
    },
    hourOptions: Array,
    minuteOptions: Array,
    secondOptions: Array,
    showHour: {
      type: Boolean,
      default: true
    },
    showMinute: {
      type: Boolean,
      default: true
    },
    showSecond: {
      type: Boolean,
      default: true
    },
    hourStep: {
      type: Number,
      default: 1
    },
    minuteStep: {
      type: Number,
      default: 1
    },
    secondStep: {
      type: Number,
      default: 1
    },
    use12h: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    columns: function columns() {
      var cols = [];
      if (this.showHour) cols.push({
        type: 'hour',
        list: this.getHoursList()
      });
      if (this.showMinute) cols.push({
        type: 'minute',
        list: this.getMinutesList()
      });
      if (this.showSecond) cols.push({
        type: 'second',
        list: this.getSecondsList()
      });
      if (this.use12h) cols.push({
        type: 'ampm',
        list: this.getAMPMList()
      });
      return cols.filter(function (v) {
        return v.list.length > 0;
      });
    }
  },
  watch: {
    date: {
      handler: function handler() {
        var _this = this;

        this.$nextTick(function () {
          _this.scrollToSelected(100);
        });
      }
    }
  },
  mounted: function mounted() {
    this.scrollToSelected(0);
  },
  methods: {
    getHoursList: function getHoursList() {
      var _this2 = this;

      return generateOptions(this.use12h ? 12 : 24, this.hourStep, this.hourOptions).map(function (num) {
        var date = new Date(_this2.date);
        var text = padNumber(num);

        if (_this2.use12h) {
          if (num === 0) {
            text = '12';
          }

          if (date.getHours() >= 12) {
            num += 12;
          }
        }

        var value = date.setHours(num);
        return {
          value: value,
          text: text
        };
      });
    },
    getMinutesList: function getMinutesList() {
      var _this3 = this;

      return generateOptions(60, this.minuteStep, this.minuteOptions).map(function (num) {
        var value = new Date(_this3.date).setMinutes(num);
        return {
          value: value,
          text: padNumber(num)
        };
      });
    },
    getSecondsList: function getSecondsList() {
      var _this4 = this;

      return generateOptions(60, this.secondStep, this.secondOptions).map(function (num) {
        var value = new Date(_this4.date).setSeconds(num);
        return {
          value: value,
          text: padNumber(num)
        };
      });
    },
    getAMPMList: function getAMPMList() {
      var _this5 = this;

      return ['AM', 'PM'].map(function (text, i) {
        var date = new Date(_this5.date);
        var value = date.setHours(date.getHours() % 12 + i * 12);
        return {
          text: text,
          value: value
        };
      });
    },
    scrollToSelected: function scrollToSelected(duration) {
      var elements = this.$el.querySelectorAll('.active');

      for (var i = 0; i < elements.length; i++) {
        var element = elements[i];
        var scrollElement = getScrollParent(element, this.$el);

        if (scrollElement) {
          var to = element.offsetTop;
          scrollTo(scrollElement, to, duration);
        }
      }
    },
    handleSelect: function handleSelect(evt) {
      var target = evt.target,
          currentTarget = evt.currentTarget;
      if (target.tagName.toUpperCase() !== 'LI') return;
      var type = currentTarget.getAttribute('data-type');
      var colIndex = parseInt(currentTarget.getAttribute('data-index'), 10);
      var cellIndex = parseInt(target.getAttribute('data-index'), 10);
      var value = this.columns[colIndex].list[cellIndex].value;
      this.$emit('select', value, type);
    }
  }
};
/* script */

var __vue_script__$5 = script$5;
/* template */

var __vue_render__$7 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    class: _vm.prefixClass + "-time-columns"
  }, _vm._l(_vm.columns, function (col, i) {
    return _c('scrollbar-vertical', {
      key: i,
      class: _vm.prefixClass + "-time-column"
    }, [_c('ul', {
      class: _vm.prefixClass + "-time-list",
      attrs: {
        "data-type": col.type,
        "data-index": i
      },
      on: {
        "click": _vm.handleSelect
      }
    }, _vm._l(col.list, function (item, j) {
      return _c('li', {
        key: item.value,
        class: [_vm.prefixClass + "-time-item", _vm.getClasses(item.value)],
        attrs: {
          "data-index": j
        }
      }, [_vm._v("\n        " + _vm._s(item.text) + "\n      ")]);
    }), 0)]);
  }), 1);
};

var __vue_staticRenderFns__$7 = [];
/* style */

var __vue_inject_styles__$7 = undefined;
/* scoped */

var __vue_scope_id__$7 = undefined;
/* module identifier */

var __vue_module_identifier__$7 = undefined;
/* functional template */

var __vue_is_functional_template__$7 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var ListColumns = normalizeComponent$1({
  render: __vue_render__$7,
  staticRenderFns: __vue_staticRenderFns__$7
}, __vue_inject_styles__$7, __vue_script__$5, __vue_scope_id__$7, __vue_is_functional_template__$7, __vue_module_identifier__$7, false, undefined, undefined, undefined); //

function parseOption() {
  var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var values = time.split(':');

  if (values.length >= 2) {
    var hours = parseInt(values[0], 10);
    var minutes = parseInt(values[1], 10);
    return {
      hours: hours,
      minutes: minutes
    };
  }

  return null;
}

var scrollTo$1 = function scrollTo(element, to) {
  if (element) {
    element.scrollTop = to;
  }
};

var script$6 = {
  name: 'ListOptions',
  components: {
    ScrollbarVertical: ScrollbarVertical
  },
  inject: {
    t: {
      default: function _default() {
        return getLocaleFieldValue;
      }
    },
    prefixClass: {
      default: 'mx'
    }
  },
  props: {
    date: Date,
    options: {
      type: [Object, Function],
      default: function _default() {
        return [];
      }
    },
    format: {
      type: String,
      default: 'HH:mm:ss'
    },
    getClasses: {
      type: Function,
      default: function _default() {
        return [];
      }
    }
  },
  computed: {
    list: function list() {
      var result = [];
      var options = this.options;

      if (typeof options === 'function') {
        return options() || [];
      }

      var start = parseOption(options.start);
      var end = parseOption(options.end);
      var step = parseOption(options.step);
      var fmt = options.format || this.format;

      if (start && end && step) {
        var startMinutes = start.minutes + start.hours * 60;
        var endMinutes = end.minutes + end.hours * 60;
        var stepMinutes = step.minutes + step.hours * 60;
        var len = Math.floor((endMinutes - startMinutes) / stepMinutes);

        for (var i = 0; i <= len; i++) {
          var timeMinutes = startMinutes + i * stepMinutes;
          var hours = Math.floor(timeMinutes / 60);
          var minutes = timeMinutes % 60;
          var value = new Date(this.date).setHours(hours, minutes, 0);
          result.push({
            value: value,
            text: this.formatDate(value, fmt)
          });
        }
      }

      return result;
    }
  },
  mounted: function mounted() {
    this.scrollToSelected();
  },
  methods: {
    formatDate: function formatDate(date, fmt) {
      return format(date, fmt, {
        locale: this.t('formatLocale')
      });
    },
    scrollToSelected: function scrollToSelected() {
      var element = this.$el.querySelector('.active');
      if (!element) return;
      var scrollElement = getScrollParent(element, this.$el);
      if (!scrollElement) return;
      var to = element.offsetTop;
      scrollTo$1(scrollElement, to);
    },
    handleSelect: function handleSelect(value) {
      this.$emit('select', value, 'time');
    }
  }
};
/* script */

var __vue_script__$6 = script$6;
/* template */

var __vue_render__$8 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('scrollbar-vertical', _vm._l(_vm.list, function (item) {
    return _c('div', {
      key: item.value,
      class: [_vm.prefixClass + "-time-option", _vm.getClasses(item.value)],
      on: {
        "click": function click($event) {
          return _vm.handleSelect(item.value);
        }
      }
    }, [_vm._v("\n    " + _vm._s(item.text) + "\n  ")]);
  }), 0);
};

var __vue_staticRenderFns__$8 = [];
/* style */

var __vue_inject_styles__$8 = undefined;
/* scoped */

var __vue_scope_id__$8 = undefined;
/* module identifier */

var __vue_module_identifier__$8 = undefined;
/* functional template */

var __vue_is_functional_template__$8 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var ListOptions = normalizeComponent$1({
  render: __vue_render__$8,
  staticRenderFns: __vue_staticRenderFns__$8
}, __vue_inject_styles__$8, __vue_script__$6, __vue_scope_id__$8, __vue_is_functional_template__$8, __vue_module_identifier__$8, false, undefined, undefined, undefined); //

var script$7 = {
  name: 'TimePanel',
  components: {
    ListColumns: ListColumns,
    ListOptions: ListOptions
  },
  inject: {
    t: {
      default: function _default() {
        return getLocaleFieldValue;
      }
    },
    prefixClass: {
      default: 'mx'
    }
  },
  props: {
    value: {},
    defaultValue: {
      default: function _default() {
        var date = new Date();
        date.setHours(0, 0, 0, 0);
        return date;
      }
    },
    format: {
      default: 'HH:mm:ss'
    },
    timeTitleFormat: {
      type: String,
      default: 'YYYY-MM-DD'
    },
    showTimeHeader: {
      type: Boolean,
      default: false
    },
    disabledTime: {
      type: Function,
      default: function _default() {
        return false;
      }
    },
    timePickerOptions: {
      type: [Object, Function],
      default: function _default() {
        return null;
      }
    },
    hourOptions: Array,
    minuteOptions: Array,
    secondOptions: Array,
    hourStep: {
      type: Number,
      default: 1
    },
    minuteStep: {
      type: Number,
      default: 1
    },
    secondStep: {
      type: Number,
      default: 1
    },
    showHour: {
      type: Boolean,
      default: undefined
    },
    showMinute: {
      type: Boolean,
      default: undefined
    },
    showSecond: {
      type: Boolean,
      default: undefined
    },
    use12h: {
      type: Boolean,
      default: undefined
    }
  },
  computed: {
    innerValue: function innerValue() {
      return getValidDate(this.value, this.defaultValue);
    },
    title: function title() {
      var titleFormat = this.timeTitleFormat;
      var date = new Date(this.innerValue);
      return this.formatDate(date, titleFormat);
    },
    innerForamt: function innerForamt() {
      return typeof this.format === 'string' ? this.format : 'HH:mm:ss';
    },
    ShowHourMinuteSecondAMPM: function ShowHourMinuteSecondAMPM() {
      var _this = this;

      var fmt = this.innerForamt;
      var defaultProps = {
        showHour: /[HhKk]/.test(fmt),
        showMinute: /m/.test(fmt),
        showSecond: /s/.test(fmt),
        use12h: /a/i.test(fmt)
      };
      var obj = {};
      Object.keys(defaultProps).forEach(function (key) {
        obj[key] = typeof _this[key] === 'boolean' ? _this[key] : defaultProps[key];
      });
      return obj;
    }
  },
  methods: {
    formatDate: function formatDate(date, fmt) {
      return format(date, fmt, {
        locale: this.t('formatLocale')
      });
    },
    isDisabled: function isDisabled(date) {
      return this.disabledTime(new Date(date));
    },
    handleSelect: function handleSelect(value, type) {
      var date = new Date(value);

      if (!this.isDisabled(value)) {
        this.$emit('select', date, type);
      }
    },
    handleClickTitle: function handleClickTitle() {
      this.$emit('title-click');
    },
    getClasses: function getClasses(value) {
      var cellDate = new Date(value);

      if (this.isDisabled(value)) {
        return 'disabled';
      }

      if (cellDate.getTime() === this.innerValue.getTime()) {
        return 'active';
      }

      return '';
    }
  }
};
/* script */

var __vue_script__$7 = script$7;
/* template */

var __vue_render__$9 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    class: _vm.prefixClass + "-time"
  }, [_vm.showTimeHeader ? _c('div', {
    class: _vm.prefixClass + "-time-header"
  }, [_c('button', {
    class: _vm.prefixClass + "-btn " + _vm.prefixClass + "-btn-text " + _vm.prefixClass + "-time-header-title",
    attrs: {
      "type": "button"
    },
    on: {
      "click": _vm.handleClickTitle
    }
  }, [_vm._v("\n      " + _vm._s(_vm.title) + "\n    ")])]) : _vm._e(), _vm._v(" "), _c('div', {
    class: _vm.prefixClass + "-time-content"
  }, [_vm.timePickerOptions ? _c('list-options', {
    attrs: {
      "date": _vm.innerValue,
      "get-classes": _vm.getClasses,
      "options": _vm.timePickerOptions,
      "format": _vm.innerForamt
    },
    on: {
      "select": _vm.handleSelect
    }
  }) : _c('list-columns', _vm._b({
    attrs: {
      "date": _vm.innerValue,
      "get-classes": _vm.getClasses,
      "hour-options": _vm.hourOptions,
      "minute-options": _vm.minuteOptions,
      "second-options": _vm.secondOptions,
      "hour-step": _vm.hourStep,
      "minute-step": _vm.minuteStep,
      "second-step": _vm.secondStep
    },
    on: {
      "select": _vm.handleSelect
    }
  }, 'list-columns', _vm.ShowHourMinuteSecondAMPM, false))], 1)]);
};

var __vue_staticRenderFns__$9 = [];
/* style */

var __vue_inject_styles__$9 = undefined;
/* scoped */

var __vue_scope_id__$9 = undefined;
/* module identifier */

var __vue_module_identifier__$9 = undefined;
/* functional template */

var __vue_is_functional_template__$9 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var TimePanel = normalizeComponent$1({
  render: __vue_render__$9,
  staticRenderFns: __vue_staticRenderFns__$9
}, __vue_inject_styles__$9, __vue_script__$7, __vue_scope_id__$9, __vue_is_functional_template__$9, __vue_module_identifier__$9, false, undefined, undefined, undefined);
var TimeRange = {
  name: 'TimeRange',
  inject: {
    prefixClass: {
      default: 'mx'
    }
  },
  props: _objectSpread2({}, TimePanel.props),
  data: function data() {
    return {
      startValue: new Date(NaN),
      endValue: new Date(NaN)
    };
  },
  watch: {
    value: {
      immediate: true,
      handler: function handler() {
        if (isValidRangeDate(this.value)) {
          var _this$value = _slicedToArray(this.value, 2),
              startValue = _this$value[0],
              endValue = _this$value[1];

          this.startValue = startValue;
          this.endValue = endValue;
        } else {
          this.startValue = new Date(NaN);
          this.endValue = new Date(NaN);
        }
      }
    }
  },
  methods: {
    emitChange: function emitChange(type, index) {
      var date = [this.startValue, this.endValue];
      this.$emit('select', date, type, index);
    },
    handleSelectStart: function handleSelectStart(date, type) {
      this.startValue = date; // check the NaN

      if (!(this.endValue.getTime() >= date.getTime())) {
        this.endValue = date;
      }

      this.emitChange(type, 0);
    },
    handleSelectEnd: function handleSelectEnd(date, type) {
      // check the NaN
      this.endValue = date;

      if (!(this.startValue.getTime() <= date.getTime())) {
        this.startValue = date;
      }

      this.emitChange(type, 1);
    },
    disabledStartTime: function disabledStartTime(date) {
      return this.disabledTime(date, 0);
    },
    disabledEndTime: function disabledEndTime(date) {
      return date.getTime() < this.startValue.getTime() || this.disabledTime(date, 1);
    }
  },
  render: function render() {
    var h = arguments[0];
    var defaultValues = Array.isArray(this.defaultValue) ? this.defaultValue : [this.defaultValue, this.defaultValue];
    var prefixClass = this.prefixClass;
    return h("div", {
      "class": "".concat(prefixClass, "-range-wrapper")
    }, [h(TimePanel, {
      "props": _objectSpread2({}, _objectSpread2({}, this.$props, {
        value: this.startValue,
        defaultValue: defaultValues[0],
        disabledTime: this.disabledStartTime
      })),
      "on": _objectSpread2({}, _objectSpread2({}, this.$listeners, {
        select: this.handleSelectStart
      }))
    }), h(TimePanel, {
      "props": _objectSpread2({}, _objectSpread2({}, this.$props, {
        value: this.endValue,
        defaultValue: defaultValues[1],
        disabledTime: this.disabledEndTime
      })),
      "on": _objectSpread2({}, _objectSpread2({}, this.$listeners, {
        select: this.handleSelectEnd
      }))
    })]);
  }
};

function _extends$1() {
  return _extends$1 = Object.assign || function (a) {
    for (var b, c = 1; c < arguments.length; c++) {
      for (var d in b = arguments[c], b) {
        Object.prototype.hasOwnProperty.call(b, d) && (a[d] = b[d]);
      }
    }

    return a;
  }, _extends$1.apply(this, arguments);
}

var normalMerge = ["attrs", "props", "domProps"],
    toArrayMerge = ["class", "style", "directives"],
    functionalMerge = ["on", "nativeOn"],
    mergeJsxProps = function mergeJsxProps(a) {
  return a.reduce(function (c, a) {
    for (var b in a) {
      if (!c[b]) c[b] = a[b];else if (-1 !== normalMerge.indexOf(b)) c[b] = _extends$1({}, c[b], a[b]);else if (-1 !== toArrayMerge.indexOf(b)) {
        var d = c[b] instanceof Array ? c[b] : [c[b]],
            e = a[b] instanceof Array ? a[b] : [a[b]];
        c[b] = d.concat(e);
      } else if (-1 !== functionalMerge.indexOf(b)) {
        for (var f in a[b]) {
          if (c[b][f]) {
            var g = c[b][f] instanceof Array ? c[b][f] : [c[b][f]],
                h = a[b][f] instanceof Array ? a[b][f] : [a[b][f]];
            c[b][f] = g.concat(h);
          } else c[b][f] = a[b][f];
        }
      } else if ("hook" == b) for (var i in a[b]) {
        c[b][i] = c[b][i] ? mergeFn(c[b][i], a[b][i]) : a[b][i];
      } else c[b] = a[b];
    }

    return c;
  }, {});
},
    mergeFn = function mergeFn(a, b) {
  return function () {
    a && a.apply(this, arguments), b && b.apply(this, arguments);
  };
};

var helper = mergeJsxProps;
var DatetimePanel = {
  name: 'DatetimePanel',
  inject: {
    prefixClass: {
      default: 'mx'
    }
  },
  props: _objectSpread2({}, CalendarPanel.props, {}, TimePanel.props, {
    showTimePanel: {
      type: Boolean,
      default: undefined
    }
  }),
  data: function data() {
    return {
      defaultTimeVisible: false,
      currentValue: this.value
    };
  },
  computed: {
    timeVisible: function timeVisible() {
      return typeof this.showTimePanel === 'boolean' ? this.showTimePanel : this.defaultTimeVisible;
    }
  },
  watch: {
    value: function value(val) {
      this.currentValue = val;
    }
  },
  methods: {
    closeTimePanel: function closeTimePanel() {
      this.defaultTimeVisible = false;
    },
    openTimePanel: function openTimePanel() {
      this.defaultTimeVisible = true;
    },
    emitDate: function emitDate(date, type) {
      this.$emit('select', date, type);
    },
    handleSelect: function handleSelect(date, type) {
      if (type === 'date') {
        this.openTimePanel();
      }

      var datetime = assignTime(date, getValidDate(this.value, this.defaultValue));

      if (this.disabledTime(new Date(datetime))) {
        // set the time of defalutValue;
        datetime = assignTime(date, this.defaultValue);

        if (this.disabledTime(new Date(datetime))) {
          // if disabled don't emit date
          this.currentValue = datetime;
          return;
        }
      }

      this.emitDate(datetime, type);
    }
  },
  render: function render() {
    var h = arguments[0];
    var calendarProps = {
      props: _objectSpread2({}, pick(this, Object.keys(CalendarPanel.props)), {
        type: 'date',
        value: this.currentValue
      }),
      on: {
        select: this.handleSelect
      }
    };
    var timeProps = {
      props: _objectSpread2({}, pick(this, Object.keys(TimePanel.props)), {
        showTimeHeader: true,
        value: this.currentValue
      }),
      on: {
        select: this.emitDate,
        'title-click': this.closeTimePanel
      }
    };
    var prefixClass = this.prefixClass;
    return h("div", [h(CalendarPanel, helper([{}, calendarProps])), this.timeVisible && h(TimePanel, helper([{
      "class": "".concat(prefixClass, "-calendar-time")
    }, timeProps]))]);
  }
};
var DatetimeRange = {
  name: 'DatetimeRange',
  inject: {
    prefixClass: {
      default: 'mx'
    }
  },
  props: _objectSpread2({}, CalendarRange.props, {}, TimeRange.props, {
    showTimePanel: {
      type: Boolean,
      default: undefined
    }
  }),
  data: function data() {
    return {
      defaultTimeVisible: false,
      currentValue: this.value
    };
  },
  computed: {
    timeVisible: function timeVisible() {
      return typeof this.showTimePanel === 'boolean' ? this.showTimePanel : this.defaultTimeVisible;
    }
  },
  watch: {
    value: function value(val) {
      this.currentValue = val;
    }
  },
  methods: {
    closeTimePanel: function closeTimePanel() {
      this.defaultTimeVisible = false;
    },
    openTimePanel: function openTimePanel() {
      this.defaultTimeVisible = true;
    },
    emitDate: function emitDate(dates, type) {
      this.$emit('select', dates, type);
    },
    handleSelect: function handleSelect(dates, type) {
      var _this = this;

      if (type === 'date') {
        this.openTimePanel();
      }

      var defaultValues = Array.isArray(this.defaultValue) ? this.defaultValue : [this.defaultValue, this.defaultValue];
      var datetimes = dates.map(function (date, i) {
        var time = isValidRangeDate(_this.value) ? _this.value[i] : defaultValues[i];
        return assignTime(date, time);
      });

      if (datetimes[1].getTime() < datetimes[0].getTime()) {
        datetimes = [datetimes[0], datetimes[0]];
      }

      if (datetimes.some(this.disabledTime)) {
        datetimes = dates.map(function (date, i) {
          return assignTime(date, defaultValues[i]);
        });

        if (datetimes.some(this.disabledTime)) {
          this.currentValue = datetimes;
          return;
        }
      }

      this.emitDate(datetimes, type);
    }
  },
  render: function render() {
    var h = arguments[0];
    var calendarProps = {
      props: _objectSpread2({}, pick(this, Object.keys(CalendarRange.props)), {
        type: 'date',
        value: this.currentValue
      }),
      on: {
        select: this.handleSelect
      }
    };
    var timeProps = {
      props: _objectSpread2({}, pick(this, Object.keys(TimeRange.props)), {
        value: this.currentValue,
        showTimeHeader: true
      }),
      on: {
        select: this.emitDate,
        'title-click': this.closeTimePanel
      }
    };
    var prefixClass = this.prefixClass;
    return h("div", [h(CalendarRange, helper([{}, calendarProps])), this.timeVisible && h(TimeRange, helper([{
      "class": "".concat(prefixClass, "-calendar-time")
    }, timeProps]))]);
  }
};
var componentMap = {
  default: CalendarPanel,
  time: TimePanel,
  datetime: DatetimePanel
};
var componentRangeMap = {
  default: CalendarRange,
  time: TimeRange,
  datetime: DatetimeRange
};
var script$8 = {
  name: 'DatePicker',
  components: {
    IconCalendar: IconCalendar,
    IconClose: IconClose,
    Popup: Popup
  },
  provide: function provide() {
    return {
      t: this.getLocaleFieldValue,
      getWeek: this.getWeek,
      prefixClass: this.prefixClass
    };
  },
  props: _objectSpread2({}, DatetimePanel.props, {
    value: {},
    valueType: {
      type: String,
      default: 'date' // date, format, timestamp, or token like 'YYYY-MM-DD'

    },
    type: {
      type: String,
      // ['date', 'datetime', 'time', 'year', 'month', 'week']
      default: 'date'
    },
    format: {
      type: [String, Object],
      default: function _default() {
        var map = {
          date: 'YYYY-MM-DD',
          datetime: 'YYYY-MM-DD HH:mm:ss',
          year: 'YYYY',
          month: 'YYYY-MM',
          time: 'HH:mm:ss',
          week: 'w'
        };
        return map[this.type] || map.date;
      }
    },
    range: {
      type: Boolean,
      default: false
    },
    rangeSeparator: {
      type: String,
      default: ' ~ '
    },
    lang: {
      type: [String, Object]
    },
    placeholder: {
      type: String,
      default: ''
    },
    editable: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: true
    },
    prefixClass: {
      type: String,
      default: 'mx'
    },
    inputClass: {
      default: function _default() {
        return "".concat(this.prefixClass, "-input");
      }
    },
    inputAttr: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    appendToBody: {
      type: Boolean,
      default: true
    },
    open: {
      type: Boolean,
      default: undefined
    },
    popupClass: {},
    popupStyle: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    inline: {
      type: Boolean,
      default: false
    },
    confirm: {
      type: Boolean,
      default: false
    },
    confirmText: {
      type: String,
      default: 'OK'
    },
    shortcuts: {
      type: Array,
      validator: function validator(value) {
        return Array.isArray(value) && value.every(function (v) {
          return isObject(v) && typeof v.text === 'string' && typeof v.onClick === 'function';
        });
      },
      default: function _default() {
        return [];
      }
    }
  }),
  data: function data() {
    return {
      // cache the innervalue, wait to confirm
      currentValue: null,
      userInput: null,
      defaultOpen: false
    };
  },
  computed: {
    currentComponent: function currentComponent() {
      var map = this.range ? componentRangeMap : componentMap;
      return map[this.type] || map.default;
    },
    currentComponentProps: function currentComponentProps() {
      var props = _objectSpread2({}, pick(this, Object.keys(this.currentComponent.props)), {
        value: this.currentValue
      });

      return props;
    },
    popupVisible: function popupVisible() {
      return !this.disabled && (typeof this.open === 'boolean' ? this.open : this.defaultOpen);
    },
    innerValue: function innerValue() {
      var value = this.value;

      if (this.range) {
        value = Array.isArray(value) ? value.slice(0, 2) : [null, null];
        return value.map(this.value2date);
      }

      return this.value2date(this.value);
    },
    text: function text() {
      var _this = this;

      if (this.userInput !== null) {
        return this.userInput;
      }

      if (!this.isValidValue(this.innerValue)) {
        return '';
      }

      var fmt = this.format;

      if (Array.isArray(this.innerValue)) {
        return this.innerValue.map(function (v) {
          return _this.formatDate(v, fmt);
        }).join(this.rangeSeparator);
      }

      return this.formatDate(this.innerValue, fmt);
    },
    showClearIcon: function showClearIcon() {
      return !this.disabled && this.clearable && this.text;
    },
    locale: function locale() {
      if (isObject(this.lang)) {
        return mergeDeep(getLocale(), this.lang);
      }

      return getLocale(this.lang);
    }
  },
  watch: {
    innerValue: {
      immediate: true,
      handler: function handler(val) {
        this.currentValue = val;
      }
    }
  },
  methods: {
    handleClickOutSide: function handleClickOutSide(evt) {
      var target = evt.target;

      if (!this.$el.contains(target)) {
        this.closePopup();
      }
    },
    getWeek: function getWeek$1(date, options) {
      if (isObject(this.format) && typeof this.format.getWeek === 'function') {
        return this.format.getWeek(date, options);
      }

      return getWeek(date, options);
    },
    parseDate: function parseDate(value, fmt) {
      if (isObject(this.format) && typeof this.format.parse === 'function') {
        return this.format.parse(value, fmt);
      }

      var backupDate = new Date();
      return parse(value, fmt, {
        locale: this.locale.formatLocale,
        backupDate: backupDate
      });
    },
    formatDate: function formatDate(date, fmt) {
      if (isObject(this.format) && typeof this.format.stringify === 'function') {
        return this.format.stringify(date, fmt);
      }

      return format(date, fmt, {
        locale: this.locale.formatLocale
      });
    },
    // transform the outer value to inner date
    value2date: function value2date(value) {
      switch (this.valueType) {
        case 'date':
          return value instanceof Date ? new Date(value.getTime()) : new Date(NaN);

        case 'timestamp':
          return typeof value === 'number' ? new Date(value) : new Date(NaN);

        case 'format':
          return typeof value === 'string' ? this.parseDate(value, this.format) : new Date(NaN);

        default:
          return typeof value === 'string' ? this.parseDate(value, this.valueType) : new Date(NaN);
      }
    },
    // transform the inner date to outer value
    date2value: function date2value(date) {
      if (!isValidDate$1(date)) return null;

      switch (this.valueType) {
        case 'date':
          return date;

        case 'timestamp':
          return date.getTime();

        case 'format':
          return this.formatDate(date, this.format);

        default:
          return this.formatDate(date, this.valueType);
      }
    },
    emitValue: function emitValue(date, type) {
      // fix IE11/10 trigger input event when input is focused. (placeholder !== '')
      this.userInput = null;
      var value = Array.isArray(date) ? date.map(this.date2value) : this.date2value(date);
      this.$emit('input', value);
      this.$emit('change', value, type);
      this.afterEmitValue(type);
      return value;
    },
    afterEmitValue: function afterEmitValue(type) {
      // this.type === 'datetime', click the time should close popup
      if (!type || type === this.type || type === 'time') {
        this.closePopup();
      }
    },
    isValidValue: function isValidValue(value) {
      var validate = this.range ? isValidRangeDate : isValidDate$1;
      return validate(value);
    },
    handleSelectDate: function handleSelectDate(val, type) {
      if (this.confirm) {
        this.currentValue = val;
      } else {
        this.emitValue(val, type);
      }
    },
    handleClear: function handleClear() {
      this.emitValue(this.range ? [null, null] : null);
      this.$emit('clear');
    },
    handleConfirmDate: function handleConfirmDate() {
      var value = this.emitValue(this.currentValue);
      this.$emit('confirm', value);
    },
    handleSelectShortcut: function handleSelectShortcut(item) {
      if (isObject(item) && typeof item.onClick === 'function') {
        var date = item.onClick(this);

        if (date) {
          this.emitValue(date);
        }
      }
    },
    openPopup: function openPopup() {
      this.defaultOpen = true;
      this.$emit('open');
      this.$emit('update:open', true);
    },
    closePopup: function closePopup() {
      this.defaultOpen = false;
      this.$emit('close');
      this.$emit('update:open', false);
    },
    blur: function blur() {
      this.$refs.input.blur();
    },
    focus: function focus() {
      this.$refs.input.focus();
    },
    handleInputChange: function handleInputChange() {
      var _this2 = this;

      if (!this.editable || this.userInput === null) return;
      var text = this.userInput;
      this.userInput = null;

      if (text === '') {
        this.handleClear();
        return;
      }

      var date = this.range ? text.split(this.rangeSeparator).map(function (v) {
        return _this2.parseDate(v, _this2.format);
      }) : this.parseDate(text, this.format);

      if (this.isValidValue(date)) {
        this.emitValue(date);
        this.blur();
      } else {
        this.$emit('input-error', text);
      }
    },
    handleInputInput: function handleInputInput(evt) {
      this.userInput = evt.target.value;
    },
    handleInputKeydown: function handleInputKeydown(evt) {
      var keyCode = evt.keyCode; // Tab 9 or Enter 13

      if (keyCode === 9) {
        this.closePopup();
      } else if (keyCode === 13) {
        this.handleInputChange();
      }
    },
    handleInputBlur: function handleInputBlur(evt) {
      // tab close
      this.$emit('blur', evt);
    },
    handleInputFocus: function handleInputFocus(evt) {
      this.openPopup();
      this.$emit('focus', evt);
    },
    hasSlot: function hasSlot(name) {
      return !!(this.$slots[name] || this.$scopedSlots[name]);
    },
    getLocaleFieldValue: function getLocaleFieldValue$1(path) {
      return getLocaleFieldValue(path, this.locale);
    }
  }
};
var __vue_script__$8 = script$8;
/* template */

var __vue_render__$a = function __vue_render__() {
  var _obj;

  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    class: (_obj = {}, _obj[_vm.prefixClass + "-datepicker"] = true, _obj[_vm.prefixClass + "-datepicker-range"] = _vm.range, _obj[_vm.prefixClass + "-datepicker-inline"] = _vm.inline, _obj.disabled = _vm.disabled, _obj)
  }, [!_vm.inline ? _c('div', {
    class: _vm.prefixClass + "-input-wrapper",
    on: {
      "mousedown": _vm.openPopup,
      "touchstart": _vm.openPopup
    }
  }, [_vm._t("input", [_c('input', _vm._b({
    ref: "input",
    class: _vm.inputClass,
    attrs: {
      "disabled": _vm.disabled,
      "readonly": !_vm.editable,
      "placeholder": _vm.placeholder
    },
    on: {
      "keydown": _vm.handleInputKeydown,
      "focus": _vm.handleInputFocus,
      "blur": _vm.handleInputBlur,
      "input": _vm.handleInputInput,
      "change": _vm.handleInputChange
    }
  }, 'input', _extends({}, {
    name: 'date',
    type: 'text',
    autocomplete: 'off',
    value: _vm.text
  }, _vm.inputAttr), false))]), _vm._v(" "), _vm.showClearIcon ? _c('i', {
    class: _vm.prefixClass + "-icon-clear",
    on: {
      "mousedown": function mousedown($event) {
        $event.stopPropagation();
        return _vm.handleClear($event);
      }
    }
  }, [_vm._t("icon-clear", [_c('icon-close')])], 2) : _vm._e(), _vm._v(" "), _c('i', {
    class: _vm.prefixClass + "-icon-calendar"
  }, [_vm._t("icon-calendar", [_c('icon-calendar')])], 2)], 2) : _vm._e(), _vm._v(" "), _c('Popup', {
    ref: "popup",
    class: _vm.popupClass,
    style: _vm.popupStyle,
    attrs: {
      "inline": _vm.inline,
      "visible": _vm.popupVisible,
      "append-to-body": _vm.appendToBody
    },
    on: {
      "clickoutside": _vm.handleClickOutSide
    }
  }, [_vm.hasSlot('sidebar') || _vm.shortcuts.length ? _c('div', {
    class: _vm.prefixClass + "-datepicker-sidebar"
  }, [_vm._t("sidebar", null, {
    "value": _vm.currentValue,
    "emit": _vm.emitValue
  }), _vm._v(" "), _vm._l(_vm.shortcuts, function (v, i) {
    return _c('button', {
      key: i,
      class: _vm.prefixClass + "-btn " + _vm.prefixClass + "-btn-text " + _vm.prefixClass + "-btn-shortcut",
      attrs: {
        "type": "button"
      },
      on: {
        "click": function click($event) {
          return _vm.handleSelectShortcut(v);
        }
      }
    }, [_vm._v("\n        " + _vm._s(v.text) + "\n      ")]);
  })], 2) : _vm._e(), _vm._v(" "), _c('div', {
    class: _vm.prefixClass + "-datepicker-content"
  }, [_vm.hasSlot('header') ? _c('div', {
    class: _vm.prefixClass + "-datepicker-header"
  }, [_vm._t("header", null, {
    "value": _vm.currentValue,
    "emit": _vm.emitValue
  })], 2) : _vm._e(), _vm._v(" "), _c('div', {
    class: _vm.prefixClass + "-datepicker-body"
  }, [_vm._t("content", [_c(_vm.currentComponent, _vm._b({
    ref: "picker",
    tag: "component",
    on: {
      "select": _vm.handleSelectDate
    }
  }, 'component', _vm.currentComponentProps, false))], {
    "value": _vm.currentValue,
    "emit": _vm.emitValue
  })], 2), _vm._v(" "), _vm.hasSlot('footer') || _vm.confirm ? _c('div', {
    class: _vm.prefixClass + "-datepicker-footer"
  }, [_vm._t("footer", null, {
    "value": _vm.currentValue,
    "emit": _vm.emitValue
  }), _vm._v(" "), _vm.confirm ? _c('button', {
    class: _vm.prefixClass + "-btn " + _vm.prefixClass + "-datepicker-btn-confirm",
    attrs: {
      "type": "button"
    },
    on: {
      "click": _vm.handleConfirmDate
    }
  }, [_vm._v("\n          " + _vm._s(_vm.confirmText) + "\n        ")]) : _vm._e()], 2) : _vm._e()])])], 1);
};

var __vue_staticRenderFns__$a = [];
/* style */

var __vue_inject_styles__$a = undefined;
/* scoped */

var __vue_scope_id__$a = undefined;
/* module identifier */

var __vue_module_identifier__$a = undefined;
/* functional template */

var __vue_is_functional_template__$a = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var DatePicker = normalizeComponent$1({
  render: __vue_render__$a,
  staticRenderFns: __vue_staticRenderFns__$a
}, __vue_inject_styles__$a, __vue_script__$8, __vue_scope_id__$a, __vue_is_functional_template__$a, __vue_module_identifier__$a, false, undefined, undefined, undefined);
DatePicker.locale = locale$1;

DatePicker.install = function install(Vue) {
  Vue.component(DatePicker.name, DatePicker);
};

if (typeof window !== 'undefined' && window.Vue) {
  DatePicker.install(window.Vue);
}

_extends(DatePicker, {
  CalendarPanel: CalendarPanel,
  CalendarRange: CalendarRange,
  TimePanel: TimePanel,
  TimeRange: TimeRange,
  DatetimePanel: DatetimePanel,
  DatetimeRange: DatetimeRange
});

//
var script$9 = {
  components: {
    'vue-excel-filter': __vue_component__,
    'panel-filter': __vue_component__$1,
    'panel-setting': __vue_component__$2,
    'panel-find': __vue_component__$3,
    'date-picker': DatePicker
  },
  props: {
    value: {
      type: Array,

      default() {
        return [];
      }

    },
    rowStyle: {
      type: Function,

      default() {
        return {};
      }

    },
    cellStyle: {
      type: Function,

      default() {
        return {};
      }

    },
    headerLabel: {
      type: Function,

      default(label) {
        return label;
      }

    },
    recordLabel: {
      // return the row header
      type: Function,

      default(pos) {
        return pos;
      }

    },
    noFinding: {
      type: Boolean,
      default: false
    },
    noFindingNext: {
      type: Boolean,
      default: false
    },
    filterRow: {
      type: Boolean,
      default: false
    },
    freeSelect: {
      type: Boolean,
      default: false
    },
    noFooter: {
      type: Boolean,
      default: false
    },
    noPaging: {
      type: Boolean,
      default: false
    },
    noNumCol: {
      type: Boolean,
      default: false
    },
    page: {
      type: Number,
      default: 0
    },
    // prefer page size, auto-cal if not provided
    newRecord: {
      type: Function,
      default: null
    },
    // return the new record from caller if provided
    nFilterCount: {
      type: Number,
      default: 200
    },
    // show top n values in filter dialog
    height: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: '100%'
    },
    autocomplete: {
      type: Boolean,
      default: false
    },
    // Default autocomplete of all columns
    readonly: {
      type: Boolean,
      default: false
    },
    readonlyStyle: {
      type: Object,

      default() {
        return {};
      }

    },
    remember: {
      type: Boolean,
      default: false
    },
    localizedLabel: {
      type: Object,

      default() {
        return {
          footerLeft: (top, bottom, total) => `Record ${top} to ${bottom} of ${total}`,
          first: 'First',
          previous: 'Previous',
          next: 'Next',
          last: 'Last',
          footerRight: {
            selected: 'Selected:',
            filtered: 'Filtered:',
            loaded: 'Loaded:'
          },
          processing: 'Processing',
          tableSetting: 'Table Setting',
          exportExcel: 'Export Excel',
          importExcel: 'Import Excel',
          back: 'Back',
          sortingAndFiltering: 'Sorting And Filtering',
          sortAscending: 'Sort Ascending',
          sortDescending: 'Sort Descending',
          near: '≒ Near',
          exactMatch: '= Exact Match',
          greaterThan: '&gt; Greater Than',
          greaterThanOrEqualTo: '≥ Greater Than or Equal To',
          lessThan: '&lt; Less Than',
          lessThanOrEqualTo: '≤ Less Than Or Equal To',
          regularExpression: '~ Regular Expression',
          customFilter: 'Custom Filter',
          listFirstNValuesOnly: n => `List first ${n} values only`,
          apply: 'Apply',
          noRecordIsRead: 'No record is read',
          readonlyColumnDetected: 'Readonly column detected',
          columnHasValidationError: (name, err) => `Column ${name} has validation error: ${err}`,
          noMatchedColumnName: 'No matched column name',
          invalidInputValue: 'Invalid input value',
          missingKeyColumn: 'Missing key column'
        };
      }

    }
  },

  data() {
    const pageSize = this.noPaging ? 999999 : 20;
    const dataset = {
      // selTarget: null,
      // selSquare: null,
      // selx: 0,
      // sely: 0,
      tableContent: null,
      // Table parent
      systable: null,
      // TABLE dom node
      colgroupTr: null,
      // colgroup TR dom node
      labelTr: null,
      // THEAD label dom node
      filterTr: null,
      // THEAD filter dom node
      recordBody: null,
      // TBODY dom node
      footer: null,
      // TFOOTER dom node
      pageSize: pageSize,
      pageTop: 0,
      // Current page top pos of [table] array
      selected: {},
      // selected storage in hash, key is the pos of [table] array
      selectedCount: 0,
      // selected row count
      prevSelect: -1,
      // previous select pos of [table] array
      processing: false,
      // current general-purpose processing status
      rowIndex: {},
      // index of the record key to pos of [table] array
      currentRecord: null,
      // focusing TR dom node
      currentRowPos: 0,
      // focusing array pos of [table] array
      currentColPos: 0,
      // focusing pos of column/field
      currentField: null,
      // focusing field object
      currentCell: null,
      inputBox: null,
      inputBoxShow: 0,
      inputSquare: null,
      autocompleteInputs: [],
      autocompleteSelect: -1,
      errmsg: {},
      tip: '',
      fields: [],
      focused: false,
      mousein: false,
      inputBoxChanged: false,
      columnFilter: {},
      // set filter storage in hash, key is the column pos
      inputFind: '',
      calCellLeft: 0,
      calCellTop: 0,
      calCellTop2: 29,
      frontdrop: null,
      // frontdrop dom node
      sortPos: 0,
      // Sort column position
      sortDir: 0,
      // Sort direction, 1=Ascending, -1=Descending
      redo: [],
      // redo log
      lazyTimeout: {},
      lazyBuffer: {},
      hScroller: {},
      vScroller: {},
      leftMost: 0,
      showDatePicker: false,
      inputDateTime: '',
      table: [],
      summaryRow: false,
      showFilteredOnly: true,
      showSelectedOnly: false
    };
    return dataset;
  },

  computed: {
    token() {
      const id = Array.from(document.querySelectorAll('.vue-excel-editor')).indexOf(this.$el);
      return `vue-excel-editor-${id}`;
    },

    columnFilterString() {
      Object.keys(this.columnFilter).forEach(key => {
        if (this.columnFilter[key].trim() === '') delete this.columnFilter[key];
      });
      return JSON.stringify(this.columnFilter);
    },

    pagingTable() {
      return this.table.slice(this.pageTop, this.pageTop + this.pageSize);
    },

    pageBottom() {
      if (this.value.length === 0) return 0;else return this.pageTop + this.pageSize > this.table.length ? this.table.length : this.pageTop + this.pageSize;
    },

    setting: {
      get() {
        return null;
      },

      set(setter) {
        if (setter.fields) {
          // ignore if fields counts are different
          if (setter.fields.length !== this.fields.length) return;
          let valid = true;
          const newFields = setter.fields.map(field => {
            const current = this.fields.find(f => f.name === field.name);
            if (!current) valid = false;
            return Object.assign(current, {
              invisible: field.invisible,
              width: field.width
            });
          });

          if (valid) {
            this.fields = newFields;
            this.$forceUpdate();
          }
        }
      }

    }
  },
  watch: {
    value() {
      // detect a loading process, refresh something
      // this.redo = []
      // this.errmsg = {}
      this.lazy(this.refresh);
    },

    columnFilterString() {
      this.processing = true;
      setTimeout(() => {
        this.refresh();
        this.processing = false;
      }, 0);
    },

    fields: {
      handler() {
        this.lazy(() => {
          const setting = this.getSetting();
          if (this.remember) localStorage[window.location.pathname + '.' + this.token] = JSON.stringify(setting);
          this.$emit('setting', setting);
        });
      },

      deep: true
    },

    processing(newVal) {
      if (newVal) {
        const rect = this.$el.children[0].getBoundingClientRect();
        this.frontdrop.style.top = rect.top + 'px';
        this.frontdrop.style.left = rect.left + 'px';
        this.frontdrop.style.height = rect.height + 'px';
        this.frontdrop.style.width = rect.width + 'px';
      }
    }

  },

  beforeDestroy() {
    window.removeEventListener('resize', this.winResize);
    window.removeEventListener('paste', this.winPaste);
    window.removeEventListener('keydown', this.winKeydown);
    window.removeEventListener('scroll', this.winScroll);
  },

  mounted() {
    this.tableContent = this.$refs.tableContent;
    this.systable = this.$refs.systable;
    this.colgroupTr = this.systable.children[0];
    this.labelTr = this.systable.children[1].children[0];
    this.filterTr = this.systable.children[1].children[1];
    this.recordBody = this.systable.children[2];
    this.footer = this.$refs.footer;
    this.inputSquare = this.$refs.inputSquare;
    this.inputBox = this.$refs.inputBox;
    this.frontdrop = this.$refs.frontdrop;
    if (this.height) this.systable.parentNode.style.height = this.height;
    this.reset();
    this.lazy(() => {
      this.labelTr.children[0].style.height = this.labelTr.offsetHeight + 'px';
      this.calCellTop2 = this.labelTr.offsetHeight;
      this.refreshPageSize();
      this.calStickyLeft();
    }, 200);
    window.addEventListener('resize', this.winResize);
    window.addEventListener('paste', this.winPaste);
    window.addEventListener('keydown', this.winKeydown);
    window.addEventListener('scroll', this.winScroll);
    if (this.remember && localStorage[window.location.pathname + '.' + this.token]) this.setting = JSON.parse(localStorage[window.location.pathname + '.' + this.token]);
  },

  methods: {
    getSetting() {
      const colWidth = Array.from(this.colgroupTr.children).map(col => col.style.width);
      const fields = this.fields.map((field, i) => {
        return {
          name: field.name,
          invisible: field.invisible,
          width: colWidth[i + 1]
        };
      });
      return {
        fields: fields
      };
    },

    calVScroll() {
      let d = this.labelTr.getBoundingClientRect().height;
      if (this.filterRow) d += 29;
      this.vScroller.top = d;
      if (!this.noFooter) d += 25;
      if (this.summaryRow) d += 27;
      const fullHeight = this.$el.getBoundingClientRect().height;
      this.vScroller.height = fullHeight - d;
      const ratio = this.vScroller.height / (this.table.length * 24);
      this.vScroller.buttonHeight = Math.max(24, this.vScroller.height * ratio);
      const prop = (this.tableContent.scrollTop + this.pageTop * 24) / (this.table.length * 24 - this.vScroller.height);
      this.vScroller.buttonTop = (this.vScroller.height - this.vScroller.buttonHeight) * prop;
      this.$forceUpdate();
    },

    reset() {
      this.errmsg = {};
      this.redo = [];
      this.showFilteredOnly = true;
      this.showSelectedOnly = false;
      this.columnFilter = {};
      this.sortPos = 0;
      this.sortDir = 0;
      this.inputFind = '';
      this.pageTop = 0;
      this.selected = {};
      this.selectedCount = 0;
      this.prevSelect = -1;
      this.processing = false;
      this.rowIndex = {};
      this.refresh();
    },

    toggleSelectView(e) {
      if (e) e.stopPropagation();
      this.showSelectedOnly = !this.showSelectedOnly;
      return this.refresh();
    },

    toggleFilterView(e) {
      if (e) e.stopPropagation();
      this.showFilteredOnly = !this.showFilteredOnly;
      return this.refresh();
    },

    summary(field) {
      if (!field.summary) return '';
      const i = field.name;
      let result = '';

      switch (field.summary) {
        case 'sum':
          result = this.table.reduce((a, b) => a + Number(b[i]), 0);
          result = Number(Math.round(result + 'e+5') + 'e-5'); // solve the infinite .9 issue of javascript

          break;

        case 'avg':
          result = this.table.reduce((a, b) => a + Number(b[i]), 0) / this.table.length;
          result = Number(Math.round(result + 'e+5') + 'e-5'); // solve the infinite .9 issue of javascript

          break;

        case 'max':
          result = this.table.reduce((a, b) => a > b[i] ? a : b[i], Number.MIN_VALUE);
          break;

        case 'min':
          result = this.table.reduce((a, b) => a < b[i] ? a : b[i], Number.MAX_VALUE);
          break;
      }

      return field.toText(result);
    },

    calTable() {
      // add unique key to each row if no key is provided
      let seed = new Date().getTime() - 1578101000000;
      this.value.forEach((rec, i) => {
        if (!rec.$id) rec.$id = seed + '-' + i;
      });

      if (this.showFilteredOnly === false) {
        this.table = this.value;
      } else {
        const filterColumnList = Object.keys(this.columnFilter);
        const filter = {};
        filterColumnList.forEach(k => {
          switch (true) {
            case this.columnFilter[k].startsWith('<='):
              filter[k] = {
                type: 1,
                value: this.columnFilter[k].slice(2).trim().toUpperCase()
              };
              if (this.fields[k].type === 'number') filter[k].value = Number(filter[k].value);
              break;

            case this.columnFilter[k].startsWith('<'):
              filter[k] = {
                type: 2,
                value: this.columnFilter[k].slice(1).trim().toUpperCase()
              };
              if (this.fields[k].type === 'number') filter[k].value = Number(filter[k].value);
              break;

            case this.columnFilter[k].startsWith('>='):
              filter[k] = {
                type: 3,
                value: this.columnFilter[k].slice(2).trim().toUpperCase()
              };
              if (this.fields[k].type === 'number') filter[k].value = Number(filter[k].value);
              break;

            case this.columnFilter[k].startsWith('>'):
              filter[k] = {
                type: 4,
                value: this.columnFilter[k].slice(1).trim().toUpperCase()
              };
              if (this.fields[k].type === 'number') filter[k].value = Number(filter[k].value);
              break;

            case this.columnFilter[k].startsWith('='):
              filter[k] = {
                type: 0,
                value: this.columnFilter[k].slice(1).trim().toUpperCase()
              };
              break;

            case this.columnFilter[k].startsWith('*') && this.columnFilter[k].endsWith('*'):
              filter[k] = {
                type: 5,
                value: this.columnFilter[k].slice(1).slice(0, -1).trim().toUpperCase()
              };
              break;

            case this.columnFilter[k].startsWith('*') && !this.columnFilter[k].slice(1).includes('*'):
              filter[k] = {
                type: 6,
                value: this.columnFilter[k].slice(1).trim().toUpperCase()
              };
              break;

            case this.columnFilter[k].endsWith('*') && !this.columnFilter[k].slice(0, -1).includes('*'):
              filter[k] = {
                type: 7,
                value: this.columnFilter[k].slice(0, -1).trim().toUpperCase()
              };
              break;

            case this.columnFilter[k].startsWith('~'):
              filter[k] = {
                type: 8,
                value: this.columnFilter[k].slice(1).trim()
              };
              break;

            case this.columnFilter[k].includes('*') || this.columnFilter[k].includes('?'):
              filter[k] = {
                type: 8,
                value: '^' + this.columnFilter[k].replace(/\*/g, '.*').replace(/\?/g, '.').trim() + '$'
              };
              break;

            default:
              filter[k] = {
                type: 5,
                value: this.columnFilter[k].trim().toUpperCase()
              };
              break;
          }
        });
        this.table = this.value.filter(record => {
          const content = {};
          filterColumnList.forEach(k => {
            const val = record[this.fields[k].name];
            content[k] = typeof val === 'undefined' ? '' : String(val).toUpperCase();
          });

          for (let i = 0; i < filterColumnList.length; i++) {
            const k = filterColumnList[i];

            switch (filter[k].type) {
              case 0:
                if (`${content[k]}` !== `${filter[k].value}`) return false;
                break;

              case 1:
                if (this.fields[k].type === 'number') content[k] = Number(content[k]);
                if (filter[k].value < content[k]) return false;
                break;

              case 2:
                if (this.fields[k].type === 'number') content[k] = Number(content[k]);
                if (filter[k].value <= content[k]) return false;
                break;

              case 3:
                if (this.fields[k].type === 'number') content[k] = Number(content[k]);
                if (filter[k].value > content[k]) return false;
                break;

              case 4:
                if (this.fields[k].type === 'number') content[k] = Number(content[k]);
                if (filter[k].value >= content[k]) return false;
                break;

              case 5:
                if (!content[k].includes(filter[k].value)) return false;
                break;

              case 6:
                if (!content[k].endsWith(filter[k].value)) return false;
                break;

              case 7:
                if (!content[k].startsWith(filter[k].value)) return false;
                break;

              case 8:
                if (!new RegExp(filter[k].value, 'i').test(content[k])) return false;
                break;
            }
          }

          return true;
        });
      }

      this.reviseSelectedAfterTableChange();

      if (this.showSelectedOnly) {
        this.table = this.table.filter((rec, i) => this.selected[i]);
        this.reviseSelectedAfterTableChange();
      }
    },

    getKeys(rec) {
      if (!rec) rec = this.currentRecord;
      const key = this.fields.filter(field => field.keyField).map(field => rec[field.name]);
      if (key.length && key.join() !== '') return key;
      return [rec.$id];
    },

    showDatePickerDiv() {
      const cellRect = this.currentCell.getBoundingClientRect();
      this.$refs.dpContainer.style.left = cellRect.left + 'px';
      this.$refs.dpContainer.style.top = cellRect.bottom + 'px';
      this.inputDateTime = this.currentCell.textContent;
      this.showDatePicker = true;
      this.lazy(() => {
        const r = this.$refs.dpContainer.getBoundingClientRect();
        if (r.bottom > window.innerHeight) this.$refs.dpContainer.style.top = cellRect.top - r.height + 'px';
        if (r.right > window.innerWidth) this.$refs.dpContainer.style.top = window.innerWidth - r.width + 'px';
      });
    },

    dpClick() {
      this.inputBox.value = this.inputDateTime;
      this.inputBoxShow = 0;
      this.inputCellWrite(this.inputDateTime);
      this.showDatePicker = false;
      this.focused = true;
    },

    columnCellStyle(field) {
      let result = field.initStyle;
      if (field.readonly) result = Object.assign(result, this.readonlyStyle);
      if (field.left) result = Object.assign(result, {
        left: field.left
      });
      return result;
    },

    calStickyLeft() {
      let left = 0,
          n = 0;
      this.leftMost = -1;
      Array.from(this.labelTr.children).forEach(th => {
        left += th.offsetWidth;
        const field = this.fields[n++];
        if (field) if (field.sticky) field.left = left + 'px';else if (this.leftMost === -1) this.leftMost = left;
      });
      this.$forceUpdate();
    },

    vsMouseDown(e) {
      e.stopPropagation();
      const pos = e.offsetY - this.vScroller.buttonHeight / 2;
      let ratio = Math.max(0, pos);
      ratio = Math.min(ratio, this.vScroller.height - this.vScroller.buttonHeight);
      ratio = ratio / (this.vScroller.height - this.vScroller.buttonHeight);
      if (this.noPaging) this.tableContent.scrollTo(this.tableContent.scrollLeft, this.table.length * 24 * ratio);else {
        this.vScroller.buttonTop = ratio * (this.vScroller.height - this.vScroller.buttonHeight);
        this.$refs.vScrollButton.style.marginTop = this.vScroller.buttonTop + 'px';
        this.pageTop = Math.round((this.table.length - this.pageSize) * ratio);
      }
    },

    vsbMouseDown(e) {
      e.stopPropagation();

      if (!this.vScroller.mouseY) {
        this.vScroller.saveButtonTop = this.vScroller.buttonTop;
        this.vScroller.mouseY = e.clientY;
        window.addEventListener('mousemove', this.vsbMouseMove);
        this.$refs.vScrollButton.classList.add('focus');
      }
    },

    vsbMouseMove(e) {
      if (e.buttons === 0) {
        window.removeEventListener('mousemove', this.vsbMouseMove);
        this.lazy(() => this.$refs.vScrollButton.classList.remove('focus'));
        this.vScroller.mouseY = 0;

        if (!this.noPaging) {
          const ratio = this.vScroller.buttonTop / (this.vScroller.height - this.vScroller.buttonHeight);
          this.pageTop = Math.round((this.table.length - this.pageSize) * ratio);
        }
      } else {
        const diff = e.clientY - this.vScroller.mouseY;

        if (this.noPaging) {
          const ratio = (this.vScroller.saveButtonTop + diff) / (this.vScroller.height - this.vScroller.buttonHeight);
          this.tableContent.scrollTo(this.tableContent.scrollLeft, this.table.length * 24 * ratio);
        } else {
          this.vScroller.buttonTop = Math.max(0, Math.min(this.vScroller.height - this.vScroller.buttonHeight, this.vScroller.saveButtonTop + diff));
          this.$refs.vScrollButton.style.marginTop = this.vScroller.buttonTop + 'px';
        }
      }
    },

    ftMouseDown(e) {
      const footerRect = this.footer.getBoundingClientRect();
      const ratio = (e.x - footerRect.left - 40) / (footerRect.width - 40);
      const fullWidth = this.systable.getBoundingClientRect().width;
      const viewWidth = this.tableContent.getBoundingClientRect().width;
      this.tableContent.scrollTo(fullWidth * ratio - viewWidth / 2, this.tableContent.scrollTop);
    },

    sbMouseDown(e) {
      e.stopPropagation();

      if (!this.hScroller.mouseX) {
        const sleft = this.$refs.scrollbar.getBoundingClientRect().left;
        const fleft = this.footer.getBoundingClientRect().left + 40;
        this.hScroller.left = sleft - fleft;
        this.hScroller.mouseX = e.clientX;
        window.addEventListener('mousemove', this.sbMouseMove);
        this.$refs.scrollbar.classList.add('focus');
      }
    },

    sbMouseMove(e) {
      if (e.buttons === 0) {
        window.removeEventListener('mousemove', this.sbMouseMove);
        this.lazy(() => this.$refs.scrollbar.classList.remove('focus'));
        this.hScroller.mouseX = 0;
      } else {
        const diff = e.clientX - this.hScroller.mouseX;
        const ratio = (this.hScroller.left + diff) / this.hScroller.scrollerUnseenWidth;
        this.tableContent.scrollTo(this.hScroller.tableUnseenWidth * ratio, this.tableContent.scrollTop);
      }
    },

    tableScroll() {
      this.showDatePicker = false;
      this.autocompleteInputs = [];
      if (this.focused && this.currentField) this.inputSquare.style.marginLeft = (this.currentField.sticky ? this.tableContent.scrollLeft - this.squareSavedLeft : 0) + 'px';

      if (this.tableContent.scrollTop !== this.vScroller.lastTop) {
        this.calVScroll();
        this.$refs.vScrollButton.classList.add('focus');
        this.lazy(() => this.$refs.vScrollButton.classList.remove('focus'), 1000);
      }

      this.vScroller.lastTop = this.tableContent.scrollTop;

      if (this.tableContent.scrollLeft !== this.hScroller.lastLeft) {
        if (this.$refs.scrollbar && this.hScroller.tableUnseenWidth) {
          this.$refs.scrollbar.classList.add('focus');
          this.lazy(() => this.$refs.scrollbar.classList.remove('focus'), 1000);
          const ratio = this.tableContent.scrollLeft / this.hScroller.tableUnseenWidth;
          this.$refs.scrollbar.style.left = this.hScroller.scrollerUnseenWidth * ratio + 'px';
        }
      }

      this.hScroller.lastLeft = this.tableContent.scrollLeft;
    },

    importTable(cb) {
      this.$refs.importFile.click();
      this.importCallback = cb;
    },

    doImport(e) {
      this.processing = true;
      this.refresh();
      setTimeout(() => {
        const files = e.target.files;
        if (!files || files.length === 0) return;
        const file = files[0];
        const fileReader = new FileReader();

        fileReader.onload = e => {
          try {
            const data = e.target.result;
            const wb = XLSX.read(data, {
              type: 'binary',
              cellDates: true,
              cellStyle: false
            });
            const sheet = wb.SheetNames[0];
            const importData = XLSX.utils.sheet_to_row_object_array(wb.Sheets[sheet]);
            const keyStart = new Date().getTime();
            if (importData.length === 0) throw new Error('VueExcelEditor: ' + this.localizedLabel.noRecordIsRead);
            if (this.fields.filter(f => f.keyField).filter(f => typeof importData[0][f.name] === 'undefined' && typeof importData[0][f.label] === 'undefined').length > 0) throw new Error(`VueExcelEditor: ${this.localizedLabel.missingKeyColumn}`);
            let pass = 0;
            let inserted = 0;
            let updated = 0;

            while (pass < 2) {
              importData.forEach((line, i) => {
                let rowPos = this.table.findIndex(v => {
                  return this.fields.filter(f => f.keyField).filter(f => v[f.name] !== line[f.name] && v[f.name] !== line[f.label]).length === 0;
                });
                let rec = {
                  $id: typeof line.$id === 'undefined' ? keyStart + '-' + i : line.$id
                };
                this.fields.forEach(field => {
                  if (field.name.startsWith('$')) return;
                  let val = line[field.name];
                  if (typeof val === 'undefined') val = line[field.label];
                  if (typeof val === 'undefined') val = null;else {
                    if (field.readonly) throw new Error(`VueExcelEditor: [row=${i + 1}] ` + this.localizedLabel.readonlyColumnDetected);

                    if (field.validate) {
                      let err;
                      if (err = field.validate(val)) throw new Error(`VueExcelEditor: [row=${i + 1}] ` + this.localizedLabel.columnHasValidationError(field.name, err));
                    }
                  }
                  if (val !== null) rec[field.name] = val;
                });

                if (pass === 1) {
                  if (rowPos >= 0) {
                    updated++;
                  } else {
                    rowPos = this.table.push(rec) - 1;
                    inserted++;
                  }

                  Object.keys(rec).forEach(name => {
                    if (name.startsWith('$')) return;
                    this.updateCellByName(rowPos, name, rec[name]);
                  });
                }
              });
              pass++;
            }

            if (pass === 2 && this.importCallback) {
              this.importCallback({
                inserted: inserted,
                updated: updated,
                recordAffected: inserted + updated
              });
            }
          } catch (e) {
            throw new Error('VueExcelEditor: ' + e.stack);
          } finally {
            this.processing = false;
            this.$refs.importFile.value = '';
          }
        };

        fileReader.onerror = e => {
          this.processing = false;
          this.$refs.importFile.value = '';
          throw new Error('VueExcelEditor: ' + e.stack);
        };

        fileReader.readAsBinaryString(file);
      }, 500);
    },

    winScroll() {
      this.showDatePicker = false;
      this.autocompleteInputs = [];
    },

    winResize() {
      this.lazy(this.refreshPageSize, 200);
    },

    winPaste(e) {
      if (e.target.tagName !== 'TEXTAREA') return;
      if (!this.mousein && !this.focused) return;
      if (!this.currentField || this.currentField.readonly) return;

      if (this.inputBoxShow) {
        this.inputBoxChanged = true;
        return;
      }

      const text = (e.originalEvent || e).clipboardData.getData('text/plain');
      this.inputCellWrite(text);
      e.preventDefault();
    },

    winKeydown(e) {
      if (!this.mousein && !this.focused) return;
      if (e.ctrlKey || e.metaKey) switch (e.keyCode) {
        case 90:
          // z
          this.undoTransaction();
          e.preventDefault();
          break;

        case 65:
          // a
          this.toggleSelectAllRecords();
          e.preventDefault();
          break;

        case 67:
          // c
          this.inputBox.value = this.currentCell.innerText;
          this.inputBox.focus();
          this.inputBox.select();
          document.execCommand('copy');
          e.preventDefault();
          break;

        case 70:
          // f
          if (!this.noFinding) {
            this.$refs.panelFind.showPanel();
            e.preventDefault();
          }

          break;

        case 71:
          // g
          if (!this.noFindingNext && this.inputFind !== '') {
            this.doFindNext();
            e.preventDefault();
          }

          break;

        case 76:
          // l
          e.preventDefault();
          this.calAutocompleteList(true);
          break;
      } else {
        if (this.currentRowPos < 0) return;

        switch (e.keyCode) {
          case 37:
            // Left Arrow
            if (!this.focused) return;

            if (!this.inputBoxShow) {
              this.moveWest(e);
              e.preventDefault();
            } else {
              if (this.inputBox.selectionStart === 0) {
                this.moveWest(e);
                e.preventDefault();
              }
            }

            break;

          case 38:
            // Up Arrow
            if (!this.focused) return;
            e.preventDefault();
            if (this.autocompleteInputs.length === 0) this.moveNorth();else if (this.autocompleteSelect > 0) this.autocompleteSelect--;
            break;

          case 9: // Tab

          case 39:
            // Right Arrow
            if (!this.focused) return;

            if (!this.inputBoxShow) {
              this.moveEast(e);
              e.preventDefault();
            } else {
              if (this.inputBox.selectionEnd === this.inputBox.value.length) {
                this.moveEast(e);
                e.preventDefault();
              }
            }

            break;

          case 40:
            // Down Arrow
            if (!this.focused) return;
            e.preventDefault();
            if (this.autocompleteInputs.length === 0) this.moveSouth(e);else if (this.autocompleteSelect < this.autocompleteInputs.length - 1) this.autocompleteSelect++;
            break;

          case 13:
            // Enter
            if (!this.focused) return;
            e.preventDefault();

            if (this.autocompleteInputs.length === 0 || this.autocompleteSelect === -1) {
              if (!this.moveSouth(e)) {
                if (this.inputBoxChanged) {
                  this.inputCellWrite(this.inputBox.value);
                  this.inputBoxChanged = false;
                }

                this.inputBoxShow = 0;
                this.showDatePicker = false;
                this.autocompleteInputs = [];
                this.autocompleteSelect = -1;
              }

              return;
            } else if (this.autocompleteSelect !== -1) this.inputAutocompleteText(this.autocompleteInputs[this.autocompleteSelect]);

            break;

          case 27:
            // Esc
            if (!this.focused) return;
            this.showDatePicker = false;
            this.autocompleteInputs = [];
            this.autocompleteSelect = -1;

            if (this.inputBoxShow) {
              e.preventDefault();
              this.inputBox.value = this.currentCell.innerText;
              this.inputBoxShow = 0;
              this.inputBoxChanged = false;
            }

            break;

          case 33:
            // Page Up
            this.prevPage();
            e.preventDefault();
            break;

          case 34:
            // Page Down
            this.nextPage();
            e.preventDefault();
            break;

          case 8: // Delete

          case 46:
            // BS
            if (!this.focused) return;

            if (this.inputBoxShow) {
              this.inputBoxChanged = true;
              setTimeout(this.calAutocompleteList);
              return;
            }

            if (this.currentField.readonly) return;
            if (this.autocompleteInputs.length) return;
            if (this.currentField.type === 'select') this.calAutocompleteList(true);else {
              this.inputBox.value = '';
              this.inputCellWrite('');
            }
            break;

          default:
            if (!this.focused) return;
            if (this.currentField.readonly) return;
            if (e.altKey) return;
            if (e.key !== 'Process' && e.key.length > 1) return;
            if (this.currentField.allowKeys && this.currentField.allowKeys.indexOf(e.key.toUpperCase()) === -1) return e.preventDefault();
            if (this.currentField.lengthLimit && this.inputBox.value.length > this.currentField.lengthLimit) return e.preventDefault();

            if (!this.inputBoxShow) {
              if (this.currentField.type === 'select') {
                this.calAutocompleteList(true);
                return;
              }

              if (this.currentField.type === 'date') {
                this.showDatePickerDiv();
                return;
              }

              this.inputBox.value = '';
              this.inputBoxShow = 1;
              this.inputBox.focus();
            }

            this.inputBoxChanged = true;
            setTimeout(this.calAutocompleteList);
            break;
        }
      }
    },

    registerColumn(field) {
      let pos = this.fields.findIndex(item => item.pos > field.pos);
      if (pos === -1) pos = this.fields.length;
      this.fields.splice(pos, 0, field);
      if (field.summary) this.summaryRow = true;
    },

    moveInputSquare(rowPos, colPos) {
      if (colPos < 0) return false;
      const row = this.recordBody.children[rowPos];

      if (!row) {
        if (rowPos > this.currentRowPos) {
          // move the whole page down 1 record
          if (this.pageTop + this.pageSize < this.table.length) this.pageTop += 1;
          return false;
        } else {
          // move the whole page up 1 record
          if (this.pageTop - 1 >= 0) this.pageTop -= 1;
          return false;
        }
      } // Clear the label markers


      this.labelTr.children[this.currentColPos + 1].classList.remove('focus');
      if (this.currentRowPos >= 0 && this.currentRowPos < this.pagingTable.length) this.recordBody.children[this.currentRowPos].children[0].classList.remove('focus'); // Off the textarea when moving, write to value if changed

      if (this.inputBoxShow) this.inputBoxShow = 0;

      if (this.inputBoxChanged) {
        this.inputCellWrite(this.currentField.toValue(this.inputBox.value));
        this.inputBoxChanged = false;
      } // Relocate the inputSquare


      const cell = row.children[colPos + 1];
      if (!cell) return false;
      this.currentField = this.fields[colPos];
      const cellRect = cell.getBoundingClientRect();
      const tableRect = this.systable.getBoundingClientRect();
      this.squareSavedLeft = this.tableContent.scrollLeft;
      this.inputSquare.style.marginLeft = 0;
      this.inputSquare.style.left = cellRect.left - tableRect.left - 1 + 'px';
      this.inputSquare.style.top = cellRect.top - tableRect.top - 1 + 'px';
      this.inputSquare.style.width = cellRect.width + 1 + 'px';
      this.inputSquare.style.height = cellRect.height + 1 + 'px';
      this.inputSquare.style.zIndex = this.currentField.sticky ? 3 : 1; // Adjust the scrolling to display the whole focusing cell

      if (!this.currentField.sticky) {
        const boundRect = this.$el.getBoundingClientRect();
        if (cellRect.right >= boundRect.right - 12) this.tableContent.scrollBy(cellRect.right - boundRect.right + 13, 0);
        if (cellRect.left <= boundRect.left + this.leftMost) this.tableContent.scrollBy(cellRect.left - boundRect.left - this.leftMost - 1, 0);
      }

      this.currentRowPos = rowPos;
      this.currentColPos = colPos;
      this.currentCell = cell; // Off all editors

      if (this.showDatePicker) this.showDatePicker = false;

      if (this.autocompleteInputs.length) {
        this.autocompleteInputs = [];
        this.autocompleteSelect = -1;
      }

      if (this.recalAutoCompleteList) clearTimeout(this.recalAutoCompleteList); // set the label markers

      if (this.currentRowPos >= 0 && this.currentRowPos < this.pagingTable.length) {
        this.inputBox.focus();
        this.focused = true;
        row.children[0].classList.add('focus');
        this.labelTr.children[colPos + 1].classList.add('focus');
      }

      return true;
    },

    refresh() {
      this.pageTop = 0;
      this.prevSelect = -1;
      this.calTable(); // this.reviseSelectedAfterTableChange()

      this.refreshPageSize();
    },

    getSelectedRecords() {
      return this.table.filter((rec, i) => this.selected[i]);
    },

    deleteSelectedRecords() {
      this.table = this.table.filter((rec, i) => typeof this.selected[i] === 'undefined');
      this.selected = {};
      this.selectedCount = 0;
    },

    colSepMouseDown(e) {
      e.preventDefault();
      e.stopPropagation();
      this.focused = false;

      const getStyleVal = (elm, css) => {
        window.getComputedStyle(elm, null).getPropertyValue(css);
      };

      this.sep = {};
      this.sep.curCol = this.colgroupTr.children[Array.from(this.labelTr.children).indexOf(e.target.parentElement)]; // this.sep.nxtCol = this.sep.curCol.nextElementSibling

      this.sep.pageX = e.pageX;
      let padding = 0;

      if (getStyleVal(this.sep.curCol, 'box-sizing') !== 'border-box') {
        const padLeft = getStyleVal(this.sep.curCol, 'padding-left');
        const padRight = getStyleVal(this.sep.curCol, 'padding-right');
        if (padLeft && padRight) padding = parseInt(padLeft) + parseInt(padRight);
      }

      this.sep.curColWidth = e.target.parentElement.offsetWidth - padding; // if (this.sep.nxtCol)
      //   this.sep.nxtColWidth = this.sep.nxtCol.offsetWidth - padding

      window.addEventListener('mousemove', this.colSepMouseMove);
      window.addEventListener('mouseup', this.colSepMouseUp);
    },

    colSepMouseOver(e) {
      e.target.style.borderRight = '5px solid #cccccc';
      e.target.style.height = this.systable.getBoundingClientRect().height + 'px';
    },

    colSepMouseOut(e) {
      e.target.style.borderRight = '';
      e.target.style.height = '100%';
    },

    colSepMouseMove(e) {
      if (!this.sep || !this.sep.curCol) return;
      const diffX = e.pageX - this.sep.pageX;
      this.sep.curCol.style.width = this.sep.curColWidth + diffX + 'px';
      this.lazy(this.calStickyLeft);
    },

    colSepMouseUp(e) {
      e.preventDefault();
      e.stopPropagation();
      delete this.sep;
      window.removeEventListener('mousemove', this.colSepMouseMove);
      window.removeEventListener('mouseup', this.colSepMouseUp);
      const setting = this.getSetting();
      if (this.remember) localStorage[window.location.pathname + '.' + this.token] = JSON.stringify(setting);
      this.$emit('setting', setting);
    },

    doFindNext() {
      return this.doFind();
    },

    doFind(s) {
      if (typeof s === 'undefined') s = this.inputFind;else this.inputFind = s;
      s = s.toUpperCase();

      for (let r = this.currentRowPos + this.pageTop; r < this.table.length; r++) {
        const rec = this.table[r];

        for (let c = r === this.currentRowPos + this.pageTop ? this.currentColPos + 1 : 0; c < this.fields.length; c++) {
          const field = this.fields[c].name;

          if (typeof rec[field] !== 'undefined' && String(rec[field]).toUpperCase().indexOf(s) >= 0) {
            this.pageTop = this.findPageTop(r);
            setTimeout(() => {
              this.moveInputSquare(r - this.pageTop, c);
              setTimeout(() => this.inputBox.focus());
              this.focused = true;
            });
            return true;
          }
        }
      }

      for (let r = 0; r <= this.currentRowPos + this.pageTop; r++) {
        const rec = this.table[r];

        for (let c = 0; c < (r === this.currentRowPos + this.pageTop ? this.currentColPos : this.fields.length); c++) {
          const field = this.fields[c].name;

          if (typeof rec[field] !== 'undefined' && String(rec[field]).toUpperCase().indexOf(s) >= 0) {
            this.pageTop = this.findPageTop(r);
            this.moveInputSquare(r - this.pageTop, c);
            setTimeout(() => {
              this.focused = true;
            });
            return true;
          }
        }
      }

      return false;
    },

    findPageTop(rowPos) {
      for (let pt = this.pageTop; pt < this.table.length; pt += this.pageSize) if (rowPos >= pt && rowPos < pt + this.pageSize) return pt;

      for (let pt = this.pageTop; pt > 0; pt -= this.pageSize) if (rowPos >= pt && rowPos < pt + this.pageSize) return pt;

      return this.pageTop;
    },

    headerClick(e, colPos) {
      if (e.which === 1) {
        e.preventDefault();
        if (this.sortPos === colPos && this.sortDir > 0) this.sort(-1, colPos);else this.sort(1, colPos);
      }
    },

    sort(n, pos) {
      this.processing = true;
      const colPos = typeof pos === 'undefined' ? this.columnFilterRef.colPos : pos;
      const fieldName = this.fields[colPos].name;
      const type = this.fields[colPos].type;
      setTimeout(() => {
        if (type === 'number') this.value.sort((a, b) => {
          if (Number(a[fieldName]) > Number(b[fieldName])) return n;
          if (Number(a[fieldName]) < Number(b[fieldName])) return -n;
          return 0;
        });else this.value.sort((a, b) => {
          if (a[fieldName] > b[fieldName]) return n;
          if (a[fieldName] < b[fieldName]) return -n;
          return 0;
        });
        this.sortPos = colPos;
        this.sortDir = n;
        this.processing = false;
      }, 0);
    },

    freezePanelSizeAfterShown(target) {
      const rect = target.getBoundingClientRect();
      target.setAttribute('style', `width:${rect.width}px; height:${rect.height}px;`);
    },

    refreshPageSize() {
      if (this.$refs.scrollbar) {
        const fullWidth = this.systable.getBoundingClientRect().width;
        const viewWidth = this.tableContent.getBoundingClientRect().width;
        this.hScroller.tableUnseenWidth = fullWidth - viewWidth;
        this.$refs.scrollbar.style.width = 100 * viewWidth / fullWidth + '%';
        const scrollerWidth = this.$refs.scrollbar.getBoundingClientRect().width;
        this.hScroller.scrollerUnseenWidth = this.footer.getBoundingClientRect().width - 40 - scrollerWidth;
      }

      if (!this.noPaging) {
        const offset = this.summaryRow ? 60 : 35;
        this.pageSize = this.page || Math.floor((window.innerHeight - this.recordBody.getBoundingClientRect().top - offset) / 24);
      } else if (this.height === 'auto') {
        let h = Math.floor(window.innerHeight - this.tableContent.getBoundingClientRect().top - 25);
        let offset = 4;
        if (this.filterRow) offset += 29;
        if (this.summaryRow) offset += 25;
        if (!this.footerRow) offset += 25;
        h = Math.min(24 * (this.table.length - this.pageTop) + offset, h);
        this.systable.parentNode.style.height = h + 'px';
      }

      setTimeout(this.calVScroll);
    },

    firstPage(e) {
      if (e) e.stopPropagation();
      this.pageTop = 0;
      this.calVScroll();
      setTimeout(() => {
        this.$refs.vScrollButton.classList.add('focus');
        this.lazy(() => this.$refs.vScrollButton.classList.remove('focus'), 1000);
      });
    },

    lastPage(e) {
      if (e) e.stopPropagation();
      this.pageTop = this.table.length - this.pageSize < 0 ? 0 : this.table.length - this.pageSize;
      this.calVScroll();
      setTimeout(() => {
        this.$refs.vScrollButton.classList.add('focus');
        this.lazy(() => this.$refs.vScrollButton.classList.remove('focus'), 1000);
      });
    },

    prevPage(e) {
      if (e) e.stopPropagation();
      this.pageTop = this.pageTop < this.pageSize ? 0 : this.pageTop - this.pageSize;
      this.calVScroll();
      setTimeout(() => {
        this.$refs.vScrollButton.classList.add('focus');
        this.lazy(() => this.$refs.vScrollButton.classList.remove('focus'), 1000);
      });
    },

    nextPage(e) {
      if (e) e.stopPropagation();
      if (this.pageTop + this.pageSize < this.table.length) this.pageTop = Math.min(this.pageTop + this.pageSize, this.table.length - this.pageSize);
      this.calVScroll();
      setTimeout(() => {
        this.$refs.vScrollButton.classList.add('focus');
        this.lazy(() => this.$refs.vScrollButton.classList.remove('focus'), 1000);
      });
    },

    rowLabelClick(e) {
      let target = e.target;

      while (target.tagName !== 'TD') target = target.parentNode;

      const rowPos = Number(target.getAttribute('pos')) + this.pageTop;

      if (e.shiftKey) {
        document.getSelection().removeAllRanges();

        if (this.prevSelect !== -1 && this.prevSelect !== rowPos) {
          e.preventDefault();
          if (rowPos > this.prevSelect) for (let i = this.prevSelect; i <= rowPos; i++) this.selectRecord(i);else for (let i = rowPos; i <= this.prevSelect; i++) this.selectRecord(i);
        }
      } else {
        const selected = this.selected[rowPos];
        if (!this.freeSelect && !(e.ctrlKey || e.metaKey)) this.clearAllSelected();
        if (!selected) this.selectRecord(rowPos);else this.unSelectRecord(rowPos);
      }

      this.prevSelect = rowPos;
    },

    settingClick() {
      this.$refs.panelSetting.showPanel();
    },

    exportTable(format, selectedOnly) {
      this.processing = true;
      setTimeout(() => {
        const wb = XLSX.utils.book_new();
        let ws1 = null;
        if (selectedOnly) ws1 = XLSX.utils.json_to_sheet(this.table.filter((rec, i) => this.selected[i]), {
          header: this.fields.map(field => field.name)
        });else ws1 = XLSX.utils.json_to_sheet(this.table, {
          header: this.fields.map(field => field.name)
        });
        const labels = Array.from(this.labelTr.children).slice(1).map(t => t.children[0].innerText);
        XLSX.utils.sheet_add_aoa(ws1, [labels], {
          origin: 0
        });
        ws1['!cols'] = Array.from(this.labelTr.children).slice(1).map(t => {
          return {
            width: t.getBoundingClientRect().width / 6.5
          };
        });
        XLSX.utils.book_append_sheet(wb, ws1, 'Sheet1');

        switch (format) {
          case 'excel':
            XLSX.writeFile(wb, 'export.xlsx');
            break;

          case 'csv':
            XLSX.writeFile(wb, 'export.csv');
            break;
        }

        this.processing = false;
      }, 500);
    },

    selectAllClick() {
      this.toggleSelectAllRecords();
    },

    reviseSelectedAfterTableChange() {
      this.rowIndex = {};
      this.table.forEach((rec, i) => this.rowIndex[rec.$id] = i);
      const temp = Object.assign(this.selected);
      this.selected = {};
      Object.keys(temp).forEach(p => {
        const id = temp[p];
        if (typeof this.rowIndex[id] !== 'undefined') this.selected[this.rowIndex[id]] = id;
      });
      this.selectedCount = Object.keys(this.selected).length;
    },

    toggleSelectRecord(rowPos) {
      if (typeof this.selected[rowPos] !== 'undefined') this.unSelectRecord(rowPos);else this.selectRecord(rowPos);
    },

    selectRecord(rowPos) {
      if (typeof this.selected[rowPos] === 'undefined') {
        this.selectedCount++;
        this.selected[rowPos] = this.table[rowPos].$id;
        if (this.recordBody.children[rowPos - this.pageTop]) this.recordBody.children[rowPos - this.pageTop].classList.add('select');
        this.lazy(rowPos, buf => {
          this.$emit('select', buf, true);
        });
      }
    },

    unSelectRecord(rowPos) {
      if (typeof this.selected[rowPos] !== 'undefined') {
        delete this.selected[rowPos];
        this.selectedCount--;
        if (this.recordBody.children[rowPos - this.pageTop]) this.recordBody.children[rowPos - this.pageTop].classList.remove('select');
        this.lazy(rowPos, buf => {
          this.$emit('select', buf, false);
        });
      }
    },

    toggleSelectAllRecords(e) {
      if (e) e.preventDefault();

      if (this.selectedCount === this.table.length) {
        for (let i = 0; i < this.table.length; i++) this.unSelectRecord(i);

        this.selectedCount = 0;
      } else {
        for (let i = 0; i < this.table.length; i++) this.selectRecord(i);

        this.selectedCount = this.table.length;
      }
    },

    clearAllSelected() {
      // for (let i = 0; i < this.$refs.systable.children[2].children.length; i++)
      //  this.unSelectRecord(this.pageTop + i)
      this.selected = {};
      this.selectedCount = 0;
    },

    undoTransaction(e) {
      if (e) e.preventDefault();
      if (this.redo.length === 0) return;
      const transaction = this.redo.pop();
      transaction.forEach(rec => {
        this.updateCell(this.rowIndex[rec.$id], rec.field, rec.oldVal, true);
      });
    },

    updateCellByColPos(recPos, colPos, content) {
      return this.updateCell(recPos, this.fields[colPos], content);
    },

    updateCellByName(recPos, name, content) {
      return this.updateCell(recPos, this.fields.find(f => f.name === name), content);
    },

    updateCell(recPos, field, content, restore) {
      const tableRow = this.table[recPos];
      const oldVal = tableRow[field.name];
      const oldKeys = this.getKeys(tableRow);
      tableRow[field.name] = content;
      setTimeout(() => {
        const transaction = {
          $id: tableRow.$id,
          keys: this.getKeys(tableRow),
          oldKeys: oldKeys,
          name: field.name,
          field: field,
          oldVal: oldVal,
          newVal: content,
          err: ''
        };
        const id = `id-${tableRow.$id}-${field.name}`;
        if (field.validate !== null) transaction.err = field.validate(content);
        if (field.mandatory && content === '') transaction.err += (transaction.err ? '\n' : '') + field.mandatory;

        if (transaction.err !== '') {
          this.errmsg[id] = transaction.err;
          this.systable.querySelector('td#' + id).classList.add('error');
        } else delete this.errmsg[id];

        this.lazy(transaction, buf => {
          this.$emit('update', buf);
          if (!restore) this.redo.push(buf);
        }, 50);
      });
    },

    updateSelectedRows(field, content) {
      this.processing = true;
      setTimeout(() => {
        Object.keys(this.selected).forEach(recPos => this.updateCell(recPos, field, content));
        this.processing = false;
      }, 0);
    },

    moveTo(rowPos, colPos) {
      colPos = colPos || 0;
      this.moveInputSquare(rowPos, colPos);
    },

    moveWest() {
      if (this.focused && this.currentColPos > 0) {
        let goColPos = this.currentColPos - 1;

        while (this.fields[goColPos].invisible && goColPos >= 0) goColPos--;

        if (goColPos === -1) return;
        this.moveInputSquare(this.currentRowPos, goColPos);
      }
    },

    moveEast() {
      if (this.focused && this.currentColPos < this.fields.length - 1) {
        let goColPos = this.currentColPos + 1;

        while (this.fields[goColPos].invisible && goColPos < this.fields.length - 1) goColPos++;

        if (goColPos === this.fields.length) return;
        this.moveInputSquare(this.currentRowPos, goColPos);
      }
    },

    moveNorth() {
      if (this.focused) {
        this.moveInputSquare(this.currentRowPos - 1, this.currentColPos);
        this.calVScroll();
        this.$refs.vScrollButton.classList.add('focus');
        this.lazy(() => this.$refs.vScrollButton.classList.remove('focus'), 1000);
      }
    },

    moveSouth() {
      if (this.focused && this.currentRowPos < this.table.length) {
        const done = this.moveInputSquare(this.currentRowPos + 1, this.currentColPos);
        this.calVScroll();
        this.$refs.vScrollButton.classList.add('focus');
        this.lazy(() => this.$refs.vScrollButton.classList.remove('focus'), 1000);
        return done;
      }

      return false;
    },

    mouseDown(e) {
      if (e.target.parentNode.parentNode.tagName === 'TBODY' && !e.target.classList.contains('first-col')) {
        e.preventDefault();
        setTimeout(() => this.inputBox.focus());
        this.focused = true;
        const row = e.target.parentNode;
        const colPos = Array.from(row.children).indexOf(e.target) - 1;
        const rowPos = Array.from(row.parentNode.children).indexOf(row);
        this.moveInputSquare(rowPos, colPos);
        if (e.target.offsetWidth - e.offsetX > 15) return;
        if (e.target.classList.contains('select')) this.calAutocompleteList(true);
        if (e.target.classList.contains('datepick')) this.showDatePickerDiv();
      }
    },

    cellMouseMove(e) {
      let cursor = 'cell';
      if (this.inputBoxShow) cursor = 'default';
      if (!e.target.classList.contains('readonly') && (e.target.classList.contains('select') || e.target.classList.contains('datepick')) && e.target.offsetWidth - e.offsetX < 15) cursor = 'pointer';
      e.target.style.cursor = cursor;
    },

    cellMouseOver(e) {
      const cell = e.target;
      if (!cell.classList.contains('error')) return;
      if (this.tipTimeout) clearTimeout(this.tipTimeout);
      if ((this.tip = this.errmsg[cell.getAttribute('id')]) === '') return;
      const rect = cell.getBoundingClientRect();
      this.$refs.tooltip.style.top = rect.top - 14 + 'px';
      this.$refs.tooltip.style.left = rect.right + 8 + 'px';
      cell.addEventListener('mouseout', this.cellMouseOut);
    },

    cellMouseOut(e) {
      this.tipTimeout = setTimeout(() => {
        this.tip = '';
      }, 1000);
      e.target.removeEventListener(e.type, this.cellMouseOut);
    },

    mouseOver() {
      this.mousein = true;
    },

    mouseOut() {
      this.mousein = false;
    },

    inputSquareClick() {
      if (!this.currentField.readonly && !this.inputBoxShow && this.currentField.type !== 'select') {
        this.inputBox.value = this.currentCell.innerText;
        this.inputBoxShow = 1;
        this.inputBox.focus();
        this.inputBoxChanged = false;
        this.focused = true;
      }
    },

    inputBoxMouseMove(e) {
      let cursor = 'text';
      if (!this.currentField.readonly && (this.currentField.options.length || this.currentField.type === 'date') && e.target.offsetWidth - e.offsetX < 15) cursor = 'pointer';
      e.target.style.cursor = cursor;
    },

    inputBoxMouseDown(e) {
      if (e.target.offsetWidth - e.offsetX > 15) return;

      if (this.currentField.options.length) {
        e.preventDefault();
        this.calAutocompleteList(true);
      }

      if (this.currentField.type === 'date') {
        e.preventDefault();
        this.showDatePickerDiv();
      }
    },

    calAutocompleteList(force) {
      if (!force && !this.currentField.autocomplete) return;

      if (force || this.inputBoxChanged && this.inputBox.value.length > 0) {
        if (typeof this.recalAutoCompleteList !== 'undefined') clearTimeout(this.recalAutoCompleteList);
        this.recalAutoCompleteList = setTimeout(() => {
          if (!force) {
            if (!this.focused || !this.inputBoxShow || !this.inputBoxChanged || !this.inputBox.value.length) {
              this.autocompleteInputs = [];
              return;
            }
          }

          const field = this.currentField;
          const name = field.name;
          const value = force ? '' : this.inputBox.value;
          let list;

          if (field.options.length > 0) {
            list = this.currentField.options;
          } else {
            list = [];

            for (let i = 0; i < this.table.length; i++) {
              const rec = this.table[i];
              if (typeof rec[name] !== 'undefined' && rec[name].startsWith(value) && list.indexOf(rec[name]) === -1) list.push(rec[name]);
              if (list.length >= 10) break;
            }

            list.sort();
          }

          this.autocompleteSelect = -1;
          this.autocompleteInputs = list;
          const rect = this.currentCell.getBoundingClientRect();
          this.$refs.autocomplete.style.top = rect.bottom + 'px';
          this.$refs.autocomplete.style.left = rect.left + 'px';
          this.$refs.autocomplete.style.minWidth = rect.width + 'px';
          this.lazy(() => {
            const r = this.$refs.autocomplete.getBoundingClientRect();
            if (r.bottom > window.innerHeight) this.$refs.autocomplete.style.top = rect.top - r.height + 'px';
            if (r.right > window.innerWidth) this.$refs.autocomplete.style.top = window.innerWidth - r.width + 'px';
          });
        }, force ? 0 : 700);
      }
    },

    inputAutocompleteText(text, e) {
      if (e) e.preventDefault();
      setTimeout(() => {
        this.inputCellWrite(text);
        this.autocompleteInputs = [];
        this.autocompleteSelect = -1;
        this.inputBoxShow = 0;
        this.inputBoxChanged = false;
      });
    },

    inputCellWrite(setText, colPos, recPos) {
      let field = this.currentField;
      if (typeof colPos !== 'undefined') field = this.fields[colPos];
      if (typeof recPos === 'undefined') recPos = this.pageTop + this.currentRowPos;
      if (typeof this.selected[recPos] !== 'undefined') this.updateSelectedRows(field, setText);else this.updateCell(recPos, field, setText);
    },

    inputBoxBlur() {
      if (this.$refs.dpContainer.querySelector(':hover')) return;

      if (this.inputBoxChanged) {
        this.inputCellWrite(this.inputBox.value);
        this.inputBoxChanged = false;
      }

      this.inputBoxShow = 0;
      this.focused = false;
      this.showDatePicker = false;

      if (this.currentRowPos !== -1) {
        this.recordBody.children[this.currentRowPos].children[0].classList.remove('focus');
        this.labelTr.children[this.currentColPos + 1].classList.remove('focus');
      }
    },

    hashCode(s) {
      return s.split('').reduce((a, b) => {
        return a = (a << 5) - a + b.charCodeAt(0) | 0;
      }, 0);
    },

    lazy(p, delay, p1) {
      if (typeof p !== 'function') return this.lazyBuf(p, delay, p1);
      if (!delay) delay = 20;
      const hash = this.hashCode(p.name + p.toString());
      if (this.lazyTimeout[hash]) clearTimeout(this.lazyTimeout[hash]);
      this.lazyTimeout[hash] = setTimeout(() => {
        p();
        delete this.lazyTimeout[hash];
      }, delay);
    },

    lazyBuf(item, p, delay) {
      if (!delay) delay = 20;
      const hash = this.hashCode(p.name + p.toString());
      if (this.lazyBuffer[hash]) this.lazyBuffer[hash].push(item);else this.lazyBuffer[hash] = [item];
      if (this.lazyTimeout[hash]) clearTimeout(this.lazyTimeout[hash]);
      this.lazyTimeout[hash] = setTimeout(() => {
        p(this.lazyBuffer[hash]);
        delete this.lazyTimeout[hash];
        delete this.lazyBuffer[hash];
      }, delay);
    }
    /*
    selStart (target) {
      this.selTarget = target
      this.selx = Array.from(target.parentNode.children).indexOf(target) - 1
      this.sely = target.parentNode.getAttribute('pos')
    },
    selProcess (target) {
      if (target === null) return
      // const x = Array.from(target.parentNode.children).indexOf(target) - 1
      // const y = target.parentNode.getAttribute('pos')
      this.selEnd(target)
    },
    selEnd (target) {
      if (target !== null && target !== this.selTarget) {
        const st = this.selTarget.getBoundingClientRect()
        const ed = target.getBoundingClientRect()
         if (this.selSquare === null) {
          this.selSquare = document.createElement('div')
          document.body.appendChild(this.selSquare)
        }
         const left = Math.min(st.left, ed.left) - 1
        const top = Math.min(st.top, ed.top) - 1
        const width = Math.max(ed.right - st.left, st.right - ed.left) + 2
        const height = Math.max(ed.bottom - st.top, st.bottom - ed.top) + 2
         this.selSquare.setAttribute('style', `
          left: ${left}px;
          top: ${top}px;
          width: ${width}px;
          height: ${height}px;
          position: absolute;
          border: 2px solid #999966;
          'z-index': 1000;
          background-color: #35456755;
          display: block;
          pointer-events: none;
        `)
      }
    }
    */


  }
};

/* script */
const __vue_script__$9 = script$9;

/* template */
var __vue_render__$b = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    {
      staticClass: "vue-excel-editor",
      style: { display: "inline-block", "max-width": _vm.width }
    },
    [
      _c(
        "div",
        { staticClass: "component-content" },
        [
          _c(
            "div",
            {
              ref: "tableContent",
              staticClass: "table-content",
              class: { "no-footer": _vm.noFooter },
              on: {
                scroll: _vm.tableScroll,
                mouseover: _vm.mouseOver,
                mouseout: _vm.mouseOut
              }
            },
            [
              _c(
                "table",
                {
                  ref: "systable",
                  staticClass: "systable",
                  class: { "no-number": _vm.noNumCol },
                  staticStyle: { "table-layout": "fixed", width: "0" },
                  attrs: {
                    id: "systable",
                    ondragenter:
                      "event.preventDefault(); event.dataTransfer.dropEffect = 'none'",
                    ondragover:
                      "event.preventDefault(); event.dataTransfer.dropEffect = 'none'"
                  }
                },
                [
                  _c(
                    "colgroup",
                    [
                      _c("col", { staticStyle: { width: "40px" } }),
                      _vm._v(" "),
                      _vm._l(_vm.fields, function(item, p) {
                        return _c("col", {
                          key: p,
                          style: { width: item.width }
                        })
                      }),
                      _vm._v(" "),
                      _c("col", { staticStyle: { width: "12px" } })
                    ],
                    2
                  ),
                  _vm._v(" "),
                  _c("thead", { staticClass: "center-text" }, [
                    _c(
                      "tr",
                      [
                        _c(
                          "th",
                          {
                            staticClass: "center-text first-col tl-setting",
                            class: { hide: _vm.noNumCol },
                            staticStyle: { top: "0" },
                            on: {
                              mousedown: function($event) {
                                if (
                                  !$event.type.indexOf("key") &&
                                  _vm._k(
                                    $event.keyCode,
                                    "left",
                                    37,
                                    $event.key,
                                    ["Left", "ArrowLeft"]
                                  )
                                ) {
                                  return null
                                }
                                if ("button" in $event && $event.button !== 0) {
                                  return null
                                }
                                return _vm.settingClick($event)
                              }
                            }
                          },
                          [
                            _c("span", { staticStyle: { width: "100%" } }, [
                              _vm.processing
                                ? _c(
                                    "svg",
                                    {
                                      staticClass:
                                        "svg-inline--fa fa-spinner fa-w-16 fa-spin fa-sm",
                                      attrs: {
                                        "aria-hidden": "true",
                                        focusable: "false",
                                        "data-prefix": "fas",
                                        "data-icon": "spinner",
                                        role: "img",
                                        xmlns: "http://www.w3.org/2000/svg",
                                        viewBox: "0 0 512 512"
                                      }
                                    },
                                    [
                                      _c("path", {
                                        attrs: {
                                          fill: "currentColor",
                                          d:
                                            "M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z"
                                        }
                                      })
                                    ]
                                  )
                                : _c(
                                    "svg",
                                    {
                                      staticClass:
                                        "svg-inline--fa fa-bars fa-w-14 fa-sm",
                                      attrs: {
                                        "aria-hidden": "true",
                                        focusable: "false",
                                        "data-prefix": "fas",
                                        "data-icon": "bars",
                                        role: "img",
                                        xmlns: "http://www.w3.org/2000/svg",
                                        viewBox: "0 0 448 512"
                                      }
                                    },
                                    [
                                      _c("path", {
                                        attrs: {
                                          fill: "currentColor",
                                          d:
                                            "M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"
                                        }
                                      })
                                    ]
                                  )
                            ])
                          ]
                        ),
                        _vm._v(" "),
                        _vm._l(_vm.fields, function(item, p) {
                          return _c(
                            "th",
                            {
                              directives: [
                                {
                                  name: "show",
                                  rawName: "v-show",
                                  value: !item.invisible,
                                  expression: "!item.invisible"
                                }
                              ],
                              key: "th-" + p,
                              staticClass: "table-col-header",
                              class: {
                                "sort-asc-sign":
                                  _vm.sortPos == p && _vm.sortDir == 1,
                                "sort-des-sign":
                                  _vm.sortPos == p && _vm.sortDir == -1,
                                "sticky-column": item.sticky
                              },
                              style: { left: item.left },
                              attrs: {
                                colspan: p === _vm.fields.length - 1 ? 2 : 1
                              },
                              on: {
                                mousedown: function($event) {
                                  return _vm.headerClick($event, p)
                                }
                              }
                            },
                            [
                              _c(
                                "div",
                                {
                                  class: { "filter-sign": _vm.columnFilter[p] }
                                },
                                [
                                  _c("span", {
                                    domProps: {
                                      innerHTML: _vm._s(
                                        _vm.headerLabel(item.label, item)
                                      )
                                    }
                                  })
                                ]
                              ),
                              _vm._v(" "),
                              _c("div", {
                                staticClass: "col-sep",
                                on: {
                                  mousedown: _vm.colSepMouseDown,
                                  mouseover: _vm.colSepMouseOver,
                                  mouseout: _vm.colSepMouseOut
                                }
                              })
                            ]
                          )
                        })
                      ],
                      2
                    ),
                    _vm._v(" "),
                    _c(
                      "tr",
                      { class: { hide: !_vm.filterRow } },
                      [
                        _c(
                          "td",
                          {
                            staticClass: "center-text first-col tl-filter",
                            class: { hide: _vm.noNumCol },
                            style: { top: _vm.calCellTop2 + "px" },
                            on: { click: _vm.selectAllClick }
                          },
                          [
                            _vm.selectedCount == _vm.table.length
                              ? _c(
                                  "svg",
                                  {
                                    staticClass:
                                      "svg-inline--fa fa-times-circle fa-w-16 fa-sm",
                                    attrs: {
                                      "aria-hidden": "true",
                                      focusable: "false",
                                      "data-prefix": "fas",
                                      "data-icon": "times-circle",
                                      role: "img",
                                      xmlns: "http://www.w3.org/2000/svg",
                                      viewBox: "0 0 512 512"
                                    }
                                  },
                                  [
                                    _c("path", {
                                      attrs: {
                                        fill: "currentColor",
                                        d:
                                          "M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z"
                                      }
                                    })
                                  ]
                                )
                              : _c(
                                  "svg",
                                  {
                                    staticClass:
                                      "svg-inline--fa fa-check-circle fa-w-16 fa-sm",
                                    attrs: {
                                      "aria-hidden": "true",
                                      focusable: "false",
                                      "data-prefix": "fas",
                                      "data-icon": "check-circle",
                                      role: "img",
                                      xmlns: "http://www.w3.org/2000/svg",
                                      viewBox: "0 0 512 512"
                                    }
                                  },
                                  [
                                    _c("path", {
                                      attrs: {
                                        fill: "currentColor",
                                        d:
                                          "M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"
                                      }
                                    })
                                  ]
                                )
                          ]
                        ),
                        _vm._v(" "),
                        _vm._l(_vm.fields, function(item, p) {
                          return _c("vue-excel-filter", {
                            directives: [
                              {
                                name: "show",
                                rawName: "v-show",
                                value: !item.invisible,
                                expression: "!item.invisible"
                              }
                            ],
                            key: "th2-" + p,
                            staticClass: "column-filter",
                            class: { "sticky-column": item.sticky },
                            style: { left: item.left },
                            attrs: {
                              colspan: p === _vm.fields.length - 1 ? 2 : 1
                            },
                            model: {
                              value: _vm.columnFilter[p],
                              callback: function($$v) {
                                _vm.$set(_vm.columnFilter, p, $$v);
                              },
                              expression: "columnFilter[p]"
                            }
                          })
                        })
                      ],
                      2
                    )
                  ]),
                  _vm._v(" "),
                  _c(
                    "tbody",
                    {
                      on: {
                        mousedown: function($event) {
                          if (
                            $event.ctrlKey ||
                            $event.shiftKey ||
                            $event.altKey ||
                            $event.metaKey
                          ) {
                            return null
                          }
                          return _vm.mouseDown($event)
                        }
                      }
                    },
                    _vm._l(_vm.pagingTable, function(record, rowPos) {
                      return _c(
                        "tr",
                        {
                          key: rowPos,
                          class: {
                            select:
                              typeof _vm.selected[_vm.pageTop + rowPos] !==
                              "undefined"
                          },
                          style: _vm.rowStyle(record)
                        },
                        [
                          _c(
                            "td",
                            {
                              staticClass: "center-text first-col",
                              class: { hide: _vm.noNumCol },
                              attrs: { pos: rowPos },
                              on: { click: _vm.rowLabelClick }
                            },
                            [
                              _c("span", {
                                domProps: {
                                  innerHTML: _vm._s(
                                    _vm.recordLabel(
                                      _vm.pageTop + rowPos + 1,
                                      record
                                    )
                                  )
                                }
                              })
                            ]
                          ),
                          _vm._v(" "),
                          _vm._l(_vm.fields, function(item, p) {
                            return [
                              _c(
                                "td",
                                {
                                  directives: [
                                    {
                                      name: "show",
                                      rawName: "v-show",
                                      value: !item.invisible,
                                      expression: "!item.invisible"
                                    }
                                  ],
                                  key: p,
                                  class: {
                                    readonly: item.readonly,
                                    error:
                                      _vm.errmsg[
                                        "id-" + record.$id + "-" + item.name
                                      ],
                                    select: item.options.length,
                                    datepick: item.type == "date",
                                    "sticky-column": item.sticky
                                  },
                                  style: Object.assign(
                                    _vm.cellStyle(record, item),
                                    _vm.columnCellStyle(item)
                                  ),
                                  attrs: {
                                    id: "id-" + record.$id + "-" + item.name
                                  },
                                  on: {
                                    mouseover: _vm.cellMouseOver,
                                    mousemove: _vm.cellMouseMove
                                  }
                                },
                                [_vm._v(_vm._s(item.toText(record[item.name])))]
                              )
                            ]
                          }),
                          _vm._v(" "),
                          _c("td", { staticClass: "last-col" })
                        ],
                        2
                      )
                    }),
                    0
                  ),
                  _vm._v(" "),
                  _c("tfoot", [
                    _c(
                      "tr",
                      {
                        directives: [
                          {
                            name: "show",
                            rawName: "v-show",
                            value: _vm.summaryRow,
                            expression: "summaryRow"
                          }
                        ]
                      },
                      [
                        _c("td", { staticClass: "row-summary first-col" }, [
                          _vm._v(" ")
                        ]),
                        _vm._v(" "),
                        _vm._l(_vm.fields, function(field, p) {
                          return [
                            _c(
                              "td",
                              {
                                directives: [
                                  {
                                    name: "show",
                                    rawName: "v-show",
                                    value: !field.invisible,
                                    expression: "!field.invisible"
                                  }
                                ],
                                key: "f" + p,
                                staticClass: "row-summary",
                                class: {
                                  "sticky-column": field.sticky,
                                  "summary-column1":
                                    p + 1 < _vm.fields.length &&
                                    _vm.fields[p + 1].summary,
                                  "summary-column2": field.summary
                                },
                                style: _vm.columnCellStyle(field),
                                attrs: {
                                  colspan: p === _vm.fields.length - 1 ? 2 : 1
                                }
                              },
                              [_vm._v(_vm._s(_vm.summary(field)))]
                            )
                          ]
                        })
                      ],
                      2
                    )
                  ]),
                  _vm._v(" "),
                  _vm._t("default")
                ],
                2
              ),
              _vm._v(" "),
              _c(
                "div",
                {
                  directives: [
                    {
                      name: "show",
                      rawName: "v-show",
                      value: _vm.tip,
                      expression: "tip"
                    }
                  ],
                  ref: "tooltip",
                  staticClass: "tool-tip"
                },
                [_vm._v(_vm._s(_vm.tip))]
              ),
              _vm._v(" "),
              _c(
                "div",
                {
                  directives: [
                    {
                      name: "show",
                      rawName: "v-show",
                      value: _vm.focused,
                      expression: "focused"
                    }
                  ],
                  ref: "inputSquare",
                  staticClass: "input-square",
                  on: { mousedown: _vm.inputSquareClick }
                },
                [
                  _c(
                    "div",
                    {
                      staticStyle: {
                        position: "relative",
                        height: "100%",
                        padding: "2px 2px 1px"
                      }
                    },
                    [
                      _c("div", { staticClass: "rb-square" }),
                      _vm._v(" "),
                      _c("textarea", {
                        ref: "inputBox",
                        staticClass: "input-box",
                        style: { opacity: _vm.inputBoxShow },
                        attrs: {
                          id: "inputBox",
                          trim: "",
                          autocomplete: "off",
                          autocorrect: "off",
                          autocompitaize: "off",
                          spellcheck: "false"
                        },
                        on: {
                          blur: _vm.inputBoxBlur,
                          mousemove: _vm.inputBoxMouseMove,
                          mousedown: _vm.inputBoxMouseDown
                        }
                      })
                    ]
                  )
                ]
              ),
              _vm._v(" "),
              _c(
                "div",
                {
                  directives: [
                    {
                      name: "show",
                      rawName: "v-show",
                      value: _vm.showDatePicker,
                      expression: "showDatePicker"
                    }
                  ],
                  ref: "dpContainer",
                  staticStyle: { "z-index": "20", position: "fixed" }
                },
                [
                  _c("date-picker", {
                    ref: "datepicker",
                    attrs: { inline: "", valueType: "format" },
                    on: { input: _vm.dpClick },
                    model: {
                      value: _vm.inputDateTime,
                      callback: function($$v) {
                        _vm.inputDateTime = $$v;
                      },
                      expression: "inputDateTime"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "div",
                {
                  directives: [
                    {
                      name: "show",
                      rawName: "v-show",
                      value: _vm.processing,
                      expression: "processing"
                    }
                  ],
                  ref: "frontdrop",
                  staticClass: "front-drop"
                },
                [
                  _c(
                    "svg",
                    {
                      staticClass:
                        "svg-inline--fa fa-spinner fa-w-16 fa-spin fa-3x",
                      attrs: {
                        "aria-hidden": "true",
                        focusable: "false",
                        "data-prefix": "fas",
                        "data-icon": "spinner",
                        role: "img",
                        xmlns: "http://www.w3.org/2000/svg",
                        viewBox: "0 0 512 512"
                      }
                    },
                    [
                      _c("path", {
                        attrs: {
                          fill: "currentColor",
                          d:
                            "M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z"
                        }
                      })
                    ]
                  )
                ]
              )
            ]
          ),
          _vm._v(" "),
          _c(
            "div",
            {
              ref: "vScroll",
              staticClass: "v-scroll",
              style: {
                top: _vm.vScroller.top + "px",
                height: _vm.vScroller.height + "px"
              },
              on: { mousedown: _vm.vsMouseDown }
            },
            [
              _c("div", {
                ref: "vScrollButton",
                staticClass: "v-scroll-button",
                style: {
                  marginTop: _vm.vScroller.buttonTop + "px",
                  height: _vm.vScroller.buttonHeight + "px"
                },
                on: { mousedown: _vm.vsbMouseDown }
              })
            ]
          ),
          _vm._v(" "),
          _c(
            "ul",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: _vm.focused && _vm.autocompleteInputs.length,
                  expression: "focused && autocompleteInputs.length"
                }
              ],
              ref: "autocomplete",
              staticClass: "autocomplete-results"
            },
            _vm._l(_vm.autocompleteInputs, function(item, i) {
              return _c(
                "li",
                {
                  key: i,
                  staticClass: "autocomplete-result",
                  class: { select: _vm.autocompleteSelect === i },
                  on: {
                    mousedown: function($event) {
                      if (
                        !$event.type.indexOf("key") &&
                        _vm._k($event.keyCode, "left", 37, $event.key, [
                          "Left",
                          "ArrowLeft"
                        ])
                      ) {
                        return null
                      }
                      if ("button" in $event && $event.button !== 0) {
                        return null
                      }
                      $event.preventDefault();
                      return _vm.inputAutocompleteText(
                        $event.target.textContent,
                        $event
                      )
                    }
                  }
                },
                [_vm._v(_vm._s(item))]
              )
            }),
            0
          ),
          _vm._v(" "),
          _c(
            "div",
            {
              ref: "footer",
              staticClass: "footer center-text",
              class: { hide: _vm.noFooter },
              staticStyle: { position: "relative" },
              on: { mousedown: _vm.ftMouseDown }
            },
            [
              _c("div", {
                ref: "scrollbar",
                staticClass: "scroll-bar",
                on: { mousedown: _vm.sbMouseDown }
              }),
              _vm._v(" "),
              _c("span", { staticClass: "left-block" }),
              _vm._v(" "),
              _c(
                "span",
                {
                  directives: [
                    {
                      name: "show",
                      rawName: "v-show",
                      value: !_vm.noPaging,
                      expression: "!noPaging"
                    }
                  ],
                  staticStyle: { position: "absolute", left: "46px" }
                },
                [
                  _c("span", {
                    domProps: {
                      innerHTML: _vm._s(
                        _vm.localizedLabel.footerLeft(
                          _vm.pageTop + 1,
                          _vm.pageBottom,
                          _vm.table.length
                        )
                      )
                    }
                  })
                ]
              ),
              _vm._v(" "),
              _c(
                "span",
                {
                  directives: [
                    {
                      name: "show",
                      rawName: "v-show",
                      value:
                        !_vm.noPaging &&
                        _vm.pageBottom - _vm.pageTop < _vm.table.length,
                      expression:
                        "!noPaging && pageBottom - pageTop < table.length"
                    }
                  ]
                },
                [
                  _vm.processing
                    ? [
                        _c(
                          "svg",
                          {
                            staticClass:
                              "svg-inline--fa fa-spinner fa-w-16 fa-spin fa-sm",
                            attrs: {
                              "aria-hidden": "true",
                              focusable: "false",
                              "data-prefix": "fas",
                              "data-icon": "spinner",
                              role: "img",
                              xmlns: "http://www.w3.org/2000/svg",
                              viewBox: "0 0 512 512"
                            }
                          },
                          [
                            _c("path", {
                              attrs: {
                                fill: "currentColor",
                                d:
                                  "M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z"
                              }
                            })
                          ]
                        ),
                        _vm._v("\n           \n          "),
                        _c("span", {
                          domProps: {
                            innerHTML: _vm._s(_vm.localizedLabel.processing)
                          }
                        })
                      ]
                    : [
                        _c(
                          "a",
                          {
                            class: { disabled: _vm.pageTop <= 0 },
                            on: { mousedown: _vm.firstPage }
                          },
                          [
                            _c(
                              "svg",
                              {
                                staticClass:
                                  "svg-inline--fa fa-step-backward fa-w-14 fa-sm",
                                attrs: {
                                  "aria-hidden": "true",
                                  focusable: "false",
                                  "data-prefix": "fas",
                                  "data-icon": "step-backward",
                                  role: "img",
                                  xmlns: "http://www.w3.org/2000/svg",
                                  viewBox: "0 0 448 512"
                                }
                              },
                              [
                                _c("path", {
                                  attrs: {
                                    fill: "currentColor",
                                    d:
                                      "M64 468V44c0-6.6 5.4-12 12-12h48c6.6 0 12 5.4 12 12v176.4l195.5-181C352.1 22.3 384 36.6 384 64v384c0 27.4-31.9 41.7-52.5 24.6L136 292.7V468c0 6.6-5.4 12-12 12H76c-6.6 0-12-5.4-12-12z"
                                  }
                                })
                              ]
                            ),
                            _vm._v("\n             \n            "),
                            _c("span", {
                              domProps: {
                                innerHTML: _vm._s(_vm.localizedLabel.first)
                              }
                            })
                          ]
                        ),
                        _vm._v("\n           | \n          "),
                        _c(
                          "a",
                          {
                            class: { disabled: _vm.pageTop <= 0 },
                            on: { mousedown: _vm.prevPage }
                          },
                          [
                            _c(
                              "svg",
                              {
                                staticClass:
                                  "svg-inline--fa fa-backward fa-w-16 fa-sm",
                                attrs: {
                                  "aria-hidden": "true",
                                  focusable: "false",
                                  "data-prefix": "fas",
                                  "data-icon": "backward",
                                  role: "img",
                                  xmlns: "http://www.w3.org/2000/svg",
                                  viewBox: "0 0 512 512"
                                }
                              },
                              [
                                _c("path", {
                                  attrs: {
                                    fill: "currentColor",
                                    d:
                                      "M11.5 280.6l192 160c20.6 17.2 52.5 2.8 52.5-24.6V96c0-27.4-31.9-41.8-52.5-24.6l-192 160c-15.3 12.8-15.3 36.4 0 49.2zm256 0l192 160c20.6 17.2 52.5 2.8 52.5-24.6V96c0-27.4-31.9-41.8-52.5-24.6l-192 160c-15.3 12.8-15.3 36.4 0 49.2z"
                                  }
                                })
                              ]
                            ),
                            _vm._v("\n             \n            "),
                            _c("span", {
                              domProps: {
                                innerHTML: _vm._s(_vm.localizedLabel.previous)
                              }
                            })
                          ]
                        ),
                        _vm._v("\n           | \n          "),
                        _c(
                          "a",
                          {
                            class: {
                              disabled:
                                _vm.pageTop + _vm.pageSize >= _vm.table.length
                            },
                            on: { mousedown: _vm.nextPage }
                          },
                          [
                            _c("span", {
                              domProps: {
                                innerHTML: _vm._s(_vm.localizedLabel.next)
                              }
                            }),
                            _vm._v("\n             \n            "),
                            _c(
                              "svg",
                              {
                                staticClass:
                                  "svg-inline--fa fa-forward fa-w-16 fa-sm",
                                attrs: {
                                  "aria-hidden": "true",
                                  focusable: "false",
                                  "data-prefix": "fas",
                                  "data-icon": "forward",
                                  role: "img",
                                  xmlns: "http://www.w3.org/2000/svg",
                                  viewBox: "0 0 512 512"
                                }
                              },
                              [
                                _c("path", {
                                  attrs: {
                                    fill: "currentColor",
                                    d:
                                      "M500.5 231.4l-192-160C287.9 54.3 256 68.6 256 96v320c0 27.4 31.9 41.8 52.5 24.6l192-160c15.3-12.8 15.3-36.4 0-49.2zm-256 0l-192-160C31.9 54.3 0 68.6 0 96v320c0 27.4 31.9 41.8 52.5 24.6l192-160c15.3-12.8 15.3-36.4 0-49.2z"
                                  }
                                })
                              ]
                            )
                          ]
                        ),
                        _vm._v("\n           | \n          "),
                        _c(
                          "a",
                          {
                            class: {
                              disabled:
                                _vm.pageTop + _vm.pageSize >= _vm.table.length
                            },
                            on: { mousedown: _vm.lastPage }
                          },
                          [
                            _c("span", {
                              domProps: {
                                innerHTML: _vm._s(_vm.localizedLabel.last)
                              }
                            }),
                            _vm._v("\n             \n            "),
                            _c(
                              "svg",
                              {
                                staticClass:
                                  "svg-inline--fa fa-step-forward fa-w-14 fa-sm",
                                attrs: {
                                  "aria-hidden": "true",
                                  focusable: "false",
                                  "data-prefix": "fas",
                                  "data-icon": "step-forward",
                                  role: "img",
                                  xmlns: "http://www.w3.org/2000/svg",
                                  viewBox: "0 0 448 512"
                                }
                              },
                              [
                                _c("path", {
                                  attrs: {
                                    fill: "currentColor",
                                    d:
                                      "M384 44v424c0 6.6-5.4 12-12 12h-48c-6.6 0-12-5.4-12-12V291.6l-195.5 181C95.9 489.7 64 475.4 64 448V64c0-27.4 31.9-41.7 52.5-24.6L312 219.3V44c0-6.6 5.4-12 12-12h48c6.6 0 12 5.4 12 12z"
                                  }
                                })
                              ]
                            )
                          ]
                        )
                      ]
                ],
                2
              ),
              _vm._v(" "),
              _c(
                "span",
                { staticStyle: { position: "absolute", right: "6px" } },
                [
                  _c(
                    "a",
                    {
                      class: {
                        disabled:
                          !_vm.showSelectedOnly && _vm.selectedCount <= 1
                      },
                      on: { mousedown: _vm.toggleSelectView }
                    },
                    [
                      _c("span", {
                        domProps: {
                          innerHTML: _vm._s(
                            _vm.localizedLabel.footerRight.selected
                          )
                        }
                      }),
                      _vm._v(" "),
                      _c(
                        "span",
                        {
                          style: {
                            color: _vm.selectedCount > 0 ? "red" : "inherit"
                          }
                        },
                        [_vm._v(_vm._s(_vm.selectedCount))]
                      )
                    ]
                  ),
                  _vm._v("\n         | \n        "),
                  _c(
                    "a",
                    {
                      class: { disabled: _vm.columnFilterString === "{}" },
                      on: { mousedown: _vm.toggleFilterView }
                    },
                    [
                      _c("span", {
                        domProps: {
                          innerHTML: _vm._s(
                            _vm.localizedLabel.footerRight.filtered
                          )
                        }
                      }),
                      _vm._v(" "),
                      _c(
                        "span",
                        {
                          style: {
                            color:
                              _vm.table.length !== _vm.value.length
                                ? "red"
                                : "inherit"
                          }
                        },
                        [_vm._v(_vm._s(_vm.table.length))]
                      )
                    ]
                  ),
                  _vm._v("\n         | \n        "),
                  _c("a", { class: { disabled: true } }, [
                    _c("span", {
                      domProps: {
                        innerHTML: _vm._s(_vm.localizedLabel.footerRight.loaded)
                      }
                    }),
                    _vm._v(" "),
                    _c("span", [_vm._v(_vm._s(_vm.value.length))])
                  ])
                ]
              )
            ]
          ),
          _vm._v(" "),
          _c("input", {
            ref: "importFile",
            staticStyle: {
              width: "0",
              height: "0",
              opacity: "0",
              "z-index": "-1"
            },
            attrs: { type: "file", accept: ".xlsx, .xls, xlsm, .csv" },
            on: { change: _vm.doImport }
          }),
          _vm._v(" "),
          _c("panel-filter", {
            ref: "panelFilter",
            attrs: {
              "m-filter-count": _vm.nFilterCount,
              "localized-label": _vm.localizedLabel
            }
          }),
          _vm._v(" "),
          _c("panel-setting", {
            ref: "panelSetting",
            attrs: { "localized-label": _vm.localizedLabel },
            model: {
              value: _vm.fields,
              callback: function($$v) {
                _vm.fields = $$v;
              },
              expression: "fields"
            }
          }),
          _vm._v(" "),
          _c("panel-find", {
            ref: "panelFind",
            attrs: { "localized-label": _vm.localizedLabel }
          })
        ],
        1
      )
    ]
  )
};
var __vue_staticRenderFns__$b = [];
__vue_render__$b._withStripped = true;

  /* style */
  const __vue_inject_styles__$b = function (inject) {
    if (!inject) return
    inject("data-v-6256b554_0", { source: "\ninput[data-v-6256b554]:focus, input[data-v-6256b554]:active:focus, input.active[data-v-6256b554]:focus {\n  outline: none;\n  box-shadow: inset 0 -1px 0 #ddd;\n}\n*[data-v-6256b554], *[data-v-6256b554]::before, *[data-v-6256b554]::after {\n  box-sizing: border-box;\n}\n.input-square[data-v-6256b554] {\n  position: absolute;\n  padding: 0;\n  z-index: 4;\n  border: 2px solid rgb(108, 143, 108);\n  /* transition: all 0.04s linear; */\n}\n.no-transition[data-v-6256b554] {\n  transition: none !important;\n}\n.autocomplete-results[data-v-6256b554] {\n  z-index: 15;\n  position: fixed;\n  padding: 3px;\n  margin: -1px;\n  background-color: lightyellow;\n  border: 1px solid rgb(108, 143, 108);\n  height: fit-content;\n  font-size: 0.88rem;\n  max-width: 300px;\n}\n.autocomplete-result[data-v-6256b554] {\n  list-style: none;\n  text-align: left;\n  padding: 4px 2px;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  cursor: pointer\n}\n.autocomplete-result.select[data-v-6256b554] {\n  background-color: lightsteelblue;\n}\n.rb-square[data-v-6256b554] {\n  width: 9px;\n  height: 9px;\n  border-top: 2px solid white;\n  border-left: 2px solid white;\n  border-bottom: 0;\n  border-right: 0;\n  background-color:rgb(108, 143, 108);\n  position: absolute;\n  bottom: -3px;\n  right: -2px;\n  cursor: crosshair;\n}\n.input-box[data-v-6256b554] {\n  opacity: 0;\n  font-family: inherit;\n  color: inherit;\n  text-shadow: inherit;\n  font-size: 0.88rem;\n  width: 100%;\n  height: 100%;\n  border: 0;\n  resize: none;\n  white-space: nowrap;\n  overflow: hidden;\n  background: white;\n}\n.component-content[data-v-6256b554] {\n  display: flex;\n  flex-flow: column;\n  position: relative;\n  max-width:fit-content;\n  word-spacing: 0.02rem;\n  line-height: 1.1;\n  overflow: hidden;\n  border: 1px solid lightgray;\n}\n.center-text[data-v-6256b554] {\n  text-align: center;\n}\n.table-content[data-v-6256b554] {\n  flex: 1 1 auto;\n  font-size: 1rem;\n  text-shadow: 0.3px 0.3px 1px #ccc;\n  overflow: scroll;\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -khtml-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  position: relative;\n  width: 100%;\n  scrollbar-width: none;\n}\n.table-content[data-v-6256b554] :focus {\n  outline: none;\n}\n.table-content[data-v-6256b554]::-webkit-scrollbar {\n  background: white;\n  width: 0;\n  height: 0;\n}\n.table-content.no-footer[data-v-6256b554] {\n  border-bottom: 0;\n}\n.table-content.no-footer[data-v-6256b554]::-webkit-scrollbar {\n  height: 0;\n}\n.table-content[data-v-6256b554]::-webkit-scrollbar-thumb {\n  background: #eeee;\n}\n.table-content[data-v-6256b554]::-webkit-scrollbar-thumb:hover {\n  background: #9999;\n}\n.systable[data-v-6256b554] {\n  z-index: -1;\n  width: fit-content;\n  border: 0;\n  border-collapse: separate;\n  border-spacing: 0;\n  margin-bottom: 0;\n  /* margin-left: 40px; */\n}\n.systable .last-col[data-v-6256b554] {\n  width: 12px;\n}\n.systable.no-number[data-v-6256b554] {\n  margin-left: 0 !important;\n}\n.systable tbody tr[data-v-6256b554] {\n  background-color: white;\n  text-align: left;\n}\n.systable tr.select td[data-v-6256b554] {\n  background-color: darkgrey !important;\n}\n.systable th[data-v-6256b554], .systable td[data-v-6256b554] {\n  vertical-align: bottom;\n  padding: 0.2rem 0.3rem;\n  font-size: 0.88rem;\n  height: 24px;\n  border-top: 0;\n  border-left: 0;\n}\n.systable th[data-v-6256b554]:not(:last-child) {\n  border-right: 1px solid lightgray;\n}\n.systable tbody td[data-v-6256b554] {\n  cursor: cell;\n  white-space: nowrap;\n  overflow-x: hidden;\n  text-overflow: ellipsis;\n  /* animation: fadein 0.2s; */\n}\n.systable tbody td.error[data-v-6256b554] {\n  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAAXNSR0IArs4c6QAAAAlwSFlzAAAXEgAAFxIBZ5/SUgAAAGZJREFUOBGlzjsOgDAMA9CwcQSO0PtP3K64Qyugv8S2ZMXTUw5DstmFk8qWAuhEbzSzbQ+oWIPKULAPpGAdxGJDiMGmUBRbQhFsC3kxF+TB3NAOC0ErLAzNMAoaYTT0xyTojclQxR5H5B1HhuS+WAAAAABJRU5ErkJggg==');\n  background-repeat: no-repeat;\n  background-size: 8px 8px;\n  background-position: right 0px top 0px;\n}\n.systable tbody tr:not(:last-child) td[data-v-6256b554] {\n  border-bottom: 1px solid lightgray;\n}\n.systable td[data-v-6256b554]:not(:last-child) {\n  border-right: 1px solid lightgray;\n}\n.systable thead th[data-v-6256b554], .systable thead td[data-v-6256b554] {\n  padding: 0.4rem 0.3rem;\n  font-weight: 400;\n  top: 0;\n  height: 29px;\n  position: sticky;\n  z-index: 5;\n  border-bottom: 1px solid lightgray;\n}\n.systable thead th[data-v-6256b554] {\n  background-color: #e9ecef !important;\n  cursor: s-resize;\n  z-index: 6;\n}\n.systable thead td.column-filter[data-v-6256b554] {\n  text-align: left;\n  background-color: #fffff2;\n  white-space: nowrap;\n  overflow-x: hidden;\n  text-overflow: ellipsis;\n}\n.systable th.focus[data-v-6256b554] {\n  border-bottom: 1px solid rgb(61, 85, 61) !important;\n}\n.systable td.first-col.focus[data-v-6256b554] {\n  border-right: 1px solid rgb(61, 85, 61) !important;\n}\n.systable tbody td.select[data-v-6256b554]:not(.readonly) {\n  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAMAAABhEH5lAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAASUExURQAAANra2tfX19ra2tnZ2dnZ2c8lDs8AAAAFdFJOUwAwQL/PKlwehgAAAAlwSFlzAAAXEQAAFxEByibzPwAAAEdJREFUKFNdyskBACAIA8F49d+yiBEh+9rHYC5poPGiDmUDUGZI2EHCHBV2UWFEiT2UWKBgHwVLiCwjsoKcVeRMkDFFxoiADdH4AyvGhvOPAAAAAElFTkSuQmCC');\n  background-repeat: no-repeat;\n  background-size: 8px 8px;\n  background-position: right 5px top 8px;\n}\n.systable tbody td.datepick[data-v-6256b554]:not(.readonly) {\n  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAMAAABhEH5lAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAASUExURQAAANra2tfX19ra2tnZ2dnZ2c8lDs8AAAAFdFJOUwAwQL/PKlwehgAAAAlwSFlzAAAXEQAAFxEByibzPwAAAEdJREFUKFNdyskBACAIA8F49d+yiBEh+9rHYC5poPGiDmUDUGZI2EHCHBV2UWFEiT2UWKBgHwVLiCwjsoKcVeRMkDFFxoiADdH4AyvGhvOPAAAAAElFTkSuQmCC');\n  background-repeat: no-repeat;\n  background-size: 8px 8px;\n  background-position: right 5px top 8px;\n}\n.systable .first-col[data-v-6256b554] {\n  background:#e9ecef;\n  width: 40px;\n  position: sticky;\n  left: 0;\n  top: auto;\n  cursor: e-resize !important;\n  text-overflow: inherit !important;\n  text-align: center;\n  overflow: hidden;\n  z-index: 5;\n}\n.systable .sticky-column[data-v-6256b554] {\n  position: sticky;\n  z-index: 2;\n  background-color: white;\n}\n.systable thead th.sticky-column[data-v-6256b554] {\n  z-index: 7;\n}\n.systable thead td.sticky-column[data-v-6256b554] {\n  z-index: 6;\n}\n.systable thead .tl-setting[data-v-6256b554] {\n  /*\n  display: flex;\n  flex-direction: column-reverse;\n  height: 100%;\n  */\n}\n.systable thead td.first-col[data-v-6256b554], .systable thead th.first-col[data-v-6256b554] {\n  cursor: pointer !important;\n  z-index: 10;\n}\n.systable tfoot .row-summary[data-v-6256b554] {\n  height: 25px;\n  border-right: 0;\n  border-top: 1px solid lightgray;\n  position: sticky;\n  bottom: 0;\n  z-index: 4;\n  background: #fffff2;\n}\n.systable tfoot .row-summary.sticky-column[data-v-6256b554] {\n  z-index: 5;\n}\n.systable tfoot .row-summary.summary-column1[data-v-6256b554] {\n  border-right: 1px solid lightgray;\n}\n.systable tfoot .row-summary.summary-column2[data-v-6256b554] {\n  border-right: 1px solid lightgray;\n  background: white;\n}\n.systable tfoot .row-summary[data-v-6256b554]:last-child {\n  border-right: 0 !important;\n}\n.systable tfoot .row-summary.first-col[data-v-6256b554] {\n  height: 25px;\n  border-top: 1px solid lightgray;\n  border-right: 1px solid lightgray;\n  background: #e9ecef;\n  position: sticky;\n  left: 0;\n  top: auto;\n  z-index: 6;\n}\n.footer[data-v-6256b554] {\n  z-index: 5;\n  padding: 0;\n  font-size: 12px;\n  color: dimgray;\n  background-color: white;\n  width: 100%;\n  height: 25px;\n  line-height: 2.3;\n  border-top: 1px solid lightgray;\n  user-select: none;\n}\n.footer .left-block[data-v-6256b554] {\n  position: absolute;\n  left: 0;\n  height: 25px;\n  width: 40px;\n  background-color: #e9ecef;\n  border-right: 1px solid lightgray;\n}\n.scroll-bar[data-v-6256b554] {\n  z-index: -1;\n  position: absolute;\n  background-color: #f4f6f9;\n  height: 25px;\n  margin-left: 40px;\n  width: 65%;\n  cursor: pointer;\n}\n.scroll-bar[data-v-6256b554]:hover, .scroll-bar.focus[data-v-6256b554], .footer:hover .scroll-bar[data-v-6256b554] {\n  background-color: lightgray;\n}\n.footer a[data-v-6256b554] {\n  cursor: pointer;\n  color: #007bff;\n}\n.footer a.disabled[data-v-6256b554] {\n  cursor: not-allowed;\n  color: gray;\n  pointer-events: none;\n}\n.footer a[data-v-6256b554]:hover {\n  text-decoration: underline;\n}\n.v-scroll[data-v-6256b554] {\n  display: inline-block;\n  position: absolute;\n  right: 0;\n  width: 13px;\n  z-index: 5;\n  background-color: white;\n  border-left: 1px solid lightgray;\n  user-select: none;\n}\n.v-scroll-button[data-v-6256b554] {\n  display: inline-block;\n  width: 100%;\n  z-index: 10;\n  background-color: #f4f6f9;\n  cursor: pointer;\n}\n.v-scroll-button.focus[data-v-6256b554], .v-scroll-button[data-v-6256b554]:hover, .v-scroll:hover .v-scroll-button[data-v-6256b554] {\n  background-color: lightgray;\n}\n.front-drop[data-v-6256b554] {\n  position: fixed;\n  opacity: 0.4;\n  display:flex;\n  justify-content:center;\n  align-items:center;\n  background-color: #55555555;\n  color: white;\n  z-index: 1000;\n}\na[data-v-6256b554]:disabled {\n  cursor: not-allowed;\n  color: gray;\n  pointer-events: none;\n}\n.col-sep[data-v-6256b554] {\n  position: absolute;\n  top: 0;\n  right: 0;\n  width: 5px;\n  cursor: col-resize;\n  height: 100%;\n  z-index: 15;\n}\n.sort-asc-sign[data-v-6256b554] {\n  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAMAAADzN3VRAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAeUExURQAAAK+np6+qqq+rq62pqa+rq6+rq6+srK+rq6+rq2v5ERwAAAAJdFJOUwAgYHCAv8/f71KXockAAAAJcEhZcwAAFxEAABcRAcom8z8AAABNSURBVChT7clRAoAgCATRtTLq/hcuBEN0j9B8zoNV76j6s37hsh+a+NWknQ3l8pGTAk4KlAwIdVgoYKIREmUYaIaPVnBi0IjDS2cA8AC8JAq/VhDqzAAAAABJRU5ErkJggg==');\n  background-repeat: no-repeat;\n  background-size: 9px 9px;\n  background-position: right 5px top 5px;\n}\n.sort-des-sign[data-v-6256b554] {\n  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAYCAMAAAA4a6b0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAkUExURQAAAK+np6+qqq+rq6+pqa+qqq+rq6+rq6+rq6+srK+rq6+rqzDc2iQAAAALdFJOUwAgMEBQYHC/z9/v4u0IugAAAAlwSFlzAAAXEQAAFxEByibzPwAAAFVJREFUKFPtyVEWgCAIRFHC1HL2v98o53SEWELvC+bK0nYor5CeGCkZICUdBhkRjAoX9oLlqCzgyAOwc5caAKgT2gdIGQDNgGfM6Knzv+vcZr8kInIBUrIMxVKQeVsAAAAASUVORK5CYII=');\n  background-repeat: no-repeat;\n  background-size: 9px 9px;\n  background-position: right 5px top 5px;\n}\n.filter-sign[data-v-6256b554] {\n  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAlCAMAAABiU6n+AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAhUExURQAAAK+vr6+np6+qqq+pqa+qqq2pqa+srK+srK+rq6+rq01/tHwAAAAKdFJOUwAQIDBQYICv3+8SoWj4AAAACXBIWXMAABcRAAAXEQHKJvM/AAAAiUlEQVQ4T+3OOxaAMAhEUfwmsv8FazLjMRBiZ+er4ExzJelLSSZeUccisvMO2uUq8+nKU5lXfl1bWWWkS1gHuuJCoa66UKCDCwU6ulCnu13I6x4XcrrGhYyudSGjMy7U6KwLPTrvQhwDV42jaueqcVTl7+L4zzaO386Zv+teZ/6u9xXzcK2zXUVOdLIT4IImCksAAAAASUVORK5CYII=');\n  background-repeat: no-repeat;\n  background-size: 9px 9px;\n  background-position: right 0px bottom 0px;\n}\n.hide[data-v-6256b554] {\n  display: none !important;\n}\n@keyframes fadein-data-v-6256b554 {\nfrom {opacity: 0}\nto {opacity: 1}\n}\n.fa-spin[data-v-6256b554] {\n  -webkit-animation: fa-spin 2s infinite linear;\n  animation: fa-spin 2s infinite linear;\n}\n.svg-inline--fa.fa-w-14[data-v-6256b554] {\n  width: 0.875em;\n}\n.svg-inline--fa.fa-w-16[data-v-6256b554] {\n  width: 1em;\n}\n.svg-inline--fa.fa-fw[data-v-6256b554] {\n  width: 1.25em;\n}\n.svg-inline--fa[data-v-6256b554] {\n  display: inline-block;\n  font-size: inherit;\n  height: 1em;\n  overflow: visible;\n  vertical-align: -0.125em;\n}\n.fa-fw[data-v-6256b554] {\n  text-align: center;\n  width: 1.25em;\n}\n.fa-xs[data-v-6256b554] {\n  font-size: 0.75em;\n}\n.fa-sm[data-v-6256b554] {\n  font-size: 0.875em;\n}\n.fa-3x[data-v-6256b554] {\n  font-size: 3em;\n}\n.tool-tip[data-v-6256b554] {\n  display: inline-block;\n  position: fixed;\n  color: white;\n  background-color: red;\n  padding: 0.5rem;\n  min-height: 1rem;\n  max-width: 200px;\n  word-wrap: break-word;\n  border-radius: 4px;\n  z-index: 50;\n}\n.tool-tip[data-v-6256b554]:before {\n  content: '';\n  display: block;\n  width: 0;\n  height: 0;\n  position: absolute;\n  border-top: 8px solid transparent;\n  border-bottom: 8px solid transparent;\n  border-right: 8px solid red;\n  left: -8px;\n  top: 8px;\n}\n", map: {"version":3,"sources":["/Users/can/vuejs/hello-world/plugins/VueExcelEditor/src/VueExcelEditor.vue"],"names":[],"mappings":";AA+zDA;EACA,aAAA;EACA,+BAAA;AACA;AACA;EACA,sBAAA;AACA;AACA;EACA,kBAAA;EACA,UAAA;EACA,UAAA;EACA,oCAAA;EACA,kCAAA;AACA;AACA;EACA,2BAAA;AACA;AACA;EACA,WAAA;EACA,eAAA;EACA,YAAA;EACA,YAAA;EACA,6BAAA;EACA,oCAAA;EACA,mBAAA;EACA,kBAAA;EACA,gBAAA;AACA;AACA;EACA,gBAAA;EACA,gBAAA;EACA,gBAAA;EACA,mBAAA;EACA,gBAAA;EACA,uBAAA;EACA;AACA;AACA;EACA,gCAAA;AACA;AACA;EACA,UAAA;EACA,WAAA;EACA,2BAAA;EACA,4BAAA;EACA,gBAAA;EACA,eAAA;EACA,mCAAA;EACA,kBAAA;EACA,YAAA;EACA,WAAA;EACA,iBAAA;AACA;AACA;EACA,UAAA;EACA,oBAAA;EACA,cAAA;EACA,oBAAA;EACA,kBAAA;EACA,WAAA;EACA,YAAA;EACA,SAAA;EACA,YAAA;EACA,mBAAA;EACA,gBAAA;EACA,iBAAA;AACA;AACA;EACA,aAAA;EACA,iBAAA;EACA,kBAAA;EACA,qBAAA;EACA,qBAAA;EACA,gBAAA;EACA,gBAAA;EACA,2BAAA;AACA;AACA;EACA,kBAAA;AACA;AACA;EACA,cAAA;EACA,eAAA;EACA,iCAAA;EACA,gBAAA;EACA,2BAAA;EACA,yBAAA;EACA,wBAAA;EACA,sBAAA;EACA,qBAAA;EACA,iBAAA;EACA,kBAAA;EACA,WAAA;EACA,qBAAA;AACA;AACA;EACA,aAAA;AACA;AACA;EACA,iBAAA;EACA,QAAA;EACA,SAAA;AACA;AACA;EACA,gBAAA;AACA;AACA;EACA,SAAA;AACA;AACA;EACA,iBAAA;AACA;AACA;EACA,iBAAA;AACA;AACA;EACA,WAAA;EACA,kBAAA;EACA,SAAA;EACA,yBAAA;EACA,iBAAA;EACA,gBAAA;EACA,uBAAA;AACA;AACA;EACA,WAAA;AACA;AACA;EACA,yBAAA;AACA;AACA;EACA,uBAAA;EACA,gBAAA;AACA;AACA;EACA,qCAAA;AACA;AACA;EACA,sBAAA;EACA,sBAAA;EACA,kBAAA;EACA,YAAA;EACA,aAAA;EACA,cAAA;AACA;AACA;EACA,iCAAA;AACA;AACA;EACA,YAAA;EACA,mBAAA;EACA,kBAAA;EACA,uBAAA;EACA,4BAAA;AACA;AACA;EACA,mTAAA;EACA,4BAAA;EACA,wBAAA;EACA,sCAAA;AACA;AACA;EACA,kCAAA;AACA;AACA;EACA,iCAAA;AACA;AACA;EACA,sBAAA;EACA,gBAAA;EACA,MAAA;EACA,YAAA;EACA,gBAAA;EACA,UAAA;EACA,kCAAA;AACA;AACA;EACA,oCAAA;EACA,gBAAA;EACA,UAAA;AACA;AACA;EACA,gBAAA;EACA,yBAAA;EACA,mBAAA;EACA,kBAAA;EACA,uBAAA;AACA;AACA;EACA,mDAAA;AACA;AACA;EACA,kDAAA;AACA;AACA;EACA,2VAAA;EACA,4BAAA;EACA,wBAAA;EACA,sCAAA;AACA;AACA;EACA,2VAAA;EACA,4BAAA;EACA,wBAAA;EACA,sCAAA;AACA;AACA;EACA,kBAAA;EACA,WAAA;EACA,gBAAA;EACA,OAAA;EACA,SAAA;EACA,2BAAA;EACA,iCAAA;EACA,kBAAA;EACA,gBAAA;EACA,UAAA;AACA;AACA;EACA,gBAAA;EACA,UAAA;EACA,uBAAA;AACA;AACA;EACA,UAAA;AACA;AACA;EACA,UAAA;AACA;AACA;EACA;;;;GAIA;AACA;AACA;EACA,0BAAA;EACA,WAAA;AACA;AACA;EACA,YAAA;EACA,eAAA;EACA,+BAAA;EACA,gBAAA;EACA,SAAA;EACA,UAAA;EACA,mBAAA;AACA;AACA;EACA,UAAA;AACA;AACA;EACA,iCAAA;AACA;AACA;EACA,iCAAA;EACA,iBAAA;AACA;AACA;EACA,0BAAA;AACA;AACA;EACA,YAAA;EACA,+BAAA;EACA,iCAAA;EACA,mBAAA;EACA,gBAAA;EACA,OAAA;EACA,SAAA;EACA,UAAA;AACA;AACA;EACA,UAAA;EACA,UAAA;EACA,eAAA;EACA,cAAA;EACA,uBAAA;EACA,WAAA;EACA,YAAA;EACA,gBAAA;EACA,+BAAA;EACA,iBAAA;AACA;AACA;EACA,kBAAA;EACA,OAAA;EACA,YAAA;EACA,WAAA;EACA,yBAAA;EACA,iCAAA;AACA;AACA;EACA,WAAA;EACA,kBAAA;EACA,yBAAA;EACA,YAAA;EACA,iBAAA;EACA,UAAA;EACA,eAAA;AACA;AACA;EACA,2BAAA;AACA;AAEA;EACA,eAAA;EACA,cAAA;AACA;AACA;EACA,mBAAA;EACA,WAAA;EACA,oBAAA;AACA;AACA;EACA,0BAAA;AACA;AACA;EACA,qBAAA;EACA,kBAAA;EACA,QAAA;EACA,WAAA;EACA,UAAA;EACA,uBAAA;EACA,gCAAA;EACA,iBAAA;AACA;AACA;EACA,qBAAA;EACA,WAAA;EACA,WAAA;EACA,yBAAA;EACA,eAAA;AACA;AACA;EACA,2BAAA;AACA;AAEA;EACA,eAAA;EACA,YAAA;EACA,YAAA;EACA,sBAAA;EACA,kBAAA;EACA,2BAAA;EACA,YAAA;EACA,aAAA;AACA;AACA;EACA,mBAAA;EACA,WAAA;EACA,oBAAA;AACA;AACA;EACA,kBAAA;EACA,MAAA;EACA,QAAA;EACA,UAAA;EACA,kBAAA;EACA,YAAA;EACA,WAAA;AACA;AACA;EACA,2XAAA;EACA,4BAAA;EACA,wBAAA;EACA,sCAAA;AACA;AACA;EACA,+YAAA;EACA,4BAAA;EACA,wBAAA;EACA,sCAAA;AACA;AACA;EACA,+cAAA;EACA,4BAAA;EACA,wBAAA;EACA,yCAAA;AACA;AACA;EACA,wBAAA;AACA;AACA;AACA,MAAA,UAAA;AACA,IAAA,UAAA;AACA;AAEA;EACA,6CAAA;EACA,qCAAA;AACA;AACA;EACA,cAAA;AACA;AACA;EACA,UAAA;AACA;AACA;EACA,aAAA;AACA;AACA;EACA,qBAAA;EACA,kBAAA;EACA,WAAA;EACA,iBAAA;EACA,wBAAA;AACA;AACA;EACA,kBAAA;EACA,aAAA;AACA;AACA;EACA,iBAAA;AACA;AACA;EACA,kBAAA;AACA;AACA;EACA,cAAA;AACA;AACA;EACA,qBAAA;EACA,eAAA;EACA,YAAA;EACA,qBAAA;EACA,eAAA;EACA,gBAAA;EACA,gBAAA;EACA,qBAAA;EACA,kBAAA;EACA,WAAA;AACA;AACA;EACA,WAAA;EACA,cAAA;EACA,QAAA;EACA,SAAA;EACA,kBAAA;EACA,iCAAA;EACA,oCAAA;EACA,2BAAA;EACA,UAAA;EACA,QAAA;AACA","file":"VueExcelEditor.vue","sourcesContent":["<template>\n  <div class=\"vue-excel-editor\" :style=\"{display: 'inline-block', 'max-width': width}\">\n    <div class=\"component-content\">\n      <div ref=\"tableContent\"\n           class=\"table-content\"\n           :class=\"{'no-footer': noFooter}\"\n           @scroll=\"tableScroll\"\n           @mouseover=\"mouseOver\"\n           @mouseout=\"mouseOut\">\n\n        <!-- Main Table -->\n        <table ref=\"systable\"\n              id=\"systable\"\n              style=\"table-layout: fixed; width: 0\"\n              class=\"systable\"\n              :class=\"{'no-number': noNumCol}\"\n              ondragenter=\"event.preventDefault(); event.dataTransfer.dropEffect = 'none'\"\n              ondragover=\"event.preventDefault(); event.dataTransfer.dropEffect = 'none'\">\n          <colgroup>\n            <col style=\"width:40px\">\n            <col v-for=\"(item, p) in fields\" :key=\"p\" :style=\"{width: item.width}\">\n            <col style=\"width:12px\">\n          </colgroup>\n          <thead class=\"center-text\">\n            <tr>\n              <th class=\"center-text first-col tl-setting\"\n                  :class=\"{hide: noNumCol}\"\n                  style=\"top: 0\"\n                  @mousedown.left=\"settingClick\">\n                <span style=\"width:100%\">\n                  <svg v-if=\"processing\" aria-hidden=\"true\" focusable=\"false\" data-prefix=\"fas\" data-icon=\"spinner\" role=\"img\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\" class=\"svg-inline--fa fa-spinner fa-w-16 fa-spin fa-sm\"><path fill=\"currentColor\" d=\"M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z\"></path></svg>\n                  <svg v-else aria-hidden=\"true\" focusable=\"false\" data-prefix=\"fas\" data-icon=\"bars\" role=\"img\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 448 512\" class=\"svg-inline--fa fa-bars fa-w-14 fa-sm\"><path fill=\"currentColor\" d=\"M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z\"></path></svg>\n                </span>\n              </th>\n              <th v-for=\"(item, p) in fields\"\n                  v-show=\"!item.invisible\"\n                  :key=\"`th-${p}`\"\n                  :colspan=\"p === fields.length - 1? 2: 1\"\n                  :class=\"{'sort-asc-sign': sortPos==p && sortDir==1,\n                          'sort-des-sign': sortPos==p && sortDir==-1,\n                          'sticky-column': item.sticky}\"\n                  class=\"table-col-header\"\n                  :style=\"{left: item.left}\"\n                  @mousedown=\"headerClick($event, p)\">\n                <div :class=\"{'filter-sign': columnFilter[p]}\">\n                  <span v-html=\"headerLabel(item.label, item)\"></span>\n                </div>\n                <div class=\"col-sep\"\n                    @mousedown=\"colSepMouseDown\"\n                    @mouseover=\"colSepMouseOver\"\n                    @mouseout=\"colSepMouseOut\" />\n              </th>\n            </tr>\n            <tr :class=\"{hide: !filterRow}\">\n              <td class=\"center-text first-col tl-filter\"\n                  :class=\"{hide: noNumCol}\"\n                  :style=\"{top: calCellTop2 + 'px'}\"\n                  @click=\"selectAllClick\">\n                <svg v-if=\"selectedCount==table.length\" aria-hidden=\"true\" focusable=\"false\" data-prefix=\"fas\" data-icon=\"times-circle\" role=\"img\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\" class=\"svg-inline--fa fa-times-circle fa-w-16 fa-sm\"><path fill=\"currentColor\" d=\"M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z\"></path></svg>\n                <svg v-else aria-hidden=\"true\" focusable=\"false\" data-prefix=\"fas\" data-icon=\"check-circle\" role=\"img\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\" class=\"svg-inline--fa fa-check-circle fa-w-16 fa-sm\"><path fill=\"currentColor\" d=\"M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z\"></path></svg>\n              </td>\n              <vue-excel-filter v-for=\"(item, p) in fields\"\n                                v-show=\"!item.invisible\"\n                                :colspan=\"p === fields.length - 1? 2: 1\"\n                                :key=\"`th2-${p}`\"\n                                v-model=\"columnFilter[p]\"\n                                :class=\"{'sticky-column': item.sticky}\"\n                                :style=\"{left: item.left}\"\n                                class=\"column-filter\" />\n            </tr>\n          </thead>\n          <tbody @mousedown.exact=\"mouseDown\">\n            <tr v-for=\"(record, rowPos) in pagingTable\"\n                :key=\"rowPos\"\n                :class=\"{select: typeof selected[pageTop + rowPos] !== 'undefined'}\"\n                :style=\"rowStyle(record)\">\n              <td class=\"center-text first-col\"\n                  :class=\"{hide: noNumCol}\"\n                  :pos=\"rowPos\"\n                  @click=\"rowLabelClick\">\n                <span v-html=\"recordLabel(pageTop + rowPos + 1, record)\"></span>\n              </td>\n              <template v-for=\"(item, p) in fields\">\n                <td v-show=\"!item.invisible\"\n                    :id=\"`id-${record.$id}-${item.name}`\"\n                    :class=\"{\n                      readonly: item.readonly,\n                      error: errmsg[`id-${record.$id}-${item.name}`],\n                      select: item.options.length,\n                      datepick: item.type == 'date',\n                      'sticky-column': item.sticky\n                    }\"\n                    :style=\"Object.assign(cellStyle(record, item), columnCellStyle(item))\"\n                    :key=\"p\"\n                    @mouseover=\"cellMouseOver\"\n                    @mousemove=\"cellMouseMove\">{{ item.toText(record[item.name]) }}</td>\n              </template>\n              <td class=\"last-col\"></td>\n            </tr>\n          </tbody>\n          <tfoot>\n            <tr v-show=\"summaryRow\">\n              <td class=\"row-summary first-col\">&nbsp;</td>\n              <template v-for=\"(field, p) in fields\">\n                <td v-show=\"!field.invisible\"\n                    class=\"row-summary\"\n                    :colspan=\"p === fields.length - 1? 2: 1\"\n                    :class=\"{\n                      'sticky-column': field.sticky,\n                      'summary-column1': p+1 < fields.length && fields[p+1].summary,\n                      'summary-column2': field.summary\n                    }\"\n                    :style=\"columnCellStyle(field)\"\n                    :key=\"`f${p}`\">{{ summary(field) }}</td>\n              </template>\n            </tr>\n          </tfoot>\n          <slot></slot>\n        </table>\n\n        <!-- Tool Tip -->\n        <div v-show=\"tip\" ref=\"tooltip\" class=\"tool-tip\">{{ tip }}</div>\n\n        <!-- Editor Square -->\n        <div v-show=\"focused\" ref=\"inputSquare\" class=\"input-square\" @mousedown=\"inputSquareClick\">\n          <div style=\"position: relative; height: 100%; padding: 2px 2px 1px\">\n            <div class=\"rb-square\" />\n            <textarea ref=\"inputBox\"\n                      id=\"inputBox\"\n                      class=\"input-box\"\n                      :style=\"{opacity: inputBoxShow}\"\n                      @blur=\"inputBoxBlur\"\n                      @mousemove=\"inputBoxMouseMove\"\n                      @mousedown=\"inputBoxMouseDown\"\n                      trim\n                      autocomplete=\"off\"\n                      autocorrect=\"off\"\n                      autocompitaize=\"off\"\n                      spellcheck=\"false\"></textarea>\n          </div>\n        </div>\n\n        <!-- Date Picker -->\n        <div ref=\"dpContainer\" v-show=\"showDatePicker\" style=\"z-index:20; position:fixed\">\n          <date-picker ref=\"datepicker\" inline v-model=\"inputDateTime\" @input=\"dpClick\" valueType=\"format\"></date-picker>\n        </div>\n\n        <!-- Waiting scene -->\n        <div v-show=\"processing\" ref=\"frontdrop\" class=\"front-drop\">\n          <svg aria-hidden=\"true\" focusable=\"false\" data-prefix=\"fas\" data-icon=\"spinner\" role=\"img\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\" class=\"svg-inline--fa fa-spinner fa-w-16 fa-spin fa-3x\"><path fill=\"currentColor\" d=\"M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z\"></path></svg>\n        </div>\n      </div>\n\n      <!-- Vertical Scroll Bar -->\n      <div ref=\"vScroll\"\n           class=\"v-scroll\"\n           :style=\"{top: `${vScroller.top}px`, height: `${vScroller.height}px`}\"\n           @mousedown=\"vsMouseDown\">\n        <div ref=\"vScrollButton\"\n             class=\"v-scroll-button\"\n             :style=\"{marginTop: `${vScroller.buttonTop}px`, height: `${vScroller.buttonHeight}px`}\"\n             @mousedown=\"vsbMouseDown\" />\n      </div>\n\n      <!-- Autocomplete List -->\n      <ul ref=\"autocomplete\" v-show=\"focused && autocompleteInputs.length\" class=\"autocomplete-results\">\n        <li v-for=\"(item,i) in autocompleteInputs\"\n            :key=\"i\"\n            :class=\"{select: autocompleteSelect === i}\"\n            @mousedown.left.prevent=\"inputAutocompleteText($event.target.textContent, $event)\"\n            class=\"autocomplete-result\">{{ item }}</li>\n      </ul>\n\n      <!-- Footer -->\n      <div ref=\"footer\" class=\"footer center-text\" :class=\"{hide: noFooter}\" style=\"position:relative\" @mousedown=\"ftMouseDown\">\n        <div ref=\"scrollbar\" class=\"scroll-bar\" @mousedown=\"sbMouseDown\" />\n        <span class=\"left-block\"></span>\n        <span v-show=\"!noPaging\" style=\"position: absolute; left: 46px\">\n          <span v-html=\"localizedLabel.footerLeft(pageTop + 1, pageBottom, table.length)\"></span>\n        </span>\n        <span v-show=\"!noPaging && pageBottom - pageTop < table.length\">\n          <template v-if=\"processing\">\n            <svg aria-hidden=\"true\" focusable=\"false\" data-prefix=\"fas\" data-icon=\"spinner\" role=\"img\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\" class=\"svg-inline--fa fa-spinner fa-w-16 fa-spin fa-sm\"><path fill=\"currentColor\" d=\"M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z\"></path></svg>\n            &nbsp;\n            <span v-html=\"localizedLabel.processing\" />\n          </template>\n          <template v-else>\n            <a :class=\"{disabled: pageTop <= 0}\" @mousedown=\"firstPage\">\n              <svg aria-hidden=\"true\" focusable=\"false\" data-prefix=\"fas\" data-icon=\"step-backward\" role=\"img\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 448 512\" class=\"svg-inline--fa fa-step-backward fa-w-14 fa-sm\"><path fill=\"currentColor\" d=\"M64 468V44c0-6.6 5.4-12 12-12h48c6.6 0 12 5.4 12 12v176.4l195.5-181C352.1 22.3 384 36.6 384 64v384c0 27.4-31.9 41.7-52.5 24.6L136 292.7V468c0 6.6-5.4 12-12 12H76c-6.6 0-12-5.4-12-12z\"></path></svg>\n              &nbsp;\n              <span v-html=\"localizedLabel.first\" />\n            </a>\n            &nbsp;|&nbsp;\n            <a :class=\"{disabled: pageTop <= 0}\" @mousedown=\"prevPage\">\n              <svg aria-hidden=\"true\" focusable=\"false\" data-prefix=\"fas\" data-icon=\"backward\" role=\"img\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\" class=\"svg-inline--fa fa-backward fa-w-16 fa-sm\"><path fill=\"currentColor\" d=\"M11.5 280.6l192 160c20.6 17.2 52.5 2.8 52.5-24.6V96c0-27.4-31.9-41.8-52.5-24.6l-192 160c-15.3 12.8-15.3 36.4 0 49.2zm256 0l192 160c20.6 17.2 52.5 2.8 52.5-24.6V96c0-27.4-31.9-41.8-52.5-24.6l-192 160c-15.3 12.8-15.3 36.4 0 49.2z\"></path></svg>\n              &nbsp;\n              <span v-html=\"localizedLabel.previous\" />\n            </a>\n            &nbsp;|&nbsp;\n            <a :class=\"{disabled: pageTop + pageSize >= table.length}\" @mousedown=\"nextPage\">\n              <span v-html=\"localizedLabel.next\" />\n              &nbsp;\n              <svg aria-hidden=\"true\" focusable=\"false\" data-prefix=\"fas\" data-icon=\"forward\" role=\"img\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\" class=\"svg-inline--fa fa-forward fa-w-16 fa-sm\"><path fill=\"currentColor\" d=\"M500.5 231.4l-192-160C287.9 54.3 256 68.6 256 96v320c0 27.4 31.9 41.8 52.5 24.6l192-160c15.3-12.8 15.3-36.4 0-49.2zm-256 0l-192-160C31.9 54.3 0 68.6 0 96v320c0 27.4 31.9 41.8 52.5 24.6l192-160c15.3-12.8 15.3-36.4 0-49.2z\"></path></svg>\n            </a>\n            &nbsp;|&nbsp;\n            <a :class=\"{disabled: pageTop + pageSize >= table.length}\" @mousedown=\"lastPage\">\n              <span v-html=\"localizedLabel.last\" />\n              &nbsp;\n              <svg aria-hidden=\"true\" focusable=\"false\" data-prefix=\"fas\" data-icon=\"step-forward\" role=\"img\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 448 512\" class=\"svg-inline--fa fa-step-forward fa-w-14 fa-sm\"><path fill=\"currentColor\" d=\"M384 44v424c0 6.6-5.4 12-12 12h-48c-6.6 0-12-5.4-12-12V291.6l-195.5 181C95.9 489.7 64 475.4 64 448V64c0-27.4 31.9-41.7 52.5-24.6L312 219.3V44c0-6.6 5.4-12 12-12h48c6.6 0 12 5.4 12 12z\"></path></svg>\n            </a>\n          </template>\n        </span>\n        <span style=\"position: absolute; right: 6px\">\n          <!--span v-html=\"localizedLabel.footerRight(Object.keys(selected).length, table.length, value.length)\" /-->\n          <a :class=\"{disabled: !showSelectedOnly && selectedCount <= 1}\" @mousedown=\"toggleSelectView\">\n            <span v-html=\"localizedLabel.footerRight.selected\" />\n            <span :style=\"{color: selectedCount>0 ? 'red': 'inherit'}\">{{ selectedCount }}</span>\n          </a>\n          &nbsp;|&nbsp;\n          <a :class=\"{disabled: columnFilterString === '{}'}\" @mousedown=\"toggleFilterView\">\n            <span v-html=\"localizedLabel.footerRight.filtered\" />\n            <span :style=\"{color: table.length !== value.length ? 'red': 'inherit'}\">{{ table.length }}</span>\n          </a>\n          &nbsp;|&nbsp;\n          <a :class=\"{disabled: true}\">\n            <span v-html=\"localizedLabel.footerRight.loaded\" />\n            <span>{{ value.length }}</span>\n          </a>\n        </span>\n      </div>\n\n      <input type=\"file\"\n             ref=\"importFile\"\n             accept=\".xlsx, .xls, xlsm, .csv\"\n             style=\"width:0; height: 0; opacity:0; z-index:-1\"\n             @change=\"doImport\" />\n\n      <panel-filter ref=\"panelFilter\" :m-filter-count=\"nFilterCount\" :localized-label=\"localizedLabel\" />\n      <panel-setting ref=\"panelSetting\" v-model=\"fields\" :localized-label=\"localizedLabel\" />\n      <panel-find ref=\"panelFind\" :localized-label=\"localizedLabel\" />\n    </div>\n  </div>\n</template>\n\n<script>\nimport VueExcelFilter from './VueExcelFilter.vue'\nimport PanelFilter from './panelFilter.vue'\nimport PanelSetting from './panelSetting.vue'\nimport PanelFind from './panelFind.vue'\nimport DatePicker from 'vue2-datepicker'\nimport XLSX from 'xlsx'\n\nimport 'vue2-datepicker/index.css'\n\nexport default {\n  components: {\n    'vue-excel-filter': VueExcelFilter,\n    'panel-filter': PanelFilter,\n    'panel-setting': PanelSetting,\n    'panel-find': PanelFind,\n    'date-picker': DatePicker\n  },\n  props: {\n    value: {type: Array, default () {return []}},\n    rowStyle: {type: Function, default () {return {}}},\n    cellStyle: {type: Function, default () {return {}}},\n    headerLabel: {\n      type: Function,\n      default (label) {\n        return label\n      }\n    },\n    recordLabel: {                                  // return the row header\n      type: Function,\n      default (pos) {\n        return pos\n      }\n    },\n    noFinding: {type: Boolean, default: false},\n    noFindingNext: {type: Boolean, default: false},\n    filterRow: {type: Boolean, default: false},\n    freeSelect: {type: Boolean, default: false},\n    noFooter: {type: Boolean, default: false},\n    noPaging: {type: Boolean, default: false},\n    noNumCol: {type: Boolean, default: false},\n    page: {type: Number, default: 0},               // prefer page size, auto-cal if not provided\n    newRecord: {type: Function, default: null},     // return the new record from caller if provided\n    nFilterCount: {type: Number, default: 200},     // show top n values in filter dialog\n    height: {type: String, default: ''},\n    width: {type: String, default: '100%'},\n    autocomplete: {type: Boolean, default: false},  // Default autocomplete of all columns\n    readonly: {type: Boolean, default: false},\n    readonlyStyle: {type: Object, default () {return {}}},\n    remember: {type: Boolean, default: false},\n    localizedLabel: {\n      type: Object,\n      default () {\n        return {\n          footerLeft: (top, bottom, total) => `Record ${top} to ${bottom} of ${total}`,\n          first: 'First',\n          previous: 'Previous',\n          next: 'Next',\n          last: 'Last',\n          footerRight: {\n            selected: 'Selected:',\n            filtered: 'Filtered:',\n            loaded: 'Loaded:'\n          },\n          processing: 'Processing',\n          tableSetting: 'Table Setting',\n          exportExcel: 'Export Excel',\n          importExcel: 'Import Excel',\n          back: 'Back',\n          sortingAndFiltering: 'Sorting And Filtering',\n          sortAscending: 'Sort Ascending',\n          sortDescending: 'Sort Descending',\n          near: '≒ Near',\n          exactMatch: '= Exact Match',\n          greaterThan: '&gt; Greater Than',\n          greaterThanOrEqualTo: '≥ Greater Than or Equal To',\n          lessThan: '&lt; Less Than',\n          lessThanOrEqualTo: '≤ Less Than Or Equal To',\n          regularExpression: '~ Regular Expression',\n          customFilter: 'Custom Filter',\n          listFirstNValuesOnly: n => `List first ${n} values only`,\n          apply: 'Apply',\n          noRecordIsRead: 'No record is read',\n          readonlyColumnDetected: 'Readonly column detected',\n          columnHasValidationError: (name, err) => `Column ${name} has validation error: ${err}`,\n          noMatchedColumnName: 'No matched column name',\n          invalidInputValue: 'Invalid input value',\n          missingKeyColumn: 'Missing key column'\n        }\n      }\n    }\n  },\n  data () {\n    const pageSize = this.noPaging ? 999999 : 20\n    const dataset = {\n      // selTarget: null,\n      // selSquare: null,\n      // selx: 0,\n      // sely: 0,\n\n      tableContent: null,           // Table parent\n      systable: null,               // TABLE dom node\n      colgroupTr: null,             // colgroup TR dom node\n      labelTr: null,                // THEAD label dom node\n      filterTr: null,               // THEAD filter dom node\n      recordBody: null,             // TBODY dom node\n      footer: null,                 // TFOOTER dom node\n\n      pageSize: pageSize,\n      pageTop: 0,                   // Current page top pos of [table] array\n\n      selected: {},                 // selected storage in hash, key is the pos of [table] array\n      selectedCount: 0,             // selected row count\n      prevSelect: -1,               // previous select pos of [table] array\n      processing: false,            // current general-purpose processing status\n\n      rowIndex: {},                 // index of the record key to pos of [table] array\n\n      currentRecord: null,          // focusing TR dom node\n      currentRowPos: 0,             // focusing array pos of [table] array\n      currentColPos: 0,             // focusing pos of column/field\n      currentField: null,           // focusing field object\n      currentCell: null,\n      inputBox: null,\n      inputBoxShow: 0,\n      inputSquare: null,\n      autocompleteInputs: [],\n      autocompleteSelect: -1,\n\n      errmsg: {},\n      tip: '',\n\n      fields: [],\n      focused: false,\n      mousein: false,\n      inputBoxChanged: false,\n\n      columnFilter: {},             // set filter storage in hash, key is the column pos\n\n      inputFind: '',\n      calCellLeft: 0,\n      calCellTop: 0,\n      calCellTop2: 29,\n\n      frontdrop: null,              // frontdrop dom node\n\n      sortPos: 0,                   // Sort column position\n      sortDir: 0,                   // Sort direction, 1=Ascending, -1=Descending\n      redo: [],                     // redo log\n\n      lazyTimeout: {},\n      lazyBuffer: {},\n      hScroller: {},\n      vScroller: {},\n      leftMost: 0,\n\n      showDatePicker: false,\n      inputDateTime: '',\n\n      table: [],\n      summaryRow: false,\n      showFilteredOnly: true,\n      showSelectedOnly: false\n    }\n    return dataset\n  },\n  computed: {\n    token () {\n      const id = Array.from(document.querySelectorAll('.vue-excel-editor')).indexOf(this.$el)\n      return `vue-excel-editor-${id}`\n    },\n    columnFilterString () {\n      Object.keys(this.columnFilter).forEach((key) => {\n        if (this.columnFilter[key].trim() === '') delete this.columnFilter[key]\n      })\n      return JSON.stringify(this.columnFilter)\n    },\n    pagingTable () {\n      return this.table.slice(this.pageTop, this.pageTop + this.pageSize)\n    },\n    pageBottom () {\n      if (this.value.length === 0) return 0\n      else return this.pageTop + this.pageSize > this.table.length ? this.table.length : this.pageTop + this.pageSize\n    },\n    setting: {\n      get () {\n        return null\n      },\n      set (setter) {\n        if (setter.fields) {\n          // ignore if fields counts are different\n          if (setter.fields.length !== this.fields.length) return\n          let valid = true\n          const newFields = setter.fields.map(field => {\n            const current = this.fields.find(f => f.name === field.name)\n            if (!current) valid = false\n            return Object.assign(current, {\n              invisible: field.invisible,\n              width: field.width\n            })\n          })\n          if (valid) {\n            this.fields = newFields\n            this.$forceUpdate()\n          }\n        }\n      }\n    }\n  },\n  watch: {\n    value () {\n      // detect a loading process, refresh something\n      // this.redo = []\n      // this.errmsg = {}\n      this.lazy(this.refresh)\n    },\n    columnFilterString () {\n      this.processing = true\n      setTimeout(() => {\n        this.refresh()\n        this.processing = false\n      }, 0)\n    },\n    fields: {\n      handler () {\n        this.lazy(() => {\n          const setting = this.getSetting()\n          if (this.remember) localStorage[window.location.pathname + '.' + this.token] = JSON.stringify(setting)\n          this.$emit('setting', setting)\n        })\n      },\n      deep: true\n    },\n    processing (newVal) {\n      if (newVal) {\n        const rect = this.$el.children[0].getBoundingClientRect()\n        this.frontdrop.style.top = rect.top + 'px'\n        this.frontdrop.style.left = rect.left + 'px'\n        this.frontdrop.style.height = rect.height + 'px'\n        this.frontdrop.style.width = rect.width + 'px'\n      }\n    }\n  },\n  beforeDestroy () {\n    window.removeEventListener('resize', this.winResize)\n    window.removeEventListener('paste', this.winPaste)\n    window.removeEventListener('keydown', this.winKeydown)\n    window.removeEventListener('scroll', this.winScroll)\n  },\n  mounted () {\n    this.tableContent = this.$refs.tableContent\n    this.systable = this.$refs.systable\n    this.colgroupTr = this.systable.children[0]\n    this.labelTr = this.systable.children[1].children[0]\n    this.filterTr = this.systable.children[1].children[1]\n    this.recordBody = this.systable.children[2]\n    this.footer = this.$refs.footer\n    this.inputSquare = this.$refs.inputSquare\n    this.inputBox = this.$refs.inputBox\n    this.frontdrop = this.$refs.frontdrop\n\n    if (this.height)\n      this.systable.parentNode.style.height = this.height\n\n    this.reset()\n    this.lazy(() => {\n      this.labelTr.children[0].style.height = this.labelTr.offsetHeight + 'px'\n      this.calCellTop2 = this.labelTr.offsetHeight\n      this.refreshPageSize()\n      this.calStickyLeft()\n    }, 200)\n\n    window.addEventListener('resize', this.winResize)\n    window.addEventListener('paste', this.winPaste)\n    window.addEventListener('keydown', this.winKeydown)\n    window.addEventListener('scroll', this.winScroll)\n\n    if (this.remember && localStorage[window.location.pathname + '.' + this.token])\n      this.setting = JSON.parse(localStorage[window.location.pathname + '.' + this.token])\n  },\n  methods: {\n    getSetting () {\n      const colWidth = Array.from(this.colgroupTr.children).map(col => col.style.width)\n      const fields = this.fields.map((field, i) => {\n        return {\n          name: field.name,\n          invisible: field.invisible,\n          width: colWidth[i + 1]\n        }\n      })\n      return {\n        fields: fields\n      }\n    },\n    calVScroll () {\n      let d = this.labelTr.getBoundingClientRect().height\n      if (this.filterRow) d += 29\n      this.vScroller.top = d\n      if (!this.noFooter) d += 25\n      if (this.summaryRow) d += 27\n      const fullHeight = this.$el.getBoundingClientRect().height\n      this.vScroller.height = fullHeight - d\n      const ratio =  this.vScroller.height / (this.table.length * 24)\n      this.vScroller.buttonHeight = Math.max(24, this.vScroller.height * ratio)\n      const prop = (this.tableContent.scrollTop + this.pageTop * 24) / (this.table.length * 24 - this.vScroller.height)\n      this.vScroller.buttonTop = (this.vScroller.height - this.vScroller.buttonHeight) * prop\n      this.$forceUpdate()\n    },\n    reset () {\n      this.errmsg = {}\n      this.redo = []\n      this.showFilteredOnly = true\n      this.showSelectedOnly = false\n      this.columnFilter = {}\n      this.sortPos = 0\n      this.sortDir = 0\n      this.inputFind = ''\n      this.pageTop = 0\n      this.selected = {}\n      this.selectedCount = 0\n      this.prevSelect = -1\n      this.processing = false\n      this.rowIndex = {}\n      this.refresh()\n    },\n    toggleSelectView (e) {\n      if (e) e.stopPropagation()\n      this.showSelectedOnly = !this.showSelectedOnly\n      return this.refresh()\n    },\n    toggleFilterView (e) {\n      if (e) e.stopPropagation()\n      this.showFilteredOnly = !this.showFilteredOnly\n      return this.refresh()\n    },\n    summary (field) {\n      if (!field.summary) return ''\n      const i = field.name\n      let result = ''\n      switch(field.summary) {\n        case 'sum':\n          result = this.table.reduce((a, b) => (a + Number(b[i])), 0)\n          result = Number(Math.round(result + 'e+5') + 'e-5')  // solve the infinite .9 issue of javascript\n          break\n        case 'avg':\n          result = this.table.reduce((a, b) => (a + Number(b[i])), 0) / this.table.length\n          result = Number(Math.round(result + 'e+5') + 'e-5')  // solve the infinite .9 issue of javascript\n          break\n        case 'max':\n          result = this.table.reduce((a, b) => (a > b[i] ? a : b[i]), Number.MIN_VALUE)\n          break\n        case 'min':\n          result = this.table.reduce((a, b) => (a < b[i] ? a : b[i]), Number.MAX_VALUE)\n          break\n      }\n      return field.toText(result)\n    },\n    calTable () {\n      // add unique key to each row if no key is provided\n      let seed = new Date().getTime() - 1578101000000\n      this.value.forEach((rec,i) => {\n        if (!rec.$id) rec.$id = seed + '-' + i\n      })\n\n      if (this.showFilteredOnly === false) {\n        this.table = this.value\n      }\n      else {\n        const filterColumnList = Object.keys(this.columnFilter)\n        const filter = {}\n        filterColumnList.forEach((k) => {\n          switch (true) {\n            case this.columnFilter[k].startsWith('<='):\n              filter[k] = {type: 1, value: this.columnFilter[k].slice(2).trim().toUpperCase()}\n              if (this.fields[k].type === 'number') filter[k].value = Number(filter[k].value)\n              break\n            case this.columnFilter[k].startsWith('<'):\n              filter[k] = {type: 2, value: this.columnFilter[k].slice(1).trim().toUpperCase()}\n              if (this.fields[k].type === 'number') filter[k].value = Number(filter[k].value)\n              break\n            case this.columnFilter[k].startsWith('>='):\n              filter[k] = {type: 3, value: this.columnFilter[k].slice(2).trim().toUpperCase()}\n              if (this.fields[k].type === 'number') filter[k].value = Number(filter[k].value)\n              break\n            case this.columnFilter[k].startsWith('>'):\n              filter[k] = {type: 4, value: this.columnFilter[k].slice(1).trim().toUpperCase()}\n              if (this.fields[k].type === 'number') filter[k].value = Number(filter[k].value)\n              break\n            case this.columnFilter[k].startsWith('='):\n              filter[k] = {type: 0, value: this.columnFilter[k].slice(1).trim().toUpperCase()}\n              break\n            case this.columnFilter[k].startsWith('*') && this.columnFilter[k].endsWith('*'):\n              filter[k] = {type: 5, value: this.columnFilter[k].slice(1).slice(0, -1).trim().toUpperCase()}\n              break\n            case this.columnFilter[k].startsWith('*') && !this.columnFilter[k].slice(1).includes('*'):\n              filter[k] = {type: 6, value: this.columnFilter[k].slice(1).trim().toUpperCase()}\n              break\n            case this.columnFilter[k].endsWith('*') && !this.columnFilter[k].slice(0, -1).includes('*'):\n              filter[k] = {type: 7, value: this.columnFilter[k].slice(0, -1).trim().toUpperCase()}\n              break\n            case this.columnFilter[k].startsWith('~'):\n              filter[k] = {type: 8, value: this.columnFilter[k].slice(1).trim()}\n              break\n            case this.columnFilter[k].includes('*') || this.columnFilter[k].includes('?'):\n              filter[k] = {type: 8, value: '^' + this.columnFilter[k].replace(/\\*/g, '.*').replace(/\\?/g, '.').trim() + '$'}\n              break\n            default:\n              filter[k] = {type: 5, value: this.columnFilter[k].trim().toUpperCase()}\n              break\n          }\n        })\n        this.table = this.value.filter((record) => {\n          const content = {}\n          filterColumnList.forEach((k) => {\n            const val = record[this.fields[k].name]\n            content[k] = typeof val === 'undefined' ? '' : String(val).toUpperCase()\n          })\n          for (let i = 0; i < filterColumnList.length; i++) {\n            const k = filterColumnList[i]\n            switch (filter[k].type) {\n              case 0:\n                if (`${content[k]}` !== `${filter[k].value}`) return false\n                break\n              case 1:\n                if (this.fields[k].type === 'number') content[k] = Number(content[k])\n                if (filter[k].value < content[k]) return false\n                break\n              case 2:\n                if (this.fields[k].type === 'number') content[k] = Number(content[k])\n                if (filter[k].value <= content[k]) return false\n                break\n              case 3:\n                if (this.fields[k].type === 'number') content[k] = Number(content[k])\n                if (filter[k].value > content[k]) return false\n                break\n              case 4:\n                if (this.fields[k].type === 'number') content[k] = Number(content[k])\n                if (filter[k].value >= content[k]) return false\n                break\n              case 5:\n                if (!content[k].includes(filter[k].value)) return false\n                break\n              case 6:\n                if (!content[k].endsWith(filter[k].value)) return false\n                break\n              case 7:\n                if (!content[k].startsWith(filter[k].value)) return false\n                break\n              case 8:\n                if (!new RegExp(filter[k].value, 'i').test(content[k])) return false\n                break\n            }\n          }\n          return true\n        })\n      }\n\n      this.reviseSelectedAfterTableChange()\n      if (this.showSelectedOnly) {\n        this.table = this.table.filter((rec, i) => this.selected[i])\n        this.reviseSelectedAfterTableChange()\n      }\n    },\n    getKeys (rec) {\n      if (!rec) rec = this.currentRecord\n      const key = this.fields.filter(field => field.keyField).map(field => rec[field.name])\n      if (key.length && key.join() !== '') return key\n      return [rec.$id]\n    },\n    showDatePickerDiv () {\n      const cellRect = this.currentCell.getBoundingClientRect()\n      this.$refs.dpContainer.style.left = (cellRect.left) + 'px'\n      this.$refs.dpContainer.style.top = (cellRect.bottom) + 'px'\n      this.inputDateTime = this.currentCell.textContent\n      this.showDatePicker = true\n      this.lazy(() => {\n        const r = this.$refs.dpContainer.getBoundingClientRect()\n        if (r.bottom > window.innerHeight)\n          this.$refs.dpContainer.style.top = (cellRect.top - r.height) + 'px'\n        if (r.right > window.innerWidth)\n          this.$refs.dpContainer.style.top = (window.innerWidth - r.width) + 'px'\n      })\n    },\n    dpClick () {\n      this.inputBox.value = this.inputDateTime\n      this.inputBoxShow = 0\n      this.inputCellWrite(this.inputDateTime)\n      this.showDatePicker = false\n      this.focused = true\n    },\n    columnCellStyle (field) {\n      let result = field.initStyle\n      if (field.readonly) result = Object.assign(result, this.readonlyStyle)\n      if (field.left) result = Object.assign(result, {left: field.left})\n      return result\n    },\n    calStickyLeft () {\n      let left = 0, n = 0\n      this.leftMost = -1\n      Array.from(this.labelTr.children).forEach(th => {\n        left += th.offsetWidth\n        const field = this.fields[n++]\n        if (field)\n          if (field.sticky) field.left = left + 'px'\n          else if (this.leftMost === -1) this.leftMost = left\n      })\n      this.$forceUpdate()\n    },\n    vsMouseDown (e) {\n      e.stopPropagation()\n      const pos = e.offsetY - this.vScroller.buttonHeight / 2\n      let ratio = Math.max(0, pos)\n      ratio = Math.min(ratio, this.vScroller.height - this.vScroller.buttonHeight)\n      ratio = ratio / (this.vScroller.height - this.vScroller.buttonHeight)\n      if (this.noPaging)\n        this.tableContent.scrollTo(this.tableContent.scrollLeft, this.table.length * 24 * ratio)\n      else {\n        this.vScroller.buttonTop = ratio * (this.vScroller.height - this.vScroller.buttonHeight)\n        this.$refs.vScrollButton.style.marginTop = this.vScroller.buttonTop + 'px'\n        this.pageTop = Math.round((this.table.length - this.pageSize) * ratio)\n      }\n    },\n    vsbMouseDown (e) {\n      e.stopPropagation()\n      if (!this.vScroller.mouseY) {\n        this.vScroller.saveButtonTop = this.vScroller.buttonTop\n        this.vScroller.mouseY = e.clientY\n        window.addEventListener('mousemove', this.vsbMouseMove)\n        this.$refs.vScrollButton.classList.add('focus')\n      }\n    },\n    vsbMouseMove (e) {\n      if (e.buttons === 0) {\n        window.removeEventListener('mousemove', this.vsbMouseMove)\n        this.lazy(() => this.$refs.vScrollButton.classList.remove('focus'))\n        this.vScroller.mouseY = 0\n        if (!this.noPaging) {\n          const ratio = this.vScroller.buttonTop / (this.vScroller.height - this.vScroller.buttonHeight)\n          this.pageTop = Math.round((this.table.length - this.pageSize) * ratio)\n        }\n      }\n      else {\n        const diff = e.clientY - this.vScroller.mouseY\n        if (this.noPaging) {\n          const ratio = (this.vScroller.saveButtonTop + diff) / (this.vScroller.height - this.vScroller.buttonHeight)\n          this.tableContent.scrollTo(this.tableContent.scrollLeft, this.table.length * 24 * ratio)\n        }\n        else {\n          this.vScroller.buttonTop = Math.max(0, Math.min(this.vScroller.height - this.vScroller.buttonHeight, this.vScroller.saveButtonTop + diff))\n          this.$refs.vScrollButton.style.marginTop = this.vScroller.buttonTop + 'px'\n        }\n      }\n    },\n    ftMouseDown (e) {\n      const footerRect = this.footer.getBoundingClientRect()\n      const ratio = (e.x - footerRect.left - 40) / (footerRect.width - 40)\n      const fullWidth = this.systable.getBoundingClientRect().width\n      const viewWidth = this.tableContent.getBoundingClientRect().width\n      this.tableContent.scrollTo(fullWidth * ratio - viewWidth / 2, this.tableContent.scrollTop)\n    },\n    sbMouseDown (e) {\n      e.stopPropagation()\n      if (!this.hScroller.mouseX) {\n        const sleft = this.$refs.scrollbar.getBoundingClientRect().left\n        const fleft = this.footer.getBoundingClientRect().left + 40\n        this.hScroller.left = sleft - fleft\n        this.hScroller.mouseX = e.clientX\n        window.addEventListener('mousemove', this.sbMouseMove)\n        this.$refs.scrollbar.classList.add('focus')\n      }\n    },\n    sbMouseMove (e) {\n      if (e.buttons === 0) {\n        window.removeEventListener('mousemove', this.sbMouseMove)\n        this.lazy(() => this.$refs.scrollbar.classList.remove('focus'))\n        this.hScroller.mouseX = 0\n      }\n      else {\n        const diff = e.clientX - this.hScroller.mouseX\n        const ratio = (this.hScroller.left + diff) / this.hScroller.scrollerUnseenWidth\n        this.tableContent.scrollTo(this.hScroller.tableUnseenWidth * ratio, this.tableContent.scrollTop)\n      }\n    },\n    tableScroll () {\n      this.showDatePicker = false\n      this.autocompleteInputs = []\n      if (this.focused && this.currentField)\n        this.inputSquare.style.marginLeft =\n          (this.currentField.sticky ? this.tableContent.scrollLeft - this.squareSavedLeft : 0) + 'px'\n\n      if (this.tableContent.scrollTop !== this.vScroller.lastTop) {\n        this.calVScroll()\n        this.$refs.vScrollButton.classList.add('focus')\n        this.lazy(() => this.$refs.vScrollButton.classList.remove('focus'), 1000)\n      }\n      this.vScroller.lastTop = this.tableContent.scrollTop\n\n      if (this.tableContent.scrollLeft !== this.hScroller.lastLeft) {\n        if (this.$refs.scrollbar && this.hScroller.tableUnseenWidth) {\n          this.$refs.scrollbar.classList.add('focus')\n          this.lazy(() => this.$refs.scrollbar.classList.remove('focus'), 1000)\n          const ratio = this.tableContent.scrollLeft / this.hScroller.tableUnseenWidth\n          this.$refs.scrollbar.style.left = (this.hScroller.scrollerUnseenWidth * ratio) + 'px'\n        }\n      }\n      this.hScroller.lastLeft = this.tableContent.scrollLeft\n    },\n    importTable (cb) {\n      this.$refs.importFile.click()\n      this.importCallback = cb\n    },\n    doImport (e) {\n      this.processing = true\n      this.refresh()\n      setTimeout(() => {\n        const files = e.target.files\n        if (!files || files.length === 0) return\n        const file = files[0]\n\n        const fileReader = new FileReader()\n        fileReader.onload = (e) => {\n          try {\n            const data = e.target.result\n            const wb = XLSX.read(data, {type: 'binary', cellDates: true, cellStyle: false})\n            const sheet = wb.SheetNames[0]\n            const importData = XLSX.utils.sheet_to_row_object_array(wb.Sheets[sheet])\n            const keyStart = new Date().getTime()\n            if (importData.length === 0) throw new Error('VueExcelEditor: ' + this.localizedLabel.noRecordIsRead)\n            if (this.fields\n              .filter(f => f.keyField)\n              .filter(f => typeof importData[0][f.name] === 'undefined' && typeof importData[0][f.label] === 'undefined').length > 0)\n              throw new Error(`VueExcelEditor: ${this.localizedLabel.missingKeyColumn}`)\n\n            let pass = 0\n            let inserted = 0\n            let updated = 0\n            while (pass < 2) {\n              importData.forEach((line, i) => {\n                let rowPos = this.table.findIndex(v => {\n                  return this.fields\n                    .filter(f => f.keyField)\n                    .filter(f => v[f.name] !== line[f.name] && v[f.name] !== line[f.label]).length === 0\n                })\n                let rec = {\n                  $id: typeof line.$id === 'undefined' ? keyStart + '-' + i : line.$id\n                }\n\n                this.fields.forEach((field) => {\n                  if (field.name.startsWith('$')) return\n                  let val = line[field.name]\n                  if (typeof val === 'undefined') val = line[field.label]\n                  if (typeof val === 'undefined') val = null\n                  else {\n                    if (field.readonly) throw new Error(`VueExcelEditor: [row=${i+1}] ` + this.localizedLabel.readonlyColumnDetected)\n                    if (field.validate) {\n                      let err\n                      if ((err = field.validate(val)))\n                        throw new Error(`VueExcelEditor: [row=${i+1}] ` + this.localizedLabel.columnHasValidationError(field.name, err))\n                    }\n                  }\n                  if (val !== null) rec[field.name] = val\n                })\n                if (pass === 1) {\n                  if (rowPos >= 0) {\n                    updated++\n                  }\n                  else {\n                    rowPos = this.table.push(rec) - 1\n                    inserted++\n                  }\n                  Object.keys(rec).forEach(name => {\n                    if (name.startsWith('$')) return\n                    this.updateCellByName(rowPos, name, rec[name])\n                  })\n                }\n              })\n              pass++\n            }\n            if (pass === 2 && this.importCallback) {\n              this.importCallback({\n                inserted: inserted,\n                updated: updated,\n                recordAffected: inserted + updated\n              })\n            }\n          }\n          catch (e) {\n            throw new Error('VueExcelEditor: ' + e.stack)\n          }\n          finally {\n            this.processing = false\n            this.$refs.importFile.value = ''\n          }\n        }\n        fileReader.onerror = (e) => {\n          this.processing = false\n          this.$refs.importFile.value = ''\n          throw new Error('VueExcelEditor: ' + e.stack)\n        }\n        fileReader.readAsBinaryString(file)\n      }, 500)      \n    },\n    winScroll () {\n      this.showDatePicker = false\n      this.autocompleteInputs = []\n    },\n    winResize () {\n      this.lazy(this.refreshPageSize, 200)\n    },\n    winPaste (e) {\n      if (e.target.tagName !== 'TEXTAREA') return\n      if (!this.mousein && !this.focused) return\n      if (!this.currentField || this.currentField.readonly) return\n      if (this.inputBoxShow) {\n        this.inputBoxChanged = true\n        return\n      }\n      const text = (e.originalEvent || e).clipboardData.getData('text/plain')\n      this.inputCellWrite(text)\n      e.preventDefault()\n    },\n    winKeydown (e) {\n      if (!this.mousein && !this.focused) return\n      if (e.ctrlKey || e.metaKey)\n        switch (e.keyCode) {\n          case 90: // z\n            this.undoTransaction()\n            e.preventDefault()\n            break\n          case 65: // a\n            this.toggleSelectAllRecords()\n            e.preventDefault()\n            break\n          case 67: // c\n            this.inputBox.value = this.currentCell.innerText\n            this.inputBox.focus()\n            this.inputBox.select()\n            document.execCommand('copy')\n            e.preventDefault()\n            break\n          case 70: // f\n            if (!this.noFinding) {\n              this.$refs.panelFind.showPanel()\n              e.preventDefault()\n            }\n            break\n          case 71: // g\n            if (!this.noFindingNext && this.inputFind !== '') {\n              this.doFindNext()\n              e.preventDefault()\n            }\n            break\n          case 76: // l\n            e.preventDefault()\n            this.calAutocompleteList(true)\n            break\n        }\n      else {\n        if (this.currentRowPos < 0) return\n        switch (e.keyCode) {\n          case 37:  // Left Arrow\n            if (!this.focused) return\n            if (!this.inputBoxShow) {\n              this.moveWest(e)\n              e.preventDefault()\n            }\n            else {\n              if (this.inputBox.selectionStart === 0) {\n                this.moveWest(e)\n                e.preventDefault()\n              }\n            }\n            break\n          case 38:  // Up Arrow\n            if (!this.focused) return\n            e.preventDefault()\n            if (this.autocompleteInputs.length === 0)\n              this.moveNorth()\n            else\n              if (this.autocompleteSelect > 0) this.autocompleteSelect--\n            break\n          case 9:  // Tab\n          case 39: // Right Arrow\n            if (!this.focused) return\n            if (!this.inputBoxShow) {\n              this.moveEast(e)\n              e.preventDefault()\n            }\n            else {\n              if (this.inputBox.selectionEnd === this.inputBox.value.length) {\n                this.moveEast(e)\n                e.preventDefault()\n              }\n            }\n            break\n          case 40:  // Down Arrow\n            if (!this.focused) return\n            e.preventDefault()\n            if (this.autocompleteInputs.length === 0)\n              this.moveSouth(e)\n            else\n              if (this.autocompleteSelect < this.autocompleteInputs.length - 1) this.autocompleteSelect++\n            break\n          case 13:  // Enter\n            if (!this.focused) return\n            e.preventDefault()\n            if (this.autocompleteInputs.length === 0 || this.autocompleteSelect === -1) {\n              if (!this.moveSouth(e)) {\n                if (this.inputBoxChanged) {\n                  this.inputCellWrite(this.inputBox.value)\n                  this.inputBoxChanged = false\n                }\n                this.inputBoxShow = 0\n                this.showDatePicker = false\n                this.autocompleteInputs = []\n                this.autocompleteSelect = -1\n              }\n              return\n            }\n            else\n              if (this.autocompleteSelect !== -1)\n                this.inputAutocompleteText(this.autocompleteInputs[this.autocompleteSelect])\n            break\n          case 27:  // Esc\n            if (!this.focused) return\n            this.showDatePicker = false\n            this.autocompleteInputs = []\n            this.autocompleteSelect = -1\n            if (this.inputBoxShow) {\n              e.preventDefault()\n              this.inputBox.value = this.currentCell.innerText\n              this.inputBoxShow = 0\n              this.inputBoxChanged = false\n            }\n            break\n          case 33:  // Page Up\n            this.prevPage()\n            e.preventDefault()\n            break\n          case 34:  // Page Down\n            this.nextPage()\n            e.preventDefault()\n            break\n          case 8:   // Delete\n          case 46:  // BS\n            if (!this.focused) return\n            if (this.inputBoxShow) {\n              this.inputBoxChanged = true\n              setTimeout(this.calAutocompleteList)\n              return\n            }\n            if (this.currentField.readonly) return\n            if (this.autocompleteInputs.length) return\n            if (this.currentField.type === 'select') this.calAutocompleteList(true)\n            else {\n              this.inputBox.value = ''\n              this.inputCellWrite('')\n            }\n            break\n          default:\n            if (!this.focused) return\n            if (this.currentField.readonly) return\n            if (e.altKey) return\n            if (e.key !== 'Process' && e.key.length > 1) return\n            if (this.currentField.allowKeys && this.currentField.allowKeys.indexOf(e.key.toUpperCase()) === -1) return e.preventDefault()\n            if (this.currentField.lengthLimit && this.inputBox.value.length > this.currentField.lengthLimit) return e.preventDefault()\n            if (!this.inputBoxShow) {\n              if (this.currentField.type === 'select') {\n                this.calAutocompleteList(true)\n                return\n              }\n              if (this.currentField.type === 'date') {\n                this.showDatePickerDiv()\n                return\n              }\n              this.inputBox.value = ''\n              this.inputBoxShow = 1\n              this.inputBox.focus()\n            }\n            this.inputBoxChanged = true\n            setTimeout(this.calAutocompleteList)\n            break\n        }\n      }\n    },\n    registerColumn (field) {\n      let pos = this.fields.findIndex(item => item.pos > field.pos)\n      if (pos === -1) pos = this.fields.length\n      this.fields.splice(pos, 0, field)\n      if (field.summary) this.summaryRow = true\n    },\n    moveInputSquare (rowPos, colPos) {\n      if (colPos < 0) return false\n\n      const row = this.recordBody.children[rowPos]\n      if (!row) {\n        if (rowPos > this.currentRowPos) {\n          // move the whole page down 1 record\n          if (this.pageTop + this.pageSize < this.table.length)\n            this.pageTop += 1\n          return false\n        }\n        else {\n          // move the whole page up 1 record\n          if (this.pageTop - 1 >= 0)\n            this.pageTop -= 1\n          return false\n        }\n      }\n\n      // Clear the label markers\n      this.labelTr.children[this.currentColPos + 1].classList.remove('focus')\n      if (this.currentRowPos >= 0 && this.currentRowPos < this.pagingTable.length)\n        this.recordBody.children[this.currentRowPos].children[0].classList.remove('focus')\n\n      // Off the textarea when moving, write to value if changed\n      if (this.inputBoxShow) this.inputBoxShow = 0\n      if (this.inputBoxChanged) {\n        this.inputCellWrite(this.currentField.toValue(this.inputBox.value))\n        this.inputBoxChanged = false\n      }\n\n      // Relocate the inputSquare\n      const cell = row.children[colPos + 1]\n      if (!cell) return false\n      this.currentField = this.fields[colPos]\n      const cellRect = cell.getBoundingClientRect()\n      const tableRect = this.systable.getBoundingClientRect()\n      this.squareSavedLeft = this.tableContent.scrollLeft\n      this.inputSquare.style.marginLeft = 0\n      this.inputSquare.style.left = (cellRect.left - tableRect.left - 1) + 'px'\n      this.inputSquare.style.top =  (cellRect.top - tableRect.top - 1) + 'px'\n      this.inputSquare.style.width = (cellRect.width + 1) + 'px'\n      this.inputSquare.style.height = (cellRect.height + 1) + 'px'\n      this.inputSquare.style.zIndex = this.currentField.sticky ? 3 : 1\n\n      // Adjust the scrolling to display the whole focusing cell\n      if (!this.currentField.sticky) {\n        const boundRect = this.$el.getBoundingClientRect()\n        if (cellRect.right >= boundRect.right - 12)\n          this.tableContent.scrollBy(cellRect.right - boundRect.right + 13, 0)\n        if (cellRect.left <= boundRect.left + this.leftMost)\n          this.tableContent.scrollBy(cellRect.left - boundRect.left - this.leftMost - 1, 0)\n      }\n\n      this.currentRowPos = rowPos\n      this.currentColPos = colPos\n      this.currentCell = cell\n\n      // Off all editors\n      if (this.showDatePicker) this.showDatePicker = false\n      if (this.autocompleteInputs.length) {\n        this.autocompleteInputs = []\n        this.autocompleteSelect = -1\n      }\n      if (this.recalAutoCompleteList) clearTimeout(this.recalAutoCompleteList)\n\n      // set the label markers\n      if (this.currentRowPos >= 0 && this.currentRowPos < this.pagingTable.length) {\n        this.inputBox.focus()\n        this.focused = true\n        row.children[0].classList.add('focus')\n        this.labelTr.children[colPos + 1].classList.add('focus')\n      }\n      return true\n    },\n    refresh () {\n      this.pageTop = 0\n      this.prevSelect = -1\n      this.calTable()\n      // this.reviseSelectedAfterTableChange()\n      this.refreshPageSize()\n    },\n    getSelectedRecords () {\n      return this.table.filter((rec, i) => this.selected[i])\n    },\n    deleteSelectedRecords () {\n      this.table = this.table.filter((rec, i) => typeof this.selected[i] === 'undefined')\n      this.selected = {}\n      this.selectedCount = 0\n    },\n    colSepMouseDown (e) {\n      e.preventDefault()\n      e.stopPropagation()\n      this.focused = false\n      const getStyleVal = (elm, css) => {\n        window.getComputedStyle(elm, null).getPropertyValue(css)\n      }\n      this.sep = {}\n      this.sep.curCol = this.colgroupTr.children[Array.from(this.labelTr.children).indexOf(e.target.parentElement)]\n      // this.sep.nxtCol = this.sep.curCol.nextElementSibling\n      this.sep.pageX = e.pageX\n      let padding = 0\n      if (getStyleVal(this.sep.curCol, 'box-sizing') !== 'border-box') {\n        const padLeft = getStyleVal(this.sep.curCol, 'padding-left')\n        const padRight = getStyleVal(this.sep.curCol, 'padding-right')\n        if (padLeft && padRight)\n          padding = parseInt(padLeft) + parseInt(padRight)\n      }\n      this.sep.curColWidth = e.target.parentElement.offsetWidth - padding\n      // if (this.sep.nxtCol)\n      //   this.sep.nxtColWidth = this.sep.nxtCol.offsetWidth - padding\n      window.addEventListener('mousemove', this.colSepMouseMove)\n      window.addEventListener('mouseup', this.colSepMouseUp)\n    },\n    colSepMouseOver (e) {\n      e.target.style.borderRight = '5px solid #cccccc'\n      e.target.style.height = this.systable.getBoundingClientRect().height + 'px'\n    },\n    colSepMouseOut (e) {\n      e.target.style.borderRight = ''\n      e.target.style.height = '100%'\n    },\n    colSepMouseMove (e) {\n      if (!this.sep || !this.sep.curCol) return\n      const diffX = e.pageX - this.sep.pageX\n      this.sep.curCol.style.width = (this.sep.curColWidth + diffX) + 'px'\n      this.lazy(this.calStickyLeft)\n    },\n    colSepMouseUp (e) {\n      e.preventDefault()\n      e.stopPropagation()\n      delete this.sep\n      window.removeEventListener('mousemove', this.colSepMouseMove)\n      window.removeEventListener('mouseup', this.colSepMouseUp)\n      const setting = this.getSetting()\n      if (this.remember) localStorage[window.location.pathname + '.' + this.token] = JSON.stringify(setting)\n      this.$emit('setting', setting)\n    },\n    doFindNext () {\n      return this.doFind()\n    },\n    doFind (s) {\n      if (typeof s === 'undefined') s = this.inputFind\n      else this.inputFind = s\n      s = s.toUpperCase()\n      for(let r = this.currentRowPos + this.pageTop; r < this.table.length; r++) {\n        const rec = this.table[r]\n        for(let c = (r === this.currentRowPos + this.pageTop ? this.currentColPos + 1: 0); c < this.fields.length; c++) {\n          const field = this.fields[c].name\n          if (typeof rec[field] !== 'undefined' && String(rec[field]).toUpperCase().indexOf(s) >= 0) {\n            this.pageTop = this.findPageTop(r)\n            setTimeout(() => {\n              this.moveInputSquare(r - this.pageTop, c)\n              setTimeout(() => this.inputBox.focus())\n              this.focused = true\n            })\n            return true\n          }\n        }\n      }\n      for(let r = 0; r <= this.currentRowPos + this.pageTop; r++) {\n        const rec = this.table[r]\n        for(let c = 0; c < (r === this.currentRowPos + this.pageTop ? this.currentColPos : this.fields.length); c++) {\n          const field = this.fields[c].name\n          if (typeof rec[field] !== 'undefined' && String(rec[field]).toUpperCase().indexOf(s) >= 0) {\n            this.pageTop = this.findPageTop(r)\n            this.moveInputSquare(r - this.pageTop, c)\n            setTimeout(() => {\n              this.focused = true\n            })\n            return true\n          }\n        }\n      }\n      return false\n    },\n    findPageTop (rowPos) {\n      for (let pt = this.pageTop; pt < this.table.length; pt += this.pageSize)\n        if (rowPos >= pt && rowPos < pt + this.pageSize) return pt\n      for (let pt = this.pageTop; pt > 0; pt -= this.pageSize)\n        if (rowPos >= pt && rowPos < pt + this.pageSize) return pt\n      return this.pageTop\n    },\n    headerClick (e, colPos) {\n      if (e.which === 1) {\n        e.preventDefault()\n        if (this.sortPos === colPos && this.sortDir > 0)\n          this.sort(-1, colPos)\n        else\n          this.sort(1, colPos)\n      }\n    },\n    sort (n, pos) {\n      this.processing = true\n      const colPos = typeof pos === 'undefined' ? this.columnFilterRef.colPos : pos\n      const fieldName = this.fields[colPos].name\n      const type = this.fields[colPos].type\n      setTimeout(() => {\n        if (type === 'number')\n          this.value.sort((a, b) => {\n            if (Number(a[fieldName]) > Number(b[fieldName])) return n\n            if (Number(a[fieldName]) < Number(b[fieldName])) return -n\n            return 0\n          })\n        else\n          this.value.sort((a, b) => {\n            if (a[fieldName] > b[fieldName]) return n\n            if (a[fieldName] < b[fieldName]) return -n\n            return 0\n          })\n        this.sortPos = colPos\n        this.sortDir = n\n        this.processing = false\n      }, 0)\n    },\n    freezePanelSizeAfterShown (target) {\n      const rect = target.getBoundingClientRect()\n      target.setAttribute('style', `width:${rect.width}px; height:${rect.height}px;`)\n    },\n    refreshPageSize () {\n      if (this.$refs.scrollbar) {\n        const fullWidth = this.systable.getBoundingClientRect().width\n        const viewWidth = this.tableContent.getBoundingClientRect().width\n        this.hScroller.tableUnseenWidth = fullWidth - viewWidth\n        this.$refs.scrollbar.style.width = (100 * viewWidth / fullWidth) + '%'\n        const scrollerWidth = this.$refs.scrollbar.getBoundingClientRect().width\n        this.hScroller.scrollerUnseenWidth = this.footer.getBoundingClientRect().width - 40 - scrollerWidth\n      }\n      if (!this.noPaging) {\n        const offset = this.summaryRow ? 60 : 35\n        this.pageSize = this.page || Math.floor((window.innerHeight - this.recordBody.getBoundingClientRect().top - offset) / 24)\n      }\n      else if (this.height === 'auto') {\n        let h = Math.floor((window.innerHeight - this.tableContent.getBoundingClientRect().top - 25))\n        let offset = 4\n        if (this.filterRow) offset += 29\n        if (this.summaryRow) offset += 25\n        if (!this.footerRow) offset += 25\n        h = Math.min(24 * (this.table.length - this.pageTop) + offset, h)\n        this.systable.parentNode.style.height = h + 'px'\n      }\n      setTimeout(this.calVScroll)\n    },\n    firstPage (e) {\n      if (e) e.stopPropagation()\n      this.pageTop = 0\n      this.calVScroll()\n      setTimeout(() => {\n        this.$refs.vScrollButton.classList.add('focus')\n        this.lazy(() => this.$refs.vScrollButton.classList.remove('focus'), 1000)\n      })\n    },\n    lastPage (e) {\n      if (e) e.stopPropagation()\n      this.pageTop = this.table.length - this.pageSize < 0 ? 0 : this.table.length - this.pageSize\n      this.calVScroll()\n      setTimeout(() => {\n        this.$refs.vScrollButton.classList.add('focus')\n        this.lazy(() => this.$refs.vScrollButton.classList.remove('focus'), 1000)\n      })\n    },\n    prevPage (e) {\n      if (e) e.stopPropagation()\n      this.pageTop = this.pageTop < this.pageSize ? 0 : this.pageTop - this.pageSize\n      this.calVScroll()\n      setTimeout(() => {\n        this.$refs.vScrollButton.classList.add('focus')\n        this.lazy(() => this.$refs.vScrollButton.classList.remove('focus'), 1000)\n      })\n    },\n    nextPage (e) {\n      if (e) e.stopPropagation()\n      if (this.pageTop + this.pageSize < this.table.length)\n        this.pageTop = Math.min(this.pageTop + this.pageSize, this.table.length - this.pageSize)\n      this.calVScroll()\n      setTimeout(() => {\n        this.$refs.vScrollButton.classList.add('focus')\n        this.lazy(() => this.$refs.vScrollButton.classList.remove('focus'), 1000)\n      })\n    },\n    rowLabelClick (e) {\n      let target = e.target\n      while (target.tagName !== 'TD') target = target.parentNode\n      const rowPos = Number(target.getAttribute('pos')) + this.pageTop\n      if (e.shiftKey) {\n        document.getSelection().removeAllRanges()\n        if (this.prevSelect !== -1 && this.prevSelect !== rowPos) {\n          e.preventDefault()\n          if (rowPos > this.prevSelect)\n            for (let i = this.prevSelect; i <= rowPos; i++)\n              this.selectRecord(i)\n          else\n            for (let i = rowPos; i <= this.prevSelect; i++)\n              this.selectRecord(i)\n        }\n      }\n      else {\n        const selected = this.selected[rowPos]\n        if (!this.freeSelect && !(e.ctrlKey || e.metaKey)) this.clearAllSelected()\n        if (!selected) this.selectRecord(rowPos)\n        else this.unSelectRecord(rowPos)\n      }\n      this.prevSelect = rowPos\n    },\n    settingClick () {\n      this.$refs.panelSetting.showPanel()\n    },\n    exportTable (format, selectedOnly) {\n      this.processing = true\n      setTimeout(() => {\n        const wb = XLSX.utils.book_new()\n        let ws1 = null\n        if (selectedOnly)\n          ws1 = XLSX.utils.json_to_sheet(this.table.filter((rec, i) => this.selected[i]), {\n            header: this.fields.map(field => field.name)\n          })\n        else\n          ws1 = XLSX.utils.json_to_sheet(this.table, {\n            header: this.fields.map(field => field.name)\n          })\n        const labels = Array.from(this.labelTr.children).slice(1).map(t => t.children[0].innerText)\n        XLSX.utils.sheet_add_aoa(ws1, [labels], {origin: 0})\n        ws1['!cols'] = Array.from(this.labelTr.children).slice(1).map((t) => {\n          return {\n            width: t.getBoundingClientRect().width / 6.5\n          }\n        })\n        XLSX.utils.book_append_sheet(wb, ws1, 'Sheet1')\n        switch (format) {\n          case 'excel':\n            XLSX.writeFile(wb, 'export.xlsx')\n            break\n          case 'csv':\n            XLSX.writeFile(wb, 'export.csv')\n            break\n        }\n        this.processing = false\n      }, 500)\n    },\n    selectAllClick () {\n      this.toggleSelectAllRecords()\n    },\n    reviseSelectedAfterTableChange () {\n      this.rowIndex = {}\n      this.table.forEach((rec, i) => (this.rowIndex[rec.$id] = i))\n      const temp = Object.assign(this.selected)\n      this.selected = {}\n      Object.keys(temp).forEach((p) => {\n        const id = temp[p]\n        if (typeof this.rowIndex[id] !== 'undefined')\n          this.selected[this.rowIndex[id]] = id\n      })\n      this.selectedCount = Object.keys(this.selected).length\n    },\n    toggleSelectRecord (rowPos) {\n      if (typeof this.selected[rowPos] !== 'undefined') this.unSelectRecord(rowPos)\n      else this.selectRecord(rowPos)\n    },\n    selectRecord (rowPos) {\n      if (typeof this.selected[rowPos] === 'undefined') {\n        this.selectedCount++\n        this.selected[rowPos] = this.table[rowPos].$id\n        if (this.recordBody.children[rowPos - this.pageTop])\n          this.recordBody.children[rowPos - this.pageTop].classList.add('select')\n        this.lazy(rowPos, (buf) => {\n          this.$emit('select', buf, true)\n        })\n      }\n    },\n    unSelectRecord (rowPos) {\n      if (typeof this.selected[rowPos] !== 'undefined') {\n        delete this.selected[rowPos]\n        this.selectedCount--\n        if (this.recordBody.children[rowPos - this.pageTop])\n          this.recordBody.children[rowPos - this.pageTop].classList.remove('select')\n        this.lazy(rowPos, (buf) => {\n          this.$emit('select', buf, false)\n        })\n      }\n    },\n    toggleSelectAllRecords (e) {\n      if (e) e.preventDefault()\n      if (this.selectedCount === this.table.length) {\n        for (let i = 0; i < this.table.length; i++)\n          this.unSelectRecord(i)\n        this.selectedCount = 0\n      }\n      else {\n        for (let i = 0; i < this.table.length; i++)\n          this.selectRecord(i)\n        this.selectedCount = this.table.length\n      }\n    },\n    clearAllSelected () {\n      // for (let i = 0; i < this.$refs.systable.children[2].children.length; i++)\n      //  this.unSelectRecord(this.pageTop + i)\n      this.selected = {}\n      this.selectedCount = 0\n    },\n    undoTransaction (e) {\n      if (e) e.preventDefault()\n      if (this.redo.length === 0) return\n      const transaction = this.redo.pop()\n      transaction.forEach((rec) => {\n        this.updateCell(this.rowIndex[rec.$id], rec.field, rec.oldVal, true)\n      })\n    },\n    updateCellByColPos (recPos, colPos, content) {\n      return this.updateCell(recPos, this.fields[colPos], content)\n    },\n    updateCellByName (recPos, name, content) {\n      return this.updateCell(recPos, this.fields.find(f => f.name === name), content)\n    },\n    updateCell (recPos, field, content, restore) {\n      const tableRow = this.table[recPos]\n      const oldVal = tableRow[field.name]\n      const oldKeys = this.getKeys(tableRow)\n      tableRow[field.name] = content\n\n      setTimeout(() => {\n        const transaction = {\n          $id: tableRow.$id,\n          keys: this.getKeys(tableRow),\n          oldKeys: oldKeys,\n          name: field.name,\n          field: field,\n          oldVal: oldVal,\n          newVal: content,\n          err: ''\n        }\n\n        const id = `id-${tableRow.$id}-${field.name}`\n        if (field.validate !== null) transaction.err = field.validate(content)\n        if (field.mandatory && content === '')\n          transaction.err += (transaction.err ? '\\n' : '') + field.mandatory\n\n        if (transaction.err !== '') {\n          this.errmsg[id] = transaction.err\n          this.systable.querySelector('td#'+id).classList.add('error')\n        }\n        else delete this.errmsg[id]\n\n        this.lazy(transaction, (buf) => {\n          this.$emit('update', buf)\n          if (!restore) this.redo.push(buf)\n        }, 50)\n      })\n    },\n    updateSelectedRows (field, content) {\n      this.processing = true\n      setTimeout(() => {\n        Object.keys(this.selected).forEach(recPos => this.updateCell(recPos, field, content))\n        this.processing = false\n      }, 0)\n    },\n    moveTo (rowPos, colPos) {\n      colPos = colPos || 0\n      this.moveInputSquare(rowPos, colPos)\n    },\n    moveWest () {\n      if (this.focused && this.currentColPos > 0) {\n        let goColPos = this.currentColPos - 1\n        while (this.fields[goColPos].invisible && goColPos >= 0) goColPos--\n        if (goColPos === -1) return\n        this.moveInputSquare(this.currentRowPos, goColPos)\n      }\n    },\n    moveEast () {\n      if (this.focused && this.currentColPos < this.fields.length - 1) {\n        let goColPos = this.currentColPos + 1\n        while (this.fields[goColPos].invisible && goColPos < this.fields.length - 1) goColPos++\n        if (goColPos === this.fields.length) return\n        this.moveInputSquare(this.currentRowPos, goColPos)\n      }\n    },\n    moveNorth () {\n      if (this.focused) {\n        this.moveInputSquare(this.currentRowPos - 1, this.currentColPos)\n        this.calVScroll()\n        this.$refs.vScrollButton.classList.add('focus')\n        this.lazy(() => this.$refs.vScrollButton.classList.remove('focus'), 1000)\n      }\n    },\n    moveSouth () {\n      if (this.focused && this.currentRowPos < this.table.length) {\n        const done = this.moveInputSquare(this.currentRowPos + 1, this.currentColPos)\n        this.calVScroll()\n        this.$refs.vScrollButton.classList.add('focus')\n        this.lazy(() => this.$refs.vScrollButton.classList.remove('focus'), 1000)\n        return done\n      }\n      return false\n    },\n    mouseDown (e) {\n      if (e.target.parentNode.parentNode.tagName === 'TBODY' && !e.target.classList.contains('first-col')) {\n        e.preventDefault()\n        setTimeout(() => this.inputBox.focus())\n        this.focused = true\n        const row = e.target.parentNode\n        const colPos = Array.from(row.children).indexOf(e.target) - 1\n        const rowPos = Array.from(row.parentNode.children).indexOf(row)\n        this.moveInputSquare(rowPos, colPos)\n        if (e.target.offsetWidth - e.offsetX > 15) return\n        if (e.target.classList.contains('select')) this.calAutocompleteList(true)\n        if (e.target.classList.contains('datepick')) this.showDatePickerDiv()\n      }\n    },\n    cellMouseMove (e) {\n      let cursor = 'cell'\n      if (this.inputBoxShow) cursor = 'default'\n      if (!e.target.classList.contains('readonly')\n        && (e.target.classList.contains('select') || e.target.classList.contains('datepick'))\n        && e.target.offsetWidth - e.offsetX < 15)\n        cursor = 'pointer'\n      e.target.style.cursor = cursor\n    },\n    cellMouseOver (e) {\n      const cell = e.target\n      if (!cell.classList.contains('error')) return\n      if (this.tipTimeout) clearTimeout(this.tipTimeout)\n      if ((this.tip = this.errmsg[cell.getAttribute('id')]) === '') return\n      const rect = cell.getBoundingClientRect()\n      this.$refs.tooltip.style.top = (rect.top - 14) + 'px';\n      this.$refs.tooltip.style.left = (rect.right + 8) + 'px'\n      cell.addEventListener('mouseout', this.cellMouseOut)\n    },\n    cellMouseOut (e) {\n      this.tipTimeout = setTimeout(() => {\n        this.tip = ''\n      }, 1000)\n      e.target.removeEventListener(e.type, this.cellMouseOut)\n    },\n    mouseOver () {\n      this.mousein = true\n    },\n    mouseOut () {\n      this.mousein = false\n    },\n    inputSquareClick () {\n      if (!this.currentField.readonly && !this.inputBoxShow && this.currentField.type !== 'select') {\n        this.inputBox.value = this.currentCell.innerText\n        this.inputBoxShow = 1\n        this.inputBox.focus()\n        this.inputBoxChanged = false\n        this.focused = true\n      }\n    },\n    inputBoxMouseMove (e) {\n      let cursor = 'text'\n      if (!this.currentField.readonly\n        && (this.currentField.options.length || this.currentField.type === 'date')\n        && e.target.offsetWidth - e.offsetX < 15)\n        cursor = 'pointer'\n      e.target.style.cursor = cursor\n    },\n    inputBoxMouseDown (e) {\n      if (e.target.offsetWidth - e.offsetX > 15) return\n      if (this.currentField.options.length) {\n        e.preventDefault()\n        this.calAutocompleteList(true)\n      }\n      if (this.currentField.type === 'date') {\n        e.preventDefault()\n        this.showDatePickerDiv()\n      }\n    },\n    calAutocompleteList (force) {\n      if (!force && !this.currentField.autocomplete) return\n      if (force || (this.inputBoxChanged && this.inputBox.value.length > 0)) {\n        if (typeof this.recalAutoCompleteList !== 'undefined') clearTimeout(this.recalAutoCompleteList)\n        this.recalAutoCompleteList = setTimeout(() => {\n          if (!force) {\n            if (!this.focused || !this.inputBoxShow || !this.inputBoxChanged || !this.inputBox.value.length) {\n              this.autocompleteInputs = []\n              return\n            }\n          }\n          const field = this.currentField\n          const name = field.name\n          const value = force ? '' : this.inputBox.value\n          let list\n          if (field.options.length > 0) {\n            list = this.currentField.options\n          }\n          else {\n            list = []\n            for(let i=0; i<this.table.length; i++) {\n              const rec = this.table[i]\n              if (typeof rec[name] !== 'undefined' && rec[name].startsWith(value) && list.indexOf(rec[name]) === -1)\n                list.push(rec[name])\n              if (list.length >= 10) break\n            }\n            list.sort()\n          }\n          this.autocompleteSelect = -1\n          this.autocompleteInputs = list\n          const rect = this.currentCell.getBoundingClientRect()\n          this.$refs.autocomplete.style.top = rect.bottom + 'px'\n          this.$refs.autocomplete.style.left = rect.left + 'px'\n          this.$refs.autocomplete.style.minWidth = rect.width + 'px'\n          this.lazy(() => {\n            const r = this.$refs.autocomplete.getBoundingClientRect()\n            if (r.bottom > window.innerHeight)\n              this.$refs.autocomplete.style.top = (rect.top - r.height) + 'px'\n            if (r.right > window.innerWidth)\n              this.$refs.autocomplete.style.top = (window.innerWidth - r.width) + 'px'\n          })\n        }, force ? 0 : 700)\n      }\n    },\n    inputAutocompleteText (text, e) {\n      if (e) e.preventDefault()\n      setTimeout(() => {\n        this.inputCellWrite(text)\n        this.autocompleteInputs = []\n        this.autocompleteSelect = -1\n        this.inputBoxShow = 0\n        this.inputBoxChanged = false\n      })\n    },\n    inputCellWrite (setText, colPos, recPos) {\n      let field = this.currentField\n      if (typeof colPos !== 'undefined') field = this.fields[colPos]\n      if (typeof recPos === 'undefined') recPos = this.pageTop + this.currentRowPos\n      if (typeof this.selected[recPos] !== 'undefined')\n        this.updateSelectedRows(field, setText)\n      else\n        this.updateCell(recPos, field, setText)\n    },\n    inputBoxBlur () {\n      if (this.$refs.dpContainer.querySelector(':hover')) return\n      if (this.inputBoxChanged) {\n        this.inputCellWrite(this.inputBox.value)\n        this.inputBoxChanged = false\n      }\n      this.inputBoxShow = 0\n      this.focused = false\n      this.showDatePicker = false\n      if (this.currentRowPos !== -1) {\n        this.recordBody.children[this.currentRowPos].children[0].classList.remove('focus')\n        this.labelTr.children[this.currentColPos + 1].classList.remove('focus')\n      }\n    },\n    hashCode (s) {\n      return s.split('').reduce((a, b) => {\n        return a = ((a << 5) - a) + b.charCodeAt(0) | 0\n      }, 0)\n    },\n    lazy (p, delay, p1) {\n      if (typeof p !== 'function') return this.lazyBuf(p, delay, p1)\n      if (!delay) delay = 20\n      const hash = this.hashCode(p.name + p.toString())\n      if (this.lazyTimeout[hash]) clearTimeout(this.lazyTimeout[hash])\n      this.lazyTimeout[hash] = setTimeout(() => {\n        p()\n        delete this.lazyTimeout[hash]\n      }, delay)\n    },\n    lazyBuf (item, p, delay) {\n      if (!delay) delay = 20\n      const hash = this.hashCode(p.name + p.toString())\n      if (this.lazyBuffer[hash])\n        this.lazyBuffer[hash].push(item)\n      else\n        this.lazyBuffer[hash] = [item]\n\n      if (this.lazyTimeout[hash]) clearTimeout(this.lazyTimeout[hash])\n      this.lazyTimeout[hash] = setTimeout(() => {\n        p(this.lazyBuffer[hash])\n        delete this.lazyTimeout[hash]\n        delete this.lazyBuffer[hash]\n      }, delay)\n    }\n    /*\n    selStart (target) {\n      this.selTarget = target\n      this.selx = Array.from(target.parentNode.children).indexOf(target) - 1\n      this.sely = target.parentNode.getAttribute('pos')\n    },\n    selProcess (target) {\n      if (target === null) return\n      // const x = Array.from(target.parentNode.children).indexOf(target) - 1\n      // const y = target.parentNode.getAttribute('pos')\n      this.selEnd(target)\n    },\n    selEnd (target) {\n      if (target !== null && target !== this.selTarget) {\n        const st = this.selTarget.getBoundingClientRect()\n        const ed = target.getBoundingClientRect()\n\n        if (this.selSquare === null) {\n          this.selSquare = document.createElement('div')\n          document.body.appendChild(this.selSquare)\n        }\n\n        const left = Math.min(st.left, ed.left) - 1\n        const top = Math.min(st.top, ed.top) - 1\n        const width = Math.max(ed.right - st.left, st.right - ed.left) + 2\n        const height = Math.max(ed.bottom - st.top, st.bottom - ed.top) + 2\n\n        this.selSquare.setAttribute('style', `\n          left: ${left}px;\n          top: ${top}px;\n          width: ${width}px;\n          height: ${height}px;\n          position: absolute;\n          border: 2px solid #999966;\n          'z-index': 1000;\n          background-color: #35456755;\n          display: block;\n          pointer-events: none;\n        `)\n      }\n    }\n    */\n  }\n}\n</script>\n\n<style scoped>\ninput:focus, input:active:focus, input.active:focus {\n  outline: none;\n  box-shadow: inset 0 -1px 0 #ddd;\n}\n*, *::before, *::after {\n  box-sizing: border-box;\n}\n.input-square {\n  position: absolute;\n  padding: 0;\n  z-index: 4;\n  border: 2px solid rgb(108, 143, 108);\n  /* transition: all 0.04s linear; */\n}\n.no-transition {\n  transition: none !important;\n}\n.autocomplete-results {\n  z-index: 15;\n  position: fixed;\n  padding: 3px;\n  margin: -1px;\n  background-color: lightyellow;\n  border: 1px solid rgb(108, 143, 108);\n  height: fit-content;\n  font-size: 0.88rem;\n  max-width: 300px;\n}\n.autocomplete-result {\n  list-style: none;\n  text-align: left;\n  padding: 4px 2px;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  cursor: pointer\n}\n.autocomplete-result.select {\n  background-color: lightsteelblue;\n}\n.rb-square {\n  width: 9px;\n  height: 9px;\n  border-top: 2px solid white;\n  border-left: 2px solid white;\n  border-bottom: 0;\n  border-right: 0;\n  background-color:rgb(108, 143, 108);\n  position: absolute;\n  bottom: -3px;\n  right: -2px;\n  cursor: crosshair;\n}\n.input-box {\n  opacity: 0;\n  font-family: inherit;\n  color: inherit;\n  text-shadow: inherit;\n  font-size: 0.88rem;\n  width: 100%;\n  height: 100%;\n  border: 0;\n  resize: none;\n  white-space: nowrap;\n  overflow: hidden;\n  background: white;\n}\n.component-content {\n  display: flex;\n  flex-flow: column;\n  position: relative;\n  max-width:fit-content;\n  word-spacing: 0.02rem;\n  line-height: 1.1;\n  overflow: hidden;\n  border: 1px solid lightgray;\n}\n.center-text {\n  text-align: center;\n}\n.table-content {\n  flex: 1 1 auto;\n  font-size: 1rem;\n  text-shadow: 0.3px 0.3px 1px #ccc;\n  overflow: scroll;\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -khtml-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  position: relative;\n  width: 100%;\n  scrollbar-width: none;\n}\n.table-content :focus {\n  outline: none;\n}\n.table-content::-webkit-scrollbar {\n  background: white;\n  width: 0;\n  height: 0;\n}\n.table-content.no-footer {\n  border-bottom: 0;\n}\n.table-content.no-footer::-webkit-scrollbar {\n  height: 0;\n}\n.table-content::-webkit-scrollbar-thumb {\n  background: #eeee;\n}\n.table-content::-webkit-scrollbar-thumb:hover {\n  background: #9999;\n}\n.systable {\n  z-index: -1;\n  width: fit-content;\n  border: 0;\n  border-collapse: separate;\n  border-spacing: 0;\n  margin-bottom: 0;\n  /* margin-left: 40px; */\n}\n.systable .last-col {\n  width: 12px;\n}\n.systable.no-number {\n  margin-left: 0 !important;\n}\n.systable tbody tr {\n  background-color: white;\n  text-align: left;\n}\n.systable tr.select td {\n  background-color: darkgrey !important;\n}\n.systable th, .systable td {\n  vertical-align: bottom;\n  padding: 0.2rem 0.3rem;\n  font-size: 0.88rem;\n  height: 24px;\n  border-top: 0;\n  border-left: 0;\n}\n.systable th:not(:last-child) {\n  border-right: 1px solid lightgray;\n}\n.systable tbody td {\n  cursor: cell;\n  white-space: nowrap;\n  overflow-x: hidden;\n  text-overflow: ellipsis;\n  /* animation: fadein 0.2s; */\n}\n.systable tbody td.error {\n  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAAXNSR0IArs4c6QAAAAlwSFlzAAAXEgAAFxIBZ5/SUgAAAGZJREFUOBGlzjsOgDAMA9CwcQSO0PtP3K64Qyugv8S2ZMXTUw5DstmFk8qWAuhEbzSzbQ+oWIPKULAPpGAdxGJDiMGmUBRbQhFsC3kxF+TB3NAOC0ErLAzNMAoaYTT0xyTojclQxR5H5B1HhuS+WAAAAABJRU5ErkJggg==');\n  background-repeat: no-repeat;\n  background-size: 8px 8px;\n  background-position: right 0px top 0px;\n}\n.systable tbody tr:not(:last-child) td {\n  border-bottom: 1px solid lightgray;\n}\n.systable td:not(:last-child) {\n  border-right: 1px solid lightgray;\n}\n.systable thead th, .systable thead td {\n  padding: 0.4rem 0.3rem;\n  font-weight: 400;\n  top: 0;\n  height: 29px;\n  position: sticky;\n  z-index: 5;\n  border-bottom: 1px solid lightgray;\n}\n.systable thead th {\n  background-color: #e9ecef !important;\n  cursor: s-resize;\n  z-index: 6;\n}\n.systable thead td.column-filter {\n  text-align: left;\n  background-color: #fffff2;\n  white-space: nowrap;\n  overflow-x: hidden;\n  text-overflow: ellipsis;\n}\n.systable th.focus {\n  border-bottom: 1px solid rgb(61, 85, 61) !important;\n}\n.systable td.first-col.focus {\n  border-right: 1px solid rgb(61, 85, 61) !important;\n}\n.systable tbody td.select:not(.readonly) {\n  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAMAAABhEH5lAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAASUExURQAAANra2tfX19ra2tnZ2dnZ2c8lDs8AAAAFdFJOUwAwQL/PKlwehgAAAAlwSFlzAAAXEQAAFxEByibzPwAAAEdJREFUKFNdyskBACAIA8F49d+yiBEh+9rHYC5poPGiDmUDUGZI2EHCHBV2UWFEiT2UWKBgHwVLiCwjsoKcVeRMkDFFxoiADdH4AyvGhvOPAAAAAElFTkSuQmCC');\n  background-repeat: no-repeat;\n  background-size: 8px 8px;\n  background-position: right 5px top 8px;\n}\n.systable tbody td.datepick:not(.readonly) {\n  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAMAAABhEH5lAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAASUExURQAAANra2tfX19ra2tnZ2dnZ2c8lDs8AAAAFdFJOUwAwQL/PKlwehgAAAAlwSFlzAAAXEQAAFxEByibzPwAAAEdJREFUKFNdyskBACAIA8F49d+yiBEh+9rHYC5poPGiDmUDUGZI2EHCHBV2UWFEiT2UWKBgHwVLiCwjsoKcVeRMkDFFxoiADdH4AyvGhvOPAAAAAElFTkSuQmCC');\n  background-repeat: no-repeat;\n  background-size: 8px 8px;\n  background-position: right 5px top 8px;\n}\n.systable .first-col {\n  background:#e9ecef;\n  width: 40px;\n  position: sticky;\n  left: 0;\n  top: auto;\n  cursor: e-resize !important;\n  text-overflow: inherit !important;\n  text-align: center;\n  overflow: hidden;\n  z-index: 5;\n}\n.systable .sticky-column {\n  position: sticky;\n  z-index: 2;\n  background-color: white;\n}\n.systable thead th.sticky-column {\n  z-index: 7;\n}\n.systable thead td.sticky-column {\n  z-index: 6;\n}\n.systable thead .tl-setting {\n  /*\n  display: flex;\n  flex-direction: column-reverse;\n  height: 100%;\n  */\n}\n.systable thead td.first-col, .systable thead th.first-col {\n  cursor: pointer !important;\n  z-index: 10;\n}\n.systable tfoot .row-summary {\n  height: 25px;\n  border-right: 0;\n  border-top: 1px solid lightgray;\n  position: sticky;\n  bottom: 0;\n  z-index: 4;\n  background: #fffff2;\n}\n.systable tfoot .row-summary.sticky-column {\n  z-index: 5;\n}\n.systable tfoot .row-summary.summary-column1 {\n  border-right: 1px solid lightgray;\n}\n.systable tfoot .row-summary.summary-column2 {\n  border-right: 1px solid lightgray;\n  background: white;\n}\n.systable tfoot .row-summary:last-child {\n  border-right: 0 !important;\n}\n.systable tfoot .row-summary.first-col {\n  height: 25px;\n  border-top: 1px solid lightgray;\n  border-right: 1px solid lightgray;\n  background: #e9ecef;\n  position: sticky;\n  left: 0;\n  top: auto;\n  z-index: 6;\n}\n.footer {\n  z-index: 5;\n  padding: 0;\n  font-size: 12px;\n  color: dimgray;\n  background-color: white;\n  width: 100%;\n  height: 25px;\n  line-height: 2.3;\n  border-top: 1px solid lightgray;\n  user-select: none;\n}\n.footer .left-block {\n  position: absolute;\n  left: 0;\n  height: 25px;\n  width: 40px;\n  background-color: #e9ecef;\n  border-right: 1px solid lightgray;\n}\n.scroll-bar {\n  z-index: -1;\n  position: absolute;\n  background-color: #f4f6f9;\n  height: 25px;\n  margin-left: 40px;\n  width: 65%;\n  cursor: pointer;\n}\n.scroll-bar:hover, .scroll-bar.focus, .footer:hover .scroll-bar {\n  background-color: lightgray;\n}\n\n.footer a {\n  cursor: pointer;\n  color: #007bff;\n}\n.footer a.disabled {\n  cursor: not-allowed;\n  color: gray;\n  pointer-events: none;\n}\n.footer a:hover {\n  text-decoration: underline;\n}\n.v-scroll {\n  display: inline-block;\n  position: absolute;\n  right: 0;\n  width: 13px;\n  z-index: 5;\n  background-color: white;\n  border-left: 1px solid lightgray;\n  user-select: none;\n}\n.v-scroll-button {\n  display: inline-block;\n  width: 100%;\n  z-index: 10;\n  background-color: #f4f6f9;\n  cursor: pointer;\n}\n.v-scroll-button.focus, .v-scroll-button:hover, .v-scroll:hover .v-scroll-button {\n  background-color: lightgray;\n}\n\n.front-drop {\n  position: fixed;\n  opacity: 0.4;\n  display:flex;\n  justify-content:center;\n  align-items:center;\n  background-color: #55555555;\n  color: white;\n  z-index: 1000;\n}\na:disabled {\n  cursor: not-allowed;\n  color: gray;\n  pointer-events: none;\n}\n.col-sep {\n  position: absolute;\n  top: 0;\n  right: 0;\n  width: 5px;\n  cursor: col-resize;\n  height: 100%;\n  z-index: 15;\n}\n.sort-asc-sign {\n  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAMAAADzN3VRAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAeUExURQAAAK+np6+qqq+rq62pqa+rq6+rq6+srK+rq6+rq2v5ERwAAAAJdFJOUwAgYHCAv8/f71KXockAAAAJcEhZcwAAFxEAABcRAcom8z8AAABNSURBVChT7clRAoAgCATRtTLq/hcuBEN0j9B8zoNV76j6s37hsh+a+NWknQ3l8pGTAk4KlAwIdVgoYKIREmUYaIaPVnBi0IjDS2cA8AC8JAq/VhDqzAAAAABJRU5ErkJggg==');\n  background-repeat: no-repeat;\n  background-size: 9px 9px;\n  background-position: right 5px top 5px;\n}\n.sort-des-sign {\n  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAYCAMAAAA4a6b0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAkUExURQAAAK+np6+qqq+rq6+pqa+qqq+rq6+rq6+rq6+srK+rq6+rqzDc2iQAAAALdFJOUwAgMEBQYHC/z9/v4u0IugAAAAlwSFlzAAAXEQAAFxEByibzPwAAAFVJREFUKFPtyVEWgCAIRFHC1HL2v98o53SEWELvC+bK0nYor5CeGCkZICUdBhkRjAoX9oLlqCzgyAOwc5caAKgT2gdIGQDNgGfM6Knzv+vcZr8kInIBUrIMxVKQeVsAAAAASUVORK5CYII=');\n  background-repeat: no-repeat;\n  background-size: 9px 9px;\n  background-position: right 5px top 5px;\n}\n.filter-sign {\n  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAlCAMAAABiU6n+AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAhUExURQAAAK+vr6+np6+qqq+pqa+qqq2pqa+srK+srK+rq6+rq01/tHwAAAAKdFJOUwAQIDBQYICv3+8SoWj4AAAACXBIWXMAABcRAAAXEQHKJvM/AAAAiUlEQVQ4T+3OOxaAMAhEUfwmsv8FazLjMRBiZ+er4ExzJelLSSZeUccisvMO2uUq8+nKU5lXfl1bWWWkS1gHuuJCoa66UKCDCwU6ulCnu13I6x4XcrrGhYyudSGjMy7U6KwLPTrvQhwDV42jaueqcVTl7+L4zzaO386Zv+teZ/6u9xXzcK2zXUVOdLIT4IImCksAAAAASUVORK5CYII=');\n  background-repeat: no-repeat;\n  background-size: 9px 9px;\n  background-position: right 0px bottom 0px;\n}\n.hide {\n  display: none !important;\n}\n@keyframes fadein {\n  from {opacity: 0}\n  to {opacity: 1}\n}\n\n.fa-spin {\n  -webkit-animation: fa-spin 2s infinite linear;\n  animation: fa-spin 2s infinite linear;\n}\n.svg-inline--fa.fa-w-14 {\n  width: 0.875em;\n}\n.svg-inline--fa.fa-w-16 {\n  width: 1em;\n}\n.svg-inline--fa.fa-fw {\n  width: 1.25em;\n}\n.svg-inline--fa {\n  display: inline-block;\n  font-size: inherit;\n  height: 1em;\n  overflow: visible;\n  vertical-align: -0.125em;\n}\n.fa-fw {\n  text-align: center;\n  width: 1.25em;\n}\n.fa-xs {\n  font-size: 0.75em;\n}\n.fa-sm {\n  font-size: 0.875em;\n}\n.fa-3x {\n  font-size: 3em;\n}\n.tool-tip {\n  display: inline-block;\n  position: fixed;\n  color: white;\n  background-color: red;\n  padding: 0.5rem;\n  min-height: 1rem;\n  max-width: 200px;\n  word-wrap: break-word;\n  border-radius: 4px;\n  z-index: 50;\n}\n.tool-tip:before {\n  content: '';\n  display: block;\n  width: 0;\n  height: 0;\n  position: absolute;\n  border-top: 8px solid transparent;\n  border-bottom: 8px solid transparent;\n  border-right: 8px solid red;\n  left: -8px;\n  top: 8px;\n}\n</style>\n"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$b = "data-v-6256b554";
  /* module identifier */
  const __vue_module_identifier__$b = undefined;
  /* functional template */
  const __vue_is_functional_template__$b = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$4 = normalizeComponent(
    { render: __vue_render__$b, staticRenderFns: __vue_staticRenderFns__$b },
    __vue_inject_styles__$b,
    __vue_script__$9,
    __vue_scope_id__$b,
    __vue_is_functional_template__$b,
    __vue_module_identifier__$b,
    false,
    createInjector,
    undefined,
    undefined
  );

//
var script$a = {
  props: {
    field: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: null
    },
    type: {
      type: String,
      default: 'string'
    },
    validate: {
      type: Function,
      default: null
    },
    initStyle: {
      type: Object,

      default() {
        return {};
      }

    },
    width: {
      type: String,
      default: '100px'
    },
    invisible: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: null
    },
    textTransform: {
      type: String,
      default: null
    },
    // replace uppercase prop
    textAlign: {
      type: String,
      default: null
    },
    keyField: {
      type: Boolean,
      default: false
    },
    sticky: {
      type: Boolean,
      default: false
    },
    allowKeys: {
      type: Array,

      default() {
        return null;
      }

    },
    mandatory: {
      type: Boolean,
      default: false
    },
    lengthLimit: {
      type: Number,
      default: 0
    },
    autocomplete: {
      type: Boolean,
      default: null
    },
    pos: {
      type: Number,
      default: 0
    },
    options: {
      type: Array,

      default() {
        return [];
      }

    },
    summary: {
      type: String,
      default: null
    },
    toValue: {
      type: Function,

      default(text) {
        switch (this.textTransform) {
          case 'uppercase':
            text = text.toUpperCase();
            break;

          case 'lowercase':
            text = text.toLowerCase();
            break;
        }

        switch (this.type) {
          case 'datetick':
            return moment(text, 'YY-MM-DD').valueOf();

          case 'datetimetick':
            return moment(text, 'YY-MM-DD HH:mm').valueOf();

          case 'datetimesectick':
            return moment(text, 'YY-MM-DD HH:mm:ss').valueOf();

          case 'check10':
          case 'checkYN':
          case 'checkTF':
            return text.toUpperCase();

          default:
            return text;
        }
      }

    },
    toText: {
      type: Function,

      default(val) {
        // § magic to hide the temp key
        if (this.keyField && val && val.startsWith('§')) return '';

        switch (this.type) {
          case 'datetick':
            return moment(Number(val)).format('YY-MM-DD');

          case 'datetimetick':
            return moment(Number(val)).format('YY-MM-DD HH:mm');

          case 'datetimesectick':
            return moment(Number(val)).format('YY-MM-DD HH:mm:ss');

          default:
            return val;
        }
      }

    }
  },

  created() {
    let style = this.initStyle;
    let validate = this.validate;
    let allowKeys = this.allowKeys;
    let lengthLimit = this.lengthLimit;

    switch (this.type) {
      case 'number':
        style.textAlign = 'right';
        allowKeys = allowKeys || ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '-'];
        break;

      case 'date':
        allowKeys = allowKeys || ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '-'];
        if (!validate) validate = val => {
          if (!moment(val, 'YYYY-MM-DD', true).isValid()) return this.$parent.localizedLabel.invalidInputValue;
          return '';
        };
        break;

      case 'datetime':
        allowKeys = allowKeys || ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '-', ' ', ':'];
        if (!validate) validate = val => {
          if (!moment(val, 'YY-MM-DD hh:mm', true).isValid()) return this.$parent.localizedLabel.invalidInputValue;
          return '';
        };
        break;

      case 'datetimesec':
        allowKeys = allowKeys || ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '-', ' ', ':'];
        if (!validate) validate = val => {
          if (!moment(val, 'YY-MM-DD hh:mm:ss', true).isValid()) return this.$parent.localizedLabel.invalidInputValue;
          return '';
        };
        break;

      case 'datetick':
        allowKeys = allowKeys || ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '-', ' ', ':'];
        break;

      case 'datetimetick':
        allowKeys = allowKeys || ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '-', ' ', ':'];
        break;

      case 'datetimesectick':
        allowKeys = allowKeys || ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '-', ' ', ':'];
        break;

      case 'check10':
        style.textAlign = 'center';
        style.textTransform = 'uppercase';
        allowKeys = allowKeys || ['0', '1'];
        lengthLimit = lengthLimit || 1;
        break;

      case 'checkYN':
        style.textAlign = 'center';
        style.textTransform = 'uppercase';
        allowKeys = allowKeys || ['Y', 'N'];
        lengthLimit = lengthLimit || 1;
        break;

      case 'checkTF':
        style.textAlign = 'center';
        style.textTransform = 'uppercase';
        allowKeys = allowKeys || ['T', 'F'];
        lengthLimit = lengthLimit || 1;
        break;

      case 'select':
      case 'string':
        break;

      default:
        throw new Error('VueExcelColumn: Not supported type:' + this.type);
    }

    if (this.textTransform) style.textTransform = this.textTransform;
    if (this.textAlign) style.textAlign = this.textAlign;
    if (this.readonly && this.$parent.readonlyStyle) style = Object.assign(style, this.$parent.readonlyStyle);
    this.$parent.registerColumn({
      name: this.field,
      label: this.label === null ? this.field : this.label,
      type: this.type,
      width: this.width,
      validate: validate,
      keyField: this.keyField,
      sticky: this.sticky,
      allowKeys: allowKeys,
      mandatory: this.mandatory,
      lengthLimit: Number(lengthLimit),
      autocomplete: this.autocomplete === null ? this.$parent.autocomplete : this.autocomplete,
      initStyle: style,
      invisible: this.invisible,
      readonly: this.readonly === null ? this.$parent.readonly : this.readonly,
      pos: Number(this.pos),
      options: this.options,
      summary: this.summary,
      toValue: this.toValue,
      toText: this.toText
    });
  }

};

/* script */
const __vue_script__$a = script$a;

/* template */
var __vue_render__$c = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div")
};
var __vue_staticRenderFns__$c = [];
__vue_render__$c._withStripped = true;

  /* style */
  const __vue_inject_styles__$c = undefined;
  /* scoped */
  const __vue_scope_id__$c = undefined;
  /* module identifier */
  const __vue_module_identifier__$c = undefined;
  /* functional template */
  const __vue_is_functional_template__$c = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$5 = normalizeComponent(
    { render: __vue_render__$c, staticRenderFns: __vue_staticRenderFns__$c },
    __vue_inject_styles__$c,
    __vue_script__$a,
    __vue_scope_id__$c,
    __vue_is_functional_template__$c,
    __vue_module_identifier__$c,
    false,
    undefined,
    undefined,
    undefined
  );

// index.js
var main = {
  install(Vue) {
    Vue.component('vue-excel-editor', __vue_component__$4);
    Vue.component('vue-excel-column', __vue_component__$5);
    Vue.mixin({
      created() {// do something you like
      }

    });
  }

};

export default main;

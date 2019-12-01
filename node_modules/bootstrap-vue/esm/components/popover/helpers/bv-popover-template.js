import Vue from '../../../utils/vue';
import { isFunction, isUndefinedOrNull } from '../../../utils/inspect';
import { BVTooltipTemplate } from '../../tooltip/helpers/bv-tooltip-template';
var NAME = 'BVPopoverTemplate'; // @vue/component

export var BVPopoverTemplate =
/*#__PURE__*/
Vue.extend({
  name: NAME,
  extends: BVTooltipTemplate,
  computed: {
    templateType: function templateType() {
      return 'popover';
    }
  },
  methods: {
    renderTemplate: function renderTemplate(h) {
      // Title and content could be a scoped slot function
      var $title = isFunction(this.title) ? this.title({}) : this.title;
      var $content = isFunction(this.content) ? this.content({}) : this.content; // Directive usage only

      var titleDomProps = this.html && !isFunction(this.title) ? {
        innerHTML: this.title
      } : {};
      var contentDomProps = this.html && !isFunction(this.content) ? {
        innerHTML: this.content
      } : {};
      return h('div', {
        staticClass: 'popover b-popover',
        class: this.templateClasses,
        attrs: this.templateAttributes,
        on: this.templateListeners
      }, [h('div', {
        ref: 'arrow',
        staticClass: 'arrow'
      }), isUndefinedOrNull($title) || $title === '' ? h() : h('h3', {
        staticClass: 'popover-header',
        domProps: titleDomProps
      }, [$title]), isUndefinedOrNull($content) || $content === '' ? h() : h('div', {
        staticClass: 'popover-body',
        domProps: contentDomProps
      }, [$content])]);
    }
  }
});
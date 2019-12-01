import Vue from '../../utils/vue';
import getScopId from '../../utils/get-scope-id';
import { isArray, arrayIncludes } from '../../utils/array';
import { getComponentConfig } from '../../utils/config';
import { isString, isUndefinedOrNull } from '../../utils/inspect';
import { HTMLElement, SVGElement } from '../../utils/safe-types';
import { BVTooltip } from './helpers/bv-tooltip';
var NAME = 'BTooltip'; // @vue/component

export var BTooltip =
/*#__PURE__*/
Vue.extend({
  name: NAME,
  props: {
    title: {
      type: String // default: undefined

    },
    // Added in by BPopover
    // content: {
    //   type: String,
    //   default: undefined
    // },
    target: {
      // String ID of element, or element/component reference
      // Or function that returns one of the above
      type: [String, HTMLElement, SVGElement, Function, Object],
      // default: undefined,
      required: true
    },
    triggers: {
      type: [String, Array],
      default: 'hover focus'
    },
    placement: {
      type: String,
      default: 'top'
    },
    fallbackPlacement: {
      type: [String, Array],
      default: 'flip',
      validator: function validator(value) {
        return isArray(value) && value.every(function (v) {
          return isString(v);
        }) || arrayIncludes(['flip', 'clockwise', 'counterclockwise'], value);
      }
    },
    variant: {
      type: String,
      default: function _default() {
        return getComponentConfig(NAME, 'variant');
      }
    },
    customClass: {
      type: String,
      default: function _default() {
        return getComponentConfig(NAME, 'customClass');
      }
    },
    delay: {
      type: [Number, Object, String],
      default: function _default() {
        return getComponentConfig(NAME, 'delay');
      }
    },
    boundary: {
      // String: scrollParent, window, or viewport
      // Element: element reference
      // Object: Vue component
      type: [String, HTMLElement, Object],
      default: function _default() {
        return getComponentConfig(NAME, 'boundary');
      }
    },
    boundaryPadding: {
      type: [Number, String],
      default: function _default() {
        return getComponentConfig(NAME, 'boundaryPadding');
      }
    },
    offset: {
      type: [Number, String],
      default: 0
    },
    noFade: {
      type: Boolean,
      default: false
    },
    container: {
      // String: HTML ID of container, if null body is used (default)
      // HTMLElement: element reference reference
      // Object: Vue Component
      type: [String, HTMLElement, Object] // default: undefined

    },
    show: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    id: {
      // ID to use for tooltip element
      // If not provided on will automatically be generated
      type: String,
      default: null
    }
  },
  data: function data() {
    return {
      localShow: this.show,
      localTitle: '',
      localContent: ''
    };
  },
  computed: {
    templateData: function templateData() {
      // Data that will be passed to the template and popper
      return {
        // We use massaged versions of the title and content props/slots
        title: this.localTitle,
        content: this.localContent,
        // Pass these props as is
        target: this.target,
        triggers: this.triggers,
        placement: this.placement,
        fallbackPlacement: this.fallbackPlacement,
        variant: this.variant,
        customClass: this.customClass,
        container: this.container,
        boundary: this.boundary,
        boundaryPadding: this.boundaryPadding,
        delay: this.delay,
        offset: this.offset,
        noFade: this.noFade,
        disabled: this.disabled,
        id: this.id
      };
    },
    templateTitleContent: function templateTitleContent() {
      // Used to watch for changes to the title and content props
      return {
        title: this.title,
        content: this.content
      };
    }
  },
  watch: {
    show: function show(_show, oldVal) {
      if (_show !== oldVal && _show !== this.localShow && this.$_bv_toolpop) {
        if (_show) {
          this.$_bv_toolpop.show();
        } else {
          // We use `forceHide()` to override any active triggers
          this.$_bv_toolpop.forceHide();
        }
      }
    },
    disabled: function disabled(newVal, oldVal) {
      if (newVal) {
        this.doDisable();
      } else {
        this.doEnable();
      }
    },
    localShow: function localShow(show, oldVal) {
      // TODO: May need to be done in a `$nextTick()`
      this.$emit('update:show', show);
    },
    templateData: function templateData(newVal, oldVal) {
      var _this = this;

      this.$nextTick(function () {
        if (_this.$_bv_toolpop) {
          _this.$_bv_toolpop.updateData(_this.templateData);
        }
      });
    },
    // Watchers for title/content props (prop changes do not trigger the `updated()` hook)
    templateTitleContent: function templateTitleContent(newVal, oldVal) {
      this.$nextTick(this.updateContent);
    }
  },
  created: function created() {
    // Non reactive properties
    this.$_bv_toolpop = null;
  },
  updated: function updated() {
    // Update the `propData` object
    // Done in a `$nextTick()` to ensure slot(s) have updated
    this.$nextTick(this.updateContent);
  },
  beforeDestroy: function beforeDestroy() {
    // Shutdown our local event listeners
    this.$off('open', this.doOpen);
    this.$off('close', this.doClose);
    this.$off('disable', this.doDisable);
    this.$off('enable', this.doEnable); // Destroy the tip instance

    this.$_bv_toolpop && this.$_bv_toolpop.$destroy();
    this.$_bv_toolpop = null;
  },
  mounted: function mounted() {
    var _this2 = this;

    // Instantiate a new BVTooltip instance
    // Done in a `$nextTick()` to ensure DOM has completed rendering
    // so that target can be found
    this.$nextTick(function () {
      // Load the on demand child instance
      var Component = _this2.getComponent(); // Ensure we have initial content


      _this2.updateContent(); // Pass down the scoped style attribute if available


      var scopeId = getScopId(_this2) || getScopId(_this2.$parent); // Create the instance

      var $toolpop = _this2.$_bv_toolpop = new Component({
        parent: _this2,
        // Pass down the scoped style ID
        _scopeId: scopeId || undefined
      }); // Set the initial data

      $toolpop.updateData(_this2.templateData); // Set listeners

      $toolpop.$on('show', _this2.onShow);
      $toolpop.$on('shown', _this2.onShown);
      $toolpop.$on('hide', _this2.onHide);
      $toolpop.$on('hidden', _this2.onHidden);
      $toolpop.$on('disabled', _this2.onDisabled);
      $toolpop.$on('enabled', _this2.onEnabled); // Initially disabled?

      if (_this2.disabled) {
        // Initially disabled
        _this2.doDisable();
      } // Listen to open signals from others


      _this2.$on('open', _this2.doOpen); // Listen to close signals from others


      _this2.$on('close', _this2.doClose); // Listen to disable signals from others


      _this2.$on('disable', _this2.doDisable); // Listen to enable signals from others


      _this2.$on('enable', _this2.doEnable); // Initially show tooltip?


      if (_this2.localShow) {
        _this2.$_bv_toolpop && _this2.$_bv_toolpop.show();
      }
    });
  },
  methods: {
    getComponent: function getComponent() {
      // Overridden by BPopover
      return BVTooltip;
    },
    updateContent: function updateContent() {
      // Overridden by BPopover
      // Tooltip: Default slot is `title`
      // Popover: Default slot is `content`, `title` slot is title
      // We pass a scoped slot function reference by default (Vue v2.6x)
      // And pass the title prop as a fallback
      this.setTitle(this.$scopedSlots.default || this.title);
    },
    // Helper methods for `updateContent()`
    setTitle: function setTitle(val) {
      val = isUndefinedOrNull(val) ? '' : val; // We only update the value if it has changed

      if (this.localTitle !== val) {
        this.localTitle = val;
      }
    },
    setContent: function setContent(val) {
      val = isUndefinedOrNull(val) ? '' : val; // We only update the value if it has changed

      if (this.localContent !== val) {
        this.localContent = val;
      }
    },
    // --- Template event handlers ---
    onShow: function onShow(bvEvt) {
      // Placeholder
      this.$emit('show', bvEvt);

      if (bvEvt) {
        this.localShow = !bvEvt.defaultPrevented;
      }
    },
    onShown: function onShown(bvEvt) {
      // Tip is now showing
      this.localShow = true;
      this.$emit('shown', bvEvt);
    },
    onHide: function onHide(bvEvt) {
      this.$emit('hide', bvEvt);
    },
    onHidden: function onHidden(bvEvt) {
      // Tip is no longer showing
      this.$emit('hidden', bvEvt);
      this.localShow = false;
    },
    onDisabled: function onDisabled(bvEvt) {
      // Prevent possible endless loop if user mistakenly
      // fires `disabled` instead of `disable`
      if (bvEvt && bvEvt.type === 'disabled') {
        this.$emit('update:disabled', true);
        this.$emit('disabled', bvEvt);
      }
    },
    onEnabled: function onEnabled(bvEvt) {
      // Prevent possible endless loop if user mistakenly
      // fires `enabled` instead of `enable`
      if (bvEvt && bvEvt.type === 'enabled') {
        this.$emit('update:disabled', false);
        this.$emit('enabled', bvEvt);
      }
    },
    // --- Local event listeners ---
    doOpen: function doOpen() {
      !this.localShow && this.$_bv_toolpop && this.$_bv_toolpop.show();
    },
    doClose: function doClose() {
      this.localShow && this.$_bv_toolpop && this.$_bv_toolpop.hide();
    },
    doDisable: function doDisable(evt) {
      this.$_bv_toolpop && this.$_bv_toolpop.disable();
    },
    doEnable: function doEnable() {
      this.$_bv_toolpop && this.$_bv_toolpop.enable();
    }
  },
  render: function render(h) {
    // Always renders a comment node
    // TODO:
    //   Future: Possibly render a target slot (single root element)
    //   which we can apply the listeners to (pass `this.$el` to BVTooltip)
    return h();
  }
});
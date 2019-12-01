// Popover "Class" (Built as a renderless Vue instance)
// Inherits from BVTooltip
//
// Handles trigger events, etc.
// Instantiates template on demand
import Vue from '../../../utils/vue';
import { BVTooltip } from '../../tooltip/helpers/bv-tooltip';
import { BVPopoverTemplate } from './bv-popover-template';
var NAME = 'BVPopover'; // @vue/component

export var BVPopover =
/*#__PURE__*/
Vue.extend({
  name: NAME,
  extends: BVTooltip,
  computed: {
    // Overwrites BVTooltip
    templateType: function templateType() {
      return 'popover';
    }
  },
  methods: {
    getTemplate: function getTemplate() {
      // Overwrites BVTooltip
      return BVPopoverTemplate;
    }
  }
});
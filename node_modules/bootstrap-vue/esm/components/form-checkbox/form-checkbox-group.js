import Vue from '../../utils/vue';
import idMixin from '../../mixins/id';
import formMixin from '../../mixins/form';
import formOptionsMixin from '../../mixins/form-options';
import formRadioCheckGroupMixin from '../../mixins/form-radio-check-group';
import formSizeMixin from '../../mixins/form-size';
import formStateMixin from '../../mixins/form-state';
export var props = {
  switches: {
    // Custom switch styling
    type: Boolean,
    default: false
  },
  checked: {
    type: Array,
    default: null
  }
}; // @vue/component

export var BFormCheckboxGroup =
/*#__PURE__*/
Vue.extend({
  name: 'BFormCheckboxGroup',
  mixins: [idMixin, formMixin, formRadioCheckGroupMixin, // Includes render function
  formOptionsMixin, formSizeMixin, formStateMixin],
  provide: function provide() {
    return {
      bvCheckGroup: this
    };
  },
  props: props,
  data: function data() {
    return {
      localChecked: this.checked || []
    };
  },
  computed: {
    isRadioGroup: function isRadioGroup() {
      return false;
    }
  }
});
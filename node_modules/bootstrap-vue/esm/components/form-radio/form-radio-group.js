import Vue from '../../utils/vue';
import idMixin from '../../mixins/id';
import formMixin from '../../mixins/form';
import formOptionsMixin from '../../mixins/form-options';
import formRadioCheckGroupMixin from '../../mixins/form-radio-check-group';
import formSizeMixin from '../../mixins/form-size';
import formStateMixin from '../../mixins/form-state';
export var props = {
  checked: {
    // type: [String, Number, Boolean, Object],
    default: null
  }
}; // @vue/component

export var BFormRadioGroup =
/*#__PURE__*/
Vue.extend({
  name: 'BFormRadioGroup',
  mixins: [idMixin, formMixin, formRadioCheckGroupMixin, // Includes render function
  formOptionsMixin, formSizeMixin, formStateMixin],
  provide: function provide() {
    return {
      bvRadioGroup: this
    };
  },
  props: props,
  data: function data() {
    return {
      localChecked: this.checked
    };
  },
  computed: {
    isRadioGroup: function isRadioGroup() {
      return true;
    }
  }
});
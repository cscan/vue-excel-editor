import Vue from '../../utils/vue';
import { BTd } from './td'; // @vue/component

export var BTh =
/*#__PURE__*/
Vue.extend({
  name: 'BTh',
  extends: BTd,
  computed: {
    tag: function tag() {
      return 'th';
    }
  }
});
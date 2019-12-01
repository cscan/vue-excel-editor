import { hasNormalizedSlot as _hasNormalizedSlot, normalizeSlot as _normalizeSlot } from '../utils/normalize-slot';
import { concat } from '../utils/array';
export default {
  methods: {
    hasNormalizedSlot: function hasNormalizedSlot(names) {
      // Returns true if the either a $scopedSlot or $slot exists with the specified name
      // `names` can be a string name or an array of names
      return _hasNormalizedSlot(names, this.$scopedSlots, this.$slots);
    },
    normalizeSlot: function normalizeSlot(names) {
      var scope = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      // Returns an array of rendered VNodes if slot found.
      // Returns undefined if not found.
      // `names` can be a string name or an array of names
      var vNodes = _normalizeSlot(names, scope, this.$scopedSlots, this.$slots);

      return vNodes ? concat(vNodes) : vNodes;
    }
  }
};
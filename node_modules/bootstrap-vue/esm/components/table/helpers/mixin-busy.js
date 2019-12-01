import { isFunction } from '../../../utils/inspect';
import { BTr } from '../tr';
import { BTd } from '../td';
var busySlotName = 'table-busy';
export default {
  props: {
    busy: {
      type: Boolean,
      default: false
    }
  },
  data: function data() {
    return {
      localBusy: false
    };
  },
  computed: {
    computedBusy: function computedBusy() {
      return this.busy || this.localBusy;
    }
  },
  watch: {
    localBusy: function localBusy(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.$emit('update:busy', newVal);
      }
    }
  },
  methods: {
    // Event handler helper
    stopIfBusy: function stopIfBusy(evt) {
      if (this.computedBusy) {
        // If table is busy (via provider) then don't propagate
        evt.preventDefault();
        evt.stopPropagation();
        return true;
      }

      return false;
    },
    // Render the busy indicator or return `null` if not busy
    renderBusy: function renderBusy() {
      var h = this.$createElement; // Return a busy indicator row, or `null` if not busy

      if (this.computedBusy && this.hasNormalizedSlot(busySlotName)) {
        // Show the busy slot
        return h(BTr, {
          key: 'table-busy-slot',
          staticClass: 'b-table-busy-slot',
          class: [isFunction(this.tbodyTrClass) ? this.tbodyTrClass(null, busySlotName) : this.tbodyTrClass]
        }, [h(BTd, {
          props: {
            colspan: this.computedFields.length || null
          }
        }, [this.normalizeSlot(busySlotName)])]);
      } else {
        // We return `null` here so that we can determine if we need to
        // render the table items rows or not
        return null;
      }
    }
  }
};
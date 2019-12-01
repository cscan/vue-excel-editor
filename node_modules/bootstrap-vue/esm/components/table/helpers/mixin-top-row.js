import { isFunction } from '../../../utils/inspect';
import { BTr } from '../tr';
var slotName = 'top-row';
export default {
  methods: {
    renderTopRow: function renderTopRow() {
      var h = this.$createElement; // Add static Top Row slot (hidden in visibly stacked mode as we can't control the data-label)
      // If in *always* stacked mode, we don't bother rendering the row

      if (!this.hasNormalizedSlot(slotName) || this.stacked === true || this.stacked === '') {
        return h();
      }

      var fields = this.computedFields;
      return h(BTr, {
        key: 'b-top-row',
        staticClass: 'b-table-top-row',
        class: [isFunction(this.tbodyTrClass) ? this.tbodyTrClass(null, 'row-top') : this.tbodyTrClass]
      }, [this.normalizeSlot(slotName, {
        columns: fields.length,
        fields: fields
      })]);
    }
  }
};
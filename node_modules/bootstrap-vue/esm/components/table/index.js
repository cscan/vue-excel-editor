import { BTable } from './table';
import { BTableLite } from './table-lite';
import { BTableSimple } from './table-simple';
import { BTbody } from './tbody';
import { BThead } from './thead';
import { BTfoot } from './tfoot';
import { BTr } from './tr';
import { BTd } from './td';
import { BTh } from './th';
import { pluginFactory } from '../../utils/plugins';
var TableLitePlugin =
/*#__PURE__*/
pluginFactory({
  components: {
    BTableLite: BTableLite
  }
});
var TableSimplePlugin =
/*#__PURE__*/
pluginFactory({
  components: {
    BTableSimple: BTableSimple,
    BTbody: BTbody,
    BThead: BThead,
    BTfoot: BTfoot,
    BTr: BTr,
    BTd: BTd,
    BTh: BTh
  }
});
var TablePlugin =
/*#__PURE__*/
pluginFactory({
  components: {
    BTable: BTable
  },
  plugins: {
    TableLitePlugin: TableLitePlugin,
    TableSimplePlugin: TableSimplePlugin
  }
});
export { // Plugins
TablePlugin, TableLitePlugin, TableSimplePlugin // Table components
, BTable, BTableLite, BTableSimple // Helper components
, BTbody, BThead, BTfoot, BTr, BTd, BTh };
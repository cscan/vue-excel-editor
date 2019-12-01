import { BContainer } from './container';
import { BRow } from './row';
import { BCol } from './col';
import { BFormRow } from './form-row';
import { pluginFactory } from '../../utils/plugins';
var LayoutPlugin =
/*#__PURE__*/
pluginFactory({
  components: {
    BContainer: BContainer,
    BRow: BRow,
    BCol: BCol,
    BFormRow: BFormRow
  }
});
export { LayoutPlugin, BContainer, BRow, BCol, BFormRow };
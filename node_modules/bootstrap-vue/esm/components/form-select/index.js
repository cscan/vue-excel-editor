import { BFormSelect } from './form-select';
import { pluginFactory } from '../../utils/plugins';
var FormSelectPlugin =
/*#__PURE__*/
pluginFactory({
  components: {
    BFormSelect: BFormSelect,
    BSelect: BFormSelect
  }
});
export { FormSelectPlugin, BFormSelect };
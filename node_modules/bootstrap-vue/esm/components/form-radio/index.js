import { BFormRadio } from './form-radio';
import { BFormRadioGroup } from './form-radio-group';
import { pluginFactory } from '../../utils/plugins';
var FormRadioPlugin =
/*#__PURE__*/
pluginFactory({
  components: {
    BFormRadio: BFormRadio,
    BRadio: BFormRadio,
    BFormRadioGroup: BFormRadioGroup,
    BRadioGroup: BFormRadioGroup
  }
});
export { FormRadioPlugin, BFormRadio, BFormRadioGroup };
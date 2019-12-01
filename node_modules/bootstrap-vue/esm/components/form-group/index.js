import { BFormGroup } from './form-group';
import { pluginFactory } from '../../utils/plugins';
var FormGroupPlugin =
/*#__PURE__*/
pluginFactory({
  components: {
    BFormGroup: BFormGroup,
    BFormFieldset: BFormGroup
  }
});
export { FormGroupPlugin, BFormGroup };
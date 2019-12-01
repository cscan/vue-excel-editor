import { BFormCheckbox } from './form-checkbox';
import { BFormCheckboxGroup } from './form-checkbox-group';
import { pluginFactory } from '../../utils/plugins';
var FormCheckboxPlugin =
/*#__PURE__*/
pluginFactory({
  components: {
    BFormCheckbox: BFormCheckbox,
    BCheckbox: BFormCheckbox,
    BCheck: BFormCheckbox,
    BFormCheckboxGroup: BFormCheckboxGroup,
    BCheckboxGroup: BFormCheckboxGroup,
    BCheckGroup: BFormCheckboxGroup
  }
});
export { FormCheckboxPlugin, BFormCheckbox, BFormCheckboxGroup };
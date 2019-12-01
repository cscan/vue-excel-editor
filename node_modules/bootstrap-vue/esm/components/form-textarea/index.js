import { BFormTextarea } from './form-textarea';
import { pluginFactory } from '../../utils/plugins';
var FormTextareaPlugin =
/*#__PURE__*/
pluginFactory({
  components: {
    BFormTextarea: BFormTextarea,
    BTextarea: BFormTextarea
  }
});
export { FormTextareaPlugin, BFormTextarea };
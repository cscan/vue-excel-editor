import { BAlert } from './alert';
import { pluginFactory } from '../../utils/plugins';
var AlertPlugin =
/*#__PURE__*/
pluginFactory({
  components: {
    BAlert: BAlert
  }
});
export { AlertPlugin, BAlert };
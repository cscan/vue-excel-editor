import { BCollapse } from './collapse';
import { VBToggle } from '../../directives/toggle/toggle';
import { pluginFactory } from '../../utils/plugins';
var CollapsePlugin =
/*#__PURE__*/
pluginFactory({
  components: {
    BCollapse: BCollapse
  },
  directives: {
    VBToggle: VBToggle
  }
});
export { CollapsePlugin, BCollapse };
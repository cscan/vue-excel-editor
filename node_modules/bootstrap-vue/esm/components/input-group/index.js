import { BInputGroup } from './input-group';
import { BInputGroupAddon } from './input-group-addon';
import { BInputGroupPrepend } from './input-group-prepend';
import { BInputGroupAppend } from './input-group-append';
import { BInputGroupText } from './input-group-text';
import { pluginFactory } from '../../utils/plugins';
var InputGroupPlugin =
/*#__PURE__*/
pluginFactory({
  components: {
    BInputGroup: BInputGroup,
    BInputGroupAddon: BInputGroupAddon,
    BInputGroupPrepend: BInputGroupPrepend,
    BInputGroupAppend: BInputGroupAppend,
    BInputGroupText: BInputGroupText
  }
});
export { InputGroupPlugin, BInputGroup, BInputGroupAddon, BInputGroupPrepend, BInputGroupAppend, BInputGroupText };
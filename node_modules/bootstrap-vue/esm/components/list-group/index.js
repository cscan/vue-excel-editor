import { BListGroup } from './list-group';
import { BListGroupItem } from './list-group-item';
import { pluginFactory } from '../../utils/plugins';
var ListGroupPlugin =
/*#__PURE__*/
pluginFactory({
  components: {
    BListGroup: BListGroup,
    BListGroupItem: BListGroupItem
  }
});
export { ListGroupPlugin, BListGroup, BListGroupItem };
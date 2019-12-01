import { BTabs } from './tabs';
import { BTab } from './tab';
import { pluginFactory } from '../../utils/plugins';
var TabsPlugin =
/*#__PURE__*/
pluginFactory({
  components: {
    BTabs: BTabs,
    BTab: BTab
  }
});
export { TabsPlugin, BTabs, BTab };
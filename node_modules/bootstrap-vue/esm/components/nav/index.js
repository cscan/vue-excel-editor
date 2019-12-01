import { BNav } from './nav';
import { BNavItem } from './nav-item';
import { BNavText } from './nav-text';
import { BNavForm } from './nav-form';
import { BNavItemDropdown } from './nav-item-dropdown';
import { DropdownPlugin } from '../dropdown';
import { pluginFactory } from '../../utils/plugins';
var NavPlugin =
/*#__PURE__*/
pluginFactory({
  components: {
    BNav: BNav,
    BNavItem: BNavItem,
    BNavText: BNavText,
    BNavForm: BNavForm,
    BNavItemDropdown: BNavItemDropdown,
    BNavItemDd: BNavItemDropdown,
    BNavDropdown: BNavItemDropdown,
    BNavDd: BNavItemDropdown
  },
  plugins: {
    DropdownPlugin: DropdownPlugin
  }
});
export { NavPlugin, BNav, BNavItem, BNavText, BNavForm, BNavItemDropdown };
import { BNavbar } from './navbar';
import { BNavbarNav } from './navbar-nav';
import { BNavbarBrand } from './navbar-brand';
import { BNavbarToggle } from './navbar-toggle';
import { NavPlugin } from '../nav';
import { CollapsePlugin } from '../collapse';
import { DropdownPlugin } from '../dropdown';
import { pluginFactory } from '../../utils/plugins';
var NavbarPlugin =
/*#__PURE__*/
pluginFactory({
  components: {
    BNavbar: BNavbar,
    BNavbarNav: BNavbarNav,
    BNavbarBrand: BNavbarBrand,
    BNavbarToggle: BNavbarToggle,
    BNavToggle: BNavbarToggle
  },
  plugins: {
    NavPlugin: NavPlugin,
    CollapsePlugin: CollapsePlugin,
    DropdownPlugin: DropdownPlugin
  }
});
export { NavbarPlugin, BNavbar, BNavbarNav, BNavbarBrand, BNavbarToggle };
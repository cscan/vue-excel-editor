import { BDropdown } from './dropdown';
import { BDropdownItem } from './dropdown-item';
import { BDropdownItemButton } from './dropdown-item-button';
import { BDropdownHeader } from './dropdown-header';
import { BDropdownDivider } from './dropdown-divider';
import { BDropdownForm } from './dropdown-form';
import { BDropdownText } from './dropdown-text';
import { BDropdownGroup } from './dropdown-group';
import { pluginFactory } from '../../utils/plugins';
var DropdownPlugin =
/*#__PURE__*/
pluginFactory({
  components: {
    BDropdown: BDropdown,
    BDd: BDropdown,
    BDropdownItem: BDropdownItem,
    BDdItem: BDropdownItem,
    BDropdownItemButton: BDropdownItemButton,
    BDropdownItemBtn: BDropdownItemButton,
    BDdItemButton: BDropdownItemButton,
    BDdItemBtn: BDropdownItemButton,
    BDropdownHeader: BDropdownHeader,
    BDdHeader: BDropdownHeader,
    BDropdownDivider: BDropdownDivider,
    BDdDivider: BDropdownDivider,
    BDropdownForm: BDropdownForm,
    BDdForm: BDropdownForm,
    BDropdownText: BDropdownText,
    BDdText: BDropdownText,
    BDropdownGroup: BDropdownGroup,
    BDdGroup: BDropdownGroup
  }
});
export { DropdownPlugin, BDropdown, BDropdownItem, BDropdownItemButton, BDropdownHeader, BDropdownDivider, BDropdownForm, BDropdownText, BDropdownGroup };
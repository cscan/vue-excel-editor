import { BButton } from './button';
import { BButtonClose } from './button-close';
import { pluginFactory } from '../../utils/plugins';
var ButtonPlugin =
/*#__PURE__*/
pluginFactory({
  components: {
    BButton: BButton,
    BBtn: BButton,
    BButtonClose: BButtonClose,
    BBtnClose: BButtonClose
  }
});
export { ButtonPlugin, BButton, BButtonClose };
import { BPopover } from './popover';
import { VBPopoverPlugin } from '../../directives/popover';
import { pluginFactory } from '../../utils/plugins';
var PopoverPlugin =
/*#__PURE__*/
pluginFactory({
  components: {
    BPopover: BPopover
  },
  plugins: {
    VBPopoverPlugin: VBPopoverPlugin
  }
});
export { PopoverPlugin, BPopover };
import { BTooltip } from './tooltip';
import { VBTooltipPlugin } from '../../directives/tooltip';
import { pluginFactory } from '../../utils/plugins';
var TooltipPlugin =
/*#__PURE__*/
pluginFactory({
  components: {
    BTooltip: BTooltip
  },
  plugins: {
    VBTooltipPlugin: VBTooltipPlugin
  }
});
export { TooltipPlugin, BTooltip };
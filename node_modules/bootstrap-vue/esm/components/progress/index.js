import { BProgress } from './progress';
import { BProgressBar } from './progress-bar';
import { pluginFactory } from '../../utils/plugins';
var ProgressPlugin =
/*#__PURE__*/
pluginFactory({
  components: {
    BProgress: BProgress,
    BProgressBar: BProgressBar
  }
});
export { ProgressPlugin, BProgress, BProgressBar };
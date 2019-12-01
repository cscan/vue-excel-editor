import { BVToastPlugin } from './helpers/bv-toast';
import { BToast } from './toast';
import { BToaster } from './toaster';
import { pluginFactory } from '../../utils/plugins';
var ToastPlugin =
/*#__PURE__*/
pluginFactory({
  components: {
    BToast: BToast,
    BToaster: BToaster
  },
  // $bvToast injection
  plugins: {
    BVToastPlugin: BVToastPlugin
  }
});
export { ToastPlugin, BToast, BToaster };
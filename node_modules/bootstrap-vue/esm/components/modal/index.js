import { BModal } from './modal';
import { VBModal } from '../../directives/modal/modal';
import { BVModalPlugin } from './helpers/bv-modal';
import { pluginFactory } from '../../utils/plugins';
var ModalPlugin =
/*#__PURE__*/
pluginFactory({
  components: {
    BModal: BModal
  },
  directives: {
    VBModal: VBModal
  },
  // $bvModal injection
  plugins: {
    BVModalPlugin: BVModalPlugin
  }
});
export { ModalPlugin, BModal };
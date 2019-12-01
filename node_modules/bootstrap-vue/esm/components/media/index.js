import { BMedia } from './media';
import { BMediaAside } from './media-aside';
import { BMediaBody } from './media-body';
import { pluginFactory } from '../../utils/plugins';
var MediaPlugin =
/*#__PURE__*/
pluginFactory({
  components: {
    BMedia: BMedia,
    BMediaAside: BMediaAside,
    BMediaBody: BMediaBody
  }
});
export { MediaPlugin, BMedia, BMediaAside, BMediaBody };
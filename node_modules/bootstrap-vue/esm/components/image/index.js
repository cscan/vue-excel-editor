import { BImg } from './img';
import { BImgLazy } from './img-lazy';
import { pluginFactory } from '../../utils/plugins';
var ImagePlugin =
/*#__PURE__*/
pluginFactory({
  components: {
    BImg: BImg,
    BImgLazy: BImgLazy
  }
});
export { ImagePlugin, BImg, BImgLazy };
import { BCarousel } from './carousel';
import { BCarouselSlide } from './carousel-slide';
import { pluginFactory } from '../../utils/plugins';
var CarouselPlugin =
/*#__PURE*/
pluginFactory({
  components: {
    BCarousel: BCarousel,
    BCarouselSlide: BCarouselSlide
  }
});
export { CarouselPlugin, BCarousel, BCarouselSlide };
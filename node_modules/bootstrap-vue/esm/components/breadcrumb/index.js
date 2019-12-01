import { BBreadcrumb } from './breadcrumb';
import { BBreadcrumbItem } from './breadcrumb-item';
import { BBreadcrumbLink } from './breadcrumb-link';
import { pluginFactory } from '../../utils/plugins';
var BreadcrumbPlugin =
/*#__PURE__*/
pluginFactory({
  components: {
    BBreadcrumb: BBreadcrumb,
    BBreadcrumbItem: BBreadcrumbItem,
    BBreadcrumbLink: BBreadcrumbLink
  }
});
export { BreadcrumbPlugin, BBreadcrumb, BBreadcrumbItem, BBreadcrumbLink };
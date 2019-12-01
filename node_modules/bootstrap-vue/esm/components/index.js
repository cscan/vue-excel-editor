import { pluginFactory } from '../utils/plugins'; // Component group plugins

import { AlertPlugin } from './alert';
import { BadgePlugin } from './badge';
import { BreadcrumbPlugin } from './breadcrumb';
import { ButtonPlugin } from './button';
import { ButtonGroupPlugin } from './button-group';
import { ButtonToolbarPlugin } from './button-toolbar';
import { CardPlugin } from './card';
import { CarouselPlugin } from './carousel';
import { CollapsePlugin } from './collapse';
import { DropdownPlugin } from './dropdown';
import { EmbedPlugin } from './embed';
import { FormPlugin } from './form';
import { FormGroupPlugin } from './form-group';
import { FormCheckboxPlugin } from './form-checkbox';
import { FormRadioPlugin } from './form-radio';
import { FormInputPlugin } from './form-input';
import { FormTextareaPlugin } from './form-textarea';
import { FormFilePlugin } from './form-file';
import { FormSelectPlugin } from './form-select';
import { ImagePlugin } from './image';
import { InputGroupPlugin } from './input-group';
import { JumbotronPlugin } from './jumbotron';
import { LayoutPlugin } from './layout';
import { LinkPlugin } from './link';
import { ListGroupPlugin } from './list-group';
import { MediaPlugin } from './media';
import { ModalPlugin } from './modal';
import { NavPlugin } from './nav';
import { NavbarPlugin } from './navbar';
import { PaginationPlugin } from './pagination';
import { PaginationNavPlugin } from './pagination-nav';
import { PopoverPlugin } from './popover';
import { ProgressPlugin } from './progress';
import { SpinnerPlugin } from './spinner'; // Table plugin includes TableLitePlugin and TableSimplePlugin

import { TablePlugin } from './table';
import { TabsPlugin } from './tabs';
import { ToastPlugin } from './toast';
import { TooltipPlugin } from './tooltip'; // Main plugin to install all component group plugins

export var componentsPlugin =
/*#__PURE__*/
pluginFactory({
  plugins: {
    AlertPlugin: AlertPlugin,
    BadgePlugin: BadgePlugin,
    BreadcrumbPlugin: BreadcrumbPlugin,
    ButtonPlugin: ButtonPlugin,
    ButtonGroupPlugin: ButtonGroupPlugin,
    ButtonToolbarPlugin: ButtonToolbarPlugin,
    CardPlugin: CardPlugin,
    CarouselPlugin: CarouselPlugin,
    CollapsePlugin: CollapsePlugin,
    DropdownPlugin: DropdownPlugin,
    EmbedPlugin: EmbedPlugin,
    FormPlugin: FormPlugin,
    FormGroupPlugin: FormGroupPlugin,
    FormCheckboxPlugin: FormCheckboxPlugin,
    FormRadioPlugin: FormRadioPlugin,
    FormInputPlugin: FormInputPlugin,
    FormTextareaPlugin: FormTextareaPlugin,
    FormFilePlugin: FormFilePlugin,
    FormSelectPlugin: FormSelectPlugin,
    ImagePlugin: ImagePlugin,
    InputGroupPlugin: InputGroupPlugin,
    JumbotronPlugin: JumbotronPlugin,
    LayoutPlugin: LayoutPlugin,
    LinkPlugin: LinkPlugin,
    ListGroupPlugin: ListGroupPlugin,
    MediaPlugin: MediaPlugin,
    ModalPlugin: ModalPlugin,
    NavPlugin: NavPlugin,
    NavbarPlugin: NavbarPlugin,
    PaginationPlugin: PaginationPlugin,
    PaginationNavPlugin: PaginationNavPlugin,
    PopoverPlugin: PopoverPlugin,
    ProgressPlugin: ProgressPlugin,
    SpinnerPlugin: SpinnerPlugin,
    TablePlugin: TablePlugin,
    TabsPlugin: TabsPlugin,
    ToastPlugin: ToastPlugin,
    TooltipPlugin: TooltipPlugin
  }
});
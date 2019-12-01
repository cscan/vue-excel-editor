function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import getScopId from '../../utils/get-scope-id';
import looseEqual from '../../utils/loose-equal';
import { concat } from '../../utils/array';
import { getComponentConfig } from '../../utils/config';
import { isBrowser } from '../../utils/env';
import { isFunction, isNumber, isPlainObject, isString, isUndefined, isUndefinedOrNull } from '../../utils/inspect';
import { keys } from '../../utils/object';
import { BVTooltip } from '../../components/tooltip/helpers/bv-tooltip'; // Key which we use to store tooltip object on element

var BV_TOOLTIP = '__BV_Tooltip__'; // Default trigger

var DefaultTrigger = 'hover focus'; // Valid event triggers

var validTriggers = {
  focus: true,
  hover: true,
  click: true,
  blur: true,
  manual: true
}; // Directive modifier test regular expressions. Pre-compile for performance

var htmlRE = /^html$/i;
var noFadeRE = /^nofade$/i;
var placementRE = /^(auto|top(left|right)?|bottom(left|right)?|left(top|bottom)?|right(top|bottom)?)$/i;
var boundaryRE = /^(window|viewport|scrollParent)$/i;
var delayRE = /^d\d+$/i;
var delayShowRE = /^ds\d+$/i;
var delayHideRE = /^dh\d+$/i;
var offsetRE = /^o-?\d+$/i;
var variantRE = /^v-.+$/i; // Build a Tooltip config based on bindings (if any)
// Arguments and modifiers take precedence over passed value config object

var parseBindings = function parseBindings(bindings, vnode)
/* istanbul ignore next: not easy to test */
{
  // We start out with a basic config
  var NAME = 'BTooltip'; // Default config

  var config = {
    title: undefined,
    trigger: '',
    // Default set below if needed
    placement: 'top',
    fallbackPlacement: 'flip',
    container: false,
    // Default of body
    animation: true,
    offset: 0,
    id: null,
    html: false,
    disabled: false,
    delay: getComponentConfig(NAME, 'delay'),
    boundary: String(getComponentConfig(NAME, 'boundary')),
    boundaryPadding: parseInt(getComponentConfig(NAME, 'boundaryPadding'), 10) || 0,
    variant: getComponentConfig(NAME, 'variant'),
    customClass: getComponentConfig(NAME, 'customClass')
  }; // Process `bindings.value`

  if (isString(bindings.value) || isNumber(bindings.value)) {
    // Value is tooltip content (HTML optionally supported)
    config.title = bindings.value;
  } else if (isFunction(bindings.value)) {
    // Title generator function
    config.title = bindings.value;
  } else if (isPlainObject(bindings.value)) {
    // Value is config object, so merge
    config = _objectSpread({}, config, {}, bindings.value);
  } // If title is not provided, try title attribute


  if (isUndefined(config.title)) {
    // Try attribute
    var data = vnode.data || {};
    config.title = data.attrs && !isUndefinedOrNull(data.attrs.title) ? data.attrs.title : undefined;
  } // Normalize delay


  if (!isPlainObject(config.delay)) {
    config.delay = {
      show: parseInt(config.delay, 10) || 0,
      hide: parseInt(config.delay, 10) || 0
    };
  } // If argument, assume element ID of container element


  if (bindings.arg) {
    // Element ID specified as arg
    // We must prepend '#' to become a CSS selector
    config.container = "#".concat(bindings.arg);
  } // Process modifiers


  keys(bindings.modifiers).forEach(function (mod) {
    if (htmlRE.test(mod)) {
      // Title allows HTML
      config.html = true;
    } else if (noFadeRE.test(mod)) {
      // No animation
      config.animation = false;
    } else if (placementRE.test(mod)) {
      // Placement of tooltip
      config.placement = mod;
    } else if (boundaryRE.test(mod)) {
      // Boundary of tooltip
      mod = mod === 'scrollparent' ? 'scrollParent' : mod;
      config.boundary = mod;
    } else if (delayRE.test(mod)) {
      // Delay value
      var delay = parseInt(mod.slice(1), 10) || 0;
      config.delay.show = delay;
      config.delay.hide = delay;
    } else if (delayShowRE.test(mod)) {
      // Delay show value
      config.delay.show = parseInt(mod.slice(2), 10) || 0;
    } else if (delayHideRE.test(mod)) {
      // Delay hide value
      config.delay.hide = parseInt(mod.slice(2), 10) || 0;
    } else if (offsetRE.test(mod)) {
      // Offset value, negative allowed
      config.offset = parseInt(mod.slice(1), 10) || 0;
    } else if (variantRE.test(mod)) {
      // Variant
      config.variant = mod.slice(2) || null;
    }
  }); // Special handling of event trigger modifiers trigger is
  // a space separated list

  var selectedTriggers = {}; // Parse current config object trigger

  concat(config.trigger || '').filter(Boolean).join(' ').trim().toLowerCase().split(/\s+/).forEach(function (trigger) {
    if (validTriggers[trigger]) {
      selectedTriggers[trigger] = true;
    }
  }); // Parse modifiers for triggers

  keys(bindings.modifiers).forEach(function (mod) {
    mod = mod.toLowerCase();

    if (validTriggers[mod]) {
      // If modifier is a valid trigger
      selectedTriggers[mod] = true;
    }
  }); // Sanitize triggers

  config.trigger = keys(selectedTriggers).join(' ');

  if (config.trigger === 'blur') {
    // Blur by itself is useless, so convert it to 'focus'
    config.trigger = 'focus';
  }

  if (!config.trigger) {
    // Use default trigger
    config.trigger = DefaultTrigger;
  } // Return the config


  return config;
}; // Add/update Tooltip on our element


var applyTooltip = function applyTooltip(el, bindings, vnode) {
  if (!isBrowser) {
    /* istanbul ignore next */
    return;
  }

  var config = parseBindings(bindings, vnode);

  if (!el[BV_TOOLTIP]) {
    var $parent = vnode.context;
    el[BV_TOOLTIP] = new BVTooltip({
      parent: $parent,
      // Add the parent's scoped style attribute data
      _scopeId: getScopId($parent, undefined)
    });
    el[BV_TOOLTIP].__bv_prev_data__ = {};
    el[BV_TOOLTIP].$on('show', function ()
    /* istanbul ignore next: for now */
    {
      // Before showing the tooltip, we update the title if it is a function
      if (isFunction(config.title)) {
        el[BV_TOOLTIP].updateData({
          title: config.title(el)
        });
      }
    });
  }

  var data = {
    title: config.title,
    triggers: config.trigger,
    placement: config.placement,
    fallbackPlacement: config.fallbackPlacement,
    variant: config.variant,
    customClass: config.customClass,
    container: config.container,
    boundary: config.boundary,
    delay: config.delay,
    offset: config.offset,
    noFade: !config.animation,
    id: config.id,
    disabled: config.disabled,
    html: config.html
  };
  var oldData = el[BV_TOOLTIP].__bv_prev_data__;
  el[BV_TOOLTIP].__bv_prev_data__ = data;

  if (!looseEqual(data, oldData)) {
    // We only update the instance if data has changed
    var newData = {
      target: el
    };
    keys(data).forEach(function (prop) {
      // We only pass data properties that have changed
      if (data[prop] !== oldData[prop]) {
        // if title is a function, we execute it here
        newData[prop] = prop === 'title' && isFunction(data[prop]) ? data[prop](el) : data[prop];
      }
    });
    el[BV_TOOLTIP].updateData(newData);
  }
}; // Remove Tooltip on our element


var removeTooltip = function removeTooltip(el) {
  if (el[BV_TOOLTIP]) {
    el[BV_TOOLTIP].$destroy();
    el[BV_TOOLTIP] = null;
  }

  delete el[BV_TOOLTIP];
}; // Export our directive


export var VBTooltip = {
  bind: function bind(el, bindings, vnode) {
    applyTooltip(el, bindings, vnode);
  },
  // We use `componentUpdated` here instead of `update`, as the former
  // waits until the containing component and children have finished updating
  componentUpdated: function componentUpdated(el, bindings, vnode) {
    // Performed in a `$nextTick()` to prevent render update loops
    vnode.context.$nextTick(function () {
      applyTooltip(el, bindings, vnode);
    });
  },
  unbind: function unbind(el) {
    removeTooltip(el);
  }
};
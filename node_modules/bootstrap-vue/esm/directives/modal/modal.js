import KeyCodes from '../../utils/key-codes';
import { eventOn, eventOff, getAttr, hasAttr, isDisabled, matches, select, setAttr } from '../../utils/dom';
import { isString } from '../../utils/inspect';
import { keys } from '../../utils/object'; // Emitted show event for modal

var EVENT_SHOW = 'bv::show::modal'; // Prop name we use to store info on root element

var HANDLER = '__bv_modal_directive__';
var EVENT_OPTS = {
  passive: true
};

var getTarget = function getTarget(_ref) {
  var _ref$modifiers = _ref.modifiers,
      modifiers = _ref$modifiers === void 0 ? {} : _ref$modifiers,
      arg = _ref.arg,
      value = _ref.value;
  // Try value, then arg, otherwise pick last modifier
  return isString(value) ? value : isString(arg) ? arg : keys(modifiers).reverse()[0];
};

var getTriggerElement = function getTriggerElement(el) {
  // If root element is a dropdown-item or nav-item, we
  // need to target the inner link or button instead
  return el && matches(el, '.dropdown-menu > li, li.nav-item') ? select('a, button', el) || el : el;
};

var setRole = function setRole(trigger) {
  // Ensure accessibility on non button elements
  if (trigger && trigger.tagName !== 'BUTTON') {
    // Only set a role if the trigger element doesn't have one
    if (!hasAttr(trigger, 'role')) {
      setAttr(trigger, 'role', 'button');
    } // Add a tabindex is not a button or link, and tabindex is not provided


    if (trigger.tagName !== 'A' && !hasAttr(trigger, 'tabindex')) {
      setAttr(trigger, 'tabindex', '0');
    }
  }
};

var bind = function bind(el, binding, vnode) {
  var target = getTarget(binding);
  var trigger = getTriggerElement(el);

  if (target && trigger) {
    var handler = function handler(evt) {
      // `currentTarget` is the element with the listener on it
      var currentTarget = evt.currentTarget;

      if (!isDisabled(currentTarget)) {
        var type = evt.type;
        var key = evt.keyCode; // Open modal only if trigger is not disabled

        if (type === 'click' || type === 'keydown' && (key === KeyCodes.ENTER || key === KeyCodes.SPACE)) {
          vnode.context.$root.$emit(EVENT_SHOW, target, currentTarget);
        }
      }
    };

    el[HANDLER] = handler; // If element is not a button, we add `role="button"` for accessibility

    setRole(trigger); // Listen for click events

    eventOn(trigger, 'click', handler, EVENT_OPTS);

    if (trigger.tagName !== 'BUTTON' && getAttr(trigger, 'role') === 'button') {
      // If trigger isn't a button but has role button,
      // we also listen for `keydown.space` && `keydown.enter`
      eventOn(trigger, 'keydown', handler, EVENT_OPTS);
    }
  }
};

var unbind = function unbind(el) {
  var trigger = getTriggerElement(el);
  var handler = el ? el[HANDLER] : null;

  if (trigger && handler) {
    eventOff(trigger, 'click', handler, EVENT_OPTS);
    eventOff(trigger, 'keydown', handler, EVENT_OPTS);
  }

  delete el[HANDLER];
};

var componentUpdated = function componentUpdated(el, binding, vnode) {
  // We bind and rebind just in case target changes
  unbind(el, binding, vnode);
  bind(el, binding, vnode);
};

var updated = function updated() {};
/*
 * Export our directive
 */


export var VBModal = {
  inserted: componentUpdated,
  updated: updated,
  componentUpdated: componentUpdated,
  unbind: unbind
};
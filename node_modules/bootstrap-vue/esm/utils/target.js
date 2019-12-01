import { keys } from './object';
import { eventOn, eventOff } from './dom';
var allListenTypes = {
  hover: true,
  click: true,
  focus: true
};
var BVBoundListeners = '__BV_boundEventListeners__';

var getTargets = function getTargets(binding) {
  var targets = keys(binding.modifiers || {}).filter(function (t) {
    return !allListenTypes[t];
  });

  if (binding.value) {
    targets.push(binding.value);
  }

  return targets;
};

var bindTargets = function bindTargets(vnode, binding, listenTypes, fn) {
  var targets = getTargets(binding);

  var listener = function listener() {
    fn({
      targets: targets,
      vnode: vnode
    });
  };

  keys(allListenTypes).forEach(function (type) {
    if (listenTypes[type] || binding.modifiers[type]) {
      eventOn(vnode.elm, type, listener);
      var boundListeners = vnode.elm[BVBoundListeners] || {};
      boundListeners[type] = boundListeners[type] || [];
      boundListeners[type].push(listener);
      vnode.elm[BVBoundListeners] = boundListeners;
    }
  }); // Return the list of targets

  return targets;
};

var unbindTargets = function unbindTargets(vnode, binding, listenTypes) {
  keys(allListenTypes).forEach(function (type) {
    if (listenTypes[type] || binding.modifiers[type]) {
      var boundListeners = vnode.elm[BVBoundListeners] && vnode.elm[BVBoundListeners][type];

      if (boundListeners) {
        boundListeners.forEach(function (listener) {
          return eventOff(vnode.elm, type, listener);
        });
        delete vnode.elm[BVBoundListeners][type];
      }
    }
  });
};

export { bindTargets, unbindTargets, getTargets };
export default bindTargets;
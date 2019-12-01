/**
 * Utilities to get information about the current environment
 */
// --- Constants ---
export var hasWindowSupport = typeof window !== 'undefined';
export var hasDocumentSupport = typeof document !== 'undefined';
export var hasNavigatorSupport = typeof navigator !== 'undefined';
export var hasPromiseSupport = typeof Promise !== 'undefined';
export var hasMutationObserverSupport = typeof MutationObserver !== 'undefined' || typeof WebKitMutationObserver !== 'undefined' || typeof MozMutationObserver !== 'undefined';
export var isBrowser = hasWindowSupport && hasDocumentSupport && hasNavigatorSupport; // Browser type sniffing

export var userAgent = isBrowser ? window.navigator.userAgent.toLowerCase() : '';
export var isJSDOM = userAgent.indexOf('jsdom') > 0;
export var isIE = /msie|trident/.test(userAgent); // Determine if the browser supports the option passive for events

export var hasPassiveEventSupport = function () {
  var passiveEventSupported = false;

  if (isBrowser) {
    try {
      var options = {
        get passive() {
          // This function will be called when the browser
          // attempts to access the passive property.

          /* istanbul ignore next: will never be called in JSDOM */
          passiveEventSupported = true;
        }

      };
      window.addEventListener('test', options, options);
      window.removeEventListener('test', options, options);
    } catch (err) {
      /* istanbul ignore next: will never be called in JSDOM */
      passiveEventSupported = false;
    }
  }

  return passiveEventSupported;
}();
export var hasTouchSupport = isBrowser && ('ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0);
export var hasPointerEventSupport = isBrowser && Boolean(window.PointerEvent || window.MSPointerEvent);
export var hasIntersectionObserverSupport = isBrowser && 'IntersectionObserver' in window && 'IntersectionObserverEntry' in window && // Edge 15 and UC Browser lack support for `isIntersecting`
// but we an use intersectionRatio > 0 instead
// 'isIntersecting' in window.IntersectionObserverEntry.prototype &&
'intersectionRatio' in window.IntersectionObserverEntry.prototype; // --- Getters ---

export var getEnv = function getEnv(key) {
  var fallback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var env = typeof process !== 'undefined' && process ? process.env || {} : {};

  if (!key) {
    /* istanbul ignore next */
    return env;
  }

  return env[key] || fallback;
};
export var getNoWarn = function getNoWarn() {
  return getEnv('BOOTSTRAP_VUE_NO_WARN');
};
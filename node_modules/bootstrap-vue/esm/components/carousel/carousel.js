import Vue from '../../utils/vue';
import KeyCodes from '../../utils/key-codes';
import noop from '../../utils/noop';
import observeDom from '../../utils/observe-dom';
import { getComponentConfig } from '../../utils/config';
import { selectAll, reflow, addClass, removeClass, setAttr, eventOn, eventOff } from '../../utils/dom';
import { isBrowser, hasTouchSupport, hasPointerEventSupport } from '../../utils/env';
import { isUndefined } from '../../utils/inspect';
import idMixin from '../../mixins/id';
import normalizeSlotMixin from '../../mixins/normalize-slot';
var NAME = 'BCarousel'; // Slide directional classes

var DIRECTION = {
  next: {
    dirClass: 'carousel-item-left',
    overlayClass: 'carousel-item-next'
  },
  prev: {
    dirClass: 'carousel-item-right',
    overlayClass: 'carousel-item-prev'
  }
}; // Fallback Transition duration (with a little buffer) in ms

var TRANS_DURATION = 600 + 50; // Time for mouse compat events to fire after touch

var TOUCH_EVENT_COMPAT_WAIT = 500; // Number of pixels to consider touch move a swipe

var SWIPE_THRESHOLD = 40; // PointerEvent pointer types

var PointerType = {
  TOUCH: 'touch',
  PEN: 'pen'
}; // Transition Event names

var TransitionEndEvents = {
  WebkitTransition: 'webkitTransitionEnd',
  MozTransition: 'transitionend',
  OTransition: 'otransitionend oTransitionEnd',
  transition: 'transitionend'
};
var EventOptions = {
  passive: true,
  capture: false
}; // Return the browser specific transitionEnd event name

var getTransitionEndEvent = function getTransitionEndEvent(el) {
  for (var name in TransitionEndEvents) {
    if (!isUndefined(el.style[name])) {
      return TransitionEndEvents[name];
    }
  } // Fallback

  /* istanbul ignore next */


  return null;
}; // @vue/component


export var BCarousel =
/*#__PURE__*/
Vue.extend({
  name: NAME,
  mixins: [idMixin, normalizeSlotMixin],
  provide: function provide() {
    return {
      bvCarousel: this
    };
  },
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    labelPrev: {
      type: String,
      default: function _default() {
        return getComponentConfig(NAME, 'labelPrev');
      }
    },
    labelNext: {
      type: String,
      default: function _default() {
        return getComponentConfig(NAME, 'labelNext');
      }
    },
    labelGotoSlide: {
      type: String,
      default: function _default() {
        return getComponentConfig(NAME, 'labelGotoSlide');
      }
    },
    labelIndicators: {
      type: String,
      default: function _default() {
        return getComponentConfig(NAME, 'labelIndicators');
      }
    },
    interval: {
      type: Number,
      default: 5000
    },
    indicators: {
      type: Boolean,
      default: false
    },
    controls: {
      type: Boolean,
      default: false
    },
    noAnimation: {
      // Disable slide/fade animation
      type: Boolean,
      default: false
    },
    fade: {
      // Enable cross-fade animation instead of slide animation
      type: Boolean,
      default: false
    },
    noWrap: {
      // Disable wrapping/looping when start/end is reached
      type: Boolean,
      default: false
    },
    noTouch: {
      // Sniffed by carousel-slide
      type: Boolean,
      default: false
    },
    noHoverPause: {
      // Disable pause on hover
      type: Boolean,
      default: false
    },
    imgWidth: {
      // Sniffed by carousel-slide
      type: [Number, String] // default: undefined

    },
    imgHeight: {
      // Sniffed by carousel-slide
      type: [Number, String] // default: undefined

    },
    background: {
      type: String // default: undefined

    },
    value: {
      type: Number,
      default: 0
    }
  },
  data: function data() {
    return {
      index: this.value || 0,
      isSliding: false,
      transitionEndEvent: null,
      slides: [],
      direction: null,
      isPaused: !(parseInt(this.interval, 10) > 0),
      // Touch event handling values
      touchStartX: 0,
      touchDeltaX: 0
    };
  },
  computed: {
    numSlides: function numSlides() {
      return this.slides.length;
    }
  },
  watch: {
    value: function value(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.setSlide(parseInt(newVal, 10) || 0);
      }
    },
    interval: function interval(newVal, oldVal) {
      if (newVal === oldVal) {
        /* istanbul ignore next */
        return;
      }

      if (!newVal) {
        // Pausing slide show
        this.pause(false);
      } else {
        // Restarting or Changing interval
        this.pause(true);
        this.start(false);
      }
    },
    isPaused: function isPaused(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.$emit(newVal ? 'paused' : 'unpaused');
      }
    },
    index: function index(to, from) {
      if (to === from || this.isSliding) {
        /* istanbul ignore next */
        return;
      }

      this.doSlide(to, from);
    }
  },
  created: function created() {
    // Create private non-reactive props
    this._intervalId = null;
    this._animationTimeout = null;
    this._touchTimeout = null; // Set initial paused state

    this.isPaused = !(parseInt(this.interval, 10) > 0);
  },
  mounted: function mounted() {
    // Cache current browser transitionend event name
    this.transitionEndEvent = getTransitionEndEvent(this.$el) || null; // Get all slides

    this.updateSlides(); // Observe child changes so we can update slide list

    observeDom(this.$refs.inner, this.updateSlides.bind(this), {
      subtree: false,
      childList: true,
      attributes: true,
      attributeFilter: ['id']
    });
  },
  beforeDestroy: function beforeDestroy() {
    clearTimeout(this._animationTimeout);
    clearTimeout(this._touchTimeout);
    clearInterval(this._intervalId);
    this._intervalId = null;
    this._animationTimeout = null;
    this._touchTimeout = null;
  },
  methods: {
    // Set slide
    setSlide: function setSlide(slide) {
      var _this = this;

      var direction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      // Don't animate when page is not visible

      /* istanbul ignore if: difficult to test */
      if (isBrowser && document.visibilityState && document.hidden) {
        return;
      }

      var noWrap = this.noWrap;
      var numSlides = this.numSlides; // Make sure we have an integer (you never know!)

      slide = Math.floor(slide); // Don't do anything if nothing to slide to

      if (numSlides === 0) {
        return;
      } // Don't change slide while transitioning, wait until transition is done


      if (this.isSliding) {
        // Schedule slide after sliding complete
        this.$once('sliding-end', function () {
          return _this.setSlide(slide, direction);
        });
        return;
      }

      this.direction = direction; // Set new slide index
      // Wrap around if necessary (if no-wrap not enabled)

      this.index = slide >= numSlides ? noWrap ? numSlides - 1 : 0 : slide < 0 ? noWrap ? 0 : numSlides - 1 : slide; // Ensure the v-model is synched up if no-wrap is enabled
      // and user tried to slide pass either ends

      if (noWrap && this.index !== slide && this.index !== this.value) {
        this.$emit('input', this.index);
      }
    },
    // Previous slide
    prev: function prev() {
      this.setSlide(this.index - 1, 'prev');
    },
    // Next slide
    next: function next() {
      this.setSlide(this.index + 1, 'next');
    },
    // Pause auto rotation
    pause: function pause(evt) {
      if (!evt) {
        this.isPaused = true;
      }

      if (this._intervalId) {
        clearInterval(this._intervalId);
        this._intervalId = null;
      }
    },
    // Start auto rotate slides
    start: function start(evt) {
      if (!evt) {
        this.isPaused = false;
      }
      /* istanbul ignore next: most likely will never happen, but just in case */


      if (this._intervalId) {
        clearInterval(this._intervalId);
        this._intervalId = null;
      } // Don't start if no interval, or less than 2 slides


      if (this.interval && this.numSlides > 1) {
        this._intervalId = setInterval(this.next, Math.max(1000, this.interval));
      }
    },
    // Restart auto rotate slides when focus/hover leaves the carousel
    restart: function restart(evt)
    /* istanbul ignore next: difficult to test */
    {
      if (!this.$el.contains(document.activeElement)) {
        this.start();
      }
    },
    doSlide: function doSlide(to, from) {
      var _this2 = this;

      var isCycling = Boolean(this.interval); // Determine sliding direction

      var direction = this.calcDirection(this.direction, from, to);
      var overlayClass = direction.overlayClass;
      var dirClass = direction.dirClass; // Determine current and next slides

      var currentSlide = this.slides[from];
      var nextSlide = this.slides[to]; // Don't do anything if there aren't any slides to slide to

      if (!currentSlide || !nextSlide) {
        /* istanbul ignore next */
        return;
      } // Start animating


      this.isSliding = true;

      if (isCycling) {
        this.pause(false);
      }

      this.$emit('sliding-start', to); // Update v-model

      this.$emit('input', this.index);

      if (this.noAnimation) {
        addClass(nextSlide, 'active');
        removeClass(currentSlide, 'active');
        this.isSliding = false; // Notify ourselves that we're done sliding (slid)

        this.$nextTick(function () {
          return _this2.$emit('sliding-end', to);
        });
      } else {
        addClass(nextSlide, overlayClass); // Trigger a reflow of next slide

        reflow(nextSlide);
        addClass(currentSlide, dirClass);
        addClass(nextSlide, dirClass); // Transition End handler

        var called = false;
        /* istanbul ignore next: difficult to test */

        var onceTransEnd = function onceTransEnd(evt) {
          if (called) {
            return;
          }

          called = true;
          /* istanbul ignore if: transition events cant be tested in JSDOM */

          if (_this2.transitionEndEvent) {
            var events = _this2.transitionEndEvent.split(/\s+/);

            events.forEach(function (evt) {
              return eventOff(currentSlide, evt, onceTransEnd, EventOptions);
            });
          }

          _this2._animationTimeout = null;
          removeClass(nextSlide, dirClass);
          removeClass(nextSlide, overlayClass);
          addClass(nextSlide, 'active');
          removeClass(currentSlide, 'active');
          removeClass(currentSlide, dirClass);
          removeClass(currentSlide, overlayClass);
          setAttr(currentSlide, 'aria-current', 'false');
          setAttr(nextSlide, 'aria-current', 'true');
          setAttr(currentSlide, 'aria-hidden', 'true');
          setAttr(nextSlide, 'aria-hidden', 'false');
          _this2.isSliding = false;
          _this2.direction = null; // Notify ourselves that we're done sliding (slid)

          _this2.$nextTick(function () {
            return _this2.$emit('sliding-end', to);
          });
        }; // Set up transitionend handler

        /* istanbul ignore if: transition events cant be tested in JSDOM */


        if (this.transitionEndEvent) {
          var events = this.transitionEndEvent.split(/\s+/);
          events.forEach(function (event) {
            return eventOn(currentSlide, event, onceTransEnd, EventOptions);
          });
        } // Fallback to setTimeout()


        this._animationTimeout = setTimeout(onceTransEnd, TRANS_DURATION);
      }

      if (isCycling) {
        this.start(false);
      }
    },
    // Update slide list
    updateSlides: function updateSlides() {
      this.pause(true); // Get all slides as DOM elements

      this.slides = selectAll('.carousel-item', this.$refs.inner);
      var numSlides = this.slides.length; // Keep slide number in range

      var index = Math.max(0, Math.min(Math.floor(this.index), numSlides - 1));
      this.slides.forEach(function (slide, idx) {
        var n = idx + 1;

        if (idx === index) {
          addClass(slide, 'active');
          setAttr(slide, 'aria-current', 'true');
        } else {
          removeClass(slide, 'active');
          setAttr(slide, 'aria-current', 'false');
        }

        setAttr(slide, 'aria-posinset', String(n));
        setAttr(slide, 'aria-setsize', String(numSlides));
      }); // Set slide as active

      this.setSlide(index);
      this.start(this.isPaused);
    },
    calcDirection: function calcDirection() {
      var direction = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var curIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var nextIndex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

      if (!direction) {
        return nextIndex > curIndex ? DIRECTION.next : DIRECTION.prev;
      }

      return DIRECTION[direction];
    },
    handleClick: function handleClick(evt, fn) {
      var keyCode = evt.keyCode;

      if (evt.type === 'click' || keyCode === KeyCodes.SPACE || keyCode === KeyCodes.ENTER) {
        evt.preventDefault();
        evt.stopPropagation();
        fn();
      }
    },
    handleSwipe: function handleSwipe()
    /* istanbul ignore next: JSDOM doesn't support touch events */
    {
      var absDeltaX = Math.abs(this.touchDeltaX);

      if (absDeltaX <= SWIPE_THRESHOLD) {
        return;
      }

      var direction = absDeltaX / this.touchDeltaX; // Reset touch delta X
      // https://github.com/twbs/bootstrap/pull/28558

      this.touchDeltaX = 0;

      if (direction > 0) {
        // Swipe left
        this.prev();
      } else if (direction < 0) {
        // Swipe right
        this.next();
      }
    },
    touchStart: function touchStart(evt)
    /* istanbul ignore next: JSDOM doesn't support touch events */
    {
      if (hasPointerEventSupport && PointerType[evt.pointerType.toUpperCase()]) {
        this.touchStartX = evt.clientX;
      } else if (!hasPointerEventSupport) {
        this.touchStartX = evt.touches[0].clientX;
      }
    },
    touchMove: function touchMove(evt)
    /* istanbul ignore next: JSDOM doesn't support touch events */
    {
      // Ensure swiping with one touch and not pinching
      if (evt.touches && evt.touches.length > 1) {
        this.touchDeltaX = 0;
      } else {
        this.touchDeltaX = evt.touches[0].clientX - this.touchStartX;
      }
    },
    touchEnd: function touchEnd(evt)
    /* istanbul ignore next: JSDOM doesn't support touch events */
    {
      if (hasPointerEventSupport && PointerType[evt.pointerType.toUpperCase()]) {
        this.touchDeltaX = evt.clientX - this.touchStartX;
      }

      this.handleSwipe(); // If it's a touch-enabled device, mouseenter/leave are fired as
      // part of the mouse compatibility events on first tap - the carousel
      // would stop cycling until user tapped out of it;
      // here, we listen for touchend, explicitly pause the carousel
      // (as if it's the second time we tap on it, mouseenter compat event
      // is NOT fired) and after a timeout (to allow for mouse compatibility
      // events to fire) we explicitly restart cycling

      this.pause(false);

      if (this._touchTimeout) {
        clearTimeout(this._touchTimeout);
      }

      this._touchTimeout = setTimeout(this.start, TOUCH_EVENT_COMPAT_WAIT + Math.max(1000, this.interval));
    }
  },
  render: function render(h) {
    var _this3 = this;

    // Wrapper for slides
    var inner = h('div', {
      ref: 'inner',
      class: ['carousel-inner'],
      attrs: {
        id: this.safeId('__BV_inner_'),
        role: 'list'
      }
    }, [this.normalizeSlot('default')]); // Prev and next controls

    var controls = h();

    if (this.controls) {
      var prevHandler = function prevHandler(evt) {
        /* istanbul ignore next */
        if (!_this3.isSliding) {
          _this3.handleClick(evt, _this3.prev);
        } else {
          evt.preventDefault();
        }
      };

      var nextHandler = function nextHandler(evt) {
        /* istanbul ignore next */
        if (!_this3.isSliding) {
          _this3.handleClick(evt, _this3.next);
        } else {
          evt.preventDefault();
        }
      };

      controls = [h('a', {
        class: ['carousel-control-prev'],
        attrs: {
          href: '#',
          role: 'button',
          'aria-controls': this.safeId('__BV_inner_'),
          'aria-disabled': this.isSliding ? 'true' : null
        },
        on: {
          click: prevHandler,
          keydown: prevHandler
        }
      }, [h('span', {
        class: ['carousel-control-prev-icon'],
        attrs: {
          'aria-hidden': 'true'
        }
      }), h('span', {
        class: ['sr-only']
      }, [this.labelPrev])]), h('a', {
        class: ['carousel-control-next'],
        attrs: {
          href: '#',
          role: 'button',
          'aria-controls': this.safeId('__BV_inner_'),
          'aria-disabled': this.isSliding ? 'true' : null
        },
        on: {
          click: nextHandler,
          keydown: nextHandler
        }
      }, [h('span', {
        class: ['carousel-control-next-icon'],
        attrs: {
          'aria-hidden': 'true'
        }
      }), h('span', {
        class: ['sr-only']
      }, [this.labelNext])])];
    } // Indicators


    var indicators = h('ol', {
      class: ['carousel-indicators'],
      directives: [{
        name: 'show',
        rawName: 'v-show',
        value: this.indicators,
        expression: 'indicators'
      }],
      attrs: {
        id: this.safeId('__BV_indicators_'),
        'aria-hidden': this.indicators ? 'false' : 'true',
        'aria-label': this.labelIndicators,
        'aria-owns': this.safeId('__BV_inner_')
      }
    }, this.slides.map(function (slide, n) {
      return h('li', {
        key: "slide_".concat(n),
        class: {
          active: n === _this3.index
        },
        attrs: {
          role: 'button',
          id: _this3.safeId("__BV_indicator_".concat(n + 1, "_")),
          tabindex: _this3.indicators ? '0' : '-1',
          'aria-current': n === _this3.index ? 'true' : 'false',
          'aria-label': "".concat(_this3.labelGotoSlide, " ").concat(n + 1),
          'aria-describedby': _this3.slides[n].id || null,
          'aria-controls': _this3.safeId('__BV_inner_')
        },
        on: {
          click: function click(evt) {
            _this3.handleClick(evt, function () {
              _this3.setSlide(n);
            });
          },
          keydown: function keydown(evt) {
            _this3.handleClick(evt, function () {
              _this3.setSlide(n);
            });
          }
        }
      });
    }));
    var on = {
      mouseenter: this.noHoverPause ? noop : this.pause,
      mouseleave: this.noHoverPause ? noop : this.restart,
      focusin: this.pause,
      focusout: this.restart,
      keydown: function keydown(evt) {
        if (/input|textarea/i.test(evt.target.tagName)) {
          /* istanbul ignore next */
          return;
        }

        var keyCode = evt.keyCode;

        if (keyCode === KeyCodes.LEFT || keyCode === KeyCodes.RIGHT) {
          evt.preventDefault();
          evt.stopPropagation();

          _this3[keyCode === KeyCodes.LEFT ? 'prev' : 'next']();
        }
      }
    }; // Touch support event handlers for environment

    if (!this.noTouch && hasTouchSupport) {
      // Attach appropriate listeners (prepend event name with '&' for passive mode)

      /* istanbul ignore next: JSDOM doesn't support touch events */
      if (hasPointerEventSupport) {
        on['&pointerdown'] = this.touchStart;
        on['&pointerup'] = this.touchEnd;
      } else {
        on['&touchstart'] = this.touchStart;
        on['&touchmove'] = this.touchMove;
        on['&touchend'] = this.touchEnd;
      }
    } // Return the carousel


    return h('div', {
      staticClass: 'carousel',
      class: {
        slide: !this.noAnimation,
        'carousel-fade': !this.noAnimation && this.fade,
        'pointer-event': !this.noTouch && hasTouchSupport && hasPointerEventSupport
      },
      style: {
        background: this.background
      },
      attrs: {
        role: 'region',
        id: this.safeId(),
        'aria-busy': this.isSliding ? 'true' : 'false'
      },
      on: on
    }, [inner, controls, indicators]);
  }
});
import { eventOff, eventOn } from '../utils/dom';
var eventOptions = {
  passive: true,
  capture: false
}; // @vue/component

export default {
  data: function data() {
    return {
      listenForFocusIn: false
    };
  },
  watch: {
    listenForFocusIn: function listenForFocusIn(newValue, oldValue) {
      if (newValue !== oldValue) {
        eventOff(this.focusInElement, 'focusin', this._focusInHandler, eventOptions);

        if (newValue) {
          eventOn(this.focusInElement, 'focusin', this._focusInHandler, eventOptions);
        }
      }
    }
  },
  beforeCreate: function beforeCreate() {
    // Declare non-reactive properties
    this.focusInElement = null;
  },
  mounted: function mounted() {
    if (!this.focusInElement) {
      this.focusInElement = document;
    }

    if (this.listenForFocusIn) {
      eventOn(this.focusInElement, 'focusin', this._focusInHandler, eventOptions);
    }
  },
  beforeDestroy: function beforeDestroy()
  /* istanbul ignore next */
  {
    eventOff(this.focusInElement, 'focusin', this._focusInHandler, eventOptions);
  },
  methods: {
    _focusInHandler: function _focusInHandler(evt) {
      if (this.focusInHandler) {
        this.focusInHandler(evt);
      }
    }
  }
};
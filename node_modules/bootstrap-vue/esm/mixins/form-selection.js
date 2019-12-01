// @vue/component
export default {
  computed: {
    selectionStart: {
      // Expose selectionStart for formatters, etc
      cache: false,
      get: function get()
      /* istanbul ignore next */
      {
        return this.$refs.input.selectionStart;
      },
      set: function set(val)
      /* istanbul ignore next */
      {
        this.$refs.input.selectionStart = val;
      }
    },
    selectionEnd: {
      // Expose selectionEnd for formatters, etc
      cache: false,
      get: function get()
      /* istanbul ignore next */
      {
        return this.$refs.input.selectionEnd;
      },
      set: function set(val)
      /* istanbul ignore next */
      {
        this.$refs.input.selectionEnd = val;
      }
    },
    selectionDirection: {
      // Expose selectionDirection for formatters, etc
      cache: false,
      get: function get()
      /* istanbul ignore next */
      {
        return this.$refs.input.selectionDirection;
      },
      set: function set(val)
      /* istanbul ignore next */
      {
        this.$refs.input.selectionDirection = val;
      }
    }
  },
  methods: {
    select: function select()
    /* istanbul ignore next */
    {
      var _this$$refs$input;

      // For external handler that may want a select() method
      (_this$$refs$input = this.$refs.input).select.apply(_this$$refs$input, arguments);
    },
    setSelectionRange: function setSelectionRange()
    /* istanbul ignore next */
    {
      var _this$$refs$input2;

      // For external handler that may want a setSelectionRange(a,b,c) method
      (_this$$refs$input2 = this.$refs.input).setSelectionRange.apply(_this$$refs$input2, arguments);
    },
    setRangeText: function setRangeText()
    /* istanbul ignore next */
    {
      var _this$$refs$input3;

      // For external handler that may want a setRangeText(a,b,c) method
      (_this$$refs$input3 = this.$refs.input).setRangeText.apply(_this$$refs$input3, arguments);
    }
  }
};
// @vue/component
export default {
  computed: {
    validity: {
      // Expose validity property
      cache: false,
      get: function get()
      /* istanbul ignore next */
      {
        return this.$refs.input.validity;
      }
    },
    validationMessage: {
      // Expose validationMessage property
      cache: false,
      get: function get()
      /* istanbul ignore next */
      {
        return this.$refs.input.validationMessage;
      }
    },
    willValidate: {
      // Expose willValidate property
      cache: false,
      get: function get()
      /* istanbul ignore next */
      {
        return this.$refs.input.willValidate;
      }
    }
  },
  methods: {
    setCustomValidity: function setCustomValidity()
    /* istanbul ignore next */
    {
      var _this$$refs$input;

      // For external handler that may want a setCustomValidity(...) method
      return (_this$$refs$input = this.$refs.input).setCustomValidity.apply(_this$$refs$input, arguments);
    },
    checkValidity: function checkValidity()
    /* istanbul ignore next */
    {
      var _this$$refs$input2;

      // For external handler that may want a checkValidity(...) method
      return (_this$$refs$input2 = this.$refs.input).checkValidity.apply(_this$$refs$input2, arguments);
    },
    reportValidity: function reportValidity()
    /* istanbul ignore next */
    {
      var _this$$refs$input3;

      // For external handler that may want a reportValidity(...) method
      return (_this$$refs$input3 = this.$refs.input).reportValidity.apply(_this$$refs$input3, arguments);
    }
  }
};
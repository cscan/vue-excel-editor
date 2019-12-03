<template>
  <div />
</template>

<script>
export default {
  props: {
    field: {type: String, default: ''},
    label: {type: String, default: ''},
    type: {type: String, default: 'string'},
    validate: {type: Function, default: null},
    initStyle: {type: String, default: 'width:100px'},
    visible: {type: Boolean, default: true},
    pos: {type: Number, default: 0}
  },
  created () {
    this.$parent.registerColumn({
      name: this.field,
      label: this.label,
      type: this.type,
      validate: this.validate,
      initStyle: this.initStyle,
      visible: this.visible,
      pos: this.pos
    })
  }
}
</script>

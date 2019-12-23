<template>
  <div />
</template>

<script>
import moment from 'moment'

export default {
  props: {
    field: {type: String, default: ''},
    label: {type: String, default: null},
    type: {type: String, default: 'string'},
    validate: {type: Function, default: null},
    initStyle: {type: Object, default () {return {}}},
    width: {type: String, default: '100px'},
    visible: {type: Boolean, default: true},
    readonly: {type: Boolean, default: null},
    uppercase: {type: Boolean, default: false},
    autocomplete: {type: Boolean, default: null},
    pos: {type: Number, default: 0},
    options: {type: Array, default () {return []}},
    toValue: {
      type: Function,
      default (text) {
        if (this.uppercase) text = text.toUpperCase()
        switch (this.type) {
          case 'datetick':
            return moment(text, 'YY-MM-DD').valueOf()
          case 'datetimetick':
            return moment(text, 'YY-MM-DD HH:mm').valueOf()
          case 'datetimesectick':
            return moment(text, 'YY-MM-DD HH:mm:ss').valueOf()
          case 'check10':
          case 'checkYN':
          case 'checkTF':
            return text.toUpperCase()
          default:
            return text
        }
      }
    },
    toText: {
      type: Function,
      default (val) {
        switch (this.type) {
          case 'datetick':
            return moment(Number(val)).format('YY-MM-DD')
          case 'datetimetick':
            return moment(Number(val)).format('YY-MM-DD HH:mm')
          case 'datetimesectick':
            return moment(Number(val)).format('YY-MM-DD HH:mm:ss')
          default:
            return val
        }
      }
    }
  },
  created () {
    let style = this.initStyle
    switch (this.type) {
      case 'number':
      case 'date':
      case 'datetime':
      case 'datetimesec':
      case 'datetick':
      case 'datetimetick':
      case 'datetimesectick':
        style.textAlign = 'right'
        break
      case 'check10':
      case 'checkYN':
      case 'checkTF':
        style.textAlign = 'center'
        style.textTransform = 'uppercase'
        break
      case 'select':
      case 'string':
        break
      default:
        throw new Error('VueExcelColumn: Not supported type:' + this.type)
    }

    if (this.uppercsae) style.textTransform='uppercase'
    if (this.readonly && this.$parent.readonlyColor) style.color = this.$parent.readonlyColor

    this.$parent.registerColumn({
      name: this.field,
      label: this.label === null ? this.field : this.label,
      type: this.type,
      width: this.width,
      validate: this.validate,
      autocomplete: this.autocomplete === null ? this.$parent.autocomplete : this.autocomplete,
      initStyle: style,
      visible: this.visible,
      readonly: this.readonly === null ? this.$parent.readonly : this.readonly,
      pos: Number(this.pos),
      options: this.options,
      toValue: this.toValue,
      toText: this.toText
    })
  }
}
</script>

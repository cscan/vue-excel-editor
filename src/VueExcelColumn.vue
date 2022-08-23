<template>
  <div />
</template>

<script>
export default {
  props: {
    field: {type: String, default: ''},
    label: {type: String, default: null},
    type: {type: String, default: 'string'},
    initStyle: {type: Object, default () {return {}}},
    width: {type: String, default: '100px'},
    invisible: {type: Boolean, default: false},
    readonly: {type: Boolean, default: null},
    textTransform: {type: String, default: null}, // replace uppercase prop
    textAlign: {type: String, default: null},
    keyField: {type: Boolean, default: false},
    sticky: {type: Boolean, default: false},

    validate: {type: Function, default: null},
    change: {type: Function, default: null},
    link: {type: Function, default: null},
    autoFillWidth: {type: Boolean, default: false},

    allowKeys: {type: [Array, Function], default () {return null}},
    mandatory: {type: String, default: ''},
    lengthLimit: {type: Number, default: 0},
    autocomplete: {type: Boolean, default: null},
    pos: {type: Number, default: 0},
    options: {type: [Array, Object, Function], default () {return null}},
    summary: {type: String, default: null},
    sort: {type: Function, default: null},
    toValue: {
      type: Function,
      default (text) {
        switch (this.textTransform) {
          case 'uppercase':
            text = text.toUpperCase()
            break
          case 'lowercase':
            text = text.toLowerCase()
            break
        }
        switch (this.type) {
          case 'datetick':
            // return moment(text, 'YYYY-MM-DD').valueOf()
            return new Date(text + ' GMT+0').getTime()
          case 'datetimetick':
            // return moment(text, 'YYYY-MM-DD HH:mm').valueOf()
            return new Date(text + ' GMT+0').getTime()
          case 'datetimesectick':
            // return moment(text, 'YYYY-MM-DD HH:mm:ss').valueOf()
            return new Date(text + ' GMT+0').getTime()
          case 'check10':
          case 'checkYN':
          case 'checkTF':
            return text.toUpperCase()
          case 'map':
            if (this.options.constructor.name.endsWith('Function')) {
              const list = this.options(text)
              return Object.keys(list).find(k => list[k] === text)
            }
            else
              return Object.keys(this.options).find(k => this.options[k] === text)
          default:
            return text
        }
      }
    },
    toText: {
      type: Function,
      default (val) {
        // § magic to hide the temp key
        if (this.keyField && val && val.toString().startsWith('§')) return ''
        const offset = new Date().getTimezoneOffset() * 60 * 1000
        let d
        switch (this.type) {
          case 'date':
            d = new Date(val).getTime()
            if (!d) return ''
            return new Date(d - offset).toISOString().slice(0, 10)
            // return val? new Date(new Date(val) - offset).toISOString().slice(0, 10) : ''
            // return val? moment(val).format('YYYY-MM-DD'): ''
          case 'datetick':
            d = new Date(val * 1 ? val * 1 : val).getTime()
            if (!d) return ''
            return new Date(d - offset).toISOString().slice(0, 10)
            // return val? moment(Number(val)).format('YYYY-MM-DD'): ''
            // return val? new Date(Number(val) - offset).toISOString().slice(0, 10) : ''
          case 'datetimetick':
            d = new Date(val * 1 ? val * 1 : val).getTime()
            if (!d) return ''
            return new Date(d - offset).toISOString().replace('T', ' ').slice(0, 16)
            // return val? moment(Number(val)).format('YYYY-MM-DD HH:mm'): ''
            // return val? new Date(Number(val) - offset).toISOString().replace('T', ' ').slice(0, 16) : ''
          case 'datetimesectick':
            d = new Date(val * 1 ? val * 1 : val).getTime()
            if (!d) return ''
            return new Date(d - offset).toISOString().replace('T', ' ').slice(0, 19)
            // return val? moment(Number(val)).format('YYYY-MM-DD HH:mm:ss'): ''
            // return val? new Date(Number(val) - offset).toISOString().replace('T', ' ').slice(0, 19) : ''
          case 'map':
            if (this.options.constructor.name.endsWith('Function'))
              return this.options(val)[val]
            else
              return this.options[val]
          default:
            return val
        }
      }
    },
    register: {type: Function, default: null}
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      const self = this
      let style = this.initStyle
      let validate = this.validate
      let allowKeys = this.allowKeys
      let lengthLimit = this.lengthLimit

      switch (this.type) {
        case 'number':
          style.textAlign = 'right'
          allowKeys = allowKeys || ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '-']
          break
        case 'date':
          allowKeys = allowKeys || ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '-']
          /*
          if (!validate) validate = (val) => {
            if (val === '') return ''
            // if (!moment(val, 'YYYY-MM-DD', true).isValid()) return this.$parent.localizedLabel.invalidInputValue
            if (!/^\d{4}-\d{2}-\d{2}$/.test(val)) return this.$parent.localizedLabel.invalidInputValue
            return ''
          }
          */
          break
        case 'datetime':
          allowKeys = allowKeys || ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '-', ' ', ':']
          /*
          if (!validate) validate = (val) => {
            if (val === '') return ''
            // if (!moment(val, 'YY-MM-DD hh:mm', true).isValid()) return this.$parent.localizedLabel.invalidInputValue
            if (!/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/.test(val)) return this.$parent.localizedLabel.invalidInputValue
            return ''
          }
          */
          break
        case 'datetimesec':
          allowKeys = allowKeys || ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '-', ' ', ':']
          /*
          if (!validate) validate = (val) => {
            if (val === '') return ''
            // if (!moment(val, 'YY-MM-DD hh:mm:ss', true).isValid()) return this.$parent.localizedLabel.invalidInputValue
            if (!/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(val)) return this.$parent.localizedLabel.invalidInputValue
            return ''
          }
          */
          break
        case 'datetick':
          allowKeys = allowKeys || ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '-', ' ', ':']
          break
        case 'datetimetick':
          allowKeys = allowKeys || ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '-', ' ', ':']
          break
        case 'datetimesectick':
          allowKeys = allowKeys || ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '-', ' ', ':']
          break
        case 'check10':
          style.textAlign = 'center'
          style.textTransform = 'uppercase'
          allowKeys = allowKeys || ['0', '1']
          lengthLimit = lengthLimit || 1
          break
        case 'checkYN':
          style.textAlign = 'center'
          style.textTransform = 'uppercase'
          allowKeys = allowKeys || ['Y', 'N']
          lengthLimit = lengthLimit || 1
          break
        case 'checkTF':
          style.textAlign = 'center'
          style.textTransform = 'uppercase'
          allowKeys = allowKeys || ['T', 'F']
          lengthLimit = lengthLimit || 1
          break
        case 'map':
          if (this.options.constructor.name === 'AsyncFunction')
            throw new Error('VueExcelColumn: Map does not support Async Function')
          break
        case 'select':
          break
        case 'string':
          break
        default:
          throw new Error('VueExcelColumn: Not supported type:' + this.type)
      }

      if (this.textTransform) style.textTransform = this.textTransform
      if (this.textAlign) style.textAlign = this.textAlign
      // if (this.readonly && this.$parent.readonlyStyle) style = Object.assign(style, this.$parent.readonlyStyle)

      this._autocomplete = self.autocomplete
      this._readonly = self.readonly

      this.$parent.registerColumn({
        name: this.field,
        label: this.label === null ? this.field : this.label,
        type: this.type,
        width: this.width,
        autoFillWidth: this.autoFillWidth,

        validate: validate,
        change: this.change,
        link: this.link,
        sort: this.sort,

        keyField: this.keyField,
        sticky: this.sticky,
        allowKeys: allowKeys,
        mandatory: this.mandatory,
        lengthLimit: Number(lengthLimit),
        textTransform: this.textTransform,

        get autocomplete () {
          return self._autocomplete === null ? self.$parent.autocomplete : self._autocomplete
        },
        set autocomplete (val) {
          self._autocomplete = val
        },
        initStyle: style,
        invisible: this.invisible,
        get readonly () {
          return self._readonly === null ? self.$parent.readonly : self._readonly
        },
        set readonly (val) {
          self._readonly = val
        },
        pos: Number(this.pos),
        options: this.options,
        summary: this.summary,
        toValue: this.toValue,
        toText: this.toText,
        register: this.register
      })
    }
  }
}
</script>

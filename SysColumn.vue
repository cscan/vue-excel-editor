<template>
  <td
    :id="uid"
    ref="cell"
    contenteditable
    :class="{error: err, readonly: readonly}"
    autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"
    v-on="listeners"
    @keydown.exact.enter="keyEnter"
    @keydown="keyDown"
    @focus="onFocus"
    @blur="onBlur">
    <!--
    @keydown.shift.37="keyWestShift"
    @keydown.shift.38="keyNorthShift"
    @keydown.shift.39="keyEastShift"
    @keydown.shift.40="keySouthShift"
    @keydown.exact.shift="keyShiftDown"
    @keyup.exact.shift="keyShiftUp"
    @click.shift="clickShift"
    -->
    <b-tooltip v-if="err"
               ref="tooltip"
               variant="danger"
               :target="uid"
               placement="right"
               trigger="hover focus">{{ err }}</b-tooltip>
  </td>
</template>

<script>
import moment from 'moment'

export default {
  props: {
    value: {type: String, default: ''},
    field: {type: String, default: ''},
    label: {type: String, default: ''},
    type: {type: String, default: 'string'},
    initStyle: {type: String, default: 'width:100px'},
    acceptEnter: {type: Boolean, default: false},
    validate: {type: Function, default: null},
    interactive: {type: Boolean, default: false},
    readonly: {type: Boolean, default: false},
    upperCase: {type: Boolean, default: false},
    toValue: {
      type: Function,
      default (html) {
        if (this.upperCase) html = html.toUpperCase()
        // if (html.includes('<') && html.includes('>'))
        //   html = html.replace(/<[^>]+>/g, '')
        switch (this.type) {
          case 'datetimetick':
            return moment(html, 'YY-MM-DD HH:mm').valueOf()
          case 'datetimesectick':
            return moment(html, 'YY-MM-DD HH:mm:ss').valueOf()
          case 'datetick':
            return moment(html, 'YY-MM-DD').valueOf()
          case 'number':
          case 'datetime':
          case 'datetimesec':
          case 'date':
            return html
          case 'check10':
          case 'checkYN':
          case 'checkTF':
            return html.toUpperCase()
          default:
            return html
            // return html.replace(/<br>/g, '\n')
        }
      }
    },
    toText: {
      type: Function,
      default (val) {
        switch (this.type) {
          case 'datetimesectick':
            return moment(Number(val)).format('YY-MM-DD HH:mm:ss')
          case 'datetimetick':
            return moment(Number(val)).format('YY-MM-DD HH:mm')
          case 'datetick':
            return moment(Number(val)).format('YY-MM-DD')
          case 'number':
          case 'datetime':
          case 'datetimesec':
          case 'date':
            return val
          case 'check10':
          case 'checkYN':
          case 'checkTF':
          default:
            return val
            // return val.replace(/\\n/g, '<br>')
        }
      }
    }
  },
  data () {
    return {
      uid: '',
      table: null,
      cell: null,
      row: null,
      colPos: 0,
      modified: false,
      justFocus: false
    }
  },
  computed: {
    listeners () {
      return {
        ...this.$listeners, input: this.onInput
      }
    },
    err () {
      if (this.validate)
        return this.validate(this.value)
      return ''
    }
  },
  watch: {
    value (newVal) {
      this.cell.innerText = this.toText(newVal)
    }
  },
  beforeMount () {
    if (!['string', 'number', 'money', 'check10', 'checkYN', 'checkTF',
      'date', 'datetime', 'datetimesec', 'datetick', 'datetimetick', 'datetimesectick'].includes(this.type))
      throw new Error('SysColumn: Invalid type ' + this.type)
  },
  mounted () {
    this.uid = 'uid' + this._uid

    // Convert the value into html
    this.cell = this.$refs.cell
    this.cell.innerText = this.toText(this.value)

    // Store the DOM neighbour
    this.row = this.cell.parentNode
    this.table = this.row.parentNode.parentNode
    this.colPos = Array.from(this.row.children).indexOf(this.cell)
    this.colLabel = this.table.children[1].children[0].children[this.colPos]
    this.rowPos = this.row.getAttribute('pos') * 1
    // this.rowPos = Array.from(this.row.parentNode.children).indexOf(this.row)
    this.rowLabel = this.row.children[0]
    switch (this.type) {
      case 'number':
        this.cell.style.textAlign = 'right'
        break
      case 'date':
      case 'datetime':
      case 'datetimesec':
      case 'datetick':
      case 'datetimetick':
      case 'datetimesectick':
        this.cell.style.textAlign = 'right'
        break
      case 'check10':
      case 'checkYN':
      case 'checkTF':
        this.cell.style.textAlign = 'center'
        this.cell.style.textTransform = 'uppercase'
        break
    }
    if (this.upperCase)
      this.cell.style.textTransform = 'uppercase'

    // Propagate the label and style to thead and colgroup if first row
    if (!this.row.previousSibling) {
      const theadtr = this.table.children[1].children[0]
      if (this.label && theadtr.children[this.colPos] !== null)
        theadtr.children[this.colPos].children[0].innerHTML = this.label
      const filtertr = this.table.children[1].children[1]
      if (filtertr.children[this.colPos] !== null) {
        if (this.field)
          filtertr.children[this.colPos].setAttribute('field', this.field)
        if (this.type)
          filtertr.children[this.colPos].setAttribute('type', this.type)
      }
      // const colgroup = this.table.children[0]
      if (this.initStyle && theadtr.children[this.colPos])
        theadtr.children[this.colPos].setAttribute('style', this.initStyle)
      if (this.$parent.refreshColumnAttribute)
        this.$parent.refreshColumnAttribute()
    }
  },
  methods: {
    updateValue (e) {
      const content = this.toValue(e.target.innerText)
      const row = this.$parent.pageTop + this.rowPos
      if (this.value !== content)
        // multi-edit
        if (this.$parent.selectedCount && this.$parent.selected[row])
          return this.$parent.updateSelectedRowsByCol(this.colPos, content)
        else if (this.$parent.updateCell)
          this.$parent.updateCell(row, this.field, content)
        else
          this.$emit('input', content)
    },
    onInput (e) {
      if (this.interactive)
        this.updateValue(e)
    },
    onFocus () {
      this.justFocus = true
      setTimeout(() => {
        document.execCommand('selectAll', false, null)
        this.colLabel.classList.add('focus')
        this.rowLabel.classList.add('focus')
        this.$parent.currentRecord = this.row
        this.$parent.currentRowPos = this.rowPos
        this.$parent.currentColPos = this.colPos
        this.justFocus = false
      }, 0)
    },
    onBlur (e) {
      setTimeout(() => {
        if (this.modified) this.updateValue(e)
        this.modified = false
        this.colLabel.classList.remove('focus')
        this.rowLabel.classList.remove('focus')
        e.target.classList.remove('edit')
      }, 0)
    },
    keyEnter (e) {
      if (!this.acceptEnter) {
        e.preventDefault()
        if (!this.$parent.keySouth(e))
          setTimeout(this.updateValue(e), 0)
      }
    },
    keyDown (e) {
      if (this.readonly) {
        e.preventDefault()
        return false
      }
      else {
        this.modified = true
        if (this.justFocus)
          if (e.key.length === 1 || e.keyCode === 8 || e.keyCode === 46)
            e.target.innerHTML = ''
      }
    }
    /*
    keyWestShift (e) {
      const td = this.keyWest(e)
      this.$emit('selProcess', td)
    },
    keyNorthShift (e) {
      const td = this.keyNorth(e)
      this.$emit('selProcess', td)
    },
    keyEastShift (e) {
      const td = this.keyEast(e)
      this.$emit('selProcess', td)
    },
    keySouthShift (e) {
      const td = this.keySouth(e)
      this.$emit('selProcess', td)
    },
    keyShiftDown (e) {
      if (e.keyCode === 16)
        this.$emit('selStart', e.target)
    },
    keyShiftUp (e) {
      this.$emit('selEnd', e.target)
    },
    clickShift (e) {
      this.$emit('selEnd', e.target)
    }
    */
  }
}
</script>

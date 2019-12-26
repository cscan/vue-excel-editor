<template>
  <td
    :id="uid"
    ref="cell"
    contenteditable
    ondragenter="event.preventDefault(); event.dataTransfer.dropEffect = 'none'"
    ondragover="event.preventDefault(); event.dataTransfer.dropEffect = 'none'"
    class="cell column-filter"
    :style="filterRowTop"
    autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"
    v-on="listeners"
    @focus="onFocus"
    @blur="onBlur"
    @keydown.exact.37="keyWest"
    @keydown.exact.39="keyEast"
    @keydown.exact.enter="keyEnter"
    @keyup.exact.delete="keyDelete"
    @mousemove="mouseMove"
    @mousedown="mouseDown" />
</template>

<script>
export default {
  props: {
    value: {type: String, default: ''},
    interactive: {type: Boolean, default: false}
  },
  data () {
    return {
      uid: '',
      table: null,
      cell: null,
      row: null,
      colPos: 0,
      rect: null
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
    },
    filterRowTop () {
      if (this.cell) return {top: this.cell.offsetTop + 'px'}
      else return {}
    },
  },
  watch: {
    value (newVal) {
      if (newVal !== this.$el.textContent)
        this.$refs.cell.textContent = newVal
    }
  },
  mounted () {
    this.uid = 'uid' + this._uid
    // remember the first value

    // Convert the value into html
    this.cell = this.$refs.cell
    this.cell.textContent = this.value

    // Store the DOM neighbour
    this.row = this.cell.parentNode
    this.thead = this.row.parentNode
    this.colPos = Array.from(this.row.children).indexOf(this.cell) - 1
    this.colLabel = this.thead.children[0].children[this.colPos + 1]
  },
  methods: {
    updateValue (e) {
      const content = e.target.textContent
      if (this.value !== content)
        this.$emit('input', content)
    },
    onInput (e) {
      if (this.interactive)
        this.updateValue(e)
    },
    onFocus () {
      setTimeout(() => {
        this.colLabel.classList.add('focus')
        document.execCommand('selectAll', false, null)
        this.$parent.currentColPos = this.colPos
        this.$parent.currentRowPos = -1
        this.$parent.labelTr.children[this.$parent.currentColPos + 1].classList.add('focus')
      }, 0)
    },
    onBlur (e) {
      this.updateValue(e)
      this.colLabel.classList.remove('focus')
      e.target.classList.remove('edit')
    },
    keyWest (e) {
      const sel = document.getSelection()
      if (e.target.textContent === sel.toString() || sel.focusOffset === 0) {
        let td = e.target.previousSibling
        if (td && td.style.display === 'none') td = td.previousSibling
        if (!td) return td
        if (!td.tagName) td = td.previousSibling
        if (td.focus) td.focus()
        return td
      }
    },
    keyEast (e) {
      const sel = document.getSelection()
      if (e.target.textContent === sel.toString() || sel.focusOffset >= e.target.textContent.length) {
        let td = e.target.nextSibling
        if (td && td.style.display === 'none') td = td.nextSibling
        if (!td) return td
        if (!td.tagName) td = td.nextSibling
        if (td.focus) td.focus()
        return td
      }
      return e.target
    },
    keyEnter (e) {
      e.preventDefault()
      document.execCommand('selectAll', false, null)
      // if (!this.$parent.keyEast(e))
      this.updateValue(e)
    },
    keyDelete (e) {
      if (e.target.textContent === '')
        setTimeout(this.updateValue(e), 0)
    },
    mouseMove (e) {
      this.cell.style.cursor = this.cell.offsetWidth - e.offsetX < 15 ? 'pointer' : 'text'
    },
    mouseDown (e) {
      if (e.button === 0 && this.cell.offsetWidth - e.offsetX < 15) {
        e.preventDefault()
        setTimeout(() => {
          // this.$parent.showFilterPanel(this)
          this.$parent.$refs.panelFilter.showPanel(this)
        }, 0)
      }
    }
  }
}
</script>
<style scoped>
.column-filter {
  background-image: url('./assets/dropdown.png');
  background-repeat: no-repeat;
  background-size: 36px;
  background-position: right -12px top -1px;
}

</style>

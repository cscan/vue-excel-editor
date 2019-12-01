<template>
  <td
    :id="uid"
    ref="cell"
    contenteditable
    ondragenter="event.preventDefault(); event.dataTransfer.dropEffect = 'none'"
    ondragover="event.preventDefault(); event.dataTransfer.dropEffect = 'none'"
    class="cell column-filter"
    autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"
    v-on="listeners"
    @focus="onFocus"
    @blur="onBlur"
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
    }
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
    this.table = this.row.parentNode.parentNode
    this.colPos = Array.from(this.row.children).indexOf(this.cell)
    this.colLabel = this.table.children[1].children[0].children[this.colPos]
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
      }, 0)
    },
    onBlur (e) {
      setTimeout(() => {
        this.updateValue(e)
        this.colLabel.classList.remove('focus')
        e.target.classList.remove('edit')
      }, 0)
    },
    keyEnter (e) {
      e.preventDefault()
      document.execCommand('selectAll', false, null)
      if (!this.$parent.keyEast(e))
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
          this.$parent.showFilterPanel(this)
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

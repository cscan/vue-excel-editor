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
    tabindex="-1"
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
        // document.execCommand('selectAll', false, null)
        this.selectAll(this.cell)
        this.$parent.currentColPos = this.colPos
        this.$parent.currentRowPos = -1
        this.$parent.labelTr.children[this.$parent.currentColPos + 1].classList.add('focus')
      }, 0)
    },
    selectAll(node) {
      const selection = window.getSelection()
      if (selection) {
        const range = document.createRange()
        range.selectNodeContents(node)
        selection.removeAllRanges()
        selection.addRange(range)
      }
    },
    onBlur (e) {
      this.updateValue(e)
      this.colLabel.classList.remove('focus')
      e.target.classList.remove('edit')
    },
    keyWest (e) {
      const sel = document.getSelection()
      if (e.target.textContent === sel.toString() || sel.focusOffset === 0) {
        let td = e.target.previousElementSibling
        while (td && td.style && td.style.display === 'none') td = td.previousElementSibling
        if (!td) return td
        if (td.focus) td.focus()
        return td
      }
      return e.target
    },
    keyEast (e) {
      const sel = document.getSelection()
      if (e.target.textContent === sel.toString() || sel.focusOffset >= e.target.textContent.length) {
        let td = e.target.nextElementSibling
        while (td && td.style && td.style.display === 'none') td = td.nextElementSibling
        if (!td) return td
        if (td.focus) td.focus()
        return td
      }
      return e.target
    },
    keyEnter (e) {
      e.preventDefault()
      // document.execCommand('selectAll', false, null)
      this.selectAll(this.cell)
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
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHsAAABuCAMAAAAwApxlAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAE4UExURQAAAAAAAICAgFVVVUBAQICAgGZmZoCAgJKSko6OjmZmZoCAgHZ2doCAgIiIiHh4eIeHh4CAgHl5eXl5eYaGhoWFhYCAgIWFhXt7e4SEhIODg4CAgICAgH19fYKCgoCAgISEhIKCgn19fX19fYKCgoCAgH5+foGBgX5+foCAgHx8fH19fYCAgH5+foCAgHx8fH5+fn5+foGBgYCAgH5+fn5+foCAgIODg4CAgIGBgYODg3x8fICAgIGBgYCAgICAgH9/f39/f4CAgH9/f4CAgICAgH9/f4CAgIGBgYSEhIODg39/f4CAgH9/f4CAgICAgICAgH9/f4CAgH5+fn9/f35+foCAgIKCgoSEhIODg39/f4CAgIKCgoSEhH9/f4GBgYKCgoODg4SEhIWFhYaGhoeHh4iIiImJiW6rGxQAAABedFJOUwABAgMEBAUGBwkKCg0ODxEREhMVFRcYGRsfJSowMTE0NDU7Pz9CQ0VNUFReXl9gZ2ttb3BxdXh5fH19f4CAgoWLkZqbnqChoaSkqqurra28wsXFydXW1tbq7u/x+fuJeTf3AAAACXBIWXMAABbqAAAW6gHljkMQAAABFUlEQVRoQ+3X11LCUBSF4RAEVFCwYEXFgr0g9gLYexcbahLDOcn7v4HArGfYmWHWd7X/q3O39xyDiIiIiIiIiIgoKOHORLwNs7DuhVK5tDyEkrX45Svv9wAla8e3LEvd9CElmXu6/nbtIY0WtaEcx9EXHUhRmdv3t8rjPEpYOjc3O4yZqFWlxrOZILZa3cjx88vTySRKVl65f653GkVKihS95j4fQEsy95t37K4fLWrpR9eUexRCihosXJ6dH46ihMWSval2zEQtyhzLb65PhVGyZl6r39XKKkrWlmfbtneVQEqKFBt/A/c+iFsS2m3cMX3dhRaV+/C1/7mGkhWfWNkuTPegxEVjGIiIiIiIiIiIiIJlGP8KtCi1NMvKyQAAAABJRU5ErkJggg==');
  background-repeat: no-repeat;
  background-size: 36px;
  background-position: right -12px top -1px;
}

</style>

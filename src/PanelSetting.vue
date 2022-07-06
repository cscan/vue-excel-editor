<template>
  <div id="panelModal" v-show="show" class="panel-modal" @click="clickOutside" @keydown.exact.esc="hidePanel">
    <div ref="panelSetting"
         class="panel-body">
      <div class="panel-title">
        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="bars" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="svg-inline--fa fa-bars fa-w-14 fa-1x"><path fill="currentColor" d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z" class=""></path></svg>
        <span v-html="localizedLabel.tableSetting" />
      </div>
      <div class="panel-content">
        <div class="panel-action">
          <button class="panel-button float-left no-margin" @click="exportTable('excel')">
            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="file-excel" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" class="svg-inline--fa fa-file-excel fa-w-12"><path fill="currentColor" d="M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm60.1 106.5L224 336l60.1 93.5c5.1 8-.6 18.5-10.1 18.5h-34.9c-4.4 0-8.5-2.4-10.6-6.3C208.9 405.5 192 373 192 373c-6.4 14.8-10 20-36.6 68.8-2.1 3.9-6.1 6.3-10.5 6.3H110c-9.5 0-15.2-10.5-10.1-18.5l60.3-93.5-60.3-93.5c-5.2-8 .6-18.5 10.1-18.5h34.8c4.4 0 8.5 2.4 10.6 6.3 26.1 48.8 20 33.6 36.6 68.5 0 0 6.1-11.7 36.6-68.5 2.1-3.9 6.2-6.3 10.6-6.3H274c9.5-.1 15.2 10.4 10.1 18.4zM384 121.9v6.1H256V0h6.1c6.4 0 12.5 2.5 17 7l97.9 98c4.5 4.5 7 10.6 7 16.9z" class=""></path></svg>
            <span v-html="localizedLabel.exportExcel" />
          </button>
          <button class="panel-button float-right no-margin" @click="importTable">
            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="file-csv" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" class="svg-inline--fa fa-file-csv fa-w-12"><path fill="currentColor" d="M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm-96 144c0 4.42-3.58 8-8 8h-8c-8.84 0-16 7.16-16 16v32c0 8.84 7.16 16 16 16h8c4.42 0 8 3.58 8 8v16c0 4.42-3.58 8-8 8h-8c-26.51 0-48-21.49-48-48v-32c0-26.51 21.49-48 48-48h8c4.42 0 8 3.58 8 8v16zm44.27 104H160c-4.42 0-8-3.58-8-8v-16c0-4.42 3.58-8 8-8h12.27c5.95 0 10.41-3.5 10.41-6.62 0-1.3-.75-2.66-2.12-3.84l-21.89-18.77c-8.47-7.22-13.33-17.48-13.33-28.14 0-21.3 19.02-38.62 42.41-38.62H200c4.42 0 8 3.58 8 8v16c0 4.42-3.58 8-8 8h-12.27c-5.95 0-10.41 3.5-10.41 6.62 0 1.3.75 2.66 2.12 3.84l21.89 18.77c8.47 7.22 13.33 17.48 13.33 28.14.01 21.29-19 38.62-42.39 38.62zM256 264v20.8c0 20.27 5.7 40.17 16 56.88 10.3-16.7 16-36.61 16-56.88V264c0-4.42 3.58-8 8-8h16c4.42 0 8 3.58 8 8v20.8c0 35.48-12.88 68.89-36.28 94.09-3.02 3.25-7.27 5.11-11.72 5.11s-8.7-1.86-11.72-5.11c-23.4-25.2-36.28-58.61-36.28-94.09V264c0-4.42 3.58-8 8-8h16c4.42 0 8 3.58 8 8zm121-159L279.1 7c-4.5-4.5-10.6-7-17-7H256v128h128v-6.1c0-6.3-2.5-12.4-7-16.9z" class=""></path></svg>
            <span v-html="localizedLabel.importExcel" />
          </button>
        </div>
        <div>
          <div ref="panelList" class="panel-list">
            <draggable v-model="fields" draggable=".panel-list-item">
              <div v-for="(item, k) in fields" :key="k"
                   class="panel-list-item"
                   @click.prevent="columnLabelClick($event, item)">
                <input type="checkbox" :checked="!item.invisible" :disabled="true" class="panel-checkbox">
                <span>{{ item.label }}</span>
              </div>
            </draggable>
          </div>
        </div>
      </div>

      <div class="panel-footer">
        <button ref="button" class="panel-button" @click="reset">
          <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="save" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="svg-inline--fa fa-save fa-w-14 fa-fw fa-sm"><path fill="currentColor" d="M433.941 129.941l-83.882-83.882A48 48 0 0 0 316.118 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V163.882a48 48 0 0 0-14.059-33.941zM224 416c-35.346 0-64-28.654-64-64 0-35.346 28.654-64 64-64s64 28.654 64 64c0 35.346-28.654 64-64 64zm96-304.52V212c0 6.627-5.373 12-12 12H76c-6.627 0-12-5.373-12-12V108c0-6.627 5.373-12 12-12h228.52c3.183 0 6.235 1.264 8.485 3.515l3.48 3.48A11.996 11.996 0 0 1 320 111.48z" class=""></path></svg>
          <span v-html="localizedLabel.reset" />
        </button>
        <button ref="button" class="panel-button" @click="hidePanel">
          <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="sign-in-alt" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-sign-in-alt fa-w-16 fa-fw fa-sm"><path fill="currentColor" d="M416 448h-84c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h84c17.7 0 32-14.3 32-32V160c0-17.7-14.3-32-32-32h-84c-6.6 0-12-5.4-12-12V76c0-6.6 5.4-12 12-12h84c53 0 96 43 96 96v192c0 53-43 96-96 96zm-47-201L201 79c-15-15-41-4.5-41 17v96H24c-13.3 0-24 10.7-24 24v96c0 13.3 10.7 24 24 24h136v96c0 21.5 26 32 41 17l168-168c9.3-9.4 9.3-24.6 0-34z" class=""></path></svg>
          <span v-html="localizedLabel.back" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  components: {
    'draggable': draggable
  },
  props: {
    value: Array,
    localizedLabel: {
      type: Object,
      default () {
        return {
          tableSetting: 'Table Setting',
          exportExcel: 'Export Excel',
          importExcel: 'Import Excel',
          back: 'Back',
          reset: 'Default'
        }
      }
    }
  },
  data () {
    return {
      show: false,
      processing: false
    }
  },
  computed: {
    fields: {
      get: function () {
        return this.value
      },
      set: function (newVal) {
        this.$emit('input', newVal)
      }
    }
  },
  methods: {
    reset () {
      this.$parent.resetColumn()
      this.hidePanel()
    },
    clickOutside (e) {
      if (e.target.id === 'panelModal') this.hidePanel()
    },
    columnLabelClick (e, item) {
      item.invisible = !item.invisible
      setTimeout(this.$parent.calStickyLeft)
    },
    freezePanelSizeAfterShown () {
      const target = this.$refs.panelList
      const rect = target.getBoundingClientRect()
      target.setAttribute('style', `width:${rect.width}px; height:${rect.height}px;`)
    },
    removePanelSizeAfterHide () {
      const target = this.$refs.panelList
      target.removeAttribute('style')
    },
    exportTable (format) {
      this.hidePanel()
      this.$parent.exportTable(format)
    },
    importTable () {
      this.hidePanel()
      this.$parent.importTable()
    },
    showPanel () {
      this.show = true
      setTimeout(() => (this.$refs.button.focus()))
      setTimeout(() => this.freezePanelSizeAfterShown())
    },
    hidePanel () {
      this.show = false
      this.removePanelSizeAfterHide()
    }
  }
}
</script>

<style scoped>

input:focus, button:focus {
  outline: none !important;
  box-shadow: inset 0 -1px 0 #ddd !important;
}

.panel-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: #0007;
  z-index: 999;
  font-weight: 400;
  font-size: 1rem;
  text-shadow: none;
}

.panel-body {
  background-color: white;
  position: fixed;
  border-radius: 5px;
  padding: 0;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 28rem;
  max-width: 75vh;
  height: fit-content;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
}

.panel-title {
  padding: 1rem;
  display: flex;
  color: dimgray;
  font-size: 1.25rem;
  line-height: 1.5rem;
  align-items: center;
  justify-content: flex-start;
  border-bottom: 1px solid lightgray;
}

div.panel-title span, button.panel-button span {
  margin-left: 6px;
}

.panel-content {
  padding: 1rem;
  text-align: left;
  overflow-y: scroll;
}

.panel-content .panel-button {
  width: 48%;
  background-color: #17a2b8;
}

.panel-action {
  display: inline-block;
  margin-bottom: 0.5rem;
  width: 100%;
  position: relative;
  white-space: nowrap;
}

.panel-footer {
  display: flex;
  padding: 1rem;
  align-items: center;
  justify-content: flex-end;
  border-top: 1px solid lightgray;
}

.panel-button {
  width: 120px;
  font-size: 0.88rem;
  border-radius: 5px;
  border: 0;
  background-color: #007bff;
  margin-left: 10px;
  color: white;
  padding: 0.6rem;
  cursor: pointer;
}

.float-left {
  float: left !important;
}

.float-right {
  float: right !important;
}

.panel-list {
  overflow-y: scroll;
  max-height: 20rem;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  display: flex;
  flex-direction: column;
}
.panel-checkbox {
  vertical-align: 2px;
}
.panel-list span {
  margin-left: 10px;
  color: gray;
}
.panel-list-item {
  padding: 10px 10px;
  font-size: 0.88rem;
  cursor: pointer;
}
.panel-list-item:hover {
  background-color: lightskyblue;
}
.panel-list-item:not(:last-child) {
  border-bottom: 1px solid lightgray;
}

.fa-spin {
  -webkit-animation: fa-spin 2s infinite linear;
  animation: fa-spin 2s infinite linear;
}
.svg-inline--fa.fa-w-14 {
  width: 0.875em;
}
.svg-inline--fa.fa-w-16 {
  width: 1em;
}
.svg-inline--fa.fa-fw {
  width: 1.25em;
}
.svg-inline--fa {
  display: inline-block;
  font-size: inherit;
  height: 1em;
  overflow: visible;
  vertical-align: -0.125em;
}
.fa-fw {
  text-align: center;
  width: 1.25em;
}
.fa-xs {
  font-size: 0.75em;
}
.fa-sm {
  font-size: 0.875em;
}
.fa-1x {
  font-size: 1em;
}
.fa-2x {
  font-size: 2em;
}
.fa-3x {
  font-size: 3em;
}
.no-margin {
  margin: 0 !important;
}
</style>

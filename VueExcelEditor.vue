<template>
  <div>
    <div class="table-content"
         @mouseover="mouseOver"
         @mouseout="mouseOut"
         @mousemove="mouseMove"
         @mouseup="mouseUp">
      <div v-show="focused" ref="inputSquare" class="input-square" @mousedown="inputSquareClick">
        <div style="position: relative; height: 100%; padding: 2px">
          <textarea ref="inputBox"
                    class="input-box"
                    @blur="inputBoxBlur"
                    @keydown="inputBoxKeydown"
                    trim
                    autocomplete="off"
                    autocorrect="off"
                    autocompitaize="off"
                    spellcheck="false"></textarea>
          <div class="rb-square" />
        </div>
      </div>
      <table ref="systable"
             style="table-layout: fixed"
             class="systable table table-bordered table-sm"
             ondragenter="event.preventDefault(); event.dataTransfer.dropEffect = 'none'"
             ondragover="event.preventDefault(); event.dataTransfer.dropEffect = 'none'">
        <colgroup>
          <!--col class="first-col">
          <col v-for="item in nFields" :key="`col-${item}`" style="width: 100px"-->
        </colgroup>
        <thead class="thead-light text-center">
          <tr>
            <th class="text-center first-col" @click="settingClick">
              <font-awesome-icon v-if="processing" icon="spinner" spin size="sm" />
              <font-awesome-icon v-else icon="bars" size="sm" />
            </th>
            <th v-for="(item, p) in fields"
                v-show="item.visible"
                :key="`th-${p}`"
                :class="{'sort-asc-sign': sortPos==p && sortDir==1,
                         'sort-des-sign': sortPos==p && sortDir==-1}"
                class="table-col-header"
                :style="{width: item.width}"
                @mousedown="headerClick($event, p)">
              <div :class="{'filter-sign': columnFilter[p]}">
                {{ item.label }}
              </div>
              <div class="col-sep"
                   @mousedown="colSepMouseDown"
                   @mouseover="colSepMouseOver"
                   @mouseout="colSepMouseOut" />
            </th>
          </tr>
          <tr>
            <td class="text-center first-col" @click="selectAllClick">
              <font-awesome-icon v-if="selectedCount==table.length" icon="times-circle" size="sm" />
              <font-awesome-icon v-else icon="check-circle" size="sm" />
            </td>
            <vue-excel-filter v-for="(item, p) in fields"
                              v-show="item.visible"
                              :key="`th2-${p}`"
                              v-model="columnFilter[p]"
                              class="column-filter" />
          </tr>
        </thead>
        <tbody @mousedown.exact="mouseDown">
          <tr v-for="(record, rowPos) in pagingTable"
              :key="rowPos"
              :pos="rowPos"
              :class="{select: selected[pageTop + rowPos]}"
              :style="rowStyle(record)">
            <td class="text-center first-col"
                scope="row"
                @click="rowLabelClick">{{ recordLabel(record, rowPos) }}</td>
            <template v-for="(item, p) in fields">
              <td v-if="item.validate"
                  v-show="item.visible"
                  :id="`cell-${p+rowPos*fields.length}`"
                  :class="{readonly: item.readonly, error: errmsg[`${record.key}:${item.name}`]}"
                  :style="item.initStyle"
                  :key="`f${p}`">{{ item.toText(record[item.name]) }}
                <b-tooltip v-if="errmsg[`${record.key}:${item.name}`]"
                          variant="danger"
                          :target="`cell-${p+rowPos*fields.length}`"
                          placement="right"
                          trigger="hover focus">{{ errmsg[`${record.key}:${item.name}`] }}</b-tooltip>
              <td v-else
                  v-show="item.visible"
                  :class="{readonly: item.readonly}"
                  :style="item.initStyle"
                  :key="`f${p}`">{{ item.toText(record[item.name]) }}
              </td>
            </template>
          </tr>
        </tbody>
        <slot></slot>
      </table>
      <div ref="footer" class="footer col col-12 text-center">
        <span v-show="!noPaging" style="float: left">
          Record {{ pageTop + 1 }} to {{ pageBottom }} of {{ table.length }}
        </span>
        <span v-show="!noPaging" style="position: absolute; left: 0; right: 0">
          <template v-if="processing">
            <font-awesome-icon icon="spinner" spin size="sm" /> Processing
          </template>
          <template v-else>
            <b-link :disabled="pageTop <= 0" @click="firstPage">
              <font-awesome-icon icon="step-backward" size="sm" /> First
            </b-link>
            &nbsp;|&nbsp;
            <b-link :disabled="pageTop <= 0" @click="prevPage">
              <font-awesome-icon icon="backward" size="sm" /> Previous
            </b-link>
            &nbsp;|&nbsp;
            <b-link :disabled="pageTop + pageSize >= table.length" @click="nextPage">
              Next <font-awesome-icon icon="forward" size="sm" />
            </b-link>
            &nbsp;|&nbsp;
            <b-link :disabled="pageTop + pageSize >= table.length" @click="lastPage">
              Last <font-awesome-icon icon="step-forward" size="sm" />
            </b-link>
          </template>
        </span>
        <span style="float: right">
          Selected: {{ Object.keys(selected).length }} | Filtered: {{ table.length }} | Loaded: {{ value.length }}
        </span>
      </div>
      <b-modal id="panelFilter" ref="panelFilter" centered @shown="freezePanelSizeAfterShown($refs.panelList)">
        <template v-slot:modal-title>
          <font-awesome-icon icon="sort-amount-down" size="xs" />
          &nbsp;&nbsp;Sorting and Filter
        </template>
        <b-form-group style="white-space: nowrap">
          <b-button class="float-left" variant="info" style="width:48%" @click="sort(1)">
            <font-awesome-icon icon="sort-alpha-down" />
            &nbsp;&nbsp;Sort Ascending
          </b-button>
          <b-button class="float-right" variant="info" style="width:48%" @click="sort(-1)">
            <font-awesome-icon icon="sort-alpha-up-alt" />
            &nbsp;&nbsp;Sort Descending
          </b-button>
        </b-form-group>
        <b-form-group>
          <b-input-group>
            <template v-slot:prepend>
              <b-dropdown no-caret variant="success">
                <template slot="button-content">
                  <font-awesome-icon v-if="inputFilterCondition=='='" icon="equals" size="sm" />
                  <font-awesome-icon v-if="inputFilterCondition=='>'" icon="greater-than" size="sm" />
                  <font-awesome-icon v-if="inputFilterCondition=='>='" icon="greater-than-equal" size="sm" />
                  <font-awesome-icon v-if="inputFilterCondition=='<'" icon="less-than" size="sm" />
                  <font-awesome-icon v-if="inputFilterCondition=='<='" icon="less-than-equal" size="sm" />
                  <font-awesome-icon v-if="inputFilterCondition=='~'" icon="percentage" size="sm" />
                </template>
                <b-dropdown-item>
                  <a href="#" @click.prevent="inputFilterCondition='='">
                    <font-awesome-icon icon="equals" size="sm" />
                    &nbsp;&nbsp;Wildcard Match
                  </a>
                </b-dropdown-item>
                <b-dropdown-item>
                  <a href="#" @click.prevent="inputFilterCondition='>'">
                    <font-awesome-icon icon="greater-than" size="sm" />
                    &nbsp;&nbsp;Greater than
                  </a>
                </b-dropdown-item>
                <b-dropdown-item>
                  <a href="#" @click.prevent="inputFilterCondition='>='">
                    <font-awesome-icon icon="greater-than-equal" size="sm" />
                    &nbsp;&nbsp;Greater than or Equal to
                  </a>
                </b-dropdown-item>
                <b-dropdown-item>
                  <a href="#" @click.prevent="inputFilterCondition='<'">
                    <font-awesome-icon icon="less-than" size="sm" />
                    &nbsp;&nbsp;Less than
                  </a>
                </b-dropdown-item>
                <b-dropdown-item>
                  <a href="#" @click.prevent="inputFilterCondition='<='">
                    <font-awesome-icon icon="less-than-equal" size="sm" />
                    &nbsp;&nbsp;Less than or Equal to
                  </a>
                </b-dropdown-item>
                <b-dropdown-item>
                  <a href="#" @click.prevent="inputFilterCondition='~'">
                    <font-awesome-icon icon="percentage" size="sm" />
                    &nbsp;&nbsp;Regular Expression
                  </a>
                </b-dropdown-item>
              </b-dropdown>
            </template>
            <b-form-input ref="inputFilter"
                          placeholder="Custom Filter"
                          autofocus
                          trim autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"
                          @keyup="doInputFilter"
                          @keydown.exact.enter="doFilter" />
          </b-input-group>
        </b-form-group>
        <div ref="panelList" class="list-group list-group-flush panel-list">
          <a v-for="(item, k) in filteredSortedUniqueValueList.slice(0, nFilterCount)" :key="k"
            href="#"
            class="list-group-item list-group-item-action panel-list-item"
            @click.prevent="filterPanelSelect(item)">
            <b-checkbox size="sm">
              {{ item }}
            </b-checkbox>
          </a>
        </div>
        <div v-if="filteredSortedUniqueValueList.length>500" class="normal-text" style="float:right">List first {{ nFilterCount }} values only</div>
        <template v-slot:modal-footer>
          <b-button variant="primary input-button" @click="doFilter">
            <span>
              <font-awesome-icon v-if="processing" icon="spinner" spin size="sm" fixed-width />
              <font-awesome-icon v-else icon="sign-in-alt" size="sm" fixed-width />
            </span>
            Apply
          </b-button>
        </template>
      </b-modal>
      <b-modal id="panelGrid" ref="panelGrid" centered>
        <template v-slot:modal-title>
          <font-awesome-icon icon="bars" size="xs" />
          &nbsp;&nbsp;Table Setting
        </template>
        <b-form-group style="white-space: nowrap">
          <b-button class="float-left" variant="info" style="width:48%" @click="exportTable('excel')">
            <font-awesome-icon icon="file-excel" />
            &nbsp;&nbsp;Export Excel
          </b-button>
          <b-button class="float-right" variant="info" style="width:48%" @click="exportTable('csv')">
            <font-awesome-icon icon="file-csv" />
            &nbsp;&nbsp;Export CSV
          </b-button>
        </b-form-group>
        <div ref="fieldList" class="list-group list-group-flush panel-list">
          <a v-for="(item, k) in fields" :key="k"
            href="#"
            class="list-group-item list-group-item-action panel-list-item"
            @click.prevent="item.visible = !item.visible">
            <b-checkbox size="sm" :checked="item.visible">
              {{ item.label }}
            </b-checkbox>
          </a>
        </div>
        <template v-slot:modal-footer>
          <b-button variant="primary input-button" @click="saveSetting">
            <span>
              <font-awesome-icon v-if="processing" icon="spinner" spin size="sm" fixed-width />
              <font-awesome-icon v-else icon="save" size="sm" fixed-width />
            </span>
            Back
          </b-button>
        </template>
      </b-modal>
      <div v-show="processing" ref="frontdrop" class="front-drop">
        <font-awesome-icon icon="spinner" spin size="3x" />
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import BootstrapVue from 'bootstrap-vue'
import VueExcelFilter from './VueExcelFilter'
import XLSX from 'xlsx'

library.add(fas)
Vue.use(BootstrapVue)

export default {
  components: {
    'font-awesome-icon': FontAwesomeIcon,
    'vue-excel-filter': VueExcelFilter
  },
  props: {
    value: {type: Array,                            // actual table content
      default () {
        return []
      }
    },
    rowStyle: {                                    // return the row style
      type: Function,
      default () {
        return {}
      }
    },
    recordLabel: {                                  // return the row header
      type: Function,
      default (record, recordPosition) {
        return this.pageTop + recordPosition + 1
      }
    },
    noPaging: {type: Boolean, default: false},
    page: {type: Number, default: 0},               // prefer page size, auto-cal if not provided
    newRecord: {type: Function, default: null},     // return the new record from caller if provided
    nFilterCount: {type: Number, default: 200},     // show top n values in filter dialog
    height: {type: Number, default: 0}
  },
  data () {
    return {
      // selTarget: null,
      // selSquare: null,
      // selx: 0,
      // sely: 0,

      systable: null,               // TABLE dom node
      colgroupTr: null,             // colgroup TR dom node
      labelTr: null,                // THEAD label dom node
      filterTr: null,               // THEAD filter dom node
      recordBody: null,             // TBODY dom node
      footer: null,                 // TFOOTER dom node

      pageSize: 20,                 // Default page size
      pageTop: 0,                   // Current page top pos of [table] array

      selected: {},                 // selected storage in hash, key is the pos of [table] array
      selectedCount: 0,             // selected row count
      prevSelect: -1,               // previous select pos of [table] array
      processing: false,            // current general-purpose processing status

      rowIndex: {},                 // index of the record key to pos of [table] array

      currentRecord: null,          // focusing TR dom node
      currentRowPos: -1,            // focusing array pos of [table] array
      currentColPos: -1,            // focusing pos of column/field
      currentCell: null,
      inputBox: null,
      inputSquare: null,

      errmsg: {},

      fields: [],
      focused: false,
      mousein: false,
      inputBoxChanged: false,

      columnFilter: {},             // set filter storage in hash, key is the column pos
      columnFilterRef: null,        // temporary remember the Vue reference of the filter for filter dialog
      sortedUniqueValueList: [],    // unique value list of filter dialog
      inputFilter: '',              // Custom filter storage for filter dialog
      inputFilterCondition: '=',    // Custom filter condition for filter dialog

      frontdrop: null,              // frontdrop dom node
      sep: {},                      // temporary varialbe for sep to operate the column adjustment

      sortPos: 0,                   // Sort column position
      sortDir: 0,                   // Sort direction, 1=Ascending, -1=Descending
      redo: []                      // redo log
    }
  },
  computed: {
    filteredSortedUniqueValueList () {
      const filter = this.inputFilter.toUpperCase()
      return this.sortedUniqueValueList.filter(item => item.toUpperCase().startsWith(filter))
    },
    columnFilterString () {
      return JSON.stringify(this.columnFilter)
    },
    table () {
      Object.keys(this.columnFilter).forEach((key) => {
        (this.columnFilter[key].trim() === '') && delete this.columnFilter[key]
      })
      const filterColumnList = Object.keys(this.columnFilter)
      const filter = {}
      filterColumnList.forEach((k) => {
        switch (true) {
          case this.columnFilter[k].startsWith('<='):
            filter[k] = {type: 1, value: this.columnFilter[k].slice(2).trim().toUpperCase()}
            if (this.fields[k].type === 'number') filter[k].value = Number(filter[k].value)
            break
          case this.columnFilter[k].startsWith('<'):
            filter[k] = {type: 2, value: this.columnFilter[k].slice(1).trim().toUpperCase()}
            if (this.fields[k].type === 'number') filter[k].value = Number(filter[k].value)
            break
          case this.columnFilter[k].startsWith('>='):
            filter[k] = {type: 3, value: this.columnFilter[k].slice(2).trim().toUpperCase()}
            if (this.fields[k].type === 'number') filter[k].value = Number(filter[k].value)
            break
          case this.columnFilter[k].startsWith('>'):
            filter[k] = {type: 4, value: this.columnFilter[k].slice(1).trim().toUpperCase()}
            if (this.fields[k].type === 'number') filter[k].value = Number(filter[k].value)
            break
          case this.columnFilter[k].startsWith('='):
            filter[k] = {type: 5, value: this.columnFilter[k].slice(1).trim().toUpperCase()}
            break
          case this.columnFilter[k].startsWith('*') && this.columnFilter[k].endsWith('*'):
            filter[k] = {type: 5, value: this.columnFilter[k].slice(1).slice(0, -1).trim().toUpperCase()}
            break
          case this.columnFilter[k].startsWith('*') && !this.columnFilter[k].slice(1).includes('*'):
            filter[k] = {type: 6, value: this.columnFilter[k].slice(1).trim().toUpperCase()}
            break
          case this.columnFilter[k].endsWith('*') && !this.columnFilter[k].slice(0, -1).includes('*'):
            filter[k] = {type: 7, value: this.columnFilter[k].slice(0, -1).trim().toUpperCase()}
            break
          case this.columnFilter[k].startsWith('~'):
            filter[k] = {type: 8, value: this.columnFilter[k].slice(1).trim()}
            break
          case this.columnFilter[k].includes('*') || this.columnFilter[k].includes('?'):
            filter[k] = {type: 8, value: '^' + this.columnFilter[k].replace(/\*/g, '.*').replace(/\?/g, '.').trim() + '$'}
            break
          default:
            filter[k] = {type: 5, value: this.columnFilter[k].trim().toUpperCase()}
            break
        }
      })
      return this.value.filter((record) => {
        const content = {}
        filterColumnList.forEach((k) => {
          const val = record[this.fields[k].name]
          content[k] = typeof val === 'undefined' ? '' : val.toUpperCase()
        })
        for (let i = 0; i < filterColumnList.length; i++) {
          const k = filterColumnList[i]
          switch (filter[k].type) {
            case 1:
              if (this.fields[k].type === 'number') content[k] = Number(content[k])
              if (filter[k].value < content[k]) return false
              break
            case 2:
              if (this.fields[k].type === 'number') content[k] = Number(content[k])
              if (filter[k].value <= content[k]) return false
              break
            case 3:
              if (this.fields[k].type === 'number') content[k] = Number(content[k])
              if (filter[k].value > content[k]) return false
              break
            case 4:
              if (this.fields[k].type === 'number') content[k] = Number(content[k])
              if (filter[k].value >= content[k]) return false
              break
            case 5:
              if (!content[k].includes(filter[k].value)) return false
              break
            case 6:
              if (!content[k].endsWith(filter[k].value)) return false
              break
            case 7:
              if (!content[k].startsWith(filter[k].value)) return false
              break
            case 8:
              if (!new RegExp(filter[k].value, 'i').test(content[k])) return false
              break
          }
        }
        return true
      })
    },
    pagingTable () {
      return this.table.slice(this.pageTop, this.pageTop + this.pageSize)
    },
    pageBottom () {
      if (this.value.length === 0) return 0
      else return this.pageTop + this.pageSize > this.table.length ? this.table.length : this.pageTop + this.pageSize
    }
  },
  watch: {
    value () {
      // detect a loading process, reset something
      this.redo = []
      this.errmsg = []
      this.processing = true
      setTimeout(() => {
        this.reset()
        this.processing = false
      }, 0)
    },
    columnFilterString () {
      this.processing = true
      setTimeout(() => {
        this.reset()
        this.processing = false
      }, 0)
    },
    processing (newVal) {
      if (newVal) {
        const rect = this.$el.getBoundingClientRect()
        this.frontdrop.style.top = rect.top + 'px'
        this.frontdrop.style.left = rect.left + 'px'
        this.frontdrop.style.height = rect.height + 'px'
        this.frontdrop.style.width = rect.width + 'px'
      }
    }
  },
  mounted () {
    this.systable = this.$refs.systable
    this.colgroupTr = this.systable.children[0]
    this.labelTr = this.systable.children[1].children[0]
    this.filterTr = this.systable.children[1].children[1]
    this.recordBody = this.systable.children[2]
    this.footer = this.$refs.footer
    this.inputSquare = this.$refs.inputSquare
    this.inputBox = this.$refs.inputBox
    this.frontdrop = this.$refs.frontdrop
    if (this.height)
      this.systable.parentNode.style.height = this.height
    this.reset()
    this.refreshPageSize()
    // this.moveInputSquare(0, 0)
    window.onresize = () => {
      this.moveInputSquare(this.currentRowPos, this.currentColPos)
      this.lazy(this.refreshPageSize, 200)
    }
    window.addEventListener('keydown', (e) => {
      if (!this.mousein && !this.focused) return
      if (e.ctrlKey || e.metaKey)
        switch (e.keyCode) {
          case 90: // z
            this.undoTransaction()
            e.preventDefault()
            break
          case 65: // a
            this.toggleSelectAllRecords()
            e.preventDefault()
            break
          case 67: // c
            this.inputCopy = this.currentCell.innerText
            e.preventDefault()
            break;
          case 86: // v
            if (!this.fields[this.currentColPos].readonly && this.inputCopy !== null)
              this.inputCellWrite(this.inputCopy)
            e.preventDefault()
            break;
        }
      else {
        if (this.currentRowPos < 0) return
        this.focused = true
        switch (true) {
          case e.keyCode === 33:
            this.prevPage()
            e.preventDefault()
            break
          case e.keyCode === 34:
            this.nextPage()
            e.preventDefault()
            break
          case e.keyCode === 9 && e.shiftKey:
          case e.keyCode === 37:
            if (this.inputBox.style.opacity * 1 === 0) {
              this.moveWest(e)
              e.preventDefault()
            }
            break;
          case e.keyCode === 38:
            this.moveNorth()
            e.preventDefault()
            break;
          case e.keyCode === 9 && !e.shiftKey:
          case e.keyCode === 39:
            if (this.inputBox.style.opacity * 1 === 0) {
              this.moveEast(e)
              e.preventDefault()
            }
            break;
          case e.keyCode === 13:
          case e.keyCode === 40:
            this.moveSouth(e)
            e.preventDefault()
            break
          default:
            if (!this.fields[this.currentColPos].readonly && this.inputBox.style.opacity * 1 === 0) {
              if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
                this.inputBox.value = ''
                this.inputBox.style.opacity = 1
                this.inputBoxChanged = true
              }
              if (e.keyCode === 8 || e.keyCode === 46) {
                this.inputBox.value = ''
                this.inputCellWrite('')
              }
            }
            break
        }
      }
    })
  },
  methods: {
    registerColumn (field) {
      let pos = this.fields.findIndex(item => item.pos > field.pos)
      if (pos === -1) pos = this.fields.length
      this.fields.splice(pos, 0, field)
    },
    moveInputSquare (rowPos, colPos) {
      if (colPos < 0) return
      if (this.currentRowPos >= 0 && this.currentRowPos < this.pagingTable.length) {
        this.recordBody.children[this.currentRowPos].children[0].classList.remove('focus')
        this.labelTr.children[this.currentColPos + 1].classList.remove('focus')
      }

      const row = this.recordBody.children[rowPos]
      if (!row) return
      const cell = row.children[colPos + 1]
      if (!cell) return
      const cellRect = cell.getBoundingClientRect()
      const tableRect = this.systable.getBoundingClientRect()
      this.inputSquare.style.left = (cellRect.left - tableRect.left) + 'px'
      this.inputSquare.style.top =  (cellRect.top - tableRect.top) + 'px'
      this.inputSquare.style.width = cellRect.width + 'px'
      this.inputSquare.style.height = cellRect.height + 'px'

      this.inputBox.style.opacity = 0
      if (this.inputBoxChanged) {
        this.inputCellWrite(this.fields[this.currentColPos].toValue(this.inputBox.value))
        this.inputBoxChanged = false
      }

      this.currentRowPos = rowPos
      this.currentColPos = colPos
      this.currentCell = cell
      if (this.currentRowPos >= 0 && this.currentRowPos < this.pagingTable.length) {
        this.lazy(() => {
          this.inputBox.focus()
          this.focused = true
          this.recordBody.children[this.currentRowPos].children[0].classList.add('focus')
          this.labelTr.children[this.currentColPos + 1].classList.add('focus')
        }, 0)
      }
    },
    reset () {
      this.pageTop = 0
      this.prevSelect = -1
      this.reviseSelectedAfterTableChange()
    },
    colSepMouseDown (e) {
      e.preventDefault()
      e.stopPropagation()
      const getStyleVal = (elm, css) => {
        window.getComputedStyle(elm, null).getPropertyValue(css)
      }
      this.sep = {}
      this.sep.curCol = e.target.parentElement
      this.sep.nxtCol = this.sep.curCol.nextElementSibling
      this.sep.pageX = e.pageX
      let padding = 0
      if (getStyleVal(this.sep.curCol, 'box-sizing') !== 'border-box') {
        const padLeft = getStyleVal(this.sep.curCol, 'padding-left')
        const padRight = getStyleVal(this.sep.curCol, 'padding-right')
        if (padLeft && padRight)
          padding = parseInt(padLeft) + parseInt(padRight)
      }
      this.sep.curColWidth = this.sep.curCol.offsetWidth - padding
      if (this.sep.nxtCol)
        this.sep.nxtColWidth = this.sep.nxtCol.offsetWidth - padding
    },
    colSepMouseOver (e) {
      e.target.style.borderRight = '5px solid #cccccc'
      e.target.style.height = this.systable.getBoundingClientRect().height + 'px'
    },
    colSepMouseOut (e) {
      e.target.style.borderRight = ''
      e.target.style.height = '100%'
    },
    mouseMove (e) {
      if (!this.sep || !this.sep.curCol) return
      const diffX = e.pageX - this.sep.pageX
      // if (this.systable.getBoundingClientRect().right === window.innerWidth)
      //   if (this.sep.nxtCol)
      //     this.sep.nxtCol.style.width = (this.sep.nxtColWidth - diffX) + 'px'
      this.sep.curCol.style.width = (this.sep.curColWidth + diffX) + 'px'
    },
    mouseUp (e) {
      // this.focused = true
      e.preventDefault()
      e.stopPropagation()
      delete this.sep
    },
    doInputFilter () {
      if (window.delay) clearTimeout(window.delay)
      window.delay = setTimeout(() => {
        this.inputFilter = this.$refs.inputFilter.$el.value
      }, 200)
    },
    headerClick (e, colPos) {
      if (e.which === 1) {
        e.preventDefault()
        if (this.sortPos === colPos && this.sortDir > 0)
          this.sort(-1, colPos)
        else
          this.sort(1, colPos)
      }
    },
    sort (n, pos) {
      this.processing = true
      const colPos = pos || this.columnFilterRef.colPos
      const fieldName = this.fields[colPos].name
      const type = this.fields[colPos].type
      setTimeout(() => {
        this.$bvModal.hide('panelFilter')
        if (type === 'number')
          this.value.sort((a, b) => {
            if (Number(a[fieldName]) > Number(b[fieldName])) return n
            if (Number(a[fieldName]) < Number(b[fieldName])) return -n
            return 0
          })
        else
          this.value.sort((a, b) => {
            if (a[fieldName] > b[fieldName]) return n
            if (a[fieldName] < b[fieldName]) return -n
            return 0
          })
        this.sortPos = colPos
        this.sortDir = n
        this.processing = false
      }, 0)
    },
    doFilter () {
      const opt = this.inputFilterCondition + this.$refs.inputFilter.$el.value
      this.columnFilterRef.$el.textContent = opt
      this.columnFilterRef.$emit('input', opt)
      this.hideFilterPanel()
    },
    filterPanelSelect (opt) {
      // this.columnFilter[this.columnFilterRef.colPos] = el  // Cannot use this, dunno why
      this.columnFilterRef.$el.textContent = opt
      this.columnFilterRef.$emit('input', opt)
      this.hideFilterPanel()
    },
    showFilterPanel (ref) {
      this.columnFilterRef = ref
      this.inputFilter = ''
      this.inputFilterCondition = '='
      this.sortedUniqueValueList = []
      this.$bvModal.show('panelFilter')
      this.columnFilterRef.$el.textContent = ''
      this.columnFilterRef.$emit('input', '')
      const hash = {}
      const fieldName = this.fields[ref.colPos].name
      this.table.forEach(record => (hash[record[fieldName]] = true))
      const keys = Object.keys(hash)
      keys.sort()
      if (keys.length > 0 && keys[0] === '') keys[0] = ' '
      this.sortedUniqueValueList = keys
    },
    hideFilterPanel () {
      this.$bvModal.hide('panelFilter')
      setTimeout(() => {
        this.sortedUniqueValueList = []
      }, 0)
    },
    freezePanelSizeAfterShown (target) {
      const rect = target.getBoundingClientRect()
      target.setAttribute('style', `width:${rect.width}px; height:${rect.height}px;`)
    },
    refreshPageSize () {
      if (this.noPaging) {
        this.pageSize = 999999999
        return
      }
      this.pageSize = this.page || Math.floor((
        window.innerHeight - this.recordBody.getBoundingClientRect().top - this.footer.children[0].getBoundingClientRect().height - 37) / 24)
    },
    firstPage () {
      this.processing = true
      setTimeout(() => {
        this.pageTop = 0
        this.processing = false
      })
    },
    lastPage () {
      this.processing = true
      setTimeout(() => {
        this.pageTop = this.table.length - this.pageSize < 0 ? 0 : this.table.length - this.pageSize
        this.processing = false
      })
    },
    prevPage () {
      this.processing = true
      setTimeout(() => {
        this.pageTop = this.pageTop < this.pageSize ? 0 : this.pageTop - this.pageSize
        this.processing = false
      }, 0)
    },
    nextPage () {
      this.processing = true
      setTimeout(() => {
        if (this.pageTop + this.pageSize < this.table.length)
          this.pageTop += this.pageSize
        this.processing = false
      }, 0)
    },
    rowLabelClick (e) {
      const rowPos = Number(e.target.parentNode.getAttribute('pos')) + this.pageTop
      if (e.shiftKey) {
        document.getSelection().removeAllRanges()
        if (this.prevSelect !== -1 && this.prevSelect !== rowPos) {
          e.preventDefault()
          if (rowPos > this.prevSelect)
            for (let i = this.prevSelect; i <= rowPos; i++)
              this.selectRecord(i)
          else
            for (let i = rowPos; i <= this.prevSelect; i++)
              this.selectRecord(i)
        }
      }
      else
        this.toggleSelectRecord(rowPos)
      this.prevSelect = rowPos
    },
    settingClick () {
      this.$bvModal.show('panelGrid')
    },
    saveSetting () {
      this.$bvModal.hide('panelGrid')
    },
    exportTable (format) {
      this.$bvModal.hide('panelGrid')
      this.processing = true
      setTimeout(() => {
        const wb = XLSX.utils.book_new()
        const ws1 = XLSX.utils.json_to_sheet(this.table, {
          header: this.fields.map(field => field.name)
        })
        const labels = Array.from(this.labelTr.children).slice(1).map(t => t.children[0].innerHTML)
        XLSX.utils.sheet_add_aoa(ws1, [labels], {origin: 0})
        ws1['!cols'] = Array.from(this.labelTr.children).slice(1).map((t) => {
          return {
            width: t.getBoundingClientRect().width / 6.5
          }
        })
        XLSX.utils.book_append_sheet(wb, ws1, 'Sheet1')
        switch (format) {
          case 'excel':
            XLSX.writeFile(wb, 'export.xlsx')
            break
          case 'csv':
            XLSX.writeFile(wb, 'export.csv')
            break
        }
        this.processing = false
      }, 500)
    },
    selectAllClick () {
      this.toggleSelectAllRecords()
    },
    reviseSelectedAfterTableChange () {
      this.rowIndex = {}
      this.table.forEach((rec, i) => (this.rowIndex[rec.key] = i))
      const temp = Object.assign(this.selected)
      this.selected = {}
      Object.keys(temp).forEach((p) => {
        const key = temp[p]
        if (typeof this.rowIndex[key] !== 'undefined')
          this.selected[this.rowIndex[key]] = key
      })
      this.selectedCount = Object.keys(this.selected).length
    },
    toggleSelectRecord (rowPos) {
      if (typeof this.selected[rowPos] !== 'undefined') this.unSelectRecord(rowPos)
      else this.selectRecord(rowPos)
    },
    selectRecord (rowPos) {
      this.selected[rowPos] = this.table[rowPos].key
      this.selectedCount++
      if (this.recordBody.children[rowPos - this.pageTop])
        this.recordBody.children[rowPos - this.pageTop].classList.add('select')
    },
    unSelectRecord (rowPos) {
      delete this.selected[rowPos]
      this.selectedCount--
      if (this.recordBody.children[rowPos - this.pageTop])
        this.recordBody.children[rowPos - this.pageTop].classList.remove('select')
    },
    toggleSelectAllRecords (e) {
      if (e) e.preventDefault()
      if (this.selectedCount === this.table.length) {
        for (let i = 0; i < this.table.length; i++)
          this.unSelectRecord(i)
        this.selectedCount = 0
      }
      else {
        for (let i = 0; i < this.table.length; i++)
          this.selectRecord(i)
        this.selectedCount = this.table.length
      }
    },
    clearAllSelected () {
      for (let i = 0; i < this.$refs.systable.children[2].children.length; i++)
        this.unSelectRecord(i)
      this.selected = {}
      this.selectedCount = 0
    },
    undoTransaction (e) {
      if (e) e.preventDefault()
      if (this.redo.length === 0) return
      const transaction = this.redo.pop()
      transaction.forEach((rec) => {
        this.updateCell(this.rowIndex[rec.key], rec.colPos, rec.field, rec.oldVal, true)
      })
    },
    updateCell (row, colPos, name, content, restore) {
      const transaction = {
        key: this.table[row].key,
        colPos: colPos,
        field: name,
        newVal: content,
        oldVal: this.table[row][name],
        err: ''
      }

      if (this.fields[colPos].validate !== null) {
        const err = this.fields[colPos].validate(content)
        if (err) {
          this.errmsg[`${transaction.key}:${name}`] = err
          transaction.err = err
        }
        else delete this.errmsg[`${transaction.key}:${name}`]
      }
      this.table[row][name] = content

      if (!this.saveLazyBuffer) this.saveLazyBuffer = []
      this.saveLazyBuffer.push(transaction)

      // Delay the propagation so that it can accumulate the result until no update
      if (this.delayTimeout) clearTimeout(this.delayTimeout)
      this.delayTimeout = setTimeout(() => {
        this.$emit('update', this.saveLazyBuffer)
        if (!restore)
          this.redo.push(this.saveLazyBuffer)
        this.saveLazyBuffer = []
      }, 50)
    },
    updateSelectedRowsByCol (colPos, field, content) {
      this.processing = true
      setTimeout(() => {
        Object.keys(this.selected).forEach(i => this.updateCell(i, colPos, field, content))
        this.processing = false
      }, 0)
    },
    moveWest () {
      if (this.focused && this.currentColPos > 0) {
        let goColPos = this.currentColPos - 1
        while (!this.fields[goColPos].visible && goColPos >= 0) goColPos--
        if (goColPos === -1) return
        this.moveInputSquare(this.currentRowPos, goColPos)
      }
    },
    moveEast () {
      if (this.focused && this.currentColPos < this.fields.length - 1) {
        let goColPos = this.currentColPos + 1
        while (!this.fields[goColPos].visible && goColPos < this.fields.length - 1) goColPos++
        if (goColPos === this.fields.length) return
        this.moveInputSquare(this.currentRowPos, goColPos)
      }
    },
    moveNorth () {
      if (this.focused && this.currentRowPos > 0)
        this.moveInputSquare(this.currentRowPos - 1, this.currentColPos)
    },
    moveSouth () {
      if (this.focused && this.currentRowPos < this.table.length)
        this.moveInputSquare(this.currentRowPos + 1, this.currentColPos)
    },
    mouseDown (e) {
      if (e.target.parentNode.parentNode.tagName === 'TBODY' && !e.target.classList.contains('first-col')) {
        this.inputBox.focus()
        this.focused = true
        e.preventDefault()
        const row = e.target.parentNode
        const colPos = Array.from(row.children).indexOf(e.target) - 1
        const rowPos = Array.from(row.parentNode.children).indexOf(row)
        this.moveInputSquare(rowPos, colPos)
      }
    },
    mouseOver () {
      this.mousein = true
    },
    mouseOut () {
      this.mousein = false
    },
    inputSquareClick () {
      if (!this.fields[this.currentColPos].readonly && this.inputBox.style.opacity * 1 === 0) {
        this.inputBox.value = this.currentCell.innerText
        this.inputBox.style.opacity = 1
        this.inputBox.focus()
        this.inputBoxChanged = false
        this.focused = true
        //this.inputBox.select()
      }
      /*
      // fix the browser cannot show the curser after selectAll
      else {
        const sel = document.getSelection()
        if (e.target.textContent === sel.toString() || sel.focusOffset >= e.target.textContent.length)
          sel.removeAllRanges()
      }
      */
    },
    inputBoxKeydown (e) {
      if (!this.fields[this.currentColPos].readonly && e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey)
        this.inputBoxChanged = true
    },
    inputCellWrite (setText, col, row) {
      if (typeof col === 'undefined') col = this.currentColPos
      if (typeof row === 'undefined') row = this.currentRowPos
      if (typeof this.selected[row] !== 'undefined')
        this.updateSelectedRowsByCol(col, this.fields[col].name, setText)
      else
        this.updateCell(row, col, this.fields[col].name, setText)
    },
    inputBoxBlur () {
      if (this.inputBoxChanged) {
        this.inputCellWrite(this.inputBox.value)
        this.inputBoxChanged = false
      }
      this.inputBox.style.opacity = 0
      this.focused = false
      if (this.currentRowPos !== -1) {
        this.recordBody.children[this.currentRowPos].children[0].classList.remove('focus')
        this.labelTr.children[this.currentColPos + 1].classList.remove('focus')
      }
    },
    lazy (p, delay) {
      if (!delay) delay = 20
      if (window._$_lazy) clearTimeout(window._$_lazy)
      window._$_lazy = setTimeout(p, delay)
    }
    /*
    selStart (target) {
      this.selTarget = target
      this.selx = Array.from(target.parentNode.children).indexOf(target) - 1
      this.sely = target.parentNode.getAttribute('pos')
    },
    selProcess (target) {
      if (target === null) return
      // const x = Array.from(target.parentNode.children).indexOf(target) - 1
      // const y = target.parentNode.getAttribute('pos')
      this.selEnd(target)
    },
    selEnd (target) {
      if (target !== null && target !== this.selTarget) {
        const st = this.selTarget.getBoundingClientRect()
        const ed = target.getBoundingClientRect()

        if (this.selSquare === null) {
          this.selSquare = document.createElement('div')
          document.body.appendChild(this.selSquare)
        }

        const left = Math.min(st.left, ed.left)
        const top = Math.min(st.top, ed.top)
        const width = Math.max(ed.right - st.left, st.right - ed.left) + 1
        const height = Math.max(ed.bottom - st.top, st.bottom - ed.top) + 1

        this.selSquare.setAttribute('style', `
          left: ${left}px;
          top: ${top}px;
          width: ${width}px;
          height: ${height}px;
          position: absolute;
          border: 2px solid #999966;
          'z-index': 1000;
          background-color: #35456755;
          display: block;
          pointer-events: none;
        `)
      }
    }
    */
  }
}
</script>

<style scoped>
.input-square {
  position: absolute;
  padding: 0;
  z-index: 100;
  border: 2px solid darkseagreen;
}
.input-box {
  opacity: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  resize: none;
  border: 0;
  padding: 2px;
  white-space: nowrap;
  font-family: Calibri, Candara, Segoe, Segoe UI, Optima, Arial, sans serif;
  overflow: hidden;
  background: white;
  font-size: 0.88rem;
}
.table-content :focus {
  outline: none;
}

.table-content {
  font-family: Calibri, Candara, Segoe, "Segoe UI", Optima, Arial, sans-serif;
  font-size: 1rem;
  line-height: 1.1;
  word-spacing: 0.02rem;
  overflow-x: scroll;
  position: relative;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.systable {
  z-index: -1;
  margin-bottom: 4px;
  overflow: scroll;
}
.systable tr.select {
  background-color: #d6d6d6
}
.systable tr.select td:first-child {
  font-weight: 800;
}
/*
.systable .table-col-header {
  position: relative
}
*/
.systable td.table-bordered {
  border: 1px solid lightgray;
}
.systable th, .systable td {
  vertical-align: bottom;
  font-size: 0.88rem;
}
.systable th {
  padding: 0.4rem 0.3rem;
  font-weight: 400;
  cursor: s-resize !important;
  position: sticky;
  top: 0;
  z-index: 1;
}
.systable th.focus {
  border-bottom: 2px solid darkseagreen !important;
}
.systable td {
  cursor: cell;
  white-space: nowrap;
  overflow-x: hidden;
  text-overflow: ellipsis;
  animation: fadein 0.2s;
}
.systable td.column-filter {
  text-align: left;
  background-color: lightyellow;
}
.systable td.error {
  background-image: url('./assets/err.png');
  background-repeat: no-repeat;
  background-size: 8px 8px;
  background-position: right 0px top 0px;
}
.systable td.readonly {
  color: #90A4BE
}
.systable .first-col {
  background:#e9ecef;
  min-width: 36px;
  width: 36px;
  max-width: 36px;
  cursor: e-resize !important;
}
.systable thead td.first-col, .systable thead th.first-col {
  cursor: pointer !important;
}
.systable td.first-col.focus {
  border-right: 2px solid darkseagreen !important;
}
.systable thead td {
  height: 1.8rem;
}
.footer {
  padding: 8px;
  font-size: 0.9rem;
  color: dimgray;
  height: 30px;
  position: sticky;
  bottom: 0;
  left: 0;
  background-color: white;
  border-top: 1px solid lightgray;
  margin-top: -6px;
}
.panel-list-item {
  padding: 10px 5px;
}
.panel-list {
  overflow-y: scroll;
  max-height: 20rem;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  padding: 10px;
}
.panel-list a:first-child {
  border-top: 0
}
.front-drop {
  position: fixed;
  opacity: 0.4;
  display:flex;
  justify-content:center;
  align-items:center;
  background-color: #55555555;
  color: white;
  z-index: 1000;
}
a.disabled {
  color: gray;
}
.col-sep {
  position: absolute;
  top: 0;
  right: 0;
  width: 5px;
  cursor: col-resize;
  height: 100%;
}
.sort-asc-sign {
  background-image: url('./assets/sortasc.png');
  background-repeat: no-repeat;
  background-size: 9px 9px;
  background-position: right 5px top 5px;
}
.sort-des-sign {
  background-image: url('./assets/sortdes.png');
  background-repeat: no-repeat;
  background-size: 9px 9px;
  background-position: right 5px top 5px;
}
.filter-sign {
  background-image: url('./assets/filter.png');
  background-repeat: no-repeat;
  background-size: 9px 9px;
  background-position: right 0px bottom 0px;
}
@keyframes fadein {
  from {opacity: 0}
  to {opacity: 1}
}
.rb-square {
  width: 10px;
  height: 10px;
  border: 2px solid white;
  background-color:darkseagreen;
  position: absolute;
  bottom: -6px;
  right: -6px;
  cursor: crosshair;
}
</style>

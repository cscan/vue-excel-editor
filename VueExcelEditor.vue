<template>
  <div>
    <div class="table-content">
      <table ref="systable"
             style="table-layout: fixed"
             class="systable table table-bordered table-sm"
             ondragenter="event.preventDefault(); event.dataTransfer.dropEffect = 'none'"
             ondragover="event.preventDefault(); event.dataTransfer.dropEffect = 'none'"
             @mousedown.exact="mouseDown"
             @keydown.exact.37="keyWest"
             @keydown.exact.39="keyEast"
             @keydown.exact.38="keyNorth"
             @keydown.exact.40="keySouth"
             @mousemove="colSepMouseMove"
             @mouseup="colSepMouseUp"
             @keydown.exact.page-down="nextPage"
             @keydown.exact.page-up="prevPage">
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
            <th v-for="item in nFields"
                :key="`th-${item}`"
                :class="{'sort-asc-sign': sortPos==item && sortDir==1,
                         'sort-des-sign': sortPos==item && sortDir==-1}"
                class="table-col-header"
                @mousedown="headerClick($event, item)">
              <div :class="{'filter-sign': columnFilter[item]}">
                {{ colFields[item-1] }}
              </div>
              <div class="col-sep"
                   @mousedown="colSepMouseDown"
                   @mouseover="colSepMouseOver"
                   @mouseout="colSepMouseOut" />
            </th>
          </tr>
          <tr>
            <th class="text-center first-col" @click="topLeftClick">
              <font-awesome-icon v-if="selectedCount==table.length" icon="times-circle" size="sm" />
              <font-awesome-icon v-else icon="check-circle" size="sm" />
            </th>
            <vue-excel-filter v-for="item in nFields" :key="`th2-${item}`" v-model="columnFilter[item]" class="column-filter" />
          </tr>
        </thead>
        <tbody>
          <tr v-for="(record, recordPosition) in pagingTable" :key="recordPosition" :pos="recordPosition"
              :class="{select: selected[pageTop + recordPosition]}">
            <template v-if="recordLabel">
              <td class="text-center first-col"
                  scope="row"
                  @click="rowLabelClick">{{ recordLabel(record, recordPosition) }}</td>
            </template>
            <template v-else>
              <td class="text-center first-col"
                  scope="row"
                  @click="rowLabelClick">{{ pageTop + recordPosition + 1 }}</td>
            </template>
            <slot name="body"
                  :table="table"
                  :record="record"
                  :recordPosition="recordPosition">
              <template v-for="(fieldValue, fieldName, fieldPosition) in record">
                <vue-excel-column :key="`f${fieldPosition}`" v-model="record[fieldName]" />
              </template>
            </slot>
          </tr>
        </tbody>
      </table>
    </div>
    <div ref="footer" class="footer col col-12 text-center">
      <span style="float: left">
        Record {{ pageTop + 1 }} to {{ pageBottom }} of {{ table.length }}
      </span>
      <span style="position: absolute; left: 0; right: 0">
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
        <a v-for="(item, k) in colLabels" :key="k"
           href="#"
           class="list-group-item list-group-item-action panel-list-item"
           @click.prevent="">
          <b-checkbox size="sm" :checked="item.visible">
            {{ item.text }}
          </b-checkbox>
        </a>
      </div>
      <template v-slot:modal-footer>
        <b-button variant="primary input-button" @click="saveSetting">
          <span>
            <font-awesome-icon v-if="processing" icon="spinner" spin size="sm" fixed-width />
            <font-awesome-icon v-else icon="save" size="sm" fixed-width />
          </span>
          Apply
        </b-button>
      </template>
    </b-modal>
    <div v-show="processing" ref="frontdrop" class="front-drop">
      <font-awesome-icon icon="spinner" spin size="3x" />
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueExcelColumn from './VueExcelColumn'
import VueExcelFilter from './VueExcelFilter'
import XLSX from 'xlsx'

library.add(fas)
Vue.use(BootstrapVue)

export default {
  components: {
    'font-awesome-icon': FontAwesomeIcon,
    'vue-excel-column': VueExcelColumn,
    'vue-excel-filter': VueExcelFilter
  },
  props: {
    value: {type: Array,                            // actual table content
      default () {
        return []
      }
    },
    nFields: {type: Number, default: 0},            // number of columns/fields
    recordLabel: {type: Function, default: null},   // ???
    page: {type: Number, default: 0},               // prefer page size, auto-cal if not provided
    newRecord: {type: Function, default: null},     // return the new record from caller if provided
    nFilterCount: {type: Number, default: 200}      // show top n values in filter dialog
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
      colFields: [],                // array of field names (propagate from VueExcelColumn in correct col pos)
      colTypes: [],                 // array of types (propagate from VueExcelColumn in correct col pos)

      colLabels: [],                // Temporary list of labels for paenlGrid

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

      columnFilter: {},             // set filter storage in hash, key is the column pos
      columnFilterRef: null,        // temporary remember the Vue reference of the filter for filter dialog
      sortedUniqueValueList: [],    // unique value list of filter dialog
      inputFilter: '',              // Custom filter storage for filter dialog
      inputFilterCondition: '=',    // Custom filter condition for filter dialog

      frontdrop: null,              // frontdrop dom node
      sep: {},                      // temporary varialbe for sep to operate the column adjustment

      delayTimeout: null,           // general delay timeout for batch processing
      saveLazyBuffer: [],           // temporary storage the update queue during delay of batch processing

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
            if (this.colTypes[k] === 'number') filter[k].value = Number(filter[k].value)
            break
          case this.columnFilter[k].startsWith('<'):
            filter[k] = {type: 2, value: this.columnFilter[k].slice(1).trim().toUpperCase()}
            if (this.colTypes[k] === 'number') filter[k].value = Number(filter[k].value)
            break
          case this.columnFilter[k].startsWith('>='):
            filter[k] = {type: 3, value: this.columnFilter[k].slice(2).trim().toUpperCase()}
            if (this.colTypes[k] === 'number') filter[k].value = Number(filter[k].value)
            break
          case this.columnFilter[k].startsWith('>'):
            filter[k] = {type: 4, value: this.columnFilter[k].slice(1).trim().toUpperCase()}
            if (this.colTypes[k] === 'number') filter[k].value = Number(filter[k].value)
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
          const val = record[this.colFields[k]]
          content[k] = typeof val === 'undefined' ? '' : val.toUpperCase()
        })
        for (let i = 0; i < filterColumnList.length; i++) {
          const k = filterColumnList[i]
          switch (filter[k].type) {
            case 1:
              if (this.colTypes[k] === 'number') content[k] = Number(content[k])
              if (filter[k].value < content[k]) return false
              break
            case 2:
              if (this.colTypes[k] === 'number') content[k] = Number(content[k])
              if (filter[k].value <= content[k]) return false
              break
            case 3:
              if (this.colTypes[k] === 'number') content[k] = Number(content[k])
              if (filter[k].value > content[k]) return false
              break
            case 4:
              if (this.colTypes[k] === 'number') content[k] = Number(content[k])
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
      this.reset()
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
        this.$refs.frontdrop.setAttribute('style',
          `top:${rect.top}px; left:${rect.left}px; height:${rect.height}px; width:${rect.width}px;`)
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
    this.refreshPageSize()
    window.onresize = () => {
      this.lazy(this.refreshPageSize, 200)
    }
    window.addEventListener('keydown', (e) => {
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
        }
      else
        switch (e.keyCode) {
          case 33:
            this.prevPage()
            e.preventDefault()
            break
          case 34:
            this.nextPage()
            e.preventDefault()
            break
        }
    })
  },
  methods: {
    reset () {
      this.pageTop = 0
      this.prevSelect = -1
      this.reviseSelectedAfterTableChange()
    },
    refreshColumnAttribute () {
      const filterTr = this.$refs.systable.children[1].children[1]
      this.colFields = Array.from(filterTr.children).map(td => td.getAttribute('field'))
      this.colTypes = Array.from(filterTr.children).map(td => td.getAttribute('type'))
    },
    colSepMouseDown (e) {
      e.preventDefault()
      e.stopPropagation()
      const getStyleVal = (elm, css) => {
        window.getComputedStyle(elm, null).getPropertyValue(css)
      }
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
      e.target.style.height = '100px'
    },
    colSepMouseMove (e) {
      if (!this.sep.curCol) return
      const diffX = e.pageX - this.sep.pageX
      // if (this.sep.nxtCol)
      //   this.sep.nxtCol.style.width = (this.sep.nxtColWidth - diffX) + 'px'
      this.sep.curCol.style.width = (this.sep.curColWidth + diffX) + 'px'
    },
    colSepMouseUp (e) {
      e.preventDefault()
      e.stopPropagation()
      this.sep = {}
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
      const fieldName = this.colFields[colPos]
      const type = this.colTypes[colPos]
      setTimeout(() => {
        if (this.$refs.panelFilter.visible) this.$bvModal.hide('panelFilter')
        // this.clearAllSelected()
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
      const fieldName = this.colFields[ref.colPos]
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
      this.pageSize = this.page || Math.floor((
        window.innerHeight - this.recordBody.getBoundingClientRect().top - this.footer.children[0].getBoundingClientRect().height - 25) / 24)
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
      this.colLabels = Array.from(this.labelTr.children).slice(1).map((tag, i) => {
        return {
          text: tag.children[0].innerHTML,
          colPos: i + 1,
          field: this.filterTr.children[i + 1].getAttribute('field'),
          visible: tag.style.display !== 'none'
        }
      })
      this.$bvModal.show('panelGrid')
    },
    saveSetting () {
    },
    exportTable (format) {
      this.$bvModal.hide('panelGrid')
      this.processing = true
      setTimeout(() => {
        const wb = XLSX.utils.book_new()
        const ws1 = XLSX.utils.json_to_sheet(this.table, {
          header: this.colFields.slice(1)
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
    exportCSV () {

    },
    topLeftClick () {
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
      if (this.selected[rowPos]) this.unSelectRecord(rowPos)
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
        this.updateCell(this.rowIndex[rec.key], rec.field, rec.oldVal, true)
      })
    },
    updateCell (row, name, content, restore) {
      const transaction = {
        key: this.table[row].key,
        field: name,
        newVal: content,
        oldVal: this.table[row][name]
      }
      this.table[row][name] = content
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
    updateSelectedRowsByCol (col, content) {
      this.processing = true
      setTimeout(() => {
        const field = this.colFields[col]
        for (let i = 0; i < this.table.length; i++)
          if (this.selected[i])
            this.updateCell(i, field, content)
        this.processing = false
      }, 0)
    },
    mouseDown (e) {
      if (document.activeElement === e.target) {
        e.target.classList.add('edit')
        // workaround for the problem of the cursor cannot positioned after selectAll
        window.getSelection().removeAllRanges()
      }
    },
    keyWest (e) {
      const sel = document.getSelection()
      if (e.target.textContent === sel.toString() || sel.focusOffset === 0) {
        let td = e.target.previousSibling
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
        if (!td) return td
        if (!td.tagName) td = td.nextSibling
        if (td.focus) td.focus()
        return td
      }
      return e.target
    },
    keyNorth (e) {
      e.preventDefault()
      const thisTr = e.target.parentNode
      if (thisTr.parentNode.tagName === 'THEAD') return
      const prevTr = thisTr.previousSibling
      if (!prevTr) {
        // focus the filter row
        const td = this.filterTr.children[this.currentColPos]
        if (td) td.focus()
        return td
      }
      // Clear the last line if empty
      const nextTr = thisTr.nextSibling
      if (!nextTr)
        if (this.newRecord) {
          const table = this.value
          if (table.length > 1) {
            const lastRow = this.value[this.value.length - 1]
            if (Object.values(lastRow).join('') === '')
              table.pop()
          }
        }
      const td = prevTr.children[this.currentColPos]
      if (td) td.focus()
      return td
    },
    keySouth (e) {
      e.preventDefault()
      const thisTr = e.target.parentNode
      if (thisTr.parentNode.tagName === 'THEAD') {
        // focus first record
        const td = this.recordBody.children[0].children[this.currentColPos]
        if (td) td.focus()
        return td
      }
      const nextTr = thisTr.nextSibling
      if (!nextTr) {
        if (this.newRecord)
          /*
          const table = this.value
          const newRow = this.newRecord()
          if (!newRow.key)
            throw new Error('VueExcelEditor: The key of new record cannot be null')
          if (table.find(rec => rec.key === newRow.key))
            throw new Error('SysHTable: The current table contains the specified key during new record')
          table.push(newRow)
          */
          this.newRecord((err, newRow) => {
            if (err)
              throw new Error(err)
            if (!newRow.key)
              throw new Error('VueExcelEditor: The key of new record cannot be null')
            if (this.table.find(rec => rec.key === newRow.key))
              throw new Error('VueExcelEditor: The current table contains the specified key during new record')

            const rowPos = this.table.push(newRow) - 1
            Object.keys(newRow).forEach(k => this.updateCell(rowPos, k, newRow[k]))
            setTimeout(() => {
              const nextTr = thisTr.nextSibling
              if (nextTr) {
                const colPos = Array.from(thisTr.children).indexOf(e.target)
                const td = nextTr.children[colPos]
                if (td) td.focus()
              }
            }, 300)
          })
      }
      else {
        const td = nextTr.children[this.currentColPos]
        if (td) td.focus()
        return td
      }
      return null
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
      console.log('s')
    },
    selProcess (target) {
      if (target === null) return
      // const x = Array.from(target.parentNode.children).indexOf(target) - 1
      // const y = target.parentNode.getAttribute('pos')
      this.selEnd(target)
    },
    selEnd (target) {
      console.log('e')
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
.table-content {
  font-family: Calibri, Candara, Segoe, "Segoe UI", Optima, Arial, sans-serif;
  font-size: 1rem;
  line-height: 1.1;
  word-spacing: 0.02rem;
  overflow-x: scroll;
  position: relative;
}
.systable {
  z-index: -1;
  margin-bottom: 4px;
}
.systable tr.select {
  background-color: #d6d6d6
}
.systable tr.select td:first-child {
  font-weight: 800;
}
.systable .table-col-header {
  position: relative
}
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
.systable td[contenteditable]:focus {
  outline: 2px solid darkseagreen;
  cursor: text;
  text-overflow: inherit;
}
.systable td[contenteditable]::selection {
  /* background: white; /* WebKit/Blink Browsers */
  background: transparent;
}
.systable td[contenteditable]::-moz-selection {
  /* background: white; /* Gecko Browsers */
  background: transparent;
}
.systable td.edit[contenteditable]::selection {
  background: lightblue; /* WebKit/Blink Browsers */
}
.systable td.edit[contenteditable]::-moz-selection {
  background: lightblue; /* Gecko Browsers */
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
.systable th.first-col {
  cursor: pointer !important;
}
.systable td.first-col.focus {
  border-right: 2px solid darkseagreen !important;
}
.footer {
  padding: 8px;
  font-size: 0.9rem;
  color: dimgray;
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
  position: absolute;
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
</style>

<template>
  <div>
    <div class="component-content">
      <div ref="tableContent" class="table-content"
          @scroll="tableScroll"
          @mouseover="mouseOver"
          @mouseout="mouseOut"
          @mousemove="mouseMove"
          @mouseup="mouseUp">

        <!-- Main Table -->
        <table ref="systable"
              id="systable"
              style="table-layout: fixed; width: 0"
              class="systable"
              ondragenter="event.preventDefault(); event.dataTransfer.dropEffect = 'none'"
              ondragover="event.preventDefault(); event.dataTransfer.dropEffect = 'none'">
          <colgroup>
            <!--col class="first-col">
            <col v-for="item in nFields" :key="`col-${item}`" style="width: 100px"-->
          </colgroup>
          <thead class="thead-light text-center">
            <tr>
              <th class="text-center first-col tl-setting"
                  @mousedown.left="settingClick">
                <span style="width:100%">
                  <font-awesome-icon v-if="processing" icon="spinner" spin size="sm" />
                  <font-awesome-icon v-else icon="bars" size="sm" />
                </span>
              </th>
              <th v-for="(item, p) in fields"
                  v-show="item.visible"
                  :key="`th-${p}`"
                  :class="{'sort-asc-sign': sortPos==p && sortDir==1,
                          'sort-des-sign': sortPos==p && sortDir==-1}"
                  class="table-col-header"
                  :style="{width: item.width}"
                  @mousedown="headerClick($event, p)">
                <div :class="{'filter-sign': columnFilter[p]}">{{ item.label }}</div>
                <div class="col-sep"
                    @mousedown="colSepMouseDown"
                    @mouseover="colSepMouseOver"
                    @mouseout="colSepMouseOut" />
              </th>
            </tr>
            <tr>
              <td class="text-center first-col tl-filter" @click="selectAllClick">
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
          <tbody @mousedown.exact="mouseDown" style="position: relative">
            <tr v-for="(record, rowPos) in pagingTable"
                :key="rowPos"
                :pos="rowPos"
                :class="{select: typeof selected[pageTop + rowPos] !== 'undefined'}"
                :style="rowStyle(record)">
              <td class="text-center first-col"
                  scope="row"
                  @click="rowLabelClick">{{ recordLabel(record, rowPos) }}</td>
              <template v-for="(item, p) in fields">
                <td v-if="item.options.length"
                    v-show="item.visible"
                    :id="`cell-${p+rowPos*fields.length}`"
                    :class="{readonly: item.readonly, error: errmsg[`${record.key}:${item.name}`], select: true}"
                    :style="item.initStyle"
                    :key="`f${p}`"
                    @mousemove="cellMouseMove">{{ item.toText(record[item.name]) }}</td>
                <td v-else
                    v-show="item.visible"
                    :id="`cell-${p+rowPos*fields.length}`"
                    :class="{readonly: item.readonly, error: errmsg[`${record.key}:${item.name}`]}"
                    :style="item.initStyle"
                    :key="`f${p}`">{{ item.toText(record[item.name]) }}</td>
                <b-tooltip v-if="item.validate && errmsg[`${record.key}:${item.name}`]"
                          variant="danger"
                          :target="`cell-${p+rowPos*fields.length}`"
                          :key="`tool${p}`"
                          placement="right"
                          trigger="hover focus">{{ errmsg[`${record.key}:${item.name}`] }}</b-tooltip>
              </template>
            </tr>
          </tbody>
          <slot></slot>
        </table>

        <!-- Editor Square -->
        <div v-show="focused" ref="inputSquare" class="input-square" @mousedown="inputSquareClick">
          <div style="position: relative; height: 100%; padding: 2px">
            <textarea ref="inputBox"
                      class="input-box"
                      :style="{opacity: inputBoxShow}"
                      @blur="inputBoxBlur"
                      @mousemove="inputBoxMouseMove"
                      @mousedown="inputBoxMouseDown"
                      trim
                      autocomplete="off"
                      autocorrect="off"
                      autocompitaize="off"
                      spellcheck="false"></textarea>
            <ul v-if="autocompleteInputs.length" class="autocomplete-results">
              <li v-for="(item,i) in autocompleteInputs"
                  :key="i"
                  :class="{select: autocompleteSelect === i}"
                  @mousedown.left.prevent="inputAutocompleteText($event.target.textContent, $event)"
                  class="autocomplete-result">{{ item }}</li>
            </ul>
            <div class="rb-square" />
          </div>
        </div>

        <!-- Waiting scene -->
        <div v-show="processing" ref="frontdrop" class="front-drop">
          <font-awesome-icon icon="spinner" spin size="3x" />
        </div>
      </div>

      <!-- Footer -->
      <div ref="footer" class="footer col col-12 text-center">
        <span v-show="!noPaging" style="position: absolute; left: 8px">
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
        <span style="position: absolute; right: 8px">
          Selected:
          <span :style="{color: Object.keys(selected).length>0? 'red': 'inherit'}">{{ Object.keys(selected).length }}</span>
          &nbsp;|&nbsp;
          Filtered:
          <span :style="{color: table.length<value.length? 'red': 'inherit'}">{{ table.length }}</span>
          &nbsp;|&nbsp;
          Loaded:
          <span>{{ value.length }}</span>
        </span>
      </div>

      <!-- Filter Dialog -->
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
                  <font-awesome-icon v-if="inputFilterCondition==''" icon="percentage" size="sm" />
                  <font-awesome-icon v-if="inputFilterCondition=='='" icon="equals" size="sm" />
                  <font-awesome-icon v-if="inputFilterCondition=='>'" icon="greater-than" size="sm" />
                  <font-awesome-icon v-if="inputFilterCondition=='>='" icon="greater-than-equal" size="sm" />
                  <font-awesome-icon v-if="inputFilterCondition=='<'" icon="less-than" size="sm" />
                  <font-awesome-icon v-if="inputFilterCondition=='<='" icon="less-than-equal" size="sm" />
                  <font-awesome-icon v-if="inputFilterCondition=='~'" icon="plus" size="sm" />
                </template>
                <b-dropdown-item>
                  <a href="#" @click.prevent="inputFilterCondition=''">
                    <font-awesome-icon icon="percentage" size="sm" />
                    &nbsp;&nbsp;Near
                  </a>
                </b-dropdown-item>
                <b-dropdown-item>
                  <a href="#" @click.prevent="inputFilterCondition='='">
                    <font-awesome-icon icon="equals" size="sm" />
                    &nbsp;&nbsp;Exact Match
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
                    <font-awesome-icon icon="plus" size="sm" />
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

      <!-- Setting Dialog -->
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
          <draggable v-model="fields" draggable=".panel-list-item">
            <a v-for="(item, k) in fields" :key="k"
              href="#"
              class="list-group-item list-group-item-action panel-list-item"
              @click.prevent="item.visible = !item.visible">
              <b-checkbox size="sm" :checked="item.visible">
                {{ item.label }}
              </b-checkbox>
            </a>
          </draggable>
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

      <!-- Find Dialog -->
      <b-modal id="panelFind" hide-header hide-footer scrollable centered>
        <b-input-group class="">
          <b-form-input id="inputFind" ref="inputFind" v-model="inputFind"
                        autofocus
                        trim autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"
                        @keydown.enter.prevent="doFind(inputFind, $event)" />
          <template v-slot:append>
            <b-button variant="info" @click="doFind(inputFind)">
              <font-awesome-icon icon="search" size="sm" />
            </b-button>
          </template>
        </b-input-group>
      </b-modal>
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
import draggable from 'vuedraggable'

library.add(fas)
Vue.use(BootstrapVue)

export default {
  components: {
    'font-awesome-icon': FontAwesomeIcon,
    'vue-excel-filter': VueExcelFilter,
    'draggable': draggable
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
    noFinding: {type: Boolean, default: false},
    noFindingNext: {type: Boolean, default: false},
    noPaging: {type: Boolean, default: false},
    page: {type: Number, default: 0},               // prefer page size, auto-cal if not provided
    newRecord: {type: Function, default: null},     // return the new record from caller if provided
    nFilterCount: {type: Number, default: 200},     // show top n values in filter dialog
    height: {type: Number, default: 0},
    autocomplete: {type: Boolean, default: false}   // Default autocomplete of all columns
  },
  data () {
    return {
      // selTarget: null,
      // selSquare: null,
      // selx: 0,
      // sely: 0,

      tableContent: null,           // Table parent
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
      currentRowPos: 0,             // focusing array pos of [table] array
      currentColPos: 0,             // focusing pos of column/field
      currentField: null,           // focusing field object
      currentCell: null,
      inputBox: null,
      inputBoxShow: 0,
      inputSquare: null,
      autocompleteInputs: [],
      autocompleteSelect: -1,

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

      inputFind: '',

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
            filter[k] = {type: 0, value: this.columnFilter[k].slice(1).trim().toUpperCase()}
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
            case 0:
              if (`${content[k]}` !== `${filter[k].value}`) return false
              break
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
    this.tableContent = this.$refs.tableContent
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
    this.lazy(this.refreshPageSize, 200)
    setTimeout(() => {
      this.labelTr.children[0].style.height = this.labelTr.offsetHeight + 'px'
    })
    window.onresize = () => {
      // this.moveInputSquare(this.currentRowPos, this.currentColPos)
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
            this.inputBox.value = this.currentCell.innerText
            this.inputBox.focus()
            this.inputBox.select()
            document.execCommand('copy')
            e.preventDefault()
            break
          case 86: // v
            if (this.currentField.readonly) return
            this.inputBoxChanged = true
            this.inputBox.focus()
            this.inputBox.select()
            document.execCommand('paste')
            this.inputCellWrite(this.inputBox.value)
            if (!this.inputBoxShow)
              e.preventDefault()
            break
          case 70: // f
            if (!this.noFinding) {
              this.inputFind = ''
              this.$bvModal.show('panelFind')
              e.preventDefault()
            }
            break
          case 71: // g
            if (!this.noFindingNext && this.inputFind !== '') {
              this.doFindNext()
              e.preventDefault()
            }
            break
          case 76: // l
            e.preventDefault()
            this.calAutocompleteList(true)
            break
        }
      else {
        if (this.currentRowPos < 0) return
        if (!this.focused) return
        // this.focused = true
        switch (e.keyCode) {
          case 37:
            if (!this.inputBoxShow) {
              this.moveWest(e)
              e.preventDefault()
            }
            else {
              if (this.inputBox.selectionStart === 0) {
                this.moveWest(e)
                e.preventDefault()
              }
            }
            break
          case 38:
            e.preventDefault()
            if (this.autocompleteInputs.length === 0)
              this.moveNorth()
            else
              if (this.autocompleteSelect > 0) this.autocompleteSelect--
            break
          case 9:
          case 39:
            if (!this.inputBoxShow) {
              this.moveEast(e)
              e.preventDefault()
            }
            else {
              if (this.inputBox.selectionEnd === this.inputBox.value.length) {
                this.moveEast(e)
                e.preventDefault()
              }
            }
            break
          case 13:
            e.preventDefault()
            if (this.autocompleteInputs.length === 0)
              this.moveSouth(e)
            else
              if (this.autocompleteSelect !== -1)
                this.inputAutocompleteText(this.autocompleteInputs[this.autocompleteSelect])
            break
          case 40:
            e.preventDefault()
            if (this.autocompleteInputs.length === 0)
              this.moveSouth(e)
            else
              if (this.autocompleteSelect < this.autocompleteInputs.length - 1) this.autocompleteSelect++
            break
          case 27:
            this.autocompleteInputs = []
            this.autocompleteSelect = -1
            if (this.inputBoxShow) {
              e.preventDefault()
              this.inputBox.value = this.currentCell.innerText
              this.inputBoxShow = 0
              this.inputBoxChanged = false
            }
            break
          case 33:
            this.prevPage()
            e.preventDefault()
            break
          case 34:
            this.nextPage()
            e.preventDefault()
            break
          case 8:
          case 46:
            if (this.inputBoxShow) return
            if (this.currentField.readonly) return
            if (this.autocompleteInputs.length) return
            if (this.currentField.type === 'select') this.calAutocompleteList(true)
            else {
              this.inputbox.value = ''
              this.inputCellWrite('')
            }
            break
          default:
            if (this.inputBoxShow) return
            if (this.currentField.readonly) return
            if (e.altKey) return
            if (e.key !== 'Process' && e.key.length > 1) return
            if (this.currentField.type === 'select') this.calAutocompleteList(true)
            else {
              this.inputBox.value = ''
              this.inputBoxShow = 1
              this.inputBox.focus()
              this.inputBoxChanged = true
            }
            /*
            if (!this.autocompleteInputs.length && (e.keyCode === 8 || e.keyCode === 46)) {  // Delete/BS
              if (this.currentField.type === 'select')
                this.calAutocompleteList(true)
              else {
                this.inputBox.value = ''
                this.inputCellWrite('')
              }
            }
            */
            break
        }
      }
    })
  },
  methods: {
    tableScroll () {
      if (this.currentCell) {
        const cellRect = this.currentCell.getBoundingClientRect()
        const tableRect = this.$el.getBoundingClientRect()
        this.inputSquare.classList.add('no-transition')
        this.inputSquare.style.left = (cellRect.left - tableRect.left - 1) + 'px'
        this.inputSquare.style.top =  (cellRect.top - tableRect.top - 1) + 'px'
        setTimeout(() => this.inputSquare.classList.remove('no-transition'))
      }
    },
    registerColumn (field) {
      let pos = this.fields.findIndex(item => item.pos > field.pos)
      if (pos === -1) pos = this.fields.length
      this.fields.splice(pos, 0, field)
    },
    moveInputSquare (rowPos, colPos) {
      if (colPos < 0) return
      this.labelTr.children[this.currentColPos + 1].classList.remove('focus')
      if (this.currentRowPos >= 0 && this.currentRowPos < this.pagingTable.length)
        this.recordBody.children[this.currentRowPos].children[0].classList.remove('focus')

      const row = this.recordBody.children[rowPos]
      if (!row) return
      const cell = row.children[colPos + 1]
      if (!cell) return
      const cellRect = cell.getBoundingClientRect()
      const tableRect = this.$el.getBoundingClientRect()
      this.inputSquare.style.left = (cellRect.left - tableRect.left - 1) + 'px'
      this.inputSquare.style.top =  (cellRect.top - tableRect.top - 1) + 'px'
      this.inputSquare.style.width = (cellRect.width + 1) + 'px'
      this.inputSquare.style.height = (cellRect.height + 1) + 'px'

      const inputRect = this.inputSquare.getBoundingClientRect()
      const tabRect = this.$el.getBoundingClientRect()
      if (inputRect.right >= tabRect.right)
        this.tableContent.scrollBy(inputRect.right - tabRect.right, 0)
      if (inputRect.left <= tabRect.left + 40)
        this.tableContent.scrollBy(inputRect.left - tabRect.left - 40, 0)

      this.inputBoxShow = 0
      if (this.inputBoxChanged) {
        this.inputCellWrite(this.currentField.toValue(this.inputBox.value))
        this.inputBoxChanged = false
      }

      this.currentRowPos = rowPos
      this.currentColPos = colPos
      this.currentField = this.fields[colPos]
      this.currentCell = cell
      this.autocompleteInputs = []
      this.autocompleteSelect = -1
      if (typeof this.recalAutoCompleteList !== 'undefined') clearTimeout(this.recalAutoCompleteList)

      if (this.currentRowPos >= 0 && this.currentRowPos < this.pagingTable.length) {
        this.inputBox.focus()
        this.focused = true
        row.children[0].classList.add('focus')
        this.labelTr.children[this.currentColPos + 1].classList.add('focus')
      }
    },
    reset () {
      this.pageTop = 0
      this.prevSelect = -1
      this.reviseSelectedAfterTableChange()
    },
    getSelectedRecords () {
      return this.table.filter((rec, i) => this.selected[i])
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
    doFindNext () {
      return this.doFind()
    },
    doFind (s, e) {
      if (e) e.preventDefault()
      this.$bvModal.hide('panelFind')
      if (typeof s === 'undefined') s = this.inputFind
      else this.inputFind = s
      s = s.toUpperCase()
      for(let r = this.currentRowPos + this.pageTop; r < this.table.length; r++) {
        const rec = this.table[r]
        for(let c = (r === this.currentRowPos + this.pageTop ? this.currentColPos + 1: 0); c < this.fields.length; c++) {
          const field = this.fields[c].name
          if (typeof rec[field] !== 'undefined' && String(rec[field]).toUpperCase().indexOf(s) >= 0) {
            this.pageTop = this.findPageTop(r)
            setTimeout(() => {
              this.moveInputSquare(r - this.pageTop, c)
              this.focused = true
            })
            return true
          }
        }
      }
      for(let r = 0; r <= this.currentRowPos + this.pageTop; r++) {
        const rec = this.table[r]
        for(let c = 0; c < (r === this.currentRowPos + this.pageTop ? this.currentColPos : this.fields.length); c++) {
          const field = this.fields[c].name
          if (typeof rec[field] !== 'undefined' && String(rec[field]).toUpperCase().indexOf(s) >= 0) {
            this.pageTop = this.findPageTop(r)
            this.moveInputSquare(r - this.pageTop, c)
            setTimeout(() => {
              this.focused = true
            })
            return true
          }
        }
      }
      return false
    },
    findPageTop (rowPos) {
      for (let pt = this.pageTop; pt < this.table.length; pt += this.pageSize)
        if (rowPos >= pt && rowPos < pt + this.pageSize) return pt
      for (let pt = this.pageTop; pt > 0; pt -= this.pageSize)
        if (rowPos >= pt && rowPos < pt + this.pageSize) return pt
      return this.pageTop
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
      const colPos = typeof pos === 'undefined' ? this.columnFilterRef.colPos : pos
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
      this.columnFilterRef.$el.textContent = '=' + opt
      this.columnFilterRef.$emit('input', '=' + opt)
      this.hideFilterPanel()
    },
    showFilterPanel (ref) {
      this.columnFilterRef = ref
      this.inputFilter = ''
      this.inputFilterCondition = ''
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
      // eslint-disable-next-line
      // console.log(window.innerHeight, this.recordBody.getBoundingClientRect().top, this.footer.getBoundingClientRect().height)
      this.pageSize = this.page || Math.floor((
        window.innerHeight - this.recordBody.getBoundingClientRect().top - this.footer.getBoundingClientRect().height - 10) / 24)
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
    exportTable (format, selectedOnly) {
      this.$bvModal.hide('panelGrid')
      this.processing = true
      setTimeout(() => {
        const wb = XLSX.utils.book_new()
        let ws1 = null
        if (selectedOnly)
          ws1 = XLSX.utils.json_to_sheet(this.table.filter((rec, i) => this.selected[i]), {
            header: this.fields.map(field => field.name)
          })
        else
          ws1 = XLSX.utils.json_to_sheet(this.table, {
            header: this.fields.map(field => field.name)
          })
        const labels = Array.from(this.labelTr.children).slice(1).map(t => t.children[0].innerText)
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
      if (typeof this.selected[rowPos] === 'undefined') {
        this.selectedCount++
        this.selected[rowPos] = this.table[rowPos].key
        if (this.recordBody.children[rowPos - this.pageTop])
          this.recordBody.children[rowPos - this.pageTop].classList.add('select')
      }
    },
    unSelectRecord (rowPos) {
      if (typeof this.selected[rowPos] !== 'undefined') {
        delete this.selected[rowPos]
        this.selectedCount--
        if (this.recordBody.children[rowPos - this.pageTop])
          this.recordBody.children[rowPos - this.pageTop].classList.remove('select')
      }
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
    updateCellByColPos (row, colPos, content) {
      return this.updateCell(row, colPos, this.fields[colPos], content)
    },
    updateCellByName (row, name, content) {
      return this.updateCell(row, this.fields.findIndex(f => f.name === name), name, content)
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
        e.preventDefault()
        this.inputBox.focus()
        this.focused = true
        const row = e.target.parentNode
        const colPos = Array.from(row.children).indexOf(e.target) - 1
        const rowPos = Array.from(row.parentNode.children).indexOf(row)
        this.moveInputSquare(rowPos, colPos)
        if (e.target.classList.contains('select') && e.target.offsetWidth - e.offsetX < 15)
          this.calAutocompleteList(true)
      }
    },
    cellMouseMove (e) {
      e.target.style.cursor = e.target.offsetWidth - e.offsetX < 15 ? 'pointer' : (this.inputBoxShow ? 'default' : 'cell')
    },
    mouseOver () {
      this.mousein = true
    },
    mouseOut () {
      this.mousein = false
    },
    inputSquareClick () {
      if (!this.currentField.readonly && !this.inputBoxShow && this.currentField.type !== 'select') {
        this.inputBox.value = this.currentCell.innerText
        this.inputBoxShow = 1
        this.inputBox.focus()
        this.inputBoxChanged = false
        this.focused = true
      }
    },
    inputBoxKeydown (e) {
      if (this.currentField.readonly) return
      if (this.currentField.type === 'select') return
      if (e.ctrlKey || e.metaKey || e.altKey) return
      if (e.keyCode === 8 || e.keyCode === 46) this.inputBoxChanged = true
      if (e.key === 'Process' || e.key.length === 1) {
        this.inputBoxChanged = true
        this.calAutocompleteList()
      }
    },
    inputBoxMouseMove (e) {
      if (this.currentField.options.length)
        e.target.style.cursor = e.target.offsetWidth - e.offsetX < 15 ? 'pointer' : 'text'
    },
    inputBoxMouseDown (e) {
      if (this.currentField.options.length && e.target.offsetWidth - e.offsetX < 15) {
        e.preventDefault()
        this.calAutocompleteList(true)
      }
    },
    calAutocompleteList (force) {
      if (!force && !this.currentField.autocomplete) return
      if (force || (this.inputBoxChanged && this.inputBox.value.length > 0)) {
        if (typeof this.recalAutoCompleteList !== 'undefined') clearTimeout(this.recalAutoCompleteList)
        this.recalAutoCompleteList = setTimeout(() => {
          if (!force) {
            if (!this.focused || !this.inputBoxShow || !this.inputBoxChanged || !this.inputBox.value.length) {
              this.autocompleteInputs = []
              return
            }
          }
          const field = this.currentField
          const name = field.name
          const value = force ? '' : this.inputBox.value
          let list
          if (field.options.length > 0) {
            list = this.currentField.options
          }
          else {
            list = []
            for(let i=0; i<this.table.length; i++) {
              const rec = this.table[i]
              if (rec[name].startsWith(value) && list.indexOf(rec[name]) === -1)
                list.push(rec[name])
              if (list.length >= 10) break
            }
            list.sort()
          }
          this.autocompleteSelect = -1
          this.autocompleteInputs = list
        }, force ? 0 : 1000)
      }
    },
    inputAutocompleteText (text, e) {
      if (e) e.preventDefault()
      setTimeout(() => {
        this.inputCellWrite(text)
        this.autocompleteInputs = []
        this.autocompleteSelect = -1
        this.inputBoxShow = 0
        this.inputBoxChanged = false
      })
    },
    inputCellWrite (setText, col, row) {
      if (typeof col === 'undefined') col = this.currentColPos
      if (typeof row === 'undefined') row = this.pageTop + this.currentRowPos
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

        const left = Math.min(st.left, ed.left) - 1
        const top = Math.min(st.top, ed.top) - 1
        const width = Math.max(ed.right - st.left, st.right - ed.left) + 2
        const height = Math.max(ed.bottom - st.top, st.bottom - ed.top) + 2

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
input:focus, input:active:focus, input.active:focus {
  outline: none;
  box-shadow: inset 0 -1px 0 #ddd;
}
.input-square {
  position: absolute;
  padding: 0;
  z-index: 2;
  border: 2px solid rgb(108, 143, 108);
  /* transition: all 0.04s linear; */
}
.no-transition {
  transition: none !important;
}
.autocomplete-results {
  padding: 3px;
  margin-top: 0px;
  margin-left: -4px;
  margin-right: -4px;
  background-color: lightyellow;
  border: 1px solid rgb(108, 143, 108);
  height: fit-content;
  font-size: 0.88rem;
  overflow: auto;
}
.autocomplete-result {
  list-style: none;
  text-align: left;
  padding: 4px 2px;
  cursor: pointer
}
.autocomplete-result.select {
  background-color: lightsteelblue;
}
.rb-square {
  width: 9px;
  height: 9px;
  border-top: 2px solid white;
  border-left: 2px solid white;
  border-bottom: 0;
  border-right: 0;
  background-color:rgb(108, 143, 108);
  position: absolute;
  bottom: -3px;
  right: -2px;
  cursor: crosshair;
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
.component-content {
  display: flex;
  flex-flow: column;
  position: relative;
  max-width:fit-content;
}
.table-content {
  flex: 1 1 auto;
  font-family: Calibri, Candara, Segoe, "Segoe UI", Optima, Arial, sans-serif;
  font-size: 1rem;
  border-top: 0.5px solid lightgray;
  line-height: 1.1;
  word-spacing: 0.02rem;
  overflow: scroll;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.table-content::-webkit-scrollbar {
  width: 0;
  height: 10px;
}
.table-content::-webkit-scrollbar-thumb {
  background: #a0a0a040;
  border-radius: 3px;
}
.systable {
  z-index: -1;
  width: fit-content;
  border: 0;
  border-collapse: separate;
  border-spacing: 0;
  margin-bottom: 0;
  margin-left: 40px;
}
.systable tr {
  background-color: white;
  text-align: left;
}
.systable tr.select {
  background-color: darkgrey !important;
}
.systable th, .systable td {
  vertical-align: bottom;
  padding: 0.3rem;
  font-size: 0.88rem;
  height: 24px;
  border-top: 0;
  border-left: 0;
  border-right: 1px solid lightgray;
  border-bottom: 1px solid lightgray;
}
.systable thead th, .systable thead td {
  padding: 0.4rem 0.3rem;
  background-color: #e9ecef;
  font-weight: 400;
  height: 28px;
  cursor: s-resize;
  position: sticky;
  top: 0;
  z-index: 1;
}
.systable thead td.column-filter {
  text-align: left;
  background-color: lightyellow;
  white-space: nowrap;
  overflow-x: hidden;
  text-overflow: ellipsis;
}
.systable th.focus {
  border-bottom: 1px solid rgb(61, 85, 61) !important;
}
.systable tbody td.select {
  background-image: url('./assets/down.png');
  background-repeat: no-repeat;
  background-size: 8px 8px;
  background-position: right 5px top 8px;
}
.systable tbody td {
  cursor: cell;
  white-space: nowrap;
  overflow-x: hidden;
  text-overflow: ellipsis;
  animation: fadein 0.2s;
}
.systable tbody td.error {
  background-image: url('./assets/err.png');
  background-repeat: no-repeat;
  background-size: 8px 8px;
  background-position: right 0px top 0px;
}
.systable tbody td.readonly {
  color: #2084EE
}
.systable .first-col {
  background:#e9ecef;
  width: 40px;
  position: absolute;
  left: 0;
  top: auto;
  cursor: e-resize !important;
  text-overflow: inherit !important;
  overflow: hidden;
  z-index: 5;
}
.systable thead .tl-setting {
  display: flex;
  flex-direction: column-reverse;
  height: 100%;
}
.systable thead td.first-col, .systable thead th.first-col {
  cursor: pointer !important;
}
.systable td.first-col.focus {
  border-right: 1px solid rgb(61, 85, 61) !important;
}
.footer {
  flex: 0 1 30px;
  padding: 4px;
  font-size: 0.9rem;
  color: dimgray;
  position: sticky;
  bottom: 0;
  left: 0;
  background-color: white;
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
  z-index: 2;
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

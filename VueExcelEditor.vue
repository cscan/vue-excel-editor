<template>
  <div :style="{display: 'inline-block', 'max-width': width}">
    <div class="component-content">
      <div ref="tableContent"
           class="table-content"
           :class="{'no-footer': noFooter}"
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
              :class="{'no-number': noNumCol}"
              ondragenter="event.preventDefault(); event.dataTransfer.dropEffect = 'none'"
              ondragover="event.preventDefault(); event.dataTransfer.dropEffect = 'none'">
          <colgroup>
            <!--col class="first-col">
            <col v-for="item in nFields" :key="`col-${item}`" style="width: 100px"-->
          </colgroup>
          <thead class="center-text">
            <tr>
              <th class="center-text first-col tl-setting"
                  :class="{hide: noNumCol}"
                  style="top: 0"
                  @mousedown.left="settingClick">
                <span style="width:100%">
                  <svg v-if="processing" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="spinner" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-spinner fa-w-16 fa-spin fa-sm"><path fill="currentColor" d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z"></path></svg>
                  <svg v-else aria-hidden="true" focusable="false" data-prefix="fas" data-icon="bars" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="svg-inline--fa fa-bars fa-w-14 fa-sm"><path fill="currentColor" d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"></path></svg>
                </span>
              </th>
              <th v-for="(item, p) in fields"
                  v-show="item.visible"
                  :key="`th-${p}`"
                  :class="{'sort-asc-sign': sortPos==p && sortDir==1,
                          'sort-des-sign': sortPos==p && sortDir==-1,
                          'sticky-column': item.sticky}"
                  class="table-col-header"
                  :style="{width: item.width, left: item.left}"
                  @mousedown="headerClick($event, p)">
                <div :class="{'filter-sign': columnFilter[p]}">
                  <span v-html="headerLabel(item.label, item)"></span>
                </div>
                <div class="col-sep"
                    @mousedown="colSepMouseDown"
                    @mouseover="colSepMouseOver"
                    @mouseout="colSepMouseOut" />
              </th>
            </tr>
            <tr :class="{hide: !filterRow}">
              <td class="center-text first-col tl-filter"
                  :class="{hide: noNumCol}"
                  :style="{top: calCellTop2 + 'px'}"
                  @click="selectAllClick">
                <svg v-if="selectedCount==table.length" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-times-circle fa-w-16 fa-sm"><path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z"></path></svg>
                <svg v-else aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-check-circle fa-w-16 fa-sm"><path fill="currentColor" d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"></path></svg>
              </td>
              <vue-excel-filter v-for="(item, p) in fields"
                                v-show="item.visible"
                                :key="`th2-${p}`"
                                v-model="columnFilter[p]"
                                :class="{'sticky-column': item.sticky}"
                                :style="{left: item.left}"
                                class="column-filter" />
            </tr>
          </thead>
          <tbody @mousedown.exact="mouseDown">
            <tr v-for="(record, rowPos) in pagingTable"
                :key="rowPos"
                :class="{select: typeof selected[pageTop + rowPos] !== 'undefined'}"
                :style="rowStyle(record)">
              <td class="center-text first-col"
                  :class="{hide: noNumCol}"
                  :pos="rowPos"
                  @click="rowLabelClick">
                <span v-html="recordLabel(pageTop + rowPos + 1, record)"></span>
              </td>
              <template v-for="(item, p) in fields">
                <td v-show="item.visible"
                    :id="`${record.key}:${item.name}`"
                    :class="{
                      readonly: item.readonly,
                      error: errmsg[`${record.key}:${item.name}`],
                      select: item.options.length,
                      datepick: item.type == 'date',
                      'sticky-column': item.sticky
                    }"
                    :style="Object.assign(cellStyle(record, item), columnCellStyle(item))"
                    :key="`f${p}`"
                    @mouseover="cellMouseOver"
                    @mousemove="cellMouseMove">{{ item.toText(record[item.name]) }}</td>
              </template>
            </tr>
          </tbody>
          <slot></slot>
        </table>

        <!-- Tool Tip -->
        <div v-show="tip" ref="tooltip" class="tool-tip">{{ tip }}</div>

        <!-- Editor Square -->
        <div v-show="focused" ref="inputSquare" class="input-square" @mousedown="inputSquareClick">
          <div style="position: relative; height: 100%; padding: 2px 2px 1px">
            <div class="rb-square" />
            <textarea ref="inputBox"
                      id="inputBox"
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
          </div>
        </div>

        <!-- Date Picker -->
        <div ref="dpContainer" v-show="showDatePicker" style="z-index:20; position:fixed">
          <date-picker ref="datepicker" inline v-model="inputDateTime" @input="dpClick" valueType="format"></date-picker>
        </div>

        <!-- Waiting scene -->
        <div v-show="processing" ref="frontdrop" class="front-drop">
          <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="spinner" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-spinner fa-w-16 fa-spin fa-3x"><path fill="currentColor" d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z"></path></svg>
        </div>
      </div>

      <!-- Autocomplete List -->
      <ul ref="autocomplete" v-show="focused && autocompleteInputs.length" class="autocomplete-results">
        <li v-for="(item,i) in autocompleteInputs"
            :key="i"
            :class="{select: autocompleteSelect === i}"
            @mousedown.left.prevent="inputAutocompleteText($event.target.textContent, $event)"
            class="autocomplete-result">{{ item }}</li>
      </ul>

      <!-- Footer -->
      <div ref="footer" class="footer center-text" :class="{hide: noFooter}" style="position:relative">
        <div ref="scrollbar" class="scroll-bar" @mousedown="sbMouseDown" />
        <span class="left-block"></span>
        <span v-show="!noPaging" style="position: absolute; left: 46px">
          <span v-html="localizedLabel.footerLeft(pageTop + 1, pageBottom, table.length)"></span>
        </span>
        <span v-show="!noPaging && pageBottom - pageTop < table.length">
          <template v-if="processing">
            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="spinner" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-spinner fa-w-16 fa-spin fa-sm"><path fill="currentColor" d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z"></path></svg>
            <span v-html="localizedLabel.processing" />
          </template>
          <template v-else>
            <a :class="{disabled: pageTop <= 0}" @click="firstPage">
              <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="step-backward" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="svg-inline--fa fa-step-backward fa-w-14 fa-sm"><path fill="currentColor" d="M64 468V44c0-6.6 5.4-12 12-12h48c6.6 0 12 5.4 12 12v176.4l195.5-181C352.1 22.3 384 36.6 384 64v384c0 27.4-31.9 41.7-52.5 24.6L136 292.7V468c0 6.6-5.4 12-12 12H76c-6.6 0-12-5.4-12-12z"></path></svg>
              &nbsp;
              <span v-html="localizedLabel.first" />
            </a>
            &nbsp;|&nbsp;
            <a :class="{disabled: pageTop <= 0}" @click="prevPage">
              <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="backward" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-backward fa-w-16 fa-sm"><path fill="currentColor" d="M11.5 280.6l192 160c20.6 17.2 52.5 2.8 52.5-24.6V96c0-27.4-31.9-41.8-52.5-24.6l-192 160c-15.3 12.8-15.3 36.4 0 49.2zm256 0l192 160c20.6 17.2 52.5 2.8 52.5-24.6V96c0-27.4-31.9-41.8-52.5-24.6l-192 160c-15.3 12.8-15.3 36.4 0 49.2z"></path></svg>
              &nbsp;
              <span v-html="localizedLabel.previous" />
            </a>
            &nbsp;|&nbsp;
            <a :class="{disabled: pageTop + pageSize >= table.length}" @click="nextPage">
              <span v-html="localizedLabel.next" />
              &nbsp;
              <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="forward" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-forward fa-w-16 fa-sm"><path fill="currentColor" d="M500.5 231.4l-192-160C287.9 54.3 256 68.6 256 96v320c0 27.4 31.9 41.8 52.5 24.6l192-160c15.3-12.8 15.3-36.4 0-49.2zm-256 0l-192-160C31.9 54.3 0 68.6 0 96v320c0 27.4 31.9 41.8 52.5 24.6l192-160c15.3-12.8 15.3-36.4 0-49.2z"></path></svg>
            </a>
            &nbsp;|&nbsp;
            <a :class="{disabled: pageTop + pageSize >= table.length}" @click="lastPage">
              <span v-html="localizedLabel.last" />
              &nbsp;
              <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="step-forward" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="svg-inline--fa fa-step-forward fa-w-14 fa-sm"><path fill="currentColor" d="M384 44v424c0 6.6-5.4 12-12 12h-48c-6.6 0-12-5.4-12-12V291.6l-195.5 181C95.9 489.7 64 475.4 64 448V64c0-27.4 31.9-41.7 52.5-24.6L312 219.3V44c0-6.6 5.4-12 12-12h48c6.6 0 12 5.4 12 12z"></path></svg>
            </a>
          </template>
        </span>
        <span style="position: absolute; right: 6px">
          <span v-html="localizedLabel.footerRight(Object.keys(selected).length, table.length, value.length)" />
        </span>
      </div>

      <input type="file"
             ref="importFile"
             accept=".xlsx, .xls, xlsm, .csv"
             style="width:0; height: 0; opacity:0; z-index:-1"
             @change="doImport" />

      <panel-filter ref="panelFilter" :m-filter-count="nFilterCount" :localized-label="localizedLabel" />
      <panel-setting ref="panelSetting" v-model="fields" :localized-label="localizedLabel" />
      <panel-find ref="panelFind" :localized-label="localizedLabel" />
    </div>
  </div>
</template>

<script>
import VueExcelFilter from './VueExcelFilter'
import PanelFilter from './panelFilter'
import PanelSetting from './panelSetting'
import PanelFind from './panelFind'
import DatePicker from 'vue2-datepicker'
import XLSX from 'xlsx'

import 'vue2-datepicker/index.css'

export default {
  components: {
    'vue-excel-filter': VueExcelFilter,
    'panel-filter': PanelFilter,
    'panel-setting': PanelSetting,
    'panel-find': PanelFind,
    'date-picker': DatePicker
  },
  props: {
    value: {type: Array, default () {return []}},
    rowStyle: {type: Function, default () {return {}}},
    cellStyle: {type: Function, default () {return {}}},
    headerLabel: {
      type: Function,
      default (label) {
        return label
      }
    },
    recordLabel: {                                  // return the row header
      type: Function,
      default (pos) {
        return pos
      }
    },
    noFinding: {type: Boolean, default: false},
    noFindingNext: {type: Boolean, default: false},
    filterRow: {type: Boolean, default: false},
    noFooter: {type: Boolean, default: false},
    noPaging: {type: Boolean, default: false},
    noNumCol: {type: Boolean, default: false},
    page: {type: Number, default: 0},               // prefer page size, auto-cal if not provided
    newRecord: {type: Function, default: null},     // return the new record from caller if provided
    nFilterCount: {type: Number, default: 200},     // show top n values in filter dialog
    height: {type: String, default: ''},
    width: {type: String, default: '100%'},
    autocomplete: {type: Boolean, default: false},  // Default autocomplete of all columns
    readonly: {type: Boolean, default: false},
    readonlyStyle: {type: Object, default () {return {}}},
    localizedLabel: {
      type: Object,
      default () {
        return {
          footerLeft: (top, bottom, total) => `Record ${top} to ${bottom} of ${total}`,
          first: 'First',
          previous: 'Previous',
          next: 'Next',
          last: 'Last',
          footerRight: (selected, filtered, loaded) => `Selected: ${selected} | Filtered: ${filtered} | Loaded: ${loaded}`,
          processing: 'Processing',
          tableSetting: 'Table Setting',
          exportExcel: 'Export Excel',
          importExcel: 'Import Excel',
          back: 'Back',
          sortingAndFiltering: 'Sorting And Filtering',
          sortAscending: 'Sort Ascending',
          sortDescending: 'Sort Descending',
          near: '≒ Near',
          exactMatch: '= Exact Match',
          greaterThan: '&gt; Greater Than',
          greaterThanOrEqualTo: '≥ Greater Than or Equal To',
          lessThan: '&lt; Less Than',
          lessThanOrEqualTo: '≤ Less Than Or Equal To',
          regularExpression: '~ Regular Expression',
          customFilter: 'Custom Filter',
          listFirstNValuesOnly: n => `List first ${n} values only`,
          apply: 'Apply',
          noRecordIsRead: 'No record is read',
          readonlyColumnDetected: 'Readonly column detected',
          columnHasValidationError: (name, err) => `Column ${name} has validation error: ${err}`,
          noMatchedColumnName: 'No matched column name',
          invalidInputValue: 'Invalid input value'
        }
      }
    }
  },
  data () {
    const pageSize = this.noPaging ? 999999 : 20
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

      pageSize: pageSize,
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
      tip: '',

      fields: [],
      focused: false,
      mousein: false,
      inputBoxChanged: false,

      columnFilter: {},             // set filter storage in hash, key is the column pos

      inputFind: '',
      calCellLeft: 0,
      calCellTop: 0,
      calCellTop2: 29,

      frontdrop: null,              // frontdrop dom node

      sortPos: 0,                   // Sort column position
      sortDir: 0,                   // Sort direction, 1=Ascending, -1=Descending
      redo: [],                     // redo log

      lazyTimeout: {},
      lazyBuffer: {},
      hScroller: {},
      leftMost: 0,

      showDatePicker: false,
      inputDateTime: ''
    }
  },
  computed: {
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
          content[k] = typeof val === 'undefined' ? '' : String(val).toUpperCase()
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
  beforeDestroy () {
    window.removeEventListener('resize', this.winResize)
    window.removeEventListener('paste', this.winPaste)
    window.removeEventListener('keydown', this.winKeydown)
    window.removeEventListener('mousemove', this.sbMouseMove)
    window.removeEventListener('scroll', this.winScroll)
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
      this.calCellTop2 = this.labelTr.offsetHeight
    })
    this.lazy(this.calStickyLeft)
    window.addEventListener('resize', this.winResize)
    window.addEventListener('paste', this.winPaste)
    window.addEventListener('keydown', this.winKeydown)
    window.addEventListener('scroll', this.winScroll)
  },
  methods: {
    showDatePickerDiv () {
      const cellRect = this.currentCell.getBoundingClientRect()
      this.$refs.dpContainer.style.left = (cellRect.left) + 'px'
      this.$refs.dpContainer.style.top = (cellRect.bottom) + 'px'
      this.inputDateTime = this.currentCell.textContent
      this.showDatePicker = true
    },
    dpClick () {
      this.inputCellWrite(this.inputDateTime)
      this.showDatePicker = false
    },
    columnCellStyle (field) {
      let result = field.initStyle
      if (field.readonly) result = Object.assign(result, this.readonlyStyle)
      if (field.left) result = Object.assign(result, {left: field.left})
      return result
    },
    calStickyLeft () {
      let left = 0, n = 0
      this.leftMost = -1
      Array.from(this.labelTr.children).forEach(th => {
        left += th.offsetWidth
        const field = this.fields[n++]
        if (field)
          if (field.sticky) field.left = left + 'px'
          else if (this.leftMost === -1) this.leftMost = left
      })
      this.$forceUpdate()
    },
    sbMouseDown (e) {
      if (!this.hScroller.mouseX) {
        const sleft = this.$refs.scrollbar.getBoundingClientRect().left
        const fleft = this.footer.getBoundingClientRect().left + 40
        this.hScroller.left = sleft - fleft
        this.hScroller.mouseX = e.clientX
        window.addEventListener('mousemove', this.sbMouseMove)
        this.$refs.scrollbar.classList.add('focus')
      }
    },
    sbMouseMove (e) {
      if (e.buttons === 0) {
        window.removeEventListener('mousemove', this.sbMouseMove)
        this.lazy(() => this.$refs.scrollbar.classList.remove('focus'))
        this.hScroller.mouseX = 0
      }
      else {
        const diff = e.clientX - this.hScroller.mouseX
        const ratio = (this.hScroller.left + diff) / this.hScroller.scrollerUnseenWidth
        this.tableContent.scrollTo(this.hScroller.tableUnseenWidth * ratio, this.tableContent.scrollTop)
      }
    },
    tableScroll () {
      /*
      this.calCellLeft = this.tableContent.scrollLeft
      this.calCellTop = this.tableContent.scrollTop
      this.calCellTop2 = this.tableContent.scrollTop + this.labelTr.offsetHeight
      */
      this.showDatePicker = false
      this.autocompleteInputs = []
      if (this.focused && this.currentField)
        this.inputSquare.style.marginLeft = (this.currentField.sticky ? this.tableContent.scrollLeft : 0) + 'px'

      if (this.$refs.scrollbar && this.hScroller.tableUnseenWidth) {
        this.$refs.scrollbar.classList.add('focus')
        this.lazy(() => this.$refs.scrollbar.classList.remove('focus'), 1000)
        const ratio = this.tableContent.scrollLeft / this.hScroller.tableUnseenWidth
        this.$refs.scrollbar.style.left = (this.hScroller.scrollerUnseenWidth * ratio) + 'px'
      }
      /*
      if (this.currentCell) {
        const cellRect = this.currentCell.getBoundingClientRect()
        const tableRect = this.systable.getBoundingClientRect()
        // this.inputSquare.classList.add('no-transition')
        this.inputSquare.style.left = (cellRect.left - tableRect.left + 38) + 'px'
        this.inputSquare.style.top =  (cellRect.top - tableRect.top - 1) + 'px'
        // setTimeout(() => this.inputSquare.classList.remove('no-transition'))
      }
      */
    },
    importTable (cb) {
      this.$refs.importFile.click()
      this.importCallback = cb
    },
    doImport (e) {
      this.processing = true
      this.clearAllSelected()
      setTimeout(() => {
        const files = e.target.files
        if (!files || files.length === 0) return
        const file = files[0]

        const fileReader = new FileReader()
        fileReader.onload = (e) => {
          try {
            const data = e.target.result
            const wb = XLSX.read(data, {type: 'binary', cellDates: true, cellStyle: false})
            const sheet = wb.SheetNames[0]
            const importData = XLSX.utils.sheet_to_row_object_array(wb.Sheets[sheet])
            const keyStart = new Date().getTime()
            if (importData.length === 0) throw new Error('VueExcelEditor: ' + this.localizedLabel.noRecordIsRead)

            let pass = 0
            let inserted = 0
            let updated = 0
            while (pass < 2) {
              importData.forEach((line, i) => {
                const rec = {
                  key: typeof line.key === 'undefined' ? keyStart + i : line.key
                }
                let rowPos = this.value.findIndex(v => v.key === rec.key)
                let real = rowPos >= 0
                this.fields.forEach((field) => {
                  if (field.name === 'key') return
                  let val = line[field.name]
                  if (typeof val === 'undefined') val = line[field.label]
                  if (typeof val === 'undefined') val = ''
                  else {
                    if (field.readonly) throw new Error(`VueExcelEditor: [row=${i+1}] ` + this.localizedLabel.readonlyColumnDetected)
                    if (field.validate) {
                      let err
                      if ((err = field.validate(val)))
                        throw new Error(`VueExcelEditor: [row=${i+1}] ` + this.localizedLabel.columnHasValidationError(field.name, err))
                    }
                    real = true
                  }
                  if (!real) throw new Error(`VueExcelEditor: [row=${i+1}] ` + this.localizedLabel.noMatchedColumnName)
                  rec[field.name] = val
                })
                if (pass === 1) {
                  if (rowPos >= 0) {
                    this.value[rowPos] = rec
                    updated++
                  }
                  else {
                    rowPos = this.value.push(rec) - 1
                    inserted++
                  }
                  this.selectRecord(rowPos)
                }
              })
              pass++
            }
            if (pass === 2 && this.importCallback)
              this.importCallback({
                inserted: inserted,
                updated: updated,
                recordAffected: inserted + updated
              })
          }
          catch (e) {
            throw new Error('VueExcelEditor: ' + e.stack)
          }
          finally {
            this.processing = false
            e.target.value = ''
          }
        }
        fileReader.onerror = (e) => {
          this.processing = false
          this.$refs.importFile.reset()
          throw new Error('VueExcelEditor: ' + e.stack)
        }
        fileReader.readAsBinaryString(file)
      }, 500)      
    },
    winScroll () {
      this.showDatePicker = false
      this.autocompleteInputs = []
    },
    winResize () {
      this.lazy(this.refreshPageSize, 200)
    },
    winPaste (e) {
      if (!this.mousein && !this.focused) return
      if (this.currentField.readonly) return
      if (this.inputBoxShow) {
        this.inputBoxChanged = true
        return
      }
      const text = (e.originalEvent || e).clipboardData.getData('text/plain')
      this.inputCellWrite(text)
      e.preventDefault()
    },
    winKeydown (e) {
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
          case 70: // f
            if (!this.noFinding) {
              this.$refs.panelFind.showPanel()
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
          case 40:
            e.preventDefault()
            if (this.autocompleteInputs.length === 0)
              this.moveSouth(e)
            else
              if (this.autocompleteSelect < this.autocompleteInputs.length - 1) this.autocompleteSelect++
            break
          case 13:
            e.preventDefault()
            if (this.autocompleteInputs.length === 0 || this.autocompleteSelect === -1)
              this.moveSouth(e)
            else
              if (this.autocompleteSelect !== -1)
                this.inputAutocompleteText(this.autocompleteInputs[this.autocompleteSelect])
            break
          case 27:
            this.showDatePicker = false
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
            if (this.inputBoxShow) {
              this.inputBoxChanged = true
              setTimeout(this.calAutocompleteList)
              return
            }
            if (this.currentField.readonly) return
            if (this.autocompleteInputs.length) return
            if (this.currentField.type === 'select') this.calAutocompleteList(true)
            else {
              this.inputBox.value = ''
              this.inputCellWrite('')
            }
            break
          default:
            if (this.currentField.readonly) return
            if (e.altKey) return
            if (e.key !== 'Process' && e.key.length > 1) return
            if (this.currentField.allowKeys && this.currentField.allowKeys.indexOf(e.key.toUpperCase()) === -1) return e.preventDefault()
            if (this.currentField.lengthLimit && this.inputBox.value.length > this.currentField.lengthLimit) return e.preventDefault()
            if (!this.inputBoxShow) {
              if (this.currentField.type === 'select') {
                this.calAutocompleteList(true)
                return
              }
              if (this.currentField.type === 'date') {
                this.showDatePickerDiv()
                return
              }
              this.inputBox.value = ''
              this.inputBoxShow = 1
              this.inputBox.focus()
            }
            this.inputBoxChanged = true
            setTimeout(this.calAutocompleteList)
            break
        }
      }
    },
    registerColumn (field) {
      let pos = this.fields.findIndex(item => item.pos > field.pos)
      if (pos === -1) pos = this.fields.length
      this.fields.splice(pos, 0, field)
    },
    moveInputSquare (rowPos, colPos) {
      if (colPos < 0) return
      const row = this.recordBody.children[rowPos]
      if (!row) {
        if (rowPos > this.currentRowPos) {
          if (this.pageTop + this.pageSize + 1 < this.table.length) {
            this.pageTop += 1
            setTimeout(() => this.moveInputSquare(rowPos - 1, colPos))
          }
          return
        }
        else {
          if (this.pageTop - 1 >= 0) {
            this.pageTop -= 1
            setTimeout(() => this.moveInputSquare(rowPos + 1, colPos))
          }
          return
        }
      }

      this.labelTr.children[this.currentColPos + 1].classList.remove('focus')
      if (this.currentRowPos >= 0 && this.currentRowPos < this.pagingTable.length)
        this.recordBody.children[this.currentRowPos].children[0].classList.remove('focus')

      const cell = row.children[colPos + 1]
      if (!cell) return
      const cellRect = cell.getBoundingClientRect()
      const tableRect = this.systable.getBoundingClientRect()
      const boundRect = this.$el.getBoundingClientRect()
      this.inputSquare.style.left = (cellRect.left - tableRect.left - 1) + 'px'
      this.inputSquare.style.top =  (cellRect.top - tableRect.top - 1) + 'px'
      this.inputSquare.style.width = (cellRect.width + 1) + 'px'
      this.inputSquare.style.height = (cellRect.height + 1) + 'px'
      if (cellRect.right >= boundRect.right)
        this.tableContent.scrollBy(cellRect.right - boundRect.right + 1, 0)
      if (cellRect.left <= boundRect.left + this.leftMost)
        this.tableContent.scrollBy(cellRect.left - boundRect.left - this.leftMost - 1, 0)

      this.inputBoxShow = 0
      if (this.inputBoxChanged) {
        this.inputCellWrite(this.currentField.toValue(this.inputBox.value))
        this.inputBoxChanged = false
      }

      this.currentRowPos = rowPos
      this.currentColPos = colPos
      this.currentField = this.fields[colPos]
      this.inputSquare.style.zIndex = this.currentField.sticky ? 3 : 1
      this.currentCell = cell
      this.showDatePicker = false
      this.autocompleteInputs = []
      this.autocompleteSelect = -1
      if (typeof this.recalAutoCompleteList !== 'undefined') clearTimeout(this.recalAutoCompleteList)

      if (this.currentRowPos >= 0 && this.currentRowPos < this.pagingTable.length) {
        this.inputBox.focus()
        this.focused = true
        row.children[0].classList.add('focus')
        this.labelTr.children[colPos + 1].classList.add('focus')
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
      this.focused = false
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
      this.sep.curCol.style.width = (this.sep.curColWidth + diffX) + 'px'
      this.lazy(this.calStickyLeft)
    },
    mouseUp (e) {
      e.preventDefault()
      e.stopPropagation()
      delete this.sep
    },
    doFindNext () {
      return this.doFind()
    },
    doFind (s) {
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
              setTimeout(() => this.inputBox.focus())
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
    freezePanelSizeAfterShown (target) {
      const rect = target.getBoundingClientRect()
      target.setAttribute('style', `width:${rect.width}px; height:${rect.height}px;`)
    },
    refreshPageSize () {
      if (this.$refs.scrollbar) {
        const fullWidth = this.systable.getBoundingClientRect().width
        const viewWidth = this.tableContent.getBoundingClientRect().width
        this.hScroller.tableUnseenWidth = fullWidth - viewWidth
        this.$refs.scrollbar.style.width = (100 * viewWidth / fullWidth) + '%'
        const scrollerWidth = this.$refs.scrollbar.getBoundingClientRect().width
        this.hScroller.scrollerUnseenWidth = this.footer.getBoundingClientRect().width - 40 - scrollerWidth
      }
      if (this.noPaging) return
      this.pageSize = this.page || Math.floor((window.innerHeight - this.recordBody.getBoundingClientRect().top - 35) / 24)
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
      let target = e.target
      while (target.tagName !== 'TD') target = target.parentNode
      const rowPos = Number(target.getAttribute('pos')) + this.pageTop
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
      this.$refs.panelSetting.showPanel()
    },
    exportTable (format, selectedOnly) {
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
        this.lazy(rowPos, (buf) => {
          this.$emit('select', buf, true)
        })
      }
    },
    unSelectRecord (rowPos) {
      if (typeof this.selected[rowPos] !== 'undefined') {
        delete this.selected[rowPos]
        this.selectedCount--
        if (this.recordBody.children[rowPos - this.pageTop])
          this.recordBody.children[rowPos - this.pageTop].classList.remove('select')
        this.lazy(rowPos, (buf) => {
          this.$emit('select', buf, false)
        })
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
      const tableRow = this.table[row]
      const oldVal = tableRow[name]
      tableRow[name] = content

      setTimeout(() => {
        const field = this.fields[colPos]
        const transaction = {
          key: tableRow.key,
          colPos: colPos,
          field: name,
          newVal: content,
          oldVal: oldVal,
          err: ''
        }

        const id = `${transaction.key}:${name}`
        if (field.validate !== null) transaction.err = field.validate(content)
        if (field.mandatory && content === '')
          transaction.err += (transaction.err ? '\n' : '') + field.mandatory

        if (transaction.err !== '') {
          this.errmsg[id] = transaction.err
          document.getElementById(id).classList.add('error')
        }
        else delete this.errmsg[id]

        this.lazy(transaction, (buf) => {
          this.$emit('update', buf)
          if (!restore) this.redo.push(buf)
        }, 50)

        /*
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
        */
      })
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
      if (this.focused)
        this.moveInputSquare(this.currentRowPos - 1, this.currentColPos)
    },
    moveSouth () {
      if (this.focused && this.currentRowPos < this.table.length)
        this.moveInputSquare(this.currentRowPos + 1, this.currentColPos)
    },
    mouseDown (e) {
      if (e.target.parentNode.parentNode.tagName === 'TBODY' && !e.target.classList.contains('first-col')) {
        e.preventDefault()
        setTimeout(() => this.inputBox.focus())
        this.focused = true
        const row = e.target.parentNode
        const colPos = Array.from(row.children).indexOf(e.target) - 1
        const rowPos = Array.from(row.parentNode.children).indexOf(row)
        this.moveInputSquare(rowPos, colPos)
        if (e.target.offsetWidth - e.offsetX > 15) return
        if (e.target.classList.contains('select')) this.calAutocompleteList(true)
        if (e.target.classList.contains('datepick')) this.showDatePickerDiv()
      }
    },
    cellMouseMove (e) {
      let cursor = 'cell'
      if (this.inputBoxShow) cursor = 'default'
      if (!e.target.classList.contains('readonly')
        && (e.target.classList.contains('select') || e.target.classList.contains('datepick'))
        && e.target.offsetWidth - e.offsetX < 15)
        cursor = 'pointer'
      e.target.style.cursor = cursor
    },
    cellMouseOver (e) {
      const cell = e.target
      if (!cell.classList.contains('error')) return
      if (this.tipTimeout) clearTimeout(this.tipTimeout)
      if ((this.tip = this.errmsg[cell.getAttribute('id')]) === '') return
      const rect = cell.getBoundingClientRect()
      this.$refs.tooltip.style.top = (rect.top - 14) + 'px';
      this.$refs.tooltip.style.left = (rect.right + 8) + 'px'
      cell.addEventListener('mouseout', this.cellMouseOut)
    },
    cellMouseOut (e) {
      this.tipTimeout = setTimeout(() => {
        this.tip = ''
      }, 1000)
      e.target.removeEventListener(e.type, this.cellMouseOut)
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
    inputBoxMouseMove (e) {
      let cursor = 'text'
      if (!this.currentField.readonly
        && (this.currentField.options.length || this.currentField.type === 'date')
        && e.target.offsetWidth - e.offsetX < 15)
        cursor = 'pointer'
      e.target.style.cursor = cursor
    },
    inputBoxMouseDown (e) {
      if (e.target.offsetWidth - e.offsetX > 15) return
      if (this.currentField.options.length) {
        e.preventDefault()
        this.calAutocompleteList(true)
      }
      if (this.currentField.type === 'date') {
        e.preventDefault()
        this.showDatePickerDiv()
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
              if (typeof rec[name] !== 'undefined' && rec[name].startsWith(value) && list.indexOf(rec[name]) === -1)
                list.push(rec[name])
              if (list.length >= 10) break
            }
            list.sort()
          }
          this.autocompleteSelect = -1
          this.autocompleteInputs = list
          const rect = this.currentCell.getBoundingClientRect()
          this.$refs.autocomplete.style.top = rect.bottom + 'px'
          this.$refs.autocomplete.style.left = rect.left + 'px'
          this.$refs.autocomplete.style.minWidth = rect.width + 'px'
        }, force ? 0 : 700)
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
      this.showDatePicker = false
      if (this.currentRowPos !== -1) {
        this.recordBody.children[this.currentRowPos].children[0].classList.remove('focus')
        this.labelTr.children[this.currentColPos + 1].classList.remove('focus')
      }
    },
    hashCode (s) {
      return s.split('').reduce((a, b) => {
        return a = ((a << 5) - a) + b.charCodeAt(0) | 0
      }, 0)
    },
    lazy (p, delay, p1) {
      if (typeof p !== 'function') return this.lazyBuf(p, delay, p1)
      if (!delay) delay = 20
      const hash = this.hashCode(p.name + p.toString())
      if (this.lazyTimeout[hash]) clearTimeout(this.lazyTimeout[hash])
      this.lazyTimeout[hash] = setTimeout(() => {
        p()
        delete this.lazyTimeout[hash]
      }, delay)
    },
    lazyBuf (item, p, delay) {
      if (!delay) delay = 20
      const hash = this.hashCode(p.name + p.toString())
      if (this.lazyBuffer[hash])
        this.lazyBuffer[hash].push(item)
      else
        this.lazyBuffer[hash] = [item]

      if (this.lazyTimeout[hash]) clearTimeout(this.lazyTimeout[hash])
      this.lazyTimeout[hash] = setTimeout(() => {
        p(this.lazyBuffer[hash])
        delete this.lazyTimeout[hash]
        delete this.lazyBuffer[hash]
      }, delay)
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
*, *::before, *::after {
  box-sizing: border-box;
}
.input-square {
  position: absolute;
  padding: 0;
  z-index: 4;
  border: 2px solid rgb(108, 143, 108);
  /* transition: all 0.04s linear; */
}
.no-transition {
  transition: none !important;
}
.autocomplete-results {
  z-index: 15;
  position: fixed;
  padding: 3px;
  margin: -1px;
  background-color: lightyellow;
  border: 1px solid rgb(108, 143, 108);
  height: fit-content;
  font-size: 0.88rem;
  max-width: 300px;
}
.autocomplete-result {
  list-style: none;
  text-align: left;
  padding: 4px 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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
  font-family: inherit;
  color: inherit;
  text-shadow: inherit;
  font-size: 0.88rem;
  width: 100%;
  height: 100%;
  border: 0;
  resize: none;
  white-space: nowrap;
  overflow: hidden;
  background: white;
}
.component-content {
  display: flex;
  flex-flow: column;
  position: relative;
  max-width:fit-content;
  word-spacing: 0.02rem;
  line-height: 1.1;
  overflow: hidden;
  border: 1px solid lightgray;
}
.center-text {
  text-align: center;
}
.table-content {
  flex: 1 1 auto;
  font-size: 1rem;
  text-shadow: 0.3px 0.3px 1px #ccc;
  overflow: scroll;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  position: relative;
  width: 100%;
  scrollbar-width: none;
}
.table-content :focus {
  outline: none;
}
.table-content::-webkit-scrollbar {
  background: white;
  width: 0;
  height: 0;
}
.table-content.no-footer {
  border-bottom: 0;
}
.table-content.no-footer::-webkit-scrollbar {
  height: 0;
}
.table-content::-webkit-scrollbar-thumb {
  background: #eeee;
}
.table-content::-webkit-scrollbar-thumb:hover {
  background: #9999;
}
.systable {
  z-index: -1;
  width: fit-content;
  border: 0;
  border-collapse: separate;
  border-spacing: 0;
  margin-bottom: 0;
  /* margin-left: 40px; */
}
.systable.no-number {
  margin-left: 0 !important;
}
.systable tbody tr {
  background-color: white;
  text-align: left;
}
.systable tr.select td {
  background-color: darkgrey !important;
}
.systable th, .systable td {
  vertical-align: bottom;
  padding: 0.2rem 0.3rem;
  font-size: 0.88rem;
  height: 24px;
  border-top: 0;
  border-left: 0;
}
.systable th:not(:last-child) {
  border-right: 1px solid lightgray;
}
.systable tbody td {
  cursor: cell;
  white-space: nowrap;
  overflow-x: hidden;
  text-overflow: ellipsis;
  /* animation: fadein 0.2s; */
}
.systable tbody td.error {
  background-image: url('./assets/err.png');
  background-repeat: no-repeat;
  background-size: 8px 8px;
  background-position: right 0px top 0px;
}
.systable tbody tr:not(:last-child) td {
  border-bottom: 1px solid lightgray;
}
.systable td:not(:last-child) {
  border-right: 1px solid lightgray;
}
.systable thead th {
  background-color: #e9ecef !important;
  cursor: s-resize;
}
.systable thead th, .systable thead td {
  padding: 0.4rem 0.3rem;
  font-weight: 400;
  top: 0;
  height: 29px;
  position: sticky;
  z-index: 5;
  border-bottom: 1px solid lightgray;
}
.systable thead td.column-filter {
  text-align: left;
  background-color: #fffff2;
  white-space: nowrap;
  overflow-x: hidden;
  text-overflow: ellipsis;
}
.systable th.focus {
  border-bottom: 1px solid rgb(61, 85, 61) !important;
}
.systable td.first-col.focus {
  border-right: 1px solid rgb(61, 85, 61) !important;
}
.systable tbody td.select:not(.readonly) {
  background-image: url('./assets/down.png');
  background-repeat: no-repeat;
  background-size: 8px 8px;
  background-position: right 5px top 8px;
}
.systable tbody td.datepick:not(.readonly) {
  background-image: url('./assets/datepick.png');
  background-repeat: no-repeat;
  background-size: 8px 8px;
  background-position: right 5px top 8px;
}
.systable .first-col {
  background:#e9ecef;
  width: 40px;
  position: sticky;
  left: 0;
  top: auto;
  cursor: e-resize !important;
  text-overflow: inherit !important;
  text-align: center;
  overflow: hidden;
  z-index: 5;
}
.systable .sticky-column {
  position: sticky;
  z-index: 2;
  background-color: white;
}
.systable thead .sticky-column {
  z-index: 6;
}
.systable thead .tl-setting {
  /*
  display: flex;
  flex-direction: column-reverse;
  height: 100%;
  */
}
.systable thead td.first-col, .systable thead th.first-col {
  cursor: pointer !important;
  z-index: 10;
}
.footer {
  z-index: 5;
  padding: 0;
  font-size: 12px;
  color: dimgray;
  background-color: white;
  width: 100%;
  height: 25px;
  line-height: 2.3;
  border-top: 1px solid lightgray;
  user-select: none;
}
.footer .left-block {
  position: absolute;
  left: 0;
  height: 25px;
  width: 40px;
  background-color: #e9ecef;
  border-right: 1px solid lightgray;
}
.scroll-bar {
  z-index: -1;
  position: absolute;
  background-color: #f4f6f9;
  height: 25px;
  margin-left: 40px;
  width: 65%;
  cursor: pointer;
}
.scroll-bar:hover, .scroll-bar.focus {
  background-color: lightgray;
}
.footer a {
  cursor: pointer;
  color: #007bff;
}
.footer a.disabled {
  color: gray;
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
a:disabled {
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
.hide {
  display: none !important;
}
@keyframes fadein {
  from {opacity: 0}
  to {opacity: 1}
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
.fa-3x {
  font-size: 3em;
}
.tool-tip {
  display: inline-block;
  position: fixed;
  color: white;
  background-color: red;
  padding: 0.5rem;
  min-height: 1rem;
  max-width: 200px;
  word-wrap: break-word;
  border-radius: 4px;
}
.tool-tip:before {
  content: '';
  display: block;
  width: 0;
  height: 0;
  position: absolute;
  border-top: 8px solid transparent;
  border-bottom: 8px solid transparent;
  border-right: 8px solid red;
  left: -8px;
  top: 8px;
}
</style>

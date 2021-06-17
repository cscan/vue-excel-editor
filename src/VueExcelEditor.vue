<template>
  <div class="vue-excel-editor" :style="{display: 'inline-block', 'max-width': width}">
    <div class="component-content">
      <!-- No record -->
      <div v-if="localizedLabel.noRecordIndicator && pagingTable.length == 0" class="norecord" :style="{bottom: noFooter? '12px' : '37px'}">
        {{ localizedLabel.noRecordIndicator }}
      </div>

      <div ref="tableContent"
           class="table-content"
           :class="{'no-footer': noFooter}"
           @scroll="tableScroll"
           @mouseover="mouseOver"
           @mouseout="mouseOut">

        <!-- Main Table -->
        <table ref="systable"
              id="systable"
              style="table-layout: fixed; width: 0"
              class="systable"
              :class="{'no-number': noNumCol}"
              ondragenter="event.preventDefault(); event.dataTransfer.dropEffect = 'none'"
              ondragover="event.preventDefault(); event.dataTransfer.dropEffect = 'none'">
          <colgroup>
            <col style="width:40px">
            <col v-for="(item, p) in fields" v-show="!item.invisible" :key="p" :style="{width: item.width}">
            <col v-if="vScroller.buttonHeight < vScroller.height" style="width:12px">
          </colgroup>
          <thead class="center-text">
            <tr>
              <th class="center-text first-col tl-setting"
                  :class="{hide: noNumCol}"
                  style="top: 0"
                  @mousedown.left="selectAllClick"
                  @contextmenu.prevent="settingClick">
                <span style="width:100%">
                  <svg v-if="selectedCount>0" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-times-circle fa-w-16 fa-sm"><path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z"></path></svg>
                  <svg v-else aria-hidden="true" focusable="false" data-prefix="fas" data-icon="bars" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="svg-inline--fa fa-bars fa-w-14 fa-sm"><path fill="currentColor" d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"></path></svg>
                  <!--
                  <svg v-if="processing" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="spinner" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-spinner fa-w-16 fa-spin fa-sm"><path fill="currentColor" d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z"></path></svg>
                  <svg v-else aria-hidden="true" focusable="false" data-prefix="fas" data-icon="bars" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="svg-inline--fa fa-bars fa-w-14 fa-sm"><path fill="currentColor" d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"></path></svg>
                  -->
                </span>
              </th>
              <th v-for="(item, p) in fields"
                  v-show="!item.invisible"
                  :key="`th-${p}`"
                  :colspan="p === fields.length - 1 && vScroller.buttonHeight < vScroller.height ? 2: 1"
                  :class="{'sort-asc-sign': sortPos==p && sortDir==1,
                          'sort-des-sign': sortPos==p && sortDir==-1,
                          'sticky-column': item.sticky}"
                  :style="{left: item.left}"
                  @mousedown="headerClick($event, p)"
                  @contextmenu.prevent="panelFilterClick(item)">
                <div :class="{'filter-sign': columnFilter[p]}">
                  <span :class="{'table-col-header': !noHeaderEdit}" v-html="headerLabel(item.label, item)"></span>
                </div>
                <div class="col-sep"
                    @mousedown="colSepMouseDown"
                    @mouseover="colSepMouseOver"
                    @mouseout="colSepMouseOut">
                  <div class="add-col-btn"> + </div>
                </div>
              </th>
            </tr>
            <tr :class="{hide: !filterRow}">
              <td class="center-text first-col tl-filter"
                  :class="{hide: noNumCol}"
                  style="vertical-align: middle; padding: 0"
                  :style="{top: calCellTop2 + 'px'}"
                  @click="columnFilter = {}">
                <span v-if="Object.keys(columnFilter).length > 0">
                  <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="eraser" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-eraser fa-w-16 fa-sm"><path fill="currentColor" d="M497.941 273.941c18.745-18.745 18.745-49.137 0-67.882l-160-160c-18.745-18.745-49.136-18.746-67.883 0l-256 256c-18.745 18.745-18.745 49.137 0 67.882l96 96A48.004 48.004 0 0 0 144 480h356c6.627 0 12-5.373 12-12v-40c0-6.627-5.373-12-12-12H355.883l142.058-142.059zm-302.627-62.627l137.373 137.373L265.373 416H150.628l-80-80 124.686-124.686z"></path></svg>                  
                </span>
                <!--
                <svg v-if="selectedCount==table.length" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-times-circle fa-w-16 fa-sm"><path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z"></path></svg>
                <svg v-else aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-check-circle fa-w-16 fa-sm"><path fill="currentColor" d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"></path></svg>
                -->
              </td>
              <vue-excel-filter v-for="(item, p) in fields"
                                v-show="!item.invisible"
                                :ref="`filter-${item.name}`"
                                :colspan="p === fields.length - 1? 2: 1"
                                :key="`th2-${p}`"
                                v-model="columnFilter[p]"
                                :class="{'sticky-column': item.sticky}"
                                :style="{left: item.left}"
                                class="column-filter" />
            </tr>
          </thead>
          <tbody @mousedown="mouseDown">
            <tr v-if="localizedLabel.noRecordIndicator && pagingTable.length == 0">
              <td colspan="100%" style="height:40px; vertical-align: middle; text-align: center"></td>
            </tr>
            <tr v-else
                v-for="(record, rowPos) in pagingTable"
                :key="rowPos"
                :class="{select: typeof selected[pageTop + rowPos] !== 'undefined'}"
                :style="rowStyle(record)">
              <td class="center-text first-col"
                  :id="`rid-${record.$id}`"
                  :class="{
                    hide: noNumCol,
                    error: rowerr[`rid-${record.$id}`]
                  }"
                  :pos="rowPos"
                  @mouseover="numcolMouseOver"
                  @click="rowLabelClick">
                <span v-html="recordLabel(pageTop + rowPos + 1, record)"></span>
              </td>
              <template v-for="(item, p) in fields">
                <td v-show="!item.invisible"
                    :id="`id-${record.$id}-${item.name}`"
                    :cell-RC="`${rowPos}-${item.name}`"
                    :class="{
                      readonly: item.readonly,
                      error: errmsg[`id-${record.$id}-${item.name}`],
                      link: item.link,
                      select: item.options,
                      datepick: item.type == 'date',
                      'sticky-column': item.sticky
                    }"
                    :style="Object.assign(cellStyle(record, item), renderColumnCellStyle(item))"
                    :key="p"
                    @mouseover="cellMouseOver"
                    @mousemove="cellMouseMove">{{ item.toText(record[item.name]) }}</td>
              </template>
              <td v-if="vScroller.buttonHeight < vScroller.height" class="last-col"></td>
            </tr>
          </tbody>
          <tfoot>
            <tr v-show="pagingTable.length && summaryRow">
              <td class="row-summary first-col">&nbsp;</td>
              <template v-for="(field, p) in fields">
                <td v-show="!field.invisible"
                    class="row-summary"
                    :colspan="p === fields.length - 1 && vScroller.buttonHeight < vScroller.height ? 2: 1"
                    :class="{
                      'sticky-column': field.sticky,
                      'summary-column1': p+1 < fields.length && fields[p+1].summary,
                      'summary-column2': field.summary
                    }"
                    :style="renderColumnCellStyle(field)"
                    :key="`f${p}`">{{ summary[field.name] }}</td>
              </template>
            </tr>
          </tfoot>
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
                      :spellcheck="spellcheck"></textarea>
          </div>
        </div>

        <!-- Date Picker -->
        <div ref="dpContainer" v-show="showDatePicker" style="z-index:20; position:fixed">
          <date-picker ref="datepicker" inline v-model="inputDateTime" @input="datepickerClick" valueType="format"></date-picker>
        </div>

        <!-- Waiting scene -->
        <div v-show="processing" ref="frontdrop" class="front-drop">
          <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="spinner" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-spinner fa-w-16 fa-spin fa-3x"><path fill="currentColor" d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z"></path></svg>
        </div>
      </div>

      <!-- Vertical Scroll Bar -->
      <div v-if="vScroller.buttonHeight < vScroller.height"
           ref="vScroll"
           class="v-scroll"
           :style="{top: `${vScroller.top}px`, height: `${vScroller.height}px`}"
           @mousedown="vsMouseDown">
        <div ref="vScrollButton"
             class="v-scroll-button"
             :style="{marginTop: `${vScroller.buttonTop}px`, height: `${vScroller.buttonHeight}px`}"
             @mousedown="vsbMouseDown">
          <div v-show="vScroller.runner" class="runner" v-html="vScroller.runner" />
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
      <div ref="footer" class="footer center-text" :class="{hide: noFooter}" style="position:relative" @mousedown="ftMouseDown">
        <div ref="hScroll" class="h-scroll" @mousedown="sbMouseDown" />
        <span class="left-block"></span>
        <span v-show="!noPaging" style="position: absolute; left: 46px">
          <span v-html="localizedLabel.footerLeft(pageTop + 1, pageBottom, table.length)"></span>
        </span>
        <span v-show="!noPaging && pageBottom - pageTop < table.length">
          <template v-if="processing">
            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="spinner" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-spinner fa-w-16 fa-spin fa-sm"><path fill="currentColor" d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z"></path></svg>
            &nbsp;
            <span v-html="localizedLabel.processing" />
          </template>
          <template v-else>
            <a :class="{disabled: pageTop <= 0}" @mousedown="firstPage">
              <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="step-backward" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="svg-inline--fa fa-step-backward fa-w-14 fa-sm"><path fill="currentColor" d="M64 468V44c0-6.6 5.4-12 12-12h48c6.6 0 12 5.4 12 12v176.4l195.5-181C352.1 22.3 384 36.6 384 64v384c0 27.4-31.9 41.7-52.5 24.6L136 292.7V468c0 6.6-5.4 12-12 12H76c-6.6 0-12-5.4-12-12z"></path></svg>
              &nbsp;
              <span v-html="localizedLabel.first" />
            </a>
            &nbsp;|&nbsp;
            <a :class="{disabled: pageTop <= 0}" @mousedown="prevPage">
              <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="backward" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-backward fa-w-16 fa-sm"><path fill="currentColor" d="M11.5 280.6l192 160c20.6 17.2 52.5 2.8 52.5-24.6V96c0-27.4-31.9-41.8-52.5-24.6l-192 160c-15.3 12.8-15.3 36.4 0 49.2zm256 0l192 160c20.6 17.2 52.5 2.8 52.5-24.6V96c0-27.4-31.9-41.8-52.5-24.6l-192 160c-15.3 12.8-15.3 36.4 0 49.2z"></path></svg>
              &nbsp;
              <span v-html="localizedLabel.previous" />
            </a>
            &nbsp;|&nbsp;
            <a :class="{disabled: pageTop + pageSize >= table.length}" @mousedown="nextPage">
              <span v-html="localizedLabel.next" />
              &nbsp;
              <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="forward" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-forward fa-w-16 fa-sm"><path fill="currentColor" d="M500.5 231.4l-192-160C287.9 54.3 256 68.6 256 96v320c0 27.4 31.9 41.8 52.5 24.6l192-160c15.3-12.8 15.3-36.4 0-49.2zm-256 0l-192-160C31.9 54.3 0 68.6 0 96v320c0 27.4 31.9 41.8 52.5 24.6l192-160c15.3-12.8 15.3-36.4 0-49.2z"></path></svg>
            </a>
            &nbsp;|&nbsp;
            <a :class="{disabled: pageTop + pageSize >= table.length}" @mousedown="lastPage">
              <span v-html="localizedLabel.last" />
              &nbsp;
              <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="step-forward" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="svg-inline--fa fa-step-forward fa-w-14 fa-sm"><path fill="currentColor" d="M384 44v424c0 6.6-5.4 12-12 12h-48c-6.6 0-12-5.4-12-12V291.6l-195.5 181C95.9 489.7 64 475.4 64 448V64c0-27.4 31.9-41.7 52.5-24.6L312 219.3V44c0-6.6 5.4-12 12-12h48c6.6 0 12 5.4 12 12z"></path></svg>
            </a>
          </template>
        </span>
        <span style="position: absolute; right: 6px">
          <a :class="{disabled: !showSelectedOnly && selectedCount <= 1}" @mousedown="toggleSelectView">
            <span v-html="localizedLabel.footerRight.selected" />
            <span :style="{color: selectedCount>0 ? 'red': 'inherit'}">{{ selectedCount }}</span>
          </a>
          &nbsp;|&nbsp;
          <a :class="{disabled: columnFilterString === '{}'}" @mousedown="toggleFilterView">
            <span v-html="localizedLabel.footerRight.filtered" />
            <span :style="{color: table.length !== filteredValue.length ? 'red': 'inherit'}">{{ table.length }}</span>
          </a>
          &nbsp;|&nbsp;
          <a :class="{disabled: true}">
            <span v-html="localizedLabel.footerRight.loaded" />
            <span>{{ filteredValue.length }}</span>
          </a>
        </span>
      </div>

      <input type="file"
             ref="importFile"
             accept=".xlsx, .xls, xlsm, .csv"
             style="position: absolute; top: 0; left: 0; width:0; height: 0; opacity:0; z-index:-1"
             @keyup="componentTabInto"
             @change="doImport" />

      <panel-filter ref="panelFilter" :n-filter-count="nFilterCount" :localized-label="localizedLabel" />
      <panel-setting ref="panelSetting" v-model="fields" :localized-label="localizedLabel" />
      <panel-find ref="panelFind" :localized-label="localizedLabel" />
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import VueExcelFilter from './VueExcelFilter.vue'
import PanelFilter from './PanelFilter.vue'
import PanelSetting from './PanelSetting.vue'
import PanelFind from './PanelFind.vue'
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
      disablePanelSetting: {
      type: Boolean,
      default() {
        return false;
      }
    },
    disablePanelFilter: {
      type: Boolean,
      default() {
        return false;
      }
    },
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
    freeSelect: {type: Boolean, default: false},
    noFooter: {type: Boolean, default: false},
    noPaging: {type: Boolean, default: false},
    noNumCol: {type: Boolean, default: false},
    noMouseScroll: {type: Boolean, default: false},
    page: {type: Number, default: 0},               // prefer page size, auto-cal if not provided
    enterToSouth: {type: Boolean, default: false},  // default enter to south
    nFilterCount: {type: Number, default: 1000},    // show top n values in filter dialog
    height: {type: String, default: ''},
    width: {type: String, default: '100%'},
    autocomplete: {type: Boolean, default: false},  // Default autocomplete of all columns
    autocompleteCount: {type: Number, default: 50},
    readonly: {type: Boolean, default: false},
    readonlyStyle: {type: Object, default () {return {}}},
    remember: {type: Boolean, default: false},
    register: {type: Function, default: null},
    allowAddCol: {type: Boolean, default: false},
    noHeaderEdit: {type: Boolean, default: false},
    addColumn: {type: Function, default: null},
    spellcheck: {type: Boolean, default: false},
    newIfBottom: {type: Boolean, default: false},
    validate: {type: Function, default: null},
    localizedLabel: {
      type: Object,
      default () {
        return {
          footerLeft: (top, bottom, total) => `Record ${top} to ${bottom} of ${total}`,
          first: 'First',
          previous: 'Previous',
          next: 'Next',
          last: 'Last',
          footerRight: {
            selected: 'Selected:',
            filtered: 'Filtered:',
            loaded: 'Loaded:'
          },
          processing: 'Processing',
          tableSetting: 'Table Setting',
          exportExcel: 'Export Excel',
          importExcel: 'Import Excel',
          back: 'Back',
          reset: 'Default',
          sortingAndFiltering: 'Sorting And Filtering',
          sortAscending: 'Sort Ascending',
          sortDescending: 'Sort Descending',
          near: '≒ Near',
          exactMatch: '= Exact Match',
          notMatch: '≠ Not Match',
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
          rowHasValidationError: (row, name, err) => `Row ${row} has validation error for column ${name}: ${err}`,
          noMatchedColumnName: 'No matched column name',
          invalidInputValue: 'Invalid input value',
          missingKeyColumn: 'Missing key column',
          noRecordIndicator: 'No record'
        }
      }
    },
    recordFilter: {
      type: Function,
      default () {
        return true
      }
    }
  },
  data () {
    const pageSize = this.noPaging ? 999999 : 20
    const dataset = {
      version: '1.3',
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

      currentRecord: null,          // focusing row content
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
      rowerr: {},
      tip: '',

      colHash: '',
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
      vScroller: {},
      leftMost: 0,

      showDatePicker: false,
      inputDateTime: '',

      table: [],
      filteredValue: [],
      lastFilterTime: '',
      summaryRow: false,
      summary: {},
      showFilteredOnly: true,
      showSelectedOnly: false
    }
    return dataset
  },
  computed: {
    token () {
      const id = Array.from(document.querySelectorAll('.vue-excel-editor')).indexOf(this.$el)
      return `vue-excel-editor-${id}`
    },
    columnFilterString () {
      Object.keys(this.columnFilter).forEach((key) => {
        if (this.columnFilter[key].trim() === '') delete this.columnFilter[key]
      })
      return JSON.stringify(this.columnFilter)
    },
    pagingTable () {
      return this.table.slice(this.pageTop, this.pageTop + this.pageSize)
    },
    pageBottom () {
      if (this.filteredValue.length === 0) return 0
      else return this.pageTop + this.pageSize > this.table.length ? this.table.length : this.pageTop + this.pageSize
    },
    setting: {
      get () {
        return null
      },
      set (setter) {
        if (setter.fields) {
          // ignore if fields counts are different
          if (setter.fields.length !== this.fields.length) return
          let valid = true
          const newFields = setter.fields.map(local => {
            const current = this.fields.find(f => f.name === local.name)
            if (!current) valid = false
            else {
              if (typeof local.invisible !== 'undefined') current.invisible = local.invisible
              if (typeof local.width !== 'undefined') current.width = local.width
              if (typeof local.label !== 'undefined') current.label = local.label
            }
            return current
          })
          if (valid) {
            this.fields = newFields
            this.$forceUpdate()
          }
        }
      }
    }
  },
  watch: {
    value () {
      this.lazy(() => {
        this.refresh()
        if (this.pageTop > this.table.length)
          this.lastPage()
      })
    },
    columnFilterString () {
      this.lastFilterTime = String(new Date().getTime() % 1e8)
      this.processing = true
      setTimeout(() => {
        this.pageTop = 0
        this.refresh()
        this.processing = false
      }, 0)
    },
    fields: {
      handler () {
        this.lazy(() => {
          const setting = this.getSetting()
          if (this.remember) localStorage[window.location.pathname + '.' + this.token] = JSON.stringify(setting)
          this.$emit('setting', setting)
        })
      },
      deep: true
    },
    processing (newVal) {
      if (newVal) {
        const rect = this.$el.children[0].getBoundingClientRect()
        this.frontdrop.style.top = rect.top + 'px'
        this.frontdrop.style.left = rect.left + 'px'
        this.frontdrop.style.height = rect.height + 'px'
        this.frontdrop.style.width = rect.width + 'px'
      }
    },
    pageTop (newVal) {
      this.$emit('page-changed', newVal, newVal + this.pageSize - 1)
    },
    pageSize (newVal) {
      this.$emit('page-changed', this.pageTop, this.pageTop + newVal - 1)
    }
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.winResize)
    window.removeEventListener('paste', this.winPaste)
    window.removeEventListener('keydown', this.winKeydown)
    window.removeEventListener('keyup', this.winKeyup)
    window.removeEventListener('scroll', this.winScroll)
    window.removeEventListener('wheel', this.mousewheel)
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
    this.lazy(() => {
      this.labelTr.children[0].style.height = this.labelTr.offsetHeight + 'px'
      this.calCellTop2 = this.labelTr.offsetHeight
      this.refreshPageSize()
      this.tableContent.scrollTo(0, this.tableContent.scrollTop)
      this.calStickyLeft()
    }, 200)

    window.addEventListener('resize', this.winResize)
    window.addEventListener('paste', this.winPaste)
    window.addEventListener('keydown', this.winKeydown)
    window.addEventListener('keyup', this.winKeyup)
    window.addEventListener('scroll', this.winScroll)
    window.addEventListener('wheel', this.mousewheel, {passive: false})

    if (this.remember) {
      const saved = localStorage[window.location.pathname + '.' + this.token]
      if (saved) {
        const data = JSON.parse(saved)
        if (data.colHash === this.colHash)
          this.setting = data
      }
    }
  },
  methods: {
    componentTabInto (e) {
      if (e.keyCode === 9) {
        if (!this.moveInputSquare(this.currentRowPos, this.currentColPos))
          this.moveInputSquare(0, 0)
      }
    },
    reset () {
      this.errmsg = {}
      this.redo = []
      this.showFilteredOnly = true
      this.showSelectedOnly = false
      this.columnFilter = {}
      this.sortPos = 0
      this.sortDir = 0
      this.inputFind = ''
      this.pageTop = 0
      this.selected = {}
      this.selectedCount = 0
      this.prevSelect = -1
      this.processing = false
      this.rowIndex = {}
      this.refresh()
    },
    toggleSelectView (e) {
      if (e) e.stopPropagation()
      this.showSelectedOnly = !this.showSelectedOnly
      return this.refresh()
    },
    toggleFilterView (e) {
      if (e) e.stopPropagation()
      this.showFilteredOnly = !this.showFilteredOnly
      return this.refresh()
    },
    resetColumn () {
      this.fields = []
      this.$slots.default.forEach(col => col.componentInstance? col.componentInstance.init() : 0)
      this.tableContent.scrollTo(0, this.tableContent.scrollTop)
      this.calStickyLeft()
    },
    registerColumn (field) {
      let pos = this.fields.findIndex(item => item.pos > field.pos)
      if (pos === -1) pos = this.fields.length
      this.fields.splice(pos, 0, field)
      if (this.register) this.register(field, pos)
      if (field.register) field.register(field, pos)
      if (field.summary) this.summaryRow = true
      this.colHash = this.hashCode(this.version + JSON.stringify(this.fields))
    },
    insertColumn (pos) {
      const colname = 'COL-' + Math.random().toString().slice(2,6)
      let colDef = {
        name: colname,
        label: colname,
        type: 'string',
        width: '100px',

        validate: null,
        change: null,
        link: null,
        sort: null,

        keyField: false,
        sticky: false,
        // tabStop: true,
        allowKeys: null,
        mandatory: false,
        lengthLimit: 0,

        autocomplete: this.autocomplete,
        textTransform: null,
        initStyle: 'left',
        invisible: false,
        readonly: this.readonly,
        pos: 0,
        options: null,
        summary: null,
        toValue: t => t,
        toText: t => t,
        register: null
      }
      if (this.addColumn) colDef = this.addColumn(colDef)
      this.newColumn(colDef, pos)      
    },
    newColumn (field, pos) {
      this.fields.splice(pos, 0, field)
      if (this.register) this.register(field, pos)
      if (field.register) field.register(field, pos)
      if (field.summary) this.summaryRow = true
      this.colHash = this.hashCode(this.version + JSON.stringify(this.fields))
    },
    autoRegisterAllColumns (rows) {
      // If no field is defined, this function will help to create all fields based on provided row sample argument
      const widths = rows.slice(0, 25)
        .reduce((t, v) => Object.keys(v).map((s, i) => !t || v[s].length > t[i]? v[s].length: t[i]), 0)
        .map(v => Math.min(Math.max(v * 8.2, 55), 250))

      Object.keys(rows[0]).forEach((col, i) => {
        if (col === '$id') return
        this.registerColumn({
          name: col,
          label: col,
          type: widths[i]? 'string': 'number',
          width: (widths[i]? widths[i]: 75) + 'px',
          validate: null,
          change: null,
          link: null,
          keyField: false,
          sticky: false,
          tabStop: true,
          allowKeys: null,
          mandatory: false,
          lengthLimit: 0,
          autocomplete: this.autocomplete,
          initStyle: {textAlign: widths[i]? 'left': 'right'},
          invisible: false,
          readonly: this.readonly,
          pos: 0,
          options: null,
          summary: null,
          sort: null,
          toValue: t => t,
          toText: t => t,
          register: null
        })
      })        
    },
    refresh () {
      // this.pageTop = 0
      this.prevSelect = -1
      if (this.fields.length === 0 && this.value.length && Object.keys(this.value[0])) {
        this.autoRegisterAllColumns(this.value)
      }
      this.calTable()
      this.refreshPageSize()
    },
    calTable () {
      // add unique key to each row if no key is provided
      let seed = String(new Date().getTime() % 1e8)
      this.value.forEach((rec,i) => {
        if (!rec.$id) rec.$id = seed + '-' + ('000000' + i).slice(-7)
      })

      if (this.showFilteredOnly === false) {
        this.table = this.value
      }
      else {
        const filterColumnList = Object.keys(this.columnFilter)
        const filter = {}
        filterColumnList.forEach((k) => {
          switch (true) {
            case this.columnFilter[k].startsWith('<='):
              filter[k] = {type: 1, value: this.columnFilter[k].slice(2).trim().toUpperCase()}
              if (this.fields[k].type === 'number') filter[k].value = Number(filter[k].value)
              break
            case this.columnFilter[k].startsWith('<>'):
              filter[k] = {type: 9, value: this.columnFilter[k].slice(2).trim().toUpperCase()}
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
            case this.columnFilter[k].startsWith('~'):
              filter[k] = {type: 8, value: this.columnFilter[k].slice(1).trim()}
              break
            case this.columnFilter[k].endsWith('*') && !this.columnFilter[k].slice(0, -1).includes('*'):
              filter[k] = {type: 7, value: this.columnFilter[k].slice(0, -1).trim().toUpperCase()}
              break
            case this.columnFilter[k].includes('*') || this.columnFilter[k].includes('?'):
              filter[k] = {type: 8, value: '^' + this.columnFilter[k].replace(/\*/g, '.*').replace(/\?/g, '.').trim() + '$'}
              break
            default:
              filter[k] = {type: 5, value: this.columnFilter[k].trim().toUpperCase()}
              break
          }
        })
        this.filteredValue = this.value.filter(record => this.recordFilter(record))
        if (filterColumnList.length === 0)
          this.table = this.filteredValue
        else {
          this.table = this.filteredValue.filter((record) => {

            // Record is created after the filter time
            if (record.$id > this.lastFilterTime) return true

            // Assume new record contains § in any of the key fields
            /*
            const isNew = this.fields.filter((field) => {
              return field.keyField && record[field.name] && record[field.name].startsWith('§')
            }).length > 0
            if (isNew) return true // Always show new record in filter mode
            */

            const content = {}
            filterColumnList.forEach((k) => {
              const val = record[this.fields[k].name]
              if (this.fields[k].type === 'number' && filter[k].type <= 4)
                content[k] = val
              else
                content[k] = typeof val === 'undefined' || val === null ? '' : String(val).toUpperCase()
            })

            for (let i = 0; i < filterColumnList.length; i++) {
              const k = filterColumnList[i]
              switch (filter[k].type) {
                case 0:
                  if (`${content[k]}` !== `${filter[k].value}`) return false
                  break
                case 1:
                  if (filter[k].value < content[k]) return false
                  break
                case 2:
                  if (filter[k].value <= content[k]) return false
                  break
                case 3:
                  if (filter[k].value > content[k]) return false
                  break
                case 4:
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
                case 9:
                  if (`${content[k]}` === `${filter[k].value}`) return false
                  break
              }
            }
            return true
          })
        }
      }

      this.reviseSelectedAfterTableChange()
      if (this.showSelectedOnly) {
        this.table = this.table.filter((rec, i) => this.selected[i])
        this.reviseSelectedAfterTableChange()
      }
      this.calSummary()
    },
    calStickyLeft () {
      let left = 0, n = 0
      this.leftMost = -1
      // this.tableContent.scrollTo(0, this.tableContent.scrollTop)
      Array.from(this.labelTr.children).forEach(th => {
        left += th.offsetWidth
        const field = this.fields[n++]
        if (field) {
          if (field.sticky) {
            field.left = left + 'px'
            this.leftMost = -1 // Reset the leftMost, so it will equal to the next non-sticky col
          }
          else if (this.leftMost === -1) this.leftMost = left
        }
      })
      this.$forceUpdate()
    },
    renderColumnCellStyle (field) {
      let result = field.initStyle
      if (field.readonly) result = Object.assign(result, this.readonlyStyle)
      if (field.left) result = Object.assign(result, {left: field.left})
      return result
    },
    localeDate (d) {
      if (typeof d === 'undefined') d = new Date()
      const pad = n => n < 10 ? '0'+n : n;    
      return d.getFullYear() + '-'
            + pad(d.getMonth() + 1) + '-'
            + pad(d.getDate()) + ' '
            + pad(d.getHours()) + ':'
            + pad(d.getMinutes()) + ':'
            + pad(d.getSeconds())
     },
    calSummary (name) {
      this.fields.forEach(field => {
        if (!field.summary) return
        const i = field.name
        if (name && name !== i) return
        let result = ''
        const currentTick = new Date().getTime()
        const currentDateTimeSec = this.localeDate()
        const currentDateTime = currentDateTimeSec.slice(0, 19)
        const currentDate = currentDateTimeSec.slice(0, 10)
        switch(field.summary) {
          case 'sum':
            result = this.table.reduce((a, b) => (a + Number(b[i] ? b[i] : 0)), 0)
            result = Number(Math.round(result + 'e+5') + 'e-5')  // solve the infinite .9 issue of javascript
            break
          case 'avg':
            result = this.table.reduce((a, b) => (a + Number(b[i] ? b[i] : 0)), 0) / this.table.length
            result = Number(Math.round(result + 'e+5') + 'e-5')  // solve the infinite .9 issue of javascript
            break
          case 'max':
            result = this.table.reduce((a, b) => (a > b[i] ? a : b[i]), Number.MIN_VALUE)
            break
          case 'min':
            result = this.table.reduce((a, b) => (a < b[i] ? a : b[i]), Number.MAX_VALUE)
            break
          case 'count':
            switch(field.type) {
              case 'checkYN':
                result = this.table.reduce((a, b) => (a + (b[i] === 'Y' ? 1 : 0)), 0)
                break
              case 'check10':
                result = this.table.reduce((a, b) => (a + (b[i] === '1' ? 1 : 0)), 0)
                break
              case 'checkTF':
                result = this.table.reduce((a, b) => (a + (b[i] === 'T' ? 1 : 0)), 0)
                break
              case 'date':
                result = this.table.reduce((a, b) => (a + (b[i] >= currentDate ? 1 : 0)), 0)
                this.summary[i] = result
                return
              case 'datetime':
                result = this.table.reduce((a, b) => (a + (b[i] >= currentDateTime ? 1 : 0)), 0)
                this.summary[i] = result
                return
              case 'datetimesec':
                result = this.table.reduce((a, b) => (a + (b[i] >= currentDateTimeSec ? 1 : 0)), 0)
                this.summary[i] = result
                return
              case 'datetick':
              case 'datetimetick':
              case 'datetimesectick':
                result = this.table.reduce((a, b) => (a + (b[i] >= currentTick ? 1 : 0)), 0)
                this.summary[i] = result
                return
              default:
                result = this.table.reduce((a, b) => (a + (b[i]? 1 : 0)), 0)
                break
            }
            break
        }
        if (field.type === 'number' && isNaN(result)) return
        this.summary[i] = field.toText(result)
      })
    },
    getKeys (rec) {
      if (!rec) rec = this.currentRecord
      const key = this.fields.filter(field => field.keyField).map(field => rec[field.name])
      if (key.length && key.join() !== '') return key
      return [rec.$id]
    },
    getFieldByName (name) {
      return this.fields.find(f => f.name === name)
    },
    getFieldByLabel (label) {
      return this.fields.find(f => f.label === label)
    },

    /* *** Customization **************************************************************************************
     */
    setFilter(name, filterText) {
      const ref = this.$refs[`filter-${name}`][0]
      ref.$el.textContent = filterText
      ref.$emit('input', filterText)
    },
    
    clearFilter(name) {
      if (!name) this.columnFilter = {}
      else this.setFilter(name, '')
    },

    columnSuppress () {
      if (this.table.length === 0) return
      const cols = {}
      this.table.forEach((row) => {
        Object.keys(row).forEach((field) => {
          if (row[field]) cols[field] = 1
        })
      })
      const showCols = Object.keys(cols)
      this.fields.forEach((field) => {
        if (!showCols.includes(field.name))
          field.invisible = true
      })
      // this.refresh()
    },

    /* Still evaluating */
    columnAutoWidth (name) {
      if (this.table.length === 0) return
      let doFields = this.fields
      if (name) doFields = [this.fields.find(f => f.name === name)]

      const cols = {}
      this.table.forEach((row) => {
        doFields.forEach((field) => {
          if (row[field.name] && (!cols[field.name] || cols[field.name] < row[field.name].length))
            cols[field.name] = row[field.name].length
        })
      })
      doFields.forEach((field) => {
        let width = cols[field.name] * 12
        if (width > 450) width = 450
        field.width = width + 'px'
      })
      // this.refresh()
    },

    /* *** Date Picker *********************************************************************************
     */
    showDatePickerDiv () {
      if (!this.$refs.dpContainer) return
      const cellRect = this.currentCell.getBoundingClientRect()
      this.$refs.dpContainer.style.left = (cellRect.left) + 'px'
      this.$refs.dpContainer.style.top = (cellRect.bottom) + 'px'
      this.inputDateTime = this.currentCell.textContent
      this.showDatePicker = true
      this.lazy(() => {
        if (!this.$refs.dpContainer) return
        const r = this.$refs.dpContainer.getBoundingClientRect()
        if (r.bottom > window.innerHeight)
          this.$refs.dpContainer.style.top = (cellRect.top - r.height) + 'px'
        if (r.right > window.innerWidth)
          this.$refs.dpContainer.style.left = (window.innerWidth - r.width) + 'px'
      })
    },
    datepickerClick () {
      this.inputBox.value = this.inputDateTime
      this.inputBoxShow = 0
      this.inputCellWrite(this.inputDateTime)
      this.showDatePicker = false
      this.focused = true
    },

    /* *** Vertical Scrollbar *********************************************************************************
     */
    calVScroll () {
      let d = this.labelTr.getBoundingClientRect().height
      if (this.filterRow) d += 29
      this.vScroller.top = d
      if (!this.noFooter) d += 25
      if (this.summaryRow) d += 27
      const fullHeight = this.$el.getBoundingClientRect().height
      this.vScroller.height = fullHeight - d
      const ratio =  this.vScroller.height / (this.table.length * 24)
      this.vScroller.buttonHeight = Math.max(24, this.vScroller.height * ratio)
      const prop = (this.tableContent.scrollTop + this.pageTop * 24) / (this.table.length * 24 - this.vScroller.height)
      this.vScroller.buttonTop = (this.vScroller.height - this.vScroller.buttonHeight) * prop
      this.$forceUpdate()
    },
    vsMouseDown (e) {
      e.stopPropagation()
      const pos = e.offsetY - this.vScroller.buttonHeight / 2
      let ratio = Math.max(0, pos)
      ratio = Math.min(ratio, this.vScroller.height - this.vScroller.buttonHeight)
      ratio = ratio / (this.vScroller.height - this.vScroller.buttonHeight)
      if (this.noPaging)
        this.tableContent.scrollTo(this.tableContent.scrollLeft, this.table.length * 24 * ratio)
      else {
        this.vScroller.buttonTop = ratio * (this.vScroller.height - this.vScroller.buttonHeight)
        this.$refs.vScrollButton.style.marginTop = this.vScroller.buttonTop + 'px'
        this.pageTop = Math.round((this.table.length - this.pageSize) * ratio)
      }
    },
    vsbMouseDown (e) {
      e.stopPropagation()
      if (!this.vScroller.mouseY) {
        this.vScroller.saveButtonTop = this.vScroller.buttonTop
        this.vScroller.mouseY = e.clientY
        window.addEventListener('mousemove', this.vsbMouseMove)
        window.addEventListener('mouseup', this.vsbMouseUp)
        this.$refs.vScrollButton.classList.add('focus')
      }
    },
    vsbMouseUp () {
      window.removeEventListener('mousemove', this.vsbMouseMove)
      window.removeEventListener('mouseup', this.vsbMouseUp)
      this.lazy(() => {
        if (!this.$refs.vScrollButton) return
        this.$refs.vScrollButton.classList.remove('focus')
      })
      this.vScroller.mouseY = 0
      if (!this.noPaging) {
        const ratio = this.vScroller.buttonTop / (this.vScroller.height - this.vScroller.buttonHeight)
        this.pageTop = Math.round((this.table.length - this.pageSize) * ratio)
      }
      this.vScroller.runner = ''
      this.$forceUpdate()
    },
    vsbMouseMove (e) {
      if (e.buttons === 0)
        this.vsbMouseUp()
      else {
        const diff = e.clientY - this.vScroller.mouseY
        if (this.noPaging) {
          const ratio = (this.vScroller.saveButtonTop + diff) / (this.vScroller.height - this.vScroller.buttonHeight)
          this.tableContent.scrollTo(this.tableContent.scrollLeft, this.table.length * 24 * ratio)
        }
        else {
          this.vScroller.buttonTop = Math.max(0, Math.min(this.vScroller.height - this.vScroller.buttonHeight, this.vScroller.saveButtonTop + diff))
          this.$refs.vScrollButton.style.marginTop = this.vScroller.buttonTop + 'px'

          const ratio = this.vScroller.buttonTop / (this.vScroller.height - this.vScroller.buttonHeight)
          const recPos = Math.round((this.table.length - this.pageSize) * ratio) + 1
          const rec = this.table[recPos]
          this.vScroller.runner = recPos + '<br>' + this.fields
            .filter((field, i) => field.keyField || field.sticky || this.sortPos === i)
            .map(field => field.label + ': ' + rec[field.name])
            .join('<br>')
          this.$forceUpdate()
        }
      }
    },

    /* *** Horizontal Scrollbar *********************************************************************************
     */
    ftMouseDown (e) {
      const footerRect = this.footer.getBoundingClientRect()
      const ratio = (e.x - footerRect.left - 40) / (footerRect.width - 40)
      const fullWidth = this.systable.getBoundingClientRect().width
      const viewWidth = this.tableContent.getBoundingClientRect().width
      this.tableContent.scrollTo(fullWidth * ratio - viewWidth / 2, this.tableContent.scrollTop)
    },
    sbMouseDown (e) {
      e.stopPropagation()
      if (!this.hScroller.mouseX) {
        const sleft = this.$refs.hScroll.getBoundingClientRect().left
        const fleft = this.footer.getBoundingClientRect().left + 40
        this.hScroller.left = sleft - fleft
        this.hScroller.mouseX = e.clientX
        window.addEventListener('mousemove', this.sbMouseMove)
        window.addEventListener('mouseup', this.sbMouseUp)
        this.$refs.hScroll.classList.add('focus')
      }
    },
    sbMouseUp () {
        window.removeEventListener('mousemove', this.sbMouseMove)
        window.removeEventListener('mouseup', this.sbMouseUp)
        this.lazy(() => {
          if (!this.$refs.hScroll) return
          this.$refs.hScroll.classList.remove('focus')
        })
        this.hScroller.mouseX = 0
        this.$forceUpdate()
    },
    sbMouseMove (e) {
      if (e.buttons === 0)
        this.sbMouseUp()
      else {
        const diff = e.clientX - this.hScroller.mouseX
        const ratio = (this.hScroller.left + diff) / this.hScroller.scrollerUnseenWidth
        this.tableContent.scrollTo(this.hScroller.tableUnseenWidth * ratio, this.tableContent.scrollTop)
      }
    },

    /* *** Window Event *******************************************************************************************
     */
    tableScroll () {
      this.showDatePicker = false
      this.autocompleteInputs = []
      if (this.focused && this.currentField)
        this.inputSquare.style.marginLeft =
          (this.currentField.sticky ? this.tableContent.scrollLeft - this.squareSavedLeft : 0) + 'px'

      if (this.tableContent.scrollTop !== this.vScroller.lastTop) {
        this.calVScroll()
        if (this.$refs.vScrollButton) {
          this.$refs.vScrollButton.classList.add('focus')
          this.lazy(() => this.$refs.vScrollButton.classList.remove('focus'), 1000)
        }
      }
      this.vScroller.lastTop = this.tableContent.scrollTop

      if (this.tableContent.scrollLeft !== this.hScroller.lastLeft) {
        if (this.$refs.hScroll && this.hScroller.tableUnseenWidth) {
          this.$refs.hScroll.classList.add('focus')
          this.lazy(() => this.$refs.hScroll.classList.remove('focus'), 1000)
          const ratio = this.tableContent.scrollLeft / this.hScroller.tableUnseenWidth
          this.$refs.hScroll.style.left = (this.hScroller.scrollerUnseenWidth * ratio) + 'px'
        }
      }
      this.hScroller.lastLeft = this.tableContent.scrollLeft
    },
    winScroll () {
      this.showDatePicker = false
      this.autocompleteInputs = []
    },
    mousewheel (e) {
      if (this.noMouseScroll || !this.mousein || !e.deltaY) return
      let adjust = 0
      if (e.deltaY > 30 && this.pageTop + this.pageSize < this.table.length) adjust = 1
      else if (e.deltaY < -30 && this.pageTop > 0) adjust = -1
      if (adjust) {
        this.pageTop += adjust
        setTimeout(this.calVScroll)
        if (this.$refs.vScrollButton) {
          this.$refs.vScrollButton.classList.add('focus')
          this.lazy(() => this.$refs.vScrollButton.classList.remove('focus'), 1000)
        }
      }
      e.preventDefault()
      e.stopPropagation()
      return false
    },
    winResize () {
      this.lazy(this.refreshPageSize, 200)
    },
    winPaste (e) {
      if (e.target.tagName !== 'TEXTAREA') return
      if (!this.mousein && !this.focused) return
      if (!this.currentField || this.currentField.readonly) return
      if (this.inputBoxShow) {
        this.inputBoxChanged = true
        return
      }
      const text = (e.originalEvent || e).clipboardData.getData('text/plain')
      this.inputCellWrite(text)
      e.preventDefault()
    },
    winKeyup (e) {
      if (!e.altKey) this.systable.classList.remove('alt')
    },
    winKeydown (e) {
      if (e.altKey) this.systable.classList.add('alt')
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
            this.inputBox.value = this.currentCell.textContent
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
        switch (e.keyCode) {
          case 37:  // Left Arrow
            if (!this.focused) return
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
          case 38:  // Up Arrow
            if (!this.focused) return
            e.preventDefault()
            if (this.autocompleteInputs.length === 0)
              this.moveNorth()
            else
            if (this.autocompleteSelect > 0) {
              this.autocompleteSelect--
              const showTop = this.autocompleteSelect * 23
              if (showTop < this.$refs.autocomplete.scrollTop)
                this.$refs.autocomplete.scrollTop = showTop
            }
            else
            if (this.autocompleteSelect === -1) {
              this.autocompleteSelect = 0
              // this.autocompleteSelect = this.autocompleteInputs.length - 1
            }
            break
          case 9:  // Tab
            if (!this.focused) return
            if (e.shiftKey) {
              if (!this.moveWest(e)) {
                if (this.moveNorth(e))
                  this.moveToEast(e)
                else
                  return this.inputBoxBlur()
              }
            }
            else {
              if (!this.moveEast(e)) {
                if (this.moveSouth(e))
                  this.moveToWest(e)
                else
                  return this.inputBoxBlur()
              }
            }
            e.preventDefault()
            break
          case 39: // Right Arrow
            if (!this.focused) return
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
          case 40:  // Down Arrow
            if (!this.focused) return
            e.preventDefault()
            if (this.autocompleteInputs.length === 0)
              this.moveSouth(e)
            else
              if (this.autocompleteSelect < this.autocompleteInputs.length - 1) {
                this.autocompleteSelect++
                if (this.autocompleteSelect >= 10) {
                  const showTop = this.autocompleteSelect * 23 - 206
                  const scrollTop = this.$refs.autocomplete.scrollTop
                  if (scrollTop < showTop)
                    this.$refs.autocomplete.scrollTop = showTop
                }
              }
            break
          case 13:  // Enter
            if (!this.focused) return
            e.preventDefault()
            if (this.autocompleteInputs.length === 0 || this.autocompleteSelect === -1) {
              if (this.enterToSouth)
                this.moveSouth(e)
              else
                this.moveEast(e)
            }
            else if (this.autocompleteSelect !== -1 && this.autocompleteSelect < this.autocompleteInputs.length) {
              this.inputAutocompleteText(this.autocompleteInputs[this.autocompleteSelect])
            }
            else {
              this.inputBox.value = this.currentCell.textContent
              this.inputBoxShow = 0
              this.inputBoxChanged = false
            }
            this.inputBoxComplete()
            break
          case 27:  // Esc
            if (!this.focused) return
            this.showDatePicker = false
            this.autocompleteInputs = []
            this.autocompleteSelect = -1
            if (this.inputBoxShow) {
              e.preventDefault()
              this.inputBox.value = this.currentCell.textContent
              this.inputBoxShow = 0
              this.inputBoxChanged = false
            }
            break
          case 33:  // Page Up
            this.prevPage()
            e.preventDefault()
            break
          case 34:  // Page Down
            this.nextPage()
            e.preventDefault()
            break
          case 8:   // Delete
          case 46:  // BS
            if (!this.focused) return
            if (this.inputBoxShow) {
              this.inputBoxChanged = true
              setTimeout(() => this.calAutocompleteList(true))
              return
            }
            if (this.currentField.readonly) return
            if (this.autocompleteInputs.length) return
            this.inputBoxChanged = true
            this.inputBox.value = ''
            this.inputBoxComplete()
            break
          default:
            if (!this.focused) return
            if (this.currentField.readonly) return
            if (e.altKey) return
            if (e.key !== 'Process' && e.key.length > 1) return
            if (!this.inputBoxShow && this.currentField.type === 'date') {
              this.showDatePickerDiv()
              return
            }
            if (this.currentField.allowKeys) {
              if (this.currentField.allowKeys.constructor.name === 'Function') {
                if (!this.currentField.allowKeys(e.key.toUpperCase())) return e.preventDefault()
              }
              else
                if (this.currentField.allowKeys.indexOf(e.key.toUpperCase()) === -1) return e.preventDefault()
            }
            if (this.currentField.lengthLimit && this.inputBox.value.length > this.currentField.lengthLimit) return e.preventDefault()
            if (!this.inputBoxShow) {
              if (this.currentField.type === 'select' || this.currentField.type === 'map') {
                setTimeout(() => this.calAutocompleteList(true))
                if (e.keyCode === 32) return e.preventDefault()
                this.inputBox.value = ''
                this.inputBoxShow = 1
                this.inputBox.focus()
                return
              }
              this.inputBox.value = ''
              this.inputBoxShow = 1
              this.inputBox.focus()
              setTimeout(this.calAutocompleteList)
            }
            else
              setTimeout(() => this.calAutocompleteList(this.autocompleteInputs.length))
            this.inputBoxChanged = true
            break
        }
      }
    },

    /* *** Column Separator *******************************************************************************************
     */
    colSepMouseDown (e) {
      e.preventDefault()
      e.stopPropagation()
      if (this.allowAddCol && !e.target.classList.contains('col-sep')) {
        e.target.style.display = 'none'
        const me = e.target.parentElement.parentElement
        const pos = Array.from(me.parentElement.children).findIndex(td => td === me)
        this.insertColumn(pos)
      }
      this.focused = false
      const getStyleVal = (elm, css) => {
        window.getComputedStyle(elm, null).getPropertyValue(css)
      }
      this.sep = {}
      this.sep.curCol = this.colgroupTr.children[Array.from(this.labelTr.children).indexOf(e.target.parentElement)]
      // this.sep.nxtCol = this.sep.curCol.nextElementSibling
      this.sep.pageX = e.pageX
      let padding = 0
      if (getStyleVal(this.sep.curCol, 'box-sizing') !== 'border-box') {
        const padLeft = getStyleVal(this.sep.curCol, 'padding-left')
        const padRight = getStyleVal(this.sep.curCol, 'padding-right')
        if (padLeft && padRight)
          padding = parseInt(padLeft) + parseInt(padRight)
      }
      this.sep.curColWidth = e.target.parentElement.offsetWidth - padding
      // if (this.sep.nxtCol)
      //   this.sep.nxtColWidth = this.sep.nxtCol.offsetWidth - padding
      window.addEventListener('mousemove', this.colSepMouseMove)
      window.addEventListener('mouseup', this.colSepMouseUp)
    },
    colSepMouseOver (e) {
      if (e.target.classList.contains('col-sep')) {
        e.target.style.borderRight = '5px solid #cccccc'
        e.target.style.height = this.systable.getBoundingClientRect().height + 'px'
        if (this.allowAddCol)
          e.target.children[0].style.display = 'block'
      }
      else {
        // add-col-btn
        if (this.addColBtnTimeout) clearTimeout(this.addColBtnTimeout)
        if (this.allowAddCol)
          e.target.style.display = 'block'
      }
    },
    colSepMouseOut (e) {
      if (e.target.classList.contains('col-sep')) {
        e.target.style.borderRight = '5px solid transparent'
        e.target.style.height = '100%'
        this.addColBtnTimeout = setTimeout(() => {
          e.target.children[0].style.display = 'none'
        }, 500)
      }
      else {
        // add-col-btn
          e.target.style.display = 'none'
      }
    },
    colSepMouseMove (e) {
      if (!this.sep || !this.sep.curCol) return
      const diffX = e.pageX - this.sep.pageX
      this.sep.curCol.style.width = (this.sep.curColWidth + diffX) + 'px'
      this.lazy(this.calStickyLeft, 200)
    },
    colSepMouseUp (e) {
      e.preventDefault()
      e.stopPropagation()
      delete this.sep
      window.removeEventListener('mousemove', this.colSepMouseMove)
      window.removeEventListener('mouseup', this.colSepMouseUp)
      const setting = this.getSetting()
      if (this.remember) localStorage[window.location.pathname + '.' + this.token] = JSON.stringify(setting)
      this.$emit('setting', setting)
    },

    /* *** Finder *******************************************************************************************
     */
    doFindNext () {
      return this.doFind()
    },
    doFind (s) {
      if (typeof s === 'undefined') s = this.inputFind
      else this.inputFind = s
      s = s.toUpperCase()
      const row = Math.max(0, this.currentRowPos)
      for(let r = row + this.pageTop; r < this.table.length; r++) {
        const rec = this.table[r]
        for(let c = (r === row + this.pageTop ? this.currentColPos + 1: 0); c < this.fields.length; c++) {
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
      for(let r = 0; r <= row + this.pageTop; r++) {
        const rec = this.table[r]
        for(let c = 0; c < (r === row + this.pageTop ? this.currentColPos : this.fields.length); c++) {
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

    /* *** Sort *******************************************************************************************
     */
    headerClick (e, colPos) {
      if(!this.noHeaderEdit && e.target.tagName === 'SPAN') {
        e.target.contentEditable = true
        e.target.addEventListener('focusout', this.completeHeaderChange)
        return
      }
      if (e.which === 1) {
        e.preventDefault()
        if (this.sortPos === colPos && this.sortDir > 0)
          this.sort(-1, colPos)
        else
          this.sort(1, colPos)
      }
    },
    completeHeaderChange (e) {
      const th = e.target.parentElement.parentElement
      const index = Array.from(th.parentElement.children).findIndex(v => v === th)
      this.fields[index - 1].label = e.target.textContent
    },
    sort (n, pos) {
      this.processing = true
      const colPos = typeof pos === 'undefined' ? this.columnFilterRef.colPos : pos
      const field = this.fields[colPos]
      const name = field.name
      setTimeout(() => {
        let sorting = field.sort
        if (sorting === null) {
          if (field.type === 'number')
            sorting = (a, b) => {
              if (Number(a[name]) > Number(b[name])) return 1
              if (Number(a[name]) < Number(b[name])) return -1
              return 0
            }
          else
              sorting = (a, b) => {
                return String(a[name]).localeCompare(String(b[name]))
              }
        }
        this.value.sort((a, b) => {
          return sorting(a, b) * -n
        })
        this.sortPos = colPos
        this.sortDir = n
        this.$forceUpdate()
        this.processing = false
      }, 0)
    },

    /* *** Paging *******************************************************************************************
     */
    refreshPageSize () {
      if (this.$refs.hScroll) {
        const fullWidth = this.systable.getBoundingClientRect().width
        const viewWidth = this.tableContent.getBoundingClientRect().width
        this.hScroller.tableUnseenWidth = fullWidth - viewWidth
        this.$refs.hScroll.style.width = (100 * viewWidth / fullWidth) + '%'
        const scrollerWidth = this.$refs.hScroll.getBoundingClientRect().width
        this.hScroller.scrollerUnseenWidth = this.footer.getBoundingClientRect().width - 40 - scrollerWidth
      }
      if (!this.noPaging) {
        const offset = this.summaryRow ? 60 : 35
        let controlHeight = window.innerHeight - this.recordBody.getBoundingClientRect().top - offset
        const height = this.height.replace(/px/,'') * 1 + this.systable.getBoundingClientRect().top - this.recordBody.getBoundingClientRect().top
        if (this.height && controlHeight > height) controlHeight = height
        this.pageSize = this.page || Math.floor(controlHeight / 24)
        // this.pageSize = this.page || Math.floor((this.systable.parentNode.style.height - this.recordBody.getBoundingClientRect().top - offset) / 24)
      }
      else if (this.height === 'auto') {
        let h = Math.floor((window.innerHeight - this.tableContent.getBoundingClientRect().top - 25))
        let offset = 4
        if (this.filterRow) offset += 29
        if (this.summaryRow) offset += 25
        if (!this.footerRow) offset += 25
        h = Math.min(24 * (this.table.length - this.pageTop) + offset, h)
        this.systable.parentNode.style.height = h + 'px'
      }
      setTimeout(this.calVScroll)
    },
    firstPage (e) {
      if (e) e.stopPropagation()
      this.pageTop = 0
      this.calVScroll()
      if (this.$refs.vScrollButton) {
        setTimeout(() => {
          this.$refs.vScrollButton.classList.add('focus')
          this.lazy(() => {
            if (!this.$refs.vScrollButton) return
            this.$refs.vScrollButton.classList.remove('focus')
          }, 1000)
        })
      }
    },
    lastPage (e) {
      if (e) e.stopPropagation()
      this.pageTop = this.table.length - this.pageSize < 0 ? 0 : this.table.length - this.pageSize
      this.calVScroll()
      if (this.$refs.vScrollButton) {
        setTimeout(() => {
          this.$refs.vScrollButton.classList.add('focus')
          this.lazy(() => {
            if (!this.$refs.vScrollButton) return
            this.$refs.vScrollButton.classList.remove('focus')
          }, 1000)
        })
      }
    },
    prevPage (e) {
      if (e) e.stopPropagation()
      this.pageTop = this.pageTop < this.pageSize ? 0 : this.pageTop - this.pageSize
      this.calVScroll()
      if (this.$refs.vScrollButton) {
        setTimeout(() => {
          this.$refs.vScrollButton.classList.add('focus')
          this.lazy(() => {
            if (!this.$refs.vScrollButton) return
            this.$refs.vScrollButton.classList.remove('focus')
          }, 1000)
        })
      }
    },
    nextPage (e) {
      if (e) e.stopPropagation()
      if (this.pageTop + this.pageSize < this.table.length)
        this.pageTop = Math.min(this.pageTop + this.pageSize, this.table.length - this.pageSize)
      this.calVScroll()
      if (this.$refs.vScrollButton) {
        setTimeout(() => {
          this.$refs.vScrollButton.classList.add('focus')
          this.lazy(() => {
            if (!this.$refs.vScrollButton) return
            this.$refs.vScrollButton.classList.remove('focus')
          }, 1000)
        })
      }
    },

    /* *** Setting *******************************************************************************************
     */
    getSetting () {
      const colWidth = Array.from(this.colgroupTr.children).map(col => col.style.width)
      const fields = this.fields.map((field, i) => {
        return {
          name: field.name,
          invisible: field.invisible,
          width: colWidth[i + 1],
          label: field.label
        }
      })
      return {
        colHash: this.colHash,
        fields: fields
      }
    },

    settingClick() {
      if (!this.disablePanelSetting) 
        this.$refs.panelSetting.showPanel();
    },

    panelFilterClick(item) {
      if (!this.disablePanelFilter)
        this.$refs.panelFilter.showPanel(this.$refs[`filter-${item.name}`][0]);
    },

    /* *** Import/Export ************************************************************************************
     */
    importTable (cb, errCb) {
      this.$refs.importFile.click()
      this.importCallback = cb
      this.importErrorCallback = errCb
    },   
    doImport (e) {
      this.processing = true
      // this.refresh()
      this.clearAllSelected()
      setTimeout(() => {
        const files = e.target.files
        if (!files || files.length === 0) return
        const file = files[0]

        const fileReader = new FileReader()
        fileReader.onload = async (e) => {
          try {
            const data = e.target.result
            const wb = XLSX.read(data, {type: 'binary', cellDates: true, cellStyle: false})
            const sheet = wb.SheetNames[0]
            let importData = XLSX.utils.sheet_to_row_object_array(wb.Sheets[sheet])
            importData = importData.filter(rec => Object.keys(rec).length > 0).map((rec) => {
              if (rec.key_1) {
                rec.key = rec.key_1  // Fixed the XLSX issue where key is set to be reserved word
                delete rec.key_1
              }
              Object.keys(rec).forEach(k => {
                if (typeof rec[k] === 'string') rec[k] = rec[k].replace(/[ \r\n\t]+$/g, '')
              })
              return rec
            })
            const keyStart = String(new Date().getTime() % 1e8)
            if (importData.length === 0) {
              if (this.importErrorCallback) this.importErrorCallback('noRecordIsRead')
              throw new Error('VueExcelEditor: ' + this.localizedLabel.noRecordIsRead)
            }
            if (this.fields
              .filter(f => f.keyField)
              .filter(f => typeof importData[0][f.name] === 'undefined' && typeof importData[0][f.label] === 'undefined').length > 0) {
                if (this.importErrorCallback) this.importErrorCallback('missingKeyColumn')
                throw new Error(`VueExcelEditor: ${this.localizedLabel.missingKeyColumn}`)
              }

            let pass = 0
            let inserted = 0
            let updated = 0
            while (pass < 2) {
              const keys = this.fields.filter(f => f.keyField)
              let uniqueKeys = []
              await Promise.all(importData.map(async (line, i) => {
                let rowPos = -1
                if (keys.length) {
                  // locate match record
                  rowPos = this.table.findIndex(v =>
                    keys.filter(f => 
                      typeof v[f.name] !== 'undefined' 
                      && (v[f.name] === line[f.name] || v[f.name] === line[f.label])).length === keys.length
                  )
                  if (rowPos === -1) {
                    // If this is a new line, avoid the line with duplicate key
                    const linekey = keys.map(k => line[k.name] || line[k.label]).join(':')
                    if (linekey) {
                      if (uniqueKeys.includes(linekey)) return
                      uniqueKeys.push(linekey)
                    }
                  }
                }

                // if no match found, find an empty record
                if (rowPos === -1)
                  rowPos = this.table.findIndex(v => Object.keys(v).filter(f => !f.startsWith('$')).length === 0)

                const rec = {
                  $id: typeof line.$id === 'undefined' ? keyStart + '-' + ('000000' + i).slice(-7) : line.$id
                }

                // Raise exception if readonly not not pass validation
                await Promise.all(this.fields.map(async (field) => {
                  if (field.name.startsWith('$')) return
                  let val = line[field.name]
                  if (typeof val === 'undefined') val = line[field.label]
                  if (typeof val === 'undefined') val = null
                  else {
                    if (field.readonly) {
                      if (this.importErrorCallback) this.importErrorCallback('readonlyColumnDetected', i+1)
                      throw new Error(`VueExcelEditor: [row=${i+1}] ` + this.localizedLabel.readonlyColumnDetected + ': ' + field.name)
                    }
                    if (field.change) {
                      let result = await field.change(val, rec[field.name], rec, field)
                      if (result === false) {
                        if (this.importErrorCallback) this.importErrorCallback('columnHasValidationError', i+1)
                        throw new Error(`VueExcelEditor: [row=${i+1}, val=${val}] ` + this.localizedLabel.columnHasValidationError(field.name, ''))
                      }
                    }
                    if (field.validate) {
                      let err
                      if ((err = field.validate(val, rec[field.name], rec, field))) {
                        if (this.importErrorCallback) this.importErrorCallback('columnHasValidationError', i+1, val)
                        throw new Error(`VueExcelEditor: [row=${i+1}, val=${val}] ` + this.localizedLabel.columnHasValidationError(field.name, err))
                      }
                    }
                    if (this.validate) {
                      let err
                      if ((err = this.validate(val, rec[field.name], rec, field))) {
                        if (this.importErrorCallback) this.importErrorCallback('rowHasValidationError', i+1, val)
                        throw new Error(`VueExcelEditor: [row=${i+1}, val=${val}] ` + this.localizedLabel.rowHasValidationError(i + 1, field.name, err))
                      }
                    }
                  }
                  if (val !== null) rec[field.name] = val
                  else if (field.mandatory) {
                    if (this.importErrorCallback) this.importErrorCallback(field.mandatory, i+1, val)
                    throw new Error(`VueExcelEdutor: [row=${i+1}, val=${val}] ` + field.mandatory)
                  }
                }))

                // Do actual insert/update if 2nd pass
                if (pass === 1) {
                  if (rowPos >= 0) {
                    updated++
                    Object.keys(rec).forEach(name => {
                      if (name.startsWith('$')) return
                      this.updateCell(rowPos, name, rec[name])
                    })
                    this.selected[rowPos] = this.table[rowPos].$id
                  }
                  else {
                    this.newRecord(rec, true)
                    inserted++
                  }
                }
              }))
              pass++
            }
            if (pass === 2 && this.importCallback) {
              this.importCallback({
                inserted: inserted,
                updated: updated,
                recordAffected: inserted + updated
              })
            }
          }
          catch (e) {
            if (this.importErrorCallback) this.importErrorCallback(e.message)
            throw new Error('VueExcelEditor: ' + e.stack)
          }
          finally {
            this.processing = false
            this.$refs.importFile.value = ''
          }
        }
        fileReader.onerror = (e) => {
          this.processing = false
          this.$refs.importFile.value = ''
          if (this.importErrorCallback) this.importErrorCallback(e.message)
          throw new Error('VueExcelEditor: ' + e.stack)
        }
        fileReader.readAsBinaryString(file)
      }, 500)      
    },
    exportTable (format, selectedOnly, filename) {
      this.processing = true
      setTimeout(() => {
        const wb = XLSX.utils.book_new()
        let ws1 = null
        let data = this.table
        if (selectedOnly)
          data = this.table.filter((rec, i) => this.selected[i])
        const mapped = data.map(rec => {
          const conv = {}
          this.fields.forEach(field => conv[field.name] = rec[field.name])
          return conv
        })
        ws1 = XLSX.utils.json_to_sheet(mapped, {
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
        filename = filename || 'export'
        switch (format) {
          case 'csv':
            if (!filename.endsWith('.csv')) filename = filename + '.csv'
            break
          case 'xls':
            if (!filename.endsWith('.xls')) filename = filename + '.xls'
            break
          case 'xlsx':
          case 'excel':
          default:
            if (!filename.endsWith('.xlsx')) filename = filename + '.xlsx'
            break
        }
        if (filename.endsWith('.xlsx'))
          XLSX.writeFile(wb, filename, {
            compression: 'DEFLATE',
            compressionOptions: {
              level: 6
            }
          })
        else
          XLSX.writeFile(wb, filename)

        this.processing = false
      }, 500)
    },

    /* *** Select *******************************************************************************************
     */
    getSelectedRecords () {
      return this.table.filter((rec, i) => this.selected[i])
    },
    /*
    deleteSelectedRecords () {
      this.table = this.table.filter((rec, i) => typeof this.selected[i] === 'undefined')
      this.selected = {}
      this.selectedCount = 0
    },
    */
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
      else {
        const selected = this.selected[rowPos]
        if (!this.freeSelect && !(e.ctrlKey || e.metaKey)) this.clearAllSelected()
        if (!selected) this.selectRecord(rowPos)
        else this.unSelectRecord(rowPos)
      }
      this.prevSelect = rowPos
    },
    selectAllClick () {
      this.toggleSelectAllRecords()
    },
    reviseSelectedAfterTableChange () {
      this.rowIndex = {}
      this.table.forEach((rec, i) => (this.rowIndex[rec.$id] = i))
      const temp = Object.assign(this.selected)
      this.selected = {}
      Object.keys(temp).forEach((p) => {
        const id = temp[p]
        if (typeof this.rowIndex[id] !== 'undefined')
          this.selected[this.rowIndex[id]] = id
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
        this.selected[rowPos] = this.table[rowPos].$id
        if (this.recordBody.children[rowPos - this.pageTop])
          this.recordBody.children[rowPos - this.pageTop].classList.add('select')
        this.lazy(rowPos, (buf) => {
          this.$emit('select', buf, true)
        })
      }
    },
    selectRecordByKeys (keys) {
      const rowPos = this.table.findIndex(v => 
        this.fields.filter(f => f.keyField).filter(f => v[f.name] === keys[f.name]).length === keys.length)
      if (rowPos >= 0) this.selectRecord(rowPos)
    },
    selectRecordById (id) {
      const rowPos = this.table.findIndex(v => v.$id === id)
      if (rowPos >= 0) this.selectRecord(rowPos)
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
      if (this.selectedCount > 0)
        this.clearAllSelected()
      else {
        for (let i = 0; i < this.table.length; i++)
          this.selectRecord(i)
        this.selectedCount = this.table.length
      }
    },
    clearAllSelected () {
      // for (let i = 0; i < this.$refs.systable.children[2].children.length; i++)
      //  this.unSelectRecord(this.pageTop + i)
      if (this.selectedCount > 0)
        this.$emit('select', Object.keys(this.selected).map(rowPos => Number(rowPos)), false)
      this.selected = {}
      this.selectedCount = 0
    },

    /* *** Cursor *******************************************************************************************
     */
    moveTo (rowPos, colPos) {
      colPos = colPos || 0
      const done = this.moveInputSquare(rowPos - this.pageTop, colPos)
      this.focused = true
      setTimeout(() => this.inputBox.focus())
      return done
    },
    moveToNorthWest() {
      let goColPos = 0
      while (this.fields[goColPos].invisible && goColPos < this.fields.length - 1) goColPos++
      return this.moveTo(0, goColPos)
    },
    moveToNorthEast () {
      let goColPos = this.fields.length - 1
      while (this.fields[goColPos].invisible && goColPos > 0) goColPos--
      return this.moveTo(0, goColPos)
    },
    moveToSouthWest () {
      let goRowPos = this.table.length - 1
      let goColPos = 0
      while (this.fields[goColPos].invisible && goColPos < this.fields.length - 1) goColPos++
      return this.moveTo(goRowPos, goColPos)
    },
    moveToSouthEast () {
      let goRowPos = this.table.length - 1
      let goColPos = this.fields.length - 1
      while (this.fields[goColPos].invisible && goColPos > 0) goColPos--
      return this.moveTo(goRowPos, goColPos)
    },
    moveToWest () {
      let goRowPos = this.currentRowPos
      let goColPos = 0
      while (this.fields[goColPos].invisible && goColPos < this.fields.length - 1) goColPos++
      return this.moveTo(goRowPos, goColPos)
    },
    moveToEast () {
      let goRowPos = this.currentRowPos
      let goColPos = this.fields.length - 1
      while (this.fields[goColPos].invisible && goColPos > 0) goColPos--
      return this.moveTo(goRowPos, goColPos)
    },
    moveWest () {
      if (this.focused && this.currentColPos > 0) {
        let goColPos = this.currentColPos - 1
        while (this.fields[goColPos].invisible && goColPos > 0) goColPos--
        if (goColPos === -1 || this.fields[goColPos].invisible) return false
        return this.moveInputSquare(this.currentRowPos, goColPos)
      }
      return false
    },
    moveEast () {
      if (this.focused && this.currentColPos < this.fields.length - 1) {
        let goColPos = this.currentColPos + 1
        while (this.fields[goColPos].invisible && goColPos < this.fields.length - 1) goColPos++
        if (goColPos === this.fields.length || this.fields[goColPos].invisible) return false
        return this.moveInputSquare(this.currentRowPos, goColPos)
      }
      return false
    },
    moveNorth () {
      if (this.focused) {
        const done = this.moveInputSquare(this.currentRowPos - 1, this.currentColPos)
        this.calVScroll()
        if (this.$refs.vScrollButton) {
          setTimeout(() => {
            this.$refs.vScrollButton.classList.add('focus')
            this.lazy(() => {
              if (!this.$refs.vScrollButton) return
              this.$refs.vScrollButton.classList.remove('focus')
            }, 1000)
          })
        }
        return done
      }
      return false
    },
    moveSouth () {
      if (this.focused) {
        if (this.currentRowPos + 1 >= this.table.length) {
          if (this.readonly) return false
          if (!this.newIfBottom) return false
          this.newRecord({}, false, true)
          setTimeout(this.moveSouth, 0)
          return true
        }
        const done = this.moveInputSquare(this.currentRowPos + 1, this.currentColPos)
        this.calVScroll()
        if (this.$refs.vScrollButton) {
          setTimeout(() => {
            this.$refs.vScrollButton.classList.add('focus')
            this.lazy(() => {
              if (!this.$refs.vScrollButton) return
              this.$refs.vScrollButton.classList.remove('focus')
            }, 1000)
          })
        }
        return done
      }
      return false
    },
    mouseDown (e) {
      if (e.target.parentNode.parentNode.tagName === 'TBODY' && !e.target.classList.contains('first-col')) {
        e.preventDefault()
        setTimeout(() => this.inputBox.focus())
        this.focused = true
        const row = e.target.parentNode
        const colPos = Array.from(row.children).indexOf(e.target) - 1
        const rowPos = Array.from(row.parentNode.children).indexOf(row)
        this.$emit('cell-click', {rowPos, colPos})
        this.moveInputSquare(rowPos, colPos)
        if (this.currentField && this.currentField.link && e.altKey)
          setTimeout(() => this.currentField.link(this.currentCell.textContent, this.currentRecord, rowPos, colPos, this.currentField, this))
        if (e.target.offsetWidth - e.offsetX > 15) return
        if (this.currentField.readonly) return
        this.inputBox.value = this.currentCell.textContent
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
    numcolMouseOver (e) {
      const cell = e.target
      if (!cell.classList.contains('error')) return
      if (this.tipTimeout) clearTimeout(this.tipTimeout)
      if ((this.tip = this.rowerr[cell.getAttribute('id')]) === '') return
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
      this.systable.classList.add('mouseover')
    },
    mouseOut () {
      this.mousein = false
      this.systable.classList.remove('mouseover')
    },

    /* *** InputBox *****************************************************************************************
     */
    moveInputSquare (rowPos, colPos) {
      if (colPos < 0) return false
      const top = this.pageTop
      let row = this.recordBody.children[rowPos]
      if (!row) {
        if (rowPos > this.currentRowPos) {
          // move the whole page down 1 record
          if (this.pageTop + this.pageSize < this.table.length)
            this.pageTop += 1
          else
            return false
          row = this.recordBody.children[--rowPos]
        }
        else {
          // move the whole page up 1 record
          if (this.pageTop - 1 >= 0)
            this.pageTop -= 1
          else
            return false
          row = this.recordBody.children[++rowPos]
        }
      }

      // Clear the label markers
      this.labelTr.children[this.currentColPos + 1].classList.remove('focus')
      if (this.currentRowPos >= 0 && this.currentRowPos < this.pagingTable.length)
        this.recordBody.children[this.currentRowPos].children[0].classList.remove('focus')

      // Off the textarea when moving, write to value if changed
      if (this.inputBoxShow) this.inputBoxShow = 0
      if (this.inputBoxChanged) {
        this.inputCellWrite(this.inputBox.value, this.currentColPos, top + this.currentRowPos)
        this.inputBoxChanged = false
      }

      // Relocate the inputSquare
      const cell = row.children[colPos + 1]
      if (!cell) return false
      this.currentField = this.fields[colPos]
      const cellRect = cell.getBoundingClientRect()
      const tableRect = this.systable.getBoundingClientRect()
      this.squareSavedLeft = this.tableContent.scrollLeft
      this.inputSquare.style.marginLeft = 0
      this.inputSquare.style.left = (cellRect.left - tableRect.left - 1) + 'px'
      this.inputSquare.style.top =  (cellRect.top - tableRect.top - 1) + 'px'
      this.inputSquare.style.width = (cellRect.width + 1) + 'px'
      this.inputSquare.style.height = (cellRect.height + 1) + 'px'
      this.inputSquare.style.zIndex = this.currentField.sticky ? 3 : 1

      // Adjust the scrolling to display the whole focusing cell
      if (!this.currentField.sticky) {
        const boundRect = this.$el.getBoundingClientRect()
        if (cellRect.right >= boundRect.right - 12)
          this.tableContent.scrollBy(cellRect.right - boundRect.right + 13, 0)
        if (cellRect.left <= boundRect.left + this.leftMost)
          this.tableContent.scrollBy(cellRect.left - boundRect.left - this.leftMost - 1, 0)
      }

      this.currentRowPos = rowPos
      this.currentColPos = colPos
      this.currentCell = cell
      this.currentRecord = this.table[top + rowPos]

      this.$emit('cell-focus', {rowPos, colPos, cell, record: this.currentRecord})

      // Off all editors
      if (this.showDatePicker) this.showDatePicker = false
      if (this.autocompleteInputs.length) {
        this.autocompleteInputs = []
        this.autocompleteSelect = -1
      }
      if (this.recalAutoCompleteList) clearTimeout(this.recalAutoCompleteList)

      // set the label markers
      if (this.currentRowPos >= 0 && this.currentRowPos < this.pagingTable.length) {
        this.inputBox.value = this.currentCell.textContent
        this.inputBox.focus()
        this.focused = true
        row.children[0].classList.add('focus')
        this.labelTr.children[colPos + 1].classList.add('focus')
      }
      return true
    },
    inputSquareClick () {
      if (!this.currentField.readonly && !this.inputBoxShow && this.currentField.type !== 'select') {
        this.inputBox.value = this.currentCell.textContent
        this.inputBoxShow = 1
        this.inputBox.focus()
        this.inputBoxChanged = false
        this.focused = true
      }
    },
    inputBoxMouseMove (e) {
      let cursor = 'text'
      if (!this.currentField.readonly
        && (this.currentField.options || this.currentField.type === 'date')
        && e.target.offsetWidth - e.offsetX < 15)
        cursor = 'pointer'
      e.target.style.cursor = cursor
    },
    inputBoxMouseDown (e) {
      if (e.target.offsetWidth - e.offsetX > 15) return
      if (this.currentField.readonly) return
      if (this.currentField.options) {
        e.preventDefault()
        this.calAutocompleteList(true)
      }
      if (this.currentField.type === 'date') {
        e.preventDefault()
        this.showDatePickerDiv()
      }
    },
    inputCellWrite (setText, colPos, recPos) {
      let field = this.currentField
      if (typeof colPos !== 'undefined') field = this.fields[colPos]
      if (typeof recPos === 'undefined') recPos = this.pageTop + this.currentRowPos
      if (typeof this.selected[recPos] !== 'undefined')
        this.updateSelectedRows(field, field.toValue(setText))
      else
        this.updateCell(recPos, field, field.toValue(setText))
    },
    inputBoxBlur () {
      if (!this.$refs.dpContainer) return
      if (this.$refs.dpContainer.querySelector(':hover')) return
      this.inputBoxComplete()
      this.focused = false
      if (this.currentRowPos !== -1 && this.currentRowPos < this.recordBody.children.length) {
        this.recordBody.children[this.currentRowPos].children[0].classList.remove('focus')
        this.labelTr.children[this.currentColPos + 1].classList.remove('focus')
      }
    },
    inputBoxComplete () {
      if (this.inputBoxChanged) {
        this.inputCellWrite(this.inputBox.value)
        this.inputBoxChanged = false
      }
      this.inputBoxShow = 0
      this.showDatePicker = false
      // Without this, the cell cannot refresh, dont know why
      this.focused = false
      this.focused = true
    },

    /* *** Update *******************************************************************************************
     */
    undoTransaction (e) {
      if (e) e.preventDefault()
      if (this.redo.length === 0) return
      const transaction = this.redo.pop()
      transaction.every((t) => {
        try {
          if (t.type === 'd') {
            // deleteRecord() transaction
            this.newRecord(t.rec, false, true, true)
          }
          else if (t.field && t.field.keyField && t.oldKeys.includes(t.newVal)) {
            // newRecord() transaction
            const valueRowPos = this.value.findIndex(v => v.$id === t.$id)
            if (valueRowPos >= 0) {
              this.deleteRecord(valueRowPos, true)
              // return false
            }
          }
          else
            this.updateCell(t.$id, t.field.name, t.oldVal, true)

          return true
        }
        catch(e) {
          return false
        }
      })
    },
    newRecord (rec, selectAfterDone, noLastPage, isUndo) {
      if (typeof rec === 'undefined') rec = {}
      this.fields.map(f => {
        if (typeof rec[f.name] === 'undefined') {
          if (f.keyField)
            rec[f.name] = '§' + this.tempKey()
          else
            rec[f.name] = null
        }
      })
      const id = rec.$id || this.tempKey()
      rec.$id = id
      this.value.push(rec)
      const rowPos = this.table.push(rec) - 1
      if (selectAfterDone) this.selected[rowPos] = id
      Object.keys(rec).forEach(name => {
        const field = this.fields.find(f => f.name === name)
        if (field) this.updateCell(rec, field, rec[name], isUndo)
      })
      // this.refresh()
      if (!noLastPage) this.lazy(() => {
        this.lastPage()
        this.moveToSouthWest()
      })
      return rec
    },
    deleteSelectedRecords () {
      Object.values(this.selected).forEach((id) => {
        const valueRowPos = this.value.findIndex(v => v.$id === id)
        if (valueRowPos >= 0) this.deleteRecord(valueRowPos)
      })
      this.selected = {}
      this.selectedCount = 0
    },
    deleteRecord (valueRowPos, isUndo) {
      if (this.currentRowPos === valueRowPos) this.moveNorth()
      const rec = this.value.splice(valueRowPos, 1)[0]
      setTimeout(() => {
        this.lazy(rec, (buf) => {
          this.$emit('delete', buf)
          if (!isUndo) this.redo.push(buf.map(t => ({
            type: 'd',
            rec: t
          })))
        })
      }, 100)
    },
    async updateCell (row, field, newVal, isUndo) {
      switch(row.constructor.name) {
        case 'String': // $id
          row = this.value.find(r => r.$id === row) // id
          break
        case 'Number':
          row = this.table[row] // tablePos
          break
        case 'Object': // record object
          break
        default:
          throw new Error('Invalid row argument type')
      }
      switch(field.constructor.name) {
        case 'String': // field name
          field = this.fields.find(f => f.name === field)
          break
        case 'Number': // field pos
          field = this.fields[field]
          break
        case 'Object': // field object
          break
        default:
          throw new Error('Invalid field argument type')
      }
      if (!field) throw new Error('Invalid field argument')
      if (!row) return // No row is found

      const oldVal = row[field.name]
      const oldKeys = this.getKeys(row)

      if (field.change) {
        let result = await field.change(newVal, oldVal, row, field)
        if (result === false) return
      }

      row[field.name] = newVal

      setTimeout(() => {
        const transaction = {
          $id: row.$id,
          keys: this.getKeys(row),
          oldKeys: oldKeys,
          name: field.name,
          field: field,
          oldVal: typeof oldVal !== 'undefined' ? oldVal : '',
          newVal: newVal,
          err: ''
        }

        if (field.validate !== null) transaction.err = field.validate(newVal, oldVal, row, field)
        if (field.mandatory && newVal === '')
          transaction.err += (transaction.err ? '\n' : '') + field.mandatory
        this.setFieldError(transaction.err, row, field)

        if (this.validate !== null) {
          transaction.rowerr = this.validate(newVal, oldVal, row, field)
          this.setRowError(transaction.rowerr, row)
        }

        if (field.summary)
          this.calSummary(field.name)

        this.lazy(transaction, (buf) => {
          this.$emit('update', buf)
          if (!isUndo) this.redo.push(buf)
        }, 50)
      })
    },
    updateSelectedRows (field, content) {
      this.processing = true
      setTimeout(() => {
        Object.keys(this.selected).forEach(recPos => this.updateCell(parseInt(recPos), field, content))
        this.processing = false
      }, 0)
    },
    setFieldError (error, row, field) {
      const id = `id-${row.$id}-${field.name}`
      const selector = this.systable.querySelector('td#'+id)
      if (error) {
        this.errmsg[id] = error
        this.$emit('validate-error', error, row, field)
        if (selector) selector.classList.add('error')
      }
      else
      if (this.errmsg[id]) {
        delete this.errmsg[id]
        this.$emit('validate-error', '', row, field)
        if (selector) selector.classList.remove('error')
      }
    },
    setRowError (error, row) {
      const rid = `rid-${row.$id}`
      const selector = this.systable.querySelector('td#'+rid)
      if (error) {
        this.rowerr[rid] = error
        this.$emit('validate-error', error, row)
        if (selector) selector.classList.add('error')
      }
      else
      if (this.rowerr[rid]) {
        delete this.rowerr[rid]
        this.$emit('validate-error', '', row)
        if (selector) selector.classList.remove('error')
      }
    },

    /* *** Autocomplete ****************************************************************************************
     */
    async calAutocompleteList (force) {
      if (!force && !this.currentField.autocomplete) return
      if (force || (this.inputBoxChanged && this.inputBox.value.length > 0)) {
        if (typeof this.recalAutoCompleteList !== 'undefined') clearTimeout(this.recalAutoCompleteList)
        const doList = async () => {
          if (!force) {
            if (!this.focused || !this.inputBoxShow || !this.inputBoxChanged || !this.inputBox.value.length) {
              this.autocompleteInputs = []
              return
            }
          }
          const field = this.currentField
          const name = field.name
          const value = this.inputBox.value.toUpperCase()
          const listCount = this.autocompleteCount
          let list = []
          if (field.options) {
            if (field.options.constructor.name.endsWith('Function')) {
              list = await field.options(value, this.currentRecord)
              if (field.type === 'map') list = Object.values(list)
              else list = list.slice()
              if (this.inputBoxShow)
                list = list.filter(element => element.toUpperCase().includes(value))
              list.sort().splice(listCount)
              // this.autocompleteSelect = list.findIndex(element => element.toUpperCase().includes(value))
            }
            else if (Object.values(field.options).length > 0) {
              list = field.options
              if (field.type === 'map') list = Object.values(list)
              else list = list.slice()
              if (this.inputBoxShow)
                list = list.filter(element => element.toUpperCase().includes(value))
              list.sort().splice(listCount)
              // this.autocompleteSelect = list.findIndex(element => element.toUpperCase().includes(value))
            }
          }
          else {
            for(let i=0; i<this.value.length; i++) {
              const rec = this.value[i]
              if (typeof rec[name] !== 'undefined' && rec[name].toString().toUpperCase().startsWith(value) && list.indexOf(rec[name]) === -1)
                list.push(rec[name])
              if (list.length >= listCount) break
            }
            list.sort()
          }
          this.autocompleteSelect = list.findIndex(element => element.toUpperCase().includes(value))
          this.autocompleteInputs = list
          const rect = this.currentCell.getBoundingClientRect()
          this.lazy(() => {
            if (!this.$refs.autocomplete) return
            this.$refs.autocomplete.style.minWidth = rect.width + 'px'
            const r = this.$refs.autocomplete.getBoundingClientRect()
            if (rect.bottom + r.height > window.innerHeight) {
              // show at top
              this.autocompleteInputs.reverse()
              this.autocompleteSelect = this.autocompleteInputs.length - this.autocompleteSelect - 1
              this.$refs.autocomplete.style.top = (rect.top - r.height) + 'px'
            }
            else {
              this.$refs.autocomplete.style.top = rect.bottom + 'px'
            }
            if (rect.left + r.width > window.innerWidth)
              this.$refs.autocomplete.style.top = (window.innerWidth - r.width) + 'px'
            else
              this.$refs.autocomplete.style.left = rect.left + 'px'
            const showTop = this.autocompleteSelect * 23 - 206
            this.$refs.autocomplete.scrollTop = showTop > 0 ? showTop : 0
          })
          return this.autocompleteSelect
        }
        if (force)
          doList()
        else
          this.lazy(doList, 700)
      }
    },
    inputAutocompleteText (text, e) {
      if (e) e.preventDefault()
      this.autocompleteInputs = []
      this.autocompleteSelect = -1
      this.inputBoxShow = 0
      this.inputBoxChanged = false
      setTimeout(() => {
        this.inputCellWrite(text)
      })
    },

    /* *** Helper ****************************************************************************************
     */
    tempKey () {
      return (new Date().getTime() % 1e8) + '-' + Math.random().toString().slice(2, 7)
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
        Vue.nextTick(() => {
          p(this.lazyBuffer[hash])
          delete this.lazyTimeout[hash]
          delete this.lazyBuffer[hash]
        })
      }, delay)
    }
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
  /*height: fit-content;*/
  overflow-y: scroll;
  font-size: 0.88rem;
  max-width: 300px;
  max-height: 235px;
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
.table-col-header {
  cursor: text;
}
.systable {
  z-index: -1;
  width: fit-content;
  border: 0;
  border-collapse: separate;
  border-spacing: 0;
  /*
  margin-bottom: -1px;
  border-bottom: 1px solid lightgray;
  */
}
.systable .last-col {
  width: 12px;
}
.systable.no-number {
  margin-left: 0 !important;
}
.systable tbody tr {
  background-color: white;
  text-align: left;
}
.systable tr.select td {
  background-color: #bbb !important;
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
.systable.alt tbody td.link:hover {
  color: blue;
  text-decoration: underline;
  cursor: pointer !important;
}
.systable tbody td.error {
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAAXNSR0IArs4c6QAAAAlwSFlzAAAXEgAAFxIBZ5/SUgAAAGZJREFUOBGlzjsOgDAMA9CwcQSO0PtP3K64Qyugv8S2ZMXTUw5DstmFk8qWAuhEbzSzbQ+oWIPKULAPpGAdxGJDiMGmUBRbQhFsC3kxF+TB3NAOC0ErLAzNMAoaYTT0xyTojclQxR5H5B1HhuS+WAAAAABJRU5ErkJggg==') !important;
  background-repeat: no-repeat !important;
  background-size: 8px 8px !important;
  background-position: right 0px top 0px !important;
}
.systable tbody tr:not(:last-child) td {
  border-bottom: 1px solid lightgray;
}
.systable tbody tr:last-child td {
  border-bottom: 1px solid transparent;
}
.systable td:not(:last-child) {
  border-right: 1px solid lightgray;
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
.systable thead th {
  background-color: #e9ecef;
  cursor: s-resize;
  z-index: 6;
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
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAMAAABhEH5lAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAASUExURQAAANra2tfX19ra2tnZ2dnZ2c8lDs8AAAAFdFJOUwAwQL/PKlwehgAAAAlwSFlzAAAXEQAAFxEByibzPwAAAEdJREFUKFNdyskBACAIA8F49d+yiBEh+9rHYC5poPGiDmUDUGZI2EHCHBV2UWFEiT2UWKBgHwVLiCwjsoKcVeRMkDFFxoiADdH4AyvGhvOPAAAAAElFTkSuQmCC');
  background-repeat: no-repeat;
  background-size: 8px 8px;
  background-position: right 5px top 8px;
}
.systable tbody td.datepick:not(.readonly) {
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAMAAABhEH5lAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAASUExURQAAANra2tfX19ra2tnZ2dnZ2c8lDs8AAAAFdFJOUwAwQL/PKlwehgAAAAlwSFlzAAAXEQAAFxEByibzPwAAAEdJREFUKFNdyskBACAIA8F49d+yiBEh+9rHYC5poPGiDmUDUGZI2EHCHBV2UWFEiT2UWKBgHwVLiCwjsoKcVeRMkDFFxoiADdH4AyvGhvOPAAAAAElFTkSuQmCC');
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
  padding-left: 0;
  padding-right: 0;
  overflow: hidden;
  z-index: 5;
}
.systable .sticky-column {
  position: sticky;
  z-index: 2;
}
.systable tbody td.sticky-column {
  background-color: white;
}
.systable thead th.sticky-column {
  z-index: 7;
}
.systable thead td.sticky-column {
  z-index: 6;
}
.systable thead td.first-col, .systable thead th.first-col {
  cursor: pointer !important;
  z-index: 10;
}
.systable tfoot .row-summary {
  height: 25px;
  border-right: 0;
  border-top: 1px solid lightgray;
  position: sticky;
  bottom: 0;
  z-index: 4;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  background: #fffff2;
}
.systable tfoot .row-summary.sticky-column {
  z-index: 5;
}
.systable tfoot .row-summary.summary-column1 {
  border-right: 1px solid lightgray;
}
.systable tfoot .row-summary.summary-column2 {
  border-right: 1px solid lightgray;
  background: white;
}
.systable tfoot .row-summary:last-child {
  border-right: 0 !important;
}
.systable tfoot .row-summary.first-col {
  height: 25px;
  border-top: 1px solid lightgray;
  border-right: 1px solid lightgray;
  background: #e9ecef;
  position: sticky;
  left: 0;
  top: auto;
  z-index: 6;
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
.h-scroll {
  z-index: -1;
  position: absolute;
  background-color: #f4f6f9;
  height: 25px;
  margin-left: 40px;
  width: 65%;
  cursor: pointer;
}
.h-scroll:hover, .h-scroll.focus, .footer:hover .h-scroll {
  background-color: lightgray;
}

.footer a {
  cursor: pointer;
  color: #007bff;
}
.footer a.disabled {
  cursor: not-allowed;
  color: gray;
  pointer-events: none;
}
.footer a:hover {
  text-decoration: underline;
}
.v-scroll {
  display: inline-block;
  position: absolute;
  right: 0;
  width: 13px;
  z-index: 5;
  background-color: white;
  border-left: 1px solid lightgray;
  user-select: none;
}
.v-scroll-button {
  position: relative;
  display: inline-block;
  width: 100%;
  z-index: 10;
  background-color: #f4f6f9;
  cursor: pointer;
}
.v-scroll-button.focus, .v-scroll-button:hover, .v-scroll:hover .v-scroll-button {
  background-color: lightgray;
}
.runner {
  font-size: 0.88rem;
  padding: 0.5rem;
  position: absolute;
  right: 23px;
  top: 4px;
  display: inline-block;
  width: fit-content;
  z-index: 10;
  background-color: #e9ecef;
  border-radius: 3px;
  white-space: nowrap;
}
.runner:before {
  content: '';
  display: block;
  width: 0;
  height: 0;
  position: absolute;
  border-top: 4px solid transparent;
  border-bottom: 8px solid transparent;
  border-left: 8px solid #e9ecef;
  right: -8px;
  top: 4px;
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
  cursor: not-allowed;
  color: gray;
  pointer-events: none;
}
.col-sep {
  position: absolute;
  top: 0;
  right: 0;
  border-right: 5px solid transparent;
  width: 5px;
  cursor: col-resize;
  height: 100%;
  z-index: 15;
}
.add-col-btn {
  display: none;
  position: absolute;
  top: 12px;
  right: 8px;
  width: 20px;
  height: 20px;
  background-color: #2222;
  z-index: 15;
  border: solid 1px #2222;
  border-radius: 5px;
  cursor: pointer;
  color: white;
}
.add-col-btn:hover {
  background-color: #7777;
}
.sort-asc-sign {
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAMAAADzN3VRAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAeUExURQAAAK+np6+qqq+rq62pqa+rq6+rq6+srK+rq6+rq2v5ERwAAAAJdFJOUwAgYHCAv8/f71KXockAAAAJcEhZcwAAFxEAABcRAcom8z8AAABNSURBVChT7clRAoAgCATRtTLq/hcuBEN0j9B8zoNV76j6s37hsh+a+NWknQ3l8pGTAk4KlAwIdVgoYKIREmUYaIaPVnBi0IjDS2cA8AC8JAq/VhDqzAAAAABJRU5ErkJggg==');
  background-repeat: no-repeat;
  background-size: 9px 9px;
  background-position: right 5px top 3px;
}
.sort-des-sign {
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAYCAMAAAA4a6b0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAkUExURQAAAK+np6+qqq+rq6+pqa+qqq+rq6+rq6+rq6+srK+rq6+rqzDc2iQAAAALdFJOUwAgMEBQYHC/z9/v4u0IugAAAAlwSFlzAAAXEQAAFxEByibzPwAAAFVJREFUKFPtyVEWgCAIRFHC1HL2v98o53SEWELvC+bK0nYor5CeGCkZICUdBhkRjAoX9oLlqCzgyAOwc5caAKgT2gdIGQDNgGfM6Knzv+vcZr8kInIBUrIMxVKQeVsAAAAASUVORK5CYII=');
  background-repeat: no-repeat;
  background-size: 9px 9px;
  background-position: right 5px top 3px;
}
.filter-sign {
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAlCAMAAABiU6n+AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAhUExURQAAAK+vr6+np6+qqq+pqa+qqq2pqa+srK+srK+rq6+rq01/tHwAAAAKdFJOUwAQIDBQYICv3+8SoWj4AAAACXBIWXMAABcRAAAXEQHKJvM/AAAAiUlEQVQ4T+3OOxaAMAhEUfwmsv8FazLjMRBiZ+er4ExzJelLSSZeUccisvMO2uUq8+nKU5lXfl1bWWWkS1gHuuJCoa66UKCDCwU6ulCnu13I6x4XcrrGhYyudSGjMy7U6KwLPTrvQhwDV42jaueqcVTl7+L4zzaO386Zv+teZ/6u9xXzcK2zXUVOdLIT4IImCksAAAAASUVORK5CYII=');
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
  z-index: 50;
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
.norecord {
  z-index: 1;
  font-size: smaller;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0%);
}
</style>

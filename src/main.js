// index.js

import VueExcelEditor from './VueExcelEditor.vue'
import VueExcelColumn from './VueExcelColumn.vue'

export default {
  install (Vue) {

    Vue.component('vue-excel-editor', VueExcelEditor)
    Vue.component('vue-excel-column', VueExcelColumn)

    Vue.mixin({
      created() {
        // do something you like
      }
    })
  }
}

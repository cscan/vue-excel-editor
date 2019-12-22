// index.js

import VueExcelEditor from './VueExcelEditor'
import VueExcelColumn from './VueExcelColumn'

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

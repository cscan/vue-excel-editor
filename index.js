// index.js

import VueExcelEditor from './VueExcelEditor'
import VueExcelColumn from './VueExcelColumn'

import "bootstrap/dist/css/bootstrap.css"
import "bootstrap-vue/dist/bootstrap-vue.css"

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

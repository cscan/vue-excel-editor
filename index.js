// SysComponent.js

import SysHTable from './SysHTable'
import SysColumn from './SysColumn'

export default {
  install (Vue) {
    Vue.yourMethod = (value) => value

    Vue.component('sys-htable', SysHTable)
    Vue.component('sys-column', SysColumn)

    Vue.mixin({
      created() {
        // do something you like
      }
    })
  }
}

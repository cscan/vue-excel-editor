import commonjs from 'rollup-plugin-commonjs'
import vue from 'rollup-plugin-vue'
import resolve from '@rollup/plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import css from 'rollup-plugin-css-porter'

const extensions = [".ts", ".js"]

export default {
  input: 'src/main.js',
  output: {
    name: 'VueExcelComponent',
    exports: 'named',
    globals: {
      'moment': 'moment',
      'vue2-datepicker': 'vue2-datepicker',
      'vuedraggable': 'vuedraggable',
      'xlsx': 'xlsx'
    }
  },
  plugins: [
    commonjs(),
    vue({
      css: true,
      compileTemplate: true
    }),
    resolve({
      customResolveOptions: {
        moduleDirectory: 'node_modules'
      }
    }),
    babel({
      extensions
    }),
    css()
  ],
  external: [
    'moment',
    'vue2-datepicker',
    'vuedraggable',
    'xlsx'
  ]
}

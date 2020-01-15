import commonjs from 'rollup-plugin-commonjs'
import vue from 'rollup-plugin-vue'
import resolve from '@rollup/plugin-node-resolve'
import minify from 'rollup-plugin-babel-minify'
import css from 'rollup-plugin-css-porter'
import cleanup from 'rollup-plugin-cleanup'

export default {
  input: 'src/main.js',
  output: {
    name: 'VueExcelComponent',
    exports: 'named',
    globals: {
      'vuedraggable': 'vuedraggable',
      'xlsx': 'XLSX',
      'moment': 'moment'
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
    minify(),
    css(),
    cleanup()
  ],
  external: [
    'vuedraggable',
    'xlsx',
    'moment'
  ]
}

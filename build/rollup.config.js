import commonjs from 'rollup-plugin-commonjs'
import vue from 'rollup-plugin-vue'
import resolve from '@rollup/plugin-node-resolve'
import minify from 'rollup-plugin-babel-minify'
import css from 'rollup-plugin-css-porter'

export default {
  input: 'src/main.js',
  output: {
    name: 'VueExcelComponent',
    exports: 'named',
    globals: {
      'moment': 'moment',
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
    minify(),
    css()
  ],
  external: [
    'moment',
    'vuedraggable',
    'xlsx'
  ]
}
